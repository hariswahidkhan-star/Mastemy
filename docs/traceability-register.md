# Traceability Register

Baseline: `mastemy_prd.docx` v1.0 (Oct 2026), which is not stored in this repository. Override: Master Prompt v3.0
(1 Oct 2026). Code state: v1 + wave 2 + wave 3, backend and frontend. Evidence: tests in `tests/Mastemy.Tests` (real
MySQL) and `e2e/tests` (Playwright against the real API, with Stripe and Anthropic faked), plus the API contracts in
`docs/api-contract*`.

Status values:

- **Implemented**: working UI, backend, persistence, permissions and automated tests exist.
- **Partial**: some of the requirement exists. The note says what is missing.
- **Requires external setup**: the code exists or no code is needed, but the requirement can only be met with
  credentials, real content, people or legal review that this repository cannot supply. See `launch-checklist.md`.
- **Excluded**: deliberately not built. The note gives the reason.

## Change register vs PRD baseline

| Category | Item |
|---|---|
| Retained | 14 subject domains; Student/Instructor/Admin workspaces; catalog; MCQ assessment; commerce with configurable revenue split; certificates; English/Arabic; light/dark |
| Changed | Frontend Vue 3 → React + TypeScript (Vite); SQL Server → MySQL 8; video hosting → YouTube only; paid access → free video + separately priced services; instructor onboarding → built now, gated behind admin flags |
| Added | YouTube Studio + link path; storage-free resumable relay uploader (flagged); channel Modes A/B; video status independent of course approval; onboarding flags with audit; operating-cost model; no-video-blob acceptance tests; published course snapshots; MFA; AI tutor/assist with budgets; trust & safety; observability |
| Excluded | Vue components; SQL Server migrations; article lessons as standalone teaching; non-MCQ graded assignments/labs; secure paid YouTube video access; cloud storage of video source masters |

## §1 Non-negotiable requirements

| Requirement | Status | Notes |
|---|---|---|
| .NET/C# + React/TS + MySQL; no Vue/SQL Server/PostgreSQL/Firebase | Implemented | |
| All teaching is video-based, video plays from YouTube | Implemented | Lessons reference YouTube assets. Resource uploads reject video/audio |
| Scored assessment is MCQ only | Implemented | SingleChoice/MultipleSelect only |
| Student, Instructor, Admin/SuperAdmin workspaces | Implemented | `/me`, `/studio`, `/admin` (+ `/orgs`) |
| Full instructor workflow behind an onboarding switch | Implemented | Flags + invitations + applications |
| Feature matrix vs Udemy/Coursera, no parity claim | Implemented | `feature-matrix.md` |

## §2 YouTube access and commercial design

| Requirement | Status | Notes |
|---|---|---|
| No charge to watch video; no DRM/ad-free promises | Implemented | Playback is never entitlement-checked. Package texts that sell video access are rejected |
| Separate entitlements for video vs premium services | Implemented | Tested in e2e: refund locks premium notes, video stays |
| Disclosure on listings, pricing, checkout | Implemented | `freeVideoNotice` on every price response; notice on course and free-lessons pages |
| Disclosure in instructor contracts | Requires external setup | The agreement mechanism exists (versioned, must be accepted). The text is entered by staff and needs legal review |
| A reviewer assesses the actual package and purchase flow | Requires external setup | Package approval exists. Judging the commercial arrangement against YouTube policy is a human/legal task |
| No forced likes/subscriptions; no view-based rewards or certificates | Implemented | |

## §3 Technical foundation

