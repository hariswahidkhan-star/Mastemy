# Lua: Embedded Scripting and Application Extension

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0927` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Lua: Embedded Scripting and Application Extension (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Lua language basics
2. Control flow and functions
3. Tables
4. Modules and OOP patterns
5. Embedding and the C API
6. Coroutines and application extension

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Lua language basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a script that prints a formatted greeting; (2) Experiment with nil, numbers and strings in the REPL
- Common misconception addressed: Assuming an undeclared global is an error rather than nil
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing Lua, the interpreter and running scripts | 80 | 5 |
| M01L02 | Values, types, variables and operators | 80 | 5 |

### M02 Control flow and functions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Return both quotient and remainder from one function; (2) Sum a variable number of arguments with ...
- Common misconception addressed: Forgetting that Lua arrays are 1-indexed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | if, while, numeric and generic for loops | 80 | 5 |
| M02L02 | Functions, multiple returns and varargs | 80 | 5 |

### M03 Tables (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a 2D point and add two points with __add; (2) Build a default-value table with __index
- Common misconception addressed: Using # on a table with gaps and expecting a reliable length
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Tables as arrays, maps and records | 80 | 5 |
| M03L02 | Metatables and metamethods | 80 | 5 |

### M04 Modules and OOP patterns (MASTEMY-DESIGN 17%)

- Worked applications: (1) Split helpers into a module and require it; (2) Create an Account 'class' with methods via metatables
- Common misconception addressed: Polluting the global namespace instead of returning a module table
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | require, packages and module scope | 80 | 5 |
| M04L02 | Prototype-based objects with metatables | 80 | 5 |

### M05 Embedding and the C API (MASTEMY-DESIGN 16%)

- Worked applications: (1) Trace how a host pushes arguments and reads a return value; (2) Expose a host function to a Lua script
- Common misconception addressed: Forgetting that every C API call is mediated through the virtual stack
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Why Lua is embedded: hosts and scripting | 80 | 5 |
| M05L02 | The stack-based C API and calling Lua from C | 80 | 5 |

### M06 Coroutines and application extension (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a producer/consumer with two coroutines; (2) Run a plugin script in a restricted environment
- Common misconception addressed: Confusing coroutines with OS threads and expecting true parallelism
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Coroutines: create, resume and yield | 80 | 5 |
| M06L02 | Sandboxing untrusted scripts and extension design | 80 | 5 |

## Integrative case

Add a scripting layer to a game or tool: expose a small host API to Lua, load user plugin scripts in a sandbox, drive long tasks with coroutines, and organise shared behaviour with modules and metatables.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0927-final-protected | 42 | 42 | yes |
| MST-0927-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Lua language basics | 7 |
| Control flow and functions | 7 |
| Tables | 7 |
| Modules and OOP patterns | 7 |
| Embedding and the C API | 7 |
| Coroutines and application extension | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0927-Q0001** (single-answer, Select ONE) In Lua, what is the value of an array index that has never been assigned?

- A. nil **(key)**  
  _Rationale:_ Correct: any unset key in a table evaluates to nil.
- B. 0  
  _Rationale:_ Lua does not default numeric keys to 0.
- C. An empty string  
  _Rationale:_ Unset keys are nil, not an empty string.
- D. It raises an index error  
  _Rationale:_ Reading an unset key is legal and returns nil.

**MST-0927-Q0002** (multiple-answer, Select ALL that apply) Which statements about Lua tables are correct? (Select TWO)

- A. A table can act as both an array and a hash map at once **(key)**  
  _Rationale:_ Correct: tables are the single structured type and mix integer and other keys freely.
- B. Metatables let you customise behaviour such as addition or indexing **(key)**  
  _Rationale:_ Correct: metamethods like __add and __index hook into operations.
- C. Array indices conventionally start at 0  
  _Rationale:_ Lua arrays conventionally start at 1.
- D. Tables are immutable once created  
  _Rationale:_ Tables are mutable; you can add and change keys any time.

**MST-0927-Q0003** (single-answer, Select ONE) What does coroutine.yield do inside a running coroutine?

- A. Suspends the coroutine and returns control and values to the resumer **(key)**  
  _Rationale:_ Correct: yield pauses execution so it can be resumed later from the same point.
- B. Starts a new OS thread  
  _Rationale:_ Coroutines are cooperative and single-threaded, not OS threads.
- C. Permanently terminates the coroutine  
  _Rationale:_ The coroutine is suspended, not finished, and can be resumed.
- D. Blocks until another coroutine finishes  
  _Rationale:_ yield simply hands control back; it does not wait on another coroutine.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
