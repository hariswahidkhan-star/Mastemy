# Data Engineering Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1635` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain data-engineering roles and the data lifecycle
2. Build batch and streaming data pipelines conceptually
3. Design storage layers and file/table formats
4. Apply data quality, testing and observability
5. Orchestrate and schedule workflows
6. Reason about cost, scaling and reliability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Data lifecycle and architecture (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a dataset through ingest-store-serve; (2) Classify a workload as batch or streaming
- Common misconception addressed: Treating data engineering as only ETL scripts
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Roles, lifecycle and the modern data stack | 168 | 8 |
| M01L02 | Sources, sinks and the medallion idea | 168 | 8 |

### M02 Ingestion and pipelines (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design an ELT flow for daily loads; (2) Sketch a streaming ingestion path
- Common misconception addressed: Reprocessing all data when incremental loads suffice
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Batch pipelines and ETL/ELT | 168 | 8 |
| M02L02 | Streaming ingestion basics | 168 | 8 |

### M03 Storage and formats (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a format for analytical scans; (2) Partition a dataset for query pruning
- Common misconception addressed: Storing analytics data in row-oriented formats by default
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data lakes, warehouses and lakehouses | 168 | 8 |
| M03L02 | Columnar and open table formats | 168 | 8 |

### M04 Data quality and observability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a validation check to a pipeline; (2) Define a freshness SLA and alert
- Common misconception addressed: Shipping pipelines with no quality checks
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Validation, tests and contracts | 168 | 8 |
| M04L02 | Freshness, volume and schema monitoring | 168 | 8 |

### M05 Orchestration and reliability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model task dependencies as a DAG; (2) Make a load step idempotent
- Common misconception addressed: Writing pipelines that break if re-run
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scheduling, DAGs and dependencies | 168 | 8 |
| M05L02 | Idempotency, retries and cost | 168 | 8 |

## Integrative case

Design an ingestion-to-analytics pipeline for web event data: choose batch vs streaming, a storage layout, quality checks and an orchestration schedule, and justify the reliability and cost trade-offs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1635-final-protected | 25 | 25 | yes |
| MST-1635-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data lifecycle and architecture | 5 |
| Ingestion and pipelines | 5 |
| Storage and formats | 5 |
| Data quality and observability | 5 |
| Orchestration and reliability | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1635-Q0001** (single-answer, Select ONE) What distinguishes ELT from ETL?

- A. Transformation happens after loading into the target system **(key)**  
  _Rationale:_ Correct: ELT loads raw data first, then transforms in the warehouse.
- B. ELT never transforms data  
  _Rationale:_ ELT does transform, just later.
- C. ELT only works on streaming data  
  _Rationale:_ ELT applies to batch too.
- D. ELT requires no storage  
  _Rationale:_ ELT loads into storage first.

**MST-1635-Q0002** (multiple-answer, Select TWO) Which TWO make a pipeline step safe to re-run? (Select TWO.)

- A. Idempotent writes that do not duplicate data **(key)**  
  _Rationale:_ Correct: idempotency allows safe reruns.
- B. Deterministic, bounded processing of a defined input window **(key)**  
  _Rationale:_ Correct: a well-defined input window makes reruns predictable.
- C. Appending blindly on every run  
  _Rationale:_ Blind appends duplicate data on rerun.
- D. Relying on wall-clock time inside the logic  
  _Rationale:_ Time-dependent logic breaks reruns.

**MST-1635-Q0003** (single-answer, Select ONE) Why prefer a columnar format for analytical scans?

- A. It reads only the needed columns, reducing I/O **(key)**  
  _Rationale:_ Correct: columnar storage prunes unread columns.
- B. It is always smaller than any row format  
  _Rationale:_ Size depends on data and encoding.
- C. It supports row-by-row transactional updates best  
  _Rationale:_ Row formats suit OLTP updates better.
- D. It removes the need for partitioning  
  _Rationale:_ Partitioning still helps pruning.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
