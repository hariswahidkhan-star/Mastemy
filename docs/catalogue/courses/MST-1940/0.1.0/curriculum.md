# Stock Trading Foundations: Shares, Exchanges and Order Flow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1940` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Stock Trading Foundations: Shares, Exchanges and Order Flow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how shares, exchanges and market makers fit together
2. Describe the structure of the trading day, including auctions and halts
3. Choose appropriate equity order types and read market depth
4. Compare account types and account for the true cost of trading
5. Build and screen a watchlist of candidate stocks
6. Record and review equity trades against a simple plan

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How equity markets work (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain how a market maker profits from the bid-ask spread on a liquid stock; (2) Trace what happens to a resting order during a trading halt
- Common misconception addressed: Believing every order fills instantly at the last printed price
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shares, exchanges and the role of market makers | 120 | 7 |
| M01L02 | The trading day: opening and closing auctions and halts | 120 | 7 |

### M02 Placing equity orders (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose between a limit and a market order for a thinly traded stock; (2) Read a level-2 book and identify where liquidity sits
- Common misconception addressed: Assuming a tight spread always means a deep, liquid market
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Order types and routing for stocks | 120 | 7 |
| M02L02 | Bid-ask spread, liquidity and market depth | 120 | 7 |

### M03 Accounts, settlement and costs (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute the all-in cost of a round-trip trade including fees; (2) Distinguish a cash-account settlement violation from normal trading
- Common misconception addressed: Thinking margin is free money rather than a loan with risk
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cash vs margin accounts and settlement cycles | 120 | 7 |
| M03L02 | Commissions, fees and the true cost of a trade | 120 | 7 |

### M04 From idea to execution (25% (Mastemy design weight), design weight)

- Worked applications: (1) Screen for stocks meeting two simple liquidity and price criteria; (2) Review a journaled losing trade for a rule that was broken
- Common misconception addressed: Adding a stock to a watchlist with no entry or exit idea
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building and screening a watchlist | 120 | 7 |
| M04L02 | Recording and reviewing equity trades | 120 | 7 |

## Integrative case

A learner opens a first brokerage account and wants to trade large-cap shares: choose an account type, build a short watchlist with screening rules, place orders using the right order types, account for every cost, and journal the first trades.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1940-final-protected | 40 | 40 | yes |
| MST-1940-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How equity markets work | 10 |
| Placing equity orders | 10 |
| Accounts, settlement and costs | 10 |
| From idea to execution | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1940-Q0001** (single-answer, Select ONE) Why does a market order for an illiquid stock carry more risk than one for a highly liquid stock?

- A. A wide spread and thin depth can fill the order far from the last price **(key)**  
  _Rationale:_ Correct: low liquidity means the market order can walk the book and fill at a poor price.
- B. Market orders are not allowed on illiquid stocks  
  _Rationale:_ Market orders are generally allowed; the risk is poor execution, not prohibition.
- C. Illiquid stocks never move in price  
  _Rationale:_ Illiquid stocks can move sharply, which is part of the risk.
- D. Commissions are always higher on illiquid stocks  
  _Rationale:_ Commissions are set by the broker, not by liquidity.

**MST-1940-Q0002** (multiple-answer, Select TWO) Which TWO are genuine costs of trading a stock that a learner should account for? (Select TWO.)

- A. The bid-ask spread paid on entry and exit **(key)**  
  _Rationale:_ Correct: crossing the spread is a real, recurring cost.
- B. Commissions or transaction fees charged by the broker **(key)**  
  _Rationale:_ Correct: explicit fees reduce net returns.
- C. The ticker symbol of the stock  
  _Rationale:_ A ticker is an identifier, not a cost.
- D. The number of shares outstanding  
  _Rationale:_ Shares outstanding is a company metric, not a trading cost.

**MST-1940-Q0003** (single-answer, Select ONE) In a standard cash account, a trader sells shares and immediately uses the unsettled proceeds to buy again, then sells once more before settlement. What is the risk?

- A. A good-faith or free-riding violation for trading on unsettled funds **(key)**  
  _Rationale:_ Correct: cash accounts require settled funds, and reusing unsettled proceeds can trigger a violation.
- B. Nothing; cash accounts settle instantly  
  _Rationale:_ Cash trades settle after a defined cycle, not instantly.
- C. An automatic margin call  
  _Rationale:_ Cash accounts do not borrow, so there is no margin call.
- D. A guaranteed loss on the trade  
  _Rationale:_ The issue is a settlement rule, not an automatic loss.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
