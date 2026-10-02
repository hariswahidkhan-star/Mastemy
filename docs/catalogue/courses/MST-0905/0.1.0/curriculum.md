# C Programming: Systems Foundations and Memory Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0905` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-CP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — C Programming: Systems Foundations and Memory Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. C fundamentals and the build process
2. Operators, control flow and functions
3. Pointers
4. Arrays, strings and structs
5. Dynamic memory management
6. Files, modularity and robustness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 C fundamentals and the build process (MASTEMY-DESIGN 14%)

- Worked applications: (1) Compile a multi-file program and read a linker error; (2) Trace how a macro expands before compilation
- Common misconception addressed: Confusing the preprocessor with the compiler
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Program structure, types and the preprocessor | 80 | 6 |
| M01L02 | Compiling, linking and the toolchain | 80 | 6 |

### M02 Operators, control flow and functions (MASTEMY-DESIGN 13%)

- Worked applications: (1) Reason about integer overflow in a loop counter; (2) Pass by value vs by pointer to a function
- Common misconception addressed: Assuming int cannot overflow
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Expressions, control flow and integer behaviour | 80 | 6 |
| M02L02 | Functions, scope and the stack | 80 | 6 |

### M03 Pointers (MASTEMY-DESIGN 17%)

- Worked applications: (1) Walk an array with pointer arithmetic; (2) Swap two values through pointers
- Common misconception addressed: Dereferencing an uninitialised or null pointer
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pointer basics, addresses and dereferencing | 80 | 6 |
| M03L02 | Pointers, arrays and pointer arithmetic | 80 | 6 |

### M04 Arrays, strings and structs (MASTEMY-DESIGN 15%)

- Worked applications: (1) Copy a string safely with a bounded length; (2) Define a struct for a record and access members via pointer
- Common misconception addressed: Forgetting the null terminator and reading past a buffer
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | C strings, null termination and buffers | 80 | 6 |
| M04L02 | Structs, unions and memory layout | 80 | 6 |

### M05 Dynamic memory management (MASTEMY-DESIGN 18%)

- Worked applications: (1) Grow a dynamic array with realloc and handle failure; (2) Track ownership so every malloc has one matching free
- Common misconception addressed: Using memory after free or freeing it twice
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | malloc, free, realloc and ownership | 80 | 6 |
| M05L02 | Leaks, double-free and dangling pointers | 80 | 6 |

### M06 Files, modularity and robustness (MASTEMY-DESIGN 23%)

- Worked applications: (1) Read a file line by line and handle a read error; (2) Split code into a header and implementation and run a sanitizer
- Common misconception addressed: Ignoring return values of I/O and allocation calls
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | File I/O and error handling with errno | 80 | 6 |
| M06L02 | Headers, separate compilation and debugging tools | 80 | 6 |

## Integrative case

Build a small C program that parses a text file into a dynamically sized table: manage memory manually without leaks, use pointers and structs, split into compilation units with a header, and verify with a sanitizer and tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0905-final-protected | 30 | 30 | yes |
| MST-0905-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| C fundamentals and the build process | 5 |
| Operators, control flow and functions | 5 |
| Pointers | 5 |
| Arrays, strings and structs | 5 |
| Dynamic memory management | 5 |
| Files, modularity and robustness | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0905-Q0001** (single-answer, Select ONE) After calling free(p), what must you avoid doing with p?

- A. Dereferencing or freeing it again, because it is now a dangling pointer **(key)**  
  _Rationale:_ Correct: after free the pointer no longer owns valid memory; using or freeing it again is undefined behaviour.
- B. Setting it to NULL  
  _Rationale:_ Setting it to NULL is actually a recommended safety step, not something to avoid.
- C. Printing its former address value  
  _Rationale:_ Printing the (now stale) value is harmless; dereferencing it is the danger.
- D. Declaring a new pointer of the same type  
  _Rationale:_ Declaring other pointers is unrelated and fine.

**MST-0905-Q0002** (multiple-answer, Select ALL that apply) Which conditions are undefined behaviour in C? (Select TWO)

- A. Reading an element past the end of an array **(key)**  
  _Rationale:_ Correct: out-of-bounds access is undefined behaviour.
- B. Using the value of an uninitialised local variable **(key)**  
  _Rationale:_ Correct: reading an indeterminate value is undefined behaviour.
- C. Assigning NULL to a pointer  
  _Rationale:_ Assigning NULL is well defined and common.
- D. Calling free on a pointer returned by malloc exactly once  
  _Rationale:_ Freeing a valid allocation once is the correct, defined behaviour.

**MST-0905-Q0003** (single-answer, Select ONE) Why must you check the return value of malloc?

- A. malloc can return NULL when allocation fails, and using that pointer is undefined behaviour **(key)**  
  _Rationale:_ Correct: on failure malloc returns NULL, so dereferencing it without checking is a crash or worse.
- B. malloc always succeeds, so the check is only for style  
  _Rationale:_ malloc can fail; the check is functional, not cosmetic.
- C. The check frees the memory automatically  
  _Rationale:_ Checking the pointer does not free anything.
- D. Without the check the memory is allocated twice  
  _Rationale:_ No double allocation occurs; the risk is a NULL dereference.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
