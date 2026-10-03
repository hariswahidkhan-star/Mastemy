# Ruby Programming: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2583` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Ruby Programming: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design classes with modules, mixins and composition
2. Use enumerable methods fluently for data transformation
3. Apply blocks, procs and lambdas and know their differences
4. Handle exceptions with custom error classes and ensure
5. Use metaprogramming basics like method_missing and define_method responsibly
6. Organise code with gems, require and a conventional project layout

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Classes and modules (20% (design weight), design weight)

- Worked applications: (1) Mix a module into a class with include; (2) Expose state with attr_accessor
- Common misconception addressed: Overusing inheritance where a mixin fits
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Classes, attr_accessor and self | 64 | 4 |
| M01L02 | Modules as mixins | 64 | 4 |
| M01L03 | Composition over inheritance | 64 | 4 |

### M02 Enumerable (20% (design weight), design weight)

- Worked applications: (1) Group records with group_by; (2) Accumulate with each_with_object
- Common misconception addressed: Chaining enumerables that each build full arrays
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | map, select, reject, reduce | 64 | 4 |
| M02L02 | group_by, partition, each_with_object | 64 | 4 |
| M02L03 | Lazy enumerators | 64 | 4 |

### M03 Blocks, procs and lambdas (20% (design weight), design weight)

- Worked applications: (1) Pass a method as a block with &:sym; (2) Return early from a lambda
- Common misconception addressed: Assuming proc and lambda handle return identically
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Proc vs lambda arity and return | 64 | 4 |
| M03L02 | Converting blocks with & | 64 | 4 |
| M03L03 | Closures and captured scope | 64 | 4 |

### M04 Exceptions (20% (design weight), design weight)

- Worked applications: (1) Define and raise a custom error; (2) Ensure a file is closed
- Common misconception addressed: Rescuing Exception instead of StandardError
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | raise and custom error classes | 64 | 4 |
| M04L02 | rescue, retry and ensure | 64 | 4 |
| M04L03 | Exception hierarchy | 64 | 4 |

### M05 Metaprogramming and gems (20% (design weight), design weight)

- Worked applications: (1) Add dynamic methods with define_method; (2) Manage dependencies with Bundler
- Common misconception addressed: Abusing method_missing and hurting readability
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | method_missing and respond_to_missing? | 64 | 4 |
| M05L02 | define_method | 64 | 4 |
| M05L03 | Gems, Bundler and require | 64 | 4 |

## Integrative case

A developer builds a Ruby reporting library: share behaviour via modules, transform records with Enumerable, expose a small DSL via define_method, and raise custom errors wrapped with ensure for cleanup.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2583-final-protected | 40 | 40 | yes |
| MST-2583-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Classes and modules | 8 |
| Enumerable | 8 |
| Blocks, procs and lambdas | 8 |
| Exceptions | 8 |
| Metaprogramming and gems | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2583-Q0001** (single-answer, Select ONE) What is a key difference between a lambda and a non-lambda Proc in Ruby?

- A. A lambda checks argument count and return exits only the lambda **(key)**  
  _Rationale:_ Lambdas enforce arity and their return is local; procs are lax and return from the enclosing method.
- B. A lambda cannot take arguments  
  _Rationale:_ Lambdas take arguments; they check their count.
- C. A proc cannot be stored in a variable  
  _Rationale:_ Both can be stored in variables.
- D. They are identical in all respects  
  _Rationale:_ Arity checking and return semantics differ.

**MST-2583-Q0002** (multiple-answer, Select TWO) Select TWO sound uses of modules in Ruby.

- A. Mixing shared instance methods into multiple classes with include **(key)**  
  _Rationale:_ Modules provide mixin behaviour across unrelated classes.
- B. Namespacing related constants and classes **(key)**  
  _Rationale:_ Modules act as namespaces to avoid name clashes.
- C. Instantiating the module directly with new  
  _Rationale:_ Modules cannot be instantiated.
- D. Replacing the need for any classes at all  
  _Rationale:_ Modules complement classes rather than replace them.

**MST-2583-Q0003** (single-answer, Select ONE) Why rescue StandardError rather than Exception in typical Ruby code?

- A. Rescuing Exception also traps signals and exit, which you usually should not **(key)**  
  _Rationale:_ StandardError is the right base for ordinary errors; Exception is too broad.
- B. Exception cannot be rescued at all  
  _Rationale:_ It can be rescued, which is exactly the danger.
- C. StandardError is faster to rescue  
  _Rationale:_ The reason is scope of what is caught, not speed.
- D. Exception does not include runtime errors  
  _Rationale:_ Exception is the superclass of StandardError and its runtime errors.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
