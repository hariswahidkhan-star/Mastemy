# OpenAI API Cost Optimization and Rate-Limit Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0506` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI API Cost Optimization and Rate-Limit Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how usage, tokens and models drive API cost
2. Reduce cost through prompt, model and caching choices
3. Engineer around rate limits with batching, backoff and queues
4. Monitor, forecast and control spend

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Measuring and reducing cost and engineering around rate limits are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Cost foundations (25%)

- Worked applications: (1) Estimate the token cost of a given prompt; (2) Attribute cost across features
- Common misconception addressed: Assuming the largest model is always needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tokens, models and pricing | 120 | 6 |
| M01L02 | Measuring where cost goes | 120 | 6 |

### M02 Reducing cost (25%)

- Worked applications: (1) Trim a prompt without losing needed context; (2) Pick a smaller model for a routine task
- Common misconception addressed: Cutting context so far that output quality collapses
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompt and output size | 120 | 6 |
| M02L02 | Model choice and caching | 120 | 6 |

### M03 Rate limits (25%)

- Worked applications: (1) Add exponential backoff to a client; (2) Design a queue for a burst workload
- Common misconception addressed: Retrying immediately on a 429 and making limits worse
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Understanding limits | 120 | 6 |
| M03L02 | Batching, backoff and queues | 120 | 6 |

### M04 Monitoring and control (25%)

- Worked applications: (1) Set an alert on daily spend; (2) Forecast monthly cost from usage trends
- Common misconception addressed: Discovering a cost overrun only on the monthly bill
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Dashboards and alerts | 120 | 6 |
| M04L02 | Forecasting and budgets | 120 | 6 |

## Integrative case

A team runs a high-volume summarisation service: it attributes cost per feature, trims prompts and selects right-sized models with caching, adds backoff and a queue to respect rate limits, and sets spend alerts and a monthly forecast to avoid surprises.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0506-final-protected | 72 | 72 | yes |
| MST-0506-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Cost foundations | 18 |
| Reducing cost | 18 |
| Rate limits | 18 |
| Monitoring and control | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0506-Q0001** (single-answer, Select ONE) What most directly drives the cost of an OpenAI API call?

- A. The number of input and output tokens and the model used **(key)**  
  _Rationale:_ Correct: token count and model choice drive cost.
- B. The time of day the call is made  
  _Rationale:_ Time of day does not set token-based cost.
- C. The number of developers on the team  
  _Rationale:_ Team size does not determine per-call cost.
- D. The colour scheme of the application  
  _Rationale:_ UI styling has no bearing on API cost.

**MST-0506-Q0002** (single-answer, Select ONE) What is the correct response to receiving a 429 rate-limit error?

- A. Back off and retry after a delay, ideally with exponential backoff **(key)**  
  _Rationale:_ Correct: backoff eases pressure and respects the limit.
- B. Retry immediately in a tight loop  
  _Rationale:_ Immediate retries worsen rate-limit pressure.
- C. Switch to the largest available model  
  _Rationale:_ Model size does not resolve a rate-limit error.
- D. Stop all monitoring  
  _Rationale:_ Monitoring should continue, not stop.

**MST-0506-Q0003** (multiple-answer, Select TWO) Which TWO techniques reduce API cost without needlessly harming quality? (Select TWO)

- A. Trim prompts to the context actually needed **(key)**  
  _Rationale:_ Correct: removing unneeded tokens cuts cost.
- B. Use a smaller, right-sized model for routine tasks **(key)**  
  _Rationale:_ Correct: smaller models suit simpler tasks at lower cost.
- C. Always use the largest model for every task  
  _Rationale:_ Oversized models waste cost on simple tasks.
- D. Cut context until the output quality collapses  
  _Rationale:_ Over-trimming harms quality, defeating the goal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
