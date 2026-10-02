# Dart and Flutter: Cross-Platform Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0915` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs |  |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Dart and Flutter: Cross-Platform Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Dart language foundations
2. Flutter widgets and layout
3. State management
4. Navigation and routing
5. Data and networking
6. Cross-platform polish and release

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Dart language foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model data with a class and null-safe fields; (2) Await a Future and handle its error
- Common misconception addressed: Ignoring Dart's sound null safety and hitting null errors at runtime
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Dart types, null safety and functions | 80 | 6 |
| M01L02 | Classes, futures and async basics | 80 | 6 |

### M02 Flutter widgets and layout (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compose a screen from Row, Column and Container; (2) Debug an overflow using the constraints model
- Common misconception addressed: Thinking a widget chooses its own size independent of parent constraints
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Stateless vs stateful widgets | 80 | 6 |
| M02L02 | Layout widgets, constraints and the tree | 80 | 6 |

### M03 State management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Update a counter with setState in a stateful widget; (2) Lift shared state above two sibling widgets
- Common misconception addressed: Calling setState after the widget is disposed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | setState and local state | 80 | 6 |
| M03L02 | Lifting state and provider-style patterns | 80 | 6 |

### M04 Navigation and routing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Push a detail route and pass an argument; (2) Return a result from a screen to its caller
- Common misconception addressed: Leaking routes by never popping pushed screens
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Navigator, routes and arguments | 80 | 6 |
| M04L02 | Named routes and returning results | 80 | 6 |

### M05 Data and networking (MASTEMY-DESIGN 16%)

- Worked applications: (1) Fetch JSON with http and decode into a model; (2) Drive a FutureBuilder through loading and error
- Common misconception addressed: Rebuilding a future inside build and refetching on every frame
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | HTTP requests and JSON decoding | 80 | 6 |
| M05L02 | FutureBuilder and loading states | 80 | 6 |

### M06 Cross-platform polish and release (MASTEMY-DESIGN 16%)

- Worked applications: (1) Make a layout adapt between phone and tablet widths; (2) Write a widget test and build a release artifact
- Common misconception addressed: Assuming one layout fits every screen size and platform
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Adaptive layout and platform differences | 80 | 6 |
| M06L02 | Testing and building for iOS and Android | 80 | 6 |

## Integrative case

Build a cross-platform weather app in Flutter: fetch and decode forecast JSON, manage loading and error state, navigate from a city list to a detail screen, adapt the layout across phone and tablet, and produce release builds for both iOS and Android; then explain the state and layout decisions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0915-final-protected | 30 | 30 | yes |
| MST-0915-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Dart language foundations | 5 |
| Flutter widgets and layout | 5 |
| State management | 5 |
| Navigation and routing | 5 |
| Data and networking | 5 |
| Cross-platform polish and release | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0915-Q0001** (single-answer, Select ONE) In Flutter's layout model, how is a widget's size ultimately determined?

- A. Constraints flow down from the parent and the child sizes itself within them **(key)**  
  _Rationale:_ Correct: parents pass constraints down, children choose a size within them, and size flows back up.
- B. Each widget picks its size independently of its parent  
  _Rationale:_ A child must size within the constraints its parent gives.
- C. Sizes are fixed at compile time  
  _Rationale:_ Layout is resolved at runtime based on constraints.
- D. The root widget sets every child's exact pixels  
  _Rationale:_ The root passes constraints; children still choose within them.

**MST-0915-Q0002** (multiple-answer, Select TWO) Which TWO are true about Dart's sound null safety? (Select TWO)

- A. A variable must be declared with ? to hold null **(key)**  
  _Rationale:_ Correct: non-nullable is the default; ? opts a type into null.
- B. The compiler can guarantee a non-nullable variable is never null **(key)**  
  _Rationale:_ Correct: sound null safety lets the compiler rule out null for non-nullable types.
- C. Adding ! removes the possibility of a runtime null error  
  _Rationale:_ ! asserts non-null and throws if the value is actually null.
- D. Null safety only applies to local variables  
  _Rationale:_ It applies across fields, parameters and return types too.

**MST-0915-Q0003** (single-answer, Select ONE) Why should a Future passed to FutureBuilder usually be created outside the build method?

- A. build can run many times, recreating the Future and refetching on each rebuild **(key)**  
  _Rationale:_ Correct: creating it in build triggers a new request on every rebuild; create it once and store it.
- B. FutureBuilder cannot accept a Future created in build  
  _Rationale:_ It can; the problem is repeated recreation.
- C. Futures created in build never complete  
  _Rationale:_ They complete, but a new one starts each rebuild.
- D. It makes the request synchronous  
  _Rationale:_ The request stays asynchronous regardless of where the Future is made.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
