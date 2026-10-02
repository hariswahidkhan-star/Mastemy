# RAG Access Control and Permission-Aware Retrieval

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0598` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG Access Control and Permission-Aware Retrieval (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how retrieval can leak data without access control
2. Model identity and authorisation for retrieval
3. Index documents with the metadata needed for filtering
4. Enforce access filters during retrieval
5. Isolate tenants and prevent cross-tenant retrieval
6. Test and audit that access control holds

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why access control matters in RAG (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Trace how a naive index leaks restricted docs; (2) Identify where permissions must be enforced
- Common misconception addressed: Assuming the LLM will withhold restricted content
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Leakage risks in retrieval | 80 | 8 |
| M01L02 | Where to enforce permissions | 80 | 8 |

### M02 Identity and authorisation model (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Map users and groups to document permissions; (2) Propagate the caller's identity to retrieval
- Common misconception addressed: Using a single service identity for all users
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Identity and group modelling | 80 | 8 |
| M02L02 | Propagating identity to retrieval | 80 | 8 |

### M03 Permission-aware indexing (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Attach access metadata at index time; (2) Keep permission metadata in sync with the source
- Common misconception addressed: Indexing content without access metadata
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Access metadata at index time | 80 | 8 |
| M03L02 | Keeping permissions in sync | 80 | 8 |

### M04 Filtering retrieval by permission (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Apply pre-filters so only allowed docs are retrieved; (2) Avoid post-hoc filtering that still exposes data
- Common misconception addressed: Filtering only after the model sees the text
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Pre-filtering vs post-filtering | 80 | 8 |
| M04L02 | Enforcing least privilege in retrieval | 80 | 8 |

### M05 Multi-tenancy and isolation (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Design per-tenant isolation in the index; (2) Prevent a query crossing tenant boundaries
- Common misconception addressed: Sharing one index across tenants with no isolation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Tenant isolation patterns | 80 | 8 |
| M05L02 | Preventing cross-tenant leakage | 80 | 8 |

### M06 Testing and auditing access (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Write a test that proves a user cannot retrieve restricted docs; (2) Audit retrieval access over time
- Common misconception addressed: Shipping without negative access tests
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Negative access tests | 80 | 8 |
| M06L02 | Auditing retrieval access | 80 | 8 |

## Integrative case

An enterprise RAG assistant must answer from documents a user is allowed to see and never leak restricted content. Design permission-aware retrieval: identity propagation, document-level access filters, secure indexing, and tests that prove no cross-tenant or over-privileged leakage.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0598-final-protected | 40 | 40 | yes |
| MST-0598-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why access control matters in RAG | 7 |
| Identity and authorisation model | 7 |
| Permission-aware indexing | 7 |
| Filtering retrieval by permission | 7 |
| Multi-tenancy and isolation | 6 |
| Testing and auditing access | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0598-Q0001** (single-answer, Select ONE) A RAG system filters out restricted documents only after they are placed in the prompt. Why is this unsafe?

- A. The restricted content has already entered the context and can leak into the answer **(key)**  
  _Rationale:_ Correct: once in context, restricted text can surface; filter before retrieval.
- B. Post-filtering is faster but always correct  
  _Rationale:_ It is not correct; the data is already exposed.
- C. The model encrypts restricted text automatically  
  _Rationale:_ Models do not encrypt context.
- D. Filtering order never matters  
  _Rationale:_ Order is exactly what matters here.

**MST-0598-Q0002** (multiple-answer, Select TWO) Which TWO are required for permission-aware retrieval? (Select TWO.)

- A. Access metadata attached to documents at index time **(key)**  
  _Rationale:_ Correct: filtering needs permission metadata on documents.
- B. Propagating the calling user's identity to the retrieval query **(key)**  
  _Rationale:_ Correct: the query must know who is asking.
- C. Using one shared service identity for every user  
  _Rationale:_ That erases per-user permissions.
- D. Raising the number of retrieved chunks  
  _Rationale:_ Chunk count does not enforce access.

**MST-0598-Q0003** (single-answer, Select ONE) Before launch, what best demonstrates that access control works?

- A. Negative tests proving a user cannot retrieve documents they lack permission for **(key)**  
  _Rationale:_ Correct: negative access tests prove enforcement.
- B. A demo where an admin sees everything  
  _Rationale:_ Admin access does not test restriction.
- C. High retrieval latency  
  _Rationale:_ Latency is unrelated to access correctness.
- D. A large embedding model  
  _Rationale:_ Model size does not enforce access.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
