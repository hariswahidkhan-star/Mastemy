# Excel Power Pivot and Data Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0636` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft DAX and Power Pivot documentation read via the Microsoft Learn MCP on 2026-10-02 (Data Model, relationships, measures vs calculated columns, row/filter context). DAX function availability varies by Excel/Analysis Services version and must be confirmed before production. |
| Official sources | https://learn.microsoft.com/dax/dax-overview; https://support.microsoft.com/office/power-pivot-overview-and-learning-f9001958-7901-4caa-ad80-028a6d2432ed |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-POWER-PIVOT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Power Pivot and Data Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Load tables into the Excel Data Model and create relationships
2. Distinguish calculated columns from measures and choose correctly
3. Write foundational DAX using SUM, CALCULATE and basic time intelligence
4. Explain row context and filter context at a working level
5. Build a star-schema model that drives a PivotTable report

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 The Excel Data Model and Power Pivot (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Load three tables into the Data Model; (2) Identify when a worksheet formula should become a model measure
- Common misconception addressed: Treating the Data Model as interchangeable with worksheet ranges
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What the Data Model adds beyond worksheet tables | 88 | 5 |
| M01L02 | Loading tables and the Power Pivot window | 88 | 5 |

### M02 Relationships and star schema (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a one-to-many relationship between sales and date; (2) Refactor a flat table into fact and dimension tables
- Common misconception addressed: Assuming a resource group of tables works without defined relationships
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating relationships and cardinality | 88 | 5 |
| M02L02 | Designing a star schema with fact and dimension tables | 87 | 5 |

### M03 Calculated columns and measures (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a calculated column for a product category band; (2) Replace an implicit measure with an explicit SUM measure
- Common misconception addressed: Using a calculated column where a measure is the correct, lighter choice
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Calculated columns and when to use them | 87 | 5 |
| M03L02 | Measures and the implicit vs explicit choice | 87 | 5 |
| M03L03 | Organising and naming model calculations | 87 | 5 |

### M04 DAX foundations: context (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain why a measure changes value across a PivotTable; (2) Use CALCULATE to compute a filtered subtotal
- Common misconception addressed: Believing a measure returns one fixed number regardless of context
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Row context and filter context | 87 | 5 |
| M04L02 | CALCULATE and modifying filter context | 87 | 5 |

### M05 Reporting and basic time intelligence (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a year-to-date measure against a marked date table; (2) Create a KPI comparing actual to target
- Common misconception addressed: Running time intelligence without a proper marked date table
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Measures in PivotTables and KPIs | 87 | 5 |
| M05L02 | Basic time intelligence with a date table | 87 | 5 |

## Integrative case

A finance team has a wide sales export and separate date, product and region tables; build a star-schema Data Model with relationships and a small set of DAX measures that feed a PivotTable for monthly margin by region.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0636-final-protected | 30 | 40 | yes |
| MST-0636-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The Excel Data Model and Power Pivot | 5 |
| Relationships and star schema | 6 |
| Calculated columns and measures | 7 |
| DAX foundations: context | 6 |
| Reporting and basic time intelligence | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0636-Q0001** (single-answer, Select ONE) You need a value that recalculates for whatever rows a PivotTable cell filters. Which object is correct?

- A. A measure **(key)**  
  _Rationale:_ Correct: measures evaluate in the current filter context of each cell.
- B. A calculated column  
  _Rationale:_ A calculated column is computed per row at refresh and does not react to PivotTable filter context.
- C. A worksheet named range  
  _Rationale:_ A named range is static and outside the Data Model.
- D. A data validation list  
  _Rationale:_ Data validation controls input, not calculation.

**MST-0636-Q0002** (multiple-answer, Select TWO) Which TWO are characteristics of a well-formed star schema in the Data Model? (Select TWO.)

- A. A central fact table linked to dimension tables **(key)**  
  _Rationale:_ Correct: a star schema has one fact table joined to dimensions.
- B. Relationships defined between fact and dimension keys **(key)**  
  _Rationale:_ Correct: relationships let filters flow from dimensions to the fact.
- C. All data merged into a single wide table  
  _Rationale:_ That is a flat table, the opposite of a star schema.
- D. No date table because dates live in the fact table  
  _Rationale:_ A dedicated date table is recommended for time intelligence.

**MST-0636-Q0003** (single-answer, Select ONE) CALCULATE is primarily used to do what?

- A. Evaluate an expression with a modified filter context **(key)**  
  _Rationale:_ Correct: CALCULATE changes the filter context under which an expression is evaluated.
- B. Create a relationship between two tables  
  _Rationale:_ Relationships are defined in the model, not by CALCULATE.
- C. Import data from a CSV  
  _Rationale:_ Import is done by Get Data / Power Query, not DAX.
- D. Format a PivotTable  
  _Rationale:_ Formatting is not a DAX function.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
