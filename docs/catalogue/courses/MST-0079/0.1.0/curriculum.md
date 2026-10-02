# SOA Exam FM: Financial Mathematics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0079` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | SOA (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: Exam FM (assumed designation) (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official SOA exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | none |
| Planned time | T = 12000 min; instruction I = 9600 min (80%); assessment A = 2400 min (20%) |
| Assessment split | lesson checks 600 / module checks 840 / cumulative 960 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply time value of money to cash flows, annuities and loans
2. Value bonds and general cash-flow portfolios
3. Apply duration, immunisation and interest-rate instruments

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Time Value of Money (design assumption - weight not verified)

- Worked applications: (1) Convert between effective, nominal and force-of-interest rates; (2) Solve an equation of value for an unknown payment
- Common misconception addressed: Adding nominal rates of different compounding frequencies directly
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Interest measurement and accumulation | 800 | 6 |
| M01L02 | Discounting, force of interest and equations of value | 800 | 6 |

### M02 Annuities (design assumption - weight not verified)

- Worked applications: (1) Price an increasing annuity-immediate; (2) Find the level payment that funds a target accumulation
- Common misconception addressed: Confusing annuity-due and annuity-immediate timing
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Level annuities immediate and due | 800 | 6 |
| M02L02 | Varying annuities and perpetuities | 800 | 6 |

### M03 Loans (design assumption - weight not verified)

- Worked applications: (1) Build an amortisation schedule and split a payment into interest and principal; (2) Compare amortisation vs sinking-fund repayment cost
- Common misconception addressed: Assuming the interest portion of a level payment is constant
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Amortisation and the outstanding balance | 800 | 6 |
| M03L02 | Sinking funds and loan comparisons | 800 | 6 |

### M04 Bonds (design assumption - weight not verified)

- Worked applications: (1) Price a bond at a given yield and identify premium or discount; (2) Compute the worst-case yield for a callable bond
- Common misconception addressed: Confusing coupon rate with yield to maturity
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bond pricing and premium/discount | 800 | 6 |
| M04L02 | Callable bonds and yield measures | 800 | 6 |

### M05 General Cash Flows and Portfolios (design assumption - weight not verified)

- Worked applications: (1) Rank two projects by NPV and IRR and reconcile a conflict; (2) Compute a dollar-weighted vs time-weighted return
- Common misconception addressed: Treating IRR as always consistent with NPV ranking
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Yield rates, NPV and IRR | 800 | 6 |
| M05L02 | Reinvestment and portfolio yield methods | 800 | 6 |

### M06 Immunisation and Interest-Rate Risk (design assumption - weight not verified)

- Worked applications: (1) Match asset and liability duration for a single-period immunisation; (2) Test a Redington condition against a small rate shift
- Common misconception addressed: Assuming duration matching alone fully immunises a portfolio
- Module check: 140 items / 140 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Duration and convexity | 800 | 6 |
| M06L02 | Redington immunisation and swaps | 800 | 6 |

## Integrative case

An actuary structures a bond portfolio to fund a schedule of future liabilities; the candidate prices the assets, matches duration, and tests the match against a rate shift.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0079-practice-form-A | 360 | 360 | yes |
| MST-0079-practice-form-B | 360 | 360 | no (optional practice) |
| MST-0079-practice-form-C | 360 | 360 | no (optional practice) |
| MST-0079-final-protected | 360 | 360 | yes |

| Domain | Items (practice form A) |
|---|---|
| Time Value of Money | 60 |
| Annuities | 60 |
| Loans | 60 |
| Bonds | 60 |
| General Cash Flows and Portfolios | 60 |
| Immunisation and Interest-Rate Risk | 60 |

Minimum reviewed item bank: 3264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0079-Q0001** (single-answer, Select ONE) A deposit grows at a nominal annual rate of 8% compounded quarterly. What is the effective annual rate (to the nearest 0.01%)?

- A. 8.00%  
  _Rationale:_ 8% is the nominal rate, not the effective rate under quarterly compounding.
- B. 8.24% **(key)**  
  _Rationale:_ Correct: (1+0.08/4)^4 - 1 = 0.0824.
- C. 8.16%  
  _Rationale:_ This corresponds to semi-annual, not quarterly, compounding.
- D. 8.33%  
  _Rationale:_ This is not produced by (1+0.02)^4.

**MST-0079-Q0002** (single-answer, Select ONE) For a bond priced above par, which relationship holds?

- A. The coupon rate exceeds the yield to maturity **(key)**  
  _Rationale:_ Correct: a premium bond has a coupon above its yield.
- B. The coupon rate equals the yield to maturity  
  _Rationale:_ That gives a price at par.
- C. The coupon rate is below the yield to maturity  
  _Rationale:_ That gives a discount bond.
- D. The bond must be callable  
  _Rationale:_ Premium pricing does not require a call feature.

**MST-0079-Q0003** (multiple-answer, Select TWO) Select TWO conditions required for Redington immunisation of a liability at a given interest rate.

- A. Present value of assets equals present value of liabilities **(key)**  
  _Rationale:_ Correct: PV matching is the first Redington condition.
- B. Asset duration is much larger than liability duration  
  _Rationale:_ Durations must be equal, not larger.
- C. Asset convexity exceeds liability convexity **(key)**  
  _Rationale:_ Correct: greater asset convexity is the third Redington condition.
- D. The portfolio holds only zero-coupon bonds  
  _Rationale:_ Redington does not require zero-coupon bonds.
- E. Yields must be expected to fall  
  _Rationale:_ Immunisation guards against small shifts in either direction.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
