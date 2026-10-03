# Kotlin Programming: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2574` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Kotlin Programming: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use lambdas, higher-order functions and the standard scope functions
2. Apply collection operators to transform and aggregate data
3. Design classes with inheritance, interfaces and sealed hierarchies
4. Use generics with variance and reified type parameters
5. Handle errors with exceptions and Result-style patterns
6. Organise code with extension functions and operator overloading

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Lambdas and scope functions (20% (design weight), design weight)

- Worked applications: (1) Configure an object with apply; (2) Pass a lambda as the last argument
- Common misconception addressed: Confusing the receiver of run vs let
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Lambdas and higher-order functions | 64 | 4 |
| M01L02 | let, run, apply, also, with | 64 | 4 |
| M01L03 | Trailing lambda syntax | 64 | 4 |

### M02 Collection operators (20% (design weight), design weight)

- Worked applications: (1) Group orders by customer with groupBy; (2) Sum with fold
- Common misconception addressed: Materialising a huge list instead of a sequence
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | map, filter, flatMap | 64 | 4 |
| M02L02 | groupBy, associate and fold | 64 | 4 |
| M02L03 | Sequences for lazy pipelines | 64 | 4 |

### M03 OOP and sealed classes (20% (design weight), design weight)

- Worked applications: (1) Model a result with a sealed hierarchy; (2) Implement an interface with a default
- Common misconception addressed: Forgetting open so a class cannot be subclassed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Open classes and overriding | 64 | 4 |
| M03L02 | Interfaces and default methods | 64 | 4 |
| M03L03 | Sealed classes and exhaustive when | 64 | 4 |

### M04 Generics (20% (design weight), design weight)

- Worked applications: (1) Write an out-variant producer; (2) Use a reified inline function
- Common misconception addressed: Expecting Java-style wildcards without declaring variance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Generic classes and functions | 64 | 4 |
| M04L02 | in/out variance | 64 | 4 |
| M04L03 | reified type parameters | 64 | 4 |

### M05 Extensions and errors (20% (design weight), design weight)

- Worked applications: (1) Add an extension to String; (2) Wrap a risky call in runCatching
- Common misconception addressed: Thinking an extension can access private members
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Extension functions and properties | 64 | 4 |
| M05L02 | Operator overloading | 64 | 4 |
| M05L03 | Exceptions and runCatching | 64 | 4 |

## Integrative case

A developer builds an order-analytics module in Kotlin: aggregate orders with collection operators, model outcomes with a sealed class, expose results via extension functions, and surface failures with runCatching.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2574-final-protected | 40 | 40 | yes |
| MST-2574-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Lambdas and scope functions | 8 |
| Collection operators | 8 |
| OOP and sealed classes | 8 |
| Generics | 8 |
| Extensions and errors | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2574-Q0001** (single-answer, Select ONE) What is the receiver and return value of the scope function apply?

- A. Receiver is this; it returns the same object after running the block **(key)**  
  _Rationale:_ apply runs the block with the object as this and returns that object, ideal for configuration.
- B. Receiver is it; it returns the block's last expression  
  _Rationale:_ That describes let, not apply.
- C. It returns Unit always  
  _Rationale:_ apply returns the receiver object, not Unit.
- D. It cannot be chained  
  _Rationale:_ apply returns the object, so it chains naturally.

**MST-2574-Q0002** (multiple-answer, Select TWO) Select TWO reasons to prefer a Sequence over a List for a long transformation pipeline in Kotlin.

- A. Operations are evaluated lazily, element by element **(key)**  
  _Rationale:_ Sequences avoid building an intermediate collection per step.
- B. It avoids allocating an intermediate collection at each step **(key)**  
  _Rationale:_ Lazy evaluation processes one element through the whole chain.
- C. It automatically parallelises across cores  
  _Rationale:_ Sequences are not parallel by default.
- D. It guarantees the result is sorted  
  _Rationale:_ Sequences do not sort unless you ask them to.

**MST-2574-Q0003** (single-answer, Select ONE) Why does an exhaustive when over a sealed class not need an else branch?

- A. The compiler knows all subclasses, so covering each makes the when complete **(key)**  
  _Rationale:_ Sealed hierarchies are closed, enabling exhaustiveness checking.
- B. else is never allowed with sealed classes  
  _Rationale:_ else is allowed but unnecessary when all cases are covered.
- C. Sealed classes can only have one subclass  
  _Rationale:_ They can have many, all known at compile time.
- D. when always requires else regardless  
  _Rationale:_ Exhaustive when expressions over sealed types do not require else.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
