# Feature Matrix: Udemy/Coursera Benchmarks vs Mastemy

Benchmarks come from publicly documented Udemy and Coursera workflows and are used only as functional references. No
claim of feature parity is made. Status values have the same meaning as in `traceability-register.md`:
**Implemented**, **Partial** (the note says what is missing), **Requires external setup** (credentials, real content,
people or legal review), **Excluded** (with the reason). Spec section numbers (§) point to the register.

## Accounts, roles, security

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Registration, login, password reset, email verification | Implemented | Reset and verification emails need SMTP. Without SMTP, staff can mark an email verified |
| Two-factor authentication | Implemented | TOTP + recovery codes. Mandatory for Admin, SuperAdmin, Finance, Reviewer and Moderator |
| Session management | Implemented | List and revoke sessions; revocation takes effect immediately |
| Profile, public instructor profile | Implemented | No avatar upload; initials are shown |
| Data export and account deletion | Implemented | Financial and audit records are retained and the user is anonymized |
| Staff roles | Partial | Admin, Reviewer, Moderator, Finance and SuperAdmin are scoped. Support has no capabilities yet (§20) |
| SSO / SCIM | Partial | Not implemented (phased per spec) |

## Discovery and catalog

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Category browsing, mega-menu | Implemented | 14 domains + 8 academies |
| Search with suggestions, typo tolerance, filters, sort | Implemented | |
| Wishlist, compare, recently viewed, related | Implemented | |
| Ratings and reviews | Implemented | One editable review per learner per course, verified-purchase label only when true, instructor replies, moderation appeals |
| Collections, pathways, academies, bestseller row | Implemented | Bestseller follows a documented paid-sales rule |
| Certification-prep directory | Implemented / Requires external setup | Engine and verification states are built. Entries must be researched and verified by people |
| Instructor directory | Implemented | |
| Articles / help content | Requires external setup | Pages exist with a few original articles; real editorial content is needed |

## Learning

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Video lectures | Implemented | YouTube IFrame Player only; video is always free |
| Resume position, cross-device progress | Implemented | |
| Lecture resources and downloads | Implemented | Premium items locked server-side |
| Captions and transcript search | Implemented | Caption files uploaded as resources. Arbitrary YouTube transcripts are not fetched |
| Learner notes with timestamps | Implemented | Tags, search, export |
| Bookmarks, folders, study plan, calendar export, reminders | Implemented | Reminders are in-app only |
| Q&A, announcements | Implemented | |
| Direct instructor–learner messaging | Partial | Not implemented |
| Mobile apps, offline downloads | Excluded | Offline video is not permitted with YouTube embeds. No native apps (responsive web only) |

## Assessment and certificates

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Quizzes, practice tests, timed exams | Implemented | Server-authoritative deadlines, accommodations, pause policy |
| Custom practice, wrong-answer review, spaced repetition | Implemented | |
| Bulk question import | Implemented | CSV/XLSX/JSON with mapping, preview and queued commit |
| Question review workflow, challenges, regrading | Implemented | |
| Item analytics | Implemented | Only with N ≥ 30 |
| Certificates with verification | Implemented | PDF + QR, templates, corrections, appeals, revocation |
| Completion certificates (non-assessed) | Partial | Not issued; only MCQ-assessed certificates |
| LinkedIn sharing | Partial | Not implemented |
| Coding exercises, labs, essays, peer review, uploaded assignments | Excluded | Scored assessment is MCQ-only by owner rule |
| Certificates based on watch time | Excluded | Certificates come from approved MCQ achievement only |

## Instructor tools

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Instructor application / onboarding | Implemented | Behind flags. Closed by default; invitations available |
| Course builder: sections, lectures, drag-and-drop, bulk, duplicate, autosave, history, templates, wizard | Implemented | |
| Co-instructors and editors | Implemented | |
| Course review and publishing | Implemented | Snapshot-based; learners never see unpublished edits |
| Learner preview | Implemented | |
| Playlist import, YouTube publishing (playlist sync, thumbnails, captions) | Requires external setup | Built. Needs a YouTube API key and OAuth |
| Integrated uploader | Requires external setup | Built behind `YouTubeApiUploadsEnabled`. Needs OAuth verification and the YouTube API audit |
| Course analytics, conversion | Implemented | Conversion uses consented analytics only |
| AI drafting assistance | Requires external setup | Built. Needs an Anthropic API key |
| Pricing, coupons, referrals, regional prices, promotions | Implemented | Staff approve regional prices and scholarship coupons |
| Earnings, statements, payout requests | Implemented | Payouts are recorded and approved in Mastemy. The money transfer itself is made outside Mastemy |
| Welcome / completion messages | Partial | Not implemented |

## Commerce

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Paid packages (study services only) | Implemented / Requires external setup | Needs Stripe credentials |
| Subscriptions | Implemented / Requires external setup | Stripe Billing |
| Bundles, gifts, coupons | Implemented | |
| Refunds, chargebacks | Implemented | Partial refunds, credit notes |
| Invoices and credit notes | Implemented / Requires external setup | Needs seller name, address and tax id, plus a tax review |
| Paid video access | Excluded | YouTube policies prohibit charging to watch embedded content |
| Instructor payouts from video views | Excluded | Prohibited. Earnings come from paid services only |

## Business / enterprise

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Organizations, seats, invitations, departments, managers | Implemented | |
| Assignments with due dates, progress reports, CSV | Implemented | |
| Org-granted premium access | Implemented | |
| Seat purchasing, enterprise invoicing | Partial | Not implemented; staff set seat limits |
| Assigned pathways, org-private materials | Partial | Not implemented; assignments are per course |
| Confidential corporate video | Excluded | Public or unlisted YouTube video is not secure |

## AI

| Benchmark feature | Status | Mastemy |
|---|---|---|
| Course tutor / coach | Implemented / Requires external setup | Grounded in published course text with citations. Blocked during exams. Needs `Ai:ApiKey` |
| AI practice questions | Implemented / Requires external setup | Unscored, never recorded as attempts |

## Platform

| Benchmark feature | Status | Mastemy |
|---|---|---|
| English/Arabic, RTL, light/dark | Implemented | Arabic strings not professionally reviewed |
| SEO (SSR, sitemap, structured data) | Partial | No build-time prerender. Instructor detail pages not SSR-rendered. Sitemap covers static, category and course pages |
| Accessibility | Requires external setup | Accessible components; no assistive-technology audit |
| Trust & safety (complaints, takedowns, suspension) | Implemented | |
| Malware scanning | Implemented / Requires external setup | ClamAV container must be deployed |
| Monitoring | Implemented / Requires external setup | Health checks + OTLP; a backend must be chosen |
| Self-hosted video, video CDN, transcoding, DRM, ad-free/custom player | Excluded | YouTube is the only video host by owner rule; the official player is required |
| Article-only lessons as standalone teaching | Excluded | Teaching is video-based; text is supporting material |
| Rewards for likes/subscribes/shares | Excluded | Not permitted |
