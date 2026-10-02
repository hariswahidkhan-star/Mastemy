# Supply Chain Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1627` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-SCA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the supply chain and the metrics that measure it
2. Forecast demand and quantify forecast error
3. Apply inventory models for stock and safety-stock decisions
4. Analyse logistics, network and supplier performance
5. Diagnose the bullwhip effect and other systemic issues

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Supply chain metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match five metrics to the stage they measure; (2) Compute fill rate from an orders table and interpret it
- Common misconception addressed: Optimising one stage's cost while worsening the whole chain
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The chain from supplier to customer | 96 | 8 |
| M01L02 | Service level, fill rate, lead time and cost metrics | 96 | 8 |

### M02 Demand forecasting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a forecasting approach for a seasonal product and justify it; (2) Compute MAPE and detect a persistent forecast bias
- Common misconception addressed: Judging a forecast only by average error and ignoring bias
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Forecasting methods and seasonality | 96 | 8 |
| M02L02 | Forecast error and bias (MAPE, bias) | 96 | 8 |

### M03 Inventory management (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute a reorder point from lead time and demand; (2) Set safety stock for a target service level and explain the cost trade-off
- Common misconception addressed: Setting safety stock from average demand only, ignoring variability
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reorder point, EOQ and safety stock | 96 | 8 |
| M03L02 | Service level vs holding cost trade-offs | 96 | 8 |

### M04 Logistics and suppliers (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare two shipping options on total landed cost; (2) Build a simple supplier scorecard and rank two vendors
- Common misconception addressed: Choosing a supplier on unit price alone, ignoring reliability and lead time
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Network, routing and transportation cost | 96 | 8 |
| M04L02 | Supplier scorecards and performance | 96 | 8 |

### M05 Systemic effects (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace how a demand spike amplifies upstream in a sample chain; (2) Propose two measures that dampen the bullwhip effect
- Common misconception addressed: Blaming suppliers for variability that the ordering policy amplifies
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The bullwhip effect and its causes | 96 | 8 |
| M05L02 | Risk, resilience and scenario analysis | 96 | 8 |

## Integrative case

A planner must reduce stockouts without ballooning inventory cost. Build a seasonal demand forecast and check its bias, set reorder points and safety stock for a target service level, compare two suppliers on total landed cost and reliability, and identify ordering-policy changes that reduce the bullwhip effect.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1627-final-protected | 25 | 25 | yes |
| MST-1627-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Supply chain metrics | 5 |
| Demand forecasting | 5 |
| Inventory management | 5 |
| Logistics and suppliers | 5 |
| Systemic effects | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1627-Q0001** (single-answer, Select ONE) Why is safety stock set from demand variability, not average demand alone?

- A. Safety stock buffers against variability in demand and lead time, which the average hides **(key)**  
  _Rationale:_ Correct: variability, not the mean, drives stockout risk.
- B. Average demand already includes all variability  
  _Rationale:_ The average by definition removes variability.
- C. Safety stock is unrelated to service level  
  _Rationale:_ Safety stock is set to hit a target service level.
- D. Variability never affects stockouts  
  _Rationale:_ Variability is the main driver of stockout risk.

**MST-1627-Q0002** (multiple-answer, Select TWO) Which TWO measures help dampen the bullwhip effect? (Select TWO.)

- A. Share real downstream demand data across the chain **(key)**  
  _Rationale:_ Correct: visibility reduces over-reaction to local signals.
- B. Reduce order batching and smooth ordering **(key)**  
  _Rationale:_ Correct: smaller, steadier orders cut amplification.
- C. Have each stage guess demand independently in isolation  
  _Rationale:_ Isolation amplifies, not dampens, the bullwhip effect.
- D. React to every short-term demand spike with a large reorder  
  _Rationale:_ Over-reaction is a primary cause of the bullwhip effect.

**MST-1627-Q0003** (single-answer, Select ONE) A forecast has low average absolute error but consistently under-predicts. What does this indicate?

- A. A systematic forecast bias that should be corrected **(key)**  
  _Rationale:_ Correct: consistent under-prediction is bias, distinct from error magnitude.
- B. The forecast is perfect  
  _Rationale:_ Persistent under-prediction means it is not unbiased.
- C. Bias is irrelevant if MAPE is low  
  _Rationale:_ Bias matters independently of average error.
- D. Nothing can be improved  
  _Rationale:_ Correcting the bias is a clear improvement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
