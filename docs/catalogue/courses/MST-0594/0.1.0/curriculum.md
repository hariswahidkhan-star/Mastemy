# Hybrid Search: Keyword, Vector, and Reranking

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0594` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Hybrid Search: Keyword, Vector, and Reranking (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compare keyword and vector retrieval and their trade-offs
2. Combine retrieval signals with fusion strategies
3. Apply reranking to improve result ordering
4. Evaluate hybrid search quality against latency and cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Keyword and vector retrieval (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Show a query where keyword search beats vector search and vice versa; (2) Explain why exact identifiers favour lexical search
- Common misconception addressed: Believing vector search alone always beats keyword search
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Lexical search (BM25) | 80 | 5 |
| M01L02 | Vector retrieval | 80 | 5 |
| M01L03 | Strengths and weaknesses | 80 | 5 |

### M02 Combining signals (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Combine keyword and vector results with reciprocal rank fusion; (2) Normalise scores before weighting two retrievers
- Common misconception addressed: Adding raw scores from two retrievers without normalising them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fusion strategies (RRF) | 80 | 5 |
| M02L02 | Weighting and normalisation | 80 | 5 |
| M02L03 | Filtering and faceting | 80 | 5 |

### M03 Reranking (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Rerank a fused candidate set with a cross-encoder; (2) Measure whether reranking improves top-k relevance
- Common misconception addressed: Reranking a huge candidate set and ignoring the latency cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cross-encoder reranking | 80 | 5 |
| M03L02 | Evaluating hybrid quality | 80 | 5 |
| M03L03 | Latency and cost trade-offs | 80 | 5 |

## Integrative case

A search system returns weak results on both exact terms and paraphrases. Combine keyword and vector retrieval with a fusion strategy, add a reranker, and evaluate the hybrid pipeline's quality against latency and cost.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0594-final-protected | 30 | 30 | yes |
| MST-0594-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Keyword and vector retrieval | 10 |
| Combining signals | 10 |
| Reranking | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0594-Q0001** (single-answer, Select ONE) Users search both for exact error codes and for paraphrased questions. What retrieval design fits best?

- A. Hybrid search combining keyword (for exact terms) and vector (for paraphrases) **(key)**  
  _Rationale:_ Correct: hybrid covers both exact-match and semantic queries.
- B. Vector search only  
  _Rationale:_ Pure vector search can miss exact identifiers like error codes.
- C. Keyword search only  
  _Rationale:_ Pure keyword search handles paraphrases poorly.
- D. Random ordering of all documents  
  _Rationale:_ Random ordering is not retrieval.

**MST-0594-Q0002** (multiple-answer, Select TWO) Which TWO practices make combining two retrievers sound? (Select TWO.) (Select TWO.)

- A. Use a rank-fusion method such as reciprocal rank fusion **(key)**  
  _Rationale:_ Correct: RRF combines rankings without needing comparable raw scores.
- B. Normalise scores before weighting if you combine raw scores **(key)**  
  _Rationale:_ Correct: normalisation makes scores from different retrievers comparable.
- C. Add raw scores from both retrievers directly  
  _Rationale:_ Unnormalised scores are not comparable and distort the mix.
- D. Use only the first retriever's results and discard the other  
  _Rationale:_ Discarding a signal defeats the purpose of hybrid search.

**MST-0594-Q0003** (single-answer, Select ONE) A cross-encoder reranker improves relevance but you must rerank quickly. What is the usual approach?

- A. Rerank only a small candidate set from the first-stage retrievers **(key)**  
  _Rationale:_ Correct: reranking a bounded candidate set controls latency while improving ordering.
- B. Rerank the entire corpus on every query  
  _Rationale:_ Reranking everything is far too slow.
- C. Skip the first-stage retrieval entirely  
  _Rationale:_ First-stage retrieval is what makes reranking tractable.
- D. Rerank with a keyword matcher instead of the cross-encoder  
  _Rationale:_ That abandons the quality gain the cross-encoder provides.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
