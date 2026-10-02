# Claude Document Processing with Citations and Evidence

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0548` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude documentation on document processing and the citations capability; the egress proxy blocks docs.anthropic.com this session, so no official page was read. Citation field structure, supported document formats and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-DOC-CITATIONS |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Document Processing with Citations and Evidence (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Pass documents to Claude and ask grounded questions over them
2. Enable and interpret citations that point back to source spans
3. Verify an answer against its cited evidence
4. Handle long or multi-document inputs responsibly
5. Design a document workflow that surfaces unsupported claims

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Documents in context (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Ask a factual question answerable only from a supplied document; (2) Distinguish a grounded answer from a general-knowledge guess
- Common misconception addressed: Assuming any answer is grounded just because a document was attached
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Supplying documents to Claude | 96 | 6 |
| M01L02 | Asking grounded questions | 96 | 6 |
### M02 Citations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Trace a cited claim to the exact source passage; (2) Spot a claim that carries no citation
- Common misconception addressed: Treating a confident claim without a citation as evidenced
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Enabling citations | 96 | 6 |
| M02L02 | Reading a citation back to source | 96 | 6 |
### M03 Verifying answers (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Verify three figures against their cited spans; (2) Flag and handle a claim the document does not support
- Common misconception addressed: Accepting a cited-looking reference without opening the source
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | A verification routine for cited output | 96 | 6 |
| M03L02 | Flagging unsupported claims | 96 | 6 |
### M04 Long and multi-document inputs (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Select the relevant sections of a long contract for a question; (2) Answer across two documents and cite each correctly
- Common misconception addressed: Pasting an entire corpus when only a section is relevant
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Chunking and selecting relevant parts | 96 | 6 |
| M04L02 | Multiple documents at once | 96 | 6 |
### M05 Designing the workflow (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Design an output that separates supported from unsupported statements; (2) Record the evidence trail for a reviewer
- Common misconception addressed: Producing a summary with no way to check which claims are sourced
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Surfacing unsupported claims | 96 | 6 |
| M05L02 | Recording evidence for review | 96 | 6 |

## Integrative case

An analyst must answer due-diligence questions over a set of contracts using Claude: supply the documents, enable citations, verify every figure against its cited span, flag claims the documents do not support, and hand a reviewer an evidence trail. All citation-field specifics are flagged for official verification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0548-final-protected | 30 | 40 | yes |
| MST-0548-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Documents in context | 6 |
| Citations | 6 |
| Verifying answers | 6 |
| Long and multi-document inputs | 6 |
| Designing the workflow | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0548-Q0001** (single-answer, Select ONE) Claude returns a confident figure from a supplied report but no citation points to it. How should you treat the figure?

- A. As unverified until it is traced to a source passage **(key)**  
  _Rationale:_ Correct: an uncited claim must be verified before reuse.
- B. As confirmed because the tone is confident  
  _Rationale:_ Confidence is not evidence.
- C. As automatically correct because a document was attached  
  _Rationale:_ Attachment does not guarantee grounding of a specific claim.
- D. As irrelevant and discard it without checking  
  _Rationale:_ It may be correct; it must be checked, not dropped blindly.
**MST-0548-Q0002** (multiple-answer, Select TWO) Which TWO steps verify a cited answer? (Select TWO.)

- A. Open the cited span and confirm it supports the claim **(key)**  
  _Rationale:_ Correct: tracing to the source is the core verification step.
- B. Flag any claim that lacks a citation **(key)**  
  _Rationale:_ Correct: uncited claims must be surfaced for checking.
- C. Assume the citation is correct because it looks like a reference  
  _Rationale:_ A reference-shaped citation can still be wrong.
- D. Delete the document after reading the answer  
  _Rationale:_ The source is needed to verify.
**MST-0548-Q0003** (single-answer, Select ONE) For a single question about one clause in a 200-page contract, what is the better input strategy?

- A. Select the relevant sections rather than pasting the whole corpus indiscriminately **(key)**  
  _Rationale:_ Correct: targeted relevant context improves grounding and cost.
- B. Always paste every document you have  
  _Rationale:_ Irrelevant bulk context hurts grounding and cost.
- C. Ask without any document  
  _Rationale:_ Then the answer cannot be grounded in the contract.
- D. Summarise from memory instead of the source  
  _Rationale:_ That defeats document grounding.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
