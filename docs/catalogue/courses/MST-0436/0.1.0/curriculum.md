# Supervised Learning: Regression and Classification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0436` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-SLC-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame problems as regression or classification
2. Train and interpret linear and logistic models
3. Apply tree-based and ensemble methods
4. Choose metrics appropriate to the task and costs
5. Diagnose underfitting, overfitting and the bias-variance trade-off
6. Tune and compare models fairly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Supervised learning basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Frame three business tasks as regression or classification; (2) Diagnose over- vs underfitting from learning curves
- Common misconception addressed: Tuning on the test set
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Problem framing and data splits | 168 | 8 |
| M01L02 | The bias-variance trade-off | 168 | 8 |

### M02 Linear and logistic models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Fit and interpret a linear regression; (2) Read coefficients of a logistic model
- Common misconception addressed: Interpreting logistic coefficients as linear probabilities
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Linear regression | 168 | 8 |
| M02L02 | Logistic regression and decision boundaries | 168 | 8 |

### M03 Trees and ensembles (MASTEMY-DESIGN 20%)

- Worked applications: (1) Train a decision tree and read its splits; (2) Compare a single tree with a boosted ensemble
- Common misconception addressed: Letting a single deep tree overfit
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Decision trees | 168 | 8 |
| M03L02 | Random forests and gradient boosting | 168 | 8 |

### M04 Evaluation metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Select a metric for an imbalanced problem; (2) Move a decision threshold to match error costs
- Common misconception addressed: Reporting accuracy on an imbalanced dataset
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Regression metrics | 168 | 8 |
| M04L02 | Classification metrics and thresholds | 168 | 8 |

### M05 Model selection and tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Tune a model with cross-validation; (2) Compare two models with proper validation
- Common misconception addressed: Leaking information from the test set into tuning
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cross-validation and hyperparameters | 168 | 8 |
| M05L02 | Comparing models fairly | 168 | 8 |

## Integrative case

Given a labelled customer dataset, frame a churn problem as classification, choose and train baseline and improved models, select metrics that match the business cost of errors, and justify a final model and threshold to a product owner.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0436-final-protected | 25 | 25 | yes |
| MST-0436-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Supervised learning basics | 5 |
| Linear and logistic models | 5 |
| Trees and ensembles | 5 |
| Evaluation metrics | 5 |
| Model selection and tuning | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0436-Q0001** (single-answer, Select ONE) A churn dataset is 95% non-churn. Why is accuracy a poor metric here?

- A. A model predicting 'never churns' scores 95% while being useless **(key)**  
  _Rationale:_ Correct: accuracy rewards the majority class on imbalanced data.
- B. Accuracy cannot be computed for classification  
  _Rationale:_ It can be computed; it is just misleading here.
- C. Accuracy only works for regression  
  _Rationale:_ Accuracy is a classification metric.
- D. Accuracy ignores the training set  
  _Rationale:_ That is unrelated to the imbalance problem.

**MST-0436-Q0002** (multiple-answer, Select TWO) Which TWO signs point to overfitting? (Select TWO.)

- A. Training error is very low but validation error is much higher **(key)**  
  _Rationale:_ Correct: a large train/validation gap signals overfitting.
- B. Performance drops sharply on new, unseen data **(key)**  
  _Rationale:_ Correct: poor generalisation is the defining symptom.
- C. Training and validation error are both high and close  
  _Rationale:_ That indicates underfitting, not overfitting.
- D. The model is too simple to fit the training data  
  _Rationale:_ That is underfitting.

**MST-0436-Q0003** (single-answer, Select ONE) You tune a model by repeatedly checking the test set and picking the best. What is the flaw?

- A. The test set leaks into tuning, so its score no longer estimates generalisation **(key)**  
  _Rationale:_ Correct: the test set must stay untouched until final evaluation.
- B. Testing many times improves the true accuracy  
  _Rationale:_ It inflates the reported score, not the true accuracy.
- C. There is no flaw if the model is simple  
  _Rationale:_ The leakage flaw is independent of model simplicity.
- D. The training set becomes too small  
  _Rationale:_ Repeated test checks do not shrink the training set.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
