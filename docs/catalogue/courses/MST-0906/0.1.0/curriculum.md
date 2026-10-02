# Modern C++: Complete Language and Application Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0906` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-MC-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Modern C++: Complete Language and Application Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Modern C++ foundations
2. Objects, classes and RAII
3. Memory and smart pointers
4. The STL: containers and iterators
5. STL algorithms and lambdas
6. Templates and generic programming
7. Error handling and the type system
8. Move semantics and organising code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Modern C++ foundations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Choose value, reference or const-reference for a parameter; (2) Build a small project with CMake
- Common misconception addressed: Writing C-style C++ and ignoring value semantics
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From C to modern C++; compilation and build | 120 | 6 |
| M01L02 | auto, references, const and value semantics | 120 | 6 |

### M02 Objects, classes and RAII (MASTEMY-DESIGN 14%)

- Worked applications: (1) Wrap a resource in an RAII class so cleanup is automatic; (2) Apply the rule of zero by using members that manage themselves
- Common misconception addressed: Managing resources by hand in destructors unnecessarily
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classes, constructors and the rule of zero/five | 120 | 6 |
| M02L02 | RAII and deterministic cleanup | 120 | 6 |

### M03 Memory and smart pointers (MASTEMY-DESIGN 14%)

- Worked applications: (1) Replace raw new/delete with unique_ptr; (2) Choose unique vs shared ownership for a graph node
- Common misconception addressed: Using shared_ptr everywhere and creating reference cycles
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Stack vs heap; new/delete pitfalls | 120 | 6 |
| M03L02 | unique_ptr, shared_ptr and ownership | 120 | 6 |

### M04 The STL: containers and iterators (MASTEMY-DESIGN 14%)

- Worked applications: (1) Pick the right container for a lookup-heavy workload; (2) Iterate and erase safely from a vector
- Common misconception addressed: Invalidating iterators by modifying a container mid-loop
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | vector, map, unordered_map and friends | 120 | 6 |
| M04L02 | Iterators and ranges | 120 | 6 |

### M05 STL algorithms and lambdas (MASTEMY-DESIGN 14%)

- Worked applications: (1) Sort records with a lambda comparator; (2) Sum a field with accumulate and a projection
- Common misconception addressed: Hand-writing loops that an algorithm expresses more safely
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Algorithms: sort, find, transform, accumulate | 120 | 6 |
| M05L02 | Lambdas and function objects | 120 | 6 |

### M06 Templates and generic programming (MASTEMY-DESIGN 14%)

- Worked applications: (1) Write a generic min/max that works for any comparable type; (2) Constrain a template with a concept
- Common misconception addressed: Letting a template fail with an unreadable error instead of a concept
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Function and class templates | 120 | 6 |
| M06L02 | Basic concepts and constraints | 120 | 6 |

### M07 Error handling and the type system (MASTEMY-DESIGN 10%)

- Worked applications: (1) Return optional for a lookup that may miss; (2) Provide the strong exception guarantee for an operation
- Common misconception addressed: Using error codes and exceptions inconsistently
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Exceptions, noexcept and guarantees | 120 | 6 |
| M07L02 | optional, variant and expected-style results | 120 | 6 |

### M08 Move semantics and organising code (MASTEMY-DESIGN 8%)

- Worked applications: (1) Add a move constructor to avoid a deep copy; (2) Split declarations and definitions across header and source
- Common misconception addressed: Returning by moving a local that the compiler already elides
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | lvalues/rvalues, move and perfect forwarding | 120 | 6 |
| M08L02 | Headers, modules and separate compilation | 120 | 6 |

## Integrative case

Build a modern C++ inventory application: model entities with RAII and smart pointers, use the STL containers and algorithms, write generic helpers with templates, handle errors with exceptions and optional, and organise it with headers and a build system.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0906-final-protected | 40 | 40 | yes |
| MST-0906-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modern C++ foundations | 5 |
| Objects, classes and RAII | 5 |
| Memory and smart pointers | 5 |
| The STL: containers and iterators | 5 |
| STL algorithms and lambdas | 5 |
| Templates and generic programming | 5 |
| Error handling and the type system | 5 |
| Move semantics and organising code | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0906-Q0001** (single-answer, Select ONE) What problem does RAII solve in C++?

- A. It ties a resource's lifetime to an object's scope so cleanup happens automatically, even on exceptions **(key)**  
  _Rationale:_ Correct: RAII acquires in the constructor and releases in the destructor, guaranteeing cleanup when the object goes out of scope.
- B. It makes all allocation happen on the stack  
  _Rationale:_ RAII manages lifetime; the resource can still live on the heap.
- C. It disables exceptions  
  _Rationale:_ RAII works with exceptions; it does not disable them.
- D. It forces manual delete calls everywhere  
  _Rationale:_ RAII removes the need for manual delete, the opposite of this.

**MST-0906-Q0002** (multiple-answer, Select ALL that apply) Which statements about unique_ptr and shared_ptr are correct? (Select TWO)

- A. unique_ptr expresses exclusive ownership and cannot be copied **(key)**  
  _Rationale:_ Correct: unique_ptr is move-only and models a single owner.
- B. shared_ptr uses reference counting and can create cycles that leak **(key)**  
  _Rationale:_ Correct: cyclic shared_ptrs keep each other alive; weak_ptr breaks the cycle.
- C. shared_ptr is always faster than unique_ptr  
  _Rationale:_ shared_ptr carries reference-counting overhead unique_ptr does not.
- D. unique_ptr requires manual delete to free its resource  
  _Rationale:_ unique_ptr frees automatically in its destructor.

**MST-0906-Q0003** (single-answer, Select ONE) You modify a std::vector by inserting elements while holding an iterator into it. What is the risk?

- A. Insertion can reallocate the buffer, invalidating existing iterators **(key)**  
  _Rationale:_ Correct: growth may move the storage, so previously obtained iterators dangle.
- B. The vector becomes read-only  
  _Rationale:_ Vectors do not become read-only; the issue is iterator invalidation.
- C. Nothing; vector iterators are always stable  
  _Rationale:_ Vector iterators are not stable across reallocation.
- D. The elements are automatically sorted  
  _Rationale:_ Insertion does not sort the vector.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
