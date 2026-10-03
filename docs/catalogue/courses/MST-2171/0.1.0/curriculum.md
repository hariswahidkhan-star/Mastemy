# Satellite Systems and Communications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2171` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational systems-overview course; concepts versioned by verification date. No official syllabus; scope is conceptual satellite and communications engineering only. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Satellite Systems and Communications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the major subsystems of a satellite and their roles
2. Explain how satellite communication links work at a concept level
3. Describe link budgets, frequency bands and antennas conceptually
4. Explain ground segment and mission operations basics
5. Describe constellations and their coverage trade-offs
6. Communicate satellite system trade-offs to non-specialists

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Satellite platform subsystems (25% (Mastemy design weight), design weight)

- Worked applications: (1) Label the subsystems on a satellite block diagram; (2) Explain why attitude control matters for a payload
- Common misconception addressed: Thinking a satellite is just a camera in space
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Power, thermal, structure and attitude control | 120 | 7 |
| M01L02 | Command, data handling and payloads | 120 | 7 |

### M02 Communication link fundamentals (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace a signal through an uplink and downlink path; (2) Match frequency bands to use cases conceptually
- Common misconception addressed: Believing higher frequency is always better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Uplink, downlink and the RF link concept | 120 | 7 |
| M02L02 | Frequency bands, antennas and modulation basics | 120 | 7 |

### M03 Link budgets and signal quality (25% (Mastemy design weight), design weight)

- Worked applications: (1) Identify what raises or lowers a link margin; (2) Explain why antenna gain improves a link
- Common misconception addressed: Assuming more transmit power always fixes a weak link
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | What a link budget captures conceptually | 120 | 7 |
| M03L02 | Noise, gain and signal-to-noise trade-offs | 120 | 7 |

### M04 Ground segment and constellations (25% (Mastemy design weight), design weight)

- Worked applications: (1) Sketch a simple ground-station-to-satellite pass; (2) Compare a single satellite vs a constellation for coverage
- Common misconception addressed: Thinking one satellite gives constant global coverage
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Ground stations and operations basics | 120 | 7 |
| M04L02 | Constellations and coverage trade-offs | 120 | 7 |

## Integrative case

A systems class outlines, at concept level, a small communications satellite service: they describe the platform subsystems, the uplink/downlink design, a qualitative link budget, the ground segment, and whether a constellation is needed, presenting trade-offs for review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2171-final-protected | 40 | 40 | yes |
| MST-2171-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Satellite platform subsystems | 10 |
| Communication link fundamentals | 10 |
| Link budgets and signal quality | 10 |
| Ground segment and constellations | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2171-Q0001** (single-answer, Select ONE) What is the main purpose of a satellite's attitude control subsystem?

- A. To point the satellite and its payload correctly **(key)**  
  _Rationale:_ Correct: attitude control orients the spacecraft and payload.
- B. To generate electrical power  
  _Rationale:_ Power generation is the power subsystem's job.
- C. To store mission science data  
  _Rationale:_ Data storage is handled by data handling, not attitude control.
- D. To provide propulsion to orbit  
  _Rationale:_ Launch to orbit is the launch vehicle's role.

**MST-2171-Q0002** (multiple-answer, Select TWO) Which TWO factors improve a satellite communications link budget? (Select TWO.)

- A. Higher antenna gain **(key)**  
  _Rationale:_ Correct: higher gain concentrates signal power and improves the link.
- B. Higher transmit power within limits **(key)**  
  _Rationale:_ Correct: more transmit power raises received signal strength.
- C. Adding more noise to the receiver  
  _Rationale:_ More noise worsens, not improves, the link.
- D. Pointing the antenna away from the target  
  _Rationale:_ Mispointing reduces received signal and link margin.

**MST-2171-Q0003** (single-answer, Select ONE) Why might a service use a constellation of satellites rather than a single one?

- A. To provide continuous or global coverage that one satellite cannot **(key)**  
  _Rationale:_ Correct: multiple satellites give persistent and wider coverage.
- B. Because a single satellite is always illegal  
  _Rationale:_ Single satellites are widely used; this is not a legal issue.
- C. Because constellations need no ground stations  
  _Rationale:_ Constellations still rely on ground segments.
- D. Because one satellite cannot carry any payload  
  _Rationale:_ Single satellites carry payloads routinely.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
