# Speech AI Systems: Text-to-Speech and Speech-to-Text

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2058` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Specific TTS/STT model and API behaviour, languages and limits must be re-checked against current provider docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Speech AI Systems: Text-to-Speech and Speech-to-Text (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the speech pipeline for STT (speech-to-text) and TTS (text-to-speech) and where each fits
2. Choose between streaming and batch transcription for a use case
3. Evaluate transcription quality with word error rate and handle noise, accents and domain terms
4. Control synthesised speech with voices, prosody and pronunciation markup
5. Design a real-time voice interaction loop combining STT, an LLM and TTS with acceptable latency
6. Address accessibility, consent and privacy for voice data

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The speech pipeline (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide for a voicemail product whether STT, TTS or both are needed; (2) Pick an audio sample rate and format for a phone-quality voice bot
- Common misconception addressed: Confusing text-to-speech (synthesis) with speech-to-text (transcription)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | STT and TTS: where each sits in a voice product | 120 | 7 |
| M01L02 | Audio basics: sampling, formats and why they matter | 120 | 7 |

### M02 Speech-to-text in practice (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose streaming transcription for a live caption feature and justify it; (2) Compute word error rate from a reference and a hypothesis transcript
- Common misconception addressed: Reporting accuracy as a single number without accounting for accents or noise
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Streaming vs batch transcription and their trade-offs | 120 | 7 |
| M02L02 | Measuring accuracy with word error rate; handling noise, accents and jargon | 120 | 7 |

### M03 Text-to-speech in practice (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add pronunciation markup so a product name is spoken correctly; (2) Adjust pacing and pauses for a clearer announcement
- Common misconception addressed: Assuming the default voice reads every name, number and acronym correctly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Choosing voices and controlling prosody and pronunciation | 120 | 7 |
| M03L02 | Naturalness, pacing and markup for clear synthesis | 120 | 7 |

### M04 Voice interaction and responsibility (25% (Mastemy design weight), design weight)

- Worked applications: (1) Budget end-to-end latency across STT, the LLM and TTS for a live agent; (2) Write a consent and retention note for recorded voice data
- Common misconception addressed: Ignoring consent and storing raw voice recordings indefinitely by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | A real-time STT to LLM to TTS loop and its latency budget | 120 | 7 |
| M04L02 | Consent, privacy and accessibility for voice data | 120 | 7 |

## Integrative case

A bank builds a voice assistant for its phone line: choose streaming STT for live input, measure transcription accuracy on noisy calls with domain terms, control TTS pronunciation of product names, budget the STT-LLM-TTS latency for natural turn-taking, and document consent and retention for recorded audio.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2058-final-protected | 40 | 40 | yes |
| MST-2058-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The speech pipeline | 10 |
| Speech-to-text in practice | 10 |
| Text-to-speech in practice | 10 |
| Voice interaction and responsibility | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2058-Q0001** (single-answer, Select ONE) A live-captioning feature must show words as the speaker talks. Which transcription mode fits, and why?

- A. Streaming transcription, because it emits partial results continuously with low latency instead of waiting for the full audio **(key)**  
  _Rationale:_ Correct: live captions need incremental, low-latency output that streaming provides.
- B. Batch transcription, because it is always more accurate  
  _Rationale:_ Batch waits for the whole file and cannot caption live, regardless of accuracy.
- C. Text-to-speech, because captions are audio  
  _Rationale:_ Captions are text from speech; that is STT, not TTS.
- D. No transcription is needed  
  _Rationale:_ Captions require speech-to-text.

**MST-2058-Q0002** (multiple-answer, Select TWO) Which TWO factors most affect speech-to-text word error rate in production? (Select TWO.)

- A. Background noise in the audio **(key)**  
  _Rationale:_ Correct: noise degrades recognition accuracy.
- B. Domain-specific or rare vocabulary the model was not tuned for **(key)**  
  _Rationale:_ Correct: unusual terms raise error rates unless the model adapts.
- C. The colour of the user interface  
  _Rationale:_ UI colour is irrelevant to transcription accuracy.
- D. Whether the transcript is displayed in bold  
  _Rationale:_ Display styling does not affect recognition accuracy.

**MST-2058-Q0003** (single-answer, Select ONE) Why add pronunciation markup to a text-to-speech request for a product named 'Xyla'?

- A. To tell the synthesiser how to pronounce an unusual name the default voice would likely mispronounce **(key)**  
  _Rationale:_ Correct: markup controls pronunciation of names and terms the model cannot infer.
- B. To translate the name into another language  
  _Rationale:_ Markup controls pronunciation, not translation.
- C. To transcribe the user's speech  
  _Rationale:_ That is STT; markup here is for synthesis.
- D. To reduce the audio sample rate  
  _Rationale:_ Pronunciation markup does not change sample rate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
