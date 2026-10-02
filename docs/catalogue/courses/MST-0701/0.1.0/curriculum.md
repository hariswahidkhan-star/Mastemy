# Microsoft Fabric: End-to-End Analytics Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0701` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Fabric documentation read via the Microsoft Learn MCP on 2026-10-02 (Fabric as a SaaS analytics platform; OneLake as the single tenant-wide data lake on ADLS Gen2 storing data in Delta Parquet; lakehouse vs warehouse; workspaces and the item hierarchy; the integrated experiences Data Engineering, Data Factory, Data Science, Real-Time Intelligence, Data Warehouse; medallion architecture; SQL analytics endpoint). Fabric evolves rapidly; confirm feature availability against current docs before production. |
| Official sources | https://learn.microsoft.com/fabric/fundamentals/microsoft-fabric-overview; https://learn.microsoft.com/fabric/onelake/onelake-overview |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-FABRIC |
| Legacy IDs | MST-MIC-SK-MFF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 45 / module checks 64 / cumulative 131 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Fabric: End-to-End Analytics Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Microsoft Fabric as a unified SaaS analytics platform
2. Explain OneLake and how data is stored in Delta format
3. Distinguish lakehouse and warehouse and when to use each
4. Organise work with workspaces and the Fabric item hierarchy
5. Map an end-to-end analytics flow across Fabric experiences

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Fabric platform and OneLake (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Explain how OneLake serves every Fabric workload; (2) Describe why no Azure account is needed to use Fabric
- Common misconception addressed: Thinking each Fabric workload has its own separate storage rather than one shared OneLake
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What is Microsoft Fabric | 107 | 5 |
| M01L02 | OneLake: the unified data lake | 107 | 5 |

### M02 Lakehouse and warehouse (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Choose lakehouse vs warehouse for two teams; (2) Explain the shared SQL engine and Delta storage
- Common misconception addressed: Treating lakehouse and warehouse as interchangeable regardless of team and workload
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The lakehouse and Delta tables | 107 | 5 |
| M02L02 | The warehouse and T-SQL | 107 | 5 |
| M02L03 | Choosing between them | 107 | 5 |

### M03 Workspaces and the item hierarchy (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Lay out workspaces for two business units; (2) Place lakehouses and semantic models in the hierarchy
- Common misconception addressed: Confusing tenant, workspace and item levels of the Fabric hierarchy
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Tenants, workspaces and items | 107 | 5 |
| M03L02 | Organising analytics items | 106 | 5 |

### M04 End-to-end analytics flow (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Trace data from ingestion through medallion layers to Power BI; (2) Use the SQL analytics endpoint to query a lakehouse
- Common misconception addressed: Copying data between engines instead of using one copy in OneLake
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Ingestion, transform and medallion architecture | 106 | 5 |
| M04L02 | SQL analytics endpoint and reporting | 106 | 5 |

## Integrative case

A data lead designs an analytics solution in Fabric: land raw data in a lakehouse on OneLake, model a medallion architecture, choose lakehouse vs warehouse for different teams, query via the SQL analytics endpoint, and plan workspace governance before connecting Power BI.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0701-final-protected | 30 | 40 | yes |
| MST-0701-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fabric platform and OneLake | 8 |
| Lakehouse and warehouse | 8 |
| Workspaces and the item hierarchy | 7 |
| End-to-end analytics flow | 7 |

Minimum reviewed item bank: 278 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0701-Q0001** (single-answer, Select ONE) What is OneLake in Microsoft Fabric?

- A. A single, tenant-wide logical data lake that serves all Fabric workloads **(key)**  
  _Rationale:_ Correct: OneLake is the unified store built into every Fabric tenant.
- B. A separate storage account you must provision per workload  
  _Rationale:_ OneLake is built in and shared, not provisioned per workload.
- C. A Power BI report type  
  _Rationale:_ OneLake is storage, not a report type.
- D. An on-premises file server  
  _Rationale:_ OneLake is a cloud SaaS data lake on ADLS Gen2.

**MST-0701-Q0002** (multiple-answer, Select TWO) Which TWO statements about lakehouse and warehouse in Fabric are correct? (Select TWO.)

- A. Both store data in Delta format on OneLake and share the same SQL engine **(key)**  
  _Rationale:_ Correct: both use Delta on OneLake and a common SQL engine.
- B. A lakehouse suits Spark-based data engineering with structured and unstructured data **(key)**  
  _Rationale:_ Correct: the lakehouse is built for Spark and mixed data types.
- C. A warehouse requires copying data out of OneLake first  
  _Rationale:_ The warehouse stores data in OneLake in Delta format, no copy required.
- D. A lakehouse cannot be queried with T-SQL at all  
  _Rationale:_ A lakehouse exposes a SQL analytics endpoint for T-SQL queries.

**MST-0701-Q0003** (single-answer, Select ONE) In the Fabric hierarchy, which is correct from top to bottom?

- A. Tenant, then workspaces, then items such as lakehouses **(key)**  
  _Rationale:_ Correct: a tenant contains workspaces, which contain items.
- B. Item, then tenant, then workspace  
  _Rationale:_ That ordering is wrong; the tenant is at the top.
- C. Workspace, then tenant, then item  
  _Rationale:_ The tenant is above the workspace, not below.
- D. Lakehouse, then tenant, then workspace  
  _Rationale:_ A lakehouse is an item inside a workspace inside a tenant.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
