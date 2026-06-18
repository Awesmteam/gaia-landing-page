export const WEBINAR_DATE = "tisdag 23 juni 2026";
export const WEBINAR_DATE_SHORT = "23.06.2026";
export const WEBINAR_TIME = "18:00";
export const WEBINAR_TIMEZONE_LABEL = "svensk tid";
export const WEBINAR_LOCATION_PUBLIC = "Online – du får länken på mejlen";
export const WEBINAR_LOCATION_CONFIRMED = "Online via Zoom";
export const WEBINAR_TITLE = "Kvinnlig Lustkraft – Gratis webinar med Gaia";
export const WEBINAR_DESCRIPTION =
  "Din kropp vet vägen. Återväck din lust och livskraft. Gratis webinar med Gaia Lindroos.";

// 23 June 2026 18:00 Europe/Stockholm (CEST, UTC+2) = 16:00 UTC
export const WEBINAR_TARGET_ISO = "2026-06-23T18:00:00+02:00";
export const WEBINAR_ICS_DTSTART_UTC = "20260623T160000Z";
export const WEBINAR_ICS_DTEND_UTC = "20260623T173000Z";

// Replay window: 48h after webinar end (19:30 Stockholm) → closes 25 June 2026 19:30
export const REPLAY_DEADLINE_ISO = "2026-06-25T19:30:00+02:00";
// Optional: embed URL for the recording (YouTube / Vimeo). Leave empty for placeholder.
export const REPLAY_EMBED_URL =
  "https://player.vimeo.com/video/1199014437?badge=0&autopause=0&player_id=0&app_id=58479";

// GHL / FastPayDirect checkout link for "Kvinnlig Lustkraft" course
export const PAYMENT_LINK = "https://link.fastpaydirect.com/payment-link/6a0498ff8c3f15f97515aee0";

// Webinar Zoom link (matches the link sent in confirmation emails)
export const WEBINAR_ZOOM_LINK = "https://zoom.us/j/94430244908";
// Add-to-calendar link — Google Calendar event prefilled with the Zoom link (same as in emails)
export const WEBINAR_CALENDAR_LINK =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Kvinnlig+Lustkraft+%E2%80%93+Gratis+webinar+med+Gaia&dates=20260623T160000Z/20260623T173000Z&details=Anslut+via+Zoom%3A+https%3A%2F%2Fzoom.us%2Fj%2F94430244908&location=https%3A%2F%2Fzoom.us%2Fj%2F94430244908";

// Course access — where buyers go to start Module 1 after purchase
export const COURSE_LOGIN_LINK = "https://members.innershift.se";
export const SUPPORT_EMAIL = "hej@innershift.se";

// --- "Din resa fram till webbinariet": drip-unlock schedule for the nurture pages ---
// Each page unlocks at 00:00 Stockholm on its "D-N" day, derived from the webinar date
// so the schedule stays correct if the webinar is moved.
export type JourneyKey = "podcast" | "video" | "blogg" | "testimonial";

function journeyUnlockIso(daysBefore: number): string {
  const datePart = WEBINAR_TARGET_ISO.slice(0, 10); // e.g. "2026-06-23"
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

const SWEDISH_MONTHS = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

// "18 juni" — parsed straight from the ISO date part so it shows the Stockholm
// calendar day regardless of the viewer's own timezone.
export function formatSwedishDate(iso: string): string {
  const [, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d} ${SWEDISH_MONTHS[m - 1]}`;
}
