# Dynamics 365 Supply Chain Management: Operational Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0718` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Dynamics 365 Supply Chain Management documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/dynamics365/supply-chain/supply-chain-management-welcome |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-D365-SCM |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Dynamics 365 Supply Chain Management: Operational Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage product information and inventory in Supply Chain Management
2. Run procurement and sourcing processes with purchasing policies
3. Operate warehouse inbound, outbound and transportation workflows
4. Describe production control and master/demand planning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Product information and inventory (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Release a product and set its inventory tracking dimensions; (2) Choose a costing method for a manufactured item
- Common misconception addressed: Confusing product master attributes with released-product company-specific settings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Products and the product lifecycle | 120 | 5 |
| M01L02 | Inventory management and costing | 120 | 5 |

### M02 Procurement and sourcing (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a purchase order and confirm a partial receipt; (2) Configure a purchase requisition approval workflow
- Common misconception addressed: Expecting a purchase invoice alone to handle partial receipts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Purchase orders and vendors | 120 | 5 |
| M02L02 | Purchasing policies and workflows | 120 | 5 |

### M03 Warehouse and transportation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Register an inbound shipment with a mobile-device flow; (2) Rate and route an outbound load
- Common misconception addressed: Treating warehouse-management-only mode as a full ERP migration
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Warehouse inbound and outbound processing | 120 | 5 |
| M03L02 | Transportation management | 120 | 5 |

### M04 Production and planning (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Release a production order from a bill of materials; (2) Run master planning to generate planned orders
- Common misconception addressed: Assuming master planning ignores the chosen inventory costing method
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Production orders and BOMs | 120 | 5 |
| M04L02 | Master and demand planning | 120 | 5 |

## Integrative case

A distributor configures products, a procurement approval workflow, warehouse inbound and outbound processing, and master planning to absorb a seasonal demand spike.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0718-final-protected | 30 | 40 | yes |
| MST-0718-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Product information and inventory | 8 |
| Procurement and sourcing | 8 |
| Warehouse and transportation | 7 |
| Production and planning | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0718-Q0001** (single-answer, Select ONE) Which module links Production control to the information needed to manufacture a finished item?

- A. Product information management, inventory and warehouse management working together **(key)**  
  _Rationale:_ Correct: production control integrates with product information, inventory, general ledger and warehouse modules.
- B. Only the general ledger  
  _Rationale:_ The general ledger records costs but does not supply BOM and inventory data alone.
- C. Transportation management only  
  _Rationale:_ Transportation handles freight, not the full production information flow.
- D. Microsoft Forms  
  _Rationale:_ Forms is a survey tool unrelated to production control.

**MST-0718-Q0002** (multiple-answer, Select TWO) Which TWO are part of the procurement and sourcing area in Supply Chain Management? (Select TWO.)

- A. Creating purchase orders for vendors **(key)**  
  _Rationale:_ Correct: purchase order creation is a core procurement task.
- B. Defining purchasing policies and workflows **(key)**  
  _Rationale:_ Correct: purchasing policies and approval workflows are configured in procurement and sourcing.
- C. Posting customer collection letters  
  _Rationale:_ Collection letters are an accounts-receivable activity.
- D. Designing a Power BI theme  
  _Rationale:_ Report theming is unrelated to procurement.

**MST-0718-Q0003** (single-answer, Select ONE) When must a purchase order be used instead of only a purchase invoice?

- A. When the process must record partial receipts of an order quantity **(key)**  
  _Rationale:_ Correct: purchase orders support partial receipts and drop shipments; a standalone invoice does not.
- B. When no inventory is involved at all  
  _Rationale:_ Service-only purchases can still use invoices without an order.
- C. Only when paying in a foreign currency  
  _Rationale:_ Currency does not determine whether an order is required.
- D. Only for intercompany sales  
  _Rationale:_ Partial-receipt handling, not intercompany scope, drives the need for an order.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
