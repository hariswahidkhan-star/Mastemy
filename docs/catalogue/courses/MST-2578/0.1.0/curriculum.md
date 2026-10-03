# Swift Programming: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2578` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Swift Programming: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write concurrent code with async/await, tasks and actors
2. Use Swift's structured concurrency and cancellation
3. Apply advanced generics, opaque and existential types
4. Build result builders and expressive DSLs
5. Interoperate with Objective-C and C and manage bridging
6. Profile and optimise Swift for performance and memory

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Async/await (20% (design weight), design weight)

- Worked applications: (1) Fetch two resources with async let; (2) Run a task group over a collection
- Common misconception addressed: Blocking a thread instead of awaiting
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | async functions and await | 64 | 4 |
| M01L02 | Tasks and task groups | 64 | 4 |
| M01L03 | async let concurrency | 64 | 4 |

### M02 Actors (20% (design weight), design weight)

- Worked applications: (1) Protect mutable state with an actor; (2) Hop to MainActor for UI updates
- Common misconception addressed: Assuming a class is automatically data-race free
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Actor isolation and data races | 64 | 4 |
| M02L02 | await across actor boundaries | 64 | 4 |
| M02L03 | MainActor and UI state | 64 | 4 |

### M03 Advanced generics (20% (design weight), design weight)

- Worked applications: (1) Return an opaque some View-like type; (2) Store heterogeneous values with any
- Common misconception addressed: Confusing some with any semantics
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Opaque types with some | 64 | 4 |
| M03L02 | Existentials with any | 64 | 4 |
| M03L03 | Generic where-clause refinements | 64 | 4 |

### M04 Result builders (20% (design weight), design weight)

- Worked applications: (1) Write a small result-builder DSL; (2) Add conditional content in a builder
- Common misconception addressed: Expecting arbitrary statements in a builder block
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Result builder basics | 64 | 4 |
| M04L02 | Building a DSL | 64 | 4 |
| M04L03 | Conditionals inside builders | 64 | 4 |

### M05 Interop and performance (20% (design weight), design weight)

- Worked applications: (1) Bridge a C API with a safe wrapper; (2) Exploit copy-on-write for arrays
- Common misconception addressed: Ignoring copy-on-write and copying needlessly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Objective-C and C bridging | 64 | 4 |
| M05L02 | Unsafe pointers and withUnsafe APIs | 64 | 4 |
| M05L03 | Profiling with instruments and copy-on-write | 64 | 4 |

## Integrative case

An engineer builds a concurrent image pipeline in Swift: parallelise processing with task groups, protect shared cache state with an actor, expose a result-builder DSL for stages, and profile to exploit copy-on-write.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2578-final-protected | 40 | 40 | yes |
| MST-2578-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Async/await | 8 |
| Actors | 8 |
| Advanced generics | 8 |
| Result builders | 8 |
| Interop and performance | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2578-Q0001** (single-answer, Select ONE) What problem do actors solve in Swift concurrency?

- A. They serialise access to their mutable state, preventing data races **(key)**  
  _Rationale:_ Actor isolation ensures only one task touches the actor's state at a time.
- B. They make synchronous code run faster  
  _Rationale:_ Actors are about safe state access, not raw speed.
- C. They replace all need for async/await  
  _Rationale:_ Actors are used together with async/await.
- D. They guarantee UI code runs off the main thread  
  _Rationale:_ MainActor specifically pins work to the main thread.

**MST-2578-Q0002** (multiple-answer, Select TWO) Select TWO correct distinctions between some and any for a protocol P in Swift.

- A. some P is an opaque type: one concrete underlying type fixed at compile time **(key)**  
  _Rationale:_ Opaque types hide but fix a single concrete type.
- B. any P is an existential that can hold different conforming types at runtime **(key)**  
  _Rationale:_ Existentials box any conformer and can vary dynamically.
- C. some P can hold a different concrete type on each call  
  _Rationale:_ The underlying type is fixed per return position.
- D. any P is resolved entirely at compile time with no boxing  
  _Rationale:_ Existentials generally involve dynamic dispatch/boxing.

**MST-2578-Q0003** (single-answer, Select ONE) Why can copy-on-write make Swift arrays efficient despite value semantics?

- A. The underlying buffer is shared until a mutation forces a unique copy **(key)**  
  _Rationale:_ COW defers copying until a write occurs on a shared buffer.
- B. Arrays are actually reference types  
  _Rationale:_ Arrays are value types; COW gives value semantics efficiently.
- C. Mutations never copy under any circumstances  
  _Rationale:_ A mutation of a shared buffer triggers a copy.
- D. COW disables bounds checking  
  _Rationale:_ COW is unrelated to bounds checking.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
