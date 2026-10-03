# AI & Analytics for Financial Decisions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2493` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI & Analytics for Financial Decisions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe how data analytics and AI support financial planning, reporting and decisions
2. Match a financial question to an appropriate analytics technique
3. Interpret the output of a forecast or model, including its uncertainty
4. Apply governance, data-quality and control expectations to AI in finance
5. Recognise bias, explainability and over-reliance risks in financial AI
6. Communicate AI-assisted findings with appropriate caveats to decision-makers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Analytics in finance (25% (Mastemy design weight), design weight)

- Worked applications: (1) Map three finance tasks to an analytics maturity level; (2) Identify where AI could help a close process
- Common misconception addressed: Assuming AI removes the need for financial judgement
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From spreadsheets to analytics and AI in finance | 120 | 7 |
| M01L02 | Descriptive, predictive and prescriptive analytics | 120 | 7 |

### M02 Techniques and outputs (25% (Mastemy design weight), design weight)

- Worked applications: (1) Pick a technique for a cash-forecasting question; (2) Read a forecast with its confidence interval
- Common misconception addressed: Treating a point forecast as a certainty
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Matching a question to a technique | 120 | 7 |
| M02L02 | Reading model output and its uncertainty | 120 | 7 |

### M03 Governance and controls (25% (Mastemy design weight), design weight)

- Worked applications: (1) List data-quality checks before trusting a model; (2) Describe how a finance model should be validated
- Common misconception addressed: Deploying a model into reporting without controls
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data quality, lineage and controls for finance AI | 120 | 7 |
| M03L02 | Model risk, validation and auditability | 120 | 7 |

### M04 Responsible use (25% (Mastemy design weight), design weight)

- Worked applications: (1) Spot a biased feature in a credit-scoring example; (2) Draft caveats for an AI-assisted recommendation
- Common misconception addressed: Over-relying on an unexplainable black-box output
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bias, explainability and over-reliance | 120 | 7 |
| M04L02 | Communicating AI-assisted findings honestly | 120 | 7 |

## Integrative case

A finance team wants to use an AI model to speed up its monthly forecast; the manager must choose where it adds value, set data and model controls, and present results with honest caveats. This is general business education, not investment advice.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2493-final-protected | 40 | 40 | yes |
| MST-2493-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Analytics in finance | 10 |
| Techniques and outputs | 10 |
| Governance and controls | 10 |
| Responsible use | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2493-Q0001** (single-answer, Select ONE) A model produces a single cash-forecast number for next quarter. The most responsible way to use it is to:

- A. Treat it as one estimate with uncertainty, cross-checked against judgement and other evidence **(key)**  
  _Rationale:_ Correct: model output supports, not replaces, judgement and should carry uncertainty.
- B. Accept it as the definitive answer and stop forecasting  
  _Rationale:_ A single number ignores uncertainty and context.
- C. Discard all human forecasting entirely  
  _Rationale:_ Human judgement remains essential.
- D. Publish it without any caveat  
  _Rationale:_ Caveats about uncertainty are needed.

**MST-2493-Q0002** (multiple-answer, Select TWO) Which TWO are governance expectations for using AI in financial reporting? (Select TWO.)

- A. Documented data lineage and quality checks on model inputs **(key)**  
  _Rationale:_ Correct: input data must be controlled and traceable.
- B. Model validation and an audit trail for outputs **(key)**  
  _Rationale:_ Correct: validation and auditability are core controls.
- C. Hiding the model from auditors to protect IP  
  _Rationale:_ Opacity undermines control and auditability.
- D. Removing all human review once accuracy is high  
  _Rationale:_ Human oversight remains a required control.

**MST-2493-Q0003** (single-answer, Select ONE) Why is explainability important when AI informs a lending or budgeting decision?

- A. Decision-makers must understand and challenge the basis of a recommendation, and may be accountable for it **(key)**  
  _Rationale:_ Correct: accountability and oversight require understanding the reasoning.
- B. Because explainable models are always more accurate  
  _Rationale:_ Explainability does not guarantee higher accuracy.
- C. Because regulators never allow any automated input  
  _Rationale:_ Automated inputs are permitted with controls.
- D. Because it removes the need for data quality  
  _Rationale:_ Data quality remains essential.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
