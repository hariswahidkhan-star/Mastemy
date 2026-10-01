# Feature Matrix — Udemy/Coursera Benchmarks vs Mastemy

Benchmarks are drawn from publicly documented Udemy/Coursera workflows as functional references only. No claim of feature parity is made. "Implemented in v1" means targeted by the v1 codebase; confirm against tests before release.

## Implemented in v1

| Benchmark feature | Mastemy v1 |
|---|---|
| Accounts and roles | Registration/login, JWT + refresh, role-based access (Student, Instructor, Reviewer, Moderator, Support, Finance, Admin, SuperAdmin) |
| Platform settings | Feature flags (ExternalInstructorRegistrationEnabled, InstructorApplicationsInviteOnly, InstructorOwnedChannelsEnabled, YouTubeApiUploadsEnabled) with audit log |
| Catalog browsing | Catalog with the 14 subject domains |
| Course creation | Course authoring with state machine Draft → In Review → Changes Requested → Approved → Published → Updating → Archived |
| Video lectures | YouTube link validation and video status tracking (no hosted video) |
| Sections/lectures | Modules and lessons with ordering |
| Lecture resources / learner notes | Instructor notes; learner private timestamped notes |
| Practice tests | MCQ bank (SingleChoice / MultipleSelect) with versions |
| Bulk question import | CSV MCQ import with preview and commit |
| Quizzes / exams | Practice and exam attempts with server-authoritative deadlines |
| Certificates | Certificates with public verification |
| Paid courses / subscriptions | Packages, orders, entitlements; Stripe webhook verification (paid services only, never video) |
| Instructor revenue share | Commission ledger |
| Course review | Admin review queue |
| Localization / theming | English/Arabic with RTL; light/dark |

## Planned

Search with spelling tolerance and filters; mega-menu; wishlists, comparison, recently viewed; ratings and reviews; Q&A and announcements; instructor messaging; XLSX and JSON import UI (JSON schema exists in `templates/`); question review state workflow UI beyond basics; mock-form generation and shuffling policies; partial-credit configuration; spaced review and wrong-answer practice; learner note folders/tags/export; transcript search; playlist import; integrated resumable YouTube uploader (flag off); instructor-owned channels (Mode B); periodic availability checks; coupons, bundles, regional pricing; subscriptions; refunds/chargebacks UI; payouts and statements; invoices; AI tutor and authoring assistance; enterprise workspaces, SSO/SCIM; certification-preparation directory with verification states; analytics dashboards; MFA for privileged users; upload malware scanning; SEO pre-rendering, sitemaps, structured data; notifications preferences; gifts.

## Deliberately excluded

| Benchmark feature | Reason |
|---|---|
| Self-hosted video upload/streaming, video CDN, transcoding | YouTube is the only video host by owner rule |
| Paid/locked video access, DRM | YouTube policies prohibit charging to watch embedded content; unlisted is not secure |
| Offline video downloads | Not permitted with YouTube embeds |
| Ad-free/custom video player | Official IFrame player required; ads/recommendations not controllable |
| Coding exercises, labs, essay/peer-graded assignments, uploaded assignments | Scored assessment is MCQ-only |
| Article-only lessons as standalone teaching | All teaching courses are video-based; text is supporting material |
| Certificates based on watch time or YouTube views | Certificates come from approved MCQ achievement only |
| Rewards for likes/subscribes/shares | Not permitted |
| Instructor payouts tied to YouTube views | Prohibited; earnings come from paid services only |
