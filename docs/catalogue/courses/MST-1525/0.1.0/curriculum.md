# C++ Programming Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1525` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — C++ Programming Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write, compile and reason about basic C++ programs and their type system
2. Manage memory and resources using RAII and smart pointers
3. Use classes, templates and the standard library effectively
4. Apply modern C++ features and tooling to write safer code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 C++ basics and the type system (25%, MASTEMY-DESIGN)

- Worked applications: (1) Fix a program that fails to compile due to const and reference errors; (2) Choose pass-by-value, by-reference and by-const-reference for three functions
- Common misconception addressed: Assuming C++ behaves like a garbage-collected language
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Compilation model and toolchain | 120 | 6 |
| M01L02 | Variables, types and auto | 120 | 6 |
| M01L03 | Control flow and functions | 120 | 6 |
| M01L04 | References and const correctness | 120 | 6 |

### M02 Memory and resource management (25%, MASTEMY-DESIGN)

- Worked applications: (1) Replace raw new/delete with unique_ptr and shared_ptr correctly; (2) Diagnose a memory leak and a double-free in sample code
- Common misconception addressed: Believing smart pointers eliminate all need to understand ownership
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Stack versus heap | 120 | 6 |
| M02L02 | Pointers and new/delete | 120 | 6 |
| M02L03 | RAII and smart pointers | 120 | 6 |
| M02L04 | The rule of zero/three/five | 120 | 6 |

### M03 Classes, templates and the STL (25%, MASTEMY-DESIGN)

- Worked applications: (1) Implement a small value class following the rule of five; (2) Pick the right STL container for three access patterns
- Common misconception addressed: Using a vector where a map or set would give the right complexity
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Classes, constructors and destructors | 120 | 6 |
| M03L02 | Operator overloading basics | 120 | 6 |
| M03L03 | Templates and generic functions | 120 | 6 |
| M03L04 | STL containers and algorithms | 120 | 6 |

### M04 Modern C++ and safe practice (25%, MASTEMY-DESIGN)

- Worked applications: (1) Enable a move constructor and measure the copy it avoids; (2) Catch undefined behaviour with a sanitiser build
- Common misconception addressed: Treating a successful compile as proof the program is memory-safe
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Move semantics and value categories | 120 | 6 |
| M04L02 | Lambdas and functional style | 120 | 6 |
| M04L03 | Error handling: exceptions and expected | 120 | 6 |
| M04L04 | Build, test and sanitiser tooling | 120 | 6 |

## Integrative case

A small command-line tool crashes intermittently and leaks memory. Using modern C++ ownership, containers and sanitiser tooling, rework it to be correct and resource-safe, and explain each ownership decision.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1525-final-protected | 144 | 144 | yes |
| MST-1525-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| C++ basics and the type system | 36 |
| Memory and resource management | 36 |
| Classes, templates and the STL | 36 |
| Modern C++ and safe practice | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1525-Q0001** (single-answer, Select ONE) A function returns a large object that is immediately used and discarded. Which modern C++ feature most directly avoids an unnecessary deep copy?

- A. Move semantics **(key)**  
  _Rationale:_ Correct: move semantics transfer ownership of the resource instead of copying it.
- B. A raw pointer return  
  _Rationale:_ Returning a raw pointer reintroduces manual ownership and leak risk.
- C. Declaring the function inline  
  _Rationale:_ inline affects linkage/expansion, not copy avoidance for the returned object.
- D. Marking the parameter const  
  _Rationale:_ const on a parameter does not affect how the return value is moved or copied.

**MST-1525-Q0002** (single-answer, Select ONE) Which smart pointer expresses sole ownership of a heap object with no reference counting overhead?

- A. std::unique_ptr **(key)**  
  _Rationale:_ Correct: unique_ptr models exclusive ownership and has no reference-count overhead.
- B. std::shared_ptr  
  _Rationale:_ shared_ptr carries an atomic reference count for shared ownership.
- C. std::weak_ptr  
  _Rationale:_ weak_ptr is a non-owning observer of a shared_ptr.
- D. A raw pointer  
  _Rationale:_ A raw pointer expresses no ownership policy at all.

**MST-1525-Q0003** (multiple-answer, Select TWO) Which TWO are direct benefits of the RAII idiom in C++? (Select TWO)

- A. Resources are released when their owning object goes out of scope **(key)**  
  _Rationale:_ Correct: the destructor runs deterministically at scope exit, freeing the resource.
- B. Cleanup still happens when an exception unwinds the stack **(key)**  
  _Rationale:_ Correct: stack unwinding runs destructors, so RAII releases resources on exceptions.
- C. It removes the need for a type system  
  _Rationale:_ RAII is unrelated to whether the language is typed.
- D. It makes all code run faster  
  _Rationale:_ RAII is about correctness of resource release, not raw speed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
