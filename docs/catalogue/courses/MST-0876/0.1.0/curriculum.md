# Next.js: Full-Stack React Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0876` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Next.js documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Next.js: Full-Stack React Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure an app with the App Router and routing conventions
2. Use server and client components appropriately
3. Fetch and cache data on the server
4. Build API endpoints and handle mutations
5. Optimize, build and deploy a Next.js application

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Routing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create a nested route with a layout; (2) Add a dynamic route segment
- Common misconception addressed: Mixing incompatible routing conventions in one app
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | App Router and file conventions | 120 | 7 |
| M01L02 | Layouts, pages and nested routes | 120 | 7 |

### M02 Server vs client components (MASTEMY-DESIGN 20%)

- Worked applications: (1) Keep data fetching in a server component; (2) Mark an interactive component as client
- Common misconception addressed: Marking everything a client component unnecessarily
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Server components by default | 120 | 7 |
| M02L02 | When to opt into client components | 120 | 7 |

### M03 Data fetching and caching (MASTEMY-DESIGN 20%)

- Worked applications: (1) Fetch data in a server component; (2) Revalidate cached data on a schedule
- Common misconception addressed: Assuming all fetches are cached forever
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Fetching on the server | 120 | 7 |
| M03L02 | Caching and revalidation | 120 | 7 |

### M04 APIs and mutations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a route handler endpoint; (2) Process a form submission on the server
- Common misconception addressed: Exposing secrets by running server-only code on the client
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Route handlers and APIs | 120 | 7 |
| M04L02 | Handling mutations and forms | 120 | 7 |

### M05 Optimization and deploy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Optimize an image with the framework; (2) Produce and deploy a production build
- Common misconception addressed: Shipping unoptimized assets and large client bundles
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Images, fonts and performance | 120 | 7 |
| M05L02 | Building and deploying | 120 | 7 |

## Integrative case

Build a full-stack Next.js blog with the App Router: nest layouts and dynamic routes, fetch data in server components with revalidation, add a route handler and a server-side form mutation, and optimize images before deploying a production build.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0876-final-protected | 40 | 50 | yes |
| MST-0876-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Routing | 8 |
| Server vs client components | 8 |
| Data fetching and caching | 8 |
| APIs and mutations | 8 |
| Optimization and deploy | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0876-Q0001** (single-answer, Select ONE) In the Next.js App Router, components are by default rendered where?

- A. On the server (server components) **(key)**  
  _Rationale:_ Correct: App Router components are server components unless opted into the client.
- B. Only in the browser  
  _Rationale:_ Client-only is opt-in, not the default.
- C. Never rendered until a user clicks  
  _Rationale:_ Components render as part of the route.
- D. Only at build time with no server  
  _Rationale:_ Server rendering is the default behaviour.

**MST-0876-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to mark a component as a client component? (Select TWO.)

- A. It uses state or effects for interactivity **(key)**  
  _Rationale:_ Correct: hooks like useState/useEffect require a client component.
- B. It attaches browser event handlers **(key)**  
  _Rationale:_ Correct: interactive event handling needs the client.
- C. It only reads data and renders static markup  
  _Rationale:_ Static server rendering suits this; no client needed.
- D. It needs to hide server secrets  
  _Rationale:_ Secrets belong on the server, not the client.

**MST-0876-Q0003** (single-answer, Select ONE) How do you keep cached server data fresh in Next.js?

- A. Configure revalidation for the fetch or route **(key)**  
  _Rationale:_ Correct: revalidation refreshes cached data on a schedule or on demand.
- B. Disable the server entirely  
  _Rationale:_ Disabling the server does not manage caching.
- C. Move every fetch to the client  
  _Rationale:_ Client fetching bypasses but does not solve server caching strategy.
- D. Hardcode the data in the bundle  
  _Rationale:_ Hardcoding prevents updates altogether.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
