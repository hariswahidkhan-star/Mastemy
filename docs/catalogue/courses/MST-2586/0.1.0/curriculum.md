# SQL: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2586` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — SQL: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write subqueries and correlated subqueries
2. Use common table expressions and the WITH clause
3. Apply window functions for ranking and running totals
4. Combine results with UNION, INTERSECT and EXCEPT
5. Use CASE expressions and conditional aggregation
6. Create views and understand indexes at a basic level

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Subqueries (20% (design weight), design weight)

- Worked applications: (1) Find rows above the average with a subquery; (2) Use EXISTS for a semi-join
- Common misconception addressed: Using IN with a NULL-containing subquery
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Scalar and IN subqueries | 64 | 4 |
| M01L02 | Correlated subqueries | 64 | 4 |
| M01L03 | EXISTS vs IN | 64 | 4 |

### M02 CTEs (20% (design weight), design weight)

- Worked applications: (1) Refactor a nested query into CTEs; (2) Walk a hierarchy with a recursive CTE
- Common misconception addressed: Assuming a CTE is always materialised and reused
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | WITH clause basics | 64 | 4 |
| M02L02 | Multiple CTEs | 64 | 4 |
| M02L03 | Recursive CTEs | 64 | 4 |

### M03 Window functions (20% (design weight), design weight)

- Worked applications: (1) Rank orders within each customer; (2) Compute a running total
- Common misconception addressed: Confusing RANK gaps with DENSE_RANK
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | OVER, PARTITION BY and ORDER BY | 64 | 4 |
| M03L02 | ROW_NUMBER, RANK, DENSE_RANK | 64 | 4 |
| M03L03 | Running totals and moving averages | 64 | 4 |

### M04 Set operations and CASE (20% (design weight), design weight)

- Worked applications: (1) Pivot with conditional aggregation; (2) Deduplicate with UNION vs UNION ALL
- Common misconception addressed: Using UNION when UNION ALL is correct and cheaper
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | UNION vs UNION ALL | 64 | 4 |
| M04L02 | INTERSECT and EXCEPT | 64 | 4 |
| M04L03 | CASE and conditional aggregation | 64 | 4 |

### M05 Views and indexes (20% (design weight), design weight)

- Worked applications: (1) Create a reporting view; (2) Add an index for a frequent predicate
- Common misconception addressed: Indexing every column and slowing writes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Creating and using views | 64 | 4 |
| M05L02 | Index basics and selectivity | 64 | 4 |
| M05L03 | When indexes help or hurt | 64 | 4 |

## Integrative case

A developer builds sales analytics in SQL: rank products per region with window functions, compute running totals, refactor a report into CTEs, pivot categories with conditional aggregation, and expose it as a view.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2586-final-protected | 40 | 40 | yes |
| MST-2586-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Subqueries | 8 |
| CTEs | 8 |
| Window functions | 8 |
| Set operations and CASE | 8 |
| Views and indexes | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2586-Q0001** (single-answer, Select ONE) What does ROW_NUMBER() OVER (PARTITION BY customer ORDER BY date) produce?

- A. A sequential number restarting at 1 within each customer, ordered by date **(key)**  
  _Rationale:_ PARTITION BY resets numbering per group; ORDER BY sets the sequence.
- B. A single number for the whole result set  
  _Rationale:_ PARTITION BY restarts the count per partition.
- C. The same rank for tied dates  
  _Rationale:_ ROW_NUMBER is always distinct; RANK handles ties.
- D. A running sum of a column  
  _Rationale:_ ROW_NUMBER numbers rows; it does not sum.

**MST-2586-Q0002** (multiple-answer, Select TWO) Select TWO correct statements about UNION versus UNION ALL.

- A. UNION removes duplicate rows across the combined results **(key)**  
  _Rationale:_ UNION performs a distinct operation on the union.
- B. UNION ALL keeps all rows including duplicates and is usually cheaper **(key)**  
  _Rationale:_ UNION ALL skips the dedup step, saving work.
- C. UNION ALL sorts the result by the first column  
  _Rationale:_ Neither guarantees ordering without ORDER BY.
- D. UNION requires the inputs to have different column counts  
  _Rationale:_ Both require matching column counts and compatible types.

**MST-2586-Q0003** (single-answer, Select ONE) Why can a recursive CTE be the right tool for hierarchical data?

- A. It can repeatedly join a table to itself to traverse parent-child levels **(key)**  
  _Rationale:_ The recursive member walks the hierarchy until no new rows are produced.
- B. It automatically creates indexes on the hierarchy  
  _Rationale:_ A CTE does not create indexes.
- C. It is the only way to filter rows  
  _Rationale:_ Filtering uses WHERE; recursion is about traversal.
- D. It guarantees better performance than any join  
  _Rationale:_ Recursion is about expressiveness, not guaranteed speed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
