# PHP: Modern Web Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0916` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-PRG-SK-PF-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — PHP: Modern Web Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. PHP language essentials
2. Functions and structure
3. Object-oriented PHP
4. Request handling and the web
5. Databases with PDO
6. Output, security and testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 PHP language essentials (MASTEMY-DESIGN 16%)

- Worked applications: (1) Normalise and validate a submitted email string; (2) Build an associative array from form fields
- Common misconception addressed: Comparing values with == instead of === and hitting type juggling
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Syntax, types and variables | 94 | 6 |
| M01L02 | Strings, arrays and operators | 94 | 6 |
| M01L03 | Control flow and functions | 94 | 6 |

### M02 Functions and structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Split a script into namespaced helper functions; (2) Configure PSR-4 autoloading for a src folder
- Common misconception addressed: Assuming include and require behave identically on failure
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Functions, scope and arguments | 94 | 6 |
| M02L02 | Include, require and namespaces | 94 | 6 |
| M02L03 | Composer and autoloading | 94 | 6 |

### M03 Object-oriented PHP (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model an Invoice class with typed properties; (2) Share logging behaviour through a trait
- Common misconception addressed: Catching Exception but ignoring the message and rethrow
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Classes, properties and methods | 93 | 6 |
| M03L02 | Interfaces and traits | 93 | 6 |
| M03L03 | Error and exception handling | 93 | 6 |

### M04 Request handling and the web (MASTEMY-DESIGN 17%)

- Worked applications: (1) Validate a contact form and repopulate on error; (2) Route three URLs through one front controller
- Common misconception addressed: Trusting GET input without validation or escaping
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | HTTP requests and superglobals | 93 | 6 |
| M04L02 | Forms, validation and sessions | 93 | 6 |
| M04L03 | Routing a front controller | 93 | 6 |

### M05 Databases with PDO (MASTEMY-DESIGN 17%)

- Worked applications: (1) Insert a record with a prepared statement; (2) Wrap two writes in a transaction with rollback
- Common misconception addressed: Concatenating user input into SQL instead of binding
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Connecting with PDO | 93 | 6 |
| M05L02 | Prepared statements and binding | 93 | 6 |
| M05L03 | CRUD and transactions | 93 | 6 |

### M06 Output, security and testing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Escape user content before rendering HTML; (2) Write a PHPUnit test for a validator function
- Common misconception addressed: Echoing user input directly and opening an XSS hole
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Templating and output escaping | 93 | 6 |
| M06L02 | Common security practices | 93 | 6 |
| M06L03 | Testing with PHPUnit | 93 | 6 |

## Integrative case

Build a small PHP web app: route requests, read and validate form input, query a database with prepared statements, render HTML templates safely, and organise the code with Composer autoloading and tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0916-final-protected | 30 | 30 | yes |
| MST-0916-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| PHP language essentials | 5 |
| Functions and structure | 5 |
| Object-oriented PHP | 5 |
| Request handling and the web | 5 |
| Databases with PDO | 5 |
| Output, security and testing | 5 |

Minimum reviewed item bank: 570 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0916-Q0001** (single-answer, Select ONE) You insert user-supplied data into a database. Which PHP approach best prevents SQL injection?

- A. A PDO prepared statement with bound parameters **(key)**  
  _Rationale:_ Correct: prepared statements send data separately from SQL, so input cannot alter the query.
- B. Wrapping the query in htmlspecialchars()  
  _Rationale:_ That escapes HTML output, not SQL input.
- C. Concatenating the value into the query string  
  _Rationale:_ Concatenation is exactly what enables injection.
- D. Setting error_reporting to 0  
  _Rationale:_ Hiding errors does nothing for injection risk.

**MST-0916-Q0002** (single-answer, Select ONE) Which comparison in PHP checks both value and type with no type juggling?

- A. === **(key)**  
  _Rationale:_ Correct: the identity operator compares value and type without coercion.
- B. ==  
  _Rationale:_ The loose operator performs type juggling and can give surprising results.
- C. =  
  _Rationale:_ A single equals sign is assignment, not comparison.
- D. <>  
  _Rationale:_ That is a loose inequality operator and still juggles types.

**MST-0916-Q0003** (multiple-answer, Select TWO) Which TWO practices reduce cross-site scripting (XSS) risk when rendering user content in PHP? (Select TWO)

- A. Escaping output with htmlspecialchars() before echoing **(key)**  
  _Rationale:_ Correct: escaping neutralises HTML metacharacters in output.
- B. Validating and constraining input on the server **(key)**  
  _Rationale:_ Correct: server-side validation limits what untrusted data can contain.
- C. Storing the raw input unchanged and echoing it later  
  _Rationale:_ Echoing raw input is the XSS vulnerability itself.
- D. Disabling the browser's developer tools  
  _Rationale:_ That does not affect how the page renders injected markup.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
