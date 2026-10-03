# Bash and Shell Scripting: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2589` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Bash and Shell Scripting: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write robust scripts with functions, arguments and return codes
2. Use arrays and parameter expansion effectively
3. Apply set -euo pipefail and defensive scripting
4. Process text with sed and awk
5. Handle options with getopts and build usable CLIs
6. Manage signals, traps and temporary files

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Functions and arguments (20% (design weight), design weight)

- Worked applications: (1) Write a function that returns a status; (2) Pass and shift arguments
- Common misconception addressed: Confusing a function's return code with its stdout
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining functions and local vars | 64 | 4 |
| M01L02 | Positional parameters and $@ | 64 | 4 |
| M01L03 | Return codes vs output | 64 | 4 |

### M02 Arrays and expansion (20% (design weight), design weight)

- Worked applications: (1) Provide a default with ${var:-}; (2) Iterate an array safely with "${arr[@]}"
- Common misconception addressed: Expanding an array without quotes and splitting elements
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Indexed and associative arrays | 64 | 4 |
| M02L02 | Parameter expansion ${var:-default} | 64 | 4 |
| M02L03 | Substring and pattern expansion | 64 | 4 |

### M03 Defensive scripting (20% (design weight), design weight)

- Worked applications: (1) Add set -euo pipefail and fix fallout; (2) Fail fast on an unset variable
- Common misconception addressed: Assuming set -e catches every possible error
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | set -e, -u, -o pipefail | 64 | 4 |
| M03L02 | Error handling patterns | 64 | 4 |
| M03L03 | ShellCheck and style | 64 | 4 |

### M04 sed and awk (20% (design weight), design weight)

- Worked applications: (1) Sum a column with awk; (2) Edit a config in place with sed
- Common misconception addressed: Using sed where a structured parser is needed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | sed substitution and addressing | 64 | 4 |
| M04L02 | awk fields and patterns | 64 | 4 |
| M04L03 | Combining with pipes | 64 | 4 |

### M05 CLI, signals and traps (20% (design weight), design weight)

- Worked applications: (1) Parse flags with getopts; (2) Clean up a temp file on EXIT with trap
- Common misconception addressed: Leaving temp files behind on interrupt
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | getopts for options | 64 | 4 |
| M05L02 | trap and cleanup | 64 | 4 |
| M05L03 | mktemp and safe temp files | 64 | 4 |

## Integrative case

A developer writes a Bash backup CLI: parse flags with getopts, validate inputs under set -euo pipefail, summarise sizes with awk, and clean up temporary files via a trap on EXIT.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2589-final-protected | 40 | 40 | yes |
| MST-2589-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Functions and arguments | 8 |
| Arrays and expansion | 8 |
| Defensive scripting | 8 |
| sed and awk | 8 |
| CLI, signals and traps | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2589-Q0001** (single-answer, Select ONE) What does set -o pipefail change about a pipeline's exit status?

- A. The pipeline fails if any command in it fails, not just the last **(key)**  
  _Rationale:_ Without pipefail only the last command's status counts; pipefail surfaces earlier failures.
- B. It makes every pipeline always succeed  
  _Rationale:_ It is the opposite: it propagates failures.
- C. It disables pipes entirely  
  _Rationale:_ Pipes still work; only status handling changes.
- D. It merges stderr into stdout  
  _Rationale:_ That is 2>&1, unrelated to pipefail.

**MST-2589-Q0002** (multiple-answer, Select TWO) Select TWO reasons to quote "${arr[@]}" when iterating a Bash array.

- A. Each element is preserved as a single word even if it contains spaces **(key)**  
  _Rationale:_ Quoting [@] yields one word per element.
- B. It prevents elements from being split or glob-expanded **(key)**  
  _Rationale:_ Quoting stops word-splitting and globbing of element contents.
- C. It sorts the array alphabetically  
  _Rationale:_ Quoting does not sort.
- D. It converts the array to an associative array  
  _Rationale:_ Quoting does not change the array type.

**MST-2589-Q0003** (single-answer, Select ONE) Why use trap 'cleanup' EXIT in a script that creates a temporary file?

- A. It runs cleanup when the script exits for any reason, removing the temp file **(key)**  
  _Rationale:_ An EXIT trap ensures cleanup on normal exit, errors and signals.
- B. It prevents the script from ever exiting  
  _Rationale:_ The trap runs at exit; it does not block exit.
- C. It disables error checking  
  _Rationale:_ trap does not affect set -e behaviour.
- D. It automatically compresses the temp file  
  _Rationale:_ trap runs a handler; it does not compress.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
