# Claude for Long-Document Review and Cross-Document Comparison

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0519` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-LONGDOC |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude for Long-Document Review and Cross-Document Comparison (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate a long document and extract structure before summarising
2. Extract claims that stay grounded in and traceable to the source
3. Compare documents systematically and locate genuine disagreements
4. Verify cross-document claims and quotations against originals
5. Produce a cited reconciliation that flags unresolved conflicts

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Working with long documents (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Load a long document and request a structured outline; (2) Decide what to extract before asking for a summary
- Common misconception addressed: Asking for a summary of a long document without specifying what matters
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Loading and navigating a long document | 72 | 5 |
| M01L02 | Structured extraction versus a vague summary | 72 | 5 |

### M02 Extraction and grounding (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Extract claims with pointers back to the source passage; (2) Distinguish the document's claims from Claude's inferences
- Common misconception addressed: Accepting an inference as if it were stated in the document
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Claim extraction with source pointers | 96 | 5 |
| M02L02 | Separating stated claims from inference | 96 | 5 |

### M03 Cross-document comparison (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compare three documents and build an agreement/conflict matrix; (2) Pinpoint where two documents genuinely disagree
- Common misconception addressed: Reporting a wording difference as a substantive disagreement
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Comparing multiple documents systematically | 80 | 5 |
| M03L02 | Agreement and conflict matrices | 80 | 5 |
| M03L03 | Resolving apparent versus real conflicts | 80 | 5 |

### M04 Verification across sources (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Verify each key passage against the original document; (2) Confirm a quoted passage is accurate and in context
- Common misconception addressed: Trusting a cross-document quote without opening the original
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Verifying passages against originals | 96 | 5 |
| M04L02 | Quotes, context and misattribution | 96 | 5 |

### M05 Reconciled output (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Produce a reconciled summary with citations to each source; (2) Flag unresolved conflicts for a human decision
- Common misconception addressed: Presenting a tidy reconciliation that hides unresolved conflicts
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Writing a cited, reconciled summary | 96 | 5 |
| M05L02 | Flagging what remains unresolved | 96 | 5 |

## Integrative case

A policy analyst must reconcile three long reports: load them into a Project, extract each document's claims, compare where they agree and conflict, verify key passages against the originals, and produce a reconciled summary with citations.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0519-final-protected | 30 | 40 | yes |
| MST-0519-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Working with long documents | 5 |
| Extraction and grounding | 6 |
| Cross-document comparison | 7 |
| Verification across sources | 6 |
| Reconciled output | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0519-Q0001** (single-answer, Select ONE) When comparing long documents, Claude reports that two reports 'disagree'. What should you check before accepting that?

- A. Whether the difference is substantive or only a wording variation **(key)**  
  _Rationale:_ Correct: apparent conflicts are often wording differences, not real disagreement.
- B. Which report is longer  
  _Rationale:_ Length does not determine substantive conflict.
- C. Which report Claude read first  
  _Rationale:_ Reading order is irrelevant.
- D. Nothing; Claude's judgement is final  
  _Rationale:_ Claimed conflicts must be verified against the sources.

**MST-0519-Q0002** (multiple-answer, Select TWO) Which TWO practices keep a long-document extraction trustworthy? (Select TWO.)

- A. Attaching a pointer to the source passage for each extracted claim **(key)**  
  _Rationale:_ Correct: source pointers let you verify each claim.
- B. Distinguishing the document's claims from Claude's inferences **(key)**  
  _Rationale:_ Correct: inferences must not be presented as stated facts.
- C. Accepting inferences as if the document stated them  
  _Rationale:_ That blurs claim and inference and is unsafe.
- D. Dropping citations to shorten the output  
  _Rationale:_ Removing citations removes traceability.

**MST-0519-Q0003** (single-answer, Select ONE) Claude presents a quotation drawn from one of the source reports. What is the safe next step?

- A. Open the original and confirm the quote and its context **(key)**  
  _Rationale:_ Correct: quotations can be inaccurate or out of context and must be checked.
- B. Paste it into the summary unchecked  
  _Rationale:_ Unverified quotations can mislead.
- C. Assume the quote is verbatim  
  _Rationale:_ Models can paraphrase or misattribute quotes.
- D. Shorten the quote to fit  
  _Rationale:_ Editing before verifying risks distorting it further.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
