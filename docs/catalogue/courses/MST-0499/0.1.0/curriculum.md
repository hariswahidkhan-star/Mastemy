# OpenAI Function Calling and Tool Integration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0499` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Function Calling and Tool Integration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define tools/functions the model can call with correct schemas
2. Handle tool-call requests and return results to the model
3. Design safe tool execution with validation and permissions
4. Apply error handling and auditing to tool integrations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Writing and running real tool-integration code and judgement on safe tool permissions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Defining tools (25%)

- Worked applications: (1) Define a weather-lookup tool with a clear parameter schema; (2) Write a description that helps the model call the tool correctly
- Common misconception addressed: Assuming the model will infer parameters you never described
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describing a function the model can call | 120 | 6 |
| M01L02 | Writing clear parameter schemas | 120 | 6 |

### M02 Handling tool calls (25%)

- Worked applications: (1) Execute a requested tool call and feed the result back; (2) Loop a multi-step tool interaction to completion
- Common misconception addressed: Returning raw errors to the model with no handling
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Receiving a tool call and executing it | 120 | 6 |
| M02L02 | Returning results back to the model | 120 | 6 |

### M03 Safe execution (25%)

- Worked applications: (1) Validate tool arguments before executing a sensitive action; (2) Restrict a tool so it can only act within allowed limits
- Common misconception addressed: Executing tool arguments without validating them first
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Validating tool arguments before running | 120 | 6 |
| M03L02 | Permissioning what a tool may do | 120 | 6 |

### M04 Errors and auditing (25%)

- Worked applications: (1) Handle a tool timeout without crashing the conversation; (2) Log every tool call for later audit
- Common misconception addressed: Running tools with no record of what was called
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Handling tool failures gracefully | 120 | 6 |
| M04L02 | Auditing tool calls and actions | 120 | 6 |

## Integrative case

A developer gives a support assistant the ability to look up orders and issue refunds via function calling: they define clear tool schemas, validate arguments, permission the refund tool to safe limits, feed results back to the model, handle failures gracefully, and audit every tool call.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0499-final-protected | 72 | 72 | yes |
| MST-0499-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Defining tools | 18 |
| Handling tool calls | 18 |
| Safe execution | 18 |
| Errors and auditing | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0499-Q0001** (single-answer, Select ONE) Before executing a function call the model requested, what must the application do with the arguments?

- A. Validate them against the expected schema and permitted values **(key)**  
  _Rationale:_ Correct: arguments must be validated before any execution, especially for sensitive actions.
- B. Execute them immediately without checks  
  _Rationale:_ Executing unvalidated arguments is unsafe.
- C. Email them to the user  
  _Rationale:_ Emailing arguments is irrelevant and risky.
- D. Ignore them and run a default  
  _Rationale:_ Ignoring requested arguments breaks the feature.

**MST-0499-Q0002** (single-answer, Select ONE) What makes the model more likely to call a tool with correct parameters?

- A. A clear function description and a precise parameter schema **(key)**  
  _Rationale:_ Correct: clear descriptions and schemas guide correct tool calls.
- B. A longer system prompt full of adjectives  
  _Rationale:_ Verbose adjectives do not clarify the tool's contract.
- C. Using the newest model only  
  _Rationale:_ Model version does not replace a clear tool definition.
- D. Hiding the parameters from the model  
  _Rationale:_ The model cannot fill parameters it was not told about.

**MST-0499-Q0003** (multiple-answer, Select TWO) Which TWO controls make a refund tool safe to expose via function calling? (Select TWO)

- A. Permission the tool to a maximum refund amount **(key)**  
  _Rationale:_ Correct: bounding the action limits damage from an erroneous call.
- B. Audit every tool call and its outcome **(key)**  
  _Rationale:_ Correct: auditing provides traceability for sensitive actions.
- C. Let the model refund any amount with no limit  
  _Rationale:_ Unbounded refunds are a serious risk.
- D. Skip validation to reduce latency  
  _Rationale:_ Skipping validation enables unsafe executions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

