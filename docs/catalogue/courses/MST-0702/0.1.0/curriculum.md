# Fabric Lakehouse Design and Data Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0702` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-FABRIC-LAKEHOUSE (https://learn.microsoft.com/fabric/data-engineering/lakehouse-overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fabric Lakehouse Design and Data Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Understand the lakehouse and OneLake' to professional tasks
2. Apply the skills of 'Ingest data into the lakehouse' to professional tasks
3. Apply the skills of 'Transform with Spark notebooks' to professional tasks
4. Apply the skills of 'Serve and secure lakehouse data' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Understand the lakehouse and OneLake (25%, design assumption)

- Worked applications: (1) Load a CSV into a Delta table and query it three ways; (2) Decide between a lakehouse and a warehouse for a SQL-first team
- Common misconception addressed: Thinking each engine needs its own copy of the data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a Fabric lakehouse is | 60 | 6 |
| M01L02 | OneLake as one copy of data | 60 | 6 |
| M01L03 | Delta Lake as the table format | 60 | 6 |
| M01L04 | Lakehouse vs warehouse | 60 | 6 |
### M02 Ingest data into the lakehouse (25%, design assumption)

- Worked applications: (1) Create a shortcut to external data and query it without copying; (2) Choose between a shortcut and a copy for an external source
- Common misconception addressed: Believing a shortcut physically duplicates the source data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Files and Tables areas | 60 | 6 |
| M02L02 | Load to Tables and schema inference | 60 | 6 |
| M02L03 | OneLake shortcuts (no-copy access) | 60 | 6 |
| M02L04 | Pipelines and dataflows for ingestion | 60 | 6 |
### M03 Transform with Spark notebooks (25%, design assumption)

- Worked applications: (1) Write a notebook that aggregates a Delta table into a gold table; (2) Design a bronze-silver-gold layout for a raw feed
- Common misconception addressed: Treating the raw bronze layer as the layer business users should query
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | PySpark DataFrame basics | 60 | 6 |
| M03L02 | Reading and writing Delta tables | 60 | 6 |
| M03L03 | The medallion (bronze/silver/gold) architecture | 60 | 6 |
| M03L04 | v-order, partitioning and optimization | 60 | 6 |
### M04 Serve and secure lakehouse data (25%, design assumption)

- Worked applications: (1) Expose a gold table through the SQL analytics endpoint for reporting; (2) Apply row-level security to a lakehouse table and verify it in Spark
- Common misconception addressed: Assuming the SQL analytics endpoint can modify lakehouse data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The SQL analytics endpoint | 60 | 6 |
| M04L02 | Direct Lake for Power BI | 60 | 6 |
| M04L03 | OneLake security (RLS and CLS) | 60 | 6 |
| M04L04 | Governance and sharing | 60 | 6 |

## Integrative case

A data team must build a lakehouse for sales telemetry: ingest raw files, add a shortcut to an external source, transform through a medallion architecture in Spark notebooks, then expose gold tables with row-level security for a Direct Lake Power BI report.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0702-final-protected | 72 | 72 | yes |
| MST-0702-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Understand the lakehouse and OneLake | 18 |
| Ingest data into the lakehouse | 18 |
| Transform with Spark notebooks | 18 |
| Serve and secure lakehouse data | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0702-Q0001** (single-answer, Select ONE) A data engineer uses Spark and an analyst uses T-SQL on the same lakehouse table without exporting data. What makes this possible?

- A. OneLake stores the table once in open Delta format **(key)**  
  _Rationale:_ Correct: OneLake stores one copy in open Delta Parquet that every Fabric engine can read.
- B. Each engine keeps its own private copy  
  _Rationale:_ The point of OneLake is one copy shared across engines, not per-engine copies.
- C. The table is duplicated nightly  
  _Rationale:_ No duplication is needed; engines read the same Delta files.
- D. Spark converts the table to a proprietary format  
  _Rationale:_ Delta is an open format; no proprietary conversion occurs.
**MST-0702-Q0002** (single-answer, Select ONE) A team needs to query data that lives in an external storage account from the lakehouse without copying it. Which feature should they use?

- A. A OneLake shortcut **(key)**  
  _Rationale:_ Correct: shortcuts provide live access to external data without copying it into the lakehouse.
- B. A full nightly copy pipeline  
  _Rationale:_ A copy pipeline duplicates data, which is what the team wants to avoid.
- C. A semantic model  
  _Rationale:_ A semantic model is a reporting layer, not a no-copy access mechanism.
- D. A resource lock  
  _Rationale:_ Resource locks are an Azure governance control, unrelated to lakehouse access.
**MST-0702-Q0003** (multiple-answer, Select TWO) Which TWO statements about a Fabric lakehouse are correct? (Select TWO)

- A. It stores tables in Delta Lake format **(key)**  
  _Rationale:_ Correct: the lakehouse manages tables with Delta Lake.
- B. Spark notebooks and T-SQL can both read its tables **(key)**  
  _Rationale:_ Correct: data engineers use Spark while analysts use the T-SQL SQL analytics endpoint over the same data.
- C. It requires converting data out of Delta before Power BI can use it  
  _Rationale:_ Direct Lake reads Delta directly; no conversion is required.
- D. Its SQL analytics endpoint is used to update table data  
  _Rationale:_ The SQL analytics endpoint is read-optimized and does not modify the data.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/fabric/data-engineering/lakehouse-overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
