# Cassandra and Wide-Column Stores

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1611` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-CWCS-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Cassandra and Wide-Column Stores (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Wide-column fundamentals
2. Data distribution
3. Data modeling
4. CQL operations
5. Performance
6. Operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Wide-column fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Contrast a wide-column table with a relational one; (2) Describe the ring of nodes
- Common misconception addressed: Expecting ad-hoc joins like a relational database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Wide-column versus relational | 80 | 6 |
| M01L02 | Cassandra architecture | 80 | 6 |
| M01L03 | Keyspaces and tables | 80 | 6 |

### M02 Data distribution (MASTEMY-DESIGN 17%)

- Worked applications: (1) Reason about which node owns a partition; (2) Choose a replication factor
- Common misconception addressed: Expecting strong consistency without matching read/write levels
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Partitioning and tokens | 80 | 6 |
| M02L02 | Replication factor | 80 | 6 |
| M02L03 | Consistency levels | 80 | 6 |

### M03 Data modeling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a table from a specific query; (2) Choose partition and clustering keys
- Common misconception addressed: Designing tables around entities instead of queries
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Query-driven modeling | 80 | 6 |
| M03L02 | Primary and clustering keys | 80 | 6 |
| M03L03 | Denormalization and collections | 80 | 6 |

### M04 CQL operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Insert and query rows with CQL; (2) Use a lightweight transaction for a check-and-set
- Common misconception addressed: Using secondary indexes on high-cardinality columns at scale
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | CRUD with CQL | 80 | 6 |
| M04L02 | Batches and lightweight transactions | 80 | 6 |
| M04L03 | Secondary indexes and materialized views | 80 | 6 |

### M05 Performance (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick a compaction strategy for a workload; (2) Trace a write through commit log and memtable
- Common misconception addressed: Deleting heavily and hitting tombstone read problems
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Compaction strategies | 80 | 6 |
| M05L02 | Read and write paths | 80 | 6 |
| M05L03 | Tombstones and pitfalls | 80 | 6 |

### M06 Operations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Plan replication across datacenters; (2) Schedule anti-entropy repair
- Common misconception addressed: Skipping repair and letting replicas drift
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Nodes, racks and datacenters | 80 | 6 |
| M06L02 | Repair and maintenance | 80 | 6 |
| M06L03 | Monitoring and security | 80 | 6 |

## Integrative case

Model and operate a Cassandra store for an activity feed: design query-driven tables with the right keys, choose replication and consistency, and plan compaction, repair, and monitoring.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1611-final-protected | 30 | 30 | yes |
| MST-1611-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Wide-column fundamentals | 5 |
| Data distribution | 5 |
| Data modeling | 5 |
| CQL operations | 5 |
| Performance | 5 |
| Operations | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1611-Q0001** (single-answer, Select ONE) How should tables be designed in Cassandra?

- A. Around the queries the application will run **(key)**  
  _Rationale:_ Correct: Cassandra uses query-driven modeling, shaping tables to serve specific queries.
- B. Fully normalized like a relational schema  
  _Rationale:_ Full normalization forces joins that Cassandra does not do efficiently.
- C. To support arbitrary ad-hoc joins  
  _Rationale:_ Cassandra does not support arbitrary joins.
- D. With one table for the entire database  
  _Rationale:_ A single table cannot serve diverse query patterns well.

**MST-1611-Q0002** (single-answer, Select ONE) What determines which node is responsible for a given row in Cassandra?

- A. The token derived from the partition key **(key)**  
  _Rationale:_ Correct: the partition key is hashed to a token that maps to a node on the ring.
- B. The clustering column order  
  _Rationale:_ Clustering columns order rows within a partition, not node placement.
- C. The order rows were inserted  
  _Rationale:_ Insertion order does not decide node ownership.
- D. The secondary index  
  _Rationale:_ A secondary index does not determine partition placement.

**MST-1611-Q0003** (multiple-answer, Select TWO) Which TWO statements about consistency in Cassandra are correct? (Select TWO)

- A. Read and write consistency levels together affect whether reads see the latest write **(key)**  
  _Rationale:_ Correct: tuning both read and write levels (e.g. so they overlap) governs read-your-write behavior.
- B. QUORUM requires a majority of replicas to respond **(key)**  
  _Rationale:_ Correct: QUORUM needs a majority of replicas to acknowledge.
- C. Cassandra offers only a single fixed consistency level  
  _Rationale:_ Cassandra offers tunable consistency per operation, not one fixed level.
- D. Consistency level has no effect on availability trade-offs  
  _Rationale:_ Higher consistency reduces availability under failures; it is a trade-off.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
