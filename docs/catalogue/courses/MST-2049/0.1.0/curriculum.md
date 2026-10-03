# Building AI Agents: Foundations of Autonomous LLM Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2049` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs from the course blueprint. Specific model/SDK behaviour must be re-checked against current provider docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Building AI Agents: Foundations of Autonomous LLM Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what distinguishes an LLM agent from a single prompt-response call and when an agent is warranted
2. Describe the perceive-reason-act loop and the role of memory, planning and tool use in it
3. Design a control loop with clear stopping conditions, step limits and error handling
4. Choose an appropriate reasoning strategy (direct, ReAct-style, plan-then-execute) for a task
5. Give an agent short- and long-term memory and reason about what to persist
6. Evaluate an agent's reliability and cost and decide whether to ship it

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What an agent is and when to use one (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide for three tasks whether an agent, a workflow or a single call fits best; (2) Sketch a perceive-reason-act loop for a research-assistant task
- Common misconception addressed: Believing adding an agent loop always improves results over a single well-written prompt
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From prompts to agents: autonomy, loops and goals | 120 | 7 |
| M01L02 | When an agent is the wrong tool: cost, latency and simpler alternatives | 120 | 7 |

### M02 The agent control loop (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add a step limit and a timeout to a loop that could run forever; (2) Design state that survives between loop iterations
- Common misconception addressed: Assuming a model will reliably stop on its own without an explicit stopping condition
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Perceive-reason-act: structuring the loop and state | 120 | 7 |
| M02L02 | Stopping conditions, step budgets and loop guards | 120 | 7 |

### M03 Reasoning and planning strategies (25% (Mastemy design weight), design weight)

- Worked applications: (1) Convert a plan-then-execute task into interleaved reason-and-act steps; (2) Write a recovery branch for a tool call that returns an error
- Common misconception addressed: Treating the model's first plan as fixed instead of replanning after new observations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Direct, ReAct-style and plan-then-execute reasoning | 120 | 7 |
| M03L02 | Decomposing a goal into sub-tasks and recovering from failed steps | 120 | 7 |

### M04 Memory and reliability (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose what to store in long-term memory for a returning user and what to discard; (2) Build a small evaluation set and compute a success rate and average cost
- Common misconception addressed: Assuming a demo that worked once is evidence the agent is reliable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Short-term context vs persisted long-term memory | 120 | 7 |
| M04L02 | Measuring success, cost and latency before shipping | 120 | 7 |

## Integrative case

A startup wants an autonomous research assistant that gathers sources on a topic, summarises them and drafts a brief: decide if an agent is warranted, design its control loop and memory, pick a reasoning strategy, and define how reliability and cost will be measured before launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2049-final-protected | 40 | 40 | yes |
| MST-2049-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What an agent is and when to use one | 10 |
| The agent control loop | 10 |
| Reasoning and planning strategies | 10 |
| Memory and reliability | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2049-Q0001** (single-answer, Select ONE) A task is a single, well-specified transformation (reformat this text) with no external lookups. Why is a looping agent usually the wrong choice here?

- A. A single model call is cheaper, faster and more predictable; a loop adds cost and failure modes with no benefit **(key)**  
  _Rationale:_ Correct: agency pays off only when the task needs iteration, tools or branching that a single call cannot do.
- B. Agents cannot reformat text  
  _Rationale:_ They can; the point is a loop is unnecessary overhead for a one-shot transformation.
- C. Single calls cannot use a system prompt  
  _Rationale:_ They can; this is irrelevant to the choice.
- D. Loops are always more accurate  
  _Rationale:_ A loop adds variance and cost; it is not inherently more accurate.

**MST-2049-Q0002** (multiple-answer, Select TWO) Which TWO are essential stopping conditions for an agent control loop? (Select TWO.)

- A. A maximum number of steps or iterations **(key)**  
  _Rationale:_ Correct: a step budget prevents an unbounded loop.
- B. An explicit success or goal-reached check **(key)**  
  _Rationale:_ Correct: the loop must recognise when the task is done.
- C. A requirement that the model use every available tool  
  _Rationale:_ Forcing tool use is not a stopping condition and harms efficiency.
- D. A rule that the agent must always run at least ten steps  
  _Rationale:_ A minimum-steps rule delays completion; it is not a stopping condition.

**MST-2049-Q0003** (single-answer, Select ONE) An agent keeps re-running the same failing search and never finishes. What control-loop fix most directly addresses this?

- A. Detect repeated identical actions and either replan or halt with an error after a bounded retry count **(key)**  
  _Rationale:_ Correct: loop guards on repeated actions plus a retry bound break the cycle.
- B. Increase the model temperature to 1.5  
  _Rationale:_ More randomness does not fix a missing loop guard and hurts reliability.
- C. Remove the step limit entirely  
  _Rationale:_ That makes the runaway loop worse.
- D. Give the agent more tools  
  _Rationale:_ More tools do not stop a repeated-action loop.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
