# Financial Mathematics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1722` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-FIN-SK-FM-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Financial Mathematics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Interest and growth
2. Time value of money
3. Annuities and cash-flow streams
4. Loans and amortisation
5. Rates of return

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess use of specialised actuarial or financial-engineering software, or a real pricing model.

## Modules

### M01 Interest and growth (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute compound interest over several periods; (2) Convert a nominal to an effective annual rate
- Common misconception addressed: Treating a nominal rate as the effective rate
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Simple vs compound interest | 72 | 6 |
| M01L02 | Nominal, effective and compounding frequency | 72 | 6 |

### M02 Time value of money (MASTEMY-DESIGN 20%)

- Worked applications: (1) Discount a single future cash flow to present value; (2) Explain why a dollar today beats a dollar later
- Common misconception addressed: Ignoring the discount rate when comparing timed cash flows
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Present value and future value | 72 | 6 |
| M02L02 | Discounting and the discount rate | 72 | 6 |

### M03 Annuities and cash-flow streams (MASTEMY-DESIGN 20%)

- Worked applications: (1) Value a level annuity's present value; (2) Distinguish an ordinary annuity from an annuity due
- Common misconception addressed: Forgetting the timing difference between annuity types
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Ordinary annuities and annuities due | 72 | 6 |
| M03L02 | Present and future value of a stream | 72 | 6 |

### M04 Loans and amortisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Split an early payment into interest and principal; (2) Explain why early payments are mostly interest
- Common misconception addressed: Assuming each payment reduces principal equally
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Loan payments and amortisation schedules | 72 | 6 |
| M04L02 | Interest vs principal over time | 72 | 6 |

### M05 Rates of return (MASTEMY-DESIGN 20%)

- Worked applications: (1) Annualise a multi-period return; (2) Convert a nominal return to a real return
- Common misconception addressed: Comparing returns over different periods without annualising
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Holding-period and annualised returns | 72 | 6 |
| M05L02 | Real vs nominal and basic risk measures | 72 | 6 |

## Integrative case

Analyse a car-loan and savings decision: compute the loan's amortisation and total interest, value the monthly payments as an annuity, compare keeping cash in a compounding savings account, and express all returns on a comparable annualised, inflation-adjusted basis.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1722-final-protected | 25 | 25 | yes |
| MST-1722-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Interest and growth | 5 |
| Time value of money | 5 |
| Annuities and cash-flow streams | 5 |
| Loans and amortisation | 5 |
| Rates of return | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1722-Q0001** (single-answer, Select ONE) A nominal annual rate of 12% compounded monthly gives an effective annual rate that is:

- A. Slightly above 12% **(key)**  
  _Rationale:_ Correct: monthly compounding raises the effective rate above the nominal.
- B. Exactly 12%  
  _Rationale:_ Compounding more than once a year lifts the effective rate above nominal.
- C. Below 12%  
  _Rationale:_ More frequent compounding increases, not decreases, the effective rate.
- D. Exactly 1%  
  _Rationale:_ 1% is the monthly rate, not the effective annual rate.

**MST-1722-Q0002** (multiple-answer, Select ALL that apply) Which two statements about the time value of money are correct? (Select TWO) (Select TWO)

- A. A dollar received today is worth more than a dollar received next year **(key)**  
  _Rationale:_ Correct: money today can earn a return.
- B. A higher discount rate lowers the present value of a future cash flow **(key)**  
  _Rationale:_ Correct: higher discounting reduces present value.
- C. Discounting makes future cash flows worth more today  
  _Rationale:_ Discounting reduces their present value.
- D. Timing of cash flows is irrelevant to value  
  _Rationale:_ Timing is central to valuation.

**MST-1722-Q0003** (single-answer, Select ONE) Early in a standard amortising loan, each payment is:

- A. Mostly interest with a small principal portion **(key)**  
  _Rationale:_ Correct: early payments are interest-heavy.
- B. Mostly principal with little interest  
  _Rationale:_ Principal dominates later, not early.
- C. Split exactly 50/50 every time  
  _Rationale:_ The split changes over the loan's life.
- D. Entirely principal  
  _Rationale:_ Interest is charged on the outstanding balance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
