import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (
      cmd: string,
      eventName: string,
      params?: Record<string, unknown>,
      opts?: { eventID?: string },
    ) => void;
  }
}

const COOKIE_NAME = "kl_attr";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export type Attribution = {
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_url?: string;
  referrer?: string;
  first_touch_at?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  if (!match) return undefined;
  return decodeURIComponent(match.split("=").slice(1).join("="));
}

function writeCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getStoredAttribution(): Attribution {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return {};
  }
}

export function getPixelCookies(): { fbp?: string; fbc?: string } {
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
  };
}

/**
 * Captures attribution on mount:
 * - utm_*: first-touch (don't overwrite if already stored)
 * - fbclid: last-touch (always update with newest)
 * - landing_url + referrer: stored on first touch only
 */
export function useAttribution() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const stored = getStoredAttribution();
    const next: Attribution = { ...stored };
    let changed = false;

    for (const k of UTM_KEYS) {
      const v = params.get(k)?.trim();
      if (v && !next[k]) {
        next[k] = v;
        changed = true;
      }
    }

    const fbclid = params.get("fbclid")?.trim();
    if (fbclid && fbclid !== next.fbclid) {
      next.fbclid = fbclid;
      changed = true;
    }

    if (!next.landing_url) {
      next.landing_url = window.location.href;
      changed = true;
    }
    if (!next.referrer) {
      const ref = document.referrer || "";
      if (ref) {
        next.referrer = ref;
        changed = true;
      }
    }
    if (!next.first_touch_at) {
      next.first_touch_at = new Date().toISOString();
      changed = true;
    }

    if (changed) {
      writeCookie(COOKIE_NAME, JSON.stringify(next), COOKIE_MAX_AGE);
    }
  }, []);
}

/**
 * Generate a UUID-ish event id (RFC4122 v4 if crypto available, otherwise fallback).
 */
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return (
    "evt-" +
    Math.random().toString(36).slice(2) +
    Date.now().toString(36)
  );
}
