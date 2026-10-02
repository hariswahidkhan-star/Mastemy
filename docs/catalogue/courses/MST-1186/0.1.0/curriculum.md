# AI for Financial Planning and Analysis Teams

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1186` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify high-value and unsuitable AI use cases across the FP&A cycle
2. Use AI to accelerate variance analysis and management commentary with verification
3. Apply AI to assist forecasting and scenario modelling responsibly
4. Recognise data-quality, bias and confidentiality risks in finance contexts
5. Keep human review, controls and auditability over AI-assisted analysis

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the tools and workflows taught, the quality of live outputs, and professional judgement on the job are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 AI across FP&A (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sort FP&A tasks by AI suitability; (2) Explain why the forecast decision stays with the analyst
- Common misconception addressed: Expecting AI to own the forecast rather than assist it
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What AI does well and poorly in FP&A | 96 | 8 |
| M01L02 | Mapping use cases to the planning cycle | 96 | 8 |
### M02 Variance analysis and commentary (MASTEMY-DESIGN 20%)

- Worked applications: (1) Have AI draft a variance narrative and fact-check it; (2) Correct an AI commentary that misreads a driver
- Common misconception addressed: Publishing AI commentary without checking the numbers behind it
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted variance explanation | 96 | 8 |
| M02L02 | Drafting and verifying management commentary | 96 | 8 |
### M03 Forecasting and scenarios (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use AI to structure a three-scenario model outline; (2) Challenge an AI forecast assumption that ignores seasonality
- Common misconception addressed: Trusting an AI point forecast as if it were certain
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI support for forecasting | 96 | 8 |
| M03L02 | Scenario and sensitivity analysis with AI | 96 | 8 |
### M04 Data and risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a data-quality issue that would mislead AI analysis; (2) Decide what financial data may be entered into a tool
- Common misconception addressed: Feeding dirty or confidential data into an AI tool
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data quality and model inputs | 96 | 8 |
| M04L02 | Bias, confidentiality and controls | 96 | 8 |
### M05 Governance and review (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a review step before AI output reaches the CFO pack; (2) Document AI use so an analysis can be audited
- Common misconception addressed: Treating AI output as final without a human sign-off
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human review and sign-off | 96 | 8 |
| M05L02 | Auditability of AI-assisted analysis | 96 | 8 |

## Integrative case

An FP&A manager must bring AI into the monthly close: choose where AI speeds variance analysis and commentary, where forecasting judgement must stay human, design the review controls, protect sensitive financial data, and explain the governance to the CFO.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1186-final-protected | 25 | 25 | yes |
| MST-1186-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI across FP&A | 5 |
| Variance analysis and commentary | 5 |
| Forecasting and scenarios | 5 |
| Data and risk | 5 |
| Governance and review | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1186-Q0001** (single-answer, Select ONE) AI drafts a variance commentary attributing a cost rise to 'higher volume'. The data shows flat volume and a price increase. What should the analyst do?

- A. Correct the narrative to the real driver after checking the figures **(key)**  
  _Rationale:_ Correct: AI commentary must be verified against the data before use.
- B. Publish the AI narrative as written to save time  
  _Rationale:_ Publishing an unverified, wrong driver misleads decision-makers.
- C. Trust the AI because it is confident  
  _Rationale:_ Confident wording is not evidence of accuracy.
- D. Remove all commentary to avoid risk  
  _Rationale:_ The fix is verification and correction, not omission.

**MST-1186-Q0002** (multiple-answer, Select TWO) Which TWO data risks most directly undermine AI-assisted FP&A analysis? (Select TWO.)

- A. Poor data quality in the inputs **(key)**  
  _Rationale:_ Correct: AI amplifies errors in low-quality input data.
- B. Entering confidential financials into an uncontrolled tool **(key)**  
  _Rationale:_ Correct: this creates confidentiality and control risks.
- C. Using a clearly labelled chart of accounts  
  _Rationale:_ A clean chart of accounts helps rather than harms analysis.
- D. Reconciling figures to the ledger  
  _Rationale:_ Reconciliation improves reliability; it is not a risk.

**MST-1186-Q0003** (single-answer, Select ONE) Why should an AI point forecast not be presented to the CFO as a single certain number?

- A. Forecasts carry uncertainty; a range and assumptions communicate risk honestly **(key)**  
  _Rationale:_ Correct: presenting uncertainty and assumptions is more truthful and useful than a false-precision point.
- B. AI forecasts are always wrong and should be hidden  
  _Rationale:_ AI can assist forecasting; the issue is representing uncertainty, not hiding output.
- C. The CFO cannot read numbers  
  _Rationale:_ This is irrelevant and incorrect.
- D. A single number is always more accurate  
  _Rationale:_ A single number hides the uncertainty that exists.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
