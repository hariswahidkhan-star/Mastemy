# Rust Programming: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2572` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Rust Programming: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write safe concurrent code with threads, channels and Arc/Mutex
2. Build asynchronous programs with async/await and a runtime
3. Reason about lifetimes, smart pointers and interior mutability
4. Use unsafe correctly and document its invariants
5. Write declarative macros and understand procedural macros
6. Profile, benchmark and optimise a Rust program

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Fearless concurrency (20% (design weight), design weight)

- Worked applications: (1) Fan out work across threads and join results; (2) Share a counter with Arc<Mutex<T>>
- Common misconception addressed: Sharing a Rc across threads
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Threads and move closures | 64 | 4 |
| M01L02 | Channels for message passing | 64 | 4 |
| M01L03 | Arc, Mutex and shared state | 64 | 4 |

### M02 Async programming (20% (design weight), design weight)

- Worked applications: (1) Await two network calls concurrently with join; (2) Spawn tasks on an executor
- Common misconception addressed: Blocking inside an async task
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Futures and async/await | 64 | 4 |
| M02L02 | Running tasks on a runtime | 64 | 4 |
| M02L03 | Async IO and concurrency vs parallelism | 64 | 4 |

### M03 Smart pointers and lifetimes (20% (design weight), design weight)

- Worked applications: (1) Build a tree with Rc and RefCell; (2) Return a reference with an explicit lifetime
- Common misconception addressed: Creating reference cycles that leak
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Box, Rc and RefCell | 64 | 4 |
| M03L02 | Interior mutability and borrow rules at runtime | 64 | 4 |
| M03L03 | Advanced lifetime annotations | 64 | 4 |

### M04 Unsafe Rust (20% (design weight), design weight)

- Worked applications: (1) Wrap an unsafe pointer op in a safe API; (2) Call a C function through FFI
- Common misconception addressed: Assuming unsafe turns off the borrow checker everywhere
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Raw pointers and unsafe blocks | 64 | 4 |
| M04L02 | Upholding invariants and safe wrappers | 64 | 4 |
| M04L03 | FFI with extern | 64 | 4 |

### M05 Macros and performance (20% (design weight), design weight)

- Worked applications: (1) Write a macro_rules! that reduces boilerplate; (2) Benchmark a hot loop and remove an allocation
- Common misconception addressed: Optimising without measuring first
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Declarative macro_rules! | 64 | 4 |
| M05L02 | Procedural macros overview | 64 | 4 |
| M05L03 | Benchmarking and profiling | 64 | 4 |

## Integrative case

An engineer hardens a concurrent web scraper in Rust: parallelise fetches with async/await, share state safely with Arc<Mutex<T>>, wrap one unsafe FFI call behind a safe API, and benchmark the hot path.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2572-final-protected | 40 | 40 | yes |
| MST-2572-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fearless concurrency | 8 |
| Async programming | 8 |
| Smart pointers and lifetimes | 8 |
| Unsafe Rust | 8 |
| Macros and performance | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2572-Q0001** (single-answer, Select ONE) Why does Rust require Arc rather than Rc to share ownership across threads?

- A. Arc uses atomic reference counting so the count is safe under concurrent access **(key)**  
  _Rationale:_ Arc's atomic counter is Send+Sync; Rc's non-atomic counter is not thread-safe.
- B. Rc is faster and therefore preferred across threads  
  _Rationale:_ Rc is non-atomic and not thread-safe, so it is rejected across threads.
- C. Arc disables the borrow checker  
  _Rationale:_ Arc does not affect borrow checking.
- D. Rc cannot allocate on the heap  
  _Rationale:_ Rc also heap-allocates; the difference is atomicity.

**MST-2572-Q0002** (multiple-answer, Select TWO) Select TWO statements that correctly describe unsafe Rust.

- A. unsafe lets you dereference raw pointers and call unsafe functions **(key)**  
  _Rationale:_ These operations are only permitted inside unsafe.
- B. unsafe disables all compiler borrow checking in the whole program  
  _Rationale:_ unsafe only unlocks specific operations; normal checks still apply.
- C. Code in unsafe should uphold invariants so a safe wrapper can be sound **(key)**  
  _Rationale:_ The point of unsafe is to build sound safe abstractions.
- D. unsafe code is exempt from the type system  
  _Rationale:_ Type checking still applies inside unsafe.

**MST-2572-Q0003** (single-answer, Select ONE) What is the difference between concurrency and parallelism in an async Rust program?

- A. Concurrency interleaves tasks; parallelism runs them on multiple cores at once **(key)**  
  _Rationale:_ Async gives concurrency; parallelism needs multiple threads/cores.
- B. They are identical in Rust  
  _Rationale:_ They are distinct concepts even if related.
- C. Parallelism is impossible in Rust  
  _Rationale:_ Rust supports parallelism via threads and multi-threaded runtimes.
- D. Concurrency always requires unsafe  
  _Rationale:_ Concurrency does not require unsafe.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
