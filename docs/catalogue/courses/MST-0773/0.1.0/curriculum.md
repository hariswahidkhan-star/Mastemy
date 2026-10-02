# Amazon SageMaker: Machine-Learning Lifecycle Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0773` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon SageMaker docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-SAGEMAKER (https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon SageMaker: Machine-Learning Lifecycle Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the SageMaker ML lifecycle
2. Prepare data and features
3. Train and tune models
4. Deploy models for inference
5. Build pipelines and automation
6. Monitor models and apply governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 ML lifecycle (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map the lifecycle to SageMaker features; (2) Navigate a project in Studio
- Common misconception addressed: Thinking SageMaker is only a notebook service
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SageMaker components | 80 | 7 |
| M01L02 | Studio and workflows | 80 | 7 |

### M02 Data and features (MASTEMY-DESIGN 16%)

- Worked applications: (1) Run a processing job to build features; (2) Store features for reuse
- Common misconception addressed: Recomputing the same features inconsistently across steps
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Processing jobs | 80 | 7 |
| M02L02 | Feature Store | 80 | 7 |

### M03 Training and tuning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Train with a built-in algorithm; (2) Run a hyperparameter tuning job
- Common misconception addressed: Tuning on the test set and leaking information
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Training jobs and algorithms | 80 | 7 |
| M03L02 | Hyperparameter tuning | 80 | 7 |

### M04 Deployment and inference (MASTEMY-DESIGN 17%)

- Worked applications: (1) Deploy a real-time endpoint; (2) Choose batch transform for offline scoring
- Common misconception addressed: Paying for an always-on endpoint used only occasionally
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Real-time endpoints | 80 | 7 |
| M04L02 | Batch transform and serverless | 80 | 7 |

### M05 Pipelines and automation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a pipeline of processing, train, deploy; (2) Register a model version for approval
- Common misconception addressed: Deploying models manually with no reproducible pipeline
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | SageMaker Pipelines | 80 | 7 |
| M05L02 | Model registry | 80 | 7 |

### M06 Monitoring and governance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable Model Monitor on an endpoint; (2) Produce an explainability report
- Common misconception addressed: Assuming a deployed model stays accurate without monitoring
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Model Monitor and drift | 80 | 7 |
| M06L02 | Bias, explainability and governance | 80 | 7 |

## Integrative case

Take a churn model through its lifecycle on SageMaker: prepare features in a processing job, train with a built-in algorithm and tune hyperparameters, deploy a real-time endpoint, wrap the steps in a pipeline, and monitor the endpoint for data drift.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0773-final-protected | 40 | 50 | yes |
| MST-0773-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| ML lifecycle | 6 |
| Data and features | 6 |
| Training and tuning | 7 |
| Deployment and inference | 7 |
| Pipelines and automation | 7 |
| Monitoring and governance | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0773-Q0001** (single-answer, Select ONE) Which SageMaker capability is best for offline scoring of a large dataset with no need for a live endpoint?

- A. Batch transform **(key)**  
  _Rationale:_ Correct: batch transform scores datasets without a persistent endpoint.
- B. A real-time endpoint running 24/7  
  _Rationale:_ A live endpoint is for low-latency online inference, not one-off batch scoring.
- C. A processing job for feature prep only  
  _Rationale:_ Processing jobs prepare data; they are not the scoring mechanism here.
- D. The model registry  
  _Rationale:_ The registry versions models; it does not score data.

**MST-0773-Q0002** (single-answer, Select ONE) What does SageMaker Model Monitor help detect after deployment?

- A. Data and quality drift that can degrade predictions over time **(key)**  
  _Rationale:_ Correct: Model Monitor watches for drift and quality issues.
- B. The price of EC2 instances  
  _Rationale:_ It monitors model data, not pricing.
- C. The colour scheme of Studio  
  _Rationale:_ It is not a UI setting.
- D. The number of S3 buckets  
  _Rationale:_ It is unrelated to bucket counts.

**MST-0773-Q0003** (multiple-answer, Select TWO) Which TWO practices support a reliable, repeatable ML workflow on SageMaker? (Select TWO.)

- A. Define the steps as a SageMaker Pipeline **(key)**  
  _Rationale:_ Correct: pipelines make the workflow reproducible.
- B. Register and version models for approval **(key)**  
  _Rationale:_ Correct: a model registry governs promotion.
- C. Tune hyperparameters on the test set  
  _Rationale:_ Tuning on the test set leaks information.
- D. Deploy manually with no automation  
  _Rationale:_ Manual deploys are error-prone and not repeatable.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
