# Flutter

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1561` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-F-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Flutter (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Flutter's architecture and the everything-is-a-widget model
2. Describe composing layouts with Flutter's layout widgets
3. Explain stateless vs stateful widgets and managing app state
4. Describe navigation, routing and fetching data
5. Explain building, testing and releasing a Flutter app to multiple platforms

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Flutter fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Break a screen design into a widget tree; (2) Explain how Flutter renders without platform UI widgets
- Common misconception addressed: Believing Flutter wraps native platform UI controls
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Widgets, the widget tree and rendering | 120 | 8 |
| M01L02 | Dart basics for Flutter and the framework layers | 120 | 8 |

### M02 Layout and composition (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a responsive layout from layout widgets; (2) Fix an overflow caused by unbounded constraints
- Common misconception addressed: Assuming a widget can size itself ignoring parent constraints
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rows, columns, flex and constraints | 120 | 8 |
| M02L02 | Composition patterns and responsive layout | 120 | 8 |

### M03 State management (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose stateless vs stateful for several widgets; (2) Lift shared state so two widgets stay in sync
- Common misconception addressed: Calling setState for data that no widget actually displays
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | StatefulWidget, setState and rebuilds | 120 | 8 |
| M03L02 | Lifting state and state-management approaches | 120 | 8 |

### M04 Navigation and data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define routes and pass data between two screens; (2) Render loading, error and data states for a request
- Common misconception addressed: Ignoring loading and error states when fetching data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Navigation, routes and passing arguments | 120 | 8 |
| M04L02 | Async data, futures and loading states | 120 | 8 |

### M05 Build, test and release (MASTEMY-DESIGN 20%)

- Worked applications: (1) Plan a release targeting iOS and Android from one codebase; (2) Write a widget test for a simple screen
- Common misconception addressed: Assuming one platform's behaviour guarantees the other's
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Build targets, flavors and platform differences | 120 | 8 |
| M05L02 | Testing and releasing to the stores | 120 | 8 |

## Integrative case

A team builds a cross-platform app in Flutter. Decompose the main screen into a widget tree, build a responsive layout, choose where state lives and lift it where needed, add navigation and async data with proper loading and error states, then plan testing and a multi-platform release.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1561-final-protected | 40 | 40 | yes |
| MST-1561-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Flutter fundamentals | 8 |
| Layout and composition | 8 |
| State management | 8 |
| Navigation and data | 8 |
| Build, test and release | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1561-Q0001** (single-answer, Select ONE) How does Flutter render its user interface?

- A. It draws its own widgets onto a canvas rather than wrapping native platform controls **(key)**  
  _Rationale:_ Correct: Flutter renders widgets with its own engine, which is why the UI looks consistent across platforms.
- B. It wraps each platform's native UI controls directly  
  _Rationale:_ Flutter does not wrap native controls; it draws its own.
- C. It outputs HTML and CSS for every platform  
  _Rationale:_ Flutter renders through its engine, not by emitting HTML/CSS to native apps.
- D. It requires a separate UI codebase per platform  
  _Rationale:_ A single widget codebase targets multiple platforms.

**MST-1561-Q0002** (multiple-answer, Select TWO) Which TWO situations call for a StatefulWidget rather than a StatelessWidget? (Select TWO.)

- A. A counter whose displayed value changes when tapped **(key)**  
  _Rationale:_ Correct: mutable UI state that changes over the widget's life needs a StatefulWidget.
- B. A form field that tracks and updates its own input **(key)**  
  _Rationale:_ Correct: tracking changing input over time requires state.
- C. A label that always shows a fixed string  
  _Rationale:_ A fixed label has no changing state and can be stateless.
- D. An icon that never changes  
  _Rationale:_ An unchanging icon needs no state.

**MST-1561-Q0003** (single-answer, Select ONE) A screen fetches data from the network. What must the UI handle besides the success case?

- A. The loading and error states while and if the request fails **(key)**  
  _Rationale:_ Correct: robust async UIs render loading and error states, not only the success case.
- B. Nothing; the data always arrives instantly  
  _Rationale:_ Network requests take time and can fail, so other states are required.
- C. Only the error state, never loading  
  _Rationale:_ Loading must be shown too while the request is in flight.
- D. Only a blank screen until done  
  _Rationale:_ A blank screen gives no feedback and hides errors.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
