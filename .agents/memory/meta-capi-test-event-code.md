---
name: Meta CAPI test_event_code must be dev-only
description: Why production Meta Conversions API events were not counted/attributed to ads
---

# Meta CAPI test_event_code leaked into production

`META_CAPI_TEST_EVENT_CODE` is a **global secret** (Replit secrets are not
environment-scoped), so it was present in production too. The CAPI sender attached
`test_event_code` to every event whenever the secret existed.

**Effect:** Meta routes any event carrying `test_event_code` to the Events Manager
"Test Events" tab ONLY. Those events are NOT counted as real conversions and NOT
attributed to ad campaigns. Symptom reported by user: "ads không nhận pixel event"
(ads not receiving the pixel/conversion events) even though CAPI returned 200 and
DB `capi_status='sent'`.

**Fix:** gate the test code so it is attached only when `NODE_ENV !== 'production'`.
Autoscale deployments set `NODE_ENV=production` (logger.ts already relies on this).
Requires a re-publish for production to pick up the change.

**Why / how to apply:** any test/sandbox flag for an analytics or payments provider
(test_event_code, Stripe test keys, sandbox modes) must be gated to dev — never rely
on "just don't set the secret in prod" when secrets are global. Verify the real
events land in the live Events Manager view (not Test Events) after deploy.
