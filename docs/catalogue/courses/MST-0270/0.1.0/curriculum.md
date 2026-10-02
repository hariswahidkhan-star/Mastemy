# Linux Foundation LFCS: Knowledge and Demonstration Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0270` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation (no affiliation or endorsement) |
| Exam code | LFCS |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-PRG-LF-LFCS-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use essential commands and manage files on Linux
2. Operate running systems and manage users and groups
3. Configure networking and essential system services
4. Manage storage, service configuration and security basics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Official exam is performance-based (hands-on); Mastemy offers knowledge preparation and video demonstrations only.
- Does not assess: DESIGN ASSUMPTION: the official exam includes hands-on / performance-based tasks that MCQ/MR cannot reproduce; this knowledge-practice package does not assess command-line or lab performance.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Essential Commands and Files (weight: design assumption, unverified)

- Worked applications: (1) Build a pipeline to extract and summarise fields from a log file; (2) Set permissions and ownership so a group can collaborate on a directory
- Common misconception addressed: Confusing symbolic and hard links when a target is moved
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shell, navigation and text processing | 120 | 6 |
| M01L02 | File permissions and ownership | 120 | 6 |
| M01L03 | Archiving, searching and links | 120 | 6 |

### M02 Running Systems, Users and Groups (weight: design assumption, unverified)

- Worked applications: (1) Create a user, add them to a group and grant scoped sudo access; (2) Find and stop a runaway process consuming CPU
- Common misconception addressed: Granting full sudo instead of a least-privilege command alias
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Boot, systemd and targets | 120 | 6 |
| M02L02 | Processes and job control | 120 | 6 |
| M02L03 | Users, groups and sudo | 120 | 6 |

### M03 Networking and Services (weight: design assumption, unverified)

- Worked applications: (1) Configure a static address and troubleshoot a name-resolution failure; (2) Schedule a recurring maintenance task and verify it ran
- Common misconception addressed: Assuming a ping failure is always a routing problem, ignoring DNS
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Network configuration and troubleshooting | 120 | 6 |
| M03L02 | Name resolution | 120 | 6 |
| M03L03 | Essential system services (time, logging, scheduling) | 120 | 6 |

### M04 Storage, Service Config and Security (weight: design assumption, unverified)

- Worked applications: (1) Create an LVM volume, format it and mount it persistently; (2) Open a required service port in the firewall and verify access
- Common misconception addressed: Editing fstab incorrectly and leaving a system unable to boot
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Partitions, file systems and mounts | 120 | 6 |
| M04L02 | LVM and swap | 120 | 6 |
| M04L03 | Firewall and access security basics | 120 | 6 |

## Integrative case

A sysadmin brings up a new Linux host: configure storage with LVM, users and sudo, networking and name resolution, a scheduled task, and a firewall rule; explain each change and how to verify and roll it back safely.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0270-practice-form-A | 57 | 57 | yes |
| MST-0270-practice-form-B | 57 | 57 | no (optional practice) |
| MST-0270-practice-form-C | 57 | 57 | no (optional practice) |
| MST-0270-final-protected | 57 | 57 | yes |

| Domain | Items per form |
|---|---|
| Essential Commands and Files | 15 |
| Running Systems, Users and Groups | 14 |
| Networking and Services | 14 |
| Storage, Service Config and Security | 14 |

Minimum reviewed item bank: 624 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0270-Q0001** (single-answer, Select ONE) A user needs to run one administrative command without full root. What is the least-privilege approach?

- A. Grant a scoped sudo rule for that specific command **(key)**  
  _Rationale:_ Correct: a scoped sudoers entry grants only the needed command.
- B. Add the user to the root group  
  _Rationale:_ Group membership can grant far more than one command.
- C. Share the root password  
  _Rationale:_ Sharing root credentials violates least privilege and accountability.
- D. Set the command setuid root for everyone  
  _Rationale:_ A world-executable setuid-root binary is a serious risk.

**MST-0270-Q0002** (single-answer, Select ONE) A host can ping IPs but not resolve names. Which is the most likely cause?

- A. A DNS/name-resolution misconfiguration **(key)**  
  _Rationale:_ Correct: reachable IPs with failed names points to DNS resolution.
- B. A routing loop  
  _Rationale:_ A routing problem would also break IP reachability.
- C. A full disk  
  _Rationale:_ Disk capacity does not selectively break name resolution.
- D. An expired user password  
  _Rationale:_ Authentication is unrelated to name resolution.

**MST-0270-Q0003** (multiple-answer, Select TWO) Which TWO steps correctly add persistent LVM storage? (Select TWO)

- A. Create the logical volume and format it with a file system **(key)**  
  _Rationale:_ Correct: an LV must be created and formatted before use.
- B. Add the mount to /etc/fstab and verify it mounts **(key)**  
  _Rationale:_ Correct: an fstab entry makes the mount persistent across reboot.
- C. Mount it once manually and assume it persists  
  _Rationale:_ A manual mount does not survive reboot.
- D. Store data on it before creating a file system  
  _Rationale:_ You cannot store data before a file system exists.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
