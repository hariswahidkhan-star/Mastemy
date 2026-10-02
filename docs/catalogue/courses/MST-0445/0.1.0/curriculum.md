# Computer Vision: Recognition, Detection, and Segmentation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0445` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-CVF-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Represent and preprocess image data
2. Explain convolutional networks for vision
3. Build image classification models
4. Apply object detection methods
5. Apply image segmentation methods
6. Use transfer learning and evaluate vision models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Images and preprocessing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Normalise and augment an image batch; (2) Choose augmentations for a dataset
- Common misconception addressed: Augmenting in a way that changes the label
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Image representation | 168 | 8 |
| M01L02 | Preprocessing and augmentation | 168 | 8 |

### M02 Convolutional networks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute an output size for a conv layer; (2) Compare two CNN architectures
- Common misconception addressed: Ignoring stride and padding when sizing layers
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Convolution, pooling and feature maps | 168 | 8 |
| M02L02 | CNN architectures | 168 | 8 |

### M03 Image classification (MASTEMY-DESIGN 20%)

- Worked applications: (1) Train a classifier with transfer learning; (2) Fine-tune a pretrained backbone
- Common misconception addressed: Fine-tuning all layers on a tiny dataset
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building a classifier | 168 | 8 |
| M03L02 | Transfer learning | 168 | 8 |

### M04 Object detection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret bounding-box predictions and IoU; (2) Choose a detector for a latency budget
- Common misconception addressed: Evaluating detection with classification accuracy
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Detection concepts and anchors | 168 | 8 |
| M04L02 | Modern detectors and IoU | 168 | 8 |

### M05 Segmentation and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick segmentation type for a requirement; (2) Evaluate with mIoU and mAP appropriately
- Common misconception addressed: Reporting pixel accuracy on imbalanced classes
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Semantic and instance segmentation | 168 | 8 |
| M05L02 | Vision metrics and evaluation | 168 | 8 |

## Integrative case

Build a vision system for a warehouse that must both classify and locate items on a conveyor. Choose between classification, detection and segmentation for each requirement, prepare data and augmentation, train with transfer learning, and evaluate with task-appropriate metrics.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0445-final-protected | 25 | 25 | yes |
| MST-0445-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Images and preprocessing | 5 |
| Convolutional networks | 5 |
| Image classification | 5 |
| Object detection | 5 |
| Segmentation and evaluation | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0445-Q0001** (single-answer, Select ONE) A task needs both the class and the pixel-level outline of each object. Which approach fits?

- A. Instance segmentation **(key)**  
  _Rationale:_ Correct: it labels and separates each object at pixel level.
- B. Image classification  
  _Rationale:_ Classification gives one label for the whole image, no location.
- C. Image-level regression  
  _Rationale:_ That predicts a number, not pixel outlines.
- D. Simple thresholding  
  _Rationale:_ Thresholding cannot distinguish object instances reliably.

**MST-0445-Q0002** (multiple-answer, Select TWO) Which TWO practices suit transfer learning on a small image dataset? (Select TWO.)

- A. Start from a pretrained backbone **(key)**  
  _Rationale:_ Correct: pretrained features reduce the data needed.
- B. Freeze early layers and fine-tune later ones **(key)**  
  _Rationale:_ Correct: this limits overfitting on little data.
- C. Train a large network from random weights  
  _Rationale:_ That overfits badly on a small dataset.
- D. Fine-tune every layer with a high learning rate  
  _Rationale:_ That destroys useful pretrained features.

**MST-0445-Q0003** (single-answer, Select ONE) Why is pixel accuracy misleading for segmentation with a large background class?

- A. Predicting mostly background scores high while missing small objects **(key)**  
  _Rationale:_ Correct: class imbalance inflates pixel accuracy.
- B. Pixel accuracy cannot be computed  
  _Rationale:_ It can be computed; it is just misleading.
- C. It only applies to detection  
  _Rationale:_ It is a segmentation metric.
- D. It ignores the background entirely  
  _Rationale:_ It counts background, which is exactly the problem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
