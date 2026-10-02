# LangChain Application Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0608` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — LangChain Application Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compose LangChain building blocks: models, prompts and parsers
2. Build retrieval and tool-using chains with memory
3. Handle streaming, callbacks and observability
4. Test and handle errors in LangChain applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 LangChain building blocks (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Compose a prompt, model and output parser into a single chain; (2) Parse model output into a validated structured object
- Common misconception addressed: Treating an output parser as a guarantee that the model returns valid structure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Models, prompts and output parsers | 80 | 5 |
| M01L02 | Chains and composition | 80 | 5 |
| M01L03 | Managing configuration | 80 | 5 |

### M02 Retrieval and tools (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add a retriever so the chain answers from a document store; (2) Expose a tool the model can call and validate its inputs
- Common misconception addressed: Trusting tool arguments produced by the model without validating them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Retrievers and vector stores | 80 | 5 |
| M02L02 | Tools and function calling | 80 | 5 |
| M02L03 | Memory and state | 80 | 5 |

### M03 Production concerns (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add tracing so each chain step can be inspected; (2) Add error handling for a failing tool or model call
- Common misconception addressed: Shipping a chain with no tracing and no handling of failed steps
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Streaming and callbacks | 80 | 5 |
| M03L02 | Observability and tracing | 80 | 5 |
| M03L03 | Error handling and testing | 80 | 5 |

## Integrative case

A team builds a retrieval-and-tools assistant with LangChain. Compose models, prompts and output parsers into chains, add retrieval, tools and memory, wire up streaming and tracing, and add error handling and tests before release.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0608-final-protected | 30 | 30 | yes |
| MST-0608-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| LangChain building blocks | 10 |
| Retrieval and tools | 10 |
| Production concerns | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0608-Q0001** (single-answer, Select ONE) You add an output parser to a LangChain chain. What should you still do?

- A. Validate the parsed result and handle the case where the model returns invalid structure **(key)**  
  _Rationale:_ Correct: parsers can fail, so validation and a fallback are still required.
- B. Assume the model always returns valid structured output  
  _Rationale:_ Models can and do return malformed output.
- C. Remove all error handling once a parser is present  
  _Rationale:_ Parsers do not remove the need for error handling.
- D. Skip tests because the parser guarantees correctness  
  _Rationale:_ A parser guarantees neither validity nor correctness.

**MST-0608-Q0002** (multiple-answer, Select TWO) Which TWO practices make a tool-using LangChain app safer? (Select TWO.) (Select TWO.)

- A. Validate tool arguments the model produces before executing them **(key)**  
  _Rationale:_ Correct: model-produced arguments are untrusted and must be validated.
- B. Constrain what each tool is allowed to do **(key)**  
  _Rationale:_ Correct: least-privilege tools limit the blast radius of mistakes.
- C. Let the model call any tool with any arguments  
  _Rationale:_ Unconstrained tool calls are a safety risk.
- D. Hide tool errors from logs and tracing  
  _Rationale:_ Hiding errors prevents diagnosis and monitoring.

**MST-0608-Q0003** (single-answer, Select ONE) A LangChain chain fails intermittently in production and is hard to diagnose. What is the first thing to add?

- A. Tracing/observability so each step's input and output can be inspected **(key)**  
  _Rationale:_ Correct: step-level tracing is what makes intermittent failures diagnosable.
- B. A longer prompt  
  _Rationale:_ Prompt length does not help diagnose failures.
- C. A larger model with no logging  
  _Rationale:_ Without logging the failure is still opaque.
- D. Removing the retriever  
  _Rationale:_ Removing components blindly is not a diagnostic step.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
