# Microservices Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1568` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microservices Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Microservices fundamentals and trade-offs
2. Service decomposition and boundaries
3. Inter-service communication
4. Data management per service
5. Resilience, observability and deployment
6. Security and API gateways

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Microservices fundamentals and trade-offs (MASTEMY-DESIGN 16%)

- Worked applications: (1) Decide whether a given system benefits from microservices; (2) List two costs microservices add over a monolith
- Common misconception addressed: Believing microservices are always better than a monolith
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What microservices are and when to use them | 80 | 6 |
| M01L02 | Trade-offs vs a monolith | 80 | 6 |

### M02 Service decomposition and boundaries (MASTEMY-DESIGN 17%)

- Worked applications: (1) Split a domain into two bounded contexts; (2) Spot a decomposition that created a distributed monolith
- Common misconception addressed: Decomposing by technical layer instead of business capability
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Domain-driven boundaries and bounded contexts | 80 | 6 |
| M02L02 | Sizing services and avoiding a distributed monolith | 80 | 6 |

### M03 Inter-service communication (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose sync or async for a given interaction; (2) Version an API without breaking consumers
- Common misconception addressed: Assuming synchronous calls are free and always reliable
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Synchronous APIs vs asynchronous messaging | 80 | 6 |
| M03L02 | Contracts, versioning and failure handling | 80 | 6 |

### M04 Data management per service (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model data ownership for two services; (2) Design a saga for a multi-service transaction
- Common misconception addressed: Sharing one database across services for convenience
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Database-per-service and data ownership | 80 | 6 |
| M04L02 | Eventual consistency and the saga pattern | 80 | 6 |

### M05 Resilience, observability and deployment (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a circuit breaker to a failing dependency call; (2) Trace a request across three services
- Common misconception addressed: Retrying aggressively without timeouts or backoff
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Timeouts, retries and circuit breakers | 80 | 6 |
| M05L02 | Observability: logs, metrics and tracing | 80 | 6 |

### M06 Security and API gateways (MASTEMY-DESIGN 18%)

- Worked applications: (1) Place cross-cutting concerns at the gateway; (2) Choose a service-to-service authentication approach
- Common misconception addressed: Trusting internal traffic and skipping service-to-service auth
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | API gateways and edge concerns | 80 | 6 |
| M06L02 | Service-to-service auth and secrets | 80 | 6 |

## Integrative case

Design a microservices version of an order system: decide it is justified, split it into bounded contexts with their own data, choose synchronous and asynchronous communication appropriately, add a saga for a cross-service transaction, make calls resilient with timeouts and a circuit breaker, add tracing, and secure both the edge and service-to-service calls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1568-final-protected | 30 | 30 | yes |
| MST-1568-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Microservices fundamentals and trade-offs | 5 |
| Service decomposition and boundaries | 5 |
| Inter-service communication | 5 |
| Data management per service | 5 |
| Resilience, observability and deployment | 5 |
| Security and API gateways | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1568-Q0001** (single-answer, Select ONE) What is a primary reason to prefer a database-per-service in microservices?

- A. So each service owns its data and can evolve its schema independently **(key)**  
  _Rationale:_ Correct: independent data ownership reduces coupling between services.
- B. Because sharing one database is impossible  
  _Rationale:_ Sharing is possible but discouraged; it is not impossible.
- C. Because it guarantees strong consistency across all services  
  _Rationale:_ Database-per-service typically embraces eventual consistency, not strong global consistency.
- D. Because it removes the need for any API contracts  
  _Rationale:_ Services still need contracts to communicate.

**MST-1568-Q0002** (multiple-answer, Select ALL that apply) Which two patterns improve resilience when one service calls another over the network? (Select TWO)

- A. Timeouts with bounded retries and backoff **(key)**  
  _Rationale:_ Correct: timeouts and controlled retries prevent waiting forever and limit load.
- B. A circuit breaker that stops calling a failing dependency **(key)**  
  _Rationale:_ Correct: a circuit breaker prevents cascading failure.
- C. Retrying immediately and indefinitely on every error  
  _Rationale:_ Unbounded immediate retries amplify load and can cause a storm.
- D. Removing all error handling to simplify the code  
  _Rationale:_ Removing error handling reduces resilience.

**MST-1568-Q0003** (single-answer, Select ONE) A team splits a system into services but every request still needs all of them to be up together. What problem does this indicate?

- A. A distributed monolith, where services are coupled and cannot deploy or fail independently **(key)**  
  _Rationale:_ Correct: tight runtime coupling defeats the purpose of microservices.
- B. A correctly decomposed set of microservices  
  _Rationale:_ Independent deploy and failure are missing, so it is not well decomposed.
- C. A monolith with no network calls  
  _Rationale:_ There are services and network calls; it is distributed.
- D. A serverless architecture  
  _Rationale:_ The symptom describes coupling, not a serverless model.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
