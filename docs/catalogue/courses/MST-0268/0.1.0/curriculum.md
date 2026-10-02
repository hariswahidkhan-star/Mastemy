# Red Hat RHCSA: Knowledge and Demonstration Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0268` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Red Hat (no affiliation or endorsement) |
| Exam code | EX200 |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-PRG-RH-EX200-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use essential command-line tools and operate running Red Hat Enterprise Linux systems
2. Configure local storage, file systems and scheduled tasks
3. Deploy, configure and maintain systems including networking and software
4. Manage users, groups and basic security including firewall and SELinux

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Official exam is performance-based (hands-on); Mastemy offers knowledge preparation and video demonstrations only.
- Does not assess: DESIGN ASSUMPTION: the official exam includes hands-on / performance-based tasks that MCQ/MR cannot reproduce; this knowledge-practice package does not assess command-line or lab performance.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Essential Tools and Running Systems (weight: design assumption, unverified)

- Worked applications: (1) Build a command pipeline to find and archive logs older than seven days; (2) Diagnose and restart a failed service, then enable it at boot
- Common misconception addressed: Confusing enabling a service (at boot) with starting it (now)
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shell, files and redirection | 180 | 6 |
| M01L02 | Processes, services and systemd targets | 180 | 6 |
| M01L03 | Logs and tuning running systems | 180 | 6 |

### M02 Local Storage and File Systems (weight: design assumption, unverified)

- Worked applications: (1) Extend an LVM logical volume and grow its file system online; (2) Add a persistent mount in /etc/fstab and verify it survives reboot
- Common misconception addressed: Mounting a file system manually but forgetting to make it persistent
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Partitions, LVM and swap | 180 | 6 |
| M02L02 | File systems and mounts | 180 | 6 |
| M02L03 | Scheduled tasks and persistence | 180 | 6 |

### M03 Deploy, Configure and Maintain (weight: design assumption, unverified)

- Worked applications: (1) Configure a static IP and resolve a repository that fails to install a package; (2) Recover a system that cannot boot to its default target
- Common misconception addressed: Assuming a configuration change applies before the service reloads
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Network configuration and hostname | 180 | 6 |
| M03L02 | Software management and repositories | 180 | 6 |
| M03L03 | Boot process and troubleshooting | 180 | 6 |

### M04 Users, Groups and Security (weight: design assumption, unverified)

- Worked applications: (1) Create a shared group directory with the setgid bit and correct permissions; (2) Fix a web page that fails to serve because of a wrong SELinux context
- Common misconception addressed: Disabling SELinux to fix a problem instead of correcting the context
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Users, groups and permissions | 180 | 6 |
| M04L02 | Firewall configuration | 180 | 6 |
| M04L03 | SELinux modes and contexts | 180 | 6 |

## Integrative case

An administrator provisions a new RHEL server for a department: configure networking and storage with LVM, install and enable a service, create users and a shared group, and lock it down with the firewall and SELinux; explain each configuration and how to verify it.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0268-practice-form-A | 93 | 93 | yes |
| MST-0268-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0268-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0268-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Essential Tools and Running Systems | 24 |
| Local Storage and File Systems | 23 |
| Deploy, Configure and Maintain | 23 |
| Users, Groups and Security | 23 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0268-Q0001** (single-answer, Select ONE) A service runs now but does not start after reboot. Which action makes it start at boot?

- A. Enable the service with systemctl enable **(key)**  
  _Rationale:_ Correct: enabling creates the boot-time symlink so it starts on reboot.
- B. Start the service with systemctl start  
  _Rationale:_ Starting runs it now but does not persist across reboot.
- C. Run the binary once manually  
  _Rationale:_ A manual run does not register the service for boot.
- D. Edit /etc/hostname  
  _Rationale:_ The hostname file is unrelated to service startup.

**MST-0268-Q0002** (single-answer, Select ONE) A persistent mount must survive reboot. Where should it be defined?

- A. In /etc/fstab **(key)**  
  _Rationale:_ Correct: /etc/fstab defines mounts applied at boot.
- B. Only via a one-time mount command  
  _Rationale:_ A manual mount does not persist across reboot.
- C. In ~/.bashrc  
  _Rationale:_ Shell startup files do not configure system mounts.
- D. In /etc/hosts  
  _Rationale:_ The hosts file maps names to addresses, not mounts.

**MST-0268-Q0003** (multiple-answer, Select TWO) A web page returns a permission error though file permissions look correct on an SELinux-enforcing host. Which TWO steps are appropriate? (Select TWO)

- A. Check and correct the SELinux file context **(key)**  
  _Rationale:_ Correct: a wrong SELinux context blocks access despite correct DAC permissions.
- B. Review SELinux denials in the audit log **(key)**  
  _Rationale:_ Correct: audit denials reveal exactly what SELinux blocked.
- C. Set SELinux to permissive permanently to fix it  
  _Rationale:_ Disabling enforcement removes protection instead of fixing the context.
- D. Delete the web content  
  _Rationale:_ Deleting content does not resolve a context problem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
