# Recurrent Networks and Sequence Models

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1325` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain sequence modelling and RNNs
2. Diagnose RNN training challenges
3. Describe gated units
4. Design sequence architectures
5. Relate attention and Transformers to RNNs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Sequence modelling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Frame a task as sequence modelling; (2) Explain weight sharing across time steps
- Common misconception addressed: Treating sequence data as independent rows
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why sequences need memory | 120 | 8 |
| M01L02 | RNN unrolling and shared weights | 120 | 8 |

### M02 Training challenges (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why long sequences lose gradient; (2) Apply gradient clipping to exploding gradients
- Common misconception addressed: Assuming plain RNNs capture long-range dependencies well
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Backpropagation through time | 120 | 8 |
| M02L02 | Vanishing and exploding gradients | 120 | 8 |

### M03 Gated units (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain what each LSTM gate controls; (2) Compare GRU and LSTM for a task
- Common misconception addressed: Believing gates eliminate all long-range problems
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | LSTM cells and gates | 120 | 8 |
| M03L02 | GRUs and trade-offs | 120 | 8 |

### M04 Sequence architectures (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a seq2seq pipeline; (2) Decide when bidirectionality is valid
- Common misconception addressed: Using a bidirectional model for real-time streaming
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Encoder-decoder and seq2seq | 120 | 8 |
| M04L02 | Bidirectional and stacked RNNs | 120 | 8 |

### M05 Context and alternatives (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain how attention relieves the bottleneck; (2) Choose RNN vs Transformer for a scenario
- Common misconception addressed: Assuming RNNs are always obsolete now
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Attention as an add-on | 120 | 8 |
| M05L02 | When Transformers replace RNNs | 120 | 8 |

## Integrative case

A team forecasts energy demand from sensor time series. Choose between RNN variants, handle long dependencies and exploding gradients, and decide whether a Transformer is warranted.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1325-final-protected | 25 | 25 | yes |
| MST-1325-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Sequence modelling | 5 |
| Training challenges | 5 |
| Gated units | 5 |
| Sequence architectures | 5 |
| Context and alternatives | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1325-Q0001** (single-answer, Select ONE) Why do plain RNNs struggle with long-range dependencies?

- A. Gradients can vanish across many time steps, weakening early-signal learning **(key)**  
  _Rationale:_ Correct: vanishing gradients limit long-range memory.
- B. They have too many gates  
  _Rationale:_ Plain RNNs have no gates.
- C. They cannot share weights  
  _Rationale:_ They do share weights across time.
- D. They require images as input  
  _Rationale:_ They operate on sequences.

**MST-1325-Q0002** (multiple-answer, Select TWO) Which TWO are gated recurrent architectures? (Select TWO.)

- A. LSTM **(key)**  
  _Rationale:_ Correct: uses input, forget and output gates.
- B. GRU **(key)**  
  _Rationale:_ Correct: uses update and reset gates.
- C. Plain Elman RNN  
  _Rationale:_ It has no gates.
- D. k-means  
  _Rationale:_ It is a clustering algorithm.

**MST-1325-Q0003** (single-answer, Select ONE) When is a bidirectional RNN inappropriate?

- A. Real-time streaming, because future context is not yet available **(key)**  
  _Rationale:_ Correct: bidirectionality needs the full sequence.
- B. Offline text classification  
  _Rationale:_ Full text is available, so it is fine.
- C. Batch translation of complete sentences  
  _Rationale:_ Full input is available.
- D. Any task with labelled data  
  _Rationale:_ Labels are unrelated to directionality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
