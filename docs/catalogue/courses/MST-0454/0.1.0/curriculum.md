# Model Quantization and Efficient Inference

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0454` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Why efficient inference
2. Quantization fundamentals
3. Advanced quantization
4. Serving optimizations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why efficient inference (MASTEMY-DESIGN 20%)

- Worked applications: (1) Break down the cost of a token generation; (2) Estimate KV-cache memory for a context
- Common misconception addressed: Assuming compute, not memory bandwidth, is always the bottleneck
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Latency, throughput and cost drivers | 120 | 8 |
| M01L02 | Memory, bandwidth and the KV cache | 120 | 8 |

### M02 Quantization fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Convert a layer from FP16 to INT8 conceptually; (2) Choose a quantization scheme for a model
- Common misconception addressed: Expecting no accuracy change from aggressive quantization
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Precision formats and numeric range | 120 | 8 |
| M02L02 | Post-training quantization | 120 | 8 |

### M03 Advanced quantization (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide PTQ vs QAT for an accuracy target; (2) Apply weight-only 4-bit to a large model
- Common misconception addressed: Quantizing sensitive layers the same as the rest
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Quantization-aware training | 120 | 8 |
| M03L02 | Weight-only and mixed precision | 120 | 8 |

### M04 Serving optimizations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design continuous batching for a server; (2) Pick a runtime for a latency SLA
- Common misconception addressed: Judging a serving setup only by single-request latency
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Batching, caching and speculative decoding | 120 | 8 |
| M04L02 | Hardware and runtime choices | 120 | 8 |

## Integrative case

An API must serve a large model under a strict cost and latency budget. Identify the real bottlenecks, choose a quantization strategy that holds accuracy, and apply serving optimizations such as batching and caching, then evaluate the trade-offs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0454-final-protected | 20 | 20 | yes |
| MST-0454-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why efficient inference | 5 |
| Quantization fundamentals | 5 |
| Advanced quantization | 5 |
| Serving optimizations | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0454-Q0001** (single-answer, Select ONE) During autoregressive LLM inference, which factor often dominates memory use for long contexts?

- A. The KV cache that stores keys and values for all previous tokens **(key)**  
  _Rationale:_ Correct: the KV cache grows with sequence length and dominates memory.
- B. The tokenizer vocabulary file  
  _Rationale:_ The vocabulary is small and fixed.
- C. The learning-rate schedule  
  _Rationale:_ Learning rate is a training concept, not inference memory.
- D. The random seed  
  _Rationale:_ The seed does not consume meaningful memory.

**MST-0454-Q0002** (multiple-answer, Select TWO) Which TWO statements about quantization are correct? (Select TWO.)

- A. Lower precision reduces memory and can speed up inference **(key)**  
  _Rationale:_ Correct: smaller numeric types cut memory and bandwidth.
- B. Aggressive quantization can degrade accuracy if sensitive layers are not handled **(key)**  
  _Rationale:_ Correct: some layers need higher precision to preserve accuracy.
- C. Quantization always improves accuracy  
  _Rationale:_ It typically trades some accuracy for efficiency.
- D. Quantization requires retraining from scratch  
  _Rationale:_ Post-training quantization needs no full retraining.

**MST-0454-Q0003** (single-answer, Select ONE) Why is single-request latency an incomplete way to judge a serving setup?

- A. It ignores throughput under concurrent load from batching **(key)**  
  _Rationale:_ Correct: real systems serve many requests; throughput matters too.
- B. Latency cannot be measured  
  _Rationale:_ Latency is measurable.
- C. Throughput is irrelevant to servers  
  _Rationale:_ Throughput is central to serving.
- D. Batching never affects performance  
  _Rationale:_ Batching strongly affects throughput and latency.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
