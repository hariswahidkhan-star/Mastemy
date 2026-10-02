# Imbalanced Data Techniques

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1321` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the effects of class imbalance
2. Apply resampling techniques correctly
3. Apply algorithmic and threshold methods
4. Evaluate models under imbalance
5. Avoid leakage and choose an end-to-end strategy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why imbalance matters (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why accuracy misleads on skewed classes; (2) Decide whether imbalance needs treatment
- Common misconception addressed: Assuming every imbalanced problem must be rebalanced
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Class imbalance and its effects | 96 | 8 |
| M01L02 | When imbalance does and does not hurt | 96 | 8 |

### M02 Resampling methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose between over- and under-sampling; (2) Explain how SMOTE creates new points
- Common misconception addressed: Applying SMOTE before the train/test split
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Random over- and under-sampling | 96 | 8 |
| M02L02 | SMOTE and synthetic samples | 96 | 8 |

### M03 Algorithmic approaches (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set class weights for a skewed task; (2) Move a decision threshold to trade recall for precision
- Common misconception addressed: Believing resampling is the only remedy
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Class weights and cost-sensitive learning | 96 | 8 |
| M03L02 | Threshold moving | 96 | 8 |

### M04 Evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a precision-recall curve; (2) Choose PR over ROC for a rare positive class
- Common misconception addressed: Relying on ROC-AUC alone for rare events
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Precision, recall, F1 and PR curves | 96 | 8 |
| M04L02 | ROC vs PR under imbalance | 96 | 8 |

### M05 Pitfalls and practice (MASTEMY-DESIGN 20%)

- Worked applications: (1) Place resampling inside cross-validation correctly; (2) Select a strategy for a fraud dataset
- Common misconception addressed: Resampling the validation and test folds
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Leakage from resampling | 96 | 8 |
| M05L02 | Choosing a strategy end to end | 96 | 8 |

## Integrative case

A medical screening model must catch a rare condition. Decide whether to resample, set class weights, choose precision/recall trade-offs, and keep resampling out of the test data.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1321-final-protected | 25 | 25 | yes |
| MST-1321-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why imbalance matters | 5 |
| Resampling methods | 5 |
| Algorithmic approaches | 5 |
| Evaluation | 5 |
| Pitfalls and practice | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1321-Q0001** (single-answer, Select ONE) Why must SMOTE be applied only to the training folds?

- A. Synthesising on all data leaks information into validation and inflates scores **(key)**  
  _Rationale:_ Correct: resampling before splitting causes leakage.
- B. SMOTE only works on test data  
  _Rationale:_ It is applied to training data.
- C. It changes the number of features  
  _Rationale:_ It adds samples, not features.
- D. It is required by the ROC curve  
  _Rationale:_ ROC does not require SMOTE.

**MST-1321-Q0002** (multiple-answer, Select TWO) Which TWO handle imbalance without creating synthetic rows? (Select TWO.)

- A. Class weights in the loss function **(key)**  
  _Rationale:_ Correct: weights penalise minority errors more.
- B. Moving the decision threshold **(key)**  
  _Rationale:_ Correct: shifts the precision/recall balance.
- C. SMOTE oversampling  
  _Rationale:_ SMOTE creates synthetic rows.
- D. Random oversampling  
  _Rationale:_ It duplicates minority rows.

**MST-1321-Q0003** (single-answer, Select ONE) Why is a precision-recall curve often preferred over ROC for a rare positive class?

- A. It focuses on the positive class and is less flattered by many true negatives **(key)**  
  _Rationale:_ Correct: PR curves are more informative under heavy imbalance.
- B. ROC cannot be plotted for imbalanced data  
  _Rationale:_ It can be plotted; it is just less informative.
- C. PR curves need no predictions  
  _Rationale:_ They require predicted scores.
- D. They always report the same number  
  _Rationale:_ They capture different trade-offs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
