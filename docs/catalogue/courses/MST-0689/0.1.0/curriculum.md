# Azure Cost Management and FinOps

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0689` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-AZURE-COSTMGMT (https://learn.microsoft.com/azure/cost-management-billing/costs/overview-cost-management) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure Cost Management and FinOps (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Understand Azure billing and cost structure' to professional tasks
2. Apply the skills of 'Analyze costs with Cost analysis' to professional tasks
3. Apply the skills of 'Control spend with budgets and alerts' to professional tasks
4. Apply the skills of 'Apply the FinOps framework' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Understand Azure billing and cost structure (25%, design assumption)

- Worked applications: (1) Map a three-department org onto billing account, subscription and resource-group scopes; (2) Classify five line items as consumption, reservation or marketplace charges
- Common misconception addressed: Believing Cost Management and the Billing experience are the same tool
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Billing accounts, subscriptions and scopes | 60 | 6 |
| M01L02 | How Azure charges are processed | 60 | 6 |
| M01L03 | Cost Management vs Billing experiences | 60 | 6 |
| M01L04 | Reservations, savings plans and discounts | 60 | 6 |
### M02 Analyze costs with Cost analysis (25%, design assumption)

- Worked applications: (1) Build a Cost analysis view grouped by service and tag for one subscription; (2) Design a tag taxonomy so every cost record carries an owner
- Common misconception addressed: Assuming tags apply retroactively to cost records already emitted
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cost analysis views and pivots | 60 | 6 |
| M02L02 | Grouping costs with tags and tag inheritance | 60 | 6 |
| M02L03 | Allocating shared costs with allocation rules | 60 | 6 |
| M02L04 | Exporting cost data with scheduled exports | 60 | 6 |
### M03 Control spend with budgets and alerts (25%, design assumption)

- Worked applications: (1) Create a monthly budget with 90/100/110% alert thresholds for a resource group; (2) Set an anomaly alert and decide who should receive it
- Common misconception addressed: Thinking a budget automatically stops resources from running when exceeded
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Creating budgets at a scope | 60 | 6 |
| M03L02 | Actual vs forecast cost alerts | 60 | 6 |
| M03L03 | Anomaly detection alerts | 60 | 6 |
| M03L04 | Automated actions on budget alerts | 60 | 6 |
### M04 Apply the FinOps framework (25%, design assumption)

- Worked applications: (1) Turn three Advisor recommendations into an optimization backlog; (2) Draft a showback report that assigns cost to the teams that own it
- Common misconception addressed: Treating FinOps as a one-time cleanup rather than an ongoing practice
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | FinOps principles and phases | 60 | 6 |
| M04L02 | Advisor cost recommendations | 60 | 6 |
| M04L03 | Optimizing idle and underused resources | 60 | 6 |
| M04L04 | Chargeback, showback and accountability | 60 | 6 |

## Integrative case

A 200-person firm's Azure bill jumped 40% last quarter: set up scopes and tags, build a Cost analysis view, add budgets and anomaly alerts, and present a FinOps optimization plan with chargeback to the engineering leads.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0689-final-protected | 72 | 72 | yes |
| MST-0689-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Understand Azure billing and cost structure | 18 |
| Analyze costs with Cost analysis | 18 |
| Control spend with budgets and alerts | 18 |
| Apply the FinOps framework | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0689-Q0001** (single-answer, Select ONE) A finance team wants to be warned before projected monthly spend exceeds the limit, not only after. Which budget alert type should they configure?

- A. A forecast cost alert **(key)**  
  _Rationale:_ Correct: forecast alerts fire on projected spend, giving warning before the actual amount is reached.
- B. An actual cost alert only  
  _Rationale:_ Actual alerts fire only once spend has already crossed the threshold, giving no early warning.
- C. A resource lock  
  _Rationale:_ Resource locks prevent changes or deletion; they do not monitor spend.
- D. A reservation  
  _Rationale:_ Reservations pre-pay for capacity; they do not alert on budget thresholds.
**MST-0689-Q0002** (single-answer, Select ONE) A team enables tag inheritance in Cost Management today. What happens to cost records that were emitted last month without the tag?

- A. They are not retroactively changed **(key)**  
  _Rationale:_ Correct: tag inheritance applies going forward; historical cost records are not rewritten.
- B. They are automatically re-tagged back to resource creation  
  _Rationale:_ Inheritance does not rewrite previously emitted cost records.
- C. All historical invoices are reissued  
  _Rationale:_ Invoices are not reissued because a tag setting changed.
- D. The subscription is suspended  
  _Rationale:_ Enabling tag inheritance has no effect on subscription state.
**MST-0689-Q0003** (multiple-answer, Select TWO) Which TWO Microsoft Cost Management capabilities help an organization proactively monitor cloud spend? (Select TWO)

- A. Budgets with threshold alerts **(key)**  
  _Rationale:_ Correct: budgets with alerts notify stakeholders as spend approaches a limit.
- B. Anomaly detection in Cost analysis **(key)**  
  _Rationale:_ Correct: anomaly detection surfaces unexpected cost spikes for investigation.
- C. Deleting the billing account  
  _Rationale:_ Deleting the billing account removes access to data; it is not a monitoring control.
- D. Disabling Azure Advisor  
  _Rationale:_ Advisor provides cost recommendations; disabling it reduces visibility.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/azure/cost-management-billing/costs/overview-cost-management) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
