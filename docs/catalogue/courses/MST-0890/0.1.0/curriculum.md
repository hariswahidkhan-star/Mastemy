# Progressive Web Apps and Offline Capabilities

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0890` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Progressive Web Apps and Offline Capabilities (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what makes a web app a PWA
2. Build and manage service workers
3. Apply caching strategies with the Cache API
4. Design offline experiences and sync

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 PWA foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a manifest and test installability; (2) Define the app shell and start_url scope
- Common misconception addressed: Thinking a manifest alone makes an app work offline
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The web app manifest and installability | 120 | 7 |
| M01L02 | HTTPS, scope and app shell | 120 | 7 |

### M02 Service workers (MASTEMY-DESIGN 25%)

- Worked applications: (1) Register a service worker and log lifecycle events; (2) Precache the app shell on install
- Common misconception addressed: Assuming an updated service worker takes control without skipWaiting or reload
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lifecycle: install, activate, fetch | 120 | 7 |
| M02L02 | Registration, scope and updates | 120 | 7 |

### M03 Caching strategies (MASTEMY-DESIGN 25%)

- Worked applications: (1) Implement cache-first for assets; (2) Purge old caches on activate
- Common misconception addressed: Serving a stale API response forever with cache-first
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cache API and runtime strategies | 120 | 7 |
| M03L02 | Cache versioning and cleanup | 120 | 7 |

### M04 Offline UX and sync (MASTEMY-DESIGN 25%)

- Worked applications: (1) Show an offline fallback page; (2) Queue a form submission for background sync
- Common misconception addressed: Expecting background sync to fire reliably the instant connectivity returns
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Offline fallbacks and IndexedDB | 120 | 7 |
| M04L02 | Background sync and push notifications | 120 | 7 |

## Integrative case

Turn a notes web app into a PWA: add a manifest and app shell, precache assets in a versioned service worker, serve assets cache-first and notes network-first with a fallback, store drafts in IndexedDB, and queue offline edits for background sync.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0890-final-protected | 40 | 48 | yes |
| MST-0890-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| PWA foundations | 10 |
| Service workers | 10 |
| Caching strategies | 10 |
| Offline UX and sync | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0890-Q0001** (single-answer, Select ONE) A site adds a valid web app manifest but no service worker. Which capability does it still LACK?

- A. Offline access to previously visited pages **(key)**  
  _Rationale:_ Correct: offline support requires a service worker to cache and serve responses.
- B. An install prompt entry via the manifest  
  _Rationale:_ The manifest contributes to installability criteria.
- C. A defined theme color  
  _Rationale:_ The manifest provides theme color.
- D. A home-screen icon  
  _Rationale:_ Icons come from the manifest.

**MST-0890-Q0002** (multiple-answer, Select TWO) Which TWO happen during the service worker lifecycle? (Select TWO.)

- A. The install event is a good place to precache the app shell **(key)**  
  _Rationale:_ Correct: install is used to populate caches.
- B. The activate event is a good place to delete old caches **(key)**  
  _Rationale:_ Correct: activate commonly cleans up previous cache versions.
- C. The fetch event fires before install completes  
  _Rationale:_ fetch handling applies after activation, for controlled clients.
- D. A new worker always controls open pages immediately  
  _Rationale:_ It waits unless skipWaiting and clients.claim are used.

**MST-0890-Q0003** (single-answer, Select ONE) Why is cache-first a poor strategy for a frequently updated news feed API?

- A. It serves stale cached data and may never fetch fresh content **(key)**  
  _Rationale:_ Correct: cache-first prefers the cache, so updates are missed without extra logic.
- B. It cannot be used over HTTPS  
  _Rationale:_ Caching strategies are unrelated to the HTTPS requirement.
- C. It blocks the main thread  
  _Rationale:_ Cache reads do not block the main thread.
- D. It disables the manifest  
  _Rationale:_ Caching strategy has no effect on the manifest.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
