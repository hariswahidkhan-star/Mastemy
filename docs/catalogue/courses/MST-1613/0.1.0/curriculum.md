# dbt Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1613` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-DF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — dbt Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. dbt foundations
2. Models
3. Testing and documentation
4. Sources and seeds
5. Jinja and macros
6. Deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 dbt foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Initialize a dbt project; (2) Connect dbt to a warehouse profile
- Common misconception addressed: Thinking dbt extracts and loads data rather than transforms it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What dbt is and the ELT workflow | 80 | 6 |
| M01L02 | Project structure | 80 | 6 |
| M01L03 | Profiles and connections | 80 | 6 |

### M02 Models (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a staging model as a SELECT; (2) Switch a model to an incremental materialization
- Common misconception addressed: Hard-coding table names instead of using ref()
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing models as SQL SELECTs | 80 | 6 |
| M02L02 | Materializations | 80 | 6 |
| M02L03 | ref and source functions | 80 | 6 |

### M03 Testing and documentation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add not_null and unique tests; (2) Write a singular test as a SQL query
- Common misconception addressed: Shipping models with no tests on key columns
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Built-in generic tests | 80 | 6 |
| M03L02 | Custom and singular tests | 80 | 6 |
| M03L03 | Docs and descriptions | 80 | 6 |

### M04 Sources and seeds (MASTEMY-DESIGN 17%)

- Worked applications: (1) Declare a raw source and reference it; (2) Add a source freshness check
- Common misconception addressed: Loading large reference data as a seed instead of a source
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defining sources | 80 | 6 |
| M04L02 | Source freshness | 80 | 6 |
| M04L03 | Seeds and snapshots | 80 | 6 |

### M05 Jinja and macros (MASTEMY-DESIGN 16%)

- Worked applications: (1) Use a Jinja variable in a model; (2) Write a macro to reuse SQL logic
- Common misconception addressed: Over-engineering with Jinja where plain SQL is clearer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Jinja basics in models | 80 | 6 |
| M05L02 | Writing macros | 80 | 6 |
| M05L03 | Using packages | 80 | 6 |

### M06 Deployment (MASTEMY-DESIGN 16%)

- Worked applications: (1) Run and build a project; (2) Configure dev and prod targets
- Common misconception addressed: Running straight to production with no CI checks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | dbt run and dbt build | 80 | 6 |
| M06L02 | Environments and jobs | 80 | 6 |
| M06L03 | CI and best practices | 80 | 6 |

## Integrative case

Build a dbt project on a warehouse: define sources, write staging and mart models with ref(), add tests and documentation, and set up dev and prod environments with a scheduled build.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1613-final-protected | 30 | 30 | yes |
| MST-1613-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| dbt foundations | 5 |
| Models | 5 |
| Testing and documentation | 5 |
| Sources and seeds | 5 |
| Jinja and macros | 5 |
| Deployment | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1613-Q0001** (single-answer, Select ONE) Why should a dbt model reference another model with ref('model_name') instead of the raw table name?

- A. ref() builds the dependency graph and resolves the correct schema per environment **(key)**  
  _Rationale:_ Correct: ref() lets dbt order the DAG and point to the right object in each environment.
- B. ref() makes queries run without a warehouse  
  _Rationale:_ ref() still requires a warehouse to execute.
- C. ref() deletes the upstream model  
  _Rationale:_ ref() does not delete anything.
- D. ref() is only for documentation  
  _Rationale:_ ref() affects execution and lineage, not just docs.

**MST-1613-Q0002** (single-answer, Select ONE) What does dbt primarily do in the ELT workflow?

- A. Transforms data already loaded in the warehouse **(key)**  
  _Rationale:_ Correct: dbt is the T in ELT, transforming data that is already in the warehouse.
- B. Extracts data from source systems  
  _Rationale:_ Extraction is handled by ingestion tools, not dbt.
- C. Loads raw files into the warehouse  
  _Rationale:_ Loading raw data is done by EL tools, not dbt.
- D. Serves dashboards to end users  
  _Rationale:_ dbt does not serve dashboards; BI tools do.

**MST-1613-Q0003** (multiple-answer, Select TWO) Which TWO are generic tests dbt can apply to a column out of the box? (Select TWO)

- A. unique **(key)**  
  _Rationale:_ Correct: unique checks for duplicate values in a column.
- B. not_null **(key)**  
  _Rationale:_ Correct: not_null checks that a column has no null values.
- C. sort_descending  
  _Rationale:_ sort_descending is not a built-in dbt generic test.
- D. auto_cluster  
  _Rationale:_ auto_cluster is not a dbt generic test.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
