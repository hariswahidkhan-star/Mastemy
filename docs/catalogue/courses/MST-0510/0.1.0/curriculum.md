# Building a Production AI Assistant with React, .NET, and OpenAI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0510` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Building a Production AI Assistant with React, .NET, and OpenAI (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Architect a production AI assistant across React, .NET and OpenAI
2. Build the .NET backend that calls the OpenAI API securely
3. Build the React front end for a streaming assistant
4. Add retrieval, tools and state to the assistant
5. Secure, test and evaluate the assistant
6. Deploy, monitor and control cost in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Architecting and building the assistant across React, .NET and OpenAI is taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Architecture (17%)

- Worked applications: (1) Draw the request flow from React to .NET to OpenAI; (2) Decide what logic lives in the backend versus the client
- Common misconception addressed: Calling the OpenAI API directly from the browser with the key exposed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | System design and data flow | 120 | 6 |
| M01L02 | Responsibilities across tiers | 120 | 6 |

### M02 .NET backend (17%)

- Worked applications: (1) Store and use the API key server-side; (2) Stream tokens from .NET to the client
- Common misconception addressed: Putting the API key in client code or config shipped to the browser
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Calling the API securely | 120 | 6 |
| M02L02 | Streaming responses from .NET | 120 | 6 |

### M03 React front end (17%)

- Worked applications: (1) Render streamed tokens as they arrive; (2) Show a graceful error when a request fails
- Common misconception addressed: Blocking the UI until the whole response arrives
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | A streaming chat UI | 120 | 6 |
| M03L02 | State and error handling in the UI | 120 | 6 |

### M04 Retrieval, tools and state (17%)

- Worked applications: (1) Add a document-grounded answer with citations; (2) Persist conversation state across turns
- Common misconception addressed: Losing conversation context between turns in a stateless design
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Retrieval over your data | 120 | 6 |
| M04L02 | Tools and conversation state | 120 | 6 |

### M05 Security, testing and evaluation (17%)

- Worked applications: (1) Add input and output guardrails on the backend; (2) Build an evaluation set for assistant answers
- Common misconception addressed: Shipping without guardrails, tests or an evaluation of answer quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Securing the assistant | 120 | 6 |
| M05L02 | Testing and evaluating quality | 120 | 6 |

### M06 Deploy and operate (17%)

- Worked applications: (1) Configure secrets and environments for deployment; (2) Add monitoring and a spend alert
- Common misconception addressed: Treating deployment as the end rather than monitoring and cost in production
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Deployment and configuration | 120 | 6 |
| M06L02 | Monitoring and cost control | 120 | 6 |

## Integrative case

A team ships a customer-facing knowledge assistant: a React streaming UI talks to a .NET backend that holds the OpenAI key, grounds answers in company documents with citations, keeps conversation state, enforces guardrails, is covered by tests and evaluations, and is deployed with monitoring and a spend alert.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0510-final-protected | 108 | 108 | yes |
| MST-0510-final-alternate | 108 | 108 | no (optional) |

| Domain | Items per form |
|---|---|
| Architecture | 18 |
| .NET backend | 18 |
| React front end | 18 |
| Retrieval, tools and state | 18 |
| Security, testing and evaluation | 18 |
| Deploy and operate | 18 |

Minimum reviewed item bank: 612 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0510-Q0001** (single-answer, Select ONE) Why should the OpenAI API call be made from the .NET backend rather than the React browser client?

- A. To keep the API key secret and off the client **(key)**  
  _Rationale:_ Correct: the key must stay server-side, never in the browser.
- B. Because React cannot make HTTP requests  
  _Rationale:_ React can make requests; the issue is key exposure.
- C. To make responses non-streaming  
  _Rationale:_ Backend calls can still stream.
- D. To avoid writing any tests  
  _Rationale:_ Tests are still needed regardless of where the call is made.

**MST-0510-Q0002** (single-answer, Select ONE) How should a streaming assistant UI handle tokens as they arrive?

- A. Render them incrementally so the user sees output immediately **(key)**  
  _Rationale:_ Correct: incremental rendering improves responsiveness.
- B. Wait for the full response before showing anything  
  _Rationale:_ Blocking until completion hurts responsiveness.
- C. Discard tokens until the stream ends  
  _Rationale:_ Discarding tokens defeats streaming.
- D. Show only the first token  
  _Rationale:_ The full streamed response should be rendered.

**MST-0510-Q0003** (multiple-answer, Select TWO) Which TWO steps belong in getting the assistant production-ready? (Select TWO)

- A. Add input and output guardrails on the backend **(key)**  
  _Rationale:_ Correct: guardrails are part of a safe production assistant.
- B. Add monitoring and a spend alert after deployment **(key)**  
  _Rationale:_ Correct: production operation needs monitoring and cost control.
- C. Ship the API key in the browser bundle  
  _Rationale:_ Exposing the key is a security failure.
- D. Skip any evaluation of answer quality  
  _Rationale:_ Quality must be evaluated before and after release.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
