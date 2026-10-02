# Concurrency and Parallel Programming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1546` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-CPP-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Concurrency and Parallel Programming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Concurrency foundations
2. Threads and race conditions
3. Locks and synchronisation
4. Deadlock, livelock and starvation
5. The memory model
6. Higher-level concurrency
7. Parallel algorithms
8. Async and lock-free ideas

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production concurrent code; building and stress-testing concurrent programs is taught through instructor-built walkthroughs.

## Modules

### M01 Concurrency foundations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Distinguish a concurrent design from a parallel one; (2) Identify shared state in a small program
- Common misconception addressed: Using concurrency and parallelism as synonyms
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Concurrency vs parallelism and why they matter | 75 | 6 |
| M01L02 | Processes, threads and the shared-memory model | 75 | 6 |

### M02 Threads and race conditions (MASTEMY-DESIGN 14%)

- Worked applications: (1) Spot the race condition in a shared-counter example; (2) Make an operation atomic to remove a race
- Common misconception addressed: Assuming a single statement like count++ is atomic
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating threads and the data race | 75 | 6 |
| M02L02 | Critical sections and atomicity | 75 | 6 |

### M03 Locks and synchronisation (MASTEMY-DESIGN 14%)

- Worked applications: (1) Protect shared state with a mutex at the right granularity; (2) Coordinate a wait with a condition variable
- Common misconception addressed: Holding a lock while doing slow I/O and killing throughput
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mutexes, reentrancy and lock granularity | 75 | 6 |
| M03L02 | Condition variables, read-write locks and monitors | 75 | 6 |

### M04 Deadlock, livelock and starvation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Prevent deadlock by imposing a lock order; (2) Distinguish starvation from deadlock in a scenario
- Common misconception addressed: Thinking adding more locks always makes code safer
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The four deadlock conditions and lock ordering | 75 | 6 |
| M04L02 | Livelock, starvation and fairness | 75 | 6 |

### M05 The memory model (MASTEMY-DESIGN 11%)

- Worked applications: (1) Explain why a flag needs atomic/volatile for visibility; (2) Reason about reordering with a happens-before edge
- Common misconception addressed: Assuming writes by one thread are instantly visible to others
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Visibility, reordering and happens-before | 75 | 6 |
| M05L02 | Atomics and memory barriers | 75 | 6 |

### M06 Higher-level concurrency (MASTEMY-DESIGN 12%)

- Worked applications: (1) Submit work to a thread pool and collect futures; (2) Replace shared state with message passing
- Common misconception addressed: Spawning an unbounded number of threads instead of pooling
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Thread pools, futures and tasks | 75 | 6 |
| M06L02 | Message passing and the actor model | 75 | 6 |

### M07 Parallel algorithms (MASTEMY-DESIGN 13%)

- Worked applications: (1) Parallelise a sum with a reduction; (2) Estimate speedup with Amdahl's law
- Common misconception addressed: Expecting linear speedup from N cores regardless of the serial fraction
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Data vs task parallelism and decomposition | 75 | 6 |
| M07L02 | Map-reduce patterns and parallel speedup limits | 75 | 6 |

### M08 Async and lock-free ideas (MASTEMY-DESIGN 12%)

- Worked applications: (1) Convert a blocking call chain to async/await; (2) Explain how compare-and-swap avoids a lock
- Common misconception addressed: Believing async automatically means multi-threaded parallelism
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Async/await and non-blocking I/O models | 75 | 6 |
| M08L02 | Lock-free structures and compare-and-swap | 75 | 6 |

## Integrative case

Design a concurrent job processor: identify shared state and remove a data race, choose lock granularity or message passing to coordinate workers, impose a lock order to prevent deadlock, size a thread pool, parallelise the aggregation with a reduction, and estimate the realistic speedup with Amdahl's law.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1546-final-protected | 40 | 40 | yes |
| MST-1546-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Concurrency foundations | 5 |
| Threads and race conditions | 5 |
| Locks and synchronisation | 5 |
| Deadlock, livelock and starvation | 5 |
| The memory model | 5 |
| Higher-level concurrency | 5 |
| Parallel algorithms | 5 |
| Async and lock-free ideas | 5 |

Minimum reviewed item bank: 482 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1546-Q0001** (single-answer, Select ONE) What is the difference between concurrency and parallelism?

- A. Concurrency is structuring work as independent tasks; parallelism is executing tasks literally at the same time on multiple cores **(key)**  
  _Rationale:_ Correct: concurrency is about composition/structure, parallelism about simultaneous execution; you can have one without the other.
- B. They are the same thing  
  _Rationale:_ They are distinct: concurrent code need not run in parallel, and vice versa.
- C. Parallelism only works on a single core  
  _Rationale:_ Parallelism requires multiple execution units to run simultaneously.
- D. Concurrency requires multiple machines  
  _Rationale:_ Concurrency is possible on a single core via interleaving.

**MST-1546-Q0002** (multiple-answer, Select TWO) Which statements about data races are correct? (Select TWO)

- A. count++ is typically not atomic; it is a read-modify-write that can interleave **(key)**  
  _Rationale:_ Correct: the increment is multiple steps, so concurrent threads can lose updates.
- B. A data race can be removed by making the operation atomic or guarding it with a lock **(key)**  
  _Rationale:_ Correct: atomics or mutual exclusion restore correctness for shared mutable state.
- C. Reading a shared variable from many threads while one writes it is always safe  
  _Rationale:_ An unsynchronised write with concurrent reads is a data race.
- D. Data races only occur across separate processes  
  _Rationale:_ Data races occur between threads sharing memory within a process.

**MST-1546-Q0003** (single-answer, Select ONE) A program is 90% parallelisable and 10% strictly serial. By Amdahl's law, what is the maximum speedup with unlimited cores?

- A. 10x **(key)**  
  _Rationale:_ Correct: with the serial fraction s = 0.1, maximum speedup is 1/s = 10x regardless of core count.
- B. 100x  
  _Rationale:_ The serial 10% caps speedup at 1/0.1 = 10x, not 100x.
- C. Unlimited  
  _Rationale:_ The serial fraction bounds speedup; it cannot be unlimited.
- D. 0.9x  
  _Rationale:_ Speedup is greater than 1; 0.9x would be a slowdown.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
