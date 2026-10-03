# Swift Programming: Intermediate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2577` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Swift Programming: Intermediate (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design with protocols and protocol-oriented programming
2. Use generics and associated types
3. Handle errors with throws, try and Result
4. Apply closures, higher-order functions and capture semantics
5. Use value semantics, classes and reference counting correctly
6. Organise code with extensions and access control

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Protocols (20% (design weight), design weight)

- Worked applications: (1) Give a protocol a default method; (2) Compose behaviour via protocols
- Common misconception addressed: Reaching for inheritance where a protocol fits
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining and adopting protocols | 64 | 4 |
| M01L02 | Protocol extensions with default behaviour | 64 | 4 |
| M01L03 | Protocol-oriented design | 64 | 4 |

### M02 Generics (20% (design weight), design weight)

- Worked applications: (1) Write a generic stack type; (2) Constrain a generic to Comparable
- Common misconception addressed: Assuming generics box values at runtime
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generic functions and types | 64 | 4 |
| M02L02 | Constraints with where | 64 | 4 |
| M02L03 | Associated types in protocols | 64 | 4 |

### M03 Error handling (20% (design weight), design weight)

- Worked applications: (1) Convert a throwing call to a Result; (2) Clean up with defer
- Common misconception addressed: Swallowing errors with try?
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | throws and try/catch | 64 | 4 |
| M03L02 | Result type | 64 | 4 |
| M03L03 | Rethrowing and defer | 64 | 4 |

### M04 Closures (20% (design weight), design weight)

- Worked applications: (1) Capture self weakly to avoid a cycle; (2) Pass an escaping completion handler
- Common misconception addressed: Creating a retain cycle by capturing self strongly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Closure syntax and trailing closures | 64 | 4 |
| M04L02 | Capturing values | 64 | 4 |
| M04L03 | Escaping vs non-escaping | 64 | 4 |

### M05 Memory and extensions (20% (design weight), design weight)

- Worked applications: (1) Break a reference cycle with weak; (2) Add behaviour via an extension
- Common misconception addressed: Thinking ARC collects reference cycles automatically
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Classes, ARC and references | 64 | 4 |
| M05L02 | Strong, weak and unowned | 64 | 4 |
| M05L03 | Extensions and access control | 64 | 4 |

## Integrative case

A developer builds a Swift networking layer: model endpoints with protocols and generics, surface failures with Result and throws, pass escaping completion handlers without retain cycles, and extend types cleanly.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2577-final-protected | 40 | 40 | yes |
| MST-2577-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Protocols | 8 |
| Generics | 8 |
| Error handling | 8 |
| Closures | 8 |
| Memory and extensions | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2577-Q0001** (single-answer, Select ONE) What is the main benefit of a protocol extension providing a default implementation?

- A. Conforming types get shared behaviour without inheriting from a base class **(key)**  
  _Rationale:_ Protocol extensions supply default methods, enabling protocol-oriented reuse.
- B. It forces all conformers to be classes  
  _Rationale:_ Structs and enums can conform too.
- C. It disables generics  
  _Rationale:_ Protocols and generics work together.
- D. It prevents the protocol from being adopted  
  _Rationale:_ Extensions add behaviour, not restrictions.

**MST-2577-Q0002** (multiple-answer, Select TWO) Select TWO ways to avoid a strong reference cycle when a closure captures self in Swift.

- A. Capture self weakly with [weak self] **(key)**  
  _Rationale:_ A weak capture does not keep self alive, breaking the cycle.
- B. Capture self as unowned when self is guaranteed to outlive the closure **(key)**  
  _Rationale:_ unowned avoids the cycle without optionality when lifetime is guaranteed.
- C. Capture self strongly in an escaping closure  
  _Rationale:_ A strong capture in an escaping closure is what creates the cycle.
- D. Mark the closure non-escaping and capture self strongly  
  _Rationale:_ The scenario in question involves escaping closures needing weak/unowned.

**MST-2577-Q0003** (single-answer, Select ONE) Why does Swift distinguish escaping from non-escaping closures?

- A. An escaping closure may be stored and run after the function returns, affecting memory **(key)**  
  _Rationale:_ Escaping closures outlive the call, so capture and retain-cycle rules matter.
- B. Non-escaping closures cannot take parameters  
  _Rationale:_ Both can take parameters.
- C. Escaping closures run on the main thread automatically  
  _Rationale:_ Escaping says nothing about threads.
- D. Non-escaping closures are always asynchronous  
  _Rationale:_ Non-escaping closures typically run synchronously within the call.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