| Requirement | Status | Notes |
|---|---|---|
| .NET 10, pinned versions, verified MySQL provider | Implemented | Exact npm pins. CI builds and tests on MySQL 8 |
| Component library, design tokens, validated forms, server-state management | Implemented | `src/web/src/components`, `styles/tokens.css`, react-hook-form + zod, TanStack Query |
| Crawlable rendering approach | Implemented | On-demand SSR + hydration. No build-time prerendering |
| Modular monolith with the listed modules | Implemented | Notifications live in the Engagement module |
| Background workers, retries, caching, search, email, PDF certificates | Implemented | Caching is in-memory per instance. Search is SQL over snapshots (FULLTEXT index plan documented below) |
| Host storage abstraction with permissions, quotas, restore-tested backups | Implemented | Drill evidence is on development data (`operations/restore-test-evidence.md`). A production-size drill is a launch item |
| No video masters/MP4 anywhere; bounded temporary buffering | Implemented | Relay keeps one chunk in memory and writes nothing to disk (tested) |
| Audit/migrate existing code/data | Requires external setup | No legacy data was supplied. Migrations are staged EF migrations |
| OpenAPI, env examples, migrations, containerized setup, CI | Implemented | `docs/openapi.json` (drift-checked in CI), `.env.example`, `docker-compose.yml`, `.github/workflows/ci.yml` |
| CD, monitoring | Partial | No deployment pipeline (CD) exists. Health checks, JSON logs and OTLP export exist; the alerting backend must be supplied (`operations/runbook.md`) |

## §4 Public website, discovery, branding

| Requirement | Status | Notes |
|---|---|---|
| Original identity, responsive, light/dark, EN/AR RTL, empty/error/loading states | Implemented | Brand assets are original placeholders. Approved Mastemy assets were not supplied (Requires external setup) |
| Pages: Home, All Courses, Categories, AI Academy, Certification Preparation, Career Paths, Instructors, Free Video Lessons, Learning Packages, Practice MCQs, Notes Library, Teach, Business Training, Help, Articles, About, Contact, Certificate Verification | Implemented | All routes exist. Help, Articles, About and Contact contain only short original copy; real editorial content and support details must be supplied |
| Mega-menu, suggestions, spelling tolerance, sorting, filters (subject, skill, certification, instructor, level, language, duration, freshness, price, rating) | Implemented | `didYouMean`, `/api/search/suggestions`. Price filter does not convert currencies |
| Wishlists, comparison, recently viewed, related, collections | Implemented | |
| Homepage rows incl. editorial Featured and rule-based Bestselling | Implemented | Bestseller rule: ≥ 10 distinct non-staff, non-author buyers in 30 days, refunds/chargebacks excluded. No fabricated numbers |
| Course page fields | Partial | All listed fields are shown from real data. Refund terms are the platform-wide text; per-course refund terms are not modeled |

## §5 Global skills catalog

| Requirement | Status | Notes |
|---|---|---|
| Fourteen subject domains | Implemented | Seeded |
| Academies (AI, Data & Analytics, Cloud, Cybersecurity, HR, Supply Chain, Quality, Sustainability) | Partial | These eight are seeded. "Industry-specific" academies are not seeded but can be added as data (there is no category admin UI; see §20) |
| Many-to-many course/skill/certification | Implemented | Snapshot-safe links |
| Skill pathways (AI finance, project controls, …) | Requires external setup | Pathway model, admin and enrollment exist. No pathway content exists until courses are produced |
| MCQ-assessed wording; no competence claims | Implemented | Skill profile evidence labels, certificate PDF statement |
| Scale to 1,000+ courses; only live courses public; backlog for ideas | Partial | Paging is in SQL, and the backlog and roadmap import exist. Snapshot search uses `LIKE` over JSON; the FULLTEXT index plan below is not yet applied |

## §6 Priority AI course candidates

| Requirement | Status | Notes |
|---|---|---|
| Treat titles as candidates; validate demand etc. | Implemented | `course-roadmap.md`. Backlog states with owner/update-owner gates |
| Curriculum, notes, original MCQs, update owner per selected title | Requires external setup | No course has been produced. This needs subject experts, recording and review |

## §7 Certification-preparation directory

| Requirement | Status | Notes |
|---|---|---|
| States Research Candidate … Retired; kinds exam/qualification/completion award/professional certification | Implemented | |
| Required fields, official source, last checked, reviewer ≠ editor, freshness, replacement links | Implemented | Stale or unreviewed entries are hidden publicly |
| Objective mapping of lessons/questions and coverage gaps | Partial | Lessons and questions map to objectives. Notes and resources are mapped only through their lessons |
| Non-MCQ exam disclosure | Implemented | Required before a verified state |
| Research of the listed issuer families; PCP-AI label resolution; partner-rights checks | Requires external setup | The directory is empty. Each entry must be researched and verified by a human against official sources |

