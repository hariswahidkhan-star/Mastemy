# Amazon Bedrock + S3 + OpenSearch: Document Intelligence

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0802` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Bedrock, Amazon S3 and Amazon OpenSearch Service product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-BEDROCK-RAG (https://docs.aws.amazon.com/bedrock/; https://docs.aws.amazon.com/opensearch-service/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Bedrock + S3 + OpenSearch: Document Intelligence (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design a document-intelligence pipeline over S3 content
2. Ingest, extract and chunk documents for retrieval
3. Generate embeddings and index them in OpenSearch
4. Retrieve with vector and hybrid search for relevance
5. Generate grounded, cited answers with Bedrock models
6. Evaluate quality, cost and security of the pipeline

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught via instructor-built projects and walkthroughs.

## Modules

### M01 Pipeline architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Sketch the end-to-end RAG pipeline; (2) Organise source documents in S3 prefixes
- Common misconception addressed: Treating the LLM as the whole system instead of one stage
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Document-intelligence building blocks | 80 | 5 |
| M01L02 | Data sources in S3 | 80 | 5 |

### M02 Ingestion and chunking (MASTEMY-DESIGN 16%)

- Worked applications: (1) Extract text from mixed PDF and Word files; (2) Choose a chunk size with overlap
- Common misconception addressed: Chunking so large that retrieval returns irrelevant context
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Text extraction from documents | 80 | 5 |
| M02L02 | Chunking strategy | 80 | 5 |

### M03 Embeddings and indexing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create embeddings for each chunk; (2) Build a k-NN vector index in OpenSearch
- Common misconception addressed: Mixing embeddings from different models in one index
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Generating embeddings with Bedrock | 80 | 5 |
| M03L02 | Indexing vectors in OpenSearch | 80 | 5 |

### M04 Retrieval (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run a semantic k-NN query; (2) Combine keyword and vector search for recall
- Common misconception addressed: Relying on keyword search alone for semantic questions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Vector search | 80 | 5 |
| M04L02 | Hybrid search and ranking | 80 | 5 |

### M05 Grounded generation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compose a grounded answer with sources; (2) Make the model say when the answer is not in context
- Common misconception addressed: Letting the model answer from training data instead of retrieved context
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Prompting with retrieved context | 80 | 5 |
| M05L02 | Citations and refusal | 80 | 5 |

### M06 Evaluation and security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Measure retrieval relevance on a test set; (2) Scope S3 and index access with least privilege
- Common misconception addressed: Shipping without measuring grounding or controlling access
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Relevance and quality evaluation | 80 | 5 |
| M06L02 | Cost and access control | 80 | 5 |

## Integrative case

A company wants to ask questions over a large S3 archive of contracts: build an ingestion and chunking pipeline, embed and index chunks in OpenSearch, retrieve with hybrid search, generate grounded cited answers with a Bedrock model, and evaluate relevance, cost and access control before go-live.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0802-final-protected | 40 | 50 | yes |
| MST-0802-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Pipeline architecture | 7 |
| Ingestion and chunking | 7 |
| Embeddings and indexing | 7 |
| Retrieval | 7 |
| Grounded generation | 6 |
| Evaluation and security | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0802-Q0001** (single-answer, Select ONE) In a RAG pipeline, why does chunk size matter for answer quality?

- A. Chunks that are too large dilute relevance; too small lose context **(key)**  
  _Rationale:_ Correct: chunk size trades off focused relevance against enough surrounding context.
- B. Chunk size sets the model's training data  
  _Rationale:_ Chunking affects retrieval, not model training.
- C. Larger chunks always improve answers  
  _Rationale:_ Over-large chunks bring in irrelevant text and hurt retrieval.
- D. Chunk size determines the S3 storage class  
  _Rationale:_ Storage class is unrelated to chunking.

**MST-0802-Q0002** (single-answer, Select ONE) To keep answers trustworthy, the generation step should:

- A. Ground answers in retrieved context and cite sources, refusing when context is missing **(key)**  
  _Rationale:_ Correct: grounding and citation with graceful refusal keeps answers verifiable.
- B. Answer from the model's general knowledge for speed  
  _Rationale:_ Ungrounded answers defeat the purpose of RAG and can hallucinate.
- C. Never include citations to save tokens  
  _Rationale:_ Citations are what make the answer verifiable.
- D. Always fabricate a source if none is found  
  _Rationale:_ Fabricating sources is a serious integrity failure.

**MST-0802-Q0003** (multiple-answer, Select TWO) Which TWO improve retrieval quality in a document-intelligence pipeline? (Select TWO.)

- A. Combine keyword and vector (hybrid) search **(key)**  
  _Rationale:_ Correct: hybrid search improves recall across exact and semantic matches.
- B. Use the same embedding model for indexing and querying **(key)**  
  _Rationale:_ Correct: consistent embeddings keep vector distances meaningful.
- C. Mix embeddings from different models in one index  
  _Rationale:_ Mixed embeddings make distances meaningless.
- D. Remove all metadata from chunks  
  _Rationale:_ Metadata often helps filtering and ranking.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
