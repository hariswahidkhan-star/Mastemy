# RAG Citation Design and Evidence Traceability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0597` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral professional-skills content on citation design and evidence traceability for retrieval systems. There is no external issuer or official syllabus; module weights and outcomes are Mastemy design decisions. |
| Official sources | (no external issuer; Mastemy design content) |
| Evidence | **n/a-no-official-syllabus** - vendor-neutral professional skills; no external issuer |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG Citation Design and Evidence Traceability (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why citations and evidence traceability matter in retrieval systems
2. Design a citation format that links an answer span to its source
3. Preserve enough chunk metadata to support traceable citations
4. Verify that cited evidence actually supports the generated claim
5. Evaluate a RAG system's citation quality, not just answer fluency

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 Why citations matter (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) List the decisions a traceable citation supports; (2) Contrast a citable answer with an uncitable one
- Common misconception addressed: Believing a fluent answer needs no evidence trail
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Trust, audit and accountability | 96 | 6 |
| M01L02 | What a good citation enables | 96 | 6 |
### M02 Designing citation formats (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Design a citation that points to a passage, not a whole document; (2) Choose citation granularity for a legal versus a support use case
- Common misconception addressed: Citing a whole document when the claim comes from one line
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Span-to-source linking | 96 | 6 |
| M02L02 | Granularity of a citation | 96 | 6 |
### M03 Metadata for traceability (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Define the metadata a chunk must carry to be citable; (2) Trace a citation back through chunking to the source file
- Common misconception addressed: Dropping source metadata during chunking so citations cannot resolve
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Chunk IDs, offsets and source refs | 96 | 6 |
| M03L02 | Keeping provenance through the pipeline | 96 | 6 |
### M04 Verifying evidence (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Verify three claims against their cited spans; (2) Flag a claim whose citation does not actually support it
- Common misconception addressed: Assuming a present citation guarantees the claim is supported
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Checking a citation supports the claim | 96 | 6 |
| M04L02 | Detecting unsupported claims | 96 | 6 |
### M05 Evaluating citation quality (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Score a sample of answers for correct attribution; (2) Design a review that catches citation drift over time
- Common misconception addressed: Measuring only answer fluency and ignoring attribution accuracy
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Metrics for groundedness and attribution | 96 | 6 |
| M05L02 | Reviewing a sample of answers | 96 | 6 |

## Integrative case

A regulated team must make its RAG assistant auditable: design a span-level citation format, ensure chunks carry the metadata needed to resolve citations, verify that cited evidence supports each claim, and evaluate citation quality on a sampled set rather than trusting fluent answers.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0597-final-protected | 30 | 40 | yes |
| MST-0597-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why citations matter | 6 |
| Designing citation formats | 6 |
| Metadata for traceability | 6 |
| Verifying evidence | 6 |
| Evaluating citation quality | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0597-Q0001** (single-answer, Select ONE) An answer cites an entire 50-page document for a single specific figure. Why is this poor citation design?

- A. It does not let a reader locate the passage that actually supports the figure **(key)**  
  _Rationale:_ Correct: a useful citation points to the specific supporting span, not the whole document.
- B. Documents may not be cited at all  
  _Rationale:_ Documents can be cited; the issue is granularity.
- C. Citations must always be numeric  
  _Rationale:_ Format is not the problem here.
- D. Fifty pages is too short to cite  
  _Rationale:_ Length is not the issue; precision is.
**MST-0597-Q0002** (multiple-answer, Select TWO) Which TWO are needed for citations to resolve back to source? (Select TWO.)

- A. Chunks that carry a source reference and offset/location **(key)**  
  _Rationale:_ Correct: provenance metadata lets a citation resolve to a passage.
- B. Preserving that metadata through the chunking pipeline **(key)**  
  _Rationale:_ Correct: if metadata is dropped during chunking, citations cannot resolve.
- C. Discarding chunk IDs to save space  
  _Rationale:_ Discarding IDs breaks traceability.
- D. Relying only on the answer text with no metadata  
  _Rationale:_ Answer text alone cannot be traced to a source.
**MST-0597-Q0003** (single-answer, Select ONE) A claim carries a citation, but opening the cited span shows it does not support the claim. What does this reveal?

- A. A citation's presence does not guarantee the claim is supported; evidence must be checked **(key)**  
  _Rationale:_ Correct: attribution accuracy must be verified, not assumed from a citation's existence.
- B. The claim is automatically correct because it is cited  
  _Rationale:_ Presence of a citation is not proof of support.
- C. Citations can never be wrong  
  _Rationale:_ They can point to non-supporting content.
- D. The document must be deleted  
  _Rationale:_ The fix is to correct attribution, not delete sources.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
