# Zig Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1539` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-ZF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Zig Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Zig
2. Core types and control flow
3. Optionals and error unions
4. Pointers, slices and arrays
5. Memory and allocators
6. Structs, enums and unions
7. Comptime and generics
8. Testing, C interop and tooling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; Zig code and systems-level work are taught through instructor-built walkthroughs.

## Modules

### M01 Getting started with Zig (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build and run a hello program with the Zig toolchain; (2) Declare const vs var and observe mutability rules
- Common misconception addressed: Expecting a hidden runtime or garbage collector
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Zig toolchain, zig build and a first program | 90 | 6 |
| M01L02 | Values, types and comptime-known constants | 90 | 6 |

### M02 Core types and control flow (MASTEMY-DESIGN 13%)

- Worked applications: (1) Convert between integer widths with explicit casts; (2) Iterate a slice with a for loop
- Common misconception addressed: Expecting implicit numeric conversions as in C
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Integers, floats, bools and explicit casts | 90 | 6 |
| M02L02 | if, while, for and labelled loops | 90 | 6 |

### M03 Optionals and error unions (MASTEMY-DESIGN 15%)

- Worked applications: (1) Handle a missing value with orelse; (2) Propagate a failure with try and handle it with catch
- Common misconception addressed: Ignoring an error union instead of handling or propagating it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Optionals (?T), null and orelse | 90 | 6 |
| M03L02 | Error sets, error unions and try/catch | 90 | 6 |

### M04 Pointers, slices and arrays (MASTEMY-DESIGN 14%)

- Worked applications: (1) Take a slice of an array and read its len; (2) Pass a slice to a function that mutates it
- Common misconception addressed: Confusing a slice (ptr+len) with a raw pointer
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Single-item vs many-item pointers and slices | 90 | 6 |
| M04L02 | Arrays, bounds and sentinel-terminated data | 90 | 6 |

### M05 Memory and allocators (MASTEMY-DESIGN 14%)

- Worked applications: (1) Allocate, use and free a buffer with defer; (2) Use an arena allocator for a batch of allocations
- Common misconception addressed: Assuming memory is freed automatically without an allocator and defer
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Manual memory, allocators and defer | 90 | 6 |
| M05L02 | Arena and general-purpose allocators; leak detection | 90 | 6 |

### M06 Structs, enums and unions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Model a shape with a tagged union and switch on it; (2) Add a method to a struct
- Common misconception addressed: Treating a Zig struct type as a class with inheritance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Structs, methods and packed structs | 90 | 6 |
| M06L02 | Enums, tagged unions and switch | 90 | 6 |

### M07 Comptime and generics (MASTEMY-DESIGN 10%)

- Worked applications: (1) Write a generic container parameterised by a comptime type; (2) Compute a lookup table at comptime
- Common misconception addressed: Reaching for macros; Zig uses comptime instead
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | comptime parameters and compile-time evaluation | 90 | 6 |
| M07L02 | Generic data structures via comptime types | 90 | 6 |

### M08 Testing, C interop and tooling (MASTEMY-DESIGN 10%)

- Worked applications: (1) Write a test block and run zig test; (2) Call a C function from Zig
- Common misconception addressed: Skipping tests because 'the compiler is strict enough'
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Built-in test blocks and the build system | 90 | 6 |
| M08L02 | Calling C and interop basics | 90 | 6 |

## Integrative case

Build a small command-line data processor in Zig: read input into slices, parse records returning error unions, handle optionals and failures explicitly, manage buffers with an allocator and defer, model variants with a tagged union, write a generic helper with comptime, and cover the logic with built-in test blocks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1539-final-protected | 40 | 40 | yes |
| MST-1539-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Zig | 5 |
| Core types and control flow | 5 |
| Optionals and error unions | 5 |
| Pointers, slices and arrays | 5 |
| Memory and allocators | 5 |
| Structs, enums and unions | 5 |
| Comptime and generics | 5 |
| Testing, C interop and tooling | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1539-Q0001** (single-answer, Select ONE) In Zig, what does the try keyword do when applied to an expression that returns an error union?

- A. It unwraps the success value, or returns the error from the current function if one occurred **(key)**  
  _Rationale:_ Correct: try is shorthand for 'catch |e| return e', propagating errors upward.
- B. It ignores any error and continues  
  _Rationale:_ try does not ignore errors; it propagates them.
- C. It retries the expression until it succeeds  
  _Rationale:_ There is no retry; try handles the error-union result once.
- D. It converts the error into null  
  _Rationale:_ That is closer to optionals; try returns the error, it does not nullify it.

**MST-1539-Q0002** (multiple-answer, Select TWO) Which statements about memory management in Zig are correct? (Select TWO)

- A. Heap allocation is explicit and goes through an allocator you pass in **(key)**  
  _Rationale:_ Correct: Zig has no hidden global allocator; callers provide one.
- B. defer schedules cleanup (such as freeing) to run when the scope exits **(key)**  
  _Rationale:_ Correct: defer runs its statement on scope exit, pairing allocation with release.
- C. Zig uses a garbage collector to reclaim memory automatically  
  _Rationale:_ Zig has no garbage collector; memory is managed manually via allocators.
- D. Freeing memory is unnecessary because the runtime tracks it  
  _Rationale:_ There is no such runtime tracking; unfreed memory leaks.

**MST-1539-Q0003** (single-answer, Select ONE) What is a Zig slice?

- A. A pointer together with a length, giving a bounds-checked view of contiguous elements **(key)**  
  _Rationale:_ Correct: a slice carries both a pointer and a len, enabling safe iteration and bounds checks.
- B. A single raw pointer with no length information  
  _Rationale:_ That is a plain pointer; a slice also carries a length.
- C. A garbage-collected dynamic array  
  _Rationale:_ Zig has no garbage collection; a slice is just ptr plus len.
- D. A compile-time-only type with no runtime representation  
  _Rationale:_ Slices exist at runtime as a pointer/length pair.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
