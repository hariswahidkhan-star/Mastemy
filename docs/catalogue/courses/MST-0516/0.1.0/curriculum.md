# Claude for Financial Modeling and Spreadsheet Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0516` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-FINANCE |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude for Financial Modeling and Spreadsheet Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame a financial modelling task and set appropriate boundaries for AI help
2. Build a transparent assumption structure that supports review
3. Draft and audit spreadsheet formulas with Claude's assistance
4. Verify model outputs against source data with independent checks
5. Communicate model results honestly and document AI assistance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Framing a modelling task (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Translate a business question into model inputs and outputs; (2) Decide which parts of a model Claude should and should not touch
- Common misconception addressed: Delegating judgement-heavy assumptions to the model unchecked
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From business question to model structure | 72 | 5 |
| M01L02 | Where Claude helps and where it must not decide | 72 | 5 |

### M02 Assumptions and structure (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draft an assumptions sheet with explicit, sourced inputs; (2) Structure a model so assumptions flow to outputs transparently
- Common misconception addressed: Hard-coding assumptions inside formulas where they cannot be reviewed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building a transparent assumptions sheet | 96 | 5 |
| M02L02 | Structuring a model for review | 96 | 5 |

### M03 Formulas and spreadsheet logic (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Use Claude to draft a formula and explain what it computes; (2) Trace an output back through the formulas that produced it
- Common misconception addressed: Accepting a complex formula without tracing what it computes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Drafting and explaining spreadsheet formulas | 80 | 5 |
| M03L02 | Tracing outputs to inputs | 80 | 5 |
| M03L03 | Common formula errors Claude can introduce | 80 | 5 |

### M04 Verification of outputs (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reconcile a model output against the source data; (2) Build checks that catch a broken link or wrong sign
- Common misconception addressed: Trusting a model total without an independent cross-check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reconciling outputs to source data | 96 | 5 |
| M04L02 | Error checks and sanity tests | 96 | 5 |

### M05 Communicating a model (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Summarise a model's results and key sensitivities for a decision-maker; (2) Document which figures were AI-assisted
- Common misconception addressed: Presenting model outputs as precise facts rather than conditional estimates
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Explaining results and sensitivities | 96 | 5 |
| M05L02 | Documenting method and AI assistance | 96 | 5 |

## Integrative case

A finance associate uses Claude to help build and sanity-check a three-statement model: structure assumptions, draft formulas, verify every output against the underlying data, and document which figures are AI-assisted before the model informs a decision.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0516-final-protected | 30 | 40 | yes |
| MST-0516-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framing a modelling task | 5 |
| Assumptions and structure | 6 |
| Formulas and spreadsheet logic | 7 |
| Verification of outputs | 6 |
| Communicating a model | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0516-Q0001** (single-answer, Select ONE) Claude drafts a revenue formula that returns a plausible total. Before using it in the model, what is the essential step?

- A. Trace the formula's inputs and reconcile the output to the source data **(key)**  
  _Rationale:_ Correct: plausible totals can still be wrong; tracing and reconciling is essential.
- B. Accept it because the number looks reasonable  
  _Rationale:_ A reasonable-looking number is not a verified one.
- C. Lock the cell so no one can review it  
  _Rationale:_ Hiding the formula prevents the review it needs.
- D. Convert it to text  
  _Rationale:_ That would break the calculation.

**MST-0516-Q0002** (multiple-answer, Select TWO) Which TWO practices make a Claude-assisted financial model easier to review? (Select TWO.)

- A. Keeping assumptions on a separate, sourced inputs sheet **(key)**  
  _Rationale:_ Correct: explicit assumptions support transparent review.
- B. Building independent checks that flag broken links **(key)**  
  _Rationale:_ Correct: sanity checks catch errors before they mislead.
- C. Hard-coding numbers inside formulas  
  _Rationale:_ Hidden constants are hard to review and audit.
- D. Removing all labels to save space  
  _Rationale:_ Unlabelled models are harder, not easier, to review.

**MST-0516-Q0003** (single-answer, Select ONE) How should model outputs be described to a decision-maker?

- A. As conditional estimates that depend on stated assumptions **(key)**  
  _Rationale:_ Correct: outputs are only as good as their assumptions and should be framed that way.
- B. As precise facts that cannot change  
  _Rationale:_ Model outputs are conditional, not fixed facts.
- C. Without mentioning assumptions  
  _Rationale:_ Omitting assumptions misleads the reader.
- D. As Claude's independent opinion  
  _Rationale:_ The model reflects the author's assumptions, not an independent opinion.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
