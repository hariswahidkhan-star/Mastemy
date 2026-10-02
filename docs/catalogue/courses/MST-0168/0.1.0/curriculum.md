# Microsoft DP-900: Azure Data Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0168` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | DP-900 |
| Version basis | Skills measured as of 2026-07-21 |
| Evidence | **verified-official-source** - sources: SRC-MS-DP900 |
| Legacy IDs | MST-MIC-MS-DP900-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe structured, semi-structured and unstructured data and common data workloads
2. Explain relational concepts and the Azure SQL family
3. Describe Azure non-relational storage and Azure Cosmos DB
4. Describe large-scale and real-time analytics and Power BI visualisation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Describe core data concepts (25-30%)

- Worked applications: (1) Classify datasets as structured, semi-structured or unstructured and choose formats; (2) Distinguish OLTP and analytical workloads for an order system
- Common misconception addressed: Treating JSON as unstructured data
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe ways to represent data | 87 | 6 |
| M01L02 | Identify options for data storage | 87 | 6 |
| M01L03 | Describe common data workloads | 87 | 6 |
| M01L04 | Identify roles and responsibilities for data workloads | 87 | 6 |

### M02 Identify considerations for relational data on Azure (20-25%)

- Worked applications: (1) Normalise an order spreadsheet into related tables and write the key SQL; (2) Choose Azure SQL Database vs Managed Instance vs SQL on VM
- Common misconception addressed: Believing normalisation always improves read performance
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describe relational concepts | 142 | 6 |
| M02L02 | Describe relational Azure data services | 142 | 6 |

### M03 Describe considerations for working with non-relational data on Azure (15-20%)

- Worked applications: (1) Pick Blob, Files, Table or Cosmos DB for four storage needs; (2) Select a Cosmos DB API for an existing MongoDB app
- Common misconception addressed: Assuming NoSQL means no schema design is needed
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Describe the capabilities of Azure storage | 110 | 6 |
| M03L02 | Describe the capabilities and features of Azure Cosmos DB | 111 | 6 |

### M04 Describe an analytics workload (25-30%)

- Worked applications: (1) Design a batch pipeline into a lakehouse for daily reporting; (2) Explain a real-time telemetry flow and a Power BI report
- Common misconception addressed: Confusing a data lake with a data warehouse
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Describe common elements of large-scale analytics | 115 | 6 |
| M04L02 | Describe considerations for real-time data analytics | 115 | 6 |
| M04L03 | Describe data visualization in Microsoft Power BI | 117 | 6 |

## Integrative case

A delivery company wants operational orders in a relational store, telemetry in a NoSQL store and a weekly Power BI dashboard: choose services and explain batch vs streaming flows.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0168-practice-form-A | 45 | 45 | yes |
| MST-0168-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0168-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0168-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Describe core data concepts | 13 |
| Identify considerations for relational data on Azure | 11 |
| Describe considerations for working with non-relational data on Azure | 8 |
| Describe an analytics workload | 13 |

Minimum reviewed item bank: 520 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0168-Q0001** (single-answer, Select ONE) A JSON document with nested, optional fields is an example of which kind of data?

- A. Structured  
  _Rationale:_ Structured data follows a fixed tabular schema.
- B. Semi-structured **(key)**  
  _Rationale:_ Correct: JSON carries its own flexible structure through keys and nesting.
- C. Unstructured  
  _Rationale:_ Unstructured data, such as images or free text, has no organising tags.
- D. Normalised  
  _Rationale:_ Normalisation is a relational design process, not a type of data.

**MST-0168-Q0002** (single-answer, Select ONE) Why do we normalise a relational database?

- A. To reduce data duplication and update anomalies **(key)**  
  _Rationale:_ Correct: normalisation splits data into related tables so each fact is stored once.
- B. To make all queries faster  
  _Rationale:_ Normalisation can slow reads by adding joins.
- C. To store images efficiently  
  _Rationale:_ Normalisation has nothing to do with binary storage.
- D. To allow schema-less writes  
  _Rationale:_ Schema-less writes are a feature of NoSQL stores.

**MST-0168-Q0003** (single-answer, Select ONE) Which service is a globally distributed, multi-model NoSQL database with several APIs?

- A. Azure SQL Managed Instance  
  _Rationale:_ This is a relational SQL Server-compatible service.
- B. Azure Table storage  
  _Rationale:_ Table storage is a simple key/attribute store without the multiple APIs.
- C. Azure Cosmos DB **(key)**  
  _Rationale:_ Correct: Cosmos DB offers several APIs and global distribution.
- D. Azure Files  
  _Rationale:_ Azure Files provides SMB/NFS file shares.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
