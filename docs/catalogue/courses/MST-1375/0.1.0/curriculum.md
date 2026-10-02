# AI for Finance Professionals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1375` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

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

1. Identify high-value AI use cases in finance and accounting
2. Use AI to assist analysis, forecasting and reporting responsibly
3. Interpret AI outputs with appropriate scepticism and controls
4. Recognise data quality, bias and model risk in financial AI
5. Apply governance and compliance practices to AI in finance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in finance and accounting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rank five finance tasks by AI suitability; (2) Identify one task where AI must not act unsupervised
- Common misconception addressed: Believing AI removes the need for professional judgement
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps in finance | 39 | 6 |
| M01L02 | Tooling, data and realistic limits | 39 | 6 |

### M02 Analysis, forecasting and reporting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interrogate the assumptions behind an AI revenue forecast; (2) Use AI to draft a variance commentary, then correct it
- Common misconception addressed: Trusting an AI forecast without checking its assumptions
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted analysis and forecasting | 39 | 6 |
| M02L02 | Drafting and checking financial narratives | 39 | 6 |

### M03 Model risk and data quality (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace a wrong figure back to a data quality issue; (2) Design a basic reconciliation check for an AI output
- Common misconception addressed: Assuming clean-looking output means clean underlying data
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data quality, bias and drift | 38 | 6 |
| M03L02 | Model risk and the need for controls | 38 | 6 |

### M04 Controls, review and sign-off (MASTEMY-DESIGN 20%)

- Worked applications: (1) Place a human sign-off point in an AI reporting workflow; (2) Write an audit note explaining an AI-assisted figure
- Common misconception addressed: Letting AI output bypass established approval controls
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Human-in-the-loop controls | 38 | 6 |
| M04L02 | Documentation and auditability | 38 | 6 |

### M05 Compliance, ethics and governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check an AI use case against a confidentiality rule; (2) Draft a limitation disclosure for an AI-assisted report
- Common misconception addressed: Assuming regulators treat AI outputs as automatically reliable
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Confidentiality and regulatory duties | 38 | 6 |
| M05L02 | Governance and responsible adoption | 38 | 6 |

## Integrative case

A financial analyst is asked to speed up monthly reporting and forecasting with AI. Decide which tasks AI can assist, where human sign-off and controls are mandatory, and how to document data sources and model limitations for an auditor.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1375-final-protected | 25 | 25 | yes |
| MST-1375-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in finance and accounting | 5 |
| Analysis, forecasting and reporting | 5 |
| Model risk and data quality | 5 |
| Controls, review and sign-off | 5 |
| Compliance, ethics and governance | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1375-Q0001** (single-answer, Select ONE) An AI model forecasts next-quarter revenue. What is the most important first step before using it in a board report?

- A. Examine and validate the assumptions and inputs behind the forecast **(key)**  
  _Rationale:_ Correct: a forecast is only as sound as its assumptions and data.
- B. Copy the number straight into the report  
  _Rationale:_ Unvalidated figures in a board report are a control failure.
- C. Round it to look more confident  
  _Rationale:_ Presentation does not establish reliability.
- D. Assume the model handled all risks  
  _Rationale:_ Models do not self-validate assumptions.

**MST-1375-Q0002** (multiple-answer, Select TWO) Which TWO controls best support responsible use of AI in financial reporting? (Select TWO.)

- A. Require human review and sign-off on AI-assisted figures **(key)**  
  _Rationale:_ Correct: human accountability is essential for reported numbers.
- B. Document data sources and model limitations **(key)**  
  _Rationale:_ Correct: documentation supports auditability and trust.
- C. Hide that AI was used from auditors  
  _Rationale:_ Concealment undermines audit and compliance.
- D. Disable all reconciliation checks to save time  
  _Rationale:_ Removing checks increases the risk of undetected errors.

**MST-1375-Q0003** (single-answer, Select ONE) Why can a financial AI output look precise yet still be wrong?

- A. Precise formatting does not guarantee accurate underlying data or logic **(key)**  
  _Rationale:_ Correct: a confident format can mask bad inputs or flawed assumptions.
- B. Precise numbers are always correct  
  _Rationale:_ Precision is not accuracy.
- C. AI never makes arithmetic-style errors  
  _Rationale:_ AI can produce plausible but wrong figures.
- D. Formatting changes the underlying data  
  _Rationale:_ Formatting does not change input quality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
