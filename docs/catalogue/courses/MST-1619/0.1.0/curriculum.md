# Plotly and Dash

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1619` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-PD-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build interactive charts with Plotly Express and graph objects
2. Design effective hover, zoom and selection interactions
3. Assemble a multi-component layout in a Dash application
4. Wire interactivity with Dash callbacks and component state
5. Deploy and share a dashboard responsibly, respecting performance and data limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses dashboard-design and interactivity reasoning through selection items; does not assess building and running a live Dash application.

## Modules

### M01 Plotly charting basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create the same bar chart with Plotly Express and with graph objects and compare the code; (2) Add a second trace to an existing figure object
- Common misconception addressed: Thinking Plotly Express cannot be customised after creation
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Plotly Express vs graph objects | 96 | 8 |
| M01L02 | Traces, figures and the figure data model | 96 | 8 |

### M02 Interactivity design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a custom hovertemplate that shows a formatted value and a category; (2) Add a range slider to a long time-series chart
- Common misconception addressed: Adding interactivity that distracts from the main question instead of supporting it
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Hover templates, tooltips and annotations | 96 | 8 |
| M02L02 | Zoom, pan, selection and range sliders | 96 | 8 |

### M03 Dash layout (MASTEMY-DESIGN 20%)

- Worked applications: (1) Lay out a header, a dropdown and a graph in a Dash layout tree; (2) Arrange two charts side by side that stack on a narrow screen
- Common misconception addressed: Confusing the layout (what is shown) with callbacks (how it reacts)
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The Dash app skeleton and the layout tree | 96 | 8 |
| M03L02 | HTML and core components, and responsive arrangement | 96 | 8 |

### M04 Callbacks and state (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a callback that filters a chart from a dropdown selection; (2) Trace why a callback fires on page load and guard against it
- Common misconception addressed: Creating two callbacks that each write the same output, causing a conflict
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inputs, outputs and the callback graph | 96 | 8 |
| M04L02 | State, multiple outputs and avoiding circular dependencies | 96 | 8 |

### M05 Sharing and performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide where to cache an expensive query so the dashboard stays responsive; (2) List what must be checked before sharing a dashboard built on sensitive data
- Common misconception addressed: Loading a full raw dataset into the browser instead of aggregating server-side
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Caching, large-data patterns and callback cost | 96 | 8 |
| M05L02 | Deployment options and responsible data handling | 96 | 8 |

## Integrative case

A team wants a shared dashboard for weekly operations metrics. Design the Plotly charts and Dash layout, wire a date-range and region filter through callbacks, decide what to cache for performance, and state the data-sensitivity checks required before sharing the link.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1619-final-protected | 25 | 25 | yes |
| MST-1619-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Plotly charting basics | 5 |
| Interactivity design | 5 |
| Dash layout | 5 |
| Callbacks and state | 5 |
| Sharing and performance | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1619-Q0001** (single-answer, Select ONE) In Dash, what does a callback's Output specify?

- A. Which component property is updated when the callback runs **(key)**  
  _Rationale:_ Correct: an Output names the component and property the return value updates.
- B. The initial layout of the application  
  _Rationale:_ Layout is defined separately, not by the callback Output.
- C. The server port the app runs on  
  _Rationale:_ That is a run configuration, not a callback Output.
- D. The CSS theme of the page  
  _Rationale:_ Styling is unrelated to the callback Output declaration.

**MST-1619-Q0002** (multiple-answer, Select TWO) Which TWO practices keep a data-heavy Dash app responsive? (Select TWO.)

- A. Aggregate or sample data server-side before sending it to the browser **(key)**  
  _Rationale:_ Correct: smaller payloads render faster and use less memory.
- B. Cache the results of expensive, repeated queries **(key)**  
  _Rationale:_ Correct: caching avoids recomputing the same expensive result.
- C. Send the full raw dataset to every client on load  
  _Rationale:_ Large payloads slow the browser and the network.
- D. Trigger a callback on every keystroke in a text box without debouncing  
  _Rationale:_ Unthrottled callbacks overload the server.

**MST-1619-Q0003** (single-answer, Select ONE) When should you reach for Plotly graph objects instead of Plotly Express?

- A. When you need fine-grained control over individual traces and layout that Express does not expose directly **(key)**  
  _Rationale:_ Correct: graph objects give lower-level control for complex figures.
- B. Only when the dataset is small  
  _Rationale:_ Dataset size is not the deciding factor.
- C. Never; Express can do everything graph objects can with less effort  
  _Rationale:_ Express is convenient but does not expose every low-level option.
- D. Whenever you want a static image only  
  _Rationale:_ Static export works from either interface.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
