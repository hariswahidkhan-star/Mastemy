# Embedding Models and Semantic Similarity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0592` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Embedding Models and Semantic Similarity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what embeddings represent and choose an embedding model
2. Apply similarity metrics and nearest-neighbour search
3. Prepare and chunk text for high-quality embeddings
4. Evaluate and maintain embedding-based retrieval

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Embeddings fundamentals (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Choose an embedding model given domain, language and cost constraints; (2) Normalise vectors so cosine similarity behaves as expected
- Common misconception addressed: Assuming any two embedding models produce comparable vectors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What embeddings represent | 80 | 5 |
| M01L02 | Choosing an embedding model | 80 | 5 |
| M01L03 | Dimensionality and normalisation | 80 | 5 |

### M02 Semantic similarity (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Choose cosine vs dot-product similarity for a given setup; (2) Calibrate a similarity threshold against labelled pairs
- Common misconception addressed: Picking a fixed similarity threshold without calibrating it on real data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Distance and similarity metrics | 80 | 5 |
| M02L02 | Nearest-neighbour search | 80 | 5 |
| M02L03 | Thresholds and calibration | 80 | 5 |

### M03 Using embeddings in practice (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Chunk documents so each chunk is a coherent retrievable unit; (2) Re-embed a corpus after switching models and re-evaluate
- Common misconception addressed: Mixing vectors from different models in the same index
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Chunking and preprocessing for embeddings | 80 | 5 |
| M03L02 | Evaluating retrieval quality | 80 | 5 |
| M03L03 | Updating and re-embedding | 80 | 5 |

## Integrative case

A search feature matches user questions to a document corpus. Choose an embedding model, preprocess and chunk the documents, pick similarity metrics and thresholds, and evaluate retrieval quality before and after re-embedding.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0592-final-protected | 30 | 30 | yes |
| MST-0592-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Embeddings fundamentals | 10 |
| Semantic similarity | 10 |
| Using embeddings in practice | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0592-Q0001** (single-answer, Select ONE) You switch to a new embedding model for an existing index. What must you do?

- A. Re-embed the whole corpus with the new model; vectors from different models are not comparable **(key)**  
  _Rationale:_ Correct: embeddings from different models live in different spaces and cannot be mixed.
- B. Keep the old vectors and add new ones alongside  
  _Rationale:_ Mixing vectors from different models produces meaningless comparisons.
- C. Only re-embed the queries, not the documents  
  _Rationale:_ Queries and documents must share the same embedding space.
- D. Do nothing, since embeddings are universal  
  _Rationale:_ Embeddings are model-specific, not universal.

**MST-0592-Q0002** (multiple-answer, Select TWO) Which TWO steps improve the reliability of a similarity threshold? (Select TWO.) (Select TWO.)

- A. Calibrate the threshold against labelled relevant/irrelevant pairs **(key)**  
  _Rationale:_ Correct: calibration on real data sets a defensible cut-off.
- B. Normalise vectors so the chosen metric behaves consistently **(key)**  
  _Rationale:_ Correct: normalisation makes cosine similarity comparisons meaningful.
- C. Pick a round number and never revisit it  
  _Rationale:_ An uncalibrated fixed threshold is unreliable.
- D. Use a different metric for queries than for documents  
  _Rationale:_ Mismatched metrics make comparisons invalid.

**MST-0592-Q0003** (single-answer, Select ONE) Retrieval quality is poor even though the model is strong. What is a likely first thing to inspect?

- A. How documents are chunked and preprocessed before embedding **(key)**  
  _Rationale:_ Correct: poor chunking commonly degrades retrieval regardless of model quality.
- B. Whether the corpus has enough total pages  
  _Rationale:_ Raw size is not the usual cause of poor relevance.
- C. Whether the vectors are stored as integers  
  _Rationale:_ Storage type is not the typical cause here.
- D. Whether the model name is capitalised correctly  
  _Rationale:_ Naming is irrelevant to retrieval quality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
