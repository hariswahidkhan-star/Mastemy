# BigQuery: SQL Analytics and Data Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0742` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud BigQuery documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — BigQuery: SQL Analytics and Data Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain BigQuery storage, slots and pricing models
2. Write analytic SQL including joins, window functions and arrays
3. Design partitioned and clustered tables for performance
4. Load, transform and schedule data pipelines
5. Control cost and access with quotas, IAM and query optimization

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 BigQuery fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run a query and read the execution details; (2) Create a dataset and a table
- Common misconception addressed: Assuming BigQuery charges by rows rather than bytes scanned
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Architecture, storage and slots | 120 | 7 |
| M01L02 | Datasets, tables and the query model | 120 | 7 |

### M02 Analytic SQL (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rank rows per group with a window function; (2) Unnest a repeated field
- Common misconception addressed: Using SELECT * on wide tables and scanning unnecessary bytes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Joins, aggregation and CTEs | 120 | 7 |
| M02L02 | Window functions, arrays and structs | 120 | 7 |

### M03 Table design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Partition a table by date; (2) Cluster a table by a high-cardinality column
- Common misconception addressed: Partitioning by a column with too few distinct values
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Partitioning strategies | 120 | 7 |
| M03L02 | Clustering and denormalization | 120 | 7 |

### M04 Data pipelines (MASTEMY-DESIGN 20%)

- Worked applications: (1) Load a CSV into a typed table; (2) Schedule a recurring transformation query
- Common misconception addressed: Doing transformations outside BigQuery when SQL would suffice
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Loading and transforming data | 120 | 7 |
| M04L02 | Scheduled queries and orchestration | 120 | 7 |

### M05 Cost and governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Estimate query cost before running; (2) Grant dataset access with an IAM role
- Common misconception addressed: Granting project-wide access when dataset-level access is enough
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Controlling bytes scanned and cost | 120 | 7 |
| M05L02 | Access control with IAM and views | 120 | 7 |

## Integrative case

Build an analytics layer in BigQuery for a retail dataset: design partitioned and clustered tables, write window-function SQL for cohort analysis, schedule a daily transformation, and add cost and IAM controls so analysts query only what they need.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0742-final-protected | 40 | 50 | yes |
| MST-0742-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BigQuery fundamentals | 8 |
| Analytic SQL | 8 |
| Table design | 8 |
| Data pipelines | 8 |
| Cost and governance | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0742-Q0001** (single-answer, Select ONE) BigQuery on-demand queries are primarily billed based on what?

- A. The volume of bytes the query scans **(key)**  
  _Rationale:_ Correct: on-demand pricing is based on bytes processed/scanned by the query.
- B. The number of rows returned  
  _Rationale:_ Rows returned do not determine on-demand cost.
- C. The number of tables in the dataset  
  _Rationale:_ Table count does not drive query cost.
- D. Wall-clock time regardless of data read  
  _Rationale:_ On-demand cost tracks bytes scanned, not elapsed time.

**MST-0742-Q0002** (multiple-answer, Select TWO) Which TWO techniques reduce the bytes a BigQuery query scans? (Select TWO.)

- A. Partitioning a table and filtering on the partition column **(key)**  
  _Rationale:_ Correct: partition pruning limits the data scanned.
- B. Selecting only the columns needed instead of SELECT * **(key)**  
  _Rationale:_ Correct: columnar storage means fewer columns scanned means fewer bytes.
- C. Adding more JOINs to the query  
  _Rationale:_ Extra joins generally increase, not reduce, work.
- D. Returning more rows in the result  
  _Rationale:_ Result size does not reduce bytes scanned.

**MST-0742-Q0003** (single-answer, Select ONE) What does clustering a BigQuery table do?

- A. Sorts stored data by the clustering columns to speed selective queries **(key)**  
  _Rationale:_ Correct: clustering co-locates rows by the clustering columns, improving filter/aggregate performance.
- B. Replicates the table across regions  
  _Rationale:_ Clustering is not cross-region replication.
- C. Encrypts the table at rest  
  _Rationale:_ Encryption at rest is automatic and unrelated to clustering.
- D. Caps the table's row count  
  _Rationale:_ Clustering does not limit row counts.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
