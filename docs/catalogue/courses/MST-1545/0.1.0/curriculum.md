# Databases Internals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1545` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-DI-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Databases Internals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Storage and the memory hierarchy
2. Indexing with B-trees
3. Hash and specialised indexes
4. Query processing
5. Query optimisation
6. Transactions and ACID
7. Concurrency control
8. Recovery and durability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate storage-engine implementation; building and tuning engine components is taught through instructor-built walkthroughs.

## Modules

### M01 Storage and the memory hierarchy (MASTEMY-DESIGN 12%)

- Worked applications: (1) Explain why the buffer pool exists; (2) Compare row-store and column-store for a query type
- Common misconception addressed: Assuming the database reads single rows directly from disk, not pages
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pages, files and the buffer pool | 75 | 6 |
| M01L02 | Row vs column storage and the disk/memory gap | 75 | 6 |

### M02 Indexing with B-trees (MASTEMY-DESIGN 14%)

- Worked applications: (1) Trace a lookup through a B+-tree; (2) Decide when a secondary index helps or hurts
- Common misconception addressed: Believing every column should be indexed for speed
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | B+-tree structure and search | 75 | 6 |
| M02L02 | Clustered vs secondary indexes and trade-offs | 75 | 6 |

### M03 Hash and specialised indexes (MASTEMY-DESIGN 11%)

- Worked applications: (1) Choose a hash vs B-tree index for a workload; (2) Explain how an LSM-tree trades read for write cost
- Common misconception addressed: Assuming a hash index supports range scans
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Hash indexes and when they beat B-trees | 75 | 6 |
| M03L02 | LSM-trees and write-optimised storage | 75 | 6 |

### M04 Query processing (MASTEMY-DESIGN 13%)

- Worked applications: (1) Pick a join algorithm for two table sizes; (2) Read a physical query plan
- Common misconception addressed: Assuming a hash join is always best regardless of inputs
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Operators: scans, joins and aggregation | 75 | 6 |
| M04L02 | Join algorithms: nested-loop, hash, merge | 75 | 6 |

### M05 Query optimisation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Explain how stale statistics cause a bad plan; (2) Reason about why the optimiser chose an index scan
- Common misconception addressed: Trusting row-count estimates as exact rather than approximate
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cost-based optimisation and statistics | 75 | 6 |
| M05L02 | Cardinality estimation and plan selection | 75 | 6 |

### M06 Transactions and ACID (MASTEMY-DESIGN 14%)

- Worked applications: (1) Match an anomaly to the isolation level that prevents it; (2) Choose an isolation level for a workload
- Common misconception addressed: Believing the default isolation level is always serializable
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | ACID properties and isolation levels | 75 | 6 |
| M06L02 | Anomalies: dirty read, non-repeatable read, phantom | 75 | 6 |

### M07 Concurrency control (MASTEMY-DESIGN 13%)

- Worked applications: (1) Explain how MVCC avoids read-write blocking; (2) Diagnose a lock-based deadlock scenario
- Common misconception addressed: Assuming readers always block writers under MVCC
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Two-phase locking and deadlocks | 75 | 6 |
| M07L02 | MVCC and snapshot isolation | 75 | 6 |

### M08 Recovery and durability (MASTEMY-DESIGN 11%)

- Worked applications: (1) Explain how WAL guarantees durability; (2) Walk through redo/undo after a crash
- Common misconception addressed: Thinking a committed transaction can be lost if data pages were not yet flushed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Write-ahead logging and checkpoints | 75 | 6 |
| M08L02 | Crash recovery (ARIES ideas) and replication basics | 75 | 6 |

## Integrative case

Investigate a slow, occasionally inconsistent reporting database: choose the right index structure for the hot queries, read the optimiser's plan and fix a bad join, pick an isolation level that removes the observed anomaly without over-locking, and explain how write-ahead logging keeps committed data durable across a crash.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1545-final-protected | 40 | 40 | yes |
| MST-1545-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Storage and the memory hierarchy | 5 |
| Indexing with B-trees | 5 |
| Hash and specialised indexes | 5 |
| Query processing | 5 |
| Query optimisation | 5 |
| Transactions and ACID | 5 |
| Concurrency control | 5 |
| Recovery and durability | 5 |

Minimum reviewed item bank: 482 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1545-Q0001** (single-answer, Select ONE) Why does a relational database read and write data in fixed-size pages rather than individual rows from disk?

- A. Disk and OS I/O operate efficiently on blocks, so page-level I/O amortises the cost of access **(key)**  
  _Rationale:_ Correct: block-oriented I/O makes per-row disk access wasteful; pages batch many rows per transfer and fit the buffer pool.
- B. Rows cannot be addressed individually in any database  
  _Rationale:_ Rows are addressable logically; the page is the physical I/O unit for efficiency.
- C. Pages encrypt the data automatically  
  _Rationale:_ Paging is about I/O efficiency, not encryption.
- D. It removes the need for indexes  
  _Rationale:_ Paging does not replace indexes; both serve different roles.

**MST-1545-Q0002** (multiple-answer, Select TWO) Which statements about B+-tree indexes are correct? (Select TWO)

- A. They keep keys sorted, so they support range scans efficiently **(key)**  
  _Rationale:_ Correct: ordered leaves let a B+-tree serve range queries as well as point lookups.
- B. Each extra index adds write and storage overhead **(key)**  
  _Rationale:_ Correct: every index must be maintained on insert/update, so indexing everything hurts writes.
- C. A B+-tree gives constant-time lookup independent of size  
  _Rationale:_ Lookup is logarithmic in the number of keys, not constant.
- D. B+-trees cannot be used as a clustered index  
  _Rationale:_ Clustered indexes are commonly implemented as B+-trees.

**MST-1545-Q0003** (single-answer, Select ONE) Which isolation level prevents dirty reads but still allows non-repeatable reads?

- A. Read Committed **(key)**  
  _Rationale:_ Correct: Read Committed blocks dirty reads but permits non-repeatable reads and phantoms.
- B. Read Uncommitted  
  _Rationale:_ Read Uncommitted allows dirty reads, so it does not prevent them.
- C. Serializable  
  _Rationale:_ Serializable prevents non-repeatable reads and phantoms as well, so it is stricter than asked.
- D. No isolation level prevents dirty reads  
  _Rationale:_ Read Committed and higher prevent dirty reads.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
