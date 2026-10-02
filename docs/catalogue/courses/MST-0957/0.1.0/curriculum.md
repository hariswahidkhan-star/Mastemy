# Apache Spark and PySpark: Distributed Data Processing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0957` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-AS-002 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — Apache Spark and PySpark: Distributed Data Processing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Spark fundamentals
2. DataFrames and transformations
3. Aggregation and SQL
4. Joins and shuffles
5. Performance and tuning
6. Writing and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Spark fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how a job splits into stages and tasks; (2) Trace which operations are transformations vs actions
- Common misconception addressed: Expecting a transformation to run before an action triggers it
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Distributed processing model | 94 | 6 |
| M01L02 | RDDs, DataFrames and the driver | 94 | 6 |
| M01L03 | Lazy evaluation and the DAG | 94 | 6 |

### M02 DataFrames and transformations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Clean a messy CSV into a typed DataFrame; (2) Add a derived column with a built-in function
- Common misconception addressed: Reaching for a Python UDF where a built-in would be faster
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Loading and inspecting data | 94 | 6 |
| M02L02 | Selecting, filtering and columns | 94 | 6 |
| M02L03 | User-defined functions | 94 | 6 |

### M03 Aggregation and SQL (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute revenue per region with groupBy; (2) Rank top products per month with a window
- Common misconception addressed: Confusing groupBy aggregation with window functions
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | GroupBy and aggregations | 93 | 6 |
| M03L02 | Spark SQL and temp views | 93 | 6 |
| M03L03 | Window functions | 93 | 6 |

### M04 Joins and shuffles (MASTEMY-DESIGN 17%)

- Worked applications: (1) Broadcast a small dimension table in a join; (2) Diagnose skew in a shuffle-heavy join
- Common misconception addressed: Assuming every join must trigger a full shuffle
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Join types and strategies | 93 | 6 |
| M04L02 | Shuffles and partitions | 93 | 6 |
| M04L03 | Broadcast joins | 93 | 6 |

### M05 Performance and tuning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Cache a reused DataFrame and measure the effect; (2) Repartition before a wide aggregation
- Common misconception addressed: Caching a DataFrame used only once
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Caching and persistence | 93 | 6 |
| M05L02 | Partitioning strategy | 93 | 6 |
| M05L03 | Reading the Spark UI | 93 | 6 |

### M06 Writing and operations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write partitioned Parquet output by date; (2) Enforce an expected schema on read
- Common misconception addressed: Writing thousands of tiny files by over-partitioning
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | File formats and partitioned writes | 93 | 6 |
| M06L02 | Schemas and data quality | 93 | 6 |
| M06L03 | Running and scheduling jobs | 93 | 6 |

## Integrative case

Build a PySpark batch job over a sales dataset: load data into DataFrames, clean and transform with the DataFrame API and Spark SQL, aggregate with grouping and windows, tune a shuffle-heavy join, and write partitioned output.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0957-final-protected | 30 | 30 | yes |
| MST-0957-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Spark fundamentals | 5 |
| DataFrames and transformations | 5 |
| Aggregation and SQL | 5 |
| Joins and shuffles | 5 |
| Performance and tuning | 5 |
| Writing and operations | 5 |

Minimum reviewed item bank: 570 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0957-Q0001** (single-answer, Select ONE) In Spark, which of these is an action that triggers execution of the built-up plan?

- A. count() **(key)**  
  _Rationale:_ Correct: count() is an action that forces the DAG to execute.
- B. filter()  
  _Rationale:_ filter() is a lazy transformation; it adds to the plan.
- C. select()  
  _Rationale:_ select() is a transformation and does not trigger execution.
- D. withColumn()  
  _Rationale:_ withColumn() is a transformation, evaluated lazily.

**MST-0957-Q0002** (single-answer, Select ONE) You join a very large fact table to a small lookup table. Which strategy usually avoids an expensive shuffle?

- A. Broadcast the small table to every executor **(key)**  
  _Rationale:_ Correct: broadcasting the small side lets each executor join locally without shuffling the large table.
- B. Repartition the large table by a random key  
  _Rationale:_ A random repartition adds a shuffle rather than avoiding one.
- C. Collect both tables to the driver  
  _Rationale:_ Collecting large data to the driver risks running out of memory.
- D. Cache the large table first  
  _Rationale:_ Caching does not remove the shuffle a hash join needs.

**MST-0957-Q0003** (multiple-answer, Select TWO) Which TWO statements about Spark DataFrame operations are correct? (Select TWO)

- A. Transformations are lazy and build a plan until an action runs **(key)**  
  _Rationale:_ Correct: Spark defers transformations until an action forces execution.
- B. Built-in functions generally outperform equivalent Python UDFs **(key)**  
  _Rationale:_ Correct: built-ins run in the JVM and avoid per-row Python serialization.
- C. Every transformation immediately reads all data from disk  
  _Rationale:_ Transformations are lazy, not eager.
- D. Caching always speeds up a job regardless of reuse  
  _Rationale:_ Caching helps only when data is reused; otherwise it wastes memory.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
