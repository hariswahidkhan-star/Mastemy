# Python Asynchronous Programming and Concurrency

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0903` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Python Asynchronous Programming and Concurrency (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Concurrency concepts
2. Threads and processes
3. async/await foundations
4. Structured concurrency and tasks
5. Async I/O and ecosystems
6. Reliability and debugging

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Concurrency concepts (MASTEMY-DESIGN 15%)

- Worked applications: (1) Classify four tasks as I/O- or CPU-bound and pick a model; (2) Explain why threads help I/O but not CPU-bound Python
- Common misconception addressed: Believing threads speed up CPU-bound pure-Python code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Concurrency vs parallelism; the GIL | 80 | 6 |
| M01L02 | I/O-bound vs CPU-bound workloads | 80 | 6 |

### M02 Threads and processes (MASTEMY-DESIGN 16%)

- Worked applications: (1) Parallelise a CPU-bound job with ProcessPoolExecutor; (2) Protect shared state with a Lock
- Common misconception addressed: Sharing a mutable object across processes expecting shared memory
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | threading and synchronisation primitives | 80 | 6 |
| M02L02 | multiprocessing and concurrent.futures | 80 | 6 |

### M03 async/await foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Convert a blocking sequence of calls into awaited coroutines; (2) Run the event loop with asyncio.run
- Common misconception addressed: Calling a coroutine without awaiting it and wondering why nothing runs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Coroutines, the event loop and awaitables | 80 | 6 |
| M03L02 | async def, await and running tasks | 80 | 6 |

### M04 Structured concurrency and tasks (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fetch many URLs with a TaskGroup and bounded concurrency; (2) Apply a timeout and cancel stragglers cleanly
- Common misconception addressed: Firing tasks without awaiting them so exceptions vanish
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Creating tasks, gather and TaskGroup | 80 | 6 |
| M04L02 | Cancellation, timeouts and exception handling | 80 | 6 |

### M05 Async I/O and ecosystems (MASTEMY-DESIGN 15%)

- Worked applications: (1) Call a blocking library from async code via run_in_executor; (2) Throttle requests with a semaphore
- Common misconception addressed: Blocking the event loop with a synchronous sleep or CPU loop
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Async HTTP, files and queues | 80 | 6 |
| M05L02 | Mixing sync and async; run_in_executor | 80 | 6 |

### M06 Reliability and debugging (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add exponential-backoff retries around a flaky call; (2) Reproduce and fix an event-loop-blocking bug
- Common misconception addressed: Assuming adding more concurrency always increases throughput
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Backpressure, rate limiting and retries | 80 | 6 |
| M06L02 | Debugging, testing and profiling async code | 80 | 6 |

## Integrative case

Build an async web scraper and API client: fetch hundreds of URLs concurrently with bounded parallelism, respect rate limits, time out and retry failures, and compare the async design against thread- and process-based alternatives.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0903-final-protected | 30 | 30 | yes |
| MST-0903-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Concurrency concepts | 5 |
| Threads and processes | 5 |
| async/await foundations | 5 |
| Structured concurrency and tasks | 5 |
| Async I/O and ecosystems | 5 |
| Reliability and debugging | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0903-Q0001** (single-answer, Select ONE) Why do Python threads generally not speed up a CPU-bound pure-Python computation?

- A. The Global Interpreter Lock lets only one thread execute Python bytecode at a time **(key)**  
  _Rationale:_ Correct: the GIL serialises bytecode execution, so CPU-bound threads cannot run in true parallel.
- B. Threads cannot share any memory  
  _Rationale:_ Threads share memory; that is not the limitation here.
- C. Python has no threading library  
  _Rationale:_ Python has a threading module; the GIL is the constraint.
- D. Creating a thread is slower than the whole computation  
  _Rationale:_ Thread creation cost is not the reason; the GIL is.

**MST-0903-Q0002** (multiple-answer, Select ALL that apply) Which techniques bound or control concurrency when fetching many URLs with asyncio? (Select TWO)

- A. Limit in-flight requests with an asyncio.Semaphore **(key)**  
  _Rationale:_ Correct: a semaphore caps how many coroutines run the protected section at once.
- B. Apply per-request timeouts and cancel stragglers **(key)**  
  _Rationale:_ Correct: timeouts plus cancellation stop slow requests from stalling the batch.
- C. Replace await with time.sleep to pace requests  
  _Rationale:_ time.sleep blocks the event loop and stalls all coroutines.
- D. Run each fetch in its own process for isolation  
  _Rationale:_ Spawning a process per I/O request is wasteful and defeats async's purpose.

**MST-0903-Q0003** (single-answer, Select ONE) What happens if you call an async function like data = fetch(url) without awaiting it?

- A. It returns a coroutine object that never runs until awaited or scheduled as a task **(key)**  
  _Rationale:_ Correct: calling a coroutine just creates it; it must be awaited or scheduled to execute.
- B. It runs immediately and blocks until done  
  _Rationale:_ Calling does not run the body; awaiting or scheduling does.
- C. It raises a syntax error  
  _Rationale:_ It is valid syntax; it simply produces an un-run coroutine.
- D. It runs in a background thread automatically  
  _Rationale:_ No thread is created; nothing executes until the loop drives it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
