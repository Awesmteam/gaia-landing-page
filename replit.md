# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Optional secrets: `META_CAPI_ACCESS_TOKEN` (Meta Conversions API token, pixel `2028445224551858`), `META_CAPI_TEST_EVENT_CODE` (Test Events code), `LEADCONNECTOR_WEBHOOK_URL` (overrides default GHL webhook)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- **Tracking**: Meta Pixel base script in `index.html` fires `PageView`; `RegistrationPopup` generates a UUID `event_id`, fires `fbq('track','Lead', {}, {eventID})` browser-side AFTER the API responds 200, and sends the same `event_id` + cookie attribution to `/api/registrations` so the server can fire a deduplicated CAPI `Lead`.
- **Attribution**: `useAttribution()` hook (`src/lib/attribution.ts`) is mounted on `WebinarRegistration` and `Landing`. It writes a 90-day `kl_attr` cookie with first-touch utm_*, last-touch fbclid, landing_url, referrer. Pixel cookies `_fbp`/`_fbc` are read at submit time.
- **Server-side dedupe**: `POST /api/registrations` rejects (returns `{ok:true, deduped:true}`) any second submission with the same email + source within 6 hours, skipping both GHL webhook and CAPI.
- **Phone normalization**: `normalizePhone()` converts Swedish national format (`07…`) to E.164 (`+46…`); `country` is derived from the E.164 prefix and falls back to `cf-ipcountry`/`x-vercel-ip-country` headers, then `SE`.
- **CAPI no-op**: If `META_CAPI_ACCESS_TOKEN` is missing, the CAPI helper logs a warning and returns `skipped:no_token` — registration flow continues unaffected.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
