# Haystack Search and RAG Pipelines

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0611` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Haystack Search and RAG Pipelines (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Haystack's component and pipeline model
2. Choose and configure a document store and indexing pipeline
3. Configure retrievers for relevant search
4. Build RAG pipelines with readers and generators
5. Evaluate pipelines and add guardrails
6. Deploy and maintain Haystack pipelines in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Haystack concepts and pipelines (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Describe how components form a pipeline; (2) Map a use case to a pipeline shape
- Common misconception addressed: Treating Haystack as a single black-box API
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Components and pipelines | 80 | 8 |
| M01L02 | Pipeline shapes for use cases | 80 | 8 |

### M02 Document stores and indexing (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Configure an indexing pipeline; (2) Pick a document store for the workload
- Common misconception addressed: Ignoring document-store fit for the workload
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Document stores | 80 | 8 |
| M02L02 | Indexing pipelines | 80 | 8 |

### M03 Retrievers and search (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Set up a dense or sparse retriever; (2) Combine retrievers for better recall
- Common misconception addressed: Assuming one retriever type fits all queries
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Dense and sparse retrievers | 80 | 8 |
| M03L02 | Combining retrievers | 80 | 8 |

### M04 Readers, generators and RAG (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Wire retrieval into a generator for RAG; (2) Ground generated answers in retrieved context
- Common misconception addressed: Generating without grounding in retrieval
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Readers and generators | 80 | 8 |
| M04L02 | Grounded RAG pipelines | 80 | 8 |

### M05 Evaluation and guardrails (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Evaluate retrieval and answer quality; (2) Add validation and safety to a pipeline
- Common misconception addressed: Shipping a pipeline with no evaluation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Pipeline evaluation | 80 | 8 |
| M05L02 | Validation and guardrails | 80 | 8 |

### M06 Deployment and maintenance (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Serve a pipeline behind an API; (2) Plan updates and monitoring
- Common misconception addressed: No monitoring or versioning in production
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Serving and scaling | 80 | 8 |
| M06L02 | Monitoring and updates | 80 | 8 |

## Integrative case

A team builds a production search-and-RAG service on Haystack. Design pipelines from components, wire document stores, retrievers and readers, add evaluation and guardrails, and deploy a maintainable pipeline, justifying component choices to the team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0611-final-protected | 40 | 40 | yes |
| MST-0611-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Haystack concepts and pipelines | 7 |
| Document stores and indexing | 7 |
| Retrievers and search | 7 |
| Readers, generators and RAG | 7 |
| Evaluation and guardrails | 6 |
| Deployment and maintenance | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0611-Q0001** (single-answer, Select ONE) In Haystack, you need retrieval followed by grounded generation. How is this best expressed?

- A. As a pipeline that connects a retriever component to a generator component **(key)**  
  _Rationale:_ Correct: Haystack composes components into a pipeline for this flow.
- B. As a single monolithic function with no components  
  _Rationale:_ That abandons Haystack's composable model.
- C. By calling the generator with no retrieval  
  _Rationale:_ That removes grounding.
- D. By indexing at query time for every request  
  _Rationale:_ Indexing per query is inefficient and wrong here.

**MST-0611-Q0002** (multiple-answer, Select TWO) Which TWO choices improve search quality in a Haystack pipeline? (Select TWO.)

- A. Combining dense and sparse retrievers for better recall **(key)**  
  _Rationale:_ Correct: hybrid retrieval often improves recall over one type.
- B. Choosing a document store suited to the workload **(key)**  
  _Rationale:_ Correct: store fit affects relevance and performance.
- C. Using one retriever for every query type without testing  
  _Rationale:_ One type rarely fits all queries.
- D. Skipping evaluation of retrieval quality  
  _Rationale:_ Without evaluation you cannot know quality improved.

**MST-0611-Q0003** (single-answer, Select ONE) A Haystack RAG pipeline is about to ship with no evaluation. What is the risk?

- A. You cannot tell whether retrieval and answers meet quality targets **(key)**  
  _Rationale:_ Correct: without evaluation, quality is unknown and unmanaged.
- B. The pipeline will not compile  
  _Rationale:_ Lack of evaluation does not break compilation.
- C. Components cannot connect  
  _Rationale:_ Evaluation is separate from wiring.
- D. It will be too fast  
  _Rationale:_ Speed is unrelated to the evaluation gap.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
