# Oracle Cloud Infrastructure AI Foundations Associate: Current-Version Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1237` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Oracle (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION / unresolved |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of AI and ML Foundations (design-assumption grouping)
2. Explain and apply the concepts of OCI AI Services (design-assumption grouping)
3. Explain and apply the concepts of Machine Learning on OCI (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 AI and ML Foundations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Treating all AI as deep learning
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | AI concepts and use cases | 160 | 6 |
| M01L02 | Machine learning basics | 160 | 6 |
| M01L03 | Deep learning and neural networks | 160 | 6 |

### M02 OCI AI Services (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming a pre-built AI service always needs custom model training
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | OCI AI services overview | 160 | 6 |
| M02L02 | Language, vision and speech services | 160 | 6 |
| M02L03 | Generative AI service and large language models | 160 | 6 |

### M03 Machine Learning on OCI (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Ignoring bias and data quality when evaluating a model
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | OCI Data Science platform | 160 | 6 |
| M03L02 | Model lifecycle and deployment | 160 | 6 |
| M03L03 | Responsible and ethical AI | 160 | 6 |

## Integrative case

A retailer wants to add AI features: recommend which OCI AI services fit three use cases (support summarisation, product image tagging, demand forecasting), and explain when a pre-built service suffices versus a custom model.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1237-practice-form-A | 54 | 54 | yes |
| MST-1237-practice-form-B | 54 | 54 | no (optional practice) |
| MST-1237-practice-form-C | 54 | 54 | no (optional practice) |
| MST-1237-final-protected | 54 | 54 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| AI and ML Foundations | 18 |
| OCI AI Services | 18 |
| Machine Learning on OCI | 18 |

Minimum reviewed item bank: 576 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1237-Q0001** (single-answer, Select ONE) Which statement best describes the relationship between AI, machine learning and deep learning?

- A. Deep learning is a subset of machine learning, which is a subset of AI **(key)**  
  _Rationale:_ Correct: AI is the broadest field; ML is within it; deep learning is within ML.
- B. They are three unrelated fields  
  _Rationale:_ They are nested, not unrelated.
- C. Machine learning contains AI  
  _Rationale:_ The nesting is the other way around.
- D. Deep learning contains AI  
  _Rationale:_ Deep learning is the narrowest of the three.

**MST-1237-Q0002** (single-answer, Select ONE) When should you prefer a pre-built OCI AI service over training a custom model?

- A. When the task is common and the pre-built service meets accuracy needs **(key)**  
  _Rationale:_ Correct: pre-built services are faster/cheaper when they meet requirements.
- B. Always, regardless of requirements  
  _Rationale:_ Pre-built services do not fit every specialised need.
- C. Only when you have no data at all  
  _Rationale:_ Data availability is not the sole deciding factor.
- D. Never, custom models are always better  
  _Rationale:_ Custom models add cost/effort not always justified.

**MST-1237-Q0003** (multiple-answer, Select TWO) Which TWO are important for responsible AI?

- A. Checking training data for bias and quality **(key)**  
  _Rationale:_ Correct: data quality and bias checks are core to responsible AI.
- B. Being transparent about model limitations **(key)**  
  _Rationale:_ Correct: communicating limitations supports responsible use.
- C. Maximising accuracy while ignoring fairness  
  _Rationale:_ Ignoring fairness is not responsible AI.
- D. Hiding how decisions are made  
  _Rationale:_ Opacity undermines accountability.
- E. Collecting as much personal data as possible  
  _Rationale:_ Excess data collection raises privacy risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
