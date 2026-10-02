# Interpretable Machine Learning and Explainability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0440` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-IMESL-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish interpretability from explainability
2. Use inherently interpretable models
3. Apply global explanation methods
4. Apply local explanation methods (LIME, SHAP)
5. Judge the faithfulness and limits of explanations
6. Communicate explanations to different audiences

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why interpretability matters (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map explanation needs for three audiences; (2) Decide when a black box is acceptable
- Common misconception addressed: Assuming any explanation is faithful to the model
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Interpretability vs explainability | 144 | 8 |
| M01L02 | Stakeholders and requirements | 144 | 8 |

### M02 Interpretable models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a linear model's contributions; (2) Choose an interpretable model for a case
- Common misconception addressed: Equating simple with always better
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Linear, logistic and rule models | 144 | 8 |
| M02L02 | Generalised additive models and trees | 144 | 8 |

### M03 Global explanations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute and read feature importance; (2) Interpret a partial-dependence plot
- Common misconception addressed: Reading correlated-feature importances independently
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Feature importance | 144 | 8 |
| M03L02 | Partial dependence and accumulated effects | 144 | 8 |

### M04 Local explanations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain a single prediction with SHAP; (2) Compare LIME and SHAP on one case
- Common misconception addressed: Treating a local explanation as globally true
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | LIME | 144 | 8 |
| M04L02 | SHAP and additive attributions | 144 | 8 |

### M05 Faithfulness and communication (MASTEMY-DESIGN 20%)

- Worked applications: (1) Test whether an explanation is faithful; (2) Write an explanation for a non-expert
- Common misconception addressed: Using explanations to justify rather than to understand
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evaluating explanations | 144 | 8 |
| M05L02 | Explaining to regulators and users | 144 | 8 |

## Integrative case

A lending model must be explained to a regulator and to a declined applicant. Produce global and local explanations, check they are faithful, identify where the model relies on proxies for protected attributes, and write explanations fit for each audience.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0440-final-protected | 25 | 25 | yes |
| MST-0440-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why interpretability matters | 5 |
| Interpretable models | 5 |
| Global explanations | 5 |
| Local explanations | 5 |
| Faithfulness and communication | 5 |

Minimum reviewed item bank: 462 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0440-Q0001** (single-answer, Select ONE) What is the key difference between interpretability and explainability?

- A. Interpretability is a model being understandable by design; explainability is explaining a given model after the fact **(key)**  
  _Rationale:_ Correct: one is intrinsic, the other post-hoc.
- B. They are identical terms  
  _Rationale:_ They describe different approaches.
- C. Explainability only applies to linear models  
  _Rationale:_ Post-hoc methods target complex black boxes too.
- D. Interpretability requires no model at all  
  _Rationale:_ It still concerns a model, just an understandable one.

**MST-0440-Q0002** (multiple-answer, Select TWO) Which TWO cautions apply to a local explanation such as a single SHAP plot? (Select TWO.)

- A. It explains one prediction and may not generalise to others **(key)**  
  _Rationale:_ Correct: local explanations are instance-specific.
- B. Correlated features can share or mask attribution **(key)**  
  _Rationale:_ Correct: attributions can be unstable under correlation.
- C. It proves the model is unbiased  
  _Rationale:_ An explanation does not establish fairness.
- D. It replaces the need for global analysis  
  _Rationale:_ Local and global views answer different questions.

**MST-0440-Q0003** (single-answer, Select ONE) When reading feature-importance from correlated features, what is the main risk?

- A. Importance can be split or shifted arbitrarily between the correlated features **(key)**  
  _Rationale:_ Correct: correlation makes attributions ambiguous.
- B. Importance values always sum to one  
  _Rationale:_ They need not sum to one.
- C. Correlated features cannot have importance  
  _Rationale:_ They can; the problem is interpreting it.
- D. Importance guarantees causation  
  _Rationale:_ Importance is associational, not causal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
