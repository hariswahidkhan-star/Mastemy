# Dynamics 365 Business Central: End-to-End Implementation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0719` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Dynamics 365 Business Central documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/dynamics365/business-central/welcome |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-D365-BC |
| Legacy IDs | none |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Dynamics 365 Business Central: End-to-End Implementation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a Business Central company, users and security
2. Configure financial management and the chart of accounts
3. Run sales and purchasing document processes
4. Manage inventory items and costing
5. Describe manufacturing, assembly and service processes
6. Build reporting, role centres and extend with integrations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Company setup and security (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Create a company with Assisted Setup and a configuration package; (2) Assign a permission set and a default dimension
- Common misconception addressed: Granting broad permissions instead of scoped permission sets
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Assisted setup and companies | 144 | 5 |
| M01L02 | Users, permissions and dimensions | 144 | 5 |

### M02 Financial management (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set up the chart of accounts and posting groups; (2) Perform a bank reconciliation against a statement
- Common misconception addressed: Posting directly to control accounts instead of through subledgers
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chart of accounts and the general ledger | 192 | 5 |
| M02L02 | Cash management and bank reconciliation | 192 | 5 |

### M03 Sales and purchasing (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Create a sales quote and convert it to an order; (2) Receive and invoice a purchase order
- Common misconception addressed: Assuming quotes post to the ledger before conversion to an order
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sales documents and customers | 144 | 5 |
| M03L02 | Purchase documents and vendors | 144 | 5 |

### M04 Inventory and items (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Register a new inventory item with a costing method; (2) Adjust inventory across two locations
- Common misconception addressed: Expecting costing method to be freely changed after transactions exist
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Items and inventory | 144 | 5 |
| M04L02 | Costing methods and locations | 144 | 5 |

### M05 Manufacturing and service (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Create a production BOM and routing for an end item; (2) Assemble a kit from components
- Common misconception addressed: Confusing assembly BOMs with production BOMs
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Production BOMs and routings | 192 | 5 |
| M05L02 | Service orders and assembly | 192 | 5 |

### M06 Reporting and extensions (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Configure a role centre with cues and a report layout; (2) Integrate with Dataverse or Microsoft Graph
- Common misconception addressed: Customising base objects directly instead of using extensions
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Role centres and analysis | 144 | 5 |
| M06L02 | Extensions and integration | 144 | 5 |

## Integrative case

An implementation team configures Business Central for a wholesaler end to end: company setup and security, finance, sales and purchasing, inventory, a management report, then defends go-live readiness.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0719-final-protected | 40 | 60 | yes |
| MST-0719-final-alternate | 40 | 60 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Company setup and security | 7 |
| Financial management | 7 |
| Sales and purchasing | 7 |
| Inventory and items | 7 |
| Manufacturing and service | 6 |
| Reporting and extensions | 6 |

Minimum reviewed item bank: 536 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0719-Q0001** (single-answer, Select ONE) In Business Central, what does Assisted Setup help you do?

- A. Guide configuration of scenarios and add features during implementation **(key)**  
  _Rationale:_ Correct: assisted setup guides configure scenarios such as company creation and feature enablement.
- B. Permanently lock the chart of accounts  
  _Rationale:_ Assisted setup configures; it does not lock the chart of accounts.
- C. Replace all extensions  
  _Rationale:_ Assisted setup does not manage or replace extensions.
- D. Delete posted entries  
  _Rationale:_ Posted entries cannot be deleted through assisted setup.

**MST-0719-Q0002** (multiple-answer, Select TWO) Which TWO documents are part of the Business Central sales process? (Select TWO.)

- A. Sales quote **(key)**  
  _Rationale:_ Correct: quotes are a standard sales document that can convert to an order.
- B. Sales order **(key)**  
  _Rationale:_ Correct: sales orders record and post sales, including drop shipments.
- C. Bank reconciliation  
  _Rationale:_ Bank reconciliation is a cash-management task, not a sales document.
- D. Production routing  
  _Rationale:_ Routings belong to manufacturing, not sales.

**MST-0719-Q0003** (single-answer, Select ONE) Why should business logic be added through extensions rather than changing base objects?

- A. Extensions keep customisations upgrade-safe and separate from the base application **(key)**  
  _Rationale:_ Correct: extensions isolate custom code so updates to Business Central do not overwrite it.
- B. Extensions run faster than all base code  
  _Rationale:_ Performance is not the reason; upgrade safety and isolation are.
- C. Base objects cannot be read by users  
  _Rationale:_ Base objects are readable; the issue is maintainability on upgrade.
- D. Extensions remove the need for permissions  
  _Rationale:_ Permissions still apply to extended functionality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
