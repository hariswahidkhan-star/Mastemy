# Testing Mastemy

Everything below runs locally without any third-party account: Stripe, Anthropic, the OIDC identity provider and
SMTP are replaced by small local fakes, and YouTube is never called (videos are linked manually and confirmed by a
reviewer, which is the supported no-API-key path).

| Suite | Command | What it needs |
| --- | --- | --- |
| API unit + integration | `dotnet test Mastemy.slnx` | .NET 10 SDK; MySQL for the integration tests (`MASTEMY_TEST_MYSQL`) |
| Web lint / types / unit | `cd src/web && npm ci && npm run lint && npm run typecheck && npm test` | Node 22 |
| Web build (client + SSR) | `cd src/web && npm run build` | Node 22 |
| OpenAPI drift | `scripts/export-openapi.sh --check` | .NET 10 SDK, `jq` |
| Browser end-to-end + accessibility | `scripts/e2e-all.sh` | .NET 10 SDK, Node 22, MySQL 8, `mysql` client, Chromium for Playwright |

CI (`.github/workflows/ci.yml`) runs the same commands in the jobs `api`, `web`, `openapi` and `e2e` (the e2e job
also runs the backup/restore drill against the database the suite leaves behind and uploads the Playwright report,
traces and stack logs as the `playwright-report` artifact).

## The one-command browser suite: `scripts/e2e-all.sh`

```bash
# MySQL user mastemy / mastemy_dev_pw with rights to create databases (docker compose up db works)
cd e2e && npm ci && npx playwright install chromium && cd ..
scripts/e2e-all.sh                          # every spec in e2e/tests
scripts/e2e-all.sh a11y.spec.ts             # extra arguments go to `playwright test`
scripts/e2e-all.sh --grep "SSO"             # …including filters
```

The script

1. builds the API (Release; skip with `E2E_SKIP_BUILD=1`) and installs `node_modules` if missing;
2. drops and recreates the MySQL database `E2E_DB` (default `mastemy_e2e`) — the API migrates it on start and seeds
   the development SuperAdmin `admin@mastemy.local`;
3. builds the production web bundle and serves it with `vite preview` (proxying `/api` to the API; no HMR, so
   editing sources during a run cannot reload pages under test — `E2E_WEB=dev` uses the dev server instead), and
   starts fake Stripe, fake Anthropic, fake OIDC, the SMTP sink and the API;
4. waits for each to answer, runs Playwright, and stops only the processes it started (also on Ctrl+C).

Logs go to `e2e/stack-logs/` (`E2E_LOG_DIR`), the HTML report to `e2e/playwright-report/`, traces and
screenshots of failures to `e2e/test-results/`.

Ports derive from `E2E_PORT_BASE` (default 5080): API `base`, web `base+93` (5173), fake Stripe `base+7031`
(12111), fake Anthropic 12131, fake OIDC 12592, SMTP 2525 / sink HTTP 2580 — all shifted by the same offset, so a
second stack can run side by side, e.g. `E2E_PORT_BASE=6080 E2E_DB=mastemy_e2e_b scripts/e2e-all.sh`. MySQL is
reached through `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`.

### One production-like configuration for every spec

There is a single stack; no spec needs its own instance or a "relaxed" setting.

| Setting | Value | Why |
| --- | --- | --- |
| `Security__RequireMfaForPrivileged` | `true` (production default) | the helpers enroll and answer TOTP |
| `Auth__AllowBodyRefreshToken` | `false` | refresh token only in the HttpOnly cookie, as browsers use it |
| `Stripe__ApiBaseUrl` | fake Stripe | payment outcomes arrive as correctly signed webhooks posted by the tests |
| `Ai__ApiKey` / `Ai__BaseUrl` | fake key / fake Anthropic | the tutor path with citations is exercised |
| `Sso__RedirectUri`, `Sso__CompletionUrl`, `Sso__AllowInsecureHttp=true` | local URLs | OIDC sign-in against the fake IdP over http |
| `Email__*` | SMTP sink, 1 s outbox poll | verification / reset emails are read back through the sink's HTTP API |
| `Payouts__MinimumAmount=1` | | a single small sale can be paid out (the refund window keeps its 30-day default; the commerce spec ages its ledger rows to clear them) |
| `Invoice__SellerName/Address/TaxId` | test seller | PDF invoices are issued |
| `RateLimits__AuthPerMinute=600` | | many sign-ins from one IP in a few minutes |

`Sso__AllowInsecureHttp` and the fake endpoints are test-only; everything else matches production defaults.

### Shared helpers (`e2e/tests/helpers.ts`)

- `login(page, email)` signs in through the UI and answers an MFA challenge or completes forced enrollment
  (secrets are remembered per API URL in `$TMPDIR/mastemy-e2e-mfa-*.json`; a code is never reused within a 30 s
  step — the helper waits for the next step instead of failing).
- `apiLogin(request, email)` does the same over the API; every spec's `signIn` uses it.
- Privileged roles require a verified email: specs call `POST /api/admin/users/{id}/email-verification/mark-verified`
  (or the "Mark verified" button in `grantRoles`) before granting Instructor / Reviewer / staff roles.
