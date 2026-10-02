# Streaming Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1639` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-SA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain streaming concepts and when to use them
2. Reason about event time, processing time and windows
3. Apply stateful processing and aggregations on streams
4. Handle late, out-of-order and duplicate events
5. Design reliable, observable streaming pipelines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Streaming foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether three use cases need streaming; (2) Explain the role of a durable log in a streaming pipeline
- Common misconception addressed: Using streaming where a periodic batch would be simpler and cheaper
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Streams vs batch and use cases | 96 | 8 |
| M01L02 | Sources, sinks and the log abstraction | 96 | 8 |

### M02 Time and windows (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a window type for a described aggregation need; (2) Explain why event time matters for correct results
- Common misconception addressed: Aggregating on processing time and getting wrong results for late data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Event time vs processing time | 96 | 8 |
| M02L02 | Tumbling, sliding and session windows | 96 | 8 |

### M03 Stateful processing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe the state needed for a per-user running count; (2) Explain how checkpointing enables recovery after a failure
- Common misconception addressed: Assuming a streaming job is stateless when it maintains aggregations
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | State, keyed streams and aggregations | 96 | 8 |
| M03L02 | Checkpoints and state recovery | 96 | 8 |

### M04 Correctness challenges (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set a watermark policy for a stream with known lateness; (2) Explain at-least-once vs exactly-once in plain terms
- Common misconception addressed: Ignoring duplicates and double-counting events
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Late and out-of-order events, watermarks | 96 | 8 |
| M04L02 | Duplicates and delivery semantics | 96 | 8 |

### M05 Reliable pipelines (MASTEMY-DESIGN 20%)

- Worked applications: (1) Diagnose a backpressure symptom in a described pipeline; (2) List the signals to monitor on a streaming job
- Common misconception addressed: Not monitoring lag and only noticing failures when users complain
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Backpressure, scaling and throughput | 96 | 8 |
| M05L02 | Monitoring, alerting and failure handling | 96 | 8 |

## Integrative case

An engineer must build a real-time fraud-alerting pipeline. Decide whether streaming is warranted, choose windows on event time, design the state and checkpointing, set a watermark and delivery semantics to handle late and duplicate events, and specify the monitoring that will reveal lag or backpressure before users do.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1639-final-protected | 25 | 25 | yes |
| MST-1639-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Streaming foundations | 5 |
| Time and windows | 5 |
| Stateful processing | 5 |
| Correctness challenges | 5 |
| Reliable pipelines | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1639-Q0001** (single-answer, Select ONE) Why does aggregating on processing time instead of event time cause errors with late data?

- A. A late event is counted in the window it arrived, not the window it actually happened in **(key)**  
  _Rationale:_ Correct: processing-time windows misplace delayed events.
- B. Processing time is always identical to event time  
  _Rationale:_ They differ exactly when events are delayed.
- C. Event time cannot be recorded  
  _Rationale:_ Event time is typically carried in the event.
- D. Windows are irrelevant to time  
  _Rationale:_ Windows are defined over a chosen time domain.

**MST-1639-Q0002** (multiple-answer, Select TWO) Which TWO help a streaming pipeline stay correct and reliable? (Select TWO.)

- A. Use watermarks to bound how long to wait for late events **(key)**  
  _Rationale:_ Correct: watermarks balance completeness against latency.
- B. Checkpoint state so the job can recover after a failure **(key)**  
  _Rationale:_ Correct: checkpointing enables fault-tolerant recovery.
- C. Assume events always arrive in order  
  _Rationale:_ Out-of-order arrival is common and must be handled.
- D. Ignore consumer lag entirely  
  _Rationale:_ Lag is a key reliability signal to monitor.

**MST-1639-Q0003** (single-answer, Select ONE) A use case needs a report once per day from complete data with no latency pressure. What fits best?

- A. A batch job, which is simpler and cheaper than streaming here **(key)**  
  _Rationale:_ Correct: without latency needs, batch is the simpler choice.
- B. A complex streaming pipeline with exactly-once state  
  _Rationale:_ Streaming adds cost and complexity the use case does not need.
- C. A per-event watermarked stream  
  _Rationale:_ Watermarking solves a problem this use case does not have.
- D. Both batch and streaming running in parallel always  
  _Rationale:_ Running both needlessly is wasteful here.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
