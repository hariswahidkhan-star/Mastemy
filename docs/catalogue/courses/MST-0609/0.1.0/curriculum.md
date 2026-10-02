# LangGraph Stateful Agent Orchestration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0609` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — LangGraph Stateful Agent Orchestration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model an agent as a graph of nodes, edges and shared state
2. Implement conditional routing, branching and loops with controlled termination
3. Persist state and support checkpointing, resumption and human-in-the-loop pauses
4. Debug, stream and test stateful graph executions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Graphs, state and nodes (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Define a typed shared state and three nodes that read and update it; (2) Compile a minimal graph and trace one invocation end to end
- Common misconception addressed: Thinking a LangGraph node mutates global variables rather than returning a state update
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | State schema and reducers | 80 | 5 |
| M01L02 | Nodes and the compiled graph | 80 | 5 |
| M01L03 | Edges and graph entry/exit | 80 | 5 |

### M02 Control flow (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add a conditional edge that routes on a value in state; (2) Add a loop with a recursion limit so it cannot run forever
- Common misconception addressed: Building a loop with no recursion limit or termination condition
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Conditional edges and routing | 80 | 5 |
| M02L02 | Loops and recursion limits | 80 | 5 |
| M02L03 | Branching and parallel fan-out | 80 | 5 |

### M03 Persistence and operations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Enable a checkpointer and resume a run from a saved checkpoint; (2) Insert a human-in-the-loop interrupt before a destructive tool call
- Common misconception addressed: Assuming state survives restarts without a configured checkpointer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checkpointing and resumption | 80 | 5 |
| M03L02 | Human-in-the-loop interrupts | 80 | 5 |
| M03L03 | Streaming, debugging and tests | 80 | 5 |

## Integrative case

A team rebuilds a brittle linear agent as a LangGraph graph: define the shared state, add nodes for retrieval, tool calls and review, route conditionally with a recursion limit, checkpoint so a run can pause for human approval and resume, then add streaming and tests before release.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0609-final-protected | 30 | 30 | yes |
| MST-0609-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Graphs, state and nodes | 10 |
| Control flow | 10 |
| Persistence and operations | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0609-Q0001** (single-answer, Select ONE) In LangGraph, how should a node change the shared state?

- A. Return a partial state update that the graph applies through the state reducers **(key)**  
  _Rationale:_ Correct: nodes return updates and the graph merges them via the state schema's reducers.
- B. Mutate a module-level global variable directly  
  _Rationale:_ Globals are not the graph's state and are not checkpointed.
- C. Write the new value to a file and re-read it next node  
  _Rationale:_ Files are not how graph state is propagated between nodes.
- D. Raise an exception carrying the new value  
  _Rationale:_ Exceptions signal failure; they are not a state-update mechanism.

**MST-0609-Q0002** (multiple-answer, Select TWO) Which TWO measures keep a looping LangGraph agent from running forever? (Select TWO.)

- A. Set a recursion/step limit on the graph **(key)**  
  _Rationale:_ Correct: a recursion limit caps how many steps a run may take.
- B. Add a conditional edge that routes to the end when a done condition is met **(key)**  
  _Rationale:_ Correct: an explicit termination condition lets the loop exit.
- C. Make the loop node slower so fewer iterations run per second  
  _Rationale:_ Slower iterations still loop forever; this changes rate, not termination.
- D. Increase the model's temperature  
  _Rationale:_ Temperature affects sampling, not loop termination.

**MST-0609-Q0003** (single-answer, Select ONE) A graph run must be able to pause for human approval and resume later after a restart. What is required?

- A. A configured checkpointer that persists state, plus an interrupt point **(key)**  
  _Rationale:_ Correct: persistence plus an interrupt lets the run pause and resume across restarts.
- B. A longer system prompt  
  _Rationale:_ Prompt length does not provide persistence or resumption.
- C. Disabling all conditional edges  
  _Rationale:_ Routing is unrelated to pausing and resuming.
- D. Running the graph with a larger model  
  _Rationale:_ Model size does not persist or resume state.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
