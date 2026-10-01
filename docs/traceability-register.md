# Traceability Register

Baseline: `mastemy_prd.docx` v1.0 (Oct 2026), not stored in this repository. Override: Master Prompt v3.0 (1 Oct 2026). Statuses reflect the v1 build target; verify against tests.

## Change register vs PRD baseline

| Category | Item |
|---|---|
| Retained | 14 subject domains; Student/Instructor/Admin workspaces; course catalog; MCQ assessment; commerce with configurable revenue split; certificates; English/Arabic; light/dark |
| Changed | Frontend Vue 3 → React + TypeScript (Vite); SQL Server → MySQL 8; video hosting → YouTube only; paid access → free video + separately priced services; instructor onboarding → built now, gated behind admin flags |
| Added | YouTube Studio + link publishing path; optional storage-free resumable relay uploader (feature flagged); channel Modes A/B; video status model independent of course approval; onboarding feature flags with audit; operating-cost model; bounded-memory/no-video-blob acceptance criteria; learner private timestamped notes; CSV/JSON MCQ import templates |
| Excluded | Vue components; SQL Server migrations; Article lessons as standalone teaching; non-MCQ graded assignments/labs; secure paid YouTube video access assumptions; required cloud storage of video source masters |

## Requirement → status by spec section

| § | Section | Status | Notes |
|---|---|---|---|
| 1 | Non-negotiable requirements | Implemented v1 | .NET 10 / React / MySQL; MCQ-only; three workspaces |
| 2 | YouTube access and commercial design | Partial | Separate entitlements implemented; listing/checkout disclosure copy to be reviewed |
| 3 | Technical foundation | Partial | Modular monolith, MySQL, Docker; background workers, search, PDF certificates, CI/CD and monitoring incomplete |
| 4 | Public website and branding | Partial | Core pages, EN/AR RTL, light/dark; mega-menu, filters, wishlists planned |
| 5 | Global skills catalog | Partial | 14 domains; academies and pathways planned |
| 6 | Priority AI course candidates | Planned | Roadmap only (`course-roadmap.md`); no course produced |
| 7 | Certification directory | Planned | Verification states not built |
| 8 | Course production standard | Planned | Checklist template exists; no package produced |
| 9 | Instructor studio | Partial | Authoring + state machine; applications, contracts, wizard, drag-drop, autosave planned |
| 10 | YouTube publishing | Partial | Link validation and status tracking; relay uploader, playlist import, Mode B, periodic checks planned |
| 11 | Player and workspace | Partial | IFrame player, notes panel; Q&A, resume sync planned |
| 12 | Notes and resources | Partial | Instructor notes, learner timestamped notes; versions, transcripts, export planned |
| 13 | MCQ model | Implemented v1 | Single/multi, versions, stable option IDs; full review workflow partial |
| 14 | Bulk import/export | Partial | CSV preview/commit; XLSX, JSON UI, export, queued large imports planned |
| 15 | Practice and grading | Partial | Practice/exam attempts with server deadlines; mocks, partial credit, accommodations planned |
| 16 | Student account | Partial | Dashboard basics; wishlists, subscriptions, gifts, reviews planned |
| 17 | Certificates | Implemented v1 | Issue + verification; revocation/appeal workflow planned |
| 18 | Pricing and earnings | Partial | Packages, orders, entitlements, Stripe webhooks, commission ledger; coupons, subscriptions, payouts planned |
| 19 | AI assistance | Planned | |
| 20 | Admin and enterprise | Partial | Review queue, feature flags, audit; enterprise planned |
| 21 | Security, a11y, i18n, SEO | Partial | Auth, server authz, RTL; MFA, scanning, WCAG evidence, SEO planned |
| 22 | Tests and deliverables | Partial | See repository tests; full E2E and acceptance matrix incomplete |
