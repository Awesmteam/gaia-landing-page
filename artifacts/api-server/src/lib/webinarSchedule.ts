// Server-side webinar schedule — mirrors the frontend logic in
// artifacts/kvinnlig-lustkraft/src/lib/webinar.ts. The webinar runs every
// Tuesday 18:00 Europe/Stockholm and rolls forward weekly after each session
// ends. Anchor must be kept in sync with the frontend.

const STOCKHOLM_TZ = "Europe/Stockholm";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const WEBINAR_DURATION_MS = 90 * 60 * 1000; // 18:00 → 19:30

const WEBINAR_FIRST = { year: 2026, month: 7, day: 7 }; // 7 juli 2026

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

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
    +map["year"]!, +map["month"]! - 1, +map["day"]!,
    +map["hour"]!, +map["minute"]!, +map["second"]!,
  );
  return asUTC - date.getTime();
}

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
    year: +map["year"]!, month: +map["month"]!, day: +map["day"]!,
    hour: +map["hour"]!, minute: +map["minute"]!,
  };
}

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

export function computeWebinarStart(now: Date = new Date()): Date {
  let { year, month, day } = WEBINAR_FIRST;
  let start = stockholmWallToUtc(year, month, day, 18, 0);
  while (now.getTime() > start.getTime() + WEBINAR_DURATION_MS) {
    const next = new Date(Date.UTC(year, month - 1, day) + WEEK_MS);
    year = next.getUTCFullYear();
    month = next.getUTCMonth() + 1;
    day = next.getUTCDate();
    start = stockholmWallToUtc(year, month, day, 18, 0);
  }
  return start;
}

function toIcsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export type WebinarScheduleFields = {
  /** e.g. "2026-07-07" (Stockholm calendar date) */
  webinarDate: string;
  /** e.g. "18:00" */
  webinarTime: string;
  /** "MM-DD-YYYY HH:MM AM/PM", e.g. "07-07-2026 06:00 PM" (Stockholm time) */
  joiningDateEvent: string;
  /** Google Calendar template link, join link embedded in details/location */
  googleCalendarLink: string;
};

export function getWebinarScheduleFields(
  joinLink: string,
  now: Date = new Date(),
): WebinarScheduleFields {
  const start = computeWebinarStart(now);
  const end = new Date(start.getTime() + WEBINAR_DURATION_MS);
  const p = stockholmParts(start);

  const webinarDate = `${p.year}-${pad(p.month)}-${pad(p.day)}`;
  const webinarTime = `${pad(p.hour)}:${pad(p.minute)}`;

  const hour12 = p.hour % 12 === 0 ? 12 : p.hour % 12;
  const ampm = p.hour < 12 ? "AM" : "PM";
  const joiningDateEvent =
    `${pad(p.month)}-${pad(p.day)}-${p.year} ${pad(hour12)}:${pad(p.minute)} ${ampm}`;

  const title = encodeURIComponent("Kvinnlig Lustkraft – Gratis webinar med Gaia");
  const details = encodeURIComponent(`Anslut här: ${joinLink}`);
  const location = encodeURIComponent(joinLink);
  const googleCalendarLink =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${title}` +
    `&dates=${toIcsUtc(start)}/${toIcsUtc(end)}` +
    `&details=${details}` +
    `&location=${location}`;

  return { webinarDate, webinarTime, joiningDateEvent, googleCalendarLink };
}
