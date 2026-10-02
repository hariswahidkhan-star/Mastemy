# Excel Model Governance, Documentation, and Review

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0655` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02: formula precedents and dependents (Trace Precedents / Trace Dependents and the related Range APIs), formula auditing and error-checking including circular-reference detection. Governance practices (model standards, version control, sign-off) are Mastemy design content layered on those tool facts. |
| Official sources | https://learn.microsoft.com/office/dev/add-ins/excel/excel-add-ins-ranges-precedents-dependents; https://support.microsoft.com/office/a59bef2b-3701-46bf-8ff1-d3518771d507 |
| Evidence | **vendor-docs-partial** - official Microsoft documentation read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-AUDIT |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Model Governance, Documentation, and Review (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply a consistent model standard separating inputs, workings and outputs
2. Trace formula precedents and dependents to understand a model's logic
3. Detect and resolve errors and circular references using formula auditing
4. Document a model so a reviewer can follow and re-perform it
5. Run a structured model review and record the sign-off

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Model standards (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Restructure an unlabelled model into standard sections; (2) Apply a colour and labelling convention for inputs vs formulas
- Common misconception addressed: Mixing hard-coded inputs into calculation cells with no visual marker
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inputs, workings, outputs separation | 96 | 6 |
| M01L02 | Consistent formatting and labelling | 96 | 6 |
### M02 Tracing logic (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Trace precedents of a key output back to its inputs; (2) Use dependents to find everything a changed input affects
- Common misconception addressed: Assuming Trace Precedents follows links across other workbooks
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Trace Precedents and Dependents | 96 | 6 |
| M02L02 | Following a calculation chain | 96 | 6 |
### M03 Error and circular-reference checking (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Use Error Checking to locate and fix a circular reference; (2) Diagnose a #REF!/#VALUE! chain and repair the root cause
- Common misconception addressed: Enabling iterative calculation to silence a circular reference that is actually a mistake
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Error checking and error types | 96 | 6 |
| M03L02 | Finding and fixing circular references | 96 | 6 |
### M04 Documentation (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Write an assumptions and version log for a model; (2) Add cell comments that let a reviewer re-perform a calculation
- Common misconception addressed: Leaving a model with no record of its assumptions or changes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Assumptions log and change history | 96 | 6 |
| M04L02 | Making a model re-performable | 96 | 6 |
### M05 Model review and sign-off (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Review a peer's model against a checklist and log findings; (2) Record a sign-off noting residual risks
- Common misconception addressed: Signing off a model after only glancing at the output numbers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | A structured review checklist | 96 | 6 |
| M05L02 | Recording the review decision | 96 | 6 |

## Integrative case

A finance team inherits an undocumented pricing model before an audit: restructure it to a model standard, trace the logic with precedents and dependents, find and fix a circular reference, write an assumptions and version log, then run a structured review and record the sign-off with residual risks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0655-final-protected | 30 | 40 | yes |
| MST-0655-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Model standards | 6 |
| Tracing logic | 6 |
| Error and circular-reference checking | 6 |
| Documentation | 6 |
| Model review and sign-off | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0655-Q0001** (single-answer, Select ONE) Excel reports a circular reference when you open a workbook. Which built-in tool lists the cells involved?

- A. Formulas > Formula Auditing > Error Checking > Circular References **(key)**  
  _Rationale:_ Correct: this lists every cell in the circular chain so you can jump to each.
- B. Insert > Slicer  
  _Rationale:_ Slicers filter data; they do not find circular references.
- C. Data > Remove Duplicates  
  _Rationale:_ That de-duplicates rows; it is unrelated.
- D. Review > Spelling  
  _Rationale:_ Spelling check does not detect formula loops.
**MST-0655-Q0002** (multiple-answer, Select TWO) Which TWO statements about Trace Precedents and Trace Dependents are correct? (Select TWO.)

- A. Precedents are the cells a formula reads from **(key)**  
  _Rationale:_ Correct: precedents feed into the selected formula.
- B. Dependents are the cells that depend on the selected cell **(key)**  
  _Rationale:_ Correct: dependents are formulas that point at the selected cell.
- C. Tracing follows references across separate workbooks  
  _Rationale:_ The trace tools and the related APIs do not cross workbook boundaries.
- D. Precedents and dependents mean the same thing  
  _Rationale:_ They are opposite directions of the dependency chain.
**MST-0655-Q0003** (single-answer, Select ONE) A reviewer cannot tell which cells in a model are assumptions and which are calculations. What model-standard practice prevents this?

- A. Separate inputs, workings and outputs and mark inputs with a consistent convention **(key)**  
  _Rationale:_ Correct: a visible inputs/workings/outputs standard makes assumptions traceable.
- B. Hide all formulas from the reviewer  
  _Rationale:_ Hiding logic makes review harder, not easier.
- C. Store every number as text  
  _Rationale:_ Text storage breaks calculations and does not clarify roles.
- D. Delete the assumptions once the model is built  
  _Rationale:_ Removing assumptions destroys traceability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
