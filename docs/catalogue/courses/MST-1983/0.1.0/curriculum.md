# Machine Learning for Biological Data

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1983` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Machine Learning for Biological Data (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame biological questions as machine-learning tasks with the right data
2. Apply preprocessing, normalisation and feature engineering to biological data
3. Train and tune classification and regression models
4. Evaluate models with metrics and validation appropriate for biology
5. Address class imbalance, batch effects and data leakage
6. Communicate machine-learning results and uncertainty honestly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Framing and data preparation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Turn a described study into a supervised-learning task; (2) Normalise a feature table with per-batch scaling
- Common misconception addressed: Jumping to a complex model before checking the data and the question
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From a biological question to a machine-learning task | 120 | 7 |
| M01L02 | Preprocessing, normalisation and feature engineering | 120 | 7 |

### M02 Modelling (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose a baseline model and justify it; (2) Tune a model with nested cross-validation
- Common misconception addressed: Tuning hyperparameters on the test set
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classification and regression for biological data | 120 | 7 |
| M02L02 | Model selection and hyperparameter tuning | 120 | 7 |

### M03 Evaluation for biology (25% (Mastemy design weight), design weight)

- Worked applications: (1) Pick metrics for an imbalanced classification problem; (2) Design a grouped cross-validation to prevent leakage
- Common misconception addressed: Reporting accuracy alone on a heavily imbalanced dataset
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metrics and cross-validation that respect biology | 120 | 7 |
| M03L02 | Class imbalance, batch effects and leakage | 120 | 7 |

### M04 Responsible practice (25% (Mastemy design weight), design weight)

- Worked applications: (1) Interpret a feature-importance plot cautiously; (2) Rewrite an overstated machine-learning claim with its uncertainty
- Common misconception addressed: Presenting a point estimate with no uncertainty or validation detail
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Interpretability and feature attribution | 120 | 7 |
| M04L02 | Communicating results, uncertainty and limits | 120 | 7 |

## Integrative case

A group has a small, imbalanced dataset of labelled biological samples collected in two batches: design the preprocessing, a leakage-safe validation and metrics so the reported performance is trustworthy, and communicate the uncertainty honestly.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1983-final-protected | 40 | 40 | yes |
| MST-1983-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framing and data preparation | 10 |
| Modelling | 10 |
| Evaluation for biology | 10 |
| Responsible practice | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1983-Q0001** (single-answer, Select ONE) On a dataset where 95 percent of samples are class A, a model predicts class A every time. Why is 95 percent accuracy misleading?

- A. It ignores performance on the rare class, which may be the one of interest **(key)**  
  _Rationale:_ Correct: accuracy hides complete failure on the minority class.
- B. Accuracy cannot be computed for biological data  
  _Rationale:_ Accuracy is computable; it is just a poor summary here.
- C. 95 percent is actually a poor accuracy  
  _Rationale:_ The problem is the choice of metric, not the number.
- D. The model must be overfitting the minority class  
  _Rationale:_ It never predicts the minority class at all.

**MST-1983-Q0002** (multiple-answer, Select TWO) Which TWO practices help prevent data leakage in a biological machine-learning study? (Select TWO.)

- A. Fitting preprocessing such as scaling only on the training fold **(key)**  
  _Rationale:_ Correct: fitting on the training fold avoids peeking at test data.
- B. Grouping related samples so they stay within one fold **(key)**  
  _Rationale:_ Correct: grouped splits stop correlated samples leaking across folds.
- C. Choosing hyperparameters using the test set  
  _Rationale:_ That leaks test information into the model.
- D. Reporting the best of many test runs  
  _Rationale:_ Cherry-picking runs inflates reported performance.

**MST-1983-Q0003** (single-answer, Select ONE) Samples come from distinct donors. Which validation choice best estimates real-world performance?

- A. Grouped cross-validation that keeps each donor within one fold **(key)**  
  _Rationale:_ Correct: donor-grouped folds stop the model memorising a donor.
- B. A random split that ignores donor identity  
  _Rationale:_ That leaks donor-specific signal across folds.
- C. Testing on the training set  
  _Rationale:_ That massively overestimates performance.
- D. No validation at all  
  _Rationale:_ Validation is required for an honest estimate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
