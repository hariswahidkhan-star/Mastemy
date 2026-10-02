# Access Database Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1439` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Access documentation read via the Microsoft Learn MCP on 2026-10-02. UI labels can vary by Access version and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/office/vba/access/concepts/structured-query-language/define-relationships-between-tables-using-access-sql |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-ACCESS |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Access Database Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create and design Access tables with appropriate keys and data types
2. Define relationships and build multi-table queries
3. Create forms and reports for data entry and output

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Tables and database design (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Define a primary key for a table; (2) Choose appropriate data types for columns
- Common misconception addressed: Storing all data in a single flat table instead of normalizing
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Access database objects and tables | 84 | 4 |
| M01L02 | Database design and data types | 84 | 4 |

### M02 Relationships and queries (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a one-to-many relationship using a foreign key; (2) Build a multi-table select query
- Common misconception addressed: Confusing a primary key with a foreign key
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Relationships and keys | 84 | 4 |
| M02L02 | Queries across tables | 84 | 4 |

### M03 Forms and reports (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Create a data-entry form bound to a table; (2) Build a multi-level report
- Common misconception addressed: Editing data directly in tables instead of using forms with validation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data-entry forms | 72 | 4 |
| M03L02 | Reports and output | 72 | 4 |

## Integrative case

A user designs a customers-and-orders database with a one-to-many relationship, builds a multi-table query, and creates a data-entry form and a multi-level report.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1439-final-protected | 24 | 32 | yes |
| MST-1439-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tables and database design | 8 |
| Relationships and queries | 8 |
| Forms and reports | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1439-Q0001** (single-answer, Select ONE) Which statement is a requirement of a primary key in Access?

- A. It must be unique, cannot be null, and there is one per table **(key)**  
  _Rationale:_ Correct: a primary key is unique, non-null, and singular per table.
- B. It can contain null values  
  _Rationale:_ Incorrect: a primary key cannot be null.
- C. There can be many primary keys per table  
  _Rationale:_ Incorrect: only one primary key is defined per table.
- D. It must always be a text field  
  _Rationale:_ Incorrect: a primary key is not required to be text.

**MST-1439-Q0002** (multiple-answer, Select TWO) Which TWO are Microsoft Access database objects? (Select TWO.)

- A. Tables **(key)**  
  _Rationale:_ Correct: tables store the data in an Access database.
- B. Queries **(key)**  
  _Rationale:_ Correct: queries retrieve and combine data.
- C. Pivot shaders  
  _Rationale:_ "Pivot shaders" are not Access objects.
- D. Kusto clusters  
  _Rationale:_ Kusto clusters belong to Azure Data Explorer, not Access.

**MST-1439-Q0003** (single-answer, Select ONE) A field in one table that references the primary key of another table is called a?

- A. Foreign key **(key)**  
  _Rationale:_ Correct: a foreign key references the primary key of another table.
- B. Composite index  
  _Rationale:_ A composite index spans multiple columns; it is not this reference.
- C. Macro  
  _Rationale:_ A macro automates actions; it is not a key.
- D. Module  
  _Rationale:_ A module holds VBA code; it is not a key.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
