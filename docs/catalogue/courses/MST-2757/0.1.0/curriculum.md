# Reinforcement Learning for Robotics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2757` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Reinforcement Learning for Robotics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the reinforcement learning framing: states, actions, rewards, policies
2. Describe the exploration-exploitation trade-off and discounting
3. Outline value-based and policy-based methods at a conceptual level
4. Explain the role of simulation and the sim-to-real gap
5. Reason about reward design and unintended behaviour
6. Identify safety and sample-efficiency challenges for real robots

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 RL framing (20% (design weight), design weight)

- Worked applications: (1) Frame a walking task as states, actions and rewards; (2) Define the return for an episodic task
- Common misconception addressed: Confusing the reward with the goal the designer intended
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | States, actions, rewards | 64 | 4 |
| M01L02 | Policies and returns | 64 | 4 |
| M01L03 | Markov decision processes | 64 | 4 |

### M02 Core trade-offs (22% (design weight), design weight)

- Worked applications: (1) Tune exploration for a sparse-reward task; (2) Explain how discounting changes behaviour
- Common misconception addressed: Assuming greedy action selection learns optimally
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Exploration versus exploitation | 70 | 4 |
| M02L02 | Discounting and horizons | 70 | 4 |
| M02L03 | Credit assignment | 71 | 4 |

### M03 Methods overview (20% (design weight), design weight)

- Worked applications: (1) Choose value-based versus policy-based for a task; (2) Explain what the critic adds in actor-critic
- Common misconception addressed: Thinking policy gradients need no value estimation ever
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Value-based methods | 64 | 4 |
| M03L02 | Policy-gradient methods | 64 | 4 |
| M03L03 | Actor-critic intuition | 64 | 4 |

### M04 Simulation and transfer (20% (design weight), design weight)

- Worked applications: (1) Plan a simulation-first training pipeline; (2) Apply domain randomisation to close sim-to-real
- Common misconception addressed: Believing a policy trained in sim transfers unchanged to hardware
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Why train in simulation | 64 | 4 |
| M04L02 | The sim-to-real gap | 64 | 4 |
| M04L03 | Domain randomisation | 64 | 4 |

### M05 Reward and safety (18% (design weight), design weight)

- Worked applications: (1) Redesign a reward that caused reward hacking; (2) Add a safety constraint to exploration
- Common misconception addressed: Ignoring unsafe exploration on a physical robot
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reward design | 57 | 4 |
| M05L02 | Reward hacking | 57 | 4 |
| M05L03 | Safe and sample-efficient learning | 59 | 4 |

## Integrative case

A team trains a quadruped to walk using reinforcement learning: frame the problem, decide to train in simulation first, design a reward that avoids gaming, apply domain randomisation, and plan safe, sample-efficient transfer to the real robot.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2757-final-protected | 40 | 40 | yes |
| MST-2757-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| RL framing | 8 |
| Core trade-offs | 9 |
| Methods overview | 8 |
| Simulation and transfer | 8 |
| Reward and safety | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2757-Q0001** (single-answer, Select ONE) A robot is rewarded for 'distance from the start'. It learns to spin in place at the edge of a cliff to maximise instantaneous distance, risking a fall. What does this illustrate?

- A. Reward hacking - optimising the stated reward in a way that violates the designer's intent **(key)**  
  _Rationale:_ Correct: the agent exploits a poorly specified reward rather than achieving the intended goal.
- B. The algorithm failed to run  
  _Rationale:_ The algorithm ran fine; the reward specification was the problem.
- C. The robot needs a faster processor  
  _Rationale:_ Compute is not the issue; the reward design is.
- D. Reinforcement learning cannot optimise rewards  
  _Rationale:_ It optimised the reward too literally; that is the point.

**MST-2757-Q0002** (multiple-answer, Select TWO) Which TWO statements about the sim-to-real gap are accurate? (Select TWO.)

- A. Policies trained only in simulation can fail on hardware due to unmodelled dynamics **(key)**  
  _Rationale:_ Correct: differences between sim and reality cause transfer failures.
- B. Domain randomisation during training can make policies more robust to real variation **(key)**  
  _Rationale:_ Correct: randomising sim parameters helps policies generalise to reality.
- C. Simulation always matches reality exactly, so transfer is guaranteed  
  _Rationale:_ Simulation never matches reality perfectly; that is the gap.
- D. Real-robot training is always cheaper and safer than simulation  
  _Rationale:_ Real-robot training is often costlier and riskier, which is why sim is used first.

**MST-2757-Q0003** (single-answer, Select ONE) Why is the exploration-exploitation trade-off central to reinforcement learning?

- A. The agent must try new actions to discover better returns while still using what it already knows works **(key)**  
  _Rationale:_ Correct: too little exploration misses better policies; too much wastes performance.
- B. Because exploration and exploitation are the same thing  
  _Rationale:_ They are opposing pressures that must be balanced.
- C. Because the agent never needs to try new actions  
  _Rationale:_ Without exploration the agent cannot improve beyond current knowledge.
- D. Because rewards are irrelevant to action choice  
  _Rationale:_ Rewards drive action choice; they are central, not irrelevant.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
