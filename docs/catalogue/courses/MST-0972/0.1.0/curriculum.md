# Tableau: Business Intelligence and Dashboard Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0972` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Tableau: Business Intelligence and Dashboard Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connecting and preparing data
2. Core visualizations
3. Calculations
4. Dashboards and interactivity
5. Analytics and storytelling
6. Publishing and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Connecting and preparing data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Connect to a CSV and a database extract; (2) Relate orders and returns tables
- Common misconception addressed: Blending when a join or relationship would be correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Connecting to data sources | 80 | 6 |
| M01L02 | Joins, relationships and blends | 80 | 6 |
| M01L03 | Data types and metadata | 80 | 6 |

### M02 Core visualizations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a bar chart of sales by category; (2) Add a top-N filter and sort
- Common misconception addressed: Reading a dual-axis chart as if the two axes share a scale
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building charts with marks | 80 | 6 |
| M02L02 | Filters, sorting and groups | 80 | 6 |
| M02L03 | Maps and geographic data | 80 | 6 |

### M03 Calculations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a running-total table calculation; (2) Compute customer order count with a FIXED LOD
- Common misconception addressed: Confusing a table calculation with a row-level calculation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Basic and table calculations | 80 | 6 |
| M03L02 | Level of detail expressions | 80 | 6 |
| M03L03 | Parameters and what-if analysis | 80 | 6 |

### M04 Dashboards and interactivity (MASTEMY-DESIGN 17%)

- Worked applications: (1) Lay out a two-chart dashboard with a filter; (2) Add a filter action between charts
- Common misconception addressed: Cramming every chart onto one dashboard without a clear question
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Designing dashboards | 80 | 6 |
| M04L02 | Actions and filters | 80 | 6 |
| M04L03 | Tooltips and navigation | 80 | 6 |

### M05 Analytics and storytelling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a trend line with a confidence band; (2) Build a story walking through a sales decline
- Common misconception addressed: Treating Tableau's built-in forecast as a validated statistical model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Trend lines and forecasting | 80 | 6 |
| M05L02 | Reference lines and bands | 80 | 6 |
| M05L03 | Story points | 80 | 6 |

### M06 Publishing and governance (MASTEMY-DESIGN 16%)

- Worked applications: (1) Publish a workbook and a shared data source; (2) Set project-level permissions
- Common misconception addressed: Publishing live connections that overload the source database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Publishing to Tableau Cloud/Server | 80 | 6 |
| M06L02 | Permissions and data sources | 80 | 6 |
| M06L03 | Performance optimization | 80 | 6 |

## Integrative case

Build a Tableau sales dashboard: connect and relate the data, create charts and calculations, assemble an interactive dashboard with actions, and publish it with appropriate permissions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0972-final-protected | 30 | 30 | yes |
| MST-0972-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Connecting and preparing data | 5 |
| Core visualizations | 5 |
| Calculations | 5 |
| Dashboards and interactivity | 5 |
| Analytics and storytelling | 5 |
| Publishing and governance | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0972-Q0001** (single-answer, Select ONE) You need the total sales per customer repeated on every row regardless of other dimensions in the view. Which calculation type fits?

- A. A FIXED level-of-detail expression **(key)**  
  _Rationale:_ Correct: a FIXED LOD computes at a defined granularity independent of the view's dimensions.
- B. A quick table calculation  
  _Rationale:_ A table calculation depends on the layout of the view, not a fixed granularity.
- C. A row-level string calculation  
  _Rationale:_ A row-level calculation evaluates per data row, not aggregated per customer.
- D. A parameter  
  _Rationale:_ A parameter is a single user-controlled value, not a per-customer aggregate.

**MST-0972-Q0002** (single-answer, Select ONE) Which Tableau feature lets a selection in one chart filter another chart on the same dashboard?

- A. A filter action **(key)**  
  _Rationale:_ Correct: a filter action passes a selection from one sheet to filter others.
- B. A calculated field  
  _Rationale:_ A calculated field creates new values, not interactivity between charts.
- C. A data blend  
  _Rationale:_ A data blend combines data sources; it does not drive dashboard interactivity.
- D. A trend line  
  _Rationale:_ A trend line is an analytic overlay, not an interaction.

**MST-0972-Q0003** (multiple-answer, Select TWO) Which TWO practices help a published Tableau dashboard perform well on a large data source? (Select TWO)

- A. Use an extract instead of a live connection where freshness allows **(key)**  
  _Rationale:_ Correct: extracts are optimized columnar snapshots that usually query faster than live connections.
- B. Reduce the number of marks and high-cardinality quick filters **(key)**  
  _Rationale:_ Correct: fewer marks and filters reduce rendering and query load.
- C. Add as many worksheets as possible to one dashboard  
  _Rationale:_ More worksheets increase queries and rendering cost, hurting performance.
- D. Replace all aggregates with row-level detail  
  _Rationale:_ Row-level detail returns far more data and typically slows the dashboard.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
