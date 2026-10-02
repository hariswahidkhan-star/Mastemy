# Azure AI Search: Secure Enterprise Retrieval

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0698` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure AI Search documentation read via the Microsoft Learn MCP on 2026-10-02 (vector, keyword and hybrid search; semantic ranking; RAG grounding; document-level access control; private endpoints; managed identity). Preview features and portal UI change and must be confirmed before production. |
| Official sources | https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview; https://learn.microsoft.com/azure/search/vector-search-overview; https://learn.microsoft.com/azure/search/search-security-best-practices; https://learn.microsoft.com/azure/search/search-document-level-access-overview |
| Evidence | **verified-official-source** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZURE-AI-SEARCH |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure AI Search: Secure Enterprise Retrieval (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe how Azure AI Search supports enterprise retrieval and RAG
2. Choose keyword, vector or hybrid search for a need
3. Use semantic ranking and relevance tuning appropriately
4. Enforce document-level access and network isolation
5. Connect search securely to grounding and embedding services

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate a deployed, secured search index; configuration is taught through demonstrations and walkthroughs.

## Modules

### M01 Search for enterprise retrieval (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Map a RAG need to Azure AI Search's role; (2) Explain how search grounds a generation step
- Common misconception addressed: Treating the language model as the retriever instead of the search index
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Azure AI Search in a RAG pattern | 72 | 5 |
| M01L02 | Indexes as grounding data | 72 | 5 |

### M02 Query types (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose keyword, vector or hybrid for three needs; (2) Explain when hybrid beats pure vector
- Common misconception addressed: Assuming vector search always beats keyword for exact codes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Keyword, vector and hybrid search | 96 | 5 |
| M02L02 | Filtered and multimodal scenarios | 96 | 5 |

### M03 Relevance and ranking (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Apply semantic ranking to improve top results; (2) Use scoring and select fields to control responses
- Common misconception addressed: Returning exhaustive document dumps instead of the most relevant chunks
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Semantic ranking and relevance | 80 | 5 |
| M03L02 | Scoring profiles and result shaping | 80 | 5 |
| M03L03 | Keeping responses concise for token limits | 80 | 5 |

### M04 Security and access (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Enforce document-level access for restricted content; (2) Disable public access and add a private endpoint
- Common misconception addressed: Relying on the prompt to hide data the index still returns to anyone
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Document-level access control | 96 | 5 |
| M04L02 | Network isolation and private endpoints | 96 | 5 |

### M05 Secure connections (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Connect to an embedding model using managed identity; (2) Enable trusted-service access between resources
- Common misconception addressed: Wiring services together with shared keys instead of managed identity
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Managed identity and RBAC between services | 96 | 5 |
| M05L02 | Trusted service and secure outbound connections | 96 | 5 |

## Integrative case

A team builds a secure internal assistant on Azure AI Search: index policy documents with hybrid search and semantic ranking, enforce document-level access so finance content stays restricted, disable public access with a private endpoint, and connect the embedding model over a managed identity.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0698-final-protected | 30 | 40 | yes |
| MST-0698-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Search for enterprise retrieval | 5 |
| Query types | 6 |
| Relevance and ranking | 7 |
| Security and access | 6 |
| Secure connections | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0698-Q0001** (single-answer, Select ONE) An executive asks the assistant a question and it returns finance documents they should not see. What control prevents this?

- A. Document-level access control enforced at query time **(key)**  
  _Rationale:_ Correct: document-level access trims results to what the user is authorised to see, even when they ask.
- B. A longer system prompt asking the model to be careful  
  _Rationale:_ Prompt wording does not reliably enforce authorisation on retrieved documents.
- C. A faster pricing tier  
  _Rationale:_ Performance tiers do not enforce access.
- D. Disabling semantic ranking  
  _Rationale:_ Ranking affects ordering, not authorisation.

**MST-0698-Q0002** (multiple-answer, Select TWO) Which TWO are reasons to use hybrid search in Azure AI Search? (Select TWO.)

- A. Exact terms and identifiers must match precisely **(key)**  
  _Rationale:_ Correct: keyword matching captures exact codes that vectors may miss.
- B. Semantic paraphrases of a question must also match **(key)**  
  _Rationale:_ Correct: vector search captures meaning beyond exact wording.
- C. You want to return every document in full  
  _Rationale:_ RAG needs concise, relevant results, not full dumps.
- D. You want to remove access controls  
  _Rationale:_ Access control is unrelated to the hybrid-search rationale.

**MST-0698-Q0003** (single-answer, Select ONE) Microsoft's guidance for Azure AI Search connecting to an Azure OpenAI embedding model with public access disabled is to:

- A. Use the search service's managed identity as a trusted service **(key)**  
  _Rationale:_ Correct: managed identity plus trusted-service access lets the services connect without public access or shared keys.
- B. Re-enable public access permanently  
  _Rationale:_ That defeats the network isolation goal.
- C. Share an API key in the index definition  
  _Rationale:_ Embedding keys in definitions is the pattern managed identity replaces.
- D. Return all documents unfiltered  
  _Rationale:_ Unrelated to the secure-connection question.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
