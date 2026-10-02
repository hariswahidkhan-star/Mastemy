# GraphQL

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1555` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-G-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — GraphQL (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. GraphQL foundations
2. Queries
3. Schema design
4. Resolvers
5. Mutations
6. Performance
7. Errors and security
8. Clients and tooling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on designing and consuming GraphQL APIs; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 GraphQL foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a schema in SDL for a type; (2) Compare over-fetching in REST vs GraphQL
- Common misconception addressed: Thinking GraphQL replaces the database rather than the API layer
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | GraphQL vs REST | 75 | 5 |
| M01L02 | The type system and SDL | 75 | 5 |

### M02 Queries (MASTEMY-DESIGN 13%)

- Worked applications: (1) Query nested related objects in one request; (2) Reuse fields with a fragment
- Common misconception addressed: Assuming a query automatically limits result depth
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fields, arguments and aliases | 75 | 5 |
| M02L02 | Nested queries and fragments | 75 | 5 |

### M03 Schema design (MASTEMY-DESIGN 12%)

- Worked applications: (1) Model a relationship with object types; (2) Use an interface for shared fields
- Common misconception addressed: Designing one giant type instead of composable types
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Object, scalar and enum types | 75 | 5 |
| M03L02 | Interfaces and unions | 75 | 5 |

### M04 Resolvers (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a resolver for a nested field; (2) Pass auth info through the context
- Common misconception addressed: Doing a database call in every field resolver blindly
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Resolver functions and the resolver chain | 75 | 5 |
| M04L02 | Context and arguments | 75 | 5 |

### M05 Mutations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add a mutation that creates a record; (2) Design an input type and payload
- Common misconception addressed: Returning only a boolean instead of the updated object
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Writing mutations | 75 | 5 |
| M05L02 | Input types and return payloads | 75 | 5 |

### M06 Performance (MASTEMY-DESIGN 13%)

- Worked applications: (1) Batch related lookups with a DataLoader; (2) Measure resolver query counts
- Common misconception addressed: Ignoring N+1 until it causes production load
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | The N+1 problem | 75 | 5 |
| M06L02 | DataLoader and batching | 75 | 5 |

### M07 Errors and security (MASTEMY-DESIGN 12%)

- Worked applications: (1) Return partial data with errors; (2) Limit query depth to prevent abuse
- Common misconception addressed: Exposing internal error details to clients
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Error handling in GraphQL | 75 | 5 |
| M07L02 | Query depth/complexity limits | 75 | 5 |

### M08 Clients and tooling (MASTEMY-DESIGN 12%)

- Worked applications: (1) Consume the API from a client with variables; (2) Deprecate a field without breaking clients
- Common misconception addressed: Making breaking schema changes without deprecation
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Querying from a client | 75 | 5 |
| M08L02 | Caching and schema evolution | 75 | 5 |

## Integrative case

Design a GraphQL API for a movie catalogue: define a schema with types and relationships, write resolvers, add a mutation, address the N+1 problem with batching, and decide what to expose versus keep internal.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1555-final-protected | 40 | 40 | yes |
| MST-1555-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GraphQL foundations | 5 |
| Queries | 5 |
| Schema design | 5 |
| Resolvers | 5 |
| Mutations | 5 |
| Performance | 5 |
| Errors and security | 5 |
| Clients and tooling | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1555-Q0001** (single-answer, Select ONE) How does GraphQL primarily reduce over-fetching compared with REST?

- A. Clients request exactly the fields they need in a single query **(key)**  
  _Rationale:_ Correct: the client specifies the shape of the response.
- B. It compresses the HTTP response automatically  
  _Rationale:_ Compression is unrelated to the GraphQL model.
- C. It caches all responses on the server  
  _Rationale:_ GraphQL does not mandate server caching.
- D. It removes the need for a backend database  
  _Rationale:_ A data source is still required.

**MST-1555-Q0002** (single-answer, Select ONE) What problem does a DataLoader solve in a GraphQL server?

- A. The N+1 problem, by batching and caching related lookups within a request **(key)**  
  _Rationale:_ Correct: it coalesces many per-field lookups into batched calls.
- B. Schema validation at build time  
  _Rationale:_ That is handled by the type system/tooling.
- C. Authentication of clients  
  _Rationale:_ Auth is handled via context, not DataLoader.
- D. Rendering the GraphQL playground  
  _Rationale:_ Unrelated to batching.

**MST-1555-Q0003** (multiple-answer, Select ALL that apply) Which statements about GraphQL mutations are correct? (Select TWO)

- A. Input types group the arguments a mutation accepts **(key)**  
  _Rationale:_ Correct: input types keep mutation signatures tidy and reusable.
- B. Returning the modified object lets clients update their cache **(key)**  
  _Rationale:_ Correct: returning the payload avoids an extra query.
- C. Mutations are read-only operations  
  _Rationale:_ False; mutations perform writes.
- D. A schema may define at most one mutation  
  _Rationale:_ False; a schema can define many mutations.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
