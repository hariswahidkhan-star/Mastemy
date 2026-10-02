# Android with Jetpack Compose

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1560` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-AJC-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Android with Jetpack Compose (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compose foundations
2. Layout
3. State and recomposition
4. State hoisting
5. Lists
6. ViewModel and architecture
7. Side effects
8. Theming and testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on building Android UIs with Jetpack Compose; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Compose foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a composable that shows text; (2) Contrast declarative Compose with imperative Views
- Common misconception addressed: Calling a composable like a normal function with side effects
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Composable functions | 75 | 5 |
| M01L02 | The declarative mental model | 75 | 5 |

### M02 Layout (MASTEMY-DESIGN 13%)

- Worked applications: (1) Lay out a card with Column and padding; (2) Order modifiers to change behaviour
- Common misconception addressed: Expecting modifier order not to matter
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Column, Row and Box | 75 | 5 |
| M02L02 | Modifiers and arrangement | 75 | 5 |

### M03 State and recomposition (MASTEMY-DESIGN 12%)

- Worked applications: (1) Hold local UI state with remember; (2) Explain why a state change recomposes
- Common misconception addressed: Storing state in a plain variable that resets on recomposition
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | remember and mutableStateOf | 75 | 5 |
| M03L02 | How recomposition works | 75 | 5 |

### M04 State hoisting (MASTEMY-DESIGN 13%)

- Worked applications: (1) Hoist state so a composable is reusable; (2) Pass value and onValueChange down
- Common misconception addressed: Keeping state low where callers cannot control it
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Stateless vs stateful composables | 75 | 5 |
| M04L02 | Lifting state up | 75 | 5 |

### M05 Lists (MASTEMY-DESIGN 12%)

- Worked applications: (1) Render a list with LazyColumn and keys; (2) Add a click handler to a list item
- Common misconception addressed: Omitting stable keys and losing scroll/state
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | LazyColumn and keys | 75 | 5 |
| M05L02 | Item layouts and performance | 75 | 5 |

### M06 ViewModel and architecture (MASTEMY-DESIGN 13%)

- Worked applications: (1) Expose state from a ViewModel to the UI; (2) Send user events up to the ViewModel
- Common misconception addressed: Putting business logic inside composables
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | ViewModel and UI state | 75 | 5 |
| M06L02 | Unidirectional data flow | 75 | 5 |

### M07 Side effects (MASTEMY-DESIGN 12%)

- Worked applications: (1) Load data once with LaunchedEffect; (2) Scope a coroutine to a composable
- Common misconception addressed: Launching a network call directly in the composable body
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | LaunchedEffect and rememberCoroutineScope | 75 | 5 |
| M07L02 | Lifecycle-aware effects | 75 | 5 |

### M08 Theming and testing (MASTEMY-DESIGN 12%)

- Worked applications: (1) Apply a Material theme and colours; (2) Write a Compose UI test
- Common misconception addressed: Hardcoding colours instead of using the theme
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Material theming | 75 | 5 |
| M08L02 | Testing composables and previews | 75 | 5 |

## Integrative case

Build an Android notes screen with Jetpack Compose: model UI state, hoist state out of composables, drive the list from a ViewModel, handle a text input and a click, and ensure the UI survives configuration changes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1560-final-protected | 40 | 40 | yes |
| MST-1560-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Compose foundations | 5 |
| Layout | 5 |
| State and recomposition | 5 |
| State hoisting | 5 |
| Lists | 5 |
| ViewModel and architecture | 5 |
| Side effects | 5 |
| Theming and testing | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1560-Q0001** (single-answer, Select ONE) Why must local UI state in a composable be wrapped in remember { mutableStateOf(...) }?

- A. remember keeps the state across recompositions instead of resetting each time **(key)**  
  _Rationale:_ Correct: without remember the value is re-initialised on every recomposition.
- B. mutableStateOf starts a background thread  
  _Rationale:_ It does not; it creates observable state.
- C. It is required to compile any composable  
  _Rationale:_ Composables compile without state.
- D. It renders the UI to XML  
  _Rationale:_ Compose does not use XML layouts.

**MST-1560-Q0002** (single-answer, Select ONE) What is the benefit of 'state hoisting' in Compose?

- A. It makes a composable stateless and reusable by passing value plus an onValueChange callback **(key)**  
  _Rationale:_ Correct: hoisting gives callers control and improves testability/reuse.
- B. It stores state permanently on disk  
  _Rationale:_ Hoisting concerns where state lives in the tree, not persistence.
- C. It disables recomposition  
  _Rationale:_ It does not disable recomposition.
- D. It merges all composables into one  
  _Rationale:_ Hoisting does not merge composables.

**MST-1560-Q0003** (multiple-answer, Select ALL that apply) Which practices improve a LazyColumn list in Compose? (Select TWO)

- A. Provide stable keys for items so state and position survive updates **(key)**  
  _Rationale:_ Correct: keys let Compose track items across changes.
- B. Hoist item click handling up via callbacks **(key)**  
  _Rationale:_ Correct: unidirectional flow keeps items reusable and testable.
- C. Render all items eagerly like a plain Column  
  _Rationale:_ False; that defeats the laziness and hurts performance.
- D. Mutate list state directly inside the item composable  
  _Rationale:_ False; events should flow up to the state owner.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
