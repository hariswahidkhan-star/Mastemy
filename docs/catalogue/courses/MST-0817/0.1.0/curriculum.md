# Whisper + FFmpeg + YouTube: Captioned Learning-Video Pipeline

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0817` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Whisper + FFmpeg + YouTube: Captioned Learning-Video Pipeline (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Transcribe audio accurately with Whisper
2. Process and mux media and captions with FFmpeg
3. Publish and manage captions on YouTube
4. Operate a repeatable captioning pipeline with QA

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Transcribe with Whisper (MASTEMY-DESIGN 25%)

- Worked applications: (1) Transcribe a 10-minute lecture to SRT with Whisper; (2) Compare tiny and small model accuracy and speed
- Common misconception addressed: Assuming the largest model is always necessary
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Running Whisper models and choosing model size | 120 | 7 |
| M01L02 | Output formats (SRT/VTT) and language options | 120 | 7 |

### M02 Process media with FFmpeg (MASTEMY-DESIGN 25%)

- Worked applications: (1) Mux an SRT as a soft subtitle track with FFmpeg; (2) Normalise audio loudness toward a target LUFS
- Common misconception addressed: Confusing hard-burned captions with selectable subtitle tracks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | FFmpeg basics: containers, codecs and trimming | 120 | 7 |
| M02L02 | Soft vs burned-in captions and audio normalisation | 120 | 7 |

### M03 Publish captions on YouTube (MASTEMY-DESIGN 25%)

- Worked applications: (1) Upload a corrected VTT to a YouTube video; (2) Add a second-language caption track
- Common misconception addressed: Relying on auto-captions for accessibility compliance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Uploading caption files and editing timing | 120 | 7 |
| M03L02 | Multiple languages and accessibility review | 120 | 7 |

### M04 Build the pipeline (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a script that transcribes and muxes in one pass; (2) Define a caption QA checklist
- Common misconception addressed: Skipping human review of machine transcripts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scripting the Whisper to FFmpeg to YouTube flow | 120 | 7 |
| M04L02 | Quality gates and review for captions | 120 | 7 |

## Integrative case

Take a raw 20-minute lecture recording: transcribe it with Whisper, normalise the audio and attach a soft subtitle track with FFmpeg, upload it with a corrected caption file to YouTube, and run a caption QA checklist before publishing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0817-final-protected | 40 | 50 | yes |
| MST-0817-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Transcribe with Whisper | 10 |
| Process media with FFmpeg | 10 |
| Publish captions on YouTube | 10 |
| Build the pipeline | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0817-Q0001** (single-answer, Select ONE) Which Whisper output format is directly accepted as a YouTube caption upload?

- A. SRT or VTT **(key)**  
  _Rationale:_ Correct: YouTube accepts standard subtitle formats such as SRT and WebVTT.
- B. MP4  
  _Rationale:_ MP4 is a video container, not a caption file.
- C. Raw model logits (JSON)  
  _Rationale:_ Logits are internal model outputs, not captions.
- D. WAV  
  _Rationale:_ WAV is audio, not a caption format.

**MST-0817-Q0002** (multiple-answer, Select TWO) Which TWO FFmpeg approaches keep captions as a selectable track rather than permanently drawn onto the picture? (Select TWO.)

- A. Mux an SRT/mov_text subtitle stream into the container **(key)**  
  _Rationale:_ Correct: a soft subtitle stream stays selectable and can be toggled.
- B. Add a WebVTT subtitle track alongside the video **(key)**  
  _Rationale:_ Correct: a sidecar/soft WebVTT track remains selectable.
- C. Use the subtitles filter to burn them into the frames  
  _Rationale:_ Burning in draws captions onto the picture permanently.
- D. Overlay text with the drawtext filter  
  _Rationale:_ drawtext renders text into the video frames.

**MST-0817-Q0003** (single-answer, Select ONE) Why review Whisper transcripts before publishing captions?

- A. Models make errors on names, technical terms and timing **(key)**  
  _Rationale:_ Correct: automatic transcripts need correction for accuracy and accessibility.
- B. Captions are optional and can be skipped  
  _Rationale:_ Accurate captions matter for accessibility and comprehension.
- C. Reviewing increases watch time directly  
  _Rationale:_ Review is about accuracy, not a watch-time lever.
- D. YouTube requires 4K video for captions  
  _Rationale:_ Resolution is unrelated to caption review.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
