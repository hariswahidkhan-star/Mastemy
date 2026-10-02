# AI in Banking and Insurance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1388` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. AI in financial services
2. Core use cases
3. Risk, fairness and regulation
4. Adoption and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in financial services (MASTEMY-DESIGN 25%)

- Worked applications: (1) Spot AI use cases in a bank; (2) Weigh value against risk
- Common misconception addressed: Assuming AI in finance is only about chatbots
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI is used in banking and insurance | 48 | 4 |
| M01L02 | Value and risk at a glance | 48 | 4 |

### M02 Core use cases (MASTEMY-DESIGN 25%)

- Worked applications: (1) Frame a fraud-detection use case; (2) Outline an AI claims-triage flow
- Common misconception addressed: Treating a credit model as neutral just because it uses data
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fraud detection and credit scoring | 48 | 4 |
| M02L02 | Underwriting, claims and customer service | 48 | 4 |

### M03 Risk, fairness and regulation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Explain a credit decision to a customer; (2) List regulatory expectations for a model
- Common misconception addressed: Deploying an unexplainable model for regulated credit decisions
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Model risk, fairness and explainability | 48 | 4 |
| M03L02 | Regulatory expectations in finance | 48 | 4 |

### M04 Adoption and governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Assess data readiness for a use case; (2) Add human oversight to a decision
- Common misconception addressed: Automating high-impact decisions with no human oversight
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Build vs buy and data readiness | 48 | 4 |
| M04L02 | Oversight and human-in-the-loop | 48 | 4 |

## Integrative case

A regional bank wants to use AI for fraud detection and faster claims, while satisfying regulators. Identify suitable use cases, weigh model risk and fairness, ensure explainable and overseen credit decisions, and plan governed adoption.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1388-final-protected | 20 | 20 | yes |
| MST-1388-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in financial services | 5 |
| Core use cases | 5 |
| Risk, fairness and regulation | 5 |
| Adoption and governance | 5 |

Minimum reviewed item bank: 168 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1388-Q0001** (single-answer, Select ONE) Why is explainability especially important for AI credit decisions?

- A. Customers and regulators often require a reason for an adverse decision **(key)**  
  _Rationale:_ Correct: regulated lending demands explainable, contestable decisions.
- B. Explainability makes the model train faster  
  _Rationale:_ It is about accountability, not speed.
- C. It is only a nice-to-have in finance  
  _Rationale:_ It is frequently a regulatory requirement.
- D. It removes the need for fairness checks  
  _Rationale:_ Fairness checks are still required.

**MST-1388-Q0002** (multiple-answer, Select TWO) Which TWO are well-established AI use cases in banking and insurance? (Select TWO.)

- A. Fraud detection on transactions **(key)**  
  _Rationale:_ Correct: a classic, high-value use case.
- B. Claims triage and processing **(key)**  
  _Rationale:_ Correct: AI speeds and prioritises claims.
- C. Setting the central bank interest rate  
  _Rationale:_ A macroeconomic policy decision, not an AI use case here.
- D. Printing physical banknotes  
  _Rationale:_ Not an AI application.

**MST-1388-Q0003** (single-answer, Select ONE) For a high-impact automated decision like declining insurance, a sound governance choice is:

- A. Keep a human-in-the-loop with oversight of the model's recommendation **(key)**  
  _Rationale:_ Correct: human oversight is appropriate for high-impact decisions.
- B. Fully automate with no review to save time  
  _Rationale:_ Removes accountability on a high-impact decision.
- C. Hide the model from auditors  
  _Rationale:_ Reduces, not improves, governance.
- D. Ignore data quality  
  _Rationale:_ Data readiness is essential.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
