# Excel VBA: Automation and Maintainable Macros

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0646` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Office VBA documentation read via the Microsoft Learn MCP on 2026-10-02 (Visual Basic Editor and the macro recorder, the Excel object model with Application/Workbook/Worksheet/Range, variables with Dim, branching and looping, Range object usage). The VBA language is stable across versions; macro-enabled files require the .xlsm extension. |
| Official sources | https://learn.microsoft.com/office/vba/library-reference/concepts/getting-started-with-vba-in-office; https://learn.microsoft.com/office/vba/api/excel.range(object) |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-VBA |
| Legacy IDs | none |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 55 / module checks 64 / cumulative 151 min |
| Certificate | Mastemy Certificate of Completion — Excel VBA: Automation and Maintainable Macros (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Record and read a macro in the Visual Basic Editor
2. Navigate the Excel object model (Application, Workbook, Worksheet, Range)
3. Use variables, branching and loops in procedures
4. Write Sub and Function procedures with parameters
5. Handle errors and structure macros for maintainability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 The VBA editor and the macro recorder (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Record a formatting macro and read the generated code; (2) Enable the Developer tab and save as .xlsm
- Common misconception addressed: Believing recorded macros are optimal code rather than a literal keystroke transcript
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Visual Basic Editor and Developer tab | 99 | 5 |
| M01L02 | Recording and reading macros | 99 | 5 |

### M02 The Excel object model (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Rewrite a recorded macro to act on a Range without selecting it; (2) Reference cells via Worksheets().Range and .Cells
- Common misconception addressed: Relying on Select/Activate instead of referencing objects directly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Application, Workbook and Worksheet | 98 | 5 |
| M02L02 | The Range object | 98 | 5 |
| M02L03 | Avoiding Select and Activate | 98 | 5 |

### M03 Variables, branching and loops (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Declare typed variables and loop over a data range; (2) Add If/Else logic to skip blank rows
- Common misconception addressed: Omitting Dim and leaking Variant types that hide bugs
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variables and data types | 98 | 5 |
| M03L02 | If/Else branching | 98 | 5 |
| M03L03 | For and Do loops | 98 | 5 |

### M04 Procedures, error handling and maintainability (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Split a macro into a Sub plus a Function with parameters; (2) Add On Error handling and a graceful message
- Common misconception addressed: Writing one giant Sub rather than small, named, reusable procedures
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sub and Function procedures | 98 | 5 |
| M04L02 | Parameters and return values | 98 | 5 |
| M04L03 | Error handling and code structure | 98 | 5 |

## Integrative case

An analyst automates a weekly report: record a first draft, refactor it to loop over a variable number of rows, split logic into reusable procedures, add error handling so a missing file does not crash the run, and save the workbook as a macro-enabled file for colleagues.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0646-final-protected | 30 | 40 | yes |
| MST-0646-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The VBA editor and the macro recorder | 8 |
| The Excel object model | 8 |
| Variables, branching and loops | 7 |
| Procedures, error handling and maintainability | 7 |

Minimum reviewed item bank: 298 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0646-Q0001** (single-answer, Select ONE) Why must a workbook containing macros be saved with the .xlsm extension?

- A. The standard .xlsx format cannot store macro code **(key)**  
  _Rationale:_ Correct: macro code requires the macro-enabled .xlsm format.
- B. Because .xlsm files calculate faster  
  _Rationale:_ The extension is about storing macros, not speed.
- C. Because VBA only runs on Windows files  
  _Rationale:_ The extension requirement is about format, not platform.
- D. Because .xlsx cannot contain charts  
  _Rationale:_ .xlsx can contain charts; the issue is macro storage.

**MST-0646-Q0002** (multiple-answer, Select TWO) Which TWO are good practices in Excel VBA? (Select TWO.)

- A. Reference ranges directly instead of using Select then Selection **(key)**  
  _Rationale:_ Correct: direct references are faster and more reliable.
- B. Declare variables with Dim and an explicit type **(key)**  
  _Rationale:_ Correct: explicit typing catches errors and documents intent.
- C. Put all logic in a single long Sub for simplicity  
  _Rationale:_ Large monolithic subs are harder to maintain and reuse.
- D. Rely on the macro recorder's code without refactoring  
  _Rationale:_ Recorded code is literal and usually needs refactoring.

**MST-0646-Q0003** (single-answer, Select ONE) In VBA, which statement sets a Range object variable to A1:D5 on Sheet1?

- A. Set myRange = Worksheets("Sheet1").Range("A1:D5") **(key)**  
  _Rationale:_ Correct: object variables are assigned with Set and a Range reference.
- B. myRange = Worksheets("Sheet1").Range("A1:D5")  
  _Rationale:_ Assigning an object without Set raises an error.
- C. Dim myRange = Range("A1:D5")  
  _Rationale:_ Dim declares; it does not assign a value on the same line this way.
- D. Let myRange = "A1:D5"  
  _Rationale:_ Let assigns values, not object references, and a string is not a Range.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
