# LLM Agent Orchestration: Supervisors, Pipelines and Hand-offs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2050` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs from the course blueprint. Framework-specific orchestration APIs must be re-checked at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — LLM Agent Orchestration: Supervisors, Pipelines and Hand-offs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain when multiple cooperating agents beat a single agent and the costs they add
2. Compare orchestration topologies (supervisor, pipeline, peer network) and their trade-offs
3. Design message passing, shared state and hand-off protocols between agents
4. Assign roles and responsibilities so agents do not duplicate or contradict work
5. Diagnose failure modes such as loops, deadlock and runaway cost in multi-agent runs
6. Decide how to evaluate and observe a multi-agent system end to end

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why and when to use multiple agents (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide whether a document-processing task should be one agent or a researcher-plus-writer pair; (2) Estimate the extra token cost of a three-agent team vs one agent
- Common misconception addressed: Assuming more agents automatically means better or faster results
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Single agent vs a team: specialisation, parallelism and cost | 120 | 7 |
| M01L02 | Signs a problem does not need multiple agents | 120 | 7 |

### M02 Orchestration topologies (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draw a supervisor topology that routes a request to the right specialist agent; (2) Convert a sequential pipeline into a parallel fan-out where steps are independent
- Common misconception addressed: Confusing a supervisor that delegates with a pipeline that fixes order in advance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Supervisor/router patterns and delegating sub-tasks | 120 | 7 |
| M02L02 | Pipelines and peer networks: sequencing vs collaboration | 120 | 7 |

### M03 Coordination and hand-offs (25% (Mastemy design weight), design weight)

- Worked applications: (1) Define a hand-off contract stating exactly what one agent passes to the next; (2) Add a shared scratchpad and rules for who may write to it
- Common misconception addressed: Letting two agents edit the same state with no protocol and expecting consistency
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Message passing, shared state and hand-off contracts | 120 | 7 |
| M03L02 | Preventing duplicated, conflicting or lost work | 120 | 7 |

### M04 Reliability and observability (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add a global step budget shared across all agents to cap cost; (2) Trace a run where two agents hand work back and forth forever and break the loop
- Common misconception addressed: Believing each agent's local step limit is enough to bound total system cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Loops, deadlock and runaway-cost failure modes | 120 | 7 |
| M04L02 | Tracing and evaluating a whole multi-agent run | 120 | 7 |

## Integrative case

A company builds an incident-response assistant where one agent triages alerts, another investigates logs and a third drafts the postmortem: choose an orchestration topology, define hand-off contracts and shared state, cap total cost, and set up tracing so a stuck run can be diagnosed.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2050-final-protected | 40 | 40 | yes |
| MST-2050-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why and when to use multiple agents | 10 |
| Orchestration topologies | 10 |
| Coordination and hand-offs | 10 |
| Reliability and observability | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2050-Q0001** (single-answer, Select ONE) You have a researcher agent and a writer agent. The writer sometimes invents facts the researcher never found. What coordination fix helps most?

- A. A hand-off contract that passes the researcher's sourced findings and instructs the writer to use only those **(key)**  
  _Rationale:_ Correct: an explicit hand-off contract constrains the writer to grounded inputs.
- B. Run both agents at a higher temperature  
  _Rationale:_ More randomness increases invention, not less.
- C. Remove the researcher and let the writer search too  
  _Rationale:_ That removes specialisation and does not stop fabrication.
- D. Give the writer more tools  
  _Rationale:_ Extra tools do not constrain the writer to the researcher's findings.

**MST-2050-Q0002** (multiple-answer, Select TWO) Which TWO are real risks that multi-agent orchestration adds over a single agent? (Select TWO.)

- A. Higher total token cost from inter-agent messages **(key)**  
  _Rationale:_ Correct: every hand-off and message consumes tokens.
- B. Hand-off loops where agents pass work back and forth without converging **(key)**  
  _Rationale:_ Correct: unbounded delegation can cycle.
- C. The inability to use any tools at all  
  _Rationale:_ Multi-agent systems can still use tools; this is not a risk they add.
- D. A guarantee of lower latency  
  _Rationale:_ Coordination usually adds latency; it is not a benefit and not a risk.

**MST-2050-Q0003** (single-answer, Select ONE) In a supervisor topology, what is the supervisor agent primarily responsible for?

- A. Deciding which specialist agent handles each sub-task and integrating their results **(key)**  
  _Rationale:_ Correct: the supervisor routes and integrates rather than doing the specialist work itself.
- B. Executing every tool call personally  
  _Rationale:_ That defeats delegation; specialists do the work.
- C. Storing the vector database  
  _Rationale:_ Routing is unrelated to vector storage.
- D. Fine-tuning the underlying model  
  _Rationale:_ Orchestration does not fine-tune models.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
