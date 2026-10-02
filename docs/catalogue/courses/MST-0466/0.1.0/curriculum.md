# Causal Machine Learning for Business Decisions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0466` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-CIM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish correlation from causation and why it matters for decisions
2. Express causal questions with interventions and counterfactuals
3. Identify confounding and use design to address it
4. Estimate treatment effects and uplift from data
5. Communicate causal findings and their assumptions to decision-makers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Correlation versus causation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reframe a predictive question as a causal one; (2) Spot a decision that needs a causal, not predictive, answer
- Common misconception addressed: Assuming a strong predictor justifies acting to change it
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why predictive models do not answer 'what if' | 96 | 8 |
| M01L02 | Interventions, counterfactuals and the ladder of causation | 96 | 8 |

### M02 Confounding and bias (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draw a DAG for a pricing-and-demand question; (2) Identify a confounder that reverses a naive conclusion
- Common misconception addressed: Believing that controlling for every available variable is always safer
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Confounders, colliders and selection bias | 96 | 8 |
| M02L02 | Causal diagrams (DAGs) for business problems | 96 | 8 |

### M03 Experiments and quasi-experiments (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a quasi-experimental design when an A/B test is impossible; (2) Check the parallel-trends assumption for a difference-in-differences
- Common misconception addressed: Believing observational data with controls equals an experiment
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Randomised experiments as the gold standard | 96 | 8 |
| M03L02 | Difference-in-differences, matching and instruments | 96 | 8 |

### M04 Estimating effects and uplift (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a conditional treatment effect for two customer segments; (2) Decide whom to target from an uplift model
- Common misconception addressed: Targeting the most likely to convert instead of the persuadable
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Average and heterogeneous treatment effects | 96 | 8 |
| M04L02 | Uplift modelling for targeting | 96 | 8 |

### M05 Communicating causal claims (MASTEMY-DESIGN 20%)

- Worked applications: (1) List the assumptions behind a causal claim for stakeholders; (2) Translate a treatment effect into an expected ROI with caveats
- Common misconception addressed: Presenting a causal estimate as certain regardless of its assumptions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Stating assumptions and sensitivity | 96 | 8 |
| M05L02 | From effect estimate to business decision | 96 | 8 |

## Integrative case

A retailer wants to know whether a loyalty discount causes repeat purchases, not merely correlates with them. Frame the causal question, draw the DAG, choose an experiment or quasi-experiment, estimate the uplift, and brief leadership with the assumptions stated.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0466-final-protected | 25 | 25 | yes |
| MST-0466-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Correlation versus causation | 5 |
| Confounding and bias | 5 |
| Experiments and quasi-experiments | 5 |
| Estimating effects and uplift | 5 |
| Communicating causal claims | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0466-Q0001** (single-answer, Select ONE) A model shows ice-cream sales predict drownings. Acting to cut ice-cream sales would not reduce drownings because…

- A. A confounder (hot weather) drives both **(key)**  
  _Rationale:_ Correct: a common cause creates the correlation without causation.
- B. The model is overfit  
  _Rationale:_ Overfitting is not the issue here.
- C. Correlation always equals causation  
  _Rationale:_ This is exactly the fallacy to avoid.
- D. The sample is too small  
  _Rationale:_ Sample size is not the core problem.

**MST-0466-Q0002** (multiple-answer, Select TWO) Which TWO support a causal, not merely predictive, conclusion? (Select TWO.)

- A. A randomised experiment **(key)**  
  _Rationale:_ Correct: randomisation breaks confounding.
- B. A valid instrument or quasi-experiment with checked assumptions **(key)**  
  _Rationale:_ Correct: a sound design can identify a causal effect.
- C. A high R-squared alone  
  _Rationale:_ Fit does not establish causation.
- D. A large correlation coefficient  
  _Rationale:_ Correlation alone is not causation.

**MST-0466-Q0003** (single-answer, Select ONE) Uplift modelling targets customers who are…

- A. Persuadable — they act only if treated **(key)**  
  _Rationale:_ Correct: uplift targets those whose behaviour the treatment changes.
- B. Already certain to buy regardless  
  _Rationale:_ Treating sure buyers wastes the intervention.
- C. Impossible to reach  
  _Rationale:_ Unreachable customers are not the target.
- D. Chosen at random  
  _Rationale:_ Uplift targeting is the opposite of random.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
