# AI Model Evaluation and Benchmark Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0462` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the purpose and limits of model evaluation and benchmarks
2. Choose evaluation metrics aligned to the task and stakeholder goals
3. Design valid train/validation/test splits and avoid leakage
4. Construct and critique benchmarks for fairness and representativeness
5. Interpret and communicate evaluation results honestly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether an offline metric or an A/B test answers a given question; (2) Name three questions a leaderboard score does not answer
- Common misconception addressed: Treating a single benchmark number as overall model quality
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What evaluation can and cannot tell you | 96 | 8 |
| M01L02 | Offline versus online evaluation | 96 | 8 |

### M02 Choosing metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick a metric for an imbalanced medical-screening task; (2) Justify precision@k for a recommendation feature
- Common misconception addressed: Defaulting to accuracy regardless of class balance or error cost
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classification, regression and ranking metrics | 96 | 8 |
| M02L02 | Matching metrics to costs and stakeholders | 96 | 8 |

### M03 Valid experimental design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot leakage in a time-series split that shuffles rows; (2) Decide whether a 0.3% improvement is meaningful given variance
- Common misconception addressed: Assuming a higher test score always means a better model
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Splits, cross-validation and data leakage | 96 | 8 |
| M03L02 | Statistical significance and confidence | 96 | 8 |

### M04 Designing benchmarks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Audit a benchmark for subgroup coverage gaps; (2) Detect likely train/test contamination in a reused dataset
- Common misconception addressed: Believing a popular benchmark is automatically representative
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building a representative benchmark dataset | 96 | 8 |
| M04L02 | Contamination, saturation and subgroup fairness | 96 | 8 |

### M05 Reporting results responsibly (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rewrite an overstated result claim into an honest one; (2) Draft the limitations section of an evaluation report
- Common misconception addressed: Reporting a point estimate with no uncertainty or scope
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Communicating uncertainty and limitations | 96 | 8 |
| M05L02 | Model cards and reproducible evaluation reports | 96 | 8 |

## Integrative case

A team must decide whether a new classifier is ready to ship. Choose metrics, design a leakage-free evaluation, check the benchmark for subgroup fairness, and write an honest go/no-go report for product leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0462-final-protected | 25 | 25 | yes |
| MST-0462-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of evaluation | 5 |
| Choosing metrics | 5 |
| Valid experimental design | 5 |
| Designing benchmarks | 5 |
| Reporting results responsibly | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0462-Q0001** (single-answer, Select ONE) Why can a model score highly on a public benchmark yet fail in production?

- A. The benchmark may not represent the real distribution, or be contaminated **(key)**  
  _Rationale:_ Correct: benchmark gains need not transfer to the production population.
- B. Accuracy is always wrong  
  _Rationale:_ Accuracy is sometimes appropriate; the issue is representativeness.
- C. Benchmarks cannot be used legally  
  _Rationale:_ This is not the reason.
- D. Production systems have no data  
  _Rationale:_ Production has data; the mismatch is distributional.

**MST-0462-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce data leakage in evaluation? (Select TWO.)

- A. Split time-series data by time rather than randomly **(key)**  
  _Rationale:_ Correct: random shuffling lets future rows leak into training.
- B. Fit preprocessing on the training split only **(key)**  
  _Rationale:_ Correct: fitting on all data leaks test information.
- C. Tune hyperparameters on the test set  
  _Rationale:_ This leaks the test set into model selection.
- D. Copy some test rows into training  
  _Rationale:_ This is direct leakage and inflates scores.

**MST-0462-Q0003** (single-answer, Select ONE) For a highly imbalanced fraud dataset, which metric is most informative?

- A. Precision-recall (AUPRC) **(key)**  
  _Rationale:_ Correct: PR curves focus on the rare positive class.
- B. Raw accuracy  
  _Rationale:_ Accuracy is dominated by the majority class and can be misleading.
- C. Number of rows  
  _Rationale:_ Dataset size is not a performance metric.
- D. Training time  
  _Rationale:_ Speed is not a quality metric.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
