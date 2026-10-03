# How AI Learns: Patterns and Data (Ages 11-13)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2900` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — How AI Learns: Patterns and Data (Ages 11-13) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain that many AI systems learn patterns from data
2. Describe what training data is and why its quality matters
3. Explain the idea of features and labels in simple terms
4. Describe how bias in data can lead to unfair results
5. Explain in simple terms how a model makes a prediction
6. Discuss why testing an AI on new data matters

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Learning from data (25% (design weight), design weight)

- Worked applications: (1) Label a small set of examples as features and labels; (2) Explain what pattern an AI might learn from them
- Common misconception addressed: Thinking AI is programmed with every rule by hand
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What training data is | 120 | 7 |
| M01L02 | Patterns, features and labels | 120 | 7 |

### M02 Good and bad data (25% (design weight), design weight)

- Worked applications: (1) Spot a dataset that is missing a whole group; (2) Explain how that could make the AI unfair
- Common misconception addressed: Thinking more data is always better regardless of quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Why data quality matters | 120 | 7 |
| M02L02 | How missing or skewed data causes problems | 120 | 7 |

### M03 Making predictions (25% (design weight), design weight)

- Worked applications: (1) Predict a label for a new example by the pattern; (2) Say how sure you are and why
- Common misconception addressed: Thinking a prediction is always certain
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | From patterns to a prediction | 120 | 7 |
| M03L02 | Confidence and uncertainty | 120 | 7 |

### M04 Fairness and testing (25% (design weight), design weight)

- Worked applications: (1) Find a biased result and trace it to the data; (2) Explain why testing on new data is needed
- Common misconception addressed: Thinking an AI that fits the training data will always work on new data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | How bias in data causes unfair results | 120 | 7 |
| M04L02 | Testing on new, unseen examples | 120 | 7 |

## Integrative case

Learners act as a mini machine-learning team: they build a tiny labelled dataset of fruit by features, notice it has no examples of one fruit, predict a new item, discover a biased result, trace it to the missing data, and test on unseen fruit.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2900-final-protected | 40 | 40 | yes |
| MST-2900-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Learning from data | 10 |
| Good and bad data | 10 |
| Making predictions | 10 |
| Fairness and testing | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2900-Q0001** (single-answer, Select ONE) Why does the quality of training data matter so much for an AI model?

- A. The model learns its patterns from the data, so poor or skewed data leads to poor or unfair results **(key)**  
  _Rationale:_ Correct: models reflect the data they learn from.
- B. Data quality does not affect the model at all  
  _Rationale:_ Data quality strongly affects what the model learns.
- C. Good data makes the computer physically faster  
  _Rationale:_ Data quality affects accuracy and fairness, not raw speed.
- D. The model ignores the data it is given  
  _Rationale:_ The model learns directly from the data.

**MST-2900-Q0002** (multiple-answer, Select TWO) Which TWO problems can biased or incomplete training data cause? (Select TWO.)

- A. Unfair results for groups missing from the data **(key)**  
  _Rationale:_ Correct: missing groups can be treated unfairly.
- B. Predictions that work badly on real, new examples **(key)**  
  _Rationale:_ Correct: skewed data can make predictions unreliable.
- C. The computer running out of electricity  
  _Rationale:_ Data bias does not drain electricity.
- D. The screen changing colour by itself  
  _Rationale:_ Data bias does not change screen colours.

**MST-2900-Q0003** (single-answer, Select ONE) An AI predicts well on its training examples but poorly on brand-new ones. What does this suggest?

- A. It may have learned the training examples too closely and needs testing on new data **(key)**  
  _Rationale:_ Correct: good training performance alone does not prove it generalises.
- B. The AI is perfect and needs no testing  
  _Rationale:_ Poor results on new data show it is not reliable yet.
- C. New data is not allowed in AI  
  _Rationale:_ Testing on new data is exactly what we should do.
- D. Training data and new data are always identical  
  _Rationale:_ They differ, which is why testing on new data matters.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
