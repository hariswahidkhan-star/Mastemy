# Excel PivotTables and Summary Reporting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2652` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel PivotTables and Summary Reporting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure source data as a proper table so analysis stays reliable as data grows
2. Build PivotTables to summarise by rows, columns, values and filters
3. Group dates and numbers, and change value summaries (sum, count, average, % of total)
4. Add calculated fields, slicers and timelines for interactive analysis
5. Use GETPIVOTDATA appropriately and refresh pivots when source data changes
6. Interpret results honestly, checking for double counting, blanks and misleading aggregates

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Preparing data for analysis (25% (design weight), design weight)

- Worked applications: (1) Convert a flat range into a Table so a pivot auto-expands when rows are added; (2) Diagnose why totals look wrong when merged cells sit in the source
- Common misconception addressed: Pivoting a range that does not grow, so new rows are silently excluded
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tidy-data principles and Excel Tables | 120 | 7 |
| M01L02 | Common data problems that distort analysis | 120 | 7 |

### M02 Building PivotTables (25% (design weight), design weight)

- Worked applications: (1) Summarise revenue by product and month in a PivotTable; (2) Switch a value field from Sum to % of Grand Total to compare mix
- Common misconception addressed: Leaving a value field as Count when Sum was intended
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rows, columns, values and report filters | 120 | 7 |
| M02L02 | Changing summary functions and showing % of total | 120 | 7 |

### M03 Grouping and calculations (25% (design weight), design weight)

- Worked applications: (1) Group daily dates into months and quarters; (2) Add a calculated field for margin = profit / revenue inside the pivot
- Common misconception addressed: Grouping over blank dates and getting a stray '(blank)' bucket
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Grouping dates and numeric ranges | 120 | 7 |
| M03L02 | Calculated fields and GETPIVOTDATA | 120 | 7 |

### M04 Interactive analysis and integrity (25% (design weight), design weight)

- Worked applications: (1) Add a slicer so a manager can filter by region without touching the pivot; (2) Refresh a pivot after the source export is replaced and confirm totals move
- Common misconception addressed: Reading a stale pivot because the source changed but was never refreshed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Slicers, timelines and PivotCharts | 120 | 7 |
| M04L02 | Refreshing data and avoiding misleading summaries | 120 | 7 |

## Integrative case

A retail analyst is given 50,000 transaction rows and asked for a monthly revenue-by-category view the finance team can slice themselves: they must structure the data as a table, build a PivotTable with grouped dates and a margin calculation, add slicers, and verify the totals against a manual check before sharing.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2652-final-protected | 40 | 40 | yes |
| MST-2652-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Preparing data for analysis | 10 |
| Building PivotTables | 10 |
| Grouping and calculations | 10 |
| Interactive analysis and integrity | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2652-Q0001** (single-answer, Select ONE) New rows added to the source are missing from a PivotTable's results. What is the most robust fix?

- A. Base the PivotTable on an Excel Table so the range expands automatically **(key)**  
  _Rationale:_ Correct: a Table reference grows with the data, so refresh captures new rows.
- B. Manually widen the range after every change  
  _Rationale:_ That is error-prone and easy to forget.
- C. Delete and rebuild the pivot each time  
  _Rationale:_ Unnecessary and inefficient compared with a Table source.
- D. Turn off GETPIVOTDATA  
  _Rationale:_ GETPIVOTDATA is unrelated to the source range growing.

**MST-2652-Q0002** (multiple-answer, Select TWO) Which TWO habits keep PivotTable analysis trustworthy? (Select TWO.)

- A. Refresh the pivot after the source data changes **(key)**  
  _Rationale:_ Correct: pivots do not update until refreshed.
- B. Cross-check a key total against an independent SUM or count **(key)**  
  _Rationale:_ Correct: an independent check catches grouping or double-counting mistakes.
- C. Assume the Grand Total is always correct  
  _Rationale:_ Grand totals can mislead with blanks or double counting.
- D. Hide subtotals so numbers look cleaner regardless of accuracy  
  _Rationale:_ Hiding detail does not make a wrong number right.

**MST-2652-Q0003** (single-answer, Select ONE) You grouped order dates by month but see a '(blank)' row. What does it most likely indicate?

- A. Some source rows have empty or non-date values in the date field **(key)**  
  _Rationale:_ Correct: blanks or text in the date column fall outside the date groups.
- B. PivotTables always add a blank row  
  _Rationale:_ A '(blank)' appears only when the field actually contains blanks.
- C. The slicer is broken  
  _Rationale:_ Slicers do not create blank groupings.
- D. Excel ran out of memory  
  _Rationale:_ Memory limits do not produce a '(blank)' category.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
