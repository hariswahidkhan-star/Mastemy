# Ruby Programming: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2582` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Ruby Programming: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Run Ruby code and use irb to experiment
2. Use Ruby's objects, variables and core types
3. Write methods, blocks and control flow
4. Work with strings, symbols, arrays and hashes
5. Use iterators and the each family instead of manual loops
6. Understand truthiness, nil and basic exception handling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started (20% (design weight), design weight)

- Worked applications: (1) Experiment with an expression in irb; (2) Call a method on a literal
- Common misconception addressed: Thinking integers are not objects
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Running Ruby and using irb | 64 | 4 |
| M01L02 | Everything is an object | 64 | 4 |
| M01L03 | puts, p and comments | 64 | 4 |

### M02 Types and variables (20% (design weight), design weight)

- Worked applications: (1) Use a symbol as a hash key; (2) Interpolate into a string
- Common misconception addressed: Creating many duplicate string keys instead of symbols
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Numbers, strings and booleans | 64 | 4 |
| M02L02 | Symbols vs strings | 64 | 4 |
| M02L03 | Variable naming conventions | 64 | 4 |

### M03 Methods and blocks (20% (design weight), design weight)

- Worked applications: (1) Pass a block to a method with yield; (2) Use keyword arguments
- Common misconception addressed: Expecting an explicit return to be required
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining methods and implicit return | 64 | 4 |
| M03L02 | Blocks, yield and do/end | 64 | 4 |
| M03L03 | Default and keyword arguments | 64 | 4 |

### M04 Collections (20% (design weight), design weight)

- Worked applications: (1) Iterate a hash with each; (2) Select items from an array
- Common misconception addressed: Mutating a collection while iterating it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Arrays and common methods | 64 | 4 |
| M04L02 | Hashes and iteration | 64 | 4 |
| M04L03 | Ranges | 64 | 4 |

### M05 Iterators and nil (20% (design weight), design weight)

- Worked applications: (1) Transform an array with map; (2) Rescue a possible error
- Common misconception addressed: Treating 0 or empty string as falsey like other languages
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | each, map, select, reduce | 64 | 4 |
| M05L02 | Truthiness and nil | 64 | 4 |
| M05L03 | begin/rescue basics | 64 | 4 |

## Integrative case

A beginner builds a Ruby word-count script: read lines, tokenise into an array, tally counts in a hash with symbol keys, and print the top words using map and sort, handling missing input with rescue.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2582-final-protected | 40 | 40 | yes |
| MST-2582-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started | 8 |
| Types and variables | 8 |
| Methods and blocks | 8 |
| Collections | 8 |
| Iterators and nil | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2582-Q0001** (single-answer, Select ONE) In Ruby, which values are falsey?

- A. Only nil and false **(key)**  
  _Rationale:_ Everything except nil and false is truthy, including 0 and ''.
- B. nil, false, 0 and empty string  
  _Rationale:_ 0 and '' are truthy in Ruby.
- C. Only false  
  _Rationale:_ nil is also falsey.
- D. nil, false and empty arrays  
  _Rationale:_ An empty array is truthy.

**MST-2582-Q0002** (multiple-answer, Select TWO) Select TWO reasons to use a symbol such as :name instead of the string 'name' as a hash key.

- A. Symbols are immutable **(key)**  
  _Rationale:_ Symbols cannot be mutated, making them stable keys.
- B. The same symbol references one object, saving allocations **(key)**  
  _Rationale:_ Identical symbols are the same object, unlike new string instances.
- C. Symbols can store multi-line text better than strings  
  _Rationale:_ Symbols are identifiers, not text containers.
- D. Symbols are automatically sorted  
  _Rationale:_ Symbols carry no ordering guarantee as keys.

**MST-2582-Q0003** (single-answer, Select ONE) What does passing a block to a method and calling yield do?

- A. It invokes the caller-supplied block from inside the method **(key)**  
  _Rationale:_ yield runs the attached block, optionally passing arguments to it.
- B. It returns from the method immediately  
  _Rationale:_ yield calls the block; it does not return from the method.
- C. It defines a new method at runtime  
  _Rationale:_ yield does not define methods.
- D. It raises an error if a block is given  
  _Rationale:_ yield requires a block; it errors only when none is given.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
