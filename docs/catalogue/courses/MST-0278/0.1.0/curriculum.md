# LPI LPIC-1: Exam 102

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0278` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | LPI (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Use shells and shell scripting to automate tasks
2. Manage users, groups and system administration tasks
3. Configure essential system services (time, logging, mail, printing)
4. Apply networking fundamentals and basic security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Shells and scripting (not published - design grouping)

- Worked applications: (1) Write a short script that loops over files and reports a condition; (2) Customise the shell environment with variables and aliases
- Common misconception addressed: Forgetting that uninitialised shell variables expand to an empty string
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Customise and use the shell environment | 100 | 6 |
| M01L02 | Customise or write simple scripts | 100 | 6 |
| M01L03 | Conditionals, loops and exit status | 100 | 6 |
| M01L04 | SQL data management basics | 100 | 6 |

### M02 Administrative tasks and services (not published - design grouping)

- Worked applications: (1) Create a user and add them to the correct groups; (2) Schedule a job with cron and verify it ran
- Common misconception addressed: Confusing a user's primary group with supplementary groups
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Manage user and group accounts | 100 | 6 |
| M02L02 | Automate tasks with cron and at | 100 | 6 |
| M02L03 | Localisation and internationalisation | 100 | 6 |
| M02L04 | System time and system logging | 100 | 6 |

### M03 Networking fundamentals and security (not published - design grouping)

- Worked applications: (1) Diagnose a connectivity problem using ip and ping; (2) Harden SSH access for a server
- Common misconception addressed: Believing a firewall rule takes effect without being saved or reloaded
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Fundamentals of internet protocols | 100 | 6 |
| M03L02 | Basic network configuration and troubleshooting | 100 | 6 |
| M03L03 | Configure client-side DNS | 100 | 6 |
| M03L04 | Perform security administration and secure data with encryption | 100 | 6 |

## Integrative case

An administrator automates routine jobs with a shell script, manages users and scheduled tasks, configures logging and time services, and secures a host with basic networking and SSH settings.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0278-practice-form-A | 45 | 45 | yes |
| MST-0278-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0278-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0278-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Shells and scripting | 15 |
| Administrative tasks and services | 15 |
| Networking fundamentals and security | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0278-Q0001** (single-answer, Select ONE) Which file traditionally stores local user account information (excluding passwords) on a Linux system?

- A. /etc/passwd **(key)**  
  _Rationale:_ Correct: /etc/passwd holds user account entries; hashed passwords live in /etc/shadow.
- B. /etc/hostname  
  _Rationale:_ /etc/hostname stores the system hostname, not user accounts.
- C. /etc/fstab  
  _Rationale:_ /etc/fstab describes filesystems to mount, not user accounts.
- D. /etc/crontab  
  _Rationale:_ /etc/crontab defines scheduled jobs, not user accounts.

**MST-0278-Q0002** (single-answer, Select ONE) What is the primary purpose of cron on a Linux system?

- A. Run commands automatically on a recurring schedule **(key)**  
  _Rationale:_ Correct: cron executes jobs at scheduled times defined in crontabs.
- B. Manage software packages  
  _Rationale:_ Package management is handled by apt/dpkg or yum/rpm, not cron.
- C. Configure network interfaces  
  _Rationale:_ Network configuration uses tools like ip or NetworkManager, not cron.
- D. Encrypt filesystems  
  _Rationale:_ Encryption is handled by tools such as LUKS, not cron.

**MST-0278-Q0003** (multiple-answer, Select TWO) Select TWO practices that improve SSH server security.

- A. Disabling direct root login over SSH **(key)**  
  _Rationale:_ Correct: disabling root login reduces the risk of a high-value brute-force target.
- B. Using key-based authentication instead of passwords **(key)**  
  _Rationale:_ Correct: key-based auth is stronger than reusable passwords.
- C. Allowing empty passwords for convenience  
  _Rationale:_ Empty passwords are a serious security weakness.
- D. Running the SSH daemon as every user simultaneously  
  _Rationale:_ This is not a real or meaningful configuration.
- E. Sharing one private key among all administrators  
  _Rationale:_ Shared private keys remove accountability and increase risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
