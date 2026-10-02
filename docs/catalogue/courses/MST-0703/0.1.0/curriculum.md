# Fabric Data Warehouse and SQL Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0703` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-FABRIC-DW (https://learn.microsoft.com/fabric/data-warehouse/data-warehousing) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fabric Data Warehouse and SQL Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Understand Fabric Data Warehouse' to professional tasks
2. Apply the skills of 'Load and transform data' to professional tasks
3. Apply the skills of 'Query and model for BI' to professional tasks
4. Apply the skills of 'Monitor, secure and manage' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Understand Fabric Data Warehouse (25%, design assumption)

- Worked applications: (1) Create a warehouse and a star-schema set of tables; (2) Decide when a warehouse beats a lakehouse for a workload
- Common misconception addressed: Assuming the lakehouse SQL analytics endpoint supports data modification like a warehouse
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Fabric Data Warehouse is | 60 | 6 |
| M01L02 | Delta storage on OneLake | 60 | 6 |
| M01L03 | T-SQL and multi-table ACID transactions | 60 | 6 |
| M01L04 | Warehouse vs lakehouse SQL analytics endpoint | 60 | 6 |
### M02 Load and transform data (25%, design assumption)

- Worked applications: (1) Bulk-load a file into a warehouse table with COPY INTO; (2) Use CTAS to build a curated dimension table
- Common misconception addressed: Expecting every T-SQL statement from SQL Server to work unchanged
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | COPY INTO and INSERT | 60 | 6 |
| M02L02 | CREATE TABLE AS SELECT (CTAS) | 60 | 6 |
| M02L03 | Pipelines and dataflows for loading | 60 | 6 |
| M02L04 | Cross-database queries | 60 | 6 |
### M03 Query and model for BI (25%, design assumption)

- Worked applications: (1) Write a view that encapsulates a reporting query; (2) Design a star schema for a sales data mart
- Common misconception addressed: Normalizing a reporting warehouse as if it were a transactional database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Querying with the SQL query editor | 60 | 6 |
| M03L02 | Views, stored procedures and functions | 60 | 6 |
| M03L03 | Dimensional modeling (star/snowflake) | 60 | 6 |
| M03L04 | Building a semantic model on the warehouse | 60 | 6 |
### M04 Monitor, secure and manage (25%, design assumption)

- Worked applications: (1) Use Query insights to find a slow query and tune it; (2) Grant least-privilege access to a reporting role
- Common misconception addressed: Assuming cross-region connections between warehouse items are supported
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Query insights and the Monitor | 60 | 6 |
| M04L02 | Dynamic management views (DMVs) | 60 | 6 |
| M04L03 | Permissions and OneLake security | 60 | 6 |
| M04L04 | Capacity usage and performance | 60 | 6 |

## Integrative case

A BI team must stand up a governed sales data mart: create a Fabric warehouse, bulk-load source data, model a star schema with views and procedures, build a semantic model, and set least-privilege permissions, then monitor and tune the heaviest queries.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0703-final-protected | 72 | 72 | yes |
| MST-0703-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Understand Fabric Data Warehouse | 18 |
| Load and transform data | 18 |
| Query and model for BI | 18 |
| Monitor, secure and manage | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0703-Q0001** (single-answer, Select ONE) A SQL-first team needs multi-table ACID transactions and full T-SQL DML for a curated data mart. Which Fabric item fits best?

- A. Fabric Data Warehouse **(key)**  
  _Rationale:_ Correct: the warehouse is developed with T-SQL and supports multi-table ACID transactions and DML.
- B. The lakehouse SQL analytics endpoint  
  _Rationale:_ The SQL analytics endpoint is read-optimized and does not modify data.
- C. An eventhouse  
  _Rationale:_ An eventhouse targets streaming and time-series data, not a SQL-first data mart.
- D. A Power BI dashboard  
  _Rationale:_ A dashboard is a reporting surface, not a data store with transactions.
**MST-0703-Q0002** (single-answer, Select ONE) Where is Fabric Data Warehouse data physically stored?

- A. In Delta tables on OneLake **(key)**  
  _Rationale:_ Correct: warehouse data, like all Fabric data, is stored in Delta tables on OneLake.
- B. In a proprietary row store only the warehouse can read  
  _Rationale:_ Fabric uses the open Delta format, not a closed proprietary store.
- C. Only in memory  
  _Rationale:_ Data is persisted in Delta tables, not held only in memory.
- D. In a separate Azure SQL Database  
  _Rationale:_ The warehouse stores data in OneLake, not an external Azure SQL Database.
**MST-0703-Q0003** (multiple-answer, Select TWO) Which TWO T-SQL techniques load or build tables in a Fabric warehouse? (Select TWO)

- A. COPY INTO for bulk loading **(key)**  
  _Rationale:_ Correct: COPY INTO bulk-loads data into warehouse tables.
- B. CREATE TABLE AS SELECT (CTAS) **(key)**  
  _Rationale:_ Correct: CTAS builds a new table from a query result.
- C. Uploading a .pbix file  
  _Rationale:_ A .pbix is a Power BI report file, not a warehouse load method.
- D. Pausing the capacity  
  _Rationale:_ Pausing capacity stops compute; it does not load data.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/fabric/data-warehouse/data-warehousing) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
