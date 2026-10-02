# AI Economics: Cost, Latency, Quality, and Value

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0469` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model the total cost of an AI feature across tokens, compute and operations
2. Analyse and optimise latency across the inference path
3. Define and measure quality against cost trade-offs
4. Quantify the business value and ROI of an AI investment
5. Make and defend cost-latency-quality-value trade-off decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The cost structure of AI systems (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a per-request cost model for a chatbot across tokens, compute and ops; (2) Compare build vs buy vs API pricing for a summarisation feature
- Common misconception addressed: Treating the token price as the whole cost of an AI feature
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Token, compute and infrastructure cost drivers | 96 | 8 |
| M01L02 | Build versus buy versus API pricing models | 96 | 8 |
### M02 Latency and performance economics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decompose the latency path of a RAG request and find the bottleneck; (2) Trade off caching, batching and streaming for a live assistant
- Common misconception addressed: Assuming a faster model always means lower end-to-end latency
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The inference latency path and its bottlenecks | 96 | 8 |
| M02L02 | Caching, batching and streaming trade-offs | 96 | 8 |
### M03 Measuring quality and its cost (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a task-appropriate quality metric set for an extraction feature; (2) Plot a quality-cost frontier and pick an operating point
- Common misconception addressed: Chasing a quality metric past the point of business value
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining quality metrics for AI outputs | 96 | 8 |
| M03L02 | The quality-cost frontier and diminishing returns | 96 | 8 |
### M04 Value, ROI and unit economics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute the unit economics of an AI feature per active user; (2) Estimate ROI and payback period for an AI investment
- Common misconception addressed: Confusing gross cost savings with net business value
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Unit economics of an AI feature | 96 | 8 |
| M04L02 | ROI, payback and value attribution | 96 | 8 |
### M05 Trade-off decisions and governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Frame and defend a cost-latency-quality-value trade-off to stakeholders; (2) Set a cost budget with guardrails and alerts for a feature
- Common misconception addressed: Optimising one axis in isolation instead of the whole trade-off
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Framing and defending the four-way trade-off | 96 | 8 |
| M05L02 | Budgets, guardrails and cost governance | 96 | 8 |

## Integrative case

A product team must ship one AI feature within a fixed budget and a 2-second latency target. Model its full cost, analyse its latency path, define a quality bar, quantify ROI, then defend a cost-latency-quality-value trade-off to leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0469-final-protected | 25 | 25 | yes |
| MST-0469-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The cost structure of AI systems | 5 |
| Latency and performance economics | 5 |
| Measuring quality and its cost | 5 |
| Value, ROI and unit economics | 5 |
| Trade-off decisions and governance | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0469-Q0001** (single-answer, Select ONE) A team reports an AI feature's cost as only the per-1K-token API price. What is the main flaw in this view?

- A. It ignores compute, retrieval, storage and operational costs **(key)**  
  _Rationale:_ Correct: total cost of an AI feature spans more than token pricing.
- B. Token price is irrelevant to AI cost  
  _Rationale:_ Token price is a real driver, just not the only one.
- C. Only latency matters, not cost  
  _Rationale:_ Latency is a separate axis; cost still matters.
- D. API pricing never changes so cost is fixed  
  _Rationale:_ Pricing and usage both vary; cost is not fixed.

**MST-0469-Q0002** (multiple-answer, Select TWO) Which TWO techniques can reduce user-perceived latency without changing the model? (Select TWO.)

- A. Caching responses for repeated requests **(key)**  
  _Rationale:_ Correct: cache hits avoid inference entirely.
- B. Increasing the maximum output length  
  _Rationale:_ Longer outputs usually increase latency.
- C. Streaming tokens as they are generated **(key)**  
  _Rationale:_ Correct: streaming reduces time-to-first-token perceived by users.
- D. Adding more retrieval sources per request  
  _Rationale:_ More retrieval generally adds latency.

**MST-0469-Q0003** (single-answer, Select ONE) An AI feature costs 0.20 per use and saves 2.00 of staff time per use. What does this tell you about ROI?

- A. Net value per use is positive, so the unit economics are favourable **(key)**  
  _Rationale:_ Correct: 2.00 saved exceeds 0.20 cost per use.
- B. ROI is negative because the feature has any cost  
  _Rationale:_ Cost alone does not make ROI negative; it is offset by savings.
- C. ROI cannot be estimated without the model's accuracy  
  _Rationale:_ Accuracy affects realised savings but a first-pass ROI is still estimable.
- D. The feature must be free to have positive ROI  
  _Rationale:_ ROI depends on net value, not zero cost.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
