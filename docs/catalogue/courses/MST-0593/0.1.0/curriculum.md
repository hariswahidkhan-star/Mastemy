# Vector Database Selection and Index Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0593` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Vector Database Selection and Index Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Select a vector store against requirements and trade-offs
2. Engineer indexes and tune recall against latency
3. Use metadata filtering effectively
4. Operate a vector index: upserts, reindexing and monitoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Choosing a vector store (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Translate requirements (scale, latency, filtering) into store criteria; (2) Compare a managed service and a self-hosted store for a scenario
- Common misconception addressed: Choosing a vector store by popularity rather than requirements
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Requirements and trade-offs | 80 | 5 |
| M01L02 | Managed vs self-hosted | 80 | 5 |
| M01L03 | Capacity and scaling | 80 | 5 |

### M02 Index engineering (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Tune HNSW parameters to trade recall against query latency; (2) Add metadata filters so searches are scoped correctly
- Common misconception addressed: Assuming approximate nearest-neighbour search always returns the exact top results
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Index types (HNSW, IVF) | 80 | 5 |
| M02L02 | Tuning recall vs latency | 80 | 5 |
| M02L03 | Filtering and metadata | 80 | 5 |

### M03 Operations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Plan upserts and deletes so the index stays consistent; (2) Set up monitoring and backups for a production index
- Common misconception addressed: Forgetting that deletes and updates need reindexing to take effect
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Upserts, deletes and reindexing | 80 | 5 |
| M03L02 | Monitoring and backups | 80 | 5 |
| M03L03 | Cost and performance tuning | 80 | 5 |

## Integrative case

A team must choose and operate a vector store for a growing corpus. Gather requirements, compare managed and self-hosted options, engineer and tune an index for recall and latency, and plan upserts, reindexing, monitoring and cost.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0593-final-protected | 30 | 30 | yes |
| MST-0593-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Choosing a vector store | 10 |
| Index engineering | 10 |
| Operations | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0593-Q0001** (single-answer, Select ONE) You need to pick a vector store. What should drive the choice?

- A. Documented requirements: scale, latency, filtering, operations and cost **(key)**  
  _Rationale:_ Correct: requirements-driven selection fits the store to the workload.
- B. Whichever store is most talked about online  
  _Rationale:_ Popularity is not a requirement.
- C. The one with the most features regardless of need  
  _Rationale:_ Unneeded features add cost and complexity.
- D. Whatever the AI tool suggests first  
  _Rationale:_ An unexamined suggestion is not a basis for selection.

**MST-0593-Q0002** (multiple-answer, Select TWO) Which TWO statements about approximate nearest-neighbour (ANN) indexes are correct? (Select TWO.) (Select TWO.)

- A. ANN trades some recall for much lower latency and can be tuned **(key)**  
  _Rationale:_ Correct: ANN parameters control the recall/latency trade-off.
- B. Metadata filters can scope ANN searches to a subset **(key)**  
  _Rationale:_ Correct: filtering restricts results to matching metadata.
- C. ANN always returns the exact true nearest neighbours  
  _Rationale:_ ANN is approximate by design.
- D. Tuning ANN parameters has no effect on recall  
  _Rationale:_ Parameters directly affect recall and latency.

**MST-0593-Q0003** (single-answer, Select ONE) After deleting many documents, stale results still appear. What is the likely cause?

- A. The index needs reindexing or compaction for deletes to fully take effect **(key)**  
  _Rationale:_ Correct: deletes often require reindexing/compaction to be reflected.
- B. Vector stores cannot delete data  
  _Rationale:_ Vector stores support deletes.
- C. The embedding model changed on its own  
  _Rationale:_ Models do not change by themselves.
- D. Deletes always apply instantly with no maintenance  
  _Rationale:_ That assumption is what causes the stale results.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
