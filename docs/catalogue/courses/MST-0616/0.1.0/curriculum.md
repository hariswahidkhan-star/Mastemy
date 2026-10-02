# Multi-Agent Coordination and Delegation Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0616` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Multi-Agent Coordination and Delegation Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compare multi-agent topologies and when a single agent is better
2. Design delegation, hand-off and supervisor patterns
3. Manage shared context, message passing and conflicting results
4. Control cost, loops and termination across agents

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Topologies (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Compare a single-agent and a supervisor-workers design for one task; (2) Decide when NOT to add more agents
- Common misconception addressed: Adding more agents when a single well-scoped agent would be simpler and cheaper
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Single vs multi-agent trade-offs | 80 | 5 |
| M01L02 | Supervisor and worker roles | 80 | 5 |
| M01L03 | Peer and pipeline topologies | 80 | 5 |

### M02 Delegation and hand-off (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Design a delegation message with a clear sub-task contract; (2) Hand a result back to a supervisor and merge it
- Common misconception addressed: Delegating a vague sub-task so the worker agent cannot succeed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Delegation contracts | 80 | 5 |
| M02L02 | Hand-off and result merging | 80 | 5 |
| M02L03 | Resolving conflicting results | 80 | 5 |

### M03 Shared context and control (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Share only the context a worker needs, not the whole history; (2) Add a global step budget and termination condition
- Common misconception addressed: Letting agents call each other with no budget so loops run away
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Shared context and message passing | 80 | 5 |
| M03L02 | Cost and loop control | 80 | 5 |
| M03L03 | Global termination | 80 | 5 |

## Integrative case

A team splits a complex task across several agents: decide whether multiple agents are justified, choose a supervisor-and-workers topology, define how work is delegated and results handed back, manage shared context, resolve conflicting outputs, and cap cost and loops with clear termination.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0616-final-protected | 30 | 30 | yes |
| MST-0616-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Topologies | 10 |
| Delegation and hand-off | 10 |
| Shared context and control | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0616-Q0001** (single-answer, Select ONE) When is a single agent usually preferable to a multi-agent design?

- A. When the task is cohesive and the overhead of coordination outweighs the benefit **(key)**  
  _Rationale:_ Correct: multi-agent coordination adds cost and failure modes that a cohesive task does not need.
- B. Always; multiple agents are never useful  
  _Rationale:_ Multi-agent designs do help for genuinely separable, parallel work.
- C. Never; more agents are always better  
  _Rationale:_ More agents add coordination cost and new failure modes.
- D. Only when the budget is unlimited  
  _Rationale:_ Budget alone does not decide topology.

**MST-0616-Q0002** (multiple-answer, Select TWO) Which TWO keep a multi-agent system from looping or overspending? (Select TWO.)

- A. A global step or token budget shared across agents **(key)**  
  _Rationale:_ Correct: a shared budget caps total work regardless of which agent spends it.
- B. An explicit termination condition the supervisor checks **(key)**  
  _Rationale:_ Correct: a clear stop condition lets the system finish instead of looping.
- C. Letting each agent decide its own unlimited budget  
  _Rationale:_ Unbounded per-agent budgets allow runaway cost.
- D. Removing all logging  
  _Rationale:_ Logging does not cause loops; removing it only hides them.

**MST-0616-Q0003** (single-answer, Select ONE) A worker agent keeps failing a delegated sub-task. What is the most likely design fix?

- A. Give the worker a clearer sub-task contract with the context and success criteria it needs **(key)**  
  _Rationale:_ Correct: vague delegation is a common cause; a precise contract fixes it.
- B. Add ten more worker agents on the same vague task  
  _Rationale:_ More agents on a vague task reproduce the same failure.
- C. Increase the supervisor's temperature  
  _Rationale:_ Sampling temperature does not clarify a sub-task.
- D. Delete the audit log  
  _Rationale:_ Removing logs hides the failure rather than fixing it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
