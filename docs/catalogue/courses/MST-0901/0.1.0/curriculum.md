# Python: Complete Programming Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0901` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-PB-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Python: Complete Programming Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Python
2. Core data types and operators
3. Control flow
4. Collections: lists, tuples, dicts, sets
5. Functions and modules
6. Files, errors and data formats
7. Objects, iteration and comprehensions
8. Testing, style and the standard library

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Python (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write and run a script that greets a user by name; (2) Experiment with an expression in the REPL before scripting it
- Common misconception addressed: Confusing = assignment with == comparison
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing Python, running scripts and the REPL | 120 | 6 |
| M01L02 | Variables, expressions and basic I/O | 120 | 6 |

### M02 Core data types and operators (MASTEMY-DESIGN 13%)

- Worked applications: (1) Format a currency total with an f-string; (2) Clean user input with strip and lower
- Common misconception addressed: Assuming integer division behaves like float division
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Numbers, strings and booleans | 120 | 6 |
| M02L02 | String methods and formatting | 120 | 6 |

### M03 Control flow (MASTEMY-DESIGN 12%)

- Worked applications: (1) Validate a menu choice with a loop until it is valid; (2) Sum a list with a for loop and an accumulator
- Common misconception addressed: Writing an off-by-one range that misses the last item
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals and truthiness | 120 | 6 |
| M03L02 | while and for loops, break and continue | 120 | 6 |

### M04 Collections: lists, tuples, dicts, sets (MASTEMY-DESIGN 15%)

- Worked applications: (1) Group expenses by category in a dictionary; (2) Deduplicate tags with a set
- Common misconception addressed: Modifying a list while iterating over it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lists and tuples | 120 | 6 |
| M04L02 | Dictionaries and sets | 120 | 6 |

### M05 Functions and modules (MASTEMY-DESIGN 14%)

- Worked applications: (1) Refactor a long script into named functions; (2) Split helpers into a module and import them
- Common misconception addressed: Using a mutable default argument like []
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Defining functions, arguments and return values | 120 | 6 |
| M05L02 | Scope, imports and organising a module | 120 | 6 |

### M06 Files, errors and data formats (MASTEMY-DESIGN 14%)

- Worked applications: (1) Persist records to a JSON file and read them back; (2) Handle a missing-file error gracefully
- Common misconception addressed: Leaving a file open instead of using with
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Reading and writing files; context managers | 120 | 6 |
| M06L02 | Exceptions and try/except; JSON | 120 | 6 |

### M07 Objects, iteration and comprehensions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Model an Expense as a class with a method; (2) Build a category summary with a dict comprehension
- Common misconception addressed: Writing a comprehension so dense it is unreadable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Classes and objects basics | 120 | 6 |
| M07L02 | Comprehensions and iteration patterns | 120 | 6 |

### M08 Testing, style and the standard library (MASTEMY-DESIGN 8%)

- Worked applications: (1) Write unit tests for the summary function; (2) Create a venv and install a package
- Common misconception addressed: Committing code without any tests and assuming it works
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | PEP 8, virtual environments and pip | 120 | 6 |
| M08L02 | Unit testing and useful standard-library modules | 120 | 6 |

## Integrative case

Build a command-line expense tracker in Python: read and validate user input, store records in lists and dictionaries, persist to a file, summarise spending by category, and organise the code into tested functions and a module.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0901-final-protected | 40 | 40 | yes |
| MST-0901-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Python | 5 |
| Core data types and operators | 5 |
| Control flow | 5 |
| Collections: lists, tuples, dicts, sets | 5 |
| Functions and modules | 5 |
| Files, errors and data formats | 5 |
| Objects, iteration and comprehensions | 5 |
| Testing, style and the standard library | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0901-Q0001** (single-answer, Select ONE) What does the with statement provide when opening a file in Python?

- A. It guarantees the file is closed when the block exits, even on an error **(key)**  
  _Rationale:_ Correct: with uses the context-manager protocol to release the resource reliably.
- B. It makes file reads run concurrently  
  _Rationale:_ with does not add concurrency; it manages resource cleanup.
- C. It converts the file contents to JSON automatically  
  _Rationale:_ Parsing JSON is a separate step with the json module.
- D. It prevents any exception from being raised inside the block  
  _Rationale:_ with still lets exceptions propagate; it only ensures cleanup happens.

**MST-0901-Q0002** (multiple-answer, Select ALL that apply) Which statements about Python dictionaries are correct? (Select TWO)

- A. Keys must be hashable, such as strings or numbers **(key)**  
  _Rationale:_ Correct: dictionary keys must be hashable so they can be located quickly.
- B. Looking up a value by key is on average fast regardless of size **(key)**  
  _Rationale:_ Correct: dict lookups are average constant-time thanks to hashing.
- C. Dictionaries keep values sorted by key automatically  
  _Rationale:_ Dictionaries preserve insertion order, not sorted order.
- D. A list can be used directly as a dictionary key  
  _Rationale:_ Lists are unhashable and cannot be dictionary keys.

**MST-0901-Q0003** (single-answer, Select ONE) Why is using a mutable default argument such as def f(items=[]) a common bug?

- A. The same list is shared across all calls that rely on the default, so state leaks between calls **(key)**  
  _Rationale:_ Correct: the default is evaluated once at definition, so every call reuses and mutates the same list.
- B. Python forbids default arguments entirely  
  _Rationale:_ Default arguments are allowed; mutable ones are just risky.
- C. The list is recreated on every call, wasting memory  
  _Rationale:_ The opposite is true: it is created once and reused.
- D. It makes the function run in a separate thread  
  _Rationale:_ Default arguments have nothing to do with threading.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
