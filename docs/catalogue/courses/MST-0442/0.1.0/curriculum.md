# Deep Learning with TensorFlow and Keras

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0442` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-DLTK-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use tensors and automatic differentiation in TensorFlow
2. Build models with the Keras Sequential and functional APIs
3. Create input pipelines with tf.data
4. Train with the fit API and callbacks
5. Apply regularisation and custom training where needed
6. Export, save and serve models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 TensorFlow basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Differentiate a function with GradientTape; (2) Convert a NumPy workflow to tensors
- Common misconception addressed: Mixing eager and graph assumptions
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tensors and operations | 160 | 8 |
| M01L02 | GradientTape and autodiff | 160 | 8 |

### M02 Keras models (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a branching model with the functional API; (2) Choose a loss and metric for a task
- Common misconception addressed: Using the Sequential API for a multi-input model
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sequential and functional APIs | 160 | 8 |
| M02L02 | Layers, losses and metrics | 160 | 8 |

### M03 Input pipelines (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a tf.data pipeline from files; (2) Add prefetching to speed up training
- Common misconception addressed: Rebuilding the dataset every epoch
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | tf.data basics | 160 | 8 |
| M03L02 | Performance: batch, cache, prefetch | 160 | 8 |

### M04 Training with Keras (MASTEMY-DESIGN 17%)

- Worked applications: (1) Train a model with early-stopping callbacks; (2) Add checkpointing and TensorBoard logging
- Common misconception addressed: Ignoring validation metrics during fit
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | compile and fit | 160 | 8 |
| M04L02 | Callbacks and monitoring | 160 | 8 |

### M05 Regularisation and custom loops (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add dropout and batch normalisation; (2) Write a custom training step
- Common misconception addressed: Applying batch norm incorrectly at inference
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Regularisation techniques | 160 | 8 |
| M05L02 | Custom training loops | 160 | 8 |

### M06 Saving and serving (MASTEMY-DESIGN 16%)

- Worked applications: (1) Export and reload a SavedModel; (2) Verify a served model's predictions
- Common misconception addressed: Saving in a format the serving stack cannot load
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | SavedModel and formats | 160 | 8 |
| M06L02 | Serving and inference | 160 | 8 |

## Integrative case

Build and deploy a text classifier using TensorFlow and Keras: assemble a tf.data pipeline, define a model with the functional API, train with callbacks, tune regularisation, then export a SavedModel and verify it serves correct predictions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0442-final-protected | 30 | 30 | yes |
| MST-0442-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| TensorFlow basics | 5 |
| Keras models | 5 |
| Input pipelines | 5 |
| Training with Keras | 5 |
| Regularisation and custom loops | 5 |
| Saving and serving | 5 |

Minimum reviewed item bank: 588 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0442-Q0001** (single-answer, Select ONE) What does tf.GradientTape do?

- A. Records operations so gradients can be computed via automatic differentiation **(key)**  
  _Rationale:_ Correct: the tape tracks ops for backprop.
- B. Saves the model to disk  
  _Rationale:_ Saving uses SavedModel, not the tape.
- C. Serves the model for inference  
  _Rationale:_ Serving is a separate concern.
- D. Loads data from files  
  _Rationale:_ Data loading uses tf.data, not the tape.

**MST-0442-Q0002** (multiple-answer, Select TWO) Which TWO tf.data steps improve input-pipeline performance? (Select TWO.)

- A. prefetch to overlap preprocessing with training **(key)**  
  _Rationale:_ Correct: prefetching hides input latency.
- B. cache to avoid recomputing expensive steps each epoch **(key)**  
  _Rationale:_ Correct: caching reuses processed data.
- C. Rebuilding the dataset object every epoch  
  _Rationale:_ That adds overhead and defeats caching.
- D. Setting batch size to one for large datasets  
  _Rationale:_ Tiny batches hurt throughput.

**MST-0442-Q0003** (single-answer, Select ONE) Which Keras API best fits a model with two separate inputs merged later?

- A. The functional API **(key)**  
  _Rationale:_ Correct: it supports multi-input, branching graphs.
- B. The Sequential API  
  _Rationale:_ Sequential supports only a single linear stack.
- C. The optimizer API  
  _Rationale:_ Optimisers do not define model topology.
- D. The callbacks API  
  _Rationale:_ Callbacks monitor training, not architecture.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
