# Linux Command Line

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1578` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate the filesystem and manage files from the shell
2. Manipulate text with pipes, filters and redirection
3. Manage processes, jobs and system resources
4. Set permissions, ownership and basic security
5. Write and run simple shell scripts
6. Use package, service and network basics for daily work

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Filesystem and navigation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Locate files matching a pattern with find; (2) Inspect file metadata with stat and ls
- Common misconception addressed: Confusing absolute and relative paths
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Paths, navigation and file management | 168 | 8 |
| M01L02 | Finding files and inspecting metadata | 168 | 8 |

### M02 Text processing and pipelines (MASTEMY-DESIGN 20%)

- Worked applications: (1) Extract fields from a log with awk; (2) Build a pipeline with grep and sort
- Common misconception addressed: Forgetting that pipes pass text, not files
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pipes, redirection and filters | 168 | 8 |
| M02L02 | grep, sed and awk basics | 168 | 8 |

### M03 Processes and resources (MASTEMY-DESIGN 20%)

- Worked applications: (1) Find and terminate a runaway process; (2) Check disk usage with df and du
- Common misconception addressed: Using kill -9 as the first resort
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Processes, jobs and signals | 168 | 8 |
| M03L02 | Monitoring CPU, memory and disk | 168 | 8 |

### M04 Permissions and security basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set least-privilege permissions on a directory; (2) Add a user to a group correctly
- Common misconception addressed: Running everything as root
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Users, groups and permissions | 168 | 8 |
| M04L02 | sudo, ownership and SSH keys | 168 | 8 |

### M05 Scripting and system basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a script with arguments and a loop; (2) Enable and check a systemd service
- Common misconception addressed: Not quoting variables in scripts
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Shell scripting fundamentals | 168 | 8 |
| M05L02 | Packages, services and networking basics | 168 | 8 |

## Integrative case

Given SSH access to a fresh server, set up a working account, inspect running services, find and rotate a large log file with shell tools, and script a small recurring cleanup task.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1578-final-protected | 25 | 25 | yes |
| MST-1578-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Filesystem and navigation | 5 |
| Text processing and pipelines | 5 |
| Processes and resources | 5 |
| Permissions and security basics | 5 |
| Scripting and system basics | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1578-Q0001** (single-answer, Select ONE) What does the pipe operator | do between two commands?

- A. Sends the first command's standard output to the second's standard input **(key)**  
  _Rationale:_ Correct: pipes connect stdout to stdin.
- B. Runs both commands in parallel with no connection  
  _Rationale:_ They are connected by the pipe.
- C. Writes the first command's output to a file  
  _Rationale:_ That is redirection with >.
- D. Comments out the second command  
  _Rationale:_ Pipe does not comment anything.

**MST-1578-Q0002** (multiple-answer, Select TWO) Which TWO are good security practices on a Linux server? (Select TWO.)

- A. Grant the least privilege needed for a task **(key)**  
  _Rationale:_ Correct: least privilege limits blast radius.
- B. Use SSH keys instead of password logins where possible **(key)**  
  _Rationale:_ Correct: keys are stronger than passwords.
- C. Run all daily work as the root user  
  _Rationale:_ Routine root use is risky.
- D. Set 777 on all files for convenience  
  _Rationale:_ World-writable files are a security hole.

**MST-1578-Q0003** (single-answer, Select ONE) Why quote variables like "$file" in a shell script?

- A. To prevent word splitting and globbing on spaces or special characters **(key)**  
  _Rationale:_ Correct: quoting protects values with spaces or wildcards.
- B. To make the script run faster  
  _Rationale:_ Quoting is about correctness, not speed.
- C. To convert the variable to a number  
  _Rationale:_ Quoting does not change type.
- D. Because unquoted variables are a syntax error  
  _Rationale:_ They are not a syntax error, just unsafe.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
