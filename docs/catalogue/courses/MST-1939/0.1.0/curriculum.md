# Forex Trading Foundations: Currency Pairs, Pips and Order Types

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1939` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Forex Trading Foundations: Currency Pairs, Pips and Order Types (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how the global FX market is structured and who participates in it
2. Read currency-pair quotes and calculate pips, lot sizes and leverage
3. Choose and place appropriate order types and understand execution costs
4. Describe the macro drivers that move exchange rates
5. Interpret the economic calendar and plan around scheduled releases
6. Build a simple, rules-based FX trading plan with defined risk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How the FX market works (25% (Mastemy design weight), design weight)

- Worked applications: (1) Convert a 30-pip move on EUR/USD into currency and percentage terms; (2) Diagram the London/New York overlap and its liquidity effect
- Common misconception addressed: Believing a higher leverage figure means a larger or safer position
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | FX sessions, liquidity and market participants | 120 | 7 |
| M01L02 | Base and quote currencies, pips, lots and leverage | 120 | 7 |

### M02 Orders and execution (25% (Mastemy design weight), design weight)

- Worked applications: (1) Place a limit entry with a protective stop and label the risk in pips; (2) Compare expected fills for a market vs limit order in a fast market
- Common misconception addressed: Assuming the quoted spread is the only cost of a trade
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Order types: market, limit, stop and OCO | 120 | 7 |
| M02L02 | Spread, slippage and execution quality | 120 | 7 |

### M03 Drivers of exchange rates (25% (Mastemy design weight), design weight)

- Worked applications: (1) Map a rate-hike surprise to the likely direction of a currency pair; (2) Mark three high-impact releases on a weekly FX calendar
- Common misconception addressed: Treating every news release as equally tradable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Interest rates, inflation and central-bank policy | 120 | 7 |
| M03L02 | Economic releases and the FX calendar | 120 | 7 |

### M04 Building a first FX plan (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write a one-page FX plan with session, setup and max daily loss; (2) Review a week of journaled trades for rule adherence
- Common misconception addressed: Judging a plan by a single week of results
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defining setups, sessions and risk limits | 120 | 7 |
| M04L02 | Journaling and reviewing FX trades | 120 | 7 |

## Integrative case

A new retail trader wants to trade EUR/USD during the London session: define the pair and pip value, choose order types, identify the week's key releases, set a per-trade and daily risk limit, and journal the first five trades for review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1939-final-protected | 40 | 40 | yes |
| MST-1939-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How the FX market works | 10 |
| Orders and execution | 10 |
| Drivers of exchange rates | 10 |
| Building a first FX plan | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1939-Q0001** (single-answer, Select ONE) A EUR/USD position is opened at 1.1000 and closed at 1.1030 on one standard lot (100,000 units). How many pips is that move?

- A. 30 pips **(key)**  
  _Rationale:_ Correct: one pip on EUR/USD is 0.0001, so 1.1030 - 1.1000 = 0.0030 = 30 pips.
- B. 3 pips  
  _Rationale:_ That would be a 0.0003 move; the change here is ten times larger.
- C. 300 pips  
  _Rationale:_ 300 pips would be a 0.0300 move.
- D. 0.3 pips  
  _Rationale:_ A pip is the fourth decimal; this is 30 of them.

**MST-1939-Q0002** (multiple-answer, Select TWO) Which TWO statements about leverage in FX are accurate? (Select TWO.)

- A. Higher leverage increases both potential gains and potential losses on the same price move **(key)**  
  _Rationale:_ Correct: leverage amplifies the effect of a move in both directions.
- B. Leverage lets a trader control a larger position with less margin **(key)**  
  _Rationale:_ Correct: that is the mechanical definition of leverage.
- C. Higher leverage reduces the risk of a position  
  _Rationale:_ Leverage does not reduce risk; it magnifies outcomes.
- D. Leverage guarantees a profit if the trade direction is correct  
  _Rationale:_ No position is guaranteed; leverage only scales the result.

**MST-1939-Q0003** (single-answer, Select ONE) A trader wants to buy only if price falls to a specific better level and not pay the current market price. Which order type fits?

- A. A buy limit order placed below the current price **(key)**  
  _Rationale:_ Correct: a buy limit executes at the specified price or better, below the market.
- B. A market order  
  _Rationale:_ A market order fills immediately at the current price, not a better one.
- C. A buy stop order above the current price  
  _Rationale:_ A buy stop triggers above the market, used for breakouts, not better entries.
- D. A trailing stop  
  _Rationale:_ A trailing stop manages an exit, not a better entry.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
