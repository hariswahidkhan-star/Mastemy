# MySQL Database Design and Administration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0943` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-DAT-SK-M-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — MySQL Database Design and Administration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. MySQL architecture and setup
2. Schema and data types
3. Constraints and relationships
4. Indexing and query basics
5. Transactions and concurrency
6. Administration and backups

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 MySQL architecture and setup (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a database and inspect the active storage engine; (2) Connect with a client and list server variables
- Common misconception addressed: Assuming MyISAM behaves like InnoDB for transactions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Server, storage engines and InnoDB | 80 | 6 |
| M01L02 | Connecting, databases and the data directory | 80 | 6 |

### M02 Schema and data types (MASTEMY-DESIGN 17%)

- Worked applications: (1) Design a normalised orders schema with correct types; (2) Pick between INT, BIGINT and DECIMAL for money
- Common misconception addressed: Storing money in FLOAT and getting rounding errors
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing data types and keys | 80 | 6 |
| M02L02 | Normalisation and table design | 80 | 6 |

### M03 Constraints and relationships (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a foreign key with ON DELETE CASCADE; (2) Enforce uniqueness with a composite unique key
- Common misconception addressed: Expecting foreign keys to work on a non-InnoDB table
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Primary, unique and foreign keys | 80 | 6 |
| M03L02 | Referential integrity and ON DELETE actions | 80 | 6 |

### M04 Indexing and query basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add an index to speed a filtered query; (2) Use EXPLAIN to see whether an index is used
- Common misconception addressed: Indexing every column and slowing down writes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | B-tree indexes and selectivity | 80 | 6 |
| M04L02 | Reading EXPLAIN output | 80 | 6 |

### M05 Transactions and concurrency (MASTEMY-DESIGN 16%)

- Worked applications: (1) Wrap a multi-step update in a transaction; (2) Reason about a deadlock between two sessions
- Common misconception addressed: Assuming autocommit gives multi-statement atomicity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | ACID, COMMIT and ROLLBACK | 80 | 6 |
| M05L02 | Isolation levels and locking | 80 | 6 |

### M06 Administration and backups (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a least-privilege application user; (2) Take and restore a logical backup with mysqldump
- Common misconception addressed: Granting an app account full administrative privileges
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Users, privileges and GRANT | 80 | 6 |
| M06L02 | Backups, restores and mysqldump | 80 | 6 |

## Integrative case

Design and administer the database for a small online store in MySQL: create a normalised InnoDB schema with the right data types and foreign keys, add indexes guided by EXPLAIN, wrap checkout in a transaction, create a least-privilege application user, and set up a backup and restore routine; then defend the design.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0943-final-protected | 30 | 30 | yes |
| MST-0943-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MySQL architecture and setup | 5 |
| Schema and data types | 5 |
| Constraints and relationships | 5 |
| Indexing and query basics | 5 |
| Transactions and concurrency | 5 |
| Administration and backups | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0943-Q0001** (single-answer, Select ONE) Which MySQL storage engine is required to enforce foreign key constraints and transactions?

- A. InnoDB **(key)**  
  _Rationale:_ Correct: InnoDB supports transactions and foreign keys; MyISAM does not.
- B. MyISAM  
  _Rationale:_ MyISAM ignores foreign keys and has no transactions.
- C. MEMORY  
  _Rationale:_ The MEMORY engine does not support foreign keys.
- D. CSV  
  _Rationale:_ The CSV engine supports neither constraints nor transactions.

**MST-0943-Q0002** (multiple-answer, Select TWO) Which TWO are guaranteed by wrapping statements in a committed transaction? (Select TWO)

- A. Atomicity: all statements apply or none do **(key)**  
  _Rationale:_ Correct: a transaction either commits fully or rolls back.
- B. Durability: once committed, changes survive a crash **(key)**  
  _Rationale:_ Correct: committed changes are persisted and survive restart.
- C. The query runs faster than outside a transaction  
  _Rationale:_ Transactions are about correctness, not raw speed.
- D. Indexes are created automatically  
  _Rationale:_ Transactions do not create indexes.

**MST-0943-Q0003** (single-answer, Select ONE) Why is DECIMAL preferred over FLOAT for storing monetary amounts?

- A. DECIMAL stores exact fixed-point values, avoiding binary rounding errors **(key)**  
  _Rationale:_ Correct: DECIMAL is exact; FLOAT is approximate and can misrepresent money.
- B. FLOAT cannot store numbers above 1000  
  _Rationale:_ FLOAT handles large numbers; the issue is precision, not range.
- C. DECIMAL uses less storage than FLOAT  
  _Rationale:_ Storage is not the reason; exactness is.
- D. FLOAT is not supported in MySQL  
  _Rationale:_ FLOAT is supported but unsuitable for exact money.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
