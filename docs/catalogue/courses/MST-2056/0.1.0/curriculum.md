# LLM Application Architecture and System Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2056` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Provider APIs, limits and pricing must be re-checked against current docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — LLM Application Architecture and System Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Decompose an LLM product into components: model, prompt, retrieval, tools, memory and orchestration
2. Choose synchronous, streaming or asynchronous patterns for a given user experience
3. Design for latency, cost and rate limits with caching, batching and model routing
4. Handle failures with timeouts, retries, fallbacks and graceful degradation
5. Address statefulness, context windows and session memory in the architecture
6. Plan deployment, scaling and separation of application logic from model provider

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Components of an LLM app (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draw a component diagram for a document-Q&A product and label each part; (2) Decide which parts are stateless and which hold session state
- Common misconception addressed: Treating the model API as the whole system rather than one component among many
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The building blocks: model, prompt, retrieval, tools, memory, orchestration | 120 | 7 |
| M01L02 | Drawing a component diagram for a real feature | 120 | 7 |

### M02 Interaction patterns (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose streaming for a chat UI and async for a long report generator; (2) Design where conversation memory lives across turns
- Common misconception addressed: Assuming every request must be synchronous and block the user
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Synchronous vs streaming vs asynchronous/background jobs | 120 | 7 |
| M02L02 | Session state, context windows and memory placement | 120 | 7 |

### M03 Performance and cost (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add a response cache for repeated identical prompts and estimate savings; (2) Route simple requests to a cheaper model and hard ones to a stronger model
- Common misconception addressed: Believing one large model for every request is the cheapest design
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Caching, batching and model routing to cut latency and cost | 120 | 7 |
| M03L02 | Rate limits, quotas and backpressure | 120 | 7 |

### M04 Reliability and deployment (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add a timeout and a fallback answer when the model provider is slow or down; (2) Design graceful degradation when a rate limit is hit
- Common misconception addressed: Assuming the provider never rate-limits, times out or returns errors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Timeouts, retries, fallbacks and graceful degradation | 120 | 7 |
| M04L02 | Scaling and isolating app logic from the model provider | 120 | 7 |

## Integrative case

An enterprise plans a knowledge assistant used by thousands of staff: decompose it into model, retrieval, tools and memory components, pick streaming and async patterns for different flows, add caching and model routing for cost, and design timeouts, retries and fallbacks for when the provider degrades.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2056-final-protected | 40 | 40 | yes |
| MST-2056-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Components of an LLM app | 10 |
| Interaction patterns | 10 |
| Performance and cost | 10 |
| Reliability and deployment | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2056-Q0001** (single-answer, Select ONE) Your LLM feature's cost is dominated by many repeated, identical prompts (same FAQ asked constantly). Which architectural change cuts cost most directly?

- A. Add a cache keyed on the prompt so identical requests return a stored response without calling the model **(key)**  
  _Rationale:_ Correct: caching avoids paying for repeated identical generations.
- B. Switch every request to the largest model  
  _Rationale:_ A bigger model raises cost; it does not avoid repeated calls.
- C. Increase the context window  
  _Rationale:_ Context size does not reduce repeated identical calls.
- D. Disable streaming  
  _Rationale:_ Streaming affects perceived latency, not repeated-call cost.

**MST-2056-Q0002** (multiple-answer, Select TWO) Which TWO techniques reduce the cost or latency of an LLM application? (Select TWO.)

- A. Routing easy requests to a smaller, cheaper model **(key)**  
  _Rationale:_ Correct: model routing matches request difficulty to model cost.
- B. Caching responses for repeated identical inputs **(key)**  
  _Rationale:_ Correct: caching avoids redundant generations.
- C. Always sending the full conversation history on every call  
  _Rationale:_ Resending everything increases tokens, cost and latency.
- D. Adding more tools to every request  
  _Rationale:_ Extra tool definitions add tokens and do not reduce cost.

**MST-2056-Q0003** (single-answer, Select ONE) Why design explicit timeouts and fallbacks around model provider calls?

- A. The provider can be slow, rate-limited or down, and the app must degrade gracefully instead of hanging or erroring **(key)**  
  _Rationale:_ Correct: external dependencies fail, so the architecture must handle it.
- B. Because the model is always deterministic  
  _Rationale:_ Determinism is unrelated and not generally true.
- C. To avoid ever using retrieval  
  _Rationale:_ Timeouts are unrelated to whether retrieval is used.
- D. Because fallbacks remove the need for the model  
  _Rationale:_ Fallbacks handle failure; they do not replace the model.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
