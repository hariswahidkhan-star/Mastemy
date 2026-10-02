# Ruby: Language and Application Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0918` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-PRG-SK-RF-002 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Ruby: Language and Application Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Ruby basics
2. Collections and blocks
3. Classes and objects
4. Modules and mixins
5. Errors and files
6. Idiomatic Ruby and tests

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Ruby basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert and format a price using numeric methods; (2) Write a method that classifies a number as odd or even
- Common misconception addressed: Thinking symbols and strings are interchangeable everywhere
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Objects, variables and types | 80 | 6 |
| M01L02 | Strings, numbers and symbols | 80 | 6 |
| M01L03 | Control flow and methods | 80 | 6 |

### M02 Collections and blocks (MASTEMY-DESIGN 17%)

- Worked applications: (1) Group books by author with each_with_object; (2) Select and map a list in one Enumerable chain
- Common misconception addressed: Expecting map to change the array in place
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Arrays and hashes | 80 | 6 |
| M02L02 | Blocks, procs and lambdas | 80 | 6 |
| M02L03 | Enumerable methods | 80 | 6 |

### M03 Classes and objects (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a Book class with attr_accessor; (2) Refactor duplicated code into a shared superclass
- Common misconception addressed: Exposing internal state by making everything public
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining classes and instances | 80 | 6 |
| M03L02 | Attributes and encapsulation | 80 | 6 |
| M03L03 | Inheritance and composition | 80 | 6 |

### M04 Modules and mixins (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add comparability through a Comparable mixin; (2) Namespace related classes inside a module
- Common misconception addressed: Confusing include (instance) with extend (class) methods
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Modules as namespaces | 80 | 6 |
| M04L02 | Mixins with include and extend | 80 | 6 |
| M04L03 | self and method lookup | 80 | 6 |

### M05 Errors and files (MASTEMY-DESIGN 16%)

- Worked applications: (1) Rescue a missing-file error and report it cleanly; (2) Persist the catalogue to a JSON file
- Common misconception addressed: Rescuing StandardError and silently swallowing bugs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Exceptions and rescue | 80 | 6 |
| M05L02 | Reading and writing files | 80 | 6 |
| M05L03 | Working with data formats | 80 | 6 |

### M06 Idiomatic Ruby and tests (MASTEMY-DESIGN 17%)

- Worked applications: (1) Rewrite a verbose loop in idiomatic Ruby; (2) Write a unit test for a catalogue method
- Common misconception addressed: Assuming nil behaves like false in arithmetic contexts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Idioms and readable style | 80 | 6 |
| M06L02 | Gems and project layout | 80 | 6 |
| M06L03 | Testing with RSpec or Minitest | 80 | 6 |

## Integrative case

Build a command-line library catalogue in Ruby: model books with classes, store them in collections, read and write a data file, handle errors, and organise behaviour into modules with tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0918-final-protected | 30 | 30 | yes |
| MST-0918-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ruby basics | 5 |
| Collections and blocks | 5 |
| Classes and objects | 5 |
| Modules and mixins | 5 |
| Errors and files | 5 |
| Idiomatic Ruby and tests | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0918-Q0001** (single-answer, Select ONE) In Ruby, calling map on an array returns what?

- A. A new array of the transformed elements **(key)**  
  _Rationale:_ Correct: map returns a new array and leaves the original unchanged.
- B. The original array mutated in place  
  _Rationale:_ map! mutates; map returns a new array.
- C. nil  
  _Rationale:_ map returns the transformed collection, not nil.
- D. The number of elements  
  _Rationale:_ That would be size or length, not map.

**MST-0918-Q0002** (single-answer, Select ONE) Which Ruby construct is best for sharing a set of methods across several unrelated classes?

- A. A module mixed in with include **(key)**  
  _Rationale:_ Correct: a module mixin injects shared behaviour into any class that includes it.
- B. A deep inheritance chain  
  _Rationale:_ Inheritance ties classes into one hierarchy, unsuitable for unrelated classes.
- C. A global variable  
  _Rationale:_ Globals share data, not methods, and are discouraged.
- D. A separate script file with no module  
  _Rationale:_ Loading a file alone does not share methods onto classes.

**MST-0918-Q0003** (multiple-answer, Select TWO) Which TWO statements about Ruby exception handling are correct? (Select TWO)

- A. rescue can catch a specific error class such as Errno::ENOENT **(key)**  
  _Rationale:_ Correct: you can rescue specific classes to handle known failures.
- B. An ensure block runs whether or not an exception was raised **(key)**  
  _Rationale:_ Correct: ensure always runs, which suits cleanup.
- C. rescue without a class should be used to swallow all errors silently  
  _Rationale:_ Swallowing every error hides real bugs and is discouraged.
- D. raise can only be called by the Ruby runtime, not your code  
  _Rationale:_ You can raise exceptions explicitly in your own code.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
