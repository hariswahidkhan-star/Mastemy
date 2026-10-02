# Go Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1526` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Go Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write, build and organise idiomatic Go programs with the standard toolchain
2. Use Go's core data structures and interface model correctly
3. Apply goroutines, channels and context for safe concurrency
4. Handle errors and write tests following Go conventions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Go basics and tooling (25%, MASTEMY-DESIGN)

- Worked applications: (1) Set up a module and build a small multi-package program; (2) Use defer to close resources reliably in a function
- Common misconception addressed: Expecting unused imports or variables to be warnings rather than compile errors
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Go toolchain and modules | 120 | 6 |
| M01L02 | Types, variables and zero values | 120 | 6 |
| M01L03 | Functions, multiple returns and defer | 120 | 6 |
| M01L04 | Packages and visibility | 120 | 6 |

### M02 Data structures and idioms (25%, MASTEMY-DESIGN)

- Worked applications: (1) Reason about a slice-sharing bug caused by a shared backing array; (2) Design a small interface and satisfy it implicitly with two types
- Common misconception addressed: Treating slices as independent copies when they share a backing array
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Slices and arrays | 120 | 6 |
| M02L02 | Maps and structs | 120 | 6 |
| M02L03 | Pointers and value semantics | 120 | 6 |
| M02L04 | Methods and interfaces | 120 | 6 |

### M03 Concurrency with goroutines and channels (25%, MASTEMY-DESIGN)

- Worked applications: (1) Build a worker pool with channels and bound its concurrency; (2) Find a data race with the race detector and fix it with a mutex or channel
- Common misconception addressed: Assuming goroutines are free and launching unbounded numbers of them
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Goroutines and the scheduler | 120 | 6 |
| M03L02 | Channels and select | 120 | 6 |
| M03L03 | sync primitives and the race detector | 120 | 6 |
| M03L04 | Context and cancellation | 120 | 6 |

### M04 Errors, testing and real programs (25%, MASTEMY-DESIGN)

- Worked applications: (1) Wrap and inspect errors with errors.Is and errors.As; (2) Write a table-driven test for a pure function
- Common misconception addressed: Ignoring returned errors instead of handling or wrapping them
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Error values and wrapping | 120 | 6 |
| M04L02 | The testing package and table tests | 120 | 6 |
| M04L03 | Standard library essentials | 120 | 6 |
| M04L04 | Building and shipping a CLI | 120 | 6 |

## Integrative case

A service must fan out independent API calls and return once all finish or a deadline passes. Build it in Go with goroutines, channels and context cancellation, prove it is race-free, and justify the concurrency bounds.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1526-final-protected | 144 | 144 | yes |
| MST-1526-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Go basics and tooling | 36 |
| Data structures and idioms | 36 |
| Concurrency with goroutines and channels | 36 |
| Errors, testing and real programs | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1526-Q0001** (single-answer, Select ONE) A Go program launches one goroutine per incoming request with no limit and eventually exhausts memory under load. What is the most appropriate fix?

- A. Bound concurrency with a worker pool or semaphore channel **(key)**  
  _Rationale:_ Correct: limiting the number of concurrent goroutines caps resource use under load.
- B. Call runtime.GC() after each request  
  _Rationale:_ Forcing GC does not address the unbounded number of live goroutines.
- C. Increase the channel buffer sizes  
  _Rationale:_ Larger buffers do not limit how many goroutines are created.
- D. Remove all defer statements  
  _Rationale:_ defer is unrelated to the number of goroutines spawned.

**MST-1526-Q0002** (single-answer, Select ONE) Two slices were created by slicing the same underlying array. Writing through one changes the other. What explains this?

- A. Slices share the same backing array unless explicitly copied **(key)**  
  _Rationale:_ Correct: a slice is a view over a backing array; sub-slices share that storage.
- B. Go passes slices by reference like pointers to the same struct  
  _Rationale:_ Slices are passed by value, but the value includes a pointer to shared backing storage; the precise cause is the shared array.
- C. Maps and slices are the same type in Go  
  _Rationale:_ Maps and slices are distinct types with different semantics.
- D. The garbage collector merged the two slices  
  _Rationale:_ The GC does not merge distinct slices.

**MST-1526-Q0003** (multiple-answer, Select TWO) Which TWO practices help write correct concurrent Go code? (Select TWO)

- A. Run tests with the -race flag to detect data races **(key)**  
  _Rationale:_ Correct: the race detector surfaces unsynchronised concurrent access.
- B. Use a context to signal cancellation and deadlines **(key)**  
  _Rationale:_ Correct: context propagates cancellation so goroutines stop promptly.
- C. Share mutable state across goroutines without synchronisation  
  _Rationale:_ Unsynchronised shared mutable state causes data races.
- D. Ignore errors returned from goroutines  
  _Rationale:_ Dropping errors hides failures and leads to incorrect behaviour.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
