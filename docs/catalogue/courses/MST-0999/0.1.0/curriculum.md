# Microservices: Boundaries, Communication, and Failure Handling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0999` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Microservices: Boundaries, Communication, and Failure Handling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define service boundaries from business capabilities and data ownership
2. Choose appropriate synchronous and asynchronous communication patterns
3. Manage data and consistency across services with sagas and reliable messaging
4. Apply resilience patterns and cross-service observability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Foundations and boundaries (25%, MASTEMY-DESIGN)

- Worked applications: (1) Draw service boundaries for a domain and justify each seam; (2) Decide whether a capability should be its own service
- Common misconception addressed: Splitting services by technical layer instead of business capability
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Monolith versus microservices tradeoffs | 120 | 6 |
| M01L02 | Service boundaries and bounded contexts | 120 | 6 |
| M01L03 | Decomposition strategies | 120 | 6 |
| M01L04 | Data ownership per service | 120 | 6 |

### M02 Communication patterns (25%, MASTEMY-DESIGN)

- Worked applications: (1) Choose sync versus async for three inter-service interactions; (2) Evolve an API without breaking existing consumers
- Common misconception addressed: Making everything synchronous and creating a distributed monolith
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Synchronous APIs: REST and gRPC | 120 | 6 |
| M02L02 | Asynchronous messaging and events | 120 | 6 |
| M02L03 | Choreography versus orchestration | 120 | 6 |
| M02L04 | API versioning and contracts | 120 | 6 |

### M03 Data and consistency (25%, MASTEMY-DESIGN)

- Worked applications: (1) Design a saga for a multi-service order with compensation; (2) Use an outbox to publish events reliably with a local commit
- Common misconception addressed: Reaching for a two-phase commit across services instead of a saga
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Database per service | 120 | 6 |
| M03L02 | Sagas and eventual consistency | 120 | 6 |
| M03L03 | Outbox and idempotent consumers | 120 | 6 |
| M03L04 | Avoiding distributed transactions | 120 | 6 |

### M04 Resilience and operations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Add a circuit breaker and timeout to a flaky dependency call; (2) Trace a request across three services to find a latency source
- Common misconception addressed: Omitting timeouts so one slow service stalls the whole call chain
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Timeouts, retries and circuit breakers | 120 | 6 |
| M04L02 | Bulkheads and backpressure | 120 | 6 |
| M04L03 | Observability: tracing across services | 120 | 6 |
| M04L04 | Deployment, discovery and config | 120 | 6 |

## Integrative case

A monolith is being split so teams can deploy independently, but early services already fail together. Define boundaries, pick communication patterns, design a saga for a cross-service workflow, and add resilience controls, defending each choice.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0999-final-protected | 144 | 144 | yes |
| MST-0999-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Foundations and boundaries | 36 |
| Communication patterns | 36 |
| Data and consistency | 36 |
| Resilience and operations | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0999-Q0001** (single-answer, Select ONE) Several microservices call each other synchronously, so one service's slowness stalls the whole request chain. Which pattern most directly contains this failure?

- A. A circuit breaker with timeouts on the dependency call **(key)**  
  _Rationale:_ Correct: a circuit breaker plus timeouts stops calls to a failing dependency from blocking the caller.
- B. Sharing a single database across all services  
  _Rationale:_ A shared database increases coupling and does not contain call-chain failures.
- C. Removing all asynchronous messaging  
  _Rationale:_ Removing async messaging increases synchronous coupling, worsening the problem.
- D. Deploying all services as one unit  
  _Rationale:_ That recreates a monolith rather than containing the failure.

**MST-0999-Q0002** (single-answer, Select ONE) A business operation spans three services and must stay consistent without a distributed transaction. Which pattern fits?

- A. A saga with compensating actions **(key)**  
  _Rationale:_ Correct: a saga coordinates local transactions and compensates on failure, giving eventual consistency without 2PC.
- B. A two-phase commit across all three databases  
  _Rationale:_ Distributed 2PC is the pattern microservices avoid due to coupling and availability costs.
- C. A single shared transaction table locked by all services  
  _Rationale:_ A shared lock reintroduces tight coupling and a bottleneck.
- D. Ignoring consistency entirely  
  _Rationale:_ The requirement is to stay consistent, so ignoring it is not a valid option.

**MST-0999-Q0003** (multiple-answer, Select TWO) Which TWO guidelines lead to healthy microservice boundaries? (Select TWO)

- A. Align each service to a business capability or bounded context **(key)**  
  _Rationale:_ Correct: capability-aligned services change for one reason and stay cohesive.
- B. Give each service ownership of its own data **(key)**  
  _Rationale:_ Correct: private data ownership reduces coupling and lets services evolve independently.
- C. Split services by technical layer (UI, logic, data)  
  _Rationale:_ Layer-based splits spread one change across many services.
- D. Share one database schema across all services  
  _Rationale:_ A shared schema couples services and blocks independent change.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
