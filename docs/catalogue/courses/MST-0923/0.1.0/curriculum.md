# F#: Functional Programming on .NET

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0923` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — F#: Functional Programming on .NET (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Functional foundations and the F# toolchain
2. Core types: tuples, records and unions
3. Pattern matching and control flow
4. Collections and higher-order functions
5. Error handling and asynchronous workflows
6. Interop and organising an F# project

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Functional foundations and the F# toolchain (MASTEMY-DESIGN 16%)

- Worked applications: (1) Rewrite an imperative total-price loop as a pipeline of pure functions; (2) Use the REPL (dotnet fsi) to explore a snippet before committing it
- Common misconception addressed: Thinking let defines a mutable variable like in C#
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Values, functions, immutability and the F# REPL | 80 | 6 |
| M01L02 | Type inference, let bindings and the pipeline operator | 80 | 6 |

### M02 Core types: tuples, records and unions (MASTEMY-DESIGN 18%)

- Worked applications: (1) Model a payment method as a discriminated union instead of a nullable enum; (2) Replace a class with a record and rely on built-in equality
- Common misconception addressed: Reaching for classes and nulls instead of unions and option
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Records, tuples and structural equality | 80 | 6 |
| M02L02 | Discriminated unions and making illegal states unrepresentable | 80 | 6 |

### M03 Pattern matching and control flow (MASTEMY-DESIGN 16%)

- Worked applications: (1) Exhaustively match a discount union so the compiler flags a missed case; (2) Parse a status string with an active pattern
- Common misconception addressed: Treating pattern matching as a switch statement with fallthrough
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Match expressions, guards and active patterns | 80 | 6 |
| M03L02 | Option and exhaustive matching | 80 | 6 |

### M04 Collections and higher-order functions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Aggregate line items with List.fold instead of a mutable accumulator; (2) Compose map and filter into a reusable pricing transform
- Common misconception addressed: Mutating a list in place rather than producing a new one
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lists, arrays, seq and the Seq/List modules | 80 | 6 |
| M04L02 | map, filter, fold and composition | 80 | 6 |

### M05 Error handling and asynchronous workflows (MASTEMY-DESIGN 17%)

- Worked applications: (1) Chain validations with Result so the first failure short-circuits; (2) Fetch two rates concurrently with async and combine them
- Common misconception addressed: Using exceptions for ordinary expected validation failures
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Result, Option and railway-oriented programming | 80 | 6 |
| M05L02 | async and task workflows on .NET | 80 | 6 |

### M06 Interop and organising an F# project (MASTEMY-DESIGN 16%)

- Worked applications: (1) Expose an F# module so a C# controller can call it cleanly; (2) Split a script into a library project with signature files
- Common misconception addressed: Assuming F# and C# share identical representations for option and unit
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Modules, namespaces and project structure | 80 | 6 |
| M06L02 | Consuming F# from C# and vice versa | 80 | 6 |

## Integrative case

Build a small order-pricing library in F# used by a .NET web API: model the domain with records and discriminated unions, make illegal states unrepresentable, compose the pricing pipeline with higher-order functions, handle failures with Result, and expose it to C# callers.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0923-final-protected | 30 | 30 | yes |
| MST-0923-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Functional foundations and the F# toolchain | 5 |
| Core types: tuples, records and unions | 5 |
| Pattern matching and control flow | 5 |
| Collections and higher-order functions | 5 |
| Error handling and asynchronous workflows | 5 |
| Interop and organising an F# project | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0923-Q0001** (single-answer, Select ONE) Which F# construct is designed to make illegal states unrepresentable for a value that is exactly one of several named shapes?

- A. Discriminated union **(key)**  
  _Rationale:_ Correct: a discriminated union lets the type hold exactly one of a fixed set of cases, so impossible combinations cannot be constructed.
- B. A record with nullable fields  
  _Rationale:_ A record groups several fields that all exist at once, and nullable fields reintroduce the illegal states you are trying to remove.
- C. A string constant  
  _Rationale:_ A string can hold any text, so the compiler cannot restrict it to the valid cases.
- D. A mutable class with an enum flag  
  _Rationale:_ An enum plus separate fields lets invalid combinations exist and be mutated into existence.

**MST-0923-Q0002** (multiple-answer, Select ALL that apply) Which of the following are pure, immutable-by-default behaviours you can rely on in idiomatic F#? (Select TWO)

- A. A let binding introduces an immutable value unless mark with mutable **(key)**  
  _Rationale:_ Correct: let bindings are immutable by default; you must opt into mutation with mutable.
- B. List.map returns a new list rather than modifying the input **(key)**  
  _Rationale:_ Correct: the List module functions produce new collections and leave the input unchanged.
- C. Records are reference-mutable so fields can be reassigned freely  
  _Rationale:_ Record fields are immutable by default; you create a changed copy with the with syntax.
- D. The pipeline operator mutates its left operand in place  
  _Rationale:_ The |> operator simply passes a value as the last argument to a function; it mutates nothing.

**MST-0923-Q0003** (single-answer, Select ONE) A validation pipeline should stop at the first failure and otherwise pass the value along. Which type best models this in F#?

- A. Result<'T,'Error> **(key)**  
  _Rationale:_ Correct: Result carries either a success value or an error, and binding chains short-circuit on the first Error.
- B. A thrown exception caught at the top  
  _Rationale:_ Exceptions work but are discouraged for expected validation failures because they bypass the type system and are hard to compose.
- C. A bool returned from each step  
  _Rationale:_ A bool loses the error detail and does not carry the successful value forward.
- D. A nullable reference  
  _Rationale:_ Null cannot distinguish between the different failure reasons and reintroduces null-reference risks.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
