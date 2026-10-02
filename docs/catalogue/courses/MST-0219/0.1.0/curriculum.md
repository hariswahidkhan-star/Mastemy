# Google Cloud Professional Data Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0219` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified)  - design assumption: PDE|
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-PDE-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design data processing systems on Google Cloud
2. Build and operationalise batch and streaming pipelines
3. Operationalise machine learning and ensure data quality
4. Ensure solution reliability, security and cost efficiency

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Designing data processing systems

- Worked applications: (1) Choose storage, warehouse and processing services for a scenario; (2) Design a schema for a slowly changing dimension
- Common misconception addressed: Choosing a single service for every workload shape
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Requirements and architecture choices | 180 | 6 |
| M01L02 | Storage and warehouse selection | 180 | 6 |
| M01L03 | Schema and data modelling | 180 | 6 |
| M01L04 | Designing for migration and interoperability | 180 | 6 |

### M02 Building and operationalising pipelines

- Worked applications: (1) Design a streaming pipeline with late-data handling; (2) Add idempotency and retries to a batch job
- Common misconception addressed: Treating streaming as batch with a smaller interval
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Batch pipelines with Dataflow and BigQuery | 180 | 6 |
| M02L02 | Streaming pipelines and windowing | 180 | 6 |
| M02L03 | Orchestration and scheduling | 180 | 6 |
| M02L04 | Pipeline testing and CI/CD | 180 | 6 |

### M03 Operationalising ML and data quality

- Worked applications: (1) Design a feature pipeline feeding both training and serving; (2) Define drift monitoring for a deployed model
- Common misconception addressed: Assuming a model stays accurate without drift monitoring
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Feature pipelines and training data | 180 | 6 |
| M03L02 | Deploying and serving models | 180 | 6 |
| M03L03 | Monitoring models and data drift | 180 | 6 |
| M03L04 | Data quality and validation | 180 | 6 |

### M04 Reliability, security and cost

- Worked applications: (1) Design a DR plan for a critical pipeline; (2) Reduce the cost of a recurring large query workload
- Common misconception addressed: Optimising cost by sampling data and corrupting results
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reliability, SLAs and disaster recovery | 180 | 6 |
| M04L02 | Security, IAM and encryption for data | 180 | 6 |
| M04L03 | Cost optimisation of pipelines and storage | 180 | 6 |
| M04L04 | Observability and incident response | 180 | 6 |

## Integrative case

A data engineer designs an end-to-end platform on Google Cloud for a logistics firm: ingesting streaming telemetry, building batch and streaming pipelines, operationalising an ML model, and meeting reliability, security and cost targets.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0219-practice-form-A | 108 | 108 | yes |
| MST-0219-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0219-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0219-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Designing data processing systems | 27 |
| Building and operationalising pipelines | 27 |
| Operationalising ML and data quality | 27 |
| Reliability, security and cost | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
