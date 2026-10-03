# Neural Networks and Data-Driven Modelling for Physics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2037` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Neural Networks and Data-Driven Modelling for Physics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame physics problems as supervised, unsupervised or regression tasks
2. Prepare, scale and split physical datasets responsibly
3. Train and evaluate models with physics-appropriate metrics and baselines
4. Apply neural networks to regression and classification of physical data
5. Incorporate physical constraints and symmetries into models
6. Interpret models and avoid data leakage and spurious correlations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Framing and data (25% (design weight), design weight)

- Worked applications: (1) Decide whether a detector-classification problem is supervised or unsupervised; (2) Design a train/validation/test split for time-ordered measurements
- Common misconception addressed: Leaking test information into training through improper scaling
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Mapping physics questions to ML tasks | 120 | 7 |
| M01L02 | Data preparation, scaling and train/test splits | 120 | 7 |

### M02 Core models (25% (design weight), design weight)

- Worked applications: (1) Fit a regression to an energy-calibration dataset; (2) Choose an evaluation metric for an imbalanced event classifier
- Common misconception addressed: Reporting accuracy alone for a highly imbalanced dataset
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Linear and logistic regression with baselines | 120 | 7 |
| M02L02 | Decision trees, ensembles and metrics | 120 | 7 |

### M03 Neural networks (25% (design weight), design weight)

- Worked applications: (1) Train a small network to classify particle tracks; (2) Diagnose overfitting from training and validation curves
- Common misconception addressed: Believing a lower training loss always means a better model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Feed-forward networks and training | 120 | 7 |
| M03L02 | Overfitting, regularisation and validation | 120 | 7 |

### M04 Physics-informed and responsible ML (25% (design weight), design weight)

- Worked applications: (1) Add a conservation constraint to a loss function; (2) Explain a model's prediction with a feature-importance check
- Common misconception addressed: Treating a correlation found by a model as a physical law
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Encoding symmetries and conservation constraints | 120 | 7 |
| M04L02 | Interpretation, uncertainty and pitfalls | 120 | 7 |

## Integrative case

A collaboration trains a classifier to separate signal from background in collider data: prevent data leakage in the split, choose metrics robust to class imbalance, encode a known symmetry, and report calibrated uncertainty rather than a single accuracy number.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2037-final-protected | 40 | 40 | yes |
| MST-2037-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framing and data | 10 |
| Core models | 10 |
| Neural networks | 10 |
| Physics-informed and responsible ML | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2037-Q0001** (single-answer, Select ONE) A model reports 99% accuracy classifying rare-signal events where only 1% of events are signal. Why is this metric misleading?

- A. A classifier that labels everything 'background' also scores 99%, so accuracy ignores the rare class **(key)**  
  _Rationale:_ Correct: with severe imbalance, accuracy is dominated by the majority class and hides poor signal recall.
- B. Accuracy cannot be computed for physics data  
  _Rationale:_ Accuracy is computable; it is simply the wrong summary here.
- C. 99% is too low to report  
  _Rationale:_ The issue is the metric choice, not the value.
- D. The model must be overfitting  
  _Rationale:_ High accuracy here reflects imbalance, not necessarily overfitting.

**MST-2037-Q0002** (multiple-answer, Select TWO) Which TWO steps help prevent data leakage when training a model on physical measurements? (Select TWO.)

- A. Fit scalers and preprocessing only on the training split, then apply to validation and test **(key)**  
  _Rationale:_ Correct: fitting preprocessing on all data leaks test information.
- B. Keep repeated measurements of the same object within a single split **(key)**  
  _Rationale:_ Correct: splitting correlated repeats across sets leaks information.
- C. Choose the test set to contain the easiest examples  
  _Rationale:_ That biases evaluation and does not prevent leakage.
- D. Train until the training loss reaches zero  
  _Rationale:_ That encourages overfitting and is unrelated to leakage.

**MST-2037-Q0003** (single-answer, Select ONE) Building a known conservation law into a model's loss function is beneficial mainly because it

- A. constrains predictions to be physically consistent and can improve generalisation from limited data **(key)**  
  _Rationale:_ Correct: physics-informed constraints reduce unphysical solutions and help generalisation.
- B. guarantees the model will never make an error  
  _Rationale:_ Constraints reduce but do not eliminate error.
- C. removes the need for any training data  
  _Rationale:_ Data is still required to learn the task.
- D. makes the model train faster in every case  
  _Rationale:_ Added constraints can slow or complicate training.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
