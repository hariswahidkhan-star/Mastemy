# Excel Office Scripts and Workflow Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0647` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Office Scripts documentation read via the Microsoft Learn MCP on 2026-10-02 (Action Recorder, Code Editor, TypeScript ExcelScript API, Power Automate integration, best practices). Platform support varies (Excel on the web) and must be confirmed before production. |
| Official sources | https://learn.microsoft.com/office/dev/scripts/overview/excel; https://learn.microsoft.com/office/dev/scripts/develop/best-practices |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-OFFICE-SCRIPTS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Office Scripts and Workflow Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Record actions with the Action Recorder and read the generated script
2. Edit scripts in the Code Editor using the ExcelScript TypeScript API
3. Read from and write to ranges, tables and worksheets reliably
4. Add defensive checks so scripts fail safely on missing objects
5. Trigger a script from a Power Automate flow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Office Scripts and the Action Recorder (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Record a formatting routine and replay it on a new sheet; (2) Use Copy as code to capture a specific action
- Common misconception addressed: Assuming recorded scripts work identically on every platform
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | When to use Office Scripts | 88 | 5 |
| M01L02 | Recording and replaying with the Action Recorder | 88 | 5 |

### M02 The Code Editor and TypeScript basics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Edit a recorded script to parameterise a colour; (2) Add a console.log to inspect a value
- Common misconception addressed: Thinking Office Scripts require deep TypeScript expertise to begin
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The Code Editor environment and the main function | 88 | 5 |
| M02L02 | TypeScript essentials for scripts | 87 | 5 |

### M03 Working with ranges, tables and worksheets (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Read A1 and write a computed value to B1; (2) Add a row to a named table and refresh a PivotTable
- Common misconception addressed: Using relative references that break when run from automation
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Getting worksheets, ranges and values | 87 | 5 |
| M03L02 | Writing values and formatting ranges | 87 | 5 |
| M03L03 | Working with tables and PivotTables | 87 | 5 |

### M04 Robust, maintainable scripts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Guard a getWorksheet call so a missing sheet is logged; (2) Handle an empty table without throwing
- Common misconception addressed: Calling methods on an object that may have been renamed or removed
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Checking objects exist before using them | 87 | 5 |
| M04L02 | Platform limits and error handling | 87 | 5 |

### M05 Automation with Power Automate (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add typed parameters to main and call from a flow; (2) Build a flow that runs the script on a schedule
- Common misconception addressed: Relying on getActiveWorksheet inside a Power Automate-triggered script
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Accepting parameters in the main function | 87 | 5 |
| M05L02 | Triggering a script from a Power Automate flow | 87 | 5 |

## Integrative case

A team re-formats a daily CSV the same way each morning; record the steps as an Office Script, harden it with existence checks, and run it automatically from a Power Automate flow triggered on file arrival.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0647-final-protected | 30 | 40 | yes |
| MST-0647-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Office Scripts and the Action Recorder | 5 |
| The Code Editor and TypeScript basics | 6 |
| Working with ranges, tables and worksheets | 7 |
| Robust, maintainable scripts | 6 |
| Automation with Power Automate | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0647-Q0001** (single-answer, Select ONE) Why should a Power Automate-triggered Office Script avoid Workbook.getActiveWorksheet?

- A. Automated runs have no reliable active selection, so named references are safer **(key)**  
  _Rationale:_ Correct: flows should reference objects by consistent names, not relative/active state.
- B. getActiveWorksheet is not a valid API  
  _Rationale:_ It is valid; it is just unreliable in automation.
- C. It deletes the active worksheet  
  _Rationale:_ It does not delete anything.
- D. It only works in VBA  
  _Rationale:_ It is an Office Scripts API, not VBA.

**MST-0647-Q0002** (multiple-answer, Select TWO) Which TWO are recommended defensive practices in Office Scripts? (Select TWO.)

- A. Check that a worksheet or table exists before calling methods on it **(key)**  
  _Rationale:_ Correct: guarding against missing objects prevents abrupt failures.
- B. Use the Action Recorder to learn how an API is called **(key)**  
  _Rationale:_ Correct: recording is the easiest way to discover the correct API calls.
- C. Assume every workbook always contains the expected sheet  
  _Rationale:_ Sheets can be renamed or removed between runs.
- D. Hard-code cell colours so the script cannot be reused  
  _Rationale:_ Parameterising improves reuse; hard-coding reduces it.

**MST-0647-Q0003** (single-answer, Select ONE) Office Scripts are written primarily in which language?

- A. TypeScript **(key)**  
  _Rationale:_ Correct: Office Scripts use TypeScript (a superset of JavaScript).
- B. VBA  
  _Rationale:_ VBA is the older Excel macro language, not Office Scripts.
- C. Python  
  _Rationale:_ Python in Excel is a separate feature from Office Scripts.
- D. DAX  
  _Rationale:_ DAX is a modelling formula language, not a scripting language.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
