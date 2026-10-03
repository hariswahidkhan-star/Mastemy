# AI for Molecular Property Prediction: QSAR, Models and Evaluation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2012` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — AI for Molecular Property Prediction: QSAR, Models and Evaluation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame molecular property prediction as a learning problem
2. Featurise molecules for regression and classification
3. Build and tune QSAR and graph-based models
4. Evaluate models with appropriate chemistry-aware metrics
5. Define and respect a model's applicability domain
6. Interpret models and communicate predictions honestly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Problem framing (17% (design weight), design weight)

- Worked applications: (1) Formulate a solubility task with the right target variable; (2) Decide regression vs classification for a property
- Common misconception addressed: Framing a continuous property as a binary label without reason
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Targets, tasks and data in property prediction | 81 | 5 |
| M01L02 | Classical QSAR and its assumptions | 82 | 5 |

### M02 Featurisation (17% (design weight), design weight)

- Worked applications: (1) Choose features for a small molecular data set; (2) Compare fingerprint and graph representations
- Common misconception addressed: Assuming more features always improve a small-data model
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Descriptors and fingerprints as features | 81 | 5 |
| M02L02 | Graph and learned molecular representations | 82 | 5 |

### M03 Model building (17% (design weight), design weight)

- Worked applications: (1) Set up nested cross-validation for tuning; (2) Pick a model class for a given data size
- Common misconception addressed: Tuning and evaluating on the same held-out set
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Regression and classification models | 81 | 5 |
| M03L02 | Training, tuning and cross-validation | 82 | 5 |

### M04 Evaluation (17% (design weight), design weight)

- Worked applications: (1) Select metrics appropriate to an imbalanced task; (2) Compare a model against a sensible baseline
- Common misconception addressed: Judging a model by accuracy alone on imbalanced data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Chemistry-aware metrics and baselines | 81 | 5 |
| M04L02 | Realistic splits and leakage avoidance | 82 | 5 |

### M05 Applicability domain (16% (design weight), design weight)

- Worked applications: (1) Flag out-of-domain molecules at prediction time; (2) Attach an uncertainty estimate to a prediction
- Common misconception addressed: Reporting predictions for clearly out-of-domain inputs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Defining the applicability domain | 77 | 5 |
| M05L02 | Uncertainty and out-of-domain detection | 77 | 5 |

### M06 Interpretation and reporting (16% (design weight), design weight)

- Worked applications: (1) Explain which features drive a prediction; (2) Write an honest caveat for a predicted value
- Common misconception addressed: Overstating confidence when the applicability domain is exceeded
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Interpreting feature importance | 77 | 5 |
| M06L02 | Communicating predictions and limits | 77 | 5 |

## Integrative case

A discovery team wants to prioritise compounds by predicted toxicity: a trainee must featurise the molecules, build and tune a QSAR model with leakage-free validation, define its applicability domain, and present predictions with honest uncertainty to guide which compounds to test.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2012-final-protected | 40 | 40 | yes |
| MST-2012-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Problem framing | 7 |
| Featurisation | 7 |
| Model building | 7 |
| Evaluation | 7 |
| Applicability domain | 6 |
| Interpretation and reporting | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2012-Q0001** (single-answer, Select ONE) Why is random cross-validation often too optimistic for molecular property prediction?

- A. Structurally similar molecules can appear in both folds, leaking information **(key)**  
  _Rationale:_ Correct: near-duplicates across folds inflate measured performance.
- B. Random splitting is always the most rigorous approach  
  _Rationale:_ For molecules, scaffold or time splits are usually more realistic.
- C. Cross-validation cannot be used in chemistry  
  _Rationale:_ It can, but the splitting strategy matters.
- D. It underestimates performance severely  
  _Rationale:_ The bias is typically toward over-optimism, not pessimism.

**MST-2012-Q0002** (multiple-answer, Select TWO) Which TWO practices make a QSAR model's predictions more trustworthy? (Select TWO.)

- A. Reporting an applicability domain for the model **(key)**  
  _Rationale:_ Correct: predictions are reliable only within the applicability domain.
- B. Attaching uncertainty estimates to predictions **(key)**  
  _Rationale:_ Correct: uncertainty tells users how much to trust each value.
- C. Reporting only the single best cross-validation score  
  _Rationale:_ A single cherry-picked score can mislead.
- D. Predicting confidently for any molecule regardless of domain  
  _Rationale:_ Out-of-domain predictions are unreliable.

**MST-2012-Q0003** (single-answer, Select ONE) A toxicity classifier reports 95% accuracy on data where 95% of compounds are non-toxic. What is the concern?

- A. A trivial model that always predicts non-toxic reaches the same accuracy, so accuracy is uninformative **(key)**  
  _Rationale:_ Correct: with class imbalance, accuracy hides poor minority-class performance.
- B. The model is clearly excellent and ready to deploy  
  _Rationale:_ High accuracy under imbalance can be meaningless.
- C. Accuracy is the only metric that matters here  
  _Rationale:_ Balanced metrics such as recall and AUC are needed.
- D. The data set is too large to evaluate  
  _Rationale:_ Size is not the issue; class imbalance is.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
