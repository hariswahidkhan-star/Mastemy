# Quantitative Finance Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1731` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-FIN-SK-QFF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Quantitative Finance Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Math and stats foundations
2. Returns and volatility
3. Pricing foundations
4. Risk measurement
5. Models and their limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses conceptual and foundational knowledge through selection items; does not assess building or validating a production pricing or risk model, or use of specialised quant software.

## Modules

### M01 Math and stats foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret mean and variance of returns; (2) Identify when a normal assumption is reasonable
- Common misconception addressed: Assuming financial returns are always normally distributed
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Random variables, mean and variance | 72 | 6 |
| M01L02 | Distributions and the normal curve | 72 | 6 |

### M02 Returns and volatility (MASTEMY-DESIGN 20%)

- Worked applications: (1) Convert between simple and log returns conceptually; (2) Annualise a volatility figure
- Common misconception addressed: Confusing variance with standard deviation
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Log vs simple returns | 72 | 6 |
| M02L02 | Measuring and annualising volatility | 72 | 6 |

### M03 Pricing foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain the no-arbitrage principle; (2) Describe risk-neutral pricing at a high level
- Common misconception addressed: Thinking no-arbitrage guarantees a risk-free profit exists
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Discounting and no-arbitrage | 72 | 6 |
| M03L02 | Risk-neutral valuation idea | 72 | 6 |

### M04 Risk measurement (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a VaR statement correctly; (2) Explain a key limitation of VaR
- Common misconception addressed: Reading VaR as the maximum possible loss
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Value at Risk basics | 72 | 6 |
| M04L02 | Limitations of VaR and stress testing | 72 | 6 |

### M05 Models and their limits (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe what a Monte Carlo simulation does; (2) Identify an assumption that can break a model
- Common misconception addressed: Trusting a model's output without checking its assumptions
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Simple models: regression and Monte Carlo idea | 72 | 6 |
| M05L02 | Model risk and assumptions | 72 | 6 |

## Integrative case

Stress-test a simple equity position quantitatively: summarise its return distribution, annualise its volatility, state a one-day VaR with its limitations, and explain where the model's normality and historical-data assumptions could fail in a crisis.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1731-final-protected | 25 | 25 | yes |
| MST-1731-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Math and stats foundations | 5 |
| Returns and volatility | 5 |
| Pricing foundations | 5 |
| Risk measurement | 5 |
| Models and their limits | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1731-Q0001** (single-answer, Select ONE) A one-day 99% Value at Risk of 1 million means:

- A. On about 1 day in 100, the loss is expected to exceed 1 million **(key)**  
  _Rationale:_ Correct: VaR is a threshold exceeded with the stated small probability.
- B. The maximum possible loss is exactly 1 million  
  _Rationale:_ VaR is not a maximum; losses can exceed it.
- C. The portfolio will lose 1 million every day  
  _Rationale:_ VaR is not a daily certain loss.
- D. There is zero chance of losing more than 1 million  
  _Rationale:_ Losses beyond VaR can and do occur.

**MST-1731-Q0002** (multiple-answer, Select ALL that apply) Which two are limitations of assuming returns are normally distributed? (Select TWO) (Select TWO)

- A. Real returns show fatter tails (more extreme events) than the normal **(key)**  
  _Rationale:_ Correct: markets exhibit fat tails the normal understates.
- B. It can understate the probability of large crashes **(key)**  
  _Rationale:_ Correct: the normal underestimates extreme losses.
- C. It perfectly captures market crashes  
  _Rationale:_ It does the opposite, understating crashes.
- D. It makes volatility impossible to measure  
  _Rationale:_ Volatility is still measurable regardless.

**MST-1731-Q0003** (single-answer, Select ONE) The no-arbitrage principle in pricing states that:

- A. Two assets with identical cash flows should have the same price **(key)**  
  _Rationale:_ Correct: otherwise a riskless profit would be possible.
- B. Everyone can always earn a guaranteed risk-free profit  
  _Rationale:_ No-arbitrage implies such free profits are competed away.
- C. Prices never change  
  _Rationale:_ Prices change; no-arbitrage is about consistency, not stasis.
- D. Risk does not affect value  
  _Rationale:_ Risk is central to valuation; this is unrelated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
