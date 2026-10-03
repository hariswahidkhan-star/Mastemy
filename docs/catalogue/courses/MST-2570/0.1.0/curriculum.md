# Rust Programming: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2570` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Rust Programming: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Install the Rust toolchain and build, run and test a project with Cargo
2. Use Rust's scalar and compound types, variables, mutability and shadowing correctly
3. Write functions, control flow and pattern matching that compile without warnings
4. Explain ownership, borrowing and the move semantics the borrow checker enforces
5. Model data with structs and enums and handle the Option type instead of null
6. Read compiler error messages and fix common beginner mistakes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Toolchain and Cargo (20% (design weight), design weight)

- Worked applications: (1) Scaffold a new Cargo project and run it; (2) Add a unit test and run cargo test
- Common misconception addressed: Thinking cargo run recompiles dependencies every time
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing rustup and the stable toolchain | 64 | 4 |
| M01L02 | Creating and running a binary crate with Cargo | 64 | 4 |
| M01L03 | Formatting, linting and running tests | 64 | 4 |

### M02 Values, types and bindings (20% (design weight), design weight)

- Worked applications: (1) Declare a shadowed binding to change a value's type; (2) Index a slice safely
- Common misconception addressed: Believing let bindings are mutable by default
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Integers, floats, booleans and chars | 64 | 4 |
| M02L02 | let, mut and shadowing | 64 | 4 |
| M02L03 | Tuples, arrays and slices | 64 | 4 |

### M03 Functions and control flow (20% (design weight), design weight)

- Worked applications: (1) Return a value from an if expression; (2) Write an exhaustive match on an enum
- Common misconception addressed: Expecting a missing match arm to compile
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining functions and return values | 64 | 4 |
| M03L02 | if/else as expressions and loops | 64 | 4 |
| M03L03 | match and exhaustive patterns | 64 | 4 |

### M04 Ownership and borrowing (20% (design weight), design weight)

- Worked applications: (1) Pass a value by reference to avoid a move; (2) Fix a double-mutable-borrow error
- Common misconception addressed: Thinking a move leaves the original usable
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Move semantics and the Copy trait | 64 | 4 |
| M04L02 | References and mutable references | 64 | 4 |
| M04L03 | The borrowing rules and lifetimes intro | 64 | 4 |

### M05 Structs, enums and Option (20% (design weight), design weight)

- Worked applications: (1) Model a state machine with an enum; (2) Replace a null check with match on Option
- Common misconception addressed: Treating Option<T> as if it were T
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Defining and using structs | 64 | 4 |
| M05L02 | Enums and the Option type | 64 | 4 |
| M05L03 | Methods and impl blocks | 64 | 4 |

## Integrative case

A newcomer builds a command-line unit converter in Rust: parse arguments, model units with an enum, handle invalid input with Option, and pass a cargo test suite without borrow-checker errors.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2570-final-protected | 40 | 40 | yes |
| MST-2570-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Toolchain and Cargo | 8 |
| Values, types and bindings | 8 |
| Functions and control flow | 8 |
| Ownership and borrowing | 8 |
| Structs, enums and Option | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2570-Q0001** (single-answer, Select ONE) Which statement about variable bindings in Rust is correct?

- A. A binding declared with let is immutable unless mut is added **(key)**  
  _Rationale:_ let bindings are immutable by default; mut opts into mutability.
- B. All let bindings are mutable by default  
  _Rationale:_ Immutability is the default; mut is required to mutate.
- C. Shadowing requires the mut keyword  
  _Rationale:_ Shadowing re-declares with a new let and can change type; mut is not involved.
- D. const and let behave identically  
  _Rationale:_ const must be a compile-time constant with an explicit type and cannot be shadowed in the same way.

**MST-2570-Q0002** (multiple-answer, Select TWO) Select TWO consequences of Rust's ownership move semantics for a non-Copy value such as a String.

- A. After moving the value, the original variable can no longer be used **(key)**  
  _Rationale:_ A move invalidates the source binding to prevent double frees.
- B. The value is deep-copied automatically on assignment  
  _Rationale:_ Non-Copy types move rather than copy; a deep copy needs an explicit clone().
- C. Passing it to a function by value transfers ownership into the function **(key)**  
  _Rationale:_ By-value arguments move ownership unless the type is Copy or a reference is passed.
- D. Borrowing it with & also ends the original binding's validity  
  _Rationale:_ A shared borrow does not move the value; the owner remains valid.

**MST-2570-Q0003** (single-answer, Select ONE) What does an Option<T> value let you express that a plain T cannot?

- A. The explicit possibility that no value is present, checked by the compiler **(key)**  
  _Rationale:_ Option encodes Some/None so absence must be handled, replacing null.
- B. A value that can be mutated from any thread  
  _Rationale:_ Option says nothing about threading or mutability.
- C. A guaranteed non-null pointer  
  _Rationale:_ That is the role of a plain reference, not Option.
- D. Automatic error logging when the value is missing  
  _Rationale:_ Option carries no logging behaviour of its own.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
