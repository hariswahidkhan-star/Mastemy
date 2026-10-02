# FRM Part II: Applied Financial Risk Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0057` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GARP (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: FRM Part II (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official GARP exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | MST-FIN-FRM-P2-001 |
| Planned time | T = 12000 min; instruction I = 9600 min (80%); assessment A = 2400 min (20%) |
| Assessment split | lesson checks 600 / module checks 840 / cumulative 960 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Measure and manage market, credit, operational and liquidity risk
2. Apply risk measurement to investment management decisions
3. Interpret current issues shaping financial risk practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Market Risk Measurement and Management (design assumption - weight not verified)

- Worked applications: (1) Backtest a one-day 99% VaR model against an exception series; (2) Compute expected shortfall from a loss distribution
- Common misconception addressed: Treating VaR as the maximum possible loss
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VaR, expected shortfall and backtesting | 739 | 6 |
| M01L02 | Volatility, correlation and parametric approaches | 739 | 6 |
| M01L03 | Fixed-income and option market risk | 739 | 6 |

### M02 Credit Risk Measurement and Management (design assumption - weight not verified)

- Worked applications: (1) Derive expected loss from PD, LGD and EAD; (2) Estimate CVA on an uncollateralised swap
- Common misconception addressed: Assuming default correlations are stable through a cycle
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Default probability, LGD and exposure | 739 | 6 |
| M02L02 | Counterparty credit risk and CVA | 739 | 6 |
| M02L03 | Credit portfolio models and securitisation | 739 | 6 |

### M03 Operational Risk and Resiliency (design assumption - weight not verified)

- Worked applications: (1) Build a loss-distribution approach from frequency and severity; (2) Score a model under a model-risk tiering scheme
- Common misconception addressed: Confusing operational risk capital with a reserve for known losses
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Operational risk frameworks and capital | 738 | 6 |
| M03L02 | Model risk, cyber and resilience | 738 | 6 |

### M04 Liquidity and Treasury Risk (design assumption - weight not verified)

- Worked applications: (1) Project a 30-day net cash outflow for an LCR calculation; (2) Test a funding plan under a deposit-runoff scenario
- Common misconception addressed: Treating market liquidity and funding liquidity as the same risk
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Funding and market liquidity | 738 | 6 |
| M04L02 | Liquidity stress testing and the LCR | 738 | 6 |

### M05 Risk and Investment Management (design assumption - weight not verified)

- Worked applications: (1) Attribute active return to factor and selection components; (2) Set a risk budget across three strategies
- Common misconception addressed: Assuming diversification removes systematic factor risk
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Portfolio risk and factor models | 738 | 6 |
| M05L02 | Risk budgeting and performance attribution | 738 | 6 |

### M06 Current Issues in Financial Markets (design assumption - weight not verified)

- Worked applications: (1) Summarise the risk-transmission channel in a recent market event; (2) Map a current-issues reading to an existing risk framework
- Common misconception addressed: Treating current-issues readings as optional background
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Recent readings on climate, AI and market structure | 738 | 6 |

## Integrative case

A bank's risk committee reviews a trading desk under stress: the candidate sizes market and counterparty exposure, tests a liquidity shortfall, and recommends limits and a reporting cadence.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0057-practice-form-A | 360 | 360 | yes |
| MST-0057-practice-form-B | 360 | 360 | no (optional practice) |
| MST-0057-practice-form-C | 360 | 360 | no (optional practice) |
| MST-0057-final-protected | 360 | 360 | yes |

| Domain | Items (practice form A) |
|---|---|
| Market Risk Measurement and Management | 60 |
| Credit Risk Measurement and Management | 60 |
| Operational Risk and Resiliency | 60 |
| Liquidity and Treasury Risk | 60 |
| Risk and Investment Management | 60 |
| Current Issues in Financial Markets | 60 |

Minimum reviewed item bank: 3276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0057-Q0001** (single-answer, Select ONE) A one-day 99% VaR model produces 12 exceptions in 250 trading days. What does this most likely indicate?

- A. The model is well calibrated  
  _Rationale:_ About 2-3 exceptions are expected at 99% over 250 days, not 12.
- B. The model understates risk and fails backtesting **(key)**  
  _Rationale:_ Correct: far more exceptions than expected signals the model underestimates risk.
- C. The model overstates risk  
  _Rationale:_ Too many exceptions means under-, not over-statement.
- D. Exceptions are irrelevant to VaR validation  
  _Rationale:_ Exception counts are the basis of VaR backtesting.

**MST-0057-Q0002** (single-answer, Select ONE) Expected loss on a loan is best expressed as:

- A. PD x LGD x EAD **(key)**  
  _Rationale:_ Correct: expected loss is probability of default times loss given default times exposure at default.
- B. PD + LGD + EAD  
  _Rationale:_ The components are multiplied, not added.
- C. EAD divided by PD  
  _Rationale:_ This is not the expected-loss relationship.
- D. LGD minus recovery rate  
  _Rationale:_ LGD already reflects the recovery rate.

**MST-0057-Q0003** (multiple-answer, Select TWO) Select TWO statements that correctly distinguish funding liquidity risk from market liquidity risk.

- A. Funding liquidity risk is the risk of being unable to meet cash obligations as they fall due **(key)**  
  _Rationale:_ Correct: funding liquidity concerns meeting obligations.
- B. Market liquidity risk never affects asset prices  
  _Rationale:_ Market liquidity risk directly affects the price at which assets can be sold.
- C. The two risks are identical in a stress event  
  _Rationale:_ They are distinct, though they can reinforce one another.
- D. Market liquidity risk is the risk of being unable to sell an asset without a large price concession **(key)**  
  _Rationale:_ Correct: that is the definition of market liquidity risk.
- E. Funding liquidity risk only applies to equities  
  _Rationale:_ Funding liquidity risk is not asset-class specific.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
