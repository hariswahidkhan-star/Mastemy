# Google Cloud AI Platform: Model and Agent Application Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0748` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-VERTEX-AI (https://cloud.google.com/vertex-ai/docs; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud AI Platform: Model and Agent Application Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Call Vertex AI foundation models for text, chat and multimodal tasks
2. Design grounded applications with retrieval and structured output
3. Build tool-using agents and manage their execution flow
4. Evaluate quality, safety and cost of AI applications
5. Deploy and secure model endpoints and agent services
6. Monitor and improve AI applications in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Foundation models (MASTEMY-DESIGN 25%)

- Worked applications: (1) Call a model and constrain it to JSON output; (2) Compare temperature settings for a classification task
- Common misconception addressed: Treating a model's fluent output as verified fact without grounding
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Calling text, chat and multimodal models | 120 | 5 |
| M01L02 | Prompting, parameters and structured output | 120 | 5 |

### M02 Grounding and retrieval (MASTEMY-DESIGN 25%)

- Worked applications: (1) Ground answers in an indexed document set; (2) Return answers with source citations
- Common misconception addressed: Assuming retrieval alone guarantees correct answers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Retrieval-augmented generation patterns | 120 | 5 |
| M02L02 | Citations, freshness and source control | 120 | 5 |

### M03 Agents and tools (MASTEMY-DESIGN 25%)

- Worked applications: (1) Give an agent a tool to look up an order; (2) Bound an agent's steps and handle tool errors
- Common misconception addressed: Letting an agent call tools without validating arguments or limiting steps
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Tool use and function calling | 120 | 5 |
| M03L02 | Multi-step agent control and guardrails | 120 | 5 |

### M04 Evaluation, deployment and operations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Score responses against a rubric on a test set; (2) Deploy an authenticated endpoint and watch latency and cost
- Common misconception addressed: Shipping without an evaluation set and relying on anecdotes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Quality, safety and cost evaluation | 120 | 5 |
| M04L02 | Endpoints, security and monitoring | 120 | 5 |

## Integrative case

Build a customer-support assistant on Vertex AI: ground answers in a product knowledge base, enforce structured output for ticket fields, add tools to look up order status, evaluate answer quality and safety, deploy behind an authenticated endpoint, and set up monitoring and a cost ceiling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0748-final-protected | 40 | 50 | yes |
| MST-0748-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundation models | 10 |
| Grounding and retrieval | 10 |
| Agents and tools | 10 |
| Evaluation, deployment and operations | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0748-Q0001** (single-answer, Select ONE) A Vertex AI assistant sometimes invents product details. Which change most directly reduces these fabrications?

- A. Ground responses in a retrieved, authoritative document set **(key)**  
  _Rationale:_ Correct: grounding supplies real context the model must answer from.
- B. Increase the temperature parameter  
  _Rationale:_ Higher temperature increases randomness and likely more fabrication.
- C. Remove the system instructions  
  _Rationale:_ Removing guidance tends to worsen reliability.
- D. Ask the model to be more confident  
  _Rationale:_ Confidence wording does not improve factual accuracy.

**MST-0748-Q0002** (multiple-answer, Select TWO) Which TWO controls help keep a tool-using agent safe and predictable? (Select TWO.)

- A. Validate tool-call arguments before executing them **(key)**  
  _Rationale:_ Correct: validation prevents malformed or unsafe calls.
- B. Cap the number of reasoning/tool steps per request **(key)**  
  _Rationale:_ Correct: a step budget prevents runaway loops and cost.
- C. Let the agent execute any shell command it proposes  
  _Rationale:_ Unrestricted execution is a serious safety risk.
- D. Hide all errors from the agent  
  _Rationale:_ Agents need error signals to recover sensibly.

**MST-0748-Q0003** (single-answer, Select ONE) Before launching an AI feature, your team wants an objective way to track quality across changes. What should you build first?

- A. A labelled evaluation set scored against a rubric **(key)**  
  _Rationale:_ Correct: a fixed eval set makes quality comparable across versions.
- B. A larger marketing page  
  _Rationale:_ Marketing does not measure model quality.
- C. A single hand-picked demo prompt  
  _Rationale:_ One prompt is not a reliable quality measure.
- D. A higher token limit  
  _Rationale:_ Token limits do not measure quality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
