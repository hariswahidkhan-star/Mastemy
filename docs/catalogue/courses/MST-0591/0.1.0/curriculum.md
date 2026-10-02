# RAG Chunking, Metadata, and Indexing Strategies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0591` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral RAG engineering practice; no single official issuer syllabus. Specific vendor product behaviour is DESIGN ASSUMPTION pending an official check against each vendor's documentation. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-RAG-CHUNKING |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG Chunking, Metadata, and Indexing Strategies (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how chunking choices affect retrieval quality
2. Choose chunk size and overlap for a document type
3. Attach and use metadata for filtering and routing
4. Select an indexing approach (keyword, vector, hybrid) for a need
5. Evaluate and iterate chunking and indexing decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot grade a tuned index on real data; chunking and indexing are taught through worked experiments.

## Modules

### M01 Why chunking matters (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Show how a bad chunk boundary breaks an answer; (2) Compare whole-document versus chunked retrieval
- Common misconception addressed: Believing one chunk size is optimal for all documents
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Chunking and its effect on retrieval | 72 | 5 |
| M01L02 | Chunk boundaries and context loss | 72 | 5 |

### M02 Chunk size and overlap (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Pick size and overlap for prose versus tables; (2) Tune overlap to preserve cross-boundary meaning
- Common misconception addressed: Using huge chunks and assuming more context is always better
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing chunk size by content type | 96 | 5 |
| M02L02 | Overlap and boundary strategies | 96 | 5 |

### M03 Metadata for filtering and routing (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add product/version metadata and filter on it; (2) Route a query to the right subset using metadata
- Common misconception addressed: Relying on similarity alone when a filter would be exact
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metadata-driven filtering | 80 | 5 |
| M03L02 | Routing with metadata | 80 | 5 |
| M03L03 | Combining filters with similarity | 80 | 5 |

### M04 Indexing approaches (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose keyword, vector or hybrid for three needs; (2) Explain when hybrid beats pure vector
- Common misconception addressed: Assuming vector search always beats keyword search
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Keyword, vector and hybrid indexing | 96 | 5 |
| M04L02 | Picking an approach for the workload | 96 | 5 |

### M05 Evaluate and iterate (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Measure whether a chunking change improved retrieval; (2) Avoid tuning to a single lucky query
- Common misconception addressed: Declaring success from one query instead of a test set
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Measuring a change honestly | 96 | 5 |
| M05L02 | Iterating without overfitting | 96 | 5 |

## Integrative case

A team improves a knowledge-base assistant: compare two chunking strategies on the same corpus, add metadata filters for product and version, switch from pure vector to hybrid indexing, and measure which change actually improved retrieval.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0591-final-protected | 30 | 40 | yes |
| MST-0591-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why chunking matters | 5 |
| Chunk size and overlap | 6 |
| Metadata for filtering and routing | 7 |
| Indexing approaches | 6 |
| Evaluate and iterate | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0591-Q0001** (single-answer, Select ONE) Retrieval often returns half of the relevant passage, cutting off mid-explanation. The most direct chunking fix is:

- A. Add overlap between chunks so boundary meaning is preserved **(key)**  
  _Rationale:_ Correct: overlap keeps context that spans a boundary from being lost.
- B. Remove all metadata  
  _Rationale:_ Metadata removal does not address boundary cut-off.
- C. Switch to a larger language model  
  _Rationale:_ The passage was never retrieved whole; model size is not the fix.
- D. Delete the index  
  _Rationale:_ Deleting the index does not address chunk boundaries.

**MST-0591-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to choose hybrid (keyword + vector) indexing? (Select TWO.)

- A. Exact terms and codes matter and must match precisely **(key)**  
  _Rationale:_ Correct: keyword matching captures exact identifiers vectors may miss.
- B. Semantic paraphrases must also be retrieved **(key)**  
  _Rationale:_ Correct: vector search captures meaning beyond exact words.
- C. You want to remove all metadata  
  _Rationale:_ Metadata is unrelated to the hybrid rationale.
- D. You want fewer evaluation steps  
  _Rationale:_ Hybrid does not reduce the need for evaluation.

**MST-0591-Q0003** (single-answer, Select ONE) A new chunking strategy answered one demo question better. What should you conclude?

- A. Nothing yet; evaluate on a representative test set before concluding **(key)**  
  _Rationale:_ Correct: one query is not evidence; honest evaluation needs a test set.
- B. The new strategy is definitively better  
  _Rationale:_ A single query cannot establish that.
- C. Chunking no longer matters  
  _Rationale:_ That does not follow from one result.
- D. Vector search should be removed  
  _Rationale:_ Unrelated to the single-query observation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
