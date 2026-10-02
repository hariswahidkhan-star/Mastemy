# AWS Data Engineering with Glue and Lake Formation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0769` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on AWS Glue and Lake Formation docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-GLUE-LF (https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AWS Data Engineering with Glue and Lake Formation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the data lake and catalog model
2. Crawl and catalog data with Glue
3. Build ETL jobs with Glue
4. Orchestrate pipelines and workflows
5. Govern access with Lake Formation
6. Apply quality, partitioning and cost practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Data lake and catalog (MASTEMY-DESIGN 16%)

- Worked applications: (1) Register raw and curated S3 zones; (2) Describe a table in the Data Catalog
- Common misconception addressed: Treating a data lake as a schema-on-write warehouse
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data lake concepts | 80 | 7 |
| M01L02 | The Glue Data Catalog | 80 | 7 |

### M02 Crawling and cataloging (MASTEMY-DESIGN 16%)

- Worked applications: (1) Crawl S3 to populate catalog tables; (2) Fix an inferred schema with a classifier
- Common misconception addressed: Letting a crawler repeatedly create duplicate tables
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Glue crawlers | 80 | 7 |
| M02L02 | Schemas and classifiers | 80 | 7 |

### M03 Glue ETL (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a Glue job to clean and join data; (2) Partition output by date on write
- Common misconception addressed: Reading an entire dataset when a partition filter would do
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Glue jobs and scripts | 80 | 7 |
| M03L02 | DynamicFrames and transforms | 80 | 7 |

### M04 Orchestration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a workflow of crawler then job; (2) Enable job bookmarks for incremental loads
- Common misconception addressed: Reprocessing all data each run instead of incrementally
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Glue workflows and triggers | 80 | 7 |
| M04L02 | Job bookmarks | 80 | 7 |

### M05 Lake Formation governance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Grant a role access to one table; (2) Mask a column with column-level permissions
- Common misconception addressed: Relying only on S3 bucket policies for fine-grained access
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Permissions model | 80 | 7 |
| M05L02 | Table- and column-level access | 80 | 7 |

### M06 Quality and cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert data to columnar Parquet; (2) Add a data-quality check to a pipeline
- Common misconception addressed: Storing everything as uncompressed CSV
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Partitioning and formats | 80 | 7 |
| M06L02 | Data quality and cost control | 80 | 7 |

## Integrative case

Build a governed sales data lake: crawl raw S3 data into the Glue Data Catalog, write a Glue ETL job to clean and partition it, orchestrate a daily workflow, grant table- and column-level access with Lake Formation, and query the result in Athena.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0769-final-protected | 40 | 50 | yes |
| MST-0769-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data lake and catalog | 6 |
| Crawling and cataloging | 6 |
| Glue ETL | 7 |
| Orchestration | 7 |
| Lake Formation governance | 7 |
| Quality and cost | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0769-Q0001** (single-answer, Select ONE) What does the AWS Glue Data Catalog provide?

- A. A central metadata store of table definitions and schemas for your data **(key)**  
  _Rationale:_ Correct: the Data Catalog holds table and schema metadata.
- B. The physical storage of the data itself  
  _Rationale:_ Data stays in S3; the catalog stores metadata.
- C. A relational database engine  
  _Rationale:_ It is a metadata catalog, not a database engine.
- D. A billing dashboard  
  _Rationale:_ It is not a billing tool.

**MST-0769-Q0002** (single-answer, Select ONE) What is the main governance advantage of Lake Formation over S3 bucket policies alone?

- A. Fine-grained table- and column-level access control **(key)**  
  _Rationale:_ Correct: Lake Formation adds table/column-level permissions.
- B. Cheaper storage pricing  
  _Rationale:_ Lake Formation is about governance, not storage price.
- C. Automatic schema inference  
  _Rationale:_ Schema inference is a crawler function.
- D. Faster network throughput  
  _Rationale:_ It does not change network throughput.

**MST-0769-Q0003** (multiple-answer, Select TWO) Which TWO practices improve data-lake query performance and cost? (Select TWO.)

- A. Store data in a columnar format such as Parquet **(key)**  
  _Rationale:_ Correct: columnar formats cut scan cost.
- B. Partition data by a commonly filtered key **(key)**  
  _Rationale:_ Correct: partitioning prunes data scanned.
- C. Keep everything as uncompressed CSV  
  _Rationale:_ Uncompressed CSV scans more data and costs more.
- D. Reprocess all data on every run  
  _Rationale:_ Full reprocessing wastes compute.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
