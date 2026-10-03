# Brain-Computer Interfaces (concepts)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2762` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Brain-Computer Interfaces (concepts) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what brain-computer interfaces are and the signals they use
2. Distinguish invasive, partially invasive and non-invasive approaches conceptually
3. Describe the signal-acquisition to control pipeline
4. Reason about decoding, calibration and feedback
5. Identify realistic current applications versus speculation
6. Assess ethical, privacy and safety issues of neurotechnology

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 BCI basics (20% (design weight), design weight)

- Worked applications: (1) Match a signal type to a non-invasive method; (2) Explain why the control loop needs feedback
- Common misconception addressed: Thinking a BCI reads detailed thoughts like a mind reader
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a BCI is | 64 | 4 |
| M01L02 | Brain signals used | 64 | 4 |
| M01L03 | The control loop | 64 | 4 |

### M02 Approaches (22% (design weight), design weight)

- Worked applications: (1) Compare invasive and non-invasive signal quality; (2) Weigh risk against fidelity for a use case
- Common misconception addressed: Assuming invasive always means better for every user
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Non-invasive methods | 70 | 4 |
| M02L02 | Invasive and partially invasive | 70 | 4 |
| M02L03 | Trade-offs of each | 71 | 4 |

### M03 Signal to control (20% (design weight), design weight)

- Worked applications: (1) Describe why raw neural signals are noisy; (2) Explain what feature extraction isolates
- Common misconception addressed: Believing decoding is perfect and effortless
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Acquisition and noise | 64 | 4 |
| M03L02 | Feature extraction | 64 | 4 |
| M03L03 | Decoding to commands | 64 | 4 |

### M04 Learning and feedback (20% (design weight), design weight)

- Worked applications: (1) Explain why calibration is needed per user; (2) Describe how feedback helps a user improve control
- Common misconception addressed: Assuming a decoder trained on one person fits everyone
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Calibration | 64 | 4 |
| M04L02 | User training and plasticity | 64 | 4 |
| M04L03 | Feedback and adaptation | 64 | 4 |

### M05 Reality and ethics (18% (design weight), design weight)

- Worked applications: (1) Separate a demonstrated application from speculation; (2) Raise a neuro-privacy concern for consumer devices
- Common misconception addressed: Treating speculative brain-typing demos as proven products
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Current applications | 57 | 4 |
| M05L02 | Hype versus reality | 57 | 4 |
| M05L03 | Neuroethics and privacy | 59 | 4 |

## Integrative case

A health-tech reviewer must brief a hospital on a brain-computer interface for assistive communication: explain the signal-to-control pipeline, compare invasive and non-invasive options honestly, separate demonstrated use from hype, and flag neuroethics and privacy issues.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2762-final-protected | 40 | 40 | yes |
| MST-2762-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BCI basics | 8 |
| Approaches | 9 |
| Signal to control | 8 |
| Learning and feedback | 8 |
| Reality and ethics | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2762-Q0001** (single-answer, Select ONE) What is the most accurate description of what a current brain-computer interface does?

- A. It detects patterns in brain signals and decodes them into a limited set of control commands **(key)**  
  _Rationale:_ Correct: BCIs decode measurable signal patterns into constrained commands, not detailed thoughts.
- B. It reads a person's full inner thoughts as sentences  
  _Rationale:_ No current BCI reads detailed thoughts; this is speculation/hype.
- C. It writes arbitrary memories directly into the brain  
  _Rationale:_ Writing memories is not an established BCI capability.
- D. It requires no signal processing of any kind  
  _Rationale:_ BCIs depend heavily on signal processing and decoding.

**MST-2762-Q0002** (multiple-answer, Select TWO) Which TWO trade-offs correctly contrast invasive and non-invasive BCIs? (Select TWO.)

- A. Invasive electrodes can offer higher signal fidelity **(key)**  
  _Rationale:_ Correct: implanted electrodes typically capture higher-quality signals.
- B. Non-invasive methods avoid surgical risk but often have noisier signals **(key)**  
  _Rationale:_ Correct: non-invasive approaches trade signal quality for safety and convenience.
- C. Non-invasive methods always outperform invasive ones in signal quality  
  _Rationale:_ Non-invasive signals are generally noisier, not superior.
- D. Invasive methods carry no medical risk  
  _Rationale:_ Invasive methods carry surgical and long-term medical risks.

**MST-2762-Q0003** (single-answer, Select ONE) Why is per-user calibration typically required for a BCI?

- A. Brain signals vary between individuals and over time, so the decoder must be tuned to the user **(key)**  
  _Rationale:_ Correct: inter-person and session variability require calibration for reliable decoding.
- B. Because calibration charges the device battery  
  _Rationale:_ Calibration tunes the decoder; it is not a charging step.
- C. Because one universal decoder already works perfectly for everyone  
  _Rationale:_ Signals differ across people, so no universal decoder suffices.
- D. Because calibration encrypts the neural data  
  _Rationale:_ Calibration is about decoding accuracy, not encryption.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
