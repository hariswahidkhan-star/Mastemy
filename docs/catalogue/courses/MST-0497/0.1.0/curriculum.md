# OpenAI Responses API: Production Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0497` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Responses API: Production Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build application features on the OpenAI Responses API
2. Manage conversation state, streaming and tool use in production
3. Handle errors, retries, timeouts and cost at scale
4. Apply observability, testing and safety controls to a production integration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Writing and operating real production code, live system behaviour, and engineering judgement on release readiness are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Responses API foundations (25%)

- Worked applications: (1) Design the request shape for a support-assistant feature; (2) Pick a model and parameters for a latency-sensitive feature
- Common misconception addressed: Assuming the API keeps conversation state for you between calls
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Responses API request/response shape | 120 | 6 |
| M01L02 | Choosing models and parameters for a feature | 120 | 6 |
| M01L03 | Managing input and output structure | 120 | 6 |

### M02 State, streaming and tools (25%)

- Worked applications: (1) Carry only the context a feature needs into each request; (2) Stream tokens to the UI and handle a dropped connection
- Common misconception addressed: Streaming without handling a mid-stream failure
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Carrying conversation state safely | 120 | 6 |
| M02L02 | Streaming responses to the client | 120 | 6 |
| M02L03 | Invoking tools from a response | 120 | 6 |

### M03 Reliability at scale (25%)

- Worked applications: (1) Add retry-with-backoff and a timeout to a flaky call; (2) Estimate monthly cost from token usage per request
- Common misconception addressed: Retrying a non-idempotent write on every error
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Retries, timeouts and idempotency | 120 | 6 |
| M03L02 | Rate limits and backoff | 120 | 6 |
| M03L03 | Controlling and forecasting cost | 120 | 6 |

### M04 Observability and safety (25%)

- Worked applications: (1) Add tracing so a failed request can be diagnosed; (2) Write a regression test that pins expected behaviour
- Common misconception addressed: Shipping a user-facing feature with no safety guardrail
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Logging, tracing and metrics | 120 | 6 |
| M04L02 | Regression testing a feature | 120 | 6 |
| M04L03 | Safety guardrails before release | 120 | 6 |

## Integrative case

An engineering team ships a customer-facing assistant on the OpenAI Responses API: they design request and state handling, stream responses with failure handling, add retries, timeouts and cost controls, instrument tracing and metrics, write regression tests, and gate release behind safety guardrails.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0497-final-protected | 108 | 108 | yes |
| MST-0497-final-alternate | 108 | 108 | no (optional) |

| Domain | Items per form |
|---|---|
| Responses API foundations | 27 |
| State, streaming and tools | 27 |
| Reliability at scale | 27 |
| Observability and safety | 27 |

Minimum reviewed item bank: 612 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0497-Q0001** (single-answer, Select ONE) How is multi-turn conversation state maintained across Responses API calls?

- A. The application sends the needed prior context (or a state reference) with each request **(key)**  
  _Rationale:_ Correct: the client is responsible for supplying context/state on each call.
- B. The API automatically remembers all past calls for your key  
  _Rationale:_ State is not implicitly retained for you across independent calls.
- C. State is stored in the client's CSS  
  _Rationale:_ CSS is unrelated to conversation state.
- D. You cannot build multi-turn features at all  
  _Rationale:_ Multi-turn features are possible by managing context yourself.

**MST-0497-Q0002** (single-answer, Select ONE) Which call is unsafe to blindly retry on any error?

- A. A non-idempotent write that creates a record **(key)**  
  _Rationale:_ Correct: retrying a non-idempotent write can create duplicates; it needs idempotency protection.
- B. A read that returns the same data each time  
  _Rationale:_ Idempotent reads are safe to retry.
- C. A health-check ping  
  _Rationale:_ A stateless check is safe to retry.
- D. Fetching a static config value  
  _Rationale:_ A pure read is safe to retry.

**MST-0497-Q0003** (multiple-answer, Select TWO) Which TWO controls improve reliability of a production Responses API call? (Select TWO)

- A. Retry with exponential backoff on transient errors **(key)**  
  _Rationale:_ Correct: backoff handles transient failures without hammering the API.
- B. Set a request timeout so a hung call fails fast **(key)**  
  _Rationale:_ Correct: timeouts prevent indefinite waits and resource exhaustion.
- C. Remove all logging to save space  
  _Rationale:_ Removing logging harms diagnosability and reliability.
- D. Retry non-idempotent writes unconditionally  
  _Rationale:_ Unconditional retry of writes risks duplicate side effects.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

