# Data Literacy for AI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1309` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe what makes data suitable for AI use
2. Identify common data quality problems
3. Explain how data is collected, labelled and split
4. Recognise bias and representativeness issues in data
5. Apply basic data ethics and privacy considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What data is (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify datasets as structured or not; (2) Identify features and a label in a table
- Common misconception addressed: Thinking only spreadsheets count as data
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Structured and unstructured data | 48 | 4 |
| M01L02 | Features, labels and rows | 48 | 4 |

### M02 Data quality (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot three quality issues in a sample; (2) Propose a fix for missing values
- Common misconception addressed: Assuming more data is always better
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Missing, noisy and duplicate data | 48 | 4 |
| M02L02 | Measuring data quality | 48 | 4 |

### M03 Data pipeline (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why a test set must be held out; (2) Describe a labelling step
- Common misconception addressed: Reusing test data during training
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Collection and labelling | 48 | 4 |
| M03L02 | Train, validation and test splits | 48 | 4 |

### M04 Bias and representativeness (MASTEMY-DESIGN 20%)

- Worked applications: (1) Find a group under-represented in a sample; (2) Explain an imbalance's effect on a model
- Common misconception addressed: Assuming a convenient sample is representative
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sampling bias | 48 | 4 |
| M04L02 | Skewed and imbalanced data | 48 | 4 |

### M05 Data ethics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Flag personal data that needs protection; (2) Draft a one-line data-use statement
- Common misconception addressed: Collecting data without a clear purpose
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Privacy and consent | 48 | 4 |
| M05L02 | Responsible data handling | 48 | 4 |

## Integrative case

A startup wants to train a model on customer records. Review their data for quality, representativeness and privacy problems, and recommend what to fix before any modelling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1309-final-protected | 25 | 25 | yes |
| MST-1309-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What data is | 5 |
| Data quality | 5 |
| Data pipeline | 5 |
| Bias and representativeness | 5 |
| Data ethics | 5 |

Minimum reviewed item bank: 214 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1309-Q0001** (single-answer, Select ONE) Why must a test set be kept separate from training data?

- A. To estimate how the model performs on unseen data **(key)**  
  _Rationale:_ Correct: held-out data gives an honest performance estimate.
- B. To give the model more data to memorise  
  _Rationale:_ Reusing test data defeats its purpose.
- C. Because test data is always higher quality  
  _Rationale:_ Quality is not the reason for separation.
- D. To make training run faster  
  _Rationale:_ Separation is about honest evaluation, not speed.

**MST-1309-Q0002** (multiple-answer, Select TWO) Which TWO are common data quality problems? (Select TWO.)

- A. Missing values in important fields **(key)**  
  _Rationale:_ Correct: missingness harms model learning.
- B. Duplicate records inflating some patterns **(key)**  
  _Rationale:_ Correct: duplicates can bias results.
- C. Data stored in a table  
  _Rationale:_ Tabular storage is normal, not a defect.
- D. Having column headers  
  _Rationale:_ Headers are helpful, not a problem.

**MST-1309-Q0003** (single-answer, Select ONE) A dataset collected only from one city is used to model nationwide behaviour. The main risk is:

- A. Sampling bias leading to poor generalisation **(key)**  
  _Rationale:_ Correct: the sample is not representative of the nation.
- B. Too much privacy protection  
  _Rationale:_ Privacy is not the issue here.
- C. The data being structured  
  _Rationale:_ Structure is not the problem.
- D. Having too many rows  
  _Rationale:_ Volume is not the representativeness issue.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
