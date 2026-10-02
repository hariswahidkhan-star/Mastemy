# ABAP: SAP Application Development Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0934` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ABAP: SAP Application Development Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. ABAP environment and tooling
2. Core language syntax and data types
3. Internal tables and data processing
4. The ABAP Dictionary
5. Open SQL and database access
6. Modularisation and ABAP Objects
7. Classic and modern UIs
8. Quality, transport and lifecycle

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate working SAP development; ABAP programs and Dictionary objects are taught through instructor-built walkthroughs in a SAP system.

## Modules

### M01 ABAP environment and tooling (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create a package and a first report program in ADT; (2) Navigate an existing program with where-used and the debugger
- Common misconception addressed: Assuming ABAP runs on the client rather than on the application server
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The SAP NetWeaver stack and the ABAP runtime | 60 | 6 |
| M01L02 | ABAP Development Tools (Eclipse) and the classic Workbench | 60 | 6 |

### M02 Core language syntax and data types (MASTEMY-DESIGN 13%)

- Worked applications: (1) Declare a structure and populate it from literals; (2) Format an amount with a string template and a currency key
- Common misconception addressed: Confusing a data element with a built-in type
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Variables, elementary and structured types, and TYPES | 60 | 6 |
| M02L02 | Operators, string templates and control flow | 60 | 6 |

### M03 Internal tables and data processing (MASTEMY-DESIGN 14%)

- Worked applications: (1) Aggregate line items into totals with a sorted table; (2) Replace a nested LOOP with a table expression and key access
- Common misconception addressed: Using a standard table with linear search where a sorted/hashed key is needed
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Standard, sorted and hashed internal tables | 60 | 6 |
| M03L02 | LOOP, READ TABLE, and modern table expressions | 60 | 6 |

### M04 The ABAP Dictionary (MASTEMY-DESIGN 13%)

- Worked applications: (1) Model a transparent table with a domain-backed key; (2) Add a foreign key and a search help to a field
- Common misconception addressed: Treating the Dictionary as documentation rather than active runtime metadata
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Domains, data elements, structures and transparent tables | 60 | 6 |
| M04L02 | Foreign keys, search helps and technical settings | 60 | 6 |

### M05 Open SQL and database access (MASTEMY-DESIGN 13%)

- Worked applications: (1) Read orders for a customer into an internal table with Open SQL; (2) Push an aggregation into the database with GROUP BY
- Common misconception addressed: Looping over SELECT single instead of a set-based query (SELECT in a loop)
- Module check: 11 items / 11 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | SELECT, WHERE, ordering and INTO targets | 60 | 6 |
| M05L02 | Joins, aggregates and the code-to-data paradigm | 60 | 6 |

### M06 Modularisation and ABAP Objects (MASTEMY-DESIGN 13%)

- Worked applications: (1) Encapsulate validation logic in a local class with a method; (2) Raise and catch a class-based exception
- Common misconception addressed: Preferring procedural FORM routines where a class would be clearer and testable
- Module check: 11 items / 11 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Subroutines, function modules and BAPIs | 60 | 6 |
| M06L02 | Classes, interfaces and exception classes | 60 | 6 |

### M07 Classic and modern UIs (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a selection screen and display results in an ALV grid; (2) Describe how an OData service exposes the same data to Fiori
- Common misconception addressed: Believing Dynpro/SAP GUI screens are the only way to build SAP UIs
- Module check: 11 items / 11 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Reports, selection screens and ALV output | 60 | 6 |
| M07L02 | Overview of Fiori/OData as the modern UI direction | 60 | 6 |

### M08 Quality, transport and lifecycle (MASTEMY-DESIGN 10%)

- Worked applications: (1) Write an ABAP Unit test for the validation class; (2) Add an AUTHORITY-CHECK before a sensitive read
- Common misconception addressed: Skipping authority checks because the transaction is 'internal'
- Module check: 11 items / 11 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | ABAP Unit, code inspector and the transport system | 60 | 6 |
| M08L02 | Performance, security (authority checks) and clean ABAP | 60 | 6 |

## Integrative case

Build a small purchase-order reporting program: model the data in the ABAP Dictionary, read line items with set-based Open SQL, aggregate them in a sorted internal table, encapsulate the logic in a class with an ABAP Unit test, present results in an ALV grid behind a selection screen, add an authority check, and transport the package.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0934-final-protected | 40 | 40 | yes |
| MST-0934-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| ABAP environment and tooling | 5 |
| Core language syntax and data types | 5 |
| Internal tables and data processing | 5 |
| The ABAP Dictionary | 5 |
| Open SQL and database access | 5 |
| Modularisation and ABAP Objects | 5 |
| Classic and modern UIs | 5 |
| Quality, transport and lifecycle | 5 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0934-Q0001** (single-answer, Select ONE) Why is issuing a SELECT statement inside a LOOP over an internal table usually a performance problem in ABAP?

- A. It sends one database round trip per loop pass instead of a single set-based query **(key)**  
  _Rationale:_ Correct: each pass crosses to the database server, so N passes cost N round trips; a single joined/array SELECT does the work in one.
- B. SELECT is not allowed inside a LOOP and raises a syntax error  
  _Rationale:_ It is syntactically allowed; the issue is performance, not a syntax error.
- C. Internal tables cannot be read while a SELECT is open  
  _Rationale:_ Internal tables can be read freely; this is not the reason.
- D. The database automatically caches the result so the loop is always fast  
  _Rationale:_ No such guarantee exists; repeated round trips dominate the cost.

**MST-0934-Q0002** (multiple-answer, Select TWO) Which statements about internal table types in ABAP are correct? (Select TWO)

- A. A hashed table gives near-constant-time access by its unique key **(key)**  
  _Rationale:_ Correct: hashed tables use a hash of the unique key for fast single-row access.
- B. A sorted table keeps its rows ordered by the table key as rows are inserted **(key)**  
  _Rationale:_ Correct: a sorted table maintains key order automatically and supports binary search.
- C. A standard table guarantees unique keys automatically  
  _Rationale:_ Standard tables allow duplicates; uniqueness is not enforced.
- D. A hashed table can be read efficiently by a non-key field  
  _Rationale:_ Hashed access is only efficient by the full unique key, not by arbitrary fields.

**MST-0934-Q0003** (single-answer, Select ONE) In the ABAP Dictionary, what is the primary role of a domain?

- A. It defines the technical attributes (type, length, value range) reused by data elements **(key)**  
  _Rationale:_ Correct: a domain holds the technical definition and optional value list that data elements reference.
- B. It stores the business table rows at runtime  
  _Rationale:_ Rows are stored in transparent tables, not domains.
- C. It is the screen layout for a selection screen  
  _Rationale:_ Screen layout is unrelated to a Dictionary domain.
- D. It is a user authorisation object  
  _Rationale:_ Authorisation objects are separate security metadata, not domains.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
