# Microsoft AZ-305: Azure Solutions Architect Expert Exam Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0163` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AZ-305 |
| Version basis | Skills measured as of 2026-04-17 |
| Evidence | **verified-official-source** - source: SRC-MS-AZ305 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/az-305) |
| Legacy IDs | MST-MIC-MS-AZ305-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Recommend identity, governance and monitoring solutions for Azure and hybrid workloads
2. Recommend relational, semi-structured and unstructured data storage and integration solutions
3. Recommend backup, disaster-recovery and high-availability solutions that meet stated objectives
4. Recommend compute, application-architecture, migration and network solutions for an Azure workload

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Design identity, governance, and monitoring solutions (25-30%)

- Worked applications: (1) Apply the key concepts of 'Design identity, governance, and monitoring solutions' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design identity, governance, and monitoring solutions'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Design solutions for logging and monitoring | 240 | 6 |
| M01L02 | Design authentication and authorization solutions | 240 | 6 |
| M01L03 | Design governance | 240 | 6 |

### M02 Design data storage solutions (20-25%)

- Worked applications: (1) Apply the key concepts of 'Design data storage solutions' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design data storage solutions'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design data storage solutions for relational data | 240 | 6 |
| M02L02 | Design data storage solutions for semi-structured and unstructured data | 240 | 6 |
| M02L03 | Design data integration and analysis solutions | 240 | 6 |

### M03 Design business continuity solutions (15-20%)

- Worked applications: (1) Apply the key concepts of 'Design business continuity solutions' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design business continuity solutions'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Design solutions for backup and disaster recovery | 240 | 6 |
| M03L02 | Design for high availability | 240 | 6 |

### M04 Design infrastructure solutions (30-35%)

- Worked applications: (1) Apply the key concepts of 'Design infrastructure solutions' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design infrastructure solutions'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Design compute solutions | 240 | 6 |
| M04L02 | Design an application architecture | 240 | 6 |
| M04L03 | Design migrations | 240 | 6 |
| M04L04 | Design network solutions | 240 | 6 |

## Integrative case

A retailer consolidates three business units onto Azure: design a management-group and identity model, choose storage for its catalogue and telemetry, set a backup and DR plan to meet a 1-hour RPO, and recommend a migration and network design, then defend the architecture against the Well-Architected Framework pillars.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0163-practice-form-A | 108 | 108 | yes |
| MST-0163-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0163-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0163-final-protected | 108 | 108 | yes |

| Domain | Items per form |
|---|---|
| Design identity, governance, and monitoring solutions | 27 |
| Design data storage solutions | 27 |
| Design business continuity solutions | 27 |
| Design infrastructure solutions | 27 |

Minimum reviewed item bank: 1080 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0163-Q0001** (single-answer, Select ONE) A solutions architect must recommend a governance structure that applies Azure Policy and role assignments consistently across several subscriptions for three departments. Which construct should sit above the subscriptions?

- A. Management groups **(key)**  
  _Rationale:_ Correct: management groups sit above subscriptions and let policy and RBAC assignments cascade to every subscription beneath them.
- B. Resource groups  
  _Rationale:_ A resource group is a container inside a single subscription and cannot span several subscriptions.
- C. Availability zones  
  _Rationale:_ Availability zones provide datacentre-level resiliency within a region; they are not a governance scope.
- D. Azure Blueprints artifacts alone  
  _Rationale:_ Blueprints package artifacts for deployment but still need a management-group scope to apply consistently across subscriptions.

**MST-0163-Q0002** (single-answer, Select ONE) A workload needs a recovery solution for Azure VMs that meets a stated recovery point objective with minimal operational overhead. Which service should the design recommend?

- A. Azure Backup with the Azure VM extension **(key)**  
  _Rationale:_ Correct: Azure Backup provides policy-driven, application-consistent recovery points for Azure VMs with low operational overhead.
- B. Manual VHD copies to a storage account  
  _Rationale:_ Manual copies are error-prone, lack scheduling and do not guarantee application consistency.
- C. Availability sets  
  _Rationale:_ Availability sets improve uptime against hardware faults; they do not provide point-in-time recovery.
- D. Azure Front Door  
  _Rationale:_ Front Door is a global HTTP load balancer and CDN, not a backup or recovery service.

**MST-0163-Q0003** (multiple-answer, Select TWO) Select TWO storage options that are appropriate for storing large volumes of unstructured object data accessed over HTTP. (Select TWO.)

- A. Azure Blob Storage **(key)**  
  _Rationale:_ Correct: Blob Storage is purpose-built for massive unstructured object data accessed over HTTP/HTTPS.
- B. Azure Data Lake Storage Gen2 **(key)**  
  _Rationale:_ Correct: Data Lake Storage Gen2 builds on Blob Storage with a hierarchical namespace for large-scale unstructured and analytics data.
- C. Azure SQL Database  
  _Rationale:_ Azure SQL Database is a relational engine for structured data, not large unstructured objects.
- D. Azure Cache for Redis  
  _Rationale:_ Redis is an in-memory key-value cache, unsuitable as durable object storage.
- E. Azure Table partition key  
  _Rationale:_ A partition key is a design element of Table storage for key-value data, not an object-storage service.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
