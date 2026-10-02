# Microsoft DP-600: Fabric Analytics Engineer Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0171` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | DP-600 |
| Version basis | Skills measured as of 2026-10-19 (published ahead of effective date; route candidates by exam date) |
| Evidence | **verified-official-source** - sources: SRC-MS-DP600 |
| Legacy IDs | MST-MIC-MS-DP600-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 102 / module checks 168 / cumulative 210 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Split note: Split adjusted from default 5/7/8% to lesson 102 / module 168 / cumulative 210 min so the required cumulative forms fit; total assessment stays 480 min (20%).

## Learning outcomes

1. Implement workspace, item, row, column, object and file-level security and governance in Fabric
2. Maintain the analytics lifecycle with version control, .pbip projects, deployment pipelines and XMLA
3. Get, transform, query and analyse data with SQL, KQL, DAX and the visual query editor
4. Design semantic models with star schemas, composite models, calculation groups and Direct Lake
5. Optimise enterprise-scale semantic models including incremental refresh

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Maintain a data analytics solution (25-30%)

- Worked applications: (1) Apply column-level and row-level security to a claims warehouse; (2) Set up Git integration and a deployment pipeline for dev/test/prod
- Common misconception addressed: Assuming workspace roles alone control row access
- Module check: 56 items / 56 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Implement security and governance | 257 | 14 |
| M01L02 | Maintain the analytics development lifecycle | 258 | 14 |

### M02 Prepare data (45-50%)

- Worked applications: (1) Choose lakehouse vs warehouse vs eventhouse for three data sets; (2) Resolve duplicates and nulls and query with SQL and KQL
- Common misconception addressed: Believing KQL and SQL are interchangeable for every store
- Module check: 56 items / 56 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Get data | 296 | 14 |
| M02L02 | Transform data | 296 | 14 |
| M02L03 | Query and analyze data | 298 | 14 |

### M03 Implement and manage semantic models (25-30%)

- Worked applications: (1) Choose Direct Lake on OneLake vs on SQL endpoint and explain fallback; (2) Configure incremental refresh and test DAX performance
- Common misconception addressed: Assuming Direct Lake never falls back to DirectQuery
- Module check: 56 items / 56 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Design and build semantic models | 257 | 14 |
| M03L02 | Optimize enterprise-scale semantic models | 258 | 14 |

## Integrative case

An insurer consolidates claims and policy data in Fabric: ingest into a lakehouse and warehouse, model a star schema, serve a Direct Lake semantic model to Power BI, and promote changes through deployment pipelines with access controls.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0171-practice-form-A | 50 | 100 | yes |
| MST-0171-practice-form-B | 50 | 100 | no (optional practice) |
| MST-0171-practice-form-C | 50 | 100 | no (optional practice) |
| MST-0171-final-protected | 50 | 100 | yes |

| Domain | Items per form |
|---|---|
| Maintain a data analytics solution | 14 |
| Prepare data | 23 |
| Implement and manage semantic models | 13 |

Minimum reviewed item bank: 732 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0171-Q0001** (single-answer, Select ONE) A semantic model over a large lakehouse must avoid importing data while giving near-import performance. Which storage mode is designed for this in Fabric?

- A. Direct Lake **(key)**  
  _Rationale:_ Correct: Direct Lake reads Delta tables in OneLake without a full import; its fallback behaviour must be configured.
- B. Import with daily refresh  
  _Rationale:_ Import copies data into the model.
- C. Live connection to Excel  
  _Rationale:_ Not a Fabric lakehouse storage mode.
- D. Dual mode for every table  
  _Rationale:_ Dual is for composite models and does not avoid import.

**MST-0171-Q0002** (multiple-answer, Select TWO) Which TWO features support the analytics development lifecycle in Fabric? (Select TWO.)

- A. Version control for a workspace **(key)**  
  _Rationale:_ Correct: listed under maintaining the development lifecycle.
- B. Deployment pipelines **(key)**  
  _Rationale:_ Correct: listed under maintaining the development lifecycle.
- C. Sensitivity labels  
  _Rationale:_ Labels are under security and governance, not lifecycle.
- D. Row-level security  
  _Rationale:_ RLS is a security control.

**MST-0171-Q0003** (single-answer, Select ONE) Analysts query streaming telemetry stored in an Eventhouse. Which language is native to that store?

- A. KQL **(key)**  
  _Rationale:_ Correct: the outline lists KQL for querying, used with Eventhouse/KQL databases.
- B. DAX only  
  _Rationale:_ DAX queries semantic models.
- C. MDX  
  _Rationale:_ Not listed in the outline.
- D. Python only  
  _Rationale:_ Notebooks can use Python, but KQL is the native query language there.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
