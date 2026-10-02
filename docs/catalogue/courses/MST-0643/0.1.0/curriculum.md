# Excel Human-Resources and Payroll Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0643` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Excel feature facts (date functions including DATEDIF and YEARFRAC, rate-table lookups, PivotTables, sheet and range protection) grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02; HR and payroll metrics (FTE, gross-to-net, turnover) are standard workforce-analytics techniques applied in Excel. Confirm function and feature availability against the current build before production. |
| Official sources | https://support.microsoft.com/office/datedif-function-25dba1a4-2812-480b-84dd-8b32a451b35c; https://support.microsoft.com/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576 |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-HR |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — Excel Human-Resources and Payroll Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model HR master and headcount data
2. Compute payroll from gross to net using rate tables
3. Track leave balances and workforce turnover
4. Build HR analytics dashboards
5. Handle sensitive personal data responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 HR data and headcount (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute employee tenure with DATEDIF and YEARFRAC; (2) Build headcount and FTE by department
- Common misconception addressed: Counting rows as headcount while ignoring full-time-equivalent and leavers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Employee master structure | 80 | 5 |
| M01L02 | Headcount and FTE calculations | 80 | 5 |
| M01L03 | Date functions for tenure | 80 | 5 |

### M02 Payroll calculations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute gross-to-net pay with layered formulas; (2) Model overtime bands against a rate table
- Common misconception addressed: Hard-coding tax and deduction amounts instead of referencing a rate table
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Gross pay and hours | 80 | 5 |
| M02L02 | Overtime and allowances | 80 | 5 |
| M02L03 | Deductions and net-pay layout | 80 | 5 |

### M03 Attendance, leave and turnover (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a leave-accrual and balance tracker; (2) Compute an annualised turnover rate from a defined population
- Common misconception addressed: Computing turnover without annualising or defining the population
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Leave accrual tracking | 80 | 5 |
| M03L02 | Absence and attendance rates | 80 | 5 |
| M03L03 | Turnover and retention metrics | 80 | 5 |

### M04 HR dashboards and privacy (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a headcount and turnover dashboard; (2) Mask and protect sensitive columns in a shared workbook
- Common misconception addressed: Leaving personal data unprotected in shared HR workbooks
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Diversity and pay summaries | 80 | 5 |
| M04L02 | PivotTable HR dashboards | 80 | 5 |
| M04L03 | Protecting sensitive data | 80 | 5 |

## Integrative case

An HR analyst builds a workforce workbook for a 400-person firm: headcount and full-time-equivalent counts, gross-to-net pay driven by a rate table, leave balances and turnover, presented as a protected dashboard for leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0643-final-protected | 30 | 40 | yes |
| MST-0643-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| HR data and headcount | 8 |
| Payroll calculations | 8 |
| Attendance, leave and turnover | 7 |
| HR dashboards and privacy | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0643-Q0001** (single-answer, Select ONE) Which function returns the whole number of complete years between a hire date and today?

- A. DATEDIF with the "Y" unit **(key)**  
  _Rationale:_ Correct: DATEDIF(start, end, "Y") returns complete years.
- B. TODAY only  
  _Rationale:_ TODAY returns the current date, not an interval.
- C. SUM of the two dates  
  _Rationale:_ Adding dates does not yield an interval in years.
- D. TEXT of the hire date  
  _Rationale:_ TEXT formats a value; it does not compute an interval.

**MST-0643-Q0002** (multiple-answer, Select TWO) Which TWO are needed to compute a meaningful turnover rate? (Select TWO.)

- A. A clearly defined population (headcount base) **(key)**  
  _Rationale:_ Correct: turnover needs a defined denominator.
- B. Annualisation of the period **(key)**  
  _Rationale:_ Correct: rates from partial periods must be annualised to compare.
- C. Each employee's favourite colour  
  _Rationale:_ Irrelevant to turnover.
- D. The office floor plan  
  _Rationale:_ Irrelevant to turnover.

**MST-0643-Q0003** (single-answer, Select ONE) Why should payroll deduction rates live in a separate rate table rather than inside each formula?

- A. So a rate change is made once and flows through every calculation **(key)**  
  _Rationale:_ Correct: centralising rates makes updates safe and auditable.
- B. Because Excel cannot multiply without a table  
  _Rationale:_ Excel multiplies values directly; this is a design choice.
- C. To make the file smaller  
  _Rationale:_ A rate table does not meaningfully change file size.
- D. Because formulas cannot reference other cells  
  _Rationale:_ Formulas reference cells freely.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
