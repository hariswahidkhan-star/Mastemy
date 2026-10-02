# Transfer Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1329` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the rationale for transfer learning
2. Choose feature extraction vs fine-tuning
3. Reason about domain and task shift
4. Apply practical fine-tuning techniques
5. Evaluate transferred models and risks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why transfer learning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide if a task suits transfer learning; (2) Explain negative transfer
- Common misconception addressed: Assuming any pretrained model transfers to any task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reusing learned representations | 120 | 8 |
| M01L02 | When transfer helps and hurts | 120 | 8 |

### M02 Feature extraction vs fine-tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose freezing vs fine-tuning by data size; (2) Pick which layers to unfreeze
- Common misconception addressed: Fine-tuning everything on a tiny dataset
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Frozen features | 120 | 8 |
| M02L02 | Full and partial fine-tuning | 120 | 8 |

### M03 Domain and task shift (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a domain gap; (2) Adapt a head to a new label space
- Common misconception addressed: Ignoring distribution shift between source and target
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Domain adaptation | 120 | 8 |
| M03L02 | Task and label-space differences | 120 | 8 |

### M04 Practical fine-tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set a smaller learning rate for fine-tuning; (2) Mitigate catastrophic forgetting
- Common misconception addressed: Using the same high learning rate as from-scratch training
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Learning rates and schedules for fine-tuning | 120 | 8 |
| M04L02 | Catastrophic forgetting | 120 | 8 |

### M05 Evaluation and ethics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a fair target-domain evaluation; (2) Flag inherited bias from a source model
- Common misconception addressed: Assuming a strong source score guarantees target success
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evaluating transferred models | 120 | 8 |
| M05L02 | Inherited bias and licensing | 120 | 8 |

## Integrative case

A startup adapts a large pretrained vision model to a specialised medical imaging task with few labels. Decide what to freeze, manage forgetting and domain gap, and evaluate fairly.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1329-final-protected | 25 | 25 | yes |
| MST-1329-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why transfer learning | 5 |
| Feature extraction vs fine-tuning | 5 |
| Domain and task shift | 5 |
| Practical fine-tuning | 5 |
| Evaluation and ethics | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1329-Q0001** (single-answer, Select ONE) With very little target data, which strategy is usually safest?

- A. Freeze most layers and train only a small head (feature extraction) **(key)**  
  _Rationale:_ Correct: limited data favours fewer trainable parameters.
- B. Fine-tune all layers at a high learning rate  
  _Rationale:_ That risks overfitting and forgetting.
- C. Train from scratch  
  _Rationale:_ Little data makes from-scratch training weak.
- D. Use no pretrained model at all  
  _Rationale:_ That discards useful transfer.

**MST-1329-Q0002** (multiple-answer, Select TWO) Which TWO are real risks in transfer learning? (Select TWO.)

- A. Inheriting bias from the source model **(key)**  
  _Rationale:_ Correct: biases can carry over to the target.
- B. Negative transfer when source and target differ too much **(key)**  
  _Rationale:_ Correct: mismatched domains can hurt performance.
- C. Reusing representations is impossible  
  _Rationale:_ Reuse is the whole point.
- D. Pretraining always guarantees success  
  _Rationale:_ It does not guarantee target success.

**MST-1329-Q0003** (single-answer, Select ONE) What is catastrophic forgetting during fine-tuning?

- A. The model loses previously learned knowledge while adapting to the new task **(key)**  
  _Rationale:_ Correct: aggressive updates overwrite prior representations.
- B. The optimiser forgets its learning rate  
  _Rationale:_ That is not the concept.
- C. Data is deleted from disk  
  _Rationale:_ No data is deleted.
- D. The model memorises the test set  
  _Rationale:_ That is a different problem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
