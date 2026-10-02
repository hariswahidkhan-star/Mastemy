# Multi-Agent Systems Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1340` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why some tasks benefit from multiple cooperating agents
2. Describe common multi-agent topologies and roles
3. Design communication and coordination between agents
4. Manage shared state and conflict between agents
5. Recognise the added cost and failure risks of multi-agent systems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why multiple agents (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide if a task really needs multiple agents; (2) Identify a task that decomposes into roles
- Common misconception addressed: Assuming more agents always beat one good agent
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | When to split work across agents | 72 | 8 |
| M01L02 | Costs and risks of multi-agent designs | 72 | 8 |

### M02 Topologies and roles (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a topology to a workflow; (2) Assign roles in a planner-worker-reviewer setup
- Common misconception addressed: Thinking there is one correct topology for all tasks
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Hierarchical, peer and pipeline topologies | 72 | 8 |
| M02L02 | Roles: planner, worker, critic | 72 | 8 |

### M03 Communication protocols (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a structured message format; (2) Prevent an endless agent-to-agent loop
- Common misconception addressed: Letting agents chat freely with no structure
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Message passing and shared blackboards | 72 | 8 |
| M03L02 | Structured protocols and turn limits | 72 | 8 |

### M04 Shared state and conflict (MASTEMY-DESIGN 20%)

- Worked applications: (1) Resolve two agents' conflicting outputs; (2) Design a consensus or voting step
- Common misconception addressed: Assuming agents never produce contradictory results
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Shared memory and consistency | 72 | 8 |
| M04L02 | Conflict resolution and voting | 72 | 8 |

### M05 Orchestration and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a controller to orchestrate agents; (2) Compare single-agent and multi-agent quality and cost
- Common misconception addressed: Not measuring whether the extra agents helped
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Orchestration patterns | 72 | 8 |
| M05L02 | Evaluating multi-agent systems | 72 | 8 |

## Integrative case

A workflow is split across a planner, several worker agents and a reviewer. Choose a coordination topology, define how agents pass messages and share state, decide how conflicts are resolved, and justify whether the multi-agent design is worth its extra cost over a single agent.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1340-final-protected | 25 | 25 | yes |
| MST-1340-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why multiple agents | 5 |
| Topologies and roles | 5 |
| Communication protocols | 5 |
| Shared state and conflict | 5 |
| Orchestration and evaluation | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1340-Q0001** (single-answer, Select ONE) In a planner-worker-reviewer design, what is the reviewer agent's main purpose?

- A. To check and critique the workers' outputs before they are accepted **(key)**  
  _Rationale:_ Correct: the reviewer/critic validates results, improving reliability.
- B. To generate the original task plan  
  _Rationale:_ That is the planner's role, not the reviewer's.
- C. To execute all the tool calls  
  _Rationale:_ Workers carry out the work; the reviewer evaluates it.
- D. To store the model weights  
  _Rationale:_ That is unrelated to the reviewer role.

**MST-1340-Q0002** (multiple-answer, Select TWO) Which TWO are genuine risks of adding more agents to a system? (Select TWO.)

- A. Higher token cost and latency from extra communication **(key)**  
  _Rationale:_ Correct: each agent interaction adds calls, cost and delay.
- B. Agents can loop or amplify each other's errors **(key)**  
  _Rationale:_ Correct: poorly bounded agent dialogue can loop or compound mistakes.
- C. It guarantees higher accuracy on every task  
  _Rationale:_ Multi-agent designs do not guarantee better accuracy.
- D. It removes the need to evaluate the system  
  _Rationale:_ Evaluation is still required, arguably more so.

**MST-1340-Q0003** (single-answer, Select ONE) Two worker agents return contradictory answers. Which mechanism most directly resolves this?

- A. A defined conflict-resolution step such as a reviewer or majority vote **(key)**  
  _Rationale:_ Correct: an explicit resolution/voting step decides between conflicting outputs.
- B. Increasing each agent's temperature  
  _Rationale:_ That increases randomness, not agreement.
- C. Deleting the shared state  
  _Rationale:_ Removing state loses information needed to resolve the conflict.
- D. Letting both answers pass through unresolved  
  _Rationale:_ Passing contradictions downstream propagates the conflict.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
