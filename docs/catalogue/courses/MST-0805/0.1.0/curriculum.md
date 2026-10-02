# LlamaIndex + Claude + Qdrant: Evidence-Based Document Search

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0805` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — LlamaIndex + Claude + Qdrant: Evidence-Based Document Search (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope an evidence-based document search and its answerable claims
2. Index documents with LlamaIndex for reliable retrieval
3. Store and query embeddings in Qdrant effectively
4. Use Claude to answer strictly from retrieved evidence with citations
5. Operate the search with evaluation, freshness and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping evidence-based search (20%)

- Worked applications: (1) Define what questions the corpus can actually answer; (2) Set the standard for a citation that supports an answer
- Common misconception addressed: Expecting the system to answer beyond what the documents contain
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Answerable questions and evidence standards | 96 | 7 |
| M01L02 | What counts as a citable source | 96 | 7 |

### M02 Indexing with LlamaIndex (20%)

- Worked applications: (1) Chunk a document so retrieval returns coherent passages; (2) Attach source metadata so answers can cite exactly
- Common misconception addressed: Indexing with chunks too large or too small to cite usefully
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chunking and indexing for retrieval | 96 | 7 |
| M02L02 | Metadata and source tracking | 96 | 7 |

### M03 Vectors in Qdrant (20%)

- Worked applications: (1) Query Qdrant and return the most relevant passages; (2) Filter out low-relevance matches below a threshold
- Common misconception addressed: Returning top matches regardless of how weak the relevance is
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Storing and querying embeddings | 96 | 7 |
| M03L02 | Filtering, relevance and thresholds | 96 | 7 |

### M04 Grounded answers with Claude (20%)

- Worked applications: (1) Produce an answer that cites the exact retrieved passage; (2) Say 'no supporting evidence' rather than inventing one
- Common misconception addressed: Letting Claude answer from memory when retrieval returns nothing
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Answering strictly from retrieved evidence | 96 | 7 |
| M04L02 | Handling no-evidence and conflicts | 96 | 7 |

### M05 Operating the search (20%)

- Worked applications: (1) Evaluate answers for citation accuracy on a labelled set; (2) Retire stale documents and restrict sensitive ones
- Common misconception addressed: Running with no evaluation of whether citations are correct
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evaluation and relevance review | 96 | 7 |
| M05L02 | Freshness, access and governance | 96 | 7 |

## Integrative case

A knowledge team builds evidence-based document search: scope answerable claims, index with LlamaIndex, store vectors in Qdrant, make Claude answer only from retrieved evidence with citations, and operate with evaluation, freshness and access controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0805-final-protected | 40 | 50 | yes |
| MST-0805-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping evidence-based search | 8 |
| Indexing with LlamaIndex | 8 |
| Vectors in Qdrant | 8 |
| Grounded answers with Claude | 8 |
| Operating the search | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0805-Q0001** (single-answer, Select ONE) Retrieval returns no passage relevant to the user's question. What should the answer be?

- A. A statement that no supporting evidence was found **(key)**  
  _Rationale:_ Correct: with no evidence, the honest answer is that none was found.
- B. A confident answer from Claude's general knowledge  
  _Rationale:_ An ungrounded answer defeats the purpose of evidence-based search.
- C. The highest-scoring passage even if irrelevant  
  _Rationale:_ An irrelevant passage does not support an answer.
- D. A paraphrase of the question as the answer  
  _Rationale:_ Restating the question is not an answer.

**MST-0805-Q0002** (multiple-answer, Select TWO) Which TWO indexing choices support accurate citations? (Select TWO.)

- A. Chunks sized to return coherent, citable passages **(key)**  
  _Rationale:_ Correct: well-sized chunks let the system point to a meaningful span.
- B. Source metadata attached to every chunk **(key)**  
  _Rationale:_ Correct: metadata is what lets an answer cite the exact source.
- C. Discarding document structure to simplify the index  
  _Rationale:_ Losing structure makes passages harder to cite accurately.
- D. One giant chunk per document for completeness  
  _Rationale:_ An oversized chunk cannot pinpoint the supporting text.

**MST-0805-Q0003** (single-answer, Select ONE) A query's top vector match has a very low relevance score. How should it be handled?

- A. Apply a relevance threshold and treat it as no match **(key)**  
  _Rationale:_ Correct: a weak match should not be presented as supporting evidence.
- B. Return it anyway because it is the top result  
  _Rationale:_ Being top-ranked does not make a weak match relevant.
- C. Lower the threshold until something is returned  
  _Rationale:_ Forcing a return produces unsupported answers.
- D. Return all passages regardless of score  
  _Rationale:_ Returning everything buries any genuine evidence in noise.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
