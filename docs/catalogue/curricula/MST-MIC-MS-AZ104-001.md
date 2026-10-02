# Microsoft Azure Administrator (AZ-104) Exam Prep

> **Curriculum blueprint / specification - not finished lesson content or videos.** Course `MST-MIC-MS-AZ104-001` | Batch 1 | content_version 0.1.0 | approval_status: draft

| Field | Value |
|---|---|
| Official exam code | AZ-104 |
| Awarding body | Microsoft (no affiliation or endorsement) |
| Syllabus version used | Skills measured as of 2026-04-17 |
| Evidence status | **VERIFIED against the official study guide** |
| Source | SRC-MS-AZ104 - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104 (accessed 2026-10-02, method: official-fetch) |
| Estimated learner hours | 50 |
| Assessment hours (20%) | 10.0 h (600 min) |
| Question formats | MCQ and multiple-response only |

## Learning outcomes

1. Manage Entra users/groups, RBAC and subscription governance
2. Configure and secure storage accounts, Azure Files and Blob Storage
3. Deploy compute using ARM/Bicep, VMs, containers and App Service
4. Implement and secure virtual networking, DNS and load balancing
5. Monitor resources and implement backup and site recovery

## Modules and lessons

Instructional time: 2400 min across 15 lessons (~160 min each: ~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.

### Module 1: Manage Azure identities and governance (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M1.L1 | Manage Microsoft Entra users and groups | 160 | 15 |
| M1.L2 | Manage access to Azure resources | 160 | 15 |
| M1.L3 | Manage Azure subscriptions and governance | 160 | 15 |
| M1.T | Module 1 test | 15 | 15 |

### Module 2: Implement and manage storage (15-20%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M2.L1 | Configure access to storage | 160 | 15 |
| M2.L2 | Configure and manage storage accounts | 160 | 15 |
| M2.L3 | Configure Azure Files and Azure Blob Storage | 160 | 15 |
| M2.T | Module 2 test | 15 | 15 |

### Module 3: Deploy and manage Azure compute resources (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M3.L1 | Automate deployment of resources by using ARM templates or Bicep files | 160 | 15 |
| M3.L2 | Create and configure virtual machines | 160 | 15 |
| M3.L3 | Provision and manage containers in the Azure portal | 160 | 15 |
| M3.L4 | Create and configure Azure App Service | 160 | 15 |
| M3.T | Module 3 test | 15 | 15 |

### Module 4: Implement and manage virtual networking (15-20%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M4.L1 | Configure and manage virtual networks in Azure | 160 | 15 |
| M4.L2 | Configure secure access to virtual networks | 160 | 15 |
| M4.L3 | Configure name resolution and load balancing | 160 | 15 |
| M4.T | Module 4 test | 15 | 15 |

### Module 5: Monitor and maintain Azure resources (10-15%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M5.L1 | Monitor resources in Azure | 160 | 15 |
| M5.L2 | Implement backup and recovery | 160 | 15 |
| M5.T | Module 5 test | 15 | 15 |

## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104 (accessed 2026-10-02).

| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |
|---|---|---|---|---|---|
| Manage Azure identities and governance | 20-25% | M1 | M1.L1, M1.L2, M1.L3 | 109 | 13 |
| Implement and manage storage | 15-20% | M2 | M2.L1, M2.L2, M2.L3 | 85 | 9 |
| Deploy and manage Azure compute resources | 20-25% | M3 | M3.L1, M3.L2, M3.L3, M3.L4 | 109 | 12 |
| Implement and manage virtual networking | 15-20% | M4 | M4.L1, M4.L2, M4.L3 | 85 | 9 |
| Monitor and maintain Azure resources | 10-15% | M5 | M5.L1, M5.L2 | 61 | 7 |

Mock item total per form: 50 (matches mock length 50).

## Assessment blueprint

| Component | Count | Items each | Minutes each | Total minutes |
|---|---|---|---|---|
| Lesson quizzes | 15 | 15 | 15 | 225 |
| Module tests | 5 | 15 | 15 | 75 |
| Full-length mock exams (independent forms A/B/C) | 3 | 50 | 100 | 300 |
| Topic drill sets (mixed-domain) | 0 | 30 | 30 | 0 |
| Review buffer | 1 | - | 0 | 0 |
| **Total** | | | | **600** (= 20% of 3000 min) |

Mock length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide; the real exam includes non-MCQ item types, which Mastemy turns into MCQ/MR only.

Minimum item bank: 450 unique items (no item reused across mocks A/B/C). Every option of every item carries a rationale. Items are tagged to domain + lesson ID for analytics.

## YouTube production notes

- One playlist per module (5 playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.
- Target video length about 96 min per lesson; chapters in the description should match the lesson's sub-objectives.
- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).
- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'
- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.
- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.
- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.

## Sample MCQs (original items, illustrative)

**Q1.** You must give a user permission to manage VMs in one resource group only, not anywhere else in the subscription. What should you do?

- A. Assign Virtual Machine Contributor at the resource group scope **(correct)**  
  _Rationale:_ Correct: an RBAC role assigned at resource-group scope applies only to resources in that group.
- B. Assign Virtual Machine Contributor at the subscription scope   
  _Rationale:_ Subscription scope would cover every resource group, which gives too much access.
- C. Assign Owner at the resource group scope   
  _Rationale:_ Owner also lets the user manage access. That breaks least privilege.
- D. Create an Azure Policy assignment   
  _Rationale:_ Policy controls resource configuration. It does not grant user permissions.

**Q2.** Blobs not accessed for 90 days must move to the cool tier automatically. What do you configure?

- A. Object replication   
  _Rationale:_ Object replication copies blobs between accounts. It does not change their tier.
- B. Blob lifecycle management policy **(correct)**  
  _Rationale:_ Correct: lifecycle management rules move blobs between tiers based on age or last access.
- C. Soft delete for blobs   
  _Rationale:_ Soft delete keeps deleted data. It does not move data between tiers.
- D. Stored access policy   
  _Rationale:_ Stored access policies control SAS permissions.

**Q3.** Which feature lets VMs in two virtual networks talk to each other over the Microsoft backbone without a gateway?

- A. Virtual network peering **(correct)**  
  _Rationale:_ Correct: peering connects VNets with low-latency private connectivity and no VPN gateway.
- B. Service endpoint   
  _Rationale:_ Service endpoints secure access from a VNet to PaaS services.
- C. User-defined route   
  _Rationale:_ UDRs override routing but do not join separate VNets on their own.
- D. Azure Bastion   
  _Rationale:_ Bastion gives browser-based RDP/SSH access to VMs.

## Change log

- 2026-10-02: Batch 1 blueprint created from SRC-MS-AZ104.
