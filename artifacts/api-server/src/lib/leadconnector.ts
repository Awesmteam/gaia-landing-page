import { logger } from "./logger";

const DEFAULT_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/eciQwkSR4pLDI1cdBwK9/webhook-trigger/9df1165c-bbec-48ce-802e-d76fba032b2e";

export type WebhookResult = {
  ok: boolean;
  status: number | null;
  body: unknown;
  error?: string;
};

export type RegistrationWebhookPayload = {
  name: string;
  email: string;
  phone: string;
  source: "webinar" | "sales";
  webinar_date: string;
  webinar_time: string;
  timezone: string;
  submitted_at: string;
  tags: string[];
};

export function buildPayload(input: {
  name: string;
  email: string;
  phone: string;
  source: "webinar" | "sales";
}): RegistrationWebhookPayload {
  return {
    name: input.name,
    email: input.email,
    phone: input.phone,
    source: input.source,
    webinar_date: "2026-05-20",
    webinar_time: "18:00",
    timezone: "Europe/Stockholm",
    submitted_at: new Date().toISOString(),
    tags: ["kvinnlig-lustkraft", input.source],
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
