# GPU Computing Fundamentals for AI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1356` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. GPU architecture basics
2. Memory and data movement
3. Precision and throughput
4. Scaling and utilisation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 GPU architecture basics (MASTEMY-DESIGN 25%)

- Worked applications: (1) Explain why GPUs suit matrix math; (2) Identify a workload that fits a GPU
- Common misconception addressed: Assuming a GPU speeds up every workload, including serial code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CPUs vs GPUs: SIMT and parallelism | 120 | 8 |
| M01L02 | Cores, warps and memory hierarchy | 120 | 8 |

### M02 Memory and data movement (MASTEMY-DESIGN 25%)

- Worked applications: (1) Diagnose a transfer-bound kernel; (2) Improve memory access patterns
- Common misconception addressed: Ignoring PCIe transfer cost when timing GPU code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Host-device transfers and bandwidth | 120 | 8 |
| M02L02 | Memory coalescing and occupancy | 120 | 8 |

### M03 Precision and throughput (MASTEMY-DESIGN 25%)

- Worked applications: (1) Enable mixed precision safely; (2) Choose a precision for a training run
- Common misconception addressed: Believing lower precision always trains correctly without loss scaling
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | FP32, FP16, BF16 and tensor cores | 120 | 8 |
| M03L02 | Mixed-precision training | 120 | 8 |

### M04 Scaling and utilisation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick a parallelism strategy; (2) Profile and raise GPU utilisation
- Common misconception addressed: Adding GPUs while the bottleneck is data loading
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Multi-GPU: data vs model parallelism | 120 | 8 |
| M04L02 | Profiling and utilisation | 120 | 8 |

## Integrative case

A training run is slow and GPUs sit at 30% utilisation. Profile to find whether the bottleneck is data loading, host-device transfers or precision, then apply mixed precision and the right parallelism to raise throughput cost-effectively.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1356-final-protected | 20 | 20 | yes |
| MST-1356-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GPU architecture basics | 5 |
| Memory and data movement | 5 |
| Precision and throughput | 5 |
| Scaling and utilisation | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1356-Q0001** (single-answer, Select ONE) Why are GPUs well suited to deep-learning matrix multiplications?

- A. They execute many identical operations in parallel across thousands of cores **(key)**  
  _Rationale:_ Correct: the SIMT model excels at massively parallel, regular math.
- B. They run a single thread much faster than any CPU  
  _Rationale:_ GPUs favour throughput over single-thread speed.
- C. They have no memory limits  
  _Rationale:_ GPU memory is limited and often the constraint.
- D. They only help with serial branch-heavy code  
  _Rationale:_ GPUs are poor at serial, branch-heavy code.

**MST-1356-Q0002** (multiple-answer, Select TWO) Which TWO are real risks of lowering precision to FP16 during training? (Select TWO.)

- A. Numerical underflow/overflow without loss scaling **(key)**  
  _Rationale:_ Correct: FP16 has limited range, needing loss scaling.
- B. Reduced accuracy if sensitive ops stay in low precision **(key)**  
  _Rationale:_ Correct: some ops must remain in higher precision.
- C. The GPU physically overheats and melts  
  _Rationale:_ Precision choice is not a thermal failure mode.
- D. Training can no longer use any tensor cores  
  _Rationale:_ Tensor cores are designed for lower precision.

**MST-1356-Q0003** (single-answer, Select ONE) GPUs are at 30% utilisation and the CPU data loader is maxed out. Adding more GPUs will:

- A. Not help, because the bottleneck is data loading, not GPU compute **(key)**  
  _Rationale:_ Correct: you must fix the input pipeline first.
- B. Linearly speed up training  
  _Rationale:_ No; idle GPUs cannot be fed faster.
- C. Reduce the data-loading time  
  _Rationale:_ More GPUs do not speed the CPU loader.
- D. Automatically balance the pipeline  
  _Rationale:_ Rebalancing requires fixing the loader, not adding GPUs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
