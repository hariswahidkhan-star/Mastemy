# Generative AI Architecture and Model Capabilities

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0451` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-LLMHTW-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Generative modelling foundations
2. Transformer architecture
3. Diffusion and image/audio generation
4. Capabilities and limits
5. Prompting and adaptation patterns
6. Responsible and practical use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Generative modelling foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Contrast generative with discriminative tasks; (2) Pick an evaluation approach for generated text
- Common misconception addressed: Equating lower loss with better perceived quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What generative models learn | 120 | 8 |
| M01L02 | Sampling, likelihood and evaluation | 120 | 8 |

### M02 Transformer architecture (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace attention over a short sequence; (2) Estimate memory from context length
- Common misconception addressed: Thinking attention has unlimited context for free
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tokens, embeddings and attention | 120 | 8 |
| M02L02 | Encoder, decoder and context windows | 120 | 8 |

### M03 Diffusion and image/audio generation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe the denoising process step by step; (2) Use a prompt to condition image generation
- Common misconception addressed: Believing diffusion models memorise exact training images by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Diffusion model intuition | 120 | 8 |
| M03L02 | Conditioning and guidance | 120 | 8 |

### M04 Capabilities and limits (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a task to in-context vs fine-tuning; (2) Spot a hallucination-prone prompt
- Common misconception addressed: Trusting fluent output as factually correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Emergent capabilities and scaling | 120 | 8 |
| M04L02 | Hallucination, bias and reliability | 120 | 8 |

### M05 Prompting and adaptation patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a few-shot prompt for extraction; (2) Decide when RAG beats a bigger prompt
- Common misconception addressed: Stuffing everything into the prompt instead of retrieving
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Prompting, few-shot and system design | 120 | 8 |
| M05L02 | Retrieval augmentation overview | 120 | 8 |

### M06 Responsible and practical use (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a model size for a cost budget; (2) Add provenance notes to generated assets
- Common misconception addressed: Ignoring licensing of model weights and outputs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Safety, licensing and provenance | 120 | 8 |
| M06L02 | Cost, latency and model selection | 120 | 8 |

## Integrative case

A product team wants a document assistant that drafts summaries and answers questions over a private knowledge base. Explain the generative architecture involved, decide between prompting, retrieval and fine-tuning, and set guardrails for hallucination, cost and licensing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0451-final-protected | 30 | 30 | yes |
| MST-0451-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Generative modelling foundations | 5 |
| Transformer architecture | 5 |
| Diffusion and image/audio generation | 5 |
| Capabilities and limits | 5 |
| Prompting and adaptation patterns | 5 |
| Responsible and practical use | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0451-Q0001** (single-answer, Select ONE) In a transformer, what does the self-attention mechanism primarily allow each token to do?

- A. Weight and combine information from other tokens in the sequence **(key)**  
  _Rationale:_ Correct: attention lets each token attend to relevant others.
- B. Increase the vocabulary size  
  _Rationale:_ Attention does not change the vocabulary.
- C. Remove the need for any training data  
  _Rationale:_ Transformers still require training.
- D. Guarantee factual accuracy  
  _Rationale:_ Attention does not ensure factual correctness.

**MST-0451-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate reasons to use retrieval-augmented generation instead of a very long prompt? (Select TWO.)

- A. The knowledge base is large and changes over time **(key)**  
  _Rationale:_ Correct: retrieval scales and stays current without re-stuffing prompts.
- B. You want to cite the source passages used **(key)**  
  _Rationale:_ Correct: retrieval provides traceable provenance.
- C. You want the model to hallucinate more freely  
  _Rationale:_ RAG aims to reduce, not increase, hallucination.
- D. You want to avoid storing any documents  
  _Rationale:_ RAG requires storing/indexing documents.

**MST-0451-Q0003** (single-answer, Select ONE) Why can a fluent, confident model answer still be wrong?

- A. Generative models optimise plausible continuations, not verified facts **(key)**  
  _Rationale:_ Correct: fluency reflects likelihood, not truth.
- B. Fluent answers are always correct  
  _Rationale:_ Fluency does not guarantee correctness.
- C. The model cannot produce grammatical text  
  _Rationale:_ It can; the issue is factual grounding.
- D. Confidence scores are a guaranteed accuracy measure  
  _Rationale:_ Confidence does not guarantee accuracy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
