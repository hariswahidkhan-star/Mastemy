# C# Programming: Complete Language Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0821` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (C# language reference and fundamentals: types, methods, async/await task-based model). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-CSHARP-LANG (https://learn.microsoft.com/dotnet/csharp/; https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/task-asynchronous-programming-model; accessed 2026-10-02) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — C# Programming: Complete Language Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use C# types, variables and control flow correctly
2. Define classes, structs, records and understand value vs reference semantics
3. Model behaviour with interfaces, inheritance and polymorphism
4. Handle collections, generics and iteration
5. Write safe error handling and resource management
6. Write basic asynchronous code with async and await

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Types and control flow (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose the right numeric type for a money field and justify it; (2) Trace control flow through a switch expression
- Common misconception addressed: Assuming floating-point is safe for currency
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Built-in types, variables and operators | 120 | 7 |
| M01L02 | Control flow and pattern matching | 120 | 7 |

### M02 Classes, structs and records (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick class vs struct vs record for three scenarios; (2) Predict the effect of copying a value type vs a reference type
- Common misconception addressed: Believing a struct and a class behave the same when copied
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classes, structs and value vs reference | 120 | 7 |
| M02L02 | Records and immutability | 120 | 7 |

### M03 Interfaces and polymorphism (MASTEMY-DESIGN 17%)

- Worked applications: (1) Program to an interface and swap an implementation; (2) Override a method and call the base implementation
- Common misconception addressed: Confusing overriding with hiding a method
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Interfaces and abstraction | 120 | 7 |
| M03L02 | Inheritance, virtual and override | 120 | 7 |

### M04 Collections and generics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose List vs Dictionary vs HashSet for a lookup workload; (2) Write a small generic method with a type constraint
- Common misconception addressed: Reaching for a list where a dictionary gives O(1) lookup
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Collections and iteration | 120 | 7 |
| M04L02 | Generics and type constraints | 120 | 7 |

### M05 Errors and resources (MASTEMY-DESIGN 17%)

- Worked applications: (1) Catch a specific exception and avoid swallowing others; (2) Use using/IDisposable to release a resource deterministically
- Common misconception addressed: Catching Exception and silently ignoring it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Exceptions and error handling | 120 | 7 |
| M05L02 | IDisposable, using and resource management | 120 | 7 |

### M06 Async foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert a blocking call to an awaited Task-returning method; (2) Compose two independent awaits with Task.WhenAll
- Common misconception addressed: Thinking async makes code run on multiple threads by itself
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | async, await and the Task model | 120 | 7 |
| M06L02 | Composing and awaiting tasks | 120 | 7 |

## Integrative case

Build a small console inventory tool: model items with records, store them in the right collections, validate input with proper exception handling, release file resources deterministically, and load data with an awaited async method.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0821-final-protected | 40 | 50 | yes |
| MST-0821-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Types and control flow | 7 |
| Classes, structs and records | 7 |
| Interfaces and polymorphism | 7 |
| Collections and generics | 7 |
| Errors and resources | 6 |
| Async foundations | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0821-Q0001** (single-answer, Select ONE) A method is marked async and returns Task<int> but contains no await. What does the compiler do and what happens at run time?

- A. It warns, and the method runs synchronously **(key)**  
  _Rationale:_ Correct: per the C# model, an async method with no await runs synchronously and the compiler issues a warning.
- B. It errors and will not compile  
  _Rationale:_ The absence of await is a warning, not a compile error.
- C. It runs on a new thread automatically  
  _Rationale:_ async does not by itself move work to another thread.
- D. It never returns  
  _Rationale:_ The method returns normally; it simply does not suspend.

**MST-0821-Q0002** (multiple-answer, Select TWO) Which TWO statements about value vs reference types in C# are correct? (Select TWO.)

- A. Assigning a struct copies its value **(key)**  
  _Rationale:_ Correct: structs are value types and are copied on assignment.
- B. Assigning a class reference copies the reference, not the object **(key)**  
  _Rationale:_ Correct: two references then point to the same object.
- C. Structs are always reference types  
  _Rationale:_ Structs are value types.
- D. Copying a class instance always deep-copies its fields  
  _Rationale:_ Copying a reference does not duplicate the object.

**MST-0821-Q0003** (single-answer, Select ONE) Which numeric type is the appropriate default for storing a currency amount in C#?

- A. decimal **(key)**  
  _Rationale:_ Correct: decimal avoids binary floating-point rounding errors for money.
- B. double  
  _Rationale:_ double is binary floating-point and introduces rounding errors for currency.
- C. float  
  _Rationale:_ float has even less precision than double for monetary values.
- D. int  
  _Rationale:_ int cannot represent fractional currency amounts.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
