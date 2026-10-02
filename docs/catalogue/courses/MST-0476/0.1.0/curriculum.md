# ChatGPT Data Analysis with Spreadsheets and Files

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0476` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **DESIGN ASSUMPTION** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT Data Analysis with Spreadsheets and Files (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Prepare uploaded spreadsheet data for analysis
2. Compute and interpret results with verification
3. Turn analysis into clear, honest visuals and summaries
4. Apply confidentiality, accuracy and human-review controls to the workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of ChatGPT, the quality of live AI outputs, and professional judgement on accepting AI suggestions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 Loading and cleaning data (25%, design assumption)

- Worked applications: (1) Describe a dataset's columns and spot obvious data-quality issues; (2) Clean inconsistent categories before aggregating
- Common misconception addressed: Assuming the model read the whole file perfectly without checking row counts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Uploading files and data preview | 80 | 6 |
| M01L02 | Cleaning and reshaping data | 80 | 6 |
| M01L03 | Describing data honestly | 80 | 6 |

### M02 Analysis and calculation (25%, design assumption)

- Worked applications: (1) Compute monthly totals and recompute one by hand to check; (2) Interpret a simple trend without overstating it
- Common misconception addressed: Trusting a computed figure without any spot check
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Aggregations and summaries | 80 | 6 |
| M02L02 | Verifying calculations | 80 | 6 |
| M02L03 | Interpreting results carefully | 80 | 6 |

### M03 Visualisation and reporting (25%, design assumption)

- Worked applications: (1) Choose an appropriate chart for a trend; (2) Write a caption that states the limitation of the data
- Common misconception addressed: Choosing a chart that exaggerates a small difference
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Choosing the right chart | 80 | 6 |
| M03L02 | Building and labelling charts | 80 | 6 |
| M03L03 | Reporting results and caveats | 80 | 6 |

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

A finance associate uploads a messy sales spreadsheet to ChatGPT: clean it, compute monthly totals and a simple trend, produce a chart, and verify the numbers before sharing with the team.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0476-final-protected | 72 | 72 | yes |
| MST-0476-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Loading and cleaning data | 18 |
| Analysis and calculation | 18 |
| Visualisation and reporting | 18 |
| Govern and review AI output | 18 |

Minimum reviewed item bank: 456 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0476-Q0001** (single-answer, Select ONE) After ChatGPT reports a total from an uploaded sheet, what is the best verification step?

- A. Recompute a sample independently and compare **(key)**  
  _Rationale:_ Correct: an independent spot check confirms the figure was computed from the full, correct data.
- B. Accept it because the tool computed it  
  _Rationale:_ Automated computation can still use mis-read or partial data; a check is needed.
- C. Ask the model to say it again  
  _Rationale:_ Repetition does not verify correctness.
- D. Make a prettier chart  
  _Rationale:_ Presentation does not confirm the underlying number.

**MST-0476-Q0002** (single-answer, Select ONE) Which chart best shows a single metric changing over 12 months?

- A. A line chart **(key)**  
  _Rationale:_ Correct: a line chart is designed to show a continuous value changing over ordered time.
- B. A pie chart  
  _Rationale:_ Pie charts show parts of a whole at one point, not change over time.
- C. A single large number  
  _Rationale:_ A single number cannot show the trend across months.
- D. A word cloud  
  _Rationale:_ A word cloud visualises text frequency, not a numeric time series.

**MST-0476-Q0003** (multiple-answer, Select TWO) Which TWO are good practices before trusting an AI analysis of an upload? (Select TWO)

- A. Confirm the row/record count matches the source **(key)**  
  _Rationale:_ Correct: verifying the record count ensures the whole dataset was used.
- B. Spot-check at least one calculation by hand **(key)**  
  _Rationale:_ Correct: a manual recomputation catches calculation or data-reading errors.
- C. Assume all columns were interpreted correctly  
  _Rationale:_ Column meanings can be misread; this should be checked, not assumed.
- D. Pick the chart that looks most dramatic  
  _Rationale:_ Choosing for drama can misrepresent the data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
