# Speech AI: ASR and TTS

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1344` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the pipeline of automatic speech recognition
2. Describe how text-to-speech synthesises audio
3. Identify metrics for ASR and TTS quality
4. Prepare audio data and handle noise and accents
5. Recognise limitations and responsible-use concerns in speech AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Speech AI overview (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a voice feature to ASR and TTS stages; (2) Distinguish recognition from synthesis
- Common misconception addressed: Assuming ASR and TTS are the same technology reversed
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What ASR and TTS do | 72 | 8 |
| M01L02 | The end-to-end voice pipeline | 72 | 8 |

### M02 Automatic speech recognition (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace audio to text through an ASR pipeline; (2) Explain why accents and noise raise error rates
- Common misconception addressed: Expecting perfect transcription in noisy, accented speech
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Acoustic and language modelling | 72 | 8 |
| M02L02 | Streaming vs batch recognition | 72 | 8 |

### M03 Text-to-speech (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare concatenative and neural TTS; (2) Judge naturalness of a synthesised sample
- Common misconception addressed: Thinking any TTS voice is natural and unbiased
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | From text to waveform | 72 | 8 |
| M03L02 | Neural TTS and voice quality | 72 | 8 |

### M04 Data and robustness (MASTEMY-DESIGN 20%)

- Worked applications: (1) Clean and segment noisy audio; (2) Plan coverage of accents and conditions
- Common misconception addressed: Training only on clean studio audio
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Audio preprocessing | 72 | 8 |
| M04L02 | Handling noise, accents and languages | 72 | 8 |

### M05 Evaluation and responsible use (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute word error rate on a transcript; (2) Flag a consent issue in voice cloning
- Common misconception addressed: Ignoring consent and bias in voice data
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | WER, MOS and quality metrics | 72 | 8 |
| M05L02 | Consent, bias and voice cloning risks | 72 | 8 |

## Integrative case

A product needs voice input and spoken responses. Choose ASR and TTS approaches, define how audio is captured and cleaned, select quality metrics such as word error rate, and flag the accessibility, bias and consent issues that must be addressed before release.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1344-final-protected | 25 | 25 | yes |
| MST-1344-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Speech AI overview | 5 |
| Automatic speech recognition | 5 |
| Text-to-speech | 5 |
| Data and robustness | 5 |
| Evaluation and responsible use | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1344-Q0001** (single-answer, Select ONE) Which metric is standard for measuring automatic speech recognition accuracy?

- A. Word error rate (WER) **(key)**  
  _Rationale:_ Correct: WER measures substitutions, insertions and deletions against a reference transcript.
- B. Frames per second  
  _Rationale:_ FPS measures video rendering, not transcription accuracy.
- C. Peak signal-to-noise ratio of weights  
  _Rationale:_ That is not an ASR accuracy metric.
- D. Context window length  
  _Rationale:_ Context length does not measure transcription accuracy.

**MST-1344-Q0002** (multiple-answer, Select TWO) Which TWO factors most commonly increase ASR word error rate in production? (Select TWO.)

- A. Background noise in the audio **(key)**  
  _Rationale:_ Correct: noise degrades the acoustic signal and raises errors.
- B. Accents or dialects underrepresented in training data **(key)**  
  _Rationale:_ Correct: unseen accents are recognised less accurately.
- C. Using a reference transcript for scoring  
  _Rationale:_ A reference is needed to score; it does not cause errors.
- D. Recording in a quiet studio  
  _Rationale:_ Clean audio lowers, not raises, error rate.

**MST-1344-Q0003** (single-answer, Select ONE) Before cloning a person's voice for a TTS feature, what is the key responsible-use requirement?

- A. Obtaining the person's informed consent to use their voice **(key)**  
  _Rationale:_ Correct: voice cloning requires consent to avoid misuse and harm.
- B. Maximising the sampling rate  
  _Rationale:_ Audio quality is unrelated to the consent requirement.
- C. Reducing the model's parameter count  
  _Rationale:_ Model size is not a consent matter.
- D. Increasing WER  
  _Rationale:_ Raising error rate is neither desirable nor a consent control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
