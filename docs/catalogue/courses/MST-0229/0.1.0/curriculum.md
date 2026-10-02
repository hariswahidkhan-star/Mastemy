# Databricks Certified Data Engineer Professional

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0229` v0.1.0 | Batch 8 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Databricks (no affiliation or endorsement) |
| Exam code | Databricks Certified Data Engineer Professional (Databricks uses the descriptive title; no short exam code published) |
| Version basis | Databricks Certified Data Engineer Professional (accessed 2026-10-02); confirm current domain weights on the exam guide |
| Evidence | **verified-official-source** - sources: SRC-DBX-DEP |
| Legacy IDs | MST-DAT-DBX-DEP-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Develop production data-processing code in Python and SQL on Databricks
2. Build and optimize data ingestion, transformation and modeling pipelines with Delta Lake
3. Apply security, governance and data-quality controls
4. Deploy, monitor and test data engineering solutions using Databricks tooling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Developing Code for Data Processing (design assumption (confirm current weight))

- Worked applications: (1) Refactor a batch job to an incremental Python/SQL pipeline; (2) Use the Spark APIs to handle a complex transformation
- Common misconception addressed: Assuming collect() on large data is acceptable in production
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Python and SQL on Databricks | 360 | 6 |
| M01L02 | Spark processing and performance patterns | 360 | 6 |

### M02 Data Ingestion, Transformation and Modeling (design assumption (confirm current weight))

- Worked applications: (1) Design a bronze/silver/gold Delta architecture; (2) Implement Auto Loader for incremental ingestion
- Common misconception addressed: Overwriting Delta tables when an incremental merge is correct
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Ingestion, Auto Loader and streaming | 360 | 6 |
| M02L02 | Delta Lake, transformations and data modeling | 360 | 6 |

### M03 Security, Governance and Data Quality (design assumption (confirm current weight))

- Worked applications: (1) Apply Unity Catalog grants for least privilege; (2) Add data-quality expectations to a pipeline
- Common misconception addressed: Treating governance as an afterthought rather than built in
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Unity Catalog, security and governance | 360 | 6 |
| M03L02 | Data quality, expectations and monitoring | 360 | 6 |

### M04 Testing, Deployment and Monitoring (design assumption (confirm current weight))

- Worked applications: (1) Build a CI/CD workflow with Databricks Asset Bundles; (2) Set up logging and alerting for a production job
- Common misconception addressed: Deploying without automated tests or rollback
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Testing and CI/CD with Asset Bundles and the CLI | 360 | 6 |
| M04L02 | Monitoring, logging and observability | 360 | 6 |

## Integrative case

A data engineer productionizes a streaming ingestion pipeline on Databricks: writes Python/SQL transformations, models data into Delta tables, applies Unity Catalog governance and quality checks, then deploys with CI/CD and sets up monitoring.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - confirm official question count and duration on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0229-practice-form-A | 108 | 108 | yes |
| MST-0229-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0229-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0229-final-protected | 108 | 108 | yes |

| Domain | Items per form |
|---|---|
| Developing Code for Data Processing | 27 |
| Data Ingestion, Transformation and Modeling | 27 |
| Security, Governance and Data Quality | 27 |
| Testing, Deployment and Monitoring | 27 |

Minimum reviewed item bank: 1032 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0229-Q0001** (single-answer, Select ONE) In a medallion (bronze/silver/gold) architecture, what is the typical purpose of the bronze layer?

- A. Serve curated, business-ready aggregates  
  _Rationale:_ That describes the gold layer.
- B. Store raw ingested data with minimal transformation **(key)**  
  _Rationale:_ Correct: the bronze layer captures raw ingested data, preserving source fidelity before cleansing.
- C. Hold only the final dashboards  
  _Rationale:_ Dashboards are not a data layer.
- D. Replace the need for silver and gold layers  
  _Rationale:_ Bronze is the first of three layers, not a replacement.

**MST-0229-Q0002** (single-answer, Select ONE) Which Databricks feature provides incremental, exactly-once file ingestion as new files arrive?

- A. A one-time full table overwrite  
  _Rationale:_ Overwrite reprocesses everything and is not incremental.
- B. Auto Loader **(key)**  
  _Rationale:_ Correct: Auto Loader incrementally and efficiently ingests new files as they land, tracking what has been processed.
- C. A static SELECT query  
  _Rationale:_ A static query does not track new arrivals.
- D. Manual CSV upload  
  _Rationale:_ Manual upload is neither incremental nor automated.

**MST-0229-Q0003** (multiple-answer, Select TWO) Which TWO support governance and least-privilege access on Databricks? (Select TWO)

- A. Unity Catalog grants on tables and schemas **(key)**  
  _Rationale:_ Correct: Unity Catalog manages fine-grained access to data assets.
- B. Scoped service principals for automated jobs **(key)**  
  _Rationale:_ Correct: scoped service principals limit automation permissions.
- C. Sharing one admin token with all engineers  
  _Rationale:_ Shared admin tokens break least privilege.
- D. Making every table world-readable  
  _Rationale:_ World-readable tables violate least privilege.
- E. Disabling access controls to speed development  
  _Rationale:_ Disabling controls removes governance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