## §8 Course production standard

| Requirement | Status | Notes |
|---|---|---|
| Outcome → content → assessment matrix | Partial | Certification objective coverage reports exist. There is no matrix from course outcomes to lessons and questions; course outcomes are free text |
| Production package, checklist, review gates | Partial | `templates/course-production-checklist.md`, admin course templates and per-course checklists, reviewer approvals with timestamped comments. Scripts, storyboards and similar artifacts are kept outside the system |
| Produced videos, captions, notes, MCQs; subject/answer/editorial/rights review; playback QA | Requires external setup | Needs people and real media |
| AI content stays draft | Implemented | AI MCQs are created as Draft and flagged. Assist output is never saved automatically |

## §9 Instructor studio

| Requirement | Status | Notes |
|---|---|---|
| Applications with profile, expertise evidence, test-video link; review | Implemented | Reviewer decision. No identity-document verification (manual review only) |
| Contracts, payment details, tax fields | Partial | Agreements, encrypted payout profile, IBAN check, tax-form status set by Finance. No tax-form document upload or tax-ID validation. Contract text needs legal review |
| Co-instructors and scoped editors; no credential exposure | Implemented | |
| Guided wizard | Implemented | The "goals" step is guidance only and is not stored |
| Drag-and-drop, bulk, reorder, duplicate, autosave, history, validation, localization, templates, resource library | Implemented | Localization = linked translation variants per language |
| Controlled reuse without changing other published courses | Implemented | Copies are new Draft questions; videos are re-linked only with permission |
| State machine; no self-approval; no deleting published courses with learners | Implemented | |
| Learner preview desktop/mobile, free/premium, no keys | Implemented | |
| Reviewer timestamped video feedback, question comments, resubmission, audit | Implemented | |
| Q&A, announcements, review replies, update notices, analytics, conversion, earnings, refunds, statements, payout requests | Implemented | |
| Moderated instructor–learner messages; welcome/completion messages | Partial | Not implemented. Only public Q&A and announcements exist |

## §10 YouTube publishing

| Requirement | Status | Notes |
|---|---|---|
| 10.1 Configurable Mastemy channel; separate owner/uploader/rights/channel/status fields | Implemented | Channel registered by staff |
| 10.2 Studio + link; validation; manual metadata; reviewable playlist import draft | Implemented | Full validation (channel, privacy, embeddable, processing) needs `YouTube:ApiKey`. Without it, a reviewer confirms links manually |
| 10.3 Flagged relay uploader: bounded chunks, no disk, offset check, fingerprint resume, quota queueing, restart, cancellation | Implemented (code) / Requires external setup (operation) | Tested against a fake upstream, including multi-instance leases. Real use needs OAuth credentials, Google OAuth verification and the YouTube API audit. Bounded memory under concurrent load is not load-tested |
| 10.4 Mode A and Mode B with isolation; disclosure; repair tasks | Implemented | Mode B behind `InstructorOwnedChannelsEnabled` (off). The licence-to-host wording belongs in the instructor agreement (legal review) |
| 10.5 OAuth, scopes, encrypted tokens; upload states; playlists, thumbnails, captions; unverified-project restriction shown; periodic checks; no auto-delete | Implemented | Requires OAuth credentials and an API key to operate. Synthetic-media disclosure is a metadata text field, not a YouTube API flag |
| 10.6 Four onboarding flags, audited, safe defaults, pause applications | Implemented | |
| 10.7 Acceptance: link-only course with no video storage; isolation; full flow; failure cases | Partial | e2e covers the link-only flow end to end, and integration tests cover invalid links, quotas, revocation, restart and reselection. There is no concurrent-relay memory test, and nothing has been run against real YouTube |

## §11 Player and workspace

