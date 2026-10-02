# Vue: Complete Progressive Web Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0880` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Vue: Complete Progressive Web Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Vue templates and the reactivity system
2. Build and compose Vue components
3. Implement client-side routing
4. Manage application state with Pinia
5. Integrate asynchronous data
6. Make a Vue app an installable PWA
7. Design offline caching strategies
8. Optimise and ship a production PWA

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Vue fundamentals and reactivity (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a counter with ref and a computed total; (2) Bind a form input with v-model
- Common misconception addressed: Destructuring a reactive object and losing reactivity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Templates, directives and the reactivity system | 120 | 7 |
| M01L02 | ref, reactive and computed | 120 | 7 |

### M02 Components and composition (MASTEMY-DESIGN 12%)

- Worked applications: (1) Pass data down with props and up with emits; (2) Extract shared logic into a composable
- Common misconception addressed: Mutating a prop directly inside a child component
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Props, events and slots | 120 | 7 |
| M02L02 | The Composition API and composables | 120 | 7 |

### M03 Routing with Vue Router (MASTEMY-DESIGN 12%)

- Worked applications: (1) Protect a route with a navigation guard; (2) Lazy-load a route-level component
- Common misconception addressed: Expecting route params to be reactive when read once outside a watcher
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Routes, params and navigation guards | 120 | 7 |
| M03L02 | Lazy loading and nested routes | 120 | 7 |

### M04 State management with Pinia (MASTEMY-DESIGN 12%)

- Worked applications: (1) Model cart state in a Pinia store; (2) Derive a total with a getter
- Common misconception addressed: Assuming Vuex mutation rules still apply to Pinia actions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Stores, state and actions | 120 | 7 |
| M04L02 | Getters and store composition | 120 | 7 |

### M05 Async data and API integration (MASTEMY-DESIGN 12%)

- Worked applications: (1) Fetch and render a list with loading/error states; (2) Wrap an async component in Suspense
- Common misconception addressed: Firing a fetch on every re-render instead of once
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fetching data in setup and Suspense | 120 | 7 |
| M05L02 | Loading, error and caching states | 120 | 7 |

### M06 PWA fundamentals (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add a manifest to make the app installable; (2) Register a service worker and inspect its lifecycle
- Common misconception addressed: Believing a service worker controls the page immediately on first load
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Web app manifest and installability | 120 | 7 |
| M06L02 | The service worker lifecycle | 120 | 7 |

### M07 Offline and caching strategies (MASTEMY-DESIGN 12%)

- Worked applications: (1) Choose cache-first for assets and network-first for API; (2) Queue a failed POST for background sync
- Common misconception addressed: Caching API responses cache-first and serving stale data forever
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Caching strategies (cache-first, network-first) | 120 | 7 |
| M07L02 | Background sync and offline fallback | 120 | 7 |

### M08 Performance and production (MASTEMY-DESIGN 12%)

- Worked applications: (1) Code-split a heavy route to cut initial load; (2) Fix a failing Lighthouse PWA audit
- Common misconception addressed: Assuming a high Lighthouse score guarantees good field performance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Build optimization and code splitting | 120 | 7 |
| M08L02 | Lighthouse, metrics and deployment | 120 | 7 |

## Integrative case

Build an installable Vue shopping PWA: Composition-API components, Pinia cart store, lazy-loaded guarded routes, async product data with loading states, a service worker with cache-first assets and network-first API, offline background sync for orders, and a passing Lighthouse PWA audit.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0880-final-protected | 48 | 60 | yes |
| MST-0880-final-alternate | 48 | 60 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vue fundamentals and reactivity | 6 |
| Components and composition | 6 |
| Routing with Vue Router | 6 |
| State management with Pinia | 6 |
| Async data and API integration | 6 |
| PWA fundamentals | 6 |
| Offline and caching strategies | 6 |
| Performance and production | 6 |

Minimum reviewed item bank: 656 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0880-Q0001** (single-answer, Select ONE) You write const { count } = reactive({ count: 0 }) and later update count. The template bound to the original object does not update. Why?

- A. Destructuring a reactive object yields plain values that lose the reactive connection **(key)**  
  _Rationale:_ Correct: destructuring breaks reactivity; use toRefs or access via the object.
- B. reactive only works with arrays  
  _Rationale:_ reactive works with objects, including this one.
- C. count must be declared with let, not const  
  _Rationale:_ const vs let is irrelevant to reactivity tracking here.
- D. The template must use v-once  
  _Rationale:_ v-once would prevent updates, which is the opposite of the goal.

**MST-0880-Q0002** (multiple-answer, Select TWO) Which TWO caching strategy choices are appropriate for a PWA? (Select TWO.)

- A. Cache-first for hashed static assets **(key)**  
  _Rationale:_ Correct: immutable hashed assets are safe to serve from cache first.
- B. Network-first for frequently changing API data **(key)**  
  _Rationale:_ Correct: network-first keeps dynamic data fresh with a cache fallback.
- C. Cache-first for a stock-price API  
  _Rationale:_ Cache-first would serve stale prices indefinitely.
- D. Never using a service worker for any caching  
  _Rationale:_ That forgoes offline capability entirely.

**MST-0880-Q0003** (single-answer, Select ONE) On a user's very first visit, does a newly registered service worker control the current page load?

- A. No; it installs and activates but controls the page on a later navigation unless it claims clients **(key)**  
  _Rationale:_ Correct: by default the first load is not controlled until the SW claims clients or the page reloads.
- B. Yes, always immediately on first load  
  _Rationale:_ That is not the default lifecycle behaviour.
- C. Only if the page is served over HTTP  
  _Rationale:_ Service workers require HTTPS (or localhost); HTTP would prevent registration.
- D. Only in incognito mode  
  _Rationale:_ Incognito often disables service workers; it does not grant immediate control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
