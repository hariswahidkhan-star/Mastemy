# Fixed Income Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1706` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-FIN-SK-FIF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Fixed Income Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Bond basics
2. Pricing and yield
3. Interest-rate risk
4. Credit and other risks
5. Markets and the yield curve

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; this is general financial education, not investment advice, and it does not assess suitability of any specific bond for an individual.

## Modules

### M01 Bond basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify the cash flows of a plain-vanilla bond; (2) Classify a bond by issuer and seniority
- Common misconception addressed: Thinking a bond's coupon rate equals its yield
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a bond is: issuer, coupon, maturity, par | 72 | 6 |
| M01L02 | Bond types: government, corporate, municipal | 72 | 6 |

### M02 Pricing and yield (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why price falls when market yields rise; (2) Rank three bonds by current yield
- Common misconception addressed: Believing bond prices and yields move in the same direction
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Price as present value of cash flows | 72 | 6 |
| M02L02 | Yield to maturity and the price-yield relationship | 72 | 6 |

### M03 Interest-rate risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Estimate price change from a duration and yield move; (2) Compare duration of two bonds by maturity
- Common misconception addressed: Assuming a long bond and a short bond react equally to rate moves
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Duration as interest-rate sensitivity | 72 | 6 |
| M03L02 | Convexity and reinvestment risk | 72 | 6 |

### M04 Credit and other risks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Order bonds by default risk using ratings; (2) Explain how a call feature hurts the holder
- Common misconception addressed: Treating a high coupon as proof the bond is safe
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Credit ratings and default risk | 72 | 6 |
| M04L02 | Liquidity, inflation and call risk | 72 | 6 |

### M05 Markets and the yield curve (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a normal vs inverted yield curve; (2) Explain a credit spread between two issuers
- Common misconception addressed: Reading an inverted curve as always meaning imminent recession with certainty
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The yield curve and what its shape signals | 72 | 6 |
| M05L02 | Primary vs secondary markets and spreads | 72 | 6 |

## Integrative case

Evaluate two corporate bonds for a conservative portfolio: compare their coupons, yields and durations, weigh their credit ratings and call features, interpret the current yield-curve shape, and recommend which better fits a short-horizon, capital-preservation goal.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1706-final-protected | 25 | 25 | yes |
| MST-1706-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Bond basics | 5 |
| Pricing and yield | 5 |
| Interest-rate risk | 5 |
| Credit and other risks | 5 |
| Markets and the yield curve | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1706-Q0001** (single-answer, Select ONE) Market interest rates rise after you buy a fixed-coupon bond. All else equal, the bond's market price will:

- A. Fall **(key)**  
  _Rationale:_ Correct: bond prices move inversely to market yields.
- B. Rise  
  _Rationale:_ Prices fall, not rise, when yields increase.
- C. Stay exactly at par  
  _Rationale:_ The price adjusts so its yield matches the market.
- D. Rise then return to par immediately  
  _Rationale:_ There is no such automatic snap-back; price simply falls.

**MST-1706-Q0002** (multiple-answer, Select ALL that apply) Which two features generally increase a bond's interest-rate sensitivity (duration)? (Select TWO) (Select TWO)

- A. A longer time to maturity **(key)**  
  _Rationale:_ Correct: longer maturity raises duration.
- B. A lower coupon rate **(key)**  
  _Rationale:_ Correct: a lower coupon raises duration.
- C. A higher coupon rate  
  _Rationale:_ Higher coupons reduce duration.
- D. A shorter time to maturity  
  _Rationale:_ Shorter maturity reduces duration.

**MST-1706-Q0003** (single-answer, Select ONE) A bond is callable by the issuer. This feature is generally a disadvantage to the holder because:

- A. The issuer tends to call it when rates fall, forcing reinvestment at lower yields **(key)**  
  _Rationale:_ Correct: calls happen in the holder's least favourable scenario.
- B. It raises the bond's credit rating automatically  
  _Rationale:_ A call feature does not improve credit quality.
- C. It guarantees a higher coupon for life  
  _Rationale:_ The call can end the coupon stream early.
- D. It removes all default risk  
  _Rationale:_ Call features do not eliminate default risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
