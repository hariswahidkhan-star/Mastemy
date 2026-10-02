# Microsoft Excel: Complete Professional Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0631` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02 (dynamic arrays, PivotTables, functions). Specific ribbon labels can vary by Excel channel and must be confirmed against the current build before production. |
| Official sources | https://support.microsoft.com/office/excel-help-learning-9bc05390-e94c-46af-a5b3-d7c22f6990bb; https://support.microsoft.com/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576 |
| Evidence | **verified-official-source** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-OVERVIEW |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Excel: Complete Professional Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate the Excel interface and manage workbooks and worksheets
2. Enter, format and manage data accurately
3. Build formulas with relative and absolute references
4. Use core functions for calculation, lookup and text
5. Create basic charts and PivotTables to summarise data

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot grade a learner's live workbook; spreadsheet building is taught through demonstrations and model-answer analysis.

## Modules

### M01 Interface and workbook basics (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Set up a workbook with named, ordered worksheets; (2) Navigate and select ranges efficiently
- Common misconception addressed: Storing related data across scattered sheets with no structure
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Excel interface and navigation | 72 | 5 |
| M01L02 | Workbooks, worksheets and saving | 72 | 5 |

### M02 Entering and formatting data (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Enter and format a dataset with correct number types; (2) Apply consistent formatting for readability
- Common misconception addressed: Storing numbers as text so calculations silently fail
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data entry and data types | 96 | 5 |
| M02L02 | Formatting cells and number formats | 96 | 5 |

### M03 Formulas and references (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a formula using relative references and fill it down; (2) Fix a formula by switching to an absolute reference
- Common misconception addressed: Forgetting to anchor a reference so a filled formula breaks
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Writing formulas and operators | 80 | 5 |
| M03L02 | Relative, absolute and mixed references | 80 | 5 |
| M03L03 | Auditing and fixing formula errors | 80 | 5 |

### M04 Core functions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use SUM, AVERAGE and IF on a dataset; (2) Look up a value with XLOOKUP and clean text
- Common misconception addressed: Reaching for a manual calculation where a function is safer
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Calculation and logical functions | 96 | 5 |
| M04L02 | Lookup and text functions | 96 | 5 |

### M05 Charts and PivotTables (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Summarise a table with a PivotTable; (2) Create a chart that communicates one clear message
- Common misconception addressed: Charting raw unsummarised data and hiding the message
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Creating and reading PivotTables | 96 | 5 |
| M05L02 | Charts that communicate clearly | 96 | 5 |

## Integrative case

A new analyst builds a monthly sales workbook: structure the data as an Excel Table, add calculated columns with correct references, summarise with a PivotTable, chart the trend, and format it for a manager to read without further edits.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0631-final-protected | 30 | 40 | yes |
| MST-0631-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Interface and workbook basics | 5 |
| Entering and formatting data | 6 |
| Formulas and references | 7 |
| Core functions | 6 |
| Charts and PivotTables | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0631-Q0001** (single-answer, Select ONE) A formula =B2*C$1 is filled down a column. Why is the C1 reference written as C$1?

- A. To keep the row fixed on row 1 while the column fills down **(key)**  
  _Rationale:_ Correct: the dollar sign before the row number locks that row so every filled formula still multiplies by C1.
- B. To make the value bold  
  _Rationale:_ The dollar sign is a reference anchor, not formatting.
- C. To convert C1 to text  
  _Rationale:_ It does not change the data type of C1.
- D. To create a chart  
  _Rationale:_ Reference anchoring is unrelated to charting.

**MST-0631-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of a PivotTable? (Select TWO.)

- A. Summarising sales totals by region **(key)**  
  _Rationale:_ Correct: PivotTables aggregate and group values, such as totals by category.
- B. Counting orders per product category **(key)**  
  _Rationale:_ Correct: grouping and counting by category is a core PivotTable use.
- C. Permanently changing the raw source cells  
  _Rationale:_ A PivotTable summarises data; it does not edit the source rows.
- D. Setting the font of the workbook theme  
  _Rationale:_ Theming is unrelated to PivotTable analysis.

**MST-0631-Q0003** (single-answer, Select ONE) Numbers imported into a column are left-aligned and will not sum. The most likely cause is:

- A. They are stored as text, not numbers **(key)**  
  _Rationale:_ Correct: text-stored numbers left-align and are excluded from numeric sums until converted.
- B. The chart is missing  
  _Rationale:_ Charts do not affect whether values sum.
- C. The workbook is read-only  
  _Rationale:_ Read-only status would block edits, not cause a failed sum.
- D. There are too many worksheets  
  _Rationale:_ Sheet count does not affect summation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
