# AI Hardware And Accelerators (GPUs/TPUs)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2328` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI Hardware And Accelerators (GPUs/TPUs) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why specialised accelerators outperform CPUs for AI workloads
2. Describe GPU architecture and the SIMT execution model
3. Explain TPUs and systolic-array matrix engines
4. Reason about memory bandwidth, the roofline model and data movement
5. Compare precision formats and their effect on throughput and accuracy
6. Describe scaling, interconnects and accelerator selection trade-offs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why accelerators (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain why a matrix multiply suits a GPU better than a single CPU core; (2) Estimate the arithmetic intensity of an operation to predict the bottleneck
- Common misconception addressed: Assuming a higher clock speed always means faster AI training
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CPU vs GPU vs TPU for AI | 120 | 7 |
| M01L02 | Parallelism and arithmetic intensity | 120 | 7 |

### M02 GPU architecture (25% (Mastemy design weight), design weight)

- Worked applications: (1) Describe how a warp of threads executes the same instruction on different data; (2) Explain why divergent branches hurt SIMT efficiency
- Common misconception addressed: Treating a GPU as thousands of independent general-purpose CPUs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SIMT, warps and the memory hierarchy | 120 | 7 |
| M02L02 | Tensor cores and matrix throughput | 120 | 7 |

### M03 TPUs and dataflow (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace how weights and activations flow through a systolic array; (2) Explain why keeping data on-chip reduces energy and latency
- Common misconception addressed: Believing a TPU is just a faster CPU
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Systolic arrays and matrix units | 120 | 7 |
| M03L02 | Dataflow and on-chip memory | 120 | 7 |

### M04 Performance and scaling (25% (Mastemy design weight), design weight)

- Worked applications: (1) Place a kernel on the roofline to decide if it is compute- or memory-bound; (2) Choose a precision format (FP32, FP16, BF16, INT8) for a given accuracy budget
- Common misconception addressed: Assuming lower precision always loses unacceptable accuracy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The roofline model and bandwidth | 120 | 7 |
| M04L02 | Precision formats, interconnects and scaling | 120 | 7 |

## Integrative case

A team must train and serve a large model cost-effectively: decide between GPUs and TPUs, analyse whether key kernels are compute- or memory-bound with the roofline model, choose precision formats, and justify the interconnect and scaling plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2328-final-protected | 40 | 40 | yes |
| MST-2328-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why accelerators | 10 |
| GPU architecture | 10 |
| TPUs and dataflow | 10 |
| Performance and scaling | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2328-Q0001** (single-answer, Select ONE) Why do GPUs and TPUs outperform general-purpose CPUs on deep-learning matrix operations?

- A. They provide massive data parallelism and dedicated matrix units suited to these regular operations **(key)**  
  _Rationale:_ Correct: accelerators exploit the regular, highly parallel structure of matrix math.
- B. They run at far higher clock frequencies than any CPU  
  _Rationale:_ Accelerators often clock lower; their advantage is parallelism, not clock speed.
- C. They execute Python source code directly in hardware  
  _Rationale:_ They do not execute Python directly; kernels are compiled.
- D. They avoid using memory entirely  
  _Rationale:_ Memory bandwidth is central; they do not avoid memory.

**MST-2328-Q0002** (multiple-answer, Select TWO) Which TWO factors most strongly limit throughput for a memory-bound AI kernel? (Select TWO.)

- A. Available memory bandwidth to feed the compute units **(key)**  
  _Rationale:_ Correct: a memory-bound kernel is limited by how fast data can be delivered.
- B. The amount of data movement between memory and the chip **(key)**  
  _Rationale:_ Correct: excess data movement starves the compute units.
- C. The number of comment lines in the source code  
  _Rationale:_ Source comments have no effect on runtime throughput.
- D. The colour of the accelerator's heatsink  
  _Rationale:_ Physical appearance is irrelevant to throughput.

**MST-2328-Q0003** (single-answer, Select ONE) Using the roofline model, a kernel sits to the left of the ridge point. What does this indicate?

- A. It is memory-bound, so improving data reuse or bandwidth helps most **(key)**  
  _Rationale:_ Correct: left of the ridge point means performance is bounded by memory bandwidth.
- B. It is compute-bound and needs more arithmetic units  
  _Rationale:_ Compute-bound kernels sit to the right of the ridge point.
- C. It has reached the theoretical peak performance  
  _Rationale:_ Sitting left of the ridge means it is below peak, bounded by bandwidth.
- D. Precision format is the only possible bottleneck  
  _Rationale:_ The roofline position points to bandwidth, not solely precision.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
