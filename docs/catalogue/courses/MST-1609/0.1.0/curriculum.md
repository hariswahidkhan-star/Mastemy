# MongoDB

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1609` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model data for a document database
2. Perform CRUD operations and query documents
3. Build aggregation pipelines for analysis
4. Design indexes for query performance
5. Reason about schema design trade-offs and relationships
6. Apply replication, consistency and operational basics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Documents and data modelling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model an order with embedded line items; (2) Decide when to reference instead of embed
- Common misconception addressed: Over-normalising a document model like a relational schema
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Documents, collections and BSON | 168 | 8 |
| M01L02 | Embedding vs referencing | 168 | 8 |

### M02 CRUD and querying (MASTEMY-DESIGN 20%)

- Worked applications: (1) Query with comparison and array operators; (2) Update nested fields with operators
- Common misconception addressed: Fetching whole documents when a projection would do
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Insert, find, update and delete | 168 | 8 |
| M02L02 | Query operators and projections | 168 | 8 |

### M03 Aggregation framework (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a sales report with $group and $match; (2) Join collections with $lookup
- Common misconception addressed: Doing in-application aggregation that the pipeline handles
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pipeline stages and operators | 168 | 8 |
| M03L02 | Grouping, lookup and faceting | 168 | 8 |

### M04 Indexing and performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a compound index for a query pattern; (2) Read explain() to confirm index use
- Common misconception addressed: Creating indexes that are never used
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Single-field and compound indexes | 168 | 8 |
| M04L02 | Explain plans and index selection | 168 | 8 |

### M05 Operations and consistency (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a write concern for durability; (2) Add schema validation to a collection
- Common misconception addressed: Assuming a single node gives high availability
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Replication and read/write concerns | 168 | 8 |
| M05L02 | Transactions and schema validation | 168 | 8 |

## Integrative case

Design the data model for an e-commerce catalogue and orders in MongoDB: decide embedding vs referencing, write the key queries and an aggregation report, and add the indexes they require.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1609-final-protected | 25 | 25 | yes |
| MST-1609-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Documents and data modelling | 5 |
| CRUD and querying | 5 |
| Aggregation framework | 5 |
| Indexing and performance | 5 |
| Operations and consistency | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1609-Q0001** (single-answer, Select ONE) When is embedding preferable to referencing in MongoDB?

- A. When related data is accessed together and bounded in size **(key)**  
  _Rationale:_ Correct: embedding suits tightly-coupled, bounded data read together.
- B. Whenever the data could ever grow unbounded  
  _Rationale:_ Unbounded growth argues for referencing.
- C. Only for numeric fields  
  _Rationale:_ Field type is not the deciding factor.
- D. Never; MongoDB forbids embedding  
  _Rationale:_ Embedding is a core modelling technique.

**MST-1609-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to add a compound index? (Select TWO.)

- A. A frequent query filters and sorts on the same two fields **(key)**  
  _Rationale:_ Correct: compound indexes serve combined filter/sort patterns.
- B. The field order matches the query's equality-then-range pattern **(key)**  
  _Rationale:_ Correct: index prefix order should match query usage.
- C. To store more copies of the data for backup  
  _Rationale:_ Indexes are not backups.
- D. Because every field should always be indexed  
  _Rationale:_ Unused indexes add write cost.

**MST-1609-Q0003** (single-answer, Select ONE) What does the aggregation $lookup stage do?

- A. Performs a left outer join to another collection **(key)**  
  _Rationale:_ Correct: $lookup joins documents from another collection.
- B. Deletes matching documents  
  _Rationale:_ It does not delete anything.
- C. Creates an index  
  _Rationale:_ Indexing is separate from aggregation.
- D. Validates a schema  
  _Rationale:_ Validation is a separate feature.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
