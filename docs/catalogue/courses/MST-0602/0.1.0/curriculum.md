# Enterprise RAG with SharePoint and Microsoft Data

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0602` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure AI Search documentation read via the Microsoft Learn MCP on 2026-10-02: the RAG pattern in Azure AI Search, indexers and skillsets, the SharePoint in Microsoft 365 indexer and the indexed/remote SharePoint knowledge sources, and document-level security trimming via Microsoft Entra ID permission metadata. SharePoint knowledge-source features are marked preview by Microsoft; the version table records this before production. |
| Official sources | https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview; https://learn.microsoft.com/azure/search/search-how-to-index-sharepoint-online; https://learn.microsoft.com/azure/search/agentic-knowledge-source-how-to-sharepoint-indexed |
| Evidence | **vendor-docs-partial** - official Microsoft documentation read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AISEARCH-SHAREPOINT-RAG |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Enterprise RAG with SharePoint and Microsoft Data (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the RAG pattern and the challenges Azure AI Search addresses
2. Configure an indexer and skillset to ingest and chunk SharePoint content
3. Choose between indexed and remote SharePoint knowledge sources for a scenario
4. Apply permission-aware retrieval so users see only authorised content
5. Evaluate and tune retrieval relevance for an enterprise RAG solution

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 RAG with Azure AI Search (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a business question to the RAG challenges it exposes; (2) Decide between classic and agentic retrieval for a scenario
- Common misconception addressed: Believing RAG removes the need for access control on source content
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The RAG pattern and its challenges | 96 | 6 |
| M01L02 | Classic vs agentic retrieval | 96 | 6 |
### M02 Ingesting SharePoint content (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Configure a SharePoint indexer with a chunking skillset; (2) Set incremental indexing and reason about a renamed folder
- Common misconception addressed: Expecting incremental indexing to survive a SharePoint folder rename
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Indexers, data sources and skillsets | 96 | 6 |
| M02L02 | Chunking and vectorising documents | 96 | 6 |
### M03 Knowledge sources (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose indexed vs remote knowledge source for sensitive content; (2) Assemble a knowledge base referencing two knowledge sources
- Common misconception addressed: Treating indexed and remote SharePoint sources as interchangeable
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Indexed SharePoint knowledge source | 96 | 6 |
| M03L02 | Remote SharePoint knowledge source | 96 | 6 |
### M04 Permission-aware retrieval (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design security trimming so finance data stays with finance; (2) Verify an executive query returns only authorised documents
- Common misconception addressed: Assuming an LLM will keep data private without retrieval-time access control
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Security trimming and Entra ID metadata | 96 | 6 |
| M04L02 | Honouring SharePoint permissions | 96 | 6 |
### M05 Relevance and evaluation (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Tune hybrid search and semantic ranking for a query set; (2) Evaluate answer groundedness against retrieved citations
- Common misconception addressed: Judging RAG quality only by fluent wording, not by grounding
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Hybrid search and semantic ranking | 96 | 6 |
| M05L02 | Evaluating grounded answers | 96 | 6 |

## Integrative case

An enterprise wants a permission-aware assistant over HR and finance content in SharePoint: design the RAG pipeline in Azure AI Search, ingest and chunk the documents, choose indexed vs remote knowledge sources, enforce security trimming so each user sees only authorised content, and evaluate grounded answers against citations.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0602-final-protected | 30 | 40 | yes |
| MST-0602-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| RAG with Azure AI Search | 6 |
| Ingesting SharePoint content | 6 |
| Knowledge sources | 6 |
| Permission-aware retrieval | 6 |
| Relevance and evaluation | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0602-Q0001** (single-answer, Select ONE) An executive asks the RAG chatbot a finance question they are not authorised to see. What design prevents leakage?

- A. Document-level security trimming that honours Entra ID permission metadata at query time **(key)**  
  _Rationale:_ Correct: retrieval must enforce access control so only authorised content is returned.
- B. A longer system prompt asking the model to be careful  
  _Rationale:_ Prompts do not enforce document permissions.
- C. Increasing the number of retrieved chunks  
  _Rationale:_ Returning more content worsens the leak.
- D. Disabling semantic ranking  
  _Rationale:_ Ranking settings do not control authorisation.
**MST-0602-Q0002** (multiple-answer, Select TWO) Which TWO are accurate about Azure AI Search for RAG per the documentation? (Select TWO.)

- A. Indexers pull from data sources and can drive skillsets for chunking and vectorisation **(key)**  
  _Rationale:_ Correct: the indexer plus skillset pipeline ingests and enriches content.
- B. A remote SharePoint knowledge source queries SharePoint without building a search index **(key)**  
  _Rationale:_ Correct: the remote knowledge source queries SharePoint directly and enforces its permission model.
- C. RAG eliminates the need for any relevance tuning  
  _Rationale:_ Relevance tuning (hybrid search, semantic ranking) remains important.
- D. Renaming a SharePoint folder has no effect on incremental indexing  
  _Rationale:_ A renamed folder breaks incremental indexing and is treated as new content.
**MST-0602-Q0003** (single-answer, Select ONE) For a scenario that must avoid replicating sensitive documents into a search index, which option fits best?

- A. A remote SharePoint knowledge source that queries content in place **(key)**  
  _Rationale:_ Correct: the remote source queries SharePoint directly with no index copy and honours its permissions.
- B. Copying all documents into a public blob container  
  _Rationale:_ That replicates and exposes sensitive data.
- C. Emailing the documents to the model  
  _Rationale:_ That is neither a retrieval pattern nor secure.
- D. Disabling permissions to simplify indexing  
  _Rationale:_ Removing permissions defeats the security requirement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
