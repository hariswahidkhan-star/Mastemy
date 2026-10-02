# Causal Inference and Impact Evaluation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0978` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Causal Inference and Impact Evaluation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Causal thinking
2. Randomized experiments
3. Regression and matching
4. Quasi-experimental designs
5. Observational pitfalls
6. Impact evaluation practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Causal thinking (MASTEMY-DESIGN 17%)

- Worked applications: (1) Identify a likely confounder in an observed relationship; (2) Write a potential-outcomes statement for a treatment
- Common misconception addressed: Reading a correlation in observational data as a causal effect
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Correlation versus causation | 80 | 6 |
| M01L02 | The potential outcomes framework | 80 | 6 |
| M01L03 | Confounding and bias | 80 | 6 |

### M02 Randomized experiments (MASTEMY-DESIGN 17%)

- Worked applications: (1) Estimate an ATE from a randomized experiment; (2) Spot attrition that threatens validity
- Common misconception addressed: Assuming randomization fixes problems after non-random dropout
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Randomized controlled trials | 80 | 6 |
| M02L02 | Average treatment effects (ATE/ATT) | 80 | 6 |
| M02L03 | Threats to validity | 80 | 6 |

### M03 Regression and matching (MASTEMY-DESIGN 17%)

- Worked applications: (1) Adjust an estimate for a measured confounder; (2) Match treated and control on propensity scores
- Common misconception addressed: Believing regression controls for unmeasured confounders
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Regression adjustment for covariates | 80 | 6 |
| M03L02 | Propensity score matching | 80 | 6 |
| M03L03 | Checking covariate balance | 80 | 6 |

### M04 Quasi-experimental designs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set up a difference-in-differences comparison; (2) Identify a valid instrument's conditions
- Common misconception addressed: Using difference-in-differences when parallel trends clearly fail
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Difference-in-differences | 80 | 6 |
| M04L02 | Instrumental variables | 80 | 6 |
| M04L03 | Regression discontinuity | 80 | 6 |

### M05 Observational pitfalls (MASTEMY-DESIGN 16%)

- Worked applications: (1) Diagnose selection bias in a sample; (2) Avoid conditioning on a collider
- Common misconception addressed: Controlling for a variable on the causal path and blocking the effect
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Selection bias | 80 | 6 |
| M05L02 | Collider and mediator bias | 80 | 6 |
| M05L03 | Sensitivity analysis | 80 | 6 |

### M06 Impact evaluation practice (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose a design for evaluating a program; (2) Estimate and caveat a program's impact
- Common misconception addressed: Overstating causal certainty from a single observational study
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Designing an evaluation | 80 | 6 |
| M06L02 | Estimating program impact | 80 | 6 |
| M06L03 | Reporting causal claims responsibly | 80 | 6 |

## Integrative case

Evaluate the impact of a customer-retention program: choose an identification strategy, estimate the treatment effect with an appropriate method, check assumptions, and report the causal claim with its limitations.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0978-final-protected | 30 | 30 | yes |
| MST-0978-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Causal thinking | 5 |
| Randomized experiments | 5 |
| Regression and matching | 5 |
| Quasi-experimental designs | 5 |
| Observational pitfalls | 5 |
| Impact evaluation practice | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0978-Q0001** (single-answer, Select ONE) A policy was introduced in some regions but not others at the same time. Comparing before-and-after changes across the two groups uses which design?

- A. Difference-in-differences **(key)**  
  _Rationale:_ Correct: difference-in-differences compares the change over time between treated and untreated groups.
- B. A simple correlation  
  _Rationale:_ A simple correlation does not isolate the policy's effect.
- C. Random sampling  
  _Rationale:_ Random sampling concerns who is surveyed, not identification.
- D. A single pre/post comparison in one group  
  _Rationale:_ A single-group pre/post comparison cannot separate the policy from other time trends.

**MST-0978-Q0002** (single-answer, Select ONE) Why can regression adjustment still give a biased causal estimate even with many controls?

- A. It cannot adjust for confounders that were not measured **(key)**  
  _Rationale:_ Correct: regression can only adjust for observed covariates, leaving unmeasured confounding.
- B. It always overfits  
  _Rationale:_ Overfitting is a separate concern and not the core issue here.
- C. It requires randomization to run  
  _Rationale:_ Regression does not require randomization to run.
- D. It only works on time series  
  _Rationale:_ Regression is not limited to time series.

**MST-0978-Q0003** (multiple-answer, Select TWO) Which TWO are conditions for a valid instrumental variable? (Select TWO)

- A. It is associated with the treatment (relevance) **(key)**  
  _Rationale:_ Correct: relevance requires the instrument to influence the treatment.
- B. It affects the outcome only through the treatment (exclusion) **(key)**  
  _Rationale:_ Correct: the exclusion restriction requires the instrument to affect the outcome only via the treatment.
- C. It must be the outcome itself  
  _Rationale:_ An instrument is distinct from the outcome.
- D. It must be randomly measured error  
  _Rationale:_ An instrument is a variable with specific properties, not measurement error.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
