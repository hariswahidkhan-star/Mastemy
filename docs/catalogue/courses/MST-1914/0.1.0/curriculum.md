# Decentralised Finance (DeFi): Protocols, Liquidity and Risk

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1914` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1560 min; instruction I = 1248 min (80%); assessment A = 312 min (20%) |
| Assessment split | lesson checks 78 / module checks 109 / cumulative 125 min |
| Certificate | Mastemy Certificate of Completion — Decentralised Finance (DeFi): Protocols, Liquidity and Risk (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the building blocks of DeFi and how they compose
2. Describe automated market makers and liquidity provision
3. Reason about lending, borrowing, collateral and liquidation
4. Explain stablecoin designs and their failure modes
5. Identify DeFi-specific risks including oracle, impermanent-loss and smart-contract risk
6. Evaluate a DeFi protocol's risk profile before using it

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 DeFi building blocks (16% (design weight), design weight)

- Worked applications: (1) Trace a swap routed through two pools; (2) Decompose a yield strategy into primitives
- Common misconception addressed: Thinking high APY implies low risk
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Money legos and composability | 100 | 6 |
| M01L02 | On-chain vs off-chain components | 100 | 6 |

### M02 Automated market makers (18% (design weight), design weight)

- Worked applications: (1) Compute output for a constant-product swap; (2) Estimate impermanent loss for a price move
- Common misconception addressed: Confusing fees earned with net LP profit
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Constant-product pricing | 112 | 6 |
| M02L02 | Impermanent loss and LP returns | 112 | 6 |

### M03 Lending and borrowing (18% (design weight), design weight)

- Worked applications: (1) Open an over-collateralised loan and track health; (2) Trigger and resolve a liquidation
- Common misconception addressed: Ignoring how a price drop forces liquidation
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Collateral, LTV and interest models | 112 | 6 |
| M03L02 | Liquidations and health factors | 112 | 6 |

### M04 Stablecoins (16% (design weight), design weight)

- Worked applications: (1) Compare a fiat-backed and a crypto-collateralised stablecoin; (2) Model a depeg under redemption pressure
- Common misconception addressed: Assuming all stablecoins are equally safe
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Collateralised and algorithmic designs | 100 | 6 |
| M04L02 | Depeg mechanics and failure modes | 100 | 6 |

### M05 Oracles and MEV (16% (design weight), design weight)

- Worked applications: (1) Show an oracle-manipulation attack on a thin pool; (2) Identify a sandwich attack in a transaction trace
- Common misconception addressed: Trusting a single spot price as an oracle
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Price oracles and manipulation | 100 | 6 |
| M05L02 | MEV, front-running and sandwiching | 100 | 6 |

### M06 Protocol risk assessment (16% (design weight), design weight)

- Worked applications: (1) Run a risk checklist on a sample protocol; (2) Find an admin key with upgrade power
- Common misconception addressed: Treating an audit as a guarantee of safety
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Audits, admin keys and governance | 100 | 6 |
| M06L02 | A risk checklist before depositing | 100 | 6 |

## Integrative case

A treasury team wants to earn yield on idle stablecoins across DeFi lending and liquidity pools; map the protocols and their composition, quantify impermanent-loss, liquidation and oracle risk, and produce a go/no-go risk memo.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1914-final-protected | 45 | 55 | yes |
| MST-1914-final-alternate | 45 | 55 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DeFi building blocks | 8 |
| Automated market makers | 8 |
| Lending and borrowing | 8 |
| Stablecoins | 7 |
| Oracles and MEV | 7 |
| Protocol risk assessment | 7 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1914-Q0001** (single-answer, Select ONE) A liquidity provider in a constant-product pool sees the two asset prices diverge sharply. What is impermanent loss?

- A. The value shortfall versus simply holding, caused by the pool rebalancing as prices move **(key)**  
  _Rationale:_ Correct: rebalancing against price moves underperforms holding.
- B. A fee charged by the protocol for withdrawing  
  _Rationale:_ It is not a withdrawal fee.
- C. The gas cost of providing liquidity  
  _Rationale:_ It is not gas cost.
- D. A permanent loss that can never reverse  
  _Rationale:_ It can shrink if prices return.

**MST-1914-Q0002** (multiple-answer, Select TWO) Which TWO risks are specific to using DeFi lending protocols? (Select TWO.)

- A. A sharp collateral price drop can trigger liquidation of the borrower's position **(key)**  
  _Rationale:_ Correct: liquidation risk is core to collateralised lending.
- B. A manipulated price oracle can cause unfair liquidations or bad debt **(key)**  
  _Rationale:_ Correct: oracle risk directly affects lending protocols.
- C. The borrower's bank can freeze the account  
  _Rationale:_ DeFi lending has no bank intermediary.
- D. Interest can only ever be paid in fiat  
  _Rationale:_ Interest accrues in on-chain assets.

**MST-1914-Q0003** (single-answer, Select ONE) Why is a single pool's spot price a dangerous oracle for a lending protocol?

- A. A large trade can move it momentarily, letting an attacker borrow against a fake price **(key)**  
  _Rationale:_ Correct: thin-pool spot prices are cheaply manipulated.
- B. Spot prices are illegal to read on-chain  
  _Rationale:_ They are readable; the issue is manipulability.
- C. Spot prices never change  
  _Rationale:_ They change constantly.
- D. Oracles are unnecessary in lending  
  _Rationale:_ Lending needs reliable prices.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
