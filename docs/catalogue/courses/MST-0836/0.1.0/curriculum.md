# .NET Background Jobs and Message Processing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0836` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-DOTNET-WORKERS** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Implement background work with IHostedService and BackgroundService
2. Build a queued background task pipeline that processes work reliably
3. Design idempotent message processing that survives restarts and retries
4. Handle poison messages, dead-lettering and ordered processing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/dotnet/core/extensions/workers
- https://learn.microsoft.com/aspnet/core/fundamentals/host/hosted-services

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Hosted services and the worker

- Purpose: Teach IHostedService, BackgroundService and the Worker Service template.
- Worked applications: (1) Create a BackgroundService that polls a database every minute for pending work; (2) Register two hosted services and coordinate a graceful shutdown
- Common misconception addressed: Starting a raw Task.Run thread and assuming it shuts down gracefully
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | IHostedService and BackgroundService | 80 | 5 |
| M01L02 | The Worker Service template and generic host | 80 | 5 |
| M01L03 | Startup, shutdown and cancellation tokens | 80 | 5 |

### M02 Queued processing and reliability

- Purpose: Teach queue-based task processing and at-least-once delivery semantics.
- Worked applications: (1) Build an in-memory IBackgroundTaskQueue with a consumer BackgroundService; (2) Add a retry with backoff that distinguishes transient from permanent failures
- Common misconception addressed: Assuming a queue delivers each message exactly once
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Queue-based load leveling | 80 | 5 |
| M02L02 | At-least-once delivery and retries | 80 | 5 |
| M02L03 | Checkpoints and resuming long tasks | 80 | 5 |

### M03 Idempotency and poison messages

- Purpose: Teach idempotent handlers, dead-letter queues and ordered processing.
- Worked applications: (1) Make a handler idempotent so a duplicated message causes no double side effect; (2) Route a repeatedly failing message to a dead-letter queue after N attempts
- Common misconception addressed: Keeping sensitive data directly inside queue message payloads
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Designing idempotent handlers | 80 | 5 |
| M03L02 | Poison messages and dead-lettering | 80 | 5 |
| M03L03 | Ordered processing and message sessions | 80 | 5 |

## Integrative case

A billing worker occasionally double-charges customers after a pod restart. Redesign it as a queued BackgroundService with idempotent handlers, retry-with-backoff, and a dead-letter path for poison messages, then justify each choice.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0836-final-protected | 30 | 30 | yes |
| MST-0836-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Hosted services and the worker | 10 |
| Queued processing and reliability | 10 |
| Idempotency and poison messages | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0836-Q0001** (single-answer, Select ONE) Why is implementing IHostedService / BackgroundService preferred over starting a bare background thread?

- A. Its lifetime is coordinated with the host so it can run graceful shutdown and cleanup **(key)**  
  _Rationale:_ Correct: hosted services get start/stop hooks tied to the host lifetime for graceful shutdown.
- B. It makes the work run on the UI thread  
  _Rationale:_ Background services are not about UI threads; .NET workers are typically headless.
- C. It guarantees the work never fails  
  _Rationale:_ Nothing guarantees failure-free execution; resilience must be designed in.
- D. It removes the need for dependency injection  
  _Rationale:_ Hosted services integrate with DI rather than removing it.

**MST-0836-Q0002** (multiple-answer, Select TWO) Queues used by your background tasks guarantee at-least-once delivery. Select TWO measures that keep processing correct under duplicates and restarts.

- A. Make message handlers idempotent **(key)**  
  _Rationale:_ Correct: idempotent handlers tolerate the same message being processed more than once.
- B. Use checkpoints so a restarted task resumes from its last known point **(key)**  
  _Rationale:_ Correct: checkpoints let long tasks resume instead of restarting from the beginning.
- C. Assume each message is delivered exactly once  
  _Rationale:_ At-least-once delivery means duplicates are possible; assuming exactly-once is unsafe.
- D. Delete the message before processing completes  
  _Rationale:_ Deleting before completion can lose work if processing then fails.
- E. Store large sensitive payloads inside each message  
  _Rationale:_ Sensitive data in payloads risks exposure via logs or dead-letters; pass a reference instead.

**MST-0836-Q0003** (single-answer, Select ONE) A message fails on every attempt because its referenced record no longer exists. What should the processor do?

- A. Treat it as a permanent failure and move it to a dead-letter queue **(key)**  
  _Rationale:_ Correct: permanent failures should be dead-lettered rather than retried forever.
- B. Retry it indefinitely until it succeeds  
  _Rationale:_ Endless retries of a permanent failure block the queue and waste attempts.
- C. Silently drop it with no record  
  _Rationale:_ Silently dropping loses the ability to investigate; dead-lettering preserves it.
- D. Pause all other processing until it succeeds  
  _Rationale:_ A single poison message should not halt the whole pipeline.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
