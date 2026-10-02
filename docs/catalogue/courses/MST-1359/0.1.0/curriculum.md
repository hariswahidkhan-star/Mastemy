# Video Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1359` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Video data fundamentals
2. Detection and tracking
3. Action and event recognition
4. Scale, performance and privacy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Video data fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose a frame-sampling rate; (2) Decide when temporal context matters
- Common misconception addressed: Treating video as a bag of independent frames with no temporal signal
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Frames, codecs and sampling | 120 | 8 |
| M01L02 | Spatial vs temporal information | 120 | 8 |

### M02 Detection and tracking (MASTEMY-DESIGN 25%)

- Worked applications: (1) Run detection then associate tracks; (2) Handle occlusion in tracking
- Common misconception addressed: Assuming per-frame detection alone gives stable object identities
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Object detection on frames | 120 | 8 |
| M02L02 | Multi-object tracking across frames | 120 | 8 |

### M03 Action and event recognition (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick a model for action recognition; (2) Detect an event in a long video
- Common misconception addressed: Using a single frame to classify an action that needs motion
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Temporal models for action recognition | 120 | 8 |
| M03L02 | Event detection and summarisation | 120 | 8 |

### M04 Scale, performance and privacy (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design a real-time video pipeline; (2) Add privacy safeguards to a camera feed
- Common misconception addressed: Running full detection on every frame when sampling would suffice
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Real-time pipelines and hardware | 120 | 8 |
| M04L02 | Privacy, bias and deployment | 120 | 8 |

## Integrative case

A retailer wants to count queue length and detect spills from store cameras in real time, with privacy safeguards. Choose frame sampling, detection plus tracking, temporal models for events, and a performant, privacy-aware deployment.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1359-final-protected | 20 | 20 | yes |
| MST-1359-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Video data fundamentals | 5 |
| Detection and tracking | 5 |
| Action and event recognition | 5 |
| Scale, performance and privacy | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1359-Q0001** (single-answer, Select ONE) Why is per-frame object detection alone insufficient for counting unique people over time?

- A. Without tracking, the same person is recounted on each frame **(key)**  
  _Rationale:_ Correct: tracking associates detections into consistent identities.
- B. Detection models cannot find people  
  _Rationale:_ They can; the gap is identity across frames.
- C. Frames contain no spatial information  
  _Rationale:_ Frames are spatial; the missing piece is temporal association.
- D. Counting requires audio  
  _Rationale:_ Audio is not needed for visual counting.

**MST-1359-Q0002** (multiple-answer, Select TWO) Which TWO tasks genuinely require temporal (multi-frame) modelling? (Select TWO.)

- A. Recognising an action like 'person falling' **(key)**  
  _Rationale:_ Correct: actions unfold over time and need motion context.
- B. Tracking an object through occlusion **(key)**  
  _Rationale:_ Correct: tracking uses motion across frames.
- C. Classifying the dominant colour of one still frame  
  _Rationale:_ That is a single-frame task.
- D. Reading the resolution of the video file  
  _Rationale:_ A static file property, not temporal.

**MST-1359-Q0003** (single-answer, Select ONE) To cut compute on a 30 fps feed where events last seconds, a sensible optimisation is:

- A. Sample frames (e.g. a few per second) instead of processing all 30 **(key)**  
  _Rationale:_ Correct: sampling preserves second-scale events at far lower cost.
- B. Process every frame twice for safety  
  _Rationale:_ That doubles cost with no benefit.
- C. Increase resolution on every frame  
  _Rationale:_ That raises cost, not lowers it.
- D. Disable tracking entirely  
  _Rationale:_ Dropping tracking breaks identity, not a pure optimisation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
