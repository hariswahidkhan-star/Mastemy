# AWS Messaging: SQS, SNS, EventBridge

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1489` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://docs.aws.amazon.com/sqs/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS Messaging: SQS, SNS, EventBridge (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compare SQS, SNS and EventBridge and their use cases
2. Use SQS standard and FIFO queues correctly
3. Design retries, visibility timeout and dead-letter queues
4. Use SNS topics for pub/sub fan-out
5. Route events with EventBridge rules and buses
6. Design idempotent, decoupled consumers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Messaging choices (MASTEMY-DESIGN 16%)

- Worked applications: (1) Match each service to a scenario; (2) Decide queue vs pub/sub vs event bus
- Common misconception addressed: Using SNS where durable work queuing (SQS) is needed
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SQS vs SNS vs EventBridge | 48 | 5 |
| M01L02 | Choosing a service | 48 | 5 |
### M02 SQS queues (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose FIFO for strict ordering; (2) Use a message group id correctly
- Common misconception addressed: Expecting strict ordering from a standard queue
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Standard vs FIFO | 48 | 5 |
| M02L02 | Ordering and deduplication | 48 | 5 |
### M03 Reliability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set a visibility timeout longer than processing; (2) Route poison messages to a DLQ
- Common misconception addressed: Setting visibility timeout shorter than processing time
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Visibility timeout and retries | 48 | 5 |
| M03L02 | Dead-letter queues | 48 | 5 |
### M04 SNS (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fan out one event to SQS and email; (2) Filter messages by attributes
- Common misconception addressed: Assuming SNS stores messages for later polling
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Topics and subscriptions | 48 | 5 |
| M04L02 | Fan-out patterns | 48 | 5 |
### M05 EventBridge (MASTEMY-DESIGN 17%)

- Worked applications: (1) Route an event by pattern to a target; (2) Use a custom bus for domain events
- Common misconception addressed: Treating EventBridge as a queue for ordered processing
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Event buses and rules | 48 | 5 |
| M05L02 | Schemas and targets | 48 | 5 |
### M06 Consumer design (MASTEMY-DESIGN 17%)

- Worked applications: (1) Make a consumer idempotent with a dedupe key; (2) Scale consumers independently of producers
- Common misconception addressed: Assuming at-least-once delivery never duplicates messages
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Idempotency | 48 | 5 |
| M06L02 | Decoupling and scaling | 48 | 5 |

## Integrative case

A team decouples a workload: use SQS queues for buffering and retries, SNS for fan-out notifications, and EventBridge for event routing between services, then design idempotent consumers and dead-letter handling and justify the choices.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1489-final-protected | 30 | 30 | yes |
| MST-1489-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Messaging choices | 5 |
| SQS queues | 5 |
| Reliability | 5 |
| SNS | 5 |
| EventBridge | 5 |
| Consumer design | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1489-Q0001** (single-answer, Select ONE) A workload must buffer tasks so a slow consumer can process them later with retries. Which service fits best?

- A. Amazon SQS **(key)**  
  _Rationale:_ Correct: SQS is a durable queue that buffers messages for later processing with retries.
- B. Amazon SNS  
  _Rationale:_ SNS pushes to subscribers and does not store messages for polling.
- C. Amazon CloudFront  
  _Rationale:_ CloudFront is a CDN, not a message queue.
- D. Amazon Route 53  
  _Rationale:_ Route 53 is DNS, not messaging.

**MST-1489-Q0002** (multiple-answer, Select TWO) Which TWO improve reliability when consuming from an SQS queue? (Select TWO.)

- A. Set the visibility timeout longer than the processing time **(key)**  
  _Rationale:_ Correct: a longer visibility timeout prevents duplicate processing before completion.
- B. Configure a dead-letter queue for poison messages **(key)**  
  _Rationale:_ Correct: a DLQ isolates messages that repeatedly fail.
- C. Assume messages are never delivered more than once  
  _Rationale:_ Standard queues are at-least-once; consumers must handle duplicates.
- D. Delete the message before processing completes  
  _Rationale:_ Deleting early risks losing work if processing fails.

**MST-1489-Q0003** (single-answer, Select ONE) Which service is designed to route events by pattern to many AWS and SaaS targets?

- A. Amazon EventBridge **(key)**  
  _Rationale:_ Correct: EventBridge routes events to targets based on event patterns.
- B. Amazon SQS FIFO  
  _Rationale:_ FIFO queues provide ordered delivery to consumers, not pattern routing.
- C. Amazon Route 53  
  _Rationale:_ Route 53 is DNS, not event routing.
- D. AWS Billing  
  _Rationale:_ Billing is unrelated to event routing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
