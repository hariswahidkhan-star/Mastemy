# AI in Autonomous Vehicles

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2403` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | curriculum specification (design assumption, see course package); no official syllabus exists for this general professional-skills course |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI in Autonomous Vehicles (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain where machine learning is applied across the autonomous driving stack
2. Describe perception models for detection, segmentation and tracking
3. Explain prediction and behaviour modelling of other road users
4. Describe learning-based and classical approaches to planning and control
5. Discuss data, simulation and the training and validation pipeline
6. Analyse safety, robustness and ethical issues of AI driving systems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI across the stack (20% (design weight), design weight)

- Worked applications: (1) Label which stack stages use learned models; (2) Compare a modular pipeline with an end-to-end model
- Common misconception addressed: AI in a car is a single neural network that does everything with no other software
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where ML fits | 48 | 3 |
| M01L02 | Classical vs learned components | 48 | 3 |
| M01L03 | End-to-end vs modular | 48 | 3 |
| M01L04 | Compute and deployment | 48 | 3 |

### M02 Perception learning (20% (design weight), design weight)

- Worked applications: (1) Distinguish detection from segmentation on an example; (2) Explain why tracking needs temporal association
- Common misconception addressed: A single still image is enough to track a moving pedestrian over time
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Object detection | 48 | 3 |
| M02L02 | Semantic segmentation | 48 | 3 |
| M02L03 | Multi-object tracking | 48 | 3 |
| M02L04 | Sensor-specific models | 48 | 3 |

### M03 Prediction (20% (design weight), design weight)

- Worked applications: (1) Explain why the system must predict other agents' futures; (2) Represent prediction uncertainty as multiple hypotheses
- Common misconception addressed: Other road users always move in perfectly predictable straight lines
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Trajectory prediction | 48 | 3 |
| M03L02 | Intent and behaviour | 48 | 3 |
| M03L03 | Interaction modelling | 48 | 3 |
| M03L04 | Uncertainty | 48 | 3 |

### M04 Planning and control (20% (design weight), design weight)

- Worked applications: (1) Contrast imitation learning with a classical planner; (2) Explain the role of a safety filter over a learned policy
- Common misconception addressed: A learned driving policy never needs any safety guarantees
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Motion planning | 48 | 3 |
| M04L02 | Imitation and reinforcement learning | 48 | 3 |
| M04L03 | Classical control | 48 | 3 |
| M04L04 | Safety filters | 48 | 3 |

### M05 Data, simulation and safety (20% (design weight), design weight)

- Worked applications: (1) Describe how simulation generates rare scenarios for testing; (2) Explain why edge cases dominate autonomous-driving validation
- Common misconception addressed: A model that scores well on average data is automatically safe in rare cases
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data pipelines | 48 | 3 |
| M05L02 | Simulation and scenario generation | 48 | 3 |
| M05L03 | Validation and edge cases | 48 | 3 |
| M05L04 | Robustness and ethics | 48 | 3 |

## Integrative case

A team builds the perception and prediction components for an urban self-driving prototype: they must choose model types, design the data and simulation pipeline, handle uncertainty and edge cases, and argue for safety filters over the learned policy.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) across the stack, perception, prediction, planning and data/safety

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2403-final-protected | 40 | 40 | yes |
| MST-2403-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI across the stack | 8 |
| Perception learning | 8 |
| Prediction | 8 |
| Planning and control | 8 |
| Data, simulation and safety | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2403-Q0001** (single-answer, Select ONE) In a modular autonomous-driving stack, what is the usual role of the prediction component?

- A. To render the infotainment graphics  
  _Rationale:_ Prediction concerns road users' future motion, not graphics.
- B. To estimate the likely future trajectories and intentions of other road users **(key)**  
  _Rationale:_ Prediction forecasts how other agents will move so the planner can act safely.
- C. To generate electricity for the motors  
  _Rationale:_ That is unrelated to the software stack.
- D. To store map tiles on disk  
  _Rationale:_ Map storage is a mapping/localisation concern, not prediction.

**MST-2403-Q0002** (single-answer, Select ONE) Why is a safety filter or guard often placed around a learning-based driving policy?

- A. Because learned policies are always slower than classical ones  
  _Rationale:_ Speed is not the reason for a safety filter.
- B. Because a learned policy can produce unsafe or out-of-distribution actions, and the filter enforces hard safety constraints **(key)**  
  _Rationale:_ A safety filter constrains the learned output to provably safe actions, covering cases the policy was not trained on.
- C. Because it increases the model's parameter count  
  _Rationale:_ A safety filter is about constraints, not model size.
- D. Because it replaces the need for any perception  
  _Rationale:_ Perception is still required; the filter does not replace it.

**MST-2403-Q0003** (multiple-answer, Select TWO) A validation team assesses an AI perception model before deployment. Select TWO practices that specifically improve confidence in rare, safety-critical situations.

- A. Testing against curated and generated edge-case scenarios **(key)**  
  _Rationale:_ Edge-case and scenario-based testing targets exactly the rare situations average metrics miss.
- B. Estimating and monitoring model uncertainty on out-of-distribution inputs **(key)**  
  _Rationale:_ Tracking uncertainty flags inputs the model is unsure about, which matters most in rare cases.
- C. Reporting only the average accuracy on the training set  
  _Rationale:_ Training-set averages hide rare-case failures and overstate safety.
- D. Removing all unusual samples from the test set  
  _Rationale:_ Discarding hard cases conceals precisely the risks that matter.
- E. Deploying immediately after one successful demo drive  
  _Rationale:_ A single demo cannot establish safety across rare conditions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
