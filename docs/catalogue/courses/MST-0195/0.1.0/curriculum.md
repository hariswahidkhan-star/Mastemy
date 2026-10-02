# Microsoft Office Specialist Excel Expert: Knowledge Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0195` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MO-201 |
| Version basis | Microsoft Office Specialist skills outline (Excel Expert, Office 2019); functional-group domains published, percentage weightings not published by the issuer. |
| Evidence | **verified-official-source** - https://learn.microsoft.com/en-us/credentials/certifications/mos-excel-expert-2019/ |
| Legacy IDs | MST-MIC-MOS-MO201-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage workbook options and settings for expert use
2. Manage and format data with advanced techniques
3. Create advanced formulas and macros
4. Manage advanced charts and tables

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.
- Format gap: The official MOS Expert exam is performance-based inside a live Excel application. Mastemy practice uses MCQ/MR only and cannot reproduce hands-on task performance in a real workbook.

## Modules

### M01 Manage workbook options and settings (weight not published (DESIGN ASSUMPTION))

- Worked applications: (1) Create and manage workbook templates; (2) Reference data across workbooks and manage links
- Common misconception addressed: Thinking a template (.xltx) stores the data you entered while building it
- Module check: 50 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Manage workbooks | 360 | 6 |
| M01L02 | Prepare workbooks for collaboration and auditing | 360 | 6 |

### M02 Manage and format data (weight not published (DESIGN ASSUMPTION))

- Worked applications: (1) Use advanced Fill Series and custom number formats; (2) Apply advanced conditional formatting with formulas
- Common misconception addressed: Writing a conditional-format formula with the wrong relative anchor
- Module check: 50 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fill and format data | 360 | 6 |
| M02L02 | Apply data validation and advanced features | 360 | 6 |

### M03 Create advanced formulas and macros (weight not published (DESIGN ASSUMPTION))

- Worked applications: (1) Use nested IF, IFS, SWITCH, AND/OR; (2) Use VLOOKUP/XLOOKUP, INDEX and MATCH
- Common misconception addressed: Using approximate-match lookup on unsorted data
- Module check: 50 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Perform logical and lookup operations | 240 | 6 |
| M03L02 | Use advanced date, financial and text functions | 240 | 6 |
| M03L03 | Create and modify simple macros | 240 | 6 |

### M04 Manage advanced charts and tables (weight not published (DESIGN ASSUMPTION))

- Worked applications: (1) Build combo and dual-axis charts; (2) Add trendlines and secondary elements
- Common misconception addressed: Reading a secondary axis as if it shared the primary scale
- Module check: 50 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Create advanced charts | 360 | 6 |
| M04L02 | Create PivotTables and PivotCharts | 360 | 6 |

## Integrative case

Build a reusable budgeting template for a franchise: configure workbook options and protection, create data validation and advanced conditional formats, author nested/lookup/financial formulas, record a simple macro, and add a PivotTable with an advanced chart.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0195-practice-form-A | 90 | 90 | yes |
| MST-0195-practice-form-B | 90 | 90 | no (optional practice) |
| MST-0195-practice-form-C | 90 | 90 | no (optional practice) |
| MST-0195-final-protected | 90 | 90 | yes |

| Domain | Items per form |
|---|---|
| Manage workbook options and settings | 23 |
| Manage and format data | 23 |
| Create advanced formulas and macros | 22 |
| Manage advanced charts and tables | 22 |

Minimum reviewed item bank: 868 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0195-Q0001** (single-answer, Select ONE) You must look up a price in an unsorted product table and return an exact match. Which is the most reliable choice?

- A. VLOOKUP with range_lookup TRUE  
  _Rationale:_ TRUE performs approximate match and needs sorted data; it can return wrong results.
- B. XLOOKUP with default exact match **(key)**  
  _Rationale:_ Correct: XLOOKUP defaults to exact match and works on unsorted data.
- C. HLOOKUP with TRUE  
  _Rationale:_ HLOOKUP searches rows and TRUE is still approximate match.
- D. LOOKUP vector form  
  _Rationale:_ LOOKUP assumes ascending sorted data and gives unreliable results otherwise.

**MST-0195-Q0002** (single-answer, Select ONE) A colleague saves a budget as an Excel template (.xltx). What happens when they double-click it later?

- A. It opens a new workbook based on the template **(key)**  
  _Rationale:_ Correct: opening a template creates a new workbook, leaving the template intact.
- B. It opens and overwrites the template as they edit  
  _Rationale:_ Editing a file opened from a template does not overwrite the template itself.
- C. It converts to .xlsx permanently  
  _Rationale:_ The template remains .xltx; only the new workbook is a normal file.
- D. It locks the template for all users  
  _Rationale:_ Opening a template does not lock it for others.

**MST-0195-Q0003** (multiple-answer, Select TWO) Which TWO are true about a PivotTable built on an external range? (Select TWO)

- A. It must be refreshed to reflect new source rows **(key)**  
  _Rationale:_ Correct: a PivotTable caches data and needs a refresh to pick up changes.
- B. Adding a slicer lets users filter it interactively **(key)**  
  _Rationale:_ Correct: slicers provide interactive filtering of a PivotTable.
- C. It automatically rewrites the source data  
  _Rationale:_ A PivotTable summarizes; it never edits the source.
- D. It cannot show subtotals  
  _Rationale:_ PivotTables can show subtotals and grand totals.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
