# Machine Translation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1362` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. MT foundations
2. Data and training
3. Quality and decoding
4. Evaluation and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 MT foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Explain the encoder-decoder flow; (2) Trace attention on a sentence pair
- Common misconception addressed: Believing translation is word-for-word substitution
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From rule-based to neural MT | 120 | 8 |
| M01L02 | Encoder-decoder and attention | 120 | 8 |

### M02 Data and training (MASTEMY-DESIGN 25%)

- Worked applications: (1) Prepare a parallel corpus; (2) Apply BPE to rare words
- Common misconception addressed: Assuming more raw data always beats cleaner, aligned data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Parallel corpora and alignment | 120 | 8 |
| M02L02 | Subword tokenisation (BPE) | 120 | 8 |

### M03 Quality and decoding (MASTEMY-DESIGN 25%)

- Worked applications: (1) Tune beam width for quality; (2) Diagnose a hallucinated translation
- Common misconception addressed: Thinking a larger beam always improves translation quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Beam search and decoding | 120 | 8 |
| M03L02 | Handling rare words and hallucination | 120 | 8 |

### M04 Evaluation and deployment (MASTEMY-DESIGN 25%)

- Worked applications: (1) Interpret a BLEU score; (2) Adapt an MT system to a domain
- Common misconception addressed: Trusting BLEU alone as a measure of translation adequacy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | BLEU, chrF and human evaluation | 120 | 8 |
| M04L02 | Domain adaptation and post-editing | 120 | 8 |

## Integrative case

A company must translate product manuals into five languages with consistent terminology and a human post-editing step. Choose data and subword tokenisation, a neural MT approach, decoding settings, and an evaluation plan combining automatic metrics with human review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1362-final-protected | 20 | 20 | yes |
| MST-1362-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MT foundations | 5 |
| Data and training | 5 |
| Quality and decoding | 5 |
| Evaluation and deployment | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1362-Q0001** (single-answer, Select ONE) Why do neural MT systems use subword (e.g. BPE) tokenisation?

- A. It represents rare and unseen words as known subword units **(key)**  
  _Rationale:_ Correct: subwords avoid a fixed vocabulary's out-of-vocabulary problem.
- B. It translates faster than words  
  _Rationale:_ Speed is not the main reason.
- C. It removes the need for parallel data  
  _Rationale:_ Parallel data is still required.
- D. It guarantees fluent output  
  _Rationale:_ Fluency is not guaranteed by tokenisation alone.

**MST-1362-Q0002** (multiple-answer, Select TWO) A translation is fluent but invents facts not in the source. Which TWO are sound responses? (Select TWO.)

- A. Reduce over-generation, e.g. via coverage/length controls or decoding tweaks **(key)**  
  _Rationale:_ Correct: these curb hallucinated content.
- B. Add human post-editing for high-stakes text **(key)**  
  _Rationale:_ Correct: review catches fluent-but-wrong output.
- C. Increase the beam width without limit  
  _Rationale:_ Larger beams can worsen or not fix hallucination.
- D. Ignore it because the output reads well  
  _Rationale:_ Fluency does not mean adequacy.

**MST-1362-Q0003** (single-answer, Select ONE) Why should BLEU not be the only measure of translation quality?

- A. It captures n-gram overlap, not adequacy or meaning, so it can miss real errors **(key)**  
  _Rationale:_ Correct: automatic metrics need human evaluation alongside.
- B. It is always lower than human scores  
  _Rationale:_ That is not the reason it is limited.
- C. It only works for images  
  _Rationale:_ BLEU is a text metric.
- D. It measures translation speed  
  _Rationale:_ BLEU measures overlap, not speed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
