---
name: Webinar registration source & ad attribution
description: How to correctly count registrants / ad attribution for a SPECIFIC webinar
---

# Counting registrants & ad source for a specific webinar

The Postgres `registrations` table (`source='webinar'`) is **generic and cumulative** —
it collects rows for EVERY webinar over time, with no per-webinar date field. Counting
`source='webinar'` therefore over-counts massively if the user asks about one webinar.

**Source of truth for a single webinar = GoHighLevel (GHL) date tags**, not the DB.
The GHL workflow re-tags each registrant with a date-specific tag like
`"23.06.2026 live webinar register"` (plus a cumulative `"live wbn registrants"`).
The webhook's own tags (`kvinnlig-lustkraft`, `webinar`, utm_source) are NOT what ends
up on the contact — the workflow overrides them.

**Correct method to answer "how many for webinar X came from ads":**
1. Query GHL contacts/search (POST services.leadconnectorhq.com/contacts/search,
   header `Version: 2021-07-28`, Bearer = GHL_PRIVATE_INTEGRATION_TOKEN, body has
   locationId) filtered by the date-specific tag → gives the true registrant count
   and their emails.
2. Cross-reference those emails against the DB to read `attribution` jsonb.

**Ad classification** (Meta ads): `attribution->>'utm_medium'='paid'` with
`utm_source` in (`fb`=Facebook, `ig`=Instagram, `an`=Audience Network).
`fbclid` present but no UTM = likely an ad click with lost UTM.

**Why:** First attempt counted `source='webinar'` (770 unique, May–Jun) and reported
~628 from ads; the user's GHL showed only ~290 for the 23.6 webinar. The DB spanned
many webinars; only the GHL date tag isolates one. Secrets are NOT exposed to the
code_execution sandbox via process.env — run a Node script via bash (the workflow
container has the GHL secrets) and print only aggregates, never secret values.
