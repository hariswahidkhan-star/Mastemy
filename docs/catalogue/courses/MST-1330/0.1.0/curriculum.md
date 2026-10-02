# Self-Supervised Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1330` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the motivation for self-supervision
2. Describe contrastive methods
3. Describe masked and non-contrastive methods
4. Evaluate representation quality
5. Recognise applications and limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Motivation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why unlabelled data is valuable; (2) Give an example of a pretext task
- Common misconception addressed: Confusing self-supervised with fully unsupervised learning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Learning without labels | 120 | 8 |
| M01L02 | Pretext tasks and representations | 120 | 8 |

### M02 Contrastive methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain what a contrastive loss pulls together; (2) Describe the role of augmentations
- Common misconception addressed: Thinking contrastive learning needs human labels
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Positive and negative pairs | 120 | 8 |
| M02L02 | SimCLR and MoCo ideas | 120 | 8 |

### M03 Non-contrastive and masked (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain masked-token prediction; (2) Contrast masked and contrastive objectives
- Common misconception addressed: Assuming masking only works for text
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Masked prediction (BERT/MAE idea) | 120 | 8 |
| M03L02 | Non-contrastive methods (BYOL idea) | 120 | 8 |

### M04 Representation quality (MASTEMY-DESIGN 20%)

- Worked applications: (1) Evaluate representations by linear probing; (2) Recognise representation collapse
- Common misconception addressed: Judging SSL quality by the pretext loss alone
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Linear probing and transfer | 120 | 8 |
| M04L02 | Collapse and evaluation | 120 | 8 |

### M05 Applications and limits (MASTEMY-DESIGN 20%)

- Worked applications: (1) Plan a pretrain-then-finetune workflow; (2) Flag bias absorbed from unlabelled data
- Common misconception addressed: Assuming SSL representations are free of bias
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Downstream use and fine-tuning | 120 | 8 |
| M05L02 | Compute cost and data bias | 120 | 8 |

## Integrative case

A team has millions of unlabelled sensor readings but few labels. Design a self-supervised pretraining approach, choose how to evaluate representations, and plan downstream fine-tuning.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1330-final-protected | 25 | 25 | yes |
| MST-1330-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Motivation | 5 |
| Contrastive methods | 5 |
| Non-contrastive and masked | 5 |
| Representation quality | 5 |
| Applications and limits | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1330-Q0001** (single-answer, Select ONE) What is the core idea of self-supervised learning?

- A. Create supervisory signals from the data itself, without human labels **(key)**  
  _Rationale:_ Correct: pretext tasks generate their own targets.
- B. Require a human to label every example  
  _Rationale:_ That is supervised learning.
- C. Avoid using any data  
  _Rationale:_ It relies heavily on data.
- D. Only cluster data with no objective  
  _Rationale:_ It uses defined pretext objectives.

**MST-1330-Q0002** (multiple-answer, Select TWO) Which TWO are self-supervised pretext strategies? (Select TWO.)

- A. Masking parts of the input and predicting them **(key)**  
  _Rationale:_ Correct: masked prediction is a key SSL approach.
- B. Contrasting augmented views of the same item **(key)**  
  _Rationale:_ Correct: contrastive learning uses augmented pairs.
- C. Manually annotating each class  
  _Rationale:_ That is supervised labelling.
- D. Sorting files by size  
  _Rationale:_ That learns no representation.

**MST-1330-Q0003** (single-answer, Select ONE) Why is linear probing used to evaluate self-supervised representations?

- A. It tests how useful the frozen features are via a simple linear classifier **(key)**  
  _Rationale:_ Correct: probing isolates representation quality.
- B. It retrains the whole network from scratch  
  _Rationale:_ Probing keeps features frozen.
- C. It measures disk usage  
  _Rationale:_ It measures feature usefulness.
- D. It needs no downstream labels  
  _Rationale:_ Probing uses labelled downstream data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
