# Amazon Bedrock Knowledge Bases: RAG Design and Evaluation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0775` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Amazon Bedrock Knowledge Bases: RAG Design and Evaluation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design an ingestion pipeline that chunks and embeds source documents for a knowledge base
2. Configure a vector store and retrieval settings and reason about their trade-offs
3. Build a retrieve-and-generate flow and control grounding and citations
4. Evaluate retrieval and answer quality with a repeatable test set
5. Apply access control, cost and operational guardrails to a knowledge base

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Ingestion and chunking (20%)

- Worked applications: (1) Chunk a 40-page policy PDF with overlap and inspect the resulting segments; (2) Choose an embedding model for a multilingual corpus and justify the choice
- Common misconception addressed: Assuming larger chunks always improve answer quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data sources, parsing and chunking strategies | 120 | 7 |
| M01L02 | Embedding models and the ingestion pipeline | 120 | 7 |

### M02 Vector stores and retrieval (20%)

- Worked applications: (1) Compare a managed vector store against a self-managed one for a 1M-chunk corpus; (2) Tune top-k and similarity thresholds for a FAQ workload
- Common misconception addressed: Treating a higher top-k as always better recall at no cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Vector store options and index configuration | 120 | 7 |
| M02L02 | Retrieval parameters and hybrid search | 120 | 7 |

### M03 Retrieve-and-generate (20%)

- Worked applications: (1) Wire a retrieve-and-generate call and force answers to cite retrieved passages; (2) Add a fallback response when retrieval returns nothing relevant
- Common misconception addressed: Believing the model will never answer outside the retrieved context
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Grounded generation and citations | 120 | 7 |
| M03L02 | Prompt templates and refusal/fallback behaviour | 120 | 7 |

### M04 Evaluation (20%)

- Worked applications: (1) Build a 50-question gold set and measure retrieval hit-rate; (2) Score answer faithfulness and flag hallucinated claims
- Common misconception addressed: Judging a RAG system only by eyeballing a few answers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Retrieval metrics and gold test sets | 120 | 7 |
| M04L02 | Answer faithfulness and automated evaluation | 120 | 7 |

### M05 Security, cost and operations (20%)

- Worked applications: (1) Apply least-privilege roles and document-level filtering to a knowledge base; (2) Estimate monthly embedding and query cost for a stated traffic profile
- Common misconception addressed: Assuming retrieved content is always safe to feed the model verbatim
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Access control and data-source permissions | 120 | 7 |
| M05L02 | Cost, monitoring and incident handling | 120 | 7 |

## Integrative case

A support team wants a grounded assistant over its product manuals: design ingestion and chunking, pick a vector store, enforce document permissions, build a gold test set, and defend the design against a hallucination incident.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0775-final-protected | 40 | 50 | yes |
| MST-0775-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ingestion and chunking | 8 |
| Vector stores and retrieval | 8 |
| Retrieve-and-generate | 8 |
| Evaluation | 8 |
| Security, cost and operations | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0775-Q0001** (single-answer, Select ONE) A knowledge-base answer invents a refund window that appears in no source document. Which change most directly reduces this failure?

- A. Require the generation step to answer only from retrieved passages and cite them **(key)**  
  _Rationale:_ Correct: constraining generation to retrieved, cited context is the primary guardrail against ungrounded claims.
- B. Increase the embedding dimension  
  _Rationale:_ A larger embedding may help retrieval slightly but does not stop the model inventing unsupported facts.
- C. Raise the generation temperature  
  _Rationale:_ Higher temperature increases variability and typically makes fabrication more likely, not less.
- D. Store more chunks per document  
  _Rationale:_ Storing more chunks changes retrieval volume, not whether the model stays within retrieved context.

**MST-0775-Q0002** (multiple-answer, Select TWO) Which TWO practices make a RAG evaluation repeatable rather than anecdotal? (Select TWO.)

- A. Maintain a fixed gold set of questions with expected source passages **(key)**  
  _Rationale:_ Correct: a stable gold set lets you measure change over time.
- B. Review only the three answers that looked wrong last week  
  _Rationale:_ Cherry-picking failures is not a repeatable measure of overall quality.
- C. Record retrieval hit-rate and answer faithfulness on each run **(key)**  
  _Rationale:_ Correct: tracked metrics turn evaluation into a comparable signal.
- D. Change the chunking and the model at the same time between runs  
  _Rationale:_ Changing two variables at once prevents attributing any change to a cause.

**MST-0775-Q0003** (single-answer, Select ONE) An executive can retrieve finance documents they should not see. Where is the control best applied?

- A. Document-level access filtering at retrieval time **(key)**  
  _Rationale:_ Correct: filtering retrieval by the caller's permissions stops unauthorized content reaching the model.
- B. A disclaimer in the system prompt  
  _Rationale:_ A prompt disclaimer does not prevent unauthorized passages being retrieved.
- C. A smaller chunk size  
  _Rationale:_ Chunk size is unrelated to who may see a document.
- D. A higher similarity threshold  
  _Rationale:_ Thresholds affect relevance, not authorization.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
