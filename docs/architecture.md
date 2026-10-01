# Mastemy Architecture

Status: design reference for the v1 codebase (`src/Mastemy.Api`, `src/web`). Where this document describes behavior, check the code and tests for what is actually implemented; see `feature-matrix.md` and `traceability-register.md` for status.

## Stack

| Layer | Choice |
|---|---|
| Backend | ASP.NET Core on .NET 10 (C#), single deployable (modular monolith) |
| Frontend | React + TypeScript, built with Vite (`src/web`) |
| Database | MySQL 8 via Pomelo EF Core provider (utf8mb4, InnoDB, FKs, explicit `DECIMAL(19,4)` for money) |
| Payments | Stripe (server-side webhook signature verification) |
| Video | YouTube only (official IFrame Player; Data API for metadata/optional uploads) |

Vue, SQL Server, PostgreSQL, Firebase and any paid video host/CDN/transcoder are out of scope by owner decision.

## Modules

Each module owns its entities, services and endpoints. Cross-module calls go through service interfaces, not direct table access from another module.

| Module | Responsibility |
|---|---|
| Identity | Users, roles, JWT auth, refresh tokens, platform feature flags with audited changes |
| Catalog | 14 subject domains, academies, skills, certifications (many-to-many), public listings |
| Authoring | Courses, modules, lessons, instructor notes, course state machine (Draft → In Review → Changes Requested → Approved → Published → Updating → Archived) |
| Learning | Free video playback workspace, progress (best-effort telemetry), learner private timestamped notes |
| Questions | MCQ bank (SingleChoice / MultipleSelect), stable option IDs, versions, question state machine, CSV/JSON import with preview/commit |
| Assessment | Practice and exam attempts, server-authoritative deadlines, deterministic scoring, certificates and public verification |
| Commerce | Packages, orders, payments, entitlements, refunds, commission ledger, payouts |
| YouTube publishing | Video references, link validation, video status tracking, channel records, optional resumable relay uploader |
| Notifications | Email/in-app messages, opt-in preferences |
| AI | Provider abstraction for tutor/drafting assistance (planned; never alters payments, roles, approvals or certificates) |
| Analytics | Course/learner/financial reporting, consent-aware |

## Data flow (author → publish → learn → assess)

1. Instructor creates a Draft course, modules and lessons; attaches a YouTube video reference per lesson (link or video ID).
2. YouTube module validates URL format, extracts video ID, and (when an API key is configured) checks channel, privacy status, processing and embeddability. Without an API key, manual metadata entry is permitted and the video stays unverified until checked.
3. Instructor writes notes and imports MCQs (preview → commit, atomic).
4. Course submitted → In Review. A reviewer approves or requests changes. Instructors cannot self-approve.
5. Admin publishes. Course approval and video status are tracked independently; a lesson whose video is not Ready (e.g. private-only) is not learner-ready.
6. Learner watches free YouTube video in the workspace; premium notes/MCQ banks/mocks require a paid entitlement checked server-side.
7. Attempts are scored on the server against the exact question versions served; certificates issue idempotently from approved MCQ thresholds.
8. Stripe webhook (signature-verified, idempotent by event ID) settles orders, grants entitlements and writes commission ledger entries.

## YouTube-only video rule

- MySQL stores video references (video ID, channel ID, owner/uploader/rights fields, status, timestamps), never video bytes.
- No MP4, source master or transcoded variant is stored in the database, application storage, backups or any bucket. No hidden cache directory.
- Playback uses the official YouTube IFrame Player API only. No proxy, downloader, extracted stream URL or offline download.
- Producers keep original source files locally or in storage they already control; these are needed for re-upload. YouTube videos are never scraped as backup.
- Non-video resources (notes, PDFs, images, caption text masters) live in host storage behind a storage abstraction with permissions and quotas.

## Publishing paths

### Path 1: YouTube Studio + link (launch default, always available)
Operator uploads in YouTube Studio → author pastes URL/video ID or imports a playlist → Mastemy validates and records → reviewer approves. Playlist import creates an editable draft (titles, modules, order), never auto-publishes. No video bytes touch Mastemy.

### Path 2: Resumable relay uploader (feature flag `YouTubeApiUploadsEnabled`, off by default)
Design (not to be advertised as operational until credentials, OAuth verification/audit and integration tests are in place):

- Metadata and rights approval happen before transfer; state goes Awaiting Approval → Awaiting Source File → Uploading → Processing → In Content Review → Ready (or Restricted/Failed).
- The server creates a YouTube resumable session with server-held OAuth tokens; the session URI is never sent to the browser and is scoped to the authorized user + channel.
- The browser sends sequential bounded chunks (multiple of 256 KiB, e.g. 8 MiB). The .NET relay streams each chunk to YouTube; nothing is written to disk and only one bounded chunk buffer per upload is held in memory. Concurrent upload count is capped.
- Before any retry/resume, the server queries YouTube for the committed offset (`Content-Range: bytes */total`) and tells the client where to continue.
- After a closed browser, expired app session or dropped connection, the user must re-select the same file; the client sends size + name + a hash of sampled chunks which must match the recorded fingerprint before resuming. Expired YouTube sessions require an explicit restart.
- If quota is exhausted before transfer starts, only the upload intent/metadata is queued; a worker cannot read the user's local file.
- Cancellation deletes in-memory state; nothing to clean on disk. Relay bandwidth is a real cost (see `operating-cost-model.md`).
- Uploads from an unverified API project (created after 28 July 2020) are private-only until audit; status is shown as Restricted, not Ready.

## Channel modes

- Mode A — Mastemy-managed channel: instructors never receive Google passwords, client secrets or tokens. Reviewers control channel actions. Licence to host/publish/retain recorded per instructor.
- Mode B — Instructor-owned channel (flag `InstructorOwnedChannelsEnabled`, off): OAuth per instructor, tokens encrypted and isolated per channel; UI discloses that the owner can delete/restrict videos. Revocation or unavailability creates repair tasks.
- Every course/video records the chosen channel explicitly. One instructor's tokens are never used for another.

## Free video vs paid services

- Video access entitlement and premium-services entitlement are separate records. Playback never checks payment, package expiry, quiz result or checkpoint completion.
- Login is not a disguised paid-video gate. Paid packages cover original study packs, advanced MCQ banks, mock tests, analytics and permitted tutoring.
- Premium notes, MCQ APIs and attempt history are protected server-side. Learner APIs never return correct options or rationales before the configured review point.

## Security model

- JWT access tokens (short-lived) + rotating refresh tokens; role- and ownership-based authorization on every endpoint; no client-side role escalation.
- Strong password hashing (ASP.NET Core Identity hasher); rate limits on auth and import endpoints; restrictive CORS.
- Secrets from environment variables only; OAuth tokens encrypted at rest; never in logs, exports or frontend bundles.
- Stripe webhooks verified by signature and deduplicated by event ID; a redirect is never treated as payment.
- CSV import treats cells as text (no formula execution); exports neutralize leading `= + - @`.
- Audit log for feature-flag changes, approvals, role changes, refunds and other privileged actions.
- Cross-instructor isolation: instructors can only read/write their own courses and questions.
- MFA for privileged users and upload malware scanning are planned, not v1.
