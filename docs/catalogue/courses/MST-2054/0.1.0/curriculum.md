# Vector Databases and Embeddings for AI Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2054` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Specific vector-store features, index types and limits must be re-checked against current product docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Vector Databases and Embeddings for AI Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what embeddings are and how vector similarity enables semantic search
2. Choose an embedding model and distance metric appropriate to a task
3. Describe how vector indexes (e.g. approximate nearest neighbour) trade recall for speed
4. Model data, metadata and namespaces in a vector store for filtering and multi-tenancy
5. Operate a vector store: upserts, re-embedding, and keeping an index in sync with source data
6. Reason about cost, dimensionality and scaling of a vector search system

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Embeddings and similarity (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain why two paraphrased sentences land near each other in embedding space; (2) Pick cosine vs dot product for normalised vs unnormalised vectors
- Common misconception addressed: Thinking embeddings store the original text rather than a numeric representation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What an embedding vector represents and why similar meanings cluster | 120 | 7 |
| M01L02 | Distance metrics: cosine, dot product and Euclidean | 120 | 7 |

### M02 Choosing embedding models (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose an embedding model for a multilingual support corpus on a budget; (2) Diagnose a bug where documents and queries used different embedding models
- Common misconception addressed: Mixing embeddings from two different models in one index and expecting valid similarity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Matching an embedding model to domain, language and cost | 120 | 7 |
| M02L02 | Dimensionality, normalisation and consistency across queries and documents | 120 | 7 |

### M03 Indexes and search (25% (Mastemy design weight), design weight)

- Worked applications: (1) Tune an approximate index to trade a little recall for much lower latency; (2) Decide when exact search is acceptable for a small collection
- Common misconception addressed: Assuming approximate nearest-neighbour search always returns the true nearest neighbours
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Exact vs approximate nearest-neighbour search and the recall/speed trade-off | 120 | 7 |
| M03L02 | Common index parameters and what they tune | 120 | 7 |

### M04 Data modelling and operations (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design metadata and namespaces so each customer only searches their own data; (2) Plan a re-embedding migration when upgrading the embedding model
- Common misconception addressed: Believing new documents appear in search results without being upserted and indexed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Metadata, namespaces and filtered search for multi-tenant data | 120 | 7 |
| M04L02 | Upserts, re-embedding and keeping the index in sync | 120 | 7 |

## Integrative case

A SaaS company adds semantic search across each customer's private documents: pick an embedding model and distance metric, choose an index that meets a latency target, model metadata and namespaces so tenants are isolated, and plan how the index stays in sync as documents change.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2054-final-protected | 40 | 40 | yes |
| MST-2054-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Embeddings and similarity | 10 |
| Choosing embedding models | 10 |
| Indexes and search | 10 |
| Data modelling and operations | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2054-Q0001** (single-answer, Select ONE) Search quality suddenly drops after a deploy. You find queries are embedded with model A but the documents were indexed with model B. Why does this break search?

- A. Vectors from different models live in different spaces, so distances between them are meaningless **(key)**  
  _Rationale:_ Correct: query and document embeddings must come from the same model to be comparable.
- B. Model B is always worse than model A  
  _Rationale:_ The issue is incompatibility, not that one model is worse.
- C. The database ran out of disk  
  _Rationale:_ This is a space-mismatch problem, not storage.
- D. Cosine distance is broken  
  _Rationale:_ The metric is fine; the inputs are incomparable.

**MST-2054-Q0002** (multiple-answer, Select TWO) Which TWO statements about approximate nearest-neighbour (ANN) indexes are correct? (Select TWO.)

- A. They trade some recall for much faster search at scale **(key)**  
  _Rationale:_ Correct: ANN accepts occasional misses to gain speed.
- B. They may not return the exact true nearest neighbours every time **(key)**  
  _Rationale:_ Correct: results are approximate by design.
- C. They guarantee perfect recall like exact search  
  _Rationale:_ That is exact search, not approximate.
- D. They remove the need to choose a distance metric  
  _Rationale:_ A distance metric is still required.

**MST-2054-Q0003** (single-answer, Select ONE) Why use metadata filtering alongside vector similarity in a multi-tenant store?

- A. To restrict similarity search to one tenant's or one category's vectors so results are both relevant and correctly scoped **(key)**  
  _Rationale:_ Correct: metadata filters enforce scoping and tenancy on top of similarity.
- B. To replace embeddings entirely  
  _Rationale:_ Filtering complements, not replaces, vector search.
- C. To make the index smaller on disk  
  _Rationale:_ Metadata adds data; it is for scoping, not compression.
- D. To avoid needing an embedding model  
  _Rationale:_ Embeddings are still required for similarity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
