# Decision Trees and Ensemble Methods

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1315` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain how decision trees split and predict
2. Describe overfitting control in trees
3. Explain bagging and random forests
4. Explain boosting and gradient-boosted trees
5. Choose and tune a tree-based method for a task

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Decision trees (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace a prediction through a tree; (2) Explain a split using impurity
- Common misconception addressed: Thinking a deeper tree is always better
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Splits, impurity and leaves | 96 | 8 |
| M01L02 | Reading and interpreting a tree | 96 | 8 |

### M02 Controlling trees (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a depth limit for a dataset; (2) Explain why pruning helps
- Common misconception addressed: Letting a tree grow unbounded
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pruning and depth limits | 96 | 8 |
| M02L02 | Minimum samples and regularisation | 96 | 8 |

### M03 Bagging (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why bagging reduces variance; (2) Describe feature randomness in forests
- Common misconception addressed: Expecting bagging to reduce bias
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Bootstrap aggregation | 96 | 8 |
| M03L02 | Random forests | 96 | 8 |

### M04 Boosting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Contrast boosting with bagging; (2) Explain how boosting focuses on errors
- Common misconception addressed: Confusing boosting with bagging
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sequential boosting idea | 96 | 8 |
| M04L02 | Gradient-boosted trees | 96 | 8 |

### M05 Choosing and tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick a method for tabular data; (2) Name three hyperparameters to tune
- Common misconception addressed: Tuning blindly without validation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | When trees fit the problem | 96 | 8 |
| M05L02 | Key hyperparameters | 96 | 8 |

## Integrative case

A bank wants an interpretable, strong model for loan default on tabular data. Compare a single tree, a random forest and gradient boosting, and recommend one with tuning and evaluation guidance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1315-final-protected | 25 | 25 | yes |
| MST-1315-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Decision trees | 5 |
| Controlling trees | 5 |
| Bagging | 5 |
| Boosting | 5 |
| Choosing and tuning | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1315-Q0001** (single-answer, Select ONE) How does a decision tree make a prediction for a new example?

- A. It follows splits from the root to a leaf and uses that leaf's outcome **(key)**  
  _Rationale:_ Correct: predictions follow the path to a leaf.
- B. It averages all other models in the forest  
  _Rationale:_ That describes an ensemble, not a single tree.
- C. It solves a linear equation  
  _Rationale:_ Trees use splits, not a linear equation.
- D. It picks an answer at random  
  _Rationale:_ Predictions are determined by the splits.

**MST-1315-Q0002** (multiple-answer, Select TWO) Which TWO statements about random forests are correct? (Select TWO.)

- A. They reduce variance by averaging many de-correlated trees **(key)**  
  _Rationale:_ Correct: averaging diverse trees reduces variance.
- B. They use bootstrap samples and random feature subsets **(key)**  
  _Rationale:_ Correct: these create tree diversity.
- C. They train a single very deep tree only  
  _Rationale:_ A forest is many trees, not one.
- D. They are a form of linear regression  
  _Rationale:_ They are tree ensembles, not linear models.

**MST-1315-Q0003** (single-answer, Select ONE) How does boosting differ from bagging?

- A. Boosting trains models sequentially, each correcting prior errors **(key)**  
  _Rationale:_ Correct: boosting is sequential and error-focused.
- B. Boosting trains all trees fully independently in parallel  
  _Rationale:_ That describes bagging, not boosting.
- C. Boosting never uses trees  
  _Rationale:_ Gradient boosting commonly uses trees.
- D. Boosting and bagging are identical  
  _Rationale:_ They differ in how models are combined.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
