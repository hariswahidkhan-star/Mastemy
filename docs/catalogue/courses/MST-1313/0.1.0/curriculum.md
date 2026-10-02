# Machine Learning Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1313` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the machine learning workflow end to end
2. Distinguish supervised, unsupervised and reinforcement learning
3. Describe training, validation and testing correctly
4. Diagnose underfitting and overfitting
5. Evaluate models with appropriate metrics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 ML overview (MASTEMY-DESIGN 20%)

- Worked applications: (1) Order the steps of an ML project; (2) Map a business problem to an ML task
- Common misconception addressed: Thinking ML is only model training
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What machine learning is | 96 | 8 |
| M01L02 | The end-to-end ML workflow | 96 | 8 |

### M02 Learning paradigms (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three tasks by paradigm; (2) Pick a paradigm for a described problem
- Common misconception addressed: Forcing every problem into supervised learning
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Supervised learning | 96 | 8 |
| M02L02 | Unsupervised and reinforcement learning | 96 | 8 |

### M03 Data splitting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a train/val/test split; (2) Explain k-fold cross-validation
- Common misconception addressed: Tuning on the test set
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Train, validation and test | 96 | 8 |
| M03L02 | Cross-validation basics | 96 | 8 |

### M04 Fitting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Diagnose a learning curve; (2) Propose a fix for overfitting
- Common misconception addressed: Confusing high training accuracy with a good model
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Underfitting and bias | 96 | 8 |
| M04L02 | Overfitting and variance | 96 | 8 |

### M05 Evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a metric for an imbalanced task; (2) Interpret an MAE value
- Common misconception addressed: Relying on accuracy for imbalanced data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Classification metrics | 96 | 8 |
| M05L02 | Regression metrics | 96 | 8 |

## Integrative case

A retailer wants to predict which customers will churn. Frame it as an ML problem, choose a learning paradigm, design the data split, and name the metrics you would trust and why.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1313-final-protected | 25 | 25 | yes |
| MST-1313-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| ML overview | 5 |
| Learning paradigms | 5 |
| Data splitting | 5 |
| Fitting | 5 |
| Evaluation | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1313-Q0001** (single-answer, Select ONE) Which best describes supervised learning?

- A. Learning a mapping from inputs to known labelled outputs **(key)**  
  _Rationale:_ Correct: supervised learning uses labelled examples.
- B. Learning with no data at all  
  _Rationale:_ Supervised learning needs labelled data.
- C. Finding structure in unlabelled data  
  _Rationale:_ That describes unsupervised learning.
- D. Learning only from rewards and penalties  
  _Rationale:_ That describes reinforcement learning.

**MST-1313-Q0002** (multiple-answer, Select TWO) Which TWO are signs of overfitting? (Select TWO.)

- A. High training accuracy but poor validation accuracy **(key)**  
  _Rationale:_ Correct: a large train/val gap signals overfitting.
- B. The model memorises noise in the training data **(key)**  
  _Rationale:_ Correct: fitting noise is overfitting.
- C. Equally poor accuracy on train and validation  
  _Rationale:_ That indicates underfitting, not overfitting.
- D. The model is too simple to learn the pattern  
  _Rationale:_ Too simple is underfitting.

**MST-1313-Q0003** (single-answer, Select ONE) Why is accuracy a poor metric for a highly imbalanced classification task?

- A. A model predicting only the majority class can score high while missing the minority **(key)**  
  _Rationale:_ Correct: accuracy hides minority-class failure under imbalance.
- B. Accuracy cannot be computed on imbalanced data  
  _Rationale:_ It can be computed; it is just misleading.
- C. Accuracy always equals recall  
  _Rationale:_ They are different metrics.
- D. Imbalanced data has no correct labels  
  _Rationale:_ Labels exist; the issue is class balance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
