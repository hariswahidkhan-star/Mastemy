# Inventory Planning and Demand Forecasting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1164` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-ENG-SK-IM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain inventory roles, costs and service-level trade-offs
2. Produce and evaluate demand forecasts using common quantitative methods
3. Calculate safety stock and reorder points under demand and lead-time variability
4. Apply inventory policies and ABC/XYZ segmentation to a product range
5. Measure inventory performance and diagnose excess and stockout causes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the tools and workflows taught, the quality of live outputs, and professional judgement on the job are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 Inventory fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify holding, ordering and shortage costs from a case; (2) Explain the service-vs-cost trade-off to a sales manager
- Common misconception addressed: Assuming more inventory always means better service at no cost
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inventory roles and cost structure | 96 | 8 |
| M01L02 | Service level and the cost of stockouts | 96 | 8 |
### M02 Demand forecasting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Forecast three periods with exponential smoothing; (2) Compute and interpret MAPE for a sample forecast
- Common misconception addressed: Judging a forecast by one lucky period instead of error over time
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Moving average and exponential smoothing | 96 | 8 |
| M02L02 | Trend, seasonality and forecast error | 96 | 8 |
### M03 Safety stock and reorder points (MASTEMY-DESIGN 20%)

- Worked applications: (1) Calculate safety stock for a given service level; (2) Set a reorder point from demand and lead-time data
- Common misconception addressed: Treating safety stock as a fixed buffer unrelated to variability
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variability, lead time and safety stock | 96 | 8 |
| M03L02 | Reorder point and order-up-to levels | 96 | 8 |
### M04 Inventory policies and segmentation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose between continuous and periodic review for an item; (2) Segment a range by value and variability and assign policies
- Common misconception addressed: Applying one replenishment policy to every SKU regardless of profile
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Order quantity and review policies | 96 | 8 |
| M04L02 | ABC and XYZ segmentation | 96 | 8 |
### M05 Inventory performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute inventory turns and days of cover; (2) Diagnose the root cause of a recurring stockout
- Common misconception addressed: Reading high turns as always good without checking stockouts
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Turns, coverage and fill rate | 96 | 8 |
| M05L02 | Diagnosing excess and stockouts | 96 | 8 |

## Integrative case

A planner at a distributor must set replenishment policy for a 200-SKU range: forecast demand for key items, segment the range, set safety stock and reorder points for a target service level, and explain to management the trade-off between service and working capital.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1164-final-protected | 25 | 25 | yes |
| MST-1164-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Inventory fundamentals | 5 |
| Demand forecasting | 5 |
| Safety stock and reorder points | 5 |
| Inventory policies and segmentation | 5 |
| Inventory performance | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1164-Q0001** (single-answer, Select ONE) Demand variability doubles while the target service level and lead time stay the same. What happens to required safety stock?

- A. It increases, because safety stock scales with demand variability **(key)**  
  _Rationale:_ Correct: higher demand standard deviation requires more safety stock for the same service level.
- B. It falls, because variability reduces the need for buffer  
  _Rationale:_ Greater variability increases, not reduces, the buffer needed.
- C. It stays the same, because only lead time matters  
  _Rationale:_ Both demand variability and lead time drive safety stock.
- D. It drops to zero  
  _Rationale:_ Zero safety stock would collapse the service level under variability.

**MST-1164-Q0002** (multiple-answer, Select TWO) You are segmenting a range with ABC and XYZ. Which TWO statements correctly describe the axes? (Select TWO.)

- A. ABC ranks items by value or spend contribution **(key)**  
  _Rationale:_ Correct: ABC is a value/Pareto classification.
- B. XYZ classifies items by demand variability or predictability **(key)**  
  _Rationale:_ Correct: XYZ captures how steady or erratic demand is.
- C. ABC ranks items by demand variability  
  _Rationale:_ Variability is the XYZ axis, not ABC.
- D. XYZ ranks items by unit price only  
  _Rationale:_ XYZ is about variability, not price.

**MST-1164-Q0003** (single-answer, Select ONE) An item has very high inventory turns but also frequent stockouts. What is the most likely diagnosis?

- A. Safety stock or reorder point is set too low for the demand variability **(key)**  
  _Rationale:_ Correct: high turns with stockouts points to under-buffering, not healthy flow.
- B. The item is overstocked  
  _Rationale:_ Overstock would show low turns, not stockouts.
- C. Turns and stockouts are unrelated and need no action  
  _Rationale:_ The pattern is a clear signal to revisit the policy.
- D. The forecast is perfect  
  _Rationale:_ Recurring stockouts indicate the policy or forecast needs work.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
