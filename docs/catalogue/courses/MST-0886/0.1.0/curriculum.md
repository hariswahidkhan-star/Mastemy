# Node.js Performance, Streams, and Worker Threads

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0886` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Node.js Performance, Streams, and Worker Threads (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Node.js event loop and async model
2. Process data with streams and backpressure
3. Parallelise CPU work with worker threads
4. Profile and tune Node.js performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 The event loop and async performance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Diagnose a blocked event loop from a sync call; (2) Order output of setTimeout vs Promise callbacks
- Common misconception addressed: Believing async functions run on separate threads by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Event loop phases and the microtask queue | 120 | 7 |
| M01L02 | Blocking vs non-blocking work | 120 | 7 |

### M02 Streams and backpressure (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pipe a file through a transform to another file; (2) Handle backpressure with pipeline
- Common misconception addressed: Ignoring the return value of write and overflowing memory
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Readable, writable and transform streams | 120 | 7 |
| M02L02 | Backpressure and piping | 120 | 7 |

### M03 Worker threads and parallelism (MASTEMY-DESIGN 25%)

- Worked applications: (1) Offload a CPU-bound hash to a worker; (2) Pass data via SharedArrayBuffer
- Common misconception addressed: Expecting worker threads to share ordinary variables with the main thread
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | worker_threads and message passing | 120 | 7 |
| M03L02 | Shared memory and offloading CPU work | 120 | 7 |

### M04 Profiling and production performance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Capture a CPU profile and read a flame graph; (2) Find a leak from a growing heap snapshot
- Common misconception addressed: Assuming more clustering always increases throughput for I/O-bound apps
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | CPU profiling and flame graphs | 120 | 7 |
| M04L02 | Memory leaks and GC behaviour | 120 | 7 |

## Integrative case

A Node API stalls under load. Diagnose a blocked event loop, convert a large synchronous file transform into a streaming pipeline with backpressure, offload a CPU-bound task to a worker thread, and confirm the fix with a CPU profile and heap snapshots.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0886-final-protected | 40 | 48 | yes |
| MST-0886-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The event loop and async performance | 10 |
| Streams and backpressure | 10 |
| Worker threads and parallelism | 10 |
| Profiling and production performance | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0886-Q0001** (single-answer, Select ONE) Given console.log order, which runs first after the current synchronous code: a queued Promise.then callback or a setTimeout(fn,0) callback?

- A. The Promise.then callback, because microtasks run before the next timer phase **(key)**  
  _Rationale:_ Correct: the microtask queue drains before macrotasks like timers.
- B. The setTimeout callback, because 0ms means immediate  
  _Rationale:_ 0ms still schedules a macrotask that runs after microtasks.
- C. They run simultaneously on two threads  
  _Rationale:_ Both run on the single main thread, not in parallel.
- D. Neither runs until I/O completes  
  _Rationale:_ Both are scheduled independently of I/O completion.

**MST-0886-Q0002** (multiple-answer, Select TWO) Which TWO statements about Node.js streams and backpressure are correct? (Select TWO.)

- A. writable.write returns false when the internal buffer is full **(key)**  
  _Rationale:_ Correct: a false return signals the producer to pause.
- B. pipeline handles backpressure and cleanup automatically **(key)**  
  _Rationale:_ Correct: stream.pipeline manages flow and error propagation.
- C. Streams keep the whole payload in memory to compute length first  
  _Rationale:_ Streams process data in chunks and do not buffer the entire payload.
- D. Streams always load the entire file into memory first  
  _Rationale:_ Streams process data in chunks, which is their advantage.

**MST-0886-Q0003** (single-answer, Select ONE) You move a CPU-bound computation into a worker thread. How does it share data with the main thread?

- A. By message passing (or SharedArrayBuffer); it does not share ordinary variables **(key)**  
  _Rationale:_ Correct: workers have isolated memory and communicate via messages or shared buffers.
- B. By reading the main thread's variables directly  
  _Rationale:_ Worker memory is isolated; direct variable sharing is not possible.
- C. Through the DOM  
  _Rationale:_ There is no DOM in Node.js.
- D. Only through writing to a file  
  _Rationale:_ Files are possible but not the mechanism; messaging is built in.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
