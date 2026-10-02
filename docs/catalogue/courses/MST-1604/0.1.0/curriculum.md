# CompTIA DataX Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1604` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | CompTIA (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-CMPT-DATAX-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply mathematics and statistics for data science
2. Model data and apply machine learning methods
3. Operationalise and deploy models
4. Apply specialised and responsible data-science techniques

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Mathematics and statistics

- Worked applications: (1) Choose and run an appropriate hypothesis test; (2) Design an A/B test with power considerations
- Common misconception addressed: Reading statistical significance as practical importance
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Probability and distributions | 135 | 6 |
| M01L02 | Statistical inference and hypothesis testing | 135 | 6 |
| M01L03 | Linear algebra for data science | 135 | 6 |
| M01L04 | Experimental design | 135 | 6 |

### M02 Modelling and machine learning

- Worked applications: (1) Select a model family for a problem and justify it; (2) Design a cross-validation scheme avoiding leakage
- Common misconception addressed: Evaluating on training data and overstating accuracy
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Supervised learning methods | 135 | 6 |
| M02L02 | Unsupervised learning methods | 135 | 6 |
| M02L03 | Feature engineering and selection | 135 | 6 |
| M02L04 | Model evaluation and validation | 135 | 6 |

### M03 Operations and deployment

- Worked applications: (1) Design a monitoring plan for a deployed model; (2) Plan a reproducible training-to-deployment flow
- Common misconception addressed: Assuming model performance is stable after deployment
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data pipelines and preparation at scale | 135 | 6 |
| M03L02 | Model deployment patterns | 135 | 6 |
| M03L03 | Monitoring and drift | 135 | 6 |
| M03L04 | MLOps and reproducibility | 135 | 6 |

### M04 Specialised and responsible techniques

- Worked applications: (1) Identify and mitigate a fairness risk in a model; (2) Communicate a model's limitations to decision-makers
- Common misconception addressed: Presenting model output as objective and free of bias
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Natural language and time-series methods | 135 | 6 |
| M04L02 | Deep learning overview | 135 | 6 |
| M04L03 | Bias, fairness and ethics | 135 | 6 |
| M04L04 | Communicating results | 135 | 6 |

## Integrative case

A senior data scientist delivers an end-to-end project: framing the problem with statistics, modelling and validating, deploying the model, and applying responsible and specialised techniques.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1604-practice-form-A | 81 | 81 | yes |
| MST-1604-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1604-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1604-final-protected | 81 | 81 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Mathematics and statistics | 21 |
| Modelling and machine learning | 20 |
| Operations and deployment | 20 |
| Specialised and responsible techniques | 20 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
