# Flytta webinardatum → 23.06.2026

**Status:** ✅ done (typecheck pass, code-review DONE) · **Mode:** /cook interactive

## Mål
Ändra webinardatum från `tisdag 9 juni 2026` → `tisdag 23 juni 2026` (23.06.2026). Zoom-länk oförändrad. Uppdatera alla beroende platser.

## Beslut (bekräftade)
- Replay-deadline flyttas 11 juni → **25 juni** (behåll 48h-fönster).
- Email-previews + sample values uppdateras också (full konsistens).
- Veckodag `tisdag` stämmer (23 juni 2026 = tisdag).
- Zoom: `https://zoom.us/j/94430244908` — RÖRS EJ.

## Källa till sanning
`src/lib/webinar.ts` → importeras av 7 sidor (auto-propagering).

## Ändringar
1. `src/lib/webinar.ts` (7): DATE, DATE_SHORT, TARGET_ISO, ICS DTSTART/DTEND, REPLAY_DEADLINE_ISO, CALENDAR_LINK dates, kommentarer.
2. `src/lib/emails/shell.ts`: `date_of_the_webinar` + calendar-link dates.
3. `public/mejl-{1-inbjudan,1-preview,2,3,4,5}-inbjudan.html`: `tisdag 9 juni 2026` → `tisdag 23 juni 2026`.
4. `src/pages/WebinarThankYou.tsx:202`: `den 9 juni` → `den 23 juni`.
5. `src/lib/emails/invitations/inv-all-plaintext.md` (3): datum + timingnotiser.

## Verifiering
- `pnpm run typecheck`
- grep: 0 kvar av `9 juni|09.06.2026|20260609|2026-06-09|11 juni|20260611`
- code-reviewer subagent.

## Utanför scope (flagga till användare)
- GHL `custom_values.date_of_the_webinar` (live-mejl) — sätts i GoHighLevel, ej i repo.
- Zoom-mötets faktiska datum/tid i Zoom-kontot.
