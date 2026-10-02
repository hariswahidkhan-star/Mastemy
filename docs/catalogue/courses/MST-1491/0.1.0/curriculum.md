# Amazon Athena

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1491` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://docs.aws.amazon.com/athena/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Amazon Athena (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain serverless SQL query over S3 with Athena
2. Define schemas with the Glue Data Catalog
3. Write SQL queries and handle data types
4. Partition data to reduce scanned bytes
5. Use columnar formats (Parquet/ORC) for performance and cost
6. Control cost, access and workgroups

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Athena overview (MASTEMY-DESIGN 16%)

- Worked applications: (1) Decide Athena vs a data warehouse; (2) Run a first query over an S3 dataset
- Common misconception addressed: Expecting Athena to be fast on huge raw CSV without optimization
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Serverless query over S3 | 48 | 5 |
| M01L02 | When to use Athena | 48 | 5 |
### M02 Data catalog (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define a table over S3 data; (2) Use a crawler to infer a schema
- Common misconception addressed: Pointing a table at the wrong S3 prefix
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Glue Data Catalog and tables | 48 | 5 |
| M02L02 | Crawlers and schemas | 48 | 5 |
### M03 Querying (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a filtered aggregate query; (2) Cast and parse a timestamp column
- Common misconception addressed: Querying with SELECT * and scanning everything
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SQL basics in Athena | 48 | 5 |
| M03L02 | Data types and functions | 48 | 5 |
### M04 Partitioning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Partition by date to prune scans; (2) Add partition projection for performance
- Common misconception addressed: Not partitioning, so every query scans all data
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Partition design | 48 | 5 |
| M04L02 | Partition projection | 48 | 5 |
### M05 File formats (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert CSV to Parquet to cut scanned bytes; (2) Choose compression for cost
- Common misconception addressed: Keeping raw uncompressed CSV and paying to scan it all
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Columnar formats | 48 | 5 |
| M05L02 | Compression and layout | 48 | 5 |
### M06 Cost and access (MASTEMY-DESIGN 17%)

- Worked applications: (1) Estimate cost from bytes scanned; (2) Limit scan with a workgroup data limit
- Common misconception addressed: Forgetting Athena charges by data scanned, not by time
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Per-query cost model | 48 | 5 |
| M06L02 | Workgroups and permissions | 48 | 5 |

## Integrative case

An analyst queries data in Amazon S3 without a server: define tables in the Glue Data Catalog, run SQL in Athena, partition and use columnar formats to cut cost, and control access and workgroups, then optimize a slow, expensive query.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1491-final-protected | 30 | 30 | yes |
| MST-1491-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Athena overview | 5 |
| Data catalog | 5 |
| Querying | 5 |
| Partitioning | 5 |
| File formats | 5 |
| Cost and access | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1491-Q0001** (single-answer, Select ONE) Athena query cost is primarily driven by what?

- A. The amount of data scanned by the query **(key)**  
  _Rationale:_ Correct: Athena charges based on bytes scanned, so reducing scans reduces cost.
- B. The number of characters in the SQL text  
  _Rationale:_ Query length does not drive cost.
- C. The number of columns in the table definition  
  _Rationale:_ Defining columns does not itself cost; scanning data does.
- D. How long the browser tab stays open  
  _Rationale:_ Cost is not based on session duration.

**MST-1491-Q0002** (multiple-answer, Select TWO) Which TWO reduce the data Athena scans and therefore cost? (Select TWO.)

- A. Partition the data (e.g., by date) and filter on the partition **(key)**  
  _Rationale:_ Correct: partition pruning skips irrelevant data.
- B. Store data in a columnar format like Parquet **(key)**  
  _Rationale:_ Correct: columnar formats let Athena read only needed columns.
- C. Always use SELECT * on raw CSV  
  _Rationale:_ SELECT * on raw CSV scans everything, increasing cost.
- D. Remove all partitions to simplify the table  
  _Rationale:_ Removing partitions forces full scans, raising cost.

**MST-1491-Q0003** (single-answer, Select ONE) What does the Glue Data Catalog provide for Athena?

- A. Table and schema definitions mapping S3 data to queryable tables **(key)**  
  _Rationale:_ Correct: the catalog stores table/schema metadata Athena uses to query S3.
- B. The physical compute cluster that runs queries  
  _Rationale:_ Athena is serverless; the catalog stores metadata, not compute.
- C. A CDN for static assets  
  _Rationale:_ That is CloudFront, not the Glue catalog.
- D. DNS records for the account  
  _Rationale:_ DNS is Route 53, unrelated to the catalog.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
