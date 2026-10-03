# Excel Basics: Workbooks, Cells, and Everyday Tasks

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2649` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Basics: Workbooks, Cells, and Everyday Tasks (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate the Excel interface and manage workbooks, worksheets, rows, columns and cells confidently
2. Enter, edit and format text, numbers, dates and currency so data reads clearly and consistently
3. Write simple arithmetic and the core functions SUM, AVERAGE, COUNT, MIN and MAX with correct cell references
4. Apply relative and absolute references ($) so formulas copy correctly across a range
5. Sort, filter and find data, and print or export a worksheet that fits the page
6. Save, organise and recover workbooks and avoid the most common beginner mistakes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The Excel environment and workbook structure (25% (design weight), design weight)

- Worked applications: (1) Build a household budget workbook with formatted categories and a SUM total; (2) Fix a formula that breaks when copied by adding $ to the right reference
- Common misconception addressed: Believing a number stored as text will still add up in SUM
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The ribbon, tabs, name box and formula bar | 120 | 7 |
| M01L02 | Workbooks, worksheets and navigating large grids | 120 | 7 |

### M02 Entering and formatting data (25% (design weight), design weight)

- Worked applications: (1) Apply a date and a currency format to a messy imported column; (2) Choose a number format rather than typing symbols like % or $ by hand
- Common misconception addressed: Thinking changing a number format also changes the stored value
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data types: text, numbers, dates and currency | 120 | 7 |
| M02L02 | Number formats, alignment, borders and cell styles | 120 | 7 |

### M03 First formulas and references (25% (design weight), design weight)

- Worked applications: (1) Total a sales column with SUM and average it with AVERAGE, checking the result by hand; (2) Copy a tax-rate formula down a column using an absolute reference
- Common misconception addressed: Using COUNT when COUNTA is needed because some cells hold text
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Arithmetic and the SUM/AVERAGE/COUNT family | 120 | 7 |
| M03L02 | Relative vs absolute references and the fill handle | 120 | 7 |

### M04 Working with and sharing data (25% (design weight), design weight)

- Worked applications: (1) Sort a contact list by surname then filter to one city; (2) Set a print area and fit a wide sheet to one page wide
- Common misconception addressed: Overwriting the only copy of a workbook instead of using Save As
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sort, filter and basic find-and-replace | 120 | 7 |
| M04L02 | Page setup, printing and saving/exporting safely | 120 | 7 |

## Integrative case

A volunteer is handed a plain list of 300 fundraising donations with inconsistent formatting: they must clean the data types, total and average the amounts, filter to one campaign, and print a one-page summary for the committee.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2649-final-protected | 40 | 40 | yes |
| MST-2649-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The Excel environment and workbook structure | 10 |
| Entering and formatting data | 10 |
| First formulas and references | 10 |
| Working with and sharing data | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2649-Q0001** (single-answer, Select ONE) A cell shows 1,250 but SUM ignores it and other obviously numeric cells. What is the most likely cause?

- A. The numbers are stored as text, so SUM does not add them **(key)**  
  _Rationale:_ Correct: text that looks numeric is excluded by SUM; convert it to a number to fix the total.
- B. Excel can only SUM up to 100 cells  
  _Rationale:_ There is no such limit; SUM handles very large ranges.
- C. The AVERAGE function is interfering with SUM  
  _Rationale:_ Functions do not interfere with each other this way.
- D. Currency formatting disables arithmetic  
  _Rationale:_ Formatting changes appearance only, not whether a value is numeric.

**MST-2649-Q0002** (multiple-answer, Select TWO) You copied =B2*C2 down a column but every row multiplies by the same tax rate in C2. Which TWO fixes make it copy correctly? (Select TWO.)

- A. Lock the rate with an absolute reference, e.g. =B2*$C$2 **(key)**  
  _Rationale:_ Correct: anchoring the rate keeps it fixed while B adjusts per row.
- B. Put the rate in the formula as a typed number repeated per row **(key)**  
  _Rationale:_ Correct: hard-coding the same rate per row also yields correct results, though it is less maintainable.
- C. Delete the fill handle  
  _Rationale:_ The fill handle is a tool, not the cause of the error.
- D. Format the column as currency  
  _Rationale:_ Formatting does not change which cell a reference points to.

**MST-2649-Q0003** (single-answer, Select ONE) Which action changes only how a value looks, not the value Excel stores?

- A. Applying a number format such as currency or percentage **(key)**  
  _Rationale:_ Correct: number formats affect display only; the underlying value is unchanged.
- B. Typing a new number into the cell  
  _Rationale:_ That replaces the stored value.
- C. Using ROUND in a formula  
  _Rationale:_ ROUND changes the computed value, not just its display.
- D. Deleting the cell contents  
  _Rationale:_ That removes the stored value.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
