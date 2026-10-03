# Kotlin Programming: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2575` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Kotlin Programming: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write asynchronous code with coroutines, suspend functions and structured concurrency
2. Use flows for asynchronous streams and backpressure
3. Apply delegation, delegated properties and DSL-building techniques
4. Interoperate cleanly with Java APIs and nullability
5. Use inline functions, crossinline and performance-sensitive patterns
6. Test coroutine-based and concurrent code reliably

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Coroutines (20% (design weight), design weight)

- Worked applications: (1) Run two suspend calls concurrently with async; (2) Cancel a coroutine scope cleanly
- Common misconception addressed: Launching coroutines on GlobalScope and leaking them
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | suspend functions and launch/async | 64 | 4 |
| M01L02 | Dispatchers and context | 64 | 4 |
| M01L03 | Structured concurrency and cancellation | 64 | 4 |

### M02 Flows (20% (design weight), design weight)

- Worked applications: (1) Transform a flow with map and filter; (2) Buffer a fast producer
- Common misconception addressed: Treating a cold flow as if it emits without a collector
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cold flows and collectors | 64 | 4 |
| M02L02 | Operators and transformations | 64 | 4 |
| M02L03 | Backpressure and buffering | 64 | 4 |

### M03 Delegation and DSLs (20% (design weight), design weight)

- Worked applications: (1) Build a small HTML-style DSL; (2) Use by lazy for expensive init
- Common misconception addressed: Reinitialising a lazy value on every access
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Class and property delegation | 64 | 4 |
| M03L02 | lazy and observable delegates | 64 | 4 |
| M03L03 | Type-safe builder DSLs | 64 | 4 |

### M04 Java interop (20% (design weight), design weight)

- Worked applications: (1) Guard a platform type from Java; (2) Expose a Kotlin API to Java with @JvmStatic
- Common misconception addressed: Assuming Java return values are non-null
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Calling Java from Kotlin | 64 | 4 |
| M04L02 | Platform types and nullability | 64 | 4 |
| M04L03 | Annotations for cleaner interop | 64 | 4 |

### M05 Inline and testing (20% (design weight), design weight)

- Worked applications: (1) Write an inline higher-order function; (2) Test a suspend function with a test dispatcher
- Common misconception addressed: Inlining a huge function and bloating call sites
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | inline, noinline, crossinline | 64 | 4 |
| M05L02 | Reified generics performance | 64 | 4 |
| M05L03 | Testing coroutines with test dispatchers | 64 | 4 |

## Integrative case

An engineer builds a live dashboard backend in Kotlin: stream updates with Flow, coordinate concurrent fetches under structured concurrency, expose a type-safe config DSL, and test the coroutines with a test dispatcher.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2575-final-protected | 40 | 40 | yes |
| MST-2575-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Coroutines | 8 |
| Flows | 8 |
| Delegation and DSLs | 8 |
| Java interop | 8 |
| Inline and testing | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2575-Q0001** (single-answer, Select ONE) What does structured concurrency guarantee for coroutines launched in a scope?

- A. Child coroutines are tracked and cancelled with the scope, preventing leaks **(key)**  
  _Rationale:_ A scope awaits and cancels its children, tying their lifetime to it.
- B. Every coroutine runs on a separate OS thread  
  _Rationale:_ Coroutines multiplex over threads via dispatchers.
- C. Coroutines cannot be cancelled once launched  
  _Rationale:_ Cancellation is cooperative and central to structured concurrency.
- D. Launching on GlobalScope is the recommended default  
  _Rationale:_ GlobalScope breaks structured concurrency and risks leaks.

**MST-2575-Q0002** (multiple-answer, Select TWO) Select TWO accurate statements about Kotlin Flows.

- A. A cold flow does not produce values until it is collected **(key)**  
  _Rationale:_ Cold flows run their producer per collector, on collection.
- B. Flow operators such as map build a new flow lazily **(key)**  
  _Rationale:_ Operators compose without running until a terminal collect.
- C. A flow always runs its producer once at construction time  
  _Rationale:_ Cold flows run on collection, not construction.
- D. collect is a non-suspending call  
  _Rationale:_ collect is a suspend function.

**MST-2575-Q0003** (single-answer, Select ONE) Why mark a higher-order function inline in performance-sensitive Kotlin code?

- A. It inlines the lambda body at the call site, avoiding function-object allocation **(key)**  
  _Rationale:_ Inlining removes the lambda object and call overhead, enabling reified generics too.
- B. It makes the function run on a background thread  
  _Rationale:_ inline has nothing to do with threading.
- C. It automatically caches the result  
  _Rationale:_ inline does not memoise.
- D. It prevents the function from taking lambda arguments  
  _Rationale:_ inline is specifically useful for lambda arguments.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
