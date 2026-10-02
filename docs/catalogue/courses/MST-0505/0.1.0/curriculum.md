# OpenAI Model Evaluation and Regression Testing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0505` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Model Evaluation and Regression Testing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define evaluation goals and metrics for a model application
2. Build evaluation datasets and graders
3. Run evaluations and interpret results
4. Catch regressions when prompts, models or data change

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Building datasets and graders, running evaluations and gating changes are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Evaluation foundations (25%)

- Worked applications: (1) Turn a vague quality goal into measurable criteria; (2) Pick a metric for a classification task
- Common misconception addressed: Judging quality from a few hand-picked examples
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What to evaluate and why | 120 | 6 |
| M01L02 | Choosing metrics | 120 | 6 |

### M02 Datasets and graders (25%)

- Worked applications: (1) Assemble a representative evaluation set; (2) Choose exact-match versus model-graded scoring
- Common misconception addressed: Using a tiny unrepresentative dataset to declare success
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building an evaluation dataset | 120 | 6 |
| M02L02 | Automated and model-based graders | 120 | 6 |

### M03 Running evaluations (25%)

- Worked applications: (1) Run an evaluation and read the per-case results; (2) Compare two prompt versions fairly
- Common misconception addressed: Comparing versions on different datasets and trusting the result
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Executing an evaluation run | 120 | 6 |
| M03L02 | Reading and comparing results | 120 | 6 |

### M04 Regression testing (25%)

- Worked applications: (1) Add an evaluation check before a prompt change ships; (2) Investigate a quality drop after a model update
- Common misconception addressed: Shipping a model or prompt change with no regression check
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Detecting regressions | 120 | 6 |
| M04L02 | Gating changes on evaluations | 120 | 6 |

## Integrative case

A team puts a support-classification model under evaluation: it defines metrics, builds a representative labelled dataset with graders, runs evaluations to compare prompt versions fairly, and gates every prompt or model change on a regression check before release.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0505-final-protected | 72 | 72 | yes |
| MST-0505-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Evaluation foundations | 18 |
| Datasets and graders | 18 |
| Running evaluations | 18 |
| Regression testing | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0505-Q0001** (single-answer, Select ONE) Why is a few hand-picked examples a weak basis for judging model quality?

- A. They are not representative, so they can hide common failures **(key)**  
  _Rationale:_ Correct: unrepresentative samples mislead quality judgements.
- B. They always overstate cost  
  _Rationale:_ Representativeness, not cost, is the issue.
- C. They make the model slower  
  _Rationale:_ Sample choice does not change model speed.
- D. They remove the need for metrics  
  _Rationale:_ Metrics are still needed to measure quality.

**MST-0505-Q0002** (single-answer, Select ONE) When comparing two prompt versions, why must the same dataset be used?

- A. Different datasets make the comparison unfair and the result unreliable **(key)**  
  _Rationale:_ Correct: a fair comparison holds the dataset constant.
- B. It makes the evaluation run faster  
  _Rationale:_ Speed is not the reason.
- C. It removes the need for graders  
  _Rationale:_ Graders are still needed to score results.
- D. It guarantees both versions pass  
  _Rationale:_ Using the same dataset does not guarantee passing.

**MST-0505-Q0003** (multiple-answer, Select TWO) Which TWO practices help catch regressions before release? (Select TWO)

- A. Gate prompt and model changes on an evaluation check **(key)**  
  _Rationale:_ Correct: gating blocks changes that fail the evaluation.
- B. Use a representative labelled dataset for the evaluation **(key)**  
  _Rationale:_ Correct: representative data detects real regressions.
- C. Ship changes with no evaluation to move faster  
  _Rationale:_ Skipping evaluation lets regressions through.
- D. Evaluate only on examples the new version already passes  
  _Rationale:_ Cherry-picked passing cases hide regressions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
