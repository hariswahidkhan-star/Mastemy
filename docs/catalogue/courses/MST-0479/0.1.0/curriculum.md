# ChatGPT for Financial Analysis and Management Reporting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0479` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **DESIGN ASSUMPTION** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT for Financial Analysis and Management Reporting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a financial analysis task correctly
2. Compute and verify financial figures
3. Communicate results to management clearly and honestly
4. Apply confidentiality, accuracy and human-review controls to the workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of ChatGPT, the quality of live AI outputs, and professional judgement on accepting AI suggestions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 Financial framing (25%, design assumption)

- Worked applications: (1) Define the metrics and period for a monthly report; (2) Map a question to the right statement (P&L, cash, balance)
- Common misconception addressed: Mixing up accrual results with cash movement
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core statements and metrics | 80 | 6 |
| M01L02 | Framing the analysis | 80 | 6 |
| M01L03 | Materiality and scope | 80 | 6 |

### M02 Calculation and variance (25%, design assumption)

- Worked applications: (1) Compute budget-vs-actual variances and recheck one; (2) Explain a margin change in plain language
- Common misconception addressed: Accepting an AI-computed variance without recomputing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Variance analysis | 80 | 6 |
| M02L02 | Ratios and margins | 80 | 6 |
| M02L03 | Verifying every figure | 80 | 6 |

### M03 Reporting and narrative (25%, design assumption)

- Worked applications: (1) Write a driver-based narrative for a variance; (2) Flag an uncertain estimate rather than hiding it
- Common misconception addressed: Presenting a projection as if it were an actual result
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Management report structure | 80 | 6 |
| M03L02 | Driver narratives | 80 | 6 |
| M03L03 | Stating assumptions and uncertainty | 80 | 6 |

### M04 Govern and review AI output (25%, design assumption)

- Worked applications: (1) Draft a rule for what information may be pasted into ChatGPT for this task; (2) Design a human review checkpoint before the output is used or sent
- Common misconception addressed: Assuming AI output is accurate and confidential by default without any review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Confidentiality and data handling | 80 | 6 |
| M04L02 | Accuracy, bias and disclosure | 80 | 6 |
| M04L03 | Human-in-the-loop review and sign-off | 80 | 6 |

## Integrative case

A FP&A analyst uses ChatGPT to prepare a monthly management report: structure the P&L narrative, compute and verify variances, explain drivers, and review every figure before distribution.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0479-final-protected | 72 | 72 | yes |
| MST-0479-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Financial framing | 18 |
| Calculation and variance | 18 |
| Reporting and narrative | 18 |
| Govern and review AI output | 18 |

Minimum reviewed item bank: 456 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0479-Q0001** (single-answer, Select ONE) ChatGPT reports a favourable budget variance. Before including it, you should:

- A. Recompute it and confirm the budget and actual inputs **(key)**  
  _Rationale:_ Correct: financial figures must be independently verified, including the inputs used.
- B. Include it because it is favourable  
  _Rationale:_ A favourable result is not automatically correct; it must be checked.
- C. Round it to look cleaner  
  _Rationale:_ Rounding does not verify the figure.
- D. Ask the model to be confident  
  _Rationale:_ Model confidence is not verification.

**MST-0479-Q0002** (single-answer, Select ONE) Which statement best shows whether a profitable month actually generated cash?

- A. The cash flow statement **(key)**  
  _Rationale:_ Correct: profit is accrual-based; the cash flow statement shows actual cash movement.
- B. The income statement alone  
  _Rationale:_ The income statement shows profit, which can differ from cash.
- C. A single revenue figure  
  _Rationale:_ Revenue alone says nothing about cash generation.
- D. The org chart  
  _Rationale:_ An org chart is unrelated to cash.

**MST-0479-Q0003** (multiple-answer, Select TWO) Which TWO make a management-report narrative trustworthy? (Select TWO)

- A. Explaining the drivers behind a variance **(key)**  
  _Rationale:_ Correct: driver explanations let readers judge the result.
- B. Stating assumptions and uncertainty clearly **(key)**  
  _Rationale:_ Correct: disclosed assumptions make the narrative honest and usable.
- C. Presenting forecasts as actuals  
  _Rationale:_ Blurring forecast and actual misleads readers.
- D. Omitting unfavourable results  
  _Rationale:_ Hiding bad news undermines trust and completeness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
