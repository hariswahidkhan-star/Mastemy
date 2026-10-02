# dbt: Analytics Engineering and Tested Transformations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0960` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — dbt: Analytics Engineering and Tested Transformations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. dbt and the analytics engineering workflow
2. Models, materializations and the DAG
3. ref, sources and project structure
4. Testing data quality
5. Documentation and lineage
6. Incremental models, snapshots and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 dbt and the analytics engineering workflow (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how dbt compiles and runs models in the warehouse; (2) Set up a project connected to a warehouse
- Common misconception addressed: Thinking dbt extracts and loads data rather than transforming in-warehouse
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What dbt does: SQL transformations as version-controlled models | 80 | 6 |
| M01L02 | Projects, profiles and the warehouse connection | 80 | 6 |

### M02 Models, materializations and the DAG (MASTEMY-DESIGN 17%)

- Worked applications: (1) Materialize a frequently queried model as a table; (2) Explain how dbt orders model builds from the DAG
- Common misconception addressed: Materializing everything as a table regardless of usage
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Views, tables and the model DAG | 80 | 6 |
| M02L02 | Choosing a materialization for a model | 80 | 6 |

### M03 ref, sources and project structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Reference an upstream model with ref() to build the DAG; (2) Declare a raw source and build a staging model on it
- Common misconception addressed: Hard-coding table names instead of using ref() and source()
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The ref() function and model dependencies | 80 | 6 |
| M03L02 | Declaring sources and staging-layer conventions | 80 | 6 |

### M04 Testing data quality (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add unique and not_null tests to a primary key; (2) Write a singular test asserting a business rule
- Common misconception addressed: Assuming a model that runs successfully is also correct
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Built-in generic tests: unique, not_null, relationships | 80 | 6 |
| M04L02 | Custom and singular tests | 80 | 6 |

### M05 Documentation and lineage (MASTEMY-DESIGN 17%)

- Worked applications: (1) Document a model and its columns in a schema.yml; (2) Trace a column's lineage through the DAG
- Common misconception addressed: Treating documentation as optional rather than part of the model contract
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Describing models and columns in YAML | 80 | 6 |
| M05L02 | Generating docs and reading the lineage graph | 80 | 6 |

### M06 Incremental models, snapshots and deployment (MASTEMY-DESIGN 18%)

- Worked applications: (1) Convert a full-refresh model to incremental; (2) Capture slowly changing history with a snapshot
- Common misconception addressed: Forgetting a unique_key on an incremental model and duplicating rows
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Incremental models and the is_incremental pattern | 80 | 6 |
| M06L02 | Snapshots and scheduling dbt runs | 80 | 6 |

## Integrative case

Build a dbt project for a subscription business: declare raw sources, build staging and mart models wired together with ref(), add unique/not_null and a custom revenue test, document the marts with lineage, and convert the largest fact model to an incremental build with a unique key.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0960-final-protected | 30 | 30 | yes |
| MST-0960-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| dbt and the analytics engineering workflow | 5 |
| Models, materializations and the DAG | 5 |
| ref, sources and project structure | 5 |
| Testing data quality | 5 |
| Documentation and lineage | 5 |
| Incremental models, snapshots and deployment | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0960-Q0001** (single-answer, Select ONE) Why should a dbt model reference upstream models with `ref()` instead of a hard-coded table name?

- A. ref() builds the dependency DAG and resolves the correct schema per environment **(key)**  
  _Rationale:_ Correct: ref() lets dbt order builds and target the right environment schema.
- B. ref() runs faster SQL at query time  
  _Rationale:_ ref() is about dependency resolution, not query speed.
- C. ref() loads raw data into the warehouse  
  _Rationale:_ dbt transforms in-warehouse; ref() does not load data.
- D. ref() encrypts the table name  
  _Rationale:_ ref() does not encrypt anything.

**MST-0960-Q0002** (multiple-answer, Select ALL that apply) Which are built-in generic dbt tests? (Select TWO)

- A. not_null **(key)**  
  _Rationale:_ Correct: not_null is a built-in generic test.
- B. unique **(key)**  
  _Rationale:_ Correct: unique is a built-in generic test.
- C. faster_than  
  _Rationale:_ There is no faster_than generic test in dbt.
- D. auto_fix  
  _Rationale:_ dbt does not provide an auto_fix test.

**MST-0960-Q0003** (single-answer, Select ONE) What is the risk of an incremental dbt model without a correct `unique_key`?

- A. New runs can insert duplicate rows instead of updating existing ones **(key)**  
  _Rationale:_ Correct: without a unique_key dbt cannot match and update rows, causing duplicates.
- B. The model will refuse to compile  
  _Rationale:_ It compiles; the problem is runtime duplication.
- C. The warehouse connection will fail  
  _Rationale:_ Connection is unrelated to unique_key.
- D. Documentation will not generate  
  _Rationale:_ Docs generation is independent of unique_key.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
