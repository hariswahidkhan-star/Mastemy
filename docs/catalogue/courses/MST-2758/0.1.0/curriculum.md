# Humanoid & Embodied AI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2758` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Humanoid & Embodied AI (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain embodiment and why physical interaction shapes intelligence
2. Describe the challenges of bipedal locomotion and balance
3. Explain dexterous manipulation and whole-body control conceptually
4. Describe how perception, language and action are combined in embodied agents
5. Reason about human-robot interaction and social acceptance
6. Assess realistic capabilities, limits and ethics of humanoid systems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Embodiment (20% (design weight), design weight)

- Worked applications: (1) Explain how body shape constrains possible tasks; (2) Compare a wheeled base to legs for stairs
- Common misconception addressed: Believing a humanoid shape is always the best robot form
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What embodiment means | 64 | 4 |
| M01L02 | Why bodies matter for AI | 64 | 4 |
| M01L03 | Morphology and tasks | 64 | 4 |

### M02 Locomotion and balance (22% (design weight), design weight)

- Worked applications: (1) Explain why bipedal balance is hard; (2) Describe a recovery step after a push
- Common misconception addressed: Thinking walking is solved once a robot stands up
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Bipedal walking challenges | 70 | 4 |
| M02L02 | Balance and stability | 70 | 4 |
| M02L03 | Terrain and recovery | 71 | 4 |

### M03 Manipulation and control (20% (design weight), design weight)

- Worked applications: (1) Choose a compliant grasp for a fragile object; (2) Coordinate arm and torso for a reach
- Common misconception addressed: Assuming a stiff high-force grip suits all objects
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Dexterous hands | 64 | 4 |
| M03L02 | Whole-body control | 64 | 4 |
| M03L03 | Force and compliance | 64 | 4 |

### M04 Perception-language-action (20% (design weight), design weight)

- Worked applications: (1) Ground the instruction 'pick up the red cup' in actions; (2) Explain what a robot foundation model adds
- Common misconception addressed: Treating language understanding as separate from physical grounding
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Multimodal perception | 64 | 4 |
| M04L02 | Grounding language in action | 64 | 4 |
| M04L03 | Foundation models for robots | 64 | 4 |

### M05 Interaction and ethics (18% (design weight), design weight)

- Worked applications: (1) Design an interaction that signals the robot's intent; (2) Weigh an ethical concern about humanoid deployment
- Common misconception addressed: Overstating humanoid robots' current general abilities
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human-robot interaction | 57 | 4 |
| M05L02 | Trust and acceptance | 57 | 4 |
| M05L03 | Capabilities, limits and ethics | 59 | 4 |

## Integrative case

A company evaluates a humanoid robot for warehouse and front-desk tasks: assess where a humanoid form genuinely helps versus simpler robots, the real state of locomotion and manipulation, how it grounds instructions, and the ethics of deploying it around people.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2758-final-protected | 40 | 40 | yes |
| MST-2758-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Embodiment | 8 |
| Locomotion and balance | 9 |
| Manipulation and control | 8 |
| Perception-language-action | 8 |
| Interaction and ethics | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2758-Q0001** (single-answer, Select ONE) Why does the field of embodied AI argue that a physical body matters for intelligence?

- A. Acting in and sensing the physical world grounds learning and shapes what skills are needed **(key)**  
  _Rationale:_ Correct: embodiment ties perception and action together, grounding intelligence in interaction.
- B. Because a body makes the robot run its code faster  
  _Rationale:_ Embodiment is about grounded interaction, not processor speed.
- C. Because software cannot run without a humanoid shape  
  _Rationale:_ Software runs on many forms; the claim is about grounded learning, not shape necessity.
- D. Because a body removes the need for any perception  
  _Rationale:_ Embodiment increases the role of perception, it does not remove it.

**MST-2758-Q0002** (multiple-answer, Select TWO) Which TWO are genuine challenges specific to humanoid robots? (Select TWO.)

- A. Maintaining dynamic balance while walking on two legs **(key)**  
  _Rationale:_ Correct: bipedal balance is a hard, actively researched problem.
- B. Dexterous manipulation with many-jointed hands **(key)**  
  _Rationale:_ Correct: fine manipulation with high-DoF hands is a core challenge.
- C. Being unable to store any digital data  
  _Rationale:_ Data storage is not a humanoid-specific challenge.
- D. Humanoids are already more capable than humans at all physical tasks  
  _Rationale:_ This overstates current abilities; it is not a challenge statement and is false.

**MST-2758-Q0003** (single-answer, Select ONE) A humanoid is told 'bring me the red cup from the table'. What capability links the words to the right physical action?

- A. Grounding language in perception and action so the referenced object maps to a real grasp **(key)**  
  _Rationale:_ Correct: grounding connects the instruction to perceived objects and executable actions.
- B. A faster network connection  
  _Rationale:_ Connectivity does not ground language in the physical scene.
- C. A louder speaker to confirm the command  
  _Rationale:_ Audio output does not link words to the correct physical action.
- D. A larger battery  
  _Rationale:_ Power capacity does not perform language grounding.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
