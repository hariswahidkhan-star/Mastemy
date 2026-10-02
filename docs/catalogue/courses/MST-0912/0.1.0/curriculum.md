# Swift: iOS Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0912` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-PRG-SK-SF-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — Swift: iOS Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Swift language foundations
2. Value and reference types
3. Collections and iteration
4. Protocols and generics
5. Building the UI
6. Data and app structure

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Swift language foundations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Rewrite a force-unwrapped routine using if-let and guard; (2) Trace how type inference assigns types to five declarations
- Common misconception addressed: Treating an implicitly unwrapped optional as always safe
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Variables, constants and type inference | 94 | 6 |
| M01L02 | Optionals and safe unwrapping | 94 | 6 |
| M01L03 | Control flow and functions | 94 | 6 |

### M02 Value and reference types (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model a payment method as an enum with associated values; (2) Decide struct vs class for four app entities
- Common misconception addressed: Assuming a struct copy shares state with the original
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Structs and enums | 94 | 6 |
| M02L02 | Classes and reference semantics | 94 | 6 |
| M02L03 | Properties and methods | 94 | 6 |

### M03 Collections and iteration (MASTEMY-DESIGN 16%)

- Worked applications: (1) Filter and map an order list with closures; (2) Build a word-frequency dictionary from text
- Common misconception addressed: Thinking map mutates the original collection
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Arrays, sets and dictionaries | 93 | 6 |
| M03L02 | Closures and higher-order functions | 93 | 6 |
| M03L03 | Error handling with throws | 93 | 6 |

### M04 Protocols and generics (MASTEMY-DESIGN 18%)

- Worked applications: (1) Define a Drawable protocol with a default method; (2) Write a generic max() over any Comparable
- Common misconception addressed: Confusing protocol conformance with class inheritance
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Protocols and protocol extensions | 93 | 6 |
| M04L02 | Generics and constraints | 93 | 6 |
| M04L03 | Protocol-oriented design | 93 | 6 |

### M05 Building the UI (MASTEMY-DESIGN 18%)

- Worked applications: (1) Compose a profile card from smaller views; (2) Wire a toggle to view state and observe updates
- Common misconception addressed: Mutating state directly instead of through the state property
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Views and view composition | 93 | 6 |
| M05L02 | State, bindings and data flow | 93 | 6 |
| M05L03 | Lists, navigation and forms | 93 | 6 |

### M06 Data and app structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Persist and reload tasks with Codable and a file; (2) Fetch JSON with async/await and decode it
- Common misconception addressed: Blocking the main thread with long-running work
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Codable and persistence | 93 | 6 |
| M06L02 | Concurrency with async/await | 93 | 6 |
| M06L03 | Testing and project organisation | 93 | 6 |

## Integrative case

Build a two-screen iOS task app in Swift: model tasks with structs and enums, persist them with Codable, drive a list and detail view, handle optionals safely, and organise the code into tested types.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0912-final-protected | 30 | 30 | yes |
| MST-0912-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Swift language foundations | 5 |
| Value and reference types | 5 |
| Collections and iteration | 5 |
| Protocols and generics | 5 |
| Building the UI | 5 |
| Data and app structure | 5 |

Minimum reviewed item bank: 570 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0912-Q0001** (single-answer, Select ONE) A variable may hold a value or be nil, and you want to run code only when it has a value. Which Swift construct is designed for this?

- A. Optional binding with if let **(key)**  
  _Rationale:_ Correct: if let (or guard let) safely unwraps an optional and binds the value when present.
- B. A force unwrap with !  
  _Rationale:_ Force unwrapping crashes if the value is nil, so it is not the safe choice.
- C. A global variable  
  _Rationale:_ Scope of storage has nothing to do with safely handling nil.
- D. A for-in loop  
  _Rationale:_ Loops iterate sequences; they do not unwrap a single optional.

**MST-0912-Q0002** (single-answer, Select ONE) You assign one struct value to a new variable and change the new one. What happens to the original struct?

- A. It is unchanged because structs are value types and are copied **(key)**  
  _Rationale:_ Correct: structs have value semantics, so the copy is independent.
- B. It also changes because both share one instance  
  _Rationale:_ That describes reference types such as classes, not structs.
- C. It becomes nil  
  _Rationale:_ Assignment does not nil out the source value.
- D. It throws a runtime error  
  _Rationale:_ Copying a struct is safe and does not throw.

**MST-0912-Q0003** (multiple-answer, Select TWO) Which TWO statements about Swift protocols are correct? (Select TWO)

- A. A protocol can declare required methods and properties without implementing them **(key)**  
  _Rationale:_ Correct: a protocol specifies requirements that conforming types must satisfy.
- B. A protocol extension can provide default method implementations **(key)**  
  _Rationale:_ Correct: protocol extensions supply shared default behaviour.
- C. A type may conform to only one protocol at a time  
  _Rationale:_ A type can conform to many protocols.
- D. Protocols can only be adopted by classes  
  _Rationale:_ Structs and enums can also conform to protocols.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
