# ChatGPT + Power Query + ERP Exports: Finance Reconciliation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0807` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT + Power Query + ERP Exports: Finance Reconciliation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a finance reconciliation with controls and an audit trail
2. Validate and clean ERP export data before matching
3. Build refreshable Power Query transformations and matches
4. Use ChatGPT to draft and classify exceptions with verification
5. Produce reviewable exception reports and reviewer handovers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Reconciliation scope and controls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Document inputs, matching rules and sign-off for a bank reconciliation; (2) Map who prepares vs who approves to preserve segregation of duties
- Common misconception addressed: Treating an AI summary as the reconciliation rather than as a drafting aid
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining the reconciliation and its risks | 120 | 7 |
| M01L02 | Audit trail and segregation of duties | 120 | 7 |

### M02 ERP exports and data hygiene (MASTEMY-DESIGN 20%)

- Worked applications: (1) Validate a general-ledger export row count and control total; (2) Standardise date and currency formats before matching
- Common misconception addressed: Assuming an export is complete without checking control totals
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pulling and validating ERP export files | 120 | 7 |
| M02L02 | Cleaning, typing and reconciling keys | 120 | 7 |

### M03 Power Query transformation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a merge that matches ledger lines to statement lines; (2) Parameterise the file path so the query refreshes next period
- Common misconception addressed: Hard-coding values so the query breaks on the next period
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Query steps, merges and joins | 120 | 7 |
| M03L02 | Parameterised, refreshable queries | 120 | 7 |

### M04 ChatGPT-assisted analysis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft a prompt that classifies unmatched items by likely cause; (2) Trace an AI-suggested explanation back to the source rows
- Common misconception addressed: Accepting an AI explanation of a variance without checking the figures
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Prompting for exception explanations | 120 | 7 |
| M04L02 | Verifying AI output against source numbers | 120 | 7 |

### M05 Reporting and review (MASTEMY-DESIGN 20%)

- Worked applications: (1) Produce an exception report with amounts, ageing and owner; (2) Prepare a reviewer pack that links each number to its source
- Common misconception addressed: Shipping a reconciliation narrative without a documented review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Exception reports and narratives | 120 | 7 |
| M05L02 | Reviewer handoff and documentation | 120 | 7 |

## Integrative case

Reconcile a monthly ledger to a bank statement: validate the ERP export's control totals, build a refreshable Power Query match, use ChatGPT to classify unmatched items, verify each explanation against source rows, and hand a reviewer a pack that traces every figure, while keeping preparer and approver separate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0807-final-protected | 40 | 50 | yes |
| MST-0807-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Reconciliation scope and controls | 8 |
| ERP exports and data hygiene | 8 |
| Power Query transformation | 8 |
| ChatGPT-assisted analysis | 8 |
| Reporting and review | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0807-Q0001** (single-answer, Select ONE) Before matching an ERP export, what check best confirms the file is complete?

- A. Compare the export's control total and row count to the source system **(key)**  
  _Rationale:_ Correct: reconciling control totals and counts detects truncated or partial exports.
- B. Open the file and read the first ten rows  
  _Rationale:_ Reading a few rows does not confirm the whole file arrived.
- C. Trust the file because it downloaded without an error  
  _Rationale:_ A clean download can still be incomplete or filtered.
- D. Delete rows that look unusual  
  _Rationale:_ Deleting rows corrupts the reconciliation and hides real items.

**MST-0807-Q0002** (multiple-answer, Select TWO) Which TWO practices keep ChatGPT-assisted variance analysis trustworthy? (Select TWO.)

- A. Trace each AI explanation back to the underlying source rows **(key)**  
  _Rationale:_ Correct: verification against source keeps conclusions grounded.
- B. Keep the AI output as a draft that a preparer confirms **(key)**  
  _Rationale:_ Correct: treating output as a draft preserves human accountability.
- C. Post AI conclusions straight into the final report  
  _Rationale:_ Unverified conclusions can carry errors into the report.
- D. Hide the prompt so the method cannot be reviewed  
  _Rationale:_ Hiding the method undermines auditability.

**MST-0807-Q0003** (single-answer, Select ONE) Why parameterise the source file path in a Power Query reconciliation?

- A. So the query refreshes cleanly against next period's file **(key)**  
  _Rationale:_ Correct: a parameter lets the same query run each period without edits.
- B. Because parameters encrypt the data  
  _Rationale:_ Parameters do not encrypt data.
- C. Because it removes the need to validate inputs  
  _Rationale:_ Validation is still required regardless of parameters.
- D. Because it deletes old data automatically  
  _Rationale:_ Parameters do not delete data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
