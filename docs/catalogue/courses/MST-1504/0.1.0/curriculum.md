# AWS Data Engineering Pipelines

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1504` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Data Engineering Pipelines (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design batch and streaming data pipelines on AWS
2. Ingest and transform data with Glue and Kinesis
3. Build a data lake on S3 with partitioning and catalog
4. Query, orchestrate and govern pipelines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Pipeline design (MASTEMY-DESIGN 25%)

- Worked applications: (1) Sketch an ingest-store-transform-serve flow; (2) Decide batch vs streaming for a source
- Common misconception addressed: Assuming streaming is always needed when daily batch suffices
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data engineering reference architecture | 72 | 7 |
| M01L02 | Batch vs streaming on AWS | 72 | 7 |

### M02 Ingestion and transformation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Ingest events through a Kinesis stream; (2) Write a Glue job transforming raw to curated
- Common misconception addressed: Confusing the Glue Data Catalog with the actual data storage
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Kinesis for streaming ingest | 72 | 7 |
| M02L02 | AWS Glue ETL and the Data Catalog | 72 | 7 |

### M03 Data lake and storage (MASTEMY-DESIGN 25%)

- Worked applications: (1) Partition S3 data by date; (2) Choose Parquet over JSON for analytics
- Common misconception addressed: Storing millions of tiny files and hurting query performance
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | S3 as the data lake | 72 | 7 |
| M03L02 | Partitioning and file formats | 72 | 7 |

### M04 Query and orchestration (MASTEMY-DESIGN 25%)

- Worked applications: (1) Query partitioned data with Athena; (2) Schedule and monitor the pipeline
- Common misconception addressed: Treating a manual ad-hoc load as a governed production pipeline
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Querying with Athena | 72 | 7 |
| M04L02 | Orchestration and governance | 72 | 7 |

## Integrative case

A company must turn raw logs into analytics tables. Design a pipeline: ingest with Kinesis, land raw data in an S3 lake, transform with Glue, catalog and partition, query with Athena, and orchestrate the daily runs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1504-final-protected | 28 | 35 | yes |
| MST-1504-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Pipeline design | 7 |
| Ingestion and transformation | 7 |
| Data lake and storage | 7 |
| Query and orchestration | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1504-Q0001** (single-answer, Select ONE) Which service lets you run SQL directly over data stored in S3 without loading it elsewhere?

- A. Amazon Athena **(key)**  
  _Rationale:_ Correct: Athena queries S3 data in place using SQL.
- B. Amazon SNS  
  _Rationale:_ SNS is pub/sub notifications, not SQL query.
- C. AWS IAM  
  _Rationale:_ IAM manages access, not queries.
- D. Amazon Route 53  
  _Rationale:_ Route 53 is DNS, not query.

**MST-1504-Q0002** (multiple-answer, Select TWO) Which TWO improve analytics performance/cost on an S3 data lake? (Select TWO.)

- A. Partition data by a commonly filtered key such as date **(key)**  
  _Rationale:_ Correct: partitioning prunes scanned data.
- B. Use a columnar format like Parquet **(key)**  
  _Rationale:_ Correct: columnar formats cut scanned bytes and improve speed.
- C. Store data as many tiny uncompressed files  
  _Rationale:_ Tiny files hurt performance.
- D. Keep everything in one giant JSON file  
  _Rationale:_ That harms query efficiency.

**MST-1504-Q0003** (single-answer, Select ONE) What does the AWS Glue Data Catalog primarily store?

- A. Metadata (schemas, table and partition definitions) for datasets **(key)**  
  _Rationale:_ Correct: the catalog holds metadata, not the data itself.
- B. The actual raw data files  
  _Rationale:_ Data lives in S3; the catalog stores metadata.
- C. User passwords  
  _Rationale:_ The catalog does not store credentials.
- D. Billing invoices  
  _Rationale:_ It does not store billing data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
