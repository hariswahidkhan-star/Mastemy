# SAP Certified Associate - Back-End Developer - ABAP Cloud Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1818` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | SAP (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed from an official source (kept out of official_exam_code) |
| Version basis | DESIGN ASSUMPTION - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02) |
| Legacy IDs | MST-BUS-SAP-ABAP-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain ABAP Cloud, the SAP BTP ABAP environment and the clean-core principle
2. Apply modern ABAP language features, data types and internal tables
3. Build RAP (ABAP RESTful Application Programming) business objects and services
4. Implement data modelling with CDS, and apply released APIs and extensibility

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> **Module structure, titles and all weightings below are DESIGN ASSUMPTIONS.** The official exam outline could not be fetched (network egress blocked on 2026-10-02) and must be confirmed against the issuer's official source before SME review and publication.

## Modules

### M01 ABAP Cloud, BTP Environment and Clean Core (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Decide whether a required object is allowed under clean-core using its release status; (2) Choose side-by-side vs on-stack extension for a scenario
- Common misconception addressed: Using classic, non-released ABAP APIs in ABAP Cloud and assuming they will be upgrade-stable
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | ABAP Cloud, the BTP ABAP environment and development tools (ADT) | 120 | 6 |
| M01L02 | The clean-core principle and released vs non-released objects | 120 | 6 |
| M01L03 | Software components, packages and the ABAP Cloud development model | 120 | 6 |

### M02 Modern ABAP Language and Data Handling (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Rewrite a classic loop using modern constructor/table expressions; (2) Define and raise a class-based exception with a message
- Common misconception addressed: Treating field-symbols/references and work-area copies as interchangeable when modifying internal tables
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Modern ABAP syntax, inline declarations and expressions | 120 | 6 |
| M02L02 | Internal tables, work areas and table operations | 120 | 6 |
| M02L03 | Object-oriented ABAP: classes, interfaces and exceptions | 120 | 6 |

### M03 CDS Data Modelling and RAP (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Model a CDS view with an association and expose it; (2) Add a determination/validation to a managed RAP business object
- Common misconception addressed: Expecting a CDS view alone to provide transactional create/update without a RAP behaviour definition
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Core Data Services (CDS) views and data definitions | 120 | 6 |
| M03L02 | RAP: behaviour definitions, managed business objects and validations | 120 | 6 |
| M03L03 | Exposing OData/business services and consuming released APIs | 120 | 6 |

## Integrative case

A developer must add a side-by-side extension on SAP BTP that exposes a custom business object: model the data with CDS, build a RAP managed business object with validations, expose an OData service, and keep the solution clean-core using released APIs.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source was not fetched; official question count, duration and domain weightings must be confirmed on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1818-practice-form-A | 45 | 45 | yes |
| MST-1818-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1818-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1818-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| ABAP Cloud, BTP Environment and Clean Core | 15 |
| Modern ABAP Language and Data Handling | 15 |
| CDS Data Modelling and RAP | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1818-Q0001** (single-answer, Select ONE) What does the 'clean core' principle encourage developers to do in ABAP Cloud?

- A. Build extensions using released APIs and extension points so upgrades stay stable **(key)**  
  _Rationale:_ Correct: clean core means using released/public APIs and stable extension points to keep the core upgrade-safe.
- B. Modify standard SAP tables directly for speed  
  _Rationale:_ Direct core modification is exactly what clean core avoids.
- C. Avoid version control entirely  
  _Rationale:_ Clean core is about stable extension, not abandoning version control.
- D. Only ever write code in the classic SAP GUI editor  
  _Rationale:_ ABAP Cloud development uses ADT; clean core is unrelated to insisting on SAP GUI.

**MST-1818-Q0002** (single-answer, Select ONE) In RAP, which artifact defines the create/update/delete behaviour and validations of a business object?

- A. The behaviour definition (and its implementation) **(key)**  
  _Rationale:_ Correct: the behaviour definition specifies the transactional behaviour, operations and validations of a RAP BO.
- B. The CDS data definition alone  
  _Rationale:_ The CDS data definition models data; it does not define transactional behaviour by itself.
- C. The transport request  
  _Rationale:_ A transport request moves objects between systems; it defines no behaviour.
- D. The package assignment  
  _Rationale:_ Package assignment organises objects; it defines no behaviour.

**MST-1818-Q0003** (multiple-answer, Select TWO) Select TWO statements that are TRUE about internal tables in modern ABAP.

- A. An internal table holds multiple rows of a structured type in memory **(key)**  
  _Rationale:_ Correct: internal tables store multiple rows of a line type at runtime.
- B. Table expressions such as itab[ key = value ] can read a row directly **(key)**  
  _Rationale:_ Correct: modern ABAP supports table expressions for direct row access.
- C. An internal table can hold only one row at a time  
  _Rationale:_ That describes a work area/structure, not an internal table.
- D. Internal tables cannot be declared inline  
  _Rationale:_ Modern ABAP supports inline declaration (e.g. DATA(itab) ...).
- E. Internal tables are always persisted to the database automatically  
  _Rationale:_ Internal tables live in memory; persistence requires explicit database operations.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
