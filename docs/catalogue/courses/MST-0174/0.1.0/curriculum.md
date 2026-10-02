# Microsoft PL-300: Power BI Data Analyst Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0174` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | PL-300 |
| Version basis | Skills measured as of 2026-04-20 |
| Evidence | **verified-official-source** - sources: SRC-MS-PL300 |
| Legacy IDs | MST-MIC-MS-PL300-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 102 / module checks 168 / cumulative 210 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Split note: Split adjusted from default 5/7/8% to lesson 102 / module 168 / cumulative 210 min so the required cumulative forms fit; total assessment stays 480 min (20%).

## Learning outcomes

1. Connect to, profile, clean and transform data with Power Query
2. Design a star-schema model and write DAX measures including CALCULATE, time intelligence and calculation groups
3. Optimise model and report performance
4. Build accessible, interactive reports and use Copilot and AI visuals with verification
5. Manage workspaces, apps, refresh, gateways and distribution
6. Secure content with roles, row-level security and sensitivity labels

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Prepare the data (25-30%)

- Worked applications: (1) Choose Import vs DirectQuery vs Direct Lake for three sources; (2) Unpivot a monthly budget sheet and merge it with actuals
- Common misconception addressed: Assuming reference and duplicate queries behave identically
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Get or connect to data | 176 | 9 |
| M01L02 | Profile and clean the data | 176 | 9 |
| M01L03 | Transform and load the data | 176 | 9 |

### M02 Model the data (25-30%)

- Worked applications: (1) Build a date table and year-to-date and prior-year measures; (2) Fix a many-to-many relationship producing wrong totals
- Common misconception addressed: Using calculated columns where a measure is needed
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design and implement a data model | 176 | 9 |
| M02L02 | Create model calculations by using DAX | 176 | 9 |
| M02L03 | Optimize model performance | 176 | 9 |

### M03 Visualize and analyze the data (25-30%)

- Worked applications: (1) Design a drillthrough page with bookmarks and accessible colours; (2) Validate a Copilot narrative visual against the underlying numbers
- Common misconception addressed: Trusting AI summaries without checking the measures behind them
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Create reports | 176 | 9 |
| M03L02 | Enhance reports for usability and storytelling | 176 | 9 |
| M03L03 | Identify patterns and trends | 176 | 9 |

### M04 Manage and secure Power BI (15-20%)

- Worked applications: (1) Configure RLS roles and test as a regional manager; (2) Set scheduled refresh and decide whether a gateway is required
- Common misconception addressed: Believing workspace viewers bypass row-level security
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Create and manage workspaces and assets | 168 | 9 |
| M04L02 | Secure and govern Power BI items | 168 | 9 |

## Integrative case

A retail chain needs a sales and margin report from ERP exports and a store list: clean the data, build a star schema with time intelligence, publish an app with row-level security per region, and verify Copilot-generated summaries.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; the official exam may include case studies and non-MCQ item types that Mastemy renders as MCQ/MR only.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0174-practice-form-A | 50 | 100 | yes |
| MST-0174-practice-form-B | 50 | 100 | no (optional practice) |
| MST-0174-practice-form-C | 50 | 100 | no (optional practice) |
| MST-0174-final-protected | 50 | 100 | yes |

| Domain | Items per form |
|---|---|
| Prepare the data | 14 |
| Model the data | 14 |
| Visualize and analyze the data | 14 |
| Manage and secure Power BI | 8 |

Minimum reviewed item bank: 734 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0174-Q0001** (single-answer, Select ONE) You need a measure returning sales for the same period last year. Which DAX approach is appropriate?

- A. CALCULATE([Sales], SAMEPERIODLASTYEAR('Date'[Date])) with a marked date table **(key)**  
  _Rationale:_ Correct: time-intelligence functions shift the date filter context and need a proper date table.
- B. A calculated column that subtracts 365 from each date  
  _Rationale:_ A column does not respond to report filter context and mishandles leap years.
- C. SUM([Sales]) * 0.9  
  _Rationale:_ That is an arbitrary adjustment, not last year's value.
- D. FILTER the fact table to remove this year  
  _Rationale:_ Removing rows does not shift the period to last year.

**MST-0174-Q0002** (multiple-answer, Select TWO) Which TWO actions improve the performance of a slow report? (Select TWO.)

- A. Remove unused columns and rows from the model **(key)**  
  _Rationale:_ Correct: reducing model size is named under optimising model performance.
- B. Use Performance Analyzer to find slow visuals and measures **(key)**  
  _Rationale:_ Correct: Performance Analyzer is the listed diagnostic tool.
- C. Add more visuals to each page  
  _Rationale:_ More visuals usually add more queries.
- D. Convert every measure to a calculated column  
  _Rationale:_ Columns increase model size and do not respond to filters.

**MST-0174-Q0003** (single-answer, Select ONE) Regional managers must see only their own region's rows in a published report. What do you implement?

- A. Row-level security roles with group membership **(key)**  
  _Rationale:_ Correct: RLS restricts rows per role; group membership assigns users.
- B. A separate workspace per manager with copies of the report  
  _Rationale:_ Copies multiply maintenance and are not a security model.
- C. A slicer set to their region  
  _Rationale:_ Users can change slicers; it is not security.
- D. Sensitivity labels  
  _Rationale:_ Labels classify and protect content but do not filter rows.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
