# PHP Programming: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2580` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — PHP Programming: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write object-oriented PHP with classes, interfaces and traits
2. Use namespaces and Composer autoloading
3. Handle errors with exceptions and typed properties
4. Access databases safely with PDO and prepared statements
5. Apply array and string functions idiomatically
6. Follow PSR standards and basic dependency management

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Object-oriented PHP (20% (design weight), design weight)

- Worked applications: (1) Define an interface and implement it; (2) Share methods via a trait
- Common misconception addressed: Treating traits as a substitute for interfaces
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Classes, properties and visibility | 64 | 4 |
| M01L02 | Interfaces and abstract classes | 64 | 4 |
| M01L03 | Traits for shared behaviour | 64 | 4 |

### M02 Namespaces and Composer (20% (design weight), design weight)

- Worked applications: (1) Autoload a class with PSR-4; (2) Require a package with Composer
- Common misconception addressed: Hardcoding require paths instead of autoloading
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Namespaces and use | 64 | 4 |
| M02L02 | Composer and PSR-4 autoloading | 64 | 4 |
| M02L03 | Semantic versioning of packages | 64 | 4 |

### M03 Errors and types (20% (design weight), design weight)

- Worked applications: (1) Throw and catch a custom exception; (2) Add scalar type declarations
- Common misconception addressed: Catching Throwable and silently ignoring it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Exceptions and try/catch/finally | 64 | 4 |
| M03L02 | Typed properties and return types | 64 | 4 |
| M03L03 | Custom exception classes | 64 | 4 |

### M04 Databases with PDO (20% (design weight), design weight)

- Worked applications: (1) Run a parameterised query with PDO; (2) Wrap writes in a transaction
- Common misconception addressed: Interpolating user input into SQL strings
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Connecting with PDO | 64 | 4 |
| M04L02 | Prepared statements and binding | 64 | 4 |
| M04L03 | Fetch modes and transactions | 64 | 4 |

### M05 Standards and tooling (20% (design weight), design weight)

- Worked applications: (1) Format code to PSR-12; (2) Add a Composer test script
- Common misconception addressed: Ignoring coding standards in a shared codebase
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | PSR-1/PSR-12 style | 64 | 4 |
| M05L02 | Composer scripts | 64 | 4 |
| M05L03 | Autoload optimisation | 64 | 4 |

## Integrative case

A developer builds a PHP blog backend: model posts with classes and interfaces, autoload via Composer PSR-4, persist data through PDO prepared statements inside transactions, and surface failures as typed exceptions.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2580-final-protected | 40 | 40 | yes |
| MST-2580-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Object-oriented PHP | 8 |
| Namespaces and Composer | 8 |
| Errors and types | 8 |
| Databases with PDO | 8 |
| Standards and tooling | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2580-Q0001** (single-answer, Select ONE) Why use PDO prepared statements with bound parameters?

- A. They separate SQL from data, preventing SQL injection **(key)**  
  _Rationale:_ Bound parameters are never interpreted as SQL, closing the injection vector.
- B. They make queries run without a database connection  
  _Rationale:_ A connection is still required.
- C. They automatically create database tables  
  _Rationale:_ Prepared statements do not manage schema.
- D. They convert all results to JSON  
  _Rationale:_ Fetch modes handle result shape, not JSON by default.

**MST-2580-Q0002** (multiple-answer, Select TWO) Select TWO accurate statements about traits in PHP.

- A. A trait lets multiple classes share method implementations **(key)**  
  _Rationale:_ Traits inject reusable methods into classes.
- B. A class can use several traits **(key)**  
  _Rationale:_ Multiple traits can be composed into one class.
- C. A trait can be instantiated on its own  
  _Rationale:_ Traits cannot be instantiated directly.
- D. A trait enforces a contract the way an interface does  
  _Rationale:_ Contracts are the job of interfaces, not traits.

**MST-2580-Q0003** (single-answer, Select ONE) What does PSR-4 autoloading map?

- A. Namespaces to directory paths so classes load on demand **(key)**  
  _Rationale:_ PSR-4 resolves a fully-qualified class name to a file path.
- B. Database tables to classes automatically  
  _Rationale:_ That is an ORM concern, not PSR-4.
- C. HTTP routes to controllers  
  _Rationale:_ Routing is separate from autoloading.
- D. Composer packages to CDN URLs  
  _Rationale:_ PSR-4 is about local class resolution.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
