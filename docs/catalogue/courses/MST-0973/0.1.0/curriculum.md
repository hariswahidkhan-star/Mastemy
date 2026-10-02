# Qlik Sense: Analytical Applications and Data Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0973` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-QS-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Qlik Sense: Analytical Applications and Data Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Data loading
2. The associative data model
3. Building analytic apps
4. Expressions and set analysis
5. Advanced modeling
6. Deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Data loading (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a load script reading a CSV; (2) Store a table to a QVD and reload from it
- Common misconception addressed: Reloading full source data when an incremental load would do
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Load script basics | 80 | 6 |
| M01L02 | Connecting to sources | 80 | 6 |
| M01L03 | Incremental loads and QVD files | 80 | 6 |

### M02 The associative data model (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a sales star schema with a link table; (2) Resolve a synthetic key by renaming fields
- Common misconception addressed: Expecting SQL-style joins instead of Qlik associations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How the associative model works | 80 | 6 |
| M02L02 | Star schema and link tables | 80 | 6 |
| M02L03 | Synthetic keys and circular references | 80 | 6 |

### M03 Building analytic apps (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a master measure for revenue; (2) Add filter panes for region and year
- Common misconception addressed: Hard-coding values instead of reusing master items
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sheets and visualizations | 80 | 6 |
| M03L02 | Master items and dimensions | 80 | 6 |
| M03L03 | Filter panes and selections | 80 | 6 |

### M04 Expressions and set analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write Sum({<Year={2025}>} Sales); (2) Store a threshold in a variable and reuse it
- Common misconception addressed: Mixing a selection-based filter with a set-analysis modifier unintentionally
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Aggregation expressions | 80 | 6 |
| M04L02 | Set analysis | 80 | 6 |
| M04L03 | Variables and dollar-sign expansion | 80 | 6 |

### M05 Advanced modeling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a master calendar from a date field; (2) Apply row-level section access
- Common misconception addressed: Leaving a bloated data model that slows reloads
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Section access and security | 80 | 6 |
| M05L02 | Calendar and mapping loads | 80 | 6 |
| M05L03 | Data model optimization | 80 | 6 |

### M06 Deployment (MASTEMY-DESIGN 16%)

- Worked applications: (1) Publish an app to a stream; (2) Schedule a reload task
- Common misconception addressed: Publishing an app without controlling who can edit it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Publishing to streams | 80 | 6 |
| M06L02 | App performance tuning | 80 | 6 |
| M06L03 | Governance and reload tasks | 80 | 6 |

## Integrative case

Build a Qlik Sense sales app: load and model source data into a clean star schema, create master items and set-analysis measures, add a calendar and section access, and publish it to a stream with a reload task.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0973-final-protected | 30 | 30 | yes |
| MST-0973-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data loading | 5 |
| The associative data model | 5 |
| Building analytic apps | 5 |
| Expressions and set analysis | 5 |
| Advanced modeling | 5 |
| Deployment | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0973-Q0001** (single-answer, Select ONE) In Qlik Sense, two tables share two common field names, producing an unwanted synthetic key. What is the cleanest fix?

- A. Rename or remove one of the shared fields so a single key links the tables **(key)**  
  _Rationale:_ Correct: reducing the shared fields to a single intended key removes the synthetic key.
- B. Delete both tables  
  _Rationale:_ Deleting the tables loses the data entirely.
- C. Add a third copy of each field  
  _Rationale:_ Adding more shared fields worsens the synthetic key.
- D. Join everything into one giant table always  
  _Rationale:_ Forcing a single flat table is not generally appropriate and may duplicate rows.

**MST-0973-Q0002** (single-answer, Select ONE) Which expression sums Sales only for the year 2025 regardless of current selections?

- A. Sum({<Year={2025}>} Sales) **(key)**  
  _Rationale:_ Correct: the set-analysis modifier {<Year={2025}>} restricts the aggregation to 2025.
- B. Sum(Sales)  
  _Rationale:_ Sum(Sales) follows current selections, not a fixed year.
- C. Only(Year)  
  _Rationale:_ Only(Year) returns a year value, not a sales sum.
- D. Count(Sales)  
  _Rationale:_ Count(Sales) counts rows rather than summing values.

**MST-0973-Q0003** (multiple-answer, Select TWO) Which TWO are advantages of using master items in a Qlik Sense app? (Select TWO)

- A. Definitions are reused consistently across sheets **(key)**  
  _Rationale:_ Correct: master items give consistent, reusable definitions across the app.
- B. A measure's logic is maintained in one place **(key)**  
  _Rationale:_ Correct: centralizing a measure means one edit updates every use.
- C. They remove the need for a data model  
  _Rationale:_ A data model is still required; master items build on it.
- D. They disable user selections  
  _Rationale:_ Master items do not disable selections; association still applies.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
