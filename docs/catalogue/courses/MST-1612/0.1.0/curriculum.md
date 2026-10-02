# Data Modelling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1612` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Translate business requirements into data models
2. Apply conceptual, logical and physical modelling
3. Normalise relational schemas appropriately
4. Model dimensional schemas for analytics
5. Choose modelling approaches for different workloads
6. Document models and manage change over time

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Modelling foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draw an ER diagram from requirements; (2) Translate a conceptual model to logical
- Common misconception addressed: Jumping to tables before modelling relationships
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Entities, attributes and relationships | 168 | 8 |
| M01L02 | Conceptual, logical and physical layers | 168 | 8 |

### M02 Normalisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Normalise a table to 3NF; (2) Identify an update anomaly
- Common misconception addressed: Stopping normalisation too early and keeping redundancy
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | First through third normal form | 168 | 8 |
| M02L02 | Keys, dependencies and anomalies | 168 | 8 |

### M03 Dimensional modelling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a star schema for sales; (2) Model a slowly changing dimension
- Common misconception addressed: Mixing transactional and analytical modelling goals
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Facts and dimensions | 168 | 8 |
| M03L02 | Star vs snowflake and slowly changing dimensions | 168 | 8 |

### M04 Modelling for different workloads (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a model for a read-heavy analytics workload; (2) Model a many-to-many relationship in a document store
- Common misconception addressed: Forcing a relational model onto every problem
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | OLTP vs OLAP modelling | 168 | 8 |
| M04L02 | Document, key-value and graph modelling | 168 | 8 |

### M05 Documentation and evolution (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a data-dictionary entry; (2) Plan a backward-compatible schema change
- Common misconception addressed: Changing a schema without a migration plan
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data dictionaries and naming standards | 168 | 8 |
| M05L02 | Schema versioning and migration | 168 | 8 |

## Integrative case

For a subscription business, produce a normalised operational model and a star-schema analytical model, and justify where denormalisation is warranted for reporting.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1612-final-protected | 25 | 25 | yes |
| MST-1612-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Modelling foundations | 5 |
| Normalisation | 5 |
| Dimensional modelling | 5 |
| Modelling for different workloads | 5 |
| Documentation and evolution | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1612-Q0001** (single-answer, Select ONE) What problem does normalisation to 3NF primarily reduce?

- A. Data redundancy and update anomalies **(key)**  
  _Rationale:_ Correct: 3NF reduces redundancy and the anomalies it causes.
- B. Query latency in all cases  
  _Rationale:_ Normalisation can increase joins and latency.
- C. The need for primary keys  
  _Rationale:_ Keys are still required.
- D. Disk cost of indexes  
  _Rationale:_ Index cost is unrelated to normal form.

**MST-1612-Q0002** (multiple-answer, Select TWO) Which TWO describe a star schema? (Select TWO.)

- A. A central fact table referencing dimension tables **(key)**  
  _Rationale:_ Correct: that is the star shape.
- B. Denormalised dimensions for simpler, faster reporting queries **(key)**  
  _Rationale:_ Correct: star schemas denormalise dimensions.
- C. Full third-normal-form across all tables  
  _Rationale:_ Star schemas intentionally denormalise.
- D. No measurable metrics stored at all  
  _Rationale:_ Facts store the measures.

**MST-1612-Q0003** (single-answer, Select ONE) Why version a schema and plan migrations?

- A. To change structure without breaking existing consumers **(key)**  
  _Rationale:_ Correct: versioning and migrations preserve compatibility.
- B. To avoid ever changing the schema  
  _Rationale:_ The goal is safe change, not no change.
- C. To remove the need for a data dictionary  
  _Rationale:_ Documentation is still needed.
- D. Because schemas cannot change once created  
  _Rationale:_ Schemas do evolve; that is the point.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
