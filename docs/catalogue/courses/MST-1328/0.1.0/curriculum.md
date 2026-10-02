# Optimisers, Regularisation and Training Stability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1328` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain gradient descent variants
2. Compare adaptive optimisers
3. Apply regularisation methods
4. Use normalisation and schedules
5. Diagnose and fix training instability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Gradient descent (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a batch strategy for a dataset size; (2) Diagnose a too-high learning rate
- Common misconception addressed: Assuming a single learning rate suits all of training
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Batch, stochastic and mini-batch | 120 | 8 |
| M01L02 | Learning rate and loss surfaces | 120 | 8 |

### M02 Adaptive optimisers (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain what momentum accumulates; (2) Compare Adam and plain SGD behaviour
- Common misconception addressed: Believing Adam always generalises best
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Momentum and Nesterov | 120 | 8 |
| M02L02 | Adam, RMSProp and trade-offs | 120 | 8 |

### M03 Regularisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a regulariser for overfitting; (2) Explain how dropout reduces co-adaptation
- Common misconception addressed: Thinking more regularisation always helps
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | L1, L2 and weight decay | 120 | 8 |
| M03L02 | Dropout and early stopping | 120 | 8 |

### M04 Normalisation and schedules (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why normalisation stabilises training; (2) Design a warmup-then-decay schedule
- Common misconception addressed: Assuming batch norm behaves the same at inference
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Batch and layer normalisation | 120 | 8 |
| M04L02 | Learning-rate schedules and warmup | 120 | 8 |

### M05 Diagnosing instability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply gradient clipping; (2) Interpret a diverging loss curve
- Common misconception addressed: Ignoring gradient scale when losses explode
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Exploding/vanishing gradients | 120 | 8 |
| M05L02 | Reading loss and gradient curves | 120 | 8 |

## Integrative case

A deep model's training loss diverges and validation overfits. Choose an optimiser and learning-rate schedule, add appropriate regularisation and normalisation, and diagnose the instability.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1328-final-protected | 25 | 25 | yes |
| MST-1328-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Gradient descent | 5 |
| Adaptive optimisers | 5 |
| Regularisation | 5 |
| Normalisation and schedules | 5 |
| Diagnosing instability | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1328-Q0001** (single-answer, Select ONE) What problem does dropout primarily address?

- A. Overfitting, by discouraging co-adaptation of neurons **(key)**  
  _Rationale:_ Correct: dropout randomly removes units during training.
- B. Slow data loading  
  _Rationale:_ Dropout is unrelated to I/O.
- C. Exploding gradients directly  
  _Rationale:_ Clipping addresses exploding gradients.
- D. Choosing the learning rate  
  _Rationale:_ That is a schedule concern.

**MST-1328-Q0002** (multiple-answer, Select TWO) Which TWO are regularisation techniques? (Select TWO.)

- A. L2 weight decay **(key)**  
  _Rationale:_ Correct: penalises large weights.
- B. Early stopping **(key)**  
  _Rationale:_ Correct: halts before overfitting.
- C. Increasing the batch size to all data  
  _Rationale:_ That is a batching choice, not regularisation.
- D. Adding more epochs indefinitely  
  _Rationale:_ That tends to worsen overfitting.

**MST-1328-Q0003** (single-answer, Select ONE) Why does batch normalisation behave differently at inference than in training?

- A. At inference it uses running statistics instead of per-batch statistics **(key)**  
  _Rationale:_ Correct: stored running mean/variance are used at inference.
- B. It is disabled and does nothing  
  _Rationale:_ It still normalises using running stats.
- C. It switches to dropout  
  _Rationale:_ Dropout and batch norm are different layers.
- D. It recomputes gradients  
  _Rationale:_ No gradients are computed at inference.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
