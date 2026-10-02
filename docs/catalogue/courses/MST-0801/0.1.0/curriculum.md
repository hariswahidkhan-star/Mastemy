# Azure OpenAI + AI Search + SharePoint: Enterprise RAG

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0801` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Azure AI Search RAG overview, content preparation/chunking, hybrid + semantic ranking, and document-level security/RBAC guidance; Azure OpenAI embeddings and grounded generation). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-AZURE-AISEARCH-RAG (https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview; https://learn.microsoft.com/azure/foundry/concepts/retrieval-augmented-generation; accessed 2026-10-02) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Azure OpenAI + AI Search + SharePoint: Enterprise RAG (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design an enterprise RAG architecture over SharePoint content with Azure OpenAI and Azure AI Search
2. Prepare and chunk content and build an index with embeddings
3. Configure hybrid retrieval and semantic ranking for relevance
4. Enforce document-level security and identity-based access at retrieval time
5. Generate grounded, cited answers and handle prompt-injection risk
6. Evaluate, cost and operate the RAG system responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Architecture and data sources (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map SharePoint libraries to an indexing pipeline; (2) Decide between classic indexers and knowledge sources
- Common misconception addressed: Treating RAG as a single model call with no retrieval design
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Enterprise RAG components and data sources | 120 | 7 |
| M01L02 | Indexers, skillsets and knowledge sources | 120 | 7 |

### M02 Content preparation and indexing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Chunk large documents with overlap and add a vectorization step; (2) Choose an Azure OpenAI embedding deployment for the corpus
- Common misconception addressed: Indexing whole documents without chunking
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chunking and integrated vectorization | 120 | 7 |
| M02L02 | Building and refreshing the index | 120 | 7 |

### M03 Retrieval and ranking (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure a hybrid query combining keyword and vector search; (2) Enable semantic ranking and compare result quality
- Common misconception addressed: Assuming vector-only search always beats hybrid search
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Hybrid queries and vector parameters | 120 | 7 |
| M03L02 | Semantic ranking and scoring profiles | 120 | 7 |

### M04 Security and identity (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply document-level security trimming so finance data stays with finance; (2) Use Microsoft Entra ID roles instead of API keys for production
- Common misconception addressed: Relying on API keys and a prompt disclaimer for access control
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Document-level security and permission metadata | 120 | 7 |
| M04L02 | Entra ID RBAC and network isolation | 120 | 7 |

### M05 Grounded generation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Produce an answer that cites its retrieved passages; (2) Reduce prompt-injection risk from retrieved content with a safety system message
- Common misconception addressed: Trusting retrieved passages as safe instructions to the model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Citations and grounded answer synthesis | 120 | 7 |
| M05L02 | Treating retrieved content as untrusted input | 120 | 7 |

### M06 Evaluation, cost and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Measure retrieval relevance and answer citation rate on a test set; (2) Estimate retrieval, embedding and token costs before rollout
- Common misconception addressed: Ignoring that retrieved passages increase input tokens and cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Evaluating retrieval and answer quality | 120 | 7 |
| M06L02 | Cost, latency and operational guardrails | 120 | 7 |

## Integrative case

An enterprise wants a permission-aware assistant over its SharePoint policy library: design the index and chunking, enable hybrid retrieval with semantic ranking, enforce document-level security with Entra ID, ground and cite answers, defend against prompt injection, and evaluate quality and cost before rollout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0801-final-protected | 40 | 50 | yes |
| MST-0801-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture and data sources | 7 |
| Content preparation and indexing | 7 |
| Retrieval and ranking | 7 |
| Security and identity | 7 |
| Grounded generation | 6 |
| Evaluation, cost and operations | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0801-Q0001** (single-answer, Select ONE) Finance documents must stay accessible only to the finance team even when an executive queries the assistant. Which control enforces this in Azure AI Search?

- A. Document-level security trimming / filter-based security at query time **(key)**  
  _Rationale:_ Correct: Azure AI Search supports document-level access control so only authorized content is retrieved.
- B. A note in the system prompt asking the model to be careful  
  _Rationale:_ A prompt note does not stop unauthorized passages being retrieved.
- C. A larger embedding model  
  _Rationale:_ Embedding size is unrelated to authorization.
- D. Disabling semantic ranking  
  _Rationale:_ Ranking configuration does not control who may see a document.

**MST-0801-Q0002** (multiple-answer, Select TWO) Per Azure AI Search guidance, which TWO practices improve relevance for RAG? (Select TWO.)

- A. Use hybrid queries combining keyword and vector search **(key)**  
  _Rationale:_ Correct: hybrid search maximises recall by running keyword and vector queries in parallel.
- B. Apply semantic ranking to reorder top results **(key)**  
  _Rationale:_ Correct: semantic ranking identifies the most relevant results.
- C. Index whole documents without chunking  
  _Rationale:_ Chunking lets portions be matched independently; indexing whole documents hurts relevance.
- D. Return every field for every match  
  _Rationale:_ Returning everything inflates tokens without improving relevance.

**MST-0801-Q0003** (single-answer, Select ONE) Why should retrieved passages be treated as untrusted input in an enterprise RAG system?

- A. They can carry prompt-injection content that manipulates the model **(key)**  
  _Rationale:_ Correct: Microsoft guidance says to treat retrieved content as untrusted and reduce prompt-injection risk via the system message and logic.
- B. They are always out of date  
  _Rationale:_ Freshness is a separate concern from trust.
- C. They cannot be cited  
  _Rationale:_ Retrieved passages are exactly what citations point to.
- D. They increase embedding dimensionality  
  _Rationale:_ Passages do not change embedding dimensionality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
