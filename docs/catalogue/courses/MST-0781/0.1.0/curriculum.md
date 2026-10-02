# ChatGPT + Excel + Power BI: Executive Reporting Workflow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0781` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT + Excel + Power BI: Executive Reporting Workflow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame an executive reporting question and the data it requires
2. Use ChatGPT to draft and check Excel transformations without trusting output blindly
3. Model and clean data in Excel for a reliable reporting layer
4. Build a Power BI report with validated measures and clear visuals
5. Operate the workflow with review gates, versioning and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping the report (20%)

- Worked applications: (1) Turn a vague 'show me sales health' request into three concrete KPIs; (2) Identify the source tables and refresh cadence a KPI needs
- Common misconception addressed: Starting in the chart before defining the question
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From executive question to KPI definitions | 120 | 7 |
| M01L02 | Source mapping and data readiness | 120 | 7 |

### M02 Assisted Excel transformation (20%)

- Worked applications: (1) Ask ChatGPT for a formula, then verify it against a hand-checked sample; (2) Spot a plausible-but-wrong formula suggestion and correct it
- Common misconception addressed: Pasting AI-generated formulas without validating on known rows
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting for formulas and transformations | 120 | 7 |
| M02L02 | Verifying AI output against ground truth | 120 | 7 |

### M03 Excel data modelling (20%)

- Worked applications: (1) Normalise a messy export into a clean fact/dimension layout; (2) Build reconciling totals that catch dropped rows
- Common misconception addressed: Reporting off a single wide sheet with hidden duplicates
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cleaning and shaping with Power Query | 120 | 7 |
| M03L02 | A reliable model and reconciliation checks | 120 | 7 |

### M04 Power BI reporting (20%)

- Worked applications: (1) Write a measure and validate it against the Excel reconciliation; (2) Choose visuals that answer each KPI without distortion
- Common misconception addressed: Trusting a measure because the chart 'looks right'
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measures and the data model in Power BI | 120 | 7 |
| M04L02 | Visual design and validated numbers | 120 | 7 |

### M05 Governance and operation (20%)

- Worked applications: (1) Add a human review gate before the report is shared with the board; (2) Version the workbook and report and record the data-as-of date
- Common misconception addressed: Sharing a refreshed report with no sign-off or as-of date
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Review gates, sign-off and as-of dating | 120 | 7 |
| M05L02 | Versioning, refresh and sensitive-data handling | 120 | 7 |

## Integrative case

Finance must deliver a monthly board pack: scope KPIs, use ChatGPT to speed Excel prep while verifying every formula, build a validated Power BI report, and ship it through a review gate with an as-of date.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0781-final-protected | 40 | 50 | yes |
| MST-0781-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping the report | 8 |
| Assisted Excel transformation | 8 |
| Excel data modelling | 8 |
| Power BI reporting | 8 |
| Governance and operation | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0781-Q0001** (single-answer, Select ONE) ChatGPT suggests an Excel formula that returns a plausible total. What should happen before it is used in the board pack?

- A. Validate it against a hand-checked sample of known rows **(key)**  
  _Rationale:_ Correct: AI output must be verified against ground truth before it drives a decision artifact.
- B. Use it because the total looks reasonable  
  _Rationale:_ A reasonable-looking total can still be wrong; plausibility is not verification.
- C. Increase the number of decimal places  
  _Rationale:_ Formatting does not establish correctness.
- D. Ask ChatGPT whether it is sure  
  _Rationale:_ The model's self-assurance is not evidence of correctness.

**MST-0781-Q0002** (multiple-answer, Select TWO) Which TWO controls make a shared board report trustworthy? (Select TWO.)

- A. A recorded data-as-of date **(key)**  
  _Rationale:_ Correct: readers need to know the data currency.
- B. A human sign-off before distribution **(key)**  
  _Rationale:_ Correct: a review gate catches errors before they reach the board.
- C. Hiding the source sheets  
  _Rationale:_ Hiding sources reduces auditability, not risk.
- D. Auto-sharing on every refresh  
  _Rationale:_ Unreviewed auto-sharing spreads errors faster.

**MST-0781-Q0003** (single-answer, Select ONE) A Power BI measure disagrees with the Excel reconciliation total. What is the right first step?

- A. Investigate the discrepancy before publishing either number **(key)**  
  _Rationale:_ Correct: a mismatch signals a modelling or filter error that must be resolved first.
- B. Publish the Power BI number because it is newer  
  _Rationale:_ Newer is not the same as correct.
- C. Average the two numbers  
  _Rationale:_ Averaging two figures hides rather than resolves the error.
- D. Delete the Excel reconciliation  
  _Rationale:_ Removing the cross-check destroys the signal that found the problem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
