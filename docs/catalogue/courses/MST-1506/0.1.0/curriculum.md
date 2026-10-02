# AWS Generative AI Application Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1506` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Generative AI Application Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain generative AI building blocks on Amazon Bedrock
2. Design prompting and grounding patterns for LLM apps
3. Build retrieval-augmented generation with knowledge bases
4. Address evaluation, safety and cost for GenAI apps

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 GenAI foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Invoke a Bedrock model for a task; (2) Pick a model by context window and cost
- Common misconception addressed: Assuming the largest model is always the best choice
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Foundation models on Amazon Bedrock | 72 | 7 |
| M01L02 | Tokens, context and model choice | 72 | 7 |

### M02 Prompting and grounding (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a constrained structured prompt; (2) Ground a response in provided sources
- Common misconception addressed: Believing clever prompts alone prevent hallucination without grounding
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompt design patterns | 72 | 7 |
| M02L02 | Grounding and reducing hallucination | 72 | 7 |

### M03 Retrieval-augmented generation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create embeddings for a document set; (2) Assemble a retrieve-then-generate flow
- Common misconception addressed: Thinking RAG requires fine-tuning the model on the documents
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Embeddings and vector retrieval | 72 | 7 |
| M03L02 | Bedrock knowledge bases and RAG | 72 | 7 |

### M04 Evaluation, safety and cost (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build an evaluation set for the assistant; (2) Apply guardrails and a token budget
- Common misconception addressed: Shipping a GenAI feature with no guardrails or evaluation
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Evaluating GenAI outputs | 72 | 7 |
| M04L02 | Guardrails and cost control | 72 | 7 |

## Integrative case

A support team wants an assistant grounded in its documentation. Build a RAG application on Amazon Bedrock: ingest and embed docs into a knowledge base, retrieve and ground responses, and add guardrails and evaluation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1506-final-protected | 28 | 35 | yes |
| MST-1506-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GenAI foundations | 7 |
| Prompting and grounding | 7 |
| Retrieval-augmented generation | 7 |
| Evaluation, safety and cost | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1506-Q0001** (single-answer, Select ONE) What does Amazon Bedrock primarily provide?

- A. Managed access to foundation models via a single API **(key)**  
  _Rationale:_ Correct: Bedrock offers foundation models through a managed API.
- B. A relational database engine  
  _Rationale:_ That is RDS, not Bedrock.
- C. A container registry  
  _Rationale:_ That is ECR, not Bedrock.
- D. A DNS service  
  _Rationale:_ That is Route 53, not Bedrock.

**MST-1506-Q0002** (multiple-answer, Select TWO) Which TWO are responsible steps before shipping a Bedrock GenAI assistant? (Select TWO.)

- A. Define an evaluation set and measure quality **(key)**  
  _Rationale:_ Correct: evaluation catches errors and regressions.
- B. Apply guardrails to filter harmful content **(key)**  
  _Rationale:_ Correct: guardrails reduce unsafe outputs.
- C. Disable logging to hide failures  
  _Rationale:_ Hiding failures is irresponsible.
- D. Answer without grounding to save effort  
  _Rationale:_ Ungrounded answers increase hallucination.

**MST-1506-Q0003** (single-answer, Select ONE) In a RAG app, embeddings are used to:

- A. Represent text as vectors so similar passages can be retrieved **(key)**  
  _Rationale:_ Correct: embeddings power similarity retrieval.
- B. Retrain the model on your documents  
  _Rationale:_ RAG retrieves context rather than retraining.
- C. Encrypt the model weights  
  _Rationale:_ Embeddings are not an encryption mechanism.
- D. Replace the generative model  
  _Rationale:_ A generative model still produces the answer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
