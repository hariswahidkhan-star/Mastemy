# PySpark

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1614` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-P-002 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — PySpark (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Spark foundations
2. DataFrame operations
3. Transformations and actions
4. Spark SQL and data sources
5. Performance tuning
6. Applied PySpark

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Spark foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a SparkSession and read a file; (2) Explain driver and executors
- Common misconception addressed: Reaching for RDDs when DataFrames are simpler and faster
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Spark architecture and execution | 80 | 6 |
| M01L02 | SparkSession and the DataFrame API | 80 | 6 |
| M01L03 | RDDs versus DataFrames | 80 | 6 |

### M02 DataFrame operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Filter and select columns from a DataFrame; (2) Group and aggregate sales by region
- Common misconception addressed: Collecting a large DataFrame to the driver
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Selecting, filtering and columns | 80 | 6 |
| M02L02 | Aggregations and grouping | 80 | 6 |
| M02L03 | Joins | 80 | 6 |

### M03 Transformations and actions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Identify when a job actually executes; (2) Cache a reused DataFrame
- Common misconception addressed: Expecting a transformation to run before an action is called
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Lazy evaluation | 80 | 6 |
| M03L02 | Narrow versus wide transformations | 80 | 6 |
| M03L03 | Caching and persistence | 80 | 6 |

### M04 Spark SQL and data sources (MASTEMY-DESIGN 17%)

- Worked applications: (1) Query a DataFrame with Spark SQL; (2) Write partitioned Parquet output
- Common misconception addressed: Writing thousands of tiny files by over-partitioning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Spark SQL and temp views | 80 | 6 |
| M04L02 | Reading and writing files | 80 | 6 |
| M04L03 | Partitioning on write | 80 | 6 |

### M05 Performance tuning (MASTEMY-DESIGN 16%)

- Worked applications: (1) Reduce a costly shuffle; (2) Broadcast a small lookup table in a join
- Common misconception addressed: Ignoring a skewed key that overloads one task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Shuffles and partitions | 80 | 6 |
| M05L02 | Broadcast joins | 80 | 6 |
| M05L03 | Handling data skew | 80 | 6 |

### M06 Applied PySpark (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a window function for a running total; (2) Assemble a read-transform-write pipeline
- Common misconception addressed: Using a Python UDF where a built-in function exists
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | User-defined functions | 80 | 6 |
| M06L02 | Window functions | 80 | 6 |
| M06L03 | Building a batch pipeline | 80 | 6 |

## Integrative case

Build a PySpark batch pipeline: read raw files into DataFrames, clean and aggregate with the DataFrame API and Spark SQL, tune joins and partitions, and write partitioned output.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1614-final-protected | 30 | 30 | yes |
| MST-1614-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Spark foundations | 5 |
| DataFrame operations | 5 |
| Transformations and actions | 5 |
| Spark SQL and data sources | 5 |
| Performance tuning | 5 |
| Applied PySpark | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1614-Q0001** (single-answer, Select ONE) A PySpark job defines several filters and selects but nothing runs until a count() is called. Why?

- A. Transformations are lazy and execute only when an action is triggered **(key)**  
  _Rationale:_ Correct: Spark builds a plan from lazy transformations and runs it when an action like count() is called.
- B. PySpark has crashed silently  
  _Rationale:_ Lazy evaluation is expected behavior, not a crash.
- C. count() is a transformation  
  _Rationale:_ count() is an action, which is exactly what triggers execution.
- D. The DataFrame is empty  
  _Rationale:_ Laziness, not emptiness, explains why nothing ran earlier.

**MST-1614-Q0002** (single-answer, Select ONE) Joining a very large DataFrame to a small lookup table is most efficient with which technique?

- A. A broadcast join **(key)**  
  _Rationale:_ Correct: broadcasting the small table to every executor avoids a large shuffle.
- B. Collecting both to the driver  
  _Rationale:_ Collecting a large DataFrame to the driver risks out-of-memory failures.
- C. A cross join  
  _Rationale:_ A cross join produces every combination and is far more expensive.
- D. Converting to RDDs first  
  _Rationale:_ Converting to RDDs does not improve this join.

**MST-1614-Q0003** (multiple-answer, Select TWO) Which TWO are good PySpark performance practices? (Select TWO)

- A. Prefer built-in functions over Python UDFs where possible **(key)**  
  _Rationale:_ Correct: built-in functions run in the JVM and avoid UDF serialization overhead.
- B. Cache a DataFrame that is reused many times **(key)**  
  _Rationale:_ Correct: caching avoids recomputing a reused DataFrame.
- C. Always collect() large DataFrames to the driver  
  _Rationale:_ Collecting large data to the driver is a common cause of failures.
- D. Create thousands of tiny output partitions  
  _Rationale:_ Too many tiny partitions create overhead and small-file problems.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
