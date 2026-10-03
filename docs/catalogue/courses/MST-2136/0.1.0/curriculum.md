# AI in Medical Diagnosis (Educational Foundations)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2136` v0.1.0 | Batch wave17-cat41 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design specification (general medical education; no official issuer syllabus); content versioned by verification date |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI in Medical Diagnosis (Educational Foundations) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how machine-learning models are applied to diagnostic tasks at a conceptual level
2. Describe common data types used in diagnostic AI, such as images and structured records
3. Interpret evaluation metrics including sensitivity, specificity and AUC conceptually
4. Explain why AI outputs are decision-support that require clinician confirmation, never a standalone diagnosis
5. Identify sources of bias, dataset shift and failure modes in diagnostic models
6. Summarise the regulatory, safety and ethical considerations for diagnostic AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of diagnostic AI (25% (design weight), design weight)

- Worked applications: (1) Decide whether a task is classification or detection; (2) Match a data type to a suitable model concept
- Common misconception addressed: Believing a model 'understands' disease the way a clinician does
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a diagnostic model does and does not do | 80 | 5 |
| M01L02 | Data types: imaging, signals, structured records | 80 | 5 |
| M01L03 | Training, validation and test concepts | 80 | 5 |

### M02 Evaluating diagnostic models (25% (design weight), design weight)

- Worked applications: (1) Interpret a sensitivity/specificity pair in context; (2) Explain why a high AUC can still fail a subgroup
- Common misconception addressed: Reading accuracy alone as proof of clinical usefulness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sensitivity, specificity and predictive values | 80 | 5 |
| M02L02 | ROC curves and AUC | 80 | 5 |
| M02L03 | Calibration and threshold choice | 80 | 5 |

### M03 Limitations and risks (25% (design weight), design weight)

- Worked applications: (1) Spot dataset shift in a deployment scenario; (2) Identify a spurious correlation a model may exploit
- Common misconception addressed: Assuming a model validated in one hospital works everywhere
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Bias, dataset shift and generalisation | 80 | 5 |
| M03L02 | Failure modes and spurious correlations | 80 | 5 |
| M03L03 | Explainability and clinician trust | 80 | 5 |

### M04 Responsible use (25% (design weight), design weight)

- Worked applications: (1) Frame a model output as decision-support needing confirmation; (2) Identify who is accountable for a clinical decision
- Common misconception addressed: Treating an AI output as a final diagnosis without clinician review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | AI as decision-support requiring clinician confirmation | 80 | 5 |
| M04L02 | Regulation and clinical validation concepts | 80 | 5 |
| M04L03 | Ethics, consent and accountability | 80 | 5 |

## Integrative case

A health-informatics student evaluates, as a classroom exercise, a described diagnostic-support model: they interpret its sensitivity and specificity, flag a likely dataset-shift risk, and write a short note explaining that any model output must be confirmed by a qualified clinician before it informs care.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - general medical-education course; no official exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2136-final-protected | 40 | 40 | yes |
| MST-2136-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of diagnostic AI | 10 |
| Evaluating diagnostic models | 10 |
| Limitations and risks | 10 |
| Responsible use | 10 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2136-Q0001** (single-answer, Select ONE) In a diagnostic-support context, a model's SENSITIVITY refers to its ability to:

- A. Correctly identify those who truly have the condition **(key)**  
  _Rationale:_ Correct: sensitivity is the true-positive rate among those with the condition.
- B. Correctly identify those who are truly free of the condition  
  _Rationale:_ That describes specificity, not sensitivity.
- C. Run quickly on new hardware  
  _Rationale:_ That is a performance (speed) property, not sensitivity.
- D. Compress the input image  
  _Rationale:_ This is unrelated to sensitivity.

**MST-2136-Q0002** (multiple-answer, Select TWO) Which TWO statements reflect responsible use of a diagnostic AI model? (Select TWO.)

- A. Its output should be treated as decision-support that a clinician confirms **(key)**  
  _Rationale:_ Correct: diagnostic AI informs but does not replace clinician judgement.
- B. Its performance should be checked for different patient subgroups **(key)**  
  _Rationale:_ Correct: subgroup evaluation guards against hidden bias.
- C. A high overall accuracy means it is safe to use alone  
  _Rationale:_ Overall accuracy can hide subgroup failures and does not authorise standalone use.
- D. Clinician review can be skipped once AUC exceeds 0.9  
  _Rationale:_ No metric threshold removes the need for clinician confirmation.
- E. The model can issue a final diagnosis directly to the patient  
  _Rationale:_ AI outputs are not a standalone diagnosis.

**MST-2136-Q0003** (single-answer, Select ONE) A model performs well in the hospital where it was trained but poorly in a new hospital with different scanners. This is an example of:

- A. Dataset shift (distribution shift) **(key)**  
  _Rationale:_ Correct: changes in the input distribution between sites degrade performance.
- B. Overfitting to the test set only  
  _Rationale:_ The issue is a change between deployment settings, i.e. distribution shift.
- C. Perfect generalisation  
  _Rationale:_ Poor performance at the new site is the opposite of generalisation.
- D. A calibration that is guaranteed to transfer  
  _Rationale:_ Calibration does not automatically transfer across sites.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
