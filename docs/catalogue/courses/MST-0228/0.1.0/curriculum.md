# Databricks Certified Data Engineer Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0228` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Databricks (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: Certified Data Engineer Associate (assumed designation) (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official Databricks exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | MST-DAT-DBX-DEA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use the Databricks Lakehouse platform and tooling
2. Build ELT pipelines with Spark SQL and Python
3. Operate incremental and production pipelines with governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Databricks Lakehouse Platform (design assumption - weight not verified)

- Worked applications: (1) Create a cluster and run a notebook against a Delta table; (2) Explain how Delta provides ACID on object storage
- Common misconception addressed: Treating Delta Lake as a separate database engine
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Workspace, clusters and notebooks | 180 | 6 |
| M01L02 | Delta Lake fundamentals | 180 | 6 |

### M02 ELT with Spark SQL and Python (design assumption - weight not verified)

- Worked applications: (1) Write a Spark SQL query to build a silver table; (2) Deduplicate and cleanse a bronze dataset in PySpark
- Common misconception addressed: Assuming Spark SQL and PySpark cannot be mixed in one pipeline
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Transforming data with Spark SQL | 180 | 6 |
| M02L02 | Working with PySpark DataFrames | 180 | 6 |

### M03 Incremental Data Processing (design assumption - weight not verified)

- Worked applications: (1) Ingest files incrementally with Auto Loader; (2) Build a streaming merge into a Delta table
- Common misconception addressed: Reprocessing the full dataset on every run
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Structured Streaming and Auto Loader | 180 | 6 |
| M03L02 | Delta Live Tables / incremental patterns | 180 | 6 |

### M04 Production Pipelines (design assumption - weight not verified)

- Worked applications: (1) Schedule a multi-task job with dependencies; (2) Add retries and alerting to a failing task
- Common misconception addressed: Running production logic only interactively in notebooks
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Jobs, scheduling and orchestration | 180 | 6 |

### M05 Data Governance (design assumption - weight not verified)

- Worked applications: (1) Grant table access with Unity Catalog; (2) Trace lineage for a downstream dashboard table
- Common misconception addressed: Managing access per-workspace instead of centrally
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Unity Catalog, permissions and lineage | 180 | 6 |

## Integrative case

A data team lands raw events into a lakehouse; the candidate builds a medallion pipeline with Delta Lake, schedules it as a job, and applies Unity Catalog permissions.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0228-practice-form-A | 54 | 54 | yes |
| MST-0228-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0228-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0228-final-protected | 54 | 54 | yes |

| Domain | Items (practice form A) |
|---|---|
| Databricks Lakehouse Platform | 11 |
| ELT with Spark SQL and Python | 11 |
| Incremental Data Processing | 11 |
| Production Pipelines | 11 |
| Data Governance | 10 |

Minimum reviewed item bank: 564 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0228-Q0001** (single-answer, Select ONE) What does Delta Lake add on top of files in object storage?

- A. A separate proprietary database server  
  _Rationale:_ Delta Lake is a storage layer over open files, not a separate server.
- B. ACID transactions and a transaction log over Parquet files **(key)**  
  _Rationale:_ Correct: Delta adds ACID transactions via a transaction log on Parquet.
- C. Automatic deletion of all historical data  
  _Rationale:_ Delta retains history and supports time travel.
- D. A replacement for Spark  
  _Rationale:_ Delta works with Spark; it does not replace it.

**MST-0228-Q0002** (single-answer, Select ONE) Which tool incrementally ingests new files as they arrive in cloud storage?

- A. Auto Loader **(key)**  
  _Rationale:_ Correct: Auto Loader incrementally and efficiently ingests new files.
- B. A full-table COPY on every run  
  _Rationale:_ That reprocesses everything and is not incremental.
- C. Unity Catalog  
  _Rationale:_ Unity Catalog governs access; it does not ingest files.
- D. A SQL warehouse dashboard  
  _Rationale:_ That visualises data; it does not ingest files.

**MST-0228-Q0003** (multiple-answer, Select TWO) Select TWO responsibilities of Unity Catalog.

- A. Centralised access control across workspaces **(key)**  
  _Rationale:_ Correct: Unity Catalog centralises governance and access control.
- B. Executing Spark jobs on a cluster  
  _Rationale:_ Clusters execute jobs, not Unity Catalog.
- C. Data lineage tracking for tables **(key)**  
  _Rationale:_ Correct: Unity Catalog captures lineage.
- D. Replacing Delta Lake storage  
  _Rationale:_ It governs data; it does not replace the storage format.
- E. Scheduling production jobs  
  _Rationale:_ Jobs/Workflows handle scheduling.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
