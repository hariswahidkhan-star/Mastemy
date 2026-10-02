# Data Warehousing and Dimensional Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0961` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Data Warehousing and Dimensional Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish analytical warehousing workloads from transactional ones and choose a layered architecture
2. Design star-schema dimensional models with a declared, consistent grain
3. Apply surrogate keys and slowly-changing-dimension techniques to preserve history
4. Plan loading, partitioning and performance strategies for a warehouse

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Warehouse foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Classify five queries as OLTP or OLAP and route them appropriately; (2) Sketch staging-to-presentation layers for a sales domain
- Common misconception addressed: Modelling a warehouse the same way as a normalised transactional database
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | OLTP versus OLAP workloads | 120 | 6 |
| M01L02 | Warehouse, mart and lakehouse concepts | 120 | 6 |
| M01L03 | Inmon versus Kimball approaches | 120 | 6 |
| M01L04 | Layers: staging, integration, presentation | 120 | 6 |

### M02 Dimensional modeling (25%, MASTEMY-DESIGN)

- Worked applications: (1) Declare the grain of a fact table and test rows against it; (2) Build a bus matrix linking business processes to conformed dimensions
- Common misconception addressed: Mixing multiple grains in a single fact table
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Facts and dimensions | 120 | 6 |
| M02L02 | Star versus snowflake schemas | 120 | 6 |
| M02L03 | Grain, additivity and measures | 120 | 6 |
| M02L04 | Conformed dimensions and the bus matrix | 120 | 6 |

### M03 Slowly changing dimensions and keys (25%, MASTEMY-DESIGN)

- Worked applications: (1) Apply a Type 2 SCD change and preserve history correctly; (2) Design a junk dimension for a cluster of low-cardinality flags
- Common misconception addressed: Overwriting dimension attributes (Type 1) when history must be preserved
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Surrogate keys and natural keys | 120 | 6 |
| M03L02 | SCD types 1, 2 and 3 | 120 | 6 |
| M03L03 | Degenerate and junk dimensions | 120 | 6 |
| M03L04 | Late-arriving data and dimensions | 120 | 6 |

### M04 Loading, performance and governance (25%, MASTEMY-DESIGN)

- Worked applications: (1) Choose a partition and clustering strategy for a large fact table; (2) Decide when a pre-aggregated table earns its maintenance cost
- Common misconception addressed: Adding indexes everywhere and assuming they always speed up analytical scans
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ETL/ELT into the warehouse | 120 | 6 |
| M04L02 | Partitioning, clustering and indexing | 120 | 6 |
| M04L03 | Aggregates and materialised views | 120 | 6 |
| M04L04 | Testing, documentation and data contracts | 120 | 6 |

## Integrative case

A retailer wants consistent sales reporting across channels. Design a dimensional model with conformed dimensions and the right SCD handling, specify the load and partitioning plan, and defend the grain and key choices to analysts.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0961-final-protected | 144 | 144 | yes |
| MST-0961-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Warehouse foundations | 36 |
| Dimensional modeling | 36 |
| Slowly changing dimensions and keys | 36 |
| Loading, performance and governance | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0961-Q0001** (single-answer, Select ONE) A dimension must preserve the full history of attribute changes so past facts link to the attribute values that were current at the time. Which technique fits?

- A. Type 2 slowly changing dimension **(key)**  
  _Rationale:_ Correct: a Type 2 SCD adds a new row per change with effective dates, preserving history.
- B. Type 1 slowly changing dimension  
  _Rationale:_ Type 1 overwrites the attribute, destroying history.
- C. A degenerate dimension  
  _Rationale:_ A degenerate dimension stores a transaction identifier in the fact; it does not track attribute history.
- D. A snowflaked lookup table  
  _Rationale:_ Snowflaking normalises a dimension but does not by itself track change history.

**MST-0961-Q0002** (single-answer, Select ONE) Why should a single fact table declare and keep one consistent grain?

- A. Mixing grains makes measures non-additive and aggregations incorrect **(key)**  
  _Rationale:_ Correct: rows at different grains double-count or misaggregate when summed together.
- B. It reduces the number of dimension tables required  
  _Rationale:_ Grain consistency is unrelated to how many dimensions exist.
- C. It forces the use of natural keys  
  _Rationale:_ Grain does not dictate key type.
- D. It eliminates the need for a staging layer  
  _Rationale:_ Staging is a separate architectural concern from grain.

**MST-0961-Q0003** (multiple-answer, Select TWO) Which TWO are characteristics of a well-designed star schema? (Select TWO)

- A. A central fact table referencing denormalised dimension tables **(key)**  
  _Rationale:_ Correct: the star keeps dimensions denormalised around a central fact table.
- B. Conformed dimensions reused across multiple fact tables **(key)**  
  _Rationale:_ Correct: conformed dimensions give consistent meaning across business processes.
- C. Fully normalised dimensions to third normal form  
  _Rationale:_ Full normalisation describes a snowflake, not a star.
- D. Storing measures in dimension tables  
  _Rationale:_ Measures belong in fact tables, not dimensions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
