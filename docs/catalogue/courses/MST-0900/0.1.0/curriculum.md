# Frontend Architecture for Large-Scale Learning Platforms

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0900` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Frontend Architecture for Large-Scale Learning Platforms (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the forces and trade-offs that shape large-scale frontend architecture
2. Describe module boundaries, micro-frontends and when they help or hurt
3. Explain state management and data-fetching strategy across a large app
4. Describe rendering strategies and performance budgets for large platforms
5. Explain how design systems, standards and governance sustain large frontends

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Architectural principles at scale (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify the dominant scaling force for a given platform; (2) Weigh two architectures against stated constraints
- Common misconception addressed: Believing one architecture is best regardless of context
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Scale drivers: teams, domains and traffic | 144 | 8 |
| M01L02 | Coupling, cohesion and architectural trade-offs | 144 | 8 |

### M02 Modularity and micro-frontends (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draw team-aligned module boundaries for a platform; (2) Decide whether a feature warrants a separate micro-frontend
- Common misconception addressed: Assuming micro-frontends are always the right answer at scale
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Module boundaries and ownership | 144 | 8 |
| M02L02 | Micro-frontends: composition and costs | 144 | 8 |

### M03 State and data architecture (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify four pieces of state and place each correctly; (2) Choose a caching strategy for frequently read course data
- Common misconception addressed: Putting all state into one global store by default
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Local, shared and server state | 144 | 8 |
| M03L02 | Caching, data fetching and consistency | 144 | 8 |

### M04 Performance and rendering strategy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match three pages to a suitable rendering strategy; (2) Set and defend a performance budget for a dashboard
- Common misconception addressed: Assuming server-side rendering always improves performance
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SSR, CSR, hydration and streaming | 144 | 8 |
| M04L02 | Code splitting, budgets and loading strategy | 144 | 8 |

### M05 Design systems and governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide what belongs in the shared design system vs a product; (2) Draft a lightweight architecture decision record
- Common misconception addressed: Believing governance means blocking all team autonomy
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Design systems and shared components | 144 | 8 |
| M05L02 | Standards, review and architectural governance | 144 | 8 |

## Integrative case

A learning platform grows from one team to eight and performance and consistency are slipping. Define module boundaries and an ownership model, choose state and rendering strategies per surface, set performance budgets, and establish a design system and governance process you can present to engineering leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0900-final-protected | 50 | 50 | yes |
| MST-0900-final-alternate | 50 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architectural principles at scale | 10 |
| Modularity and micro-frontends | 10 |
| State and data architecture | 10 |
| Performance and rendering strategy | 10 |
| Design systems and governance | 10 |

Minimum reviewed item bank: 512 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0900-Q0001** (single-answer, Select ONE) A platform's main pain is that eight teams constantly block each other in one large codebase. Which architectural goal most directly addresses this?

- A. Clear module boundaries aligned to team ownership **(key)**  
  _Rationale:_ Correct: boundaries aligned to ownership let teams work independently and reduce blocking.
- B. Adding more global shared state  
  _Rationale:_ More shared global state increases coupling and blocking, not less.
- C. Rendering every page on the server  
  _Rationale:_ Rendering strategy does not resolve team coordination pain.
- D. Removing the design system  
  _Rationale:_ Removing shared components worsens consistency without helping autonomy.

**MST-0900-Q0002** (multiple-answer, Select TWO) Which TWO are genuine costs of adopting micro-frontends? (Select TWO.)

- A. Operational and integration complexity across independently deployed pieces **(key)**  
  _Rationale:_ Correct: composing independently deployed frontends adds integration and operational overhead.
- B. Risk of duplicated dependencies and larger total payload **(key)**  
  _Rationale:_ Correct: independent bundles can duplicate shared libraries and inflate payload.
- C. They eliminate all need for coordination between teams  
  _Rationale:_ Coordination is still required for shared contracts and shells.
- D. They are always faster for end users  
  _Rationale:_ They can be slower due to duplication and composition cost; speed is not guaranteed.

**MST-0900-Q0003** (single-answer, Select ONE) Course catalogue data is read on almost every page and changes rarely. Which strategy fits best?

- A. Cache it with revalidation so reads are fast and occasional changes still propagate **(key)**  
  _Rationale:_ Correct: caching read-heavy, rarely changing data with revalidation balances speed and freshness.
- B. Refetch it from the server on every render  
  _Rationale:_ Refetching rarely changing data on every render wastes requests and slows pages.
- C. Store it in per-component local state only  
  _Rationale:_ Local state cannot be shared efficiently across many pages.
- D. Never cache any data  
  _Rationale:_ Refusing to cache read-heavy stable data needlessly harms performance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
