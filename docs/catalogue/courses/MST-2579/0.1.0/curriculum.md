# PHP Programming: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2579` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — PHP Programming: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a PHP environment and run scripts from the CLI and web
2. Use variables, types, strings and arrays correctly
3. Write control flow, loops and functions
4. Handle HTML forms with GET and POST safely at a basic level
5. Work with associative and indexed arrays and common functions
6. Include files and structure a small procedural script

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Environment and syntax (20% (design weight), design weight)

- Worked applications: (1) Run a PHP script from the command line; (2) Embed a PHP block in an HTML page
- Common misconception addressed: Forgetting the closing tag rules in pure-PHP files
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing PHP and running from CLI | 64 | 4 |
| M01L02 | Embedding PHP in HTML | 64 | 4 |
| M01L03 | Echo, print and comments | 64 | 4 |

### M02 Types and variables (20% (design weight), design weight)

- Worked applications: (1) Interpolate a variable in a double-quoted string; (2) Inspect a value with var_dump
- Common misconception addressed: Relying on loose == comparisons
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Scalars and type juggling | 64 | 4 |
| M02L02 | Strings and interpolation | 64 | 4 |
| M02L03 | Constants and var_dump | 64 | 4 |

### M03 Control flow and functions (20% (design weight), design weight)

- Worked applications: (1) Write a function with a default argument; (2) Loop over a range with for
- Common misconception addressed: Expecting a variable to be global by default inside a function
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | if/else, switch and loops | 64 | 4 |
| M03L02 | Defining functions and arguments | 64 | 4 |
| M03L03 | Return values and scope | 64 | 4 |

### M04 Arrays (20% (design weight), design weight)

- Worked applications: (1) Build an associative array of settings; (2) Transform an array with array_map
- Common misconception addressed: Confusing array keys when merging arrays
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Indexed and associative arrays | 64 | 4 |
| M04L02 | Array functions map/filter/reduce | 64 | 4 |
| M04L03 | Multidimensional arrays | 64 | 4 |

### M05 Forms and includes (20% (design weight), design weight)

- Worked applications: (1) Read and validate a POST field; (2) Split shared code into an include
- Common misconception addressed: Trusting raw user input without validation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | GET vs POST | 64 | 4 |
| M05L02 | Reading and validating form input | 64 | 4 |
| M05L03 | include/require and structure | 64 | 4 |

## Integrative case

A beginner builds a PHP feedback form: render an HTML form, read POST input safely, validate required fields, store entries in an associative array, and show a formatted confirmation page.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2579-final-protected | 40 | 40 | yes |
| MST-2579-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Environment and syntax | 8 |
| Types and variables | 8 |
| Control flow and functions | 8 |
| Arrays | 8 |
| Forms and includes | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2579-Q0001** (single-answer, Select ONE) What is the difference between include and require in PHP?

- A. require raises a fatal error if the file is missing; include only a warning **(key)**  
  _Rationale:_ require halts execution on failure; include continues with a warning.
- B. include is for functions and require is for classes  
  _Rationale:_ Both just bring in a file; the difference is failure behaviour.
- C. require runs faster than include  
  _Rationale:_ The difference is error handling, not speed.
- D. They are interchangeable with no difference  
  _Rationale:_ Their failure behaviour differs materially.

**MST-2579-Q0002** (multiple-answer, Select TWO) Select TWO reasons to prefer === over == when comparing values in PHP.

- A. === compares value and type without type juggling **(key)**  
  _Rationale:_ Strict comparison avoids surprising loose conversions.
- B. == can treat '0' and false or '' and null as equal in confusing ways **(key)**  
  _Rationale:_ Loose comparison applies type juggling that causes subtle bugs.
- C. === automatically trims whitespace from strings  
  _Rationale:_ === does no trimming.
- D. == is deprecated in modern PHP  
  _Rationale:_ == is not deprecated, merely riskier.

**MST-2579-Q0003** (single-answer, Select ONE) Why should form input read from $_POST be validated before use?

- A. User input is untrusted and may be missing, malformed or malicious **(key)**  
  _Rationale:_ Validation guards against bad or hostile data before it is used.
- B. Because $_POST is always empty on the first request  
  _Rationale:_ Emptiness is only one case; validation covers more.
- C. Because PHP cannot read POST data otherwise  
  _Rationale:_ PHP reads it fine; the issue is trust.
- D. Because validation converts POST to GET  
  _Rationale:_ Validation does not change the HTTP method.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
