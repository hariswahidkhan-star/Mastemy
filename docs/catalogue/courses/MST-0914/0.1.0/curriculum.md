# Kotlin: Android Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0914` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-GCP-SK-ADFK-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Kotlin: Android Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Kotlin language for Android
2. Android app structure
3. Building UI with Jetpack Compose
4. Architecture and state
5. Data, networking and persistence
6. Navigation, testing and release

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Kotlin language for Android (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a screen's data with a data class and null safety; (2) Transform a list with map and filter lambdas
- Common misconception addressed: Treating a nullable type the same as a non-null type
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Kotlin syntax, null safety and data classes | 80 | 6 |
| M01L02 | Collections, lambdas and scope functions | 80 | 6 |

### M02 Android app structure (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace an activity through its lifecycle callbacks; (2) Handle a rotation without losing screen state
- Common misconception addressed: Assuming an activity is recreated only when the user leaves it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Activities, the lifecycle and the manifest | 80 | 6 |
| M02L02 | Resources, configuration changes and context | 80 | 6 |

### M03 Building UI with Jetpack Compose (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a screen with Column, Row and remembered state; (2) Render a scrollable list with LazyColumn
- Common misconception addressed: Mutating plain variables and expecting the UI to recompose
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Composables, state and recomposition | 80 | 6 |
| M03L02 | Layout, lists and Material components | 80 | 6 |

### M04 Architecture and state (MASTEMY-DESIGN 17%)

- Worked applications: (1) Hold screen state in a ViewModel that survives rotation; (2) Expose UI state as a StateFlow the screen collects
- Common misconception addressed: Putting long-lived state inside a composable instead of a ViewModel
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ViewModel and UI state | 80 | 6 |
| M04L02 | Unidirectional data flow and StateFlow | 80 | 6 |

### M05 Data, networking and persistence (MASTEMY-DESIGN 16%)

- Worked applications: (1) Call a suspend network function from a ViewModel; (2) Cache results locally and expose them through a repository
- Common misconception addressed: Running network or disk work on the main thread
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Coroutines and suspend functions | 80 | 6 |
| M05L02 | Repositories, Retrofit and Room basics | 80 | 6 |

### M06 Navigation, testing and release (MASTEMY-DESIGN 16%)

- Worked applications: (1) Navigate between two screens and pass an argument; (2) Write a unit test for a ViewModel's state logic
- Common misconception addressed: Shipping a debug build because signing and shrinking were skipped
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Navigation and passing arguments | 80 | 6 |
| M06L02 | Testing and preparing a release build | 80 | 6 |

## Integrative case

Build a two-screen Android notes app in Kotlin with Jetpack Compose: hold state in a ViewModel, load notes through a repository backed by a coroutine, navigate from a list to a detail screen, survive rotation, and prepare a signed release build; then defend the architecture choices.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0914-final-protected | 30 | 30 | yes |
| MST-0914-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kotlin language for Android | 5 |
| Android app structure | 5 |
| Building UI with Jetpack Compose | 5 |
| Architecture and state | 5 |
| Data, networking and persistence | 5 |
| Navigation, testing and release | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0914-Q0001** (single-answer, Select ONE) Why must a network call in Android use a coroutine or background dispatcher rather than running directly on the main thread?

- A. The main thread handles UI; blocking it freezes the app and can trigger an ANR **(key)**  
  _Rationale:_ Correct: long work on the main thread blocks rendering and input, causing Application Not Responding.
- B. The main thread cannot execute Kotlin functions  
  _Rationale:_ It runs Kotlin code; the issue is blocking it, not capability.
- C. Coroutines make HTTP requests faster  
  _Rationale:_ They provide concurrency and cancellation, not raw speed.
- D. Android forbids all I/O in Kotlin  
  _Rationale:_ I/O is allowed; it must just happen off the main thread.

**MST-0914-Q0002** (multiple-answer, Select TWO) Which TWO are true about Kotlin null safety? (Select TWO)

- A. A type must be declared nullable with ? to hold null **(key)**  
  _Rationale:_ Correct: non-null types cannot hold null unless marked with ?.
- B. The safe-call operator ?. returns null instead of throwing when the receiver is null **(key)**  
  _Rationale:_ Correct: ?. short-circuits to null on a null receiver.
- C. The !! operator makes a value safe to use  
  _Rationale:_ !! asserts non-null and throws if the value is null; it is not safe.
- D. All Kotlin types are nullable by default  
  _Rationale:_ Types are non-null by default; nullability is opt-in.

**MST-0914-Q0003** (single-answer, Select ONE) What is the main reason to keep screen state in a ViewModel rather than in a composable?

- A. The ViewModel survives configuration changes like rotation **(key)**  
  _Rationale:_ Correct: a ViewModel outlives recomposition and recreation, so state is not lost on rotation.
- B. Composables cannot hold any state  
  _Rationale:_ They can via remember, but that state is tied to composition lifetime.
- C. ViewModels render UI faster  
  _Rationale:_ ViewModels do not render UI at all.
- D. It avoids writing Kotlin code  
  _Rationale:_ Both require Kotlin; this is about state lifetime.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
