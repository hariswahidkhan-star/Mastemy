# NVIDIA-Certified Associate: Generative AI LLMs Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1301` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | NVIDIA (no affiliation or endorsement) |
| Exam code | NCA-GENL |
| Version basis | unresolved |
| Evidence | **unverified-needs-official-check** - egress to the official site was blocked this session; groupings/weights are design assumptions |
| Legacy IDs | MST-AI-NVIDIA-NCAGENL-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain generative-AI and large-language-model foundations
2. Apply prompting, RAG and fine-tuning patterns to use cases
3. Evaluate LLM output quality, safety and deployment choices
4. Integrate generative-AI knowledge into a responsible solution design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 LLM and generative-AI foundations (design-assumption grouping) (DESIGN ASSUMPTION weight)

- Worked applications: (1) Explain how a transformer attends across tokens; (2) Estimate the effect of context-window limits on a task
- Common misconception addressed: Believing an LLM 'knows' facts rather than predicting tokens
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Machine-learning and deep-learning basics | 160 | 10 |
| M01L02 | Transformers and large language models | 160 | 10 |
| M01L03 | Tokenisation, embeddings and context windows | 160 | 10 |

### M02 Prompting and application patterns (design-assumption grouping) (DESIGN ASSUMPTION weight)

- Worked applications: (1) Design a RAG pipeline for a document Q&A tool; (2) Choose prompting versus fine-tuning for a use case
- Common misconception addressed: Assuming fine-tuning is always better than retrieval
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompt engineering techniques | 160 | 10 |
| M02L02 | Retrieval-augmented generation (RAG) | 160 | 10 |
| M02L03 | Fine-tuning versus prompting trade-offs | 160 | 10 |

### M03 Evaluation, safety and deployment (design-assumption grouping) (DESIGN ASSUMPTION weight)

- Worked applications: (1) Define an evaluation metric for a summarisation task; (2) Identify a responsible-AI risk in a deployment
- Common misconception addressed: Treating a single benchmark score as full quality assurance
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Evaluating LLM output quality | 160 | 10 |
| M03L02 | Bias, safety and responsible AI | 160 | 10 |
| M03L03 | Serving, inference and the NVIDIA ecosystem | 160 | 10 |

## Integrative case

A team must add a document-grounded assistant to a support portal: choose between prompting, RAG and fine-tuning, define an evaluation and safety plan, and justify the design.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official outline was not read this session; question count and duration are Mastemy design assumptions, confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1301-practice-form-A | 48 | 48 | yes |
| MST-1301-practice-form-B | 48 | 48 | no (optional practice) |
| MST-1301-practice-form-C | 48 | 48 | no (optional practice) |
| MST-1301-final-protected | 48 | 48 | yes |

| Domain (DESIGN ASSUMPTION grouping) | Items per form |
|---|---|
| LLM and generative-AI foundations (design-assumption grouping) | 16 |
| Prompting and application patterns (design-assumption grouping) | 16 |
| Evaluation, safety and deployment (design-assumption grouping) | 16 |

Minimum reviewed item bank: 624 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1301-Q0001** (single-answer, Select ONE) A team needs an LLM assistant to answer from a large, frequently updated internal document set with citations. Which approach fits best?

- A. Retrieval-augmented generation (RAG) **(key)**  
  _Rationale:_ Correct: RAG retrieves current documents at query time and supports citations without retraining.
- B. Full fine-tuning on the documents weekly  
  _Rationale:_ Frequent full fine-tuning is costly and lags updates versus retrieval.
- C. A longer system prompt with no retrieval  
  _Rationale:_ A static prompt cannot hold or update a large document set.
- D. Reducing the model's temperature to 0  
  _Rationale:_ Temperature controls randomness, not access to documents.

**MST-1301-Q0002** (single-answer, Select ONE) In a transformer language model, the self-attention mechanism mainly lets the model:

- A. Weigh the relevance of other tokens when representing each token **(key)**  
  _Rationale:_ Correct: self-attention weights how much each token attends to others.
- B. Store facts in a lookup database  
  _Rationale:_ Transformers do not use an explicit fact database.
- C. Compile code to machine instructions  
  _Rationale:_ Attention is unrelated to code compilation.
- D. Guarantee factual accuracy of outputs  
  _Rationale:_ Attention does not guarantee factual correctness.

**MST-1301-Q0003** (multiple-answer, Select TWO) Before deploying an LLM support assistant, select TWO responsible-AI steps that most directly reduce harm.

- A. Test for biased or unsafe outputs across representative inputs **(key)**  
  _Rationale:_ Correct: red-team/bias testing surfaces harmful behaviour before launch.
- B. Add guardrails and a human-escalation path for sensitive queries **(key)**  
  _Rationale:_ Correct: guardrails plus escalation limit harm in production.
- C. Increase the model size to the largest available  
  _Rationale:_ A bigger model is not inherently safer.
- D. Remove all logging to protect privacy  
  _Rationale:_ Removing all logging harms monitoring and auditability.
- E. Raise temperature to make answers more varied  
  _Rationale:_ More randomness tends to increase, not reduce, risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
