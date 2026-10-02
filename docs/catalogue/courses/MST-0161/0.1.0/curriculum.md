# Microsoft AZ-900: Azure Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0161` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AZ-900 |
| Version basis | Skills measured as of 2026-07-20 |
| Evidence | **verified-official-source** - sources: SRC-MS-AZ900 |
| Legacy IDs | MST-MIC-MS-AZ900-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain cloud computing models, service types and the shared responsibility model
2. Identify core Azure architectural components and services for compute, networking and storage
3. Describe Azure identity, access and security capabilities
4. Describe Azure cost management, governance, deployment and monitoring tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Describe cloud concepts (25-30%)

- Worked applications: (1) Classify five workloads as IaaS, PaaS or SaaS and assign shared-responsibility duties; (2) CapEx vs OpEx comparison for a three-year server refresh vs consumption pricing
- Common misconception addressed: Believing the provider is responsible for customer data security in SaaS
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe cloud computing | 112 | 6 |
| M01L02 | Describe the benefits of using cloud services | 112 | 6 |
| M01L03 | Describe cloud service types | 114 | 6 |

### M02 Describe Azure architecture and services (35-40%)

- Worked applications: (1) Design a region/availability-zone layout for a two-tier app; (2) Pick compute (VM, App Service, Functions, containers) for four scenarios
- Common misconception addressed: Treating a resource group as a security or billing boundary like a subscription
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describe the core architectural components of Azure | 115 | 6 |
| M02L02 | Describe Azure compute and networking services | 115 | 6 |
| M02L03 | Describe Azure storage services | 115 | 6 |
| M02L04 | Describe Azure identity, access, and security | 117 | 6 |

### M03 Describe Azure management and governance (30-35%)

- Worked applications: (1) Build a management-group/policy hierarchy for three departments; (2) Use the pricing calculator and budgets to catch a cost overrun
- Common misconception addressed: Assuming resource locks stop all changes including data-plane operations
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Describe cost management in Azure | 100 | 6 |
| M03L02 | Describe features and tools in Azure for governance and compliance | 100 | 6 |
| M03L03 | Describe features and tools for managing and deploying Azure resources | 100 | 6 |
| M03L04 | Describe monitoring tools in Azure | 100 | 6 |

## Integrative case

A 60-person accounting firm moves its file server and line-of-business app to Azure: choose service models, a region pair, identity and governance controls, and a cost guardrail, then defend the plan to the partners.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide fetched does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0161-practice-form-A | 45 | 45 | yes |
| MST-0161-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0161-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0161-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Describe cloud concepts | 13 |
| Describe Azure architecture and services | 17 |
| Describe Azure management and governance | 15 |

Minimum reviewed item bank: 522 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0161-Q0001** (single-answer, Select ONE) A company wants to pay only for compute it actually uses and avoid buying servers up front. Which cloud benefit does this describe?

- A. Consumption-based (pay-as-you-go) pricing **(key)**  
  _Rationale:_ Correct: the consumption-based model charges for resources used and moves spend from CapEx to OpEx.
- B. High availability  
  _Rationale:_ Availability is about uptime, not how resources are paid for.
- C. Data sovereignty  
  _Rationale:_ Sovereignty concerns where data is stored and which laws apply, not billing.
- D. Vertical scaling  
  _Rationale:_ Vertical scaling changes resource size; it says nothing about payment model.

**MST-0161-Q0002** (single-answer, Select ONE) Which Azure construct lets you apply Azure Policy and RBAC across several subscriptions at once?

- A. Resource group  
  _Rationale:_ A resource group lives inside one subscription, so it cannot span several.
- B. Management group **(key)**  
  _Rationale:_ Correct: management groups sit above subscriptions and pass on policy and access to every subscription under them.
- C. Availability zone  
  _Rationale:_ Availability zones are physical datacenter groupings for resiliency, not a governance scope.
- D. Resource lock  
  _Rationale:_ Locks stop resources being deleted or changed. They do not group subscriptions.

**MST-0161-Q0003** (single-answer, Select ONE) In the shared responsibility model, which responsibility always stays with the customer, whatever the service type (IaaS, PaaS or SaaS)?

- A. Physical datacenter security  
  _Rationale:_ Physical security is always the cloud provider's responsibility.
- B. Operating system patching  
  _Rationale:_ OS patching is the customer's job in IaaS but the provider's in PaaS and SaaS.
- C. Information and data, including accounts and identities **(key)**  
  _Rationale:_ Correct: customers always own their data, devices, accounts and identities.
- D. Network controls for the host  
  _Rationale:_ Host network controls move to the provider in PaaS and SaaS.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
