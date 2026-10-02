# Frontend Build Tools: Vite and Module Bundling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0896` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Frontend Build Tools: Vite and Module Bundling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain modules and the role of bundlers
2. Describe Vite's development architecture
3. Produce optimised Vite production builds
4. Configure and optimise a Vite project

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Modules and bundling fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Convert a CommonJS module to ESM; (2) Explain tree-shaking on a sample module
- Common misconception addressed: Assuming tree-shaking removes unused code from CommonJS modules reliably
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | ES modules vs CommonJS | 120 | 7 |
| M01L02 | Why bundlers exist and what they do | 120 | 7 |

### M02 Vite dev server and architecture (MASTEMY-DESIGN 25%)

- Worked applications: (1) Start a Vite dev server and observe HMR; (2) Inspect pre-bundled dependencies
- Common misconception addressed: Believing Vite bundles the whole app during development
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Native ESM dev server and HMR | 120 | 7 |
| M02L02 | Dependency pre-bundling with esbuild | 120 | 7 |

### M03 Production builds with Rollup (MASTEMY-DESIGN 25%)

- Worked applications: (1) Configure manual chunks for a vendor split; (2) Add content hashing for cache busting
- Common misconception addressed: Expecting dev behaviour to match the Rollup production build exactly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Build output, chunks and code splitting | 120 | 7 |
| M03L02 | Asset handling and hashing | 120 | 7 |

### M04 Configuration and optimization (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add a plugin and a path alias; (2) Analyse bundle size and set a budget
- Common misconception addressed: Exposing a server-only secret by prefixing it for client env exposure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Plugins, aliases and env variables | 120 | 7 |
| M04L02 | Performance budgets and analysis | 120 | 7 |

## Integrative case

Set up a Vite build for a TypeScript SPA: migrate modules to ESM, use the native-ESM dev server with HMR, configure Rollup manual chunks and content hashing for production, add a plugin and alias, and analyse the bundle against a size budget.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0896-final-protected | 40 | 48 | yes |
| MST-0896-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modules and bundling fundamentals | 10 |
| Vite dev server and architecture | 10 |
| Production builds with Rollup | 10 |
| Configuration and optimization | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0896-Q0001** (single-answer, Select ONE) During development, how does Vite serve your application modules?

- A. Over native ES modules, transforming files on demand without bundling the whole app **(key)**  
  _Rationale:_ Correct: Vite serves source as native ESM for fast startup and HMR.
- B. By bundling the entire app with Rollup on every change  
  _Rationale:_ Full bundling on each change is what Vite avoids in dev.
- C. By precompiling to a single CommonJS file  
  _Rationale:_ Vite dev uses ESM, not a CommonJS bundle.
- D. By running everything through Babel in the browser  
  _Rationale:_ Vite uses esbuild/native ESM, not in-browser Babel.

**MST-0896-Q0002** (multiple-answer, Select TWO) Which TWO statements about Vite production builds are correct? (Select TWO.)

- A. Production builds are bundled with Rollup **(key)**  
  _Rationale:_ Correct: Vite uses Rollup for optimised production output.
- B. Content hashing in filenames enables long-term caching **(key)**  
  _Rationale:_ Correct: hashed names bust caches only when content changes.
- C. The dev server output is byte-identical to the production bundle  
  _Rationale:_ Dev and prod pipelines differ, so behaviour can diverge.
- D. Code splitting is impossible in Vite  
  _Rationale:_ Rollup supports code splitting and dynamic imports.

**MST-0896-Q0003** (single-answer, Select ONE) In Vite, which environment variables are exposed to client code?

- A. Only those prefixed with VITE_ **(key)**  
  _Rationale:_ Correct: Vite only exposes VITE_-prefixed vars to the client to avoid leaking secrets.
- B. All variables in the .env file  
  _Rationale:_ Unprefixed vars stay server/build-only and are not exposed.
- C. Only variables named SECRET_  
  _Rationale:_ There is no SECRET_ convention; the prefix is VITE_.
- D. None; Vite never exposes env vars  
  _Rationale:_ VITE_-prefixed vars are intentionally exposed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
