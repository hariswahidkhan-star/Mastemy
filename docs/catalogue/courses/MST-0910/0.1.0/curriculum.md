# Go: Concurrent Backend and Network Programming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0910` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Go: Concurrent Backend and Network Programming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Go foundations
2. Errors and idioms
3. Goroutines and channels
4. Concurrency patterns and context
5. Synchronisation and the race detector
6. Networking and services

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Go foundations (MASTEMY-DESIGN 14%)

- Worked applications: (1) Define a struct and satisfy an interface implicitly; (2) Organise code into packages
- Common misconception addressed: Expecting explicit 'implements' like in Java
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tooling, packages and types | 80 | 6 |
| M01L02 | Structs, methods and interfaces | 80 | 6 |

### M02 Errors and idioms (MASTEMY-DESIGN 14%)

- Worked applications: (1) Wrap an error with context and inspect it; (2) Use the zero value instead of a constructor where idiomatic
- Common misconception addressed: Ignoring returned errors with _
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Error values, wrapping and handling | 80 | 6 |
| M02L02 | Idiomatic Go style and zero values | 80 | 6 |

### M03 Goroutines and channels (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fan out work to goroutines and collect via a channel; (2) Coordinate multiple channels with select
- Common misconception addressed: Launching goroutines that leak because nothing reads their channel
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Goroutines and the scheduler | 80 | 6 |
| M03L02 | Channels, select and directionality | 80 | 6 |

### M04 Concurrency patterns and context (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a bounded worker pool; (2) Cancel in-flight work with a context deadline
- Common misconception addressed: Using a WaitGroup incorrectly and deadlocking
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Worker pools, fan-in/fan-out, cancellation | 80 | 6 |
| M04L02 | context for deadlines and cancellation | 80 | 6 |

### M05 Synchronisation and the race detector (MASTEMY-DESIGN 16%)

- Worked applications: (1) Protect shared state with a Mutex; (2) Find a data race with go test -race
- Common misconception addressed: Sharing a map across goroutines without synchronisation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | sync primitives and the memory model | 80 | 6 |
| M05L02 | Detecting and fixing data races | 80 | 6 |

### M06 Networking and services (MASTEMY-DESIGN 22%)

- Worked applications: (1) Serve a JSON API and consume it with a client; (2) Test handlers with httptest
- Common misconception addressed: Not setting timeouts on an HTTP client
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | HTTP servers, clients and JSON | 80 | 6 |
| M06L02 | Building and testing a small service | 80 | 6 |

## Integrative case

Build a concurrent URL health-check service in Go: fan out checks across goroutines with bounded workers, coordinate with channels and context, expose an HTTP API and JSON results, handle timeouts and errors, and test with the race detector.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0910-final-protected | 30 | 30 | yes |
| MST-0910-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Go foundations | 5 |
| Errors and idioms | 5 |
| Goroutines and channels | 5 |
| Concurrency patterns and context | 5 |
| Synchronisation and the race detector | 5 |
| Networking and services | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0910-Q0001** (single-answer, Select ONE) In Go, how does a type satisfy an interface?

- A. Implicitly, by having the required methods; no explicit declaration is needed **(key)**  
  _Rationale:_ Correct: Go uses structural typing, so any type with the interface's methods satisfies it.
- B. By listing 'implements InterfaceName' in the type declaration  
  _Rationale:_ Go has no implements keyword; satisfaction is implicit.
- C. By inheriting from the interface  
  _Rationale:_ Go has no class inheritance; interfaces are satisfied structurally.
- D. By registering the type at runtime  
  _Rationale:_ No registration is needed; the compiler checks method sets.

**MST-0910-Q0002** (multiple-answer, Select ALL that apply) Which practices help avoid goroutine leaks and data races? (Select TWO)

- A. Use context cancellation or closed channels so goroutines can exit **(key)**  
  _Rationale:_ Correct: giving goroutines a way to stop prevents leaks.
- B. Protect shared mutable state with a mutex or confine it to one goroutine **(key)**  
  _Rationale:_ Correct: synchronisation or confinement prevents data races.
- C. Share a plain map across goroutines for speed  
  _Rationale:_ Concurrent map access without synchronisation is a data race.
- D. Launch goroutines without any way to signal them to stop  
  _Rationale:_ That is exactly how goroutines leak.

**MST-0910-Q0003** (single-answer, Select ONE) What is the purpose of passing a context.Context to a blocking operation?

- A. It carries deadlines and cancellation so the operation can stop early when the caller no longer needs it **(key)**  
  _Rationale:_ Correct: context propagates cancellation and deadlines across call boundaries.
- B. It stores global configuration for the program  
  _Rationale:_ Context is for request-scoped cancellation/values, not global config.
- C. It makes the operation run on more CPU cores  
  _Rationale:_ Context does not control parallelism.
- D. It guarantees the operation never fails  
  _Rationale:_ Context does not prevent failure; it enables cancellation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
