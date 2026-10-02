# RAG for Financial Statements and Regulatory Documents

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0603` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — RAG for Financial Statements and Regulatory Documents (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what makes financial/regulatory RAG hard
2. Parse filings while preserving structure and figures
3. Chunk and tag documents for precise retrieval
4. Retrieve the right version for a point in time
5. Ground every figure and refuse on weak evidence
6. Apply review and compliance controls to financial answers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Financial and regulatory document challenges (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Identify structure and date pitfalls in a filing; (2) Spot where a wrong figure causes real harm
- Common misconception addressed: Treating a filing like generic prose
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Structure, tables and footnotes | 80 | 8 |
| M01L02 | Effective dates and versions | 80 | 8 |

### M02 Parsing filings and tables (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Extract a figure with its table context; (2) Keep footnotes linked to the right line
- Common misconception addressed: Losing units or scale (thousands vs millions)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Structured parsing of filings | 80 | 8 |
| M02L02 | Footnotes, units and scale | 80 | 8 |

### M03 Chunking and metadata for finance (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Chunk by section while keeping context; (2) Tag chunks with date, entity and document type
- Common misconception addressed: Chunking that splits a figure from its label
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Structure-aware chunking | 80 | 8 |
| M03L02 | Date, entity and type metadata | 80 | 8 |

### M04 Time-aware and versioned retrieval (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Answer 'as of' a specific reporting period; (2) Avoid mixing figures across periods
- Common misconception addressed: Returning the latest figure for a historical question
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Point-in-time retrieval | 80 | 8 |
| M04L02 | Avoiding cross-period mixing | 80 | 8 |

### M05 Grounding, citation and refusal (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Cite the exact source for each number; (2) Refuse or hedge when evidence is insufficient
- Common misconception addressed: Producing a confident number with no source
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Figure-level grounding and citation | 80 | 8 |
| M05L02 | Refusing on insufficient evidence | 80 | 8 |

### M06 Risk, review and compliance (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Add a human review gate for high-stakes answers; (2) Log evidence for audit
- Common misconception addressed: Treating the assistant's output as advice
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Human review for high stakes | 80 | 8 |
| M06L02 | Audit logging and disclaimers | 80 | 8 |

## Integrative case

A RAG assistant answers questions over 10-K filings, prospectuses and regulatory notices. Design retrieval that respects document structure and effective dates, grounds every figure to its source, handles tables and footnotes, and refuses when evidence is insufficient.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0603-final-protected | 40 | 40 | yes |
| MST-0603-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Financial and regulatory document challenges | 7 |
| Parsing filings and tables | 7 |
| Chunking and metadata for finance | 7 |
| Time-aware and versioned retrieval | 7 |
| Grounding, citation and refusal | 6 |
| Risk, review and compliance | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0603-Q0001** (single-answer, Select ONE) A user asks for a company's revenue 'as of fiscal 2022' but the system returns the latest year's figure. What is the failure?

- A. Retrieval is not time-aware, so it ignored the requested reporting period **(key)**  
  _Rationale:_ Correct: point-in-time retrieval must honour the requested period.
- B. The embedding model is too large  
  _Rationale:_ Model size is not the issue.
- C. The user asked an impossible question  
  _Rationale:_ The question is answerable with time-aware retrieval.
- D. Revenue is never in filings  
  _Rationale:_ Revenue is a standard filing figure.

**MST-0603-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce wrong-number answers from financial filings? (Select TWO.)

- A. Preserve units and scale (e.g. thousands vs millions) during parsing **(key)**  
  _Rationale:_ Correct: lost scale produces order-of-magnitude errors.
- B. Ground each figure to its exact source and refuse on weak evidence **(key)**  
  _Rationale:_ Correct: figure-level grounding plus refusal prevents confident wrong answers.
- C. Strip tables to plain sentences  
  _Rationale:_ That destroys the structure figures depend on.
- D. Always return the most recent figure  
  _Rationale:_ That ignores the requested period.

**MST-0603-Q0003** (single-answer, Select ONE) The assistant produces a precise figure but cannot point to a source passage. What should it do?

- A. Refuse or hedge, since an ungrounded figure is not trustworthy in this domain **(key)**  
  _Rationale:_ Correct: in high-stakes finance, ungrounded numbers must not be asserted.
- B. State the number confidently anyway  
  _Rationale:_ Confidence without grounding is unsafe here.
- C. Round the number and present it  
  _Rationale:_ Rounding does not fix the lack of evidence.
- D. Ask the model to estimate from memory  
  _Rationale:_ Estimation invites fabrication.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
