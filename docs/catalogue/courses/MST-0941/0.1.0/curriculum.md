# SQL: Complete Querying and Relational Database Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0941` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — SQL: Complete Querying and Relational Database Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Relational foundations
2. Querying single tables
3. Joining tables
4. Aggregation and grouping
5. Subqueries and set operations
6. Window functions
7. Data modification and constraints
8. Views, performance and design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Relational foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Identify primary and foreign keys in a small schema; (2) Describe a many-to-many relationship and its junction table
- Common misconception addressed: Thinking a table and a spreadsheet are the same thing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tables, rows, keys and relationships | 120 | 6 |
| M01L02 | Data types and the relational model | 120 | 6 |

### M02 Querying single tables (MASTEMY-DESIGN 13%)

- Worked applications: (1) Filter rows with WHERE and logical operators; (2) Sort and limit a result set
- Common misconception addressed: Expecting WHERE to filter aggregated groups
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SELECT, WHERE and ORDER BY | 120 | 6 |
| M02L02 | DISTINCT, LIMIT and expressions | 120 | 6 |

### M03 Joining tables (MASTEMY-DESIGN 13%)

- Worked applications: (1) Combine two tables with an INNER JOIN; (2) Return unmatched rows with a LEFT JOIN
- Common misconception addressed: Assuming an INNER JOIN keeps rows with no match
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Inner joins | 120 | 6 |
| M03L02 | Outer joins and self joins | 120 | 6 |

### M04 Aggregation and grouping (MASTEMY-DESIGN 13%)

- Worked applications: (1) Summarise rows with COUNT, SUM and AVG; (2) Group results and filter groups with HAVING
- Common misconception addressed: Using WHERE instead of HAVING to filter groups
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Aggregate functions | 120 | 6 |
| M04L02 | GROUP BY and HAVING | 120 | 6 |

### M05 Subqueries and set operations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Filter with a subquery in the WHERE clause; (2) Combine result sets with UNION
- Common misconception addressed: Confusing a correlated subquery with an independent one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scalar and correlated subqueries | 120 | 6 |
| M05L02 | UNION, INTERSECT and EXCEPT | 120 | 6 |

### M06 Window functions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Rank rows within a partition using ROW_NUMBER and RANK; (2) Compute a running total with SUM OVER
- Common misconception addressed: Thinking a window function collapses rows like GROUP BY
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | OVER, PARTITION BY and ordering | 120 | 6 |
| M06L02 | Ranking and running aggregates | 120 | 6 |

### M07 Data modification and constraints (MASTEMY-DESIGN 12%)

- Worked applications: (1) Insert, update and delete rows safely; (2) Enforce integrity with NOT NULL and UNIQUE constraints
- Common misconception addressed: Assuming an UPDATE without WHERE affects only one row
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | INSERT, UPDATE and DELETE | 120 | 6 |
| M07L02 | Constraints and transactions | 120 | 6 |

### M08 Views, performance and design (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create a view to encapsulate a complex query; (2) Read a query plan to spot a missing index
- Common misconception addressed: Believing an index always makes every query faster
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Views and schema design | 120 | 6 |
| M08L02 | Indexes and query performance | 120 | 6 |

## Integrative case

Answer a series of business questions from an orders database: write queries that join customers, orders and products, aggregate revenue by period and category, rank results with window functions, and wrap the recurring logic in a view, explaining how each query would perform at scale.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0941-final-protected | 40 | 40 | yes |
| MST-0941-final-alternate | 40 | 40 | no (optional practice) |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0941-Q0001** (single-answer, Select ONE) Which clause filters groups after aggregation?

- A. HAVING **(key)**  
  _Rationale:_ Correct: HAVING filters rows produced after GROUP BY aggregation.
- B. WHERE  
  _Rationale:_ WHERE filters individual rows before grouping.
- C. ORDER BY  
  _Rationale:_ ORDER BY sorts the final result; it does not filter groups.
- D. LIMIT  
  _Rationale:_ LIMIT caps the number of returned rows; it does not filter groups.

**MST-0941-Q0002** (multiple-answer, Select TWO) Which TWO join results keep rows from the left table even when there is no matching right-table row? (Select TWO)

- A. LEFT JOIN **(key)**  
  _Rationale:_ Correct: a LEFT JOIN keeps all left rows, filling unmatched right columns with NULL.
- B. FULL OUTER JOIN **(key)**  
  _Rationale:_ Correct: a FULL OUTER JOIN keeps unmatched rows from both sides, including the left.
- C. INNER JOIN  
  _Rationale:_ An INNER JOIN drops left rows that have no match.
- D. CROSS JOIN  
  _Rationale:_ A CROSS JOIN pairs every row with every other row; it is not match-based.

**MST-0941-Q0003** (single-answer, Select ONE) How does a window function differ from a GROUP BY aggregate?

- A. It returns a value per row without collapsing the rows **(key)**  
  _Rationale:_ Correct: window functions compute across a set but keep every input row.
- B. It always sorts the table permanently  
  _Rationale:_ Window functions do not permanently sort stored data.
- C. It can only be used on primary keys  
  _Rationale:_ Window functions apply to any columns, not just keys.
- D. It removes duplicate rows automatically  
  _Rationale:_ Window functions do not deduplicate rows.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
