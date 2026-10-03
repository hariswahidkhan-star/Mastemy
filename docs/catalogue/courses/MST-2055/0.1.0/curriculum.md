# Applied Prompt Engineering for Production LLM Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2055` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Model-specific prompting behaviour must be re-checked against current provider docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Applied Prompt Engineering for Production LLM Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write clear, testable prompts with explicit instructions, roles and output contracts
2. Apply few-shot examples, structured output and delimiters to control model behaviour
3. Decompose complex tasks and use reasoning-elicitation techniques appropriately
4. Build prompts that degrade safely and handle ambiguous or adversarial input
5. Version, test and regression-check prompts like code
6. Reduce cost and latency by trimming prompts without losing quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Prompt anatomy (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rewrite a vague instruction into one with a role, constraints and an output schema; (2) Add delimiters so user text cannot be confused with instructions
- Common misconception addressed: Believing a longer, more verbose prompt is automatically a better prompt
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instructions, roles, context and an explicit output contract | 120 | 7 |
| M01L02 | Delimiters, formatting and reducing ambiguity | 120 | 7 |

### M02 Techniques that work (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add three few-shot examples and measure whether accuracy improves; (2) Decide a simple classification needs zero-shot, not chain-of-thought
- Common misconception addressed: Adding reasoning-elicitation to every prompt even when it only adds cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Few-shot examples and when zero-shot is better | 120 | 7 |
| M02L02 | Structured output and reasoning-elicitation used appropriately | 120 | 7 |

### M03 Robust prompts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design a fallback when the user input is empty or off-topic; (2) Harden a prompt against an instruction-injection attempt in user text
- Common misconception addressed: Assuming users will always provide well-formed, in-scope input
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Handling ambiguous, empty and adversarial inputs | 120 | 7 |
| M03L02 | Safe fallbacks and refusing out-of-scope requests | 120 | 7 |

### M04 Prompts as engineering artefacts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Put a prompt under version control and write regression tests for it; (2) Cut a 2,000-token prompt to 800 tokens and check quality held
- Common misconception addressed: Editing a production prompt directly with no test to catch regressions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Versioning prompts and building a regression test set | 120 | 7 |
| M04L02 | Trimming tokens for cost and latency without losing quality | 120 | 7 |

## Integrative case

A product team ships an LLM feature that classifies and routes customer messages: write a prompt with an explicit output contract, add few-shot examples only where they help, harden it against injection and empty input, put it under version control with a regression suite, and trim tokens to hit a latency budget.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2055-final-protected | 40 | 40 | yes |
| MST-2055-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Prompt anatomy | 10 |
| Techniques that work | 10 |
| Robust prompts | 10 |
| Prompts as engineering artefacts | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2055-Q0001** (single-answer, Select ONE) A classification prompt works in testing but occasionally obeys instructions hidden inside the user's message. What is the most direct mitigation?

- A. Separate user content from instructions with delimiters and tell the model to treat delimited text as data, not commands **(key)**  
  _Rationale:_ Correct: isolating untrusted input reduces instruction injection.
- B. Increase max output tokens  
  _Rationale:_ Output length does not address injection.
- C. Switch to zero-shot  
  _Rationale:_ Few-shot vs zero-shot is unrelated to injection defence.
- D. Raise the temperature  
  _Rationale:_ More randomness does not prevent obeying injected instructions.

**MST-2055-Q0002** (multiple-answer, Select TWO) Which TWO practices make a production prompt maintainable like code? (Select TWO.)

- A. Keeping the prompt under version control with a change history **(key)**  
  _Rationale:_ Correct: versioning tracks changes and enables rollback.
- B. Maintaining a regression test set run on every prompt change **(key)**  
  _Rationale:_ Correct: tests catch quality regressions before release.
- C. Editing the live prompt by hand whenever output looks wrong  
  _Rationale:_ Untracked hand-edits are exactly what to avoid.
- D. Avoiding any examples because they take tokens  
  _Rationale:_ Dropping helpful examples to save tokens can hurt quality; it is not a maintainability practice.

**MST-2055-Q0003** (single-answer, Select ONE) When is adding few-shot examples most likely to help?

- A. When the desired output format or edge-case handling is hard to specify in words alone **(key)**  
  _Rationale:_ Correct: examples convey format and edge cases that prose struggles to pin down.
- B. For every prompt, without exception  
  _Rationale:_ Examples add cost and are not always needed.
- C. Only when the temperature is zero  
  _Rationale:_ Few-shot usefulness is independent of temperature.
- D. Never, because examples always reduce accuracy  
  _Rationale:_ Examples often improve accuracy for format-sensitive tasks.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
