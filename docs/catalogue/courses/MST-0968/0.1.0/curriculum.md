# Pandas: Data Cleaning and Business Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0968` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-DAT-SK-PDA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Pandas: Data Cleaning and Business Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Pandas foundations
2. Loading and inspecting data
3. Cleaning data
4. Transforming data
5. Grouping and aggregation
6. Combining and exporting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Pandas foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a DataFrame and inspect it with head, info and describe; (2) Select columns and rows by label and position
- Common misconception addressed: Confusing a Series with a single-column DataFrame
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Series and DataFrames | 80 | 6 |
| M01L02 | Selecting with loc and iloc | 80 | 6 |

### M02 Loading and inspecting data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read a CSV and set appropriate dtypes and index; (2) Diagnose a dataset with value_counts and isna
- Common misconception addressed: Assuming read_csv always infers correct dtypes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reading files and setting dtypes | 80 | 6 |
| M02L02 | Inspecting and profiling data | 80 | 6 |

### M03 Cleaning data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Handle missing values with fillna and dropna; (2) Remove duplicates and fix inconsistent text
- Common misconception addressed: Forgetting that most pandas operations return a copy, not in-place changes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Missing values and duplicates | 80 | 6 |
| M03L02 | String cleaning and type conversion | 80 | 6 |

### M04 Transforming data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create derived columns with vectorised expressions; (2) Apply a function across rows when vectorisation is not possible
- Common misconception addressed: Reaching for a Python loop instead of vectorised operations
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Vectorised operations and assign | 80 | 6 |
| M04L02 | apply, map and conditional logic | 80 | 6 |

### M05 Grouping and aggregation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Summarise metrics by category with groupby.agg; (2) Reshape results with a pivot table
- Common misconception addressed: Expecting groupby to return a plain DataFrame before aggregation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | groupby and aggregation | 80 | 6 |
| M05L02 | Pivot tables and reshaping | 80 | 6 |

### M06 Combining and exporting (MASTEMY-DESIGN 16%)

- Worked applications: (1) Join two DataFrames on a key with merge; (2) Export a cleaned summary to CSV and Excel
- Common misconception addressed: Confusing merge (by key) with concat (by axis)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Merging and concatenating | 80 | 6 |
| M06L02 | Time handling and exporting results | 80 | 6 |

## Integrative case

Clean and analyse a year of messy transaction exports with pandas: load multiple CSVs, fix types and missing values, deduplicate, derive new columns, group and pivot to answer business questions, and export a tidy summary table for a report.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0968-final-protected | 30 | 30 | yes |
| MST-0968-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0968-Q0001** (single-answer, Select ONE) Which method selects rows and columns of a DataFrame by their labels?

- A. .loc[] **(key)**  
  _Rationale:_ Correct: .loc selects by row and column labels.
- B. .iloc[]  
  _Rationale:_ .iloc selects by integer position, not label.
- C. .at[]  
  _Rationale:_ .at accesses a single scalar by label, not a range of rows and columns.
- D. .where()  
  _Rationale:_ .where masks values by condition; it does not select by label.

**MST-0968-Q0002** (multiple-answer, Select TWO) Which TWO methods handle missing values in a pandas DataFrame? (Select TWO)

- A. fillna() **(key)**  
  _Rationale:_ Correct: fillna replaces missing values with a specified value or strategy.
- B. dropna() **(key)**  
  _Rationale:_ Correct: dropna removes rows or columns containing missing values.
- C. merge()  
  _Rationale:_ merge joins DataFrames by key; it does not handle missing values.
- D. sort_values()  
  _Rationale:_ sort_values orders rows; it does not handle missing values.

**MST-0968-Q0003** (single-answer, Select ONE) Why are vectorised pandas operations usually preferred over Python for-loops over rows?

- A. They run optimised C-level operations over whole arrays and are far faster **(key)**  
  _Rationale:_ Correct: vectorised operations avoid per-row Python overhead and run in optimised compiled code.
- B. They change the data in place to save memory  
  _Rationale:_ Vectorised operations still typically return new objects; speed is the reason.
- C. They automatically clean missing values  
  _Rationale:_ Vectorisation does not clean data by itself.
- D. They are the only way to add a column  
  _Rationale:_ Columns can be added in other ways; vectorisation is about performance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
