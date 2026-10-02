# Bayesian Modeling and Probabilistic Machine Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0467` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-BML-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Bayesian reasoning: priors, likelihood and posteriors
2. Build and interpret simple probabilistic models
3. Choose priors and understand their influence
4. Use posterior distributions to quantify uncertainty for decisions
5. Apply and diagnose approximate inference methods

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Bayesian thinking (MASTEMY-DESIGN 20%)

- Worked applications: (1) Update a prior conceptually after observing new data; (2) Explain why a flat prior is still a modelling choice
- Common misconception addressed: Treating the prior as cheating rather than an explicit assumption
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Priors, likelihood and the posterior | 96 | 8 |
| M01L02 | Updating beliefs with evidence | 96 | 8 |

### M02 Building probabilistic models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Specify a beta-binomial model for a conversion rate; (2) Interpret a credible interval for a rate
- Common misconception addressed: Confusing a credible interval with a frequentist confidence interval
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generative models and likelihoods | 96 | 8 |
| M02L02 | Conjugate models and simple examples | 96 | 8 |

### M03 Priors and their influence (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a weakly-informative prior and justify it; (2) Run a conceptual prior-sensitivity check
- Common misconception addressed: Assuming enough data always washes out the prior
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Informative versus weakly-informative priors | 96 | 8 |
| M03L02 | Prior sensitivity and regularisation | 96 | 8 |

### M04 Uncertainty for decisions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use a posterior to decide between two options under risk; (2) Turn a posterior into a decision recommendation with uncertainty
- Common misconception addressed: Reporting a point estimate and discarding the distribution
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The posterior predictive and decision-making | 96 | 8 |
| M04L02 | Communicating uncertainty to stakeholders | 96 | 8 |

### M05 Approximate inference (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a trace plot to judge convergence; (2) Decide between MCMC and variational inference for a problem
- Common misconception addressed: Assuming a sampler that finished running has converged
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | MCMC sampling at a conceptual level | 96 | 8 |
| M05L02 | Variational inference and diagnostics | 96 | 8 |

## Integrative case

A product team has only 300 trial conversions and must estimate the true conversion rate and decide whether to launch. Build a Bayesian model, choose and defend a prior, quantify the posterior uncertainty, and make a launch recommendation that communicates the risk.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0467-final-protected | 25 | 25 | yes |
| MST-0467-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Bayesian thinking | 5 |
| Building probabilistic models | 5 |
| Priors and their influence | 5 |
| Uncertainty for decisions | 5 |
| Approximate inference | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0467-Q0001** (single-answer, Select ONE) In Bayesian inference, the posterior is proportional to…

- A. The prior times the likelihood **(key)**  
  _Rationale:_ Correct: posterior ∝ prior × likelihood.
- B. The prior minus the likelihood  
  _Rationale:_ Bayes' rule multiplies, it does not subtract.
- C. The likelihood only  
  _Rationale:_ That ignores the prior.
- D. A single point estimate  
  _Rationale:_ The posterior is a distribution, not a point.

**MST-0467-Q0002** (multiple-answer, Select TWO) Which TWO statements about a 95% credible interval are correct? (Select TWO.)

- A. The parameter lies in it with 95% posterior probability **(key)**  
  _Rationale:_ Correct: that is the Bayesian interpretation.
- B. It depends on both the prior and the data **(key)**  
  _Rationale:_ Correct: the posterior combines prior and likelihood.
- C. It is exactly the same as a frequentist confidence interval  
  _Rationale:_ Their interpretations differ.
- D. It can be computed without any model  
  _Rationale:_ A model is required to form a posterior.

**MST-0467-Q0003** (single-answer, Select ONE) As more data is observed, the prior's influence on the posterior generally…

- A. Decreases relative to the likelihood **(key)**  
  _Rationale:_ Correct: data increasingly dominates the posterior.
- B. Always overrides the likelihood  
  _Rationale:_ The opposite tends to happen.
- C. Removes all uncertainty  
  _Rationale:_ Uncertainty shrinks but does not vanish.
- D. Becomes mandatory to specify  
  _Rationale:_ A prior is always specified, data does not change that.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
