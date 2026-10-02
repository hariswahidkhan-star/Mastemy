# Databricks Certified Machine Learning Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0230` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Databricks (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-DBX-MLA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Databricks ML tooling for the ML workflow
2. Prepare data and engineer features on Databricks
3. Train, tune and track models with MLflow
4. Evaluate and operationalise models on Databricks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Databricks ML workflow

- Worked applications: (1) Set up an experiment and log a baseline run; (2) Choose a cluster configuration for a training job
- Common misconception addressed: Running ML training on an underpowered all-purpose cluster
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Databricks ML runtime and clusters | 90 | 6 |
| M01L02 | Notebooks and collaborative workflow | 90 | 6 |
| M01L03 | Managed MLflow overview | 90 | 6 |
| M01L04 | Working with the feature workflow | 90 | 6 |

### M02 Data preparation and features

- Worked applications: (1) Engineer features and write them for reuse; (2) Address class imbalance for a classifier
- Common misconception addressed: Computing features differently for training and inference
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reading and preparing data with Spark | 90 | 6 |
| M02L02 | Feature engineering at scale | 90 | 6 |
| M02L03 | Feature Store basics | 90 | 6 |
| M02L04 | Handling missing and skewed data | 90 | 6 |

### M03 Training, tuning and tracking

- Worked applications: (1) Run a tuning sweep and compare metrics; (2) Select a model from tracked experiments with justification
- Common misconception addressed: Tuning to the test set and overstating performance
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Training models in Databricks | 90 | 6 |
| M03L02 | Hyperparameter tuning | 90 | 6 |
| M03L03 | Tracking experiments with MLflow | 90 | 6 |
| M03L04 | Comparing and selecting runs | 90 | 6 |

### M04 Evaluation and operationalisation

- Worked applications: (1) Register a model and promote it through stages; (2) Choose an evaluation metric matching the business goal
- Common misconception addressed: Using accuracy for an imbalanced problem
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Evaluation metrics and validation | 90 | 6 |
| M04L02 | Model registry and versioning | 90 | 6 |
| M04L03 | Batch and real-time inference | 90 | 6 |
| M04L04 | Basic monitoring | 90 | 6 |

## Integrative case

A data scientist builds a churn model on Databricks: preparing features in a notebook, training and tuning with tracked experiments, evaluating results, and registering the model for use.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0230-practice-form-A | 54 | 54 | yes |
| MST-0230-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0230-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0230-final-protected | 54 | 54 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Databricks ML workflow | 14 |
| Data preparation and features | 14 |
| Training, tuning and tracking | 13 |
| Evaluation and operationalisation | 13 |

Minimum reviewed item bank: 660 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
