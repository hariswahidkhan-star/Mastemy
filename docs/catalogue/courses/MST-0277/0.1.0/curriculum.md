# LPI LPIC-1: Exam 101

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0277` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

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

1. Describe system architecture and Linux installation/package management
2. Perform GNU and Unix command-line operations and text processing
3. Manage files, filesystems and the filesystem hierarchy
4. Manage devices, boot and basic hardware configuration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 System architecture and package management (not published - design grouping)

- Worked applications: (1) Choose between dpkg/apt and rpm/yum for a given distribution task; (2) Interpret hardware and boot information from system logs
- Common misconception addressed: Confusing a package manager front end (apt) with the low-level tool (dpkg)
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Determine and configure hardware settings | 100 | 6 |
| M01L02 | Boot the system and boot managers | 100 | 6 |
| M01L03 | Change runlevels / boot targets and shut down | 100 | 6 |
| M01L04 | Debian and RPM package management | 100 | 6 |

### M02 GNU and Unix commands (not published - design grouping)

- Worked applications: (1) Build a pipeline with grep, sort and cut to extract fields; (2) Use regular expressions to match patterns in a log file
- Common misconception addressed: Assuming a pipe passes files rather than a stream of standard output
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Work on the command line | 100 | 6 |
| M02L02 | Process text streams using filters | 100 | 6 |
| M02L03 | Streams, pipes and redirects | 100 | 6 |
| M02L04 | Create, monitor and manage processes | 100 | 6 |

### M03 Filesystems and the filesystem hierarchy (not published - design grouping)

- Worked applications: (1) Set permissions and ownership to meet an access requirement; (2) Mount and unmount a filesystem and verify with df
- Common misconception addressed: Believing chmod changes who owns a file rather than its permission bits
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Create partitions and filesystems | 100 | 6 |
| M03L02 | Maintain the integrity of filesystems | 100 | 6 |
| M03L03 | Control mounting and unmounting of filesystems | 100 | 6 |
| M03L04 | Manage file permissions, ownership and links | 100 | 6 |

## Integrative case

An administrator sets up a new Linux workstation: install and manage packages, work confidently at the shell with pipes and filters, lay out and mount filesystems, and configure boot and devices correctly.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0277-practice-form-A | 45 | 45 | yes |
| MST-0277-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0277-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0277-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| System architecture and package management | 15 |
| GNU and Unix commands | 15 |
| Filesystems and the filesystem hierarchy | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0277-Q0001** (single-answer, Select ONE) Which command displays the amount of free and used disk space on mounted filesystems?

- A. df **(key)**  
  _Rationale:_ Correct: df reports filesystem disk space usage.
- B. du  
  _Rationale:_ du estimates file and directory space usage, not free space per filesystem.
- C. ps  
  _Rationale:_ ps reports running processes, not disk space.
- D. top  
  _Rationale:_ top shows process and system activity, not filesystem free space.

**MST-0277-Q0002** (single-answer, Select ONE) In a shell pipeline, what does the pipe symbol ( | ) do?

- A. Sends the standard output of one command as the standard input of the next **(key)**  
  _Rationale:_ Correct: a pipe connects one command's stdout to the next command's stdin.
- B. Runs two commands at the same time with no connection  
  _Rationale:_ That describes backgrounding with &, not a pipe.
- C. Redirects output into a file  
  _Rationale:_ Redirecting to a file uses > or >>, not a pipe.
- D. Comments out the rest of the line  
  _Rationale:_ Comments use #, not the pipe symbol.

**MST-0277-Q0003** (multiple-answer, Select TWO) Select TWO commands commonly used as part of Debian package management.

- A. apt **(key)**  
  _Rationale:_ Correct: apt is a high-level Debian package management front end.
- B. dpkg **(key)**  
  _Rationale:_ Correct: dpkg is the low-level Debian package tool.
- C. yum  
  _Rationale:_ yum manages RPM packages on Red Hat-family systems, not Debian.
- D. systemctl  
  _Rationale:_ systemctl controls services and units, not package management.
- E. grep  
  _Rationale:_ grep searches text; it is not a package management tool.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
