# Advanced Excel Formulas and Dynamic Arrays

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0632` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02 (dynamic arrays and spilling: FILTER, SORT, UNIQUE, SEQUENCE; XLOOKUP; LAMBDA). Dynamic-array functions require a supported Excel build, which must be confirmed before production. |
| Official sources | https://support.microsoft.com/office/dynamic-array-formulas-and-spilled-array-behavior-205c6b06-03ba-4151-89a1-87a7eb36e531; https://support.microsoft.com/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929 |
| Evidence | **verified-official-source** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-DYNAMIC-ARRAYS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Advanced Excel Formulas and Dynamic Arrays (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain dynamic arrays and spilled-range behaviour
2. Use FILTER, SORT, UNIQUE and SEQUENCE for dynamic results
3. Build robust lookups with XLOOKUP and its arguments
4. Combine functions into readable, maintainable formulas
5. Diagnose spill and reference errors in array formulas

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot grade a learner's live formulas; formula building is taught through demonstrations and model-answer analysis.

## Modules

### M01 Dynamic arrays and spilling (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Convert a static list to a spilled UNIQUE result; (2) Identify the spill range of a formula
- Common misconception addressed: Expecting one formula to behave the same as it did before dynamic arrays
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What dynamic arrays and spilling are | 72 | 5 |
| M01L02 | Reading and referencing spilled ranges | 72 | 5 |

### M02 Core array functions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a FILTER that shows matching rows; (2) Combine SORT and UNIQUE for a clean dynamic list
- Common misconception addressed: Copying array results as values and losing the live behaviour
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | FILTER, SORT and UNIQUE | 96 | 5 |
| M02L02 | SEQUENCE and generating series | 96 | 5 |

### M03 Robust lookups with XLOOKUP (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Replace a fragile VLOOKUP with XLOOKUP; (2) Use XLOOKUP's not-found and match arguments
- Common misconception addressed: Leaving no not-found handling so errors propagate
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | XLOOKUP arguments and defaults | 80 | 5 |
| M03L02 | Handling not-found and approximate matches | 80 | 5 |
| M03L03 | Returning and aggregating multiple matches | 80 | 5 |

### M04 Composing readable formulas (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Refactor a nested formula for readability; (2) Name a reusable calculation with LAMBDA
- Common misconception addressed: Nesting so deeply the formula cannot be maintained
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Composing and nesting functions | 96 | 5 |
| M04L02 | LAMBDA and named calculations | 96 | 5 |

### M05 Diagnosing array errors (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Fix a #SPILL! error by clearing the spill range; (2) Trace a wrong array result to its cause
- Common misconception addressed: Treating #SPILL! as random instead of a blocked output range
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Spill errors and their causes | 96 | 5 |
| M05L02 | Debugging array and reference errors | 96 | 5 |

## Integrative case

An analyst replaces a fragile report with dynamic arrays: use UNIQUE and SORT to build a self-updating category list, FILTER to show matching rows, XLOOKUP for the summary, and fix the #SPILL! error caused by data blocking the spill range.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0632-final-protected | 30 | 40 | yes |
| MST-0632-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Dynamic arrays and spilling | 5 |
| Core array functions | 6 |
| Robust lookups with XLOOKUP | 7 |
| Composing readable formulas | 6 |
| Diagnosing array errors | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0632-Q0001** (single-answer, Select ONE) A formula that worked yesterday now shows #SPILL!. The most likely cause is:

- A. A cell in the spill output range now contains data blocking the spill **(key)**  
  _Rationale:_ Correct: #SPILL! appears when the cells a dynamic array needs to fill are not empty.
- B. The function name was deleted from Excel  
  _Rationale:_ Built-in functions are not deleted; #SPILL! is a range-blocking error.
- C. The workbook theme changed  
  _Rationale:_ Theming does not cause spill errors.
- D. The sheet was renamed  
  _Rationale:_ A rename does not produce #SPILL!.

**MST-0632-Q0002** (multiple-answer, Select TWO) Which TWO functions return a dynamic (spilled) array? (Select TWO.)

- A. FILTER **(key)**  
  _Rationale:_ Correct: FILTER returns all matching rows as a spilled array.
- B. UNIQUE **(key)**  
  _Rationale:_ Correct: UNIQUE returns the distinct values as a spilled array.
- C. A plain SUM of one range  
  _Rationale:_ SUM returns a single scalar, not a spilled array.
- D. A cell's number format  
  _Rationale:_ Number formatting is not a function and returns nothing.

**MST-0632-Q0003** (single-answer, Select ONE) XLOOKUP is preferred over VLOOKUP mainly because it:

- A. Can look left or right and takes an explicit not-found argument **(key)**  
  _Rationale:_ Correct: XLOOKUP is direction-independent and lets you set the value returned when nothing matches.
- B. Automatically formats the result as currency  
  _Rationale:_ XLOOKUP does not change formatting.
- C. Creates a chart from the result  
  _Rationale:_ It returns a value, not a chart.
- D. Requires the lookup column to be sorted  
  _Rationale:_ XLOOKUP does not require sorted data for an exact match.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
