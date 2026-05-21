import { logger } from "./logger";

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
};

export function buildPayload(
  input: BuildPayloadInput,
): RegistrationWebhookPayload {
  const a = input.attribution ?? {};
  const tags = ["kvinnlig-lustkraft", input.source];
  if (a.utm_source) tags.push(a.utm_source);
  return {
    name: input.name,
    email: input.email,
    phone: input.phoneE164 || input.phone,
    phone_e164: input.phoneE164,
    country: input.country,
    source: input.source,
    event_id: input.eventId,
    webinar_date: "2026-05-27",
    webinar_time: "18:00",
    timezone: "Europe/Stockholm",
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
