# AWS Lambda and Event-Driven Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0759` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS Lambda documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — AWS Lambda and Event-Driven Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Lambda execution and concurrency model
2. Configure triggers and event source mappings
3. Manage permissions with execution roles and resource policies
4. Handle errors, retries and dead-letter queues
5. Observe and tune Lambda cost and performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Execution model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a handler that returns a response; (2) Reserve concurrency for a function
- Common misconception addressed: Assuming a function keeps state between invocations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Handlers, runtimes and the lifecycle | 120 | 7 |
| M01L02 | Concurrency and cold starts | 120 | 7 |

### M02 Triggers and events (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trigger a function from an API request; (2) Consume a queue with an event source mapping
- Common misconception addressed: Confusing push triggers with poll-based event source mappings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Synchronous vs asynchronous invocation | 120 | 7 |
| M02L02 | Event source mappings | 120 | 7 |

### M03 Permissions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Grant a function access to one table; (2) Allow a service to invoke a function
- Common misconception addressed: Giving the execution role broad administrator access
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Execution roles | 120 | 7 |
| M03L02 | Resource-based policies and invoke permissions | 120 | 7 |

### M04 Reliability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Make a handler idempotent; (2) Route failed async events to a DLQ
- Common misconception addressed: Ignoring retry behaviour and creating duplicate side effects
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Retries and idempotency | 120 | 7 |
| M04L02 | Dead-letter queues and failure handling | 120 | 7 |

### M05 Observability and cost (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read function logs and a trace; (2) Tune memory to balance speed and cost
- Common misconception addressed: Setting a very long timeout to mask a performance problem
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Logs, metrics and tracing | 120 | 7 |
| M05L02 | Memory, timeout and cost tuning | 120 | 7 |

## Integrative case

Build an event-driven order processor on AWS Lambda: invoke a function from an API and from a queue via an event source mapping, scope its execution role to least privilege, make the handler idempotent with a dead-letter queue, and tune memory and timeout using logs and traces.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0759-final-protected | 40 | 50 | yes |
| MST-0759-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Execution model | 8 |
| Triggers and events | 8 |
| Permissions | 8 |
| Reliability | 8 |
| Observability and cost | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0759-Q0001** (single-answer, Select ONE) What permissions does a Lambda function use to call other AWS services?

- A. Its execution role **(key)**  
  _Rationale:_ Correct: the execution role grants the function its AWS permissions.
- B. The caller's browser cookies  
  _Rationale:_ Browser cookies are unrelated to Lambda permissions.
- C. The root account by default  
  _Rationale:_ Functions use their execution role, not root.
- D. No permissions are ever needed  
  _Rationale:_ Calling other services requires granted permissions.

**MST-0759-Q0002** (multiple-answer, Select TWO) Which TWO are good practices for reliable event-driven Lambda functions? (Select TWO.)

- A. Make handlers idempotent so retries do not duplicate effects **(key)**  
  _Rationale:_ Correct: idempotency protects against at-least-once delivery and retries.
- B. Configure a dead-letter queue for failed asynchronous events **(key)**  
  _Rationale:_ Correct: a DLQ captures events that exhaust retries for later inspection.
- C. Store request state in a module-level variable expecting it to persist  
  _Rationale:_ Execution environments are not guaranteed to persist state.
- D. Set an extremely long timeout to avoid handling errors  
  _Rationale:_ Long timeouts hide problems and raise cost.

**MST-0759-Q0003** (single-answer, Select ONE) A function must poll messages from a queue. What should you configure?

- A. An event source mapping **(key)**  
  _Rationale:_ Correct: event source mappings let Lambda poll sources like SQS and invoke the function.
- B. A synchronous API invocation only  
  _Rationale:_ Synchronous invoke does not poll a queue.
- C. A static website trigger  
  _Rationale:_ Static websites do not deliver queue messages.
- D. A longer memory setting  
  _Rationale:_ Memory does not establish queue polling.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
