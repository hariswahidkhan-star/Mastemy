# Google Cloud Data Analytics Pipelines

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1478` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Data Analytics Pipelines (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design an end-to-end analytics pipeline on Google Cloud
2. Ingest streaming and batch data with Pub/Sub and Dataflow
3. Store and query data in BigQuery
4. Orchestrate and monitor pipelines for reliability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Pipeline design (MASTEMY-DESIGN 25%)

- Worked applications: (1) Sketch an ingest-process-store-serve pipeline; (2) Decide batch vs streaming for a use case
- Common misconception addressed: Assuming streaming is always better than batch
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Analytics reference architecture | 72 | 7 |
| M01L02 | Batch vs streaming patterns | 72 | 7 |

### M02 Ingestion and processing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Publish and subscribe to an events topic; (2) Write a windowed aggregation in Dataflow
- Common misconception addressed: Thinking Pub/Sub guarantees exactly-once with no deduplication design
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pub/Sub for event ingestion | 72 | 7 |
| M02L02 | Dataflow (Apache Beam) transforms | 72 | 7 |

### M03 Storage and querying (MASTEMY-DESIGN 25%)

- Worked applications: (1) Partition a fact table by event date; (2) Rewrite a query to scan fewer bytes
- Common misconception addressed: Believing SELECT * on a huge table is free
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | BigQuery tables, partitioning and clustering | 72 | 7 |
| M03L02 | Efficient SQL and cost control | 72 | 7 |

### M04 Orchestration and reliability (MASTEMY-DESIGN 25%)

- Worked applications: (1) Schedule a daily load with an orchestrator; (2) Alert when a pipeline misses its SLA
- Common misconception addressed: Treating a one-off manual load as a production pipeline
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scheduling and orchestration | 72 | 7 |
| M04L02 | Monitoring data freshness and failures | 72 | 7 |

## Integrative case

An e-commerce team needs clickstream analytics. Design a pipeline: ingest events through Pub/Sub, process with Dataflow, land curated tables in BigQuery, orchestrate the batch loads, and monitor for data freshness.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1478-final-protected | 28 | 35 | yes |
| MST-1478-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Pipeline design | 7 |
| Ingestion and processing | 7 |
| Storage and querying | 7 |
| Orchestration and reliability | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1478-Q0001** (single-answer, Select ONE) Which service is designed to ingest high-volume streaming events for a pipeline?

- A. Pub/Sub **(key)**  
  _Rationale:_ Correct: Pub/Sub is a scalable messaging service for event ingestion.
- B. Cloud SQL  
  _Rationale:_ Cloud SQL is a relational database, not an event ingestion bus.
- C. Looker Studio  
  _Rationale:_ Looker Studio is for dashboards, not ingestion.
- D. Secret Manager  
  _Rationale:_ Secret Manager stores secrets, not events.

**MST-1478-Q0002** (multiple-answer, Select TWO) Which TWO techniques reduce BigQuery query cost on a large table? (Select TWO.)

- A. Partition the table so queries prune by date **(key)**  
  _Rationale:_ Correct: partition pruning scans fewer bytes.
- B. Select only the columns you need instead of SELECT * **(key)**  
  _Rationale:_ Correct: BigQuery bills by bytes scanned per column.
- C. Always run queries on the largest slot reservation  
  _Rationale:_ That does not reduce bytes scanned/cost per query.
- D. Store everything as a single CSV string column  
  _Rationale:_ That harms performance and cost.

**MST-1478-Q0003** (single-answer, Select ONE) A report that only needs hourly-updated totals, not instant results, is best served by:

- A. A scheduled batch pipeline **(key)**  
  _Rationale:_ Correct: batch fits periodic, latency-tolerant needs at lower cost.
- B. A low-latency streaming pipeline for every event  
  _Rationale:_ Streaming adds cost/complexity not needed here.
- C. Manual spreadsheet exports  
  _Rationale:_ Manual exports are not a reliable pipeline.
- D. Disabling the pipeline entirely  
  _Rationale:_ That defeats the requirement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
