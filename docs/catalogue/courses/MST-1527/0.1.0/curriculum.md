# Rust Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1527` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Rust Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Rust and Cargo
2. Variables, types and control flow
3. Ownership and borrowing basics
4. Structs, enums and pattern matching
5. Error handling with Result and Option
6. Collections, iterators and modules

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Rust and Cargo (MASTEMY-DESIGN 16%)

- Worked applications: (1) Scaffold a binary crate with cargo new and run it; (2) Add a dependency in Cargo.toml and build it
- Common misconception addressed: Assuming rustc must be invoked by hand instead of using Cargo
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing Rust and running your first program | 120 | 6 |
| M01L02 | Cargo projects, crates and the build cycle | 120 | 6 |

### M02 Variables, types and control flow (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute a value with a for loop over a range; (2) Return a value out of a loop expression
- Common misconception addressed: Thinking variables are mutable by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Immutability, let, mut and scalar types | 120 | 6 |
| M02L02 | if, loop, while and for expressions | 120 | 6 |

### M03 Ownership and borrowing basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Fix a use-after-move error by borrowing; (2) Pass a &mut reference to a mutating function
- Common misconception addressed: Cloning everything to silence the borrow checker
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Move semantics and the owner of a value | 120 | 6 |
| M03L02 | Shared and mutable references | 120 | 6 |

### M04 Structs, enums and pattern matching (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model a shape as an enum and match on it; (2) Add a method that borrows &self
- Common misconception addressed: Using sentinel values instead of Option/enum variants
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defining structs and methods with impl | 120 | 6 |
| M04L02 | Enums, Option and match | 120 | 6 |

### M05 Error handling with Result and Option (MASTEMY-DESIGN 17%)

- Worked applications: (1) Propagate a parse error with ?; (2) Choose between expect and match for an error
- Common misconception addressed: Calling unwrap in code that should return Result
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Result, the ? operator and propagation | 120 | 6 |
| M05L02 | Recoverable vs unrecoverable errors | 120 | 6 |

### M06 Collections, iterators and modules (MASTEMY-DESIGN 18%)

- Worked applications: (1) Count word frequencies into a HashMap; (2) Transform a Vec with map and filter
- Common misconception addressed: Indexing a Vec in a loop instead of iterating
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Vec, String and HashMap | 120 | 6 |
| M06L02 | Iterator adaptors and the module system | 120 | 6 |

## Integrative case

Build a command-line to-do manager in Rust: store tasks in a Vec of structs, model task state with an enum, add and complete tasks through borrowing, handle bad input with Result and ?, and summarise tasks using iterator adaptors.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1527-final-protected | 45 | 45 | yes |
| MST-1527-final-alternate | 45 | 45 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Rust and Cargo | 8 |
| Variables, types and control flow | 8 |
| Ownership and borrowing basics | 8 |
| Structs, enums and pattern matching | 7 |
| Error handling with Result and Option | 7 |
| Collections, iterators and modules | 7 |

Minimum reviewed item bank: 486 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1527-Q0001** (single-answer, Select ONE) What does `cargo run` do in a Cargo project?

- A. Compiles the crate if needed and then executes the resulting binary **(key)**  
  _Rationale:_ Correct: cargo run builds (when sources changed) and runs the binary in one step.
- B. Only downloads dependencies without building  
  _Rationale:_ That is closer to cargo fetch; it does not run anything.
- C. Publishes the crate to crates.io  
  _Rationale:_ Publishing is cargo publish, not cargo run.
- D. Formats the source code  
  _Rationale:_ Formatting is cargo fmt.

**MST-1527-Q0002** (multiple-answer, Select ALL that apply) Which statements about Rust ownership are true? (Select TWO)

- A. Each value has exactly one owner at a time **(key)**  
  _Rationale:_ Correct: single ownership is the core rule that enables deterministic cleanup.
- B. A value is dropped when its owner goes out of scope **(key)**  
  _Rationale:_ Correct: drop runs deterministically at the end of the owner's scope.
- C. Values are deep-copied on every assignment by default  
  _Rationale:_ Non-Copy values are moved, not copied, on assignment.
- D. A garbage collector frees values at runtime  
  _Rationale:_ Rust has no garbage collector; cleanup is scope-based.

**MST-1527-Q0003** (single-answer, Select ONE) In a function returning `Result<T, E>`, what does the `?` operator do on an `Err`?

- A. Returns early, propagating the error to the caller **(key)**  
  _Rationale:_ Correct: ? short-circuits and returns the Err from the enclosing function.
- B. Panics and aborts the program  
  _Rationale:_ That is unwrap/expect; ? propagates instead.
- C. Converts the error to a String and prints it  
  _Rationale:_ ? does not print; it returns the error value.
- D. Silently discards the error  
  _Rationale:_ ? never discards errors; it returns them.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
