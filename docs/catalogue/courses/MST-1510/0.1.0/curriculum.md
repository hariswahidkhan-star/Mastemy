# Python Institute PCAP Certified Associate in Python Programming Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1510` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | OpenEDG Python Institute (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION: PCAP-31-03 (official source not verified) |
| Version basis | DESIGN ASSUMPTION - official outline not verified (network egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - no official source fetched; confirm outline, weightings and item counts before SME review |
| Legacy IDs | MST-PRG-PYI-PCAP-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply modules, packages, the Python Standard Library and pip-installed modules in programs
2. Handle exceptions, the exception hierarchy, raising and testing, and work with strings and string methods
3. Build object-oriented programs using classes, objects, attributes, methods, inheritance and polymorphism
4. Use list comprehensions, lambdas, closures, generators, file I/O and the os module patterns

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Modules, Packages and String Processing (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Choose between 'import module' and 'from module import name' for three scenarios; (2) Use string methods to normalise and validate a user-entered product code
- Common misconception addressed: Thinking 'from module import *' is always the cleanest import style
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | import variants, qualifying names, the math/random/platform modules | 120 | 6 |
| M01L02 | Building and using your own modules and packages; __name__ and __pycache__ | 120 | 6 |
| M01L03 | Strings as sequences, string methods, and comparing/sorting strings | 120 | 6 |

### M02 Exceptions and Object-Oriented Programming (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Catch two different exception types with distinct handlers for a file read; (2) Add a subclass that overrides one method and reuses the parent via super()
- Common misconception addressed: Confusing a class attribute shared by all instances with a per-instance attribute
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The exception hierarchy, try/except/else/finally, raising and re-raising | 120 | 6 |
| M02L02 | Classes, instance vs class attributes, methods and the self parameter | 120 | 6 |
| M02L03 | Inheritance, method overriding, polymorphism and introspection | 120 | 6 |

### M03 Comprehensions, Functional Tools, Generators and Files (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Rewrite a loop that filters and transforms a list as a single comprehension; (2) Write a generator that yields the running total of a sequence
- Common misconception addressed: Assuming a generator can be iterated more than once like a list
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | List comprehensions, lambdas, map/filter and conditional expressions | 120 | 6 |
| M03L02 | Closures and generators with yield; iterators and the iterator protocol | 120 | 6 |
| M03L03 | Reading and writing text files, with-statements and the os module basics | 120 | 6 |

## Integrative case

Design a small two-class program (a base class and a subclass) that reads records from a text file, raises and handles a custom exception on bad input, and reports results; explain the OOP and exception choices.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified; the official question count and duration are unknown. Confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1510-practice-form-A | 45 | 45 | yes |
| MST-1510-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1510-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1510-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Modules, Packages and String Processing | 15 |
| Exceptions and Object-Oriented Programming | 15 |
| Comprehensions, Functional Tools, Generators and Files | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1510-Q0001** (single-answer, Select ONE) Which statement about a Python generator function (one that uses yield) is correct?

- A. It produces values lazily, one at a time, and keeps its state between calls **(key)**  
  _Rationale:_ Correct: a generator suspends at each yield and resumes on the next request, producing values on demand.
- B. It returns a list of all values immediately  
  _Rationale:_ That describes a function returning a list; a generator yields values lazily, not all at once.
- C. It can be re-iterated any number of times after exhaustion  
  _Rationale:_ A generator is exhausted after one pass and must be recreated to iterate again.
- D. It cannot be used in a for loop  
  _Rationale:_ Generators are iterable and are commonly consumed by for loops.

**MST-1510-Q0002** (single-answer, Select ONE) In a class, what does the first parameter conventionally named self refer to?

- A. The particular instance the method was called on **(key)**  
  _Rationale:_ Correct: self is the instance, giving the method access to that object's attributes.
- B. The class object itself  
  _Rationale:_ The class object is referenced by cls in classmethods, not by self.
- C. The parent (base) class  
  _Rationale:_ The base class is reached via super(), not self.
- D. A required keyword of the language  
  _Rationale:_ self is a convention, not a keyword; any valid name would work but self is standard.

**MST-1510-Q0003** (multiple-answer, Select TWO) Which TWO are true about the try/except/finally construct?

- A. Code in a finally block runs whether or not an exception was raised **(key)**  
  _Rationale:_ Correct: finally always executes, making it ideal for cleanup such as closing files.
- B. A single try can have several except branches for different exception types **(key)**  
  _Rationale:_ Correct: you can match distinct exception classes with separate except clauses.
- C. The else block of a try runs only when an exception was raised  
  _Rationale:_ The else block runs only when NO exception was raised in the try.
- D. Raising an exception in except is forbidden  
  _Rationale:_ You may raise (or re-raise) inside an except block.
- E. finally can only appear without any except  
  _Rationale:_ finally may accompany except clauses in the same statement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
