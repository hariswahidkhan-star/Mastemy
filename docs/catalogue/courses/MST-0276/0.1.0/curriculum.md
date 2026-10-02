# LPI Linux Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0276` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | LPI (Linux Professional Institute) (no affiliation or endorsement) |
| Exam code | (none published / not resolved) |
| Version basis | unresolved - official syllabus not verified (issuer egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - official domains, weightings, objective IDs, item counts and durations NOT verified; modules are Mastemy design groupings |
| Legacy IDs | (none) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the Linux and open-source landscape, major distributions and common applications
2. Operate the Linux command line to navigate the filesystem and manage files and directories
3. Explain users, groups, permissions and basic security on a Linux system
4. Use basic shell scripting and common command-line tools to process text and automate tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance, speaking, essay, hands-on or simulation tasks) are not reproduced here; see the exam-version record.

## Modules

> Module groupings are Mastemy design decisions. The official blueprint domains and weightings were not verified (issuer site egress blocked); no percentage weights are claimed.

### M01 The Linux and open-source community (weight not published - design grouping)

- Worked applications: (1) Map five everyday computing tasks to equivalent Linux command-line operations; (2) Compare two major distributions for a given use case and justify a choice
- Common misconception addressed: Assuming Linux is a single product rather than a kernel with many distributions
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Linux evolution and popular operating systems | 120 | 6 |
| M01L02 | Major open-source applications | 120 | 6 |
| M01L03 | Open-source software and licensing | 120 | 6 |
| M01L04 | ICT skills and working in Linux | 120 | 6 |

### M02 Finding your way on a Linux system (weight not published - design grouping)

- Worked applications: (1) Navigate an unfamiliar directory tree using pwd, cd, ls and wildcards to locate a file; (2) Build a sequence of cp/mv/rm commands to reorganise a project folder safely
- Common misconception addressed: Believing the current working directory matters when an absolute path is given
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Command line basics | 120 | 6 |
| M02L02 | Using the command line to get help | 120 | 6 |
| M02L03 | Using directories and listing files | 120 | 6 |
| M02L04 | Creating, moving and deleting files | 120 | 6 |

### M03 Users, permissions and the shell (weight not published - design grouping)

- Worked applications: (1) Set file and directory permissions so a shared group can collaborate but others cannot; (2) Write a short shell script that loops over files and renames them by a pattern
- Common misconception addressed: Confusing the permission for a directory with the permission for the files inside it
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Archiving and compression | 120 | 6 |
| M03L02 | Scripting basics | 120 | 6 |
| M03L03 | Understanding computer hardware | 120 | 6 |
| M03L04 | Managing users, groups and file permissions | 120 | 6 |

## Integrative case

A small design studio switches its file server to Linux: pick a distribution, set up a shared project directory with correct group permissions, and write a short backup script, then explain the choices to non-technical owners.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0276-practice-form-A | 54 | 54 | yes |
| MST-0276-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0276-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0276-final-protected | 54 | 54 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| The Linux and open-source community | 18 |
| Finding your way on a Linux system | 18 |
| Users, permissions and the shell | 18 |

Minimum reviewed item bank: 612 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0276-Q0001** (single-answer, Select ONE) Which command displays the absolute path of the directory you are currently working in?

- A. pwd **(key)**  
  _Rationale:_ Correct: pwd prints the full path of the present working directory.
- B. cd  
  _Rationale:_ cd changes the working directory; it does not print the current path.
- C. ls  
  _Rationale:_ ls lists directory contents, not the current path.
- D. whoami  
  _Rationale:_ whoami prints the current username, not the directory.

**MST-0276-Q0002** (single-answer, Select ONE) A file listing shows permissions -rwxr-x---. Which statement is true about the 'others' category?

- A. Others have read and execute but not write  
  _Rationale:_ Those are the group bits (r-x); the others bits are the final three (---).
- B. Others have no access to the file **(key)**  
  _Rationale:_ Correct: the final three characters --- mean others have no read, write or execute permission.
- C. Others have full access  
  _Rationale:_ Full access would be rwx in the last triad, not ---.
- D. Others can write but not read  
  _Rationale:_ Write without read would be -w-, not ---.

**MST-0276-Q0003** (multiple-answer, Select TWO) Select TWO characteristics that are true of free and open-source software licences.

- A. The source code is available to study and modify **(key)**  
  _Rationale:_ Correct: access to source for study and modification is a defining trait of open-source licences.
- B. Redistribution of the software is permitted under the licence terms **(key)**  
  _Rationale:_ Correct: open-source licences grant the right to redistribute, subject to their conditions.
- C. The software may never be used for commercial purposes  
  _Rationale:_ Open-source licences generally do not forbid commercial use; that would fail the open-source definition.
- D. Only the original author may ever compile the code  
  _Rationale:_ Anyone receiving the source may compile it; this is central to open source.
- E. The licence always forbids charging any fee  
  _Rationale:_ Open-source licences allow charging a fee, for example for distribution or support.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
