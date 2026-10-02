# Spring Data JPA and Hibernate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0853` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Map entities and relationships with JPA annotations
2. Use Spring Data repositories and derived queries
3. Write JPQL and native queries with projections
4. Manage transactions and the persistence context
5. Diagnose and fix the N+1 problem and fetching strategy
6. Handle migrations, caching and performance tuning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Entity mapping (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Map a one-to-many with a join column; (2) Choose a cascade and orphan-removal setting
- Common misconception addressed: Making every relationship EAGER by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Entities, IDs and generation | 80 | 5 |
| M01L02 | Relationships and cascades | 80 | 5 |

### M02 Repositories (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Define findByStatusAndCreatedAfter; (2) Page and sort results
- Common misconception addressed: Writing boilerplate DAOs that repositories already provide
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Spring Data repository interfaces | 80 | 5 |
| M02L02 | Derived query methods | 80 | 5 |

### M03 Queries (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Write a JPQL query with a join; (2) Return a DTO projection instead of entities
- Common misconception addressed: Selecting whole entities when only a few columns are needed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | JPQL and @Query | 80 | 5 |
| M03L02 | Native queries and projections | 80 | 5 |

### M04 Transactions (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Set a read-only transaction for a query service; (2) Explain when changes are flushed
- Common misconception addressed: Expecting lazy fields to load outside the transaction
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | @Transactional and boundaries | 80 | 5 |
| M04L02 | The persistence context and flushing | 80 | 5 |

### M05 N+1 and fetching (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Spot N+1 queries in the log; (2) Fix it with a fetch join or entity graph
- Common misconception addressed: Fixing N+1 by switching everything to EAGER
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Diagnosing N+1 | 80 | 5 |
| M05L02 | Fetch joins and entity graphs | 80 | 5 |

### M06 Migrations and performance (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Add a versioned migration script; (2) Enable second-level cache for a read-mostly entity
- Common misconception addressed: Relying on hbm2ddl auto-update in production
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Schema migrations | 80 | 5 |
| M06L02 | Caching and tuning | 80 | 5 |

## Integrative case

Build the data layer for an orders service: map entities and their relationships, expose Spring Data repositories with derived and custom queries, manage transactions correctly, eliminate an N+1 query with the right fetch strategy, and add schema migration and basic caching with measured results.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0853-final-protected | 40 | 50 | yes |
| MST-0853-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Entity mapping | 7 |
| Repositories | 7 |
| Queries | 7 |
| Transactions | 7 |
| N+1 and fetching | 6 |
| Migrations and performance | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0853-Q0001** (single-answer, Select ONE) A list page issues one query for parents and then one query per parent for its children. This is:

- A. The N+1 select problem **(key)**  
  _Rationale:_ Correct: one query plus N child queries is the classic N+1 problem.
- B. A deadlock  
  _Rationale:_ A deadlock is mutual lock waiting, not repeated queries.
- C. Correct and optimal behaviour  
  _Rationale:_ It is a well-known performance anti-pattern.
- D. A transaction rollback  
  _Rationale:_ No rollback is implied by the pattern.

**MST-0853-Q0002** (single-answer, Select ONE) Accessing a LAZY association after the transaction has closed typically causes:

- A. A LazyInitializationException **(key)**  
  _Rationale:_ Correct: lazy loading needs an open persistence context; outside it, it fails.
- B. A successful silent load from the database  
  _Rationale:_ There is no session to load from once the context is closed.
- C. A compile-time error  
  _Rationale:_ It is a runtime error, not a compile-time one.
- D. Automatic switch to EAGER  
  _Rationale:_ Fetch type does not change automatically at access time.

**MST-0853-Q0003** (multiple-answer, Select TWO) Which TWO are sound ways to resolve an N+1 problem? (Select TWO.)

- A. Use a fetch join in the query **(key)**  
  _Rationale:_ Correct: a fetch join loads the association in one query.
- B. Use an entity graph to specify what to fetch **(key)**  
  _Rationale:_ Correct: entity graphs declare eager fetching for a specific query.
- C. Make every association EAGER globally  
  _Rationale:_ Global EAGER causes over-fetching and new performance problems.
- D. Disable transactions entirely  
  _Rationale:_ Disabling transactions does not address the query count and harms correctness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
