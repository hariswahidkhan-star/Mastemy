# Neural Network Architectures and Optimization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0443` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-NNFS-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how feedforward networks compute and learn
2. Describe backpropagation and gradient flow
3. Choose activations, initialisation and normalisation
4. Apply optimisers and learning-rate schedules
5. Use regularisation to improve generalisation
6. Diagnose and fix training problems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Feedforward networks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Count parameters in a given network; (2) Reason about depth vs width for a task
- Common misconception addressed: Believing more layers always help
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Neurons, layers and depth | 168 | 8 |
| M01L02 | Universal approximation and capacity | 168 | 8 |

### M02 Backpropagation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace gradient flow through two layers; (2) Explain why deep sigmoids stall learning
- Common misconception addressed: Ignoring gradient magnitude across layers
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The chain rule through a network | 168 | 8 |
| M02L02 | Vanishing and exploding gradients | 168 | 8 |

### M03 Activations, init and normalisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose an activation and initialisation; (2) Add normalisation to stabilise training
- Common misconception addressed: Initialising all weights to the same value
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Activation functions | 168 | 8 |
| M03L02 | Initialisation and batch/layer norm | 168 | 8 |

### M04 Optimisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick an optimiser for a scenario; (2) Design a learning-rate schedule
- Common misconception addressed: Leaving the learning rate fixed throughout
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SGD, momentum and Adam | 168 | 8 |
| M04L02 | Learning-rate schedules | 168 | 8 |

### M05 Regularisation and diagnosis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reduce overfitting with regularisation; (2) Read a train/validation curve to find the fault
- Common misconception addressed: Adding capacity to fix an overfitting model
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Dropout, weight decay and augmentation | 168 | 8 |
| M05L02 | Diagnosing training curves | 168 | 8 |

## Integrative case

A deep network trains slowly and overfits. Reason about its architecture and optimisation: choose activations and initialisation, add normalisation and regularisation, select an optimiser and schedule, and justify each change by its effect on the loss landscape and generalisation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0443-final-protected | 25 | 25 | yes |
| MST-0443-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Feedforward networks | 5 |
| Backpropagation | 5 |
| Activations, init and normalisation | 5 |
| Optimisation | 5 |
| Regularisation and diagnosis | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0443-Q0001** (single-answer, Select ONE) Why do very deep networks with sigmoid activations suffer vanishing gradients?

- A. Repeated multiplication of small derivatives shrinks gradients toward zero in early layers **(key)**  
  _Rationale:_ Correct: gradient magnitude decays through many layers.
- B. Sigmoids make the loss undefined  
  _Rationale:_ The loss remains defined.
- C. Deeper networks have fewer parameters  
  _Rationale:_ Depth adds parameters, not fewer.
- D. Gradients vanish only on the GPU  
  _Rationale:_ It is a mathematical property, not hardware-specific.

**MST-0443-Q0002** (multiple-answer, Select TWO) Which TWO changes commonly stabilise or speed up deep-network training? (Select TWO.)

- A. Adding batch or layer normalisation **(key)**  
  _Rationale:_ Correct: normalisation steadies activations and gradients.
- B. Using a suitable weight initialisation such as He or Xavier **(key)**  
  _Rationale:_ Correct: good init keeps signal variance controlled.
- C. Initialising all weights to the same constant  
  _Rationale:_ That breaks symmetry and prevents learning.
- D. Removing all activation functions  
  _Rationale:_ Without non-linearity the network collapses to linear.

**MST-0443-Q0003** (single-answer, Select ONE) A model fits training data well but generalises poorly. Which change helps most?

- A. Add regularisation such as dropout or weight decay **(key)**  
  _Rationale:_ Correct: regularisation reduces overfitting.
- B. Increase the number of parameters  
  _Rationale:_ More capacity usually worsens overfitting.
- C. Remove the validation set  
  _Rationale:_ That hides, not fixes, the problem.
- D. Train for many more epochs without changes  
  _Rationale:_ More epochs can increase overfitting.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
