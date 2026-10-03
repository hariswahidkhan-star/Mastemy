# Retrieval-Augmented Generation (RAG) Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2052` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Specific retriever and model behaviour must be re-checked against current docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Retrieval-Augmented Generation (RAG) Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why RAG grounds model answers in external data and when it beats fine-tuning
2. Describe the RAG pipeline: ingest, chunk, embed, index, retrieve and generate
3. Build a basic retrieval step and pass retrieved context into a prompt
4. Write prompts that use retrieved context and cite sources faithfully
5. Identify common RAG failures such as missing context and ignored context
6. Measure retrieval and answer quality with simple, honest metrics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why RAG (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide for three questions whether RAG, fine-tuning or a plain prompt fits; (2) Diagram the offline and online halves of a RAG system
- Common misconception addressed: Believing RAG retrains the model rather than supplying context at query time
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Grounding answers in external knowledge vs relying on parametric memory | 120 | 7 |
| M01L02 | RAG vs fine-tuning vs long context: when each fits | 120 | 7 |

### M02 The RAG pipeline (25% (Mastemy design weight), design weight)

- Worked applications: (1) Chunk a long policy document and embed the chunks; (2) Retrieve the top passages for a query and inspect them
- Common misconception addressed: Assuming one giant chunk per document retrieves as well as sensible smaller chunks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Ingest, chunk, embed and index: the offline path | 120 | 7 |
| M02L02 | Retrieve and generate: the online path | 120 | 7 |

### M03 Building retrieval into prompts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Fit retrieved passages into a limited context budget and drop the rest sensibly; (2) Add an instruction to answer only from context and otherwise say it is not found
- Common misconception addressed: Pasting raw retrieved text with no instruction and expecting faithful citation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Assembling retrieved context into a prompt budget | 120 | 7 |
| M03L02 | Citing sources and instructing the model to say 'not found' | 120 | 7 |

### M04 Evaluating RAG (25% (Mastemy design weight), design weight)

- Worked applications: (1) Label a set of answers as grounded, hallucinated or missing-context; (2) Compute a simple hit-rate for whether the right passage was retrieved
- Common misconception addressed: Judging a RAG system only by whether answers sound fluent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Failure modes: missing, irrelevant and ignored context | 120 | 7 |
| M04L02 | Simple retrieval and answer-quality metrics | 120 | 7 |

## Integrative case

A support team wants a bot that answers only from their product documentation and never invents policy: design the ingest-chunk-embed-index path, build retrieval into the prompt with source citation, handle 'not found' honestly, and measure both retrieval hit-rate and answer grounding.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2052-final-protected | 40 | 40 | yes |
| MST-2052-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why RAG | 10 |
| The RAG pipeline | 10 |
| Building retrieval into prompts | 10 |
| Evaluating RAG | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2052-Q0001** (single-answer, Select ONE) A RAG bot gives a confident answer that is nowhere in the retrieved passages. The right passage was retrieved. What failure is this?

- A. Ignored context: the model answered from parametric memory instead of the retrieved passages **(key)**  
  _Rationale:_ Correct: when the right context is present but unused, the model ignored it, often fixable with stronger grounding instructions.
- B. Missing context: the retriever failed  
  _Rationale:_ The right passage was retrieved, so retrieval did not fail.
- C. A chunking bug  
  _Rationale:_ Chunking is not the issue when the correct passage was retrieved.
- D. An embedding dimension mismatch  
  _Rationale:_ That would break retrieval entirely, which did not happen here.

**MST-2052-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to choose RAG over fine-tuning for a knowledge task? (Select TWO.)

- A. The knowledge changes often and must stay current without retraining **(key)**  
  _Rationale:_ Correct: RAG updates by changing the index, not the weights.
- B. You need answers grounded in specific source passages you can cite **(key)**  
  _Rationale:_ Correct: RAG supplies and can cite the exact retrieved text.
- C. You want to permanently change the model's writing style  
  _Rationale:_ Style adaptation is a fine-tuning use case, not RAG's strength.
- D. You want to avoid storing any documents at all  
  _Rationale:_ RAG requires storing and indexing the documents.

**MST-2052-Q0003** (single-answer, Select ONE) In the RAG pipeline, what is the purpose of the embedding step?

- A. Convert text into vectors so semantically similar passages can be found by similarity search **(key)**  
  _Rationale:_ Correct: embeddings place similar meanings near each other for retrieval.
- B. Compress documents to save disk space  
  _Rationale:_ Embeddings are for similarity search, not primarily compression.
- C. Translate documents into English  
  _Rationale:_ Embedding is not translation.
- D. Generate the final answer  
  _Rationale:_ Generation is a later step performed by the LLM.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
