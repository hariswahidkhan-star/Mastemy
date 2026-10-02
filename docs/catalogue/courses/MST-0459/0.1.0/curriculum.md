# Hugging Face Transformers and Model Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0459` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Transformers library basics
2. Working with datasets
3. Training and fine-tuning
4. Sharing and serving

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Transformers library basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run a sentiment pipeline end to end; (2) Load a tokenizer and model by name
- Common misconception addressed: Mismatching a tokenizer with a different model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pipelines and the model hub | 120 | 8 |
| M01L02 | Tokenizers, models and configs | 120 | 8 |

### M02 Working with datasets (MASTEMY-DESIGN 20%)

- Worked applications: (1) Tokenize a dataset with map and batching; (2) Create train/validation splits
- Common misconception addressed: Tokenizing without truncation and overflowing the context
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Loading and mapping datasets | 120 | 8 |
| M02L02 | Preprocessing and batching | 120 | 8 |

### M03 Training and fine-tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Configure a Trainer for classification; (2) Evaluate a fine-tuned model
- Common misconception addressed: Forgetting to set evaluation during training
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The Trainer API and training loop | 120 | 8 |
| M03L02 | Fine-tuning and evaluation | 120 | 8 |

### M04 Sharing and serving (MASTEMY-DESIGN 20%)

- Worked applications: (1) Push a fine-tuned model to the hub; (2) Serve a model for inference
- Common misconception addressed: Hardcoding paths that break when others load the model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Saving, loading and the hub | 120 | 8 |
| M04L02 | Inference and deployment options | 120 | 8 |

## Integrative case

Build a text-classification feature using the Transformers ecosystem: load a suitable model and tokenizer, prepare a dataset, fine-tune with the Trainer, evaluate correctly, and share the result for reuse and serving.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0459-final-protected | 20 | 20 | yes |
| MST-0459-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Transformers library basics | 5 |
| Working with datasets | 5 |
| Training and fine-tuning | 5 |
| Sharing and serving | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0459-Q0001** (single-answer, Select ONE) Why must the tokenizer match the specific model you load?

- A. Each model expects the vocabulary and tokenization it was trained with **(key)**  
  _Rationale:_ Correct: a mismatched tokenizer produces inputs the model never learned.
- B. Tokenizers are interchangeable across all models  
  _Rationale:_ They are not; they are tied to the model.
- C. The tokenizer sets the learning rate  
  _Rationale:_ It does not control training hyperparameters.
- D. A tokenizer is only needed for images  
  _Rationale:_ Tokenizers handle text inputs.

**MST-0459-Q0002** (multiple-answer, Select TWO) Which TWO steps are part of preparing a dataset for fine-tuning with the library? (Select TWO.)

- A. Tokenizing the text with truncation and padding **(key)**  
  _Rationale:_ Correct: inputs must be tokenized and shaped for batching.
- B. Creating train and validation splits **(key)**  
  _Rationale:_ Correct: a held-out split is needed to evaluate.
- C. Deleting the tokenizer before training  
  _Rationale:_ The tokenizer is required to process inputs.
- D. Training without any evaluation data  
  _Rationale:_ Evaluation data is needed to measure progress.

**MST-0459-Q0003** (single-answer, Select ONE) What does setting evaluation during training with the Trainer let you do?

- A. Track validation metrics and catch overfitting across epochs **(key)**  
  _Rationale:_ Correct: periodic evaluation reveals overfitting and progress.
- B. Skip the need for a validation set  
  _Rationale:_ Evaluation needs a validation set.
- C. Guarantee the best possible accuracy  
  _Rationale:_ It monitors, it does not guarantee results.
- D. Change the tokenizer automatically  
  _Rationale:_ It does not alter the tokenizer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
