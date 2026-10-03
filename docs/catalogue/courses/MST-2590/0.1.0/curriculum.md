# Bash and Shell Scripting: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2590` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Bash and Shell Scripting: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Engineer reliable, portable scripts across shells and systems
2. Use advanced parameter expansion and here-documents
3. Handle concurrency with background jobs and wait
4. Process streams efficiently and avoid common pitfalls
5. Debug scripts with tracing and ShellCheck-driven hardening
6. Integrate scripts into pipelines, cron and CI safely

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Portability and robustness (20% (design weight), design weight)

- Worked applications: (1) Make a script idempotent and re-runnable; (2) Guard a Bash-only feature
- Common misconception addressed: Assuming bashisms work under /bin/sh
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | POSIX vs Bash features | 64 | 4 |
| M01L02 | Strict mode and idempotency | 64 | 4 |
| M01L03 | Exit codes and conventions | 64 | 4 |

### M02 Advanced expansion and heredocs (20% (design weight), design weight)

- Worked applications: (1) Template a config with a heredoc; (2) Lowercase a variable with expansion
- Common misconception addressed: Letting an unquoted heredoc expand unintended variables
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pattern and case modification expansions | 64 | 4 |
| M02L02 | Here-documents and here-strings | 64 | 4 |
| M02L03 | Indirect expansion | 64 | 4 |

### M03 Concurrency (20% (design weight), design weight)

- Worked applications: (1) Run tasks in parallel and wait; (2) Cap concurrency to N jobs
- Common misconception addressed: Spawning unbounded background jobs and exhausting resources
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Background jobs with & | 64 | 4 |
| M03L02 | wait and job control | 64 | 4 |
| M03L03 | Limiting parallelism | 64 | 4 |

### M04 Stream processing (20% (design weight), design weight)

- Worked applications: (1) Read a file line by line with while read -r; (2) Avoid a subshell that loses variables in a pipe
- Common misconception addressed: Looping over command output with for and splitting on spaces
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading lines safely with read -r | 64 | 4 |
| M04L02 | Avoiding useless cat and subshell traps | 64 | 4 |
| M04L03 | Large-input performance | 64 | 4 |

### M05 Debugging and integration (20% (design weight), design weight)

- Worked applications: (1) Trace a failing script with set -x; (2) Fix a cron PATH assumption
- Common misconception addressed: Assuming interactive environment settings exist in cron
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | set -x and BASH tracing | 64 | 4 |
| M05L02 | ShellCheck-driven fixes | 64 | 4 |
| M05L03 | cron and CI pitfalls | 64 | 4 |

## Integrative case

An engineer hardens a Bash deployment script: make it idempotent and POSIX-aware, template config with heredocs, run health checks in parallel with bounded jobs, and trace failures with set -x before it runs in CI.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2590-final-protected | 40 | 40 | yes |
| MST-2590-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Portability and robustness | 8 |
| Advanced expansion and heredocs | 8 |
| Concurrency | 8 |
| Stream processing | 8 |
| Debugging and integration | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2590-Q0001** (single-answer, Select ONE) Why can piping into a while-read loop lose variable changes in some shells?

- A. The piped loop runs in a subshell whose variable changes do not propagate to the parent **(key)**  
  _Rationale:_ A pipeline segment runs in a subshell; its variable mutations are local to it.
- B. read -r corrupts the variables  
  _Rationale:_ read -r preserves backslashes; it does not lose state.
- C. while loops cannot assign variables  
  _Rationale:_ They can; the issue is subshell scope.
- D. The loop never executes when piped  
  _Rationale:_ It executes, but in a subshell.

**MST-2590-Q0002** (multiple-answer, Select TWO) Select TWO practices that make a shell script more robust.

- A. Enabling set -euo pipefail at the top **(key)**  
  _Rationale:_ Strict mode surfaces errors, unset variables and pipeline failures early.
- B. Using read -r to avoid mangling backslashes **(key)**  
  _Rationale:_ -r stops read from interpreting backslash escapes.
- C. Parsing filenames by splitting command output with for on whitespace  
  _Rationale:_ That breaks on spaces and newlines in names.
- D. Relying on bashisms when the shebang is /bin/sh  
  _Rationale:_ That breaks portability under a POSIX shell.

**MST-2590-Q0003** (single-answer, Select ONE) What is the purpose of wait after launching background jobs with &?

- A. It blocks until the specified (or all) background jobs finish before continuing **(key)**  
  _Rationale:_ wait synchronises the script with its background children.
- B. It kills all background jobs immediately  
  _Rationale:_ wait waits for completion; it does not kill.
- C. It runs the next command in the background  
  _Rationale:_ & backgrounds; wait foregrounds the synchronisation.
- D. It disables job control  
  _Rationale:_ wait does not disable job control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
