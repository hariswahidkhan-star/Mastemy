# Mastemy Architecture

This document describes the code in `src/Mastemy.Api` and `src/web` as of v1 + wave 2 + wave 3. Endpoint-level detail
lives in `api-contract.md`, `api-contract-wave2/` and `api-contract-wave3/`. Status per requirement is in
`feature-matrix.md` and `traceability-register.md`.

## Stack

| Layer | Choice |
|---|---|
| Backend | ASP.NET Core on .NET 10 (C#), one deployable modular monolith |
| Database | MySQL 8 through the Pomelo EF Core provider. Uses utf8mb4, InnoDB, foreign keys, and `DECIMAL(19,4)` for money. Integration tests run against real MySQL. |
| Frontend | React 19 + TypeScript, Vite, TanStack Query. A Node SSR server (`src/web/server/main.ts`) renders public pages, behind nginx (`deploy/`). |
| Payments | Stripe Checkout and Billing, with signature-verified, idempotent webhooks |
| Video | YouTube only: official IFrame Player for playback, Data API for metadata, OAuth for channel actions |
| AI | Anthropic Messages API behind `IAiProvider` |
| Optional infrastructure | SMTP, ClamAV (`--profile scanning`), OTLP collector |

Vue, SQL Server, PostgreSQL, Firebase and any paid video host, CDN or transcoder are excluded by owner decision.

## Modules (`src/Mastemy.Api/Modules`)

Each module registers its own services, entities, controllers and workers (`ModuleRegistration.cs`). Modules call each
other through services; for example, `AccessService` is the single entitlement/authorship check.

| Module | Responsibility |
|---|---|
| Identity | Registration and login, JWT and rotating refresh tokens (session families), email verification, password reset and change, TOTP MFA with recovery codes, session list and revocation, roles, feature flags, instructor invitations and applications, admin user management, audit log |
| Account | Profile, public instructor profile, learning goals, skill profile with evidence types, data export, account deletion with anonymization |
| Catalog | Categories (14 domains + academies), courses, course state machine, review queue, **published snapshots** (read model), public catalog/search, studio course editing |
| Authoring | Course-team scopes (owner/co-instructor/editor), ETag autosave and notes revisions, change history, duplicate/bulk, templates and checklists, translations, learner preview, instructor agreements |
| Learning | Free video workspace, progress (best-effort telemetry), learner private timestamped notes (tags, search, export), course reviews and instructor replies |
| Questions | MCQ bank (SingleChoice/MultipleSelect), stable option IDs, versions, Draft → Reviewed → Approved → Active → Retired, restricted Markdown, case groups, CSV/XLSX/JSON import (inspect → map → preview → commit, queued for large files), XLSX export, reuse/copy, challenges |
| Assessment | Practice/quiz/exam/diagnostic attempts with server deadlines, forms and shuffling, all-or-nothing or partial credit, accommodations, pause policy, exposure caps, practice sessions, SM-2 spaced review, regrading, item analytics, certificates (templates, PDF, QR, corrections, appeals, revocation flags) |
| Resources | Non-video files and captions on host storage behind `ResourceStorage`: type/magic-byte checks, quotas, versions, premium locking, transcript search, malware scanning hook |
| Commerce | Packages, regional prices, price history, promotions, coupons, scholarships, referrals, affiliates, bundles, gifts, subscriptions, orders/payments, entitlements, refunds (partial), disputes, commission ledger, subscription pool, payout profiles/requests/batches, statements, invoices and credit notes, reconciliation |
| Engagement | Wishlist, recently viewed, compare, related courses, discussions/Q&A, announcements, issue reports, notifications and preferences, **email outbox** |
| Enterprise | Organizations, seats, invitations, members/roles/departments, bulk invite, assignments with due dates, org-granted premium entitlements, progress reports |
| Taxonomy | Skills, certification issuers and directory with verification states, objectives and coverage, pathways, collections, academies, home page rows, bestseller rule, search suggestions, instructor directory, production backlog |
| StudyTools | Study plan with ICS export and reminders, course folders, video bookmarks, continue-learning |
| Analytics | Consent-gated first-party events, instructor course analytics, admin dashboard |
| Ai | Grounded course tutor (SSE), AI practice sets, instructor drafting assistance and MCQ drafts, budgets, rate limits, usage metering |
| Trust | Complaints and takedown holds, instructor suspension with held earnings, moderation appeals, malware scanner (`ClamAvScanner`) |
| Operations | Health checks (`/health/live`, `/health/ready`), correlation ids, JSON logging, OpenTelemetry, broken-link and overdue-content queues |
| Seo | `sitemap.xml`, `robots.txt` |
| YouTube | URL parsing, video assets and status, metadata validation, playlist import, availability re-checks, channels (Mode A/B), OAuth, resumable relay uploader, playlist sync, thumbnails, caption push |

## Data flow (author → publish → learn → assess → pay)

1. An instructor (internal, invited, or an approved applicant once the flags allow it) accepts the current instructor
   agreement. They create a Draft course, by hand, from a template or with the wizard, then add modules and lessons.
2. Each lesson gets a YouTube video reference: a pasted link or ID, a playlist import draft, or the flagged relay
   uploader. The YouTube module validates the format. With an API key it also checks channel, privacy, processing and
   embeddability. Video status is tracked separately from course approval.
3. The instructor writes notes (autosaved with ETags and revisions), uploads resources and captions (scanned), and
   imports MCQs (preview → atomic commit). Questions go through their own review states.
4. Submission → In Review. A reviewer, never the author, approves or requests changes, using the diff against the
   published snapshot. Staff publish.
5. **Publish writes an immutable `CourseSnapshot`.** All public and learner reads of a live course come from the latest
   snapshot, so later edits are invisible until the next publish. Search, the AI index, the sitemap and analytics also
   key off the snapshot.
6. Learners watch free YouTube video. Premium notes, resources, MCQ banks and mocks require an entitlement, which is
   checked server-side on every request. Entitlements come from a purchase, gift, subscription, grant or organization.
7. Attempts are scored on the server against the exact question versions served. Certificates are issued idempotently
   from pass thresholds.
8. Stripe webhooks settle orders, grant entitlements and write commission ledger entries. Refunds, disputes and
   subscription renewals flow through the same ledger, and from there into statements and payouts.

## Published snapshots (read model)

Snapshots, the diff and the preview are described in `traceability-register.md` (section "Resolved: published content
snapshots") and `api-contract-wave2/catalog-snapshots.md`. Taxonomy links (skills, certifications) are time-stamped so
the public sees only links in effect at snapshot time. Courses published before snapshots existed are served from an
in-memory build until their next publish. A backfill publish is recommended.

## Email outbox

`INotificationService.Publish` never sends SMTP inline. When SMTP is configured, it inserts `EmailOutbox` rows in the
same transaction as the in-app notification. Verification, password-reset, invitation, complaint and broken-link emails
use the same outbox. `EmailOutboxWorker` claims rows with `FOR UPDATE SKIP LOCKED` plus a lease and retries with
exponential backoff (6 attempts). `LastError` stores only the exception type and SMTP code.

## Background workers (hosted in the API process)

| Worker | Interval / trigger | Job | Multi-instance behaviour |
|---|---|---|---|
| `EmailOutboxWorker` | `Email:PollIntervalSeconds` | Send queued email | Row claims with SKIP LOCKED + lease: safe |
| `QuestionImportWorker` | `Questions:ImportWorkerPollSeconds` | Commit queued large imports in one transaction | Conditional-update job claims: safe |
| `StudyReminderWorker` | `StudyTools:ReminderIntervalMinutes` | In-app study reminders | Conditional-update session claims: safe |
| `AvailabilityCheckerHostedService` | `YouTube:RecheckHours`, only with an API key | Re-check video status (privacy, embeddable, removed) | Idempotent status updates; duplicate API quota use if several instances run it |
| `OAuthNonceCleanupService` | hourly | Delete expired OAuth state nonces | Idempotent |
| `AiMaintenanceWorker` | `Ai:IndexPollSeconds` | Rebuild the AI index for changed snapshots, drop indexes of non-live courses, delete expired conversations and practice sets | Idempotent. Set `Ai:BackgroundEnabled=false` on secondary nodes to avoid duplicate work |
| `TaxonomyDailyJob` | `Taxonomy:DailyJobIntervalHours` | Recompute bestsellers, flag stale certifications | Replaces its table each run |
| `CommerceJobs` | `Commerce:JobIntervalMinutes` | End subscriptions after grace, allocate the subscription pool after `PoolAllocationDelayDays` | Pool allocation idempotent per (year, month, currency) |
| `HeldEarningsSweeper` | `Trust:HeldEarningsSweepMinutes` | Move new ledger entries of suspended instructors into their held batch | Also runs before every payout-batch creation |

## Server-side rendering and SEO

Nginx serves static assets and proxies `/api` to the API. Public routes are rendered on demand by the SSR server with the
same React Query hooks. The server embeds dehydrated data, and the browser hydrates it. The SSR server caches HTML per URL
for `SSR_CACHE_SECONDS`. Pages carry metadata, canonical and hreflang (English bare URL, Arabic `?lang=ar`), Open Graph,
and `Course`/`Organization` JSON-LD. A rating is included only when real reviews exist. Non-public routes get a
`noindex` empty shell. The API generates `sitemap.xml` and `robots.txt` from live data and `Seo:PublicBaseUrl`. Build-time
prerendering is not implemented.

## YouTube-only video rule

- MySQL stores video references (video ID, channel, owner/uploader/rights fields, status, timestamps), never video bytes.
  Resource uploads reject any video/audio content (`415 video_not_allowed`).
- Playback uses the official IFrame Player API only. There is no proxy, downloader or offline download.
- Producers keep original source files on storage they already control. YouTube is never scraped as a backup.
- The relay uploader (flag `YouTubeApiUploadsEnabled`, off by default) streams bounded chunks (multiples of 256 KiB) to
  YouTube with nothing written to disk. It uses server-held OAuth tokens, verifies the committed offset before a resume,
  and requires the same file (by fingerprint) to be re-selected. A DB lease prevents two instances from streaming the same
  session. Uploads from an unverified Google API project are private-only and are shown as Restricted. See
  `youtube-operations.md`.
- Channel Mode A (Mastemy-managed) and Mode B (instructor-owned, flag `InstructorOwnedChannelsEnabled`) are both modeled.
  Tokens are encrypted and isolated per channel.

## Free video vs paid services (entitlement boundary)

- Playback never checks payment, package expiry, quiz result or checkpoint completion. The learn page has no login wall.
- `AccessService` is the only premium check. It covers premium notes, premium resources, premium assessments and practice
  sessions, and AI premium allowances. It is re-checked on every request, not cached in the client.
- Package, bundle and plan texts that advertise video access are rejected (`package_sells_video_access`). Price
  responses include a free-video notice.
- Learner APIs never return correct options or rationales before the configured review point. The learner preview,
  practice filters, AI retrieval (which never indexes questions) and analytics never expose keys.
- Organization entitlements are reconciled separately. Refunding a purchase never revokes organization, subscription or
  grant entitlements.

## Security model

- **Tokens.** Access tokens last 15 minutes by default (HMAC-SHA256) and carry `amr` (`pwd`/`mfa`) and `sid`.
  Refresh tokens rotate within a session family; reuse of a rotated token revokes the family. On every request,
  `TokenSessionValidator` rejects a validly signed token when the user is suspended or deleted, has lost one of the
  token's roles, or the session has been revoked. Results are cached for 5 seconds and the cache is invalidated
  immediately in-process on revoke, suspend, delete or role change.
- **MFA.** TOTP (RFC 6238) with replay protection and 10 single-use hashed recovery codes. Secrets are encrypted with
  Data Protection. With `Security:RequireMfaForPrivileged=true` (the default), Admin, SuperAdmin, Finance, Reviewer and
  Moderator need an `amr=mfa` token (`MfaEnforcementFilter`). Without MFA they only get a restricted enrollment token.
  Privileged roles can be granted only to verified emails. MFA cannot be disabled while a privileged role is held.
- **Passwords.** ASP.NET Core Identity hasher. Reset tokens are single-use, hashed and valid for 1 hour. Password change
  or reset revokes all sessions. Responses are identical for unknown emails.
- **Authorization.** Policies `Staff` (Admin, SuperAdmin), `SuperAdmin`, `Reviewer`, `Instructor` and `Finance`, plus
  per-resource checks: course team scopes, org Admin/Manager scopes (cross-org access returns 404), owner-only
  notes/AI chats, instructor suspension guard. Role assignment is SuperAdmin-only. See `role-matrix.md`.
- **Abuse controls.** Fixed-window rate limits on auth, per-email login limits, analytics, transcript search, complaints,
  AI, issue reports and announcements. CORS is restricted to `Cors:Origins`.
- **Content safety.** Restricted Markdown (no raw HTML or links in questions), DOMPurify on the client, plain-text user
  content, CSV/XLSX formula neutralization on export and formula rejection on import, XLSX bomb/DTD defenses,
  magic-byte file checks, ClamAV scanning (fail-closed in Required mode).
- **Secrets.** Secrets come from environment variables or the secret store only. OAuth refresh tokens, MFA secrets and
  payout destinations are encrypted with Data Protection keys, so persist and back up `DataProtection:KeysPath`.
  Secrets never appear in logs, exports or bundles.
- **Payments.** Webhook signatures are verified over the raw body, events are deduplicated by event id, amounts are
  checked against the order, and a redirect is never proof of payment. No card data is stored.
- **Audit.** All privileged changes are written to `AuditLogs` (flags, roles, approvals, publishes, refunds, payouts,
  suspensions, complaints, certificate decisions, AI assists, data export/deletion).
- **Data rights.** Users can export their data and delete their account. Financial and audit records are retained, and
  the user is anonymized.

## Multi-instance notes

The API can run as several instances behind a load balancer, with these caveats:

- Safe across instances: email outbox, question import jobs, study reminders, upload chunk leases, OAuth nonces (in
  MySQL), coupon/seat/announcement limits (row locks), idempotent webhooks and pool allocation.
- Per-instance (in-memory): ASP.NET rate limiters (the effective limit is multiplied by the instance count), analytics
  report cache (5 min), token-validation cache (≤ 5 s staleness on other instances after a revoke), SSR HTML cache.
- Shared requirements: one MySQL, one shared `Resources:RootPath` volume, one shared `DataProtection:KeysPath`
  directory. Without the shared key directory, instances cannot decrypt each other's tokens and secrets.
- Background workers run on every instance unless disabled (`Ai:BackgroundEnabled`, `Taxonomy:DailyJobEnabled`,
  `Commerce:BackgroundJobsEnabled`, `StudyTools:RemindersEnabled`). The ones not listed as safe above are idempotent but
  duplicate work.
- Load-tested multi-instance operation has not been demonstrated. The reference deployment is the single-host
  `docker-compose.yml`.
