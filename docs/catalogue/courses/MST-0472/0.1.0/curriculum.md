# Advanced ChatGPT Prompting and Context Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0472` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **DESIGN ASSUMPTION** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Advanced ChatGPT Prompting and Context Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply systematic prompt patterns to control model behaviour
2. Keep long or multi-turn tasks accurate as context grows
3. Build checks that keep prompt output reliable
4. Apply confidentiality, accuracy and human-review controls to the workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of ChatGPT, the quality of live AI outputs, and professional judgement on accepting AI suggestions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 Prompt engineering foundations (25%, design assumption)

- Worked applications: (1) Convert a loose instruction into a role/task/constraints/format prompt; (2) Add few-shot examples to fix an inconsistent output
- Common misconception addressed: Believing clever wording matters more than clear structure and examples
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Role, task, constraints and format | 120 | 6 |
| M01L02 | Few-shot and example-driven prompting | 120 | 6 |
| M01L03 | Decomposition and chain-of-thought prompting | 120 | 6 |

### M02 Managing context and memory (25%, design assumption)

- Worked applications: (1) Restructure a long conversation so key facts are not lost; (2) Use summaries and references to stay within a context window
- Common misconception addressed: Assuming the model always remembers everything earlier in a long chat
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Context windows and token limits | 120 | 6 |
| M02L02 | Summarise-and-carry techniques | 120 | 6 |
| M02L03 | Persistent instructions and memory | 120 | 6 |

### M03 Evaluating and stabilising output (25%, design assumption)

- Worked applications: (1) Write an evaluation rubric for a repeated prompt; (2) Diagnose why a prompt drifts across runs and fix it
- Common misconception addressed: Treating one good output as proof a prompt is reliable
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Evaluation rubrics and test cases | 120 | 6 |
| M03L02 | Reducing variance and drift | 120 | 6 |
| M03L03 | Guardrails and refusal handling | 120 | 6 |

### M04 Govern and review AI output (25%, design assumption)

- Worked applications: (1) Draft a rule for what information may be pasted into ChatGPT for this task; (2) Design a human review checkpoint before the output is used or sent
- Common misconception addressed: Assuming AI output is accurate and confidential by default without any review
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Confidentiality and data handling | 120 | 6 |
| M04L02 | Accuracy, bias and disclosure | 120 | 6 |
| M04L03 | Human-in-the-loop review and sign-off | 120 | 6 |

## Integrative case

A solutions lead must design a reusable prompt system for a recurring analytics report: engineer a robust prompt with examples, manage a long context window without losing key facts, and add evaluation checks so the output quality stays stable across runs.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0472-final-protected | 108 | 108 | yes |
| MST-0472-final-alternate | 108 | 108 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Prompt engineering foundations | 27 |
| Managing context and memory | 27 |
| Evaluating and stabilising output | 27 |
| Govern and review AI output | 27 |

Minimum reviewed item bank: 612 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0472-Q0001** (single-answer, Select ONE) A prompt gives a good answer once but inconsistent answers on later runs. What is the best first fix?

- A. Add explicit constraints and few-shot examples **(key)**  
  _Rationale:_ Correct: constraints and examples anchor the model, reducing run-to-run variance.
- B. Delete all instructions and keep it short  
  _Rationale:_ Removing structure usually increases variability, not consistency.
- C. Switch to voice mode  
  _Rationale:_ The input channel does not address output consistency.
- D. Ask the same prompt louder in capitals  
  _Rationale:_ Formatting emphasis does not stabilise sampling variability.

**MST-0472-Q0002** (single-answer, Select ONE) In a very long conversation the model starts ignoring an early requirement. What is the most likely cause?

- A. Key context has fallen outside the effective context window **(key)**  
  _Rationale:_ Correct: as a conversation grows, earlier content can be truncated or deprioritised, so the requirement must be restated or summarised.
- B. The model has permanently forgotten how to follow rules  
  _Rationale:_ The model has not lost capability; the specific context is just no longer salient.
- C. The account tier changed automatically  
  _Rationale:_ Tier does not change mid-conversation and is unrelated to this behaviour.
- D. Few-shot examples always cause this  
  _Rationale:_ Examples help steer output and are not the cause of context loss.

**MST-0472-Q0003** (multiple-answer, Select TWO) Which TWO techniques help keep an important fact in play during a long task? (Select TWO)

- A. Periodically summarise and restate the key fact **(key)**  
  _Rationale:_ Correct: a running summary keeps essential context salient.
- B. Store it in persistent instructions or memory **(key)**  
  _Rationale:_ Correct: persistent instructions reintroduce the fact on every turn.
- C. Hope the model keeps it in mind  
  _Rationale:_ Relying on chance is not a control.
- D. Make the conversation as long as possible  
  _Rationale:_ Longer conversations increase the chance the fact is pushed out of context.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
