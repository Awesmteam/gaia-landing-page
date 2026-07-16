// ─────────────────────────────────────────────────────────────────────────────
// Webinar schedule
//
// The webinar runs every Wednesday at 18:30 (Europe/Stockholm). The site shows the
// next upcoming session and AUTOMATICALLY advances one week once the current one
// has ended — e.g. 30 juni → 7 juli → 14 juli → … — without any code change.
// The Zoom link stays the same across all sessions.
//
// `WEBINAR_FIRST` is the anchor (first session of the current cycle). Everything
// else (date strings, calendar/ICS links, replay deadline, drip schedule) is
// derived from the computed start time, so changing the anchor is all it takes.
// ─────────────────────────────────────────────────────────────────────────────

const STOCKHOLM_TZ = "Europe/Stockholm";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const WEBINAR_DURATION_MS = 90 * 60 * 1000; // 18:30 → 20:00
const WEBINAR_START_HOUR = 18;
const WEBINAR_START_MINUTE = 30;

// Anchor: first session of the current cycle (Wednesday). The schedule rolls
// forward weekly from here.
const WEBINAR_FIRST = { year: 2026, month: 7, day: 22 }; // 22 juli 2026

const SWEDISH_MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// Offset (ms) of Europe/Stockholm at a given instant — handles CEST/CET (DST).
function stockholmOffsetMs(date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: STOCKHOLM_TZ,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  });
  const map: Record<string, string> = {};
  for (const p of dtf.formatToParts(date)) map[p.type] = p.value;
  const asUTC = Date.UTC(
    +map.year, +map.month - 1, +map.day,
    +map.hour, +map.minute, +map.second,
  );
  return asUTC - date.getTime();
}

// Wall-clock parts of an instant, expressed in Stockholm local time.
function stockholmParts(date: Date) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: STOCKHOLM_TZ,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  });
  const map: Record<string, string> = {};
  for (const p of dtf.formatToParts(date)) map[p.type] = p.value;
  return {
    year: +map.year, month: +map.month, day: +map.day,
    hour: +map.hour, minute: +map.minute, second: +map.second,
  };
}

// Convert a Stockholm wall-clock time (e.g. 18:00 on a given date) to the exact
// UTC instant, accounting for DST.
function stockholmWallToUtc(
  year: number, month: number, day: number, hour: number, minute: number,
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  let offset = stockholmOffsetMs(new Date(guess));
  let utc = guess - offset;
  offset = stockholmOffsetMs(new Date(utc));
  utc = guess - offset;
  return new Date(utc);
}

// The current (upcoming) webinar start, rolling forward weekly after each ends.
function computeWebinarStart(now: Date = new Date()): Date {
  let { year, month, day } = WEBINAR_FIRST;
  let start = stockholmWallToUtc(year, month, day, WEBINAR_START_HOUR, WEBINAR_START_MINUTE);
  while (now.getTime() > start.getTime() + WEBINAR_DURATION_MS) {
    const next = new Date(Date.UTC(year, month - 1, day) + WEEK_MS);
    year = next.getUTCFullYear();
    month = next.getUTCMonth() + 1;
    day = next.getUTCDate();
    start = stockholmWallToUtc(year, month, day, WEBINAR_START_HOUR, WEBINAR_START_MINUTE);
  }
  return start;
}

