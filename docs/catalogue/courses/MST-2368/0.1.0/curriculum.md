# AI for Energy Optimization: Forecasting, Control and Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2368` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (general professional skills course; no external standard claimed). Outcomes are Mastemy internal IDs derived from the course blueprint; scope versioned by verification date, not an issuer syllabus edition. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI for Energy Optimization: Forecasting, Control and Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify where AI and machine learning add value across the energy system
2. Describe forecasting of demand, generation and prices and how it is evaluated
3. Explain optimisation and control uses such as dispatch and demand response
4. Outline data and sensing foundations needed for energy AI
5. Recognise risks: reliability, safety, bias and the limits of models
6. Frame a responsible AI-for-energy use case with human oversight

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Where AI helps (25% (design weight), design weight)

- Worked applications: (1) Classify five energy tasks as forecasting, optimisation or detection; (2) Choose the AI task for reducing a wind farm's imbalance cost
- Common misconception addressed: Assuming AI replaces physical understanding of the system
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Mapping energy problems to AI tasks | 120 | 7 |
| M01L02 | Forecasting vs optimisation vs anomaly detection | 120 | 7 |

### M02 Forecasting (25% (design weight), design weight)

- Worked applications: (1) Pick an error metric for a day-ahead load forecast; (2) Explain why a forecast needs an uncertainty range
- Common misconception addressed: Judging a forecast on a single lucky day
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Demand, generation and price forecasting | 120 | 7 |
| M02L02 | Evaluating forecasts and handling uncertainty | 120 | 7 |

### M03 Optimisation and control (25% (design weight), design weight)

- Worked applications: (1) Formulate a battery-dispatch objective and constraints; (2) Design an AI demand-response signal that respects comfort limits
- Common misconception addressed: Letting an optimiser act without operating constraints
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Optimising dispatch and storage operation | 120 | 7 |
| M03L02 | AI-driven demand response and flexibility | 120 | 7 |

### M04 Data, risk and oversight (25% (design weight), design weight)

- Worked applications: (1) List the sensor and data gaps for a predictive-maintenance model; (2) Add a human check before an AI control action goes live
- Common misconception addressed: Trusting a model's output without monitoring or fallback
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data, sensing and feature foundations | 120 | 7 |
| M04L02 | Reliability, safety and human oversight | 120 | 7 |

## Integrative case

A utility wants to pilot AI to cut balancing costs: map the candidate tasks to forecasting, optimisation and detection, choose evaluation metrics, design a battery-dispatch and demand-response approach with operating constraints, and build in data quality checks and human oversight.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; 40 items / 40 minutes is a Mastemy design choice for a focused skills final.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2368-final-protected | 40 | 40 | yes |
| MST-2368-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Where AI helps | 10 |
| Forecasting | 10 |
| Optimisation and control | 10 |
| Data, risk and oversight | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2368-Q0001** (single-answer, Select ONE) Which problem is best framed as a forecasting task rather than an optimisation task?

- A. Predicting tomorrow's hourly electricity demand **(key)**  
  _Rationale:_ Estimating a future quantity from data is a forecasting task.
- B. Deciding the cheapest schedule to charge a battery  
  _Rationale:_ Choosing a schedule under constraints is optimisation.
- C. Allocating reserve across units to minimise cost  
  _Rationale:_ That is an optimisation problem.
- D. Selecting setpoints to minimise energy use  
  _Rationale:_ Choosing setpoints to minimise cost is optimisation.

**MST-2368-Q0002** (multiple-answer, Select TWO) Which TWO practices make an AI-for-energy deployment more trustworthy? (Select TWO.)

- A. Reporting forecast uncertainty alongside point predictions **(key)**  
  _Rationale:_ Communicating uncertainty supports sound operating decisions.
- B. Keeping a human-in-the-loop check before automated control actions **(key)**  
  _Rationale:_ Human oversight guards against unsafe model actions.
- C. Hiding model errors so operators stay confident  
  _Rationale:_ Concealing errors undermines safety and trust.
- D. Removing all monitoring once the model is live  
  _Rationale:_ Ongoing monitoring is essential for reliability.

**MST-2368-Q0003** (single-answer, Select ONE) Why should an AI optimiser controlling battery dispatch include explicit operating constraints?

- A. To keep its actions within safe and physical limits such as state-of-charge and power bounds **(key)**  
  _Rationale:_ Constraints prevent the optimiser from choosing unsafe or infeasible actions.
- B. Because constraints make the model train faster on any hardware  
  _Rationale:_ Constraints are about feasibility and safety, not training speed.
- C. Because without them the battery would produce more energy than it stores  
  _Rationale:_ Constraints do not create energy; they bound feasible actions.
- D. Because regulators require the model to be a neural network  
  _Rationale:_ No such requirement exists; constraints ensure safe operation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
