# Perl Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1535` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-PF-002 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Perl Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Perl
2. Scalars, arrays and hashes
3. Control flow and operators
4. Regular expressions
5. Subroutines and references
6. Files and I/O
7. Modules and CPAN
8. Error handling and good practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; Perl scripts and text-processing work are taught through instructor-built walkthroughs.

## Modules

### M01 Getting started with Perl (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a strict/warnings script that echoes input; (2) Look up a function with perldoc -f
- Common misconception addressed: Writing scripts without use strict and warnings
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Running perl, perldoc and use strict/warnings | 90 | 6 |
| M01L02 | Scalars, context and basic I/O | 90 | 6 |

### M02 Scalars, arrays and hashes (MASTEMY-DESIGN 15%)

- Worked applications: (1) Count word frequencies in a hash; (2) Push, pop and slice an array
- Common misconception addressed: Expecting an array in scalar context to give its last element rather than its count
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Scalars and the sigils $ @ % | 90 | 6 |
| M02L02 | Arrays, hashes and list/scalar context | 90 | 6 |

### M03 Control flow and operators (MASTEMY-DESIGN 12%)

- Worked applications: (1) Loop over a hash sorted by value; (2) Use a statement modifier for a guard clause
- Common misconception addressed: Comparing numbers with eq or strings with == by mistake
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals, loops and statement modifiers | 90 | 6 |
| M03L02 | Operators, string vs numeric comparison | 90 | 6 |

### M04 Regular expressions (MASTEMY-DESIGN 15%)

- Worked applications: (1) Extract fields from a log line with capture groups; (2) Clean a string with s/// and named captures
- Common misconception addressed: Forgetting to anchor a pattern and matching unintended substrings
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Matching, capturing groups and modifiers | 90 | 6 |
| M04L02 | Substitution, tr, and named captures | 90 | 6 |

### M05 Subroutines and references (MASTEMY-DESIGN 13%)

- Worked applications: (1) Pass an array by reference to a subroutine; (2) Build an array of hashes and traverse it
- Common misconception addressed: Flattening nested structures by passing arrays directly instead of references
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Subroutines, @_, and returning lists | 90 | 6 |
| M05L02 | References and nested data structures | 90 | 6 |

### M06 Files and I/O (MASTEMY-DESIGN 12%)

- Worked applications: (1) Process a file line by line with a lexical filehandle; (2) Write filtered output to a new file
- Common misconception addressed: Using two-argument open and risking injection/ambiguity
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | File handles, open/close and three-argument open | 90 | 6 |
| M06L02 | Reading line by line, slurping and writing | 90 | 6 |

### M07 Modules and CPAN (MASTEMY-DESIGN 11%)

- Worked applications: (1) Install and use a CPAN module; (2) Split reusable code into a package
- Common misconception addressed: Reinventing functionality that a well-tested CPAN module already provides
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | use, packages and namespaces | 90 | 6 |
| M07L02 | CPAN, cpanm and writing a simple module | 90 | 6 |

### M08 Error handling and good practice (MASTEMY-DESIGN 10%)

- Worked applications: (1) Guard a risky operation with eval and inspect $@; (2) Write a few Test::More assertions for a subroutine
- Common misconception addressed: Ignoring the return value of system calls like open
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | die/eval, Try::Tiny and defensive coding | 90 | 6 |
| M08L02 | Testing with Test::More and Perl idioms | 90 | 6 |

## Integrative case

Build a log-analysis tool in Perl: read a large log file line by line, extract fields with regular expressions, tally events in hashes, pass data between subroutines using references, write a summary report, package the logic into a module, and cover it with Test::More tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1535-final-protected | 40 | 40 | yes |
| MST-1535-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Perl | 5 |
| Scalars, arrays and hashes | 5 |
| Control flow and operators | 5 |
| Regular expressions | 5 |
| Subroutines and references | 5 |
| Files and I/O | 5 |
| Modules and CPAN | 5 |
| Error handling and good practice | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1535-Q0001** (single-answer, Select ONE) In Perl, evaluating an array in scalar context (for example my $n = @items) gives what?

- A. The number of elements in the array **(key)**  
  _Rationale:_ Correct: an array in scalar context yields its element count.
- B. The last element of the array  
  _Rationale:_ That would be $items[-1]; scalar context gives the count, not the last element.
- C. A reference to the array  
  _Rationale:_ A reference requires the backslash operator, not scalar context.
- D. The first element  
  _Rationale:_ Scalar context gives the count, not the first element.

**MST-1535-Q0002** (multiple-answer, Select TWO) Which practices improve the safety of a Perl script? (Select TWO)

- A. Adding use strict to require declared variables **(key)**  
  _Rationale:_ Correct: use strict catches undeclared variables and many typos at compile time.
- B. Adding use warnings to surface risky constructs **(key)**  
  _Rationale:_ Correct: use warnings reports suspicious operations such as uninitialised values.
- C. Using two-argument open for file access  
  _Rationale:_ Two-argument open is less safe; three-argument open avoids mode/filename ambiguity.
- D. Ignoring the return value of open  
  _Rationale:_ Ignoring open's return value hides failures and is unsafe.

**MST-1535-Q0003** (single-answer, Select ONE) Which operator should be used to compare two strings for equality in Perl?

- A. eq **(key)**  
  _Rationale:_ Correct: eq compares strings; == is for numeric comparison.
- B. ==  
  _Rationale:_ == compares numbers and would convert strings numerically, often giving wrong results.
- C. =  
  _Rationale:_ = is assignment, not comparison.
- D. ===  
  _Rationale:_ Perl has no === operator.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
