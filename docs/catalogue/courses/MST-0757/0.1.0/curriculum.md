# Amazon RDS and Aurora: Relational Database Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0757` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Amazon RDS / Aurora documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Amazon RDS and Aurora: Relational Database Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain RDS and Aurora engine and architecture options
2. Provision instances with appropriate storage and sizing
3. Design high availability with Multi-AZ and replicas
4. Plan backups, snapshots and point-in-time recovery
5. Secure and monitor a managed database

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Engines and architecture (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose an engine for a workload; (2) Explain Aurora's shared storage
- Common misconception addressed: Assuming Aurora and standard RDS have identical failover behaviour
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | RDS engines and Aurora | 120 | 7 |
| M01L02 | Aurora storage architecture | 120 | 7 |

### M02 Provisioning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Size an instance for a read-heavy workload; (2) Change a parameter via a parameter group
- Common misconception addressed: Editing engine settings on the instance instead of a parameter group
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Instance classes and storage types | 120 | 7 |
| M02L02 | Parameter and option groups | 120 | 7 |

### M03 High availability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Enable Multi-AZ for failover; (2) Add a read replica to offload reads
- Common misconception addressed: Treating a read replica as a high-availability failover target
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Multi-AZ deployments | 120 | 7 |
| M03L02 | Read replicas and scaling reads | 120 | 7 |

### M04 Backup and recovery (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set a backup retention window; (2) Restore to a point in time
- Common misconception addressed: Relying on a single manual snapshot as the only backup
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Automated backups and snapshots | 120 | 7 |
| M04L02 | Point-in-time recovery | 120 | 7 |

### M05 Security and monitoring (MASTEMY-DESIGN 20%)

- Worked applications: (1) Place a database in a private subnet; (2) Watch CPU and connections with metrics
- Common misconception addressed: Exposing a database to the public internet
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Encryption, networking and access | 120 | 7 |
| M05L02 | Metrics and performance insights | 120 | 7 |

## Integrative case

Run a production relational database on AWS: choose between RDS and Aurora, provision and size the instance with parameter groups, enable Multi-AZ and a read replica, set backup retention with point-in-time recovery, and secure it in a private subnet with monitoring.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0757-final-protected | 40 | 50 | yes |
| MST-0757-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Engines and architecture | 8 |
| Provisioning | 8 |
| High availability | 8 |
| Backup and recovery | 8 |
| Security and monitoring | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0757-Q0001** (single-answer, Select ONE) What is the primary purpose of an RDS Multi-AZ deployment?

- A. Automatic failover for high availability **(key)**  
  _Rationale:_ Correct: Multi-AZ maintains a standby for automatic failover.
- B. Scaling read traffic across regions  
  _Rationale:_ Scaling reads is the job of read replicas, not Multi-AZ standby.
- C. Reducing storage cost  
  _Rationale:_ Multi-AZ adds a standby and does not reduce cost.
- D. Replacing the need for backups  
  _Rationale:_ Multi-AZ does not replace backups.

**MST-0757-Q0002** (multiple-answer, Select TWO) Which TWO statements about RDS backups are correct? (Select TWO.)

- A. Automated backups enable point-in-time recovery within the retention window **(key)**  
  _Rationale:_ Correct: automated backups plus transaction logs allow PITR.
- B. Manual snapshots persist until you delete them **(key)**  
  _Rationale:_ Correct: manual snapshots are retained until explicitly removed.
- C. Backups make a read replica unnecessary  
  _Rationale:_ Backups and read replicas serve different purposes.
- D. Backups automatically make the database Multi-AZ  
  _Rationale:_ Backups do not change deployment topology.

**MST-0757-Q0003** (single-answer, Select ONE) How should you change an engine configuration setting in RDS?

- A. Modify a parameter group associated with the instance **(key)**  
  _Rationale:_ Correct: parameter groups manage engine settings in RDS.
- B. SSH into the host and edit the config file  
  _Rationale:_ RDS is managed; host SSH access to edit configs is not available.
- C. Recreate the instance from scratch each time  
  _Rationale:_ Parameter groups avoid recreation.
- D. Edit the automated backup  
  _Rationale:_ Backups do not hold live engine configuration.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
