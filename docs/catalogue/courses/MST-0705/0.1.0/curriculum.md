# Fabric Real-Time Intelligence and Event Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0705` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-FABRIC-RTI (https://learn.microsoft.com/fabric/real-time-intelligence/overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fabric Real-Time Intelligence and Event Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Understand Real-Time Intelligence' to professional tasks
2. Apply the skills of 'Ingest with Eventstream' to professional tasks
3. Apply the skills of 'Store and query with Eventhouse and KQL' to professional tasks
4. Apply the skills of 'Visualize and act' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Understand Real-Time Intelligence (25%, design assumption)

- Worked applications: (1) Map a streaming scenario onto eventstream, eventhouse and dashboard; (2) Decide when real-time analytics is warranted over batch
- Common misconception addressed: Thinking Real-Time hub is something you build rather than a provisioned surface
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Real-Time Intelligence workload | 60 | 6 |
| M01L02 | Core components overview | 60 | 6 |
| M01L03 | Real-Time hub | 60 | 6 |
| M01L04 | Streaming vs batch analytics | 60 | 6 |
### M02 Ingest with Eventstream (25%, design assumption)

- Worked applications: (1) Build an eventstream that filters events and routes to an eventhouse; (2) Normalize timestamps and partition an incoming stream
- Common misconception addressed: Assuming events reach an eventhouse without configuring a destination
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Eventstream sources (Event Hubs, Kafka, IoT, REST) | 60 | 6 |
| M02L02 | Transformations and routing | 60 | 6 |
| M02L03 | Destinations (eventhouse, lakehouse) | 60 | 6 |
| M02L04 | Derived eventstreams | 60 | 6 |
### M03 Store and query with Eventhouse and KQL (25%, design assumption)

- Worked applications: (1) Write a KQL query that aggregates events over a time window; (2) Use a KQL queryset to explore and share a query
- Common misconception addressed: Trying to use row-by-row OLTP patterns on time-series event data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Eventhouse and KQL databases | 60 | 6 |
| M03L02 | Writing KQL queries and querysets | 60 | 6 |
| M03L03 | Automatic indexing and partitioning | 60 | 6 |
| M03L04 | T-SQL via the SQL analytics endpoint | 60 | 6 |
### M04 Visualize and act (25%, design assumption)

- Worked applications: (1) Build a Real-Time Dashboard tile backed by a KQL query; (2) Create an Activator rule that alerts when a metric crosses a threshold
- Common misconception addressed: Expecting a Real-Time Dashboard to refresh without new data arriving
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Real-Time Dashboards | 60 | 6 |
| M04L02 | Anomaly detection on eventhouse tables | 60 | 6 |
| M04L03 | Activator rules and alerts | 60 | 6 |
| M04L04 | Triggering Fabric jobs on conditions | 60 | 6 |

## Integrative case

An operations team must monitor IoT telemetry live: ingest with an eventstream, land events in an eventhouse, write KQL to aggregate by time window, build a Real-Time Dashboard, and set an Activator rule that alerts and triggers a job when a threshold is breached.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0705-final-protected | 72 | 72 | yes |
| MST-0705-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Understand Real-Time Intelligence | 18 |
| Ingest with Eventstream | 18 |
| Store and query with Eventhouse and KQL | 18 |
| Visualize and act | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0705-Q0001** (single-answer, Select ONE) Which Real-Time Intelligence component ingests streaming data from sources like Event Hubs and routes it to a destination with a no-code experience?

- A. Eventstream **(key)**  
  _Rationale:_ Correct: eventstream is the no-code pipeline that captures, transforms and routes real-time events.
- B. Eventhouse  
  _Rationale:_ An eventhouse stores and analyzes the data; it is the destination, not the ingestion pipeline.
- C. A semantic model  
  _Rationale:_ A semantic model is a Power BI concept, not a streaming ingestion component.
- D. A deployment pipeline  
  _Rationale:_ Deployment pipelines promote content between stages; they do not ingest streams.
**MST-0705-Q0002** (single-answer, Select ONE) A team needs fast filtering and aggregation over billions of time-series events. Which store and language are purpose-built for this?

- A. Eventhouse queried with KQL **(key)**  
  _Rationale:_ Correct: eventhouses are built for streaming/time-series data and use KQL for fast queries.
- B. A warehouse queried only with batch exports  
  _Rationale:_ Batch exports do not provide the low-latency event analysis an eventhouse does.
- C. A Power BI dashboard alone  
  _Rationale:_ A dashboard visualizes results; it is not the analytics store or query language.
- D. A Dataverse table  
  _Rationale:_ Dataverse is an application data platform, not a time-series event store.
**MST-0705-Q0003** (multiple-answer, Select TWO) Which TWO things can Activator do in Real-Time Intelligence? (Select TWO)

- A. Send a notification when a defined condition is met **(key)**  
  _Rationale:_ Correct: Activator is a no-code rules engine that alerts on conditions.
- B. Trigger a Fabric job when a rule fires **(key)**  
  _Rationale:_ Correct: Activator can trigger Fabric jobs when a condition is met.
- C. Store billions of events for KQL queries  
  _Rationale:_ Storing events is the eventhouse's role, not Activator's.
- D. Replace the eventstream ingestion pipeline  
  _Rationale:_ Activator acts on data; it does not ingest streams.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/fabric/real-time-intelligence/overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
