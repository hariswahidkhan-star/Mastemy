# Rust Programming: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2571` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Rust Programming: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design APIs with generics and trait bounds that stay zero-cost
2. Model and propagate errors with Result and the ? operator
3. Use common collections and iterators idiomatically
4. Apply closures and iterator adaptors to transform data lazily
5. Organise code into modules, crates and a published-style library layout
6. Write and run integration tests and documentation tests

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Generics and traits (20% (design weight), design weight)

- Worked applications: (1) Write a generic max function with a trait bound; (2) Implement Display for a custom type
- Common misconception addressed: Assuming generics add runtime dispatch cost
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Generic functions and structs | 64 | 4 |
| M01L02 | Defining and implementing traits | 64 | 4 |
| M01L03 | Trait bounds and where clauses | 64 | 4 |

### M02 Error handling (20% (design weight), design weight)

- Worked applications: (1) Propagate an IO error with ?; (2) Define an enum error type with variants
- Common misconception addressed: Using unwrap in library code
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Result and the ? operator | 64 | 4 |
| M02L02 | Custom error types | 64 | 4 |
| M02L03 | Converting errors with From | 64 | 4 |

### M03 Collections (20% (design weight), design weight)

- Worked applications: (1) Count word frequencies with a HashMap entry API; (2) Deduplicate items with a HashSet
- Common misconception addressed: Indexing a HashMap expecting a default
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Vec, String and VecDeque | 64 | 4 |
| M03L02 | HashMap and HashSet | 64 | 4 |
| M03L03 | Choosing the right collection | 64 | 4 |

### M04 Closures and iterators (20% (design weight), design weight)

- Worked applications: (1) Chain filter and map then collect into a Vec; (2) Capture a variable by move in a closure
- Common misconception addressed: Thinking iterator chains run before collect
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Closures and the Fn traits | 64 | 4 |
| M04L02 | Iterator adaptors map/filter/fold | 64 | 4 |
| M04L03 | Lazy evaluation and collect | 64 | 4 |

### M05 Modules and testing (20% (design weight), design weight)

- Worked applications: (1) Split code into modules with pub re-exports; (2) Write a doc test that compiles in CI
- Common misconception addressed: Believing child modules see private parent items automatically
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Modules, paths and visibility | 64 | 4 |
| M05L02 | Crate layout and re-exports | 64 | 4 |
| M05L03 | Integration and doc tests | 64 | 4 |

## Integrative case

A developer refactors a CSV-parsing library in Rust: introduce generics and a custom error enum, replace unwrap with ? and Result, expose a clean module API, and cover it with integration and doc tests.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2571-final-protected | 40 | 40 | yes |
| MST-2571-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Generics and traits | 8 |
| Error handling | 8 |
| Collections | 8 |
| Closures and iterators | 8 |
| Modules and testing | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2571-Q0001** (single-answer, Select ONE) What does the ? operator do when applied to a Result in a function returning Result?

- A. Returns the error early from the function, otherwise unwraps the Ok value **(key)**  
  _Rationale:_ ? propagates Err via an early return and yields the Ok value on success.
- B. Panics immediately on an Err  
  _Rationale:_ That is unwrap/expect behaviour, not ?.
- C. Converts the Result into an Option  
  _Rationale:_ ? keeps the Result flow; it does not change it to Option here.
- D. Silently ignores the error  
  _Rationale:_ ? never discards the error; it returns it.

**MST-2571-Q0002** (multiple-answer, Select TWO) Select TWO true statements about iterator adaptors like map and filter in Rust.

- A. They are lazy and do nothing until a consumer such as collect or for is used **(key)**  
  _Rationale:_ Adaptors build a pipeline evaluated only when consumed.
- B. Each adaptor allocates a new Vec immediately  
  _Rationale:_ Adaptors are lazy and allocation-free until collected.
- C. They can be chained and fused by the compiler into efficient code **(key)**  
  _Rationale:_ Chained adaptors compile to tight loops with no per-step allocation.
- D. filter can change the item type of the iterator  
  _Rationale:_ filter keeps the item type; map changes it.

**MST-2571-Q0003** (single-answer, Select ONE) Why define a custom error enum with From implementations in a Rust library?

- A. To unify different underlying errors behind one type that ? can convert into **(key)**  
  _Rationale:_ From impls let ? auto-convert source errors into the library's error type.
- B. To make all functions return Option instead of Result  
  _Rationale:_ Custom error types are about Result, not Option.
- C. To force every caller to call unwrap  
  _Rationale:_ The goal is the opposite of forcing unwrap.
- D. To disable the borrow checker for error paths  
  _Rationale:_ Error types do not affect borrow checking.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
