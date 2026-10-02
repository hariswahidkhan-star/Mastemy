# Hyperparameter Tuning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1322` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Distinguish parameters from hyperparameters
2. Apply search strategies
3. Use validation discipline for tuning
4. Manage compute budget and early stopping
5. Avoid overfitting and report tuning honestly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Parameters vs hyperparameters (MASTEMY-DESIGN 20%)

- Worked applications: (1) Separate learned parameters from hyperparameters; (2) List key hyperparameters for a chosen model
- Common misconception addressed: Confusing model weights with hyperparameters
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What hyperparameters are | 96 | 8 |
| M01L02 | Examples across model families | 96 | 8 |

### M02 Search strategies (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare grid vs random search cost; (2) Explain why random search often wins in high dimensions
- Common misconception addressed: Assuming grid search is always the most efficient
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Grid and random search | 96 | 8 |
| M02L02 | Bayesian optimisation and Hyperband | 96 | 8 |

### M03 Validation for tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why tuning needs a separate validation set; (2) Design a nested CV for honest estimates
- Common misconception addressed: Reporting the tuning score as the final performance
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Nested cross-validation | 96 | 8 |
| M03L02 | Train/validation/test discipline | 96 | 8 |

### M04 Budget and early stopping (MASTEMY-DESIGN 20%)

- Worked applications: (1) Allocate a fixed trial budget; (2) Prune unpromising trials early
- Common misconception addressed: Running endless trials without a stopping rule
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Compute budgets and parallelism | 96 | 8 |
| M04L02 | Early stopping and pruning | 96 | 8 |

### M05 Pitfalls and reporting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot validation overfitting from many trials; (2) Record seeds and search space for reproducibility
- Common misconception addressed: Treating a lucky trial as a reliable result
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Overfitting the validation set | 96 | 8 |
| M05L02 | Reproducible tuning reports | 96 | 8 |

## Integrative case

A team must tune a gradient-boosting model under a fixed compute budget. Choose a search strategy, set up honest validation, apply early stopping, and report results reproducibly.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1322-final-protected | 25 | 25 | yes |
| MST-1322-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Parameters vs hyperparameters | 5 |
| Search strategies | 5 |
| Validation for tuning | 5 |
| Budget and early stopping | 5 |
| Pitfalls and reporting | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1322-Q0001** (single-answer, Select ONE) Why can random search outperform grid search in high-dimensional spaces?

- A. It samples more distinct values of each important hyperparameter for the same budget **(key)**  
  _Rationale:_ Correct: random search explores influential dimensions more efficiently.
- B. It guarantees the global optimum  
  _Rationale:_ Neither method guarantees the optimum.
- C. It needs no validation data  
  _Rationale:_ It still needs validation.
- D. It only works with one hyperparameter  
  _Rationale:_ It handles many dimensions.

**MST-1322-Q0002** (multiple-answer, Select TWO) Which TWO are hyperparameters rather than learned parameters? (Select TWO.)

- A. Learning rate **(key)**  
  _Rationale:_ Correct: set before training, not learned.
- B. Number of trees in a forest **(key)**  
  _Rationale:_ Correct: a configuration choice, not learned.
- C. The fitted regression coefficients  
  _Rationale:_ Those are learned from data.
- D. The learned neural network weights  
  _Rationale:_ Those are learned parameters.

**MST-1322-Q0003** (single-answer, Select ONE) Why should the final test set not be used during hyperparameter search?

- A. Using it to choose settings leaks it and overstates generalisation **(key)**  
  _Rationale:_ Correct: the test set must stay untouched for an honest estimate.
- B. Test sets cannot be measured  
  _Rationale:_ They can be measured, once.
- C. It would slow down training  
  _Rationale:_ Speed is not the reason.
- D. Search ignores all data  
  _Rationale:_ Search uses validation data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
