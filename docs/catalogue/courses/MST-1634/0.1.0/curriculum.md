# Big Data Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1634` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-BDF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the characteristics and motivation of big data
2. Describe distributed storage and processing models
3. Distinguish batch and streaming processing
4. Compare data lakes, warehouses and lakehouse architectures
5. Recognise cost, governance and reliability trade-offs at scale

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What big data means (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether three scenarios truly need big-data tooling; (2) Explain which 'V' dominates a described workload
- Common misconception addressed: Calling any large spreadsheet a 'big data' problem
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Volume, velocity, variety and veracity | 96 | 8 |
| M01L02 | When scale changes the engineering approach | 96 | 8 |

### M02 Distributed storage and compute (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why partitioning enables parallel processing; (2) Trace how a job splits across nodes at a conceptual level
- Common misconception addressed: Assuming a distributed job is always faster than a single machine
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Distributed file systems and partitioning | 96 | 8 |
| M02L02 | MapReduce-style and modern distributed engines | 96 | 8 |

### M03 Batch vs streaming (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose batch or streaming for three described requirements; (2) Explain a windowing choice for a streaming aggregation
- Common misconception addressed: Using streaming for a workload that only needs daily batches
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Batch processing patterns | 96 | 8 |
| M03L02 | Streaming, windows and latency | 96 | 8 |

### M04 Storage architectures (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match three data types to lake vs warehouse storage; (2) Explain what a lakehouse adds over a raw data lake
- Common misconception addressed: Treating a data lake as a warehouse without schema or governance
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data lakes vs warehouses | 96 | 8 |
| M04L02 | Lakehouse and open table formats | 96 | 8 |

### M05 Trade-offs at scale (MASTEMY-DESIGN 20%)

- Worked applications: (1) Weigh storage vs compute cost for a described workload; (2) Explain a consistency-vs-availability trade-off in plain terms
- Common misconception addressed: Ignoring cost because 'storage is cheap' while compute scans everything
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cost, performance and the CAP idea (conceptual) | 96 | 8 |
| M05L02 | Governance, reliability and data quality at scale | 96 | 8 |

## Integrative case

An architect must recommend a platform for a company whose event data is growing fast. Judge whether the workload genuinely needs distributed tooling, choose batch or streaming per use case, decide between a warehouse and a lakehouse, and weigh the cost, governance and reliability trade-offs before recommending an approach.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1634-final-protected | 25 | 25 | yes |
| MST-1634-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What big data means | 5 |
| Distributed storage and compute | 5 |
| Batch vs streaming | 5 |
| Storage architectures | 5 |
| Trade-offs at scale | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1634-Q0001** (single-answer, Select ONE) Why does partitioning data enable a distributed engine to run faster?

- A. Partitions can be processed in parallel across many nodes **(key)**  
  _Rationale:_ Correct: independent partitions allow parallel computation.
- B. Partitioning compresses the data to zero  
  _Rationale:_ Partitioning splits data; it does not eliminate it.
- C. It removes the need for any computation  
  _Rationale:_ Computation still happens, just in parallel.
- D. It guarantees perfect data quality  
  _Rationale:_ Partitioning is unrelated to data quality.

**MST-1634-Q0002** (multiple-answer, Select TWO) Which TWO are true about a lakehouse compared with a raw data lake? (Select TWO.)

- A. It adds schema, transactions and governance on top of lake storage **(key)**  
  _Rationale:_ Correct: open table formats bring warehouse-like features to the lake.
- B. It can support both BI queries and large-scale processing **(key)**  
  _Rationale:_ Correct: a lakehouse aims to serve both workloads.
- C. It removes the ability to store raw files  
  _Rationale:_ A lakehouse still stores files; it adds structure over them.
- D. It requires abandoning all open formats  
  _Rationale:_ Lakehouses are built on open table formats.

**MST-1634-Q0003** (single-answer, Select ONE) A requirement needs results within seconds of each event arriving. Which approach fits?

- A. Stream processing **(key)**  
  _Rationale:_ Correct: low-latency per-event results call for streaming.
- B. A nightly batch job  
  _Rationale:_ Nightly batch cannot deliver second-level latency.
- C. A one-off manual export  
  _Rationale:_ Manual exports are not continuous or timely.
- D. A spreadsheet refresh  
  _Rationale:_ That cannot meet a seconds-latency requirement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
