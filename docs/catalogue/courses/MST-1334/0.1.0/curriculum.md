# Distributed Training at Scale

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1334` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain data, model and pipeline parallelism and when each applies
2. Describe how gradients are synchronised across workers
3. Identify communication bottlenecks in multi-GPU and multi-node training
4. Choose a sharding or parallelism strategy for a given model and cluster
5. Recognise fault-tolerance and checkpointing needs at scale

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why single-device training stops scaling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Estimate when a model exceeds single-GPU memory; (2) Explain why throughput stalls when batch size grows
- Common misconception addressed: Believing adding GPUs always gives linear speed-up
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Memory and compute limits of one accelerator | 120 | 8 |
| M01L02 | Scaling laws and the case for distribution | 120 | 8 |

### M02 Data parallelism and gradient synchronisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace an all-reduce across four workers; (2) Decide between synchronous and asynchronous updates
- Common misconception addressed: Thinking all-reduce is free of communication cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data-parallel training and all-reduce | 120 | 8 |
| M02L02 | Synchronous vs asynchronous SGD | 120 | 8 |

### M03 Model, pipeline and tensor parallelism (MASTEMY-DESIGN 20%)

- Worked applications: (1) Partition a transformer across pipeline stages; (2) Identify where tensor parallelism beats pipeline parallelism
- Common misconception addressed: Assuming any model can be split arbitrarily without cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pipeline parallelism and micro-batching | 120 | 8 |
| M03L02 | Tensor and sharded parallelism (ZeRO/FSDP) | 120 | 8 |

### M04 Communication and the interconnect (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a bandwidth-bound step in a training profile; (2) Map collective operations to interconnect topology
- Common misconception addressed: Ignoring network topology when planning a job
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Collectives, bandwidth and overlap | 120 | 8 |
| M04L02 | Topology, NCCL and gradient compression | 120 | 8 |

### M05 Fault tolerance at scale (MASTEMY-DESIGN 20%)

- Worked applications: (1) Plan a checkpoint cadence for a preemptible cluster; (2) Design recovery after a mid-epoch node loss
- Common misconception addressed: Treating long runs as if nodes never fail
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Checkpointing and elastic training | 120 | 8 |
| M05L02 | Monitoring and recovering large jobs | 120 | 8 |

## Integrative case

A team must train a large model that no longer fits on a single GPU within the time budget. Choose a parallelism strategy, estimate the communication overhead, plan checkpointing for a multi-day run on preemptible nodes, and justify the trade-offs to infrastructure stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1334-final-protected | 25 | 25 | yes |
| MST-1334-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why single-device training stops scaling | 5 |
| Data parallelism and gradient synchronisation | 5 |
| Model, pipeline and tensor parallelism | 5 |
| Communication and the interconnect | 5 |
| Fault tolerance at scale | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1334-Q0001** (single-answer, Select ONE) In standard synchronous data-parallel training, what does the all-reduce step accomplish each iteration?

- A. It averages the gradients computed on every worker so all replicas apply the same update **(key)**  
  _Rationale:_ Correct: all-reduce sums/averages per-worker gradients so model replicas stay identical.
- B. It copies the full dataset to every worker before the forward pass  
  _Rationale:_ Data sharding, not all-reduce, distributes data; all-reduce exchanges gradients.
- C. It splits the model layers across workers  
  _Rationale:_ That is model/pipeline parallelism, not the all-reduce of data parallelism.
- D. It compresses the model weights for storage  
  _Rationale:_ All-reduce synchronises gradients; it is not a storage-compression step.

**MST-1334-Q0002** (multiple-answer, Select TWO) Which TWO conditions most strongly favour tensor/sharded parallelism (e.g. FSDP/ZeRO) over plain data parallelism? (Select TWO.)

- A. The model's parameters and optimiser state exceed a single device's memory **(key)**  
  _Rationale:_ Correct: sharding the state across devices is the main reason to use FSDP/ZeRO.
- B. A high-bandwidth interconnect is available between devices **(key)**  
  _Rationale:_ Correct: sharded parallelism exchanges more data, so it relies on fast interconnect.
- C. The model is tiny and fits easily on one GPU  
  _Rationale:_ A small model needs no sharding; data parallelism suffices.
- D. There is no network between the workers  
  _Rationale:_ Sharded parallelism requires frequent communication; no network makes it unworkable.

**MST-1334-Q0003** (single-answer, Select ONE) A multi-day run uses preemptible nodes that can disappear at any time. What is the most important mitigation?

- A. Checkpoint model and optimiser state frequently so training can resume **(key)**  
  _Rationale:_ Correct: frequent checkpointing bounds the work lost when a node is preempted.
- B. Disable logging to save disk space  
  _Rationale:_ Logging is unrelated to surviving preemption and aids diagnosis.
- C. Use a larger learning rate  
  _Rationale:_ Learning rate does not address node loss.
- D. Train on a single node only  
  _Rationale:_ That may avoid preemption but defeats the need to train at scale.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
