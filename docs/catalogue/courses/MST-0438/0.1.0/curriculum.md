# Feature Engineering and Feature Selection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0438` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-FE-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Handle missing data and outliers appropriately
2. Encode categorical and text features
3. Transform and scale numerical features
4. Create informative features without leakage
5. Select features with filter, wrapper and embedded methods
6. Build reproducible feature pipelines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cleaning and preparation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose an imputation strategy for a column; (2) Decide how to treat a set of outliers
- Common misconception addressed: Imputing with information that leaks the target
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Missing values and outliers | 144 | 8 |
| M01L02 | Data types and consistency | 144 | 8 |

### M02 Encoding features (MASTEMY-DESIGN 20%)

- Worked applications: (1) Encode a high-cardinality category safely; (2) Extract features from a timestamp
- Common misconception addressed: One-hot encoding a high-cardinality field blindly
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Categorical encoding | 144 | 8 |
| M02L02 | Text and datetime features | 144 | 8 |

### M03 Transforming numerics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Scale features for a distance-based model; (2) Apply a transformation to a skewed feature
- Common misconception addressed: Fitting the scaler on the full dataset before splitting
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scaling and normalisation | 144 | 8 |
| M03L02 | Transformations and binning | 144 | 8 |

### M04 Creating and avoiding leakage (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build an interaction feature with domain logic; (2) Find a leaking feature in a pipeline
- Common misconception addressed: Using future information to predict the past
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Feature creation and interactions | 144 | 8 |
| M04L02 | Detecting and preventing leakage | 144 | 8 |

### M05 Selecting features (MASTEMY-DESIGN 20%)

- Worked applications: (1) Select features with an embedded method; (2) Wrap feature steps into a leakage-safe pipeline
- Common misconception addressed: Selecting features outside the cross-validation loop
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Filter, wrapper and embedded methods | 144 | 8 |
| M05L02 | Reproducible feature pipelines | 144 | 8 |

## Integrative case

Starting from raw transactional and text data, design a feature set for a prediction task: handle missing values and categories, create informative features without leakage, select a compact subset, and justify each choice against a leakage and reproducibility checklist.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0438-final-protected | 25 | 25 | yes |
| MST-0438-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cleaning and preparation | 5 |
| Encoding features | 5 |
| Transforming numerics | 5 |
| Creating and avoiding leakage | 5 |
| Selecting features | 5 |

Minimum reviewed item bank: 462 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0438-Q0001** (single-answer, Select ONE) You impute missing values using the column mean computed over the whole dataset before splitting. What is wrong?

- A. Test-set information leaks into training through the shared mean **(key)**  
  _Rationale:_ Correct: statistics must be computed on training data only.
- B. Mean imputation is never allowed  
  _Rationale:_ Mean imputation is allowed if fit on training data only.
- C. Imputation must use the median, not the mean  
  _Rationale:_ Either can be valid; the leakage is the real problem.
- D. Nothing is wrong  
  _Rationale:_ Computing the mean on all data leaks the test set.

**MST-0438-Q0002** (multiple-answer, Select TWO) Which TWO are good ways to encode a high-cardinality categorical feature? (Select TWO.)

- A. Target encoding fit within cross-validation folds **(key)**  
  _Rationale:_ Correct: this captures signal while limiting leakage.
- B. Grouping rare categories into an 'other' bucket **(key)**  
  _Rationale:_ Correct: this reduces sparsity and overfitting.
- C. One-hot encoding thousands of distinct values directly  
  _Rationale:_ That explodes dimensionality and overfits.
- D. Assigning arbitrary integer codes and treating them as ordered  
  _Rationale:_ That invents a false ordering.

**MST-0438-Q0003** (single-answer, Select ONE) Which feature is a classic example of target leakage in a loan-default model?

- A. A 'collections status' field recorded only after default occurs **(key)**  
  _Rationale:_ Correct: it encodes the outcome itself, leaking the target.
- B. The applicant's stated annual income  
  _Rationale:_ Income is a legitimate predictor available before the decision.
- C. The loan term in months  
  _Rationale:_ Term is known at application time, not leakage.
- D. The applicant's age  
  _Rationale:_ Age is available upfront and is not the outcome.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
