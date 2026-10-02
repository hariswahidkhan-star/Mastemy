# Power BI: Complete Business Intelligence Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0707` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Power BI documentation read via the Microsoft Learn MCP on 2026-10-02 (Power BI Desktop and service; Get Data and Power Query transformation; data model relationships and star schema; DAX measures and calculated columns; report visuals and interactions; publishing, workspaces and sharing). Power BI updates monthly; confirm ribbon labels and features against the current build before production. |
| Official sources | https://learn.microsoft.com/power-bi/fundamentals/power-bi-overview; https://learn.microsoft.com/power-bi/transform-model/desktop-relationships-understand |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-POWERBI |
| Legacy IDs | MST-MIC-SK-PBDF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 45 / module checks 64 / cumulative 131 min |
| Certificate | Mastemy Certificate of Completion — Power BI: Complete Business Intelligence Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect to and transform data with Power Query in Power BI Desktop
2. Build a star-schema data model with relationships
3. Write DAX measures and calculated columns
4. Design clear, interactive reports
5. Publish to the service and share via workspaces

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Getting and transforming data (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Import two tables and clean them in Power Query; (2) Rename and type columns for a tidy model
- Common misconception addressed: Cleaning data in the report rather than in Power Query before modelling
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Get Data and connectors | 107 | 5 |
| M01L02 | Transforming with Power Query | 107 | 5 |

### M02 Data modelling and relationships (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create relationships between a fact and two dimensions; (2) Set cardinality and cross-filter direction
- Common misconception addressed: Building one flat table instead of a star schema with related dimensions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Star schema basics | 107 | 5 |
| M02L02 | Relationships, cardinality and filter direction | 107 | 5 |

### M03 DAX measures (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a revenue measure and a year-over-year measure; (2) Explain measure vs calculated column for a scenario
- Common misconception addressed: Using calculated columns where a measure would be correct and more efficient
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Measures vs calculated columns | 107 | 5 |
| M03L02 | Core DAX functions and context | 107 | 5 |

### M04 Reporting, publishing and sharing (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Design an interactive report with cross-filtering; (2) Publish to a workspace and set sharing
- Common misconception addressed: Overloading a page with visuals so the key message is lost
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Visuals and interactions | 106 | 5 |
| M04L02 | Report design for clarity | 106 | 5 |
| M04L03 | Publishing, workspaces and sharing | 106 | 5 |

## Integrative case

An analyst builds a sales BI solution: import and clean source tables with Power Query, model a star schema with relationships, write DAX measures for revenue and growth, design an interactive report, then publish to a workspace and share it with stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0707-final-protected | 30 | 40 | yes |
| MST-0707-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting and transforming data | 8 |
| Data modelling and relationships | 8 |
| DAX measures | 7 |
| Reporting, publishing and sharing | 7 |

Minimum reviewed item bank: 278 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0707-Q0001** (single-answer, Select ONE) Where should most data cleaning happen in a Power BI solution?

- A. In Power Query, before the data reaches the model **(key)**  
  _Rationale:_ Correct: transform data in Power Query so the model stays clean.
- B. Manually in each visual on the report page  
  _Rationale:_ Cleaning per visual is fragile and not repeatable.
- C. Only after publishing to the service  
  _Rationale:_ Cleaning belongs upstream, before modelling and publishing.
- D. It is unnecessary if you write enough DAX  
  _Rationale:_ DAX cannot substitute for proper data preparation.

**MST-0707-Q0002** (multiple-answer, Select TWO) Which TWO statements about Power BI data modelling are correct? (Select TWO.)

- A. A star schema separates a fact table from related dimension tables **(key)**  
  _Rationale:_ Correct: the star schema is the recommended model shape.
- B. Relationships define how tables filter one another by cardinality and direction **(key)**  
  _Rationale:_ Correct: relationships set cardinality and cross-filter direction.
- C. A single flat table is always preferable to a star schema  
  _Rationale:_ A star schema is generally preferred over one flat table.
- D. Relationships are unnecessary if every table is imported  
  _Rationale:_ Relationships are what let tables interact correctly.

**MST-0707-Q0003** (single-answer, Select ONE) You need a total that responds to slicers and filters on the report. What should you create?

- A. A DAX measure **(key)**  
  _Rationale:_ Correct: measures evaluate in the current filter context, responding to slicers.
- B. A calculated column computed row-by-row at load  
  _Rationale:_ A calculated column does not react to report filters like a measure.
- C. A static text box  
  _Rationale:_ A text box does not compute a filtered total.
- D. A new data source  
  _Rationale:_ Adding a source does not create a responsive total.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
