# SQL Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1607` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-SF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — SQL Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Databases and basic queries
2. Functions, filtering and grouping
3. Combining tables
4. Changing data and good habits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate query performance on real data; querying is taught through instructor-built walkthroughs on sample databases.

## Modules

### M01 Databases and basic queries (MASTEMY-DESIGN 22%)

- Worked applications: (1) Retrieve and alias columns for a staff list; (2) Sort employees by hire date, newest first
- Common misconception addressed: Assuming row order is guaranteed without ORDER BY
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Relational databases, tables and keys | 120 | 6 |
| M01L02 | SELECT, WHERE, DISTINCT and ORDER BY | 120 | 6 |

### M02 Functions, filtering and grouping (MASTEMY-DESIGN 26%)

- Worked applications: (1) Count employees per department; (2) Keep only departments whose average salary exceeds a threshold
- Common misconception addressed: Using an aggregate inside WHERE instead of HAVING
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | NULLs, comparison, LIKE and built-in functions | 120 | 6 |
| M02L02 | Aggregate functions, GROUP BY and HAVING | 120 | 6 |

### M03 Combining tables (MASTEMY-DESIGN 26%)

- Worked applications: (1) Join employees to departments to show department names; (2) List departments with no employees via a LEFT JOIN
- Common misconception addressed: Confusing INNER and OUTER join behaviour on unmatched rows
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | INNER and LEFT/RIGHT joins | 120 | 6 |
| M03L02 | Subqueries and the IN / EXISTS operators | 120 | 6 |

### M04 Changing data and good habits (MASTEMY-DESIGN 26%)

- Worked applications: (1) Insert a row and verify it with a SELECT; (2) Wrap two updates in a transaction and roll back on error
- Common misconception addressed: Running UPDATE or DELETE without a WHERE clause
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | INSERT, UPDATE, DELETE and constraints | 120 | 6 |
| M04L02 | Transactions and basic query readability | 120 | 6 |

## Integrative case

Using a sample HR database (employees, departments, salaries), answer business questions: average salary per department, employees above their department average, departments with no employees, and a summary table ranking departments by headcount.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1607-final-protected | 20 | 20 | yes |
| MST-1607-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Databases and basic queries | 5 |
| Functions, filtering and grouping | 5 |
| Combining tables | 5 |
| Changing data and good habits | 5 |

Minimum reviewed item bank: 304 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1607-Q0001** (single-answer, Select ONE) Without an ORDER BY clause, what can you assume about the order of rows a SELECT returns?

- A. Nothing is guaranteed; the order is undefined **(key)**  
  _Rationale:_ Correct: result order is not guaranteed unless you specify ORDER BY.
- B. Rows always come back in primary-key order  
  _Rationale:_ Primary-key order is not guaranteed by the standard.
- C. Rows come back in insertion order  
  _Rationale:_ Insertion order is not guaranteed without ORDER BY.
- D. Rows are always alphabetical  
  _Rationale:_ There is no implicit alphabetical ordering.

**MST-1607-Q0002** (multiple-answer, Select ALL that apply) Which statements about GROUP BY are correct? (Select TWO)

- A. Non-aggregated columns in the SELECT generally must appear in the GROUP BY **(key)**  
  _Rationale:_ Correct: columns not wrapped in an aggregate must be grouped on in standard SQL.
- B. HAVING filters groups after aggregation **(key)**  
  _Rationale:_ Correct: HAVING applies conditions to the grouped, aggregated rows.
- C. GROUP BY sorts the final result set for you  
  _Rationale:_ Grouping does not guarantee ordering; use ORDER BY for that.
- D. WHERE can filter on an aggregate such as COUNT(*)  
  _Rationale:_ Aggregate conditions belong in HAVING, not WHERE.

**MST-1607-Q0003** (single-answer, Select ONE) You need every department listed, including those with no employees. Which join does this?

- A. A LEFT JOIN from departments to employees **(key)**  
  _Rationale:_ Correct: a LEFT JOIN keeps all department rows even with no matching employee.
- B. An INNER JOIN between the two tables  
  _Rationale:_ An INNER JOIN drops departments with no employees.
- C. A cross join of both tables  
  _Rationale:_ A cross join pairs every row with every row and does not answer this need.
- D. A self join on employees  
  _Rationale:_ A self join relates a table to itself and does not include empty departments.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
