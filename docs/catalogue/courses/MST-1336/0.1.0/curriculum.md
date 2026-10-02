# Fine-Tuning LLMs (LoRA, PEFT)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1336` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why parameter-efficient fine-tuning is used instead of full fine-tuning
2. Describe how LoRA injects low-rank adapters into a model
3. Compare LoRA, prefix/prompt tuning and full fine-tuning
4. Prepare and format data for an instruction fine-tune
5. Evaluate a fine-tuned model and recognise overfitting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 When and why to fine-tune (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide between prompting, RAG and fine-tuning for a task; (2) Estimate the cost difference of full vs parameter-efficient tuning
- Common misconception addressed: Fine-tuning whenever a prompt could have solved the task
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Prompting vs RAG vs fine-tuning | 72 | 8 |
| M01L02 | The cost and risk of full fine-tuning | 72 | 8 |

### M02 LoRA and low-rank adapters (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify which layers to attach adapters to; (2) Explain how LoRA weights merge at inference
- Common misconception addressed: Thinking LoRA changes the base model weights in place
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Low-rank decomposition and adapters | 72 | 8 |
| M02L02 | Rank, alpha and where to apply LoRA | 72 | 8 |

### M03 Other PEFT methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Contrast prefix tuning with LoRA; (2) Pick a PEFT method for a tight memory budget
- Common misconception addressed: Assuming all PEFT methods behave identically
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prefix, prompt and (IA)^3 tuning | 72 | 8 |
| M03L02 | QLoRA and quantised fine-tuning | 72 | 8 |

### M04 Data preparation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Format examples into an instruction template; (2) Spot label leakage in a training set
- Common misconception addressed: Believing more data always beats cleaner data
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building an instruction dataset | 72 | 8 |
| M04L02 | Formatting, splits and leakage | 72 | 8 |

### M05 Evaluation and failure modes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a held-out evaluation for the fine-tune; (2) Diagnose catastrophic forgetting after tuning
- Common misconception addressed: Trusting training loss as proof of real improvement
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Measuring fine-tune quality | 72 | 8 |
| M05L02 | Overfitting and forgetting | 72 | 8 |

## Integrative case

A team wants a base LLM to follow a domain's house style without the cost of full fine-tuning. Choose a PEFT method, prepare an instruction dataset, set a small set of hyperparameters, and define how to judge whether the fine-tune improved behaviour without degrading general ability.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1336-final-protected | 25 | 25 | yes |
| MST-1336-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| When and why to fine-tune | 5 |
| LoRA and low-rank adapters | 5 |
| Other PEFT methods | 5 |
| Data preparation | 5 |
| Evaluation and failure modes | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1336-Q0001** (single-answer, Select ONE) What does LoRA change during fine-tuning?

- A. It trains small low-rank adapter matrices while the base weights stay frozen **(key)**  
  _Rationale:_ Correct: LoRA learns low-rank updates and leaves the base weights unchanged.
- B. It retrains every weight in the base model  
  _Rationale:_ That is full fine-tuning; LoRA freezes the base.
- C. It edits the tokenizer vocabulary  
  _Rationale:_ LoRA adds adapters to layers, not vocabulary entries.
- D. It increases the model's context window  
  _Rationale:_ Context length is unrelated to LoRA adapters.

**MST-1336-Q0002** (multiple-answer, Select TWO) Which TWO are advantages of parameter-efficient fine-tuning over full fine-tuning? (Select TWO.)

- A. Much lower GPU memory and storage requirements **(key)**  
  _Rationale:_ Correct: only small adapters are trained and stored.
- B. Easy swapping of task-specific adapters on one base model **(key)**  
  _Rationale:_ Correct: adapters can be attached or detached per task.
- C. It removes the need for any training data  
  _Rationale:_ PEFT still requires task data.
- D. It always reaches higher accuracy than full fine-tuning  
  _Rationale:_ Full fine-tuning can match or exceed PEFT; PEFT trades a little quality for efficiency.

**MST-1336-Q0003** (single-answer, Select ONE) After fine-tuning, the model follows the new style but now fails tasks it used to handle. What is this called?

- A. Catastrophic forgetting **(key)**  
  _Rationale:_ Correct: the model has lost prior general ability while adapting to new data.
- B. Quantisation error  
  _Rationale:_ That arises from low-precision numerics, not fine-tuning drift.
- C. Tokenisation mismatch  
  _Rationale:_ That is a vocabulary issue, not loss of general ability.
- D. Data leakage  
  _Rationale:_ Leakage inflates evaluation scores; it is not loss of prior ability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
