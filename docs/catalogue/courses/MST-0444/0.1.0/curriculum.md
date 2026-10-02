# Natural Language Processing with Transformers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0444` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-NLPF-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Prepare and tokenise text for modelling
2. Explain attention and the transformer architecture
3. Use pretrained models and embeddings
4. Fine-tune transformers for downstream tasks
5. Evaluate NLP models appropriately
6. Choose between fine-tuning and prompting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Text preparation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a tokenisation pipeline; (2) Handle out-of-vocabulary tokens
- Common misconception addressed: Lowercasing or stripping text that carries meaning
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Text cleaning and normalisation | 168 | 8 |
| M01L02 | Tokenisation and subwords | 168 | 8 |

### M02 Attention and transformers (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace an attention computation on a short sequence; (2) Explain the role of positional information
- Common misconception addressed: Thinking attention is the same as alignment truth
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Self-attention | 168 | 8 |
| M02L02 | Transformer architecture | 168 | 8 |

### M03 Pretrained models and embeddings (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use embeddings for semantic similarity; (2) Extract features from a pretrained encoder
- Common misconception addressed: Comparing embeddings from differently trained models
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Embeddings and representations | 168 | 8 |
| M03L02 | Using pretrained encoders | 168 | 8 |

### M04 Fine-tuning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Fine-tune a transformer on a labelled set; (2) Apply a parameter-efficient method
- Common misconception addressed: Fine-tuning on too little data without regularisation
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Fine-tuning for classification | 168 | 8 |
| M04L02 | Parameter-efficient fine-tuning | 168 | 8 |

### M05 Evaluation and choices (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick metrics for a classification task; (2) Decide fine-tune vs prompt for a case
- Common misconception addressed: Judging generation quality by accuracy alone
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | NLP evaluation metrics | 168 | 8 |
| M05L02 | Fine-tune vs prompt | 168 | 8 |

## Integrative case

Build an NLP solution for support-ticket triage: tokenise and prepare text, fine-tune a pretrained transformer for classification, evaluate it against a baseline, and decide between fine-tuning and prompting a large model given cost and data constraints.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0444-final-protected | 25 | 25 | yes |
| MST-0444-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Text preparation | 5 |
| Attention and transformers | 5 |
| Pretrained models and embeddings | 5 |
| Fine-tuning | 5 |
| Evaluation and choices | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0444-Q0001** (single-answer, Select ONE) Why do transformers add positional information to token embeddings?

- A. Self-attention alone is order-agnostic, so position must be encoded explicitly **(key)**  
  _Rationale:_ Correct: without it the model cannot tell word order.
- B. To reduce the vocabulary size  
  _Rationale:_ Positional encoding does not change vocabulary.
- C. To convert text to lowercase  
  _Rationale:_ That is unrelated to positional encoding.
- D. To compress the model  
  _Rationale:_ It is about order, not compression.

**MST-0444-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to fine-tune a smaller model instead of prompting a large one? (Select TWO.)

- A. Lower, more predictable inference cost at scale **(key)**  
  _Rationale:_ Correct: a small fine-tuned model is cheaper to serve.
- B. You have enough labelled data for the specific task **(key)**  
  _Rationale:_ Correct: labelled data makes fine-tuning effective.
- C. You have no task data at all  
  _Rationale:_ Without data, fine-tuning has nothing to learn from.
- D. You need the broadest possible general knowledge with zero setup  
  _Rationale:_ That favours prompting a large general model.

**MST-0444-Q0003** (single-answer, Select ONE) Why can aggressive lowercasing and punctuation stripping hurt an NLP model?

- A. It can erase meaning, such as distinguishing 'US' from 'us' **(key)**  
  _Rationale:_ Correct: normalisation can destroy signal.
- B. It always improves accuracy  
  _Rationale:_ It does not always help and can hurt.
- C. It increases the vocabulary size  
  _Rationale:_ It typically reduces vocabulary.
- D. It is required by all tokenisers  
  _Rationale:_ Modern subword tokenisers do not require it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
