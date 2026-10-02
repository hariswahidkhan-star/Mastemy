# Text Classification and Sentiment Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1360` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Text representation
2. Classification models
3. Sentiment and nuance
4. Evaluation and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Text representation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a TF-IDF representation; (2) Choose embeddings vs TF-IDF
- Common misconception addressed: Assuming heavy cleaning like stopword removal always helps
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tokenisation and cleaning | 120 | 8 |
| M01L02 | Bag-of-words, TF-IDF and embeddings | 120 | 8 |

### M02 Classification models (MASTEMY-DESIGN 25%)

- Worked applications: (1) Train a linear baseline classifier; (2) Fine-tune a transformer for classification
- Common misconception addressed: Reaching for a large transformer before trying a strong baseline
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Linear baselines for text | 120 | 8 |
| M02L02 | Transformer classifiers and fine-tuning | 120 | 8 |

### M03 Sentiment and nuance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Handle negation in sentiment; (2) Adapt a model to a new domain
- Common misconception addressed: Treating sentiment as a solved, context-free lookup of positive words
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sentiment, polarity and aspects | 120 | 8 |
| M03L02 | Negation, sarcasm and domain shift | 120 | 8 |

### M04 Evaluation and deployment (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick metrics for an imbalanced set; (2) Tune a decision threshold
- Common misconception addressed: Reporting accuracy on a heavily imbalanced dataset
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Metrics for imbalanced classes | 120 | 8 |
| M04L02 | Thresholds, calibration and monitoring | 120 | 8 |

## Integrative case

A product team wants to route support tickets by topic and flag angry customers. Choose representations, a baseline then a transformer, handle negation and domain shift, and evaluate with imbalance-aware metrics and calibrated thresholds.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1360-final-protected | 20 | 20 | yes |
| MST-1360-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Text representation | 5 |
| Classification models | 5 |
| Sentiment and nuance | 5 |
| Evaluation and deployment | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1360-Q0001** (single-answer, Select ONE) A sentiment model labels 'not good at all' as positive. The most likely cause is:

- A. The model mishandles negation and keys on the word 'good' **(key)**  
  _Rationale:_ Correct: negation flips polarity and must be modelled.
- B. The dataset is too large  
  _Rationale:_ Size is unrelated to negation handling.
- C. The GPU is too slow  
  _Rationale:_ Hardware does not cause this error.
- D. The text was lower-cased  
  _Rationale:_ Casing does not explain inverted polarity.

**MST-1360-Q0002** (multiple-answer, Select TWO) For a dataset that is 95% 'not angry' and 5% 'angry', which TWO metrics are more informative than raw accuracy? (Select TWO.)

- A. Recall on the 'angry' class **(key)**  
  _Rationale:_ Correct: recall shows how many angry tickets are caught.
- B. F1 for the minority class **(key)**  
  _Rationale:_ Correct: F1 balances precision and recall on the rare class.
- C. Overall accuracy  
  _Rationale:_ Accuracy is misleading when classes are imbalanced.
- D. Training wall-clock time  
  _Rationale:_ Not a predictive-quality metric.

**MST-1360-Q0003** (single-answer, Select ONE) Why try a TF-IDF linear baseline before fine-tuning a transformer?

- A. It is cheap, fast and often strong enough, setting a bar to beat **(key)**  
  _Rationale:_ Correct: baselines quantify whether the transformer's cost is justified.
- B. It always beats transformers  
  _Rationale:_ Not always; it is a baseline, not a guarantee.
- C. Transformers cannot classify text  
  _Rationale:_ They can and often do best.
- D. TF-IDF requires a GPU  
  _Rationale:_ TF-IDF runs on CPU cheaply.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
