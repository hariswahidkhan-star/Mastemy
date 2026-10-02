# Excel Tables, Data Validation, and Workbook Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0633` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02 (structured table references that expand and contract with data, data validation rule types including list/decimal/date/custom with error alerts and prompts, named ranges). Ribbon labels and feature availability vary by Excel channel; confirm against the current build before production. |
| Official sources | https://support.microsoft.com/office/overview-of-excel-tables-7ab0bb7d-3a9e-4b56-a3c9-6c94334e492c; https://learn.microsoft.com/office/dev/add-ins/excel/excel-add-ins-data-validation |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-TABLES |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 55 / module checks 64 / cumulative 181 min |
| Certificate | Mastemy Certificate of Completion — Excel Tables, Data Validation, and Workbook Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Convert ranges into Excel tables and use structured references
2. Design data-validation rules that constrain and guide data entry
3. Organise a workbook into input, calculation and output layers
4. Use named ranges and defined names to make models readable
5. Build a maintainable workbook that scales as data grows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Excel tables and structured references (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Convert a range to a table and rewrite a formula with structured references; (2) Add a total row and a calculated column that expands automatically
- Common misconception addressed: Believing a table is only a style and that structured references behave like fixed ranges
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Creating tables and table styles | 110 | 5 |
| M01L02 | Structured references and calculated columns | 109 | 5 |
| M01L03 | Totals, filtering and the expanding range | 109 | 5 |

### M02 Data validation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a dependent dropdown list with validation; (2) Write a custom-formula validation rule to prevent duplicates
- Common misconception addressed: Assuming validation blocks pasted values the same way it blocks typed entries
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | List, number and date validation | 109 | 5 |
| M02L02 | Custom-formula validation | 109 | 5 |
| M02L03 | Input prompts and error alerts | 109 | 5 |

### M03 Workbook architecture (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Restructure a workbook into input/calc/output layers; (2) Add a documentation sheet describing each input
- Common misconception addressed: Mixing inputs, calculations and outputs on one sheet so changes break silently
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Separating inputs, calculations and outputs | 109 | 5 |
| M03L02 | Sheet organisation and navigation | 109 | 5 |

### M04 Named ranges and maintainability (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Replace raw references with named ranges in a model; (2) Use Name Manager to audit and fix scope conflicts
- Common misconception addressed: Using cryptic cell references in formulas rather than meaningful defined names
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defined names and scope | 109 | 5 |
| M04L02 | Name Manager and auditing | 109 | 5 |
| M04L03 | Designing for growth and handover | 109 | 5 |

## Integrative case

An operations lead must harden a shared tracking workbook used by ten colleagues: convert the data to tables, add validation that prevents bad entries, separate inputs from calculations, and document named ranges so the workbook survives new rows and new users.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0633-final-protected | 30 | 40 | yes |
| MST-0633-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Excel tables and structured references | 8 |
| Data validation | 8 |
| Workbook architecture | 7 |
| Named ranges and maintainability | 7 |

Minimum reviewed item bank: 298 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0633-Q0001** (single-answer, Select ONE) A formula references Table1[Amount]. A user adds 50 new rows to the table. What happens to the formula result?

- A. It automatically includes the new rows because the structured reference expands **(key)**  
  _Rationale:_ Correct: structured references expand and contract with the table.
- B. It keeps the original row count and ignores new rows  
  _Rationale:_ Structured references are not fixed to the original size.
- C. It returns an error until the formula is edited  
  _Rationale:_ No edit is required; the reference adjusts automatically.
- D. It only updates after the workbook is reopened  
  _Rationale:_ The reference updates on recalculation, not on reopen.

**MST-0633-Q0002** (multiple-answer, Select TWO) Which TWO are true about Excel data validation? (Select TWO.)

- A. A list rule can present an in-cell dropdown of allowed values **(key)**  
  _Rationale:_ Correct: list validation can show an in-cell dropdown.
- B. A custom rule can use a formula that returns TRUE for valid entries **(key)**  
  _Rationale:_ Correct: custom validation evaluates a formula per entry.
- C. Validation always blocks a plain paste of an invalid value  
  _Rationale:_ A plain paste can bypass validation; it is not always triggered.
- D. Validation permanently locks the cell against any future edits  
  _Rationale:_ Validation constrains entries; it does not lock the cell.

**MST-0633-Q0003** (single-answer, Select ONE) Why separate inputs, calculations and outputs onto distinct areas of a workbook?

- A. So assumptions can be changed in one place without hunting through formulas **(key)**  
  _Rationale:_ Correct: isolating inputs makes a model easier to update and audit.
- B. Because Excel refuses to calculate across sheets otherwise  
  _Rationale:_ Excel calculates across sheets fine; this is a design choice.
- C. To reduce the file size of the workbook  
  _Rationale:_ Layering does not meaningfully change file size.
- D. Because named ranges only work on separate sheets  
  _Rationale:_ Named ranges work regardless of layering.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
