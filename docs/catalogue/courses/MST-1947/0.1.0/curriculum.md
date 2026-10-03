# Algorithmic and Quantitative Trading: An Introduction

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1947` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1440 min; instruction I = 1152 min (80%); assessment A = 288 min (20%) |
| Assessment split | lesson checks 72 / module checks 101 / cumulative 115 min |
| Certificate | Mastemy Certificate of Completion — Algorithmic and Quantitative Trading: An Introduction (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what systematic and algorithmic trading are and are not
2. Turn a discretionary rule into explicit, testable logic
3. Define signals, entries, exits and position rules for a strategy
4. Prepare data and avoid lookahead and survivorship bias
5. Run an honest backtest and interpret its metrics
6. Account for costs, slippage and monitoring before going live

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 From idea to algorithm (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rewrite a vague 'buy when it looks strong' rule as explicit conditions; (2) List three tasks better suited to a rule-based system than discretion
- Common misconception addressed: Believing automation removes the need to understand the strategy
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What algorithmic and systematic trading is | 144 | 9 |
| M01L02 | Turning a discretionary rule into code logic | 144 | 9 |

### M02 Building a strategy (25% (Mastemy design weight), design weight)

- Worked applications: (1) Specify entry, exit and sizing rules with no ambiguity; (2) Identify a lookahead bug where future data leaks into a signal
- Common misconception addressed: Using the closing price to trigger a trade at that same close
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Signals, entries, exits and position rules | 144 | 9 |
| M02L02 | Data, bars and avoiding lookahead bias | 144 | 9 |

### M03 Backtesting honestly (25% (Mastemy design weight), design weight)

- Worked applications: (1) Interpret a backtest's return, drawdown and trade count together; (2) Split data into in-sample and out-of-sample sets and compare
- Common misconception addressed: Judging a strategy only by its total backtested return
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Backtesting workflow and key metrics | 144 | 9 |
| M03L02 | Overfitting, curve-fitting and out-of-sample testing | 144 | 9 |

### M04 From backtest to execution (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add realistic commissions and slippage to a backtest and rerun; (2) Define a monitoring alert and a kill-switch condition for a live bot
- Common misconception addressed: Assuming live results will match a frictionless backtest
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Transaction costs, slippage and latency | 144 | 9 |
| M04L02 | Paper trading, monitoring and kill switches | 144 | 9 |

## Integrative case

A discretionary trader wants to systematise one setup: express it as explicit rules, assemble clean historical data without lookahead, backtest with costs and out-of-sample validation, and plan monitoring and a kill switch before any live deployment.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1947-final-protected | 40 | 40 | yes |
| MST-1947-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From idea to algorithm | 10 |
| Building a strategy | 10 |
| Backtesting honestly | 10 |
| From backtest to execution | 10 |

Minimum reviewed item bank: 424 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1947-Q0001** (single-answer, Select ONE) A backtest uses each bar's closing price to decide a trade and assumes the fill happens at that same close. Why is this a problem?

- A. It assumes information available only at the close can be acted on at the close, a form of lookahead bias **(key)**  
  _Rationale:_ Correct: deciding and filling on the same close is unrealistic and inflates results through lookahead.
- B. Closing prices are never recorded  
  _Rationale:_ Closing prices are recorded; the issue is acting on them simultaneously.
- C. It makes the backtest run too slowly  
  _Rationale:_ The problem is bias in results, not speed.
- D. Backtests cannot use daily bars at all  
  _Rationale:_ Daily bars are fine; the timing assumption is the flaw.

**MST-1947-Q0002** (multiple-answer, Select TWO) Which TWO practices make a backtest more honest? (Select TWO.)

- A. Including realistic commissions and slippage **(key)**  
  _Rationale:_ Correct: frictionless backtests overstate performance.
- B. Validating on out-of-sample data the rules were not tuned on **(key)**  
  _Rationale:_ Correct: out-of-sample testing checks for overfitting.
- C. Re-tuning parameters until the equity curve looks perfect  
  _Rationale:_ That is curve-fitting, which makes the backtest misleading.
- D. Removing all losing trades from the historical record  
  _Rationale:_ Deleting losses fabricates performance and destroys validity.

**MST-1947-Q0003** (single-answer, Select ONE) What is the main purpose of a kill switch in a live algorithmic system?

- A. To halt trading automatically when predefined risk or error conditions are met **(key)**  
  _Rationale:_ Correct: a kill switch stops the system when something goes wrong, limiting damage.
- B. To guarantee the strategy is always profitable  
  _Rationale:_ A kill switch limits losses; it cannot guarantee profit.
- C. To speed up order execution  
  _Rationale:_ Its purpose is safety, not latency reduction.
- D. To replace the need for backtesting  
  _Rationale:_ A kill switch is a live safeguard, not a substitute for testing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
