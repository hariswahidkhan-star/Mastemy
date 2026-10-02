# Microsoft SQL Server: Database Development and Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0946` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **vendor-docs-partial** - grounded in Microsoft Learn vendor documentation (https://learn.microsoft.com/sql/database-engine/sql-database-engine?view=sql-server-ver17); weights and outcomes are Mastemy design |
| Legacy IDs | MST-DAT-SK-SSTS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft SQL Server: Database Development and Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. SQL Server platform and tools
2. T-SQL development
3. Programmable objects
4. Indexing and performance
5. Transactions and concurrency
6. Operations and recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 SQL Server platform and tools (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a database and connect with SSMS; (2) Run a basic T-SQL query and read the results grid
- Common misconception addressed: Confusing a SQL Server instance with a single database
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instances, databases and editions | 80 | 6 |
| M01L02 | SSMS, Azure Data Studio and T-SQL | 80 | 6 |

### M02 T-SQL development (MASTEMY-DESIGN 17%)

- Worked applications: (1) Join three tables to build an order report; (2) Add TRY/CATCH error handling to a T-SQL batch
- Common misconception addressed: Thinking T-SQL evaluates row by row like a procedural loop
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Queries, joins and set logic | 80 | 6 |
| M02L02 | Variables, control flow and error handling | 80 | 6 |

### M03 Programmable objects (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a parameterised stored procedure for order lookup; (2) Encapsulate a reporting query in a view
- Common misconception addressed: Putting business logic in triggers that fire in hidden ways
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Stored procedures and parameters | 80 | 6 |
| M03L02 | Views, functions and triggers | 80 | 6 |

### M04 Indexing and performance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose a clustered key and add a covering index; (2) Read an execution plan to find a scan vs seek
- Common misconception addressed: Adding indexes without checking the execution plan
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Clustered vs nonclustered indexes | 80 | 6 |
| M04L02 | Execution plans and statistics | 80 | 6 |

### M05 Transactions and concurrency (MASTEMY-DESIGN 16%)

- Worked applications: (1) Wrap a multi-table update in an explicit transaction; (2) Diagnose a blocking chain between two sessions
- Common misconception addressed: Leaving a transaction open and blocking other sessions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Transactions, isolation and locking | 80 | 6 |
| M05L02 | Deadlocks and blocking | 80 | 6 |

### M06 Operations and recovery (MASTEMY-DESIGN 16%)

- Worked applications: (1) Take a full and differential backup and restore it; (2) Grant least-privilege access with database roles
- Common misconception addressed: Running in simple recovery and expecting point-in-time restore
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Backups, recovery models and restores | 80 | 6 |
| M06L02 | Security, roles and maintenance | 80 | 6 |

## Integrative case

Stand up the database behind a line-of-business app on SQL Server: design the schema and T-SQL, expose data through stored procedures and views, tune a slow report using execution plans and indexing, wrap a critical update in a transaction, and put a backup and restore plan in place with least-privilege security; then justify the operations design.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0946-final-protected | 30 | 30 | yes |
| MST-0946-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| SQL Server platform and tools | 5 |
| T-SQL development | 5 |
| Programmable objects | 5 |
| Indexing and performance | 5 |
| Transactions and concurrency | 5 |
| Operations and recovery | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0946-Q0001** (single-answer, Select ONE) In an execution plan, what does an index seek usually indicate compared with an index or table scan?

- A. The engine navigated directly to the matching rows using the index **(key)**  
  _Rationale:_ Correct: a seek uses the index B-tree to jump to qualifying rows rather than reading everything.
- B. The engine read every row in the table  
  _Rationale:_ That describes a scan, not a seek.
- C. No index exists on the table  
  _Rationale:_ A seek requires a usable index.
- D. The query failed to compile  
  _Rationale:_ A seek is a normal, usually efficient operator.

**MST-0946-Q0002** (multiple-answer, Select TWO) Which TWO are true about SQL Server recovery models and backups? (Select TWO)

- A. The full recovery model supports point-in-time restore via log backups **(key)**  
  _Rationale:_ Correct: full recovery with log backups enables restoring to a point in time.
- B. The simple recovery model does not allow log backups for point-in-time restore **(key)**  
  _Rationale:_ Correct: simple recovery truncates the log and has no log-backup chain.
- C. Differential backups replace the need for a full backup  
  _Rationale:_ A differential is restored on top of a full backup; it does not replace it.
- D. Backups can only be taken while the database is offline  
  _Rationale:_ SQL Server supports online backups.

**MST-0946-Q0003** (single-answer, Select ONE) T-SQL is a set-based language. What does that imply for how you should write most queries?

- A. Operate on whole sets with joins and set operations rather than row-by-row loops **(key)**  
  _Rationale:_ Correct: set-based queries let the optimizer work efficiently; cursors/loops are usually slower.
- B. Always use a WHILE loop to process one row at a time  
  _Rationale:_ Row-by-row processing is typically the slow anti-pattern.
- C. Joins should be avoided in favour of cursors  
  _Rationale:_ Joins are the set-based tool to prefer.
- D. Set logic only works on temporary tables  
  _Rationale:_ Set logic applies to any tables.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
