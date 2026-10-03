# Advanced RAG: Chunking, Reranking and Evaluation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2053` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Specific reranker and evaluation-tool behaviour must be re-checked at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Advanced RAG: Chunking, Reranking and Evaluation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design chunking strategies (size, overlap, structure-aware) for different document types
2. Improve recall with query rewriting, hybrid search and metadata filtering
3. Use rerankers to raise precision of the retrieved set
4. Build a RAG evaluation harness with retrieval and generation metrics
5. Diagnose and fix a RAG system using evaluation evidence rather than guesswork
6. Balance retrieval quality against latency and cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Chunking strategies (25% (Mastemy design weight), design weight)

- Worked applications: (1) Re-chunk a set of tables and headings using structure instead of fixed size; (2) Choose overlap for a dense legal text vs a sparse FAQ
- Common misconception addressed: Assuming one chunk size is optimal for every corpus
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Fixed-size vs structure-aware chunking and overlap | 120 | 7 |
| M01L02 | Matching chunk design to document type and query style | 120 | 7 |

### M02 Improving retrieval recall (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rewrite a terse user query into several fuller search queries; (2) Add a metadata filter so only the current product version is retrieved
- Common misconception addressed: Believing vector search alone always beats combining it with keyword search
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Query rewriting and multi-query expansion | 120 | 7 |
| M02L02 | Hybrid (keyword + vector) search and metadata filtering | 120 | 7 |

### M03 Reranking for precision (25% (Mastemy design weight), design weight)

- Worked applications: (1) Insert a reranker and compare the top results before and after; (2) Pick a larger retrieval k but a small reranked n and justify it
- Common misconception addressed: Thinking retrieving more passages always improves the final answer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Why a cross-encoder reranker beats first-stage similarity alone | 120 | 7 |
| M03L02 | Tuning top-k retrieval and top-n after reranking | 120 | 7 |

### M04 Evaluating and tuning RAG (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a labelled eval set and compute recall@k and a groundedness score; (2) Use eval output to decide whether the problem is retrieval or generation
- Common misconception addressed: Changing several RAG parameters at once so no result can be attributed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Retrieval metrics (recall@k, MRR) and generation metrics (groundedness) | 120 | 7 |
| M04L02 | Reading evaluation results to decide the next change | 120 | 7 |

## Integrative case

A legal-research RAG system returns plausible but wrong citations: redesign chunking for structured statutes, add hybrid search and metadata filtering, insert a reranker, and build an evaluation harness that shows whether the remaining errors come from retrieval or generation before each change.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2053-final-protected | 40 | 40 | yes |
| MST-2053-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Chunking strategies | 10 |
| Improving retrieval recall | 10 |
| Reranking for precision | 10 |
| Evaluating and tuning RAG | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2053-Q0001** (single-answer, Select ONE) A RAG system retrieves the right document in its top 20 but the answer still misses it. Adding which component most directly raises the chance the key passage is actually used?

- A. A reranker that reorders the 20 candidates so the most relevant passage lands in the top few the model reads **(key)**  
  _Rationale:_ Correct: reranking raises precision of the small set the model actually consumes.
- B. A larger embedding model only  
  _Rationale:_ A better first-stage embedder helps recall but does not reorder the shortlist the model reads.
- C. A higher generation temperature  
  _Rationale:_ Randomness does not improve which passage is used.
- D. Removing metadata filters  
  _Rationale:_ That widens results and can lower precision.

**MST-2053-Q0002** (multiple-answer, Select TWO) Which TWO metrics specifically measure retrieval quality (not generation quality)? (Select TWO.)

- A. Recall@k **(key)**  
  _Rationale:_ Correct: recall@k measures whether relevant passages appear in the top k retrieved.
- B. Mean reciprocal rank (MRR) **(key)**  
  _Rationale:_ Correct: MRR measures how highly the first relevant passage is ranked.
- C. Answer groundedness  
  _Rationale:_ Groundedness measures the generated answer against its sources, not retrieval.
- D. Response fluency  
  _Rationale:_ Fluency is a generation-side property, not retrieval quality.

**MST-2053-Q0003** (single-answer, Select ONE) Why can hybrid search (keyword plus vector) outperform pure vector search?

- A. Keyword matching catches exact terms, codes and rare tokens that embeddings may blur, while vectors catch paraphrase **(key)**  
  _Rationale:_ Correct: the two methods are complementary, improving recall across query types.
- B. It eliminates the need for any index  
  _Rationale:_ Both methods still require indexes.
- C. It always reduces latency  
  _Rationale:_ Running two retrievers usually adds latency.
- D. It removes the need for a generation model  
  _Rationale:_ Generation is still required to produce the answer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
