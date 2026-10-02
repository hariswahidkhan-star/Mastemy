# Claude + Make + Google Drive: Document Intake and Review

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0797` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude + Make + Google Drive: Document Intake and Review (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a document intake and review workflow and its decisions
2. Use Claude to extract and summarise document content reliably
3. Validate extractions before they drive any action
4. Orchestrate intake and routing in Make with Google Drive
5. Operate the workflow with review, retention and access controls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping intake and review (20%)

- Worked applications: (1) Define the fields to extract from an incoming document; (2) Decide which document types must be human-reviewed
- Common misconception addressed: Treating every document as the same with no review rules
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Document types, fields and decisions | 96 | 7 |
| M01L02 | Where human review is required | 96 | 7 |

### M02 Claude extraction (20%)

- Worked applications: (1) Extract key fields from a sample document with Claude; (2) Flag a field Claude could not read confidently
- Common misconception addressed: Acting on extracted fields without checking confidence
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting Claude to extract structured fields | 96 | 7 |
| M02L02 | Handling low-confidence and missing data | 96 | 7 |

### M03 Validating extractions (20%)

- Worked applications: (1) Verify an extracted amount against the document; (2) Route a low-confidence extraction to a human reviewer
- Common misconception addressed: Letting an unverified extraction trigger an automated action
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checking extractions against the source | 96 | 7 |
| M03L02 | Confidence thresholds and routing to humans | 96 | 7 |

### M04 Orchestration in Make (20%)

- Worked applications: (1) Build a Make scenario that files a document correctly in Drive; (2) Prevent a document being processed twice
- Common misconception addressed: Building a flow that duplicates or misfiles documents on retry
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Intake, routing and Drive organisation | 96 | 7 |
| M04L02 | Error handling and idempotency | 96 | 7 |

### M05 Operating the workflow (20%)

- Worked applications: (1) Define retention and who may access processed documents; (2) Restrict a sensitive document to the right reviewers
- Common misconception addressed: Running with no retention policy or access restriction
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Review, retention and audit | 96 | 7 |
| M05L02 | Access control and sensitive documents | 96 | 7 |

## Integrative case

A back-office team automates document intake: scope the fields and review rules, use Claude to extract content, validate every extraction, orchestrate routing in Make with Google Drive, and operate with retention, audit and access controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0797-final-protected | 40 | 50 | yes |
| MST-0797-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping intake and review | 8 |
| Claude extraction | 8 |
| Validating extractions | 8 |
| Orchestration in Make | 8 |
| Operating the workflow | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0797-Q0001** (single-answer, Select ONE) Claude extracts an invoice total but marks the figure as low confidence because the scan was faint. What should happen?

- A. Route it to a human to verify before any payment action **(key)**  
  _Rationale:_ Correct: low-confidence financial data must be checked, not auto-processed.
- B. Use the figure anyway since Claude produced a value  
  _Rationale:_ A low-confidence value may be wrong and must not drive payment.
- C. Round the figure to the nearest hundred  
  _Rationale:_ Rounding an uncertain value does not make it correct.
- D. Discard the document entirely  
  _Rationale:_ Discarding a valid document is disproportionate; it needs review, not deletion.

**MST-0797-Q0002** (multiple-answer, Select TWO) Which TWO properties keep a document-intake scenario safe to retry? (Select TWO.)

- A. Idempotency so a document is not processed twice **(key)**  
  _Rationale:_ Correct: idempotency prevents duplicate filing or actions on retry.
- B. Error handling that stops a failed document mid-flow **(key)**  
  _Rationale:_ Correct: failed documents must not be half-processed and forgotten.
- C. Processing the newest document first regardless of errors  
  _Rationale:_ Order of processing does not address retry safety.
- D. Deleting the source file immediately on receipt  
  _Rationale:_ Deleting the source removes the ability to reprocess or audit.

**MST-0797-Q0003** (single-answer, Select ONE) What should govern how long processed documents are kept?

- A. A defined retention policy appropriate to the document type **(key)**  
  _Rationale:_ Correct: retention must be deliberate and matched to the data and obligations.
- B. Keeping everything forever in case it is needed  
  _Rationale:_ Indefinite retention of documents increases risk and cost.
- C. Deleting everything after processing to save space  
  _Rationale:_ Premature deletion can breach obligations and lose audit trails.
- D. Whatever Google Drive's default happens to be  
  _Rationale:_ Relying on an unexamined default is not a retention decision.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
