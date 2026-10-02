# OpenAI + .NET + MySQL: Customer-Support Assistant

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0799` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI + .NET + MySQL: Customer-Support Assistant (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a customer-support assistant and its safe boundaries
2. Use the OpenAI API from .NET with reliable, structured calls
3. Ground answers in a MySQL knowledge store, not model memory
4. Build safe interaction, escalation and logging in .NET
5. Operate the assistant with evaluation, limits and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping the assistant (20%)

- Worked applications: (1) Classify support questions as answerable or escalate; (2) Define what the assistant must never attempt
- Common misconception addressed: Designing the assistant to answer everything it is asked
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Answerable vs escalate, and tone | 96 | 7 |
| M01L02 | Success criteria and failure handling | 96 | 7 |

### M02 OpenAI from .NET (20%)

- Worked applications: (1) Call the model from .NET and parse a structured response; (2) Handle a timeout without crashing the request
- Common misconception addressed: Assuming the API always returns promptly and correctly
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Structured, reliable API calls | 96 | 7 |
| M02L02 | Timeouts, retries and error handling | 96 | 7 |

### M03 Grounding in MySQL (20%)

- Worked applications: (1) Retrieve the relevant article from MySQL and answer from it; (2) Return 'not found' safely when no article matches
- Common misconception addressed: Letting the model answer from memory instead of the store
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Retrieving knowledge from MySQL | 96 | 7 |
| M03L02 | Answering from retrieved rows with citations | 96 | 7 |

### M04 Safe interaction in .NET (20%)

- Worked applications: (1) Escalate to a human when confidence is low; (2) Log a conversation without storing unnecessary personal data
- Common misconception addressed: Building an assistant with no escalation or logging
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Escalation, guardrails and logging | 96 | 7 |
| M04L02 | Input handling and abuse resistance | 96 | 7 |

### M05 Operating the assistant (20%)

- Worked applications: (1) Evaluate answers against a labelled set; (2) Cap cost and rate without degrading legitimate use
- Common misconception addressed: Shipping with no evaluation or cost controls
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evaluation and quality monitoring | 96 | 7 |
| M05L02 | Rate limits, cost and governance | 96 | 7 |

## Integrative case

A team builds a support assistant in .NET: scope safe boundaries, call OpenAI reliably, ground answers in a MySQL store with citations, add escalation and logging, and operate with evaluation and cost controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0799-final-protected | 40 | 50 | yes |
| MST-0799-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping the assistant | 8 |
| OpenAI from .NET | 8 |
| Grounding in MySQL | 8 |
| Safe interaction in .NET | 8 |
| Operating the assistant | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0799-Q0001** (single-answer, Select ONE) No knowledge-base article matches a customer's question. What should the assistant do?

- A. Say it cannot find an answer and escalate to a human **(key)**  
  _Rationale:_ Correct: with no grounding, inventing an answer is unsafe.
- B. Answer from the model's general knowledge  
  _Rationale:_ Ungrounded answers may contradict the company's actual policy.
- C. Return the most recently added article regardless of match  
  _Rationale:_ An unrelated article does not answer the question.
- D. Ask the customer to rephrase indefinitely  
  _Rationale:_ Looping the customer is not a resolution path.

**MST-0799-Q0002** (multiple-answer, Select TWO) Which TWO measures make .NET calls to the OpenAI API robust? (Select TWO.)

- A. A timeout so a slow call does not hang the request **(key)**  
  _Rationale:_ Correct: timeouts protect the service from stalled calls.
- B. Bounded retries with backoff on transient failures **(key)**  
  _Rationale:_ Correct: controlled retries handle transient errors without a storm.
- C. Assuming every response is valid JSON without checking  
  _Rationale:_ Unchecked parsing crashes on malformed responses.
- D. Blocking the thread until the API eventually replies  
  _Rationale:_ Indefinite blocking exhausts resources under load.

**MST-0799-Q0003** (single-answer, Select ONE) What personal data should a support conversation log retain?

- A. Only what is necessary for support and permitted by policy **(key)**  
  _Rationale:_ Correct: logging must follow data minimisation and policy.
- B. Everything the customer typed, indefinitely  
  _Rationale:_ Retaining all input indefinitely is a privacy risk.
- C. Full payment details for convenience  
  _Rationale:_ Storing payment details unnecessarily is a serious risk.
- D. Nothing at all, so there is never any record  
  _Rationale:_ No logging removes the ability to evaluate and improve safely.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
