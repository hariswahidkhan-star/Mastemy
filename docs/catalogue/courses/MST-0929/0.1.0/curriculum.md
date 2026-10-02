# Bash: Linux Shell Scripting and Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0929` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-BS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Bash: Linux Shell Scripting and Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Shell basics and the command line
2. Variables, quoting and expansion
3. Control flow and tests
4. Functions, arguments and scripts
5. Text processing and pipelines
6. Robust automation and scheduling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Shell basics and the command line (MASTEMY-DESIGN 17%)

- Worked applications: (1) Navigate the filesystem and inspect files using ls, cd, cat and less; (2) Compose two commands with a pipe to filter output
- Common misconception addressed: Believing the shell and the operating system are the same program
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The shell, terminals and interpreters | 80 | 6 |
| M01L02 | Paths, globbing and command structure | 80 | 6 |

### M02 Variables, quoting and expansion (MASTEMY-DESIGN 17%)

- Worked applications: (1) Store command output in a variable with command substitution; (2) Explain why unquoted variables break on spaces
- Common misconception addressed: Assuming double and single quotes behave identically
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Variables, parameters and environment | 80 | 6 |
| M02L02 | Quoting rules and word splitting | 80 | 6 |

### M03 Control flow and tests (MASTEMY-DESIGN 17%)

- Worked applications: (1) Branch on a file test with if/elif/else; (2) Loop over a list of files with for and while
- Common misconception addressed: Treating a non-zero exit status as an error in every context
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals and the test command | 80 | 6 |
| M03L02 | Loops, case and exit status | 80 | 6 |

### M04 Functions, arguments and scripts (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a reusable function that validates its arguments; (2) Handle positional parameters and defaults in a script
- Common misconception addressed: Expecting function variables to be local by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Functions and scope | 80 | 6 |
| M04L02 | Positional parameters and argument parsing | 80 | 6 |

### M05 Text processing and pipelines (MASTEMY-DESIGN 16%)

- Worked applications: (1) Extract and reformat columns from a log file with awk; (2) Perform a safe in-place substitution with sed
- Common misconception addressed: Reaching for a loop when grep, sed or awk would do the job
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | grep, sed and awk essentials | 80 | 6 |
| M05L02 | Composing robust pipelines | 80 | 6 |

### M06 Robust automation and scheduling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add error handling with set -euo pipefail and traps; (2) Schedule a script with cron and make it idempotent
- Common misconception addressed: Assuming a script that works interactively will work under cron
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Error handling, traps and logging | 80 | 6 |
| M06L02 | Scheduling, environment and idempotency | 80 | 6 |

## Integrative case

Automate a nightly backup for a small web server: write a Bash script that archives selected directories, rotates old archives, logs each run, exits with meaningful status codes, and is scheduled with cron; then make it safe to re-run.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0929-final-protected | 30 | 30 | yes |
| MST-0929-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0929-Q0001** (single-answer, Select ONE) Which command substitution captures the output of `date` into the variable `now` in modern Bash?

- A. now=$(date) **(key)**  
  _Rationale:_ Correct: $(...) runs the command and assigns its standard output to the variable.
- B. now=date  
  _Rationale:_ This assigns the literal string 'date', not the command's output.
- C. now=<date>  
  _Rationale:_ Angle brackets are used for redirection, not command substitution.
- D. now==$(date)  
  _Rationale:_ == is a comparison operator; assignment uses a single =.

**MST-0929-Q0002** (multiple-answer, Select TWO) A script must stop on the first error and treat unset variables as failures. Which TWO options of `set` help enforce this? (Select TWO)

- A. set -e (errexit) **(key)**  
  _Rationale:_ Correct: -e makes the script exit when a command returns a non-zero status.
- B. set -u (nounset) **(key)**  
  _Rationale:_ Correct: -u makes referencing an unset variable an error.
- C. set -x (xtrace)  
  _Rationale:_ -x prints commands for debugging; it does not change error behaviour.
- D. set -v (verbose)  
  _Rationale:_ -v echoes input lines; it does not affect error handling.

**MST-0929-Q0003** (single-answer, Select ONE) Why can a script that runs fine in an interactive shell fail when run by cron?

- A. cron runs with a minimal environment and a different PATH **(key)**  
  _Rationale:_ Correct: cron does not load the interactive shell profile, so PATH and variables differ.
- B. cron cannot execute Bash scripts  
  _Rationale:_ cron can run any executable, including Bash scripts.
- C. cron always runs as a different CPU architecture  
  _Rationale:_ cron runs on the same machine and architecture.
- D. cron strips all comments from the script  
  _Rationale:_ cron does not modify the script contents.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
