# AI for Banking Operations and Credit Analysis Support

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1188` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain where AI supports banking operations and credit analysis
2. Use AI to process and summarise operational and credit documents
3. Verify AI outputs and maintain an auditable decision trail
4. Support credit assessment while keeping lending decisions with humans
5. Manage fairness, model-risk and regulatory considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in banking operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sort banking tasks by suitability for AI support; (2) Identify steps that require human sign-off
- Common misconception addressed: Assuming AI can approve or decline a loan on its own
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps in banking | 96 | 8 |
| M01L02 | Mapping AI to operational workflows | 96 | 8 |

### M02 Processing documents (MASTEMY-DESIGN 20%)

- Worked applications: (1) Summarise an applicant's financial statements into a brief; (2) Extract key figures for a human to check
- Common misconception addressed: Accepting extracted figures without reconciling them to the statements
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Summarising financial statements | 96 | 8 |
| M02L02 | Extracting data for review | 96 | 8 |

### M03 Verifying and audit trail (MASTEMY-DESIGN 20%)

- Worked applications: (1) Verify an AI-calculated ratio against the source numbers; (2) Record the inputs, outputs and reviewer for an AI-assisted step
- Common misconception addressed: Leaving no record of how an AI-assisted decision was reached
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checking AI outputs | 96 | 8 |
| M03L02 | Keeping an auditable record | 96 | 8 |

### M04 Supporting credit analysis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft a credit note that presents strengths and weaknesses; (2) Mark the point where a credit officer must decide
- Common misconception addressed: Presenting an AI score as the lending decision rather than an input
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building a balanced credit note | 96 | 8 |
| M04L02 | Keeping the decision with a human | 96 | 8 |

### M05 Fairness and model risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check an AI-assisted process for potential unfair impact; (2) Identify a regulatory expectation relevant to automated support
- Common misconception addressed: Assuming an AI model is automatically fair and compliant
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fairness and adverse-action concerns | 96 | 8 |
| M05L02 | Model risk and regulation | 96 | 8 |

## Integrative case

A credit analyst uses an AI assistant to speed up a small-business loan review. Summarise the applicant's financials, extract and verify key ratios, draft a balanced credit note, and document the human review and fairness checks required before any lending decision is made.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1188-final-protected | 25 | 25 | yes |
| MST-1188-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in banking operations | 5 |
| Processing documents | 5 |
| Verifying and audit trail | 5 |
| Supporting credit analysis | 5 |
| Fairness and model risk | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1188-Q0001** (single-answer, Select ONE) An AI tool outputs a credit score and a recommended decision for a loan applicant. What is the correct role of this output?

- A. It is one input that a human credit officer weighs before deciding  **(key)**  
  _Rationale:_ Correct: AI output supports, but does not replace, the human lending decision and accountability.
- B. It is the final decision and can be sent to the applicant automatically  
  _Rationale:_ Automated final decisions raise fairness, regulatory and accountability problems.
- C. It removes the need for any human review  
  _Rationale:_ Human review and accountability remain essential.
- D. It should be hidden from the credit file  
  _Rationale:_ AI-assisted steps should be recorded for an auditable trail.

**MST-1188-Q0002** (multiple-answer, Select TWO) Which TWO practices keep an AI-assisted credit review auditable and fair? (Select TWO.)

- A. Recording the inputs, AI outputs and the human reviewer for each step  **(key)**  
  _Rationale:_ Correct: an auditable trail is essential for AI-assisted lending decisions.
- B. Checking the process for potential unfair impact on protected groups  **(key)**  
  _Rationale:_ Correct: checking for unfair impact is essential to fair AI-assisted lending.
- C. Discarding all records once the loan is decided  
  _Rationale:_ Discarding records destroys the audit trail regulators expect.
- D. Assuming the model is fair because it uses data  
  _Rationale:_ Data-driven models can still produce unfair outcomes.

**MST-1188-Q0003** (single-answer, Select ONE) An AI summary reports an applicant's debt-service ratio. Before using it in the credit note, what should the analyst do?

- A. Reconcile the ratio against the underlying figures in the financial statements  **(key)**  
  _Rationale:_ Correct: extracted figures must be reconciled to the source before they inform a decision.
- B. Use it directly because AI calculations are always correct  
  _Rationale:_ AI can mis-extract or miscalculate; reconciliation is required.
- C. Replace the statements with the AI summary  
  _Rationale:_ The source statements remain the authoritative record.
- D. Ignore the ratio entirely  
  _Rationale:_ The ratio is useful once verified; it should not be ignored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
