# Dataverse Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1443` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Dataverse documentation read via the Microsoft Learn MCP on 2026-10-02. UI labels and feature availability can change by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/power-apps/maker/data-platform/data-platform-intro |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-DATAVERSE |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Dataverse Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Dataverse and create tables with columns
2. Define relationships and add business logic
3. Apply the Dataverse security model with roles and column security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Tables and columns (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a custom table with columns and data types; (2) Use standard tables for common scenarios
- Common misconception addressed: Thinking Dataverse data is stored on local servers rather than the cloud
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Dataverse is and why use it | 84 | 4 |
| M01L02 | Tables, columns, and data types | 84 | 4 |

### M02 Relationships and logic (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Relate an Order table to Customer and Product tables; (2) Add a business rule for validation
- Common misconception addressed: Confusing a relationship with simply copying data between tables
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Table relationships | 84 | 4 |
| M02L02 | Calculated columns, business rules, and logic | 84 | 4 |

### M03 Security model (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Assign a security role to control table access; (2) Apply column-level security to a PII column
- Common misconception addressed: Believing a security role grants record access without record-level and column-level controls
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Security roles, business units, and teams | 72 | 4 |
| M03L02 | Record-level and column-level security | 72 | 4 |

## Integrative case

A maker builds a Dataverse solution relating Orders to Customers and Products, adds a validation business rule, and assigns a security role with column-level security on a PII field.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1443-final-protected | 24 | 32 | yes |
| MST-1443-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tables and columns | 8 |
| Relationships and logic | 8 |
| Security model | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1443-Q0001** (single-answer, Select ONE) In Microsoft Dataverse, how is data stored?

- A. As a set of tables made up of rows and columns **(key)**  
  _Rationale:_ Correct: Dataverse stores data within a set of tables of rows and columns.
- B. As flat text files on a local PC  
  _Rationale:_ Incorrect: Dataverse stores data in the cloud as tables.
- C. As images only  
  _Rationale:_ Incorrect: Dataverse stores structured data, not only images.
- D. As Git commits  
  _Rationale:_ Incorrect: Dataverse is not a version-control system.

**MST-1443-Q0002** (multiple-answer, Select TWO) Which TWO are part of the Dataverse security model? (Select TWO.)

- A. Security roles **(key)**  
  _Rationale:_ Correct: security roles define the privileges a user or team has.
- B. Column-level (field) security **(key)**  
  _Rationale:_ Correct: column-level security controls access to individual columns.
- C. BIOS passwords  
  _Rationale:_ Incorrect: BIOS passwords are unrelated to Dataverse security.
- D. DNS zones  
  _Rationale:_ Incorrect: DNS zones are networking, not Dataverse security.

**MST-1443-Q0003** (single-answer, Select ONE) What controls the level of access a user or team has to resources in Dataverse?

- A. A security role **(key)**  
  _Rationale:_ Correct: a security role is a collection of privileges defining access.
- B. A Visio stencil  
  _Rationale:_ Incorrect: a stencil is a Visio diagramming asset.
- C. A Loop component  
  _Rationale:_ Incorrect: a Loop component is collaborative content, not access control.
- D. A DAX measure  
  _Rationale:_ Incorrect: a DAX measure is a calculation, not access control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
