# LangGraph + OpenAI + PostgreSQL: Stateful Agent Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0804` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — LangGraph + OpenAI + PostgreSQL: Stateful Agent Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design a stateful agent's goals, boundaries and state model
2. Build the agent graph in LangGraph with explicit transitions
3. Use the OpenAI API within nodes reliably and safely
4. Persist agent state durably in PostgreSQL
5. Operate the agent with evaluation, safety limits and recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Designing the agent (20%)

- Worked applications: (1) Define the state an agent must track across steps; (2) Decide where the agent must pause for human input
- Common misconception addressed: Designing an agent with no explicit state or stopping rule
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals, boundaries and the state model | 144 | 7 |
| M01L02 | When to act, ask or stop | 144 | 7 |

### M02 Building the LangGraph graph (20%)

- Worked applications: (1) Model a multi-step task as a LangGraph with clear transitions; (2) Add a guard that prevents an infinite loop
- Common misconception addressed: Building a graph that can loop forever with no termination
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Nodes, edges and explicit transitions | 144 | 7 |
| M02L02 | Loops, guards and termination | 144 | 7 |

### M03 OpenAI within nodes (20%)

- Worked applications: (1) Call the model in a node and validate its structured output; (2) Reject a malformed tool call rather than acting on it
- Common misconception addressed: Acting on unvalidated model output inside the graph
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reliable model calls inside nodes | 144 | 7 |
| M03L02 | Validating tool and model output | 144 | 7 |

### M04 Durable state in PostgreSQL (20%)

- Worked applications: (1) Persist state so the agent can resume after a restart; (2) Prevent a replayed step from duplicating an action
- Common misconception addressed: Keeping agent state only in memory so a restart loses it
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Persisting and resuming agent state | 144 | 7 |
| M04L02 | Consistency, concurrency and idempotency | 144 | 7 |

### M05 Operating the agent (20%)

- Worked applications: (1) Trace a run to diagnose a wrong decision; (2) Cap steps and cost so a runaway agent is contained
- Common misconception addressed: Running an agent in production with no step or cost limits
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evaluation and tracing | 144 | 7 |
| M05L02 | Safety limits, cost and recovery | 144 | 7 |

## Integrative case

An engineering team builds a stateful agent: design its state and boundaries, build the LangGraph graph with guarded transitions, call OpenAI safely in nodes, persist state in PostgreSQL for resumption, and operate with tracing and step limits.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0804-final-protected | 40 | 50 | yes |
| MST-0804-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Designing the agent | 8 |
| Building the LangGraph graph | 8 |
| OpenAI within nodes | 8 |
| Durable state in PostgreSQL | 8 |
| Operating the agent | 8 |

Minimum reviewed item bank: 472 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0804-Q0001** (single-answer, Select ONE) An agent graph can revisit a node repeatedly with no condition to stop. What must you add?

- A. A termination guard or step limit so the loop ends **(key)**  
  _Rationale:_ Correct: an unbounded loop must have an explicit termination condition.
- B. A faster model so the loop finishes sooner  
  _Rationale:_ Speed does not stop an infinite loop; it just loops faster.
- C. More memory to hold the growing state  
  _Rationale:_ More memory postpones but does not prevent the runaway.
- D. A retry on each node to improve reliability  
  _Rationale:_ Retries add more iterations, worsening the loop.

**MST-0804-Q0002** (multiple-answer, Select TWO) Which TWO properties make persisted agent state safe to resume? (Select TWO.)

- A. State is durably written so a restart can resume it **(key)**  
  _Rationale:_ Correct: durable persistence is what allows resumption after failure.
- B. Replayed steps are idempotent and do not duplicate actions **(key)**  
  _Rationale:_ Correct: idempotency prevents a resumed step from acting twice.
- C. State is held only in process memory for speed  
  _Rationale:_ In-memory-only state is lost on restart.
- D. Each resume starts the task from the beginning  
  _Rationale:_ Restarting from scratch defeats the purpose of persisted state.

**MST-0804-Q0003** (single-answer, Select ONE) What is the simplest safeguard against a runaway agent consuming unbounded cost?

- A. A hard cap on steps and spend per run **(key)**  
  _Rationale:_ Correct: explicit caps contain a misbehaving agent.
- B. Trusting the model to stop when appropriate  
  _Rationale:_ The model cannot be relied on to self-limit cost.
- C. Monitoring the bill at the end of the month  
  _Rationale:_ After-the-fact monitoring does not prevent the overrun.
- D. Using a cheaper model with no other limit  
  _Rationale:_ A cheaper model still runs away without a cap.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
