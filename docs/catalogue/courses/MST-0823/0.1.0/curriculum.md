# C# Asynchronous Programming and Concurrency

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0823` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Task asynchronous programming model; await operator; Task.WhenAll/WhenAny composition). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-CSHARP-ASYNC (https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/task-asynchronous-programming-model; https://learn.microsoft.com/dotnet/standard/parallel-programming/task-based-asynchronous-programming; accessed 2026-10-02) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — C# Asynchronous Programming and Concurrency (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the task-based asynchronous model and how await suspends a method
2. Compose concurrent work with Task.WhenAll and Task.WhenAny
3. Cancel and time out asynchronous work correctly
4. Avoid deadlocks and understand synchronization context
5. Coordinate shared state safely under concurrency

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 The task model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace control returning to the caller at an await; (2) Pick Task vs Task<T> vs ValueTask for a method
- Common misconception addressed: Believing await blocks the calling thread
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | async/await and suspension points | 120 | 7 |
| M01L02 | Return types: Task, Task<T>, ValueTask | 120 | 7 |

### M02 Composing concurrency (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run three independent calls with Task.WhenAll; (2) Use Task.WhenAny to take the first of several results
- Common misconception addressed: Awaiting calls one by one when they could run concurrently
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Task.WhenAll for parallel work | 120 | 7 |
| M02L02 | Task.WhenAny and timeouts | 120 | 7 |

### M03 Cancellation and timeouts (MASTEMY-DESIGN 20%)

- Worked applications: (1) Thread a CancellationToken through an async call chain; (2) Apply a timeout that cancels a slow operation
- Common misconception addressed: Ignoring the CancellationToken parameter
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CancellationToken end to end | 120 | 7 |
| M03L02 | Timeouts and cooperative cancellation | 120 | 7 |

### M04 Deadlocks and context (MASTEMY-DESIGN 20%)

- Worked applications: (1) Diagnose a .Result deadlock and fix it with await; (2) Decide where ConfigureAwait(false) helps
- Common misconception addressed: Calling .Result/.Wait() on async code on a UI/context thread
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Synchronization context and deadlocks | 120 | 7 |
| M04L02 | ConfigureAwait and best practices | 120 | 7 |

### M05 Shared state (MASTEMY-DESIGN 20%)

- Worked applications: (1) Protect a counter with the right synchronization primitive; (2) Replace a lock with a concurrent collection where it fits
- Common misconception addressed: Assuming async code never needs synchronization
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Locks and concurrent collections | 120 | 7 |
| M05L02 | Interlocked and immutable patterns | 120 | 7 |

## Integrative case

A data importer fetches from several APIs: run the calls concurrently with WhenAll, propagate a cancellation token and timeout, fix a .Result deadlock introduced by a colleague, and guard a shared progress counter safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0823-final-protected | 40 | 50 | yes |
| MST-0823-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The task model | 8 |
| Composing concurrency | 8 |
| Cancellation and timeouts | 8 |
| Deadlocks and context | 8 |
| Shared state | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0823-Q0001** (single-answer, Select ONE) During an await on an incomplete Task, what happens to the thread that was executing the async method?

- A. Control returns to the caller; the thread is not blocked **(key)**  
  _Rationale:_ Correct: await suspends the method and returns control to the caller without blocking the thread.
- B. The thread spins in a busy loop until completion  
  _Rationale:_ await does not busy-wait.
- C. The thread is terminated  
  _Rationale:_ The thread is released, not terminated.
- D. A new process is started  
  _Rationale:_ No new process is involved.

**MST-0823-Q0002** (multiple-answer, Select TWO) Which TWO are correct ways to run independent async calls concurrently and wait for all results? (Select TWO.)

- A. Start the tasks, then await Task.WhenAll on them **(key)**  
  _Rationale:_ Correct: WhenAll awaits all tasks together.
- B. Await each call sequentially in a loop  
  _Rationale:_ Sequential awaits do not overlap the work.
- C. Collect the tasks and await Task.WhenAll(tasks) **(key)**  
  _Rationale:_ Correct: this is the canonical concurrent-wait pattern.
- D. Call .Result on each task in turn  
  _Rationale:_ .Result blocks and risks deadlock.

**MST-0823-Q0003** (single-answer, Select ONE) A UI handler calls `SomeAsync().Result` and the app hangs. What is the idiomatic fix?

- A. await the call in an async handler instead of blocking on .Result **(key)**  
  _Rationale:_ Correct: blocking on .Result on a context thread can deadlock; awaiting avoids it.
- B. Call .Result twice  
  _Rationale:_ Calling it again does not resolve the deadlock.
- C. Wrap it in a tight retry loop  
  _Rationale:_ Retrying a blocking call does not fix the deadlock.
- D. Increase the thread priority  
  _Rationale:_ Priority does not address the context deadlock.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
