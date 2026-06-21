import { logger } from "./logger";
import { sha256 } from "./normalize";

const PIXEL_ID = "2028445224551858";
const GRAPH_VERSION = "v21.0";

export type CapiUserData = {
  email?: string;
  phoneDigits?: string; // digits only, no + sign, lowercased
  firstName?: string;
  country?: string; // 2-letter, lowercased
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
};

export type CapiEventInput = {
  eventName: "Lead" | "Purchase" | "CompleteRegistration";
  eventId: string;
  eventTime?: number; // unix seconds
  eventSourceUrl?: string;
  userData: CapiUserData;
  customData?: Record<string, unknown>;
};

export type CapiResult = {
  ok: boolean;
  status: number | null;
  body: unknown;
  error?: string;
  skipped?: "no_token";
};

function buildUserData(u: CapiUserData) {
  const d: Record<string, unknown> = {};
  if (u.email) d.em = [sha256(u.email)];
  if (u.phoneDigits) d.ph = [sha256(u.phoneDigits)];
  if (u.firstName) d.fn = [sha256(u.firstName)];
  if (u.country) d.country = [sha256(u.country)];
  if (u.clientIp) d.client_ip_address = u.clientIp;
  if (u.userAgent) d.client_user_agent = u.userAgent;
  if (u.fbp) d.fbp = u.fbp;
  if (u.fbc) d.fbc = u.fbc;
  return d;
}

export async function sendCapiEvent(
  event: CapiEventInput,
): Promise<CapiResult> {
  const token = process.env["META_CAPI_ACCESS_TOKEN"];
  if (!token) {
    logger.warn("META_CAPI_ACCESS_TOKEN missing — skipping CAPI event");
    return { ok: false, status: null, body: null, skipped: "no_token" };
  }
  // Never attach test_event_code in production: it routes events to the
  // "Test Events" tab in Events Manager, where they are NOT counted as real
  // conversions and NOT attributed to ads. Only use it in development.
  const testEventCode =
    process.env.NODE_ENV === "production"
      ? undefined
      : process.env["META_CAPI_TEST_EVENT_CODE"];
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.eventSourceUrl,
        user_data: buildUserData(event.userData),
        custom_data: event.customData ?? {},
      },
    ],
    access_token: token,
  };
  if (testEventCode) payload.test_event_code = testEventCode;

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
      // keep raw
    }
    if (!res.ok) {
      logger.warn(
        { status: res.status, body, eventId: event.eventId },
        "Meta CAPI non-OK response",
      );
    }
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err, eventId: event.eventId }, "Meta CAPI request failed");
    return { ok: false, status: null, body: null, error: message };
  } finally {
    clearTimeout(timer);
  }
}
