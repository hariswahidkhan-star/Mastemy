# Databricks Certified Associate Developer for Apache Spark Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1602` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Databricks (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-DBX-SPARK-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Spark architecture and execution
2. Manipulate data with the DataFrame API
3. Apply transformations, aggregations and joins
4. Tune and troubleshoot Spark applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Spark architecture and execution

- Worked applications: (1) Trace how a query becomes stages and tasks; (2) Explain why a wide transformation triggers a shuffle
- Common misconception addressed: Assuming transformations run immediately rather than lazily
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Cluster, driver and executors | 105 | 6 |
| M01L02 | Jobs, stages and tasks | 105 | 6 |
| M01L03 | Lazy evaluation and the DAG | 105 | 6 |
| M01L04 | Partitions and shuffles | 105 | 6 |

### M02 DataFrame API fundamentals

- Worked applications: (1) Read a dataset and enforce an explicit schema; (2) Select and derive columns with expressions
- Common misconception addressed: Relying on schema inference for production data
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating and reading DataFrames | 105 | 6 |
| M02L02 | Columns, expressions and selection | 105 | 6 |
| M02L03 | Schemas and data types | 105 | 6 |
| M02L04 | Reading and writing formats | 105 | 6 |

### M03 Transformations, aggregations and joins

- Worked applications: (1) Aggregate a dataset and handle nulls correctly; (2) Choose a join strategy for a skewed key
- Common misconception addressed: Joining on a skewed key without mitigating the skew
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Filtering, sorting and deduplication | 105 | 6 |
| M03L02 | Grouping and aggregation | 105 | 6 |
| M03L03 | Join types and strategies | 105 | 6 |
| M03L04 | Window functions | 105 | 6 |

### M04 Tuning and troubleshooting

- Worked applications: (1) Use a broadcast join to speed up a small-large join; (2) Diagnose a slow stage from the Spark UI
- Common misconception addressed: Caching datasets that are read only once
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Caching and persistence | 105 | 6 |
| M04L02 | Broadcast joins and partitioning | 105 | 6 |
| M04L03 | Reading the Spark UI | 105 | 6 |
| M04L04 | Diagnosing performance issues | 105 | 6 |

## Integrative case

A developer builds a Spark data-processing job on Databricks: reading and transforming large datasets with the DataFrame API, joining and aggregating, and tuning the job for performance.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1602-practice-form-A | 63 | 63 | yes |
| MST-1602-practice-form-B | 63 | 63 | no (optional practice) |
| MST-1602-practice-form-C | 63 | 63 | no (optional practice) |
| MST-1602-final-protected | 63 | 63 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Spark architecture and execution | 16 |
| DataFrame API fundamentals | 16 |
| Transformations, aggregations and joins | 16 |
| Tuning and troubleshooting | 15 |

Minimum reviewed item bank: 738 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
