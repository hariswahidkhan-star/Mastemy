# Model Serving and Inference Optimisation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1352` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Serving architectures
2. Latency, throughput and batching
3. Model optimisation techniques
4. Scaling and reliability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Serving architectures (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose a serving mode for a workload; (2) Expose a model behind a gRPC endpoint
- Common misconception addressed: Assuming every model must be served synchronously in real time
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Online, batch and streaming serving | 120 | 8 |
| M01L02 | REST/gRPC endpoints and model servers | 120 | 8 |

### M02 Latency, throughput and batching (MASTEMY-DESIGN 25%)

- Worked applications: (1) Tune dynamic batching for throughput; (2) Diagnose a tail-latency spike
- Common misconception addressed: Maximising throughput while ignoring p99 tail latency
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Latency vs throughput trade-offs | 120 | 8 |
| M02L02 | Dynamic batching and concurrency | 120 | 8 |

### M03 Model optimisation techniques (MASTEMY-DESIGN 25%)

- Worked applications: (1) Quantise a model and check accuracy loss; (2) Compile a model for a target accelerator
- Common misconception addressed: Believing quantisation is free with no accuracy or calibration cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Quantisation and pruning | 120 | 8 |
| M03L02 | Distillation and compilation (ONNX/TensorRT) | 120 | 8 |

### M04 Scaling and reliability (MASTEMY-DESIGN 25%)

- Worked applications: (1) Autoscale a GPU endpoint under load; (2) Run a shadow deployment before cutover
- Common misconception addressed: Scaling replicas before fixing a per-request inefficiency
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Autoscaling and GPU utilisation | 120 | 8 |
| M04L02 | Canary, shadow and rollback for models | 120 | 8 |

## Integrative case

A vision API meets average latency targets but violates its p99 SLA under bursts and costs too much on GPUs. Choose a serving mode, dynamic batching, quantisation/compilation and autoscaling with a shadow rollout to hit the p99 SLA at lower cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1352-final-protected | 20 | 20 | yes |
| MST-1352-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Serving architectures | 5 |
| Latency, throughput and batching | 5 |
| Model optimisation techniques | 5 |
| Scaling and reliability | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1352-Q0001** (single-answer, Select ONE) A service meets its average latency target but fails its p99 SLA during bursts. The best first step is to:

- A. Investigate tail latency: queueing, batching and concurrency limits **(key)**  
  _Rationale:_ Correct: p99 problems are usually queueing/batching, not average compute.
- B. Retrain the model for higher accuracy  
  _Rationale:_ Accuracy is unrelated to tail latency.
- C. Switch to a larger model  
  _Rationale:_ A larger model typically worsens latency.
- D. Disable monitoring to reduce overhead  
  _Rationale:_ Removing visibility does not fix latency.

**MST-1352-Q0002** (multiple-answer, Select TWO) Which TWO techniques reduce inference cost but require checking for accuracy loss? (Select TWO.)

- A. Post-training quantisation to lower precision **(key)**  
  _Rationale:_ Correct: quantisation shrinks/speeds models but can degrade accuracy.
- B. Pruning redundant weights **(key)**  
  _Rationale:_ Correct: pruning reduces compute but may hurt accuracy if over-applied.
- C. Adding more GPU replicas  
  _Rationale:_ Scaling out raises cost and does not change the model.
- D. Increasing the request timeout  
  _Rationale:_ A timeout change does not reduce compute cost.

**MST-1352-Q0003** (single-answer, Select ONE) Why run a shadow deployment before promoting a new model version?

- A. It serves real traffic copies without affecting users, revealing issues safely **(key)**  
  _Rationale:_ Correct: shadowing validates behaviour on live traffic with no user impact.
- B. It permanently replaces the old model immediately  
  _Rationale:_ That is a direct cutover, not shadowing.
- C. It trains the model on production data  
  _Rationale:_ Shadowing is for inference validation, not training.
- D. It disables autoscaling  
  _Rationale:_ Shadowing is unrelated to autoscaling.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
