# Delta Lake and Apache Iceberg

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1615` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-DLAI-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Delta Lake and Apache Iceberg (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Open table formats
2. Delta Lake essentials
3. Iceberg essentials
4. Table maintenance
5. Reads and writes
6. Choosing and operating

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Open table formats (MASTEMY-DESIGN 17%)

- Worked applications: (1) Explain what a table format adds over raw Parquet; (2) Contrast a lake with a lakehouse
- Common misconception addressed: Thinking a folder of Parquet files is a managed table
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why open table formats exist | 80 | 6 |
| M01L02 | Data lake versus lakehouse | 80 | 6 |
| M01L03 | Metadata and manifest files | 80 | 6 |

### M02 Delta Lake essentials (MASTEMY-DESIGN 17%)

- Worked applications: (1) Query an earlier version with time travel; (2) Evolve a schema safely
- Common misconception addressed: Assuming concurrent writers are safe without a transaction log
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The Delta transaction log | 80 | 6 |
| M02L02 | ACID and time travel | 80 | 6 |
| M02L03 | Schema enforcement and evolution | 80 | 6 |

### M03 Iceberg essentials (MASTEMY-DESIGN 17%)

- Worked applications: (1) Inspect Iceberg snapshots; (2) Use hidden partitioning on a timestamp
- Common misconception addressed: Rewriting all data just to change a partition scheme
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The Iceberg table spec | 80 | 6 |
| M03L02 | Snapshots and hidden partitioning | 80 | 6 |
| M03L03 | Schema and partition evolution | 80 | 6 |

### M04 Table maintenance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compact small files into larger ones; (2) Expire old snapshots to reclaim storage
- Common misconception addressed: Never cleaning up old files and bloating storage
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Compaction and file sizing | 80 | 6 |
| M04L02 | Vacuum and snapshot expiration | 80 | 6 |
| M04L03 | Clustering and Z-ordering | 80 | 6 |

### M05 Reads and writes (MASTEMY-DESIGN 16%)

- Worked applications: (1) Upsert records with MERGE; (2) Stream appends into a table
- Common misconception addressed: Expecting serializable isolation without the format's guarantees
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | MERGE, UPDATE and DELETE | 80 | 6 |
| M05L02 | Streaming reads and writes | 80 | 6 |
| M05L03 | Concurrency and isolation | 80 | 6 |

### M06 Choosing and operating (MASTEMY-DESIGN 16%)

- Worked applications: (1) Compare Delta and Iceberg for a use case; (2) Register a table in a catalog
- Common misconception addressed: Locking into one engine when interoperability matters
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Delta versus Iceberg trade-offs | 80 | 6 |
| M06L02 | Catalog integration | 80 | 6 |
| M06L03 | Governance and interoperability | 80 | 6 |

## Integrative case

Choose and operate an open table format for a lakehouse: compare Delta Lake and Iceberg, apply ACID writes and time travel, run maintenance like compaction and snapshot expiration, and integrate with a catalog.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1615-final-protected | 30 | 30 | yes |
| MST-1615-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Open table formats | 5 |
| Delta Lake essentials | 5 |
| Iceberg essentials | 5 |
| Table maintenance | 5 |
| Reads and writes | 5 |
| Choosing and operating | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1615-Q0001** (single-answer, Select ONE) What does the Delta transaction log primarily provide over a plain folder of Parquet files?

- A. ACID guarantees, versioning and time travel **(key)**  
  _Rationale:_ Correct: the transaction log gives atomic commits, versioning and time travel.
- B. Faster single-row key lookups like a cache  
  _Rationale:_ It is not a key-value cache for single-row lookups.
- C. Automatic chart generation  
  _Rationale:_ It does not generate charts.
- D. Removal of the need for any storage  
  _Rationale:_ Data still must be stored; the log tracks it.

**MST-1615-Q0002** (single-answer, Select ONE) Apache Iceberg's hidden partitioning lets you do what?

- A. Query by a column without manually managing partition path values **(key)**  
  _Rationale:_ Correct: Iceberg tracks partition values in metadata so queries need not reference partition columns explicitly.
- B. Store data without any files  
  _Rationale:_ Iceberg still stores data in files.
- C. Disable ACID transactions  
  _Rationale:_ Hidden partitioning does not disable ACID.
- D. Avoid defining a schema  
  _Rationale:_ A schema is still defined.

**MST-1615-Q0003** (multiple-answer, Select TWO) Which TWO are routine maintenance tasks for open table formats? (Select TWO)

- A. Compacting many small files into fewer larger ones **(key)**  
  _Rationale:_ Correct: compaction improves read performance by reducing small files.
- B. Expiring old snapshots to reclaim storage **(key)**  
  _Rationale:_ Correct: expiring stale snapshots frees storage safely.
- C. Deleting the transaction log to save space  
  _Rationale:_ Deleting the transaction log would corrupt the table's history.
- D. Disabling schema enforcement permanently  
  _Rationale:_ Disabling schema enforcement removes protection against bad data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
