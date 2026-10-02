# Advanced SQL

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1608` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Write multi-table joins and set operations correctly
2. Use aggregation, grouping and filtering effectively
3. Apply window functions for analytical queries
4. Structure queries with CTEs and subqueries
5. Reason about query performance and indexing
6. Ensure correctness with NULL handling and transactions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Joins and set operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Combine three tables with correct join types; (2) Deduplicate with UNION vs UNION ALL
- Common misconception addressed: Producing a cartesian product by missing a join condition
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inner, outer and self joins | 168 | 8 |
| M01L02 | UNION, INTERSECT and EXCEPT | 168 | 8 |

### M02 Aggregation and grouping (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute per-group metrics with HAVING; (2) Use FILTER/CASE in aggregates
- Common misconception addressed: Putting non-aggregated columns in a GROUP BY query incorrectly
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | GROUP BY and aggregate functions | 168 | 8 |
| M02L02 | HAVING and conditional aggregation | 168 | 8 |

### M03 Window functions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a running total with SUM OVER; (2) Rank rows within partitions
- Common misconception addressed: Confusing GROUP BY with window partitions
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Ranking and row numbering | 168 | 8 |
| M03L02 | Running totals and moving windows | 168 | 8 |

### M04 CTEs and subqueries (MASTEMY-DESIGN 20%)

- Worked applications: (1) Refactor a nested subquery into CTEs; (2) Write a recursive CTE for a hierarchy
- Common misconception addressed: Assuming a correlated subquery is cheap
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Common table expressions | 168 | 8 |
| M04L02 | Correlated and recursive queries | 168 | 8 |

### M05 Performance and correctness (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read an execution plan to add an index; (2) Handle NULLs in a join safely
- Common misconception addressed: Forgetting that NULL comparisons are not TRUE
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Indexes and execution plans | 168 | 8 |
| M05L02 | NULLs and transactions | 168 | 8 |

## Integrative case

Given a sales database, produce a monthly running-total and rank report across regions, then diagnose and improve the query's performance using an execution plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1608-final-protected | 25 | 25 | yes |
| MST-1608-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Joins and set operations | 5 |
| Aggregation and grouping | 5 |
| Window functions | 5 |
| CTEs and subqueries | 5 |
| Performance and correctness | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1608-Q0001** (single-answer, Select ONE) What does a window function add that GROUP BY cannot?

- A. Per-row results computed over a related set of rows without collapsing them **(key)**  
  _Rationale:_ Correct: window functions keep individual rows while computing over a partition.
- B. The ability to join tables  
  _Rationale:_ Joins are a separate feature.
- C. Automatic indexing  
  _Rationale:_ Window functions do not create indexes.
- D. Transaction isolation  
  _Rationale:_ That is unrelated to window functions.

**MST-1608-Q0002** (multiple-answer, Select TWO) Which TWO can cause an accidental cartesian product? (Select TWO.)

- A. Omitting the ON condition in a join **(key)**  
  _Rationale:_ Correct: a missing join predicate pairs every row.
- B. Joining on a non-unique key without further filtering **(key)**  
  _Rationale:_ Correct: many-to-many joins can explode row counts.
- C. Adding an appropriate WHERE filter  
  _Rationale:_ Filtering reduces rows, not the cause.
- D. Using a primary-key equality join  
  _Rationale:_ A proper key join avoids the explosion.

**MST-1608-Q0003** (single-answer, Select ONE) Why is NULL = NULL not TRUE in SQL?

- A. NULL means unknown, so comparisons yield unknown, not true **(key)**  
  _Rationale:_ Correct: three-valued logic treats NULL comparisons as unknown.
- B. It is a bug in most databases  
  _Rationale:_ It is defined behaviour, not a bug.
- C. NULL is always equal to zero  
  _Rationale:_ NULL is not zero.
- D. Only text columns allow NULL  
  _Rationale:_ Any nullable column behaves this way.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
