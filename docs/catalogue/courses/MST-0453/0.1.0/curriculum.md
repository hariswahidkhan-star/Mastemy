# Fine-Tuning Language Models with Parameter-Efficient Methods

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0453` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Why parameter-efficient tuning
2. Adapter and LoRA methods
3. Prompt and prefix methods
4. Practice and evaluation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why parameter-efficient tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare cost of full tuning vs PEFT; (2) Decide adapt vs prompt for a task
- Common misconception addressed: Full fine-tuning a huge model for a tiny dataset
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Full fine-tuning vs PEFT | 120 | 8 |
| M01L02 | When to adapt rather than retrain | 120 | 8 |

### M02 Adapter and LoRA methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a LoRA rank for a budget; (2) Insert adapters into a transformer block
- Common misconception addressed: Setting LoRA rank far higher than needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Adapters and bottleneck layers | 120 | 8 |
| M02L02 | LoRA and low-rank updates | 120 | 8 |

### M03 Prompt and prefix methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a soft-prompt setup; (2) Compare prompt tuning to LoRA on data size
- Common misconception addressed: Expecting soft prompts to match full tuning on every task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prompt tuning and soft prompts | 120 | 8 |
| M03L02 | Prefix tuning and comparisons | 120 | 8 |

### M04 Practice and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Serve multiple LoRA adapters efficiently; (2) Evaluate an adapted model for regressions
- Common misconception addressed: Forgetting to test the base task after adaptation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Merging, serving and multiple adapters | 120 | 8 |
| M04L02 | Evaluating adapted models | 120 | 8 |

## Integrative case

A team must adapt one base model to five customer domains cheaply. Choose between LoRA, adapters and prompt tuning given data and serving constraints, plan how to serve multiple adapters, and evaluate each without degrading the base behaviour.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0453-final-protected | 20 | 20 | yes |
| MST-0453-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why parameter-efficient tuning | 5 |
| Adapter and LoRA methods | 5 |
| Prompt and prefix methods | 5 |
| Practice and evaluation | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0453-Q0001** (single-answer, Select ONE) What does LoRA change during fine-tuning to save memory and compute?

- A. It trains small low-rank update matrices while freezing the base weights **(key)**  
  _Rationale:_ Correct: LoRA learns low-rank deltas and keeps base weights frozen.
- B. It retrains all base weights at higher precision  
  _Rationale:_ That is full fine-tuning, the opposite of LoRA.
- C. It deletes layers from the model  
  _Rationale:_ LoRA does not remove layers.
- D. It changes the tokenizer only  
  _Rationale:_ LoRA adapts weights, not the tokenizer.

**MST-0453-Q0002** (multiple-answer, Select TWO) Which TWO are advantages of parameter-efficient fine-tuning over full fine-tuning? (Select TWO.)

- A. Much lower memory and storage per task **(key)**  
  _Rationale:_ Correct: only small adapter weights are trained and stored.
- B. Easier to serve many task-specific adapters from one base **(key)**  
  _Rationale:_ Correct: adapters can be swapped on a shared base.
- C. It always reaches higher accuracy than full tuning  
  _Rationale:_ PEFT may trail full tuning on some tasks.
- D. It removes the need for any training data  
  _Rationale:_ Training data is still required.

**MST-0453-Q0003** (single-answer, Select ONE) Why can setting the LoRA rank much higher than necessary be wasteful?

- A. It adds trainable parameters and cost with little accuracy gain **(key)**  
  _Rationale:_ Correct: beyond a point extra rank gives diminishing returns.
- B. It freezes the base model  
  _Rationale:_ Rank does not control base-weight freezing.
- C. It changes the vocabulary  
  _Rationale:_ Rank is unrelated to vocabulary.
- D. It makes the model untrainable  
  _Rationale:_ A higher rank is still trainable, just costlier.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
