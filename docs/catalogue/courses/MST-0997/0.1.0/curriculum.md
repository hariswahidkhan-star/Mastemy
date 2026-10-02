# Cloud-Native Architecture and Distributed-System Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0997` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-DS-002 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Cloud-Native Architecture and Distributed-System Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Cloud-native foundations and the twelve-factor baseline
2. Service decomposition and bounded contexts
3. Resilience patterns for distributed calls
4. Data management across services
5. Communication and API styles
6. Observability and operability
7. Deployment, scaling and rollout

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cloud-native foundations and the twelve-factor baseline (MASTEMY-DESIGN 15%)

- Worked applications: (1) Classify an application against the twelve-factor criteria; (2) Externalise configuration and make a service stateless
- Common misconception addressed: Believing 'cloud-native' simply means 'runs in the cloud'
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What cloud-native means and when it helps | 103 | 6 |
| M01L02 | Twelve-factor configuration, state and disposability | 103 | 6 |

### M02 Service decomposition and bounded contexts (MASTEMY-DESIGN 15%)

- Worked applications: (1) Draw bounded contexts from a domain model; (2) Decide whether two capabilities belong in one service or two
- Common misconception addressed: Assuming smaller services are always better regardless of coupling
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Finding service boundaries with bounded contexts | 103 | 6 |
| M02L02 | Sizing services and avoiding the distributed monolith | 103 | 6 |

### M03 Resilience patterns for distributed calls (MASTEMY-DESIGN 14%)

- Worked applications: (1) Add a bounded retry with jitter to a flaky dependency; (2) Place a circuit breaker to stop a cascading failure
- Common misconception addressed: Thinking retries alone improve reliability without timeouts or idempotency
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Timeouts, retries, and idempotency | 103 | 6 |
| M03L02 | Circuit breakers, bulkheads and backpressure | 103 | 6 |

### M04 Data management across services (MASTEMY-DESIGN 14%)

- Worked applications: (1) Replace a cross-service join with data ownership and replication; (2) Coordinate a multi-step change with a saga
- Common misconception addressed: Expecting ACID transactions to span independent services
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Database-per-service and shared-nothing data | 103 | 6 |
| M04L02 | Eventual consistency, sagas and the outbox pattern | 103 | 6 |

### M05 Communication and API styles (MASTEMY-DESIGN 14%)

- Worked applications: (1) Choose sync vs async for a given call path; (2) Version a public API without breaking existing clients
- Common misconception addressed: Treating synchronous calls as free and always safe to chain
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Synchronous REST/gRPC versus asynchronous messaging | 103 | 6 |
| M05L02 | Service discovery, gateways and API versioning | 103 | 6 |

### M06 Observability and operability (MASTEMY-DESIGN 14%)

- Worked applications: (1) Instrument a request with a correlation/trace ID end to end; (2) Define an SLO and an error budget for a service
- Common misconception addressed: Believing more dashboards equal better observability
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Logs, metrics and distributed tracing | 103 | 6 |
| M06L02 | Health checks, SLOs and graceful degradation | 103 | 6 |

### M07 Deployment, scaling and rollout (MASTEMY-DESIGN 14%)

- Worked applications: (1) Pick an autoscaling signal that matches the workload; (2) Design a canary rollout with an automated rollback trigger
- Common misconception addressed: Assuming horizontal scaling fixes a bottleneck that is really in the datastore
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Containers, orchestration and autoscaling signals | 102 | 6 |
| M07L02 | Blue-green, canary and progressive delivery | 102 | 6 |

## Integrative case

Design the service topology for a retail order platform expected to scale 10x: choose service boundaries, a resilience pattern per call path, a data-consistency strategy, and a deployment/rollout approach, then justify the trade-offs to an architecture review board.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0997-final-protected | 35 | 35 | yes |
| MST-0997-final-alternate | 35 | 35 | no (optional practice) |

Minimum reviewed item bank: 490 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0997-Q0001** (single-answer, Select ONE) A service calls a downstream dependency that occasionally hangs. Which change most directly prevents one slow call from exhausting the caller's threads?

- A. Set an explicit request timeout on the downstream call **(key)**  
  _Rationale:_ Correct: a timeout bounds how long a call can hold a thread, preventing exhaustion from hangs.
- B. Increase the retry count to five  
  _Rationale:_ More retries without a timeout can worsen thread exhaustion, not prevent it.
- C. Add more log statements around the call  
  _Rationale:_ Logging aids diagnosis but does not bound the call duration.
- D. Cache the successful responses  
  _Rationale:_ Caching helps repeat reads but does nothing for a hanging first call.

**MST-0997-Q0002** (multiple-answer, Select TWO) Which TWO properties must hold before it is safe to automatically retry a failed write to a downstream service? (Select TWO)

- A. The operation is idempotent **(key)**  
  _Rationale:_ Correct: idempotency means a repeated write does not create duplicate effects.
- B. Each attempt uses a bounded timeout **(key)**  
  _Rationale:_ Correct: a timeout ensures each attempt releases resources so retries are controlled.
- C. The service shares a database with the caller  
  _Rationale:_ A shared database is an anti-pattern here and is unrelated to safe retries.
- D. The caller disables all logging during retries  
  _Rationale:_ Disabling logging removes diagnostics and does not make retries safe.

**MST-0997-Q0003** (single-answer, Select ONE) Two microservices need to stay consistent after a multi-step business operation that cannot use a single ACID transaction. Which approach is designed for this?

- A. A saga coordinating local transactions with compensating actions **(key)**  
  _Rationale:_ Correct: a saga sequences local transactions and compensations to reach eventual consistency.
- B. A distributed two-phase lock held for the whole operation  
  _Rationale:_ Long-held distributed locks harm availability and are avoided in this style.
- C. Pointing both services at one shared table  
  _Rationale:_ Shared tables reintroduce tight coupling and break service ownership.
- D. Disabling consistency checks entirely  
  _Rationale:_ Abandoning consistency is not a strategy; the saga exists to manage it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
