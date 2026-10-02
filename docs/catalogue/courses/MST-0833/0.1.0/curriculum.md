# .NET Microservices and Distributed Application Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0833` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (.NET microservices architecture guidance for containerized applications). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-MICROSERVICES (https://learn.microsoft.com/dotnet/architecture/microservices/; https://learn.microsoft.com/dotnet/architecture/microservices/architect-microservice-container-applications/microservices-architecture; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — .NET Microservices and Distributed Application Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the microservices architecture and when it is and is not appropriate
2. Identify service boundaries using domain context
3. Choose synchronous vs asynchronous communication patterns
4. Manage data per service and reason about eventual consistency
5. Design an API gateway and client-to-service communication
6. Address cross-cutting concerns: resiliency, health and observability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Microservices fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) List benefits and drawbacks for a given system; (2) Decide monolith vs microservices for a small team app
- Common misconception addressed: Assuming microservices are always better than a monolith
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What microservices are and trade-offs | 80 | 5 |
| M01L02 | When not to use microservices | 80 | 5 |

### M02 Service boundaries (MASTEMY-DESIGN 16%)

- Worked applications: (1) Split an app into bounded contexts; (2) Name the same concept correctly across two contexts
- Common misconception addressed: Drawing boundaries around technical layers instead of domains
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Domain context and boundaries | 80 | 5 |
| M02L02 | Identifying autonomous services | 80 | 5 |

### M03 Communication (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose query vs update communication style; (2) Publish a domain event to an event bus
- Common misconception addressed: Making chatty fine-grained synchronous calls between services
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Synchronous HTTP/REST | 80 | 5 |
| M03L02 | Asynchronous messaging and event bus | 80 | 5 |

### M04 Data management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Give two services independent data stores; (2) Design a saga for a cross-service transaction
- Common misconception addressed: Expecting ACID transactions across services
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Database-per-service | 80 | 5 |
| M04L02 | Eventual consistency and sagas | 80 | 5 |

### M05 Gateways and clients (MASTEMY-DESIGN 17%)

- Worked applications: (1) Place a gateway in front of three services; (2) Aggregate several service calls for one client request
- Common misconception addressed: Letting clients call every microservice directly
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | API gateway pattern | 80 | 5 |
| M05L02 | Client-to-microservice communication | 80 | 5 |

### M06 Cross-cutting concerns (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add retries and a circuit breaker; (2) Aggregate logs across services
- Common misconception addressed: Ignoring the operational complexity of distributed systems
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Resiliency and health checks | 80 | 5 |
| M06L02 | Logging and monitoring | 80 | 5 |

## Integrative case

Decompose a monolithic ordering application into microservices: define boundaries from the domain, choose HTTP for queries and an event bus for cross-service updates, give each service its own data store, place an API gateway in front, and add health checks and retries.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0833-final-protected | 40 | 50 | yes |
| MST-0833-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Microservices fundamentals | 7 |
| Service boundaries | 7 |
| Communication | 7 |
| Data management | 7 |
| Gateways and clients | 6 |
| Cross-cutting concerns | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0833-Q0001** (single-answer, Select ONE) Which communication style does the .NET microservices guidance recommend for propagating changes across multiple services?

- A. Asynchronous messaging via an event bus **(key)**  
  _Rationale:_ Correct: publish/subscribe messaging decouples services when propagating updates.
- B. Fine-grained synchronous RPC calls  
  _Rationale:_ Chatty synchronous calls perform poorly and couple services.
- C. A shared database all services write to  
  _Rationale:_ A shared database breaks service autonomy.
- D. Direct in-process method calls  
  _Rationale:_ Services run in separate processes; in-process calls are not possible.

**MST-0833-Q0002** (multiple-answer, Select TWO) Which TWO statements about data in a microservices architecture are correct? (Select TWO.)

- A. Each microservice typically owns its own data store **(key)**  
  _Rationale:_ Correct: database-per-service preserves autonomy.
- B. Cross-service consistency is usually eventual, not atomic **(key)**  
  _Rationale:_ Correct: atomic transactions across services are generally not possible.
- C. All services should share one relational database for consistency  
  _Rationale:_ A shared database couples services and breaks autonomy.
- D. Two-phase commit across services is the recommended default  
  _Rationale:_ Distributed transactions are avoided; eventual consistency is preferred.

**MST-0833-Q0003** (single-answer, Select ONE) A small team with a simple, stable application is considering microservices. What does the guidance suggest?

- A. Microservices add operational complexity and suit large, complex, evolving systems rather than simple ones **(key)**  
  _Rationale:_ Correct: the added complexity is only worth it for large, complex applications.
- B. Always choose microservices because they are more modern  
  _Rationale:_ Architecture choice depends on the system, not fashion.
- C. Microservices remove all deployment complexity  
  _Rationale:_ They increase deployment and operational complexity.
- D. Microservices require no changes to communication  
  _Rationale:_ Moving to services changes in-process calls to network calls.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