| Requirement | Status | Notes |
|---|---|---|
| Official IFrame API, nothing over the player, no downloads | Implemented | `youtube-nocookie.com`; plain embed fallback |
| Workspace panels (curriculum, overview, notes, resources, personal notes, MCQs, Q&A, announcements, search) | Implemented | |
| Speed, full screen, keyboard, resume, cross-device | Implemented | Speed and full screen are YouTube player controls |
| Unavailable/embedding errors handled | Implemented | |
| Progress is telemetry; separate from mastery; no view-based certificates | Implemented | |

## §12 Notes, transcripts, resources

| Requirement | Status | Notes |
|---|---|---|
| Separate instructor materials and private learner notes | Implemented | Instructors cannot read learner notes |
| Rich instructor notes (tables, formulas, examples …) | Implemented | Markdown with KaTeX. Diagrams are images |
| Supplementary files (PDF/DOCX/PPTX/spreadsheets/source code) | Partial | pdf, docx, pptx, xlsx, csv, txt, md, images, captions. Source-code files are allowed only as .txt/.md, and archives are rejected |
| Browser reading, authorized downloads, versions, lesson links, transcript search, timestamp navigation | Implemented | Resource tags are not modeled |
| Learner timestamped notes, bookmarks, folders/tags, search, edit, export, sync | Implemented | |
| Printable revision sheets / formula packs | Requires external setup | Content task |

## §13 MCQ model

| Requirement | Status | Notes |
|---|---|---|
| SingleChoice/MultipleSelect; labelled rules | Implemented | |
| Rich stems: formulas, code, images, tables, case exhibits | Implemented | Restricted Markdown |
| Stored attributes (mappings, skill/objective, language, rationales, difficulty, cognitive level, tags, source/rights, version, state) | Partial | No separate "worked solution" field (explanation is used). Reviewer and last-checked date come from review history rather than dedicated question fields |
| Stable option IDs, no-shuffle flag, case groups | Implemented | |
| Draft → Reviewed → Approved → Active → Retired; challenges, revisions | Implemented | Two different reviewers in e2e |
| Item quality (meaningful distractors, verified numerics) | Requires external setup | Editorial review by people |

## §14 Bulk import/export

| Requirement | Status | Notes |
|---|---|---|
| CSV/XLSX templates, JSON schema; create/update modes | Implemented | |
| Mapping, preview, row errors, error report, atomic commit, queued large imports, idempotency | Implemented | |
| Formula safety | Implemented | XLSX formulas are rejected; exports are neutralized |
| Media attachment mapping with malware checks | Implemented | `ImageResource` column; uploads scanned when ClamAV is configured |
| DOCX/PDF extraction | Excluded | Optional in the spec. Not built, to avoid unverified question creation |
| Entitled export only | Implemented | |

## §15 Practice and grading

| Requirement | Status | Notes |
|---|---|---|
| Diagnostic, lesson, module, custom practice, wrong-answer, bookmarked, spaced review, finals, mock forms | Implemented | Real mock forms need real question banks |
| Practice reveal vs exam review point; AI cannot reveal live answers | Implemented | |
| Timed/untimed, navigation, flagging, accommodations, server deadlines, autosave, reconnect, limits, retakes, random forms, deterministic scoring, explicit pause | Implemented | |
| All-or-nothing / partial credit | Implemented | Negative marking is not implemented (the spec allows it only where deliberately required) |
| Reports, difficulty/discrimination with uncertainty (N ≥ 30), readiness disclaimer | Implemented | |
| Exposure rules, regrading with approval/audit/notification | Implemented | |
| Original items only | Requires external setup | Editorial responsibility |

## §16 Student account

| Requirement | Status | Notes |
|---|---|---|
| Onboarding, search, compare, wishlist, free video, purchases, subscriptions, gifts, invoices, refunds, notifications, profile, recovery | Implemented | Invoices need seller details. Recovery needs SMTP |
| Dashboard (continue learning, pathways, premium, goals, notes, practice, weak areas, history, certificates) | Implemented | |
| Study plans, calendar reminders, folders, Q&A, issue reporting, announcements | Implemented | Reminders are in-app plus ICS. No email reminders |
| Controlled learner messaging | Partial | Not implemented |
| One editable review, verified-purchase label, replies, appeals | Implemented | |
| Confidential notes/AI chats; skill evidence types | Implemented | |

