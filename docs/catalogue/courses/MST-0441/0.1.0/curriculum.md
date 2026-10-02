# Deep Learning with PyTorch

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0441` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-DLP-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Work with tensors and autograd in PyTorch
2. Define models with the nn module
3. Build data pipelines with Dataset and DataLoader
4. Write correct training and validation loops
5. Apply optimisation, regularisation and schedulers
6. Save, load and debug models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Tensors and autograd (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute gradients with autograd by hand; (2) Move tensors and a model to a device
- Common misconception addressed: Forgetting to zero gradients between steps
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tensors and operations | 160 | 8 |
| M01L02 | Autograd and computation graphs | 160 | 8 |

### M02 Building models (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define a multi-layer network with nn; (2) Write a custom module's forward pass
- Common misconception addressed: Putting non-differentiable logic inside forward
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The nn module and layers | 160 | 8 |
| M02L02 | Custom modules and forward | 160 | 8 |

### M03 Data pipelines (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a custom Dataset; (2) Build a DataLoader with transforms
- Common misconception addressed: Shuffling the validation loader
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Dataset and DataLoader | 160 | 8 |
| M03L02 | Transforms and batching | 160 | 8 |

### M04 Training loops (MASTEMY-DESIGN 17%)

- Worked applications: (1) Implement a correct train/validate loop; (2) Track loss and a metric per epoch
- Common misconception addressed: Leaving the model in train mode during evaluation
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The training loop | 160 | 8 |
| M04L02 | Validation and metrics | 160 | 8 |

### M05 Optimisation and regularisation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a learning-rate scheduler; (2) Apply dropout and weight decay
- Common misconception addressed: Using a learning rate that is too high to converge
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Optimisers and schedulers | 160 | 8 |
| M05L02 | Regularisation and early stopping | 160 | 8 |

### M06 Saving and debugging (MASTEMY-DESIGN 16%)

- Worked applications: (1) Save and reload a model for inference; (2) Diagnose a loss that is not decreasing
- Common misconception addressed: Saving only weights but losing the architecture definition
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Checkpoints and inference | 160 | 8 |
| M06L02 | Debugging training runs | 160 | 8 |

## Integrative case

Build an image classifier in PyTorch end to end: define a model and dataset pipeline, write a correct training and validation loop, use the autograd and optimiser APIs properly, add regularisation and checkpointing, and diagnose a training run that is not converging.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0441-final-protected | 30 | 30 | yes |
| MST-0441-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tensors and autograd | 5 |
| Building models | 5 |
| Data pipelines | 5 |
| Training loops | 5 |
| Optimisation and regularisation | 5 |
| Saving and debugging | 5 |

Minimum reviewed item bank: 588 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0441-Q0001** (single-answer, Select ONE) In a PyTorch training loop, what does optimizer.zero_grad() prevent?

- A. Gradients from accumulating across batches **(key)**  
  _Rationale:_ Correct: PyTorch accumulates gradients, so they must be reset.
- B. The model from loading to the GPU  
  _Rationale:_ It is unrelated to device placement.
- C. The loss from being computed  
  _Rationale:_ It does not affect loss computation.
- D. Weights from being initialised  
  _Rationale:_ Initialisation happens separately.

**MST-0441-Q0002** (multiple-answer, Select TWO) Which TWO are required for a correct validation step? (Select TWO.)

- A. Call model.eval() to set evaluation behaviour **(key)**  
  _Rationale:_ Correct: it switches dropout and batch norm to inference mode.
- B. Wrap the forward pass in torch.no_grad() **(key)**  
  _Rationale:_ Correct: it avoids building the graph and saves memory.
- C. Call loss.backward() on the validation batch  
  _Rationale:_ Backprop should not run during validation.
- D. Leave the model in training mode  
  _Rationale:_ Training mode changes dropout/batch-norm behaviour incorrectly.

**MST-0441-Q0003** (single-answer, Select ONE) Training loss is NaN after a few steps. Which cause is most likely?

- A. The learning rate is too high, causing diverging updates **(key)**  
  _Rationale:_ Correct: an excessive learning rate commonly produces NaNs.
- B. The dataset has too many samples  
  _Rationale:_ Dataset size does not cause NaNs.
- C. Dropout is enabled  
  _Rationale:_ Dropout alone does not cause NaN loss.
- D. The model was moved to the GPU  
  _Rationale:_ Device placement does not cause NaNs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
