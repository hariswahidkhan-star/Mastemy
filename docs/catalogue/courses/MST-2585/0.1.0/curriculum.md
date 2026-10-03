# SQL: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2585` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — SQL: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write SELECT queries with filtering, sorting and limiting
2. Use WHERE predicates, comparison and logical operators correctly
3. Apply aggregate functions with GROUP BY and HAVING
4. Combine tables with INNER and OUTER joins
5. Insert, update and delete rows safely
6. Understand NULL semantics and basic data types

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 SELECT basics (20% (design weight), design weight)

- Worked applications: (1) Return the top 10 rows sorted by a column; (2) Alias a computed column
- Common misconception addressed: Assuming row order without ORDER BY
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SELECT, FROM and column aliases | 64 | 4 |
| M01L02 | DISTINCT and LIMIT/OFFSET | 64 | 4 |
| M01L03 | ORDER BY | 64 | 4 |

### M02 Filtering (20% (design weight), design weight)

- Worked applications: (1) Filter with BETWEEN and IN; (2) Pattern-match with LIKE
- Common misconception addressed: Mixing AND/OR without parentheses
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | WHERE and comparison operators | 64 | 4 |
| M02L02 | AND, OR, NOT and precedence | 64 | 4 |
| M02L03 | IN, BETWEEN and LIKE | 64 | 4 |

### M03 Aggregation (20% (design weight), design weight)

- Worked applications: (1) Count orders per customer with GROUP BY; (2) Filter groups with HAVING
- Common misconception addressed: Using WHERE to filter an aggregate
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | COUNT, SUM, AVG, MIN, MAX | 64 | 4 |
| M03L02 | GROUP BY | 64 | 4 |
| M03L03 | HAVING vs WHERE | 64 | 4 |

### M04 Joins (20% (design weight), design weight)

- Worked applications: (1) Join customers to orders with INNER JOIN; (2) Find customers with no orders via LEFT JOIN
- Common misconception addressed: Turning a LEFT JOIN into an inner join with a WHERE on the right table
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | INNER JOIN | 64 | 4 |
| M04L02 | LEFT and RIGHT OUTER JOIN | 64 | 4 |
| M04L03 | Join conditions and keys | 64 | 4 |

### M05 Data modification and NULL (20% (design weight), design weight)

- Worked applications: (1) Update rows matching a condition; (2) Test for NULL with IS NULL
- Common misconception addressed: Comparing to NULL with = instead of IS NULL
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | INSERT | 64 | 4 |
| M05L02 | UPDATE and DELETE with WHERE | 64 | 4 |
| M05L03 | NULL and IS NULL | 64 | 4 |

## Integrative case

A beginner analyses a store database with SQL: list recent orders, aggregate revenue per customer with GROUP BY, join customers to orders, find customers with no purchases, and correct a mis-entered row with UPDATE.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2585-final-protected | 40 | 40 | yes |
| MST-2585-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| SELECT basics | 8 |
| Filtering | 8 |
| Aggregation | 8 |
| Joins | 8 |
| Data modification and NULL | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2585-Q0001** (single-answer, Select ONE) Why must you use IS NULL rather than = NULL to test for missing values?

- A. Any comparison with NULL using = yields unknown, never true **(key)**  
  _Rationale:_ NULL is not a value to equal; three-valued logic requires IS NULL.
- B. = NULL is faster but less readable  
  _Rationale:_ = NULL does not work correctly at all, regardless of speed.
- C. NULL equals the empty string  
  _Rationale:_ NULL is distinct from an empty string.
- D. IS NULL only works on text columns  
  _Rationale:_ IS NULL applies to any column type.

**MST-2585-Q0002** (multiple-answer, Select TWO) Select TWO true statements about the difference between WHERE and HAVING.

- A. WHERE filters individual rows before grouping **(key)**  
  _Rationale:_ WHERE applies to rows prior to aggregation.
- B. HAVING filters groups after aggregation **(key)**  
  _Rationale:_ HAVING applies to aggregated groups.
- C. HAVING can only reference raw columns, never aggregates  
  _Rationale:_ HAVING is specifically for filtering on aggregates.
- D. WHERE can filter on an aggregate like COUNT(*)  
  _Rationale:_ Aggregates are not available to WHERE; use HAVING.

**MST-2585-Q0003** (single-answer, Select ONE) What distinguishes a LEFT OUTER JOIN from an INNER JOIN?

- A. LEFT JOIN keeps unmatched left-table rows with NULLs for the right side **(key)**  
  _Rationale:_ Outer join preserves rows without a match, unlike inner join.
- B. LEFT JOIN returns only matching rows  
  _Rationale:_ That describes an inner join.
- C. LEFT JOIN removes duplicate rows automatically  
  _Rationale:_ It does not deduplicate.
- D. LEFT JOIN requires both tables to have the same columns  
  _Rationale:_ Joined tables need not share column sets.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
