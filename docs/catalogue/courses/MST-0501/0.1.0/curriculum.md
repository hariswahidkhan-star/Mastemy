# OpenAI Retrieval and File-Search Application Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0501` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Retrieval and File-Search Application Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how retrieval and file search ground model responses in your documents
2. Prepare, chunk and index documents for file search
3. Design queries and result handling for a retrieval application
4. Evaluate retrieval quality and handle citations and failures

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Preparing documents, building an index and running a retrieval application are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Retrieval foundations (25%)

- Worked applications: (1) Decide whether a task needs retrieval or a fixed prompt; (2) Identify what belongs in the indexed corpus
- Common misconception addressed: Believing retrieval removes the need to verify answers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why ground responses in documents | 120 | 6 |
| M01L02 | How file search works | 120 | 6 |

### M02 Preparing and indexing documents (25%)

- Worked applications: (1) Choose chunk boundaries for a mixed set of PDFs; (2) Plan an index refresh when documents change
- Common misconception addressed: Indexing a whole document as one chunk and expecting precise retrieval
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chunking and metadata | 120 | 6 |
| M02L02 | Building and refreshing an index | 120 | 6 |

### M03 Query and result design (25%)

- Worked applications: (1) Rewrite a vague user question into a retrieval query; (2) Decide how many results to pass to the model
- Common misconception addressed: Passing every retrieved chunk to the model regardless of relevance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Shaping queries | 120 | 6 |
| M03L02 | Handling and presenting results | 120 | 6 |

### M04 Evaluation and citations (25%)

- Worked applications: (1) Build a small set of question and expected-source pairs; (2) Handle a query with no relevant document
- Common misconception addressed: Trusting a confident answer that cites no source
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measuring retrieval quality | 120 | 6 |
| M04L02 | Citations and failure handling | 120 | 6 |

## Integrative case

A company builds a policy-and-procedures assistant over its internal documents: the team decides what to index, chunks documents with metadata, shapes queries, limits the results passed to the model, shows citations, and evaluates retrieval against expected-source pairs before launch.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0501-final-protected | 72 | 72 | yes |
| MST-0501-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Retrieval foundations | 18 |
| Preparing and indexing documents | 18 |
| Query and result design | 18 |
| Evaluation and citations | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0501-Q0001** (single-answer, Select ONE) What problem does retrieval (file search) solve for an LLM application?

- A. It grounds responses in your own documents instead of relying only on the model's training **(key)**  
  _Rationale:_ Correct: retrieval supplies relevant source text so answers are grounded.
- B. It makes the model respond faster in every case  
  _Rationale:_ Retrieval adds a lookup step; speed is not its purpose.
- C. It removes the need to verify any answer  
  _Rationale:_ Grounded answers still require verification against sources.
- D. It eliminates all token costs  
  _Rationale:_ Retrieval does not remove token costs.

**MST-0501-Q0002** (single-answer, Select ONE) Why is chunking documents (rather than indexing each whole document) important for file search?

- A. Smaller, well-bounded chunks let retrieval return the precise relevant passage **(key)**  
  _Rationale:_ Correct: good chunks improve retrieval precision.
- B. It permanently reduces the number of documents  
  _Rationale:_ Chunking splits content; it does not reduce the document set.
- C. It makes citations unnecessary  
  _Rationale:_ Citations remain important regardless of chunking.
- D. It guarantees the model never makes an error  
  _Rationale:_ Chunking improves retrieval but does not guarantee correctness.

**MST-0501-Q0003** (multiple-answer, Select TWO) Which TWO practices improve the reliability of a retrieval application? (Select TWO)

- A. Show citations to the source passages used **(key)**  
  _Rationale:_ Correct: citations let users verify grounded answers.
- B. Evaluate retrieval against question and expected-source pairs **(key)**  
  _Rationale:_ Correct: evaluation measures whether the right sources are found.
- C. Pass every retrieved chunk to the model regardless of relevance  
  _Rationale:_ Irrelevant chunks add noise and cost.
- D. Trust any confident answer even when no source is returned  
  _Rationale:_ A confident answer with no source is a failure mode, not reliability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
