# Excel Project Cost Control and Earned-Value Reporting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0641` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Earned-value concepts (planned value, earned value, actual cost, schedule and cost variance, CPI/SPI, estimate at completion) grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02; Excel functions (SUMPRODUCT, charting, conditional formatting) from official Excel documentation. Formula labels and function availability vary by Excel channel; confirm against the current build before production. |
| Official sources | https://support.microsoft.com/office/sumproduct-function-16753e75-9f68-4874-94ac-4d2145a2fd2e; https://learn.microsoft.com/dynamics365/project-operations/prod-pma/work-breakdown-structures |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-EVM |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — Excel Project Cost Control and Earned-Value Reporting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build a time-phased cost baseline in Excel
2. Compute earned-value metrics (planned value, earned value, actual cost)
3. Calculate schedule and cost variances and performance indices
4. Forecast estimate at completion from performance indices
5. Design a concise earned-value status report

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Cost baselines and budget structures (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a time-phased planned-value baseline across reporting periods; (2) Lay out a cost breakdown structure with roll-up subtotals
- Common misconception addressed: Treating a single lump-sum budget as enough instead of time-phasing planned value
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Building a time-phased budget | 80 | 5 |
| M01L02 | Cost breakdown structures and roll-ups | 80 | 5 |
| M01L03 | Baseline versus actuals layout | 80 | 5 |

### M02 Earned-value metrics (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute planned value, earned value and actual cost columns from a task table; (2) Derive earned value from physical percent complete with SUMPRODUCT
- Common misconception addressed: Confusing percent of budget spent with percent of work complete when computing earned value
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Planned value and actual cost | 80 | 5 |
| M02L02 | Earned value and percent complete | 80 | 5 |
| M02L03 | Computing earned value with SUMPRODUCT | 80 | 5 |

### M03 Variance and performance indices (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build schedule-variance and cost-variance columns from EVM metrics; (2) Forecast estimate at completion from the cost performance index
- Common misconception addressed: Reading a cost performance index above 1 as over budget rather than under budget
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Schedule and cost variance | 80 | 5 |
| M03L02 | Cost and schedule performance indices | 80 | 5 |
| M03L03 | Estimate at completion | 80 | 5 |

### M04 Cost dashboards and reporting (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Plot a planned-value, earned-value and actual-cost S-curve; (2) Flag red/amber/green variances with conditional formatting
- Common misconception addressed: Showing raw cost numbers without variance context so trend is invisible to stakeholders
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | EVM S-curve charts | 80 | 5 |
| M04L02 | Variance tables and conditional formatting | 80 | 5 |
| M04L03 | Packaging a one-page status report | 80 | 5 |

## Integrative case

A project controller must report mid-project status on a nine-month build: construct the time-phased cost baseline, compute earned value and CPI/SPI from the latest actuals, forecast the estimate at completion, and present a one-page S-curve dashboard to the steering committee.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0641-final-protected | 30 | 40 | yes |
| MST-0641-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cost baselines and budget structures | 8 |
| Earned-value metrics | 8 |
| Variance and performance indices | 7 |
| Cost dashboards and reporting | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0641-Q0001** (single-answer, Select ONE) On a work package the planned value is 100, the earned value is 80 and the actual cost is 90 (all in thousands). What does this indicate?

- A. The package is behind schedule and over budget **(key)**  
  _Rationale:_ Correct: earned value below planned value means behind schedule, and earned value below actual cost means over budget.
- B. The package is ahead of schedule and under budget  
  _Rationale:_ Ahead/under would require earned value above planned value and above actual cost.
- C. The package is exactly on plan  
  _Rationale:_ On plan would require earned value to equal both planned value and actual cost.
- D. The package is ahead of schedule but over budget  
  _Rationale:_ Earned value is below planned value, so it is behind schedule, not ahead.

**MST-0641-Q0002** (multiple-answer, Select TWO) Which TWO earned-value formulas are correct? (Select TWO.)

- A. Schedule variance = earned value minus planned value **(key)**  
  _Rationale:_ Correct: SV = EV - PV.
- B. Cost performance index = earned value divided by actual cost **(key)**  
  _Rationale:_ Correct: CPI = EV / AC.
- C. Cost variance = actual cost minus earned value  
  _Rationale:_ Cost variance is EV - AC, not AC - EV.
- D. Schedule performance index = planned value divided by earned value  
  _Rationale:_ SPI is EV / PV, not PV / EV.

**MST-0641-Q0003** (single-answer, Select ONE) A project reports a cost performance index of 1.1. What does this mean?

- A. The project is earning more value than it is spending, so it is under budget **(key)**  
  _Rationale:_ Correct: CPI above 1 means earned value exceeds actual cost.
- B. The project is over budget  
  _Rationale:_ CPI above 1 indicates under budget, not over.
- C. The project is behind schedule  
  _Rationale:_ CPI is a cost measure; schedule is read from SPI.
- D. The project has overspent its contingency  
  _Rationale:_ CPI does not describe contingency usage directly.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