## §17 Certificates

| Requirement | Status | Notes |
|---|---|---|
| Assessed awards tied to MCQ thresholds | Implemented | |
| Separate completion awards | Partial | Only assessed certificates are issued. `credentialType` labels courses but issues no completion award |
| Designs, unique id, QR, criteria, revocation, correction, appeal; idempotent issue | Implemented | |
| Consent-aware public verification | Implemented | Owner can hide. Anti-enumeration relies on unguessable codes |
| LinkedIn/profile sharing | Partial | Not implemented (no share action) |
| No fabricated accreditation | Implemented | PDF statement |

## §18 Pricing and earnings

| Requirement | Status | Notes |
|---|---|---|
| Instructor commercial workspace (price, currency, access, contents, coupons, referrals, scholarships, regional prices, offers) | Implemented | Price tiers = staff approval of proposed prices; no fixed tier table |
| Individual, subscriptions, bundles, gifts | Implemented | Requires Stripe |
| Enterprise seats, sponsored access | Partial | Staff set seat limits and orgs grant premium. There is no seat purchase or enterprise billing. Sponsored access = scholarship coupons or org grants |
| Honest reference prices, opt-in promotions, coupon limits, renewal terms, no fake scarcity | Implemented | |
| Orders … PayoutBatches; verified events, idempotency, partial refunds, chargebacks, rounding, reconciliation, invoices/credit notes | Implemented | |
| Commission bases, co-instructor shares, affiliates, taxes, reserves, statements, finance approval (four eyes) | Implemented | Tax rates are entered by an admin, with no built-in rates. Tax treatment needs professional review |
| Supported provider for the actual merchant entity | Requires external setup | Stripe account, merchant country, payout method |

## §19 AI assistance

| Requirement | Status | Notes |
|---|---|---|
| Grounded tutor with citations; premium and exam boundaries; practice MCQs | Implemented | Needs `Ai:ApiKey` |
| Instructor draft assistance; review required | Implemented | |
| Provider abstraction, rate limits, budgets, metering, audit, injection defenses, retrieval isolation, graceful failure | Implemented | The admin dashboard field `aiUsage` is null; AI usage is reported at `/api/admin/ai/usage` |
| No training on private content without permission | Requires external setup | Depends on the provider's data terms; confirm them for the account used |

## §20 Admin, quality operations, enterprise

| Requirement | Status | Notes |
|---|---|---|
| SuperAdmin config and permissions; scoped roles; no self-escalation | Partial | Admin, Reviewer, Moderator and Finance have scoped capabilities. **Support has no specific capability yet** (the role exists but grants nothing beyond Student) |
| Queues: users, instructors, course review, question review, content rights, collections, prices, coupons, refunds, payouts, certificates, reports, AI usage, YouTube status, broken links, overdue updates | Partial | All of these exist. Missing: a category admin (categories are seeded) and a general order/transaction browser (Finance has reconciliation, invoices, disputes and refunds) |
| Audit of privileged changes; takedown, complaints, suspension, archival, access continuity, incident handling | Implemented | `operations/runbook.md` |
| Enterprise orgs, departments, seats, bulk enrollment, due dates, managers, MCQ reporting, isolation | Implemented | |
| Assigned pathways, private non-video org materials, enterprise invoices, SSO/SCIM | Partial | Assignments are per course. Org-private materials, enterprise invoices and SSO/SCIM are not implemented |

## §21 Security, accessibility, localization, SEO

