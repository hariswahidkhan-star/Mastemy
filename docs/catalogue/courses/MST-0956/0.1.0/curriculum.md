# Databricks: Lakehouse Data Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0956` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-DLF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Databricks: Lakehouse Data Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Lakehouse architecture and workspace
2. Delta Lake tables
3. Data ingestion
4. Transformations with Spark and SQL
5. Orchestration and Delta Live Tables
6. Governance and performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Lakehouse architecture and workspace (MASTEMY-DESIGN 17%)

- Worked applications: (1) Sketch a bronze/silver/gold medallion layout for a retail dataset; (2) Choose cluster size for a batch ETL job
- Common misconception addressed: Treating the lakehouse as a data warehouse with no raw layer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Lakehouse and medallion architecture | 80 | 6 |
| M01L02 | Workspace, clusters and compute | 80 | 6 |
| M01L03 | Notebooks and jobs | 80 | 6 |

### M02 Delta Lake tables (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a managed Delta table and query a past version; (2) Add a column with schema evolution enabled
- Common misconception addressed: Assuming Parquet files alone give ACID guarantees
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating Delta tables | 80 | 6 |
| M02L02 | ACID transactions and time travel | 80 | 6 |
| M02L03 | Schema evolution and constraints | 80 | 6 |

### M03 Data ingestion (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure Auto Loader to ingest new JSON files; (2) Load a CSV batch into a bronze table with COPY INTO
- Common misconception addressed: Reprocessing all files every run instead of incrementally
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Auto Loader and streaming ingestion | 80 | 6 |
| M03L02 | Batch ingestion and COPY INTO | 80 | 6 |
| M03L03 | Landing raw data in bronze | 80 | 6 |

### M04 Transformations with Spark and SQL (MASTEMY-DESIGN 17%)

- Worked applications: (1) Clean and deduplicate bronze into a silver table; (2) Aggregate silver into a gold business table
- Common misconception addressed: Writing row-by-row loops instead of DataFrame operations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | DataFrame transformations | 80 | 6 |
| M04L02 | Spark SQL and views | 80 | 6 |
| M04L03 | Building silver and gold tables | 80 | 6 |

### M05 Orchestration and Delta Live Tables (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define a DLT pipeline from bronze to gold; (2) Schedule a multi-task workflow
- Common misconception addressed: Confusing a one-off notebook run with a scheduled production job
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Delta Live Tables pipelines | 80 | 6 |
| M05L02 | Workflows and job scheduling | 80 | 6 |
| M05L03 | Expectations and data quality | 80 | 6 |

### M06 Governance and performance (MASTEMY-DESIGN 16%)

- Worked applications: (1) Grant table access through Unity Catalog; (2) Run OPTIMIZE with Z-order on a large table
- Common misconception addressed: Ignoring small-file problems until queries slow down
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Unity Catalog and permissions | 80 | 6 |
| M06L02 | OPTIMIZE, Z-order and file sizing | 80 | 6 |
| M06L03 | Monitoring and cost control | 80 | 6 |

## Integrative case

Build a Databricks lakehouse for a retailer: ingest raw sales with Auto Loader, model bronze/silver/gold Delta tables, orchestrate with Delta Live Tables, and apply Unity Catalog governance and OPTIMIZE tuning.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0956-final-protected | 30 | 30 | yes |
| MST-0956-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Lakehouse architecture and workspace | 5 |
| Delta Lake tables | 5 |
| Data ingestion | 5 |
| Transformations with Spark and SQL | 5 |
| Orchestration and Delta Live Tables | 5 |
| Governance and performance | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0956-Q0001** (single-answer, Select ONE) A table must support row-level updates, deletes and querying of previous versions on a data lake. Which format fits best?

- A. A Delta Lake table **(key)**  
  _Rationale:_ Correct: Delta Lake adds a transaction log giving ACID updates, deletes and time travel.
- B. A folder of raw CSV files  
  _Rationale:_ Raw CSV has no transaction log or update support.
- C. A single uncompressed JSON file  
  _Rationale:_ A single JSON file offers no ACID or versioning.
- D. A view over plain Parquet  
  _Rationale:_ A view over plain Parquet cannot provide row-level ACID updates or time travel.

**MST-0956-Q0002** (single-answer, Select ONE) In the medallion architecture, which layer typically holds cleaned, conformed, deduplicated data?

- A. Silver **(key)**  
  _Rationale:_ Correct: the silver layer holds cleaned and conformed data refined from bronze.
- B. Bronze  
  _Rationale:_ Bronze holds raw ingested data as landed.
- C. Landing  
  _Rationale:_ Landing is the raw drop zone, not cleaned.
- D. Gold  
  _Rationale:_ Gold holds curated business-level aggregates, built from silver.

**MST-0956-Q0003** (multiple-answer, Select TWO) Which TWO are benefits of running OPTIMIZE with Z-ordering on a large Delta table? (Select TWO)

- A. It compacts many small files into larger ones **(key)**  
  _Rationale:_ Correct: OPTIMIZE compacts small files into larger, more efficient ones.
- B. It co-locates related data to speed up filtered queries **(key)**  
  _Rationale:_ Correct: Z-ordering co-locates related values so filters scan fewer files.
- C. It removes the need to define any schema  
  _Rationale:_ A schema is still required; OPTIMIZE does not remove it.
- D. It makes the table non-transactional for speed  
  _Rationale:_ Delta tables remain transactional; OPTIMIZE does not disable ACID.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
