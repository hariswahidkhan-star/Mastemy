# MongoDB: Document Database Modeling and Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0949` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — MongoDB: Document Database Modeling and Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Document data model
2. CRUD operations
3. Aggregation framework
4. Indexing and performance
5. Data integrity and transactions
6. Operations and security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Document data model (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a product with embedded reviews; (2) Decide embed vs reference for orders and customers
- Common misconception addressed: Forcing rigid relational tables onto document data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Documents, collections and BSON | 80 | 6 |
| M01L02 | Designing a document schema | 80 | 6 |
| M01L03 | Embedding vs referencing | 80 | 6 |

### M02 CRUD operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Query products by price range with operators; (2) Update a nested field with the positional operator
- Common misconception addressed: Assuming find() returns documents rather than a cursor
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Inserting and reading documents | 80 | 6 |
| M02L02 | Query operators and projection | 80 | 6 |
| M02L03 | Updating and deleting | 80 | 6 |

### M03 Aggregation framework (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute average rating per category with $group; (2) Join two collections with $lookup
- Common misconception addressed: Expecting pipeline stages to run in any order
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pipeline stages | 80 | 6 |
| M03L02 | Grouping and accumulators | 80 | 6 |
| M03L03 | Lookup and reshaping | 80 | 6 |

### M04 Indexing and performance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a compound index for a common filter-and-sort; (2) Read explain() to confirm an index is used
- Common misconception addressed: Believing an index covers queries that use unindexed fields
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Single and compound indexes | 80 | 6 |
| M04L02 | Index selectivity | 80 | 6 |
| M04L03 | Explain and query plans | 80 | 6 |

### M05 Data integrity and transactions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a JSON schema validator to a collection; (2) Wrap two related writes in a transaction
- Common misconception addressed: Assuming every multi-document write is atomic by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Schema validation | 80 | 6 |
| M05L02 | Multi-document transactions | 80 | 6 |
| M05L03 | Write concern and durability | 80 | 6 |

### M06 Operations and security (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a least-privilege application user; (2) Plan a mongodump backup and restore test
- Common misconception addressed: Exposing an unauthenticated database to the network
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Authentication and roles | 80 | 6 |
| M06L02 | Backup and restore | 80 | 6 |
| M06L03 | Replication basics | 80 | 6 |

## Integrative case

Model and operate a MongoDB catalogue: design documents and collections, write CRUD and aggregation queries, choose embedding versus referencing, add indexes, and apply basic security and backup practices.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0949-final-protected | 30 | 30 | yes |
| MST-0949-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Document data model | 5 |
| CRUD operations | 5 |
| Aggregation framework | 5 |
| Indexing and performance | 5 |
| Data integrity and transactions | 5 |
| Operations and security | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0949-Q0001** (single-answer, Select ONE) You frequently read a product together with its handful of reviews and the reviews are not queried alone. Which modeling choice fits best?

- A. Embed the reviews inside the product document **(key)**  
  _Rationale:_ Correct: data read together and bounded in size is a good fit for embedding.
- B. Store each review in a separate database  
  _Rationale:_ Separate databases add complexity with no benefit here.
- C. Reference reviews from a huge unbounded collection  
  _Rationale:_ Referencing suits large or independently queried data, not this case.
- D. Duplicate the whole product into each review  
  _Rationale:_ That inverts the relationship and bloats storage.

**MST-0949-Q0002** (single-answer, Select ONE) Which MongoDB aggregation stage groups documents and computes accumulated values such as averages?

- A. $group **(key)**  
  _Rationale:_ Correct: $group buckets documents by a key and applies accumulators like $avg.
- B. $match  
  _Rationale:_ $match filters documents; it does not aggregate.
- C. $project  
  _Rationale:_ $project reshapes fields; it does not group.
- D. $sort  
  _Rationale:_ $sort orders documents; it does not accumulate.

**MST-0949-Q0003** (multiple-answer, Select TWO) Which TWO statements about MongoDB indexes are correct? (Select TWO)

- A. A compound index can support a query that filters and then sorts on its fields in order **(key)**  
  _Rationale:_ Correct: compound indexes serve ordered prefixes of their fields.
- B. Indexes consume storage and add write overhead **(key)**  
  _Rationale:_ Correct: every index must be maintained on writes.
- C. find() cannot use an index on an embedded field  
  _Rationale:_ Indexes can target embedded document fields with dot notation.
- D. An index removes the need for a query filter  
  _Rationale:_ An index speeds a filter; it does not replace it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
