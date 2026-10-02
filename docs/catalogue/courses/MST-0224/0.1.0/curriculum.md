# Google Cloud Professional Machine Learning Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0224` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified)  - design assumption: PMLE|
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-PMLE-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame ML problems and architect ML solutions on Google Cloud
2. Prepare data and build models with Vertex AI
3. Deploy, serve and automate ML pipelines
4. Monitor, optimise and maintain ML solutions responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 ML problem framing and architecture

- Worked applications: (1) Convert a business goal into an ML problem and metric; (2) Choose a build approach: AutoML vs custom training
- Common misconception addressed: Optimising model accuracy that does not move the business metric
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Translating business goals to ML problems | 180 | 6 |
| M01L02 | Success metrics and feasibility | 180 | 6 |
| M01L03 | Architecting ML systems on Google Cloud | 180 | 6 |
| M01L04 | Responsible-AI and fairness considerations | 180 | 6 |

### M02 Data preparation and modelling

- Worked applications: (1) Design a reusable feature pipeline; (2) Set up an evaluation that guards against leakage
- Common misconception addressed: Leaking target information through features at training time
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data pipelines and feature engineering | 180 | 6 |
| M02L02 | Feature Store and data validation | 180 | 6 |
| M02L03 | Training with Vertex AI | 180 | 6 |
| M02L04 | Hyperparameter tuning and evaluation | 180 | 6 |

### M03 Deployment and automation

- Worked applications: (1) Design an automated training-to-serving pipeline; (2) Choose batch vs online serving for a use case
- Common misconception addressed: Deploying models manually with no reproducible pipeline
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Model serving and endpoints | 180 | 6 |
| M03L02 | CI/CD for ML pipelines | 180 | 6 |
| M03L03 | Pipeline orchestration with Vertex Pipelines | 180 | 6 |
| M03L04 | Batch vs online prediction | 180 | 6 |

### M04 Monitoring and optimisation

- Worked applications: (1) Define drift and quality monitors with retraining triggers; (2) Reduce serving cost while meeting latency targets
- Common misconception addressed: Assuming a deployed model needs no ongoing monitoring
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitoring prediction quality and drift | 180 | 6 |
| M04L02 | Retraining strategies | 180 | 6 |
| M04L03 | Cost and performance optimisation | 180 | 6 |
| M04L04 | Model governance and documentation | 180 | 6 |

## Integrative case

An ML engineer builds a demand-forecasting system on Vertex AI: framing the problem, building data and training pipelines, deploying a serving endpoint, and setting up monitoring, retraining and responsible-AI checks.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0224-practice-form-A | 108 | 108 | yes |
| MST-0224-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0224-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0224-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| ML problem framing and architecture | 27 |
| Data preparation and modelling | 27 |
| Deployment and automation | 27 |
| Monitoring and optimisation | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
