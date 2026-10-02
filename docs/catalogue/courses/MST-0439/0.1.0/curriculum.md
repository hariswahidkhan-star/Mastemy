# Machine-Learning Experiment Design and Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0439` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design valid train/validation/test splits
2. Apply cross-validation correctly for the data type
3. Detect and prevent data leakage
4. Choose metrics and baselines deliberately
5. Track experiments reproducibly
6. Interpret results with uncertainty

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Experiment design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a split for a time-ordered dataset; (2) Set a sensible baseline for a task
- Common misconception addressed: Having no baseline to compare against
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Splitting strategy and baselines | 144 | 8 |
| M01L02 | Objectives and success criteria | 144 | 8 |

### M02 Cross-validation done right (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick a CV scheme for grouped data; (2) Set up time-series cross-validation
- Common misconception addressed: Shuffling time-ordered data into random folds
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | k-fold and stratification | 144 | 8 |
| M02L02 | Grouped and time-series CV | 144 | 8 |

### M03 Leakage and pitfalls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Find leakage in a described pipeline; (2) Move preprocessing inside the CV loop
- Common misconception addressed: Scaling before splitting
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sources of leakage | 144 | 8 |
| M03L02 | Preprocessing inside the fold | 144 | 8 |

### M04 Metrics and uncertainty (MASTEMY-DESIGN 20%)

- Worked applications: (1) Report a metric with a confidence interval; (2) Decide if a difference is meaningful
- Common misconception addressed: Reporting a single number with no uncertainty
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Choosing metrics | 144 | 8 |
| M04L02 | Confidence and significance of results | 144 | 8 |

### M05 Reproducible tracking (MASTEMY-DESIGN 20%)

- Worked applications: (1) Make an experiment reproducible end to end; (2) Log runs so results can be compared
- Common misconception addressed: Not recording the exact data and code version
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Seeds, versions and logging | 144 | 8 |
| M05L02 | Experiment tracking workflow | 144 | 8 |

## Integrative case

A team's reported model accuracy does not hold up in production. Audit their experiment design, find the validation flaws (leakage, improper splits, unlogged runs), and redesign a trustworthy evaluation protocol with correct splitting, metrics, and reproducible tracking.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0439-final-protected | 25 | 25 | yes |
| MST-0439-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Experiment design | 5 |
| Cross-validation done right | 5 |
| Leakage and pitfalls | 5 |
| Metrics and uncertainty | 5 |
| Reproducible tracking | 5 |

Minimum reviewed item bank: 462 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0439-Q0001** (single-answer, Select ONE) For time-ordered data, why is a random shuffle into k folds invalid?

- A. It lets the model train on future data to predict the past **(key)**  
  _Rationale:_ Correct: temporal leakage inflates the estimate.
- B. Random folds always reduce accuracy  
  _Rationale:_ They inflate, not reduce, the reported accuracy.
- C. k-fold cannot be used on any data  
  _Rationale:_ k-fold is fine for non-temporal data.
- D. Shuffling changes the labels  
  _Rationale:_ Shuffling reorders rows, not labels.

**MST-0439-Q0002** (multiple-answer, Select TWO) Which TWO steps make an experiment reproducible? (Select TWO.)

- A. Fixing random seeds and recording them **(key)**  
  _Rationale:_ Correct: seeds make stochastic steps repeatable.
- B. Logging the exact data and code version used **(key)**  
  _Rationale:_ Correct: version pinning lets a run be recreated.
- C. Reporting only the best run and discarding the rest  
  _Rationale:_ Cherry-picking hides variability and harms reproducibility.
- D. Changing hyperparameters between runs without recording them  
  _Rationale:_ Unlogged changes cannot be reproduced.

**MST-0439-Q0003** (single-answer, Select ONE) Why report a metric with a confidence interval rather than a single number?

- A. It communicates the uncertainty around the estimate **(key)**  
  _Rationale:_ Correct: a point estimate hides run-to-run variability.
- B. It increases the model's accuracy  
  _Rationale:_ An interval does not change accuracy.
- C. It is required to train the model  
  _Rationale:_ It is a reporting practice, not a training step.
- D. It replaces the need for a test set  
  _Rationale:_ It does not remove the need for held-out evaluation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
