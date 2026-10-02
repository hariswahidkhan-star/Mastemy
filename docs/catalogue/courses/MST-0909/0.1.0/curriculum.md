# Advanced Rust: Async Services and Production Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0909` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Advanced Rust: Async Services and Production Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Async Rust foundations
2. Shared state and synchronisation
3. Building services
4. Error handling and resilience
5. Observability and testing
6. Production architecture

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Async Rust foundations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Spawn concurrent tasks with tokio and await them; (2) Explain why a Future does nothing until polled
- Common misconception addressed: Blocking the async runtime with synchronous work
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Futures, async/await and the runtime | 120 | 6 |
| M01L02 | tokio: tasks and the executor | 120 | 6 |

### M02 Shared state and synchronisation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Share state across tasks with Arc and a Mutex; (2) Pass work between tasks with an mpsc channel
- Common misconception addressed: Holding a std Mutex across an await point
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Send/Sync, Arc and interior mutability | 120 | 6 |
| M02L02 | Mutex, RwLock and channels across tasks | 120 | 6 |

### M03 Building services (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define typed handlers and routes for an API; (2) Add middleware for logging and auth
- Common misconception addressed: Leaking internal errors to clients as 500s with detail
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | HTTP services with an async framework | 120 | 6 |
| M03L02 | Routing, extractors and middleware | 120 | 6 |

### M04 Error handling and resilience (MASTEMY-DESIGN 17%)

- Worked applications: (1) Map internal errors to safe HTTP responses; (2) Apply timeouts and bounded concurrency under load
- Common misconception addressed: Retrying without backoff and amplifying an outage
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Application error types and boundaries | 120 | 6 |
| M04L02 | Timeouts, retries, backpressure and cancellation | 120 | 6 |

### M05 Observability and testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Instrument a request path with tracing spans; (2) Write an integration test that drives the service
- Common misconception addressed: Logging unstructured text that cannot be queried
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | tracing, structured logs and metrics | 120 | 6 |
| M05L02 | Testing async services | 120 | 6 |

### M06 Production architecture (MASTEMY-DESIGN 18%)

- Worked applications: (1) Add graceful shutdown that drains in-flight requests; (2) Load configuration layered from file and environment
- Common misconception addressed: Killing the process without draining in-flight work
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Configuration, graceful shutdown and lifecycle | 120 | 6 |
| M06L02 | Deployment, performance and operational concerns | 120 | 6 |

## Integrative case

Build an async Rust microservice: structure an application with tokio, define an HTTP API, manage shared state safely across tasks, add graceful shutdown, instrument with tracing, and handle errors and backpressure under load.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0909-final-protected | 36 | 36 | yes |
| MST-0909-final-alternate | 36 | 36 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Async Rust foundations | 6 |
| Shared state and synchronisation | 6 |
| Building services | 6 |
| Error handling and resilience | 6 |
| Observability and testing | 6 |
| Production architecture | 6 |

Minimum reviewed item bank: 468 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0909-Q0001** (single-answer, Select ONE) Why is holding a std::sync::Mutex guard across an .await point in async Rust a problem?

- A. The task may be suspended while holding the lock, blocking other tasks and risking deadlock **(key)**  
  _Rationale:_ Correct: the guard is held across suspension, so other tasks waiting on the lock stall; an async-aware mutex is preferred.
- B. std mutexes cannot compile in async code at all  
  _Rationale:_ They compile; the problem is holding the guard across await.
- C. It automatically converts to an async mutex  
  _Rationale:_ No automatic conversion happens; the risk remains.
- D. It makes the lock faster  
  _Rationale:_ It does not improve performance; it creates a hazard.

**MST-0909-Q0002** (multiple-answer, Select ALL that apply) Which are sound resilience practices for an async service under load? (Select TWO)

- A. Apply timeouts so slow dependencies cannot stall requests indefinitely **(key)**  
  _Rationale:_ Correct: timeouts bound how long a request waits on a dependency.
- B. Bound concurrency so the service sheds or queues load instead of collapsing **(key)**  
  _Rationale:_ Correct: backpressure protects the service from being overwhelmed.
- C. Retry immediately and unboundedly on every failure  
  _Rationale:_ Unbounded immediate retries amplify an outage; use backoff and limits.
- D. Return full internal stack traces to every client  
  _Rationale:_ Leaking internals is a security and clarity problem.

**MST-0909-Q0003** (single-answer, Select ONE) What does spawning a tokio task with tokio::spawn require of the task's data, and why?

- A. The future must be Send so it can run on the multi-threaded runtime's worker threads **(key)**  
  _Rationale:_ Correct: tasks may move between worker threads, so their captured data must be Send.
- B. The future must be Copy  
  _Rationale:_ Copy is not required; Send (and 'static) is.
- C. Nothing; any data can be captured freely  
  _Rationale:_ The Send/'static bounds are real constraints.
- D. The future must block until completion  
  _Rationale:_ Spawned tasks run concurrently; they do not block the spawner.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
