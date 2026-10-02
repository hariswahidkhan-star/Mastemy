# Advanced C++: Templates, Concurrency, and Performance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0907` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Advanced C++: Templates, Concurrency, and Performance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Advanced templates
2. Generic library design
3. Move semantics and performance types
4. Concurrency fundamentals
5. Lock-free and advanced concurrency
6. Performance engineering

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Advanced templates (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a variadic logging function; (2) Select behaviour at compile time with type traits
- Common misconception addressed: Reaching for macros where templates are safer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Template metaprogramming and type traits | 120 | 6 |
| M01L02 | Variadic templates and SFINAE/concepts | 120 | 6 |

### M02 Generic library design (MASTEMY-DESIGN 15%)

- Worked applications: (1) Use CRTP to add behaviour without virtual overhead; (2) Constrain an interface with a concept for clear errors
- Common misconception addressed: Overengineering a template API nobody can read
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Policy-based and CRTP designs | 120 | 6 |
| M02L02 | Designing clean generic interfaces with concepts | 120 | 6 |

### M03 Move semantics and performance types (MASTEMY-DESIGN 15%)

- Worked applications: (1) Perfectly forward arguments into a factory; (2) Reduce allocations with reserve and small-buffer types
- Common misconception addressed: Adding needless copies the profiler then has to chase
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Perfect forwarding and reference collapsing | 120 | 6 |
| M03L02 | small-object and allocation-aware design | 120 | 6 |

### M04 Concurrency fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Protect a shared queue with a mutex and condition variable; (2) Use an atomic counter correctly with the right memory order
- Common misconception addressed: Assuming volatile provides thread safety
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Threads, mutexes, condition variables | 120 | 6 |
| M04L02 | The C++ memory model and atomics | 120 | 6 |

### M05 Lock-free and advanced concurrency (MASTEMY-DESIGN 17%)

- Worked applications: (1) Reason about when a lock-free queue actually wins; (2) Build a thread pool with futures
- Common misconception addressed: Writing lock-free code without understanding memory ordering
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Lock-free queues and hazards (ABA) | 120 | 6 |
| M05L02 | Thread pools, futures and async | 120 | 6 |

### M06 Performance engineering (MASTEMY-DESIGN 20%)

- Worked applications: (1) Profile to find the real hot path before optimising; (2) Lay out data to improve cache locality
- Common misconception addressed: Optimising a cold path on a hunch instead of measuring
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Profiling, benchmarking and cache behaviour | 120 | 6 |
| M06L02 | Optimisation workflow and avoiding premature tuning | 120 | 6 |

## Integrative case

Build a high-throughput C++ job engine: design template-based generic components, run work across threads with correct synchronisation and lock-free queues where justified, and profile to remove allocations and cache misses under a latency budget.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0907-final-protected | 36 | 36 | yes |
| MST-0907-final-alternate | 36 | 36 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Advanced templates | 6 |
| Generic library design | 6 |
| Move semantics and performance types | 6 |
| Concurrency fundamentals | 6 |
| Lock-free and advanced concurrency | 6 |
| Performance engineering | 6 |

Minimum reviewed item bank: 468 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0907-Q0001** (single-answer, Select ONE) Why is the C++ memory model and choice of memory order important when using std::atomic?

- A. It defines which reorderings are allowed, so incorrect ordering can cause subtle data races or stale reads **(key)**  
  _Rationale:_ Correct: memory order constrains visibility and reordering; getting it wrong breaks correctness in ways that are hard to reproduce.
- B. It makes atomics slower but never affects correctness  
  _Rationale:_ Ordering directly affects correctness, not merely speed.
- C. It is only relevant on single-core machines  
  _Rationale:_ It matters specifically on multi-core, concurrent execution.
- D. Atomics ignore memory order entirely  
  _Rationale:_ Atomics take a memory-order argument that governs their guarantees.

**MST-0907-Q0002** (multiple-answer, Select ALL that apply) Which claims about optimisation in C++ are sound? (Select TWO)

- A. Profile first to find the actual hot path before optimising **(key)**  
  _Rationale:_ Correct: measurement prevents wasting effort on code that does not matter.
- B. Improving data cache locality can beat micro-optimising instructions **(key)**  
  _Rationale:_ Correct: memory-access patterns often dominate performance on modern CPUs.
- C. volatile makes shared data thread-safe  
  _Rationale:_ volatile does not provide atomicity or ordering; atomics or locks do.
- D. Marking everything inline always makes code faster  
  _Rationale:_ Over-inlining can bloat code and hurt the instruction cache.

**MST-0907-Q0003** (single-answer, Select ONE) What is the benefit of CRTP (the curiously recurring template pattern) over runtime polymorphism here?

- A. It provides compile-time polymorphism, avoiding virtual-call and vtable overhead on a hot path **(key)**  
  _Rationale:_ Correct: CRTP resolves the call at compile time, removing virtual dispatch cost where it matters.
- B. It makes the class usable without templates  
  _Rationale:_ CRTP is a template technique, not a way to avoid templates.
- C. It guarantees thread safety  
  _Rationale:_ CRTP says nothing about concurrency.
- D. It replaces the need for a destructor  
  _Rationale:_ CRTP does not change resource management.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
