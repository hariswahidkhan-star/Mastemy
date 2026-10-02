# Haskell: Functional Programming and Type-Driven Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0926` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-HFP-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Haskell: Functional Programming and Type-Driven Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Haskell and GHCi
2. Functions, currying and higher-order functions
3. Types, type classes and type inference
4. Algebraic data types and pattern matching
5. Laziness, recursion and folds
6. Functors, applicatives and monads
7. Working with IO and the Maybe and Either types
8. Modules, testing and building with Cabal or Stack

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Haskell and GHCi (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a curried add function and apply it partially; (2) Compose two functions with the . operator
- Common misconception addressed: Expecting side effects to run in the order written without the IO type
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing GHC and using GHCi | 120 | 6 |
| M01L02 | Values, functions and basic types | 120 | 6 |

### M02 Functions, currying and higher-order functions (MASTEMY-DESIGN 13%)

- Worked applications: (1) Implement map in terms of foldr; (2) Filter and transform a list with higher-order functions
- Common misconception addressed: Thinking functions can take multiple arguments rather than being curried
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Partial application and currying | 120 | 6 |
| M02L02 | Higher-order functions: map, filter, fold | 120 | 6 |

### M03 Types, type classes and type inference (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add a type signature to a polymorphic function; (2) Make a custom type an instance of Show
- Common misconception addressed: Confusing a type class with an object-oriented interface at runtime
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reading type signatures | 120 | 6 |
| M03L02 | Type classes and ad-hoc polymorphism | 120 | 6 |

### M04 Algebraic data types and pattern matching (MASTEMY-DESIGN 12%)

- Worked applications: (1) Define a Shape data type and match on it; (2) Use record syntax to update a field
- Common misconception addressed: Assuming data is mutable after construction
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defining data types with constructors | 120 | 6 |
| M04L02 | Pattern matching and record syntax | 120 | 6 |

### M05 Laziness, recursion and folds (MASTEMY-DESIGN 13%)

- Worked applications: (1) Take the first n elements of an infinite list; (2) Replace explicit recursion with a fold
- Common misconception addressed: Forcing a whole infinite list instead of relying on laziness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Lazy evaluation and infinite lists | 120 | 6 |
| M05L02 | Recursion schemes and foldr/foldl | 120 | 6 |

### M06 Functors, applicatives and monads (MASTEMY-DESIGN 13%)

- Worked applications: (1) Use fmap to map over a Maybe value; (2) Chain computations with the bind operator
- Common misconception addressed: Believing a monad is a container rather than a sequencing abstraction
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Functor and the fmap abstraction | 120 | 6 |
| M06L02 | Applicative and monad basics | 120 | 6 |

### M07 Working with IO and the Maybe and Either types (MASTEMY-DESIGN 12%)

- Worked applications: (1) Read a line of input and echo it in IO; (2) Safely parse a number returning Maybe
- Common misconception addressed: Using error or head on empty input instead of Maybe or Either
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Sequencing effects with IO | 120 | 6 |
| M07L02 | Modelling absence and errors with Maybe and Either | 120 | 6 |

### M08 Modules, testing and building with Cabal or Stack (MASTEMY-DESIGN 12%)

- Worked applications: (1) Split a program across two modules; (2) Write a QuickCheck property for a function
- Common misconception addressed: Skipping property tests because the types compiled
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Organising code into modules | 120 | 6 |
| M08L02 | Property-based testing and building a project | 120 | 6 |

## Integrative case

Design a small type-driven command-line tool in Haskell: model the domain with algebraic data types, parse input safely with Maybe and Either, sequence effects in IO at the edges, keep the core pure, and verify key functions with property-based tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0926-final-protected | 40 | 40 | yes |
| MST-0926-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Haskell and GHCi | 5 |
| Functions, currying and higher-order functions | 5 |
| Types, type classes and type inference | 5 |
| Algebraic data types and pattern matching | 5 |
| Laziness, recursion and folds | 5 |
| Functors, applicatives and monads | 5 |
| Working with IO and the Maybe and Either types | 5 |
| Modules, testing and building with Cabal or Stack | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0926-Q0001** (single-answer, Select ONE) In Haskell, why is the IO type needed for reading input or printing output?

- A. It keeps effects explicit in the type system and lets the pure core stay referentially transparent while effects run at the edges **(key)**  
  _Rationale:_ Correct: IO marks effectful computations so purity is preserved and effects are sequenced explicitly.
- B. It makes the program run faster by caching results  
  _Rationale:_ IO is about modelling effects, not caching or speed.
- C. It is required for any arithmetic operation  
  _Rationale:_ Pure arithmetic needs no IO.
- D. It automatically parallelises the code  
  _Rationale:_ IO does not imply parallelism.

**MST-0926-Q0002** (multiple-answer, Select ALL that apply) Which statements about Haskell type classes are correct? (Select TWO)

- A. A type class defines a set of functions that instance types must implement **(key)**  
  _Rationale:_ Correct: a type class specifies an interface that each instance provides.
- B. They enable ad-hoc polymorphism so one function name works across many types **(key)**  
  _Rationale:_ Correct: type classes give overloaded behaviour resolved by the type.
- C. A type can belong to at most one type class  
  _Rationale:_ A type can be an instance of many type classes.
- D. Type class methods are dispatched on a runtime object header like OOP virtual methods  
  _Rationale:_ Dispatch is resolved by type, typically at compile time, not via a runtime object header.

**MST-0926-Q0003** (single-answer, Select ONE) What does laziness allow you to do with an expression like take 5 [1..] ?

- A. Produce only the elements that are demanded, so an infinite list can be used safely **(key)**  
  _Rationale:_ Correct: lazy evaluation computes values only as needed, so take 5 forces just five elements.
- B. Evaluate the whole infinite list first and then slice it  
  _Rationale:_ That would never terminate; laziness avoids forcing the whole list.
- C. Convert the list into a strict array in memory  
  _Rationale:_ Laziness avoids building the full structure, not forces it.
- D. Run the computation on multiple cores automatically  
  _Rationale:_ Laziness is about evaluation order, not parallelism.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
