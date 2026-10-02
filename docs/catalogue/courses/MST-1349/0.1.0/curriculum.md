# ML Pipelines and Orchestration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1349` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Pipeline fundamentals and DAGs
2. Orchestration tools and scheduling
3. Data and artifact passing
4. Reliability and observability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Pipeline fundamentals and DAGs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Model a training job as a DAG; (2) Design a safe backfill for a failed window
- Common misconception addressed: Thinking a cron job is equivalent to an orchestrated, data-aware pipeline
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pipelines, tasks and directed acyclic graphs | 120 | 8 |
| M01L02 | Idempotency, retries and backfills | 120 | 8 |

### M02 Orchestration tools and scheduling (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose an orchestrator for a given team; (2) Wire a sensor that waits on upstream data
- Common misconception addressed: Assuming time-based schedules alone are enough for data-dependent jobs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Airflow, Dagster and Prefect compared | 120 | 8 |
| M02L02 | Scheduling, sensors and event triggers | 120 | 8 |

### M03 Data and artifact passing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design artifact passing for a feature step; (2) Enable step caching without stale reads
- Common misconception addressed: Passing large datasets through small metadata channels like XCom
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Passing data and parameters between steps | 120 | 8 |
| M03L02 | Caching, versioning and artifact lineage | 120 | 8 |

### M04 Reliability and observability (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set an SLA and alert for a daily pipeline; (2) Recover a partially failed multi-step run
- Common misconception addressed: Treating a green run as proof the data it produced is correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitoring, alerting and SLAs | 120 | 8 |
| M04L02 | Failure recovery and reprocessing strategy | 120 | 8 |

## Integrative case

A retailer's nightly recommendation pipeline keeps serving stale features after an upstream feed fails silently. Design the DAG, caching, data-aware sensors, SLAs and recovery so the failure is detected, alerted and backfilled without double-counting events.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1349-final-protected | 20 | 20 | yes |
| MST-1349-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Pipeline fundamentals and DAGs | 5 |
| Orchestration tools and scheduling | 5 |
| Data and artifact passing | 5 |
| Reliability and observability | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1349-Q0001** (single-answer, Select ONE) A training step sometimes reruns after a transient worker crash. Why should it be written to be idempotent?

- A. Re-running it produces the same result and no duplicate side effects **(key)**  
  _Rationale:_ Correct: idempotent steps can be safely retried, which is the whole point of orchestrated retries.
- B. It makes the step run faster on the second attempt  
  _Rationale:_ Idempotency is about correctness under retries, not speed.
- C. It guarantees the upstream data is fresh  
  _Rationale:_ Freshness is handled by sensors/scheduling, not idempotency.
- D. It removes the need for any monitoring  
  _Rationale:_ Monitoring is still required regardless of idempotency.

**MST-1349-Q0002** (multiple-answer, Select TWO) A daily job depends on a partner file that arrives at an unpredictable time. Which TWO choices make the pipeline react to the data rather than the clock? (Select TWO.)

- A. Use a sensor/trigger that waits for the file to land **(key)**  
  _Rationale:_ Correct: a sensor blocks until the dependency exists, making the run data-aware.
- B. Emit an event when the file lands and start the DAG from it **(key)**  
  _Rationale:_ Correct: event-driven triggering starts work exactly when data is ready.
- C. Schedule the job 6 hours after midnight and hope the file arrived  
  _Rationale:_ A fixed offset is still clock-based and fails when the file is late.
- D. Increase the number of retries on the first step  
  _Rationale:_ Retries do not make the job aware of data readiness.

**MST-1349-Q0003** (single-answer, Select ONE) A step needs to hand a 5 GB dataset to the next step. What is the recommended pattern?

- A. Write the data to shared object storage and pass only a reference/URI **(key)**  
  _Rationale:_ Correct: pass a pointer; keep bulk data out of the orchestrator's metadata channel.
- B. Serialize the whole dataset through the orchestrator's XCom/metadata channel  
  _Rationale:_ Metadata channels are for small values and will choke or fail on large data.
- C. Recompute the dataset in the next step from scratch  
  _Rationale:_ Wasteful and breaks lineage; the data already exists.
- D. Email the dataset to the next task  
  _Rationale:_ Not a real data-passing mechanism.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
