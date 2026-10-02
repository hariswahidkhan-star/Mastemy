# LlamaIndex Knowledge-Application Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0610` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — LlamaIndex Knowledge-Application Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Load, parse and node-split documents into a LlamaIndex ingestion pipeline
2. Build and configure indexes, storage and embeddings
3. Construct query engines, retrievers and response synthesizers
4. Evaluate, trace and tune a knowledge application

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Ingestion and nodes (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Load a folder of documents and split them into nodes with metadata; (2) Configure an ingestion pipeline with a transformation and a cache
- Common misconception addressed: Treating a whole document as one chunk instead of splitting into nodes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Loaders and documents | 80 | 5 |
| M01L02 | Node parsers and chunking | 80 | 5 |
| M01L03 | Metadata and ingestion pipelines | 80 | 5 |

### M02 Indexes and storage (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Build a vector index and persist it to a storage context; (2) Swap the embedding model and re-index
- Common misconception addressed: Assuming the index embeds with the LLM rather than a separate embedding model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Vector and other index types | 80 | 5 |
| M02L02 | Embeddings and the embedding model | 80 | 5 |
| M02L03 | Storage contexts and persistence | 80 | 5 |

### M03 Querying and evaluation (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Assemble a query engine with a retriever and a response synthesizer; (2) Run a retrieval and a response evaluation over a small question set
- Common misconception addressed: Judging answer quality without separately checking retrieval quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Retrievers and query engines | 80 | 5 |
| M03L02 | Response synthesizers | 80 | 5 |
| M03L03 | Evaluation and tracing | 80 | 5 |

## Integrative case

A team builds an internal knowledge assistant with LlamaIndex: ingest mixed documents into nodes with metadata, build a vector index with a chosen embedding model, assemble a query engine with a retriever and response synthesizer, then evaluate retrieval and answer quality and tune the pipeline.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0610-final-protected | 30 | 30 | yes |
| MST-0610-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ingestion and nodes | 10 |
| Indexes and storage | 10 |
| Querying and evaluation | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0610-Q0001** (single-answer, Select ONE) In LlamaIndex, what does a node parser produce from a loaded document?

- A. Smaller text nodes, each carrying metadata, that can be embedded and retrieved **(key)**  
  _Rationale:_ Correct: node parsers split documents into retrievable nodes with metadata.
- B. A single embedding vector for the whole document  
  _Rationale:_ Embedding happens later and per node, not as the parser's output.
- C. A fine-tuned model  
  _Rationale:_ Node parsing does not train or produce a model.
- D. A finished natural-language answer  
  _Rationale:_ Parsing prepares content; it does not answer queries.

**MST-0610-Q0002** (multiple-answer, Select TWO) Which TWO components combine inside a LlamaIndex query engine? (Select TWO.)

- A. A retriever that fetches relevant nodes **(key)**  
  _Rationale:_ Correct: the retriever selects candidate nodes for the query.
- B. A response synthesizer that composes the answer from retrieved nodes **(key)**  
  _Rationale:_ Correct: the synthesizer turns retrieved nodes into a response.
- C. A payment gateway  
  _Rationale:_ Billing is unrelated to a query engine.
- D. A CSS stylesheet  
  _Rationale:_ Presentation styling is not part of a query engine.

**MST-0610-Q0003** (single-answer, Select ONE) Answers from a LlamaIndex app are wrong even though the LLM is strong. What should you check first?

- A. Retrieval quality: whether the right nodes are being fetched for the query **(key)**  
  _Rationale:_ Correct: if retrieval returns the wrong nodes, even a strong LLM cannot answer correctly.
- B. The colour of the UI  
  _Rationale:_ Presentation does not affect answer correctness.
- C. The LLM vendor's stock price  
  _Rationale:_ Irrelevant to retrieval or answers.
- D. Whether the document file names are alphabetised  
  _Rationale:_ File ordering does not determine retrieval relevance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