- Lesson notes are saved with `If-Match` (ETag) like the editor does.
- `waitForMail` / `linkPath` read messages from the SMTP sink.

Specs create their own users, courses and organisations with a per-run suffix (`run`), so they do not depend on
each other and can run in any order or alone (`scripts/e2e-all.sh exams.spec.ts`). Inside a spec, tests are
`describe.serial` steps that share scaffolding. Three specs (`exams`, `commerce`, `workspace`) use the `mysql` client only to
simulate what a background process would do (`exams`: make spaced-review cards due; `commerce`: age ledger
entries past the refund window; `workspace`: mark a video Restricted as the YouTube status checker would); nothing else touches the database directly.

### What each spec covers

| Spec | Area |
| --- | --- |
| `flow` | the required end-to-end flow: channel + invitation, instructor application, authoring with free + premium notes and a manually linked video, CSV question import, two-reviewer question activation, timed exam + package, review and publication, public pages + RTL, Stripe purchase via signed webhook, exam → verifiable certificate, refund, instructor ledger |
| `wave2` | discovery, Q&A, announcements, notifications, resources, certificate PDF, enterprise workspaces |
| `account` | onboarding, profile, email verification, password reset, forced MFA enrollment, TOTP + recovery codes, sessions, data export, account deletion, public instructor page |
| `discover` | skills, certification directory (two-person verification), career paths, collections, home page, search suggestions + didYouMean, catalogue filters |
| `exams` | XLSX import with header mapping, case-group exhibits, accommodations, practice from mistakes, spaced review, challenges, regrading, certificate name correction |
| `workspace` | authoring concurrency + revisions, consent-gated analytics, study plan + ICS, trust & safety (complaint → hide → appeal, takedown hold → 451), broken-video queue, AI tutor with citation |
| `commerce` | coupons, scholarships, gifts, subscriptions, refunds, chargebacks, payouts, invoices |
| `finala` | cookie session persistence, messaging + reports, completion awards, self-graded practice, SuperAdmin MFA reset |
| `finalb` | category admin, finance order browser, enterprise seats, org-private materials, assigned pathways, OIDC SSO |
| `a11y` | axe-core on key pages × en/ar × light/dark; keyboard-only attempt player and mega-menu |

### Accessibility

`e2e/tests/a11y.spec.ts` uses `@axe-core/playwright` (pinned; axe-core is MPL-2.0) with the WCAG 2.0/2.1/2.2 A and AA
rule tags and **fails on any serious or critical violation**. Pages: home, courses, course detail, login and the
MFA challenge step, certificate verify, learner dashboard, lesson workspace, attempt player, package checkout,
studio course editor and admin users — each in English and Arabic (RTL) and in the light and dark theme (set via the
stored preferences `mastemy.lang` / `mastemy.theme`). The third-party YouTube iframe is excluded. Failures list
the rule, page and offending selectors.

Keyboard-only tests drive the attempt player (Tab to options, Space/arrow selection, flag, Next with focus moving
to the question heading, navigator state, submit dialog with Escape returning focus) and the "Explore" mega-menu
(Enter/Space opens, Tab traverses, Escape closes and returns focus, Enter follows a link).

`src/web/src/test/a11y.test.tsx` runs axe-core in jsdom on the attempt player, the login form + MFA challenge and
the open mega-menu in both languages as a fast unit-level guard (contrast is left to the browser suite).

## Fakes and their limits

| Fake | File | Covers | Does not cover |
| --- | --- | --- | --- |
| Stripe | `e2e/fake-stripe.mjs` | Checkout session / customer / refund / payout calls the API makes; webhooks are signed by the test with the configured secret | real card flows, 3-D Secure, Stripe's retry/ordering of webhooks, Connect onboarding |
| Anthropic | `e2e/fake-anthropic.mjs` | streamed Messages API answering from the first grounded source with a citation | model quality, rate limits, token accounting against real limits |
| OIDC | `e2e/fake-oidc.mjs` | discovery, JWKS (RS256), authorization code + PKCE, client secret | real IdP quirks (Azure AD / Google claims, key rotation timing) |
| SMTP | `e2e/smtp-sink.mjs` | plain SMTP capture with an HTTP API for tests | TLS, deliverability, bounces |
| YouTube | — (not called) | manual linking + reviewer confirmation, embedded player markup | Data API metadata, OAuth uploads, real playback |

Not covered by automation: real payments and payouts, real email delivery, YouTube API and playback, production
TLS / reverse proxy, the Docker images themselves (built and scanned by the release workflow), and visual layout
beyond what axe can detect. Screen-reader behaviour is approximated by axe rules and role/name assertions only.

## Releases

`.github/workflows/release.yml` runs on `v*` tags: builds the API and web images, scans them with Trivy (fails on
CRITICAL, unfixed ignored), generates SPDX SBOMs, pushes to `ghcr.io/<owner>/<repo>/api|web` and creates a GitHub
release with the SBOMs and `scripts/release/docker-compose.prod.yml`. Deployment is a manual `workflow_dispatch`
run with a tag, gated by the `production` environment (secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`,
`DEPLOY_KNOWN_HOSTS`, `DEPLOY_PATH`), which runs `docker compose pull && up -d` over SSH; the API applies migrations
on start (`Database__MigrateOnStartup=true`).
