# JavaScript Programming: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2553` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint for a Intermediate-level JavaScript programming course. Language, library and tooling specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — JavaScript Programming: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Select and compose appropriate JavaScript data structures for a problem
2. Design classes using encapsulation, inheritance and polymorphism
3. Apply JavaScript's reuse mechanisms (higher-order functions and closures) to avoid duplication
4. Handle errors with exceptions and validation that preserve invariants
5. Organise code into modules and packages using npm and package.json
6. Read and write external data safely with JavaScript input/output

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Collections and data structures (25%, design weight)

- Worked applications: (1) Model a small dataset by choosing the right collection types; (2) Compare the lookup cost of two structures for a given access pattern
- Common misconception addressed: Reaching for a sequential list when a map or set fits the access pattern
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core collections in JavaScript: arrays, objects, Map and Set | 120 | 7 |
| M01L02 | Choosing and composing data structures for a task | 120 | 7 |

### M02 Object-oriented programming (25%, design weight)

- Worked applications: (1) Design a class hierarchy for a billing domain; (2) Refactor procedural code into cohesive classes
- Common misconception addressed: Overusing inheritance where composition would be clearer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classes, objects and prototype-based objects | 120 | 7 |
| M02L02 | Encapsulation, inheritance and polymorphism | 120 | 7 |

### M03 Errors and robustness (25%, design weight)

- Worked applications: (1) Add structured error handling to a fragile function; (2) Design the error handling for a file-processing routine
- Common misconception addressed: Swallowing exceptions so the real failure is hidden
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Exceptions and error handling in JavaScript | 120 | 7 |
| M03L02 | Validation, invariants and defensive design | 120 | 7 |

### M04 Modules, packages and I/O (25%, design weight)

- Worked applications: (1) Split a monolithic script into modules and a package; (2) Read, transform and write a structured data file without data loss
- Common misconception addressed: Assuming import or build order never affects behaviour
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Organising code into modules and packages with npm and package.json | 120 | 7 |
| M04L02 | Files, serialization and external data | 120 | 7 |

## Integrative case

A developer inherits a tangled JavaScript script and must restructure it into classes and modules, choose the right data structures, add robust error handling with exceptions, and read and write a structured data file without losing information.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2553-final-protected | 40 | 40 | yes |
| MST-2553-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Collections and data structures | 10 |
| Object-oriented programming | 10 |
| Errors and robustness | 10 |
| Modules, packages and I/O | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2553-Q0001** (single-answer, Select ONE) In JavaScript, when should you prefer composition over inheritance to reuse behaviour?

- A. When the classes do not form a genuine is-a relationship and you only need to reuse behaviour **(key)**  
  _Rationale:_ Correct: composition avoids a brittle hierarchy when there is no true subtype relationship.
- B. Always, because inheritance is never useful  
  _Rationale:_ Inheritance is appropriate for real is-a relationships.
- C. Only when performance is the single concern  
  _Rationale:_ The choice is primarily about modelling, not raw performance.
- D. Never, because composition is slower  
  _Rationale:_ Composition is not inherently slow and is often clearer.

**MST-2553-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of exceptions in JavaScript? (Select TWO.)

- A. Signalling that a required file could not be opened **(key)**  
  _Rationale:_ Correct: an unexpected, exceptional condition is a good fit for an exception.
- B. Reporting that user input failed validation at a boundary **(key)**  
  _Rationale:_ Correct: raising a clear error lets the caller handle invalid input deliberately.
- C. Controlling normal loop iteration in place of a condition  
  _Rationale:_ Using exceptions for ordinary control flow is an anti-pattern.
- D. Hiding all errors by catching and ignoring them  
  _Rationale:_ Swallowing errors conceals real failures.

**MST-2553-Q0003** (single-answer, Select ONE) You need fast membership tests on a large, unordered collection of unique keys. Which structure fits best?

- A. A hash-based set **(key)**  
  _Rationale:_ Correct: a set gives average constant-time membership tests on unique keys.
- B. A plain sequential list scanned from the start  
  _Rationale:_ Linear scans are slow for membership on large collections.
- C. A fixed-size array indexed by position  
  _Rationale:_ Arrays do not give key-based membership without scanning.
- D. A single string containing all keys  
  _Rationale:_ String search is error-prone and slow for this purpose.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
