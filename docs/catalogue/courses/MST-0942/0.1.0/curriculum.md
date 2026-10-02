# Advanced SQL: Window Functions and Analytical Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0942` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs |  |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Advanced SQL: Window Functions and Analytical Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Window function fundamentals
2. Ranking and row numbering
3. Offset and value functions
4. Window frames
5. Aggregation patterns and CTEs
6. Analytical patterns in practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Window function fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a running total next to each row with SUM() OVER; (2) Compare a per-row window result with a grouped aggregate
- Common misconception addressed: Thinking a window function collapses rows the way GROUP BY does
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | OVER, PARTITION BY and ORDER BY | 80 | 6 |
| M01L02 | Window functions vs GROUP BY | 80 | 6 |

### M02 Ranking and row numbering (MASTEMY-DESIGN 17%)

- Worked applications: (1) Number rows within each category by sales; (2) Return the top 3 orders per customer with a ranked subquery
- Common misconception addressed: Confusing RANK and DENSE_RANK when ties occur
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ROW_NUMBER, RANK and DENSE_RANK | 80 | 6 |
| M02L02 | Top-N-per-group patterns | 80 | 6 |

### M03 Offset and value functions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute month-over-month change with LAG; (2) Compare each row to the group's first value
- Common misconception addressed: Getting a surprising LAST_VALUE because of the default frame
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | LAG, LEAD and period-over-period | 80 | 6 |
| M03L02 | FIRST_VALUE, LAST_VALUE and NTH_VALUE | 80 | 6 |

### M04 Window frames (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a 7-row moving average with an explicit ROWS frame; (2) Choose ROWS vs RANGE for a running total with ties
- Common misconception addressed: Assuming the default frame is the whole partition
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ROWS vs RANGE frames | 80 | 6 |
| M04L02 | Moving averages and bounded frames | 80 | 6 |

### M05 Aggregation patterns and CTEs (MASTEMY-DESIGN 16%)

- Worked applications: (1) Refactor a nested subquery into named CTEs; (2) Layer a window function on top of an aggregated CTE
- Common misconception addressed: Expecting a CTE to be materialised and reused like a temp table
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Common table expressions and readability | 80 | 6 |
| M05L02 | Combining CTEs with window functions | 80 | 6 |

### M06 Analytical patterns in practice (MASTEMY-DESIGN 16%)

- Worked applications: (1) Deduplicate rows keeping the latest with ROW_NUMBER; (2) Detect consecutive-day streaks with a gaps-and-islands query
- Common misconception addressed: Deleting duplicates without a deterministic ordering
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Deduplication and gaps-and-islands | 80 | 6 |
| M06L02 | Cohort and funnel-style queries | 80 | 6 |

## Integrative case

Analyse a year of e-commerce orders with advanced SQL: build a monthly revenue report with month-over-month change, rank the top products per category, compute a rolling 30-day average, deduplicate a messy customer table, and detect repeat-purchase streaks using window functions and CTEs; then explain each frame and ordering choice.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0942-final-protected | 30 | 30 | yes |
| MST-0942-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Window function fundamentals | 5 |
| Ranking and row numbering | 5 |
| Offset and value functions | 5 |
| Window frames | 5 |
| Aggregation patterns and CTEs | 5 |
| Analytical patterns in practice | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0942-Q0001** (single-answer, Select ONE) How does a window function differ from a GROUP BY aggregate on the same column?

- A. A window function returns a value for every row without collapsing rows **(key)**  
  _Rationale:_ Correct: windowing adds a computed column per row; GROUP BY reduces each group to one row.
- B. A window function always returns fewer rows  
  _Rationale:_ It preserves row count; GROUP BY reduces rows.
- C. GROUP BY can use OVER but window functions cannot  
  _Rationale:_ OVER belongs to window functions, not GROUP BY.
- D. They always produce identical result sets  
  _Rationale:_ They differ in row count and shape.

**MST-0942-Q0002** (multiple-answer, Select TWO) Which TWO statements about RANK and DENSE_RANK are correct? (Select TWO)

- A. RANK leaves gaps in the sequence after ties **(key)**  
  _Rationale:_ Correct: after a tie, RANK skips the next value(s).
- B. DENSE_RANK assigns consecutive numbers with no gaps after ties **(key)**  
  _Rationale:_ Correct: DENSE_RANK does not skip values after ties.
- C. Both require a PARTITION BY clause  
  _Rationale:_ PARTITION BY is optional; ORDER BY in OVER is what they need.
- D. ROW_NUMBER and RANK always return identical results  
  _Rationale:_ They differ whenever ties exist in the ordering.

**MST-0942-Q0003** (single-answer, Select ONE) Why can LAST_VALUE() OVER (ORDER BY ...) return the current row instead of the group's final row?

- A. The default frame ends at the current row, so you must widen it to UNBOUNDED FOLLOWING **(key)**  
  _Rationale:_ Correct: the default RANGE frame stops at the current row; an explicit frame to UNBOUNDED FOLLOWING fixes it.
- B. LAST_VALUE ignores ORDER BY entirely  
  _Rationale:_ It respects ORDER BY; the frame is the issue.
- C. LAST_VALUE is not a valid SQL function  
  _Rationale:_ It is a standard window value function.
- D. It only works without a PARTITION BY  
  _Rationale:_ It works with or without partitioning.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
