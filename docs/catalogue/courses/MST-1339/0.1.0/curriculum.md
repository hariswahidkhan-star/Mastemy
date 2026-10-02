# Building AI Agents

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1339` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain what distinguishes an agent from a single LLM call
2. Describe the reasoning-action-observation loop
3. Design tool interfaces an agent can use reliably
4. Manage agent memory, state and context
5. Recognise agent failure modes and add guardrails

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 From LLM call to agent (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether a task needs an agent at all; (2) Separate a single call from an agentic loop
- Common misconception addressed: Calling any multi-step prompt an 'agent'
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What makes a system agentic | 72 | 8 |
| M01L02 | When not to build an agent | 72 | 8 |

### M02 The agent loop (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace a reason-act-observe cycle; (2) Add a stopping condition to a runaway loop
- Common misconception addressed: Assuming more reasoning steps always help
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reasoning, acting and observing | 72 | 8 |
| M02L02 | Planning, loops and stopping conditions | 72 | 8 |

### M03 Tools and function calling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a clear tool schema and description; (2) Handle a tool error gracefully in the loop
- Common misconception addressed: Giving tools vague descriptions and hoping for the best
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Designing reliable tool interfaces | 72 | 8 |
| M03L02 | Function calling and error handling | 72 | 8 |

### M04 Memory and state (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose what to keep in short- vs long-term memory; (2) Summarise state to fit the context window
- Common misconception addressed: Stuffing all history into every prompt
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Short-term and long-term memory | 72 | 8 |
| M04L02 | Context management and summarisation | 72 | 8 |

### M05 Reliability and guardrails (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a human checkpoint before a costly action; (2) Design a budget/step limit guardrail
- Common misconception addressed: Trusting the agent to always act safely
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Failure modes and loops | 72 | 8 |
| M05L02 | Guardrails, limits and oversight | 72 | 8 |

## Integrative case

A team wants an agent that can answer questions by searching internal data and calling a few tools. Define the agent loop, specify tool schemas and error handling, decide what state to keep between steps, and add guardrails and stopping conditions so the agent fails safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1339-final-protected | 25 | 25 | yes |
| MST-1339-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From LLM call to agent | 5 |
| The agent loop | 5 |
| Tools and function calling | 5 |
| Memory and state | 5 |
| Reliability and guardrails | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1339-Q0001** (single-answer, Select ONE) What most clearly distinguishes an agent from a single LLM prompt?

- A. It iterates through a loop of reasoning, taking actions with tools, and observing results **(key)**  
  _Rationale:_ Correct: an agent acts in a loop with tools and observations, not one static response.
- B. It uses a larger model  
  _Rationale:_ Model size does not define agency.
- C. It always responds faster  
  _Rationale:_ Agents often take longer due to multiple steps.
- D. It never uses external tools  
  _Rationale:_ Tool use is central to most agents, not absent.

**MST-1339-Q0002** (multiple-answer, Select TWO) Which TWO practices improve the reliability of a tool-using agent? (Select TWO.)

- A. Give tools precise schemas and clear descriptions **(key)**  
  _Rationale:_ Correct: clear schemas help the model call tools correctly.
- B. Set step or budget limits to stop runaway loops **(key)**  
  _Rationale:_ Correct: limits prevent the agent from looping indefinitely or overspending.
- C. Remove all error handling to simplify the code  
  _Rationale:_ Removing error handling makes failures worse, not better.
- D. Hide tool errors from the agent entirely  
  _Rationale:_ The agent needs observations, including errors, to recover.

**MST-1339-Q0003** (single-answer, Select ONE) An agent keeps appending the full conversation to every prompt until it exceeds the context window. What is the best fix?

- A. Summarise or prune older state so the working context stays within limits **(key)**  
  _Rationale:_ Correct: context management via summarisation/pruning keeps prompts in budget.
- B. Switch to a single LLM call with no memory  
  _Rationale:_ That removes needed state rather than managing it.
- C. Increase the temperature  
  _Rationale:_ Temperature does not affect context length.
- D. Call more tools per step  
  _Rationale:_ More tool calls do not solve context overflow.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
