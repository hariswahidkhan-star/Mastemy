# Convolutional Neural Networks

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1324` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the convolution operation
2. Describe CNN building blocks
3. Compare CNN architectures
4. Train CNNs effectively
5. Recognise CNN applications and limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Convolution basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute an output size from stride and padding; (2) Explain what a learned filter detects
- Common misconception addressed: Thinking convolution is the same as full connectivity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Filters, kernels and feature maps | 120 | 8 |
| M01L02 | Stride, padding and receptive fields | 120 | 8 |

### M02 CNN building blocks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why pooling adds invariance; (2) Count parameters with weight sharing
- Common misconception addressed: Assuming more channels always means better results
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pooling and nonlinearities | 120 | 8 |
| M02L02 | Channels and parameter sharing | 120 | 8 |

### M03 Architectures (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why residual connections help training; (2) Compare two classic architectures
- Common misconception addressed: Believing deeper networks always train more easily
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | LeNet to ResNet | 120 | 8 |
| M03L02 | Residual connections and depth | 120 | 8 |

### M04 Training CNNs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose augmentations for an image task; (2) Decide which layers to fine-tune
- Common misconception addressed: Augmenting in ways that change the true label
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data augmentation | 120 | 8 |
| M04L02 | Transfer learning and fine-tuning | 120 | 8 |

### M05 Applications and limits (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a task to classification vs segmentation; (2) Flag a distribution-shift failure
- Common misconception addressed: Assuming a CNN generalises to unseen domains automatically
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Detection and segmentation overview | 120 | 8 |
| M05L02 | Robustness and failure modes | 120 | 8 |

## Integrative case

A team builds an image classifier for a factory defect task with limited labelled data. Choose an architecture, apply augmentation and transfer learning, and plan for distribution shift on the line.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1324-final-protected | 25 | 25 | yes |
| MST-1324-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Convolution basics | 5 |
| CNN building blocks | 5 |
| Architectures | 5 |
| Training CNNs | 5 |
| Applications and limits | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1324-Q0001** (single-answer, Select ONE) Why do residual (skip) connections help train very deep networks?

- A. They let gradients flow more directly, easing optimisation of deep stacks **(key)**  
  _Rationale:_ Correct: skip connections mitigate vanishing gradients.
- B. They remove the need for any activation function  
  _Rationale:_ Activations are still used.
- C. They delete half the layers at random  
  _Rationale:_ That describes a different technique.
- D. They guarantee zero training error  
  _Rationale:_ They ease training, not guarantee it.

**MST-1324-Q0002** (multiple-answer, Select TWO) Which TWO are genuine benefits of convolutional layers over fully connected layers for images? (Select TWO.)

- A. Parameter sharing reduces the number of weights **(key)**  
  _Rationale:_ Correct: a filter is reused across the image.
- B. Local receptive fields capture spatial structure **(key)**  
  _Rationale:_ Correct: convolution exploits locality.
- C. They always have more parameters  
  _Rationale:_ They typically have fewer.
- D. They ignore spatial relationships  
  _Rationale:_ They explicitly use spatial structure.

**MST-1324-Q0003** (single-answer, Select ONE) Which data augmentation risks corrupting the label in a digit-recognition task?

- A. Flipping digits horizontally, which can turn one digit into another or an invalid shape **(key)**  
  _Rationale:_ Correct: label-changing transforms must be avoided.
- B. Small random brightness changes  
  _Rationale:_ Brightness jitter preserves the label.
- C. Minor translations  
  _Rationale:_ Small shifts preserve the label.
- D. Slight rotations within a few degrees  
  _Rationale:_ Small rotations generally preserve the label.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
