# Excel Charts and Interactive Dashboards

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2653` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Excel Charts and Interactive Dashboards (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose a chart type that matches the message: comparison, trend, composition or relationship
2. Build and format column, line, bar, pie, combo and scatter charts clearly
3. Design readable charts: titles, labels, axes, gridlines and a restrained use of colour
4. Assemble a one-screen dashboard layout with KPIs, slicers and consistent styling
5. Link charts to PivotTables and slicers so a dashboard updates from one control
6. Avoid misleading visuals such as truncated axes, 3-D distortion and chartjunk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Choosing and building charts (25% (design weight), design weight)

- Worked applications: (1) Pick a line chart for a 12-month trend rather than a pie; (2) Build a combo chart with revenue columns and a margin line on a secondary axis
- Common misconception addressed: Using a pie chart to compare many similar-sized categories
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Matching chart type to the question | 120 | 7 |
| M01L02 | Creating column, line, bar and combo charts | 120 | 7 |

### M02 Formatting for clarity (25% (design weight), design weight)

- Worked applications: (1) Add direct data labels so a chart is readable without the gridlines; (2) Set a consistent colour per series across every chart on a dashboard
- Common misconception addressed: Relying on a rainbow of colours that carry no meaning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Titles, data labels, axes and legends | 120 | 7 |
| M02L02 | Colour, contrast and removing chartjunk | 120 | 7 |

### M03 Dashboard construction (25% (design weight), design weight)

- Worked applications: (1) Lay out four KPI tiles and two charts on a single screen with aligned edges; (2) Connect one slicer to two PivotCharts so both filter together
- Common misconception addressed: Scattering controls so users cannot tell what a slicer affects
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Layout, KPI tiles and grid alignment | 120 | 7 |
| M03L02 | PivotCharts, slicers and timelines as controls | 120 | 7 |

### M04 Honesty and interactivity (25% (design weight), design weight)

- Worked applications: (1) Start a bar-chart value axis at zero to avoid exaggerating differences; (2) Replace a 3-D pie with a simple bar to remove perspective distortion
- Common misconception addressed: Truncating the y-axis so a small change looks dramatic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Avoiding misleading axes and 3-D effects | 120 | 7 |
| M04L02 | Wiring one slicer to several charts | 120 | 7 |

## Integrative case

A team lead must turn a monthly PivotTable of sales and margin into a one-screen dashboard for the leadership meeting: they choose appropriate charts, build KPI tiles, wire a single region slicer to every visual, and remove a truncated axis that was overstating growth.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2653-final-protected | 40 | 40 | yes |
| MST-2653-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Choosing and building charts | 10 |
| Formatting for clarity | 10 |
| Dashboard construction | 10 |
| Honesty and interactivity | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2653-Q0001** (single-answer, Select ONE) You want to compare how 12 months of revenue change over time. Which chart type communicates the trend best?

- A. A line chart **(key)**  
  _Rationale:_ Correct: line charts are designed to show change over a continuous time axis.
- B. A pie chart  
  _Rationale:_ Pie charts show composition at one moment, not a trend.
- C. A 3-D exploded pie  
  _Rationale:_ 3-D pies distort proportions and show no trend.
- D. A doughnut chart  
  _Rationale:_ Like a pie, it shows parts of a whole, not change over time.

**MST-2653-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce the risk of a misleading chart? (Select TWO.)

- A. Start a bar/column value axis at zero **(key)**  
  _Rationale:_ Correct: a non-zero baseline exaggerates differences between bars.
- B. Avoid 3-D effects that distort the perception of values **(key)**  
  _Rationale:_ Correct: 3-D perspective makes nearer elements look larger.
- C. Use as many colours as possible for visual interest  
  _Rationale:_ Excess colour adds noise and can imply meaning that is not there.
- D. Hide the axis so readers cannot question the scale  
  _Rationale:_ Removing the scale hides information rather than clarifying it.

**MST-2653-Q0003** (single-answer, Select ONE) On a dashboard, one slicer should filter several PivotCharts at once. How is this achieved?

- A. Connect the slicer to each PivotTable via Report Connections **(key)**  
  _Rationale:_ Correct: a slicer can be linked to multiple pivots that share the connection.
- B. Copy the slicer once per chart and hope they sync  
  _Rationale:_ Independent copies do not stay in sync.
- C. Retype the filter into each chart manually  
  _Rationale:_ That defeats the purpose of an interactive control.
- D. Use a 3-D chart  
  _Rationale:_ Chart dimensionality has nothing to do with slicer connections.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
