# Microsoft AZ-104: Azure Administrator Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0162` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AZ-104 |
| Version basis | Skills measured as of 2026-04-17 |
| Evidence | **verified-official-source** - sources: SRC-MS-AZ104 |
| Legacy IDs | MST-MIC-MS-AZ104-001 |
| Planned time | T = 3000 min; instruction I = 2400 min (80%); assessment A = 600 min (20%) |
| Assessment split | lesson checks 150 / module checks 210 / cumulative 240 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage Entra users/groups, RBAC and subscription governance
2. Configure and secure storage accounts, Azure Files and Blob Storage
3. Deploy compute using ARM/Bicep, VMs, containers and App Service
4. Implement and secure virtual networking, DNS and load balancing
5. Monitor resources and implement backup and site recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Manage Azure identities and governance (20-25%)

- Worked applications: (1) Scope RBAC assignments for a helpdesk team with least privilege; (2) Enforce tagging and allowed regions with Azure Policy
- Common misconception addressed: Assigning Owner when Contributor or a custom role suffices
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Manage Microsoft Entra users and groups | 194 | 10 |
| M01L02 | Manage access to Azure resources | 194 | 10 |
| M01L03 | Manage Azure subscriptions and governance | 196 | 10 |

### M02 Implement and manage storage (15-20%)

- Worked applications: (1) Choose redundancy and access tiers for archival invoices; (2) Secure a storage account with SAS, keys and private endpoints
- Common misconception addressed: Thinking a SAS token can be revoked without a stored access policy or key rotation
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Configure access to storage | 151 | 10 |
| M02L02 | Configure and manage storage accounts | 151 | 10 |
| M02L03 | Configure Azure Files and Azure Blob Storage | 152 | 10 |

### M03 Deploy and manage Azure compute resources (20-25%)

- Worked applications: (1) Deploy a VM set from a Bicep template with parameters; (2) Scale an App Service plan and configure deployment slots
- Common misconception addressed: Believing availability sets protect against a zone outage
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Automate deployment of resources by using ARM templates or Bicep files | 146 | 10 |
| M03L02 | Create and configure virtual machines | 146 | 10 |
| M03L03 | Provision and manage containers in the Azure portal | 146 | 10 |
| M03L04 | Create and configure Azure App Service | 146 | 10 |

### M04 Implement and manage virtual networking (15-20%)

- Worked applications: (1) Peer two VNets and fix a routing problem with UDRs; (2) Configure a load balancer vs Application Gateway for a web tier
- Common misconception addressed: Expecting VNet peering to be transitive
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Configure and manage virtual networks in Azure | 151 | 10 |
| M04L02 | Configure secure access to virtual networks | 151 | 10 |
| M04L03 | Configure name resolution and load balancing | 152 | 10 |

### M05 Monitor and maintain Azure resources (10-15%)

- Worked applications: (1) Build an alert rule and action group from a Log Analytics query; (2) Restore a VM from Azure Backup and verify integrity
- Common misconception addressed: Assuming backups are tested just because jobs succeed
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Monitor resources in Azure | 162 | 10 |
| M05L02 | Implement backup and recovery | 162 | 10 |

## Integrative case

Operate an Azure estate for a 300-user company: delegate RBAC, secure storage, deploy VMs with Bicep, connect two VNets, and set up monitoring and backup with documented recovery tests.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide; the real exam includes non-MCQ item types, which Mastemy turns into MCQ/MR only.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0162-practice-form-A | 50 | 100 | yes |
| MST-0162-practice-form-B | 50 | 100 | no (optional practice) |
| MST-0162-practice-form-C | 50 | 100 | no (optional practice) |
| MST-0162-final-protected | 50 | 100 | yes |

| Domain | Items per form |
|---|---|
| Manage Azure identities and governance | 12 |
| Implement and manage storage | 10 |
| Deploy and manage Azure compute resources | 12 |
| Implement and manage virtual networking | 9 |
| Monitor and maintain Azure resources | 7 |

Minimum reviewed item bank: 920 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0162-Q0001** (single-answer, Select ONE) You must give a user permission to manage VMs in one resource group only, not anywhere else in the subscription. What should you do?

- A. Assign Virtual Machine Contributor at the resource group scope **(key)**  
  _Rationale:_ Correct: an RBAC role assigned at resource-group scope applies only to resources in that group.
- B. Assign Virtual Machine Contributor at the subscription scope  
  _Rationale:_ Subscription scope would cover every resource group, which gives too much access.
- C. Assign Owner at the resource group scope  
  _Rationale:_ Owner also lets the user manage access. That breaks least privilege.
- D. Create an Azure Policy assignment  
  _Rationale:_ Policy controls resource configuration. It does not grant user permissions.

**MST-0162-Q0002** (single-answer, Select ONE) Blobs not accessed for 90 days must move to the cool tier automatically. What do you configure?

- A. Object replication  
  _Rationale:_ Object replication copies blobs between accounts. It does not change their tier.
- B. Blob lifecycle management policy **(key)**  
  _Rationale:_ Correct: lifecycle management rules move blobs between tiers based on age or last access.
- C. Soft delete for blobs  
  _Rationale:_ Soft delete keeps deleted data. It does not move data between tiers.
- D. Stored access policy  
  _Rationale:_ Stored access policies control SAS permissions.

**MST-0162-Q0003** (single-answer, Select ONE) Which feature lets VMs in two virtual networks talk to each other over the Microsoft backbone without a gateway?

- A. Virtual network peering **(key)**  
  _Rationale:_ Correct: peering connects VNets with low-latency private connectivity and no VPN gateway.
- B. Service endpoint  
  _Rationale:_ Service endpoints secure access from a VNet to PaaS services.
- C. User-defined route  
  _Rationale:_ UDRs override routing but do not join separate VNets on their own.
- D. Azure Bastion  
  _Rationale:_ Bastion gives browser-based RDP/SSH access to VMs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
