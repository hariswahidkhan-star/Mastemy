# AI-Assisted Excel Dashboard Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0652` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02: PivotTables and PivotCharts, slicers (filter a PivotTable or table, connected via Report Connections), and the data-model/dashboard assembly workflow. The AI-assisted framing (Copilot-suggested layouts and summaries) is reviewed by the learner before use. |
| Official sources | https://learn.microsoft.com/office/dev/add-ins/excel/excel-add-ins-pivottables; https://learn.microsoft.com/sharepoint/administration/create-an-excel-services-dashboard-using-a-data-model-sharepoint-server-2013 |
| Evidence | **vendor-docs-partial** - official Microsoft documentation read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-DASHBOARD |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Excel Dashboard Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Shape a flat table so it can drive PivotTables and PivotCharts reliably
2. Build PivotTables and PivotCharts that refresh from a single source
3. Add slicers and connect them to multiple visuals for interactivity
4. Design a one-screen dashboard layout that answers the stated questions
5. Review AI-suggested chart and layout choices before publishing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Data foundation for dashboards (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Convert a report-style sheet into a flat Excel Table; (2) Add a calendar/helper table to support time analysis
- Common misconception addressed: Building a dashboard directly on a formatted report instead of a flat table
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Flat tables and Ctrl+T | 96 | 6 |
| M01L02 | Why a tidy source matters | 96 | 6 |
### M02 PivotTables and PivotCharts (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Summarise sales by category and region in a PivotTable; (2) Create PivotCharts that refresh when the table changes
- Common misconception addressed: Pasting static chart values that do not refresh with the data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building and refreshing PivotTables | 96 | 6 |
| M02L02 | PivotCharts that update automatically | 96 | 6 |
### M03 Interactivity with slicers (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a region slicer and connect it to three charts via Report Connections; (2) Add a timeline to filter all visuals by month
- Common misconception addressed: Expecting a slicer to filter charts it was never connected to
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Inserting slicers and timelines | 96 | 6 |
| M03L02 | Connecting one slicer to many visuals | 96 | 6 |
### M04 Dashboard layout (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Lay out KPIs, trend and breakdown on a single screen; (2) Map each dashboard element to a decision it supports
- Common misconception addressed: Filling the dashboard with charts that answer no stated question
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | One-screen layout and visual hierarchy | 96 | 6 |
| M04L02 | Designing around the questions asked | 96 | 6 |
### M05 Reviewing AI-suggested visuals (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Accept or reject three AI-suggested chart types with reasons; (2) Trace a dashboard total back to the source rows
- Common misconception addressed: Trusting an AI-generated chart without checking the underlying figures
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Judging an AI chart suggestion | 96 | 6 |
| M05L02 | Verifying the numbers behind a visual | 96 | 6 |

## Integrative case

A sales operations analyst must deliver a monthly dashboard: reshape the export into a flat table, build refreshable PivotTables and PivotCharts, add connected slicers and a timeline, lay everything out on one screen around the questions managers ask, and review the AI-suggested visuals against the source data.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0652-final-protected | 30 | 40 | yes |
| MST-0652-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data foundation for dashboards | 6 |
| PivotTables and PivotCharts | 6 |
| Interactivity with slicers | 6 |
| Dashboard layout | 6 |
| Reviewing AI-suggested visuals | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0652-Q0001** (single-answer, Select ONE) A slicer on a dashboard filters one chart but leaves two others unchanged. What is the most likely cause?

- A. The slicer is not connected to the other charts via Report Connections **(key)**  
  _Rationale:_ Correct: a slicer filters only the PivotTables/charts it is explicitly connected to.
- B. Slicers can only ever control one visual  
  _Rationale:_ One slicer can control many connected visuals.
- C. The workbook must be saved to SharePoint first  
  _Rationale:_ Connection is unrelated to where the file is stored.
- D. PivotCharts cannot be filtered  
  _Rationale:_ PivotCharts are filterable, including by slicers.
**MST-0652-Q0002** (multiple-answer, Select TWO) Which TWO practices make an Excel dashboard refresh reliably? (Select TWO.)

- A. Base the visuals on a flat Excel Table or data model **(key)**  
  _Rationale:_ Correct: a tidy structured source lets PivotTables and charts refresh cleanly.
- B. Use PivotCharts linked to the data rather than pasted static values **(key)**  
  _Rationale:_ Correct: linked PivotCharts update automatically when data changes.
- C. Type the latest totals into the chart labels each month  
  _Rationale:_ Manual labels defeat automatic refresh.
- D. Avoid naming the PivotTables  
  _Rationale:_ Naming has no bearing on refresh reliability.
**MST-0652-Q0003** (single-answer, Select ONE) Why should a dashboard be built on a flat table rather than a formatted report layout?

- A. PivotTables and charts need structured, table-based data to analyse **(key)**  
  _Rationale:_ Correct: a flat table is the structured foundation PivotTables require.
- B. Formatted reports cannot be printed  
  _Rationale:_ Printing is unrelated to the structure requirement.
- C. Flat tables disable slicers  
  _Rationale:_ Slicers work with tables and PivotTables.
- D. Excel forbids colour in dashboards  
  _Rationale:_ Formatting choices are not the issue.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
