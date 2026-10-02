# BigQuery Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1454` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-BIGQUERY (https://cloud.google.com/bigquery/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — BigQuery Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain BigQuery's architecture, datasets, tables and storage
2. Write analytical SQL queries over large datasets
3. Load, partition and cluster data for performance and cost
4. Control access, cost and query efficiency
5. Share results through views and scheduled queries

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 BigQuery basics (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a dataset and query a public table; (2) Inspect a query's bytes-processed estimate
- Common misconception addressed: Thinking BigQuery charges by row count rather than bytes scanned
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Architecture, datasets and tables | 72 | 5 |
| M01L02 | The console, jobs and the query editor | 72 | 5 |

### M02 Querying data (MASTEMY-DESIGN 25%)

- Worked applications: (1) Aggregate events by day with a GROUP BY; (2) Rank rows within groups using a window function
- Common misconception addressed: Using SELECT * on wide tables and scanning unnecessary columns
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SELECT, filtering, joins and aggregation | 72 | 5 |
| M02L02 | Window functions and common patterns | 72 | 5 |

### M03 Performance and cost (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a partitioned, clustered table and query with a partition filter; (2) Estimate and reduce a query's cost
- Common misconception addressed: Omitting partition filters and scanning the whole table
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Loading data and schema design | 72 | 5 |
| M03L02 | Partitioning, clustering and cost control | 72 | 5 |

### M04 Sharing and automation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Publish a view for a reporting team; (2) Schedule a daily aggregation query
- Common misconception addressed: Granting table access broadly instead of using an authorized view
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Views, authorized views and access | 72 | 5 |
| M04L02 | Scheduled queries and exports | 72 | 5 |

## Integrative case

An analyst stands up reporting on web event data in BigQuery: load the data, design a partitioned and clustered table, write queries for key metrics, control cost with partition filters and previews, then publish a view and schedule a daily refresh.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1454-final-protected | 40 | 50 | yes |
| MST-1454-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BigQuery basics | 10 |
| Querying data | 10 |
| Performance and cost | 10 |
| Sharing and automation | 10 |

Minimum reviewed item bank: 260 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1454-Q0001** (single-answer, Select ONE) Queries on a large events table cost more than expected. The table is partitioned by date. What most directly reduces bytes scanned?

- A. Add a filter on the partitioning date column **(key)**  
  _Rationale:_ Correct: a partition filter prunes partitions so fewer bytes are scanned.
- B. Add SELECT * to return all columns  
  _Rationale:_ SELECT * scans more columns and raises cost.
- C. Remove the WHERE clause  
  _Rationale:_ Removing filters scans more data.
- D. Convert the query to a view without changing it  
  _Rationale:_ A view over the same query scans the same data.

**MST-1454-Q0002** (multiple-answer, Select TWO) Which TWO practices help control BigQuery query cost? (Select TWO.)

- A. Select only the columns you need instead of all columns **(key)**  
  _Rationale:_ Correct: fewer columns means fewer bytes scanned.
- B. Filter on partitioned or clustered columns **(key)**  
  _Rationale:_ Correct: pruning partitions and clusters reduces scanned data.
- C. Always query the raw table with no filters  
  _Rationale:_ Unfiltered scans maximize cost.
- D. Duplicate the table before every query  
  _Rationale:_ Copying data adds storage cost and does not reduce query cost.

**MST-1454-Q0003** (single-answer, Select ONE) A reporting team needs read access to a few columns of a sensitive table without seeing the rest. What is the best mechanism?

- A. An authorized view exposing only the needed columns **(key)**  
  _Rationale:_ Correct: authorized views grant scoped access without direct table access.
- B. Grant Editor on the whole dataset  
  _Rationale:_ Editor exposes more than needed and allows changes.
- C. Email a CSV export each morning  
  _Rationale:_ Manual exports are error-prone and not access control.
- D. Make the table public  
  _Rationale:_ Public access exposes the sensitive data broadly.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
