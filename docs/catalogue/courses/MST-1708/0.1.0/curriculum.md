# Derivatives Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1708` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-FIN-SK-DF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Derivatives Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. What derivatives are
2. Forwards and futures
3. Options basics
4. Option payoffs and strategies
5. Risk and misuse

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses conceptual knowledge through selection items; this is general financial education, not trading advice, and it does not assess execution of real derivative trades or margin management.

## Modules

### M01 What derivatives are (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify the underlying for a given contract; (2) Classify a trade as hedging vs speculation
- Common misconception addressed: Thinking derivatives are always high-risk gambling
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Definition and the underlying asset | 72 | 6 |
| M01L02 | Uses: hedging, speculation, arbitrage | 72 | 6 |

### M02 Forwards and futures (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draw the payoff of a long forward; (2) Explain the role of daily margin settlement
- Common misconception addressed: Confusing a customised forward with an exchange-traded future
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Forward contracts and their payoff | 72 | 6 |
| M02L02 | Futures, exchanges and margin | 72 | 6 |

### M03 Options basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide if an option is in or out of the money; (2) Separate the premium from the strike
- Common misconception addressed: Believing option buyers are obligated to exercise
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Calls and puts: rights vs obligations | 72 | 6 |
| M03L02 | Moneyness, premium and expiry | 72 | 6 |

### M04 Option payoffs and strategies (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute the breakeven of a long call; (2) Explain a protective put as insurance
- Common misconception addressed: Ignoring the premium when judging whether an option trade profited
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Long call / long put payoff diagrams | 72 | 6 |
| M04L02 | Simple protective and covered strategies | 72 | 6 |

### M05 Risk and misuse (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain how leverage magnifies gains and losses; (2) Identify a control that limits derivative misuse
- Common misconception addressed: Assuming a hedge can never create new risk
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Leverage and counterparty risk | 72 | 6 |
| M05L02 | Lessons from derivative losses and controls | 72 | 6 |

## Integrative case

A firm wants to protect against a rising input cost: compare using a futures contract versus buying a call option, work out each payoff and breakeven, weigh margin and counterparty risk, and recommend the approach that best caps downside without over-committing cash.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1708-final-protected | 25 | 25 | yes |
| MST-1708-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What derivatives are | 5 |
| Forwards and futures | 5 |
| Options basics | 5 |
| Option payoffs and strategies | 5 |
| Risk and misuse | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1708-Q0001** (single-answer, Select ONE) The buyer of a call option has:

- A. The right, but not the obligation, to buy the underlying at the strike **(key)**  
  _Rationale:_ Correct: a call grants a right to buy, not an obligation.
- B. An obligation to buy the underlying at expiry  
  _Rationale:_ Buyers hold a right; sellers may have obligations.
- C. The right to sell the underlying at the strike  
  _Rationale:_ That describes a put, not a call.
- D. A guaranteed profit if the price rises at all  
  _Rationale:_ The premium must be recovered before any profit.

**MST-1708-Q0002** (multiple-answer, Select ALL that apply) Which two statements about exchange-traded futures are correct? (Select TWO) (Select TWO)

- A. They are standardised contracts **(key)**  
  _Rationale:_ Correct: futures are standardised by the exchange.
- B. They are typically marked to market daily via margin **(key)**  
  _Rationale:_ Correct: daily settlement through margin is standard for futures.
- C. They are privately customised between two parties  
  _Rationale:_ That describes forwards, not futures.
- D. They carry no leverage  
  _Rationale:_ Futures are leveraged instruments.

**MST-1708-Q0003** (single-answer, Select ONE) A long call has a strike of 50 and cost a premium of 3. The underlying is at 52 at expiry. The holder's net result is:

- A. A loss of 1 per unit **(key)**  
  _Rationale:_ Correct: intrinsic value 2 minus premium 3 is a net loss of 1.
- B. A profit of 2 per unit  
  _Rationale:_ That ignores the 3 premium paid.
- C. Breakeven  
  _Rationale:_ Breakeven is at 53, not 52.
- D. A loss of the full 3 premium  
  _Rationale:_ The 2 of intrinsic value offsets part of the premium.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
