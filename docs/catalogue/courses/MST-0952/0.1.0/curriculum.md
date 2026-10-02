# Apache Cassandra: Distributed Data Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0952` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Apache Cassandra: Distributed Data Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Cassandra architecture
2. Data modeling for Cassandra
3. CQL in practice
4. Replication and consistency
5. Performance and pitfalls
6. Operations and reliability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on tool operation or production data work; those are taught through instructor-built demonstrations and walkthroughs.

## Modules

### M01 Cassandra architecture (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace where a row lands given a partition key and token ring; (2) Explain how a write is persisted via commit log and memtable
- Common misconception addressed: Expecting a single coordinator or master node like a relational primary
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Distributed ring, nodes and peer-to-peer design | 80 | 5 |
| M01L02 | Partitioning, tokens and the write path | 80 | 5 |

### M02 Data modeling for Cassandra (MASTEMY-DESIGN 17%)

- Worked applications: (1) Design a table from an access pattern, not an entity diagram; (2) Choose clustering columns to control row ordering
- Common misconception addressed: Modeling normalized tables and relying on joins that do not exist
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Query-first modeling and denormalization | 80 | 5 |
| M02L02 | Primary keys: partition keys and clustering columns | 80 | 5 |

### M03 CQL in practice (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a keyspace and time-series table in CQL; (2) Add a TTL so old rows expire automatically
- Common misconception addressed: Treating CQL like SQL and attempting arbitrary WHERE filters
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Keyspaces, tables and CQL basics | 80 | 5 |
| M03L02 | Collections, counters and TTL | 80 | 5 |

### M04 Replication and consistency (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick RF and consistency for a multi-datacenter app; (2) Compute whether QUORUM reads/writes overlap
- Common misconception addressed: Believing QUORUM gives the same guarantees as a relational transaction
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Replication factor and strategies | 80 | 5 |
| M04L02 | Tunable consistency and quorum reads/writes | 80 | 5 |

### M05 Performance and pitfalls (MASTEMY-DESIGN 16%)

- Worked applications: (1) Redesign a model to avoid an unbounded partition; (2) Diagnose a read slowed by tombstone build-up
- Common misconception addressed: Issuing frequent deletes and ignoring the tombstone cost on reads
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Partition sizing and hot partitions | 80 | 5 |
| M05L02 | Tombstones, compaction and anti-patterns | 80 | 5 |

### M06 Operations and reliability (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how a node catches up after a brief outage; (2) Plan a repair schedule for a cluster
- Common misconception addressed: Skipping regular repair and allowing replicas to drift apart
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Hinted handoff, read repair and anti-entropy | 80 | 5 |
| M06L02 | Multi-datacenter deployment and maintenance | 80 | 5 |

## Integrative case

Design a Cassandra data model for an IoT telemetry platform: define query-first tables for device time-series and recent-status lookups, choose partition and clustering keys to avoid hot partitions, set TTLs, and pick a replication and consistency strategy across two datacenters.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0952-final-protected | 42 | 42 | yes |
| MST-0952-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cassandra architecture | 7 |
| Data modeling for Cassandra | 7 |
| CQL in practice | 7 |
| Replication and consistency | 7 |
| Performance and pitfalls | 7 |
| Operations and reliability | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0952-Q0001** (single-answer, Select ONE) What should drive table design in Apache Cassandra?

- A. The queries the application must answer **(key)**  
  _Rationale:_ Correct: Cassandra is query-first, so tables are shaped around read access patterns.
- B. A fully normalized entity-relationship diagram  
  _Rationale:_ Normalization and joins are a relational approach, not Cassandra's model.
- C. Minimising total stored bytes above all else  
  _Rationale:_ Denormalization and duplication are expected to serve queries efficiently.
- D. The order rows were inserted  
  _Rationale:_ Row ordering comes from clustering columns, not insertion order of design.

**MST-0952-Q0002** (multiple-answer, Select ALL that apply) Which statements about a Cassandra primary key are correct? (Select TWO)

- A. The partition key determines which node stores the row **(key)**  
  _Rationale:_ Correct: the partition key is hashed to a token that maps to nodes.
- B. Clustering columns control the sort order of rows within a partition **(key)**  
  _Rationale:_ Correct: they define on-disk ordering inside each partition.
- C. The primary key enforces foreign-key relationships  
  _Rationale:_ Cassandra has no foreign keys or referential integrity.
- D. Any column can be used in WHERE without being part of the key or an index  
  _Rationale:_ Filtering generally requires key columns or an explicit index.

**MST-0952-Q0003** (single-answer, Select ONE) With replication factor 3, why do QUORUM writes and QUORUM reads return consistent data?

- A. A write to 2 replicas and a read from 2 replicas are guaranteed to overlap on at least one node **(key)**  
  _Rationale:_ Correct: when read replicas + write replicas exceed RF, their sets must intersect.
- B. QUORUM writes to all 3 replicas synchronously  
  _Rationale:_ QUORUM requires a majority (2 of 3), not all replicas.
- C. Cassandra locks the partition during the write  
  _Rationale:_ Cassandra does not use locking for this; it relies on replica overlap.
- D. Reads always go to a single master replica  
  _Rationale:_ There is no master; QUORUM contacts a majority of replicas.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
