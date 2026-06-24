---
name: Webinar schedule auto-rollover
description: How the weekly webinar date is computed and the GHL email caveat
---

# Webinar schedule auto-rollover

The public site's webinar date is NOT hardcoded — it auto-computes the next
weekly Tuesday 18:00 Europe/Stockholm session and rolls forward one week
automatically once the current session has ended. Everything date-dependent
(date strings, Google-Calendar/ICS links, replay deadline, drip-unlock schedule)
is derived from that computed start. The Zoom link, payment link, and course
login link are constant across all sessions.

To change the schedule, edit only the `WEBINAR_FIRST` anchor in
`artifacts/kvinnlig-lustkraft/src/lib/webinar.ts`. DST is handled via
`Intl.DateTimeFormat` (CEST→16:00Z, CET→17:00Z for 18:00 local).

**Why:** Gaia runs the webinar weekly; manually editing every date link each week
was error-prone. Rollover happens on page load (static SPA), so a refresh after a
session shows the next one.

**How to apply / CRITICAL caveat:** Production emails are GHL-managed via
`{{custom_values.date_of_the_webinar}}` and `webinar_add_to_calendar_link`. The
codebase CANNOT auto-advance those — the user must update the GHL custom values
each week. The `shell.ts` SAMPLE_VALUES only drive the local `/emails` preview,
not the emails GHL actually sends.
