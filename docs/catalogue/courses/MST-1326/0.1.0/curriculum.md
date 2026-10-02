# Transformers Architecture Explained

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1326` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the motivation for Transformers
2. Describe self-attention
3. Explain multi-head attention and position
4. Describe the Transformer block and masking
5. Compare Transformer variants and scaling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Motivation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why Transformers parallelise over tokens; (2) Contrast recurrence with self-attention
- Common misconception addressed: Thinking Transformers process tokens strictly in sequence
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Limits of recurrence | 120 | 8 |
| M01L02 | Parallelism and the Transformer idea | 120 | 8 |

### M02 Self-attention (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace a single attention computation; (2) Explain the scaling factor's purpose
- Common misconception addressed: Confusing attention weights with learned model weights
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Queries, keys and values | 120 | 8 |
| M02L02 | Scaled dot-product attention | 120 | 8 |

### M03 Multi-head and position (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why multiple heads help; (2) Explain why position must be injected
- Common misconception addressed: Assuming self-attention inherently knows token order
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Multi-head attention | 120 | 8 |
| M03L02 | Positional encodings | 120 | 8 |

### M04 Block structure (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe a Transformer block's components; (2) Explain causal masking in a decoder
- Common misconception addressed: Believing the decoder can see future tokens during training
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Feed-forward, residuals and norm | 120 | 8 |
| M04L02 | Encoder, decoder and masking | 120 | 8 |

### M05 Scaling and variants (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a model family to a task; (2) Explain the quadratic cost of attention
- Common misconception addressed: Assuming longer context is always free to add
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Encoder-only, decoder-only, seq2seq | 120 | 8 |
| M05L02 | Compute, context length and efficiency | 120 | 8 |

## Integrative case

A team chooses a Transformer family for a document-understanding product. Explain self-attention trade-offs, justify positional encoding and masking choices, and weigh context length against compute cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1326-final-protected | 25 | 25 | yes |
| MST-1326-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Motivation | 5 |
| Self-attention | 5 |
| Multi-head and position | 5 |
| Block structure | 5 |
| Scaling and variants | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1326-Q0001** (single-answer, Select ONE) Why are positional encodings needed in a Transformer?

- A. Self-attention is permutation-invariant, so order must be injected explicitly **(key)**  
  _Rationale:_ Correct: without position, token order is lost.
- B. They replace the feed-forward layers  
  _Rationale:_ They do not replace feed-forward layers.
- C. They reduce the number of heads  
  _Rationale:_ They are unrelated to head count.
- D. They make training unnecessary  
  _Rationale:_ Training is still required.

**MST-1326-Q0002** (multiple-answer, Select TWO) Which TWO are components of scaled dot-product self-attention? (Select TWO.)

- A. Queries, keys and values derived from the inputs **(key)**  
  _Rationale:_ Correct: attention is computed from Q, K, V.
- B. A scaling factor applied before the softmax **(key)**  
  _Rationale:_ Correct: scaling stabilises gradients.
- C. A convolution kernel  
  _Rationale:_ Attention uses no convolution kernel.
- D. A recurrent hidden state carried over time  
  _Rationale:_ Attention is not recurrent.

**MST-1326-Q0003** (single-answer, Select ONE) Why does causal masking matter in a decoder during training?

- A. It prevents each position from attending to future tokens, matching inference **(key)**  
  _Rationale:_ Correct: masking enforces left-to-right prediction.
- B. It speeds up the softmax only  
  _Rationale:_ Its purpose is correctness, not speed.
- C. It removes positional encodings  
  _Rationale:_ Masking does not remove position.
- D. It lets the model copy the answer  
  _Rationale:_ Masking prevents seeing the answer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
