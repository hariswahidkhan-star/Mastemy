# Named Entity Recognition and Information Extraction

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1361` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. NER fundamentals
2. Models for extraction
3. Relations and structure
4. Evaluation and pipelines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 NER fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Annotate a sentence in BIO scheme; (2) Design an entity type set
- Common misconception addressed: Thinking entity boundaries are obvious and need no tagging scheme
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Entities, spans and tagging schemes | 120 | 8 |
| M01L02 | BIO/BILOU labelling | 120 | 8 |

### M02 Models for extraction (MASTEMY-DESIGN 25%)

- Worked applications: (1) Fine-tune a transformer for NER; (2) Prompt an LLM to extract fields
- Common misconception addressed: Assuming an off-the-shelf NER model knows your custom entity types
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sequence models and transformers for NER | 120 | 8 |
| M02L02 | Few-shot and LLM-based extraction | 120 | 8 |

### M03 Relations and structure (MASTEMY-DESIGN 25%)

- Worked applications: (1) Extract a relation between entities; (2) Link a mention to a canonical ID
- Common misconception addressed: Extracting entities but ignoring the relations that give them meaning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Relation extraction | 120 | 8 |
| M03L02 | Linking entities to a knowledge base | 120 | 8 |

### M04 Evaluation and pipelines (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compute span-level F1; (2) Route ambiguous spans to review
- Common misconception addressed: Scoring token accuracy instead of exact-span matches
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Span-level precision/recall/F1 | 120 | 8 |
| M04L02 | Handling ambiguity and human review | 120 | 8 |

## Integrative case

A legal team must pull parties, dates and obligations from contracts and link each party to a company register. Design a tagging scheme, a transformer or LLM extractor, relation extraction and entity linking, and span-level evaluation with review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1361-final-protected | 20 | 20 | yes |
| MST-1361-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| NER fundamentals | 5 |
| Models for extraction | 5 |
| Relations and structure | 5 |
| Evaluation and pipelines | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1361-Q0001** (single-answer, Select ONE) Why use a tagging scheme like BIO for NER rather than a single label per token?

- A. It marks entity boundaries, distinguishing the start and continuation of multi-token entities **(key)**  
  _Rationale:_ Correct: BIO encodes spans so adjacent entities are separable.
- B. It makes training faster  
  _Rationale:_ Speed is not the purpose of BIO.
- C. It removes the need for a model  
  _Rationale:_ A model still predicts the tags.
- D. It guarantees perfect accuracy  
  _Rationale:_ It is a labelling scheme, not an accuracy guarantee.

**MST-1361-Q0002** (multiple-answer, Select TWO) Which TWO steps turn raw entity spans into structured, usable knowledge? (Select TWO.)

- A. Relation extraction between entities **(key)**  
  _Rationale:_ Correct: relations connect entities meaningfully.
- B. Entity linking to canonical IDs in a knowledge base **(key)**  
  _Rationale:_ Correct: linking resolves mentions to real-world records.
- C. Lower-casing the document  
  _Rationale:_ A preprocessing step, not structuring.
- D. Counting total tokens  
  _Rationale:_ Not a structuring step.

**MST-1361-Q0003** (single-answer, Select ONE) A model tags 'New York Times' as [New York][Times]. A correct evaluation should:

- A. Use exact-span matching so the wrong boundary counts as an error **(key)**  
  _Rationale:_ Correct: span-level scoring reflects real extraction quality.
- B. Give full credit because the tokens overlap  
  _Rationale:_ Token overlap hides boundary errors.
- C. Ignore the error since both words appear  
  _Rationale:_ The entity is still wrong.
- D. Score only on document length  
  _Rationale:_ Length is irrelevant to correctness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
