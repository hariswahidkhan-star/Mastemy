# Entity Framework Core: Data Access and Migrations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0829` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design, cross-checked against Microsoft Learn EF Core documentation (vendor docs, partial). This is a skills course, not an official Microsoft credential; confirm the current EF Core version and API surface at blueprint review. |
| Evidence | **vendor-docs-partial** - vendor-docs-partial - module topics cross-checked against official Microsoft Learn EF Core documentation this session; not a full SME review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Entity Framework Core: Data Access and Migrations (module checks >= 75%, final >= 80%) |
| Verification sources | https://learn.microsoft.com/ef/core/ |

## Learning outcomes

1. Model entities and relationships and configure a DbContext
2. Query data with LINQ using tracking and no-tracking semantics
3. Save changes, understand change tracking and handle concurrency
4. Create, apply and manage schema migrations
5. Diagnose and tune EF Core query performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Modeling and DbContext (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model a one-to-many relationship with fluent configuration; (2) Register a DbContext with a connection string
- Common misconception addressed: Treating the DbContext as a long-lived singleton
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Entities, keys and relationships | 120 | 7 |
| M01L02 | Configuring the DbContext and conventions | 120 | 7 |

### M02 Querying with LINQ (MASTEMY-DESIGN 20%)

- Worked applications: (1) Load related data with Include and ThenInclude; (2) Use AsNoTracking for a read-only list
- Common misconception addressed: Triggering client-side evaluation unintentionally
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | LINQ queries and eager loading | 120 | 7 |
| M02L02 | Tracking vs no-tracking queries | 120 | 7 |

### M03 Saving and change tracking (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add, modify and delete entities in one unit of work; (2) Resolve a DbUpdateConcurrencyException
- Common misconception addressed: Assuming SaveChanges always runs inside a transaction you control
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SaveChanges and the unit of work | 120 | 7 |
| M03L02 | Optimistic concurrency handling | 120 | 7 |

### M04 Migrations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Generate and apply an initial migration; (2) Revert to an earlier migration
- Common misconception addressed: Editing the database schema by hand and losing migration history
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Creating and applying migrations | 120 | 7 |
| M04L02 | Managing migration history and rollbacks | 120 | 7 |

### M05 Performance and diagnostics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Replace an N+1 query pattern with a single Include; (2) Capture and read generated SQL with logging
- Common misconception addressed: Loading entire tables into memory before filtering
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Efficient querying patterns | 120 | 7 |
| M05L02 | Logging and diagnosing slow queries | 120 | 7 |

## Integrative case

Build the data layer for an orders service with EF Core: model customers, orders and line items; query orders with eager loading and no-tracking where appropriate; save a multi-entity unit of work with concurrency handling; evolve the schema with a migration; and diagnose one slow query with logging.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0829-final-protected | 40 | 50 | yes |
| MST-0829-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modeling and DbContext | 8 |
| Querying with LINQ | 8 |
| Saving and change tracking | 8 |
| Migrations | 8 |
| Performance and diagnostics | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0829-Q0001** (single-answer, Select ONE) Which EF Core method marks related data to be loaded together with the primary entity in a single query?

- A. Include **(key)**  
  _Rationale:_ Correct: Include (with ThenInclude for nesting) performs eager loading of related data.
- B. AsNoTracking  
  _Rationale:_ AsNoTracking disables change tracking; it does not load related data.
- C. SaveChanges  
  _Rationale:_ SaveChanges persists tracked changes; it is not a loading method.
- D. FromSqlRaw  
  _Rationale:_ FromSqlRaw runs raw SQL; it does not by itself eager-load navigations.

**MST-0829-Q0002** (multiple-answer, Select TWO) Which TWO statements about EF Core change tracking are correct? (Select TWO.)

- A. Entities returned from a tracking query are monitored for changes until the DbContext is disposed **(key)**  
  _Rationale:_ Correct: tracked entities drive updates and remain tracked until the context is disposed or cleared.
- B. AsNoTracking queries skip snapshot tracking and are suited to read-only results **(key)**  
  _Rationale:_ Correct: no-tracking queries are faster for read-only data because no snapshot is taken.
- C. SaveChanges tracks entities even after the DbContext is disposed  
  _Rationale:_ A disposed context no longer tracks anything.
- D. Change tracking requires calling DetectChanges manually before every query  
  _Rationale:_ EF Core detects changes automatically at SaveChanges; manual DetectChanges is rarely needed.

**MST-0829-Q0003** (single-answer, Select ONE) What is the correct way to evolve the database schema in an EF Core project?

- A. Create a migration from the updated model and apply it **(key)**  
  _Rationale:_ Correct: migrations capture model changes as versioned, repeatable schema updates.
- B. Manually alter the database and ignore the model  
  _Rationale:_ Hand edits drift from the model and break future migrations.
- C. Delete and recreate the production database on each deploy  
  _Rationale:_ That destroys data and is not a migration strategy.
- D. Edit the migration history table directly  
  _Rationale:_ Editing the history table by hand corrupts migration state.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
