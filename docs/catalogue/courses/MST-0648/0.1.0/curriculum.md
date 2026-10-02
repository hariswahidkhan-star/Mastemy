# Python in Excel: Analytical Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0648` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Python-for-analysis concepts (pandas, data exploration) grounded in official Microsoft Learn documentation read via the Microsoft Learn MCP on 2026-10-02. The native 'Python in Excel' feature page (support.microsoft.com) was NOT confirmed this session; cloud execution model, available libraries and the =PY() entry point are DESIGN ASSUMPTION pending a read of the official Python in Excel page before production. |
| Official sources | https://learn.microsoft.com/training/modules/explore-analyze-data-with-python/; https://learn.microsoft.com/power-bi/connect-data/desktop-python-in-query-editor |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-PYTHON-EXCEL |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Python in Excel: Analytical Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe how Python runs inside Excel and where results appear
2. Move data between Excel ranges and a pandas DataFrame
3. Perform cleaning, aggregation and grouping with pandas
4. Produce charts/visual summaries from Python output
5. Decide when Python in Excel is appropriate versus native formulas

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 How Python runs inside Excel (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Return a DataFrame and a single value to the grid; (2) Explain where computation happens to a security reviewer
- Common misconception addressed: Assuming Python in Excel runs locally like a desktop script
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Python in Excel execution model | 88 | 5 |
| M01L02 | Referencing ranges and returning results | 88 | 5 |

### M02 DataFrames and Excel data (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Load a table into a DataFrame and inspect its shape; (2) Write a cleaned DataFrame back to the sheet
- Common misconception addressed: Confusing a DataFrame object with a spilled Excel range
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Loading ranges into a pandas DataFrame | 88 | 5 |
| M02L02 | Returning DataFrames and scalars to Excel | 87 | 5 |

### M03 Cleaning and aggregation with pandas (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Fill missing values and justify the method; (2) Group transactions by month and sum amounts
- Common misconception addressed: Filling missing values without documenting the chosen method
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Filtering, typing and handling missing values | 87 | 5 |
| M03L02 | Group-by aggregation | 87 | 5 |
| M03L03 | Joining and reshaping data | 87 | 5 |

### M04 Visual summaries (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plot a monthly trend from grouped data; (2) Produce a describe() summary and interpret it
- Common misconception addressed: Treating a generated chart as validated analysis without checking inputs
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Charts from Python output | 87 | 5 |
| M04L02 | Summary tables and describe() | 87 | 5 |

### M05 Choosing the right tool (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide tool choice for three scenarios; (2) Document a Python cell for a non-coding reviewer
- Common misconception addressed: Reaching for Python when a PivotTable would be simpler and clearer
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Python vs native formulas and PivotTables | 87 | 5 |
| M05L02 | Reproducibility and handover considerations | 87 | 5 |

## Integrative case

An analyst must summarise a 50k-row transaction export; use Python in Excel with pandas to clean, group and visualise the data, then explain to a colleague when a native PivotTable would have been the better tool.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0648-final-protected | 30 | 40 | yes |
| MST-0648-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How Python runs inside Excel | 5 |
| DataFrames and Excel data | 6 |
| Cleaning and aggregation with pandas | 7 |
| Visual summaries | 6 |
| Choosing the right tool | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0648-Q0001** (single-answer, Select ONE) A colleague needs a quick monthly subtotal with no code to maintain. Which tool is usually the better choice?

- A. A native Excel PivotTable **(key)**  
  _Rationale:_ Correct: for simple subtotals a PivotTable is simpler and needs no code maintenance.
- B. A pandas group-by in Python  
  _Rationale:_ This works but adds code and maintenance for a simple task.
- C. An Office Script  
  _Rationale:_ Automation scripting is unnecessary for a one-off subtotal.
- D. A DAX measure  
  _Rationale:_ DAX requires a Data Model; overkill for a quick subtotal.

**MST-0648-Q0002** (multiple-answer, Select TWO) Which TWO are true when analysing data with pandas inside Excel? (Select TWO.)

- A. Data is loaded from ranges into a DataFrame for analysis **(key)**  
  _Rationale:_ Correct: pandas operates on DataFrames created from Excel data.
- B. The method chosen to fill missing values should be documented **(key)**  
  _Rationale:_ Correct: imputation choices affect results and must be recorded.
- C. A DataFrame is identical to an Excel named range  
  _Rationale:_ They are different objects with different behaviours.
- D. Charts generated from Python need no review of their inputs  
  _Rationale:_ Outputs must still be validated against trustworthy inputs.

**MST-0648-Q0003** (single-answer, Select ONE) Which pandas library task is typically used to combine a transactions table with a lookup table on a key?

- A. A merge/join operation **(key)**  
  _Rationale:_ Correct: pandas merge joins tables on a shared key.
- B. A describe() call  
  _Rationale:_ describe() summarises statistics, it does not join tables.
- C. A fillna() call  
  _Rationale:_ fillna handles missing values, not joins.
- D. A plot() call  
  _Rationale:_ plot() visualises data; it does not join tables.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
