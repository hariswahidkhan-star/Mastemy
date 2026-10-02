# Dynamics 365 Finance: Business Processes and Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0717` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Dynamics 365 Finance documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/dynamics365/finance/budgeting/budgeting-overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-D365-FINANCE |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Dynamics 365 Finance: Business Processes and Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Dynamics 365 Finance general ledger, chart of accounts and financial dimensions
2. Process core accounts payable and accounts receivable transactions
3. Set up and monitor budgets and budget control
4. Describe period-end close, financial reporting and audit controls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 General ledger and financial dimensions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Design a chart of accounts with two financial dimensions; (2) Map an account structure for a two-department ledger
- Common misconception addressed: Treating a financial dimension as a separate ledger rather than an attribute of postings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Chart of accounts and main accounts | 120 | 5 |
| M01L02 | Financial dimensions and account structures | 120 | 5 |

### M02 Accounts payable and receivable (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Process a vendor invoice through to payment; (2) Generate a customer collection letter for overdue invoices
- Common misconception addressed: Assuming a posted invoice can be edited rather than reversed and reissued
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Vendor invoices and payments | 120 | 5 |
| M02L02 | Customer invoices and collections | 120 | 5 |

### M03 Budgeting and budget control (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a budget register entry and update budget balances; (2) Configure budget control to warn on a purchase-order overrun
- Common misconception addressed: Believing a completed budget register entry can be reopened and edited
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Basic budgeting and register entries | 120 | 5 |
| M03L02 | Budget control and encumbrance | 120 | 5 |

### M04 Period close, reporting and controls (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a month-end close checklist with period status gates; (2) Produce a budget-vs-actuals financial report
- Common misconception addressed: Thinking financial reporting reads live ledger rows without defined report rows
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Period-end close process | 120 | 5 |
| M04L02 | Financial reporting and audit trail | 120 | 5 |

## Integrative case

A mid-size firm configures its general ledger, financial dimensions, a departmental budget with budget control, and a month-end close checklist, then defends the control design to auditors.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0717-final-protected | 30 | 40 | yes |
| MST-0717-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| General ledger and financial dimensions | 8 |
| Accounts payable and receivable | 8 |
| Budgeting and budget control | 7 |
| Period close, reporting and controls | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0717-Q0001** (single-answer, Select ONE) In Dynamics 365 Finance, what is the role of a financial dimension?

- A. An attribute (such as department or cost centre) added to a posting for analysis and reporting **(key)**  
  _Rationale:_ Correct: financial dimensions tag postings so balances can be analysed by department, cost centre and similar attributes.
- B. A separate legal entity with its own ledger  
  _Rationale:_ A legal entity is a distinct company, not a financial dimension.
- C. A currency exchange rate type  
  _Rationale:_ Exchange rate types govern currency conversion, not dimensional analysis.
- D. A fixed asset depreciation method  
  _Rationale:_ Depreciation methods belong to fixed assets, not to the dimension framework.

**MST-0717-Q0002** (multiple-answer, Select TWO) Which TWO statements about a completed budget register entry are correct? (Select TWO.)

- A. Its status becomes Completed after budget balances are updated **(key)**  
  _Rationale:_ Correct: updating budget balances moves the entry to Completed.
- B. It cannot be reopened for edits; a new entry is created to adjust **(key)**  
  _Rationale:_ Correct: a completed entry is locked, so adjustments require a new register entry.
- C. It automatically posts actual ledger transactions  
  _Rationale:_ Budget entries record budget amounts, not actual ledger postings.
- D. It deletes the prior fiscal year's budget  
  _Rationale:_ Completing an entry does not delete other budgets.

**MST-0717-Q0003** (single-answer, Select ONE) A purchasing team wants transactions blocked only after a warning when they exceed budget. Which feature supports this?

- A. Budget control **(key)**  
  _Rationale:_ Correct: budget control issues warnings or errors on documents configured for it.
- B. Fixed asset budgeting  
  _Rationale:_ Fixed asset budgeting plans asset costs, not transaction-level budget checks.
- C. Collection letters  
  _Rationale:_ Collection letters chase overdue customer invoices.
- D. Account structures  
  _Rationale:_ Account structures validate account/dimension combinations, not budget funds availability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
