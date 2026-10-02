# LLMOps

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1354` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. LLM application lifecycle
2. Evaluation of LLM systems
3. Serving, cost and latency
4. Safety, monitoring and feedback

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 LLM application lifecycle (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose prompt vs RAG vs fine-tune; (2) Map an LLM app's components
- Common misconception addressed: Jumping to fine-tuning when prompting or RAG would suffice
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From prompt to production LLM app | 120 | 8 |
| M01L02 | Prompt, RAG and fine-tuning choices | 120 | 8 |

### M02 Evaluation of LLM systems (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build an eval set for a RAG bot; (2) Add a hallucination check to a release gate
- Common misconception addressed: Judging an LLM app by a few manual spot-checks only
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Offline eval sets and LLM-as-judge | 120 | 8 |
| M02L02 | Groundedness, hallucination and regression tests | 120 | 8 |

### M03 Serving, cost and latency (MASTEMY-DESIGN 25%)

- Worked applications: (1) Cut token cost with caching/routing; (2) Stream responses to reduce perceived latency
- Common misconception addressed: Ignoring token cost until the bill arrives
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Token cost, context windows and caching | 120 | 8 |
| M03L02 | Streaming, batching and model routing | 120 | 8 |

### M04 Safety, monitoring and feedback (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add input/output guardrails to an app; (2) Set up online feedback and drift monitoring
- Common misconception addressed: Trusting model output as safe without input/output guardrails
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Guardrails, PII and prompt-injection defence | 120 | 8 |
| M04L02 | Monitoring drift and collecting feedback | 120 | 8 |

## Integrative case

A support chatbot on company docs occasionally invents policies and leaks snippets from other tenants, and its bill is climbing. Choose RAG over fine-tuning, build evals with hallucination gates, add guardrails and PII handling, and control cost with caching and routing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1354-final-protected | 20 | 20 | yes |
| MST-1354-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| LLM application lifecycle | 5 |
| Evaluation of LLM systems | 5 |
| Serving, cost and latency | 5 |
| Safety, monitoring and feedback | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1354-Q0001** (single-answer, Select ONE) A team wants the chatbot to answer from the latest internal docs that change weekly. The most appropriate first approach is:

- A. Retrieval-augmented generation (RAG) over the current docs **(key)**  
  _Rationale:_ Correct: RAG injects fresh, changing knowledge without retraining.
- B. Fine-tune the base model nightly on all docs  
  _Rationale:_ Costly and slow for weekly-changing content; RAG is the standard choice.
- C. Hard-code answers in the prompt  
  _Rationale:_ Does not scale and goes stale immediately.
- D. Increase the temperature setting  
  _Rationale:_ Temperature controls randomness, not knowledge freshness.

**MST-1354-Q0002** (multiple-answer, Select TWO) Which TWO practices help control the cost of an LLM feature? (Select TWO.)

- A. Cache responses for repeated or similar requests **(key)**  
  _Rationale:_ Correct: caching avoids paying for identical generations.
- B. Route easy requests to a smaller/cheaper model **(key)**  
  _Rationale:_ Correct: model routing matches cost to difficulty.
- C. Always send the full conversation history every call  
  _Rationale:_ That inflates tokens and cost.
- D. Disable all evaluation  
  _Rationale:_ Removing evals does not reduce inference cost and harms quality.

**MST-1354-Q0003** (single-answer, Select ONE) Why is 'LLM-as-judge' evaluation used with caution?

- A. The judge model can be biased or inconsistent, so it needs calibration and human spot-checks **(key)**  
  _Rationale:_ Correct: automated judges are useful but must be validated against human labels.
- B. It is always perfectly accurate  
  _Rationale:_ It is not; it can share the generator's blind spots.
- C. It removes the need for any eval set  
  _Rationale:_ You still need curated eval data.
- D. It only works for image models  
  _Rationale:_ It is used for text generation evaluation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
