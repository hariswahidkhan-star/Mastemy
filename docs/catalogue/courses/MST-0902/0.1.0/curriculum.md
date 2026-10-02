# Advanced Python: Idiomatic Design, Iterators, and Metaprogramming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0902` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-AP-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Advanced Python: Idiomatic Design, Iterators, and Metaprogramming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Idiomatic Python and data model
2. Iterators and generators
3. Comprehensions and functional tools
4. Decorators and closures
5. Context managers and resource handling
6. Metaprogramming
7. Packaging and typing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Idiomatic Python and data model (MASTEMY-DESIGN 15%)

- Worked applications: (1) Give a class __repr__ and __eq__ that behave sensibly; (2) Make an object sortable with __lt__
- Common misconception addressed: Overusing getters/setters instead of attributes and properties
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pythonic style and the data model (dunder) methods | 103 | 6 |
| M01L02 | Equality, hashing and ordering | 103 | 6 |

### M02 Iterators and generators (MASTEMY-DESIGN 17%)

- Worked applications: (1) Turn an eager list builder into a generator pipeline; (2) Implement __iter__ for a custom collection
- Common misconception addressed: Materialising a huge sequence into a list when a generator would do
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The iterator protocol and building iterables | 103 | 6 |
| M02L02 | Generators, yield and lazy pipelines | 103 | 6 |

### M03 Comprehensions and functional tools (MASTEMY-DESIGN 14%)

- Worked applications: (1) Replace a nested loop with itertools.chain and islice; (2) Use functools.reduce where it genuinely reads clearly
- Common misconception addressed: Forcing everything into one unreadable comprehension
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Comprehensions, generator expressions | 103 | 6 |
| M03L02 | map, filter, functools and itertools | 103 | 6 |

### M04 Decorators and closures (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a timing decorator that preserves the function's metadata; (2) Build a caching decorator with functools.lru_cache
- Common misconception addressed: Forgetting functools.wraps and losing the function's name/docstring
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Closures and first-class functions | 103 | 6 |
| M04L02 | Decorators, functools.wraps and parameterised decorators | 103 | 6 |

### M05 Context managers and resource handling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Build a context manager with contextlib.contextmanager; (2) Ensure cleanup runs even when the block raises
- Common misconception addressed: Writing try/finally everywhere instead of a context manager
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The context-manager protocol | 103 | 6 |
| M05L02 | contextlib and reusable managers | 103 | 6 |

### M06 Metaprogramming (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add a validated attribute with a descriptor; (2) Reduce memory with __slots__ on a hot class
- Common misconception addressed: Reaching for a metaclass when a class decorator would do
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Properties, descriptors and __slots__ | 103 | 6 |
| M06L02 | Metaclasses and class decorators (when and when not) | 103 | 6 |

### M07 Packaging and typing (MASTEMY-DESIGN 12%)

- Worked applications: (1) Model a record with a dataclass and type hints; (2) Define a Protocol to type a duck-typed interface
- Common misconception addressed: Adding type hints that lie about the real behaviour
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Type hints, dataclasses and protocols | 102 | 6 |
| M07L02 | Packaging, modules and public API design | 102 | 6 |

## Integrative case

Refactor a data-processing script into an idiomatic Python package: replace loops with generators, add a custom iterator and context manager, use decorators for timing and caching, and expose a clean API while keeping memory flat on large inputs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0902-final-protected | 36 | 36 | yes |
| MST-0902-final-alternate | 36 | 36 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Idiomatic Python and data model | 6 |
| Iterators and generators | 5 |
| Comprehensions and functional tools | 5 |
| Decorators and closures | 5 |
| Context managers and resource handling | 5 |
| Metaprogramming | 5 |
| Packaging and typing | 5 |

Minimum reviewed item bank: 492 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0902-Q0001** (single-answer, Select ONE) What is the main memory advantage of a generator over returning a list?

- A. It yields items one at a time, so the whole sequence need never be held in memory **(key)**  
  _Rationale:_ Correct: a generator produces values lazily on demand, keeping memory flat regardless of length.
- B. It sorts the items as it produces them  
  _Rationale:_ Generators do not sort; they yield in the order produced.
- C. It runs the producing code in parallel  
  _Rationale:_ Generators are single-threaded and lazy, not parallel.
- D. It caches every produced value for reuse  
  _Rationale:_ A plain generator does not cache; once consumed, values are gone.

**MST-0902-Q0002** (multiple-answer, Select ALL that apply) Which are correct reasons to use functools.wraps when writing a decorator? (Select TWO)

- A. It preserves the wrapped function's __name__ and __doc__ **(key)**  
  _Rationale:_ Correct: wraps copies identifying metadata to the wrapper.
- B. It keeps introspection and debugging tools showing the original function **(key)**  
  _Rationale:_ Correct: tools that read metadata then report the real function.
- C. It makes the decorator run asynchronously  
  _Rationale:_ wraps has nothing to do with async execution.
- D. It is required for the decorator to accept arguments  
  _Rationale:_ Parameterised decorators are a separate pattern; wraps is about metadata.

**MST-0902-Q0003** (single-answer, Select ONE) When is a metaclass the appropriate tool rather than a class decorator?

- A. When you must customise class creation itself, such as registering or validating every subclass automatically **(key)**  
  _Rationale:_ Correct: metaclasses hook into class construction, which is what per-subclass behaviour requires.
- B. Whenever you want to add a method to a single class  
  _Rationale:_ A plain method or class decorator handles that far more simply.
- C. To speed up attribute access  
  _Rationale:_ Attribute speed is addressed by __slots__/descriptors, not metaclasses.
- D. To make instances immutable  
  _Rationale:_ Immutability is better achieved with properties, frozen dataclasses or __slots__.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
