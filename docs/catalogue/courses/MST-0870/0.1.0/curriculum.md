# React Hooks, State, and Component Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0870` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use core hooks (useState, useEffect) correctly
2. Model component and application state deliberately
3. Manage effects, cleanup and dependency arrays
4. Share logic with custom hooks
5. Optimise re-renders with memoisation hooks
6. Design component architecture and composition for scale

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Core hooks (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Update state from previous state correctly; (2) Fix a hook called conditionally
- Common misconception addressed: Calling hooks inside conditions or loops
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | useState and state updates | 120 | 7 |
| M01L02 | Rules of hooks | 120 | 7 |

### M02 State modelling (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Lift shared state to a common parent; (2) Model a multi-step form with useReducer
- Common misconception addressed: Duplicating the same state in several components
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Local vs lifted vs global state | 120 | 7 |
| M02L02 | useReducer for complex state | 120 | 7 |

### M03 Effects (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Fetch data with correct dependencies; (2) Cancel a stale request in cleanup
- Common misconception addressed: Omitting dependencies and getting stale closures
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | useEffect and dependencies | 120 | 7 |
| M03L02 | Cleanup and race conditions | 120 | 7 |

### M04 Custom hooks (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Extract useDebouncedValue; (2) Compose data-fetching into a reusable hook
- Common misconception addressed: Putting non-hook logic behind the use prefix or vice versa
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Extracting a custom hook | 120 | 7 |
| M04L02 | Composing hooks | 120 | 7 |

### M05 Performance (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Memoise an expensive computation; (2) Profile and remove an unnecessary re-render
- Common misconception addressed: Wrapping everything in useMemo prematurely
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | useMemo and useCallback | 120 | 7 |
| M05L02 | memo and render profiling | 120 | 7 |

### M06 Component architecture (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Replace prop drilling with composition; (2) Design a reusable component API
- Common misconception addressed: Building god components that do everything
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Composition and prop design | 120 | 7 |
| M06L02 | Boundaries and reuse | 120 | 7 |

## Integrative case

Refactor a tangled feature: separate server and UI state, move side effects into well-scoped effects with correct dependencies and cleanup, extract reusable logic into custom hooks, remove needless re-renders with memoisation, and restructure the components into a composable architecture, explaining each decision.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0870-final-protected | 40 | 50 | yes |
| MST-0870-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Core hooks | 7 |
| State modelling | 7 |
| Effects | 7 |
| Custom hooks | 7 |
| Performance | 6 |
| Component architecture | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0870-Q0001** (single-answer, Select ONE) Why must hooks be called at the top level of a component and not inside conditions or loops?

- A. React relies on a consistent hook call order across renders **(key)**  
  _Rationale:_ Correct: hooks are matched by call order, so the order must be stable every render.
- B. Conditionals make the bundle larger  
  _Rationale:_ Bundle size is unrelated to the rule of hooks.
- C. Loops are not allowed anywhere in React  
  _Rationale:_ Loops are fine in render logic; the rule is specifically about hook calls.
- D. Hooks only work in class components  
  _Rationale:_ Hooks work in function components, not classes.

**MST-0870-Q0002** (single-answer, Select ONE) An effect that fetches data but omits a value it uses from the dependency array will most likely:

- A. Use a stale value from an old render (stale closure) **(key)**  
  _Rationale:_ Correct: omitting a used dependency captures an outdated value from the render it was created in.
- B. Throw a compile-time error  
  _Rationale:_ It is a runtime/logic bug, not a compile error (a linter may warn).
- C. Automatically re-run on every state change anyway  
  _Rationale:_ Omitting the dependency means it will not re-run when that value changes.
- D. Disable the component  
  _Rationale:_ The component still renders; the data just goes stale.

**MST-0870-Q0003** (multiple-answer, Select TWO) Which TWO are appropriate reasons to reach for useMemo or useCallback? (Select TWO.)

- A. Avoid recomputing a genuinely expensive value each render **(key)**  
  _Rationale:_ Correct: useMemo caches an expensive computation between renders.
- B. Keep a stable reference so a memoised child does not re-render **(key)**  
  _Rationale:_ Correct: useCallback stabilises a function reference for memoised children.
- C. Wrap every value and function by default  
  _Rationale:_ Premature memoisation adds complexity and can hurt performance.
- D. Replace the need for correct dependency arrays  
  _Rationale:_ Memoisation hooks do not remove the need for correct dependencies.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
