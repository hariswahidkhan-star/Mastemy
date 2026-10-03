# Computer Vision for Robotics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2756` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Computer Vision for Robotics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the role of vision in robotic perception and the image formation basics
2. Describe feature detection, matching and their uses
3. Explain object detection and segmentation at a conceptual level
4. Reason about depth perception from stereo, structured light and other cues
5. Describe pose estimation and visual servoing for manipulation
6. Identify real-world vision pitfalls such as lighting, occlusion and latency

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Vision basics (20% (design weight), design weight)

- Worked applications: (1) Explain why camera calibration matters for measurement; (2) Pick a camera for a bin-picking task
- Common misconception addressed: Assuming raw pixels give metric distances without calibration
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why robots use vision | 64 | 4 |
| M01L02 | Image formation and cameras | 64 | 4 |
| M01L03 | Calibration intuition | 64 | 4 |

### M02 Features and matching (22% (design weight), design weight)

- Worked applications: (1) Match features between two frames of a moving object; (2) Use keypoints to track an object
- Common misconception addressed: Thinking feature matching works perfectly under any lighting
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Edges and keypoints | 70 | 4 |
| M02L02 | Feature matching | 70 | 4 |
| M02L03 | Uses in tracking | 71 | 4 |

### M03 Detection and segmentation (20% (design weight), design weight)

- Worked applications: (1) Distinguish detection from segmentation for a task; (2) Decide which a sorting robot needs
- Common misconception addressed: Confusing bounding-box detection with pixel-level segmentation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Object detection concepts | 64 | 4 |
| M03L02 | Segmentation concepts | 64 | 4 |
| M03L03 | From pixels to objects | 64 | 4 |

### M04 Depth and 3D (20% (design weight), design weight)

- Worked applications: (1) Compute depth intuition from a stereo pair; (2) Choose stereo versus time-of-flight for a scene
- Common misconception addressed: Believing a single ordinary camera directly measures depth
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Stereo depth | 64 | 4 |
| M04L02 | Structured light and time-of-flight | 64 | 4 |
| M04L03 | Point clouds | 64 | 4 |

### M05 Pose and pitfalls (18% (design weight), design weight)

- Worked applications: (1) Set up visual servoing to align a gripper; (2) Diagnose a failure caused by occlusion
- Common misconception addressed: Ignoring latency between seeing and acting
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Pose estimation | 57 | 4 |
| M05L02 | Visual servoing | 57 | 4 |
| M05L03 | Lighting, occlusion and latency | 59 | 4 |

## Integrative case

A robotics team builds a bin-picking cell: choose and calibrate cameras, decide between detection and segmentation, recover object pose for the gripper, and make the system robust to changing warehouse lighting and partial occlusion.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2756-final-protected | 40 | 40 | yes |
| MST-2756-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vision basics | 8 |
| Features and matching | 9 |
| Detection and segmentation | 8 |
| Depth and 3D | 8 |
| Pose and pitfalls | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2756-Q0001** (single-answer, Select ONE) A robot arm must grasp parts whose exact 3D position varies. Which vision capability most directly provides what the gripper needs?

- A. Pose estimation that recovers the object's position and orientation **(key)**  
  _Rationale:_ Correct: grasping needs the object's 6-DoF pose, which pose estimation provides.
- B. A colour histogram of the whole image  
  _Rationale:_ A global colour histogram does not locate or orient the object.
- C. Increasing the image resolution only  
  _Rationale:_ Resolution alone does not yield the object's pose.
- D. Converting the image to grayscale  
  _Rationale:_ Grayscale conversion does not estimate position or orientation.

**MST-2756-Q0002** (multiple-answer, Select TWO) Which TWO are valid ways for a robot to perceive depth? (Select TWO.)

- A. Stereo vision using the disparity between two cameras **(key)**  
  _Rationale:_ Correct: stereo disparity yields depth.
- B. A time-of-flight or structured-light depth sensor **(key)**  
  _Rationale:_ Correct: active depth sensors measure distance directly.
- C. A single uncalibrated 2D photo read as exact metric distances  
  _Rationale:_ One ordinary 2D image does not give metric depth without extra cues.
- D. Counting the number of pixels in the image  
  _Rationale:_ Pixel count is resolution, not depth.

**MST-2756-Q0003** (single-answer, Select ONE) Why is camera calibration important in a vision-guided robot?

- A. It relates image pixels to real-world geometry so measurements and poses are accurate **(key)**  
  _Rationale:_ Correct: calibration maps pixels to metric space, enabling accurate positioning.
- B. It makes the camera capture images faster  
  _Rationale:_ Calibration concerns geometry, not frame rate.
- C. It removes the need for any lighting  
  _Rationale:_ Calibration does not address scene lighting.
- D. It encrypts the image for security  
  _Rationale:_ Calibration is geometric, not a security measure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
