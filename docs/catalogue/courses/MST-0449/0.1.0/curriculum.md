# Reinforcement Learning Foundations and Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0449` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-RLF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. RL foundations
2. Value-based methods
3. Policy and deep RL
4. Exploration and practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 RL foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model a gridworld as an MDP; (2) Define a reward function for a goal task
- Common misconception addressed: Confusing reward with the value function
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Agents, environments and rewards | 120 | 8 |
| M01L02 | Markov decision processes | 120 | 8 |

### M02 Value-based methods (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run value iteration on a small MDP; (2) Update a Q-table from an experience tuple
- Common misconception addressed: Expecting tabular methods to scale to large state spaces
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Dynamic programming and value iteration | 120 | 8 |
| M02L02 | Q-learning and temporal-difference learning | 120 | 8 |

### M03 Policy and deep RL (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sketch a policy-gradient update; (2) Choose DQN vs actor-critic for an action space
- Common misconception addressed: Using DQN directly for continuous actions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Policy-gradient methods | 120 | 8 |
| M03L02 | Deep Q-networks and actor-critic | 120 | 8 |

### M04 Exploration and practice (MASTEMY-DESIGN 20%)

- Worked applications: (1) Tune an epsilon-greedy schedule; (2) Diagnose reward hacking in a design
- Common misconception addressed: Assuming more exploration is always better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Exploration vs exploitation | 120 | 8 |
| M04L02 | Reward design, stability and pitfalls | 120 | 8 |

## Integrative case

Design an RL agent that controls a warehouse robot to fetch items efficiently. Frame it as an MDP, choose value-based or policy methods given the action space, design a reward that avoids unsafe shortcuts, and plan an exploration schedule.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0449-final-protected | 20 | 20 | yes |
| MST-0449-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| RL foundations | 5 |
| Value-based methods | 5 |
| Policy and deep RL | 5 |
| Exploration and practice | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0449-Q0001** (single-answer, Select ONE) In a Markov decision process, the Markov property means that the next state depends on:

- A. The current state and action only **(key)**  
  _Rationale:_ Correct: the future is conditionally independent of the past given the current state.
- B. The entire history of states and actions  
  _Rationale:_ That would violate the Markov property.
- C. Only the reward received  
  _Rationale:_ Transitions depend on state and action, not reward alone.
- D. The discount factor  
  _Rationale:_ The discount factor weights future rewards; it is not the transition rule.

**MST-0449-Q0002** (multiple-answer, Select TWO) Which TWO statements about exploration vs exploitation are correct? (Select TWO.)

- A. Epsilon-greedy explores with probability epsilon and exploits otherwise **(key)**  
  _Rationale:_ Correct: that is the definition of epsilon-greedy.
- B. Too little exploration can trap the agent in a suboptimal policy **(key)**  
  _Rationale:_ Correct: without exploration the agent may never find better actions.
- C. Exploitation means choosing random actions  
  _Rationale:_ Exploitation chooses the current best action, not random ones.
- D. Exploration should always be set to its maximum permanently  
  _Rationale:_ Permanent maximal exploration prevents converging to a good policy.

**MST-0449-Q0003** (single-answer, Select ONE) Why is a standard deep Q-network not directly suitable for continuous action spaces?

- A. It selects actions by maximising Q over a discrete action set **(key)**  
  _Rationale:_ Correct: the argmax over actions assumes a finite, discrete set.
- B. It cannot use a neural network  
  _Rationale:_ DQN uses a neural network by definition.
- C. It requires a known reward model  
  _Rationale:_ DQN is model-free.
- D. It ignores the state entirely  
  _Rationale:_ DQN conditions on the state.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
