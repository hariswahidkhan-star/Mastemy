# Microsoft MB-310: Dynamics 365 Finance Functional Consultant Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0185` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MB-310 |
| Version basis | Skills measured as of August 14, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-MB310 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/mb-310) |
| Legacy IDs | MST-MIC-MS-MB310-001 |
| Planned time | T = 1875 min; instruction I = 1500 min (80%); assessment A = 375 min (20%) |
| Assessment split | lesson checks 80 / module checks 175 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Implement financial management' to the depth the official outline requires
2. Apply the objectives of 'Implement accounts receivable, credit, collections, and subscription billing' to the depth the official outline requires
3. Apply the objectives of 'Implement and manage accounts payable and expenses' to the depth the official outline requires
4. Apply the objectives of 'Manage budgeting' to the depth the official outline requires
5. Apply the objectives of 'Manage fixed assets' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Implement financial management (35–40%)

- Worked applications: (1) Design an account structure with financial dimensions; (2) Configure intercompany accounting for journals
- Common misconception addressed: Confusing a main account with a financial dimension
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Design and configure the chart of accounts and financial dimensions | 94 | 6 |
| M01L02 | Configure ledgers and currencies | 94 | 6 |
| M01L03 | Implement and manage journals | 94 | 6 |
| M01L04 | Implement and manage cash and bank | 94 | 6 |
| M01L05 | Perform periodic processes | 94 | 6 |
| M01L06 | Configure, collect, and report taxes | 94 | 6 |

### M02 Implement accounts receivable, credit, collections, and subscription billing (15–20%)

- Worked applications: (1) Configure a customer posting profile and process payments; (2) Set up collection letters and aging definitions
- Common misconception addressed: Treating a free text invoice and a sales order invoice as the same posting
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Implement and manage accounts receivable | 94 | 6 |
| M02L02 | Manage credit and collections | 94 | 6 |
| M02L03 | Configure and manage subscription billing | 94 | 6 |

### M03 Implement and manage accounts payable and expenses (10–15%)

- Worked applications: (1) Configure invoice matching for a vendor invoice; (2) Set up expense management categories and policies
- Common misconception addressed: Assuming all vendor invoices require an associated purchase order
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Implement and manage accounts payable | 94 | 6 |
| M03L02 | Configure expense management | 94 | 6 |

### M04 Manage budgeting (10–15%)

- Worked applications: (1) Create a budget register entry and compare to actuals; (2) Configure budget control with fund availability rules
- Common misconception addressed: Confusing budget control with budget planning
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Implement basic budgeting | 94 | 6 |
| M04L02 | Configure and manage budget controls | 93 | 6 |
| M04L03 | Configure and manage budget planning | 93 | 6 |

### M05 Manage fixed assets (10–15%)

- Worked applications: (1) Configure a depreciation profile and fixed asset book; (2) Process a fixed asset acquisition via purchase order
- Common misconception addressed: Expecting a derived book to post identically to the primary book
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Implement and manage fixed assets | 93 | 6 |
| M05L02 | Process fixed asset transactions | 93 | 6 |

## Integrative case

A manufacturer implements Dynamics 365 Finance. Design the configuration: chart of accounts with financial dimensions, ledgers/currencies and tax, accounts receivable/payable with subscription billing, budgeting and controls, and fixed assets; justify the posting setup to the finance lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0185-practice-form-A | 45 | 45 | yes |
| MST-0185-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0185-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0185-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Implement financial management | 18 |
| Implement accounts receivable, credit, collections, and subscription billing | 9 |
| Implement and manage accounts payable and expenses | 6 |
| Manage budgeting | 6 |
| Manage fixed assets | 6 |

Minimum reviewed item bank: 722 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0185-Q0001** (single-answer, Select ONE) In Dynamics 365 Finance, which element records the natural account (for example, 'Sales revenue') as opposed to an analysis segment like Department?

- A. A main account **(key)**  
  _Rationale:_ Correct: the main account is the natural account; financial dimensions capture segments like Department.
- B. A financial dimension  
  _Rationale:_ Financial dimensions capture analysis segments, not the natural account.
- C. A posting layer  
  _Rationale:_ Posting layers separate current/operations/tax entries, not the natural account.
- D. A ledger allocation rule  
  _Rationale:_ Allocation rules distribute amounts; they are not the account itself.

**MST-0185-Q0002** (single-answer, Select ONE) A customer invoice not tied to any sales order or item must be raised for a one-off consulting fee. Which document do you use?

- A. A free text invoice **(key)**  
  _Rationale:_ Correct: free text invoices bill amounts not linked to items or sales orders.
- B. A sales order invoice  
  _Rationale:_ A sales order invoice requires an underlying sales order with items.
- C. A vendor invoice  
  _Rationale:_ Vendor invoices record amounts owed to suppliers, not customer billing.
- D. A purchase order  
  _Rationale:_ A purchase order is a procurement document, not a customer invoice.

**MST-0185-Q0003** (multiple-answer, Select TWO) Which TWO are required to depreciate a fixed asset correctly in Dynamics 365 Finance? (Select TWO.)

- A. A fixed asset book **(key)**  
  _Rationale:_ Correct: the asset book links the asset to valuation and depreciation settings.
- B. A depreciation profile **(key)**  
  _Rationale:_ Correct: the depreciation profile defines the method and rate.
- C. A collection letter sequence  
  _Rationale:_ Collection letters belong to receivables, not asset depreciation.
- D. A sales tax authority  
  _Rationale:_ Tax authorities handle tax settlement, not depreciation.
- E. A budget planning scenario  
  _Rationale:_ Budget planning scenarios are for budgeting, not depreciation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
