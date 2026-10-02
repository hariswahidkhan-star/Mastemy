# Azure SQL Database Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1449` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure SQL Database documentation read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZSQL |
| Legacy IDs | MST-MIC-SK-ASDE-001 |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure SQL Database Essentials (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Describe Azure SQL Database and how it differs from SQL Server and Managed Instance
2. Compare deployment models, purchasing models and service tiers
3. Explain scaling, backups and high-availability capabilities

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What is Azure SQL Database (MASTEMY-DESIGN 34%, design weight)

- Worked applications: (1) Decide between Azure SQL Database and SQL Server on a VM for a scenario; (2) Explain what a logical server provides
- Common misconception addressed: Believing Azure SQL Database gives OS-level and file-system control like a VM
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | PaaS databases vs SQL Server and Managed Instance | 80 | 4 |
| M01L02 | Logical servers and single databases | 80 | 4 |

### M02 Deployment and purchasing models (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Choose single database or elastic pool for a set of variable-usage databases; (2) Match a workload to vCore, DTU or serverless
- Common misconception addressed: Assuming elastic pools always cost more than isolated single databases
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Single database and elastic pools | 80 | 4 |
| M02L02 | vCore, DTU and serverless purchasing models | 80 | 4 |

### M03 Scaling, backups and availability (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Scale a single database up a service tier without downtime; (2) Choose active geo-replication or failover groups for a continuity requirement
- Common misconception addressed: Confusing dynamic (manual, no-downtime) scaling with automatic autoscaling
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Dynamic scaling and service tiers | 80 | 4 |
| M03L02 | Automatic backups, geo-replication and failover groups | 80 | 4 |

## Integrative case

An analyst chooses an Azure SQL Database configuration for a new app: selects single database vs elastic pool, a purchasing model and service tier, and a business-continuity option, justifying each choice against the workload's size, cost and availability needs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1449-final-protected | 24 | 32 | yes |
| MST-1449-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What is Azure SQL Database | 8 |
| Deployment and purchasing models | 8 |
| Scaling, backups and availability | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1449-Q0001** (single-answer, Select ONE) A team needs operating-system-level control and a specific SQL Server version. Which Azure SQL option fits best?

- A. SQL Server on Azure Virtual Machines **(key)**  
  _Rationale:_ Correct: SQL Server on Azure VMs gives full OS and version control.
- B. Azure SQL Database single database  
  _Rationale:_ Azure SQL Database is PaaS and does not expose OS-level control.
- C. Azure SQL Database elastic pool  
  _Rationale:_ Elastic pools are still PaaS without OS control.
- D. Azure Blob Storage  
  _Rationale:_ Blob Storage is object storage, not a SQL database engine.

**MST-1449-Q0002** (multiple-answer, Select TWO) Which TWO are deployment or purchasing options for Azure SQL Database? (Select TWO.)

- A. Elastic pool **(key)**  
  _Rationale:_ Correct: an elastic pool is a deployment model sharing resources across databases.
- B. Serverless compute tier **(key)**  
  _Rationale:_ Correct: serverless is a purchasing/compute option that autoscales and can pause.
- C. On-premises-only licensing  
  _Rationale:_ Incorrect: Azure SQL Database is a cloud PaaS service.
- D. Physical tape backup tier  
  _Rationale:_ Incorrect: backups are automated to Azure storage, not tape tiers.

**MST-1449-Q0003** (single-answer, Select ONE) Which capability lets Azure SQL Database restore a database to any point in time within the retention period?

- A. Automatic backups with point-in-time restore **(key)**  
  _Rationale:_ Correct: automatic backups enable point-in-time restore within the retention period.
- B. Elastic pools  
  _Rationale:_ Elastic pools share resources but do not themselves provide point-in-time restore.
- C. The DTU purchasing model  
  _Rationale:_ The DTU model is a pricing abstraction, not a restore feature.
- D. Manual CSV exports  
  _Rationale:_ CSV exports are not the point-in-time restore mechanism.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
