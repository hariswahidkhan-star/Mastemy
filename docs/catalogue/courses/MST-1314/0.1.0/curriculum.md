# Model Evaluation and Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1314` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Select evaluation metrics appropriate to the task
2. Apply validation strategies that avoid leakage
3. Interpret confusion matrices and ROC/PR curves
4. Assess model calibration and error analysis
5. Compare models fairly and report results honestly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose precision or recall for a scenario; (2) Interpret an F1 score
- Common misconception addressed: Reporting a single metric without context
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Classification metrics in depth | 96 | 8 |
| M01L02 | Regression and ranking metrics | 96 | 8 |

### M02 Validation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot leakage in a pipeline; (2) Design leakage-free validation
- Common misconception addressed: Fitting preprocessing on the full dataset
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Hold-out and cross-validation | 96 | 8 |
| M02L02 | Avoiding data leakage | 96 | 8 |

### M03 Curves and matrices (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a confusion matrix; (2) Compare two ROC curves
- Common misconception addressed: Using ROC alone on heavily imbalanced data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Confusion matrices | 96 | 8 |
| M03L02 | ROC and precision-recall curves | 96 | 8 |

### M04 Calibration and errors (MASTEMY-DESIGN 20%)

- Worked applications: (1) Judge whether probabilities are calibrated; (2) Categorise errors by type
- Common misconception addressed: Treating model scores as true probabilities
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Probability calibration | 96 | 8 |
| M04L02 | Error analysis | 96 | 8 |

### M05 Fair comparison (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare a model to a baseline; (2) Write an honest results summary
- Common misconception addressed: Cherry-picking the best run to report
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Baselines and significance | 96 | 8 |
| M05L02 | Honest reporting | 96 | 8 |

## Integrative case

A team reports a new model as 'better' than the old one by accuracy alone. Design a fair evaluation with appropriate metrics, leakage-free validation and an honest comparison to a baseline.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1314-final-protected | 25 | 25 | yes |
| MST-1314-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Metrics | 5 |
| Validation | 5 |
| Curves and matrices | 5 |
| Calibration and errors | 5 |
| Fair comparison | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1314-Q0001** (single-answer, Select ONE) Precision answers which question?

- A. Of the items predicted positive, how many were actually positive **(key)**  
  _Rationale:_ Correct: precision is true positives over predicted positives.
- B. Of the actual positives, how many were found  
  _Rationale:_ That is recall.
- C. How many predictions were made in total  
  _Rationale:_ That is not what precision measures.
- D. How fast the model runs  
  _Rationale:_ Speed is unrelated to precision.

**MST-1314-Q0002** (multiple-answer, Select TWO) Which TWO practices help prevent data leakage? (Select TWO.)

- A. Fit scalers and encoders on the training fold only **(key)**  
  _Rationale:_ Correct: fitting on training data prevents leakage.
- B. Keep the test set untouched until final evaluation **(key)**  
  _Rationale:_ Correct: an untouched test set avoids leakage.
- C. Include the target variable among the features  
  _Rationale:_ That leaks the answer into inputs.
- D. Compute features using future information  
  _Rationale:_ Future information causes leakage.

**MST-1314-Q0003** (single-answer, Select ONE) On a heavily imbalanced dataset, which curve is usually more informative than ROC?

- A. The precision-recall curve **(key)**  
  _Rationale:_ Correct: PR curves reflect minority-class performance better.
- B. A pie chart of class counts  
  _Rationale:_ A pie chart does not evaluate performance.
- C. A bar chart of feature names  
  _Rationale:_ That does not measure model quality.
- D. A histogram of IDs  
  _Rationale:_ IDs carry no evaluation signal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
