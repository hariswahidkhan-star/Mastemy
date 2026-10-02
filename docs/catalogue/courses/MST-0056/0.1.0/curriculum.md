# FRM Part I: Financial Risk Foundations and Quantitative Methods

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0056` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GARP (no affiliation or endorsement) |
| Exam code | FRM Part I |
| Version basis | DESIGN ASSUMPTION - official outline not retrieved (network egress blocked on issuer site) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked on 2026-10-02; structure is a DESIGN ASSUMPTION pending official confirmation |
| Legacy IDs | MST-FIN-FRM-P1-001 |
| Planned time | T = 12000 min; instruction I = 9600 min (80%); assessment A = 2400 min (20%) |
| Assessment split | lesson checks 600 / module checks 840 / cumulative 960 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain foundational risk-management concepts and risk governance (design-assumption scope, pending official confirmation)
2. Apply quantitative methods used in financial risk analysis
3. Describe financial markets, instruments and their risk characteristics
4. Apply valuation and risk-measurement models including Value at Risk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Foundations of risk management (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Foundations of risk management' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Foundations of risk management'
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Risk management concepts and governance | 1200 | 6 |
| M01L02 | Enterprise risk and risk-adjusted performance | 1200 | 6 |

### M02 Quantitative analysis (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Quantitative analysis' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Quantitative analysis'
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Probability, distributions and estimation | 1200 | 6 |
| M02L02 | Regression, time series and volatility | 1200 | 6 |

### M03 Financial markets and products (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Financial markets and products' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Financial markets and products'
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Derivatives: futures, forwards and options | 1200 | 6 |
| M03L02 | Interest rates, bonds and foreign exchange | 1200 | 6 |

### M04 Valuation and risk models (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Valuation and risk models' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Valuation and risk models'
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Value at Risk and expected shortfall | 1200 | 6 |
| M04L02 | Fixed-income valuation and option risk measures | 1200 | 6 |

## Integrative case

A risk analyst at a mid-size bank estimates one-day Value at Risk for a bond-and-option portfolio, explains the model's limitations to a risk committee, and recommends a complementary expected-shortfall measure.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0056-practice-form-A | 360 | 360 | yes |
| MST-0056-practice-form-B | 360 | 360 | no (optional practice) |
| MST-0056-practice-form-C | 360 | 360 | no (optional practice) |
| MST-0056-final-protected | 360 | 360 | yes |

| Domain | Items per form |
|---|---|
| Foundations of risk management | 90 |
| Quantitative analysis | 90 |
| Financial markets and products | 90 |
| Valuation and risk models | 90 |

Minimum reviewed item bank: 3216 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0056-Q0001** (single-answer, Select ONE) A portfolio's one-day 99% Value at Risk is reported as $2 million. What does this figure most directly describe?

- A. A loss level the portfolio is not expected to exceed on 99% of days, over a one-day horizon **(key)**  
  _Rationale:_ Correct: VaR at 99%/one-day is a loss threshold expected to be exceeded on about 1% of days.
- B. The maximum possible loss the portfolio can ever suffer  
  _Rationale:_ VaR is not a maximum loss; losses beyond VaR can and do occur in the tail.
- C. The expected profit over the next day  
  _Rationale:_ VaR measures downside risk, not expected profit.
- D. The guaranteed loss every day  
  _Rationale:_ VaR is a probabilistic threshold, not a guaranteed daily loss.

**MST-0056-Q0002** (single-answer, Select ONE) Which measure addresses a key weakness of Value at Risk by describing the average loss in the tail beyond the VaR threshold?

- A. Expected shortfall (conditional VaR) **(key)**  
  _Rationale:_ Correct: expected shortfall averages losses beyond the VaR cutoff, capturing tail severity.
- B. Standard deviation  
  _Rationale:_ Standard deviation measures dispersion, not tail-conditional loss.
- C. Duration  
  _Rationale:_ Duration measures interest-rate sensitivity of bonds, not tail loss.
- D. Beta  
  _Rationale:_ Beta measures systematic market sensitivity, not tail loss.

**MST-0056-Q0003** (multiple-answer, Select TWO) Select TWO instruments generally classified as derivatives. (Select TWO.)

- A. A futures contract **(key)**  
  _Rationale:_ Correct: a futures contract derives its value from an underlying asset.
- B. An equity call option **(key)**  
  _Rationale:_ Correct: an option is a derivative whose value depends on an underlying asset.
- C. A common share of stock  
  _Rationale:_ A common share is a direct equity claim, not a derivative.
- D. A physical gold bar  
  _Rationale:_ A physical commodity is an underlying asset, not a derivative.
- E. A savings-account balance  
  _Rationale:_ A bank deposit is not a derivative instrument.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
