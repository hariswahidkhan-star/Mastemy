# Speech Recognition and Audio Machine Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0446` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Audio signals and features
2. Acoustic modelling
3. ASR systems and language models
4. Evaluation and audio tasks beyond ASR

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Audio signals and features (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute an MFCC pipeline for a short clip; (2) Choose a sample rate and window size for speech
- Common misconception addressed: Treating a raw waveform as a good direct model input without framing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Audio representation and sampling | 120 | 8 |
| M01L02 | Feature extraction: spectrograms and MFCCs | 120 | 8 |

### M02 Acoustic modelling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Align a transcript to audio with CTC; (2) Pick an acoustic model for a streaming use case
- Common misconception addressed: Assuming frame-level labels are always available for training
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | From HMM-GMM to neural acoustic models | 120 | 8 |
| M02L02 | CTC and sequence modelling | 120 | 8 |

### M03 ASR systems and language models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add an n-gram LM to a greedy decoder; (2) Trade off beam width against latency
- Common misconception addressed: Believing a bigger beam always lowers word error rate
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | End-to-end ASR architectures | 120 | 8 |
| M03L02 | Decoding and language-model fusion | 120 | 8 |

### M04 Evaluation and audio tasks beyond ASR (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute WER for a noisy transcript; (2) Choose metrics for a diarization task
- Common misconception addressed: Reporting accuracy instead of WER for transcription
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Word error rate and robustness | 120 | 8 |
| M04L02 | Speaker ID, diarization and audio classification | 120 | 8 |

## Integrative case

A call-centre wants searchable transcripts and per-speaker summaries from noisy recordings. Choose features, an acoustic and language model, a decoding strategy for near-real-time use, and the right evaluation metrics, then justify the trade-offs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0446-final-protected | 20 | 20 | yes |
| MST-0446-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Audio signals and features | 5 |
| Acoustic modelling | 5 |
| ASR systems and language models | 5 |
| Evaluation and audio tasks beyond ASR | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0446-Q0001** (single-answer, Select ONE) Which feature is most commonly used to compactly represent the short-term spectral envelope of speech for ASR?

- A. MFCCs **(key)**  
  _Rationale:_ Correct: MFCCs compress the spectral envelope into a few perceptually weighted coefficients.
- B. Raw 16-bit PCM samples  
  _Rationale:_ Raw samples are high-dimensional and not a compact spectral feature.
- C. The file bitrate  
  _Rationale:_ Bitrate is an encoding property, not an acoustic feature.
- D. One-hot character labels  
  _Rationale:_ Those are targets, not input features.

**MST-0446-Q0002** (multiple-answer, Select TWO) A streaming ASR system must emit words with low latency. Which TWO choices support that goal? (Select TWO.)

- A. Use a streaming/online decoder with limited look-ahead **(key)**  
  _Rationale:_ Correct: limited look-ahead lets the decoder commit words early.
- B. Keep the beam width modest **(key)**  
  _Rationale:_ Correct: a smaller beam reduces per-step compute and latency.
- C. Wait for the full utterance before decoding  
  _Rationale:_ Full-utterance decoding adds latency and is not streaming.
- D. Use the largest possible rescoring LM on every frame  
  _Rationale:_ Heavy per-frame rescoring increases latency.

**MST-0446-Q0003** (single-answer, Select ONE) Which metric is the standard way to evaluate transcription quality?

- A. Word error rate (WER) **(key)**  
  _Rationale:_ Correct: WER counts substitutions, insertions and deletions against a reference.
- B. Top-1 image accuracy  
  _Rationale:_ That is an image-classification metric.
- C. Mean average precision  
  _Rationale:_ mAP is a detection/ranking metric.
- D. Bitrate  
  _Rationale:_ Bitrate measures encoding, not accuracy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
