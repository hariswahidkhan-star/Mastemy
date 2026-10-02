# Backup, Recovery, and Cyber-Resilience Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1020` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Backup, Recovery, and Cyber-Resilience Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Resilience and recovery fundamentals
2. Backup strategies and the 3-2-1 rule
3. Immutable and air-gapped backups
4. Recovery testing and runbooks
5. Disaster recovery and business continuity
6. Ransomware resilience and validation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Resilience and recovery fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Set RPO and RTO for a given business process; (2) Classify a workload by its tolerance for data loss
- Common misconception addressed: Confusing a backup with a disaster-recovery plan
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Resilience, RPO and RTO | 80 | 6 |
| M01L02 | Threats to availability and data | 80 | 6 |

### M02 Backup strategies and the 3-2-1 rule (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply the 3-2-1 rule to a small environment; (2) Choose a backup type to meet an RPO
- Common misconception addressed: Assuming a single nightly copy is a sufficient backup strategy
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Full, incremental and differential backups | 80 | 6 |
| M02L02 | The 3-2-1 rule and retention | 80 | 6 |

### M03 Immutable and air-gapped backups (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how immutability defeats backup deletion; (2) Design an air-gapped copy for critical data
- Common misconception addressed: Believing backups connected to the same network are safe from ransomware
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Immutability and WORM storage | 80 | 6 |
| M03L02 | Air-gapping and offline copies | 80 | 6 |

### M04 Recovery testing and runbooks (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a recovery runbook step for a database; (2) Design a restore drill that proves an RTO
- Common misconception addressed: Treating a successful backup job as proof of recoverability
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Why untested backups fail | 80 | 6 |
| M04L02 | Recovery runbooks and drills | 80 | 6 |

### M05 Disaster recovery and business continuity (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick a DR strategy to meet a tight RTO; (2) Identify a hidden dependency that breaks a failover
- Common misconception addressed: Planning for the application but forgetting its dependencies
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | DR strategies and site options | 80 | 6 |
| M05L02 | Business continuity and dependencies | 80 | 6 |

### M06 Ransomware resilience and validation (MASTEMY-DESIGN 18%)

- Worked applications: (1) Design a recovery path assuming primary data is encrypted; (2) Set up ongoing restore validation
- Common misconception addressed: Assuming paying a ransom is a recovery strategy
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Designing for ransomware recovery | 80 | 6 |
| M06L02 | Validating recoverability continuously | 80 | 6 |

## Integrative case

Design resilience for a billing application: set its RPO and RTO, build a 3-2-1 backup strategy with an immutable and air-gapped copy, write a tested recovery runbook and a restore drill that proves the RTO, choose a DR strategy that accounts for dependencies, and validate that you could recover even if primary data were encrypted by ransomware.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1020-final-protected | 30 | 30 | yes |
| MST-1020-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Resilience and recovery fundamentals | 5 |
| Backup strategies and the 3-2-1 rule | 5 |
| Immutable and air-gapped backups | 5 |
| Recovery testing and runbooks | 5 |
| Disaster recovery and business continuity | 5 |
| Ransomware resilience and validation | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1020-Q0001** (single-answer, Select ONE) A business can tolerate losing at most 15 minutes of data. Which objective does this define?

- A. The Recovery Point Objective (RPO) **(key)**  
  _Rationale:_ Correct: RPO is the maximum acceptable data loss, measured as a point in time.
- B. The Recovery Time Objective (RTO)  
  _Rationale:_ RTO is how long recovery may take, not how much data may be lost.
- C. The mean time between failures  
  _Rationale:_ MTBF measures reliability, not acceptable data loss.
- D. The backup window size  
  _Rationale:_ The backup window is when backups run, not the loss tolerance.

**MST-1020-Q0002** (multiple-answer, Select ALL that apply) Which two properties make a backup copy resilient against ransomware that tries to delete or encrypt backups? (Select TWO)

- A. Immutability so the copy cannot be modified or deleted for a set period **(key)**  
  _Rationale:_ Correct: immutability blocks tampering and deletion.
- B. An air-gapped or offline copy not reachable from the production network **(key)**  
  _Rationale:_ Correct: an unreachable copy cannot be encrypted by network-borne ransomware.
- C. Storing the backup on the same server it protects  
  _Rationale:_ Co-locating the backup exposes it to the same compromise.
- D. Granting all users write access to the backup store  
  _Rationale:_ Broad write access makes deletion or encryption easier.

**MST-1020-Q0003** (single-answer, Select ONE) Why is a successful backup job not sufficient proof that you can recover?

- A. Only a tested restore confirms the data is complete and usable within the RTO **(key)**  
  _Rationale:_ Correct: backups can succeed yet be unrestorable; restore testing proves recoverability.
- B. Backup jobs always silently corrupt data  
  _Rationale:_ Jobs do not always corrupt data; the point is recovery must be tested.
- C. Restores are illegal without a court order  
  _Rationale:_ Restores are a normal operation, not a legal event.
- D. A backup job deletes the original data  
  _Rationale:_ Backups copy data; they do not delete the source.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
