# Perl: Text Processing and System Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0928` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Perl: Text Processing and System Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Perl basics and scalar data
2. Arrays, hashes and context
3. Regular expressions and text processing
4. File I/O and processing streams
5. Subroutines, references and modules
6. System automation and one-liners

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Perl basics and scalar data (MASTEMY-DESIGN 16%)

- Worked applications: (1) Interpolate variables into a formatted message; (2) Turn on strict and warnings and fix the errors
- Common misconception addressed: Omitting use strict and relying on implicit globals
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Scalars, strings, numbers and interpolation | 80 | 6 |
| M01L02 | Operators, conditionals and use strict/warnings | 80 | 6 |

### M02 Arrays, hashes and context (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a hash counting items from a list; (2) Explain why an array in scalar context yields its length
- Common misconception addressed: Expecting an array in scalar context to return its first element
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Arrays, slices and list operations | 80 | 6 |
| M02L02 | Hashes and list vs scalar context | 80 | 6 |

### M03 Regular expressions and text processing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Extract fields with capture groups; (2) Use a non-greedy quantifier to match minimally
- Common misconception addressed: Assuming .* is non-greedy by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Matching, capturing and substitution | 80 | 6 |
| M03L02 | Anchors, quantifiers and greediness | 80 | 6 |

### M04 File I/O and processing streams (MASTEMY-DESIGN 16%)

- Worked applications: (1) Read a file line by line and transform each line; (2) Open a file with error handling via or die
- Common misconception addressed: Forgetting to chomp newlines before comparing lines
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Opening files, the diamond operator and line reading | 80 | 6 |
| M04L02 | Writing output and handling errors with die | 80 | 6 |

### M05 Subroutines, references and modules (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pass an array by reference into a subroutine; (2) Build a hash of arrays and iterate it
- Common misconception addressed: Passing multiple arrays to a sub and losing their boundaries without references
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Subroutines, arguments and return values | 80 | 6 |
| M05L02 | References, data structures and using modules | 80 | 6 |

### M06 System automation and one-liners (MASTEMY-DESIGN 18%)

- Worked applications: (1) Write a one-liner that filters lines matching a pattern; (2) Rename files in bulk based on a regex
- Common misconception addressed: Reaching for a full script where a -pe one-liner suffices
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Perl one-liners with -n, -p and -e | 80 | 6 |
| M06L02 | Running commands and processing their output | 80 | 6 |

## Integrative case

Automate a log-cleanup task: read rotating log files line by line, extract error records with regular expressions, aggregate counts per error type into a hash, and emit a summary report, then reduce the core filter to a Perl one-liner.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0928-final-protected | 30 | 30 | yes |
| MST-0928-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Perl basics and scalar data | 5 |
| Arrays, hashes and context | 5 |
| Regular expressions and text processing | 5 |
| File I/O and processing streams | 5 |
| Subroutines, references and modules | 5 |
| System automation and one-liners | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0928-Q0001** (single-answer, Select ONE) What does `use strict;` enforce in a Perl program?

- A. It requires variables to be declared and forbids risky constructs like symbolic references **(key)**  
  _Rationale:_ Correct: strict catches undeclared variables and unsafe references at compile time.
- B. It makes the program run faster  
  _Rationale:_ strict is about correctness, not speed.
- C. It disables regular expressions  
  _Rationale:_ strict has no effect on regex availability.
- D. It forces all variables to be global  
  _Rationale:_ strict encourages lexical (my) variables, the opposite of globals.

**MST-0928-Q0002** (multiple-answer, Select ALL that apply) Which statements about Perl context are correct? (Select TWO)

- A. An array evaluated in scalar context yields its element count **(key)**  
  _Rationale:_ Correct: scalar context on an array gives its length.
- B. The same expression can behave differently in list vs scalar context **(key)**  
  _Rationale:_ Correct: context determines what many Perl operations return.
- C. A hash in list context returns only its keys  
  _Rationale:_ In list context a hash returns key/value pairs, not keys alone.
- D. Context never affects the return value of a function  
  _Rationale:_ Many functions explicitly change behaviour based on context (e.g. wantarray).

**MST-0928-Q0003** (single-answer, Select ONE) In a Perl regex, how do you make the quantifier in `.*` match as little as possible?

- A. Append a `?` to make it non-greedy: `.*?` **(key)**  
  _Rationale:_ Correct: ? after a quantifier switches it to lazy/non-greedy matching.
- B. Use `.*!`  
  _Rationale:_ ! has no special quantifier meaning here.
- C. Anchor it with `^` only  
  _Rationale:_ Anchors constrain position, not greediness.
- D. Wrap it in parentheses  
  _Rationale:_ Parentheses capture; they do not change greediness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
