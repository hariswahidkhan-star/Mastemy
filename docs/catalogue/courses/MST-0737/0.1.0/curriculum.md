# Gemini API: Application Development and Structured Outputs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0737` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google Gemini API docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-GEMINI-API (https://ai.google.dev/gemini-api/docs; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Gemini API: Application Development and Structured Outputs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Call the Gemini API and handle responses
2. Design prompts and system instructions for apps
3. Produce structured JSON and constrained outputs
4. Use function calling and tools
5. Work with multimodal and long-context inputs
6. Apply safety, quotas and production practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 API fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Make an authenticated generateContent call; (2) Stream a response and handle a timeout
- Common misconception addressed: Hard-coding an API key in client-side code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Authentication and first request | 80 | 7 |
| M01L02 | Responses, streaming and errors | 80 | 7 |

### M02 Prompts and system instructions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Set a system instruction to fix the assistant's role; (2) Tune temperature for deterministic output
- Common misconception addressed: Expecting temperature 0 to make output fully deterministic across versions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | System instructions and roles | 80 | 7 |
| M02L02 | Parameters: temperature and tokens | 80 | 7 |

### M03 Structured outputs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Request a response constrained to a JSON schema; (2) Validate returned JSON before using it
- Common misconception addressed: Assuming free-text output is always valid JSON
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | JSON mode and response schemas | 80 | 7 |
| M03L02 | Validating and parsing output | 80 | 7 |

### M04 Function calling and tools (MASTEMY-DESIGN 17%)

- Worked applications: (1) Declare a function and handle the model's call; (2) Return a tool result and continue the turn
- Common misconception addressed: Executing a function call without validating its arguments
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Declaring functions | 80 | 7 |
| M04L02 | Executing tool calls and returning results | 80 | 7 |

### M05 Multimodal and long context (MASTEMY-DESIGN 17%)

- Worked applications: (1) Send an image with a text prompt; (2) Chunk a long document for a summarisation task
- Common misconception addressed: Assuming unlimited context with no token cost
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Images, audio and files | 80 | 7 |
| M05L02 | Long-context strategies | 80 | 7 |

### M06 Safety and production (MASTEMY-DESIGN 17%)

- Worked applications: (1) Handle a safety-blocked response path; (2) Track token usage to estimate cost
- Common misconception addressed: Ignoring rate limits until production traffic hits them
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Safety settings and blocked responses | 80 | 7 |
| M06L02 | Quotas, cost and monitoring | 80 | 7 |

## Integrative case

Build a support-ticket classifier service on the Gemini API: send a system instruction, request a JSON schema output of category and priority, add a function call to look up order status, handle a safety block gracefully, and log token usage for cost control.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0737-final-protected | 40 | 50 | yes |
| MST-0737-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| API fundamentals | 6 |
| Prompts and system instructions | 6 |
| Structured outputs | 7 |
| Function calling and tools | 7 |
| Multimodal and long context | 7 |
| Safety and production | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0737-Q0001** (single-answer, Select ONE) What is the main advantage of requesting a response schema (JSON mode) from the Gemini API?

- A. The output conforms to a defined structure that code can parse reliably **(key)**  
  _Rationale:_ Correct: a response schema constrains output to a parseable structure.
- B. It guarantees the content is factually true  
  _Rationale:_ Schema controls structure, not factual accuracy.
- C. It removes all token costs  
  _Rationale:_ Structured output still consumes tokens.
- D. It disables safety filtering  
  _Rationale:_ Schema has no effect on safety settings.

**MST-0737-Q0002** (single-answer, Select ONE) In function calling, what does the model return when it decides a tool is needed?

- A. A structured function call with a name and arguments for your code to execute **(key)**  
  _Rationale:_ Correct: the model proposes a function call that your code runs.
- B. The final executed result of the function  
  _Rationale:_ The model proposes the call; your code executes it.
- C. A direct database connection  
  _Rationale:_ The model does not open connections.
- D. Nothing until you poll a queue  
  _Rationale:_ The call is returned in the response, not via polling.

**MST-0737-Q0003** (multiple-answer, Select TWO) Which TWO are sound production practices for a Gemini API service? (Select TWO.)

- A. Keep API keys server-side, not in client code **(key)**  
  _Rationale:_ Correct: keys must stay server-side.
- B. Monitor token usage to control cost **(key)**  
  _Rationale:_ Correct: usage monitoring controls cost.
- C. Assume quotas never apply  
  _Rationale:_ Quotas and rate limits apply and must be handled.
- D. Trust returned JSON without validation  
  _Rationale:_ Returned data should be validated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
