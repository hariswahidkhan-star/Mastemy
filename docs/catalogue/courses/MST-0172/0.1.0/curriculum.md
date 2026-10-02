# Microsoft DP-700: Fabric Data Engineer Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0172` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | DP-700 |
| Version basis | Skills measured as of October 19, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-DP700 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/dp-700) |
| Legacy IDs | MST-MIC-MS-DP700-001 |
| Planned time | T = 1375 min; instruction I = 1100 min (80%); assessment A = 275 min (20%) |
| Assessment split | lesson checks 50 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Implement and manage an analytics solution' to the depth the official outline requires
2. Apply the objectives of 'Ingest and transform data' to the depth the official outline requires
3. Apply the objectives of 'Monitor and optimize an analytics solution' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Implement and manage an analytics solution (30–35%)

- Worked applications: (1) Configure OneLake and Spark workspace settings with deployment pipelines; (2) Apply row-level and object-level security with sensitivity labels
- Common misconception addressed: Confusing workspace roles with item-level access controls
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Configure Microsoft Fabric workspace settings | 110 | 6 |
| M01L02 | Implement lifecycle management in Fabric | 110 | 6 |
| M01L03 | Configure security and governance | 110 | 6 |
| M01L04 | Orchestrate processes | 110 | 6 |

### M02 Ingest and transform data (30–35%)

- Worked applications: (1) Design full vs incremental loads into a dimensional model; (2) Process a stream with Eventstream and KQL windowing
- Common misconception addressed: Choosing a Dataflow Gen2 where a notebook or KQL is the right tool
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design and implement loading patterns | 110 | 6 |
| M02L02 | Ingest and transform batch data | 110 | 6 |
| M02L03 | Ingest and transform streaming data | 110 | 6 |

### M03 Monitor and optimize an analytics solution (30–35%)

- Worked applications: (1) Diagnose a failed pipeline run from monitoring; (2) Optimize a Lakehouse table and Spark job
- Common misconception addressed: Assuming a semantic model refresh failure is always a capacity problem
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Monitor Fabric items | 110 | 6 |
| M03L02 | Identify and resolve errors | 110 | 6 |
| M03L03 | Optimize performance | 110 | 6 |

## Integrative case

A data team stands up analytics on Microsoft Fabric. Design the solution: workspace and OneLake settings, CI/CD with deployment pipelines, governance and security, batch plus streaming ingestion into a lakehouse/warehouse, and a monitoring/optimization plan; justify engine choices (Dataflow vs notebook vs KQL) to the analytics lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0172-practice-form-A | 45 | 45 | yes |
| MST-0172-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0172-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0172-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Implement and manage an analytics solution | 15 |
| Ingest and transform data | 15 |
| Monitor and optimize an analytics solution | 15 |

Minimum reviewed item bank: 510 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0172-Q0001** (single-answer, Select ONE) A fact table receives millions of new rows daily and reprocessing everything is too slow. Which loading pattern should you implement?

- A. Incremental load of only changed/new data **(key)**  
  _Rationale:_ Correct: incremental loading processes just the delta, avoiding full reloads.
- B. Full load on every run  
  _Rationale:_ Full loads reprocess all data and do not scale to daily millions of rows.
- C. Disabling the pipeline schedule  
  _Rationale:_ Not loading data does not solve the ingestion requirement.
- D. Converting the table to a view only  
  _Rationale:_ A view does not address bulk ingestion performance.

**MST-0172-Q0002** (single-answer, Select ONE) Which Fabric capability lets you reference data in another storage location without copying it into OneLake?

- A. A OneLake shortcut **(key)**  
  _Rationale:_ Correct: shortcuts reference external or internal data in place without duplication.
- B. A deployment pipeline  
  _Rationale:_ Deployment pipelines move content between workspaces, not data references.
- C. A sensitivity label  
  _Rationale:_ Sensitivity labels classify items; they do not reference data.
- D. A warehouse stored procedure  
  _Rationale:_ Stored procedures run logic; they do not create in-place references.

**MST-0172-Q0003** (multiple-answer, Select TWO) Which TWO engines are appropriate choices for transforming batch data in Microsoft Fabric? (Select TWO.)

- A. Dataflows Gen2 **(key)**  
  _Rationale:_ Correct: Dataflows Gen2 is a supported batch transformation engine.
- B. Spark notebooks (PySpark/SQL) **(key)**  
  _Rationale:_ Correct: notebooks transform batch data with PySpark or SQL.
- C. Azure Bastion  
  _Rationale:_ Bastion is a secure remote-access service, unrelated to data transformation.
- D. A network security group  
  _Rationale:_ An NSG filters network traffic, not data.
- E. Azure Traffic Manager  
  _Rationale:_ Traffic Manager is DNS-based load balancing, not a data engine.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
