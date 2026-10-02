# Excel for Accountants

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1728` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-FIN-SK-EA-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Excel for Accountants (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Excel foundations for accountants
2. Core accounting formulas
3. Lookups and linking schedules
4. Reconciliations and controls
5. PivotTables for financial reporting
6. Budgets, variance and presentation
7. Integrity, protection and audit trail

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Excel foundations for accountants (MASTEMY-DESIGN 15%)

- Worked applications: (1) Lay out a schedule with clear inputs, calculations and outputs; (2) Apply accounting number formats and negative-in-parentheses
- Common misconception addressed: Mixing inputs and formulas in the same cells
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Workbook structure, cell references and good model layout | 52 | 6 |
| M01L02 | Formatting numbers, dates and accounting conventions | 52 | 6 |

### M02 Core accounting formulas (MASTEMY-DESIGN 15%)

- Worked applications: (1) Total expenses by account with SUMIFS across a ledger; (2) Use ROUND so a schedule foots to the penny
- Common misconception addressed: Letting floating-point rounding make a total appear not to tie
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SUM, SUMIFS, ROUND and absolute references | 52 | 6 |
| M02L02 | IF, IFERROR and logical checks | 52 | 6 |

### M03 Lookups and linking schedules (MASTEMY-DESIGN 15%)

- Worked applications: (1) Map a trial balance to financial-statement lines with XLOOKUP; (2) Build a map that flags any account with no mapping
- Common misconception addressed: Hard-coding account rows so a new account is silently dropped
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | XLOOKUP and INDEX/MATCH for account mapping | 52 | 6 |
| M03L02 | Linking workbooks and schedules safely | 52 | 6 |

### M04 Reconciliations and controls (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a bank reconciliation that flags unmatched transactions; (2) Add a check cell that turns red when a statement does not tie
- Common misconception addressed: Trusting a reconciliation with no independent check total
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building reconciliations and matching logic | 51 | 6 |
| M04L02 | Tie-out checks and error flags | 51 | 6 |

### M05 PivotTables for financial reporting (MASTEMY-DESIGN 15%)

- Worked applications: (1) Pivot a general ledger by account and period; (2) Drill into an unexpected balance to find the posting
- Common misconception addressed: Reading a Pivot total without checking the source filter
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | PivotTables for trial-balance and ledger analysis | 51 | 6 |
| M05L02 | Grouping, filtering and drill-down | 51 | 6 |

### M06 Budgets, variance and presentation (MASTEMY-DESIGN 14%)

- Worked applications: (1) Build an actual-vs-budget variance with percentage and flags; (2) Highlight material variances with conditional formatting
- Common misconception addressed: Showing every variance with equal emphasis regardless of size
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Variance analysis and conditional formatting | 51 | 6 |
| M06L02 | Building a readable management report | 51 | 6 |

### M07 Integrity, protection and audit trail (MASTEMY-DESIGN 10%)

- Worked applications: (1) Lock formula cells and open only the input cells; (2) Use data validation to stop invalid account codes
- Common misconception addressed: Leaving a model unprotected so a formula is overwritten unnoticed
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Protecting models, data validation and documentation | 51 | 6 |
| M07L02 | Versioning and auditing formulas | 51 | 6 |

## Integrative case

Prepare a small company's month-end in Excel: import the trial balance, build a reconciliation that flags unmatched items, construct a three-statement summary with checks that must tie, and produce a variance-to-budget report the owner can read at a glance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1728-final-protected | 24 | 24 | yes |
| MST-1728-final-alternate | 24 | 24 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Excel foundations for accountants | 4 |
| Core accounting formulas | 4 |
| Lookups and linking schedules | 4 |
| Reconciliations and controls | 3 |
| PivotTables for financial reporting | 3 |
| Budgets, variance and presentation | 3 |
| Integrity, protection and audit trail | 3 |

Minimum reviewed item bank: 342 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1728-Q0001** (single-answer, Select ONE) A month-end schedule must foot exactly to the penny, but the total shows a 0.01 difference. What is the most appropriate fix?

- A. Apply ROUND to the calculated values at the defined precision so displayed and underlying figures agree **(key)**  
  _Rationale:_ Correct: rounding the underlying values removes sub-cent floating-point residue so the schedule ties.
- B. Manually type the correct total over the formula  
  _Rationale:_ Overtyping the formula breaks the audit trail and will silently go wrong next period.
- C. Widen the column so more decimals show  
  _Rationale:_ Showing more decimals reveals the difference but does not make the schedule foot.
- D. Delete the rows that cause the mismatch  
  _Rationale:_ Removing data to force a tie misstates the figures.

**MST-1728-Q0002** (multiple-answer, Select ALL that apply) Which practices strengthen the integrity of an accounting workbook? (Select TWO)

- A. Separate input cells from formula cells and protect the formulas **(key)**  
  _Rationale:_ Correct: isolating and locking formulas prevents accidental overwrites while leaving inputs editable.
- B. Add independent check cells that flag when a statement does not tie **(key)**  
  _Rationale:_ Correct: built-in checks catch errors before the report is relied upon.
- C. Hard-code totals once they look right to speed up refresh  
  _Rationale:_ Hard-coded totals stop updating and hide later errors.
- D. Keep all versions in one file by overwriting it each month  
  _Rationale:_ Overwriting destroys the audit trail and the ability to compare periods.

**MST-1728-Q0003** (single-answer, Select ONE) Why map each trial-balance account to a financial-statement line with a lookup that flags unmapped accounts?

- A. New or renamed accounts are caught instead of being silently omitted from the statements **(key)**  
  _Rationale:_ Correct: a flag on unmapped accounts surfaces gaps so nothing drops out of the report unnoticed.
- B. It makes the workbook calculate faster  
  _Rationale:_ Speed is not the reason; completeness and control are.
- C. It removes the need to reconcile at all  
  _Rationale:_ Mapping supports reporting but does not replace reconciliation.
- D. It converts the accounts to cash basis automatically  
  _Rationale:_ Mapping assigns lines; it does not change the accounting basis.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
