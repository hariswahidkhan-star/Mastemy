# AWS Backup, Resilience, and Disaster Recovery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0767` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on AWS Backup and Disaster Recovery docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-BACKUP-DR (https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AWS Backup, Resilience, and Disaster Recovery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define RPO, RTO and resilience goals
2. Configure AWS Backup plans and vaults
3. Protect data across services and accounts
4. Design multi-AZ and multi-region resilience
5. Choose and implement DR strategies
6. Test and operate recovery procedures

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Resilience goals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Set RPO and RTO for a database; (2) Classify workloads by criticality
- Common misconception addressed: Confusing a backup with high availability
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | RPO and RTO | 80 | 7 |
| M01L02 | Resilience vs availability | 80 | 7 |

### M02 AWS Backup (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a backup plan with a daily rule; (2) Move backups to cold storage by lifecycle
- Common misconception addressed: Assuming resources are protected before assigning them to a plan
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Backup plans and rules | 80 | 7 |
| M02L02 | Vaults and lifecycle | 80 | 7 |

### M03 Cross-service and account protection (MASTEMY-DESIGN 17%)

- Worked applications: (1) Select resources by tag for backup; (2) Copy backups to a separate account
- Common misconception addressed: Keeping backups only in the same account as production
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Supported services and tags | 80 | 7 |
| M03L02 | Cross-account backup | 80 | 7 |

### M04 Multi-AZ and multi-region (MASTEMY-DESIGN 17%)

- Worked applications: (1) Deploy a database across availability zones; (2) Replicate backups to a second region
- Common misconception addressed: Treating multi-AZ as protection against a regional outage
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Multi-AZ designs | 80 | 7 |
| M04L02 | Cross-region replication | 80 | 7 |

### M05 DR strategies (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose pilot light for a cost-sensitive app; (2) Compare warm standby to active-active
- Common misconception addressed: Picking active-active when the budget and RTO do not require it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Backup/restore and pilot light | 80 | 7 |
| M05L02 | Warm standby and multi-site | 80 | 7 |

### M06 Testing and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run a restore test and record RTO achieved; (2) Apply vault lock to prevent deletion
- Common misconception addressed: Assuming untested backups will restore successfully
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Recovery testing | 80 | 7 |
| M06L02 | Vault lock and runbooks | 80 | 7 |

## Integrative case

Design a DR plan for a two-tier app: set RPO/RTO targets, build an AWS Backup plan with a locked vault, replicate backups to a second region, pick a pilot-light strategy, and run a recovery test documenting the results.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0767-final-protected | 40 | 50 | yes |
| MST-0767-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Resilience goals | 6 |
| AWS Backup | 6 |
| Cross-service and account protection | 7 |
| Multi-AZ and multi-region | 7 |
| DR strategies | 7 |
| Testing and operations | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0767-Q0001** (single-answer, Select ONE) What does RPO (Recovery Point Objective) specify?

- A. The maximum acceptable amount of data loss measured in time **(key)**  
  _Rationale:_ Correct: RPO is how much data, in time, you can afford to lose.
- B. How long recovery is allowed to take  
  _Rationale:_ That is RTO, not RPO.
- C. The number of availability zones in a region  
  _Rationale:_ RPO is not about AZ count.
- D. The cost of the backup vault  
  _Rationale:_ RPO is a data-loss target, not a cost.

**MST-0767-Q0002** (single-answer, Select ONE) Why is a multi-AZ deployment alone insufficient for regional disaster recovery?

- A. All AZs are within one region, so a regional outage can affect them together **(key)**  
  _Rationale:_ Correct: multi-AZ does not survive a whole-region event.
- B. Multi-AZ increases data loss  
  _Rationale:_ Multi-AZ improves availability within a region.
- C. AZs cannot run databases  
  _Rationale:_ AZs commonly run databases.
- D. Regions have only one AZ  
  _Rationale:_ Regions contain multiple AZs.

**MST-0767-Q0003** (multiple-answer, Select TWO) Which TWO strengthen a backup and DR posture on AWS? (Select TWO.)

- A. Copy backups to a separate region and/or account **(key)**  
  _Rationale:_ Correct: isolation protects against regional or account-level loss.
- B. Regularly test restores against RTO targets **(key)**  
  _Rationale:_ Correct: tested restores validate recovery.
- C. Keep backups only in the production account and region  
  _Rationale:_ Single-location backups are a single point of failure.
- D. Never test restores to save effort  
  _Rationale:_ Untested backups may not restore.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
