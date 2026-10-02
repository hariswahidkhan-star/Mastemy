# Azure Architecture: Compute, Storage, Networking, and Identity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0681` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure documentation read via the Microsoft Learn MCP on 2026-10-02 (regions, region pairs and availability zones; resource groups, subscriptions and management groups; compute types VM/containers/functions/App Service; storage services, tiers and redundancy; Microsoft Entra ID, RBAC and Conditional Access; the Well-Architected Framework pillars). Azure services and portal change continuously; confirm against current docs before production. |
| Official sources | https://learn.microsoft.com/azure/well-architected/; https://learn.microsoft.com/training/paths/azure-fundamentals-describe-azure-architecture-services/ |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZURE-ARCH |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 55 / module checks 80 / cumulative 165 min |
| Certificate | Mastemy Certificate of Completion — Azure Architecture: Compute, Storage, Networking, and Identity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Azure global infrastructure: regions, region pairs and availability zones
2. Organise resources with resource groups, subscriptions and management groups
3. Select compute and application-hosting options for a workload
4. Choose storage services, tiers and redundancy options
5. Apply Microsoft Entra identity, RBAC and Conditional Access

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Global infrastructure and resiliency (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a region pair and zone layout for a two-tier app; (2) Map a workload's resiliency needs to zones vs pairs
- Common misconception addressed: Confusing availability zones (within a region) with region pairs (across regions)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Regions, region pairs and sovereign regions | 110 | 5 |
| M01L02 | Availability zones and datacenters | 109 | 5 |

### M02 Resource organisation and governance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a management-group and subscription hierarchy; (2) Place RBAC and policy at the right scope
- Common misconception addressed: Treating a resource group as a security or billing boundary like a subscription
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Resource groups and subscriptions | 109 | 5 |
| M02L02 | Management groups and hierarchy | 109 | 5 |

### M03 Compute and application hosting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Pick compute for four scenarios (VM, containers, Functions, App Service); (2) Justify a serverless choice for an event-driven workload
- Common misconception addressed: Defaulting to VMs when a managed PaaS or serverless option fits better
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VMs, scale sets and containers | 109 | 5 |
| M03L02 | App Service, Functions and hosting choices | 109 | 5 |

### M04 Storage services and data redundancy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Select storage tiers for hot and archival data; (2) Choose a redundancy option for a compliance scenario
- Common misconception addressed: Choosing geo-redundancy everywhere without cost or latency trade-offs
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Storage services and account types | 109 | 5 |
| M04L02 | Tiers and redundancy options | 109 | 5 |

### M05 Identity, access and security (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design RBAC role assignments at subscription and resource-group scope; (2) Add a Conditional Access policy for a sensitive app
- Common misconception addressed: Granting broad standing access instead of least-privilege RBAC with Conditional Access
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Microsoft Entra ID and authentication | 109 | 5 |
| M05L02 | Azure RBAC | 109 | 5 |
| M05L03 | Conditional Access and Zero Trust | 109 | 5 |

## Integrative case

An architect designs the Azure landing zone for a new product: choose a region pair and zone strategy, lay out a management-group and subscription hierarchy, select compute and storage for a two-tier app, and define RBAC and Conditional Access, defending the design against the Well-Architected pillars.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0681-final-protected | 30 | 40 | yes |
| MST-0681-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Global infrastructure and resiliency | 6 |
| Resource organisation and governance | 6 |
| Compute and application hosting | 6 |
| Storage services and data redundancy | 6 |
| Identity, access and security | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0681-Q0001** (single-answer, Select ONE) Which Azure construct lets you apply Azure Policy and RBAC across several subscriptions at once?

- A. Management group **(key)**  
  _Rationale:_ Correct: management groups sit above subscriptions and pass policy and access down.
- B. Resource group  
  _Rationale:_ A resource group lives inside a single subscription.
- C. Availability zone  
  _Rationale:_ Availability zones are datacenter groupings for resiliency, not governance scope.
- D. Storage account  
  _Rationale:_ A storage account holds data; it is not a governance scope.

**MST-0681-Q0002** (multiple-answer, Select TWO) Which TWO statements about Azure resiliency are correct? (Select TWO.)

- A. Availability zones are physically separate locations within one Azure region **(key)**  
  _Rationale:_ Correct: zones are separate locations inside a region.
- B. Region pairs replicate across two regions for disaster recovery **(key)**  
  _Rationale:_ Correct: region pairs provide cross-region resilience.
- C. Availability zones protect against a whole-region outage  
  _Rationale:_ Zones are within a region; a region pair addresses regional loss.
- D. Region pairs exist within a single datacenter  
  _Rationale:_ Region pairs span two regions, not one datacenter.

**MST-0681-Q0003** (single-answer, Select ONE) An event-driven task runs briefly and sporadically, and the team wants no servers to manage. Best compute choice?

- A. Azure Functions (serverless) **(key)**  
  _Rationale:_ Correct: Functions suit short, event-driven, serverless workloads.
- B. A dedicated virtual machine running 24/7  
  _Rationale:_ An always-on VM wastes cost for sporadic work.
- C. A virtual machine scale set  
  _Rationale:_ Scale sets manage many VMs; overkill for sporadic events.
- D. An on-premises server  
  _Rationale:_ This defeats the goal of no servers to manage.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
