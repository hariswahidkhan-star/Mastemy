# Excel Dashboards and Management Information Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0637` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02 (PivotTables, charts, conditional formatting, slicers). Chart types, slicer behaviour and formatting options vary by Excel channel; confirm against the current build before production. |
| Official sources | https://support.microsoft.com/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576; https://support.microsoft.com/office/create-a-chart-from-start-to-finish-0baf399e-dd61-4e18-8a73-b3fd5d5680c2 |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-DASHBOARDS |
| Legacy IDs | none |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 64 / cumulative 161 min |
| Certificate | Mastemy Certificate of Completion — Excel Dashboards and Management Information Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Summarise data with PivotTables and PivotCharts
2. Choose chart types that match the message and the data
3. Apply conditional formatting to surface exceptions
4. Add slicers and controls for interactive filtering
5. Lay out a single-screen dashboard that answers management questions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 PivotTables and PivotCharts (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a PivotTable summarising sales by month and region; (2) Add a PivotChart and group dates into quarters
- Common misconception addressed: Treating a PivotTable as live-editable cells rather than a refreshable summary of a source
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | PivotTable fundamentals | 120 | 5 |
| M01L02 | Grouping, filtering and calculated fields | 120 | 5 |
| M01L03 | PivotCharts | 120 | 5 |

### M02 Charts and visual encoding (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Pick and justify chart types for four different messages; (2) Rebuild a cluttered chart to emphasise one comparison
- Common misconception addressed: Using a pie chart for time series or too many categories
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing chart types | 120 | 5 |
| M02L02 | Formatting for clarity | 120 | 5 |

### M03 Conditional formatting and exception reporting (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Flag below-target rows with a rule; (2) Add data bars and an icon set, then critique readability
- Common misconception addressed: Applying so many colour rules that nothing stands out
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rules, data bars and colour scales | 120 | 5 |
| M03L02 | Formula-based conditional formatting | 120 | 5 |

### M04 Interactivity and dashboard layout (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add slicers to filter a dashboard by department; (2) Lay out a single-screen pack with a clear visual hierarchy
- Common misconception addressed: Scattering KPIs so the eye cannot find the headline number
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Slicers and timeline controls | 120 | 5 |
| M04L02 | Single-screen dashboard layout | 120 | 5 |

## Integrative case

A finance team needs a one-page monthly management pack: build PivotTables over the ledger, choose the right charts for trend and variance, highlight exceptions with conditional formatting, and wire slicers so managers can filter by department without breaking the layout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0637-final-protected | 30 | 40 | yes |
| MST-0637-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| PivotTables and PivotCharts | 8 |
| Charts and visual encoding | 8 |
| Conditional formatting and exception reporting | 7 |
| Interactivity and dashboard layout | 7 |

Minimum reviewed item bank: 278 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0637-Q0001** (single-answer, Select ONE) A PivotTable summarises a source table. New rows are added to the source. What must happen for the PivotTable to reflect them?

- A. Refresh the PivotTable (and ensure the source range or table includes the new rows) **(key)**  
  _Rationale:_ Correct: PivotTables show a cached summary and update on refresh.
- B. Nothing; PivotTables always show the latest source instantly  
  _Rationale:_ PivotTables use cached data and need a refresh.
- C. Delete and recreate the PivotTable each time  
  _Rationale:_ A refresh is sufficient; recreation is unnecessary.
- D. Convert the PivotTable to a chart  
  _Rationale:_ Charting does not refresh the underlying summary.

**MST-0637-Q0002** (multiple-answer, Select TWO) Which TWO chart choices are appropriate? (Select TWO.)

- A. A line chart to show a monthly trend over two years **(key)**  
  _Rationale:_ Correct: line charts suit continuous time series.
- B. A clustered column chart to compare values across a few categories **(key)**  
  _Rationale:_ Correct: column charts compare discrete categories well.
- C. A pie chart to compare twelve months of revenue  
  _Rationale:_ Pie charts handle few parts of a whole, not a time series.
- D. A 3-D exploding pie to show precise differences  
  _Rationale:_ 3-D distortion makes precise comparison harder, not easier.

**MST-0637-Q0003** (single-answer, Select ONE) What is the main risk of applying many conditional-formatting colour rules to one table?

- A. Visual noise that hides the exceptions you wanted to highlight **(key)**  
  _Rationale:_ Correct: too much formatting defeats the purpose of exception reporting.
- B. Excel disables the rules after a set number  
  _Rationale:_ Excel does not cap rules at a small number that would cause this.
- C. The underlying values are permanently changed  
  _Rationale:_ Formatting does not change underlying values.
- D. PivotTables stop refreshing  
  _Rationale:_ Conditional formatting does not affect refresh.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
