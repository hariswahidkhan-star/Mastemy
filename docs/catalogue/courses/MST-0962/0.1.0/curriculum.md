# Data Lakehouse Architecture and Open Table Formats

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0962` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-DLA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Data Lakehouse Architecture and Open Table Formats (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. From warehouse and lake to lakehouse
2. Open table formats
3. ACID, time travel and schema evolution
4. Storage layout and performance
5. Ingestion and the medallion architecture
6. Governance and the ecosystem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on tool operation or production data work; those are taught through instructor-built demonstrations and walkthroughs.

## Modules

### M01 From warehouse and lake to lakehouse (MASTEMY-DESIGN 17%)

- Worked applications: (1) Map a workload to warehouse, lake or lakehouse; (2) List which warehouse guarantees a raw lake lacks
- Common misconception addressed: Believing a lakehouse is just a data lake with a new name
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data warehouse vs data lake trade-offs | 120 | 6 |
| M01L02 | The lakehouse architecture and its goals | 120 | 6 |

### M02 Open table formats (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace how a table format tracks files via a metadata log; (2) Compare Iceberg and Delta on a chosen capability
- Common misconception addressed: Confusing the file format (Parquet) with the table format on top of it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Why open table formats exist; metadata layers | 120 | 6 |
| M02L02 | Delta Lake, Apache Iceberg and Hudi compared | 120 | 6 |

### M03 ACID, time travel and schema evolution (MASTEMY-DESIGN 17%)

- Worked applications: (1) Explain how concurrent writers avoid corrupting a table; (2) Query a table as of a previous snapshot
- Common misconception addressed: Assuming object storage alone gives ACID without a table format
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Transactions and snapshot isolation on object storage | 120 | 6 |
| M03L02 | Time travel and safe schema evolution | 120 | 6 |

### M04 Storage layout and performance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose a partition column that matches query filters; (2) Plan compaction to fix a small-files problem
- Common misconception addressed: Partitioning on a high-cardinality column and creating millions of tiny files
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Partitioning, file sizing and the small-files problem | 120 | 6 |
| M04L02 | Compaction, clustering and data skipping | 120 | 6 |

### M05 Ingestion and the medallion architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design bronze-to-gold layers for a dataset; (2) Merge upserts (CDC) into a silver table
- Common misconception addressed: Exposing raw bronze data directly to business consumers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Batch and streaming ingestion into tables | 120 | 6 |
| M05L02 | Bronze, silver and gold layering | 120 | 6 |

### M06 Governance and the ecosystem (MASTEMY-DESIGN 16%)

- Worked applications: (1) Register a table in a catalog for multiple engines; (2) Design column-level access for sensitive fields
- Common misconception addressed: Assuming one engine's catalog automatically governs every other engine
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Catalogs, lineage and access control | 120 | 6 |
| M06L02 | Query engines and interoperability | 120 | 6 |

## Integrative case

Design a lakehouse for a retailer's analytics: choose an open table format, lay out bronze/silver/gold tables on object storage with partitioning and compaction, enable ACID upserts from a CDC feed, and govern access through a shared catalog usable by multiple query engines.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0962-final-protected | 48 | 48 | yes |
| MST-0962-final-alternate | 48 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From warehouse and lake to lakehouse | 8 |
| Open table formats | 8 |
| ACID, time travel and schema evolution | 8 |
| Storage layout and performance | 8 |
| Ingestion and the medallion architecture | 8 |
| Governance and the ecosystem | 8 |

Minimum reviewed item bank: 492 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0962-Q0001** (single-answer, Select ONE) What does an open table format such as Delta Lake or Iceberg add on top of Parquet files in object storage?

- A. A metadata layer providing ACID transactions, schema evolution and time travel **(key)**  
  _Rationale:_ Correct: the table format tracks files and snapshots to give database-like guarantees over object storage.
- B. A faster columnar compression than Parquet  
  _Rationale:_ Compression is a property of the file format; the table format adds transactional metadata.
- C. A replacement for all SQL query engines  
  _Rationale:_ Table formats are read by engines; they do not replace them.
- D. Guaranteed single-node storage  
  _Rationale:_ They are designed for distributed object storage, not single nodes.

**MST-0962-Q0002** (multiple-answer, Select ALL that apply) Which statements about the medallion (bronze/silver/gold) architecture are correct? (Select TWO)

- A. Bronze holds raw ingested data, silver holds cleaned/conformed data **(key)**  
  _Rationale:_ Correct: data is progressively refined from bronze to silver.
- B. Gold tables are curated for business consumption and reporting **(key)**  
  _Rationale:_ Correct: gold is the aggregated, business-ready layer.
- C. Business dashboards should read directly from the bronze layer  
  _Rationale:_ Dashboards should read curated gold, not raw bronze.
- D. Each layer must use a different storage system  
  _Rationale:_ The layers are logical and typically share the same lakehouse storage.

**MST-0962-Q0003** (single-answer, Select ONE) Why is partitioning a lakehouse table on a very high-cardinality column usually a mistake?

- A. It produces a huge number of tiny files that slow queries and metadata handling **(key)**  
  _Rationale:_ Correct: excessive partitions fragment data into small files and bloat metadata.
- B. It makes ACID transactions impossible  
  _Rationale:_ ACID is provided by the table format regardless of partitioning.
- C. It prevents the use of Parquet  
  _Rationale:_ Partitioning does not change the underlying file format.
- D. It encrypts the data unintentionally  
  _Rationale:_ Partitioning is unrelated to encryption.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
