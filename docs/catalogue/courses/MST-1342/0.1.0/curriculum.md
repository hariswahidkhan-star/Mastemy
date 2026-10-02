# Cost and Latency Optimisation for LLM Apps

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1342` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the main drivers of LLM application cost and latency
2. Reduce token usage through prompt and context design
3. Apply caching, batching and routing to cut cost
4. Choose model size and configuration for a quality-cost target
5. Measure and trade off latency against quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What drives cost and latency (MASTEMY-DESIGN 20%)

- Worked applications: (1) Break a request's cost into input/output tokens; (2) Identify the latency contributors in a call
- Common misconception addressed: Assuming a bigger model is the only lever
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tokens, context and pricing | 72 | 8 |
| M01L02 | Latency sources in an LLM call | 72 | 8 |

### M02 Prompt and context efficiency (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trim a bloated prompt without losing quality; (2) Limit retrieved context to what is needed
- Common misconception addressed: Padding prompts with unused context 'just in case'
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing token-efficient prompts | 72 | 8 |
| M02L02 | Right-sizing retrieved context | 72 | 8 |

### M03 Caching and batching (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a cache for repeated queries; (2) Batch requests to improve throughput
- Common misconception addressed: Believing every request must hit the model fresh
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Response and prompt caching | 72 | 8 |
| M03L02 | Batching and streaming | 72 | 8 |

### M04 Model routing and sizing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Route easy requests to a smaller model; (2) Pick a model for a quality-cost target
- Common misconception addressed: Using the largest model for every request
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Model selection and routing | 72 | 8 |
| M04L02 | Smaller models and cascades | 72 | 8 |

### M05 Measuring the trade-off (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set a quality floor before cost cutting; (2) Compare configurations on cost, latency and quality
- Common misconception addressed: Optimising cost until quality quietly collapses
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Benchmarking cost vs quality | 72 | 8 |
| M05L02 | Setting and holding a quality floor | 72 | 8 |

## Integrative case

An LLM feature is too slow and expensive at its current traffic. Profile where tokens and time are spent, apply a set of optimisations such as caching and model routing, and recommend a configuration that meets a latency and budget target while holding quality above a defined bar.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1342-final-protected | 25 | 25 | yes |
| MST-1342-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What drives cost and latency | 5 |
| Prompt and context efficiency | 5 |
| Caching and batching | 5 |
| Model routing and sizing | 5 |
| Measuring the trade-off | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1342-Q0001** (single-answer, Select ONE) Which change most directly reduces the per-request cost of an LLM call?

- A. Reducing the number of input and output tokens **(key)**  
  _Rationale:_ Correct: cost scales with tokens, so fewer tokens means lower cost.
- B. Increasing the temperature  
  _Rationale:_ Temperature affects randomness, not token-based cost.
- C. Adding more retrieved context  
  _Rationale:_ More context adds tokens and raises cost.
- D. Renaming the API endpoint  
  _Rationale:_ That has no effect on cost.

**MST-1342-Q0002** (multiple-answer, Select TWO) Which TWO techniques can cut cost while keeping quality acceptable for many requests? (Select TWO.)

- A. Caching responses to repeated or identical queries **(key)**  
  _Rationale:_ Correct: caching avoids paying for the same answer twice.
- B. Routing easy requests to a smaller, cheaper model **(key)**  
  _Rationale:_ Correct: a cascade sends simple cases to a cheaper model.
- C. Always using the largest available model  
  _Rationale:_ That maximises cost rather than reducing it.
- D. Doubling the retrieved context on every call  
  _Rationale:_ That increases tokens and cost.

**MST-1342-Q0003** (single-answer, Select ONE) Before aggressively cutting cost, what should a team define to avoid silent quality loss?

- A. A measurable quality floor the optimised system must stay above **(key)**  
  _Rationale:_ Correct: a quality floor ensures cost cuts do not degrade answers unnoticed.
- B. A larger marketing budget  
  _Rationale:_ Irrelevant to quality control.
- C. A higher temperature setting  
  _Rationale:_ Temperature is not a quality guarantee.
- D. A longer context window  
  _Rationale:_ Context length is not a quality floor.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
