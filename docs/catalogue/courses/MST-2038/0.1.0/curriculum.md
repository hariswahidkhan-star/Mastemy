# AI in Experimental Physics and Simulation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2038` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — AI in Experimental Physics and Simulation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe how AI assists experiment design, control and data acquisition
2. Apply surrogate and emulator models to accelerate simulations
3. Use AI for anomaly detection and triggering in large datasets
4. Explain uncertainty quantification and calibration for AI in physics
5. Evaluate reproducibility, validation and the limits of AI-assisted results
6. Reason about accountability and verification when AI informs physics decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in the experimental loop (25% (design weight), design weight)

- Worked applications: (1) Propose an active-learning loop to choose the next measurement; (2) Identify where a learned controller could stabilise an apparatus
- Common misconception addressed: Assuming an AI controller needs no safety limits or human oversight
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | AI for experiment design and active learning | 120 | 7 |
| M01L02 | Real-time control and data acquisition | 120 | 7 |

### M02 Surrogates and emulators (25% (design weight), design weight)

- Worked applications: (1) Replace a slow simulation with a trained emulator and bound its error; (2) Use an emulator for Bayesian parameter estimation
- Common misconception addressed: Trusting an emulator outside the range of its training data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Surrogate models for expensive simulations | 120 | 7 |
| M02L02 | Emulators, inference and parameter estimation | 120 | 7 |

### M03 Detection at scale (25% (design weight), design weight)

- Worked applications: (1) Design an anomaly detector for a detector-health stream; (2) Set a trigger threshold balancing false positives and missed events
- Common misconception addressed: Treating every statistical anomaly as a physical discovery
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Anomaly detection and triggering | 120 | 7 |
| M03L02 | Signal extraction from noisy, high-volume data | 120 | 7 |

### M04 Trust, uncertainty and accountability (25% (design weight), design weight)

- Worked applications: (1) Check whether a model's predicted uncertainties are calibrated; (2) Design a validation plan before an AI result informs a decision
- Common misconception addressed: Reporting an AI prediction without its uncertainty or validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Uncertainty quantification and calibration | 120 | 7 |
| M04L02 | Validation, reproducibility and accountability | 120 | 7 |

## Integrative case

A facility deploys an AI trigger to flag rare events in a high-rate detector: calibrate its uncertainty, validate it against simulated and known signals, set thresholds that balance false alarms against missed physics, and define who verifies a flagged discovery before it is announced.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2038-final-protected | 40 | 40 | yes |
| MST-2038-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in the experimental loop | 10 |
| Surrogates and emulators | 10 |
| Detection at scale | 10 |
| Trust, uncertainty and accountability | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2038-Q0001** (single-answer, Select ONE) A fast neural-network emulator replaces an expensive physics simulation. What is the main risk when using it for new parameter values?

- A. It may extrapolate unreliably outside the range of its training data **(key)**  
  _Rationale:_ Correct: emulators are trustworthy mainly within their training domain and can fail on extrapolation.
- B. It will always be slower than the original simulation  
  _Rationale:_ Emulators are used precisely because they are faster.
- C. It cannot represent any physical behaviour  
  _Rationale:_ A trained emulator can reproduce in-domain behaviour well.
- D. It eliminates the need to understand the physics  
  _Rationale:_ Interpreting and validating results still requires physics understanding.

**MST-2038-Q0002** (multiple-answer, Select TWO) Which TWO practices are essential before an AI-flagged anomaly is treated as a physics discovery? (Select TWO.)

- A. Validating the model against known signals and simulated backgrounds **(key)**  
  _Rationale:_ Correct: validation against known cases is essential before claiming discovery.
- B. Quantifying and reporting the statistical significance and uncertainty **(key)**  
  _Rationale:_ Correct: significance and uncertainty must be established, not just a flag.
- C. Announcing the result immediately to establish priority  
  _Rationale:_ Premature announcement without verification is irresponsible.
- D. Removing all events the model is unsure about to clean the plot  
  _Rationale:_ Selectively discarding data biases the result.

**MST-2038-Q0003** (single-answer, Select ONE) Why is calibration of predicted uncertainties important when AI informs a physics decision?

- A. A model whose confidence does not match its true error rate can mislead decisions **(key)**  
  _Rationale:_ Correct: well-calibrated uncertainties let decision-makers weigh AI outputs correctly.
- B. Calibration makes the model faster  
  _Rationale:_ Calibration concerns reliability of uncertainty, not speed.
- C. Calibration guarantees the prediction is correct  
  _Rationale:_ Calibration aligns stated confidence with accuracy; it does not guarantee correctness.
- D. Uncertainty is irrelevant if accuracy is high  
  _Rationale:_ Even accurate models need honest uncertainty for rare or novel cases.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
