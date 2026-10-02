# Linux Administration: Complete Operational Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0981` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-LSA-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Linux Administration: Complete Operational Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Linux fundamentals
2. Files, permissions and ownership
3. Processes and the boot flow
4. Service management with systemd
5. Package and software management
6. Networking and firewall
7. Storage and filesystems
8. Automation, logging and recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Linux fundamentals (MASTEMY-DESIGN 13%)

- Worked applications: (1) Navigate the filesystem hierarchy and read man pages; (2) Run a command with elevated privileges using sudo
- Common misconception addressed: Believing root privileges are needed for every administrative task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The shell, filesystem hierarchy and documentation | 120 | 6 |
| M01L02 | Users, sudo and basic navigation | 120 | 6 |

### M02 Files, permissions and ownership (MASTEMY-DESIGN 13%)

- Worked applications: (1) Set file permissions with chmod symbolic and octal notation; (2) Change ownership and apply group permissions
- Common misconception addressed: Confusing the meaning of permission bits for files versus directories
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Permissions, ownership and umask | 120 | 6 |
| M02L02 | Links, special bits and ACLs | 120 | 6 |

### M03 Processes and the boot flow (MASTEMY-DESIGN 13%)

- Worked applications: (1) Inspect and signal processes with ps, top and kill; (2) Trace the boot sequence to a running target
- Common misconception addressed: Thinking killing a parent process always stops its children cleanly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Processes, signals and priorities | 120 | 6 |
| M03L02 | The boot process and systemd targets | 120 | 6 |

### M04 Service management with systemd (MASTEMY-DESIGN 13%)

- Worked applications: (1) Start, enable and inspect a unit with systemctl; (2) Read service logs with journalctl
- Common misconception addressed: Assuming enabling a service also starts it immediately
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Units, services and systemctl | 120 | 6 |
| M04L02 | Journald and troubleshooting services | 120 | 6 |

### M05 Package and software management (MASTEMY-DESIGN 12%)

- Worked applications: (1) Install and remove software with the distro package manager; (2) Manage repositories and updates safely
- Common misconception addressed: Expecting one distribution's package manager commands to work everywhere
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Package managers and repositories | 120 | 6 |
| M05L02 | Updates, dependencies and verification | 120 | 6 |

### M06 Networking and firewall (MASTEMY-DESIGN 12%)

- Worked applications: (1) Configure an interface and test connectivity; (2) Open and restrict ports with a host firewall
- Common misconception addressed: Confusing a hostname resolution failure with a connectivity failure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Interfaces, addressing and DNS | 120 | 6 |
| M06L02 | Firewalls and service exposure | 120 | 6 |

### M07 Storage and filesystems (MASTEMY-DESIGN 12%)

- Worked applications: (1) Partition, format and mount a new disk; (2) Add a persistent mount via fstab
- Common misconception addressed: Assuming a device appears usable the moment it is partitioned
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Disks, partitions and filesystems | 120 | 6 |
| M07L02 | Mounting, fstab and basic LVM | 120 | 6 |

### M08 Automation, logging and recovery (MASTEMY-DESIGN 12%)

- Worked applications: (1) Schedule maintenance with cron and systemd timers; (2) Configure log rotation and plan a recovery for a failed boot
- Common misconception addressed: Believing cron and systemd timers are interchangeable in every respect
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Scheduling and shell automation | 120 | 6 |
| M08L02 | Logging, backups and recovery | 120 | 6 |

## Integrative case

Stand up and harden a small Linux application server: manage users and permissions, install and control services with systemd, configure networking and a firewall, schedule maintenance jobs, set up log rotation, and document a recovery procedure for a failed boot.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0981-final-protected | 40 | 40 | yes |
| MST-0981-final-alternate | 40 | 40 | no (optional practice) |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0981-Q0001** (single-answer, Select ONE) What does the octal permission 644 grant on a regular file?

- A. Owner read/write; group and others read only **(key)**  
  _Rationale:_ Correct: 6=rw for owner, 4=r for group, 4=r for others.
- B. Everyone full read/write/execute  
  _Rationale:_ That would be 777, not 644.
- C. Owner read only; no access for others  
  _Rationale:_ 644 gives owner write and others read, not owner read-only.
- D. Owner execute only  
  _Rationale:_ The execute bit is not set in 644.

**MST-0981-Q0002** (multiple-answer, Select TWO) Which TWO systemctl actions are needed so a service both runs now and starts automatically at boot? (Select TWO)

- A. systemctl start <unit> **(key)**  
  _Rationale:_ Correct: start runs the service immediately.
- B. systemctl enable <unit> **(key)**  
  _Rationale:_ Correct: enable configures the service to start at boot.
- C. systemctl mask <unit>  
  _Rationale:_ mask prevents the service from starting at all.
- D. systemctl status <unit>  
  _Rationale:_ status only reports state; it does not start or enable.

**MST-0981-Q0003** (single-answer, Select ONE) Which command reads the logs of a specific systemd service?

- A. journalctl -u <service> **(key)**  
  _Rationale:_ Correct: journalctl -u filters the journal to one unit.
- B. cat /etc/passwd  
  _Rationale:_ That file lists user accounts, not service logs.
- C. systemctl mask <service>  
  _Rationale:_ mask disables a service; it does not show logs.
- D. chmod 600 <service>  
  _Rationale:_ chmod changes permissions, not logs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
