# Gemini API + BigQuery + Looker: Conversational Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0803` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Gemini API, BigQuery and Looker product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-BQ-LOOKER (https://cloud.google.com/bigquery/docs; https://cloud.google.com/looker/docs; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Gemini API + BigQuery + Looker: Conversational Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design a conversational analytics architecture over BigQuery
2. Model data and a semantic layer for trustworthy answers
3. Translate natural-language questions to validated SQL
4. Ground model output in query results and schema
5. Present results through Looker and controlled dashboards
6. Govern access, cost and accuracy of the system

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught via instructor-built projects and walkthroughs.

## Modules

### M01 Architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Sketch question-to-answer data flow; (2) Identify the trusted BigQuery datasets
- Common misconception addressed: Letting the model query data it should not see
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Conversational analytics building blocks | 80 | 5 |
| M01L02 | Data warehouse foundations | 80 | 5 |

### M02 Semantic modelling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define a revenue metric once in the semantic layer; (2) Document table meanings for grounding
- Common misconception addressed: Allowing each query to redefine the same metric differently
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Schema and a semantic layer | 80 | 5 |
| M02L02 | Metrics and definitions | 80 | 5 |

### M03 NL to SQL (MASTEMY-DESIGN 17%)

- Worked applications: (1) Generate SQL from a question and inspect it; (2) Run generated SQL read-only with a cost cap
- Common misconception addressed: Executing generated SQL without validation or limits
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prompting for SQL | 80 | 5 |
| M03L02 | Validating and sandboxing queries | 80 | 5 |

### M04 Grounding (MASTEMY-DESIGN 17%)

- Worked applications: (1) Summarise a query result with the figures cited; (2) Make the system say when data is unavailable
- Common misconception addressed: Narrating numbers that were not in the query result
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Grounding answers in results | 80 | 5 |
| M04L02 | Handling unanswerable questions | 80 | 5 |

### M05 Presentation with Looker (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a Looker dashboard for the metric; (2) Embed a filtered, access-controlled view
- Common misconception addressed: Exposing raw tables instead of governed explores
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Dashboards and explores | 80 | 5 |
| M05L02 | Embedding controlled views | 80 | 5 |

### M06 Governance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply row-level access to a dataset; (2) Monitor query cost and answer accuracy
- Common misconception addressed: Shipping without cost caps or accuracy checks
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Access and row-level security | 80 | 5 |
| M06L02 | Cost and accuracy monitoring | 80 | 5 |

## Integrative case

A business team wants to ask questions of warehouse data in plain language: model the BigQuery schema and a semantic layer, translate questions into validated SQL grounded in the schema, verify results, surface them through Looker, and enforce access, cost controls and accuracy checks before launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0803-final-protected | 40 | 50 | yes |
| MST-0803-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture | 7 |
| Semantic modelling | 7 |
| NL to SQL | 7 |
| Grounding | 7 |
| Presentation with Looker | 6 |
| Governance | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0803-Q0001** (single-answer, Select ONE) Before executing a model-generated SQL query against BigQuery, the safest practice is to:

- A. Validate it and run read-only with a cost/byte cap **(key)**  
  _Rationale:_ Correct: validation and read-only limits prevent damaging or runaway queries.
- B. Run it with full write access for flexibility  
  _Rationale:_ Write access lets a bad query modify data.
- C. Trust it because the model produced valid syntax  
  _Rationale:_ Valid syntax does not mean the query is safe or correct.
- D. Remove all quota limits to avoid interruptions  
  _Rationale:_ Removing limits risks a very expensive query.

**MST-0803-Q0002** (single-answer, Select ONE) Why define metrics in a semantic layer rather than in each generated query?

- A. To give one consistent, trusted definition for every answer **(key)**  
  _Rationale:_ Correct: a shared semantic layer keeps metrics consistent and trustworthy.
- B. To make queries run without BigQuery  
  _Rationale:_ Queries still execute on BigQuery.
- C. To avoid needing access controls  
  _Rationale:_ A semantic layer does not replace access control.
- D. To stop users from asking questions  
  _Rationale:_ The goal is to enable trustworthy questions, not block them.

**MST-0803-Q0003** (multiple-answer, Select TWO) Which TWO keep a conversational-analytics answer trustworthy? (Select TWO.)

- A. Ground the narrative in the actual query results **(key)**  
  _Rationale:_ Correct: grounding ties the words to real returned figures.
- B. State clearly when the data cannot answer the question **(key)**  
  _Rationale:_ Correct: honest refusal prevents fabricated answers.
- C. Fill gaps with plausible estimates  
  _Rationale:_ Estimating unseen figures misleads users.
- D. Hide the underlying SQL from reviewers  
  _Rationale:_ Hiding the SQL prevents verification.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
