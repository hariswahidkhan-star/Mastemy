# Google Cloud Associate Data Practitioner

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0216` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-ADP-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Prepare, ingest and store data using Google Cloud services
2. Transform and model data for analytics workloads
3. Query, analyse and visualise data on Google Cloud
4. Apply governance, security and cost practices to data work

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Data ingestion and storage

- Worked applications: (1) Select storage and ingestion services for three data sources; (2) Load a CSV dataset into BigQuery and validate it
- Common misconception addressed: Treating object storage and a data warehouse as interchangeable
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Storage options for structured and unstructured data | 90 | 6 |
| M01L02 | Batch and streaming ingestion patterns | 90 | 6 |
| M01L03 | Loading data into BigQuery | 90 | 6 |
| M01L04 | Choosing a storage layout | 90 | 6 |

### M02 Data transformation and modelling

- Worked applications: (1) Design a transformation step to deduplicate and standardise records; (2) Model a raw table into an analytics-ready schema
- Common misconception addressed: Transforming data in the dashboard layer instead of upstream
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cleaning and transforming data | 90 | 6 |
| M02L02 | Building pipelines for transformation | 90 | 6 |
| M02L03 | Modelling data for analytics | 90 | 6 |
| M02L04 | Managing data quality | 90 | 6 |

### M03 Analysis and visualisation

- Worked applications: (1) Write a query answering a trend question with a window function; (2) Build a dashboard view for a stakeholder question
- Common misconception addressed: Reporting raw counts without context or a defined metric
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Writing analytical SQL in BigQuery | 90 | 6 |
| M03L02 | Aggregations and window functions | 90 | 6 |
| M03L03 | Building dashboards and reports | 90 | 6 |
| M03L04 | Sharing insights responsibly | 90 | 6 |

### M04 Governance, security and cost

- Worked applications: (1) Set least-privilege access for a reporting dataset; (2) Estimate and reduce the cost of a heavy query
- Common misconception addressed: Granting broad project access instead of dataset-level roles
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Access control and IAM for data | 90 | 6 |
| M04L02 | Data protection and compliance basics | 90 | 6 |
| M04L03 | Cost controls for queries and storage | 90 | 6 |
| M04L04 | Monitoring data workloads | 90 | 6 |

## Integrative case

An analyst sets up a reporting pipeline on Google Cloud: they ingest raw files, transform them into a modelled dataset, build queries and a dashboard, and apply access and cost controls.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0216-practice-form-A | 54 | 54 | yes |
| MST-0216-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0216-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0216-final-protected | 54 | 54 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Data ingestion and storage | 14 |
| Data transformation and modelling | 14 |
| Analysis and visualisation | 13 |
| Governance, security and cost | 13 |

Minimum reviewed item bank: 660 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
