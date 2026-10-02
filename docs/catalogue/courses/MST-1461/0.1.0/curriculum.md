# Dataflow and Pub/Sub

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1461` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-STREAM (https://cloud.google.com/dataflow/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Dataflow and Pub/Sub (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain streaming and batch data processing concepts
2. Publish and consume messages with Pub/Sub
3. Build Apache Beam pipelines that run on Dataflow
4. Apply windowing, watermarks and triggers to streams
5. Handle late data, dead letters and exactly-once delivery
6. Operate, monitor and tune Dataflow jobs for cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Streaming fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Classify a workload as batch or streaming; (2) Explain event time vs processing time for an event
- Common misconception addressed: Assuming processing time equals event time under load
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Batch vs streaming | 48 | 5 |
| M01L02 | Event time, processing time and watermarks | 48 | 5 |

### M02 Pub/Sub messaging (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a topic and subscription and publish a message; (2) Choose pull vs push delivery for a consumer
- Common misconception addressed: Treating a subscription as if it stored messages forever
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Topics, subscriptions and publishing | 48 | 5 |
| M02L02 | Pull, push and acknowledgements | 48 | 5 |

### M03 Building Beam pipelines (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a simple Beam pipeline with a transform; (2) Run the same pipeline in batch and streaming mode
- Common misconception addressed: Thinking Beam code is tied to one runner only
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Apache Beam model and transforms | 48 | 5 |
| M03L02 | Running pipelines on Dataflow | 48 | 5 |

### M04 Windowing and triggers (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply fixed and sliding windows to a stream; (2) Configure triggers to emit early and on-time results
- Common misconception addressed: Using a global window and wondering why results never emit
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Fixed, sliding and session windows | 48 | 5 |
| M04L02 | Watermarks and triggers | 48 | 5 |

### M05 Reliability and correctness (MASTEMY-DESIGN 17%)

- Worked applications: (1) Route malformed messages to a dead-letter topic; (2) Reason about exactly-once vs at-least-once delivery
- Common misconception addressed: Assuming at-least-once means duplicates never happen
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Late data and dead letters | 48 | 5 |
| M05L02 | Delivery guarantees and idempotency | 48 | 5 |

### M06 Operating Dataflow (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read the Dataflow job graph to find a bottleneck; (2) Tune autoscaling and workers to control cost
- Common misconception addressed: Leaving a streaming job over-provisioned around the clock
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Monitoring and the job graph | 48 | 5 |
| M06L02 | Autoscaling, tuning and cost | 48 | 5 |

## Integrative case

A logistics firm ingests GPS events at scale: publish events to Pub/Sub, build a Dataflow pipeline that windows and aggregates them, handle late and malformed messages with dead-letter topics, and operate the job with monitoring and cost controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1461-final-protected | 30 | 30 | yes |
| MST-1461-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Streaming fundamentals | 5 |
| Pub/Sub messaging | 5 |
| Building Beam pipelines | 5 |
| Windowing and triggers | 5 |
| Reliability and correctness | 5 |
| Operating Dataflow | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1461-Q0001** (single-answer, Select ONE) GPS events sometimes arrive seconds after they occurred due to network delays. Which concept distinguishes when an event happened from when it is processed?

- A. Event time vs processing time **(key)**  
  _Rationale:_ Correct: event time is when it occurred; processing time is when the pipeline handles it.
- B. Batch size  
  _Rationale:_ Batch size concerns throughput, not timing semantics.
- C. Topic retention  
  _Rationale:_ Retention is how long messages are kept, not timing semantics.
- D. Worker count  
  _Rationale:_ Worker count affects capacity, not event vs processing time.

**MST-1461-Q0002** (multiple-answer, Select TWO) Which TWO help a Dataflow streaming job handle problem messages correctly? (Select TWO.)

- A. Send unparseable messages to a dead-letter topic **(key)**  
  _Rationale:_ Correct: dead-lettering isolates bad messages without stopping the pipeline.
- B. Design transforms to be idempotent **(key)**  
  _Rationale:_ Correct: idempotency makes reprocessing safe under at-least-once delivery.
- C. Drop any message that arrives late without recording it  
  _Rationale:_ Silently dropping late data loses information and is rarely acceptable.
- D. Assume exactly-once removes all need for idempotency  
  _Rationale:_ Robust pipelines still design for safe reprocessing.

**MST-1461-Q0003** (single-answer, Select ONE) You need per-minute counts from a continuous event stream. Which windowing approach fits?

- A. Fixed (tumbling) one-minute windows **(key)**  
  _Rationale:_ Correct: fixed one-minute windows produce non-overlapping per-minute aggregates.
- B. A single global window with no trigger  
  _Rationale:_ A global window without triggers never emits interim results.
- C. No windowing at all  
  _Rationale:_ Unbounded streams need windows to aggregate over time.
- D. Batch mode only  
  _Rationale:_ Per-minute counts on a live stream require streaming windows.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
