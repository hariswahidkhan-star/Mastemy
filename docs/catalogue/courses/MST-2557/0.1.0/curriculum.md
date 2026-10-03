# TypeScript Programming: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2557` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint for a Advanced-level TypeScript programming course. Language, library and tooling specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — TypeScript Programming: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Reason about TypeScript's concurrency model (the event loop with Promises and async/await) and avoid data races
2. Profile TypeScript programs and remove performance bottlenecks
3. Explain the TypeScript compiler on V8/Node memory behaviour and its performance implications
4. Apply design patterns idiomatically to keep code maintainable
5. Decouple modules behind clear boundaries and manage dependencies
6. Build a test suite with Jest with ts-jest and prepare code for production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Concurrency and parallelism (25%, design weight)

- Worked applications: (1) Parallelise a batch workload and measure the speedup; (2) Find and fix a data race in shared mutable state
- Common misconception addressed: Assuming that adding more threads always makes a program faster
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The TypeScript concurrency model: the event loop with Promises and async/await | 120 | 7 |
| M01L02 | Synchronisation, data races and safe sharing | 120 | 7 |

### M02 Performance and memory (25%, design weight)

- Worked applications: (1) Profile a slow function and remove the bottleneck; (2) Reduce allocations in a hot code path
- Common misconception addressed: Optimising code before measuring where the time is actually spent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Profiling and algorithmic complexity in TypeScript | 120 | 7 |
| M02L02 | The memory model and the TypeScript compiler on V8/Node behaviour | 120 | 7 |

### M03 Design patterns and architecture (25%, design weight)

- Worked applications: (1) Replace a rigid conditional with a strategy or polymorphic design; (2) Introduce an interface boundary to decouple two modules
- Common misconception addressed: Applying a design pattern where a simple function would do
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Applying design patterns idiomatically in TypeScript | 120 | 7 |
| M03L02 | Decoupling, boundaries and dependency management | 120 | 7 |

### M04 Testing, tooling and production (25%, design weight)

- Worked applications: (1) Add a test suite and raise coverage on a module; (2) Instrument a service with structured logging and metrics
- Common misconception addressed: Treating a passing test suite as proof that the code is correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Automated testing with Jest with ts-jest | 120 | 7 |
| M04L02 | Packaging, observability and release | 120 | 7 |

## Integrative case

A team's TypeScript service is too slow under load: profile it to find the bottleneck, fix a data race in shared state, parallelise the hot path safely, refactor rigid code behind interfaces, and add a Jest with ts-jest suite before release.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2557-final-protected | 40 | 40 | yes |
| MST-2557-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Concurrency and parallelism | 10 |
| Performance and memory | 10 |
| Design patterns and architecture | 10 |
| Testing, tooling and production | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2557-Q0001** (single-answer, Select ONE) In TypeScript, what precisely is a data race?

- A. Two or more threads access the same memory concurrently, at least one writes, and there is no synchronisation **(key)**  
  _Rationale:_ Correct: that unsynchronised concurrent access with a writer is the definition of a data race.
- B. Any program that uses more than one thread  
  _Rationale:_ Multithreading alone is not a data race.
- C. A loop that iterates faster than expected  
  _Rationale:_ Loop speed is unrelated to data races.
- D. Two functions defined with the same name  
  _Rationale:_ Naming collisions are a different concern.

**MST-2557-Q0002** (multiple-answer, Select TWO) Which TWO practices genuinely help performance in TypeScript? (Select TWO.)

- A. Profiling first to find the real bottleneck before changing code **(key)**  
  _Rationale:_ Correct: measurement directs effort to where it matters.
- B. Reducing unnecessary allocations in a hot path **(key)**  
  _Rationale:_ Correct: fewer allocations cut memory pressure and overhead in hot code.
- C. Rewriting every loop by hand before measuring anything  
  _Rationale:_ Premature optimisation wastes effort and can add bugs.
- D. Adding threads to code that is bound by a single shared lock  
  _Rationale:_ Contention on one lock means more threads will not help.

**MST-2557-Q0003** (single-answer, Select ONE) A TypeScript codebase applies the Singleton pattern to almost every class. What is the main risk?

- A. Hidden global state and tight coupling that make the code hard to test and change **(key)**  
  _Rationale:_ Correct: overusing singletons reintroduces global state and coupling.
- B. Programs will refuse to compile  
  _Rationale:_ Overuse is a design problem, not a compile error.
- C. The pattern makes all code automatically thread-safe  
  _Rationale:_ Singletons are not inherently thread-safe.
- D. Patterns can only be used once per program  
  _Rationale:_ There is no such rule.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
