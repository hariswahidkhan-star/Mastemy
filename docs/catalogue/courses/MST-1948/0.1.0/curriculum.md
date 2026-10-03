# Portfolio Construction for Active Traders

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1948` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1440 min; instruction I = 1152 min (80%); assessment A = 288 min (20%) |
| Assessment split | lesson checks 72 / module checks 101 / cumulative 115 min |
| Certificate | Mastemy Certificate of Completion — Portfolio Construction for Active Traders (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Think in terms of a book of positions rather than single trades
2. Explain return, volatility and correlation at the portfolio level
3. Diversify across instruments and strategies to reduce concentration
4. Allocate capital across setups with a repeatable method
5. Measure aggregate exposure and hedge correlated risk
6. Track performance, attribute results and rebalance with rules

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Portfolio thinking for traders (25% (Mastemy design weight), design weight)

- Worked applications: (1) Combine three position risks into a single portfolio-heat figure; (2) Explain why portfolio return is not simply the best trade's return
- Common misconception addressed: Believing more positions always means more diversification
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From single trades to a book of positions | 144 | 9 |
| M01L02 | Return, volatility and correlation basics | 144 | 9 |

### M02 Diversification and allocation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Allocate a fixed capital base across two uncorrelated strategies; (2) Show how adding a correlated instrument fails to diversify
- Common misconception addressed: Equating holding many tickers with being diversified
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Diversifying across instruments and strategies | 144 | 9 |
| M02L02 | Allocating capital across setups | 144 | 9 |

### M03 Managing portfolio risk (25% (Mastemy design weight), design weight)

- Worked applications: (1) Sum exposures to find total risk if correlated trades all lose; (2) Design a simple hedge to offset a concentrated long exposure
- Common misconception addressed: Ignoring correlation when adding a 'new' position
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Portfolio heat and aggregate exposure | 144 | 9 |
| M03L02 | Hedging and reducing correlated risk | 144 | 9 |

### M04 Reviewing and rebalancing (25% (Mastemy design weight), design weight)

- Worked applications: (1) Attribute a month's result to strategies and position sizing; (2) Define a rule for when to cut an underperforming strategy
- Common misconception addressed: Keeping a losing strategy because it once worked well
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Performance tracking and attribution | 144 | 9 |
| M04L02 | Rebalancing rules and cutting a strategy | 144 | 9 |

## Integrative case

A trader running several setups at once wants a coherent book: measure total portfolio heat, allocate capital across uncorrelated strategies, hedge a concentrated exposure, and set rules for attribution, rebalancing and cutting a strategy that stops working.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1948-final-protected | 40 | 40 | yes |
| MST-1948-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Portfolio thinking for traders | 10 |
| Diversification and allocation | 10 |
| Managing portfolio risk | 10 |
| Reviewing and rebalancing | 10 |

Minimum reviewed item bank: 424 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1948-Q0001** (single-answer, Select ONE) A trader holds eight positions, but all are large-cap technology stocks. Why is this weakly diversified?

- A. The positions are highly correlated, so they tend to move and lose together **(key)**  
  _Rationale:_ Correct: diversification depends on low correlation, not the raw number of positions.
- B. Eight positions is always too few to diversify  
  _Rationale:_ The count is not the issue; the shared correlation is.
- C. Technology stocks cannot be held in a portfolio  
  _Rationale:_ They can be held; the concern is concentration in one correlated group.
- D. Diversification only applies to bonds  
  _Rationale:_ Diversification applies across any correlated holdings, including stocks.

**MST-1948-Q0002** (multiple-answer, Select TWO) Which TWO actions genuinely reduce portfolio-level risk? (Select TWO.)

- A. Adding a position whose returns are uncorrelated with the existing book **(key)**  
  _Rationale:_ Correct: low-correlation additions reduce aggregate volatility.
- B. Capping total portfolio heat so simultaneous losses are bounded **(key)**  
  _Rationale:_ Correct: limiting aggregate risk controls worst-case drawdown.
- C. Doubling the size of the single best-performing position  
  _Rationale:_ Concentrating into one position increases, not reduces, risk.
- D. Adding more positions that are all highly correlated  
  _Rationale:_ Correlated additions do not reduce portfolio risk.

**MST-1948-Q0003** (single-answer, Select ONE) What does performance attribution help an active trader understand?

- A. Which strategies or decisions drove the portfolio's results **(key)**  
  _Rationale:_ Correct: attribution breaks results down by source so the trader can act on it.
- B. The exact price a stock will reach next week  
  _Rationale:_ Attribution explains past results; it does not forecast prices.
- C. How to eliminate all portfolio risk  
  _Rationale:_ Attribution analyses results; it does not remove risk.
- D. Which broker has the lowest fees  
  _Rationale:_ Fee comparison is unrelated to performance attribution.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
