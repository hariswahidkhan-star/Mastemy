# RAG Freshness, Change Detection, and Reindexing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0606` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG Freshness, Change Detection, and Reindexing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the cost of stale retrieval
2. Detect what changed in the source corpus
3. Reindex only what changed, efficiently
4. Invalidate stale content and keep answers consistent
5. Choose when and how reindexing runs
6. Measure staleness and monitor freshness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why freshness matters (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Identify where stale answers cause harm; (2) Define a freshness requirement per content type
- Common misconception addressed: Assuming a one-time index stays correct
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Staleness and its costs | 80 | 8 |
| M01L02 | Freshness requirements | 80 | 8 |

### M02 Detecting source changes (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Use hashes or timestamps to find changed docs; (2) Detect deletions, not just additions
- Common misconception addressed: Only re-ingesting new files and missing edits
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Change detection methods | 80 | 8 |
| M02L02 | Handling edits and deletions | 80 | 8 |

### M03 Incremental reindexing (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Reindex changed chunks without a full rebuild; (2) Keep embeddings consistent across updates
- Common misconception addressed: Rebuilding the whole index on every change
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Incremental reindex strategy | 80 | 8 |
| M03L02 | Embedding consistency | 80 | 8 |

### M04 Invalidation and consistency (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Invalidate caches tied to changed documents; (2) Avoid serving a mix of old and new during updates
- Common misconception addressed: Serving partially updated results mid-reindex
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cache and index invalidation | 80 | 8 |
| M04L02 | Consistency during updates | 80 | 8 |

### M05 Scheduling and triggers (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Choose event-driven vs scheduled reindexing; (2) Prioritise high-churn, high-value content
- Common misconception addressed: Reindexing everything on a fixed slow timer
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Event-driven vs scheduled | 80 | 8 |
| M05L02 | Prioritising by churn and value | 80 | 8 |

### M06 Measuring and monitoring staleness (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Define and track a staleness metric; (2) Alert when freshness falls below target
- Common misconception addressed: Having no way to know content is stale
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Staleness metrics | 80 | 8 |
| M06L02 | Monitoring and alerts | 80 | 8 |

## Integrative case

A RAG system backs a knowledge base that changes daily. Design freshness: detect source changes, reindex efficiently, invalidate stale content, keep answers consistent during updates, and measure staleness so the system never confidently serves outdated facts.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0606-final-protected | 40 | 40 | yes |
| MST-0606-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why freshness matters | 7 |
| Detecting source changes | 7 |
| Incremental reindexing | 7 |
| Invalidation and consistency | 7 |
| Scheduling and triggers | 6 |
| Measuring and monitoring staleness | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0606-Q0001** (single-answer, Select ONE) A pipeline only ingests newly added files, so edited and deleted documents stay in the index. What is the consequence?

- A. Answers reflect outdated or removed content, producing stale and wrong results **(key)**  
  _Rationale:_ Correct: missing edits and deletions leaves stale, incorrect content in the index.
- B. The index becomes smaller  
  _Rationale:_ It does not shrink; stale content remains.
- C. Embeddings improve automatically  
  _Rationale:_ Change detection gaps do not improve embeddings.
- D. Nothing changes  
  _Rationale:_ Stale content directly harms answer correctness.

**MST-0606-Q0002** (multiple-answer, Select TWO) Which TWO approaches make reindexing efficient without serving inconsistent results? (Select TWO.)

- A. Reindex only changed chunks instead of rebuilding everything **(key)**  
  _Rationale:_ Correct: incremental reindexing is efficient.
- B. Invalidate caches and swap updates atomically to avoid mixed old/new results **(key)**  
  _Rationale:_ Correct: controlled invalidation keeps answers consistent.
- C. Rebuild the full index on every single edit  
  _Rationale:_ Full rebuilds are wasteful.
- D. Ignore deletions to save work  
  _Rationale:_ Ignoring deletions leaves stale content.

**MST-0606-Q0003** (single-answer, Select ONE) Leadership asks how the team knows content is fresh enough. What is the right answer?

- A. A tracked staleness metric with alerts when freshness falls below target **(key)**  
  _Rationale:_ Correct: you must measure and monitor staleness to manage it.
- B. Trust that reindexing works  
  _Rationale:_ Trust without measurement is not evidence.
- C. Count the number of documents  
  _Rationale:_ Document count says nothing about freshness.
- D. Check the size of the vector store  
  _Rationale:_ Size does not indicate staleness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
