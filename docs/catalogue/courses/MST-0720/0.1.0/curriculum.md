# Dynamics 365 Customer-Service and Sales Process Integration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0720` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Dynamics 365 Sales and Customer Service documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/dynamics365/sales/overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-D365-CE |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Dynamics 365 Customer-Service and Sales Process Integration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage leads and opportunities through the sales pipeline
2. Configure the product catalog and process quotes and orders
3. Run case intake, routing and service-level agreements
4. Use dashboards, insights and AI agents for sales and service

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Lead and opportunity management (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Qualify a lead and convert it to an opportunity; (2) Manage an opportunity through pipeline stages
- Common misconception addressed: Treating every inbound contact as a qualified opportunity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Leads and qualification | 120 | 5 |
| M01L02 | Opportunities and pipeline | 120 | 5 |

### M02 Sales process and product catalog (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Define a product family and a price list; (2) Convert a won opportunity into a quote and order
- Common misconception addressed: Building quotes without a maintained product catalog
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Product catalog and price lists | 120 | 5 |
| M02L02 | Quotes, orders and forecasts | 120 | 5 |

### M03 Case management (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a case and route it to a queue; (2) Attach an SLA and resolve a case
- Common misconception addressed: Logging cases without routing rules so cases stall unassigned
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Case intake and routing | 120 | 5 |
| M03L02 | Working cases and SLAs | 120 | 5 |

### M04 Analytics and AI assistance (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a pipeline dashboard; (2) Review research from the Sales Opportunity Agent
- Common misconception addressed: Assuming AI agents replace rather than assist seller judgement
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Dashboards and case insights | 120 | 5 |
| M04L02 | AI agents overview | 120 | 5 |

## Integrative case

A B2B vendor configures a lead-to-order flow in Dynamics 365 Sales plus case management with an SLA and a case-insights dashboard in Customer Service.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0720-final-protected | 30 | 40 | yes |
| MST-0720-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Lead and opportunity management | 8 |
| Sales process and product catalog | 8 |
| Case management | 7 |
| Analytics and AI assistance | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0720-Q0001** (single-answer, Select ONE) In Dynamics 365 Sales, when is a lead typically converted to an opportunity?

- A. When it is qualified as sales-ready based on fit, interest and timing **(key)**  
  _Rationale:_ Correct: qualified leads convert to opportunities for pipeline nurturing.
- B. Immediately when any contact is created  
  _Rationale:_ Not every contact is sales-ready; qualification comes first.
- C. Only after an invoice is paid  
  _Rationale:_ Conversion happens before an order or invoice, not after payment.
- D. Only by the finance team  
  _Rationale:_ Sales reps qualify and convert leads.

**MST-0720-Q0002** (multiple-answer, Select TWO) Which TWO are activities in the case-to-resolution process in Customer Service? (Select TWO.)

- A. Intake of cases via email or web form **(key)**  
  _Rationale:_ Correct: logging cases, including automated creation, is case intake.
- B. Routing cases to the right team or queue **(key)**  
  _Rationale:_ Correct: reassigning and routing cases is part of managing and working cases.
- C. Running Azure master planning  
  _Rationale:_ Master planning is a Supply Chain Management function.
- D. Authoring a Bicep template  
  _Rationale:_ Bicep is an Azure IaC tool, unrelated to case management.

**MST-0720-Q0003** (single-answer, Select ONE) What is the purpose of predictive opportunity scoring?

- A. To prioritise opportunities by their likelihood of closing **(key)**  
  _Rationale:_ Correct: scoring ranks opportunities so sellers focus on higher-potential deals.
- B. To delete lost opportunities automatically  
  _Rationale:_ Scoring prioritises; it does not delete records.
- C. To set storage redundancy  
  _Rationale:_ Redundancy is an Azure Storage concept, not sales scoring.
- D. To reconcile bank statements  
  _Rationale:_ Bank reconciliation is unrelated to opportunity scoring.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
