# PHP Programming: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2581` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — PHP Programming: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply SOLID principles and common design patterns in PHP
2. Use generators, iterators and closures for efficient data handling
3. Build and consume REST APIs with proper status handling
4. Secure applications against common web vulnerabilities
5. Write unit and integration tests with PHPUnit
6. Reason about performance, caching and opcode optimisation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Architecture and patterns (20% (design weight), design weight)

- Worked applications: (1) Inject a dependency via a container; (2) Swap behaviour with a strategy
- Common misconception addressed: Newing dependencies inside a class and hard-coupling
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Dependency injection and containers | 64 | 4 |
| M01L02 | Factory, strategy and observer | 64 | 4 |
| M01L03 | SOLID in practice | 64 | 4 |

### M02 Generators and iterators (20% (design weight), design weight)

- Worked applications: (1) Stream a large file with a generator; (2) Implement a custom iterator
- Common misconception addressed: Loading a huge dataset fully into memory
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | yield and generators | 64 | 4 |
| M02L02 | Iterator and IteratorAggregate | 64 | 4 |
| M02L03 | Lazy pipelines over large data | 64 | 4 |

### M03 APIs (20% (design weight), design weight)

- Worked applications: (1) Return correct status codes for errors; (2) Consume a paginated API
- Common misconception addressed: Returning 200 for every response including errors
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Designing RESTful endpoints | 64 | 4 |
| M03L02 | Status codes and content negotiation | 64 | 4 |
| M03L03 | Consuming APIs with HTTP clients | 64 | 4 |

### M04 Security (20% (design weight), design weight)

- Worked applications: (1) Escape output to prevent XSS; (2) Hash a password with password_hash
- Common misconception addressed: Storing passwords with a fast or reversible hash
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | XSS and output escaping | 64 | 4 |
| M04L02 | CSRF protection | 64 | 4 |
| M04L03 | Password hashing and session security | 64 | 4 |

### M05 Testing and performance (20% (design weight), design weight)

- Worked applications: (1) Write a PHPUnit test with a mock; (2) Cache an expensive computation
- Common misconception addressed: Trusting micro-benchmarks without realistic data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | PHPUnit test structure | 64 | 4 |
| M05L02 | Mocks and fixtures | 64 | 4 |
| M05L03 | Caching and opcache | 64 | 4 |

## Integrative case

An engineer hardens a PHP e-commerce API: apply dependency injection and a strategy for pricing, stream reports with generators, escape output and protect against CSRF, and cover the checkout with PHPUnit tests.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2581-final-protected | 40 | 40 | yes |
| MST-2581-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture and patterns | 8 |
| Generators and iterators | 8 |
| APIs | 8 |
| Security | 8 |
| Testing and performance | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2581-Q0001** (single-answer, Select ONE) Which practice correctly mitigates reflected cross-site scripting (XSS) in PHP output?

- A. Escaping user-derived data for the HTML context before output **(key)**  
  _Rationale:_ Context-appropriate output escaping neutralises injected markup/script.
- B. Storing the data in a session  
  _Rationale:_ Sessions do not neutralise XSS in output.
- C. Using == instead of === in comparisons  
  _Rationale:_ Comparison operators are unrelated to XSS.
- D. Compressing the HTTP response  
  _Rationale:_ Compression has no bearing on XSS.

**MST-2581-Q0002** (multiple-answer, Select TWO) Select TWO benefits of using a generator with yield for large datasets in PHP.

- A. Values are produced lazily, keeping memory use low **(key)**  
  _Rationale:_ Generators yield one item at a time instead of building a full array.
- B. It can represent an effectively unbounded sequence **(key)**  
  _Rationale:_ Generators can stream without materialising everything.
- C. It guarantees the data is sorted  
  _Rationale:_ Generators do not sort.
- D. It loads the entire dataset into memory first  
  _Rationale:_ That is the opposite of a generator's purpose.

**MST-2581-Q0003** (single-answer, Select ONE) Why inject dependencies rather than instantiate them inside a class?

- A. It decouples the class from concrete implementations and eases testing **(key)**  
  _Rationale:_ Injection lets you substitute implementations and mocks, improving testability.
- B. It makes the class run without any dependencies  
  _Rationale:_ The dependencies still exist; only their wiring changes.
- C. It removes the need for interfaces  
  _Rationale:_ Injection often pairs with interfaces.
- D. It automatically caches every object  
  _Rationale:_ Injection is about wiring, not caching.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
