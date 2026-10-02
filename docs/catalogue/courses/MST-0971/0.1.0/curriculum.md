# Data Visualization with Matplotlib and Plotly

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0971` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Data Visualization with Matplotlib and Plotly (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Principles of effective visualisation
2. Matplotlib figures and axes
3. Common chart types and when to use them
4. Styling, annotation and accessibility
5. Interactive charts with Plotly
6. Dashboards, export and reproducibility

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Principles of effective visualisation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Match a chart type to an analytical question; (2) Spot and fix a truncated-axis distortion
- Common misconception addressed: Using a pie chart to compare many similar values
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Choosing an encoding for the question being asked | 80 | 6 |
| M01L02 | Avoiding misleading charts | 80 | 6 |

### M02 Matplotlib figures and axes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a figure with two axes using the object-oriented API; (2) Arrange a grid of subplots with shared axes
- Common misconception addressed: Mixing the stateful pyplot interface with the object-oriented one
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The figure/axes object model | 80 | 6 |
| M02L02 | Subplots and layout control | 80 | 6 |

### M03 Common chart types and when to use them (MASTEMY-DESIGN 16%)

- Worked applications: (1) Plot a trend with a line chart and a baseline; (2) Show a distribution with a histogram and a box plot
- Common misconception addressed: Using a bar chart for a continuous distribution
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Line, bar and scatter for comparison and trend | 80 | 6 |
| M03L02 | Distributions: histograms and box plots | 80 | 6 |

### M04 Styling, annotation and accessibility (MASTEMY-DESIGN 16%)

- Worked applications: (1) Annotate a key point directly on the chart; (2) Swap to a colour-blind-safe palette and verify contrast
- Common misconception addressed: Relying on red/green alone to encode categories
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Labels, legends, titles and annotations | 80 | 6 |
| M04L02 | Colour choices and colour-blind-safe palettes | 80 | 6 |

### M05 Interactive charts with Plotly (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build an interactive scatter with hover tooltips; (2) Facet a chart by category with Plotly Express
- Common misconception addressed: Adding interactivity that distracts from the main message
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Plotly figures, traces and hover | 80 | 6 |
| M05L02 | Faceting and interactive filtering | 80 | 6 |

### M06 Dashboards, export and reproducibility (MASTEMY-DESIGN 18%)

- Worked applications: (1) Compose a two-panel summary view; (2) Script a figure so it regenerates identically from data
- Common misconception addressed: Hand-editing exported images so results cannot be reproduced
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Composing multiple charts into a view | 80 | 6 |
| M06L02 | Exporting figures and scripting reproducible outputs | 80 | 6 |

## Integrative case

Produce a reporting pack for a product team: choose encodings that answer each stated question, build the static charts in Matplotlib with accessible colours and direct annotation, add one interactive Plotly view for exploration, and script the whole pack so it regenerates reproducibly from the source data.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0971-final-protected | 30 | 30 | yes |
| MST-0971-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Principles of effective visualisation | 5 |
| Matplotlib figures and axes | 5 |
| Common chart types and when to use them | 5 |
| Styling, annotation and accessibility | 5 |
| Interactive charts with Plotly | 5 |
| Dashboards, export and reproducibility | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0971-Q0001** (single-answer, Select ONE) Which chart best shows a trend in a single metric over time?

- A. A line chart **(key)**  
  _Rationale:_ Correct: line charts are designed to show change over a continuous axis such as time.
- B. A pie chart  
  _Rationale:_ Pie charts show parts of a whole, not trends over time.
- C. A single-value table cell  
  _Rationale:_ A single value cannot show a trend.
- D. A scatter of unrelated categories  
  _Rationale:_ Scatter of categories does not convey a time trend.

**MST-0971-Q0002** (multiple-answer, Select ALL that apply) Which choices make a chart more accessible and honest? (Select TWO)

- A. Using a colour-blind-safe palette rather than red/green alone **(key)**  
  _Rationale:_ Correct: colour-blind-safe palettes keep categories distinguishable.
- B. Starting a bar chart's value axis at zero **(key)**  
  _Rationale:_ Correct: a zero baseline prevents exaggerating differences.
- C. Truncating the axis to make small differences look large  
  _Rationale:_ That misleads the reader and is dishonest.
- D. Encoding categories only by red vs green  
  _Rationale:_ Red/green alone fails for many colour-blind readers.

**MST-0971-Q0003** (single-answer, Select ONE) In Matplotlib, why prefer the object-oriented (Figure/Axes) API for complex figures?

- A. It gives explicit control over each axes object and scales to multi-panel layouts **(key)**  
  _Rationale:_ Correct: explicit Figure/Axes handles make complex, multi-panel figures predictable.
- B. It is the only way to draw a line  
  _Rationale:_ Lines can be drawn either way; this is about control.
- C. It automatically chooses the chart type for you  
  _Rationale:_ It does not auto-select chart types.
- D. It disables the pyplot module entirely  
  _Rationale:_ pyplot still exists; the APIs coexist.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
