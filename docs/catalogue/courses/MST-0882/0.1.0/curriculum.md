# Svelte and SvelteKit Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0882` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Svelte and SvelteKit Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Svelte components and reactivity
2. Build routes and layouts in SvelteKit
3. Load data and handle form actions
4. Configure rendering and deploy SvelteKit

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Svelte fundamentals and reactivity (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a reactive total with $: declarations; (2) Share state with a writable store and $ auto-subscribe
- Common misconception addressed: Expecting a reassignment-free array push to trigger reactivity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Components, props and reactive declarations | 120 | 7 |
| M01L02 | Stores and bindings | 120 | 7 |

### M02 SvelteKit routing and layouts (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create nested layouts with a shared nav; (2) Add a +error page for a route
- Common misconception addressed: Confusing +page.svelte with +page.server.js responsibilities
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | File-based routes and layouts | 120 | 7 |
| M02L02 | Dynamic params and error pages | 120 | 7 |

### M03 Loading data and form actions (MASTEMY-DESIGN 25%)

- Worked applications: (1) Load data in a server load function; (2) Handle a form submit with a named action
- Common misconception addressed: Running server-only secrets in a universal load that also executes on the client
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | load functions (server vs universal) | 120 | 7 |
| M03L02 | Form actions and progressive enhancement | 120 | 7 |

### M04 Rendering, adapters and deployment (MASTEMY-DESIGN 25%)

- Worked applications: (1) Prerender a static route and SSR a dynamic one; (2) Pick an adapter for a target platform
- Common misconception addressed: Assuming prerendered pages can read per-request cookies
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SSR, prerendering and CSR options | 120 | 7 |
| M04L02 | Adapters and environment variables | 120 | 7 |

## Integrative case

Build a SvelteKit blog with an admin area: reactive components and stores, nested layouts, a server load for posts, a form action to create a post with validation, prerendered public pages and an SSR admin dashboard behind auth, deployed with the right adapter.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0882-final-protected | 40 | 48 | yes |
| MST-0882-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Svelte fundamentals and reactivity | 10 |
| SvelteKit routing and layouts | 10 |
| Loading data and form actions | 10 |
| Rendering, adapters and deployment | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0882-Q0001** (single-answer, Select ONE) In Svelte, you call items.push(x) on an array bound in the template, but the view does not update. Why?

- A. Svelte reactivity triggers on assignment, not on in-place mutation **(key)**  
  _Rationale:_ Correct: reassign (items = [...items, x]) or assign items = items to signal the change.
- B. Arrays cannot be reactive in Svelte  
  _Rationale:_ Arrays are reactive when reassigned.
- C. push is not a valid array method  
  _Rationale:_ push is valid; it just does not trigger Svelte's reactivity.
- D. The component must be wrapped in a store  
  _Rationale:_ A store is not required; an assignment suffices.

**MST-0882-Q0002** (multiple-answer, Select TWO) Which TWO statements about SvelteKit load functions are correct? (Select TWO.)

- A. A +page.server.js load runs only on the server **(key)**  
  _Rationale:_ Correct: server load functions never ship to the client.
- B. A universal +page.js load can run on both server and client **(key)**  
  _Rationale:_ Correct: universal loads run in both environments.
- C. Secrets in a universal load are safe because they never reach the browser  
  _Rationale:_ Universal loads run on the client too, so secrets would leak.
- D. load functions cannot return data to the page  
  _Rationale:_ Returning data to the page is their primary purpose.

**MST-0882-Q0003** (single-answer, Select ONE) A route is prerendered at build time. Which operation will NOT work on that page?

- A. Reading a per-request cookie to personalise content **(key)**  
  _Rationale:_ Correct: prerendered output is built once with no request context, so per-request cookies are unavailable.
- B. Rendering static marketing copy  
  _Rationale:_ Static content is exactly what prerendering is for.
- C. Including build-time data  
  _Rationale:_ Build-time data is available during prerendering.
- D. Linking to other routes  
  _Rationale:_ Links work fine on prerendered pages.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
