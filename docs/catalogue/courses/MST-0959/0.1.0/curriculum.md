# Apache Airflow: Data Pipeline Orchestration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0959` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Apache Airflow: Data Pipeline Orchestration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Airflow concepts and architecture
2. Authoring DAGs and tasks
3. Operators, sensors and task dependencies
4. Scheduling, execution dates and backfills
5. XComs, connections and parameterisation
6. Reliability, retries and monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Airflow concepts and architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe how the scheduler decides a task is ready; (2) Explain the role of the metadata database
- Common misconception addressed: Thinking a DAG file runs the work itself rather than defining it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | DAGs, tasks and the scheduler/executor model | 80 | 6 |
| M01L02 | Metadata database, web UI and workers | 80 | 6 |

### M02 Authoring DAGs and tasks (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a DAG with a daily schedule; (2) Make a task idempotent so re-runs are safe
- Common misconception addressed: Putting heavy work at DAG-parse time instead of inside tasks
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defining a DAG with schedule and default args | 80 | 6 |
| M02L02 | Idempotent tasks and the TaskFlow API | 80 | 6 |

### M03 Operators, sensors and task dependencies (MASTEMY-DESIGN 16%)

- Worked applications: (1) Wire task dependencies with the >> operator; (2) Use a deferrable sensor to wait without holding a worker slot
- Common misconception addressed: Using a poke-mode sensor that blocks a worker for hours
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Common operators and setting dependencies | 80 | 6 |
| M03L02 | Sensors, deferrable tasks and waiting efficiently | 80 | 6 |

### M04 Scheduling, execution dates and backfills (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain what the data interval represents for a run; (2) Run a backfill for a past date range
- Common misconception addressed: Confusing the logical/data interval with wall-clock run time
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Schedule intervals, data intervals and catchup | 80 | 6 |
| M04L02 | Backfills and reprocessing historical data | 80 | 6 |

### M05 XComs, connections and parameterisation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pass a value between tasks with XCom; (2) Template a file path with the data interval date
- Common misconception addressed: Pushing large datasets through XCom instead of external storage
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Passing small data with XComs | 80 | 6 |
| M05L02 | Connections, variables and templated parameters | 80 | 6 |

### M06 Reliability, retries and monitoring (MASTEMY-DESIGN 18%)

- Worked applications: (1) Configure retries with exponential backoff; (2) Set an SLA and alert on a missed one
- Common misconception addressed: Setting unlimited retries that hide a real failure
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Retries, SLAs and alerting | 80 | 6 |
| M06L02 | Logging, observability and troubleshooting failures | 80 | 6 |

## Integrative case

Build a daily sales-aggregation pipeline in Airflow: define a scheduled DAG, wait for the upstream extract with a deferrable sensor, run idempotent transform and load tasks with templated date parameters, configure retries and an SLA, and support a backfill over a past date range.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0959-final-protected | 30 | 30 | yes |
| MST-0959-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Airflow concepts and architecture | 5 |
| Authoring DAGs and tasks | 5 |
| Operators, sensors and task dependencies | 5 |
| Scheduling, execution dates and backfills | 5 |
| XComs, connections and parameterisation | 5 |
| Reliability, retries and monitoring | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0959-Q0001** (single-answer, Select ONE) In Airflow, what does a DAG file primarily do?

- A. Defines the structure, schedule and dependencies of tasks; the work runs in task execution **(key)**  
  _Rationale:_ Correct: the DAG file is a definition parsed by the scheduler, not where the work executes.
- B. Executes all the data processing at parse time  
  _Rationale:_ Heavy work belongs in task execution, not DAG parsing.
- C. Stores the pipeline's output data  
  _Rationale:_ Output goes to external systems, not the DAG file.
- D. Replaces the metadata database  
  _Rationale:_ The metadata database is separate from DAG definitions.

**MST-0959-Q0002** (multiple-answer, Select ALL that apply) Which practices improve Airflow pipeline reliability? (Select TWO)

- A. Making tasks idempotent so re-runs produce the same result **(key)**  
  _Rationale:_ Correct: idempotency makes retries and backfills safe.
- B. Using deferrable sensors to wait without occupying a worker slot **(key)**  
  _Rationale:_ Correct: deferrable sensors free worker capacity while waiting.
- C. Pushing large datasets through XCom between tasks  
  _Rationale:_ XCom is for small values; large data belongs in external storage.
- D. Setting unlimited retries on every task  
  _Rationale:_ Unlimited retries mask genuine failures and waste resources.

**MST-0959-Q0003** (single-answer, Select ONE) What does a task's data interval (logical date) represent?

- A. The period of data the run is responsible for processing **(key)**  
  _Rationale:_ Correct: the data interval identifies which slice of data the run covers.
- B. The exact wall-clock time the task started  
  _Rationale:_ That is the real start time, not the data interval.
- C. The time the DAG file was last edited  
  _Rationale:_ Editing time is unrelated to the data interval.
- D. The number of retries remaining  
  _Rationale:_ Retry count is separate from the data interval.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
