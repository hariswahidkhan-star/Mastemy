# Bias, Fairness and Transparency in AI Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1888` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Bias, Fairness and Transparency in AI Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain sources of bias across the AI lifecycle from data to deployment
2. Distinguish common fairness definitions and why they can conflict
3. Select and compute fairness metrics appropriate to a context
4. Evaluate mitigation techniques at pre-, in- and post-processing stages
5. Apply explainability and transparency techniques to a model's decisions
6. Communicate fairness trade-offs and limitations to stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Sources of bias (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace bias in a lending model from data to feedback loop; (2) Identify label bias in a historical hiring dataset
- Common misconception addressed: Assuming removing a protected attribute removes bias
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Bias from data, labels, features and feedback loops | 120 | 7 |
| M01L02 | Bias from deployment and user interaction | 120 | 7 |

### M02 Fairness definitions (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compare demographic parity and equalised odds on one case; (2) Show why two fairness goals cannot both hold here
- Common misconception addressed: Believing one fairness metric is universally correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Group and individual fairness notions | 120 | 7 |
| M02L02 | Why fairness definitions conflict (impossibility) | 120 | 7 |

### M03 Metrics and mitigation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute a selected fairness metric on a confusion matrix; (2) Choose a mitigation stage for a given constraint
- Common misconception addressed: Optimising a metric while ignoring the real-world harm
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Choosing and computing fairness metrics | 120 | 7 |
| M03L02 | Pre-, in- and post-processing mitigations | 120 | 7 |

### M04 Transparency and communication (25% (Mastemy design weight), design weight)

- Worked applications: (1) Produce a local explanation for one rejected application; (2) Write a plain-language note on the fairness trade-off chosen
- Common misconception addressed: Presenting an explanation as a full causal account of the model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Explainability techniques and their limits | 120 | 7 |
| M04L02 | Communicating fairness trade-offs honestly | 120 | 7 |

## Integrative case

A bank's loan-approval model shows different approval rates across groups: trace the bias sources, compare fairness definitions and show their conflict, compute metrics, choose a mitigation, and explain the trade-off to a fairness committee.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1888-final-protected | 40 | 40 | yes |
| MST-1888-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Sources of bias | 10 |
| Fairness definitions | 10 |
| Metrics and mitigation | 10 |
| Transparency and communication | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1888-Q0001** (single-answer, Select ONE) A team removes the 'gender' field from training data and declares the model unbiased. Why is this insufficient?

- A. Other features can act as proxies for gender, so bias can persist despite removing the attribute **(key)**  
  _Rationale:_ Correct: proxy variables reintroduce bias; removal alone is not enough.
- B. Removing a field always increases bias  
  _Rationale:_ It does not always increase bias; the point is removal is insufficient.
- C. Bias only comes from the model, not data  
  _Rationale:_ Bias arises across the lifecycle, including data.
- D. The model needs more layers  
  _Rationale:_ Model capacity is unrelated to proxy bias.

**MST-1888-Q0002** (multiple-answer, Select TWO) Which TWO statements about fairness metrics are correct? (Select TWO.)

- A. Demographic parity and equalised odds can be mathematically incompatible in general **(key)**  
  _Rationale:_ Correct: fairness impossibility results show common metrics can conflict.
- B. The appropriate fairness metric depends on the context and the harm of concern **(key)**  
  _Rationale:_ Correct: metric choice is context-dependent.
- C. One fairness metric is correct for every situation  
  _Rationale:_ No single metric is universally correct.
- D. A model satisfying one fairness metric satisfies all of them  
  _Rationale:_ Satisfying one often precludes others.

**MST-1888-Q0003** (single-answer, Select ONE) A mitigation improves the demographic-parity metric but increases wrongful denials for the group it was meant to help. What does this show?

- A. Optimising a metric is not the goal; the real-world harm must be evaluated, not just the number **(key)**  
  _Rationale:_ Correct: a metric can improve while actual harm worsens.
- B. The metric was computed incorrectly  
  _Rationale:_ The scenario is about metric-vs-harm divergence, not a calculation error.
- C. Demographic parity is always the right choice  
  _Rationale:_ The example shows it can backfire.
- D. Fairness cannot be measured at all  
  _Rationale:_ It can be measured; metrics must be tied to harm.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
