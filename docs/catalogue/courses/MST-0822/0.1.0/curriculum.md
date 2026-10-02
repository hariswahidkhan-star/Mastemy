# Advanced C#: Generics, LINQ, Reflection, and Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0822` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (C# language reference: generics, LINQ, delegates/expressions, async composition). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-CSHARP-LANG (https://learn.microsoft.com/dotnet/csharp/; https://learn.microsoft.com/dotnet/csharp/language-reference/operators/await; accessed 2026-10-02) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Advanced C#: Generics, LINQ, Reflection, and Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design generic types and methods with constraints and variance
2. Write efficient LINQ queries and understand deferred execution
3. Use delegates, expressions and functional patterns
4. Use reflection and attributes judiciously
5. Apply common design patterns idiomatically in C#

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Advanced generics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a constraint so a generic method can call a required member; (2) Reason about covariance in IEnumerable<out T>
- Common misconception addressed: Assuming generics are compiled per concrete type like templates
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Constraints, default and generic math | 120 | 7 |
| M01L02 | Variance: in and out | 120 | 7 |

### M02 LINQ in depth (MASTEMY-DESIGN 20%)

- Worked applications: (1) Predict when a LINQ query actually executes; (2) Rewrite a loop as a readable LINQ pipeline
- Common misconception addressed: Thinking a LINQ query runs the moment it is declared
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deferred execution and iterators | 120 | 7 |
| M02L02 | Projection, grouping and joins | 120 | 7 |

### M03 Delegates and expressions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pass behaviour with Func/Action instead of a subclass; (2) Inspect an Expression tree to build a dynamic filter
- Common misconception addressed: Confusing Func delegates with Expression trees
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Delegates, lambdas and closures | 120 | 7 |
| M03L02 | Expression trees | 120 | 7 |

### M04 Reflection and attributes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a custom attribute at run time; (2) Decide when reflection is the wrong tool for performance
- Common misconception addressed: Using reflection on a hot path without measuring cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reflection basics and metadata | 120 | 7 |
| M04L02 | Custom attributes and trade-offs | 120 | 7 |

### M05 Patterns in C# (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply strategy via an interface and DI; (2) Refactor a switch into a polymorphic design where it helps
- Common misconception addressed: Applying a pattern because it is named, not because it fits
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Creational and structural patterns in C# | 120 | 7 |
| M05L02 | Behavioural patterns and when not to use them | 120 | 7 |

## Integrative case

Refactor a report generator: replace brittle conditionals with strategy objects, express selection logic as efficient LINQ, drive formatting from custom attributes read by reflection, and keep the generic core type-safe with constraints.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0822-final-protected | 40 | 50 | yes |
| MST-0822-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Advanced generics | 8 |
| LINQ in depth | 8 |
| Delegates and expressions | 8 |
| Reflection and attributes | 8 |
| Patterns in C# | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0822-Q0001** (single-answer, Select ONE) When does the LINQ query `var q = list.Where(x => x > 0);` actually run its predicate?

- A. When the query is enumerated, e.g. in a foreach or ToList **(key)**  
  _Rationale:_ Correct: LINQ-to-objects uses deferred execution; the predicate runs on enumeration.
- B. On the line where q is declared  
  _Rationale:_ Declaration does not execute a deferred query.
- C. Never, unless Compile() is called  
  _Rationale:_ No compile step is needed for LINQ-to-objects.
- D. Only if the list is sorted first  
  _Rationale:_ Sorting is unrelated to when the predicate runs.

**MST-0822-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of generic constraints? (Select TWO.)

- A. Requiring a type parameter to implement an interface so its members can be called **(key)**  
  _Rationale:_ Correct: an interface constraint lets the generic code use those members.
- B. Requiring a parameterless constructor with new() **(key)**  
  _Rationale:_ Correct: the new() constraint allows constructing T.
- C. Forcing the JIT to generate separate source files  
  _Rationale:_ Constraints do not generate source files.
- D. Preventing any boxing ever  
  _Rationale:_ Constraints do not categorically prevent boxing.

**MST-0822-Q0003** (single-answer, Select ONE) A design uses reflection to read attributes on every request on a hot code path and it is slow. What is the best first improvement?

- A. Cache the reflected metadata instead of re-reading it each call **(key)**  
  _Rationale:_ Correct: reflection is costly; caching results removes repeated metadata lookups.
- B. Add more reflection calls  
  _Rationale:_ More reflection increases cost.
- C. Remove all interfaces  
  _Rationale:_ Interfaces are unrelated to the reflection cost.
- D. Switch every type to dynamic  
  _Rationale:_ dynamic adds overhead rather than removing it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
