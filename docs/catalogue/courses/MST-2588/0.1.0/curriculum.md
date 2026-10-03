# Bash and Shell Scripting: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2588` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Bash and Shell Scripting: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate the filesystem and run commands from the shell
2. Write and execute a Bash script with a shebang
3. Use variables, quoting and command substitution correctly
4. Apply redirection and pipes to combine commands
5. Write conditionals and loops in Bash
6. Use common text tools like grep, cut and sort

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Shell basics (20% (design weight), design weight)

- Worked applications: (1) Make a script executable and run it; (2) Check the exit status with $?
- Common misconception addressed: Forgetting the shebang line
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Navigating with cd, ls, pwd | 64 | 4 |
| M01L02 | Running commands and exit status | 64 | 4 |
| M01L03 | Shebang and chmod +x | 64 | 4 |

### M02 Variables and quoting (20% (design weight), design weight)

- Worked applications: (1) Capture command output into a variable; (2) Quote a path with spaces
- Common misconception addressed: Leaving a variable unquoted and word-splitting it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Assigning and expanding variables | 64 | 4 |
| M02L02 | Single vs double quotes | 64 | 4 |
| M02L03 | Command substitution with $( ) | 64 | 4 |

### M03 Redirection and pipes (20% (design weight), design weight)

- Worked applications: (1) Redirect errors and output to a log; (2) Pipe ls into grep
- Common misconception addressed: Confusing > which truncates with >> which appends
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | stdout, stderr and files | 64 | 4 |
| M03L02 | > , >> and 2>&1 | 64 | 4 |
| M03L03 | Pipes between commands | 64 | 4 |

### M04 Conditionals and loops (20% (design weight), design weight)

- Worked applications: (1) Loop over files in a directory; (2) Branch on whether a file exists
- Common misconception addressed: Using = for numeric comparison instead of -eq
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | if and test [ ] | 64 | 4 |
| M04L02 | for and while loops | 64 | 4 |
| M04L03 | Exit codes in conditions | 64 | 4 |

### M05 Text tools (20% (design weight), design weight)

- Worked applications: (1) Count matching lines with grep -c; (2) Extract a column with cut
- Common misconception addressed: Assuming grep matches whole lines only
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | grep basics | 64 | 4 |
| M05L02 | cut, sort, uniq | 64 | 4 |
| M05L03 | wc and head/tail | 64 | 4 |

## Integrative case

A beginner writes a Bash log-tidy script: iterate over files with a for loop, filter matching lines with grep, quote paths safely, redirect output to a dated log, and report success via exit status.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2588-final-protected | 40 | 40 | yes |
| MST-2588-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Shell basics | 8 |
| Variables and quoting | 8 |
| Redirection and pipes | 8 |
| Conditionals and loops | 8 |
| Text tools | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2588-Q0001** (single-answer, Select ONE) Why should you double-quote a variable expansion like "$file" in Bash?

- A. To prevent word splitting and glob expansion when the value contains spaces or wildcards **(key)**  
  _Rationale:_ Unquoted expansions are split on whitespace and globbed, breaking paths.
- B. Because single quotes also expand variables  
  _Rationale:_ Single quotes do not expand variables; double quotes do.
- C. To make the variable read-only  
  _Rationale:_ Quoting does not make a variable read-only.
- D. Because Bash cannot read unquoted variables at all  
  _Rationale:_ It reads them, but may split/glob the result.

**MST-2588-Q0002** (multiple-answer, Select TWO) Select TWO correct statements about redirection in Bash.

- A. > truncates (overwrites) the target file **(key)**  
  _Rationale:_ A single > replaces the file's contents.
- B. >> appends to the target file **(key)**  
  _Rationale:_ Double >> adds to the end without truncating.
- C. 2>&1 redirects stdout into stderr  
  _Rationale:_ 2>&1 sends stderr to wherever stdout currently points.
- D. A pipe | connects a command's stdin to the previous stdout's error stream  
  _Rationale:_ A pipe connects stdout of one to stdin of the next, not stderr.

**MST-2588-Q0003** (single-answer, Select ONE) What does command substitution $(command) do?

- A. Runs the command and substitutes its standard output into the surrounding expression **(key)**  
  _Rationale:_ $(...) captures the command's stdout for use inline.
- B. Runs the command in the background  
  _Rationale:_ Backgrounding uses &, not $(...).
- C. Comments out the command  
  _Rationale:_ $(...) executes rather than comments.
- D. Redirects the command's output to a file  
  _Rationale:_ Redirection uses > ; $(...) captures into an expression.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
