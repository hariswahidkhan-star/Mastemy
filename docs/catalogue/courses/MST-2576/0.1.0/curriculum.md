# Swift Programming: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2576` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Swift Programming: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write and run Swift code and understand the toolchain
2. Use let/var, value types and type inference correctly
3. Apply optionals and optional binding to handle missing values
4. Use control flow, switch and ranges idiomatically
5. Model data with structs, enums and arrays/dictionaries
6. Write functions with parameter labels and closures

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started (20% (design weight), design weight)

- Worked applications: (1) Run a Swift playground snippet; (2) Compile a .swift file
- Common misconception addressed: Thinking Swift is only for iOS
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Swift, playgrounds and the compiler | 64 | 4 |
| M01L02 | print and basic I/O | 64 | 4 |
| M01L03 | Running a Swift program | 64 | 4 |

### M02 Values and types (20% (design weight), design weight)

- Worked applications: (1) Interpolate a value into a string; (2) Infer and annotate a type
- Common misconception addressed: Reassigning a let constant
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | let vs var and inference | 64 | 4 |
| M02L02 | Int, Double, Bool, String | 64 | 4 |
| M02L03 | String interpolation | 64 | 4 |

### M03 Optionals (20% (design weight), design weight)

- Worked applications: (1) Unwrap with guard let and early return; (2) Provide a default with ??
- Common misconception addressed: Force-unwrapping and crashing on nil
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Optional types and nil | 64 | 4 |
| M03L02 | Optional binding with if let/guard | 64 | 4 |
| M03L03 | Nil-coalescing | 64 | 4 |

### M04 Control flow (20% (design weight), design weight)

- Worked applications: (1) Match an enum with switch exhaustively; (2) Iterate a range with stride
- Common misconception addressed: Omitting a case and expecting it to compile
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | if, for-in and while | 64 | 4 |
| M04L02 | switch with pattern matching | 64 | 4 |
| M04L03 | Ranges and where clauses | 64 | 4 |

### M05 Types and functions (20% (design weight), design weight)

- Worked applications: (1) Define a struct with a method; (2) Sort an array with a closure
- Common misconception addressed: Expecting a struct copy to share mutations
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Structs and enums as value types | 64 | 4 |
| M05L02 | Arrays and dictionaries | 64 | 4 |
| M05L03 | Functions, labels and closures | 64 | 4 |

## Integrative case

A beginner builds a Swift command-line to-do list: model tasks with a struct and enum status, store them in an array, handle optional due dates with optional binding, and print a formatted summary.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2576-final-protected | 40 | 40 | yes |
| MST-2576-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started | 8 |
| Values and types | 8 |
| Optionals | 8 |
| Control flow | 8 |
| Types and functions | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2576-Q0001** (single-answer, Select ONE) What does optional binding with if let accomplish in Swift?

- A. It safely unwraps an optional into a non-optional constant when a value exists **(key)**  
  _Rationale:_ if let binds the wrapped value only when the optional is non-nil.
- B. It forces the optional to a value, crashing if nil  
  _Rationale:_ That is force-unwrapping with !, not if let.
- C. It converts any type into an optional  
  _Rationale:_ if let unwraps, it does not wrap.
- D. It makes the variable mutable  
  _Rationale:_ if let introduces a constant unless if var is used.

**MST-2576-Q0002** (multiple-answer, Select TWO) Select TWO true statements about structs as value types in Swift.

- A. Assigning a struct to a new variable copies it **(key)**  
  _Rationale:_ Value types are copied on assignment.
- B. Mutating the copy does not affect the original **(key)**  
  _Rationale:_ Independent copies have independent storage.
- C. Structs are reference types sharing one instance  
  _Rationale:_ Structs are value types, not reference types.
- D. Two struct variables always point to the same memory  
  _Rationale:_ Each copy has its own storage.

**MST-2576-Q0003** (single-answer, Select ONE) Why prefer the nil-coalescing operator ?? over force-unwrapping an optional?

- A. It supplies a fallback value instead of crashing when the optional is nil **(key)**  
  _Rationale:_ ?? yields a default on nil, avoiding a runtime trap.
- B. It is faster at runtime than any alternative  
  _Rationale:_ Performance is not the reason; safety is.
- C. It converts the value to a String  
  _Rationale:_ ?? does not change the type beyond removing optionality.
- D. It makes the optional non-optional permanently  
  _Rationale:_ ?? affects only the evaluated expression.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
