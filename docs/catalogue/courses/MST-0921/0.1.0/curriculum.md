# Julia: Scientific and Numerical Computing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0921` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-JSC-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Julia: Scientific and Numerical Computing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Julia and the REPL
2. Types, multiple dispatch and methods
3. Arrays, broadcasting and linear algebra
4. Control flow, functions and scope
5. Packages, environments and the standard library
6. Performance: type stability and profiling
7. Numerical computing and differential equations
8. Data, plotting and reproducible workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Julia and the REPL (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a function that dispatches on integer and float arguments; (2) Benchmark a loop versus a broadcast over a large vector
- Common misconception addressed: Expecting 1-based arrays to behave like 0-based ones from other languages
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing Julia, the REPL and package mode | 120 | 6 |
| M01L02 | Variables, numeric types and basic I/O | 120 | 6 |

### M02 Types, multiple dispatch and methods (MASTEMY-DESIGN 13%)

- Worked applications: (1) Define a parametric Point type and a method for it; (2) Add a specialised method for a concrete subtype
- Common misconception addressed: Thinking multiple dispatch is just method overloading on the first argument
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defining types and constructors | 120 | 6 |
| M02L02 | Multiple dispatch and method specialisation | 120 | 6 |

### M03 Arrays, broadcasting and linear algebra (MASTEMY-DESIGN 12%)

- Worked applications: (1) Multiply two matrices and solve Ax=b; (2) Normalise columns of a matrix with broadcasting
- Common misconception addressed: Forgetting that broadcasting with a dot avoids temporary allocations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Creating and indexing arrays | 120 | 6 |
| M03L02 | Broadcasting and matrix operations | 120 | 6 |

### M04 Control flow, functions and scope (MASTEMY-DESIGN 12%)

- Worked applications: (1) Implement a numeric integrator with a loop; (2) Refactor a nested loop into a comprehension
- Common misconception addressed: Assuming variables leak out of a for loop into global scope
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Conditionals, loops and comprehensions | 120 | 6 |
| M04L02 | Functions, closures and scope rules | 120 | 6 |

### M05 Packages, environments and the standard library (MASTEMY-DESIGN 13%)

- Worked applications: (1) Activate a project and add a dependency; (2) Import Statistics and compute a mean and std
- Common misconception addressed: Editing a global environment instead of a per-project one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Project environments and Pkg | 120 | 6 |
| M05L02 | Modules and using the standard library | 120 | 6 |

### M06 Performance: type stability and profiling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Fix a type-unstable function flagged by @code_warntype; (2) Profile a hot path and reduce allocations
- Common misconception addressed: Believing Julia is slow because the first call compiles the method
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Writing type-stable functions | 120 | 6 |
| M06L02 | Profiling and @code_warntype | 120 | 6 |

### M07 Numerical computing and differential equations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Integrate a first-order ODE over an interval; (2) Find a root of a nonlinear function
- Common misconception addressed: Choosing an explicit loop when a tested library solver is more accurate
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Solving linear systems and roots | 120 | 6 |
| M07L02 | Using DifferentialEquations.jl for an ODE | 120 | 6 |

### M08 Data, plotting and reproducible workflows (MASTEMY-DESIGN 12%)

- Worked applications: (1) Group a DataFrame and summarise it; (2) Produce a labelled plot and save it to a file
- Common misconception addressed: Not seeding the RNG and then expecting identical results across runs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Loading tabular data with DataFrames | 120 | 6 |
| M08L02 | Plotting results and seeding for reproducibility | 120 | 6 |

## Integrative case

Build a reproducible numerical pipeline in Julia: load an experiment dataset, fit a model that solves a small ODE system, make the hot function type-stable, benchmark it, and produce a seeded, labelled plot that another analyst can regenerate exactly.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0921-final-protected | 40 | 40 | yes |
| MST-0921-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Julia and the REPL | 5 |
| Types, multiple dispatch and methods | 5 |
| Arrays, broadcasting and linear algebra | 5 |
| Control flow, functions and scope | 5 |
| Packages, environments and the standard library | 5 |
| Performance: type stability and profiling | 5 |
| Numerical computing and differential equations | 5 |
| Data, plotting and reproducible workflows | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0921-Q0001** (single-answer, Select ONE) In Julia, what does adding a dot to an operator or function call (for example x .+ 1) do?

- A. It applies the operation element-wise across the array without building intermediate temporaries when fused **(key)**  
  _Rationale:_ Correct: the dot syntax broadcasts and fuses element-wise operations, avoiding temporary allocations.
- B. It converts the array to a different numeric type  
  _Rationale:_ Type conversion is done with functions like convert or constructors, not the dot.
- C. It forces the computation to run on the GPU  
  _Rationale:_ GPU execution requires a GPU array type and package, not the broadcast dot.
- D. It makes the operation run in parallel across threads  
  _Rationale:_ Broadcasting is element-wise, not automatically multithreaded.

**MST-0921-Q0002** (multiple-answer, Select ALL that apply) Which statements about multiple dispatch in Julia are correct? (Select TWO)

- A. A method can be chosen based on the types of all of its arguments, not just the first **(key)**  
  _Rationale:_ Correct: Julia selects the most specific method using the types of every argument.
- B. Adding a new method for existing types extends a function without editing the original definition **(key)**  
  _Rationale:_ Correct: you can add methods to an existing generic function for new type combinations.
- C. Dispatch is resolved only on the runtime value, never on the type  
  _Rationale:_ Dispatch is resolved on argument types, which is how specialisation happens.
- D. Each function may define only one method  
  _Rationale:_ A generic function can have many methods for different type signatures.

**MST-0921-Q0003** (single-answer, Select ONE) A function shows red ::Any annotations under @code_warntype. What is the most likely consequence?

- A. The compiler cannot specialise the code, so it runs slower and allocates more **(key)**  
  _Rationale:_ Correct: type instability prevents specialisation and causes boxing and extra allocation.
- B. The function will raise a syntax error at parse time  
  _Rationale:_ Type instability is a performance issue, not a syntax error.
- C. The function cannot be exported from a module  
  _Rationale:_ Exporting is unrelated to type stability.
- D. The results will be numerically incorrect  
  _Rationale:_ Results are still correct; only performance suffers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
