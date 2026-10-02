# Excel Power Query: Data Preparation and Transformation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0635` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Power Query documentation read via the Microsoft Learn MCP on 2026-10-02 (Get Data experience, Power Query Editor UI, Applied Steps, Advanced Editor/M). Specific ribbon labels and connector availability vary by Excel channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/power-query/power-query-ui; https://learn.microsoft.com/training/modules/automate-data-cleaning-power-query/ |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-POWER-QUERY |
| Legacy IDs | MST-MIC-SK-EPQ-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Power Query: Data Preparation and Transformation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect to common data sources and import data into the Power Query Editor
2. Apply and reorder transformation steps using the Applied Steps list
3. Shape data by filtering, splitting, pivoting, merging and appending queries
4. Explain query folding and refresh behaviour at a conceptual level
5. Build a repeatable, documented query that loads clean data back to Excel

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Connecting to data and the Power Query Editor (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Import a CSV and an Excel table and compare the two connectors; (2) Rename and annotate three applied steps for a colleague
- Common misconception addressed: Believing imported data is edited in place rather than via a non-destructive step list
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Get Data experience and supported sources | 88 | 5 |
| M01L02 | Touring the Power Query Editor and Applied Steps | 88 | 5 |

### M02 Column and row transformations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Clean a messy address column into structured fields; (2) Remove error rows and set correct data types for a date column
- Common misconception addressed: Assuming a changed data type is cosmetic rather than affecting downstream steps
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Filtering, sorting, removing and typing columns | 88 | 5 |
| M02L02 | Split, extract, replace and fill operations | 87 | 5 |

### M03 Reshaping and combining queries (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Unpivot a wide monthly report into a tidy long table; (2) Merge a transactions query with a lookup query using the correct join
- Common misconception addressed: Confusing Merge (columns/join) with Append (stacking rows)
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Group By, pivot and unpivot | 87 | 5 |
| M03L02 | Merge queries (join kinds) | 87 | 5 |
| M03L03 | Append queries and reference vs duplicate | 87 | 5 |

### M04 Query folding, refresh and parameters (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reorder steps so a filter folds back to the source; (2) Add a parameter for a file path and refresh
- Common misconception addressed: Expecting every transformation to fold back to the source database
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Query folding and why step order matters | 87 | 5 |
| M04L02 | Parameters and refresh behaviour | 87 | 5 |

### M05 Loading, documenting and maintaining queries (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Load a query as connection-only and as a table and compare; (2) Write a step-by-step description for a handover
- Common misconception addressed: Loading everything to a worksheet when connection-only would be correct
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Close & Load options and load targets | 87 | 5 |
| M05L02 | Documenting and troubleshooting a query | 87 | 5 |

## Integrative case

An analyst receives three monthly CSV exports with inconsistent headers and a lookup workbook; build a single Power Query that imports, cleans, merges and loads them into one refreshable table, documenting each applied step.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0635-final-protected | 30 | 40 | yes |
| MST-0635-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Connecting to data and the Power Query Editor | 5 |
| Column and row transformations | 6 |
| Reshaping and combining queries | 7 |
| Query folding, refresh and parameters | 6 |
| Loading, documenting and maintaining queries | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0635-Q0001** (single-answer, Select ONE) An analyst needs to stack twelve monthly tables with identical columns into one table. Which Power Query operation fits?

- A. Append queries **(key)**  
  _Rationale:_ Correct: Append stacks rows from queries that share the same column structure.
- B. Merge queries  
  _Rationale:_ Merge joins columns from two queries on a key; it does not stack rows.
- C. Pivot column  
  _Rationale:_ Pivot reshapes rows into columns and does not combine separate queries.
- D. Group By  
  _Rationale:_ Group By aggregates within one query and does not stack tables.

**MST-0635-Q0002** (multiple-answer, Select TWO) Which TWO statements about the Applied Steps list are correct? (Select TWO.)

- A. Each step is recorded and can be selected to preview the data at that point **(key)**  
  _Rationale:_ Correct: every transformation is saved as a reviewable step.
- B. Steps are applied non-destructively to the source data **(key)**  
  _Rationale:_ Correct: the source is not altered; steps transform a working copy.
- C. Deleting a step always leaves later steps unaffected  
  _Rationale:_ Later steps often depend on earlier ones, so deletions can break them.
- D. The step list runs only once and cannot be refreshed  
  _Rationale:_ The step list re-runs on every refresh against current source data.

**MST-0635-Q0003** (single-answer, Select ONE) Reordering a filter earlier in a query against a SQL source can enable what benefit?

- A. Query folding, pushing the filter back to the source **(key)**  
  _Rationale:_ Correct: folding translates steps into a source query so less data is pulled.
- B. Automatic creation of a PivotTable  
  _Rationale:_ Folding does not create PivotTables.
- C. Conversion of the query to VBA  
  _Rationale:_ Power Query does not convert queries to VBA.
- D. Removal of the need to refresh  
  _Rationale:_ Refresh is still required to pull current data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
