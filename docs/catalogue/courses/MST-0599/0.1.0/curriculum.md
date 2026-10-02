# Multimodal RAG for Documents, Images, and Tables

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0599` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Multimodal RAG for Documents, Images, and Tables (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what multimodal RAG adds beyond text retrieval
2. Parse documents while preserving layout and structure
3. Represent tables for faithful retrieval and reasoning
4. Represent images and figures for retrieval
5. Retrieve and fuse results across modalities
6. Ground answers and cite the correct modality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Multimodal RAG foundations (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Identify which content needs non-text handling; (2) Decide when multimodal retrieval is worth it
- Common misconception addressed: Flattening everything to plain text and losing meaning
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Text, image and table content | 80 | 8 |
| M01L02 | When multimodal retrieval pays off | 80 | 8 |

### M02 Parsing documents and layout (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Extract a table without destroying its structure; (2) Capture layout cues that carry meaning
- Common misconception addressed: Treating a PDF as a flat character stream
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Layout-aware parsing | 80 | 8 |
| M02L02 | Preserving structure and order | 80 | 8 |

### M03 Representing tables (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Choose a table representation for retrieval; (2) Preserve row/column relationships
- Common misconception addressed: Serialising a table into unreadable text
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Table representation choices | 80 | 8 |
| M03L02 | Keeping cell relationships | 80 | 8 |

### M04 Representing images and figures (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Generate useful descriptions or embeddings for figures; (2) Link a figure to its caption and context
- Common misconception addressed: Ignoring images because they are 'just pictures'
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Image and figure embeddings | 80 | 8 |
| M04L02 | Captions and surrounding context | 80 | 8 |

### M05 Cross-modal retrieval and fusion (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Combine text, table and image hits for a query; (2) Rank mixed-modality results sensibly
- Common misconception addressed: Retrieving modalities in isolation and never fusing
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cross-modal retrieval | 80 | 8 |
| M05L02 | Fusing and ranking results | 80 | 8 |

### M06 Grounding and citing multimodal answers (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Cite the specific cell or figure used; (2) Detect when a modality was misread
- Common misconception addressed: Citing the page but not the figure or cell
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Precise multimodal citations | 80 | 8 |
| M06L02 | Detecting modality errors | 80 | 8 |

## Integrative case

A RAG system must answer questions over PDFs that mix prose, scanned images and complex tables. Design a multimodal pipeline: parse and represent each modality, embed and index them, retrieve across modalities, and ground answers with citations to the right figure or cell.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0599-final-protected | 40 | 40 | yes |
| MST-0599-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Multimodal RAG foundations | 7 |
| Parsing documents and layout | 7 |
| Representing tables | 7 |
| Representing images and figures | 7 |
| Cross-modal retrieval and fusion | 6 |
| Grounding and citing multimodal answers | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0599-Q0001** (single-answer, Select ONE) A financial PDF's key numbers live in a table. The pipeline flattens tables into a single text line. What is the likely result?

- A. Row and column relationships are lost, so the model misreads which number belongs where **(key)**  
  _Rationale:_ Correct: destroying table structure corrupts the meaning of cells.
- B. Retrieval becomes perfectly accurate  
  _Rationale:_ It becomes less accurate, not more.
- C. Images are improved  
  _Rationale:_ Table flattening does not affect images.
- D. The model will reconstruct the table correctly every time  
  _Rationale:_ It cannot reliably reconstruct lost structure.

**MST-0599-Q0002** (multiple-answer, Select TWO) Which TWO practices improve retrieval over figures in documents? (Select TWO.)

- A. Generate descriptive text or embeddings that capture the figure's content **(key)**  
  _Rationale:_ Correct: a usable representation makes figures retrievable.
- B. Link each figure to its caption and surrounding context **(key)**  
  _Rationale:_ Correct: captions and context disambiguate figures.
- C. Discard all images to save space  
  _Rationale:_ That removes the information entirely.
- D. Store only the image file name  
  _Rationale:_ A file name carries no retrievable content.

**MST-0599-Q0003** (single-answer, Select ONE) A multimodal answer cites 'page 7' but the fact came from a specific table cell. How should grounding improve?

- A. Cite the specific cell or figure, not just the page, so the claim is verifiable **(key)**  
  _Rationale:_ Correct: precise multimodal citations let a reader verify the claim.
- B. Remove citations to keep answers short  
  _Rationale:_ That reduces verifiability.
- C. Cite the whole document  
  _Rationale:_ Too coarse to verify a specific number.
- D. Only cite text passages, never tables  
  _Rationale:_ The source was a table; it must be citable.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
