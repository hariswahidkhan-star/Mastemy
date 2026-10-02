# ETL and ELT Pipeline Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0963` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — ETL and ELT Pipeline Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose between ETL and ELT and between batch and streaming for a use case
2. Design reliable extraction and ingestion including incremental and change-data-capture patterns
3. Build transformations that are tested, auditable and resilient to bad data
4. Orchestrate, monitor and operate pipelines with idempotency and SLAs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Pipeline foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Decide ETL versus ELT for three source/target combinations; (2) Make a load step idempotent so re-runs do not duplicate rows
- Common misconception addressed: Assuming ELT is always better because the warehouse is powerful
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | ETL versus ELT and when each fits | 120 | 6 |
| M01L02 | Batch versus streaming | 120 | 6 |
| M01L03 | Sources, sinks and connectors | 120 | 6 |
| M01L04 | Idempotency and reprocessing | 120 | 6 |

### M02 Extraction and ingestion (25%, MASTEMY-DESIGN)

- Worked applications: (1) Design an incremental extract using a high-water mark; (2) Plan a safe backfill that does not corrupt current data
- Common misconception addressed: Relying on source timestamps that can go backwards or be null
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Full versus incremental extraction | 120 | 6 |
| M02L02 | Change data capture | 120 | 6 |
| M02L03 | Handling schema drift | 120 | 6 |
| M02L04 | Backfills and late data | 120 | 6 |

### M03 Transformation and quality (25%, MASTEMY-DESIGN)

- Worked applications: (1) Deduplicate records with a deterministic rule and keep an audit trail; (2) Route bad records to a dead-letter path instead of failing the batch
- Common misconception addressed: Silently dropping rows that fail validation
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cleaning, conforming and deduplication | 120 | 6 |
| M03L02 | Business rules and derived fields | 120 | 6 |
| M03L03 | Testing transformations | 120 | 6 |
| M03L04 | Error handling and dead-letter paths | 120 | 6 |

### M04 Orchestration and operations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Model pipeline steps as a DAG with correct dependencies and retries; (2) Define an SLA and the alert that fires when it is at risk
- Common misconception addressed: Adding retries without idempotency, causing duplicate side effects
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Dependencies, scheduling and DAGs | 120 | 6 |
| M04L02 | Retries, idempotency and checkpoints | 120 | 6 |
| M04L03 | Monitoring, SLAs and alerting | 120 | 6 |
| M04L04 | Cost, lineage and documentation | 120 | 6 |

## Integrative case

A nightly load occasionally double-counts orders and sometimes misses late-arriving ones. Redesign the pipeline to be incremental, idempotent and observable, and justify the extraction and orchestration choices to data consumers.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0963-final-protected | 144 | 144 | yes |
| MST-0963-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Pipeline foundations | 36 |
| Extraction and ingestion | 36 |
| Transformation and quality | 36 |
| Orchestration and operations | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0963-Q0001** (single-answer, Select ONE) A pipeline step is retried after a transient failure and sometimes inserts duplicate rows. Which property should the step have to make retries safe?

- A. Idempotency **(key)**  
  _Rationale:_ Correct: an idempotent step produces the same result whether run once or many times, so retries do not duplicate data.
- B. Higher parallelism  
  _Rationale:_ More parallelism does not prevent duplicate inserts on retry.
- C. A larger batch size  
  _Rationale:_ Batch size does not control duplication on re-run.
- D. Streaming instead of batch  
  _Rationale:_ Switching to streaming does not by itself make a step idempotent.

**MST-0963-Q0002** (single-answer, Select ONE) Which extraction approach pulls only rows changed since the last run using a tracked boundary value?

- A. Incremental extraction with a high-water mark **(key)**  
  _Rationale:_ Correct: a high-water mark records the last processed boundary so only newer rows are pulled.
- B. Full extraction every run  
  _Rationale:_ Full extraction reloads everything and does not use a boundary.
- C. Random sampling  
  _Rationale:_ Sampling pulls a subset, not specifically changed rows.
- D. Schema-on-read  
  _Rationale:_ Schema-on-read concerns interpretation at query time, not which rows are extracted.

**MST-0963-Q0003** (multiple-answer, Select TWO) Which TWO practices improve the reliability of a data pipeline? (Select TWO)

- A. Routing invalid records to a dead-letter path for review **(key)**  
  _Rationale:_ Correct: isolating bad records keeps the batch running and preserves them for investigation.
- B. Making load steps idempotent so re-runs are safe **(key)**  
  _Rationale:_ Correct: idempotent loads make retries and reprocessing safe.
- C. Silently dropping any row that fails validation  
  _Rationale:_ Silent drops hide data loss and make failures hard to detect.
- D. Disabling all retries to avoid duplicates  
  _Rationale:_ The fix for retry duplication is idempotency, not removing resilience.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
