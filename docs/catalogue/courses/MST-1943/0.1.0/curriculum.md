# Risk Management and Position Sizing for Traders

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1943` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Risk Management and Position Sizing for Traders (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define risk per trade and per day before entering a position
2. Explain expectancy and how win rate and reward-to-risk interact
3. Apply fixed-fractional and volatility-based position-sizing methods
4. Relate drawdown, risk of ruin and recovery requirements
5. Account for correlation and portfolio-level exposure
6. Write and enforce a personal risk plan

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Risk-first thinking (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute expectancy from a sample of past trades; (2) Show why a 40% win rate can still be profitable
- Common misconception addressed: Believing a high win rate alone means a profitable system
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Risk per trade, per day and per week | 120 | 7 |
| M01L02 | Expectancy, win rate and reward-to-risk | 120 | 7 |

### M02 Position-sizing methods (25% (Mastemy design weight), design weight)

- Worked applications: (1) Size a trade to risk 1% given an entry and a stop; (2) Resize the same trade when the stop is twice as far
- Common misconception addressed: Sizing by gut feel instead of a fixed risk amount
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fixed-fractional and fixed-risk sizing | 120 | 7 |
| M02L02 | Sizing from stop distance and volatility (ATR) | 120 | 7 |

### M03 Managing drawdown (25% (Mastemy design weight), design weight)

- Worked applications: (1) Calculate the gain needed to recover from a 25% drawdown; (2) Add exposure across two correlated positions and total the risk
- Common misconception addressed: Treating two correlated trades as independent bets
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Drawdown, risk of ruin and recovery math | 120 | 7 |
| M03L02 | Correlation and portfolio-level exposure | 120 | 7 |

### M04 Rules and discipline (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draft a one-page risk plan with per-trade and daily loss limits; (2) Audit a week of trades for any limit that was exceeded
- Common misconception addressed: Moving a stop further away to avoid taking a planned loss
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Writing and enforcing a risk plan | 120 | 7 |
| M04L02 | Reviewing risk breaches honestly | 120 | 7 |

## Integrative case

A trader with a small account wants to survive a losing streak: set per-trade and daily risk limits, size each position from the stop distance, estimate recovery needs after a drawdown, account for correlated positions, and write an enforceable risk plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1943-final-protected | 40 | 40 | yes |
| MST-1943-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Risk-first thinking | 10 |
| Position-sizing methods | 10 |
| Managing drawdown | 10 |
| Rules and discipline | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1943-Q0001** (single-answer, Select ONE) An account falls 25% in a drawdown. Approximately what percentage gain on the remaining balance is needed to get back to even?

- A. About 33% **(key)**  
  _Rationale:_ Correct: losing 25% leaves 75%, and 0.25/0.75 is about 33%, so a larger gain is needed to recover.
- B. Exactly 25%  
  _Rationale:_ Recovery requires more than the percentage lost because the base is smaller.
- C. About 10%  
  _Rationale:_ That understates the required recovery after a 25% loss.
- D. About 75%  
  _Rationale:_ 75% is the remaining balance, not the gain needed.

**MST-1943-Q0002** (multiple-answer, Select TWO) Which TWO inputs are needed to size a position to a fixed dollar risk? (Select TWO.)

- A. The dollar amount the trader is willing to lose on the trade **(key)**  
  _Rationale:_ Correct: the risk budget is a required input.
- B. The distance in price from entry to the protective stop **(key)**  
  _Rationale:_ Correct: stop distance determines loss per unit and thus size.
- C. The all-time high of the market  
  _Rationale:_ A historical high does not determine position size.
- D. The trader's broker login name  
  _Rationale:_ Account identifiers are irrelevant to sizing.

**MST-1943-Q0003** (single-answer, Select ONE) Two open positions are in highly correlated instruments, each risking 1%. Why is the combined risk greater than two independent 1% risks?

- A. Correlated positions tend to lose together, so their risks add up rather than offset **(key)**  
  _Rationale:_ Correct: positive correlation means the losses are likely to occur at the same time.
- B. Correlation always halves total risk  
  _Rationale:_ Positive correlation increases, not halves, concurrent risk.
- C. Each position automatically hedges the other  
  _Rationale:_ Hedging requires negative correlation, not positive.
- D. Correlation has no effect on portfolio risk  
  _Rationale:_ Correlation is central to portfolio-level risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
