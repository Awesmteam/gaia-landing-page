import { logger } from "./logger";
import { getWebinarScheduleFields } from "./webinarSchedule";

// Shared fallback link if WebinarFuel didn't return a personal join link.
export const FALLBACK_JOIN_LINK = "https://zoom.us/j/94430244908";

const DEFAULT_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/eciQwkSR4pLDI1cdBwK9/webhook-trigger/9df1165c-bbec-48ce-802e-d76fba032b2e";

export type WebhookResult = {
  ok: boolean;
  status: number | null;
  body: unknown;
  error?: string;
};

export type Attribution = {
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_url?: string;
  referrer?: string;
};

export type RegistrationWebhookPayload = {
  name: string;
  email: string;
  phone: string;
  phone_e164: string;
  country: string;
  source: "webinar" | "sales";
  event_id?: string;
  webinar_date: string;
  webinar_time: string;
  timezone: string;
  joining_link_webinar: string;
  joining_date_event: string;
  google_calendar_link: string;
  submitted_at: string;
  tags: string[];
  client_ip?: string;
  user_agent?: string;
} & Attribution;

export type BuildPayloadInput = {
  name: string;
  email: string;
  phone: string;
  phoneE164: string;
  country: string;
  source: "webinar" | "sales";
  eventId?: string;
  attribution?: Attribution;
  clientIp?: string;
  userAgent?: string;
  joinLink?: string | null;
};

export function buildPayload(
  input: BuildPayloadInput,
): RegistrationWebhookPayload {
  const a = input.attribution ?? {};
  const tags = ["kvinnlig-lustkraft", input.source];
  if (a.utm_source) tags.push(a.utm_source);
  const joinLink = input.joinLink || FALLBACK_JOIN_LINK;
  const schedule = getWebinarScheduleFields(joinLink);
  return {
    name: input.name,
    email: input.email,
    phone: input.phoneE164 || input.phone,
    phone_e164: input.phoneE164,
    country: input.country,
    source: input.source,
    event_id: input.eventId,
    webinar_date: schedule.webinarDate,
    webinar_time: schedule.webinarTime,
    timezone: "Europe/Stockholm",
    joining_link_webinar: joinLink,
    joining_date_event: schedule.joiningDateEvent,
    google_calendar_link: schedule.googleCalendarLink,
    submitted_at: new Date().toISOString(),
    tags,
    client_ip: input.clientIp,
    user_agent: input.userAgent,
    fbclid: a.fbclid,
    fbp: a.fbp,
    fbc: a.fbc,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_content: a.utm_content,
    utm_term: a.utm_term,
    landing_url: a.landing_url,
    referrer: a.referrer,
  };
}

// Upsert the contact directly via the GHL API so the webinar custom fields
// (contact.joining_link_webinar etc.) are populated without manual workflow
// mapping. Requires GHL_PRIVATE_INTEGRATION_TOKEN + GHL_LOCATION_ID.
export async function upsertContactWithWebinarFields(
  payload: RegistrationWebhookPayload,
): Promise<WebhookResult> {
  const token = process.env["GHL_PRIVATE_INTEGRATION_TOKEN"];
  const locationId = process.env["GHL_LOCATION_ID"];
  if (!token || !locationId) {
    logger.warn("GHL token/location missing — skipping contact upsert");
    return { ok: false, status: null, body: null, error: "missing_ghl_config" };
  }

  const nameParts = payload.name.trim().split(/\s+/);
  const body = {
    locationId,
    email: payload.email,
    phone: payload.phone_e164 || payload.phone || undefined,
    firstName: nameParts[0] ?? "",
    lastName: nameParts.slice(1).join(" ") || undefined,
    tags: payload.tags,
    customFields: [
      { key: "joining_link_webinar", field_value: payload.joining_link_webinar },
      { key: "joining_date_event", field_value: payload.joining_date_event },
      { key: "webinar_date", field_value: payload.webinar_date },
      { key: "webinar_time", field_value: payload.webinar_time },
      { key: "google_calendar_link", field_value: payload.google_calendar_link },
    ],
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await res.text();
    let resBody: unknown = text;
    try {
      resBody = text ? JSON.parse(text) : null;
    } catch {
      // keep raw text
    }
    if (!res.ok) {
      logger.error({ status: res.status, body: resBody }, "GHL contact upsert failed");
    }
    return { ok: res.ok, status: res.status, body: resBody };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err }, "GHL contact upsert failed");
    return { ok: false, status: null, body: null, error: message };
  } finally {
    clearTimeout(timer);
  }
}

export async function sendToLeadConnector(
  payload: RegistrationWebhookPayload,
): Promise<WebhookResult> {
  const url = process.env["LEADCONNECTOR_WEBHOOK_URL"] ?? DEFAULT_WEBHOOK_URL;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await res.text();
    let body: unknown = text;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      // keep raw text
    }
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err }, "LeadConnector webhook failed");
    return { ok: false, status: null, body: null, error: message };
  } finally {
    clearTimeout(timer);
  }
}
