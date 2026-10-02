# Scala Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1529` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-SF-002 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Scala Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scala basics
2. Functions and functional style
3. Collections
4. Pattern matching and ADTs
5. Object-oriented and type features
6. Concurrency and data processing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scala basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Evaluate expressions in the REPL and bind them to vals; (2) Write a method returning a computed value
- Common misconception addressed: Writing statement-heavy code instead of expression-oriented Scala
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Setup, the REPL and running Scala | 120 | 6 |
| M01L02 | val/var, types and expressions | 120 | 6 |

### M02 Functions and functional style (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pass a function as an argument to transform a list; (2) Replace a loop with tail recursion
- Common misconception addressed: Mutating shared state instead of returning new values
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | First-class functions and higher-order functions | 120 | 6 |
| M02L02 | Immutability, recursion and pure functions | 120 | 6 |

### M03 Collections (MASTEMY-DESIGN 17%)

- Worked applications: (1) Summarise sales with map and foldLeft; (2) Combine two collections with a for-comprehension
- Common misconception addressed: Reaching for mutable collections by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Lists, vectors, maps and sets | 120 | 6 |
| M03L02 | map, filter, fold and for-comprehensions | 120 | 6 |

### M04 Pattern matching and ADTs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model shapes with case classes and match on them; (2) Handle a missing value with Option instead of null
- Common misconception addressed: Using null where Option would make absence explicit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Case classes and pattern matching | 120 | 6 |
| M04L02 | Option, Either and sealed hierarchies | 120 | 6 |

### M05 Object-oriented and type features (MASTEMY-DESIGN 16%)

- Worked applications: (1) Compose behaviour by mixing in traits; (2) Write a generic container with a type parameter
- Common misconception addressed: Confusing a trait with a Java interface and ignoring mixin linearisation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Classes, traits and mixin composition | 120 | 6 |
| M05L02 | Generics, variance and implicits/given basics | 120 | 6 |

### M06 Concurrency and data processing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Compose two Futures and handle failure; (2) Express a map/reduce transformation over a dataset
- Common misconception addressed: Blocking on a Future and defeating its asynchronous purpose
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Futures and asynchronous composition | 120 | 6 |
| M06L02 | Introduction to large-scale data (Spark context) | 120 | 6 |

## Integrative case

Build an analytics utility in Scala: model records with case classes, parse and validate input into Option/Either, aggregate with immutable collections and folds, compose asynchronous loads with Futures, and sketch the same transformation as a map/reduce pipeline.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1529-final-protected | 48 | 48 | yes |
| MST-1529-final-alternate | 48 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scala basics | 8 |
| Functions and functional style | 8 |
| Collections | 8 |
| Pattern matching and ADTs | 8 |
| Object-oriented and type features | 8 |
| Concurrency and data processing | 8 |

Minimum reviewed item bank: 492 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1529-Q0001** (single-answer, Select ONE) In Scala, why is Option preferred over returning null for a possibly-absent value?

- A. It makes absence explicit in the type and forces the caller to handle it **(key)**  
  _Rationale:_ Correct: Option[T] encodes Some/None so the compiler and reader see the possibility of no value.
- B. It runs faster than returning null  
  _Rationale:_ The benefit is safety and clarity, not raw speed.
- C. It prevents the method from ever failing  
  _Rationale:_ Option models absence; it does not stop all failures.
- D. It automatically retries the computation  
  _Rationale:_ Option carries no retry behaviour.

**MST-1529-Q0002** (multiple-answer, Select ALL that apply) Which statements about Scala are correct? (Select TWO)

- A. Case classes provide pattern matching and value-based equality **(key)**  
  _Rationale:_ Correct: case classes generate equals and support match extraction.
- B. Traits can be mixed into a class to compose behaviour **(key)**  
  _Rationale:_ Correct: multiple traits can be combined via mixin composition.
- C. Scala has no support for immutable collections  
  _Rationale:_ Immutable collections are the default and are first-class.
- D. Functions cannot be passed as arguments  
  _Rationale:_ Functions are first-class values in Scala.

**MST-1529-Q0003** (single-answer, Select ONE) What does a Future[T] represent in Scala?

- A. A value that may become available later, computed asynchronously **(key)**  
  _Rationale:_ Correct: a Future holds the eventual result of an asynchronous computation.
- B. A guaranteed immediate result  
  _Rationale:_ The result is eventual, not immediate.
- C. A mutable variable shared across threads  
  _Rationale:_ A Future is a read-once eventual result, not a shared mutable variable.
- D. A compile-time constant  
  _Rationale:_ Its value is produced at run time, not at compile time.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
