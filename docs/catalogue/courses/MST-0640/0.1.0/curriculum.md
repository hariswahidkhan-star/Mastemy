# Excel Cash-Flow Forecasting and Working-Capital Models

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0640` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Office/Excel documentation read via the Microsoft Learn MCP on 2026-10-02: NPV (periodic cash flows beginning one period before the first value), IRR (the rate at which NPV equals zero, solved iteratively), XNPV/PMT, and their documented assumptions about cash-flow timing. |
| Official sources | https://learn.microsoft.com/office/vba/api/excel.worksheetfunction.npv; https://learn.microsoft.com/office/vba/api/excel.worksheetfunction.irr; https://learn.microsoft.com/office/vba/api/excel.worksheetfunction.xnpv |
| Evidence | **vendor-docs-partial** - official Microsoft documentation read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-CASHFLOW |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Cash-Flow Forecasting and Working-Capital Models (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model a direct cash-flow forecast separating operating, investing and financing flows
2. Apply NPV, XNPV and IRR correctly given their cash-flow timing assumptions
3. Project working-capital movements from receivables, payables and inventory assumptions
4. Build a short-term liquidity forecast and identify funding gaps
5. Stress-test a cash-flow model against changed collection and payment assumptions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Cash-flow model structure (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Lay out a 12-month direct cash-flow with opening and closing balances; (2) Classify ten transactions as operating, investing or financing
- Common misconception addressed: Confusing profit with cash by ignoring timing of receipts and payments
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Direct cash-flow layout | 96 | 6 |
| M01L02 | Timing conventions and periods | 96 | 6 |
### M02 Discounting and return metrics (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Value a project with NPV and add the period-zero outlay correctly; (2) Use XNPV for cash flows on irregular dates and compare to NPV
- Common misconception addressed: Including the period-zero cash flow inside the NPV values argument instead of adding it after
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | NPV and the first-period assumption | 96 | 6 |
| M02L02 | IRR, XNPV and irregular timing | 96 | 6 |
### M03 Working capital (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Derive monthly receipts from a sales forecast and collection days; (2) Build a working-capital schedule that feeds the cash-flow forecast
- Common misconception addressed: Treating a sale as immediate cash regardless of collection terms
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Receivables, payables and inventory days | 96 | 6 |
| M03L02 | Working-capital roll-forward | 96 | 6 |
### M04 Liquidity and funding (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Flag the weeks where the closing balance breaches a minimum buffer; (2) Size a revolving facility to cover the largest forecast gap
- Common misconception addressed: Reporting an annual surplus while ignoring an intra-year cash trough
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Short-term liquidity forecast | 96 | 6 |
| M04L02 | Identifying and sizing funding gaps | 96 | 6 |
### M05 Stress testing (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Rerun the forecast with collections 15 days slower; (2) Summarise best/base/worst closing cash for a treasurer
- Common misconception addressed: Presenting a single forecast as certain with no downside scenario
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scenario inputs and sensitivity | 96 | 6 |
| M05L02 | Communicating downside cash risk | 96 | 6 |

## Integrative case

A controller must show the board the business can fund the next year: build a direct monthly cash-flow model with a working-capital schedule, value a planned capital project with NPV and IRR, identify the tightest liquidity week, and stress the model for slower collections.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0640-final-protected | 30 | 40 | yes |
| MST-0640-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cash-flow model structure | 6 |
| Discounting and return metrics | 6 |
| Working capital | 6 |
| Liquidity and funding | 6 |
| Stress testing | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0640-Q0001** (single-answer, Select ONE) A project costs 100,000 today and returns cash in later years. You list the 100,000 as the first value inside the NPV values argument at the current discount rate. Why is the result wrong?

- A. NPV assumes the first value occurs one period in; a period-zero outlay must be added outside NPV **(key)**  
  _Rationale:_ Correct: the NPV investment begins one period before the first listed value, so a today outlay is added to the NPV result, not included in it.
- B. NPV cannot accept negative numbers  
  _Rationale:_ NPV accepts negative values (payments); that is not the problem.
- C. NPV requires exactly 30 cash flows  
  _Rationale:_ The 30-argument form is a limit, not a requirement.
- D. NPV and IRR cannot be used together  
  _Rationale:_ They are directly related; IRR is the rate where NPV equals zero.
**MST-0640-Q0002** (multiple-answer, Select TWO) Which TWO statements about Excel's IRR are correct per the documentation? (Select TWO.)

- A. IRR is the discount rate at which NPV equals zero **(key)**  
  _Rationale:_ Correct: IRR corresponds to a zero net present value.
- B. The cash flows must contain at least one negative and one positive value **(key)**  
  _Rationale:_ Correct: IRR needs both a payment and a receipt to converge.
- C. IRR guarantees a unique answer for any cash-flow pattern  
  _Rationale:_ Sign changes can yield multiple or no solutions; IRR may return #NUM!.
- D. IRR ignores the order of the cash flows  
  _Rationale:_ IRR uses the order of values to interpret the timing of flows.
**MST-0640-Q0003** (single-answer, Select ONE) A model treats every sale as cash received in the same month. For a business that collects after 45 days, what is the main consequence?

- A. The cash-flow forecast overstates early cash and hides a funding gap **(key)**  
  _Rationale:_ Correct: ignoring collection lag pulls cash forward and can mask a real shortfall.
- B. Reported annual profit becomes negative  
  _Rationale:_ Profit recognition is separate from the cash-timing error described.
- C. NPV can no longer be calculated  
  _Rationale:_ NPV is still computable; it would simply use the wrong timing.
- D. Inventory days become irrelevant  
  _Rationale:_ Inventory still affects working capital regardless of this error.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
