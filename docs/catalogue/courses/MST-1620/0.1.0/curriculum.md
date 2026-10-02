# Tableau Desktop Skills

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1620` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-TDS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect to data sources and prepare data in Tableau Desktop
2. Build core visualisations using dimensions, measures and marks
3. Create calculated fields, table calculations and level-of-detail expressions
4. Design interactive dashboards with filters, actions and parameters
5. Apply formatting and layout choices that communicate clearly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses Tableau concepts and design reasoning through selection items; does not assess building a workbook in the Tableau Desktop application.

## Modules

### M01 Connecting and preparing data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose between a join and a relationship for two tables and justify it; (2) Fix a field wrongly typed as a string that should be a date
- Common misconception addressed: Confusing a blend with a join and expecting join-level granularity
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data source connections and joins vs relationships | 96 | 8 |
| M01L02 | Dimensions, measures, data types and the data pane | 96 | 8 |

### M02 Building views (MASTEMY-DESIGN 20%)

- Worked applications: (1) Convert a discrete date field to continuous and explain the axis change; (2) Build a dual-axis chart and synchronise the axes
- Common misconception addressed: Assuming Show Me always picks the most informative chart
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rows, columns, the Marks card and Show Me | 96 | 8 |
| M02L02 | Aggregation, discrete vs continuous and sorting | 96 | 8 |

### M03 Calculations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a table calculation for a running total and set its direction; (2) Use a FIXED LOD expression to compute a customer-level average
- Common misconception addressed: Confusing a table calculation's partitioning with an LOD expression's granularity
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Calculated fields and table calculations | 96 | 8 |
| M03L02 | Level-of-detail (LOD) expressions | 96 | 8 |

### M04 Interactive dashboards (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a parameter that lets users switch the measure shown on a chart; (2) Wire a filter action so clicking one chart filters another
- Common misconception addressed: Applying a filter to one worksheet and expecting it to affect the whole dashboard
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Filters, parameters and filter actions | 96 | 8 |
| M04L02 | Dashboard layout, containers and actions | 96 | 8 |

### M05 Formatting and communication (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rewrite a default tooltip to show only the fields the audience needs; (2) Reformat a currency measure and fix an inconsistent colour legend
- Common misconception addressed: Adding every available field to the tooltip and overwhelming the reader
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Tooltips, colour, labels and number formatting | 96 | 8 |
| M05L02 | Layout, titles and designing for the audience | 96 | 8 |

## Integrative case

An analyst receives sales and target tables and must deliver a regional-performance dashboard: connect and relate the tables, build a trend and a ranking view, add a parameter to switch measures, wire a filter action, and format it so a regional manager can read it in under a minute.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1620-final-protected | 25 | 25 | yes |
| MST-1620-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Connecting and preparing data | 5 |
| Building views | 5 |
| Calculations | 5 |
| Interactive dashboards | 5 |
| Formatting and communication | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1620-Q0001** (single-answer, Select ONE) A FIXED level-of-detail expression computes a value at which granularity?

- A. The dimensions named in the expression, regardless of the view's level of detail **(key)**  
  _Rationale:_ Correct: FIXED pins the computation to the stated dimensions, ignoring the view.
- B. Always the most granular row in the data source  
  _Rationale:_ FIXED uses the stated dimensions, not necessarily row level.
- C. Whatever dimensions are on the Rows shelf only  
  _Rationale:_ That describes the view's detail, which FIXED overrides.
- D. The dashboard filter selection only  
  _Rationale:_ FIXED is computed before dimension filters, not from the selection alone.

**MST-1620-Q0002** (multiple-answer, Select TWO) Which TWO are true about joins versus data blending in Tableau? (Select TWO.)

- A. A join combines tables at the row level before aggregation **(key)**  
  _Rationale:_ Correct: joins merge rows prior to aggregation.
- B. Blending aggregates each source separately and combines the results on a linking field **(key)**  
  _Rationale:_ Correct: blending joins aggregated results on a common field.
- C. Blending always produces the same granularity as an inner join  
  _Rationale:_ Blending works on aggregates, so granularity differs from a row-level join.
- D. Joins can only be used across different database servers  
  _Rationale:_ Joins are typically within one source; cross-source needs relationships or blending.

**MST-1620-Q0003** (single-answer, Select ONE) You want clicking a bar in one chart to filter a second chart on the same dashboard. What do you use?

- A. A filter action configured on the dashboard **(key)**  
  _Rationale:_ Correct: a filter action passes the selection as a filter to the target.
- B. A calculated field on each worksheet  
  _Rationale:_ Calculated fields do not create cross-chart interaction.
- C. A separate data source for each chart  
  _Rationale:_ That does not create the interaction either.
- D. Changing the mark type to a map  
  _Rationale:_ Mark type is unrelated to cross-chart filtering.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
