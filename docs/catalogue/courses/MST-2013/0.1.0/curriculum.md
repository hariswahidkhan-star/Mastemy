# Machine Learning for Materials and Chemistry: Data, Models and Discovery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2013` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Machine Learning for Materials and Chemistry: Data, Models and Discovery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the materials and chemistry data landscape
2. Featurise materials and reactions for learning
3. Apply supervised and generative models to discovery
4. Design screening and active-learning discovery loops
5. Validate models and avoid common pitfalls
6. Plan responsible, reproducible discovery workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Data landscape (17% (design weight), design weight)

- Worked applications: (1) Audit a materials data set for provenance and bias; (2) Decide whether a target property is well sampled
- Common misconception addressed: Assuming a public data set is clean and unbiased
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Materials and chemistry data sources | 81 | 5 |
| M01L02 | Data quality, bias and provenance | 82 | 5 |

### M02 Featurisation (17% (design weight), design weight)

- Worked applications: (1) Featurise a material from its composition and structure; (2) Represent a reaction for a predictive model
- Common misconception addressed: Using only composition when structure drives the property
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Composition and structure features | 81 | 5 |
| M02L02 | Reaction and process representations | 82 | 5 |

### M03 Models for discovery (17% (design weight), design weight)

- Worked applications: (1) Choose a supervised model for a property target; (2) Decide when generative inverse design is appropriate
- Common misconception addressed: Treating a generative model's output as a synthesisable material
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Supervised property models | 81 | 5 |
| M03L02 | Generative and inverse-design models | 82 | 5 |

### M04 Discovery loops (17% (design weight), design weight)

- Worked applications: (1) Set up a virtual screening funnel with filters; (2) Design an active-learning loop to cut experiments
- Common misconception addressed: Screening on an unvalidated model without any lab feedback
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | High-throughput virtual screening | 81 | 5 |
| M04L02 | Active learning and Bayesian optimisation | 82 | 5 |

### M05 Validation (16% (design weight), design weight)

- Worked applications: (1) Pick a baseline and a realistic benchmark split; (2) Diagnose leakage in a materials pipeline
- Common misconception addressed: Comparing a model only against a random guess
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Realistic benchmarks and baselines | 77 | 5 |
| M05L02 | Common pitfalls and leakage | 77 | 5 |

### M06 Responsible workflows (16% (design weight), design weight)

- Worked applications: (1) Make a discovery workflow reproducible end to end; (2) Plan the experimental step that validates a candidate
- Common misconception addressed: Reporting discoveries that were never experimentally checked
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Reproducibility and experiment tracking | 77 | 5 |
| M06L02 | Closing the loop with experiment | 77 | 5 |

## Integrative case

A materials-discovery team hunts for a new catalyst: a trainee must audit the data, featurise candidates, run a model-driven virtual screen inside an active-learning loop, validate against a realistic benchmark, and plan the experiments that confirm the most promising candidates.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2013-final-protected | 40 | 40 | yes |
| MST-2013-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data landscape | 7 |
| Featurisation | 7 |
| Models for discovery | 7 |
| Discovery loops | 7 |
| Validation | 6 |
| Responsible workflows | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2013-Q0001** (single-answer, Select ONE) Why is an active-learning loop valuable in experimental materials discovery?

- A. It chooses the most informative experiments next, reducing the number needed to find good materials **(key)**  
  _Rationale:_ Correct: active learning targets experiments that most improve the model.
- B. It removes the need to ever run experiments  
  _Rationale:_ It guides experiments; it does not eliminate them.
- C. It guarantees the first candidate will be optimal  
  _Rationale:_ It improves efficiency, not a guarantee of optimality.
- D. It only works without any model  
  _Rationale:_ Active learning relies on a model to rank candidate experiments.

**MST-2013-Q0002** (multiple-answer, Select TWO) Which TWO issues most threaten a materials machine-learning study's validity? (Select TWO.)

- A. Data leakage between training and test sets **(key)**  
  _Rationale:_ Correct: leakage inflates apparent performance.
- B. Biased or non-representative training data **(key)**  
  _Rationale:_ Correct: biased data yields models that fail to generalise.
- C. Using version control for the analysis code  
  _Rationale:_ Version control helps reproducibility; it is not a threat.
- D. Documenting the data provenance  
  _Rationale:_ Documentation strengthens, not threatens, validity.

**MST-2013-Q0003** (single-answer, Select ONE) What should happen after a model flags a promising new material?

- A. The candidate is experimentally synthesised and tested before any discovery claim **(key)**  
  _Rationale:_ Correct: predictions are hypotheses that require experimental confirmation.
- B. The discovery is announced immediately without testing  
  _Rationale:_ Unvalidated predictions are not discoveries.
- C. The model output is treated as a finished material  
  _Rationale:_ A prediction is not a synthesised, verified material.
- D. No further work is needed  
  _Rationale:_ Experimental validation is the essential next step.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
