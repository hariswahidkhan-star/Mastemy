# Event-Driven Architecture and Message Reliability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1000` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-EDA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Event-Driven Architecture and Message Reliability (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Event-driven fundamentals
2. Brokers and delivery semantics
3. Idempotency and deduplication
4. Ordering and partitioning
5. Reliability: outbox, DLQ and replay
6. Schema evolution and contracts
7. Operability of event systems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Event-driven fundamentals (MASTEMY-DESIGN 15%)

- Worked applications: (1) Model a workflow as events rather than synchronous calls; (2) Decide between choreography and orchestration for a flow
- Common misconception addressed: Confusing an event (a fact that happened) with a command (a request to act)
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Events, commands and messages | 103 | 6 |
| M01L02 | Choreography versus orchestration | 103 | 6 |

### M02 Brokers and delivery semantics (MASTEMY-DESIGN 15%)

- Worked applications: (1) Match a delivery guarantee to a business requirement; (2) Explain why 'exactly once' end to end needs idempotency
- Common misconception addressed: Believing a broker can give true exactly-once delivery with no consumer effort
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Queues, topics and log-based brokers | 103 | 6 |
| M02L02 | At-most-once, at-least-once and effectively-once | 103 | 6 |

### M03 Idempotency and deduplication (MASTEMY-DESIGN 14%)

- Worked applications: (1) Add an idempotency key so a redelivered message is a no-op; (2) Build a dedup store with an appropriate retention window
- Common misconception addressed: Assuming at-least-once delivery is safe without idempotent handling
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Idempotency keys and dedup windows | 103 | 6 |
| M03L02 | Designing idempotent consumers | 103 | 6 |

### M04 Ordering and partitioning (MASTEMY-DESIGN 14%)

- Worked applications: (1) Choose a partition key that preserves required ordering; (2) Handle a late-arriving event without corrupting state
- Common misconception addressed: Expecting global total ordering across all partitions
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Partition keys and per-key ordering | 103 | 6 |
| M04L02 | Handling out-of-order and late events | 103 | 6 |

### M05 Reliability: outbox, DLQ and replay (MASTEMY-DESIGN 14%)

- Worked applications: (1) Use an outbox so a DB write and an event publish cannot diverge; (2) Route poison messages to a DLQ and design safe replay
- Common misconception addressed: Publishing an event in the same code path but a separate transaction from the DB write
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The transactional outbox pattern | 103 | 6 |
| M05L02 | Dead-letter queues, poison messages and replay | 103 | 6 |

### M06 Schema evolution and contracts (MASTEMY-DESIGN 14%)

- Worked applications: (1) Add a field to an event without breaking old consumers; (2) Version an event contract and deprecate a field safely
- Common misconception addressed: Treating event payloads as internal objects that can change freely
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Event schemas and a schema registry | 103 | 6 |
| M06L02 | Backward/forward-compatible changes and versioning | 103 | 6 |

### M07 Operability of event systems (MASTEMY-DESIGN 14%)

- Worked applications: (1) Diagnose and act on growing consumer lag; (2) Set an alert on lag and throughput that reflects SLOs
- Common misconception addressed: Watching broker CPU instead of consumer lag to judge health
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Consumer lag, throughput and backpressure | 102 | 6 |
| M07L02 | Monitoring, alerting and capacity | 102 | 6 |

## Integrative case

Design the messaging backbone for a payments event pipeline: choose delivery guarantees per topic, make consumers idempotent, define ordering and partitioning, plan a dead-letter and replay strategy, and show how an outage is survived without lost or duplicated payments.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1000-final-protected | 35 | 35 | yes |
| MST-1000-final-alternate | 35 | 35 | no (optional practice) |

Minimum reviewed item bank: 490 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1000-Q0001** (single-answer, Select ONE) A broker provides at-least-once delivery. What must a consumer do so duplicate deliveries do not double-charge a customer?

- A. Process each message idempotently using a stored idempotency key **(key)**  
  _Rationale:_ Correct: idempotent handling makes a redelivered message a no-op.
- B. Acknowledge messages before processing them  
  _Rationale:_ Acking before processing risks losing messages on a crash, not preventing duplicates.
- C. Reduce the number of partitions to one  
  _Rationale:_ Partition count does not stop duplicate deliveries.
- D. Increase the broker retention period  
  _Rationale:_ Longer retention is unrelated to duplicate handling.

**MST-1000-Q0002** (multiple-answer, Select TWO) Which TWO problems does the transactional outbox pattern solve? (Select TWO)

- A. A database write succeeding while its event publish is lost **(key)**  
  _Rationale:_ Correct: the outbox writes the event in the same transaction, so they cannot diverge.
- B. An event publish succeeding while the database write rolls back **(key)**  
  _Rationale:_ Correct: both are committed together, preventing a published event with no persisted state.
- C. Consumers processing messages out of order  
  _Rationale:_ Ordering is handled by partitioning, not the outbox.
- D. Reducing the size of event payloads  
  _Rationale:_ The outbox does not address payload size.

**MST-1000-Q0003** (single-answer, Select ONE) Events for a given account must be processed in the order they occurred. Which design achieves this in a partitioned log?

- A. Use the account ID as the partition key **(key)**  
  _Rationale:_ Correct: all events for one account land on one partition, preserving per-key order.
- B. Use a random partition key per event  
  _Rationale:_ Random keys spread an account's events across partitions, losing order.
- C. Increase consumer parallelism per partition  
  _Rationale:_ Multiple consumers per partition breaks ordering.
- D. Disable acknowledgements  
  _Rationale:_ Acknowledgements are unrelated to ordering.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
