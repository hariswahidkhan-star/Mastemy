# OpenAI Agents SDK: Orchestration and Handoffs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0500` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Agents SDK: Orchestration and Handoffs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build multi-agent workflows with the OpenAI Agents SDK
2. Design handoffs and routing between specialised agents
3. Add guardrails, tools and state to orchestrated agents
4. Apply tracing, testing and safety controls to agent orchestration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Writing and running real orchestration code and engineering judgement on agent design are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Agents SDK foundations (25%)

- Worked applications: (1) Decide whether a task needs one agent or several; (2) Sketch a two-agent design with distinct responsibilities
- Common misconception addressed: Splitting into many agents when one would be simpler and clearer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Agents, tools and runs | 120 | 6 |
| M01L02 | When to use multiple agents | 120 | 6 |

### M02 Handoffs and routing (25%)

- Worked applications: (1) Design a handoff from a triage agent to a specialist; (2) Route three request types to the correct agent
- Common misconception addressed: Letting every agent try every request instead of routing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Designing a handoff between agents | 120 | 6 |
| M02L02 | Routing a request to the right agent | 120 | 6 |

### M03 Guardrails and state (25%)

- Worked applications: (1) Add an input guardrail that blocks out-of-scope requests; (2) Share needed state between agents in a run
- Common misconception addressed: Letting an agent act outside its defined scope
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Adding input and output guardrails | 120 | 6 |
| M03L02 | Sharing state across a run | 120 | 6 |

### M04 Tracing and testing (25%)

- Worked applications: (1) Trace a run to see which agent handled each step; (2) Write a test that checks a request routes to the right agent
- Common misconception addressed: Shipping an orchestration with no tracing or routing tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tracing an orchestrated run | 120 | 6 |
| M04L02 | Testing routing and handoff behaviour | 120 | 6 |

## Integrative case

A team builds a customer-operations assistant with the OpenAI Agents SDK: a triage agent routes requests, hands off to billing or technical specialists, enforces input/output guardrails, shares state across the run, and the team traces runs and tests routing and handoff behaviour before release.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0500-final-protected | 72 | 72 | yes |
| MST-0500-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Agents SDK foundations | 18 |
| Handoffs and routing | 18 |
| Guardrails and state | 18 |
| Tracing and testing | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0500-Q0001** (single-answer, Select ONE) What is the purpose of a handoff between agents in an orchestrated workflow?

- A. To pass a request to a more suitable specialised agent to continue the work **(key)**  
  _Rationale:_ Correct: a handoff routes work to the agent best suited to it.
- B. To delete the conversation history  
  _Rationale:_ A handoff transfers work; it does not erase history.
- C. To switch to a cheaper billing plan  
  _Rationale:_ Handoffs are about routing, not billing.
- D. To disable guardrails  
  _Rationale:_ Handoffs do not remove guardrails.

**MST-0500-Q0002** (single-answer, Select ONE) When is a single-agent design preferable to multiple agents?

- A. When the task is cohesive and multiple agents would add needless complexity **(key)**  
  _Rationale:_ Correct: use the simplest design that meets the need; extra agents add overhead.
- B. Always, because multiple agents never work  
  _Rationale:_ Multiple agents are valuable for genuinely distinct responsibilities.
- C. Never, because more agents is always better  
  _Rationale:_ More agents is not inherently better and can add complexity.
- D. Only when the newest model is used  
  _Rationale:_ Model version does not decide single vs multi-agent design.

**MST-0500-Q0003** (multiple-answer, Select TWO) Which TWO controls should be in place before releasing an orchestrated multi-agent workflow? (Select TWO)

- A. Tracing so each step and handoff can be diagnosed **(key)**  
  _Rationale:_ Correct: tracing is essential to understand and debug orchestrated runs.
- B. Tests that verify requests route to the correct agent **(key)**  
  _Rationale:_ Correct: routing/handoff tests confirm the orchestration behaves as designed.
- C. Removing all guardrails to simplify the flow  
  _Rationale:_ Removing guardrails increases risk.
- D. Letting any agent perform any action  
  _Rationale:_ Unbounded agent actions undermine safety and scope control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

