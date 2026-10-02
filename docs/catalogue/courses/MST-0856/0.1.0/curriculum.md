# Java Microservices with Event-Driven Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0856` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Java Microservices with Event-Driven Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define microservice boundaries and data ownership
2. Choose synchronous versus asynchronous communication
3. Implement event-driven messaging
4. Apply consistency patterns (saga, outbox, idempotency)
5. Make asynchronous flows resilient and observable
6. Version, deploy and operate services

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Microservice boundaries (MASTEMY-DESIGN 16%)

- Worked applications: (1) Split a monolith feature into two services; (2) Define the data each service owns
- Common misconception addressed: Sharing one database across services
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Bounded contexts and service boundaries | 120 | 7 |
| M01L02 | APIs and data ownership per service | 120 | 7 |

### M02 Synchronous vs asynchronous (MASTEMY-DESIGN 17%)

- Worked applications: (1) Replace a synchronous call with an event; (2) Decide sync vs async for a given use case
- Common misconception addressed: Using synchronous call chains where an event fits better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | REST calls vs messaging trade-offs | 120 | 7 |
| M02L02 | When to prefer events | 120 | 7 |

### M03 Events and messaging (MASTEMY-DESIGN 17%)

- Worked applications: (1) Publish a domain event to a topic; (2) Consume with at-least-once handling
- Common misconception addressed: Assuming exactly-once delivery is free
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Message brokers and topics | 120 | 7 |
| M03L02 | Producers, consumers and delivery semantics | 120 | 7 |

### M04 Consistency patterns (MASTEMY-DESIGN 17%)

- Worked applications: (1) Design a saga for an order flow; (2) Make a consumer idempotent
- Common misconception addressed: Expecting distributed transactions to behave like a single database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The saga pattern and compensation | 120 | 7 |
| M04L02 | The outbox pattern and idempotency | 120 | 7 |

### M05 Resilience and observability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a dead-letter queue for poison messages; (2) Trace an event across services
- Common misconception addressed: Ignoring poison messages that block a consumer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Retries, dead-letter queues and backpressure | 120 | 7 |
| M05L02 | Tracing across asynchronous flows | 120 | 7 |

### M06 Delivery and operations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Evolve an event schema compatibly; (2) Plan a zero-downtime deployment
- Common misconception addressed: Breaking consumers with incompatible schema changes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Versioning events and schemas | 120 | 7 |
| M06L02 | Deploying and operating services | 120 | 7 |

## Integrative case

Design an order-processing system as event-driven microservices: set boundaries and data ownership, communicate order events through a broker with at-least-once handling, keep consistency with a saga and the outbox pattern, add a dead-letter queue and tracing, and evolve an event schema without breaking consumers.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0856-final-protected | 40 | 50 | yes |
| MST-0856-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Microservice boundaries | 7 |
| Synchronous vs asynchronous | 7 |
| Events and messaging | 7 |
| Consistency patterns | 7 |
| Resilience and observability | 6 |
| Delivery and operations | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0856-Q0001** (single-answer, Select ONE) A key reason to give each microservice its own database is to...

- A. preserve loose coupling and independent evolution **(key)**  
  _Rationale:_ Correct: private data stores let services evolve independently.
- B. save storage space  
  _Rationale:_ Separate databases do not primarily save storage.
- C. speed up joins across services  
  _Rationale:_ Cross-service joins become harder, not easier.
- D. avoid writing APIs  
  _Rationale:_ Services still need APIs to communicate.

**MST-0856-Q0002** (multiple-answer, Select TWO) Which TWO patterns help maintain consistency across services without a distributed transaction? (Select TWO.)

- A. Saga with compensating actions **(key)**  
  _Rationale:_ Correct: sagas coordinate steps with compensation on failure.
- B. Transactional outbox **(key)**  
  _Rationale:_ Correct: the outbox reliably publishes events with the local commit.
- C. A single ACID transaction spanning all services  
  _Rationale:_ Distributed ACID transactions are what these patterns avoid.
- D. Ignoring failures  
  _Rationale:_ Ignoring failures does not provide consistency.

**MST-0856-Q0003** (single-answer, Select ONE) With at-least-once delivery, consumers must be...

- A. idempotent to tolerate duplicate messages **(key)**  
  _Rationale:_ Correct: duplicates are possible, so processing must be idempotent.
- B. always stateful  
  _Rationale:_ Statefulness is not required by at-least-once delivery.
- C. strictly synchronous  
  _Rationale:_ At-least-once applies to asynchronous messaging.
- D. single-threaded  
  _Rationale:_ Threading is unrelated to delivery semantics.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