function toIsoWithOffset(date: Date): string {
  const p = stockholmParts(date);
  const offMin = Math.round(stockholmOffsetMs(date) / 60000);
  const sign = offMin >= 0 ? "+" : "-";
  const abs = Math.abs(offMin);
  return (
    `${p.year}-${pad(p.month)}-${pad(p.day)}` +
    `T${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}` +
    `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
  );
}

function toIcsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

// ── Derived schedule values ──────────────────────────────────────────────────
const WEBINAR_START = computeWebinarStart();
const WEBINAR_END = new Date(WEBINAR_START.getTime() + WEBINAR_DURATION_MS);
const _start = stockholmParts(WEBINAR_START);

export const WEBINAR_DATE =
  `onsdag ${_start.day} ${SWEDISH_MONTHS[_start.month - 1]} ${_start.year}`;
export const WEBINAR_DATE_SHORT =
  `${pad(_start.day)}.${pad(_start.month)}.${_start.year}`;
export const WEBINAR_TIME = "18:30";
export const WEBINAR_TIMEZONE_LABEL = "svensk tid";
export const WEBINAR_LOCATION_PUBLIC = "Online – du får länken på mejlen";
export const WEBINAR_LOCATION_CONFIRMED = "Online via Zoom";
export const WEBINAR_TITLE = "Kvinnlig Lustkraft – Gratis webinar med Gaia";
export const WEBINAR_DESCRIPTION =
  "Din kropp vet vägen. Återväck din lust och livskraft. Gratis webinar med Gaia Lindroos.";

export const WEBINAR_TARGET_ISO = toIsoWithOffset(WEBINAR_START);
export const WEBINAR_ICS_DTSTART_UTC = toIcsUtc(WEBINAR_START);
export const WEBINAR_ICS_DTEND_UTC = toIcsUtc(WEBINAR_END);

// Replay window: 48h after the webinar ends (19:30 Stockholm).
export const REPLAY_DEADLINE_ISO = toIsoWithOffset(
  new Date(WEBINAR_END.getTime() + 48 * 60 * 60 * 1000),
);
// Optional: embed URL for the recording (YouTube / Vimeo). Leave empty for placeholder.
export const REPLAY_EMBED_URL =
  "https://player.vimeo.com/video/1199014437?badge=0&autopause=0&player_id=0&app_id=58479";

// GHL / FastPayDirect checkout link for "Kvinnlig Lustkraft" course
export const PAYMENT_LINK = "https://link.fastpaydirect.com/payment-link/6a0498ff8c3f15f97515aee0";

// Fallback join link (used if WebinarFuel didn't return a personal link).
export const WEBINAR_ZOOM_LINK = "https://zoom.us/j/94430244908";

// sessionStorage key where the personal WebinarFuel join link is stored after signup.
export const JOIN_LINK_STORAGE_KEY = "wf_join_link";

export function getStoredJoinLink(): string | null {
  try {
    const v = sessionStorage.getItem(JOIN_LINK_STORAGE_KEY);
    return v && /^https?:\/\//.test(v) ? v : null;
  } catch {
    return null;
  }
}

// Add-to-calendar link — Google Calendar event prefilled with the join link.
export function buildCalendarLink(joinLink: string): string {
  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=Kvinnlig+Lustkraft+%E2%80%93+Gratis+webinar+med+Gaia` +
    `&dates=${WEBINAR_ICS_DTSTART_UTC}/${WEBINAR_ICS_DTEND_UTC}` +
    `&details=${encodeURIComponent(`Anslut här: ${joinLink}`)}` +
    `&location=${encodeURIComponent(joinLink)}`
  );
}

export const WEBINAR_CALENDAR_LINK = buildCalendarLink(WEBINAR_ZOOM_LINK);

// Course access — where buyers go to start Module 1 after purchase
export const COURSE_LOGIN_LINK = "https://members.innershift.se";
export const SUPPORT_EMAIL = "hej@innershift.se";

// --- "Din resa fram till webbinariet": drip-unlock schedule for the nurture pages ---
// Each page unlocks at 00:00 Stockholm on its "D-N" day, derived from the webinar date
// so the schedule stays correct as the webinar auto-advances.
export type JourneyKey = "podcast" | "video" | "blogg" | "testimonial";

function journeyUnlockIso(daysBefore: number): string {
  const datePart = WEBINAR_TARGET_ISO.slice(0, 10); // e.g. "2026-06-30"
  const base = new Date(`${datePart}T00:00:00Z`);
  base.setUTCDate(base.getUTCDate() - daysBefore);
  const y = base.getUTCFullYear();
  const m = String(base.getUTCMonth() + 1).padStart(2, "0");
  const d = String(base.getUTCDate()).padStart(2, "0");
  // Stockholm summer time (CEST, UTC+2) — consistent with the webinar/replay constants above.
  return `${y}-${m}-${d}T00:00:00+02:00`;
}

export const JOURNEY_UNLOCK_ISO: Record<JourneyKey, string> = {
  podcast: journeyUnlockIso(5), // D-5
  video: journeyUnlockIso(4), // D-4
  blogg: journeyUnlockIso(3), // D-3
  testimonial: journeyUnlockIso(2), // D-2
};

// Drip-gating disabled — all journey pages are open immediately (no locks).
export function isJourneyUnlocked(_key: JourneyKey, _now: Date = new Date()): boolean {
  return true;
}

// "18 juni" — parsed straight from the ISO date part so it shows the Stockholm
// calendar day regardless of the viewer's own timezone.
export function formatSwedishDate(iso: string): string {
  const [, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d} ${SWEDISH_MONTHS[m - 1]}`;
}
