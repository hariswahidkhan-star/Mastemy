# Edge AI and On-Device Inference

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1355` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Edge AI fundamentals
2. Model compression for the edge
3. Runtimes and hardware
4. Deployment and lifecycle on the edge

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Edge AI fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Decide edge vs cloud for a use case; (2) List constraints of a target device
- Common misconception addressed: Assuming the cloud is always the right place to run a model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why run inference on-device | 120 | 8 |
| M01L02 | Edge vs cloud trade-offs | 120 | 8 |

### M02 Model compression for the edge (MASTEMY-DESIGN 25%)

- Worked applications: (1) Quantise a model for a microcontroller; (2) Distil a model to fit a memory budget
- Common misconception addressed: Deploying a full-size model to a device with tiny memory
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Quantisation and pruning for small devices | 120 | 8 |
| M02L02 | Knowledge distillation | 120 | 8 |

### M03 Runtimes and hardware (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick a runtime for a mobile target; (2) Map ops to an available accelerator
- Common misconception addressed: Ignoring which operators the target hardware actually supports
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | TFLite, ONNX Runtime and Core ML | 120 | 8 |
| M03L02 | NPUs, DSPs and accelerators | 120 | 8 |

### M04 Deployment and lifecycle on the edge (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design an OTA model update flow; (2) Collect metrics without leaking data
- Common misconception addressed: Treating edge models as fire-and-forget with no update path
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Over-the-air model updates | 120 | 8 |
| M04L02 | On-device monitoring and privacy | 120 | 8 |

## Integrative case

A factory wants defect detection on cameras with no reliable network, limited memory and a privacy mandate. Choose edge vs cloud, compress the model to fit, pick a runtime that matches the hardware's operators, and design OTA updates and privacy-safe monitoring.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1355-final-protected | 20 | 20 | yes |
| MST-1355-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Edge AI fundamentals | 5 |
| Model compression for the edge | 5 |
| Runtimes and hardware | 5 |
| Deployment and lifecycle on the edge | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1355-Q0001** (single-answer, Select ONE) A device has 256 KB of RAM and no network. Which approach fits best?

- A. A heavily quantised/distilled model running fully on-device **(key)**  
  _Rationale:_ Correct: tight memory and no network demand a small on-device model.
- B. Streaming every frame to a cloud GPU  
  _Rationale:_ Impossible without a reliable network.
- C. A full-precision large model on the device  
  _Rationale:_ It will not fit in 256 KB.
- D. Running inference only when Wi-Fi is available  
  _Rationale:_ Contradicts the offline requirement.

**MST-1355-Q0002** (multiple-answer, Select TWO) Which TWO factors most constrain which model you can deploy to an edge device? (Select TWO.)

- A. Available memory/storage on the device **(key)**  
  _Rationale:_ Correct: model size must fit the device.
- B. Operators supported by the device's runtime/accelerator **(key)**  
  _Rationale:_ Correct: unsupported ops force fallback or failure.
- C. The colour of the device case  
  _Rationale:_ Irrelevant to inference.
- D. The cloud region of your training cluster  
  _Rationale:_ Training location does not constrain on-device inference.

**MST-1355-Q0003** (single-answer, Select ONE) Why plan over-the-air (OTA) model updates for edge deployments?

- A. Models need fixes and retraining over time; devices must be updatable safely **(key)**  
  _Rationale:_ Correct: an update path is essential for the model lifecycle at the edge.
- B. Models on the edge never need changing  
  _Rationale:_ They do, as data and requirements change.
- C. OTA updates improve the camera lens  
  _Rationale:_ OTA updates software/models, not hardware optics.
- D. It removes the need for compression  
  _Rationale:_ Compression is still needed to fit the device.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
