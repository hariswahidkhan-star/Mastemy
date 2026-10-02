# Excel PivotTables and Analytical Reporting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0634` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel PivotTable documentation read via the Microsoft Learn MCP on 2026-10-02 (fields: rows, columns, values, filters; slicers; PivotCharts). Ribbon labels can vary by Excel channel and must be confirmed before production. |
| Official sources | https://support.microsoft.com/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576 |
| Evidence | **verified-official-source** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-PIVOT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel PivotTables and Analytical Reporting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Prepare data so it is suitable for a PivotTable
2. Build PivotTables using rows, columns, values and filters
3. Summarise with the right aggregation and value settings
4. Add slicers, grouping and PivotCharts for interactive reporting
5. Refresh, audit and troubleshoot PivotTable results

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot grade a learner's live report; report building is taught through demonstrations and model-answer analysis.

## Modules

### M01 Preparing data for analysis (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Convert a range into a clean Table for a PivotTable; (2) Spot and fix data that will break a PivotTable
- Common misconception addressed: Building a PivotTable on data with blank headers or merged cells
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What makes data pivot-ready | 72 | 5 |
| M01L02 | Tables as a PivotTable source | 72 | 5 |

### M02 Building the PivotTable (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Place fields into rows, columns, values and filters; (2) Rearrange fields to answer a different question
- Common misconception addressed: Dragging a field to the wrong area and misreading the result
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rows, columns, values and filters | 96 | 5 |
| M02L02 | Rearranging to change the question | 96 | 5 |

### M03 Summarising values (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Switch a value from Sum to Count or Average; (2) Show values as a percentage of total
- Common misconception addressed: Leaving Sum where a Count or Average is meant
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Aggregation types and value settings | 80 | 5 |
| M03L02 | Show-values-as calculations | 80 | 5 |
| M03L03 | Sorting and top-N views | 80 | 5 |

### M04 Interactive reporting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add slicers to filter a report; (2) Group dates and build a PivotChart
- Common misconception addressed: Adding so many slicers the report becomes unreadable
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Slicers and grouping | 96 | 5 |
| M04L02 | PivotCharts for a clear message | 96 | 5 |

### M05 Refresh, audit and troubleshoot (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Fix stale totals by refreshing the data; (2) Audit a surprising total to its source rows
- Common misconception addressed: Assuming a PivotTable updates itself when the source changes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Refreshing and keeping data current | 96 | 5 |
| M05L02 | Auditing and troubleshooting results | 96 | 5 |

## Integrative case

An analyst turns a year of transactions into a management report: shape the source as a Table, build a PivotTable of revenue by region and month, group dates and add slicers, create a PivotChart, and fix the stale totals caused by a missed refresh.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0634-final-protected | 30 | 40 | yes |
| MST-0634-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Preparing data for analysis | 5 |
| Building the PivotTable | 6 |
| Summarising values | 7 |
| Interactive reporting | 6 |
| Refresh, audit and troubleshoot | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0634-Q0001** (single-answer, Select ONE) Source rows were added yesterday, but the PivotTable totals are unchanged. What is the most likely reason?

- A. The PivotTable has not been refreshed since the data changed **(key)**  
  _Rationale:_ Correct: a PivotTable shows a cached snapshot and must be refreshed to reflect new source rows.
- B. The workbook has too many sheets  
  _Rationale:_ Sheet count does not stop totals updating.
- C. The chart colours are wrong  
  _Rationale:_ Colours are unrelated to stale totals.
- D. The file is saved as PDF  
  _Rationale:_ File format does not explain a stale PivotTable in Excel.

**MST-0634-Q0002** (multiple-answer, Select TWO) Which TWO field areas determine how a PivotTable groups and aggregates data? (Select TWO.)

- A. Rows **(key)**  
  _Rationale:_ Correct: fields in Rows define the grouping down the left.
- B. Values **(key)**  
  _Rationale:_ Correct: fields in Values define what is aggregated and how.
- C. The workbook file name  
  _Rationale:_ The file name has no effect on the PivotTable.
- D. The sheet tab colour  
  _Rationale:_ Tab colour is cosmetic and irrelevant to aggregation.

**MST-0634-Q0003** (single-answer, Select ONE) A revenue field in Values is showing a count of transactions instead of their total. The fix is to:

- A. Change the value field setting from Count to Sum **(key)**  
  _Rationale:_ Correct: the value field's summarise-by setting controls whether it counts or sums.
- B. Delete the PivotTable and the source  
  _Rationale:_ That is unnecessary; a value setting change suffices.
- C. Rename the worksheet  
  _Rationale:_ Renaming does not change aggregation.
- D. Add more slicers  
  _Rationale:_ Slicers filter; they do not change the aggregation type.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
