# Support Vector Machines

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1316` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the maximum-margin idea behind SVMs
2. Describe hard and soft margins
3. Explain the kernel trick and common kernels
4. Tune key SVM hyperparameters
5. Judge when an SVM is a suitable choice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Margins (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sketch a separating hyperplane; (2) Explain why a wider margin generalises
- Common misconception addressed: Thinking any separating line is equally good
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Separating hyperplanes | 96 | 8 |
| M01L02 | Maximum-margin intuition | 96 | 8 |

### M02 Soft margins (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain the effect of larger C; (2) Describe a soft-margin trade-off
- Common misconception addressed: Assuming data is always perfectly separable
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Slack and the C parameter | 96 | 8 |
| M02L02 | Handling non-separable data | 96 | 8 |

### M03 Kernels (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a kernel to a data shape; (2) Explain why kernels avoid explicit feature maps
- Common misconception addressed: Believing kernels add real new data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The kernel trick | 96 | 8 |
| M03L02 | RBF and polynomial kernels | 96 | 8 |

### M04 Tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe the effect of gamma; (2) Explain why feature scaling matters for SVMs
- Common misconception addressed: Skipping feature scaling before an SVM
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | C and gamma interplay | 96 | 8 |
| M04L02 | Scaling and preprocessing | 96 | 8 |

### M05 Choosing SVMs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick a scenario suited to SVMs; (2) Name a case where SVMs scale poorly
- Common misconception addressed: Using SVMs on very large datasets without thought
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Strengths and limits | 96 | 8 |
| M05L02 | When to prefer other models | 96 | 8 |

## Integrative case

A researcher has a small high-dimensional dataset. Explain whether an SVM fits, choose a kernel, describe how you would tune C and gamma, and note scaling and evaluation steps.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1316-final-protected | 25 | 25 | yes |
| MST-1316-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Margins | 5 |
| Soft margins | 5 |
| Kernels | 5 |
| Tuning | 5 |
| Choosing SVMs | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1316-Q0001** (single-answer, Select ONE) What does a support vector machine try to maximise?

- A. The margin between classes around the decision boundary **(key)**  
  _Rationale:_ Correct: SVMs maximise the separating margin.
- B. The number of support vectors  
  _Rationale:_ It does not maximise the count of support vectors.
- C. The depth of a decision tree  
  _Rationale:_ SVMs are not tree-based.
- D. The learning rate  
  _Rationale:_ Learning rate is not the SVM objective.

**MST-1316-Q0002** (multiple-answer, Select TWO) Which TWO statements about SVM practice are correct? (Select TWO.)

- A. Feature scaling is usually important for good SVM performance **(key)**  
  _Rationale:_ Correct: SVMs are sensitive to feature scale.
- B. The kernel trick allows non-linear boundaries without explicit high-dimensional features **(key)**  
  _Rationale:_ Correct: kernels compute similarities implicitly.
- C. SVMs always scale effortlessly to millions of rows  
  _Rationale:_ Standard SVMs can scale poorly on very large data.
- D. Kernels create brand-new real data points  
  _Rationale:_ Kernels transform similarity, not add data.

**MST-1316-Q0003** (single-answer, Select ONE) Increasing the C parameter in a soft-margin SVM tends to:

- A. Penalise misclassifications more, allowing a narrower margin **(key)**  
  _Rationale:_ Correct: larger C prioritises correct classification over a wide margin.
- B. Always widen the margin regardless of errors  
  _Rationale:_ Larger C typically narrows the margin.
- C. Turn the SVM into a decision tree  
  _Rationale:_ C does not change the model family.
- D. Remove the need for data  
  _Rationale:_ Data is still required.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
