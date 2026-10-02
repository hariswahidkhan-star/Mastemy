# Spring Batch: Enterprise Data Processing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0854` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Spring Batch: Enterprise Data Processing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Spring Batch job and step architecture
2. Build chunk-oriented processing
3. Make jobs reliable with restart, skip and retry
4. Scale and operate batch jobs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Batch fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define a simple job with one step; (2) Run a job with unique identifying parameters
- Common misconception addressed: Confusing a job instance with a job execution
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Jobs, steps and the JobRepository | 120 | 7 |
| M01L02 | JobLauncher, parameters and instances | 120 | 7 |

### M02 Chunk-oriented processing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Read a CSV, transform it and write to a database; (2) Tune the commit interval for throughput
- Common misconception addressed: Assuming a larger chunk size is always faster
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ItemReader, ItemProcessor and ItemWriter | 120 | 7 |
| M02L02 | Chunk size, commit interval and transactions | 120 | 7 |

### M03 Reliability (MASTEMY-DESIGN 25%)

- Worked applications: (1) Make a failed job restart from the last commit point; (2) Configure skip and retry for bad records
- Common misconception addressed: Expecting a non-restartable job to resume mid-step
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Restartability and execution state | 120 | 7 |
| M03L02 | Skip, retry and fault tolerance | 120 | 7 |

### M04 Scaling and operations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Partition a step across a key range; (2) Expose job metrics for monitoring
- Common misconception addressed: Parallelising a step that uses shared mutable state
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Partitioning and multi-threaded steps | 120 | 7 |
| M04L02 | Scheduling, monitoring and operations | 120 | 7 |

## Integrative case

Design a nightly job that imports a large CSV into a database: build the reader, processor and writer, choose a commit interval, make it restartable with skip and retry for malformed rows, partition it to meet the processing window, and expose metrics for monitoring.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0854-final-protected | 40 | 50 | yes |
| MST-0854-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Batch fundamentals | 10 |
| Chunk-oriented processing | 10 |
| Reliability | 10 |
| Scaling and operations | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0854-Q0001** (single-answer, Select ONE) In Spring Batch, what records the state that lets a job restart?

- A. The JobRepository **(key)**  
  _Rationale:_ Correct: the JobRepository persists execution state for restart.
- B. The ItemReader  
  _Rationale:_ The reader supplies items; it does not persist job state.
- C. application.properties  
  _Rationale:_ Config files are not where execution state is stored.
- D. The JVM heap  
  _Rationale:_ Heap memory is transient and lost on restart.

**MST-0854-Q0002** (multiple-answer, Select TWO) Which TWO are components of chunk-oriented processing? (Select TWO.)

- A. ItemReader **(key)**  
  _Rationale:_ Correct: the reader provides items for the chunk.
- B. ItemWriter **(key)**  
  _Rationale:_ Correct: the writer persists each processed chunk.
- C. DispatcherServlet  
  _Rationale:_ DispatcherServlet is a Spring MVC web component.
- D. BeanPostProcessor  
  _Rationale:_ BeanPostProcessor is a container lifecycle hook, not a chunk component.

**MST-0854-Q0003** (single-answer, Select ONE) A larger commit interval generally...

- A. reduces commit overhead but risks more rework on failure **(key)**  
  _Rationale:_ Correct: fewer commits are cheaper but more work is lost per failure.
- B. always increases reliability  
  _Rationale:_ Larger intervals increase, not decrease, work lost on failure.
- C. disables restart  
  _Rationale:_ Commit interval does not disable restartability.
- D. reduces memory use  
  _Rationale:_ Larger chunks usually use more memory, not less.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
