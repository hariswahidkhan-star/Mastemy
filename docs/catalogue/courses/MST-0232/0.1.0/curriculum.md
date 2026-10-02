# Databricks Certified Generative AI Engineer Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0232` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Databricks (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-DBX-GAIEA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design generative AI solutions on Databricks
2. Build retrieval-augmented generation applications
3. Evaluate and govern generative AI applications
4. Deploy and monitor generative AI solutions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Generative AI foundations on Databricks

- Worked applications: (1) Choose RAG vs fine-tuning for a scenario; (2) Design a prompt with grounded context
- Common misconception addressed: Fine-tuning when retrieval would solve the problem
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Foundation models and the Databricks stack | 90 | 6 |
| M01L02 | Prompt design and context | 90 | 6 |
| M01L03 | Embeddings and vector search | 90 | 6 |
| M01L04 | Choosing an approach for a use case | 90 | 6 |

### M02 Building RAG applications

- Worked applications: (1) Design a chunking and retrieval strategy; (2) Assemble a retrieval-augmented response flow
- Common misconception addressed: Using oversized chunks that bury the relevant passage
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Document ingestion and chunking | 90 | 6 |
| M02L02 | Vector search and retrieval | 90 | 6 |
| M02L03 | Assembling the RAG pipeline | 90 | 6 |
| M02L04 | Tool use and orchestration | 90 | 6 |

### M03 Evaluation and governance

- Worked applications: (1) Define an evaluation set and metrics for a RAG app; (2) Add a guardrail for sensitive-data leakage
- Common misconception addressed: Judging a RAG app on fluency instead of grounded accuracy
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Evaluating generative AI quality | 90 | 6 |
| M03L02 | Safety, guardrails and PII | 90 | 6 |
| M03L03 | Governance with Unity Catalog | 90 | 6 |
| M03L04 | Cost considerations | 90 | 6 |

### M04 Deployment and monitoring

- Worked applications: (1) Design monitoring for answer quality and cost; (2) Design a feedback loop to improve retrieval
- Common misconception addressed: Deploying without a way to detect answer-quality regressions
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Serving generative AI applications | 90 | 6 |
| M04L02 | Monitoring quality and usage | 90 | 6 |
| M04L03 | Feedback loops | 90 | 6 |
| M04L04 | Iteration and improvement | 90 | 6 |

## Integrative case

An engineer builds a RAG assistant on Databricks over a document corpus: designing ingestion and retrieval, assembling the application, evaluating quality and safety, and deploying with monitoring.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0232-practice-form-A | 54 | 54 | yes |
| MST-0232-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0232-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0232-final-protected | 54 | 54 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Generative AI foundations on Databricks | 14 |
| Building RAG applications | 14 |
| Evaluation and governance | 13 |
| Deployment and monitoring | 13 |

Minimum reviewed item bank: 660 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
