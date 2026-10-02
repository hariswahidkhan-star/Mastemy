# AI in Energy and Utilities

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1399` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify AI use cases across energy and utilities
2. Apply AI to demand forecasting and grid optimisation
3. Interpret AI outputs for reliability and safety
4. Recognise data, security and regulatory constraints
5. Judge risk and oversight needs in critical infrastructure

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI across energy and utilities (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI use cases across the value chain; (2) Identify a use case with the highest value
- Common misconception addressed: Assuming AI can run critical infrastructure unsupervised
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI adds value | 39 | 6 |
| M01L02 | Limits in a safety-critical sector | 39 | 6 |

### M02 Forecasting and optimisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interrogate assumptions in a demand forecast; (2) Judge an optimisation recommendation
- Common misconception addressed: Trusting a forecast without checking its assumptions
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Demand and generation forecasting | 39 | 6 |
| M02L02 | Grid and asset optimisation | 39 | 6 |

### M03 Reliability and safety (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assess a predictive-maintenance alert; (2) Define a fail-safe for an AI control suggestion
- Common misconception addressed: Removing human oversight from safety-critical decisions
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Predictive maintenance | 38 | 6 |
| M03L02 | Safety and fail-safe design | 38 | 6 |

### M04 Data, security and regulation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a cybersecurity risk in an AI deployment; (2) Check a use case against a regulatory limit
- Common misconception addressed: Ignoring security exposure in connected AI systems
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Operational data and cybersecurity | 38 | 6 |
| M04L02 | Regulatory and grid-code constraints | 38 | 6 |

### M05 Risk, governance and rollout (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a model-risk concern in a use case; (2) Draft oversight requirements for a rollout
- Common misconception addressed: Scaling an AI pilot without governance in place
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Bias, reliability and model risk | 38 | 6 |
| M05L02 | Governance and responsible rollout | 38 | 6 |

## Integrative case

A utility wants to apply AI across generation, grid operations and customer service. Identify high-value use cases, judge forecasting and optimisation outputs, address safety and reliability, and plan a responsible, well-governed rollout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1399-final-protected | 25 | 25 | yes |
| MST-1399-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI across energy and utilities | 5 |
| Forecasting and optimisation | 5 |
| Reliability and safety | 5 |
| Data, security and regulation | 5 |
| Risk, governance and rollout | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1399-Q0001** (single-answer, Select ONE) An AI system recommends a grid control action during peak demand. What is the safest approach?

- A. Keep human oversight and fail-safes before acting on the recommendation **(key)**  
  _Rationale:_ Correct: safety-critical actions need human oversight and fail-safes.
- B. Automate the action with no review  
  _Rationale:_ Unsupervised control of critical systems is unsafe.
- C. Assume the AI cannot be wrong under load  
  _Rationale:_ Models can fail, especially under unusual conditions.
- D. Ignore the recommendation entirely  
  _Rationale:_ AI can add value when used with oversight.

**MST-1399-Q0002** (multiple-answer, Select TWO) Which TWO factors are especially important when deploying AI in critical infrastructure? (Select TWO.)

- A. Robust governance and human oversight **(key)**  
  _Rationale:_ Correct: oversight manages model and safety risk.
- B. Cybersecurity of connected operational systems **(key)**  
  _Rationale:_ Correct: connected AI expands the attack surface.
- C. Removing all human monitoring to cut costs  
  _Rationale:_ Removing oversight raises safety risk.
- D. Scaling before any pilot evaluation  
  _Rationale:_ Unevaluated scaling is reckless in critical systems.

**MST-1399-Q0003** (single-answer, Select ONE) Why must demand-forecast assumptions be examined before acting on them?

- A. Forecasts can rest on flawed assumptions that lead to poor decisions **(key)**  
  _Rationale:_ Correct: unchecked assumptions can make a forecast misleading.
- B. Forecasts are always exact  
  _Rationale:_ Forecasts carry uncertainty and assumptions.
- C. Assumptions never affect the result  
  _Rationale:_ Assumptions strongly shape forecast outputs.
- D. Only the vendor needs to understand the forecast  
  _Rationale:_ Operators must understand forecasts they rely on.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
