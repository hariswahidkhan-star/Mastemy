# Scikit-learn in Practice

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1320` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Use the scikit-learn estimator API
2. Build preprocessing pipelines
3. Perform model selection and tuning
4. Choose and compute evaluation metrics
5. Persist models and avoid common pitfalls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Estimator API (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify the role of fit vs predict; (2) Map a task to the right estimator interface
- Common misconception addressed: Calling predict before fitting the estimator
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | fit, predict and transform | 96 | 8 |
| M01L02 | Estimators, transformers and predictors | 96 | 8 |

### M02 Preprocessing and pipelines (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a pipeline that scales then models; (2) Route numeric and categorical columns correctly
- Common misconception addressed: Fitting the scaler on the full dataset before splitting
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Scalers, encoders and imputers | 96 | 8 |
| M02L02 | Pipeline and ColumnTransformer | 96 | 8 |

### M03 Model selection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a cross-validation strategy; (2) Explain why search uses the training folds only
- Common misconception addressed: Tuning hyperparameters on the test set
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | train_test_split and cross_val_score | 96 | 8 |
| M03L02 | GridSearchCV and RandomizedSearchCV | 96 | 8 |

### M04 Metrics and scoring (MASTEMY-DESIGN 20%)

- Worked applications: (1) Select a metric for an imbalanced task; (2) Wire a scoring function into cross-validation
- Common misconception addressed: Using the default scorer without checking what it optimises
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Classification and regression metrics | 96 | 8 |
| M04L02 | Custom scorers and class weights | 96 | 8 |

### M05 Persistence and pitfalls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Persist a fitted pipeline for reuse; (2) Spot a data-leakage bug in a workflow
- Common misconception addressed: Assuming a saved model is safe across library versions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Saving and loading models | 96 | 8 |
| M05L02 | Leakage, reproducibility and versions | 96 | 8 |

## Integrative case

A team trains a churn classifier on mixed numeric and categorical data. Build a leak-free pipeline, tune it with cross-validation, pick an appropriate metric, and persist the result for serving.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1320-final-protected | 25 | 25 | yes |
| MST-1320-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Estimator API | 5 |
| Preprocessing and pipelines | 5 |
| Model selection | 5 |
| Metrics and scoring | 5 |
| Persistence and pitfalls | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1320-Q0001** (single-answer, Select ONE) Why should a scaler be fit inside a pipeline after the train/test split?

- A. Fitting it on all data leaks test statistics into training and inflates estimates **(key)**  
  _Rationale:_ Correct: this is a classic data-leakage mistake.
- B. Scalers cannot be saved otherwise  
  _Rationale:_ Persistence is unrelated.
- C. It makes training run faster  
  _Rationale:_ Speed is not the reason.
- D. Pipelines forbid scalers  
  _Rationale:_ Pipelines are designed to include scalers.

**MST-1320-Q0002** (multiple-answer, Select TWO) Which TWO are valid scikit-learn tools for model selection? (Select TWO.)

- A. GridSearchCV **(key)**  
  _Rationale:_ Correct: exhaustive hyperparameter search with CV.
- B. cross_val_score **(key)**  
  _Rationale:_ Correct: estimates performance via cross-validation.
- C. predict_proba as a tuner  
  _Rationale:_ It returns probabilities, it does not tune.
- D. StandardScaler as a selector  
  _Rationale:_ It scales features, it does not select models.

**MST-1320-Q0003** (single-answer, Select ONE) What does calling fit on a scikit-learn estimator do?

- A. Learns parameters from the training data **(key)**  
  _Rationale:_ Correct: fit estimates parameters from data.
- B. Immediately returns test predictions  
  _Rationale:_ predict returns predictions, not fit.
- C. Deletes the training data  
  _Rationale:_ fit does not delete data.
- D. Downloads a pretrained model  
  _Rationale:_ fit trains on the provided data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
