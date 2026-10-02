# Xero Accounting Skills

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1721` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-FIN-SK-XAS-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Xero Accounting Skills (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Xero
2. Sales and invoicing
3. Purchases and bills
4. Bank reconciliation
5. Reports and review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses conceptual knowledge of Xero workflows through selection items; does not assess hands-on use of the live software or a real organisation's books.

## Modules

### M01 Getting started with Xero (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a business need to a Xero feature; (2) Decide where an account sits in the chart
- Common misconception addressed: Assuming Xero removes the need to understand double entry
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Xero does and the dashboard | 72 | 6 |
| M01L02 | Organisation setup and chart of accounts | 72 | 6 |

### M02 Sales and invoicing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose quote vs invoice for a stage of a deal; (2) Explain how a payment settles a receivable
- Common misconception addressed: Marking an invoice paid without recording the receipt
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sales invoices and quotes | 72 | 6 |
| M02L02 | Receiving payments and accounts receivable | 72 | 6 |

### M03 Purchases and bills (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose bill vs spend money for a purchase; (2) Trace how paying a bill clears payables
- Common misconception addressed: Recording a supplier payment with no matching bill
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Bills to pay and purchase orders | 72 | 6 |
| M03L02 | Paying suppliers and accounts payable | 72 | 6 |

### M04 Bank reconciliation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a bank-feed line to a transaction; (2) Explain what a bank rule automates
- Common misconception addressed: Reconciling by force without a genuine match
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bank feeds and reconciliation in Xero | 72 | 6 |
| M04L02 | Bank rules and matching | 72 | 6 |

### M05 Reports and review (MASTEMY-DESIGN 20%)

- Worked applications: (1) Select the report that answers an owner question; (2) Spot an error in an aged-receivables report
- Common misconception addressed: Relying on reports without checking source transactions
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reports: profit and loss, balance sheet, aged reports | 72 | 6 |
| M05L02 | Reviewing for accuracy | 72 | 6 |

## Integrative case

Run a month in Xero for a small retailer conceptually: set up its chart of accounts, raise sales invoices and enter supplier bills, reconcile the bank feed using a bank rule, and use the profit-and-loss and aged reports to brief the owner.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1721-final-protected | 25 | 25 | yes |
| MST-1721-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Xero | 5 |
| Sales and invoicing | 5 |
| Purchases and bills | 5 |
| Bank reconciliation | 5 |
| Reports and review | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1721-Q0001** (single-answer, Select ONE) In Xero, a 'bank rule' is mainly used to:

- A. Automatically code recurring bank-feed transactions during reconciliation **(key)**  
  _Rationale:_ Correct: bank rules speed coding of recurring items.
- B. Prevent anyone from viewing the bank account  
  _Rationale:_ Bank rules code transactions; they are not an access control.
- C. Generate the organisation's tax return  
  _Rationale:_ Bank rules do not produce tax returns.
- D. Delete the bank feed  
  _Rationale:_ Bank rules automate coding, not deletion of the feed.

**MST-1721-Q0002** (multiple-answer, Select ALL that apply) Which two reports would best tell an owner whether the business is profitable and who owes it money? (Select TWO) (Select TWO)

- A. Profit and loss report **(key)**  
  _Rationale:_ Correct: the P&L shows profitability.
- B. Aged receivables report **(key)**  
  _Rationale:_ Correct: aged receivables shows who owes money.
- C. Bank rule list  
  _Rationale:_ That is a settings list, not a financial report.
- D. The login history  
  _Rationale:_ Login history is unrelated to profitability.

**MST-1721-Q0003** (single-answer, Select ONE) Recording a supplier payment in Xero with no matching bill most likely results in:

- A. A payment that is not offset against the right payable **(key)**  
  _Rationale:_ Correct: without a matching bill the payable is not cleared correctly.
- B. The bill being created automatically and correctly  
  _Rationale:_ Xero does not invent the missing bill correctly on its own.
- C. No impact on the accounts  
  _Rationale:_ It misstates payables and cash.
- D. The bank reconciling itself  
  _Rationale:_ It does not auto-reconcile and creates a mismatch.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
