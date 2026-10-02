# Mastemy

Mastemy is a video-learning marketplace for professional skills and certification preparation. Course videos are hosted
only on YouTube and are free to watch. Mastemy sells separate study services: premium notes, advanced MCQ banks, mock
exams, analytics and AI allowances. All scored assessment is multiple choice (SingleChoice / MultipleSelect). Certificates
are issued for approved MCQ achievement, never for watch time.

Status: the codebase implements the platform described in `docs/feature-matrix.md`. No real courses, videos, credentials
or production deployment come with this repository. `docs/launch-checklist.md` lists what the owner still has to do
before launch.

## Architecture in one paragraph

ASP.NET Core (.NET 10, C#) modular monolith (`src/Mastemy.Api`) on MySQL 8 (Pomelo EF Core, utf8mb4). React 19 +
TypeScript + Vite client (`src/web`) with a Node SSR server for public pages, served behind nginx. Modules: Identity,
Account, Catalog (incl. published snapshots), Authoring, Learning, Questions, Assessment, Resources, Commerce, Engagement
(notifications + email outbox), Enterprise, Taxonomy, StudyTools, Analytics, AI, Trust, Operations, SEO and YouTube.
Background workers run inside the API process and are safe with more than one instance. Optional services: ClamAV for
upload scanning, an OTLP collector, SMTP, Stripe, the YouTube Data API and the Anthropic API. Each is off or degraded
until it is configured. See `docs/architecture.md`.

## Quick start

### A. Docker Compose (single host)

```bash
cp .env.example .env            # fill MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, Jwt__Key (>= 32 chars), PUBLIC_BASE_URL,
                                # Seed__SuperAdminEmail / Seed__SuperAdminPassword, Cors__Origins__0
docker compose up -d --build    # db (MySQL 8.4), api, web (nginx + SSR) on http://localhost:8080
docker compose --profile scanning up -d   # optional ClamAV; then set Scanning__ClamAvHost=clamav in .env and restart api
```

Set `Database__MigrateOnStartup=true` (as in `.env.example`) so the API applies migrations on start. Without it, run them
as described in `docs/deployment-runbook.md`.

### B. Local development

Requirements: .NET 10 SDK, Node 22+, MySQL 8.

```bash
# 1. MySQL: the defaults in src/Mastemy.Api/appsettings.Development.json expect
mysql -uroot -p -e "CREATE DATABASE mastemy CHARACTER SET utf8mb4; CREATE USER 'mastemy'@'%' IDENTIFIED BY 'mastemy_dev_pw'; GRANT ALL ON *.* TO 'mastemy'@'%';"
#    (tests create and drop their own databases, so the dev user needs global privileges)

# 2. API on :5080 (Development settings migrate on startup and seed the SuperAdmin)
ASPNETCORE_ENVIRONMENT=Development ASPNETCORE_URLS=http://localhost:5080 dotnet run --project src/Mastemy.Api

# 3. Web client on :5173 (proxies /api to :5080)
cd src/web && npm ci && npm run dev
```

**Seed admin.** When `Seed:SuperAdminEmail` and `Seed:SuperAdminPassword` are set and no user with that email exists,
the API creates an account with the roles SuperAdmin, Admin, Instructor, Reviewer and Student. In Development these are
`admin@mastemy.local` / `ChangeMe!Dev2026`. In production, use a real mailbox and a strong password, then remove the
seed variables.

**MFA note.** `Security:RequireMfaForPrivileged` defaults to `true`. A user holding Admin, SuperAdmin, Finance,
Reviewer or Moderator (the seeded admin included) gets `mfa_enrollment_required` at first sign-in. They receive a
restricted 10-minute token and must enroll a TOTP authenticator before they can do anything else. Store the 10
recovery codes safely. Privileged roles can only be granted to users whose email is verified. Without SMTP, staff
can mark an email verified (`POST /api/admin/users/{id}/email-verification/mark-verified`). For throwaway local
experiments only, you can set `Security__RequireMfaForPrivileged=false`.

Without Stripe, checkout returns `503 payments_not_configured`, except for zero-amount orders. Without a YouTube API
key, video links are recorded but unverified. Without an Anthropic key, AI endpoints return `503 ai_not_configured`.
Without SMTP, no email is sent.

## Tests

| What | Command | Notes |
|---|---|---|
| Backend unit + MySQL integration | `dotnet test Mastemy.slnx` | Needs a local MySQL with user `mastemy` / `mastemy_dev_pw` that can create databases. Tests run against real MySQL, not an in-memory provider. |
| OpenAPI drift | `scripts/export-openapi.sh --check` | Compares the running API's document with `docs/openapi.json` |
| Web lint / types / unit | `cd src/web && npm run lint && npm run typecheck && npm test` | Vitest + Testing Library |
| Web build (client + SSR) | `cd src/web && npm run build` | |
| End-to-end (Playwright) | `e2e/start-api.sh` (fresh DB, fake Stripe, SMTP sink, API :5080), `cd src/web && npm run dev`, then `cd e2e && npm ci && npx playwright test` | Same sequence as `.github/workflows/ci.yml`. Stripe and Anthropic are faked (`e2e/fake-stripe.mjs`, `e2e/fake-anthropic.mjs`). |
| Backup/restore drill | `scripts/restore-test.sh` | Evidence: `docs/operations/restore-test-evidence.md` |

## Configuration reference

ASP.NET Core keys use `:` in JSON and `__` in environment variables (`Stripe:SecretKey` → `Stripe__SecretKey`). Defaults
are the values in code or `appsettings.json`. "—" means empty. A dash means the feature is off or returns 503 until set.
Sources: `src/Mastemy.Api/appsettings*.json`, `.env.example` and the module contracts under `docs/api-contract-wave*/`.

### Core / hosting

| Key | Default | Purpose |
|---|---|---|
| `ConnectionStrings:Default` | — (required) | MySQL connection string |
| `Database:MigrateOnStartup` | `false` (`true` in Development) | Apply EF migrations at start |
| `Seed:SuperAdminEmail`, `Seed:SuperAdminPassword` | — | First SuperAdmin (created only if the email does not exist) |
| `Cors:Origins` (array; `Cors__Origins__0`) | `http://localhost:5173` | Allowed browser origins |
| `DataProtection:KeysPath` | — (in-memory/ephemeral) | Persisted Data Protection keys. They encrypt OAuth tokens, MFA secrets and payout destinations, so set and back up this directory in production |
| `AllowedHosts` | `*` | ASP.NET host filtering |
| `RateLimits:AuthPerMinute` | 20 | Auth endpoints per client per minute |
| `RateLimits:LoginPerEmailPerMinute` | 10 | Login attempts per email per minute |

### Identity & security

| Key | Default | Purpose |
|---|---|---|
| `Jwt:Key` | — (required, ≥ 32 chars) | Access-token signing key |
| `Jwt:Issuer`, `Jwt:Audience` | `mastemy` | Token issuer/audience |
| `Jwt:AccessTokenMinutes` | 15 | Access-token lifetime (revocation takes effect within this window at most, and in practice within seconds because of per-request session validation) |
| `Jwt:RefreshTokenDays` | 14 | Refresh-token lifetime |
| `Security:RequireMfaForPrivileged` | `true` | Enforce TOTP MFA for Admin/SuperAdmin/Finance/Reviewer/Moderator |

### Email (notifications, verification, password reset, invitations)

| Key | Default | Purpose |
|---|---|---|
| `Email:SmtpHost`, `Email:From` | — | Both required for any email to be sent |
| `Email:SmtpPort` | 587 | |
| `Email:Username`, `Email:Password` | — | SMTP credentials |
| `Email:EnableSsl` | `true` | |
| `Email:PublicBaseUrl` | — | Base for links in emails (`/verify-email`, `/reset-password`, invitations) |
| `Email:BatchSize` | 50 | Outbox rows claimed per poll |
| `Email:PollIntervalSeconds` | 10 | Outbox poll interval |
| `Email:RetryBaseSeconds` | 30 | Exponential backoff base (max 6 attempts) |

### Payments & commerce

| Key | Default | Purpose |
|---|---|---|
| `Stripe:SecretKey`, `Stripe:WebhookSecret` | — | Checkout and webhook verification |
| `Stripe:SuccessUrl`, `Stripe:CancelUrl` | `http://localhost:5173/me?checkout=…` | Redirect targets (a redirect is never treated as payment) |
| `Stripe:ApiBaseUrl` | Stripe API | Override for tests/fakes |
| `Commission:InstructorSharePercent` | 70 | Instructor pool share of a sale |
| `Commission:ReferralInstructorSharePercent` | = InstructorSharePercent | Pool share on instructor-referral orders |
| `Commission:SubscriptionPoolPercent` | = InstructorSharePercent | Share of subscription revenue allocated to courses |
| `Commerce:RefundWindowDays` | 30 | Learner refund-request window, earnings clearing period |
| `Commerce:InstructorCouponMaxPercent` | 50 | Instructor coupon cap |
| `Commerce:CouponReservationMinutes` | 60 | Pending-order coupon reservation |
| `Commerce:PromotionMaxPercent` | 70 | Max discount for staff promotions |
| `Commerce:AffiliateMaxPercent` | 30 | Max affiliate commission |
| `Commerce:BackgroundJobsEnabled` | `true` | Commerce job (grace expiry, pool allocation) |
| `Commerce:JobIntervalMinutes` | 60 | |
| `Commerce:PoolAllocationDelayDays` | 3 | Days after month end before automatic pool allocation |
| `Subscriptions:GraceDays` | 7 | Access after a failed renewal |
| `Subscriptions:MaxUnitsPerSubscriberPerCourse` | 30 | Pool usage cap |
| `Payouts:MinimumAmount` | 50 | Minimum payout request |
| `Invoice:SellerName`, `Invoice:SellerAddress`, `Invoice:SellerTaxId` | — | Required for invoice/credit-note PDFs (503 otherwise) |
| `Tax:Mode` | `None` | `Inclusive` enables admin-entered tax rates on invoices |

### YouTube

| Key | Default | Purpose |
|---|---|---|
| `YouTube:ApiKey` | — | Metadata validation, playlist import, availability checks |
| `YouTube:OAuthClientId`, `YouTube:OAuthClientSecret`, `YouTube:OAuthRedirectUri` | — | Channel connections, uploads, playlist/thumbnail/caption publishing |
| `YouTube:UploadChunkBytes` | 8388608 | Relay chunk size (rounded to 256 KiB) |
| `YouTube:MaxConcurrentUploadsPerUser` | 2 | |
| `YouTube:UploadLeaseSeconds` | 120 | Cross-instance upload lease |
| `YouTube:MaxCaptionBytes` | 10485760 | Caption push limit |
| `YouTube:RecheckHours` | 24 | Periodic availability re-check interval |
| `YouTube:PlaylistImportMaxItems` | 200 | |
| `YouTube:ApiBaseUrl`, `UploadBaseUrl`, `TokenUrl`, `RevokeUrl`, `AuthorizationUrl`, `OEmbedUrl` | Google endpoints | Overrides for tests |

The feature flags `ExternalInstructorRegistrationEnabled`, `InstructorApplicationsInviteOnly`,
`InstructorOwnedChannelsEnabled` and `YouTubeApiUploadsEnabled` are database settings changed by a SuperAdmin
(`PUT /api/admin/settings/{key}`, audited). They are not configuration keys.

### Resources, scanning, certificates, SEO

| Key | Default | Purpose |
|---|---|---|
| `Resources:RootPath` | `data/resources` | Blob directory (non-video files only) |
| `Resources:MaxFileBytes` | 26214400 (25 MiB) | Per-file limit |
| `Resources:PerCourseQuotaBytes` | 524288000 (500 MiB) | Per-course quota |
| `Resources:TranscriptPerMinute` | 60 | Transcript searches per IP per minute |
| `Scanning:ClamAvHost` | — | clamd host; when set, mode defaults to Required |
| `Scanning:ClamAvPort` | 3310 | |
| `Scanning:Mode` | Required if host set, else Optional | `Required` fails uploads closed when the scanner is down |
| `Scanning:TimeoutSeconds` | 30 | |
| `Scanning:ChunkBytes` | 65536 | Must not exceed clamd `StreamMaxLength` |
| `Certificates:VerifyBaseUrl` | `/verify` | Public verification link/QR base printed on PDFs |
| `Seo:PublicBaseUrl` | — | Canonical origin for sitemap/robots (503 when missing). Compose sets it from `PUBLIC_BASE_URL` |

### Questions, authoring, taxonomy, study tools, trust, operations, analytics

| Key | Default | Purpose |
|---|---|---|
| `Questions:QueuedImportThresholdRows` | 500 | Imports above this are queued |
| `Questions:ImportWorkerPollSeconds` | 2 | |
| `Authoring:RequiredAgreementVersion` | — (latest published) | Instructor agreement required before submission |
| `Taxonomy:CertificationFreshDays` | 180 | Max age of a certification check for public display |
| `Taxonomy:AiAcademySlug` | `ai-academy` | Category used for the homepage AI row |
| `Taxonomy:DailyJobEnabled` / `DailyJobIntervalHours` | `true` / 24 | Bestseller recompute + stale-certification flagging |
| `Taxonomy:BestsellerWindowDays` / `BestsellerMinBuyers` | 30 / 10 | Bestseller rule |
| `Taxonomy:RoadmapPath` | — | Roadmap file for backlog import |
| `StudyTools:RemindersEnabled` | `true` | Study-plan reminder worker |
| `StudyTools:ReminderIntervalMinutes` | 60 | |
| `Trust:ComplaintsPerHourPerIp` | 10 | |
| `Trust:HeldEarningsSweepMinutes` | 10 | Sweep new sales of suspended instructors into held batches |
| `Operations:OutboxDegradedMinutes` | 15 | Readiness degraded threshold |
| `Operations:OverdueContentMonths` | 12 | Overdue-content queue |
| `Analytics:HashSecret` | derived from `Jwt:Key` | Daily-rotating anonymous id key |
| `Analytics:EventsPerMinute` | 120 | Ingest rate limit |
| `Analytics:ContentReviewMonths` | 12 | Dashboard overdue threshold |

### AI (Anthropic)

| Key | Default | Purpose |
|---|---|---|
| `Ai:ApiKey` | — | Empty = all AI features disabled (503 `ai_not_configured`) |
| `Ai:BaseUrl` | `https://api.anthropic.com` | |
| `Ai:Model` | `claude-opus-5-5` | |
| `Ai:Effort` | `medium` | |
| `Ai:RefusalFallback` | `true` | |
| `Ai:TimeoutSeconds` | 300 | |
| `Ai:TutorMaxOutputTokens` / `GenerationMaxOutputTokens` | 4096 / 16000 | |
| `Ai:MaxUserMessageChars` / `MaxAssistInputChars` | 2000 / 60000 | |
| `Ai:HistoryTurns`, `RetrievalTopK`, `RetrievalMinScore`, `ChunkTokens` | 6, 6, 0.5, 800 | Retrieval |
| `Ai:UserMonthlyTokens` / `PremiumUserMonthlyTokens` / `InstructorMonthlyTokens` | 200k / 600k / 2M | Per-user budgets |
| `Ai:OrgMonthlyTokens` / `GlobalMonthlyTokens` | 5M / 200M | Organization and global caps |
| `Ai:PerUserPerMinute` | 10 | |
| `Ai:ConversationRetentionDays` / `PracticeSetHours` | 90 / 24 | |
| `Ai:IndexPollSeconds` / `BackgroundEnabled` | 30 / `true` | Index + retention worker |
| `Ai:StemSimilarityThreshold` | 0.6 | Blocks the tutor from answering live question stems |
| `Ai:Pricing:{model}:{InputPerMTok,OutputPerMTok,CacheReadPerMTok,CacheWritePerMTok}` | built-in table | Cost estimates only (see `docs/operating-cost-model.md`) |

### Observability

| Key | Default | Purpose |
|---|---|---|
| `Logging:Json` | `false` | One JSON object per log line |
| `Logging:LogLevel:*` | Information / Warning for ASP.NET Core | |
| `Otel:Endpoint` | — (off) | OTLP collector |
| `Otel:Protocol` | `grpc` | `grpc` or `http` |
| `Otel:Headers` | — | e.g. `authorization=Bearer …` |
| `Otel:ServiceName` | `mastemy-api` | |
| `Otel:TraceSampleRatio` | 1.0 | |

### Compose / web environment

| Variable | Where | Purpose |
|---|---|---|
| `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD` | compose `db` | Database passwords |
| `PUBLIC_BASE_URL` | compose `web` + `api` (`Seo__PublicBaseUrl`) | Public origin used for canonical URLs, sitemap and SSR |
| `API_INTERNAL_URL` | `web` | SSR → API (compose: `http://api:8080`) |
| `SSR_CACHE_SECONDS` | `web` | SSR HTML cache (default 60) |
| `PORT` | `web` SSR server | Internal SSR port (nginx proxies to it) |
| `VITE_API_BASE_URL` | web build | Absolute API origin. Empty = same-origin `/api` |
| `VITE_SUPPORT_EMAIL` | web build | Contact-page address (none is shown when unset) |

## Documentation

- `docs/architecture.md`: modules, data flow, workers, security model, multi-instance notes
- `docs/feature-matrix.md`, `docs/traceability-register.md`: status of every spec section
- `docs/role-matrix.md`: roles, scopes and MFA requirements
- `docs/manuals/`: student, instructor, admin, finance and organization-admin manuals
- `docs/launch-checklist.md`: owner actions before launch
- `docs/operating-cost-model.md`: running costs (there is no video-hosting bill, but the platform still has costs)
- `docs/deployment-runbook.md`, `docs/operations/runbook.md`, `docs/youtube-operations.md`: operations
- `docs/api-contract.md`, `docs/api-contract-wave2/`, `docs/api-contract-wave3/`, `docs/openapi.json`: API
- `docs/course-roadmap.md`, `templates/`: course roadmap, MCQ import templates, production checklist
