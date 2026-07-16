import { logger } from "./logger";

const WEBINARFUEL_API_URL = "https://api.webinarfuel.com/registrants";
export const WEBINARFUEL_WEBINAR_ID = 20541;
export const WEBINARFUEL_SESSION_ID = 75648;

export type WebinarFuelResult = {
  ok: boolean;
  status: number | null;
  body: unknown;
  joinLink: string | null;
  skipped?: "no_api_key";
  error?: string;
};

export type WebinarFuelInput = {
  email: string;
  name: string;
  phoneE164?: string;
  tags?: string[];
  ip?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ");
  return { first, last };
}

// Defensively locate the personal join link anywhere in the response body:
// look for URL string values under keys containing "join" / "watch" / "live".
export function extractJoinLink(body: unknown): string | null {
  const seen = new Set<unknown>();
  const walk = (node: unknown, depth: number): string | null => {
    if (depth > 6 || node === null || typeof node !== "object" || seen.has(node)) {
      return null;
    }
    seen.add(node);
    const entries = Array.isArray(node)
      ? node.map((v, i) => [String(i), v] as const)
      : Object.entries(node as Record<string, unknown>);
    // Priority pass: keys that look like a join link
    for (const [key, value] of entries) {
      if (
        typeof value === "string" &&
        /^https?:\/\//.test(value) &&
        /(join|watch|live|attend)/i.test(key)
      ) {
        return value;
      }
    }
    for (const [, value] of entries) {
      const found = walk(value, depth + 1);
      if (found) return found;
    }
    return null;
  };
  return walk(body, 0);
}

export async function registerWithWebinarFuel(
  input: WebinarFuelInput,
): Promise<WebinarFuelResult> {
  const apiKey = process.env["WEBINARFUEL_API_KEY"];
  if (!apiKey) {
    logger.warn("WEBINARFUEL_API_KEY not set — skipping WebinarFuel registration");
    return { ok: false, status: null, body: null, joinLink: null, skipped: "no_api_key" };
  }

  const { first, last } = splitName(input.name);

  const payload = {
    webinar_id: WEBINARFUEL_WEBINAR_ID,
    registrant: {
      email: input.email,
      first_name: first,
      ...(last ? { last_name: last } : {}),
      ...(input.phoneE164 ? { phone: input.phoneE164 } : {}),
      ...(input.tags && input.tags.length > 0 ? { tags: input.tags } : {}),
    },
    session: {
      webinar_session_id: WEBINARFUEL_SESSION_ID,
      time_zone: "Europe/Stockholm",
      ...(input.ip ? { ip: input.ip } : {}),
      ...(input.referrer ? { referrer: input.referrer } : {}),
      ...(input.utm_source ? { utm_source: input.utm_source } : {}),
      ...(input.utm_medium ? { utm_medium: input.utm_medium } : {}),
      ...(input.utm_campaign ? { utm_campaign: input.utm_campaign } : {}),
      ...(input.utm_term ? { utm_term: input.utm_term } : {}),
      ...(input.utm_content ? { utm_content: input.utm_content } : {}),
    },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(WEBINARFUEL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
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
    const joinLink = res.ok ? extractJoinLink(body) : null;
    if (!res.ok) {
      logger.error(
        { status: res.status, body },
        "WebinarFuel registration failed",
      );
    } else if (!joinLink) {
      logger.warn({ body }, "WebinarFuel response had no recognizable join link");
    }
    return { ok: res.ok, status: res.status, body, joinLink };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err }, "WebinarFuel request failed");
    return { ok: false, status: null, body: null, joinLink: null, error: message };
  } finally {
    clearTimeout(timer);
  }
}
