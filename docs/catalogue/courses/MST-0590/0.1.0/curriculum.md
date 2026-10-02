# RAG Data Ingestion and Document Normalization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0590` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral RAG engineering practice. No single official issuer syllabus exists; concepts are cross-checked against general industry practice. Specific vendor product claims are DESIGN ASSUMPTION pending an official check against each vendor's documentation. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-RAG-INGESTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG Data Ingestion and Document Normalization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the role of ingestion and normalization in a RAG system
2. Extract text and structure from varied source formats
3. Normalize and clean documents for reliable downstream retrieval
4. Capture source metadata needed for traceability
5. Diagnose ingestion faults that degrade retrieval quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot grade a working ingestion pipeline; pipeline building is taught through worked examples and code walkthroughs.

## Modules

### M01 Ingestion in the RAG pipeline (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Trace a document from source to retrievable unit; (2) Decide what to ingest and what to exclude
- Common misconception addressed: Treating ingestion as a trivial copy step rather than a quality gate
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where ingestion fits in RAG | 72 | 5 |
| M01L02 | What good and bad ingestion look like | 72 | 5 |

### M02 Extracting from varied formats (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Extract text from a mixed PDF and HTML set; (2) Handle tables and multi-column layouts
- Common misconception addressed: Assuming every PDF yields clean, ordered text
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Text extraction across formats | 96 | 5 |
| M02L02 | Tables, layout and non-text content | 96 | 5 |

### M03 Normalization and cleaning (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Normalize encoding, whitespace and headings; (2) Remove boilerplate without losing meaning
- Common misconception addressed: Over-cleaning so that meaningful structure is destroyed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Encoding, whitespace and structure | 80 | 5 |
| M03L02 | Boilerplate removal and de-duplication | 80 | 5 |
| M03L03 | Preserving meaningful structure | 80 | 5 |

### M04 Source metadata (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Attach source, date and section metadata to units; (2) Design metadata that supports later citation
- Common misconception addressed: Dropping provenance so answers cannot be traced
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Metadata that supports traceability | 96 | 5 |
| M04L02 | Designing a metadata schema | 96 | 5 |

### M05 Diagnosing ingestion faults (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Find why one document type yields empty text; (2) Add a validation check to catch silent failures
- Common misconception addressed: Shipping an ingestion job with no validation of its output
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Common ingestion failure modes | 96 | 5 |
| M05L02 | Validation and monitoring of ingestion | 96 | 5 |

## Integrative case

An analyst builds the ingestion stage for a policy-document assistant: extract text from mixed PDFs and HTML, normalize encoding and headings, attach source and date metadata, and fix the two document types that were silently producing empty text.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0590-final-protected | 30 | 40 | yes |
| MST-0590-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ingestion in the RAG pipeline | 5 |
| Extracting from varied formats | 6 |
| Normalization and cleaning | 7 |
| Source metadata | 6 |
| Diagnosing ingestion faults | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0590-Q0001** (single-answer, Select ONE) After ingestion, answers about one PDF type are always wrong or empty. The most likely root cause is:

- A. Text extraction silently failed for that PDF type, so no content was indexed **(key)**  
  _Rationale:_ Correct: failed extraction leaves empty units, so retrieval has nothing to find.
- B. The language model is too small  
  _Rationale:_ The content was never indexed; model size is not the cause.
- C. The user's question is too polite  
  _Rationale:_ Phrasing does not explain systematically empty content.
- D. The vector store is too fast  
  _Rationale:_ Speed is unrelated to missing extracted text.

**MST-0590-Q0002** (multiple-answer, Select TWO) Which TWO metadata fields best support later citation and traceability? (Select TWO.)

- A. Source document identifier **(key)**  
  _Rationale:_ Correct: a source identifier lets an answer point back to its origin.
- B. Section or page reference **(key)**  
  _Rationale:_ Correct: a section reference supports precise, checkable citation.
- C. The server's CPU temperature  
  _Rationale:_ Irrelevant to traceability.
- D. A random UUID with no mapping to the source  
  _Rationale:_ An unmapped id does not aid tracing to the real source.

**MST-0590-Q0003** (single-answer, Select ONE) Aggressive cleaning stripped all headings and lists from documents. What is the likely downstream effect?

- A. Loss of structure that hurts chunking and retrieval relevance **(key)**  
  _Rationale:_ Correct: meaningful structure aids chunking and retrieval; destroying it degrades quality.
- B. Faster and strictly better answers  
  _Rationale:_ Removing useful structure does not improve answers.
- C. No effect at all  
  _Rationale:_ Structure loss measurably affects downstream stages.
- D. Improved source citation  
  _Rationale:_ Citation depends on preserved structure and metadata, not its removal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
