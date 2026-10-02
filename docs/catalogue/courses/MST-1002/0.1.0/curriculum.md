# System Design: Scalability, Reliability, and Tradeoffs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1002` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — System Design: Scalability, Reliability, and Tradeoffs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Translate requirements into capacity estimates and measurable SLOs
2. Apply scaling, caching and partitioning strategies appropriately
3. Reason about reliability, consistency models and failure handling
4. Design asynchronous, observable architectures with sound cost tradeoffs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Foundations and requirements (25%, MASTEMY-DESIGN)

- Worked applications: (1) Estimate storage and QPS for a described service; (2) Turn vague goals into measurable SLOs
- Common misconception addressed: Jumping to a design before clarifying requirements and constraints
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Functional and non-functional requirements | 120 | 6 |
| M01L02 | Estimation: capacity and back-of-envelope | 120 | 6 |
| M01L03 | Latency, throughput and SLAs/SLOs | 120 | 6 |
| M01L04 | Reasoning about tradeoffs | 120 | 6 |

### M02 Scaling and data (25%, MASTEMY-DESIGN)

- Worked applications: (1) Add a cache layer and choose an invalidation strategy for a read-heavy path; (2) Pick a shard key and explain the hotspot it avoids
- Common misconception addressed: Adding a cache without a plan for invalidation and staleness
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Vertical versus horizontal scaling | 120 | 6 |
| M02L02 | Load balancing and statelessness | 120 | 6 |
| M02L03 | Caching strategies and invalidation | 120 | 6 |
| M02L04 | Sharding, replication and partitioning | 120 | 6 |

### M03 Reliability and consistency (25%, MASTEMY-DESIGN)

- Worked applications: (1) Decide strong versus eventual consistency for two features; (2) Design a retry-with-backoff that avoids a thundering herd
- Common misconception addressed: Believing you can have perfect consistency, availability and partition tolerance at once
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CAP and consistency models | 120 | 6 |
| M03L02 | Replication and quorums | 120 | 6 |
| M03L03 | Idempotency, retries and backpressure | 120 | 6 |
| M03L04 | Failure modes and graceful degradation | 120 | 6 |

### M04 Architecture and operations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Introduce a queue to decouple a spiky producer from a slow consumer; (2) Choose rate-limit tiers and justify them against capacity
- Common misconception addressed: Treating synchronous calls as free and ignoring cascading failures
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Queues, streams and async processing | 120 | 6 |
| M04L02 | API design and rate limiting | 120 | 6 |
| M04L03 | Observability: metrics, logs, traces | 120 | 6 |
| M04L04 | Capacity planning and cost tradeoffs | 120 | 6 |

## Integrative case

A product expects a 20x traffic surge for a launch. Produce a design that scales reads and writes, degrades gracefully under partial failure, and meets an SLO, then defend each consistency and caching tradeoff to reviewers.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1002-final-protected | 144 | 144 | yes |
| MST-1002-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Foundations and requirements | 36 |
| Scaling and data | 36 |
| Reliability and consistency | 36 |
| Architecture and operations | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1002-Q0001** (single-answer, Select ONE) A read-heavy endpoint is overloading the database. Which change most directly reduces database read load for repeated queries?

- A. Add a cache in front of the database with an invalidation strategy **(key)**  
  _Rationale:_ Correct: caching repeated reads offloads the database, provided staleness is managed by invalidation.
- B. Switch the database to synchronous replication  
  _Rationale:_ Synchronous replication adds write latency and does not reduce read load.
- C. Increase the API's request timeout  
  _Rationale:_ A longer timeout does not reduce the number of database reads.
- D. Remove the load balancer  
  _Rationale:_ Removing the load balancer reduces capacity and availability.

**MST-1002-Q0002** (single-answer, Select ONE) During a network partition, a system must keep serving requests even if some replicas show slightly stale data. Which tradeoff is being chosen?

- A. Availability over strong consistency **(key)**  
  _Rationale:_ Correct: under a partition, serving possibly-stale data favours availability over strong consistency (per CAP).
- B. Consistency over availability  
  _Rationale:_ Choosing consistency would reject requests it cannot serve consistently, reducing availability.
- C. Durability over latency  
  _Rationale:_ The scenario is about partition behaviour, not durability versus latency.
- D. Throughput over correctness of writes  
  _Rationale:_ The described choice concerns read staleness during a partition, not write correctness tradeoffs.

**MST-1002-Q0003** (multiple-answer, Select TWO) Which TWO practices improve a system's resilience to downstream failures? (Select TWO)

- A. Retries with exponential backoff and jitter **(key)**  
  _Rationale:_ Correct: backoff with jitter spreads retries and avoids a synchronized thundering herd.
- B. Graceful degradation that serves reduced functionality **(key)**  
  _Rationale:_ Correct: degrading gracefully keeps core service available when a dependency fails.
- C. Unlimited immediate retries on every error  
  _Rationale:_ Immediate unbounded retries amplify load and can cause cascading failure.
- D. Removing all timeouts so calls always wait  
  _Rationale:_ No timeouts let failures tie up resources and spread.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
