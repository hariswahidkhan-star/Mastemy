# Retrieval-Augmented Generation: Complete System Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0589` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from master prompt section 11 (RAG scope list). Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: SRC-MASTER-PROMPT-S11 |
| Legacy IDs | none |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Retrieval-Augmented Generation: Complete System Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish RAG, fine-tuning, long-context use and agentic retrieval and choose between them
2. Design ingestion, extraction and parsing with quality checks
3. Design chunking, embeddings and metadata for retrieval
4. Implement vector, keyword and hybrid retrieval with filtering, reranking and query rewriting
5. Assemble context with citations and defend against prompt injection
6. Enforce permission-aware, multi-tenant retrieval with deletion and freshness handling
7. Evaluate retrieval and grounding and observe latency and cost
8. Deploy with caching, fallbacks and failure recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 RAG and its alternatives (MASTEMY-DESIGN 8%, design weight)

- Worked applications: (1) Choose RAG vs fine-tuning for a policy assistant and a tone-of-voice task; (2) Write the data contract between ingestion and retrieval
- Common misconception addressed: Treating RAG as a toy PDF chatbot
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | RAG, fine-tuning, long context and agentic retrieval compared | 77 | 7 |
| M01L02 | System architecture and data contracts | 77 | 7 |

### M02 Ingestion and parsing (MASTEMY-DESIGN 14%, design weight)

- Worked applications: (1) Extract text from scanned and digital PDFs and measure error rates; (2) Handle tables that break naive extraction
- Common misconception addressed: Assuming extraction is lossless
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Document ingestion and text extraction | 134 | 7 |
| M02L02 | Parsing quality, tables and OCR failures | 135 | 7 |

### M03 Chunking, embeddings and metadata (MASTEMY-DESIGN 14%, design weight)

- Worked applications: (1) Compare fixed, structural and semantic chunking on one corpus; (2) Design metadata for tenant, role, date and source
- Common misconception addressed: Using one chunk size for every document type
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Chunking strategies | 134 | 7 |
| M03L02 | Embeddings and metadata design | 135 | 7 |

### M04 Retrieval (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Combine BM25 and vector search with a metadata filter; (2) Add a reranker and measure recall@k change
- Common misconception addressed: Assuming vector search alone handles exact codes and names
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Vector, keyword and hybrid retrieval with filtering | 153 | 7 |
| M04L02 | Reranking and query rewriting | 154 | 7 |

### M05 Generation with evidence (MASTEMY-DESIGN 12%, design weight)

- Worked applications: (1) Assemble context with numbered citations and verify them; (2) Neutralise an injected instruction inside a retrieved page
- Common misconception addressed: Letting retrieved text override system instructions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Context assembly and citations | 115 | 7 |
| M05L02 | Prompt-injection defences for retrieved content | 115 | 7 |

### M06 Security and multi-tenancy (MASTEMY-DESIGN 10%, design weight)

- Worked applications: (1) Filter results by tenant before generation; (2) Propagate a document deletion through the index
- Common misconception addressed: Filtering permissions after generation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Permission-aware retrieval and multi-tenant authorization | 96 | 7 |
| M06L02 | Deletion, freshness and re-indexing | 96 | 7 |

### M07 Evaluation and observability (MASTEMY-DESIGN 14%, design weight)

- Worked applications: (1) Build a retrieval/grounding evaluation set with expected sources; (2) Trace a slow query and break down latency and cost
- Common misconception addressed: Judging quality from a few demo questions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Retrieval and answer-grounding evaluation | 134 | 7 |
| M07L02 | Observability, latency and cost | 135 | 7 |

### M08 Production deployment (MASTEMY-DESIGN 12%, design weight)

- Worked applications: (1) Add a semantic cache with invalidation rules; (2) Design fallbacks when the vector store is unavailable
- Common misconception addressed: Caching answers across tenants
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Caching, failure recovery and fallbacks | 115 | 7 |
| M08L02 | Production deployment checklist | 115 | 7 |

## Integrative case

A multi-tenant HR-policy assistant for 40 client companies: ingest PDFs and intranet pages, enforce tenant and role permissions, cite sources, survive a poisoned document, meet a latency budget and prove quality with an evaluation set.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0589-final-protected | 40 | 50 | yes |
| MST-0589-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| RAG and its alternatives | 3 |
| Ingestion and parsing | 6 |
| Chunking, embeddings and metadata | 6 |
| Retrieval | 6 |
| Generation with evidence | 5 |
| Security and multi-tenancy | 4 |
| Evaluation and observability | 5 |
| Production deployment | 5 |

Minimum reviewed item bank: 640 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0589-Q0001** (single-answer, Select ONE) Retrieved chunks are filtered for tenant permissions only after the model writes its answer. What is wrong?

- A. Unauthorised content may already have influenced or appeared in the answer; filtering must happen before generation **(key)**  
  _Rationale:_ Correct: permission-aware retrieval filters candidates before they enter the context.
- B. Nothing; post-filtering is standard  
  _Rationale:_ Post-filtering leaks information into generation.
- C. It only affects latency  
  _Rationale:_ It is a security failure, not a performance issue.
- D. It only matters for images  
  _Rationale:_ It applies to all content.

**MST-0589-Q0002** (multiple-answer, Select TWO) Which TWO measures help defend against prompt injection in retrieved content? (Select TWO.)

- A. Treat retrieved text as data and never as instructions in the prompt structure **(key)**  
  _Rationale:_ Correct: separating untrusted content from instructions is the core defence.
- B. Restrict tools and require approval for consequential actions **(key)**  
  _Rationale:_ Correct: least privilege limits what an injected instruction can do.
- C. Increase chunk size so instructions are diluted  
  _Rationale:_ Chunk size is not a security control.
- D. Remove citations from answers  
  _Rationale:_ Citations help users verify; removing them does not reduce injection.

**MST-0589-Q0003** (single-answer, Select ONE) Users search for exact product codes like 'XR-4471' and vector search returns similar but wrong items. What is the best improvement?

- A. Add keyword (lexical) retrieval in a hybrid search **(key)**  
  _Rationale:_ Correct: lexical matching handles exact identifiers that embeddings blur.
- B. Lower the temperature  
  _Rationale:_ Temperature affects generation, not retrieval.
- C. Use larger chunks  
  _Rationale:_ Chunk size does not fix exact-match recall.
- D. Remove metadata  
  _Rationale:_ Metadata helps filtering.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
