# Fine-Tuning and Model Adaptation for Large Language Models

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2059` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Specific fine-tuning APIs, methods and pricing must be re-checked against current provider docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fine-Tuning and Model Adaptation for Large Language Models (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Decide when fine-tuning is justified versus prompting, RAG or longer context
2. Distinguish full fine-tuning, parameter-efficient methods (e.g. LoRA) and instruction tuning
3. Build and curate a high-quality supervised fine-tuning dataset
4. Run a fine-tune and read training signals such as loss and overfitting
5. Evaluate an adapted model against the base model honestly and guard against regressions
6. Weigh cost, maintenance and data-governance implications of owning a fine-tune

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 When to adapt a model (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide for a style-consistency task whether fine-tuning or prompting fits; (2) Reject fine-tuning for a frequently-changing-facts task and justify RAG instead
- Common misconception addressed: Reaching for fine-tuning to add fresh factual knowledge that changes weekly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Fine-tuning vs prompting vs RAG vs long context | 120 | 7 |
| M01L02 | Problems fine-tuning solves well and ones it does not | 120 | 7 |

### M02 Methods of adaptation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose LoRA over full fine-tuning for a small budget and explain the trade-off; (2) Match instruction tuning to a task needing better instruction-following
- Common misconception addressed: Believing parameter-efficient tuning changes the whole model like full fine-tuning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Full fine-tuning vs parameter-efficient (LoRA/adapters) | 120 | 7 |
| M02L02 | Instruction tuning and preference-based adaptation at a high level | 120 | 7 |

### M03 Data for fine-tuning (25% (Mastemy design weight), design weight)

- Worked applications: (1) Curate 500 clean examples and remove duplicates and test-set leakage; (2) Balance a dataset skewed toward one label
- Common misconception addressed: Assuming more data always beats fewer, higher-quality examples
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Curating, formatting and cleaning a supervised dataset | 120 | 7 |
| M03L02 | Dataset size, balance, leakage and quality over quantity | 120 | 7 |

### M04 Training, evaluation and ownership (25% (Mastemy design weight), design weight)

- Worked applications: (1) Spot overfitting from a training-vs-validation loss gap; (2) Compare the fine-tuned and base model on a held-out set before shipping
- Common misconception addressed: Declaring a fine-tune better without comparing it to the base model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading loss curves, overfitting and basic hyperparameters | 120 | 7 |
| M04L02 | Comparing to the base model and the cost of maintaining a fine-tune | 120 | 7 |

## Integrative case

A company wants its assistant to always answer in a specific brand voice and format: decide whether fine-tuning beats prompting, pick a parameter-efficient method on a budget, curate and de-leak a supervised dataset, read the loss curves for overfitting, and compare honestly against the base model before adopting it.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2059-final-protected | 40 | 40 | yes |
| MST-2059-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| When to adapt a model | 10 |
| Methods of adaptation | 10 |
| Data for fine-tuning | 10 |
| Training, evaluation and ownership | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2059-Q0001** (single-answer, Select ONE) A team wants the model to know this week's prices, which change constantly. Why is fine-tuning a poor fit?

- A. Fine-tuning bakes knowledge into weights and cannot be cheaply updated each week; retrieval keeps changing facts current **(key)**  
  _Rationale:_ Correct: volatile facts belong in retrieval, not in fine-tuned weights.
- B. Fine-tuning can never change model behaviour  
  _Rationale:_ It can change behaviour; the issue is updating volatile facts.
- C. Prices cannot be represented as text  
  _Rationale:_ They can; the problem is update frequency.
- D. Fine-tuning is always cheaper than retrieval  
  _Rationale:_ For frequently changing data, re-tuning is costly, not cheaper.

**MST-2059-Q0002** (multiple-answer, Select TWO) Which TWO are advantages of parameter-efficient fine-tuning (e.g. LoRA) over full fine-tuning? (Select TWO.)

- A. Lower compute and memory cost to train **(key)**  
  _Rationale:_ Correct: only a small set of added parameters is trained.
- B. Smaller artefacts that are easier to store and swap **(key)**  
  _Rationale:_ Correct: adapters are small compared with full model copies.
- C. It guarantees higher accuracy than full fine-tuning in all cases  
  _Rationale:_ It does not guarantee higher accuracy; it trades some capacity for efficiency.
- D. It removes the need for any training data  
  _Rationale:_ Training data is still required.

**MST-2059-Q0003** (single-answer, Select ONE) Training loss keeps falling but validation loss starts rising. What does this indicate?

- A. Overfitting: the model is memorising the training set and generalising worse **(key)**  
  _Rationale:_ Correct: a widening train/validation gap is the classic overfitting signal.
- B. The dataset is too small to train at all  
  _Rationale:_ Training loss is improving, so training is happening; the issue is generalisation.
- C. The learning rate is zero  
  _Rationale:_ A zero learning rate would not lower training loss.
- D. Fine-tuning has finished successfully  
  _Rationale:_ Rising validation loss means it should stop earlier, not that it succeeded.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
