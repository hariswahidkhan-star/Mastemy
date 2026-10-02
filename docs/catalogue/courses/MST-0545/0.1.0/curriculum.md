# Anthropic API Foundations and Production Integration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0545` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official API documentation (docs.anthropic.com). The egress proxy blocked the vendor docs site this session, so no official page was read. Endpoints, parameters, model IDs, rate limits and pricing are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read this session) |
| Evidence | **unverified-needs-official-check** - no official syllabus/source read this session; sources: SRC-ANTHROPIC-API |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Anthropic API Foundations and Production Integration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the Anthropic Messages API request/response shape at a conceptual level
2. Authenticate requests and manage API keys securely
3. Control generation with system prompts, parameters and stop conditions
4. Handle streaming, errors and retries in an integration
5. Apply cost, rate-limit and reliability practices for production use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 The Anthropic API at a glance (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Sketch a minimal request body; (2) Identify the parts of a response
- Common misconception addressed: Assuming the API is stateful across calls without sending context
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What the Messages API does | 88 | 5 |
| M01L02 | Request and response structure | 88 | 5 |

### M02 Authentication and key management (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Move a key out of code into a secret store; (2) Explain why keys must never be committed
- Common misconception addressed: Hard-coding or committing API keys
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | API keys and secure storage | 88 | 5 |
| M02L02 | Environment and secret management | 87 | 5 |

### M03 Controlling generation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a system prompt that constrains format; (2) Choose parameters for a deterministic task
- Common misconception addressed: Expecting identical output across runs without deterministic settings
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | System prompts and message roles | 87 | 5 |
| M03L02 | Generation parameters | 87 | 5 |
| M03L03 | Stop conditions and output shaping | 87 | 5 |

### M04 Streaming, errors and retries (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Handle a rate-limit error with backoff; (2) Stream a long response to a UI
- Common misconception addressed: Retrying immediately on every error without backoff
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Streaming responses | 87 | 5 |
| M04L02 | Error handling and retry with backoff | 87 | 5 |

### M05 Cost, limits and reliability (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Estimate the cost of a workload; (2) Add basic monitoring to an integration
- Common misconception addressed: Ignoring rate limits and token costs until production incidents occur
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Token cost and rate limits | 87 | 5 |
| M05L02 | Reliability and monitoring practices | 87 | 5 |

## Integrative case

A developer integrates the Anthropic API into a support tool: authenticate securely, build a system prompt, stream responses, handle rate limits and errors, and estimate cost before rollout (feature facts pending official verification).

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0545-final-protected | 30 | 40 | yes |
| MST-0545-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The Anthropic API at a glance | 5 |
| Authentication and key management | 6 |
| Controlling generation | 7 |
| Streaming, errors and retries | 6 |
| Cost, limits and reliability | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0545-Q0001** (single-answer, Select ONE) Where should an API key for an Anthropic integration be stored?

- A. In a secret store or environment variable, never in source control **(key)**  
  _Rationale:_ Correct: keys must be kept out of code and version control.
- B. Hard-coded in the client-side JavaScript  
  _Rationale:_ Client-side code exposes the key to anyone.
- C. Committed to the Git repository for the team  
  _Rationale:_ Committing keys leaks them to everyone with repo access.
- D. Printed in application logs  
  _Rationale:_ Logging keys exposes them in log stores.

**MST-0545-Q0002** (multiple-answer, Select TWO) Which TWO are sound practices for a production API integration? (Select TWO.)

- A. Retry transient errors using exponential backoff **(key)**  
  _Rationale:_ Correct: backoff avoids hammering the service on transient failures.
- B. Monitor token usage and cost **(key)**  
  _Rationale:_ Correct: tracking usage controls cost and catches anomalies.
- C. Retry every error immediately in a tight loop  
  _Rationale:_ Tight-loop retries can worsen outages and hit rate limits.
- D. Assume responses never need error handling  
  _Rationale:_ Errors and rate limits must be handled.

**MST-0545-Q0003** (single-answer, Select ONE) To make a task's output more consistent across runs, you would primarily adjust:

- A. Generation parameters toward more deterministic settings **(key)**  
  _Rationale:_ Correct: lowering randomness-related parameters makes output more consistent (exact names pending official docs).
- B. The API key value  
  _Rationale:_ The key does not affect output determinism.
- C. The HTTP method  
  _Rationale:_ The HTTP method does not control determinism.
- D. The log level  
  _Rationale:_ Logging does not affect generation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
