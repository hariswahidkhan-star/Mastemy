# AutoML Concepts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1323` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain what AutoML automates
2. Describe automated pipeline construction
3. Relate AutoML to search methods
4. Evaluate AutoML results honestly
5. Recognise AutoML limits and responsibilities

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What AutoML is (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain which steps AutoML can automate; (2) Decide when AutoML is a good fit
- Common misconception addressed: Believing AutoML removes the need for domain understanding
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The AutoML promise and scope | 96 | 8 |
| M01L02 | Where AutoML fits in a workflow | 96 | 8 |

### M02 Automated pipelines (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe automated feature handling; (2) Explain combined pipeline-and-model search
- Common misconception addressed: Thinking AutoML only tries one algorithm
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Feature preprocessing automation | 96 | 8 |
| M02L02 | Model and pipeline search | 96 | 8 |

### M03 Search under the hood (MASTEMY-DESIGN 20%)

- Worked applications: (1) Relate AutoML to hyperparameter search; (2) Explain how meta-learning speeds search
- Common misconception addressed: Assuming AutoML search is free of compute cost
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Hyperparameter and architecture search | 96 | 8 |
| M03L02 | Meta-learning and warm starts | 96 | 8 |

### M04 Evaluation and leakage (MASTEMY-DESIGN 20%)

- Worked applications: (1) Guard an AutoML run against leakage; (2) Interpret an AutoML leaderboard cautiously
- Common misconception addressed: Trusting the top leaderboard score as unbiased
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Honest validation in AutoML | 96 | 8 |
| M04L02 | Leaderboards and overfitting | 96 | 8 |

### M05 Limits and responsibility (MASTEMY-DESIGN 20%)

- Worked applications: (1) Flag an interpretability gap in an AutoML model; (2) Weigh AutoML cost against manual modelling
- Common misconception addressed: Deploying an AutoML model without understanding it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Interpretability and governance | 96 | 8 |
| M05L02 | Cost, lock-in and when to opt out | 96 | 8 |

## Integrative case

A small team with limited ML expertise considers an AutoML platform for a tabular prediction task. Decide what it can automate, guard against leakage, and judge interpretability and cost trade-offs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1323-final-protected | 25 | 25 | yes |
| MST-1323-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What AutoML is | 5 |
| Automated pipelines | 5 |
| Search under the hood | 5 |
| Evaluation and leakage | 5 |
| Limits and responsibility | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1323-Q0001** (single-answer, Select ONE) Which claim about AutoML is accurate?

- A. It automates parts of model building but still needs sound problem framing and data understanding **(key)**  
  _Rationale:_ Correct: AutoML automates search, not judgement.
- B. It removes any need to understand the data  
  _Rationale:_ Domain understanding is still essential.
- C. It guarantees the best possible model  
  _Rationale:_ No method guarantees optimality.
- D. It never incurs compute cost  
  _Rationale:_ Search consumes compute.

**MST-1323-Q0002** (multiple-answer, Select TWO) Which TWO steps do AutoML systems commonly automate? (Select TWO.)

- A. Trying multiple algorithms and pipelines **(key)**  
  _Rationale:_ Correct: pipeline and model search is core to AutoML.
- B. Hyperparameter search **(key)**  
  _Rationale:_ Correct: AutoML automates tuning.
- C. Defining the business objective  
  _Rationale:_ Humans must define the objective.
- D. Deciding whether the problem is worth solving  
  _Rationale:_ That is a human judgement call.

**MST-1323-Q0003** (single-answer, Select ONE) Why interpret an AutoML leaderboard's top score cautiously?

- A. Many trials can overfit the validation data, overstating the best score **(key)**  
  _Rationale:_ Correct: selection over many trials inflates the apparent winner.
- B. Leaderboards cannot rank models  
  _Rationale:_ They do rank models.
- C. The top score is always wrong  
  _Rationale:_ It is optimistic, not always wrong.
- D. Scores are random numbers  
  _Rationale:_ They are computed from data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
