# ClickHouse: High-Performance Analytical Data Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0954` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — ClickHouse: High-Performance Analytical Data Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Columnar analytics foundations
2. Tables and the MergeTree engine
3. Querying and performance
4. Partitioning and TTL
5. Aggregation at scale
6. Ingestion and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on tool operation or production data work; those are taught through instructor-built demonstrations and walkthroughs.

## Modules

### M01 Columnar analytics foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Contrast a row-store vs column-store scan for an aggregate; (2) Decide if a workload fits ClickHouse or an OLTP database
- Common misconception addressed: Using ClickHouse for high-frequency single-row updates like an OLTP store
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why columnar storage suits analytics | 80 | 5 |
| M01L02 | ClickHouse architecture and when to use it | 80 | 5 |

### M02 Tables and the MergeTree engine (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a MergeTree table with an appropriate ORDER BY; (2) Explain how parts merge in the background
- Common misconception addressed: Treating the ClickHouse primary key as a uniqueness constraint
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating tables; data types and codecs | 80 | 5 |
| M02L02 | MergeTree: primary key, ORDER BY and parts | 80 | 5 |

### M03 Querying and performance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write an aggregation that benefits from the ORDER BY; (2) Explain how the sparse index prunes granules
- Common misconception addressed: Expecting an index seek per row like a B-tree database
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SELECT, aggregates and ClickHouse SQL features | 80 | 5 |
| M03L02 | Sparse primary index, granules and query speed | 80 | 5 |

### M04 Partitioning and TTL (MASTEMY-DESIGN 17%)

- Worked applications: (1) Partition a events table by month for efficient drops; (2) Add a TTL to move or delete old data
- Common misconception addressed: Over-partitioning into tiny parts and hurting merge performance
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Partitioning by date for pruning and maintenance | 80 | 5 |
| M04L02 | TTL for expiry and tiered storage | 80 | 5 |

### M05 Aggregation at scale (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pre-aggregate daily metrics with a materialized view; (2) Choose between SummingMergeTree and plain aggregation
- Common misconception addressed: Assuming a materialized view back-fills existing rows automatically
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Materialized views and aggregating engines | 80 | 5 |
| M05L02 | SummingMergeTree and AggregatingMergeTree patterns | 80 | 5 |

### M06 Ingestion and operations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Batch inserts to avoid too-many-parts errors; (2) Plan a sharded, replicated cluster layout
- Common misconception addressed: Inserting one row per request and flooding the system with tiny parts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Bulk inserts, batching and async inserts | 80 | 5 |
| M06L02 | Replication, sharding and monitoring | 80 | 5 |

## Integrative case

Design a ClickHouse analytics store for web clickstream data: pick a MergeTree table with a query-aligned ORDER BY, partition by month with a TTL, pre-aggregate dashboards with a materialized view, and plan batched ingestion across a sharded, replicated cluster.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0954-final-protected | 42 | 42 | yes |
| MST-0954-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Columnar analytics foundations | 7 |
| Tables and the MergeTree engine | 7 |
| Querying and performance | 7 |
| Partitioning and TTL | 7 |
| Aggregation at scale | 7 |
| Ingestion and operations | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0954-Q0001** (single-answer, Select ONE) Why is columnar storage well suited to analytical aggregate queries?

- A. Only the columns referenced are read, and similar values compress well **(key)**  
  _Rationale:_ Correct: column-wise access scans less data and compresses better for aggregates.
- B. It makes single-row inserts and updates extremely fast  
  _Rationale:_ That favours row stores; columnar is weak at per-row OLTP writes.
- C. It enforces foreign-key constraints efficiently  
  _Rationale:_ Columnar storage is about scan efficiency, not referential integrity.
- D. It stores each row contiguously for point lookups  
  _Rationale:_ That describes row storage, the opposite of columnar.

**MST-0954-Q0002** (multiple-answer, Select ALL that apply) Which statements about ClickHouse MergeTree are correct? (Select TWO)

- A. ORDER BY defines the on-disk sort order used by the sparse primary index **(key)**  
  _Rationale:_ Correct: data is ordered by the ORDER BY key, enabling granule pruning.
- B. Data is written as parts that merge together in the background **(key)**  
  _Rationale:_ Correct: inserts create parts that MergeTree compacts over time.
- C. The primary key enforces row uniqueness like in OLTP databases  
  _Rationale:_ The primary key is for ordering/indexing, not a uniqueness constraint.
- D. Each inserted row is indexed individually with a B-tree  
  _Rationale:_ ClickHouse uses a sparse index over granules, not a per-row B-tree.

**MST-0954-Q0003** (single-answer, Select ONE) Why should you insert data into ClickHouse in large batches rather than one row at a time?

- A. Each insert creates a part, and too many tiny parts overwhelm background merging **(key)**  
  _Rationale:_ Correct: batching reduces part count and avoids too-many-parts problems.
- B. Single-row inserts are rejected by ClickHouse  
  _Rationale:_ They are allowed but inefficient, not rejected.
- C. Batching disables compression  
  _Rationale:_ Batching does not turn off compression.
- D. Large batches bypass the MergeTree engine  
  _Rationale:_ Batched inserts still go through MergeTree.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
