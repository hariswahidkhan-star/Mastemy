# AI-Assisted Excel Formula Auditing and Error Detection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0653` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Excel feature facts (formula auditing tools - Trace Precedents/Dependents, Evaluate Formula, the Watch Window, error-checking rules; error values and IFERROR/IFNA; data validation) and Copilot-in-Excel explain behaviour grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02; Copilot availability depends on licensing and its output must be verified. Confirm tool and Copilot availability against the current build before production. |
| Official sources | https://support.microsoft.com/office/detect-errors-in-formulas-3a8acca5-1d61-4702-80e0-99a36a2822c1; https://support.microsoft.com/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-AUDIT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Excel Formula Auditing and Error Detection (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Excel's formula auditing tools
2. Diagnose and handle error values
3. Use Copilot to explain and review formulas
4. Build self-checking, robust models
5. Document an audit trail for a workbook

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Formula auditing tools (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Trace a broken dependency chain with Trace Precedents; (2) Step through a nested formula with Evaluate Formula
- Common misconception addressed: Guessing at the source of an error instead of tracing precedents
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Trace precedents and dependents | 80 | 5 |
| M01L02 | Evaluate Formula | 80 | 5 |
| M01L03 | Show Formulas and the Watch Window | 80 | 5 |

### M02 Error types and handling (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Wrap a lookup with IFNA to handle missing matches; (2) Diagnose a #REF! error after a deleted column
- Common misconception addressed: Hiding errors with IFERROR instead of fixing the underlying cause
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Error values and their meaning | 80 | 5 |
| M02L02 | IFERROR and IFNA | 80 | 5 |
| M02L03 | Background error-checking rules | 80 | 5 |

### M03 AI-assisted review (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Ask Copilot to explain a complex nested formula; (2) Verify a Copilot-proposed fix against the expected output
- Common misconception addressed: Trusting an AI-simplified formula without recomputing the result
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Copilot explain-this-formula | 80 | 5 |
| M03L02 | Copilot error suggestions | 80 | 5 |
| M03L03 | Validating AI fixes | 80 | 5 |

### M04 Robust and testable models (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a reconciliation check row that must sum to zero; (2) Build an input guard with data validation
- Common misconception addressed: Shipping a model with no self-checks or reconciliation totals
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Input validation and guards | 80 | 5 |
| M04L02 | Reconciliation checks | 80 | 5 |
| M04L03 | Audit documentation | 80 | 5 |

## Integrative case

An analyst inherits a fragile workbook that returns errors: trace and repair the broken dependencies, add error handling and reconciliation checks, and use Copilot to explain and validate the repairs before handing it back.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0653-final-protected | 30 | 40 | yes |
| MST-0653-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Formula auditing tools | 8 |
| Error types and handling | 8 |
| AI-assisted review | 7 |
| Robust and testable models | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0653-Q0001** (single-answer, Select ONE) A formula suddenly shows #REF!. The most likely cause is:

- A. A cell or range the formula referred to was deleted **(key)**  
  _Rationale:_ Correct: #REF! appears when a reference becomes invalid, often after a delete.
- B. The workbook is too large  
  _Rationale:_ File size does not cause #REF!.
- C. The formula is text  
  _Rationale:_ Text would not raise #REF!.
- D. Autosave is turned off  
  _Rationale:_ Autosave is unrelated to #REF!.

**MST-0653-Q0002** (multiple-answer, Select TWO) Which TWO are Excel formula-auditing tools? (Select TWO.)

- A. Trace Precedents **(key)**  
  _Rationale:_ Correct: Trace Precedents highlights cells feeding a formula.
- B. Evaluate Formula **(key)**  
  _Rationale:_ Correct: Evaluate Formula steps through a calculation.
- C. Freeze Panes  
  _Rationale:_ Freeze Panes is a view aid, not an auditing tool.
- D. Page Break Preview  
  _Rationale:_ A printing view, not an auditing tool.

**MST-0653-Q0003** (single-answer, Select ONE) What is the risk of wrapping every formula in IFERROR by default?

- A. It can mask genuine errors that should be investigated and fixed **(key)**  
  _Rationale:_ Correct: blanket IFERROR hides the cause instead of fixing it.
- B. It makes the workbook calculate faster  
  _Rationale:_ Speed is not the concern here.
- C. It permanently deletes the data  
  _Rationale:_ IFERROR does not delete data.
- D. It converts numbers to text  
  _Rationale:_ IFERROR does not change data types by itself.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
