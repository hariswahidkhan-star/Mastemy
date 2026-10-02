# Excel Statistical Analysis and Decision Support

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0645` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Excel feature facts (statistical functions CORREL, SLOPE, INTERCEPT, LINEST, T.TEST; what-if Data Tables and Scenario Manager; the Solver add-in) grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02; statistical interpretation (regression, hypothesis testing) follows standard methodology. Confirm add-in and function availability against the current build before production. |
| Official sources | https://support.microsoft.com/office/linest-function-84d7d0d9-6e50-4101-977a-fa7abf772b6d; https://support.microsoft.com/office/define-and-solve-a-problem-by-using-solver-5d1a388f-079d-43ac-a7eb-f63e45925040 |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-STATS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — Excel Statistical Analysis and Decision Support (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Summarise data with descriptive statistics
2. Analyse correlation and simple regression
3. Apply basic hypothesis tests
4. Use what-if analysis and Solver for decisions
5. Communicate statistical results responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Descriptive statistics (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute mean, median and standard deviation for a dataset; (2) Build a histogram with defined bins
- Common misconception addressed: Reporting the mean for skewed data without also showing the median
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Central tendency and dispersion | 80 | 5 |
| M01L02 | Distributions and histograms | 80 | 5 |
| M01L03 | Outliers and quartiles | 80 | 5 |

### M02 Correlation and regression (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Fit a simple regression line with LINEST; (2) Interpret the slope and R-squared of a fit
- Common misconception addressed: Reading correlation as proof of causation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Correlation with CORREL | 80 | 5 |
| M02L02 | Simple linear regression | 80 | 5 |
| M02L03 | Interpreting R-squared | 80 | 5 |

### M03 Hypothesis testing basics (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Run a two-sample test with T.TEST; (2) Construct a confidence interval for a mean
- Common misconception addressed: Treating a p-value as the probability that the hypothesis is true
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Confidence intervals | 80 | 5 |
| M03L02 | t-tests with T.TEST | 80 | 5 |
| M03L03 | Interpreting p-values | 80 | 5 |

### M04 Decision support tools (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a one- and two-variable data table; (2) Optimise an objective with Solver under constraints
- Common misconception addressed: Using Goal Seek where a constrained optimisation with Solver is required
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scenario Manager | 80 | 5 |
| M04L02 | What-if Data Tables | 80 | 5 |
| M04L03 | Solver for optimisation | 80 | 5 |

## Integrative case

An analyst evaluates a pricing experiment: describe the data, test whether a price change moved sales with a t-test, fit a regression line, and run scenarios with a data table to support a pricing decision.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0645-final-protected | 30 | 40 | yes |
| MST-0645-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Descriptive statistics | 8 |
| Correlation and regression | 8 |
| Hypothesis testing basics | 7 |
| Decision support tools | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0645-Q0001** (single-answer, Select ONE) A correlation coefficient of 0.9 between ice-cream sales and drownings most likely indicates:

- A. A possible common cause (such as hot weather), not that one causes the other **(key)**  
  _Rationale:_ Correct: correlation does not establish causation; a confounder is likely.
- B. That ice-cream sales cause drownings  
  _Rationale:_ Correlation does not prove causation.
- C. That the data is wrong  
  _Rationale:_ A high correlation is not itself evidence of bad data.
- D. That there is no relationship  
  _Rationale:_ 0.9 is a strong correlation.

**MST-0645-Q0002** (multiple-answer, Select TWO) Which TWO values does a simple linear fit provide for the line y = m*x + b? (Select TWO.)

- A. The slope (m) **(key)**  
  _Rationale:_ Correct: SLOPE/LINEST returns the slope.
- B. The intercept (b) **(key)**  
  _Rationale:_ Correct: INTERCEPT/LINEST returns the intercept.
- C. The workbook file size  
  _Rationale:_ Not a regression output.
- D. The number of worksheets  
  _Rationale:_ Not a regression output.

**MST-0645-Q0003** (single-answer, Select ONE) A two-sample t-test returns p = 0.03 at a 5% significance level. The most defensible reading is:

- A. The difference is statistically significant at the 5% level **(key)**  
  _Rationale:_ Correct: p below 0.05 is significant at the 5% level.
- B. There is a 3% chance the hypothesis is true  
  _Rationale:_ A p-value is not the probability the hypothesis is true.
- C. The effect is large and important  
  _Rationale:_ Significance does not imply a large or practically important effect.
- D. The result can never be due to chance  
  _Rationale:_ A p-value quantifies, not eliminates, chance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
