# Excel Financial Modeling and Scenario Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0638` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02 (formulas and financial functions, What-If Analysis including Scenario Manager, Goal Seek and Data Tables). Function and tool availability vary by Excel channel; confirm against the current build before production. |
| Official sources | https://support.microsoft.com/office/overview-of-formulas-in-excel-ecfdc708-9162-49e8-b993-c311f47ca173; https://support.microsoft.com/office/introduction-to-what-if-analysis-22bffa5f-e891-4acc-bf7a-e4645c446fb4 |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-FINMODEL |
| Legacy IDs | MST-FIN-SK-FME-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 55 / module checks 64 / cumulative 121 min |
| Certificate | Mastemy Certificate of Completion — Excel Financial Modeling and Scenario Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure a three-statement-style model with clear inputs and drivers
2. Use financial functions (NPV, IRR, PMT) correctly
3. Build scenarios with Scenario Manager and data tables
4. Run sensitivity analysis on key assumptions
5. Document assumptions and check a model for integrity

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Model structure and drivers (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rebuild a model so every assumption is a labelled input; (2) Add a driver that flows through to the outputs
- Common misconception addressed: Hard-coding numbers inside formulas instead of linking to labelled input cells
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inputs, drivers and outputs | 88 | 5 |
| M01L02 | Linking assumptions through a model | 88 | 5 |

### M02 Financial functions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute NPV and IRR for a project's cash flows; (2) Build a loan schedule using PMT
- Common misconception addressed: Misreading NPV's treatment of the first cash flow timing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | NPV and IRR | 88 | 5 |
| M02L02 | PMT and loan schedules | 87 | 5 |
| M02L03 | Rate and period conventions | 87 | 5 |

### M03 Scenario analysis (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Create best/base/worst scenarios in Scenario Manager; (2) Use Goal Seek to hit a target NPV
- Common misconception addressed: Overwriting the base case when testing a scenario instead of switching cleanly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scenario Manager | 87 | 5 |
| M03L02 | Goal Seek | 87 | 5 |
| M03L03 | Comparing scenarios | 87 | 5 |

### M04 Sensitivity and model integrity (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a two-variable data table on price and volume; (2) Add integrity checks and an assumptions log
- Common misconception addressed: Trusting a model without checks that would catch a broken link
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | One- and two-variable data tables | 87 | 5 |
| M04L02 | Sensitivity interpretation | 87 | 5 |
| M04L03 | Checks and documentation | 87 | 5 |

## Integrative case

An analyst must appraise a capital project: build a driver-based cash-flow model, compute NPV and IRR, test best/base/worst scenarios, run a two-variable sensitivity table on price and volume, and document the assumptions for a review meeting.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0638-final-protected | 30 | 40 | yes |
| MST-0638-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Model structure and drivers | 8 |
| Financial functions | 8 |
| Scenario analysis | 7 |
| Sensitivity and model integrity | 7 |

Minimum reviewed item bank: 298 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0638-Q0001** (single-answer, Select ONE) Why keep every assumption in a clearly labelled input cell rather than typed inside formulas?

- A. So the model can be re-run with new assumptions in one place and audited **(key)**  
  _Rationale:_ Correct: separating inputs makes the model updatable and auditable.
- B. Because Excel cannot calculate with constants in formulas  
  _Rationale:_ Excel calculates with constants fine; this is a modelling discipline.
- C. To make the file open faster  
  _Rationale:_ This is not a performance measure.
- D. Because Scenario Manager only reads named cells  
  _Rationale:_ Scenario Manager can use cell references regardless.

**MST-0638-Q0002** (multiple-answer, Select TWO) Which TWO statements about Excel What-If tools are correct? (Select TWO.)

- A. Goal Seek finds the input value that produces a target formula result **(key)**  
  _Rationale:_ Correct: Goal Seek solves for one input to reach a target.
- B. Scenario Manager can store and switch between sets of input values **(key)**  
  _Rationale:_ Correct: Scenario Manager saves named sets of changing cells.
- C. A data table permanently replaces the model's base case  
  _Rationale:_ A data table reports results; it does not overwrite the base case.
- D. Goal Seek can solve for multiple inputs at once  
  _Rationale:_ Goal Seek changes only one cell; Solver handles multiple.

**MST-0638-Q0003** (single-answer, Select ONE) A two-variable data table is best used to show how one output responds to changes in how many inputs?

- A. Two inputs varied across rows and columns **(key)**  
  _Rationale:_ Correct: a two-variable data table varies two inputs simultaneously.
- B. One input only  
  _Rationale:_ That is a one-variable data table.
- C. Three or more inputs  
  _Rationale:_ Data tables support at most two input variables.
- D. None; it only reformats the output  
  _Rationale:_ A data table recomputes results across input combinations.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
