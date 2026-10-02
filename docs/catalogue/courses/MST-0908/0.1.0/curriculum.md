# Rust: Safe Systems Programming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0908` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Rust: Safe Systems Programming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Rust foundations and ownership
2. Borrowing and lifetimes
3. Types: structs, enums, pattern matching
4. Error handling
5. Traits and generics
6. Collections, iterators and persistence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Rust foundations and ownership (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a project with cargo and run it; (2) Trace when a value is moved versus copied
- Common misconception addressed: Expecting values to be implicitly copied like in C#/Java
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Cargo, types and the Rust toolchain | 80 | 6 |
| M01L02 | Ownership, moves and the stack/heap | 80 | 6 |

### M02 Borrowing and lifetimes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fix a borrow-checker error by restructuring borrows; (2) Annotate a function that returns a reference
- Common misconception addressed: Fighting the borrow checker by cloning everything
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | References, borrowing rules and mutability | 80 | 6 |
| M02L02 | Lifetimes and why the borrow checker complains | 80 | 6 |

### M03 Types: structs, enums, pattern matching (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model a command as an enum and match on it; (2) Add a method with impl
- Common misconception addressed: Using unwrap everywhere instead of matching
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Structs, methods and enums | 80 | 6 |
| M03L02 | match, if let and exhaustiveness | 80 | 6 |

### M04 Error handling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Propagate errors cleanly with ?; (2) Define a custom error type and From conversions
- Common misconception addressed: Calling unwrap on a Result in production code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Option, Result and the ? operator | 80 | 6 |
| M04L02 | Custom errors and conversion | 80 | 6 |

### M05 Traits and generics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a function generic over a trait bound; (2) Derive Debug, Clone and PartialEq appropriately
- Common misconception addressed: Reaching for dynamic dispatch when generics fit better
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Traits, trait objects and generics | 80 | 6 |
| M05L02 | Common standard traits and derive | 80 | 6 |

### M06 Collections, iterators and persistence (MASTEMY-DESIGN 18%)

- Worked applications: (1) Transform data with iterator adaptors instead of loops; (2) Serialise the store with serde and write tests
- Common misconception addressed: Collecting into a Vec just to loop once
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Vec, HashMap and iterator adaptors | 80 | 6 |
| M06L02 | serde, modules and testing | 80 | 6 |

## Integrative case

Build a command-line note store in Rust: model data with structs and enums, satisfy the borrow checker without fighting it, handle errors with Result and the ? operator, parse input, persist with serde, and test the modules.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0908-final-protected | 30 | 30 | yes |
| MST-0908-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Rust foundations and ownership | 5 |
| Borrowing and lifetimes | 5 |
| Types: structs, enums, pattern matching | 5 |
| Error handling | 5 |
| Traits and generics | 5 |
| Collections, iterators and persistence | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0908-Q0001** (single-answer, Select ONE) What does Rust's ownership system guarantee without a garbage collector?

- A. Memory is freed exactly once when its owner goes out of scope, preventing leaks and double-frees **(key)**  
  _Rationale:_ Correct: each value has a single owner and is dropped deterministically at scope end.
- B. All data is copied on every assignment  
  _Rationale:_ Values are moved, not copied, unless the type is Copy.
- C. Memory is never freed until the program exits  
  _Rationale:_ Values are dropped when their owner leaves scope.
- D. A background thread collects unused memory  
  _Rationale:_ Rust has no garbage collector; cleanup is scope-based.

**MST-0908-Q0002** (multiple-answer, Select ALL that apply) Which borrowing rules does the Rust borrow checker enforce? (Select TWO)

- A. You may have many shared (&) references OR one mutable (&mut) reference, not both at once **(key)**  
  _Rationale:_ Correct: this prevents data races and aliasing bugs at compile time.
- B. A reference must not outlive the value it points to **(key)**  
  _Rationale:_ Correct: lifetimes ensure references never dangle.
- C. Every value may have unlimited simultaneous mutable references  
  _Rationale:_ Only one mutable reference is allowed at a time.
- D. References can freely outlive their referents  
  _Rationale:_ That would create dangling references, which the checker forbids.

**MST-0908-Q0003** (single-answer, Select ONE) What does the ? operator do in a function returning Result?

- A. It returns the Ok value, or short-circuits by returning the Err from the function **(key)**  
  _Rationale:_ Correct: ? unwraps on success and propagates the error on failure, converting it as needed.
- B. It panics if the value is an error  
  _Rationale:_ That is unwrap/expect; ? propagates instead of panicking.
- C. It ignores the error and continues  
  _Rationale:_ ? does not silently ignore errors; it returns them.
- D. It converts a Result into a bool  
  _Rationale:_ ? extracts or propagates; it does not yield a bool.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
