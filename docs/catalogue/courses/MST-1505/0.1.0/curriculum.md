# AWS Serverless Application Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1505` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Serverless Application Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain serverless building blocks (Lambda, API Gateway, DynamoDB, EventBridge)
2. Design event-driven and API-driven serverless patterns
3. Handle state, async and error handling in serverless apps
4. Apply observability, security and cost practices to serverless

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Serverless foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose serverless vs containers for a workload; (2) Identify a poor fit for serverless
- Common misconception addressed: Thinking serverless means there are no servers to reason about at all
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Serverless building blocks | 72 | 7 |
| M01L02 | When serverless fits (and when not) | 72 | 7 |

### M02 API and event patterns (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a REST endpoint with Lambda; (2) Fan out an event to multiple consumers
- Common misconception addressed: Coupling producers directly to consumers instead of using events
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | API-driven pattern (API Gateway + Lambda) | 72 | 7 |
| M02L02 | Event-driven pattern (EventBridge/SQS) | 72 | 7 |

### M03 State, async and errors (MASTEMY-DESIGN 25%)

- Worked applications: (1) Model an item in DynamoDB; (2) Add a DLQ for failed async messages
- Common misconception addressed: Assuming async invocations never fail and need no DLQ
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | State with DynamoDB | 72 | 7 |
| M03L02 | Async, retries and dead-letter queues | 72 | 7 |

### M04 Operating serverless (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add tracing across functions; (2) Set concurrency and least-privilege roles
- Common misconception addressed: Ignoring cold starts and concurrency limits under load
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Observability and tracing | 72 | 7 |
| M04L02 | Security and cost control | 72 | 7 |

## Integrative case

A team builds an order-processing backend. Design it serverless: API Gateway and Lambda for the API, DynamoDB for state, EventBridge/SQS for async fan-out, with retries, a dead-letter queue, and tracing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1505-final-protected | 28 | 35 | yes |
| MST-1505-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Serverless foundations | 7 |
| API and event patterns | 7 |
| State, async and errors | 7 |
| Operating serverless | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1505-Q0001** (single-answer, Select ONE) Which service is best for decoupling a producer from multiple downstream consumers by events?

- A. Amazon EventBridge **(key)**  
  _Rationale:_ Correct: EventBridge routes events to multiple targets, decoupling producers and consumers.
- B. Amazon EC2  
  _Rationale:_ EC2 is compute, not an event router.
- C. Amazon S3 only  
  _Rationale:_ S3 is storage; it is not an event-routing bus.
- D. AWS IAM  
  _Rationale:_ IAM manages access, not event routing.

**MST-1505-Q0002** (multiple-answer, Select TWO) Which TWO handle failures in asynchronous serverless processing? (Select TWO.)

- A. Configure a dead-letter queue for messages that keep failing **(key)**  
  _Rationale:_ Correct: a DLQ captures messages after retries are exhausted.
- B. Enable retries with backoff **(key)**  
  _Rationale:_ Correct: retries handle transient failures.
- C. Delete the function on first error  
  _Rationale:_ Deleting the function stops all processing.
- D. Ignore errors and hope they resolve  
  _Rationale:_ Ignoring errors loses data.

**MST-1505-Q0003** (single-answer, Select ONE) Which workload is the weakest fit for AWS Lambda?

- A. A long-running job that runs for hours continuously **(key)**  
  _Rationale:_ Correct: very long continuous jobs exceed Lambda's model and limits.
- B. A short event-triggered transformation  
  _Rationale:_ Short event-driven work fits Lambda well.
- C. An API handler returning quickly  
  _Rationale:_ Quick API handlers fit Lambda.
- D. A scheduled lightweight task  
  _Rationale:_ Scheduled short tasks fit Lambda.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
