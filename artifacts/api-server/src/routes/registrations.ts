import { Router, type IRouter } from "express";
import { eq, and, gte, sql } from "drizzle-orm";
import {
  db,
  registrationsTable,
  registrationInputSchema,
} from "@workspace/db";
import { logger } from "../lib/logger";
import {
  buildPayload,
  sendToLeadConnector,
  type Attribution,
} from "../lib/leadconnector";
import {
  normalizePhone,
  deriveCountry,
  getClientIp,
} from "../lib/normalize";
import { sendCapiEvent } from "../lib/metaCapi";

const router: IRouter = Router();
const DEDUPE_WINDOW_MS = 6 * 60 * 60 * 1000;

router.post("/registrations", async (req, res) => {
  const parsed = registrationInputSchema.safeParse(req.body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    res.status(400).json({
      ok: false,
      error: first?.message ?? "Ogiltig inmatning.",
    });
    return;
  }

  const input = parsed.data;
  const headers = req.headers;
  const userAgent = (headers["user-agent"] as string | undefined) ?? undefined;
  const clientIp = getClientIp(headers, req.socket.remoteAddress ?? undefined);

  const { e164: phoneE164, country: phoneCountry } = normalizePhone(input.phone);
  const country = deriveCountry(phoneCountry, headers);

  const attribution: Attribution = {
    fbclid: input.fbclid,
    fbp: input.fbp,
    fbc: input.fbc,
    utm_source: input.utm_source,
    utm_medium: input.utm_medium,
    utm_campaign: input.utm_campaign,
    utm_content: input.utm_content,
    utm_term: input.utm_term,
    landing_url: input.landing_url,
    referrer: input.referrer,
  };

  // Dedupe: same email + source within DEDUPE_WINDOW_MS
  try {
    const since = new Date(Date.now() - DEDUPE_WINDOW_MS);
    const dupes = await db
      .select({ id: registrationsTable.id })
      .from(registrationsTable)
      .where(
        and(
          eq(sql`lower(${registrationsTable.email})`, input.email),
          eq(registrationsTable.source, input.source),
          gte(registrationsTable.createdAt, since),
        ),
      )
      .limit(1);
    if (dupes.length > 0) {
      logger.info(
        { email: input.email, source: input.source },
        "Duplicate registration within window — skipping webhook + CAPI",
      );
      res.json({ ok: true, deduped: true });
      return;
    }
  } catch (err) {
    logger.warn({ err }, "Dedupe check failed; proceeding");
  }

  let inserted;
  try {
    const rows = await db
      .insert(registrationsTable)
      .values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        phoneE164,
        country,
        source: input.source,
        eventId: input.event_id,
        attribution: attribution as unknown as Record<string, unknown>,
      })
      .returning();
    inserted = rows[0];
  } catch (err) {
    logger.error({ err }, "Failed to insert registration");
    res.status(500).json({ ok: false, error: "Något gick fel, försök igen." });
    return;
  }

  if (!inserted) {
    res.status(500).json({ ok: false, error: "Något gick fel, försök igen." });
    return;
  }

  // Respond immediately; forward to webhook + CAPI in the background.
  res.json({ ok: true, id: inserted.id });

  const payload = buildPayload({
    name: input.name,
    email: input.email,
    phone: input.phone,
    phoneE164,
    country,
    source: input.source,
    eventId: input.event_id,
    attribution,
    clientIp,
    userAgent,
  });

  const sourceUrl =
    input.landing_url ||
    (input.source === "webinar"
      ? "https://innershift.se/gratis-webbinarium"
      : "https://innershift.se/sales");

  const phoneDigits = phoneE164.replace(/\D/g, "");

  const [ghlResult, capiResult] = await Promise.all([
    sendToLeadConnector(payload),
    input.event_id
      ? sendCapiEvent({
          eventName: "Lead",
          eventId: input.event_id,
          eventSourceUrl: sourceUrl,
          userData: {
            email: input.email,
            phoneDigits,
            firstName: input.name,
            country: country.toLowerCase(),
            clientIp,
            userAgent,
            fbp: input.fbp,
            fbc: input.fbc,
          },
          customData: {
            lead_source: input.source,
            utm_source: input.utm_source,
            utm_campaign: input.utm_campaign,
          },
        })
      : Promise.resolve({
          ok: false,
          status: null,
          body: null,
          skipped: "no_event_id" as const,
        }),
  ]);

  try {
    await db
      .update(registrationsTable)
      .set({
        webhookStatus: ghlResult.ok ? "sent" : "failed",
        webhookResponse: {
          status: ghlResult.status,
          body: ghlResult.body,
          error: ghlResult.error ?? null,
        },
        webhookAttemptedAt: new Date(),
        capiStatus: capiResult.ok
          ? "sent"
          : "skipped" in capiResult && capiResult.skipped
            ? `skipped:${capiResult.skipped}`
            : "failed",
        capiResponse: {
          status: capiResult.status,
          body: capiResult.body,
          error:
            "error" in capiResult && capiResult.error ? capiResult.error : null,
        },
      })
      .where(eq(registrationsTable.id, inserted.id));
  } catch (err) {
    logger.error(
      { err, registrationId: inserted.id },
      "Failed to update webhook/CAPI status",
    );
  }
});

export default router;
