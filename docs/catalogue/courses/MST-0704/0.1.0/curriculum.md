# Fabric Data Factory Pipelines and Dataflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0704` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-FABRIC-DATAFACTORY (https://learn.microsoft.com/fabric/data-factory/copy-data-activity) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fabric Data Factory Pipelines and Dataflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Orient to Data Factory in Fabric' to professional tasks
2. Apply the skills of 'Move data with the Copy activity' to professional tasks
3. Apply the skills of 'Transform with Dataflow Gen2' to professional tasks
4. Apply the skills of 'Orchestrate and monitor' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Orient to Data Factory in Fabric (25%, design assumption)

- Worked applications: (1) Decide between a copy job, a pipeline and a dataflow for a task; (2) Pick connectors for a source and a lakehouse destination
- Common misconception addressed: Assuming Fabric pipelines and Azure Data Factory are identical
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pipelines, dataflows and copy jobs | 60 | 6 |
| M01L02 | When to use a pipeline vs a dataflow | 60 | 6 |
| M01L03 | Connectors and OneLake integration | 60 | 6 |
| M01L04 | Comparison with Azure Data Factory | 60 | 6 |
### M02 Move data with the Copy activity (25%, design assumption)

- Worked applications: (1) Build a Copy activity from a database into a lakehouse table; (2) Parameterize a copy so one activity serves many tables
- Common misconception addressed: Enabling staging for every copy when it only helps specific scenarios
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Copy activity source and destination | 60 | 6 |
| M02L02 | Mapping and data-type conversion | 60 | 6 |
| M02L03 | Staging and compression | 60 | 6 |
| M02L04 | Parameterizing with dynamic content | 60 | 6 |
### M03 Transform with Dataflow Gen2 (25%, design assumption)

- Worked applications: (1) Create a Dataflow Gen2 that cleans and lands data in a lakehouse; (2) Enable fast copy and confirm it ran via refresh history
- Common misconception addressed: Believing Dataflow Gen2 is only Power BI dataflows renamed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Power Query in Dataflow Gen2 | 60 | 6 |
| M03L02 | Data destinations and managed settings | 60 | 6 |
| M03L03 | Fast copy for large ingestion | 60 | 6 |
| M03L04 | Refresh history and monitoring | 60 | 6 |
### M04 Orchestrate and monitor (25%, design assumption)

- Worked applications: (1) Schedule a pipeline that runs a copy then triggers a dataflow; (2) Add a ForEach loop to copy several tables in parallel
- Common misconception addressed: Running activities serially when a ForEach loop would parallelize them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Control flow: ForEach, conditions, run-after | 60 | 6 |
| M04L02 | Scheduling and triggers | 60 | 6 |
| M04L03 | Combining pipelines with dataflows | 60 | 6 |
| M04L04 | Monitoring Hub and refresh tracking | 60 | 6 |

## Integrative case

A data team must ingest nightly data from several sources: build parameterized Copy activities into a lakehouse, clean the data in a Dataflow Gen2 with fast copy, orchestrate it all in a scheduled pipeline with a ForEach loop, and monitor refreshes in the Monitoring Hub.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0704-final-protected | 72 | 72 | yes |
| MST-0704-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Orient to Data Factory in Fabric | 18 |
| Move data with the Copy activity | 18 |
| Transform with Dataflow Gen2 | 18 |
| Orchestrate and monitor | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0704-Q0001** (single-answer, Select ONE) A team only needs to move data between stores with no transformation. Which Fabric option does Microsoft suggest as the simplest?

- A. A Copy job **(key)**  
  _Rationale:_ Correct: a copy job gives a simplified data-movement experience when no transformation is needed.
- B. A full Dataflow Gen2 with many transforms  
  _Rationale:_ A dataflow is for transformation; it is heavier than needed for pure movement.
- C. A semantic model  
  _Rationale:_ A semantic model is a reporting layer, not a data-movement tool.
- D. A KQL queryset  
  _Rationale:_ A KQL queryset queries real-time data; it does not move data between stores.
**MST-0704-Q0002** (single-answer, Select ONE) In Dataflow Gen2, how can a maker confirm that fast copy was actually used for a refresh?

- A. Check the Engine type in the refresh history **(key)**  
  _Rationale:_ Correct: the refresh history shows the engine type (for example CopyActivity) indicating fast copy ran.
- B. Count the number of columns  
  _Rationale:_ Column count does not indicate which engine ran the refresh.
- C. Delete the dataflow and recreate it  
  _Rationale:_ Deleting the dataflow does not confirm whether fast copy ran.
- D. Pause the capacity  
  _Rationale:_ Pausing capacity stops compute and tells you nothing about the engine used.
**MST-0704-Q0003** (multiple-answer, Select TWO) Which TWO are true about pipelines and dataflows in Fabric Data Factory? (Select TWO)

- A. Pipelines can run activities on a schedule and orchestrate other items **(key)**  
  _Rationale:_ Correct: pipelines group and schedule activities, including triggering dataflows.
- B. Dataflow Gen2 uses Power Query to transform data **(key)**  
  _Rationale:_ Correct: Dataflow Gen2 is built on the Power Query experience.
- C. The Copy activity can only read from OneLake  
  _Rationale:_ The Copy activity connects to many cloud and external sources, not only OneLake.
- D. A ForEach loop forces activities to run one at a time  
  _Rationale:_ ForEach can run iterations in parallel to increase throughput.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/fabric/data-factory/copy-data-activity) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
