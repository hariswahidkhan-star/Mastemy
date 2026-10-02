# Vue.js

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1551` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-VJ-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Vue.js (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Vue's reactivity model and declarative rendering
2. Describe components, props, events and the Composition API
3. Explain refs, reactive, computed values and watchers
4. Describe client-side routing and shared application state
5. Explain the single-file component build pipeline and performance practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Vue fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Predict what re-renders when a reactive value changes; (2) Bind a form input two ways with v-model
- Common misconception addressed: Believing mutating a plain object always triggers reactivity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Templates, data binding and directives | 120 | 8 |
| M01L02 | The reactivity system and the component instance | 120 | 8 |

### M02 Components and composition (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pass data down with props and up with events for one widget; (2) Extract shared logic into a reusable composable
- Common misconception addressed: Mutating a prop directly inside a child component
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Props, events and slots | 120 | 8 |
| M02L02 | The Composition API and composables | 120 | 8 |

### M03 Reactivity in depth (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose ref vs reactive for several pieces of state; (2) Replace a watcher with a computed property where appropriate
- Common misconception addressed: Using a watcher for derived values that should be computed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ref vs reactive and computed properties | 120 | 8 |
| M03L02 | Watchers and reactive side effects | 120 | 8 |

### M04 Routing and state (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define routes and a guarded protected route; (2) Move duplicated component state into a shared store
- Common misconception addressed: Putting purely local UI state into a global store
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Vue Router and navigation | 120 | 8 |
| M04L02 | Shared state with a store | 120 | 8 |

### M05 Build, tooling and performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Split a large view into lazily loaded async components; (2) Diagnose an unnecessary re-render in a list
- Common misconception addressed: Assuming every component must be loaded eagerly at startup
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Single-file components and the build toolchain | 120 | 8 |
| M05L02 | Performance: async components and optimisation | 120 | 8 |

## Integrative case

A team rebuilds a dashboard in Vue. Model the reactive state, design a component hierarchy with clear props and events, extract shared logic into composables, add routing with a protected area and a store, then tune the build for lazy loading and justify your structure at review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1551-final-protected | 40 | 40 | yes |
| MST-1551-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vue fundamentals | 8 |
| Components and composition | 8 |
| Reactivity in depth | 8 |
| Routing and state | 8 |
| Build, tooling and performance | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1551-Q0001** (single-answer, Select ONE) A child component receives a value through props and tries to reassign that prop directly. Why is this discouraged in Vue?

- A. Props flow one way from parent to child; the child should emit an event to request a change **(key)**  
  _Rationale:_ Correct: one-way data flow means the child emits an event and the parent owns the update.
- B. Props are faster than events so mutation is fine  
  _Rationale:_ The concern is data-flow direction and predictability, not speed.
- C. Vue has no way to send data to a parent  
  _Rationale:_ Vue sends data upward through emitted events.
- D. Props cannot hold objects  
  _Rationale:_ Props can hold objects; that is unrelated to the anti-pattern.

**MST-1551-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of a computed property rather than a watcher? (Select TWO.)

- A. Deriving a filtered list from a source array and a search term **(key)**  
  _Rationale:_ Correct: a derived value from reactive inputs is a textbook computed property.
- B. Showing a full name built from first and last name fields **(key)**  
  _Rationale:_ Correct: combining reactive fields into a derived string suits a computed property.
- C. Sending an analytics request when a value changes  
  _Rationale:_ A side effect belongs in a watcher, not a computed property.
- D. Persisting a value to local storage on change  
  _Rationale:_ Persisting on change is a side effect, which is a watcher's job.

**MST-1551-Q0003** (single-answer, Select ONE) A large route view slows initial load because it is bundled eagerly. Which Vue technique helps most?

- A. Load the view as an async (lazily loaded) component so it splits into its own chunk **(key)**  
  _Rationale:_ Correct: lazy loading splits the view into a separate chunk fetched on demand, shrinking the initial bundle.
- B. Move all its state into a global store  
  _Rationale:_ Global state does not change what is bundled at startup.
- C. Add more watchers to the view  
  _Rationale:_ Watchers do not reduce bundle size or initial load.
- D. Render the view twice  
  _Rationale:_ Rendering twice increases work, not performance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
