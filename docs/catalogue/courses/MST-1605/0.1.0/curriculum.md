# Data Analysis Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1605` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-DAF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Data Analysis Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. The analysis process and asking good questions
2. Data types, structure and cleaning
3. Summarising and exploring data
4. Visualisation and interpretation
5. Communicating findings

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate end-to-end analysis on real datasets; analysis is taught through instructor-built walkthroughs on sample data.

## Modules

### M01 The analysis process and asking good questions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Turn a vague request into a measurable analysis question; (2) List the data you would need to answer a churn question
- Common misconception addressed: Starting to chart before defining the question being answered
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What data analysis is and the analysis lifecycle | 96 | 6 |
| M01L02 | Framing questions, metrics and stakeholders | 96 | 6 |

### M02 Data types, structure and cleaning (MASTEMY-DESIGN 24%)

- Worked applications: (1) Fix a column stored as text that should be numeric; (2) Decide how to treat rows with missing values
- Common misconception addressed: Deleting every row with any missing value by reflex
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Structured data, variables and measurement levels | 96 | 6 |
| M02L02 | Cleaning: missing values, duplicates and outliers | 96 | 6 |

### M03 Summarising and exploring data (MASTEMY-DESIGN 24%)

- Worked applications: (1) Compute mean, median and spread for a price column; (2) Build a pivot/summary of sales by region and month
- Common misconception addressed: Reporting the mean when a skewed distribution calls for the median
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Descriptive statistics: centre, spread and distribution | 96 | 6 |
| M03L02 | Grouping, aggregation and exploratory analysis | 96 | 6 |

### M04 Visualisation and interpretation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose the right chart for a part-to-whole comparison; (2) Spot a misleading truncated y-axis in a chart
- Common misconception addressed: Using a pie chart for many categories or for time trends
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Choosing and reading charts | 96 | 6 |
| M04L02 | Interpreting results, correlation vs causation | 96 | 6 |

### M05 Communicating findings (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a headline finding plus one caveat for an executive; (2) Rebuild a cluttered chart into one clear message
- Common misconception addressed: Presenting every number instead of the decision-relevant ones
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Telling a clear data story | 96 | 6 |
| M05L02 | Reporting responsibly: caveats and limitations | 96 | 6 |

## Integrative case

You are given a messy sales export. Define the question, clean the data (types, missing values, duplicates), compute summary statistics by region, visualise the trend, and write a one-paragraph finding with its main caveat for a non-technical manager.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1605-final-protected | 25 | 25 | yes |
| MST-1605-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The analysis process and asking good questions | 5 |
| Data types, structure and cleaning | 5 |
| Summarising and exploring data | 5 |
| Visualisation and interpretation | 5 |
| Communicating findings | 5 |

Minimum reviewed item bank: 338 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1605-Q0001** (single-answer, Select ONE) A price column is heavily skewed by a few very large values. Which measure best represents a typical value?

- A. The median **(key)**  
  _Rationale:_ Correct: the median resists skew and extreme values better than the mean.
- B. The mean  
  _Rationale:_ The mean is pulled toward the extreme values in a skewed distribution.
- C. The maximum  
  _Rationale:_ The maximum is one extreme value, not a typical one.
- D. The sum  
  _Rationale:_ The sum is a total, not a measure of a typical value.

**MST-1605-Q0002** (multiple-answer, Select ALL that apply) Which of the following are sound reasons to prefer the median over the mean in a report? (Select TWO)

- A. The data is skewed by a few extreme values **(key)**  
  _Rationale:_ Correct: the median is robust to skew and outliers.
- B. A small number of outliers would distort the average **(key)**  
  _Rationale:_ Correct: outliers pull the mean but barely move the median.
- C. You want the total across all records  
  _Rationale:_ A total calls for the sum, not the median.
- D. The data is perfectly symmetric with no outliers  
  _Rationale:_ When data is symmetric with no outliers, mean and median agree and either is fine.

**MST-1605-Q0003** (single-answer, Select ONE) Two variables rise together across a dataset. What is the safest conclusion?

- A. They are correlated, but this alone does not prove one causes the other **(key)**  
  _Rationale:_ Correct: correlation does not establish causation without further evidence.
- B. One definitely causes the other  
  _Rationale:_ Co-movement alone cannot establish a causal direction.
- C. They must be unrelated  
  _Rationale:_ They are clearly related; the question is whether the relationship is causal.
- D. The data must be wrong  
  _Rationale:_ Correlation between variables is common and does not imply an error.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
