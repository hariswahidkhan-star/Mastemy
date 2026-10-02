# Anomaly Detection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1319` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame problems and classify anomaly types
2. Apply statistical outlier methods
3. Apply distance- and density-based methods
4. Apply model-based detectors
5. Evaluate detectors and operate them responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Framing anomalies (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three deviations by anomaly type; (2) Frame a monitoring problem as anomaly detection
- Common misconception addressed: Treating every outlier as an error to delete
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What counts as an anomaly | 96 | 8 |
| M01L02 | Point, contextual and collective anomalies | 96 | 8 |

### M02 Statistical methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Flag outliers with the IQR rule; (2) Choose a threshold and justify the trade-off
- Common misconception addressed: Assuming data is always normally distributed
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Z-scores and the IQR rule | 96 | 8 |
| M02L02 | Distribution-based thresholds | 96 | 8 |

### M03 Distance and density methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why LOF finds local anomalies; (2) Pick a method for high-dimensional data
- Common misconception addressed: Believing one distance metric fits every dataset
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | k-NN and distance scores | 96 | 8 |
| M03L02 | Local Outlier Factor and clustering | 96 | 8 |

### M04 Model-based methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain how Isolation Forest isolates points; (2) Use reconstruction error as an anomaly score
- Common misconception addressed: Thinking deep models always beat simple ones
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Isolation Forest | 96 | 8 |
| M04L02 | Autoencoder reconstruction error | 96 | 8 |

### M05 Evaluation and operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a metric for rare-event detection; (2) Set an alerting threshold that limits false alarms
- Common misconception addressed: Judging rare-event detectors by accuracy alone
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Precision, recall and base rates | 96 | 8 |
| M05L02 | Thresholds, drift and alert fatigue | 96 | 8 |

## Integrative case

A payments team wants to flag fraudulent transactions in a highly imbalanced stream. Choose detection methods, set thresholds, select evaluation metrics, and plan for drift and alert fatigue.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1319-final-protected | 25 | 25 | yes |
| MST-1319-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framing anomalies | 5 |
| Statistical methods | 5 |
| Distance and density methods | 5 |
| Model-based methods | 5 |
| Evaluation and operations | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1319-Q0001** (single-answer, Select ONE) Why is plain accuracy a poor metric for rare-anomaly detection?

- A. A model predicting 'normal' for everything scores high accuracy while missing all anomalies **(key)**  
  _Rationale:_ Correct: with a tiny base rate, accuracy is dominated by the majority class.
- B. Accuracy cannot be computed on imbalanced data  
  _Rationale:_ It can be computed; it is just misleading.
- C. Accuracy measures only training time  
  _Rationale:_ Accuracy measures correct classifications, not time.
- D. Accuracy always equals recall  
  _Rationale:_ They are different metrics.

**MST-1319-Q0002** (multiple-answer, Select TWO) Which TWO are genuine anomaly-detection methods? (Select TWO.)

- A. Isolation Forest **(key)**  
  _Rationale:_ Correct: it isolates anomalies via random partitioning.
- B. Autoencoder reconstruction error **(key)**  
  _Rationale:_ Correct: high reconstruction error flags anomalies.
- C. Sorting rows alphabetically  
  _Rationale:_ Sorting is not a detection method.
- D. Renaming columns  
  _Rationale:_ Renaming does not detect anomalies.

**MST-1319-Q0003** (single-answer, Select ONE) What does a contextual anomaly depend on that a point anomaly does not?

- A. Context such as time or location, so a value is anomalous only in that setting **(key)**  
  _Rationale:_ Correct: context defines a contextual anomaly.
- B. The alphabetical order of labels  
  _Rationale:_ Ordering of labels is irrelevant.
- C. The file format of the data  
  _Rationale:_ File format does not define anomaly type.
- D. Nothing; it is identical to a point anomaly  
  _Rationale:_ It specifically depends on context.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
