# Model Compression and Quantisation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1335` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain how quantisation reduces model size and latency
2. Distinguish post-training quantisation from quantisation-aware training
3. Describe pruning and knowledge distillation as compression techniques
4. Evaluate the accuracy-versus-efficiency trade-off of a compressed model
5. Choose a compression approach for a given deployment target

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Numerical precision and quantisation basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute the size saving from FP32 to INT8; (2) Explain why activations and weights may use different precision
- Common misconception addressed: Assuming lower precision always destroys accuracy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Floating point, INT8 and model size | 120 | 8 |
| M01L02 | How quantisation affects accuracy and speed | 120 | 8 |

### M02 Post-training quantisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Calibrate a model with a representative dataset; (2) Decide between dynamic and static quantisation
- Common misconception addressed: Believing PTQ needs the original training pipeline
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Dynamic and static PTQ | 120 | 8 |
| M02L02 | Calibration and per-channel scaling | 120 | 8 |

### M03 Quantisation-aware training (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain when QAT is worth its extra cost; (2) Trace fake-quantisation during training
- Common misconception addressed: Thinking QAT and PTQ give identical accuracy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Simulated quantisation in training | 120 | 8 |
| M03L02 | When QAT beats PTQ | 120 | 8 |

### M04 Pruning and sparsity (MASTEMY-DESIGN 20%)

- Worked applications: (1) Distinguish structured from unstructured pruning; (2) Judge whether sparsity yields real speed-up on target hardware
- Common misconception addressed: Assuming any pruning speeds up inference on any hardware
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Magnitude pruning and structured sparsity | 120 | 8 |
| M04L02 | Hardware support for sparse inference | 120 | 8 |

### M05 Distillation and combining methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set up a teacher-student distillation; (2) Stack distillation with quantisation and measure quality
- Common misconception addressed: Expecting a student to always match the teacher
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Knowledge distillation | 120 | 8 |
| M05L02 | Combining compression techniques responsibly | 120 | 8 |

## Integrative case

A model must run on a memory-limited edge device within a latency budget. Select and combine compression techniques, measure the accuracy drop against a quality bar, and recommend the configuration that meets the constraint with the least quality loss.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1335-final-protected | 25 | 25 | yes |
| MST-1335-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Numerical precision and quantisation basics | 5 |
| Post-training quantisation | 5 |
| Quantisation-aware training | 5 |
| Pruning and sparsity | 5 |
| Distillation and combining methods | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1335-Q0001** (single-answer, Select ONE) Converting a model's weights from FP32 to INT8 most directly achieves which outcome?

- A. About a 4x reduction in weight memory footprint **(key)**  
  _Rationale:_ Correct: INT8 uses 8 bits vs 32, roughly quartering weight storage.
- B. A guaranteed increase in model accuracy  
  _Rationale:_ Quantisation typically reduces or holds accuracy; it does not raise it.
- C. Automatic removal of redundant layers  
  _Rationale:_ That is pruning, not quantisation.
- D. Elimination of the need for calibration data  
  _Rationale:_ Static PTQ still needs calibration data to set scales.

**MST-1335-Q0002** (multiple-answer, Select TWO) Which TWO statements about quantisation-aware training (QAT) are correct? (Select TWO.)

- A. QAT simulates quantisation during training so the model adapts to it **(key)**  
  _Rationale:_ Correct: QAT inserts fake-quant ops so weights learn to tolerate low precision.
- B. QAT generally recovers more accuracy than post-training quantisation at very low precision **(key)**  
  _Rationale:_ Correct: by training under quantisation, QAT usually beats PTQ at aggressive bit-widths.
- C. QAT requires no access to training data or pipeline  
  _Rationale:_ QAT needs the training loop and data; PTQ is the data-light option.
- D. QAT is always cheaper than PTQ  
  _Rationale:_ QAT adds training cost, so it is more expensive, not cheaper.

**MST-1335-Q0003** (single-answer, Select ONE) Unstructured magnitude pruning yields a sparse model but no speed-up on the target device. What is the most likely reason?

- A. The hardware and runtime do not exploit unstructured sparsity **(key)**  
  _Rationale:_ Correct: without sparse kernel support, zeros are still computed, so no speed-up.
- B. Pruning never reduces the number of parameters  
  _Rationale:_ Pruning does zero out parameters; the issue is hardware exploitation.
- C. The model was quantised instead of pruned  
  _Rationale:_ The scenario states pruning was applied.
- D. Sparsity always slows inference  
  _Rationale:_ Sparsity can speed inference where supported; here support is absent.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
