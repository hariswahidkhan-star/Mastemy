# Agent Tool Design, Contracts, and Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0615` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Agent Tool Design, Contracts, and Validation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design tool interfaces with clear names, descriptions and typed schemas
2. Specify input and output contracts and error semantics
3. Validate model-produced arguments and handle invalid calls
4. Version, document and test tools for agent use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Tool interfaces (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Write a tool schema with typed, documented parameters; (2) Rewrite a vague tool description so the model calls it correctly
- Common misconception addressed: Writing tool descriptions for humans while ignoring that the model reads them to decide calls
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Naming and descriptions | 80 | 5 |
| M01L02 | Typed parameter schemas | 80 | 5 |
| M01L03 | Granularity and single responsibility | 80 | 5 |

### M02 Contracts and errors (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Define the output contract and the error shape a tool returns; (2) Design a retryable vs non-retryable error distinction
- Common misconception addressed: Returning a stack trace to the model instead of a structured, actionable error
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Input and output contracts | 80 | 5 |
| M02L02 | Error semantics and messages | 80 | 5 |
| M02L03 | Idempotency and retries | 80 | 5 |

### M03 Validation and lifecycle (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Validate and reject an out-of-contract argument before executing; (2) Version a tool and keep an old contract working
- Common misconception addressed: Trusting model-produced arguments without validating them against the contract
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Argument validation | 80 | 5 |
| M03L02 | Versioning and compatibility | 80 | 5 |
| M03L03 | Documentation and testing | 80 | 5 |

## Integrative case

A team designs the tool surface for an agent: write clear tool names and descriptions, define typed input/output contracts with explicit error cases, validate every argument the model produces, decide how the agent sees failures, and version and test each tool before exposing it.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0615-final-protected | 30 | 30 | yes |
| MST-0615-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tool interfaces | 10 |
| Contracts and errors | 10 |
| Validation and lifecycle | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0615-Q0001** (single-answer, Select ONE) Why must a tool's description be written carefully for an agent?

- A. The model reads it to decide when and how to call the tool **(key)**  
  _Rationale:_ Correct: the description is part of the model's decision input, so it must be precise.
- B. It is shown on the company home page  
  _Rationale:_ Tool descriptions are for the agent, not marketing.
- C. It sets the server's memory limit  
  _Rationale:_ Descriptions do not configure infrastructure.
- D. It determines the user's password policy  
  _Rationale:_ Unrelated to tool descriptions.

**MST-0615-Q0002** (multiple-answer, Select TWO) Which TWO make a tool error useful to an agent? (Select TWO.)

- A. A structured, actionable message the model can reason about **(key)**  
  _Rationale:_ Correct: a clear structured error lets the agent recover or choose another action.
- B. A flag indicating whether the call is safe to retry **(key)**  
  _Rationale:_ Correct: retryability tells the agent whether trying again can help.
- C. A raw stack trace with internal paths  
  _Rationale:_ Stack traces leak internals and are hard for the model to act on.
- D. Silently returning an empty success  
  _Rationale:_ Hiding the failure makes the agent act on wrong assumptions.

**MST-0615-Q0003** (single-answer, Select ONE) An agent calls a tool with an argument outside the allowed range. What should the tool do?

- A. Reject the call with a validation error before taking any action **(key)**  
  _Rationale:_ Correct: out-of-contract arguments must be validated and refused before execution.
- B. Execute anyway and hope for the best  
  _Rationale:_ Acting on invalid input is exactly what validation prevents.
- C. Silently clamp the value with no signal to the agent  
  _Rationale:_ Silent changes hide the problem and can corrupt results.
- D. Crash the whole agent process  
  _Rationale:_ A single bad argument should not take down the agent.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
