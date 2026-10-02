# Storage and Backup Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1685` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-SBF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Storage and Backup Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain storage technologies and how data is stored and accessed
2. Compare RAID levels and redundancy trade-offs
3. Design a backup strategy using the 3-2-1 principle
4. Plan recovery, testing and retention
5. Apply storage and backup security including ransomware resilience

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Storage fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Match a workload to block, file or object storage; (2) Decide between NAS and SAN for a scenario
- Common misconception addressed: Assuming all storage is the same regardless of workload
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Block, file and object storage | 72 | 6 |
| M01L02 | DAS, NAS and SAN at a glance | 72 | 6 |

### M02 Redundancy and RAID (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a RAID level for a given need; (2) Explain why RAID is not a backup
- Common misconception addressed: Believing RAID redundancy removes the need for backups
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Common RAID levels and trade-offs | 72 | 6 |
| M02L02 | Redundancy vs backup | 72 | 6 |

### M03 Backup strategy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a 3-2-1 strategy for a small company; (2) Compare recovery time for full vs incremental
- Common misconception addressed: Keeping all backups in the same location as the data
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Full, incremental and differential backups | 72 | 6 |
| M03L02 | The 3-2-1 backup principle | 72 | 6 |

### M04 Recovery and retention (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set RTO and RPO for a critical system; (2) Plan a restore test and a retention schedule
- Common misconception addressed: Assuming backups work without ever testing a restore
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Recovery objectives (RTO and RPO) | 72 | 6 |
| M04L02 | Testing restores and retention policy | 72 | 6 |

### M05 Storage and backup security (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide how to protect backups from ransomware; (2) Choose where immutable or offline copies help
- Common misconception addressed: Leaving backups online and writable so ransomware can encrypt them too
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Encrypting and controlling access to backups | 72 | 6 |
| M05L02 | Ransomware resilience and immutability | 72 | 6 |

## Integrative case

A company has one external drive as its only backup and has never tested a restore. Assess the risk, design a 3-2-1 backup strategy with appropriate redundancy, set retention and testing schedules, and add protections so ransomware cannot destroy the backups along with the live data.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1685-final-protected | 25 | 25 | yes |
| MST-1685-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Storage fundamentals | 5 |
| Redundancy and RAID | 5 |
| Backup strategy | 5 |
| Recovery and retention | 5 |
| Storage and backup security | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1685-Q0001** (single-answer, Select ONE) Why is RAID not a substitute for backups?

- A. RAID protects against drive failure but not deletion, corruption or ransomware **(key)**  
  _Rationale:_ Correct: RAID adds availability, not recovery from logical data loss.
- B. RAID copies data to an off-site location automatically  
  _Rationale:_ RAID is local redundancy, not an off-site copy.
- C. RAID encrypts all data by default  
  _Rationale:_ RAID does not provide encryption.
- D. RAID keeps historical versions of files  
  _Rationale:_ RAID does not retain previous versions.

**MST-1685-Q0002** (multiple-answer, Select TWO) Which TWO statements describe the 3-2-1 backup principle? (Select TWO.)

- A. Keep at least three copies of the data **(key)**  
  _Rationale:_ Correct: three copies is the first part of 3-2-1.
- B. Keep at least one copy off-site **(key)**  
  _Rationale:_ Correct: an off-site copy survives a local disaster.
- C. Keep every copy on the same server  
  _Rationale:_ Co-locating all copies defeats the purpose of 3-2-1.
- D. Never test any of the copies  
  _Rationale:_ Testing restores is essential, not excluded.

**MST-1685-Q0003** (single-answer, Select ONE) Why should some backup copies be kept offline or immutable?

- A. So ransomware that reaches the live data cannot also encrypt the backups **(key)**  
  _Rationale:_ Correct: offline or immutable copies survive a ransomware attack.
- B. Because offline copies restore faster than any other  
  _Rationale:_ Speed is not the reason; resilience is.
- C. Because immutable backups need no retention policy  
  _Rationale:_ Retention is still required for immutable backups.
- D. Because online backups cannot be encrypted at all  
  _Rationale:_ Online, writable backups can be encrypted by ransomware.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
