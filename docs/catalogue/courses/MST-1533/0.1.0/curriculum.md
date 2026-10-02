# Lua Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1533` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-LF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Lua Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Getting started with Lua
2. Types, variables and scope
3. Control flow and operators
4. Tables: the core data structure
5. Functions and closures
6. Metatables and OOP
7. Modules, errors and strings
8. Embedding and the standard library

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; Lua code and embedding are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started with Lua (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run a script and experiment in the interactive interpreter; (2) Print formatted output with string.format
- Common misconception addressed: Expecting static type declarations as in C
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Lua interpreter, chunks and running scripts | 90 | 6 |
| M01L02 | Values, dynamic typing and basic I/O | 90 | 6 |

### M02 Types, variables and scope (MASTEMY-DESIGN 12%)

- Worked applications: (1) Convert between a number and a string explicitly; (2) Refactor globals into locals in a chunk
- Common misconception addressed: Leaving variables global by default and polluting the global table
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The eight basic types and nil | 90 | 6 |
| M02L02 | Global vs local, and why local matters | 90 | 6 |

### M03 Control flow and operators (MASTEMY-DESIGN 12%)

- Worked applications: (1) Iterate 1..n with a numeric for loop; (2) Set a default with x = x or default
- Common misconception addressed: Assuming 0 and empty string are falsy (only nil and false are)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | if/elseif, while, repeat and numeric/generic for | 90 | 6 |
| M03L02 | Operators, truthiness and short-circuit and/or | 90 | 6 |

### M04 Tables: the core data structure (MASTEMY-DESIGN 15%)

- Worked applications: (1) Model a record as a table with named fields; (2) Use a table as an array and iterate with ipairs
- Common misconception addressed: Relying on # for a table with nil holes (undefined length)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tables as arrays and dictionaries; the length operator | 90 | 6 |
| M04L02 | Nested tables, table.insert/remove and iteration | 90 | 6 |

### M05 Functions and closures (MASTEMY-DESIGN 13%)

- Worked applications: (1) Return multiple values and capture them; (2) Build a counter with a closure over an upvalue
- Common misconception addressed: Expecting all return values to survive when used mid-expression
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Functions, multiple returns and varargs | 90 | 6 |
| M05L02 | Closures and upvalues | 90 | 6 |

### M06 Metatables and OOP (MASTEMY-DESIGN 14%)

- Worked applications: (1) Give a table a default via __index; (2) Build a simple class with a shared method table
- Common misconception addressed: Thinking Lua has built-in classes rather than table-based patterns
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Metatables and metamethods (__index, __add) | 90 | 6 |
| M06L02 | Prototype-based OOP with tables and metatables | 90 | 6 |

### M07 Modules, errors and strings (MASTEMY-DESIGN 12%)

- Worked applications: (1) Split code into a module and require it; (2) Guard a risky call with pcall and extract text with a pattern
- Common misconception addressed: Expecting Lua patterns to be full regular expressions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | require, modules and the package system | 90 | 6 |
| M07L02 | pcall/error handling and string patterns | 90 | 6 |

### M08 Embedding and the standard library (MASTEMY-DESIGN 10%)

- Worked applications: (1) Describe how a host app exposes a function to Lua; (2) Produce values lazily with a coroutine
- Common misconception addressed: Confusing a coroutine with an OS thread (coroutines are cooperative)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | How Lua embeds in host applications (the C API idea, stack) | 90 | 6 |
| M08L02 | Coroutines and key standard-library modules | 90 | 6 |

## Integrative case

Build a small configuration-and-scoring engine in Lua: load rule records from tables, process them through functions and closures, give records defaults with a metatable, expose a scoring module via require, guard parsing with pcall and string patterns, and stream results lazily with a coroutine.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1533-final-protected | 40 | 40 | yes |
| MST-1533-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started with Lua | 5 |
| Types, variables and scope | 5 |
| Control flow and operators | 5 |
| Tables: the core data structure | 5 |
| Functions and closures | 5 |
| Metatables and OOP | 5 |
| Modules, errors and strings | 5 |
| Embedding and the standard library | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1533-Q0001** (single-answer, Select ONE) In Lua, which values are considered false in a boolean context?

- A. Only nil and false **(key)**  
  _Rationale:_ Correct: every other value, including 0 and the empty string, is truthy in Lua.
- B. nil, false, 0 and the empty string  
  _Rationale:_ 0 and empty string are truthy in Lua, unlike many other languages.
- C. Only nil  
  _Rationale:_ false is also falsy, not just nil.
- D. Any value equal to 0  
  _Rationale:_ 0 is truthy; numeric zero does not make a value false.

**MST-1533-Q0002** (multiple-answer, Select TWO) Which statements about Lua tables are correct? (Select TWO)

- A. A single table can act as both an array and a dictionary **(key)**  
  _Rationale:_ Correct: tables store integer-keyed and arbitrary-keyed entries together.
- B. The # length operator is well-defined for a sequence without nil holes **(key)**  
  _Rationale:_ Correct: # gives a reliable length only for a contiguous sequence with no nil gaps.
- C. Tables enforce a fixed schema of field names  
  _Rationale:_ Tables are dynamic; any key can be added at any time.
- D. Table keys must all be strings  
  _Rationale:_ Keys may be numbers, strings, booleans or other values (not nil).

**MST-1533-Q0003** (single-answer, Select ONE) What does a metatable's __index metamethod let you do?

- A. Provide a fallback lookup (a default or shared method table) when a key is missing **(key)**  
  _Rationale:_ Correct: __index is consulted when a key is absent, which underpins defaults and prototype-based OOP.
- B. Prevent a table from being modified  
  _Rationale:_ __index controls missing-key lookup, not immutability.
- C. Automatically sort the table's keys  
  _Rationale:_ __index does not sort; it handles missing-key access.
- D. Convert the table to a string  
  _Rationale:_ That is __tostring, a different metamethod.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
