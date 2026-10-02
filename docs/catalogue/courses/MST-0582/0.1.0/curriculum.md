# Advanced Prompt Engineering for Reasoning and Decision Tasks

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0582` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Advanced Prompt Engineering for Reasoning and Decision Tasks (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design prompts that elicit structured, verifiable reasoning
2. Frame decision and planning tasks with explicit criteria
3. Reduce reasoning errors and overconfidence in model outputs
4. Measure and improve the reliability of reasoning outputs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Structured reasoning prompts (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Rewrite a prompt to decompose a problem into explicit steps; (2) Add a verification step that checks the model's own answer
- Common misconception addressed: Believing that asking a model to 'think step by step' guarantees correct reasoning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Step decomposition and intermediate reasoning | 80 | 5 |
| M01L02 | Self-consistency and verification | 80 | 5 |
| M01L03 | Reducing common reasoning errors | 80 | 5 |

### M02 Decision and planning prompts (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Write a prompt that scores options against stated criteria; (2) Require the model to cite the evidence behind a recommendation
- Common misconception addressed: Accepting a confident recommendation without checking its stated basis
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Framing decisions and criteria | 80 | 5 |
| M02L02 | Tool-use and function-call prompting | 80 | 5 |
| M02L03 | Guarding against overconfidence | 80 | 5 |

### M03 Reliability of reasoning outputs (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add a self-critique pass and compare it to the first answer; (2) Score reasoning outputs against a labelled evaluation set
- Common misconception addressed: Treating fluent explanations as proof the reasoning is sound
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checking and critiquing model reasoning | 80 | 5 |
| M03L02 | Handling ambiguity and refusal | 80 | 5 |
| M03L03 | Measuring reasoning quality | 80 | 5 |

## Integrative case

A model is used to triage and recommend actions on incoming cases. Design prompts that decompose the reasoning, apply explicit decision criteria, guard against overconfident or unsupported conclusions, and measure reasoning quality against a labelled set.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0582-final-protected | 30 | 30 | yes |
| MST-0582-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Structured reasoning prompts | 10 |
| Decision and planning prompts | 10 |
| Reliability of reasoning outputs | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0582-Q0001** (single-answer, Select ONE) You want more reliable reasoning on a multi-step task. Which approach is most defensible?

- A. Decompose the task into steps and add a verification step, then still validate against examples **(key)**  
  _Rationale:_ Correct: decomposition plus verification helps, but must be validated empirically.
- B. Add the phrase 'be 100% accurate' to the prompt  
  _Rationale:_ Assertions of accuracy do not change model behaviour.
- C. Raise the temperature to encourage creativity  
  _Rationale:_ Higher temperature usually harms reasoning reliability.
- D. Trust the longest answer the model gives  
  _Rationale:_ Answer length does not indicate correctness.

**MST-0582-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce overconfident, unsupported recommendations? (Select TWO.) (Select TWO.)

- A. Require the model to state the evidence and criteria behind each recommendation **(key)**  
  _Rationale:_ Correct: surfacing the basis makes unsupported claims visible.
- B. Evaluate recommendations against a labelled set before trusting them **(key)**  
  _Rationale:_ Correct: empirical evaluation grounds confidence in real performance.
- C. Instruct the model to always sound certain  
  _Rationale:_ Forcing certainty hides uncertainty and increases risk.
- D. Hide the decision criteria from the prompt  
  _Rationale:_ Omitting criteria makes recommendations harder to verify.

**MST-0582-Q0003** (single-answer, Select ONE) A model gives a fluent, confident explanation for its answer. What does this tell you about correctness?

- A. Little on its own; fluent explanations can accompany wrong answers and must be verified **(key)**  
  _Rationale:_ Correct: fluency and confidence are not evidence of correctness.
- B. The answer is certainly correct because the explanation is detailed  
  _Rationale:_ Detail does not establish correctness.
- C. The answer needs no checking  
  _Rationale:_ All reasoning outputs should be verified.
- D. Confidence language guarantees accuracy  
  _Rationale:_ Confident phrasing is unrelated to accuracy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
