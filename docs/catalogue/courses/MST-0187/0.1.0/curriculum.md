# Microsoft MB-800: Dynamics 365 Business Central Functional Consultant Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0187` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MB-800 |
| Version basis | Skills measured as of June 30, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-MB800 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/mb-800) |
| Legacy IDs | MST-MIC-MS-MB800-001 |
| Planned time | T = 1850 min; instruction I = 1480 min (80%); assessment A = 370 min (20%) |
| Assessment split | lesson checks 110 / module checks 140 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Set up Business Central' to the depth the official outline requires
2. Apply the objectives of 'Configure financials' to the depth the official outline requires
3. Apply the objectives of 'Configure sales and purchasing' to the depth the official outline requires
4. Apply the objectives of 'Perform Business Central operations' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Set up Business Central (20–25%)

- Worked applications: (1) Create a company with a configuration package; (2) Assign permissions with security groups and permission sets
- Common misconception addressed: Confusing a global dimension with a shortcut dimension
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Create and configure a company | 68 | 6 |
| M01L02 | Manage security | 68 | 6 |
| M01L03 | Set up core functionality | 68 | 6 |
| M01L04 | Set up dimensions | 68 | 6 |
| M01L05 | Manage approvals by using workflows | 68 | 6 |

### M02 Configure financials (30–35%)

- Worked applications: (1) Configure general and specific posting groups; (2) Set up a cash receipt journal and payment registration
- Common misconception addressed: Treating the general posting setup and inventory posting setup as one
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Set up financial management | 68 | 6 |
| M02L02 | Manage the chart of accounts | 67 | 6 |
| M02L03 | Set up posting groups | 67 | 6 |
| M02L04 | Set up journals and bank accounts | 67 | 6 |
| M02L05 | Set up accounts payables | 67 | 6 |
| M02L06 | Set up accounts receivables | 67 | 6 |
| M02L07 | Configure fixed assets | 67 | 6 |

### M03 Configure sales and purchasing (10–15%)

- Worked applications: (1) Configure item categories, variants, and locations; (2) Manage customer sales prices and line discounts
- Common misconception addressed: Assuming a stockkeeping unit and an item card are the same record
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Set up inventory | 67 | 6 |
| M03L02 | Configure master data for sales and purchasing | 67 | 6 |
| M03L03 | Manage pricing and discounts | 67 | 6 |

### M04 Perform Business Central operations (30–35%)

- Worked applications: (1) Create a purchase order and post a receipt then invoice; (2) Reconcile a bank account and post payments
- Common misconception addressed: Posting an invoice before posting the receipt it depends on
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Perform basic tasks in Business Central | 67 | 6 |
| M04L02 | Process purchases | 67 | 6 |
| M04L03 | Process sales | 67 | 6 |
| M04L04 | Process financial documents | 67 | 6 |
| M04L05 | Process journals and payments | 67 | 6 |
| M04L06 | Process fixed asset transactions | 67 | 6 |
| M04L07 | Process inventory transactions | 67 | 6 |

## Integrative case

A small business implements Dynamics 365 Business Central. Design the configuration: company and security setup with dimensions, financials with posting groups and fixed assets, sales/purchasing master data and pricing, and day-to-day operations (purchase/sales documents, journals, inventory); justify the setup to the implementation lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0187-practice-form-A | 45 | 45 | yes |
| MST-0187-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0187-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0187-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Set up Business Central | 10 |
| Configure financials | 15 |
| Configure sales and purchasing | 6 |
| Perform Business Central operations | 14 |

Minimum reviewed item bank: 724 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0187-Q0001** (single-answer, Select ONE) In Business Central, which object lets you load master and setup data in bulk when creating a new company?

- A. A configuration package **(key)**  
  _Rationale:_ Correct: configuration packages import setup and master data in bulk via Excel/RapidStart.
- B. A dimension value  
  _Rationale:_ Dimension values categorize entries; they do not import data in bulk.
- C. A permission set  
  _Rationale:_ Permission sets grant access rights, not data import.
- D. A number series  
  _Rationale:_ Number series assign document numbers; they do not load data.

**MST-0187-Q0002** (single-answer, Select ONE) Which setup tells Business Central which general ledger accounts to use when posting a sale between a customer group and an item group?

- A. The general posting setup **(key)**  
  _Rationale:_ Correct: the general posting setup maps business/product posting groups to G/L accounts.
- B. A number series  
  _Rationale:_ Number series assign document numbers, not G/L accounts.
- C. A dimension  
  _Rationale:_ Dimensions tag entries for analysis; they do not map posting accounts.
- D. A payment term  
  _Rationale:_ Payment terms set due dates, not posting accounts.

**MST-0187-Q0003** (multiple-answer, Select TWO) Which TWO steps are part of processing a purchase from a vendor in Business Central? (Select TWO.)

- A. Receive items against the purchase order **(key)**  
  _Rationale:_ Correct: receiving records the goods received for the order.
- B. Post a purchase invoice from the order **(key)**  
  _Rationale:_ Correct: posting the invoice records the vendor liability and cost.
- C. Publish a sensitivity label  
  _Rationale:_ Sensitivity labels are a Microsoft Purview feature, not a BC purchase step.
- D. Configure a Conditional Access policy  
  _Rationale:_ Conditional Access is an identity control, unrelated to purchasing.
- E. Run Planning Optimization  
  _Rationale:_ Planning Optimization is a Supply Chain Management (MB-330) feature, not BC purchasing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
