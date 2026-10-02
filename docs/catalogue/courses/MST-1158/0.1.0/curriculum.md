# Reliability Engineering and Asset Lifecycle Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1158` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain core reliability concepts: failure, MTBF, availability and the bathtub curve
2. Interpret failure-rate and life data to characterise asset behaviour
3. Apply reliability-centred maintenance (RCM) logic to select maintenance strategies
4. Evaluate asset lifecycle cost and replace-versus-repair decisions
5. Use reliability metrics to prioritise improvement across an asset fleet

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Reliability fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three failures as infant-mortality, random or wear-out; (2) Compute availability from MTBF and MTTR for a pump
- Common misconception addressed: Assuming a constant failure rate applies across the whole asset life
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Failure, reliability and the bathtub curve | 96 | 8 |
| M01L02 | MTBF, MTTR and availability | 96 | 8 |

### M02 Life data and failure patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Infer the dominant failure mode from a Weibull shape parameter (beta); (2) Decide whether time-based replacement helps given a failure pattern
- Common misconception addressed: Believing all assets wear out and benefit from scheduled replacement
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Failure-rate curves and Weibull shape parameters | 96 | 8 |
| M02L02 | Reading reliability data and censored records | 96 | 8 |

### M03 Reliability-centred maintenance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply RCM decision logic to choose a strategy for a non-critical bearing; (2) Justify run-to-failure for a redundant, low-consequence asset
- Common misconception addressed: Defaulting to time-based PMs for every asset regardless of failure mode
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | RCM logic and consequence categories | 96 | 8 |
| M03L02 | Selecting predictive, preventive or run-to-failure tasks | 96 | 8 |

### M04 Asset lifecycle and cost (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a simple lifecycle-cost comparison of repair versus replace; (2) Identify the economic replacement point from rising maintenance cost
- Common misconception addressed: Judging assets on purchase price rather than total cost of ownership
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lifecycle cost and total cost of ownership | 96 | 8 |
| M04L02 | Repair, refurbish or replace decisions | 96 | 8 |

### M05 Fleet reliability improvement (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rank bad-actor assets using failure frequency and consequence; (2) Select the highest-value reliability improvement from a Pareto of losses
- Common misconception addressed: Chasing the most frequent failures instead of the most costly ones
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reliability metrics and bad-actor analysis | 96 | 8 |
| M05L02 | Prioritising improvement initiatives | 96 | 8 |

## Integrative case

A plant reliability engineer inherits a fleet of 40 pumps with rising maintenance spend. Characterise the failure patterns, apply RCM logic to reset maintenance strategies, run a repair-versus-replace case on the three worst assets, and present a prioritised improvement plan with the expected availability gain.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1158-final-protected | 25 | 25 | yes |
| MST-1158-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Reliability fundamentals | 5 |
| Life data and failure patterns | 5 |
| Reliability-centred maintenance | 5 |
| Asset lifecycle and cost | 5 |
| Fleet reliability improvement | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1158-Q0001** (single-answer, Select ONE) A pump has an MTBF of 950 hours and an MTTR of 50 hours. What is its approximate inherent availability?

- A. 0.95 **(key)**  
  _Rationale:_ Correct: availability = MTBF / (MTBF + MTTR) = 950 / 1000 = 0.95.
- B. 0.90  
  _Rationale:_ This under-states availability; the correct ratio is 950/1000.
- C. 0.05  
  _Rationale:_ This is the unavailability fraction, not availability.
- D. 1.00  
  _Rationale:_ Availability cannot be 1.0 when repair time is non-zero.

**MST-1158-Q0002** (multiple-answer, Select TWO) An asset shows a random (constant) failure rate and has a redundant standby. Which TWO maintenance choices are most defensible? (Select TWO.)

- A. Condition monitoring to detect the onset of failure **(key)**  
  _Rationale:_ Correct: for random failures, condition-based tasks can catch functional failures without assuming wear-out.
- B. Run-to-failure given the redundancy and low consequence **(key)**  
  _Rationale:_ Correct: with a standby and low consequence, letting it run to failure can be the lowest-cost valid strategy.
- C. Fixed-interval replacement to prevent wear-out  
  _Rationale:_ Scheduled replacement does not help a constant failure rate and wastes remaining life.
- D. Do nothing and remove it from the asset register  
  _Rationale:_ Removing it from the register loses visibility; it still needs a managed strategy.

**MST-1158-Q0003** (single-answer, Select ONE) A machine's annual maintenance cost has risen each year and now exceeds the annualised cost of a replacement. What does this indicate?

- A. The asset has likely passed its economic replacement point **(key)**  
  _Rationale:_ Correct: when rising upkeep exceeds the annualised cost of a new asset, replacement is economically justified.
- B. The asset should always be kept because it still runs  
  _Rationale:_ Still running is not the test; total cost over time is.
- C. Maintenance budgets should simply be increased  
  _Rationale:_ Increasing budget ignores the cheaper replacement option.
- D. The MTBF must have improved  
  _Rationale:_ Rising maintenance cost typically signals declining, not improving, reliability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
