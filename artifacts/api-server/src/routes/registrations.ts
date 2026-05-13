import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  db,
  registrationsTable,
  registrationInputSchema,
} from "@workspace/db";
import { logger } from "../lib/logger";
import { buildPayload, sendToLeadConnector } from "../lib/leadconnector";

const router: IRouter = Router();

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

  let inserted;
  try {
    const rows = await db
      .insert(registrationsTable)
      .values({
        name: input.name,
        email: input.email,
        source: input.source,
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

  // Respond immediately; forward to webhook in the background.
  res.json({ ok: true, id: inserted.id });

  const payload = buildPayload(input);
  const result = await sendToLeadConnector(payload);
  try {
    await db
      .update(registrationsTable)
      .set({
        webhookStatus: result.ok ? "sent" : "failed",
        webhookResponse: {
          status: result.status,
          body: result.body,
          error: result.error ?? null,
        },
        webhookAttemptedAt: new Date(),
      })
      .where(eq(registrationsTable.id, inserted.id));
  } catch (err) {
    logger.error(
      { err, registrationId: inserted.id },
      "Failed to update webhook status",
    );
  }
});

export default router;