| Requirement | Status | Notes |
|---|---|---|
| Email verification, hashing, rate limits, refresh rotation/revocation, MFA for privileged users, CORS, server authz, safe rich text, upload scanning, secrets | Implemented | Scanning needs ClamAV deployed |
| Secure cookies / CSRF | Partial | Bearer tokens in the Authorization header (not cookies), so classic CSRF does not apply. The refresh token is kept in `localStorage`, which XSS can read; there is no httpOnly-cookie alternative |
| Cross-instructor/org isolation, key leakage, forged attempts, duplicate payouts, SQLi, malicious imports; real MySQL tests | Implemented | |
| Financial records retained alongside data rights | Implemented | |
| WCAG 2.2 AA design | Requires external setup | Semantics and contrast tokens are in place. No assistive-technology audit has been done and no conformance is claimed |
| EN/AR; configurable extra languages; language distinctions; reviewed translations | Partial | Adding a UI language needs a new dictionary in code. Arabic UI strings have not been reviewed by a professional translator |
| Indexable pages, metadata, canonical, sitemap, localized URLs, structured data; private content not indexed | Partial | Course, category, certification, pathway and instructor list pages are server-rendered. Individual instructor pages are not SSR-rendered. The sitemap lists only static, category and course pages. No slug-change redirects |
| Consent-based analytics, email, referral attribution | Implemented | |
| Privacy/consumer/tax/licensing/YouTube obligations reviewed | Requires external setup | Legal review |

## §22 Tests and deliverables

| Requirement | Status | Notes |
|---|---|---|
| Unit, API, MySQL integration, browser, security, payments, imports, media, recovery tests | Implemented | Payments and AI use fakes. No real-YouTube integration run |
| Accessibility testing | Requires external setup | No automated or assistive-technology accessibility tests |
| Required E2E flow | Implemented | `e2e/tests/flow.spec.ts`: onboarding → … → refund → instructor ledger |
| Edge cases listed | Implemented | Spread across integration tests |
| Commercial-boundary test | Implemented | |
| No dead buttons or fake data | Implemented | Per the web README: features without an endpoint are not shown |
| Deliverables: architecture, schema (migrations), API spec, role matrix, feature matrix, templates, manuals, runbooks, cost model, roadmap + 25 briefs | Implemented | Page inventory = route list in `src/web/src/App.tsx`. The revised PRD and source register are not separate documents |
| Reviewed pilot course package | Requires external setup | Needs real approved videos, notes and MCQs |

## Resolved: published content snapshots during course re-review

Status: **Resolved** (wave 2). A course that has ever been published stays live while `Updating`, `InReview`,
`ChangesRequested` or `Approved` (`AccessService.IsLive`); `Archived` is never live. Learners do not see the working copy:

- Every staff publish (`POST /api/admin/courses/{id}/publish`) writes an immutable `CourseSnapshot` with
  `Version = PublishedVersion + 1`. The JSON payload holds course metadata, categories, modules, lessons (incl. video
  asset, YouTube id and duration), free and premium notes, and the notes version. The publish sets
  `Course.PublishedVersion` in the same transaction (`CourseSnapshotService`).
- All public and learner reads of a live course come from the latest snapshot. This covers catalog list/search/detail,
  category counts, `/api/learn/courses/{slug}`, `/api/learn/lessons/{id}`, progress, enrollment and dashboard totals.
  Edits are invisible until the next publish.
- Lessons deleted after a snapshot keep rendering until the next publish. New progress on them returns 409
  `lesson_retired`, because `LessonProgress` has an FK to the working-copy lesson. Deletion is blocked once a published
  course has enrollments.
- Video playback is never gated. The one exception: a snapshot lesson whose `VideoAsset` is no longer `Ready` returns no
  YouTube id and gives a `videoUnavailableReason` instead.
- Search: live courses are prefiltered in SQL with one `LIKE` per term on the latest snapshot's `PayloadJson`. Terms are
  then matched exactly against the snapshot title, subtitle and description, with filters, sort and paging in SQL
  subqueries where possible. Index plan: add a denormalized `CourseSnapshot.SearchText` column with a MySQL `FULLTEXT`
  index, and move level, language and categories into indexed snapshot columns.
- Courses that went live before snapshots existed (`PublishedVersion = 0`) are served from an in-memory build until
  their next publish. A one-off backfill publish is recommended.
- Reviewers and authors have `GET /api/studio/courses/{id}/published-preview` and `GET /api/review/courses/{id}/diff`.
  The audit change log is also available.
