# Augmented & Virtual Reality (AR/VR) Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2759` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum design (no official syllabus); emerging-technology scope as of 2026-10, speculative topics treated conceptually and safely. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Augmented & Virtual Reality (AR/VR) Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish virtual, augmented and mixed reality and their use cases
2. Explain display, tracking and rendering fundamentals for XR
3. Describe interaction techniques and input for immersive systems
4. Reason about presence, comfort and motion sickness
5. Explain the basics of designing usable immersive experiences
6. Identify privacy, safety and accessibility considerations in XR

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The XR spectrum (20% (design weight), design weight)

- Worked applications: (1) Classify three apps as VR, AR or MR; (2) Match a sector use case to a modality
- Common misconception addressed: Using 'VR' and 'AR' interchangeably
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VR, AR and MR defined | 64 | 4 |
| M01L02 | Use cases by sector | 64 | 4 |
| M01L03 | Device landscape | 64 | 4 |

### M02 How XR works (22% (design weight), design weight)

- Worked applications: (1) Explain why low latency prevents discomfort; (2) Relate tracking quality to presence
- Common misconception addressed: Thinking higher graphics quality alone fixes discomfort
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Displays and optics | 70 | 4 |
| M02L02 | Tracking and pose | 70 | 4 |
| M02L03 | Rendering and latency | 71 | 4 |

### M03 Interaction (20% (design weight), design weight)

- Worked applications: (1) Choose hand tracking versus controllers for a task; (2) Design a reachable spatial menu
- Common misconception addressed: Porting a flat 2D menu directly into 3D space
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Controllers and hand tracking | 64 | 4 |
| M03L02 | Gaze and voice | 64 | 4 |
| M03L03 | Spatial UI patterns | 64 | 4 |

### M04 Presence and comfort (20% (design weight), design weight)

- Worked applications: (1) Identify a design that triggers motion sickness; (2) Apply a comfort technique like teleport locomotion
- Common misconception addressed: Assuming all users tolerate smooth artificial locomotion
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Presence and immersion | 64 | 4 |
| M04L02 | Motion sickness causes | 64 | 4 |
| M04L03 | Comfort design techniques | 64 | 4 |

### M05 Design and responsibility (18% (design weight), design weight)

- Worked applications: (1) Assess the privacy impact of eye-tracking data; (2) Add an accessibility option for seated play
- Common misconception addressed: Ignoring that immersive sensors capture sensitive body data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Designing usable XR | 57 | 4 |
| M05L02 | Privacy and safety | 57 | 4 |
| M05L03 | Accessibility in XR | 59 | 4 |

## Integrative case

A training team wants to build an immersive onboarding experience: choose between VR, AR and MR, understand why latency and tracking drive comfort, design reachable spatial interactions, and account for motion sickness, privacy of sensor data and accessibility.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2759-final-protected | 40 | 40 | yes |
| MST-2759-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The XR spectrum | 8 |
| How XR works | 9 |
| Interaction | 8 |
| Presence and comfort | 8 |
| Design and responsibility | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2759-Q0001** (single-answer, Select ONE) A VR app causes nausea in many users after a few minutes. Which factor is the most likely primary cause to investigate first?

- A. High motion-to-photon latency and mismatch between visual motion and the body's sense of motion **(key)**  
  _Rationale:_ Correct: latency and sensory conflict are leading causes of VR motion sickness.
- B. The headset's colour palette being too warm  
  _Rationale:_ Colour warmth is not a primary driver of motion sickness.
- C. Using hand tracking instead of controllers  
  _Rationale:_ Input method is not the primary cause of nausea here.
- D. The app icon being low resolution  
  _Rationale:_ The icon has no bearing on in-experience comfort.

**MST-2759-Q0002** (multiple-answer, Select TWO) Which TWO statements correctly distinguish AR from VR? (Select TWO.)

- A. AR overlays digital content onto the user's view of the real world **(key)**  
  _Rationale:_ Correct: AR augments the real environment with digital content.
- B. VR replaces the user's view with a fully synthetic environment **(key)**  
  _Rationale:_ Correct: VR immerses the user in an entirely virtual scene.
- C. AR always fully blocks out the real world  
  _Rationale:_ Blocking out the real world describes VR, not AR.
- D. VR requires no display at all  
  _Rationale:_ VR depends on a display to present the virtual environment.

**MST-2759-Q0003** (single-answer, Select ONE) Why is eye-tracking data in XR a particular privacy concern?

- A. It can reveal sensitive information such as attention, intent and even health signals **(key)**  
  _Rationale:_ Correct: gaze data is highly revealing and demands careful privacy handling.
- B. Because it makes rendering slower  
  _Rationale:_ The concern is privacy of the data, not rendering speed.
- C. Because it is impossible to store  
  _Rationale:_ It can be stored; that is partly why it is sensitive.
- D. Because eye tracking only works outdoors  
  _Rationale:_ This is false and unrelated to the privacy concern.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
