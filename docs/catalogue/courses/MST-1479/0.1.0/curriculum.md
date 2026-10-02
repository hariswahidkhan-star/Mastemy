# Google Cloud Generative AI Application Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1479` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Generative AI Application Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain generative AI building blocks on Vertex AI
2. Design prompting and grounding patterns for LLM apps
3. Build retrieval-augmented generation (RAG) with embeddings
4. Address evaluation, safety and cost for GenAI apps

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 GenAI foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Call a foundation model for a summary task; (2) Pick a model by context window and cost
- Common misconception addressed: Assuming a bigger model is always the right choice regardless of cost
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Foundation models on Vertex AI | 72 | 7 |
| M01L02 | Tokens, context and model choice | 72 | 7 |

### M02 Prompting and grounding (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a structured prompt with constraints; (2) Ground a response in provided source text
- Common misconception addressed: Believing a well-worded prompt alone prevents hallucination without grounding
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompt design patterns | 72 | 7 |
| M02L02 | Grounding and reducing hallucination | 72 | 7 |

### M03 Retrieval-augmented generation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create embeddings and a vector index; (2) Assemble a retrieve-then-generate flow
- Common misconception addressed: Thinking RAG means fine-tuning the model on the documents
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Embeddings and vector search | 72 | 7 |
| M03L02 | RAG pipeline design | 72 | 7 |

### M04 Evaluation, safety and cost (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define an evaluation set for the assistant; (2) Add a safety filter and token budget
- Common misconception addressed: Shipping a GenAI feature with no evaluation or safety review
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Evaluating GenAI outputs | 72 | 7 |
| M04L02 | Safety filters and cost control | 72 | 7 |

## Integrative case

A support team wants an assistant grounded in its help-center docs. Design a RAG application on Vertex AI: chunk and embed docs, retrieve relevant passages, prompt the model with grounding, and add evaluation and safety controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1479-final-protected | 28 | 35 | yes |
| MST-1479-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GenAI foundations | 7 |
| Prompting and grounding | 7 |
| Retrieval-augmented generation | 7 |
| Evaluation, safety and cost | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1479-Q0001** (single-answer, Select ONE) In a retrieval-augmented generation (RAG) app, what is the role of embeddings?

- A. To represent text as vectors so semantically similar passages can be retrieved **(key)**  
  _Rationale:_ Correct: embeddings enable similarity search over content.
- B. To permanently retrain the model on the documents  
  _Rationale:_ RAG retrieves context; it does not retrain the model.
- C. To encrypt the prompt  
  _Rationale:_ Embeddings are not an encryption mechanism.
- D. To replace the need for a model  
  _Rationale:_ A generative model is still required to produce the answer.

**MST-1479-Q0002** (multiple-answer, Select TWO) Which TWO are responsible practices before shipping a GenAI assistant? (Select TWO.)

- A. Create an evaluation set and measure output quality **(key)**  
  _Rationale:_ Correct: evaluation catches regressions and errors.
- B. Apply safety filters to inputs and outputs **(key)**  
  _Rationale:_ Correct: safety controls reduce harmful responses.
- C. Remove all logging to hide failures  
  _Rationale:_ Hiding failures is irresponsible and harmful.
- D. Let the model answer with no grounding to save effort  
  _Rationale:_ Ungrounded answers increase hallucination risk.

**MST-1479-Q0003** (single-answer, Select ONE) Which approach most directly reduces hallucinated facts in an answer?

- A. Grounding the model in retrieved source passages **(key)**  
  _Rationale:_ Correct: grounding supplies factual context to draw from.
- B. Increasing the temperature setting  
  _Rationale:_ Higher temperature increases variability, not factuality.
- C. Removing the system prompt  
  _Rationale:_ That reduces control, not hallucination.
- D. Asking the model to be more confident  
  _Rationale:_ Confidence wording does not improve factual accuracy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
