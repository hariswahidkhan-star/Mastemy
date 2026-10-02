# PostgreSQL Database Development and Administration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0945` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-P-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — PostgreSQL Database Development and Administration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Relational foundations and SQL
2. Querying in depth
3. Schema and integrity
4. Performance and indexing
5. Transactions and concurrency
6. Administration basics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Relational foundations and SQL (MASTEMY-DESIGN 16%)

- Worked applications: (1) Model customers and orders with primary and foreign keys; (2) Join three tables to list orders with customer names
- Common misconception addressed: Assuming an INNER JOIN keeps rows with no match
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data types and table design | 94 | 6 |
| M01L02 | SELECT, filtering and sorting | 94 | 6 |
| M01L03 | Joins and set operations | 94 | 6 |

### M02 Querying in depth (MASTEMY-DESIGN 17%)

- Worked applications: (1) Rank monthly sales with a window function; (2) Rewrite a nested subquery as a CTE
- Common misconception addressed: Filtering aggregates in WHERE instead of HAVING
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Aggregation and GROUP BY | 94 | 6 |
| M02L02 | Subqueries and CTEs | 94 | 6 |
| M02L03 | Window functions | 94 | 6 |

### M03 Schema and integrity (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add CHECK and UNIQUE constraints to a table; (2) Normalise a wide table to third normal form
- Common misconception addressed: Thinking a materialised view refreshes automatically
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Constraints and keys | 93 | 6 |
| M03L02 | Normalisation | 93 | 6 |
| M03L03 | Views and materialised views | 93 | 6 |

### M04 Performance and indexing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a B-tree index and confirm it via EXPLAIN; (2) Diagnose a slow query from its plan
- Common misconception addressed: Believing more indexes always make a database faster
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Indexes and index types | 93 | 6 |
| M04L02 | Reading EXPLAIN plans | 93 | 6 |
| M04L03 | Query tuning | 93 | 6 |

### M05 Transactions and concurrency (MASTEMY-DESIGN 16%)

- Worked applications: (1) Wrap a transfer in a transaction with rollback; (2) Choose an isolation level for a reporting read
- Common misconception addressed: Assuming every statement is automatically one big transaction
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Transactions and ACID | 93 | 6 |
| M05L02 | Isolation levels and locking | 93 | 6 |
| M05L03 | Error handling in SQL | 93 | 6 |

### M06 Administration basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Grant least-privilege access to a reporting role; (2) Plan a pg_dump backup and test a restore
- Common misconception addressed: Granting superuser to an application login for convenience
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Roles, privileges and security | 93 | 6 |
| M06L02 | Backup and restore | 93 | 6 |
| M06L03 | Monitoring and maintenance | 93 | 6 |

## Integrative case

Design and operate a PostgreSQL schema for an orders system: model tables and keys, write analytic queries with joins and window functions, add indexes, wrap changes in transactions, and set up roles, backups and basic monitoring.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0945-final-protected | 30 | 30 | yes |
| MST-0945-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Relational foundations and SQL | 5 |
| Querying in depth | 5 |
| Schema and integrity | 5 |
| Performance and indexing | 5 |
| Transactions and concurrency | 5 |
| Administration basics | 5 |

Minimum reviewed item bank: 570 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0945-Q0001** (single-answer, Select ONE) You join orders to customers but want every order kept even when no matching customer row exists. Which join do you use?

- A. LEFT JOIN with orders on the left **(key)**  
  _Rationale:_ Correct: a LEFT JOIN keeps all rows from the left table regardless of matches.
- B. INNER JOIN  
  _Rationale:_ An INNER JOIN drops rows that have no match.
- C. CROSS JOIN  
  _Rationale:_ A CROSS JOIN produces every combination, not matched rows.
- D. SELF JOIN  
  _Rationale:_ A self join relates a table to itself; it does not preserve unmatched rows by itself.

**MST-0945-Q0002** (single-answer, Select ONE) Which clause filters rows after aggregation, for example to keep only groups with SUM over a threshold?

- A. HAVING **(key)**  
  _Rationale:_ Correct: HAVING filters grouped results after aggregation.
- B. WHERE  
  _Rationale:_ WHERE filters individual rows before grouping.
- C. LIMIT  
  _Rationale:_ LIMIT caps the number of returned rows, it does not filter by aggregate.
- D. ORDER BY  
  _Rationale:_ ORDER BY sorts; it does not filter.

**MST-0945-Q0003** (multiple-answer, Select TWO) Which TWO statements about PostgreSQL indexes are correct? (Select TWO)

- A. A B-tree index can speed up equality and range lookups on a column **(key)**  
  _Rationale:_ Correct: B-tree indexes support equality and ordered range scans.
- B. Indexes add overhead to inserts and updates **(key)**  
  _Rationale:_ Correct: each index must be maintained on write, adding cost.
- C. Adding more indexes always improves overall performance  
  _Rationale:_ Excess indexes slow writes and may never be used.
- D. An index guarantees a query will never do a sequential scan  
  _Rationale:_ The planner may still choose a sequential scan when it is cheaper.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
