# SQLite: Embedded Database Application Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0948` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — SQLite: Embedded Database Application Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with SQLite and the shell
2. Schema design, data types and constraints
3. Querying with SELECT, joins and aggregates
4. Inserts, updates, deletes and transactions
5. Indexes, the query planner and performance
6. Concurrency, journaling and WAL mode
7. Full-text search, JSON and extensions
8. Backups, integrity and embedding in applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on query authoring, schema design and live platform operation are not assessed in this format.

## Modules

### M01 Getting started with SQLite and the shell (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a database and a normalised table set; (2) Query data with the SQLite shell
- Common misconception addressed: Expecting strict column types; SQLite uses flexible type affinity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing SQLite and using the CLI | 120 | 6 |
| M01L02 | Creating a database file and tables | 120 | 6 |

### M02 Schema design, data types and constraints (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add a foreign key and a CHECK constraint; (2) Choose column types using type affinity
- Common misconception addressed: Forgetting that foreign keys are off by default until enabled
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Type affinity and column constraints | 120 | 6 |
| M02L02 | Primary keys, foreign keys and defaults | 120 | 6 |

### M03 Querying with SELECT, joins and aggregates (MASTEMY-DESIGN 12%)

- Worked applications: (1) Join orders to customers and aggregate totals; (2) Group sales by month with a window of filters
- Common misconception addressed: Writing a cartesian join by omitting the join condition
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Filtering, sorting and grouping rows | 120 | 6 |
| M03L02 | Inner and outer joins across tables | 120 | 6 |

### M04 Inserts, updates, deletes and transactions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Wrap several writes in a single transaction; (2) Roll back a transaction after a validation failure
- Common misconception addressed: Assuming each statement auto-commits inside an explicit transaction
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inserting and modifying rows | 120 | 6 |
| M04L02 | Transactions, COMMIT and ROLLBACK | 120 | 6 |

### M05 Indexes, the query planner and performance (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add an index to speed up a slow lookup; (2) Confirm the index is used with EXPLAIN QUERY PLAN
- Common misconception addressed: Adding indexes everywhere and slowing down writes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Creating indexes | 120 | 6 |
| M05L02 | Reading EXPLAIN QUERY PLAN output | 120 | 6 |

### M06 Concurrency, journaling and WAL mode (MASTEMY-DESIGN 13%)

- Worked applications: (1) Switch a database to WAL mode; (2) Reason about readers and a single writer under load
- Common misconception addressed: Believing SQLite allows many concurrent writers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Locking model and rollback journal | 120 | 6 |
| M06L02 | Enabling and tuning WAL mode | 120 | 6 |

### M07 Full-text search, JSON and extensions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a full-text index over a notes table; (2) Query a JSON column with json_extract
- Common misconception addressed: Parsing JSON in application code instead of using the JSON functions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Full-text search with FTS5 | 120 | 6 |
| M07L02 | Storing and querying JSON documents | 120 | 6 |

### M08 Backups, integrity and embedding in applications (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run an integrity check and a backup; (2) Open an embedded database from application code
- Common misconception addressed: Copying the file while it is being written instead of using the backup API
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Backing up and checking integrity | 120 | 6 |
| M08L02 | Embedding SQLite in a desktop or mobile app | 120 | 6 |

## Integrative case

Design the embedded data layer for a note-taking app on SQLite: create a normalised schema with constraints, add full-text search over notes, wrap edits in transactions, index the common queries, enable WAL for smoother reads, and provide a safe backup and integrity check.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0948-final-protected | 40 | 40 | yes |
| MST-0948-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with SQLite and the shell | 5 |
| Schema design, data types and constraints | 5 |
| Querying with SELECT, joins and aggregates | 5 |
| Inserts, updates, deletes and transactions | 5 |
| Indexes, the query planner and performance | 5 |
| Concurrency, journaling and WAL mode | 5 |
| Full-text search, JSON and extensions | 5 |
| Backups, integrity and embedding in applications | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0948-Q0001** (single-answer, Select ONE) What does enabling WAL (write-ahead logging) mode in SQLite primarily improve?

- A. Readers can continue reading while a writer is appending, improving read-write concurrency **(key)**  
  _Rationale:_ Correct: WAL lets readers see a consistent snapshot while a single writer appends changes.
- B. It allows many simultaneous writers to the same database  
  _Rationale:_ SQLite still permits only one writer at a time, even in WAL mode.
- C. It encrypts the database file  
  _Rationale:_ WAL does not provide encryption.
- D. It removes the need for indexes  
  _Rationale:_ WAL is about journaling and concurrency, not query planning.

**MST-0948-Q0002** (multiple-answer, Select ALL that apply) Which statements about SQLite are correct? (Select TWO)

- A. Foreign key enforcement must be turned on per connection with a pragma **(key)**  
  _Rationale:_ Correct: foreign keys are off by default and enabled with PRAGMA foreign_keys = ON.
- B. SQLite stores the whole database in a single file **(key)**  
  _Rationale:_ Correct: a SQLite database is a single cross-platform file.
- C. SQLite requires a separate server process to run  
  _Rationale:_ SQLite is embedded and serverless; it runs in-process.
- D. Column types are strictly enforced like in most client-server databases  
  _Rationale:_ SQLite uses flexible type affinity rather than strict typing.

**MST-0948-Q0003** (single-answer, Select ONE) A frequent lookup by email is slow on a large table. What is the most direct fix?

- A. Create an index on the email column so the planner can avoid a full table scan **(key)**  
  _Rationale:_ Correct: an index lets the query planner locate matching rows without scanning every row.
- B. Rewrite the query to SELECT * instead of listing columns  
  _Rationale:_ Selecting more columns does not speed up the lookup.
- C. Disable transactions on the connection  
  _Rationale:_ Transactions are unrelated to lookup speed here.
- D. Switch the column to JSON storage  
  _Rationale:_ JSON storage would not accelerate an equality lookup.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
