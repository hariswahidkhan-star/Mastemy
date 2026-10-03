# Intro to Machine Learning for Teens (Ages 14-17)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2905` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal blueprint (no external syllabus) |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Intro to Machine Learning for Teens (Ages 14-17) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain supervised learning with features and labels
2. Describe the difference between classification and regression
3. Explain the roles of training and test data
4. Describe what overfitting is and why it is a problem
5. Interpret simple accuracy and error measures
6. Discuss limitations and ethical issues of ML models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 ML foundations (25% (design weight), design weight)

- Worked applications: (1) Label a small dataset with features and a target; (2) Decide whether a problem is classification or regression
- Common misconception addressed: Thinking ML is just a set of hand-written if-rules
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What machine learning is; supervised learning | 120 | 7 |
| M01L02 | Features, labels and datasets | 120 | 7 |

### M02 Types of tasks (25% (design weight), design weight)

- Worked applications: (1) Sort example problems into classification or regression; (2) Explain your reasoning for one of them
- Common misconception addressed: Thinking classification and regression are the same task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classification vs regression | 120 | 7 |
| M02L02 | Choosing a task for a problem | 120 | 7 |

### M03 Training and evaluation (25% (design weight), design weight)

- Worked applications: (1) Split a dataset into training and test sets; (2) Explain why testing on training data is misleading
- Common misconception addressed: Thinking a model should be judged on the data it trained on
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Training vs test data and why they differ | 120 | 7 |
| M03L02 | Accuracy, error and what they tell us | 120 | 7 |

### M04 Overfitting and ethics (25% (design weight), design weight)

- Worked applications: (1) Spot an overfit model from its train vs test scores; (2) Name one ethical risk of a given model
- Common misconception addressed: Thinking higher training accuracy always means a better model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Overfitting and generalisation | 120 | 7 |
| M04L02 | Bias, fairness and limitations | 120 | 7 |

## Integrative case

Learners train a simple classifier on a small labelled dataset (e.g. predicting if a message is spam): they pick features, split into training and test sets, compare train and test accuracy to spot overfitting, and discuss one fairness risk of deploying it.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2905-final-protected | 40 | 40 | yes |
| MST-2905-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| ML foundations | 10 |
| Types of tasks | 10 |
| Training and evaluation | 10 |
| Overfitting and ethics | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2905-Q0001** (single-answer, Select ONE) Why do machine-learning teams keep a separate 'test' dataset?

- A. To measure how well the model performs on data it has not seen during training **(key)**  
  _Rationale:_ Correct: test data estimates real-world generalisation.
- B. To give the model more examples to memorise  
  _Rationale:_ Test data is held back precisely so it is not memorised.
- C. Because training data is always wrong  
  _Rationale:_ Training data is used to learn; test data checks generalisation.
- D. To make training take longer on purpose  
  _Rationale:_ The purpose is honest evaluation, not slowing training.

**MST-2905-Q0002** (multiple-answer, Select TWO) Which TWO signs suggest a model is overfitting? (Select TWO.)

- A. Very high accuracy on training data **(key)**  
  _Rationale:_ Correct: near-perfect training scores can indicate memorisation.
- B. Much lower accuracy on new test data **(key)**  
  _Rationale:_ Correct: a big train-test gap is a classic overfitting sign.
- C. Equal and reasonable accuracy on train and test  
  _Rationale:_ Similar scores suggest healthy generalisation, not overfitting.
- D. No training data at all  
  _Rationale:_ Without training data the model has not learned yet; that is not overfitting.

**MST-2905-Q0003** (single-answer, Select ONE) A spam classifier scores 99% on training data but 60% on new messages. What is the likely issue?

- A. It has overfit the training data and does not generalise to new messages **(key)**  
  _Rationale:_ Correct: a large train-test gap points to overfitting.
- B. It is the best possible model  
  _Rationale:_ A large gap shows it is not generalising well.
- C. Test data is not needed  
  _Rationale:_ The test data is exactly what revealed the problem.
- D. The model has learned nothing at all  
  _Rationale:_ It learned the training set too closely, which is overfitting.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
