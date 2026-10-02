# Power Apps Canvas Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0711` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Power Apps documentation read via the Microsoft Learn MCP on 2026-10-02 (canvas apps, Power Fx formula language based on Excel, controls and their properties, data sources and connections, galleries and forms, Navigate/SubmitForm/Patch functions, delegation). Power Apps updates frequently; confirm control and function behaviour against current docs before production. |
| Official sources | https://learn.microsoft.com/power-apps/maker/canvas-apps/working-with-formulas; https://learn.microsoft.com/power-apps/maker/canvas-apps/working-with-data-sources |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-POWERAPPS-CANVAS |
| Legacy IDs | MST-MIC-SK-PACAB-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 45 / module checks 64 / cumulative 131 min |
| Certificate | Mastemy Certificate of Completion — Power Apps Canvas Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create a canvas app and add and configure controls
2. Write Power Fx formulas to drive behaviour
3. Connect to data sources and bind galleries and forms
4. Submit and edit records with forms and Patch
5. Understand delegation and build a usable multi-screen app

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Canvas apps and controls (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add and configure a gallery and labels; (2) Set a control property from another control's value
- Common misconception addressed: Expecting controls to behave like fixed cells rather than property-driven objects
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Creating a canvas app | 107 | 5 |
| M01L02 | Controls and their properties | 107 | 5 |

### M02 Power Fx formulas (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a formula that sums two inputs into a label; (2) Use If to colour a value conditionally
- Common misconception addressed: Writing imperative code instead of declarative Power Fx expressions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Power Fx basics (Excel-like formulas) | 107 | 5 |
| M02L02 | Reacting to user input | 107 | 5 |

### M03 Data sources, galleries and forms (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Bind a gallery Items property to a data source; (2) Set a form's Item to the gallery's Selected record
- Common misconception addressed: Confusing a connected data source with a temporary in-app collection
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data sources and connections | 107 | 5 |
| M03L02 | Galleries, display and edit forms | 107 | 5 |

### M04 Records, navigation and delegation (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Use Navigate and SubmitForm across browse/detail/edit screens; (2) Identify a non-delegable function and a safe alternative
- Common misconception addressed: Ignoring delegation limits and silently truncating large data sets
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Navigate, SubmitForm and Patch | 106 | 5 |
| M04L02 | Multi-screen apps | 106 | 5 |
| M04L03 | Delegation and large data sets | 106 | 5 |

## Integrative case

A maker builds an asset-tracking canvas app: connect to a data source, show records in a gallery, build browse/detail/edit screens, write Power Fx to navigate and submit changes, and account for delegation so the app behaves correctly over a large list.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0711-final-protected | 30 | 40 | yes |
| MST-0711-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Canvas apps and controls | 8 |
| Power Fx formulas | 8 |
| Data sources, galleries and forms | 7 |
| Records, navigation and delegation | 7 |

Minimum reviewed item bank: 278 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0711-Q0001** (single-answer, Select ONE) Power Apps canvas apps build logic using which formula language?

- A. Power Fx, an Excel-like low-code formula language **(key)**  
  _Rationale:_ Correct: canvas apps use Power Fx, based on Excel formulas.
- B. Transact-SQL  
  _Rationale:_ T-SQL is for relational databases, not canvas-app logic.
- C. DAX  
  _Rationale:_ DAX is Power BI's modelling language, not canvas-app logic.
- D. Bicep  
  _Rationale:_ Bicep is for Azure infrastructure, not canvas apps.

**MST-0711-Q0002** (multiple-answer, Select TWO) Which TWO statements about canvas-app data are correct? (Select TWO.)

- A. A gallery's Items property can be set to a data source to show its records **(key)**  
  _Rationale:_ Correct: binding Items to a data source displays records.
- B. A collection is a data source local to the app and only temporary **(key)**  
  _Rationale:_ Correct: collections are local, in-app, and not shared across devices.
- C. SubmitForm writes changes directly without any data source  
  _Rationale:_ SubmitForm writes to the form's connected data source.
- D. Connected data sources cannot be edited from the app  
  _Rationale:_ Apps can read and write to connected data sources.

**MST-0711-Q0003** (single-answer, Select ONE) Why does delegation matter when a canvas app uses a large data source?

- A. Non-delegable operations are processed on only a subset of rows, risking wrong results **(key)**  
  _Rationale:_ Correct: non-delegable queries operate on a row limit and can silently truncate.
- B. Delegation changes the app's colour theme  
  _Rationale:_ Delegation concerns data processing, not styling.
- C. Delegation deletes old records automatically  
  _Rationale:_ Delegation does not delete data.
- D. Delegation is only about screen navigation  
  _Rationale:_ Delegation is about where data queries are processed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
