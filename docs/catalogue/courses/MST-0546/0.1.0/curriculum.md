# Anthropic Tool Use and Structured-Output Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0546` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Developer / API documentation on tool use and structured outputs; the egress proxy blocks docs.anthropic.com this session, so no official page was read. Tool-definition schema details, parameter names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-TOOL-USE |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Anthropic Tool Use and Structured-Output Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how tool use lets Claude call external functions and return structured results
2. Define a tool with a clear JSON input schema and description
3. Handle the tool-use request/result loop in an application
4. Produce reliable structured output and validate it before use
5. Design tool contracts that fail safely on bad or missing input

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Tool use fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace a full tool-use exchange from request to result; (2) Decide which tasks warrant a tool versus plain generation
- Common misconception addressed: Assuming the model executes the tool itself rather than the application
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What tool use is and when to use it | 96 | 6 |
| M01L02 | The request-and-result loop | 96 | 6 |
### M02 Defining tools (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a schema and description for a lookup tool; (2) Refine a vague description that caused wrong calls
- Common misconception addressed: Leaving required fields unconstrained so the model guesses them
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing a tool input schema | 96 | 6 |
| M02L02 | Descriptions that guide correct calls | 96 | 6 |
### M03 Structured output (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Extract fields into a fixed schema and validate them; (2) Reject and retry on a response that fails validation
- Common misconception addressed: Trusting that structured output is always schema-valid without checking
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Getting consistent structured results | 96 | 6 |
| M03L02 | Validating output before use | 96 | 6 |
### M04 Robust tool contracts (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Design a tool that rejects an out-of-range argument cleanly; (2) Make a write tool safe to retry
- Common misconception addressed: Letting a tool perform an irreversible action on ambiguous input
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Failing safely on bad input | 96 | 6 |
| M04L02 | Idempotency and side-effects | 96 | 6 |
### M05 Putting it together (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Build a two-tool workflow that looks up and then records a value; (2) Write tests that cover a failed tool call
- Common misconception addressed: Shipping a multi-tool workflow with no failure-path tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | A small multi-tool workflow | 96 | 6 |
| M05L02 | Testing the workflow | 96 | 6 |

## Integrative case

A developer adds a product-lookup and order-recording capability to a Claude app: define the two tools with validated schemas, handle the tool-use loop, enforce structured output, make the write tool safe to retry, and test the failure paths. Every claim about tool schema fields is flagged for verification against official docs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0546-final-protected | 30 | 40 | yes |
| MST-0546-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tool use fundamentals | 6 |
| Defining tools | 6 |
| Structured output | 6 |
| Robust tool contracts | 6 |
| Putting it together | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0546-Q0001** (single-answer, Select ONE) In a tool-use interaction, which component actually runs the tool and returns a result to the model?

- A. The application code, which executes the tool and sends the result back **(key)**  
  _Rationale:_ Correct: the model requests a tool call; the application runs it and returns the result.
- B. The model runs the tool internally  
  _Rationale:_ The model only emits a tool-use request; it does not execute the tool.
- C. The end user runs the tool manually each time  
  _Rationale:_ The application handles execution programmatically.
- D. The tool runs itself with no caller  
  _Rationale:_ A caller must invoke the tool.
**MST-0546-Q0002** (multiple-answer, Select TWO) Which TWO practices make structured output safer to rely on? (Select TWO.)

- A. Validate the output against the expected schema before using it **(key)**  
  _Rationale:_ Correct: validation catches malformed or missing fields.
- B. Retry or repair when validation fails **(key)**  
  _Rationale:_ Correct: a failed validation should trigger a controlled retry, not silent use.
- C. Assume any returned JSON is correct  
  _Rationale:_ Returned structure can still be wrong; it must be checked.
- D. Remove all field constraints to avoid errors  
  _Rationale:_ Dropping constraints makes bad output more likely, not safer.
**MST-0546-Q0003** (single-answer, Select ONE) A write tool may be called twice for the same request after a retry. What design prevents duplicate side-effects?

- A. Make the tool idempotent so repeating the call has no additional effect **(key)**  
  _Rationale:_ Correct: idempotent design makes retries safe.
- B. Disable all retries permanently  
  _Rationale:_ Blocking retries harms reliability and does not address duplicates generally.
- C. Ignore the second call silently with no safeguard  
  _Rationale:_ Silently ignoring is not a controlled safeguard.
- D. Let the model decide whether to repeat the action  
  _Rationale:_ Safety should be enforced in the contract, not left to the model.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
