# GraphQL APIs with TypeScript

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0888` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design a GraphQL schema with types, queries, mutations and the type system
2. Implement resolvers in TypeScript and avoid the N+1 query problem
3. Secure a GraphQL API with authentication, authorization and query limits
4. Apply performance and versioning practices suited to GraphQL

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **n/a-no-official-syllabus**. Source(s) consulted:
- none (no external source; Mastemy skills course)

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Schema and type design

- Purpose: Teach schema-first design and the GraphQL type system in TypeScript.
- Worked applications: (1) Model a blog domain as GraphQL types, queries and mutations; (2) Use non-null and list modifiers to express a precise contract
- Common misconception addressed: Designing GraphQL as if it were REST endpoints under a single URL
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | GraphQL vs REST | 80 | 5 |
| M01L02 | Types, queries and mutations | 80 | 5 |
| M01L03 | Schema-first design with TypeScript | 80 | 5 |

### M02 Resolvers and data loading

- Purpose: Teach resolvers and solving the N+1 problem with batching.
- Worked applications: (1) Write a resolver that loads an author for each post; (2) Introduce a dataloader to batch and cache the author lookups
- Common misconception addressed: Ignoring the N+1 problem and issuing one query per item
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing resolvers in TypeScript | 80 | 5 |
| M02L02 | The N+1 problem | 80 | 5 |
| M02L03 | Batching and caching with dataloaders | 80 | 5 |

### M03 Security and performance

- Purpose: Teach auth, query-cost limits and GraphQL-appropriate versioning.
- Worked applications: (1) Add field-level authorization to a sensitive field; (2) Add query depth/complexity limits to block abusive queries
- Common misconception addressed: Exposing an unbounded query that lets clients request arbitrarily deep data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Authentication and field authorization | 80 | 5 |
| M03L02 | Query depth and cost limiting | 80 | 5 |
| M03L03 | Evolving a schema without breaking clients | 80 | 5 |

## Integrative case

A TypeScript GraphQL API is slow and exposes too much. Fix the N+1 problem with dataloaders, add field-level authorization and query-cost limits, and evolve the schema without breaking existing clients.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0888-final-protected | 30 | 30 | yes |
| MST-0888-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Schema and type design | 10 |
| Resolvers and data loading | 10 |
| Security and performance | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0888-Q0001** (single-answer, Select ONE) How does a typical GraphQL API differ from a typical REST API in how clients fetch data?

- A. Clients query a single endpoint and ask for exactly the fields they need **(key)**  
  _Rationale:_ Correct: GraphQL exposes one endpoint and lets clients shape the response.
- B. Each resource must have its own URL and fixed response shape  
  _Rationale:_ That is the REST style GraphQL is being contrasted with.
- C. GraphQL cannot express relationships between types  
  _Rationale:_ GraphQL is built around typed relationships between objects.
- D. GraphQL responses are always larger than REST responses  
  _Rationale:_ GraphQL often reduces over-fetching by returning only requested fields.

**MST-0888-Q0002** (multiple-answer, Select TWO) Select TWO effective ways to address the N+1 query problem in a GraphQL resolver layer.

- A. Batch related lookups within a tick using a dataloader **(key)**  
  _Rationale:_ Correct: dataloaders batch many lookups into fewer queries.
- B. Cache repeated lookups for the duration of a request **(key)**  
  _Rationale:_ Correct: per-request caching avoids repeating identical lookups.
- C. Issue one database query per item in a list  
  _Rationale:_ That is exactly the N+1 pattern being avoided.
- D. Remove all relationships from the schema  
  _Rationale:_ Stripping relationships breaks the API rather than fixing performance.
- E. Disable the resolver and return null  
  _Rationale:_ Returning null removes functionality, not the performance root cause.

**MST-0888-Q0003** (single-answer, Select ONE) Why add query depth or complexity limits to a public GraphQL API?

- A. To prevent abusive, arbitrarily deep or expensive queries from overloading the server **(key)**  
  _Rationale:_ Correct: cost/depth limits protect the server from expensive or malicious queries.
- B. To force every client to use REST instead  
  _Rationale:_ Limits constrain queries; they do not switch the protocol.
- C. To make the schema untyped  
  _Rationale:_ Limits do not change the type system.
- D. To remove the need for authentication  
  _Rationale:_ Query limits do not replace authentication or authorization.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
