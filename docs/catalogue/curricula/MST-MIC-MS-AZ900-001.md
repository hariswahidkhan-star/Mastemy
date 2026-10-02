# Microsoft Azure Fundamentals (AZ-900) Exam Prep

> **Curriculum blueprint / specification - not finished lesson content or videos.** Course `MST-MIC-MS-AZ900-001` | Batch 1 | content_version 0.1.0 | approval_status: draft

| Field | Value |
|---|---|
| Official exam code | AZ-900 |
| Awarding body | Microsoft (no affiliation or endorsement) |
| Syllabus version used | Skills measured as of 2026-07-20 |
| Evidence status | **VERIFIED against the official study guide** |
| Source | SRC-MS-AZ900 - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900 (accessed 2026-10-02, method: official-fetch) |
| Estimated learner hours | 25 |
| Assessment hours (20%) | 5.0 h (300 min) |
| Question formats | MCQ and multiple-response only |

## Learning outcomes

1. Explain cloud computing models, service types and the shared responsibility model
2. Identify core Azure architectural components and services for compute, networking and storage
3. Describe Azure identity, access and security capabilities
4. Describe Azure cost management, governance, deployment and monitoring tools

## Modules and lessons

Instructional time: 1200 min across 11 lessons (~109 min each: ~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.

### Module 1: Describe cloud concepts (25-30%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M1.L1 | Describe cloud computing | 109 | 10 |
| M1.L2 | Describe the benefits of using cloud services | 109 | 10 |
| M1.L3 | Describe cloud service types | 109 | 10 |
| M1.T | Module 1 test | 15 | 15 |

### Module 2: Describe Azure architecture and services (35-40%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M2.L1 | Describe the core architectural components of Azure | 109 | 10 |
| M2.L2 | Describe Azure compute and networking services | 109 | 10 |
| M2.L3 | Describe Azure storage services | 109 | 10 |
| M2.L4 | Describe Azure identity, access, and security | 109 | 10 |
| M2.T | Module 2 test | 15 | 15 |

### Module 3: Describe Azure management and governance (30-35%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M3.L1 | Describe cost management in Azure | 109 | 10 |
| M3.L2 | Describe features and tools in Azure for governance and compliance | 109 | 10 |
| M3.L3 | Describe features and tools for managing and deploying Azure resources | 109 | 10 |
| M3.L4 | Describe monitoring tools in Azure | 109 | 10 |
| M3.T | Module 3 test | 15 | 15 |

## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900 (accessed 2026-10-02).

| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |
|---|---|---|---|---|---|
| Describe cloud concepts | 25-30% | M1 | M1.L1, M1.L2, M1.L3 | 82 | 13 |
| Describe Azure architecture and services | 35-40% | M2 | M2.L1, M2.L2, M2.L3, M2.L4 | 112 | 17 |
| Describe Azure management and governance | 30-35% | M3 | M3.L1, M3.L2, M3.L3, M3.L4 | 97 | 15 |

Mock item total per form: 45 (matches mock length 45).

## Assessment blueprint

| Component | Count | Items each | Minutes each | Total minutes |
|---|---|---|---|---|
| Lesson quizzes | 11 | 10 | 10 | 110 |
| Module tests | 3 | 15 | 15 | 45 |
| Full-length mock exams (independent forms A/B/C) | 3 | 45 | 45 | 135 |
| Topic drill sets (mixed-domain) | 0 | 30 | 30 | 0 |
| Review buffer | 1 | - | 10 | 10 |
| **Total** | | | | **300** (= 20% of 1500 min) |

Mock length basis: DESIGN ASSUMPTION - the study guide fetched does not state question count or duration; confirm on the exam details page.

Minimum item bank: 290 unique items (no item reused across mocks A/B/C). Every option of every item carries a rationale. Items are tagged to domain + lesson ID for analytics.

## YouTube production notes

- One playlist per module (3 playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.
- Target video length about 65 min per lesson; chapters in the description should match the lesson's sub-objectives.
- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).
- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'
- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.
- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.
- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.

## Sample MCQs (original items, illustrative)

**Q1.** A company wants to pay only for compute it actually uses and avoid buying servers up front. Which cloud benefit does this describe?

- A. Consumption-based (pay-as-you-go) pricing **(correct)**  
  _Rationale:_ Correct: the consumption-based model charges for resources used and moves spend from CapEx to OpEx.
- B. High availability   
  _Rationale:_ Availability is about uptime, not how resources are paid for.
- C. Data sovereignty   
  _Rationale:_ Sovereignty concerns where data is stored and which laws apply, not billing.
- D. Vertical scaling   
  _Rationale:_ Vertical scaling changes resource size; it says nothing about payment model.

**Q2.** Which Azure construct lets you apply Azure Policy and RBAC across several subscriptions at once?

- A. Resource group   
  _Rationale:_ A resource group lives inside one subscription, so it cannot span several.
- B. Management group **(correct)**  
  _Rationale:_ Correct: management groups sit above subscriptions and pass on policy and access to every subscription under them.
- C. Availability zone   
  _Rationale:_ Availability zones are physical datacenter groupings for resiliency, not a governance scope.
- D. Resource lock   
  _Rationale:_ Locks stop resources being deleted or changed. They do not group subscriptions.

**Q3.** In the shared responsibility model, which responsibility always stays with the customer, whatever the service type (IaaS, PaaS or SaaS)?

- A. Physical datacenter security   
  _Rationale:_ Physical security is always the cloud provider's responsibility.
- B. Operating system patching   
  _Rationale:_ OS patching is the customer's job in IaaS but the provider's in PaaS and SaaS.
- C. Information and data, including accounts and identities **(correct)**  
  _Rationale:_ Correct: customers always own their data, devices, accounts and identities.
- D. Network controls for the host   
  _Rationale:_ Host network controls move to the provider in PaaS and SaaS.

## Change log

- 2026-10-02: Batch 1 blueprint created from SRC-MS-AZ900.
