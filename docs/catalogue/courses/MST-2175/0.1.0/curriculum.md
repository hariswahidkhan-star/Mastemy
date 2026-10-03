# Radar and Sensor Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2175` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational physics and systems overview; concepts versioned by verification date. No official syllabus; conceptual sensing principles only - NO targeting, operational tactics or classified specifics. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Radar and Sensor Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the basic principle of radar and electromagnetic sensing
2. Describe the radar range equation and detection concepts qualitatively
3. Compare sensor modalities such as radar, lidar, infrared and optical
4. Describe sensor system components and signal processing at a concept level
5. Explain sensor fusion and its benefits conceptually
6. Communicate sensing system trade-offs to non-specialists

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Sensing and radar fundamentals (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace a radar pulse from transmit to echo; (2) Match a frequency band to a sensing use conceptually
- Common misconception addressed: Thinking radar 'sees' like a camera does
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How radar sends and receives signals | 120 | 7 |
| M01L02 | The electromagnetic spectrum and sensing basics | 120 | 7 |

### M02 Detection concepts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain qualitatively why range affects detectability; (2) Describe the resolution vs range trade-off
- Common misconception addressed: Believing more power alone solves every detection limit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The radar range equation qualitatively | 120 | 7 |
| M02L02 | Resolution, noise and detection trade-offs | 120 | 7 |

### M03 Sensor modalities compared (25% (Mastemy design weight), design weight)

- Worked applications: (1) Match three sensor types to suitable conditions; (2) Explain why infrared works at night
- Common misconception addressed: Assuming one sensor works well in all weather
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Radar vs lidar, infrared and optical | 120 | 7 |
| M03L02 | Choosing a sensor for an environment | 120 | 7 |

### M04 Processing and fusion (25% (Mastemy design weight), design weight)

- Worked applications: (1) Describe what signal processing extracts from raw returns; (2) Explain how fusing two sensors improves awareness
- Common misconception addressed: Thinking raw sensor data is directly usable without processing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Signal processing basics conceptually | 120 | 7 |
| M04L02 | Sensor fusion and combined situational awareness | 120 | 7 |

## Integrative case

A sensing class evaluates, at concept level only, a sensor suite for an environmental monitoring platform: they explain the radar principle and detection trade-offs, compare radar, lidar, infrared and optical options, and outline signal processing and fusion, presenting trade-offs for a design review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2175-final-protected | 40 | 40 | yes |
| MST-2175-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Sensing and radar fundamentals | 10 |
| Detection concepts | 10 |
| Sensor modalities compared | 10 |
| Processing and fusion | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2175-Q0001** (single-answer, Select ONE) What basic principle allows radar to detect a distant object?

- A. It transmits electromagnetic energy and measures the reflected echo **(key)**  
  _Rationale:_ Correct: radar times and measures reflected signals.
- B. It listens only to sound waves from the object  
  _Rationale:_ Radar uses electromagnetic waves, not sound.
- C. It requires physical contact with the object  
  _Rationale:_ Radar is a remote, non-contact sensing method.
- D. It works only in bright daylight  
  _Rationale:_ Radar does not depend on visible light.

**MST-2175-Q0002** (multiple-answer, Select TWO) Which TWO statements about comparing sensor modalities are correct? (Select TWO.)

- A. Infrared sensors can detect heat signatures at night **(key)**  
  _Rationale:_ Correct: IR senses thermal emission regardless of daylight.
- B. Radar can operate through many weather conditions that limit optical sensors **(key)**  
  _Rationale:_ Correct: radar penetrates cloud and darkness better than optical.
- C. Optical cameras see perfectly through thick fog  
  _Rationale:_ Fog strongly degrades optical sensing.
- D. Lidar and radar are identical in every way  
  _Rationale:_ They use different wavelengths and have different strengths.

**MST-2175-Q0003** (single-answer, Select ONE) Why is sensor fusion often used in complex sensing systems?

- A. Combining sensors gives a more complete and reliable picture than any one alone **(key)**  
  _Rationale:_ Correct: fusion leverages complementary sensor strengths.
- B. Because one sensor is always perfect  
  _Rationale:_ No single sensor is ideal in all conditions.
- C. Because fusion removes the need for processing  
  _Rationale:_ Fusion itself requires processing.
- D. Because more sensors always cost nothing  
  _Rationale:_ Added sensors add cost and complexity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
