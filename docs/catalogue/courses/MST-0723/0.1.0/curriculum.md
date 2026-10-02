# Advanced Google Sheets: Models, Dashboards, and Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0723` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google Sheets product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-SHEETS-ADV (https://support.google.com/docs/topic/9054603; https://support.google.com/docs/table/25273; accessed 2026-10-02) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Advanced Google Sheets: Models, Dashboards, and Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build dynamic models with advanced functions and array formulas
2. Use lookup, logical and dynamic-array functions for decision logic
3. Clean and reshape data with QUERY and regular-expression helpers
4. Design interactive dashboards with charts and controls
5. Validate inputs and audit models for errors
6. Automate repetitive work with macros and Apps Script triggers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Advanced functions and arrays (MASTEMY-DESIGN 16%)

- Worked applications: (1) Rewrite a column of helper formulas as one ARRAYFORMULA; (2) Build a reusable LAMBDA for tax calculation
- Common misconception addressed: Assuming ARRAYFORMULA auto-expands every function the same way
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Array formulas and spill ranges | 120 | 7 |
| M01L02 | LAMBDA and named functions | 120 | 7 |

### M02 Lookup and logic (MASTEMY-DESIGN 16%)

- Worked applications: (1) Replace VLOOKUP with XLOOKUP handling a missing match; (2) Build a tiered-commission lookup with IFS
- Common misconception addressed: Using approximate-match lookups on unsorted data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | XLOOKUP, INDEX/MATCH and FILTER | 120 | 7 |
| M02L02 | Nested IF, IFS and dynamic arrays | 120 | 7 |

### M03 Reshaping data with QUERY (MASTEMY-DESIGN 17%)

- Worked applications: (1) Summarize sales by region with a QUERY pivot; (2) Extract order IDs with REGEXEXTRACT
- Common misconception addressed: Confusing QUERY column letters with header labels
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | QUERY syntax and aggregation | 120 | 7 |
| M03L02 | Regular-expression text cleanup | 120 | 7 |

### M04 Dashboards and controls (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a combo chart of revenue vs target; (2) Add a slicer that filters a dashboard by region
- Common misconception addressed: Binding a chart to raw rows instead of a summary range
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Chart types and combo charts | 120 | 7 |
| M04L02 | Slicers, filter views and controls | 120 | 7 |

### M05 Validation and auditing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a dependent dropdown for category and sub-category; (2) Trap errors with IFERROR and trace a #REF!
- Common misconception addressed: Hiding errors with IFERROR instead of fixing the cause
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data validation and dependent dropdowns | 120 | 7 |
| M05L02 | Error handling and formula auditing | 120 | 7 |

### M06 Automation with Apps Script (MASTEMY-DESIGN 17%)

- Worked applications: (1) Record a formatting macro and generalise it; (2) Add a time-driven trigger to refresh a report
- Common misconception addressed: Expecting a custom function to edit other cells or send email
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Recording and editing macros | 120 | 7 |
| M06L02 | Custom functions and triggers | 120 | 7 |

## Integrative case

Turn a raw multi-sheet sales export into a decision-ready planning model: build array-driven calculations, reshape the data with QUERY, add an interactive dashboard with slicers, protect and validate the inputs, then automate the monthly refresh with a time-driven script.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0723-final-protected | 40 | 50 | yes |
| MST-0723-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Advanced functions and arrays | 7 |
| Lookup and logic | 7 |
| Reshaping data with QUERY | 7 |
| Dashboards and controls | 7 |
| Validation and auditing | 6 |
| Automation with Apps Script | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0723-Q0001** (single-answer, Select ONE) You need a single formula in the header cell that returns results for the whole column as new rows are added. Which approach fits best?

- A. ARRAYFORMULA wrapping the calculation **(key)**  
  _Rationale:_ Correct: ARRAYFORMULA applies the calculation across the whole range and expands as data grows.
- B. Copying a formula down 1,000 rows  
  _Rationale:_ Manual fill does not auto-extend to new rows and clutters the sheet.
- C. A pivot table  
  _Rationale:_ A pivot summarises data; it does not place a per-row calculation back in the column.
- D. Conditional formatting  
  _Rationale:_ Conditional formatting changes appearance, not computed values.

**MST-0723-Q0002** (single-answer, Select ONE) Which function reshapes and summarises a range using an SQL-like statement inside Google Sheets?

- A. QUERY **(key)**  
  _Rationale:_ Correct: QUERY runs an SQL-like SELECT/GROUP BY against a range.
- B. TRANSPOSE  
  _Rationale:_ TRANSPOSE only swaps rows and columns.
- C. SPARKLINE  
  _Rationale:_ SPARKLINE draws a tiny in-cell chart.
- D. JOIN  
  _Rationale:_ JOIN concatenates array values into a text string.

**MST-0723-Q0003** (multiple-answer, Select TWO) Which TWO techniques reduce broken references when a model is copied or extended? (Select TWO.)

- A. Lock constants with absolute references ($A$1) **(key)**  
  _Rationale:_ Correct: absolute references keep the target fixed when copied.
- B. Use named ranges for key inputs **(key)**  
  _Rationale:_ Correct: named ranges stay valid and readable as the model grows.
- C. Merge the input cells  
  _Rationale:_ Merging breaks many formulas and sorting.
- D. Delete the error rows  
  _Rationale:_ Deleting data hides the problem rather than fixing the reference.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
