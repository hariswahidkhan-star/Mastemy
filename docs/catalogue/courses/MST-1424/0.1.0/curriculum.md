# Excel Financial Modelling Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1424` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Office/Excel documentation read via the Microsoft Learn MCP on 2026-10-02: the PMT loan-payment function, NPV and IRR and their cash-flow timing assumptions. A foundation course; exact Excel build recorded in the feature/version table before production. |
| Official sources | https://learn.microsoft.com/office/vba/api/excel.worksheetfunction.pmt; https://learn.microsoft.com/office/vba/api/excel.worksheetfunction.npv; https://learn.microsoft.com/office/vba/api/excel.worksheetfunction.irr |
| Evidence | **vendor-docs-partial** - official Microsoft documentation read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-FINMODEL |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Excel Financial Modelling Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Lay out a simple three-statement-style model with clear inputs and outputs
2. Use core financial functions PMT, NPV and IRR correctly
3. Link assumptions so a single change flows through the model
4. Check a basic model for obvious errors before relying on it

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Model layout basics (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Lay out a small loan model with an assumptions block; (2) Convert a hard-coded figure into a referenced assumption
- Common misconception addressed: Typing the same number into several formulas instead of referencing one cell
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inputs, calculations, outputs | 60 | 5 |
| M01L02 | Referencing assumptions cleanly | 60 | 5 |
### M02 Core financial functions (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Compute a monthly loan payment with PMT; (2) Appraise a small project with NPV and IRR
- Common misconception addressed: Mixing an annual rate with monthly periods in PMT
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | PMT for loan repayments | 60 | 5 |
| M02L02 | NPV and IRR for simple appraisal | 60 | 5 |
### M03 Linking assumptions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Change one growth assumption and watch outputs update; (2) Add a best/base/worst toggle to the model
- Common misconception addressed: Breaking the link so outputs stop responding to inputs
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | One change flows through | 60 | 5 |
| M03L02 | Simple scenario toggle | 60 | 5 |
### M04 Basic checks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Sanity-check a result against a rough hand estimate; (2) Locate and fix a mis-referenced formula
- Common misconception addressed: Trusting a model output without any sanity check
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sanity-checking outputs | 60 | 5 |
| M04L02 | Finding obvious formula errors | 60 | 5 |

## Integrative case

A junior analyst builds a first model for a small equipment purchase: lay out inputs and outputs, compute the loan payment with PMT, appraise the purchase with NPV and IRR, link the assumptions so one change flows through, and sanity-check the result.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1424-final-protected | 15 | 20 | yes |
| MST-1424-final-alternate | 15 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Model layout basics | 4 |
| Core financial functions | 4 |
| Linking assumptions | 4 |
| Basic checks | 3 |

Minimum reviewed item bank: 190 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-1424-Q0001** (single-answer, Select ONE) You use PMT with an annual interest rate of 12% but monthly periods. What correction is needed?

- A. Divide the annual rate by 12 so the rate matches the monthly period **(key)**  
  _Rationale:_ Correct: the rate and nper must use the same period length.
- B. Multiply the number of periods by the rate  
  _Rationale:_ That does not align rate and period units.
- C. Convert the payment to text  
  _Rationale:_ Formatting is irrelevant to the unit mismatch.
- D. Use IRR instead of PMT  
  _Rationale:_ IRR solves a different problem.
**MST-1424-Q0002** (multiple-answer, Select TWO) Which TWO are good practices in a basic financial model? (Select TWO.)

- A. Keep assumptions in labelled input cells **(key)**  
  _Rationale:_ Correct: referenced assumptions make the model maintainable.
- B. Reference assumptions rather than hard-coding them in formulas **(key)**  
  _Rationale:_ Correct: a single referenced input updates everywhere at once.
- C. Sprinkle constants throughout the formulas  
  _Rationale:_ Hard-coded constants are hard to change and audit.
- D. Avoid ever checking the outputs  
  _Rationale:_ Sanity checks are essential before relying on a model.
**MST-1424-Q0003** (single-answer, Select ONE) You change a growth assumption but outputs do not move. What has most likely gone wrong?

- A. An output formula has a hard-coded value instead of referencing the assumption **(key)**  
  _Rationale:_ Correct: a broken link stops the change flowing through.
- B. Excel caps growth assumptions  
  _Rationale:_ There is no such cap.
- C. PMT disables recalculation  
  _Rationale:_ PMT does not affect recalculation of other cells.
- D. The model must be saved to apply changes  
  _Rationale:_ Recalculation does not require saving.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
