# Firebase for App Developers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1466` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://firebase.google.com/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Firebase for App Developers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Firebase services and when to use them
2. Model data and write rules for Firestore and Realtime Database
3. Add Firebase Authentication sign-in
4. Write and deploy Cloud Functions for Firebase
5. Host web apps and deliver content
6. Add Analytics and Crashlytics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Firebase overview (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick services for a chat app; (2) Decide Firestore vs Realtime Database
- Common misconception addressed: Treating Firebase as a single database rather than a platform
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Firebase platform | 48 | 5 |
| M01L02 | Choosing the right service | 48 | 5 |
### M02 Databases and rules (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model users and messages in Firestore; (2) Write a rule so users read only their own data
- Common misconception addressed: Leaving rules open in test mode in production
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Firestore data modeling | 48 | 5 |
| M02L02 | Security rules | 48 | 5 |
### M03 Authentication (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add email and Google sign-in; (2) Protect data using the authenticated uid
- Common misconception addressed: Trusting client-side checks instead of security rules
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sign-in providers | 48 | 5 |
| M03L02 | Managing users and tokens | 48 | 5 |
### M04 Cloud Functions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write an HTTPS callable function; (2) Trigger a function on a Firestore write
- Common misconception addressed: Putting secrets or trusted logic in the client instead of a function
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Writing a function | 48 | 5 |
| M04L02 | Triggers and deployment | 48 | 5 |
### M05 Hosting (MASTEMY-DESIGN 17%)

- Worked applications: (1) Deploy a static site with the CLI; (2) Add a custom domain with SSL
- Common misconception addressed: Assuming Hosting serves dynamic server code by itself
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Deploying a web app | 48 | 5 |
| M05L02 | Caching and custom domains | 48 | 5 |
### M06 Analytics and quality (MASTEMY-DESIGN 17%)

- Worked applications: (1) Log a custom analytics event; (2) Read a Crashlytics crash report
- Common misconception addressed: Shipping without crash reporting or analytics
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Firebase Analytics | 48 | 5 |
| M06L02 | Crashlytics and monitoring | 48 | 5 |

## Integrative case

A developer builds a mobile app backend on Firebase: choose Firestore or Realtime Database, model data and write security rules, add Authentication, deploy Cloud Functions, host the web app, and add analytics and crash reporting, then review the security rules before launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1466-final-protected | 30 | 30 | yes |
| MST-1466-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Firebase overview | 5 |
| Databases and rules | 5 |
| Authentication | 5 |
| Cloud Functions | 5 |
| Hosting | 5 |
| Analytics and quality | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1466-Q0001** (single-answer, Select ONE) A Firestore app lets any client read and write all documents in production. What is the main problem?

- A. Security rules are too permissive and must restrict access **(key)**  
  _Rationale:_ Correct: open rules let anyone read/write data; rules must enforce per-user access.
- B. Firestore cannot store documents  
  _Rationale:_ Firestore is a document database; storing documents is its purpose.
- C. Analytics is disabled  
  _Rationale:_ Analytics is unrelated to the data-access problem.
- D. Hosting is misconfigured  
  _Rationale:_ Hosting serves content and is unrelated to database rules.

**MST-1466-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of Cloud Functions for Firebase? (Select TWO.)

- A. Run trusted server-side logic on a Firestore write trigger **(key)**  
  _Rationale:_ Correct: functions run trusted backend logic in response to events.
- B. Expose an HTTPS callable endpoint for the app **(key)**  
  _Rationale:_ Correct: callable functions give the client a secure backend endpoint.
- C. Store the app's primary user records instead of a database  
  _Rationale:_ Functions are compute, not storage; data belongs in Firestore/RTDB.
- D. Hold secret API keys in client code to avoid functions  
  _Rationale:_ Secrets must stay server-side; putting them in the client leaks them.

**MST-1466-Q0003** (single-answer, Select ONE) Which Firebase service should handle user sign-in with email and Google providers?

- A. Firebase Authentication **(key)**  
  _Rationale:_ Correct: Authentication manages sign-in providers and user identity.
- B. Firebase Hosting  
  _Rationale:_ Hosting serves static content, not sign-in.
- C. Crashlytics  
  _Rationale:_ Crashlytics reports crashes, not authentication.
- D. Cloud Storage for Firebase  
  _Rationale:_ Cloud Storage holds files, not sign-in.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
