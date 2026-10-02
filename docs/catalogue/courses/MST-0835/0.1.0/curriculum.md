# .NET Domain-Driven Design and CQRS

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0835` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-DDD-CQRS** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model a domain with aggregates, entities and value objects and protect invariants
2. Separate commands from queries using a CQRS approach in .NET
3. Implement command handlers and a mediator pipeline for cross-cutting concerns
4. Use domain events to coordinate side effects and eventual consistency

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Domain modeling with aggregates

- Purpose: Teach aggregates, entities, value objects and how aggregate roots protect invariants.
- Worked applications: (1) Model an Order aggregate where OrderItems can only change through the aggregate root; (2) Replace a primitive address with an immutable value object and justify equality by value
- Common misconception addressed: Treating every database table as its own aggregate root
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Entities, value objects and aggregates | 80 | 5 |
| M01L02 | Aggregate roots and invariants | 80 | 5 |
| M01L03 | Repositories per aggregate | 80 | 5 |

### M02 CQRS and the command pipeline

- Purpose: Teach separating reads from writes and implementing command handlers via a mediator.
- Worked applications: (1) Split an order workflow into a PlaceOrderCommand and an OrderSummary query model; (2) Add a validation and logging behavior to the MediatR pipeline for all commands
- Common misconception addressed: Thinking CQRS always requires two separate databases
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Commands vs queries and CQRS levels | 80 | 5 |
| M02L02 | Command handlers and the mediator pattern | 80 | 5 |
| M02L03 | Cross-cutting concerns with pipeline behaviors | 80 | 5 |

### M03 Domain events and consistency

- Purpose: Teach domain events, side-effect coordination and eventual consistency across aggregates.
- Worked applications: (1) Raise an OrderStarted domain event and handle it to create a Buyer if missing; (2) Decide which updates stay in one transaction and which become eventually consistent
- Common misconception addressed: Updating multiple aggregates inside a single transaction as a default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Domain events design and dispatch | 80 | 5 |
| M03L02 | Eventual consistency between aggregates | 80 | 5 |
| M03L03 | Integration events beyond the boundary | 80 | 5 |

## Integrative case

An ordering service has tangled business rules spread across controllers. Model the Order aggregate, apply CQRS so reporting queries stop fighting the write model, and use domain events to keep buyer records consistent without one giant transaction.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0835-final-protected | 30 | 30 | yes |
| MST-0835-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Domain modeling with aggregates | 10 |
| CQRS and the command pipeline | 10 |
| Domain events and consistency | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0835-Q0001** (single-answer, Select ONE) In DDD, what is the primary responsibility of an aggregate root?

- A. To enforce the invariants of the whole aggregate and be the only entry point for changes **(key)**  
  _Rationale:_ Correct: the aggregate root guards consistency and is the single channel for modifying the aggregate.
- B. To map directly to a single database table  
  _Rationale:_ An aggregate may span several tables; persistence shape is not its defining role.
- C. To expose all child entities for direct external modification  
  _Rationale:_ Direct external modification of children bypasses invariant protection and is discouraged.
- D. To hold only query logic for reporting  
  _Rationale:_ Reporting/query concerns belong to the read side in CQRS, not the aggregate root.

**MST-0835-Q0002** (multiple-answer, Select TWO) Select TWO statements that correctly describe a simplified CQRS approach as used in the .NET microservices guidance.

- A. Queries are side-effect free and can use a simpler read model **(key)**  
  _Rationale:_ Correct: queries are idempotent and may use a dedicated read model.
- B. Commands change state and are a good place to apply DDD patterns **(key)**  
  _Rationale:_ Correct: the transactional write side benefits from DDD modeling.
- C. CQRS always mandates separate read and write databases  
  _Rationale:_ A simplified CQRS can use the same database for both sides.
- D. Queries should mutate aggregates to stay consistent  
  _Rationale:_ Queries must not change state; that would violate CQRS.
- E. Commands and queries must share one identical model  
  _Rationale:_ CQRS deliberately allows different models for reads and writes.

**MST-0835-Q0003** (single-answer, Select ONE) You must propagate a side effect across two aggregates after an order starts, favoring scalability and fewer database locks. What approach fits the DDD guidance best?

- A. Raise a domain event and use eventual consistency between the aggregates **(key)**  
  _Rationale:_ Correct: domain events with eventual consistency reduce lock contention across aggregates.
- B. Update both aggregates inside one large transaction by default  
  _Rationale:_ A single transaction across aggregates increases locking and is discouraged as a default.
- C. Let one aggregate directly navigate and mutate the other  
  _Rationale:_ Direct navigation and mutation across aggregates breaks boundaries and invariants.
- D. Perform the side effect in a read query handler  
  _Rationale:_ Query handlers must remain side-effect free.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
