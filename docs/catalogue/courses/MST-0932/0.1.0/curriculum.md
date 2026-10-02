# Fortran: Scientific Computing and Legacy Modernization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0932` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fortran: Scientific Computing and Legacy Modernization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Modern Fortran basics
2. Arrays and array operations
3. Procedures and modules
4. Numerical computing
5. Performance and parallelism
6. Legacy modernization

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Modern Fortran basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compile and run a program that prints a computed result; (2) Declare double precision with a kind parameter
- Common misconception addressed: Relying on implicit typing instead of implicit none
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Compiling free-form Fortran; program structure | 80 | 5 |
| M01L02 | Intrinsic types, kinds and implicit none | 80 | 5 |

### M02 Arrays and array operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add two matrices with whole-array syntax; (2) Compute a column mean with array sections
- Common misconception addressed: Iterating arrays in row-major order and losing column-major cache locality
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Declaring arrays; bounds and layout | 80 | 5 |
| M02L02 | Whole-array operations, sections and intrinsics | 80 | 5 |

### M03 Procedures and modules (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a subroutine with intent(in) and intent(out) arguments; (2) Group constants and procedures in a module
- Common misconception addressed: Omitting an explicit interface and getting silent argument mismatches
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Subroutines, functions and intent | 80 | 5 |
| M03L02 | Modules, interfaces and encapsulation | 80 | 5 |

### M04 Numerical computing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Show how summation order changes a floating-point total; (2) Solve a small linear system with a library routine
- Common misconception addressed: Comparing floating-point results with exact equality
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Floating-point, precision and conditioning | 80 | 5 |
| M04L02 | Linear algebra and numerical library use | 80 | 5 |

### M05 Performance and parallelism (MASTEMY-DESIGN 16%)

- Worked applications: (1) Reorder loops to match column-major layout for speed; (2) Parallelise an independent loop with do concurrent
- Common misconception addressed: Assuming do concurrent is safe when iterations have data dependencies
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Memory layout, vectorisation and optimisation | 80 | 5 |
| M05L02 | do concurrent and shared-memory parallelism | 80 | 5 |

### M06 Legacy modernization (MASTEMY-DESIGN 16%)

- Worked applications: (1) Convert a COMMON block to a module with saved state; (2) Call a Fortran routine from C with iso_c_binding
- Common misconception addressed: Rewriting working legacy code wholesale instead of modernising incrementally
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Reading FORTRAN 77 fixed-form code | 80 | 5 |
| M06L02 | Incremental modernization and interoperability | 80 | 5 |

## Integrative case

Modernise a legacy FORTRAN 77 simulation kernel: wrap it in modules with explicit interfaces, replace COMMON blocks, speed up the core loops using column-major access and do concurrent, and expose the entry point to a C driver.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0932-final-protected | 42 | 42 | yes |
| MST-0932-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modern Fortran basics | 7 |
| Arrays and array operations | 7 |
| Procedures and modules | 7 |
| Numerical computing | 7 |
| Performance and parallelism | 7 |
| Legacy modernization | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0932-Q0001** (single-answer, Select ONE) Why is 'implicit none' recommended at the top of a modern Fortran program unit?

- A. It forces every variable to be explicitly declared, catching typos at compile time **(key)**  
  _Rationale:_ Correct: without it, undeclared names get implicit types and typos become silent bugs.
- B. It enables parallel execution automatically  
  _Rationale:_ It has nothing to do with parallelism.
- C. It switches the compiler to fixed-form source  
  _Rationale:_ Source form is independent of implicit none.
- D. It makes all variables double precision  
  _Rationale:_ It does not change types; it requires explicit declaration.

**MST-0932-Q0002** (multiple-answer, Select ALL that apply) Which statements about Fortran arrays are correct? (Select TWO)

- A. Arrays are stored in column-major order **(key)**  
  _Rationale:_ Correct: the leftmost index varies fastest in memory.
- B. Whole-array operations can replace explicit element loops **(key)**  
  _Rationale:_ Correct: Fortran supports array-valued expressions and sections.
- C. Arrays are stored in row-major order like C  
  _Rationale:_ Fortran is column-major, unlike C's row-major.
- D. Array bounds must always start at 1  
  _Rationale:_ Lower bounds are configurable, e.g. dimension(0:9).

**MST-0932-Q0003** (single-answer, Select ONE) What does iso_c_binding provide in modern Fortran?

- A. Standardised interoperability types and conventions for calling between Fortran and C **(key)**  
  _Rationale:_ Correct: it defines matching kinds and binding so Fortran and C can exchange data safely.
- B. Automatic GPU offloading  
  _Rationale:_ GPU offloading is a separate concern, not what the module provides.
- C. A built-in unit-testing framework  
  _Rationale:_ It is about C interoperability, not testing.
- D. Garbage collection for allocatables  
  _Rationale:_ Allocatables are managed by scope rules, not by this module.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
