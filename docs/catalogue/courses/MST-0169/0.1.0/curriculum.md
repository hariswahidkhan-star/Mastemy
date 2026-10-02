# Microsoft DP-300: Azure Database Administrator Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0169` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | DP-300 |
| Version basis | Skills measured as of October 27, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-DP300 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/dp-300) |
| Legacy IDs | MST-MIC-MS-DP300-001 |
| Planned time | T = 1850 min; instruction I = 1480 min (80%); assessment A = 370 min (20%) |
| Assessment split | lesson checks 75 / module checks 175 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Plan and implement data platform resources' to the depth the official outline requires
2. Apply the objectives of 'Implement a secure environment' to the depth the official outline requires
3. Apply the objectives of 'Monitor, configure, and optimize database resources' to the depth the official outline requires
4. Apply the objectives of 'Configure and manage automation of tasks' to the depth the official outline requires
5. Apply the objectives of 'Plan and configure a high availability and disaster recovery (HA/DR) environment' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Plan and implement data platform resources (15–20%)

- Worked applications: (1) Choose between Azure SQL Database, Managed Instance, and SQL on VM; (2) Plan an online migration with Azure Database Migration Service
- Common misconception addressed: Assuming SQL Managed Instance and Azure SQL Database have identical feature surfaces
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Plan and deploy Azure SQL solutions | 99 | 6 |
| M01L02 | Configure resources for scale and performance | 99 | 6 |
| M01L03 | Plan and implement a migration strategy | 99 | 6 |

### M02 Implement a secure environment (20–25%)

- Worked applications: (1) Configure Microsoft Entra authentication for Azure SQL; (2) Enable Transparent Data Encryption and Always Encrypted
- Common misconception addressed: Confusing TDE (data at rest) with Always Encrypted (in use)
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Configure database authentication and authorization | 99 | 6 |
| M02L02 | Implement security for data at rest and data in transit | 99 | 6 |
| M02L03 | Implement compliance controls for sensitive data | 99 | 6 |

### M03 Monitor, configure, and optimize database resources (20–25%)

- Worked applications: (1) Use Query Store to find a regressed query plan; (2) Add a missing index from a DMV recommendation
- Common misconception addressed: Treating high DTU as always a query problem rather than a sizing one
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Monitor resource activity and performance | 99 | 6 |
| M03L02 | Monitor and optimize query performance | 99 | 6 |
| M03L03 | Configure database solutions for optimal performance | 99 | 6 |

### M04 Configure and manage automation of tasks (15–20%)

- Worked applications: (1) Schedule maintenance with SQL Server Agent jobs; (2) Automate deployment with Bicep and Azure CLI
- Common misconception addressed: Expecting elastic jobs to behave exactly like on-prem Agent jobs
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Create and manage SQL Server Agent jobs | 99 | 6 |
| M04L02 | Automate deployment of database resources | 98 | 6 |
| M04L03 | Create and manage database tasks in Azure | 98 | 6 |

### M05 Plan and configure a high availability and disaster recovery (HA/DR) environment (20–25%)

- Worked applications: (1) Pick an HA/DR option from RPO/RTO requirements; (2) Configure a failover group with active geo-replication
- Common misconception addressed: Believing geo-replication alone meets a strict RTO without failover groups
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Plan an HA/DR strategy for database solutions | 98 | 6 |
| M05L02 | Plan and perform backup and restore of a database | 98 | 6 |
| M05L03 | Configure HA/DR for database solutions | 98 | 6 |

## Integrative case

A firm migrates an on-prem SQL Server estate to Azure SQL. Design the solution: pick the right service tier, a migration strategy, Entra authentication and encryption, a performance-monitoring baseline, task automation, and an HA/DR plan meeting a 1-hour RTO; defend the choices to the data platform owner.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0169-practice-form-A | 45 | 45 | yes |
| MST-0169-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0169-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0169-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Plan and implement data platform resources | 8 |
| Implement a secure environment | 10 |
| Monitor, configure, and optimize database resources | 10 |
| Configure and manage automation of tasks | 7 |
| Plan and configure a high availability and disaster recovery (HA/DR) environment | 10 |

Minimum reviewed item bank: 710 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0169-Q0001** (single-answer, Select ONE) You must lift-and-shift a SQL Server instance that relies on SQL Agent, cross-database queries, and the broadest surface of SQL Server features with minimal code change. Which Azure offering fits best?

- A. Azure SQL Managed Instance **(key)**  
  _Rationale:_ Correct: Managed Instance offers near-full SQL Server compatibility including SQL Agent and cross-database queries.
- B. Azure SQL Database (single database)  
  _Rationale:_ Single database lacks instance-scoped features like SQL Agent and easy cross-database queries.
- C. Azure Cosmos DB  
  _Rationale:_ Cosmos DB is a NoSQL service, not a SQL Server migration target.
- D. Azure Blob Storage  
  _Rationale:_ Blob Storage is object storage, not a relational database engine.

**MST-0169-Q0002** (single-answer, Select ONE) Which feature encrypts an Azure SQL database's data files at rest transparently to the application?

- A. Transparent Data Encryption (TDE) **(key)**  
  _Rationale:_ Correct: TDE encrypts data and log files at rest without application changes.
- B. Dynamic data masking  
  _Rationale:_ Masking obscures query results for some users; it does not encrypt files at rest.
- C. Row-level security  
  _Rationale:_ Row-level security filters rows by predicate; it is not encryption.
- D. A server firewall rule  
  _Rationale:_ Firewall rules control network access, not encryption at rest.

**MST-0169-Q0003** (multiple-answer, Select TWO) Which TWO configurations help meet a strict recovery time objective for an Azure SQL Database? (Select TWO.)

- A. Auto-failover groups **(key)**  
  _Rationale:_ Correct: failover groups automate endpoint redirection on failover, cutting RTO.
- B. Active geo-replication **(key)**  
  _Rationale:_ Correct: geo-replication maintains readable secondaries you can fail over to.
- C. Dynamic data masking  
  _Rationale:_ Masking is a data-protection feature, unrelated to recovery time.
- D. Query Store  
  _Rationale:_ Query Store aids performance tuning, not disaster recovery.
- E. Resource Governor  
  _Rationale:_ Resource Governor caps resource usage; it does not provide failover.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
