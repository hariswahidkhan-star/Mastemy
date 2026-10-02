# High-Performance Computing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1599` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-HPC-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — High-Performance Computing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. HPC foundations
2. Performance analysis
3. Memory and caches
4. Vectorisation
5. Shared-memory parallelism
6. Distributed parallelism
7. Accelerators
8. Scaling and benchmarking

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on high-performance computing; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 HPC foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Distinguish data vs task parallelism; (2) Classify a workload's parallelism
- Common misconception addressed: Assuming more cores always means proportional speedup
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What HPC is | 75 | 5 |
| M01L02 | Parallelism types and Flynn's taxonomy | 75 | 5 |

### M02 Performance analysis (MASTEMY-DESIGN 13%)

- Worked applications: (1) Profile to find the hot loop; (2) Estimate speedup with Amdahl's law
- Common misconception addressed: Optimising code that is not the bottleneck
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Profiling and bottlenecks | 75 | 5 |
| M02L02 | Amdahl's and Gustafson's laws | 75 | 5 |

### M03 Memory and caches (MASTEMY-DESIGN 12%)

- Worked applications: (1) Reorder loops for cache locality; (2) Explain a cache miss's cost
- Common misconception addressed: Ignoring memory access patterns and thrashing the cache
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The memory hierarchy | 75 | 5 |
| M03L02 | Cache-friendly access patterns | 75 | 5 |

### M04 Vectorisation (MASTEMY-DESIGN 13%)

- Worked applications: (1) Vectorise a simple array loop; (2) Remove a dependency blocking vectorisation
- Common misconception addressed: Assuming the compiler always auto-vectorises
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SIMD and data-level parallelism | 75 | 5 |
| M04L02 | Helping the compiler vectorise | 75 | 5 |

### M05 Shared-memory parallelism (MASTEMY-DESIGN 12%)

- Worked applications: (1) Parallelise a loop with threads; (2) Protect a shared counter correctly
- Common misconception addressed: Introducing a data race by sharing without synchronisation
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Threads and OpenMP | 75 | 5 |
| M05L02 | Race conditions and synchronisation | 75 | 5 |

### M06 Distributed parallelism (MASTEMY-DESIGN 13%)

- Worked applications: (1) Split work across processes with MPI; (2) Reduce communication overhead
- Common misconception addressed: Communicating so often that it dominates runtime
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Message passing (MPI) | 75 | 5 |
| M06L02 | Communication vs computation | 75 | 5 |

### M07 Accelerators (MASTEMY-DESIGN 12%)

- Worked applications: (1) Offload a kernel to a GPU conceptually; (2) Minimise host-device transfers
- Common misconception addressed: Ignoring the cost of moving data to the device
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | GPUs for compute | 75 | 5 |
| M07L02 | Host-device data movement | 75 | 5 |

### M08 Scaling and benchmarking (MASTEMY-DESIGN 12%)

- Worked applications: (1) Measure strong-scaling efficiency; (2) Report a reproducible benchmark
- Common misconception addressed: Claiming a speedup without a fair baseline
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Strong vs weak scaling | 75 | 5 |
| M08L02 | Honest benchmarking | 75 | 5 |

## Integrative case

Speed up a numerical workload: profile to find the bottleneck, parallelise with threads and across nodes with message passing, improve cache usage and vectorisation, and reason about scaling limits before claiming a speedup.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1599-final-protected | 40 | 40 | yes |
| MST-1599-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| HPC foundations | 5 |
| Performance analysis | 5 |
| Memory and caches | 5 |
| Vectorisation | 5 |
| Shared-memory parallelism | 5 |
| Distributed parallelism | 5 |
| Accelerators | 5 |
| Scaling and benchmarking | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1599-Q0001** (single-answer, Select ONE) What does Amdahl's law tell us about parallel speedup?

- A. The serial fraction of a program bounds the maximum achievable speedup regardless of core count **(key)**  
  _Rationale:_ Correct: even small serial portions cap speedup.
- B. Speedup grows linearly with cores without limit  
  _Rationale:_ Amdahl's law shows diminishing returns.
- C. Adding cores always doubles performance  
  _Rationale:_ Not once the serial fraction dominates.
- D. Memory speed is irrelevant to speedup  
  _Rationale:_ Amdahl's law is about serial fraction, but memory still matters in practice.

**MST-1599-Q0002** (single-answer, Select ONE) Why does reordering nested loops to improve cache locality speed up a numerical kernel?

- A. Accessing memory in a contiguous, cache-friendly order reduces costly cache misses **(key)**  
  _Rationale:_ Correct: locality keeps data in fast cache levels.
- B. It reduces the number of arithmetic operations  
  _Rationale:_ Loop reorder changes access order, not op count.
- C. It parallelises the loop automatically  
  _Rationale:_ Reordering alone does not parallelise.
- D. It eliminates the need for profiling  
  _Rationale:_ Profiling is still needed to target work.

**MST-1599-Q0003** (multiple-answer, Select ALL that apply) Which statements about parallel computing are correct? (Select TWO)

- A. Unsynchronised access to shared mutable data can cause a data race **(key)**  
  _Rationale:_ Correct: races produce nondeterministic, incorrect results.
- B. In distributed computing, excessive communication can dominate and limit scaling **(key)**  
  _Rationale:_ Correct: communication overhead caps speedup.
- C. Adding more cores always yields proportional, unlimited speedup  
  _Rationale:_ False; Amdahl's law bounds it.
- D. GPU offload has no data-transfer cost  
  _Rationale:_ False; host-device transfers are a real cost.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
