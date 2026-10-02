# Actuarial Science Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1732` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-FIN-SK-ASF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Actuarial Science Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. What actuaries do
2. Probability and risk
3. Interest and life contingencies
4. Insurance and pensions
5. Models and professionalism

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses conceptual and foundational knowledge through selection items; does not assess a real actuarial valuation, reserving calculation, or professional actuarial opinion.

## Modules

### M01 What actuaries do (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match an actuary to life vs general insurance work; (2) Explain why actuaries model the long term
- Common misconception addressed: Thinking actuaries only work in life insurance
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The actuarial role and fields | 72 | 6 |
| M01L02 | Risk, uncertainty and long-term thinking | 72 | 6 |

### M02 Probability and risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute an expected claim cost; (2) Explain why variability matters, not just the average
- Common misconception addressed: Pricing only on the average and ignoring variability
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Probability basics for actuaries | 72 | 6 |
| M02L02 | Expected value and variability | 72 | 6 |

### M03 Interest and life contingencies (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a survival probability from a life table idea; (2) Discount a future benefit to present value
- Common misconception addressed: Treating mortality rates as fixed and never changing
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Time value and discounting | 72 | 6 |
| M03L02 | Mortality, survival and life tables | 72 | 6 |

### M04 Insurance and pensions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why reserves are held; (2) Describe how a pension promise is funded over time
- Common misconception addressed: Assuming premiums collected equal profit
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Premiums, reserves and solvency | 72 | 6 |
| M04L02 | Pension funding basics | 72 | 6 |

### M05 Models and professionalism (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify an assumption driving a result; (2) Explain why data quality matters for a model
- Common misconception addressed: Treating a model's output as certainty
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Modelling and assumptions | 72 | 6 |
| M05L02 | Data quality and actuarial judgement | 72 | 6 |

## Integrative case

Help a small insurer price a simple term-life product conceptually: use probability and a life-table idea to estimate expected claims, discount the future benefit, explain why a reserve is held, and flag the key assumptions whose errors would most affect the result.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1732-final-protected | 25 | 25 | yes |
| MST-1732-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What actuaries do | 5 |
| Probability and risk | 5 |
| Interest and life contingencies | 5 |
| Insurance and pensions | 5 |
| Models and professionalism | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1732-Q0001** (single-answer, Select ONE) Reserves are held by an insurer primarily to:

- A. Ensure funds are available to pay future claims already incurred or expected **(key)**  
  _Rationale:_ Correct: reserves back future claim obligations.
- B. Record the insurer's profit for the year  
  _Rationale:_ Reserves are liabilities for future claims, not profit.
- C. Pay staff bonuses  
  _Rationale:_ Reserves are for claims, not bonuses.
- D. Replace the need for premiums  
  _Rationale:_ Premiums fund reserves; they are not replaced by them.

**MST-1732-Q0002** (multiple-answer, Select ALL that apply) Which two statements about pricing an insurance risk are correct? (Select TWO) (Select TWO)

- A. Expected claim cost is a key input to the premium **(key)**  
  _Rationale:_ Correct: the expected cost of claims drives pricing.
- B. Variability around the average also matters **(key)**  
  _Rationale:_ Correct: uncertainty, not just the mean, affects pricing and capital.
- C. Only the single most likely outcome matters  
  _Rationale:_ The full distribution matters, not one point.
- D. Premiums should ignore the time value of money  
  _Rationale:_ Discounting of future cash flows is relevant.

**MST-1732-Q0003** (single-answer, Select ONE) A life table is used by actuaries mainly to:

- A. Express probabilities of survival and death by age **(key)**  
  _Rationale:_ Correct: life tables give age-specific survival/mortality.
- B. List every policyholder's name  
  _Rationale:_ It is a statistical table, not a client list.
- C. Set the company's advertising budget  
  _Rationale:_ It is unrelated to marketing spend.
- D. Record daily share prices  
  _Rationale:_ That is market data, not a life table.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
