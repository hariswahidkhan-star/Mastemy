# Python Automation and Command-Line Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0904` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Python Automation and Command-Line Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. CLI design and argument parsing
2. Interacting with the system
3. Configuration, environment and logging
4. Robust automation
5. Text, data and scheduling
6. Packaging, distribution and testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 CLI design and argument parsing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design a subcommand structure for a file tool; (2) Parse flags and positional args with argparse
- Common misconception addressed: Rolling your own sys.argv parsing instead of argparse
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Designing good command-line interfaces | 80 | 6 |
| M01L02 | argparse: arguments, options and subcommands | 80 | 6 |

### M02 Interacting with the system (MASTEMY-DESIGN 16%)

- Worked applications: (1) Walk a directory tree with pathlib and filter by suffix; (2) Shell out to a tool with subprocess and capture output
- Common misconception addressed: Building shell commands by string concatenation (injection risk)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | pathlib, files and directories | 80 | 6 |
| M02L02 | Running processes with subprocess | 80 | 6 |

### M03 Configuration, environment and logging (MASTEMY-DESIGN 16%)

- Worked applications: (1) Resolve config from file, env and flags with clear precedence; (2) Add leveled logging instead of scattered prints
- Common misconception addressed: Using print for diagnostics that should be logs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Config files, environment variables and precedence | 80 | 6 |
| M03L02 | The logging module and structured output | 80 | 6 |

### M04 Robust automation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Return correct exit codes so scripts can chain safely; (2) Make a batch operation idempotent and resumable
- Common misconception addressed: Swallowing errors so a failed batch looks successful
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Error handling, exit codes and retries | 80 | 6 |
| M04L02 | Signals, timeouts and idempotency | 80 | 6 |

### M05 Text, data and scheduling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Transform a CSV report and write a summary; (2) Schedule a job and make it safe to run repeatedly
- Common misconception addressed: Writing a greedy regex that matches far more than intended
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Parsing text, CSV and JSON; regex basics | 80 | 6 |
| M05L02 | Scheduling and automating recurring jobs | 80 | 6 |

### M06 Packaging, distribution and testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Expose the tool as a console_scripts entry point; (2) Test the CLI by invoking it and asserting output and exit code
- Common misconception addressed: Shipping a script with no install path or tests
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Entry points, pyproject and installable commands | 80 | 6 |
| M06L02 | Testing CLIs and automation reliably | 80 | 6 |

## Integrative case

Build a production-quality CLI tool that batch-renames and tags files: parse subcommands and flags, read config, log progress, handle errors and signals, package it as an installable command, and cover it with tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0904-final-protected | 30 | 30 | yes |
| MST-0904-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CLI design and argument parsing | 5 |
| Interacting with the system | 5 |
| Configuration, environment and logging | 5 |
| Robust automation | 5 |
| Text, data and scheduling | 5 |
| Packaging, distribution and testing | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0904-Q0001** (single-answer, Select ONE) Why build shell commands with a list of arguments to subprocess rather than one concatenated string with shell=True?

- A. It avoids shell-injection and quoting bugs by passing arguments directly to the program **(key)**  
  _Rationale:_ Correct: passing an argument list bypasses the shell, so untrusted values cannot inject commands.
- B. It runs the command faster  
  _Rationale:_ Speed is not the reason; safety and correctness are.
- C. It is the only way to capture output  
  _Rationale:_ Output capture works either way; the list form is about safety.
- D. It automatically retries failed commands  
  _Rationale:_ subprocess does not add retries; that is your logic.

**MST-0904-Q0002** (multiple-answer, Select ALL that apply) Which practices make a CLI tool well-behaved in automation pipelines? (Select TWO)

- A. Return a non-zero exit code on failure so callers can detect it **(key)**  
  _Rationale:_ Correct: exit codes are how shells and scripts know whether a step succeeded.
- B. Send diagnostics to logs/stderr and keep stdout for real output **(key)**  
  _Rationale:_ Correct: separating diagnostics from results lets output be piped cleanly.
- C. Always exit 0 so the pipeline never stops  
  _Rationale:_ Masking failures with exit 0 hides real errors from the pipeline.
- D. Print progress bars into stdout that is being piped to a file  
  _Rationale:_ Progress noise in piped stdout corrupts the real output.

**MST-0904-Q0003** (single-answer, Select ONE) What makes a batch file operation idempotent?

- A. Running it again after a partial failure produces the same end state without duplicating work **(key)**  
  _Rationale:_ Correct: idempotency means re-running converges on the same result, which makes retries safe.
- B. It can only ever be run once  
  _Rationale:_ That is the opposite of idempotency.
- C. It runs twice as fast the second time  
  _Rationale:_ Speed is unrelated to idempotency.
- D. It disables logging on the second run  
  _Rationale:_ Logging behaviour is unrelated to idempotency.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
