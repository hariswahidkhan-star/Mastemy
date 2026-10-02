# Kotlin Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1528` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-KF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Kotlin Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Kotlin basics
2. Null safety and control flow
3. Functions and lambdas
4. Classes and objects
5. Collections and functional style
6. Idiomatic Kotlin and interop

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Kotlin basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write and run a program that greets a user; (2) Explore type inference and explicit types in the REPL
- Common misconception addressed: Using var everywhere instead of preferring immutable val
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Setup, the REPL and program entry point | 120 | 6 |
| M01L02 | val/var, types and type inference | 120 | 6 |

### M02 Null safety and control flow (MASTEMY-DESIGN 17%)

- Worked applications: (1) Handle a possibly-missing value with ?. and ?:; (2) Map a status code to a message with a when expression
- Common misconception addressed: Overusing the !! operator and reintroducing null-pointer risk
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Nullable types, safe calls and the Elvis operator | 120 | 6 |
| M02L02 | if/when expressions and ranges | 120 | 6 |

### M03 Functions and lambdas (MASTEMY-DESIGN 17%)

- Worked applications: (1) Call a function using named arguments for clarity; (2) Transform a list with map and filter lambdas
- Common misconception addressed: Forgetting that the last lambda argument can go outside the parentheses
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Functions, default and named arguments | 120 | 6 |
| M03L02 | Lambdas, higher-order functions and extensions | 120 | 6 |

### M04 Classes and objects (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a User with a primary constructor and properties; (2) Use a data class and destructure it
- Common misconception addressed: Writing boilerplate equals/hashCode instead of using a data class
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Classes, constructors and properties | 120 | 6 |
| M04L02 | Data classes, objects and companion objects | 120 | 6 |

### M05 Collections and functional style (MASTEMY-DESIGN 16%)

- Worked applications: (1) Group orders by customer with groupBy; (2) Build a lazy pipeline with a sequence
- Common misconception addressed: Chaining eager collection operations over huge data instead of sequences
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Lists, sets, maps and mutability | 120 | 6 |
| M05L02 | Sequences and collection operations | 120 | 6 |

### M06 Idiomatic Kotlin and interop (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model a result type with a sealed class and when; (2) Run two suspending calls and combine the results
- Common misconception addressed: Treating a coroutine launch as if it blocks the calling thread
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Scope functions, sealed classes and enums | 120 | 6 |
| M06L02 | Coroutines basics and Java interoperability | 120 | 6 |

## Integrative case

Build a command-line task manager in Kotlin: model tasks with data and sealed classes, handle missing input with null-safe operators, transform and group tasks with collection operations, and load data concurrently using a coroutine.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1528-final-protected | 48 | 48 | yes |
| MST-1528-final-alternate | 48 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kotlin basics | 8 |
| Null safety and control flow | 8 |
| Functions and lambdas | 8 |
| Classes and objects | 8 |
| Collections and functional style | 8 |
| Idiomatic Kotlin and interop | 8 |

Minimum reviewed item bank: 492 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1528-Q0001** (single-answer, Select ONE) What does the Elvis operator ?: do in Kotlin?

- A. Provides a default value when the left-hand expression is null **(key)**  
  _Rationale:_ Correct: a ?: b evaluates to a if non-null, otherwise b.
- B. Force-unwraps a nullable value, throwing if null  
  _Rationale:_ That is the !! operator, not ?:.
- C. Declares a nullable type  
  _Rationale:_ A trailing ? on a type declares nullability; ?: supplies a fallback.
- D. Calls a method only if the receiver is null  
  _Rationale:_ The safe-call ?. calls only when non-null; ?: supplies a default.

**MST-1528-Q0002** (multiple-answer, Select ALL that apply) Which statements about Kotlin data classes are correct? (Select TWO)

- A. They auto-generate equals, hashCode and toString from the properties **(key)**  
  _Rationale:_ Correct: the compiler derives these from the primary-constructor properties.
- B. They support destructuring into component variables **(key)**  
  _Rationale:_ Correct: componentN functions enable val (a, b) = obj.
- C. They cannot have any methods  
  _Rationale:_ Data classes can declare additional methods.
- D. Their properties are always mutable  
  _Rationale:_ Properties can be val (immutable) or var.

**MST-1528-Q0003** (single-answer, Select ONE) Why prefer a Kotlin sequence over a plain list for a long chain of transformations on large data?

- A. A sequence evaluates lazily, avoiding intermediate collections at each step **(key)**  
  _Rationale:_ Correct: sequences process elements on demand instead of materialising a new list per operation.
- B. A sequence runs the work on multiple threads automatically  
  _Rationale:_ Sequences are lazy, not automatically parallel.
- C. A sequence guarantees the data is sorted  
  _Rationale:_ Sequences do not sort unless you ask them to.
- D. A sequence makes the collection mutable  
  _Rationale:_ Laziness is unrelated to mutability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
