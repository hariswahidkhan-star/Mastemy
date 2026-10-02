# Databricks Certified Machine Learning Professional

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0231` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Databricks (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-DBX-MLP-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design production ML systems on Databricks
2. Operationalise feature and model pipelines
3. Implement model deployment, monitoring and retraining
4. Apply MLOps governance and reliability practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Production ML design

- Worked applications: (1) Design a reproducible training pipeline with lineage; (2) Plan versioning for data, features and models
- Common misconception addressed: Treating a notebook as a production deployment
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reference architecture for ML on Databricks | 180 | 6 |
| M01L02 | Experiment-to-production workflow | 180 | 6 |
| M01L03 | Data and model versioning | 180 | 6 |
| M01L04 | Reproducibility and lineage | 180 | 6 |

### M02 Feature and model pipelines

- Worked applications: (1) Build an orchestrated training pipeline; (2) Add tests catching feature schema drift
- Common misconception addressed: Recomputing features inconsistently between stages
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Feature Store in production | 180 | 6 |
| M02L02 | Pipeline orchestration with Jobs | 180 | 6 |
| M02L03 | Automated training pipelines | 180 | 6 |
| M02L04 | Testing ML pipelines | 180 | 6 |

### M03 Deployment and monitoring

- Worked applications: (1) Design drift monitoring with a retraining trigger; (2) Choose a serving pattern meeting latency needs
- Common misconception addressed: Monitoring infrastructure but not prediction quality
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Model serving options | 180 | 6 |
| M03L02 | Batch and streaming inference | 180 | 6 |
| M03L03 | Monitoring performance and drift | 180 | 6 |
| M03L04 | Alerting and retraining triggers | 180 | 6 |

### M04 MLOps governance and reliability

- Worked applications: (1) Design a CI/CD gate for model promotion; (2) Plan a rollback for a bad model release
- Common misconception addressed: Promoting models without an approval or rollback path
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | CI/CD for ML | 180 | 6 |
| M04L02 | Access control and governance | 180 | 6 |
| M04L03 | Cost and performance management | 180 | 6 |
| M04L04 | Incident handling for ML systems | 180 | 6 |

## Integrative case

An ML engineer productionises a recommendation model on Databricks: building feature and training pipelines, deploying with the model registry, and implementing monitoring, drift detection and automated retraining.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0231-practice-form-A | 108 | 108 | yes |
| MST-0231-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0231-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0231-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Production ML design | 27 |
| Feature and model pipelines | 27 |
| Deployment and monitoring | 27 |
| MLOps governance and reliability | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
