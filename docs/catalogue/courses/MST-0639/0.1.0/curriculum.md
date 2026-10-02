# Excel Budgeting, Forecasting, and Variance Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0639` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02: Excel FORECAST.ETS (exponential smoothing with automatic seasonality and up to 30% missing-data tolerance), the resource planning/budgeting cycle, and the Variance analysis feature (budget vs actual, pivot-table-driven). Exact Excel build and plan to be recorded in the feature/version table before production. |
| Official sources | https://learn.microsoft.com/office/vba/api/excel.worksheetfunction.forecast_ets; https://learn.microsoft.com/dynamics365/finance/budgeting/budgeting-overview; https://learn.microsoft.com/copilot/finance/variance/variance-overview |
| Evidence | **vendor-docs-partial** - official Microsoft documentation read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-FORECAST-VARIANCE |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Budgeting, Forecasting, and Variance Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build a driver-based budget workbook with clearly separated inputs, calculations and outputs
2. Produce baseline forecasts using Excel trend and FORECAST.ETS functions and state their assumptions
3. Perform budget-versus-actual variance analysis and quantify favourable and adverse variances
4. Explain each variance with contributing factors a reviewer can trace to source data
5. Package budgeting outputs into a reviewable management report

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Budget structure and drivers (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Lay out a departmental budget with a dedicated assumptions block; (2) Convert three fixed line items into driver-based formulas
- Common misconception addressed: Hard-coding numbers inside formulas instead of referencing an assumptions cell
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Separating inputs, calculations and outputs | 96 | 6 |
| M01L02 | Driver-based budgeting and assumptions | 96 | 6 |
### M02 Forecasting methods (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Forecast next quarter's revenue with FORECAST.ETS on monthly history; (2) Compare a linear trend with an ETS forecast and justify the choice
- Common misconception addressed: Assuming FORECAST.ETS needs no consistent timeline step between points
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Trend and moving-average forecasts | 96 | 6 |
| M02L02 | FORECAST.ETS and seasonality | 96 | 6 |
### M03 Variance analysis (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a budget-vs-actual table with favourable/adverse flags; (2) Split a total cost variance into rate and volume components
- Common misconception addressed: Reading every negative number as an adverse variance regardless of whether it is a cost or a revenue line
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Budget vs actual and variance signing | 96 | 6 |
| M03L02 | Decomposing a variance into drivers | 96 | 6 |
### M04 Explaining and reviewing variances (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Write a short narrative for the three largest variances; (2) Run a review checklist linking each explained figure to a source cell
- Common misconception addressed: Explaining a variance with a story that cannot be traced back to the workbook
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Writing a traceable variance narrative | 96 | 6 |
| M04L02 | Review checks before sign-off | 96 | 6 |
### M05 Management reporting (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Produce a one-page budget summary for a manager; (2) Set up the workbook so next month's actuals refresh the report
- Common misconception addressed: Rebuilding the report by hand each period instead of designing it to refresh
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Summarising for decision-makers | 96 | 6 |
| M05L02 | Refreshable monthly reporting pack | 96 | 6 |

## Integrative case

A department head must present next year's budget: build a driver-based budget, forecast revenue and key costs with FORECAST.ETS, compare the first quarter's actuals, explain the three largest variances with traceable drivers, and summarise the result on one reviewable page.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0639-final-protected | 30 | 40 | yes |
| MST-0639-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Budget structure and drivers | 6 |
| Forecasting methods | 6 |
| Variance analysis | 6 |
| Explaining and reviewing variances | 6 |
| Management reporting | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0639-Q0001** (single-answer, Select ONE) You build a budget where each formula contains the growth rate typed directly inside it. A reviewer asks you to change the growth assumption everywhere at once. Why is this hard?

- A. The growth rate is hard-coded into many formulas instead of referenced from one assumptions cell **(key)**  
  _Rationale:_ Correct: a single referenced assumption can be changed once; hard-coded values must each be edited.
- B. Excel cannot store percentages  
  _Rationale:_ Excel stores percentages natively; that is not the issue.
- C. Budgets may not contain growth rates  
  _Rationale:_ Growth rates are normal budget inputs; nothing forbids them.
- D. Formulas cannot reference other cells  
  _Rationale:_ Referencing other cells is a core Excel capability.
**MST-0639-Q0002** (multiple-answer, Select TWO) Which TWO conditions must the historical timeline meet for Excel's FORECAST.ETS to work as documented? (Select TWO.)

- A. The timeline must have a consistent step between points **(key)**  
  _Rationale:_ Correct: FORECAST.ETS requires a constant step and errors if it cannot find one.
- B. The timeline must contain duplicate timestamps  
  _Rationale:_ Duplicate timeline values cause an error unless aggregation resolves them; duplicates are not required.
- C. Missing data must stay under about 30% of points **(key)**  
  _Rationale:_ Correct: FORECAST.ETS tolerates up to roughly 30% missing data and errors beyond that.
- D. The target date must fall before the end of history  
  _Rationale:_ The target date must be after the historical timeline, not before it.
**MST-0639-Q0003** (single-answer, Select ONE) A revenue line shows actual below budget. On a cost line the same month shows actual below budget. How should the two be signed in a variance report?

- A. Revenue below budget is adverse; cost below budget is favourable **(key)**  
  _Rationale:_ Correct: a shortfall in revenue hurts the result, while spending less than budgeted helps it.
- B. Both are adverse because both are negative  
  _Rationale:_ Signing by raw negativity ignores whether the line is revenue or cost.
- C. Both are favourable because actuals are lower  
  _Rationale:_ Lower revenue is not favourable.
- D. Neither can be classified without a forecast  
  _Rationale:_ Budget-vs-actual signing needs only the budget and the actual.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
