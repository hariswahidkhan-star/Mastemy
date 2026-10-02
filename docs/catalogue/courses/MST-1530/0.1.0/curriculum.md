# Dart Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1530` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-DF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Dart Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Dart
2. Types and null safety
3. Control flow and functions
4. Collections
5. Object-oriented Dart
6. Asynchronous Dart
7. Errors, generics and the type system
8. Packages, tooling and testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; Dart code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Dart (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write and run a script that greets a user by name; (2) Compare var, final and const on three declarations
- Common misconception addressed: Thinking final and const mean the same thing
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Dart SDK, dart run and DartPad | 90 | 6 |
| M01L02 | main, variables, var/final/const and basic I/O | 90 | 6 |

### M02 Types and null safety (MASTEMY-DESIGN 14%)

- Worked applications: (1) Fix a program so it compiles under null safety; (2) Use ?? and ?. to handle a nullable value safely
- Common misconception addressed: Scattering the ! operator to silence null errors instead of handling null
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Built-in types, type inference and dynamic | 90 | 6 |
| M02L02 | Sound null safety: nullable types, ?, ! and late | 90 | 6 |

### M03 Control flow and functions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Validate a menu choice with a loop until valid; (2) Write a function with named optional parameters and defaults
- Common misconception addressed: Forgetting that positional optional and named parameters use different brackets
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals, loops, switch and patterns overview | 90 | 6 |
| M03L02 | Functions, named/optional parameters and arrow syntax | 90 | 6 |

### M04 Collections (MASTEMY-DESIGN 13%)

- Worked applications: (1) Group expenses by category in a map; (2) Build a filtered list with where and map
- Common misconception addressed: Expecting map iteration order to be sorted rather than insertion order
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lists, sets and maps | 90 | 6 |
| M04L02 | Collection-if, spread and higher-order methods | 90 | 6 |

### M05 Object-oriented Dart (MASTEMY-DESIGN 14%)

- Worked applications: (1) Model an Expense class with a named constructor and a computed getter; (2) Share behaviour across classes with a mixin
- Common misconception addressed: Confusing a mixin with inheritance of state
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Classes, constructors, named constructors and getters/setters | 90 | 6 |
| M05L02 | Inheritance, abstract classes, mixins and interfaces | 90 | 6 |

### M06 Asynchronous Dart (MASTEMY-DESIGN 13%)

- Worked applications: (1) Fetch and await simulated data, handling a failure; (2) Consume a stream of values with await for
- Common misconception addressed: Believing async makes code run on a separate thread
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Futures, async/await and error handling | 90 | 6 |
| M06L02 | Streams and the event loop | 90 | 6 |

### M07 Errors, generics and the type system (MASTEMY-DESIGN 12%)

- Worked applications: (1) Define and throw a custom exception type; (2) Write a generic container class
- Common misconception addressed: Catching every exception and swallowing it silently
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Exceptions, try/catch/finally and custom errors | 90 | 6 |
| M07L02 | Generics and generic collections | 90 | 6 |

### M08 Packages, tooling and testing (MASTEMY-DESIGN 10%)

- Worked applications: (1) Add a dependency and import it in a project; (2) Write unit tests for the Expense summary
- Common misconception addressed: Committing code without tests and assuming the analyzer caught everything
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | pub, pubspec.yaml, imports and libraries | 90 | 6 |
| M08L02 | Unit testing with package:test and the analyzer | 90 | 6 |

## Integrative case

Build a command-line expense tracker in Dart: read and validate input under null safety, model records with classes, store them in lists and maps, summarise spending by category, load seed data asynchronously from a file, organise the code into a library, and cover it with unit tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1530-final-protected | 40 | 40 | yes |
| MST-1530-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Dart | 5 |
| Types and null safety | 5 |
| Control flow and functions | 5 |
| Collections | 5 |
| Object-oriented Dart | 5 |
| Asynchronous Dart | 5 |
| Errors, generics and the type system | 5 |
| Packages, tooling and testing | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1530-Q0001** (single-answer, Select ONE) Under Dart sound null safety, what does declaring a variable as String? (with a question mark) mean?

- A. The variable may hold a String or null, and the compiler forces you to handle the null case **(key)**  
  _Rationale:_ Correct: the ? makes the type nullable and the compiler requires null-aware handling before use.
- B. The variable can never be null  
  _Rationale:_ That describes a non-nullable String, written without the question mark.
- C. The variable is automatically initialised to an empty string  
  _Rationale:_ Nullable variables default to null, not an empty string.
- D. The question mark converts the value to a number if possible  
  _Rationale:_ ? marks nullability; it performs no conversion.

**MST-1530-Q0002** (multiple-answer, Select TWO) Which statements about async/await in Dart are correct? (Select TWO)

- A. await suspends the current function until the Future completes, without blocking the event loop **(key)**  
  _Rationale:_ Correct: await yields control back to the event loop and resumes when the Future resolves.
- B. A function using await must be marked async **(key)**  
  _Rationale:_ Correct: await is only allowed inside a function declared async.
- C. async/await runs the awaited work on a separate OS thread  
  _Rationale:_ Dart is single-threaded per isolate; async does not create threads.
- D. await turns a synchronous function into a parallel loop  
  _Rationale:_ await does not parallelise loops; it sequences asynchronous steps.

**MST-1530-Q0003** (single-answer, Select ONE) What is the main purpose of a mixin in Dart?

- A. To reuse a set of methods across classes without forcing a single inheritance chain **(key)**  
  _Rationale:_ Correct: mixins let unrelated classes share behaviour via with, avoiding deep inheritance.
- B. To store private database rows  
  _Rationale:_ Mixins are a code-reuse mechanism, not storage.
- C. To mark a class as unable to be instantiated  
  _Rationale:_ That is the role of abstract, not a mixin.
- D. To make all fields nullable automatically  
  _Rationale:_ Mixins do not change nullability of fields.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
