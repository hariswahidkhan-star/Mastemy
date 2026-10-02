# Polars: High-Performance DataFrame Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0969` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Polars: High-Performance DataFrame Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Polars basics and data types
2. Expressions and the selection API
3. Filtering, aggregation and group_by
4. Joins and combining frames
5. Lazy evaluation and query optimisation
6. Working with larger-than-memory and performance tuning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Polars basics and data types (MASTEMY-DESIGN 16%)

- Worked applications: (1) Read a CSV into a DataFrame and inspect its schema; (2) Cast a column and handle nulls explicitly
- Common misconception addressed: Assuming Polars uses the same row-by-row apply style as pandas
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Series, DataFrames and reading data | 80 | 6 |
| M01L02 | Data types, null handling and casting | 80 | 6 |

### M02 Expressions and the selection API (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a derived column with with_columns; (2) Select and rename multiple columns with expressions
- Common misconception addressed: Writing Python loops over rows instead of column expressions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The expression API: select and with_columns | 80 | 6 |
| M02L02 | Chaining and composing expressions | 80 | 6 |

### M03 Filtering, aggregation and group_by (MASTEMY-DESIGN 16%)

- Worked applications: (1) Filter rows with a compound boolean expression; (2) Aggregate sales by category with group_by.agg
- Common misconception addressed: Expecting group_by to preserve original row order by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Filtering rows with boolean expressions | 80 | 6 |
| M03L02 | group_by and aggregations | 80 | 6 |

### M04 Joins and combining frames (MASTEMY-DESIGN 16%)

- Worked applications: (1) Perform a left join on a key column; (2) Choose inner vs left join for a lookup
- Common misconception addressed: Using an inner join when unmatched rows must be kept
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Join types and keys | 80 | 6 |
| M04L02 | Concatenation and vertical/horizontal stacking | 80 | 6 |

### M05 Lazy evaluation and query optimisation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a lazy query and materialise it with collect; (2) Explain how pushdown reduces scanned data
- Common misconception addressed: Calling collect() after every step and losing optimisation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Eager vs lazy frames and collect() | 80 | 6 |
| M05L02 | Predicate and projection pushdown | 80 | 6 |

### M06 Working with larger-than-memory and performance tuning (MASTEMY-DESIGN 18%)

- Worked applications: (1) Run a query in streaming mode on a large file; (2) Reorder operations so filters run before expensive steps
- Common misconception addressed: Loading a whole dataset eagerly when streaming would fit in memory
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Streaming execution for big data | 80 | 6 |
| M06L02 | Profiling and tuning Polars queries | 80 | 6 |

## Integrative case

Analyse a year of transaction logs with Polars: read the data lazily, derive columns with expressions, filter and group to compute per-segment metrics, join a reference table, and run the pipeline in streaming mode so it fits in memory, using collect() only once at the end.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0969-final-protected | 30 | 30 | yes |
| MST-0969-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Polars basics and data types | 5 |
| Expressions and the selection API | 5 |
| Filtering, aggregation and group_by | 5 |
| Joins and combining frames | 5 |
| Lazy evaluation and query optimisation | 5 |
| Working with larger-than-memory and performance tuning | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0969-Q0001** (single-answer, Select ONE) Why is the Polars expression API preferred over row-by-row Python loops?

- A. Expressions run in parallel, vectorised native code and enable query optimisation **(key)**  
  _Rationale:_ Correct: column expressions let Polars optimise and parallelise work.
- B. Loops are not supported in Python  
  _Rationale:_ Loops exist; they are just slower here.
- C. Expressions change the data types automatically to strings  
  _Rationale:_ Expressions do not force string types.
- D. Expressions require a GPU  
  _Rationale:_ Polars runs on CPU; no GPU is required.

**MST-0969-Q0002** (multiple-answer, Select ALL that apply) Which statements about Polars lazy evaluation are correct? (Select TWO)

- A. A lazy query is only executed when collect() is called **(key)**  
  _Rationale:_ Correct: lazy frames defer computation until collect().
- B. The optimiser can push filters down to reduce scanned data **(key)**  
  _Rationale:_ Correct: predicate pushdown reads less data.
- C. Lazy frames execute each operation immediately  
  _Rationale:_ That describes eager mode, not lazy.
- D. Lazy evaluation disables all joins  
  _Rationale:_ Joins work in lazy mode too.

**MST-0969-Q0003** (single-answer, Select ONE) When would you choose a left join over an inner join?

- A. When you must keep all rows from the left frame even if there is no match on the right **(key)**  
  _Rationale:_ Correct: a left join preserves unmatched left rows with nulls on the right.
- B. When you want only rows present in both frames  
  _Rationale:_ That is an inner join.
- C. When you want to remove duplicate keys  
  _Rationale:_ Deduplication is a separate operation from join type.
- D. When the frames have no common key  
  _Rationale:_ A join still requires a key; this does not describe left vs inner.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
