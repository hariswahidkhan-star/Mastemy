# Amazon Bedrock Agents: Tool Use and Workflow Control

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0776` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services (AWS) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-BEDROCK-AGENTS (https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Bedrock Agents: Tool Use and Workflow Control (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design Bedrock agents with instructions, actions and knowledge bases
2. Define action groups and connect tools via Lambda and APIs
3. Control multi-step orchestration, memory and session state
4. Secure agent actions and validate tool inputs and outputs
5. Test, evaluate and trace agent behaviour
6. Deploy, monitor and control the cost of agents

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Agent design (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create an agent with instructions and a knowledge base; (2) Trace how the agent decides on a task
- Common misconception addressed: Writing vague instructions and expecting reliable behaviour
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instructions, roles and knowledge bases | 120 | 5 |
| M01L02 | Planning and orchestration basics | 120 | 5 |

### M02 Action groups and tools (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define an action group with an OpenAPI schema; (2) Back an action with a Lambda function
- Common misconception addressed: Exposing destructive actions without confirmation or validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Action groups and API schemas | 120 | 5 |
| M02L02 | Lambda-backed tools and responses | 120 | 5 |

### M03 Control and security (MASTEMY-DESIGN 25%)

- Worked applications: (1) Bound an agent's steps and validate tool arguments; (2) Scope IAM so the agent can call only approved actions
- Common misconception addressed: Letting the agent invoke any action with broad permissions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Session state, memory and step limits | 120 | 5 |
| M03L02 | IAM, input validation and guardrails | 120 | 5 |

### M04 Testing, deployment and cost (MASTEMY-DESIGN 25%)

- Worked applications: (1) Analyze a trace to find a wrong tool call; (2) Monitor agent invocations and token cost
- Common misconception addressed: Shipping an agent with no trace review or evaluation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Testing and trace analysis | 120 | 5 |
| M04L02 | Deployment, monitoring and cost | 120 | 5 |

## Integrative case

Build an order-operations agent on Amazon Bedrock: give it instructions and a knowledge base, define action groups backed by Lambda to look up and update orders, bound its orchestration and validate inputs, add guardrails, then test with traces and deploy with monitoring and a cost ceiling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0776-final-protected | 40 | 50 | yes |
| MST-0776-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Agent design | 10 |
| Action groups and tools | 10 |
| Control and security | 10 |
| Testing, deployment and cost | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0776-Q0001** (single-answer, Select ONE) A Bedrock agent can update order records. What control most directly reduces the risk of an unintended destructive change?

- A. Validate the tool arguments and require confirmation for destructive actions **(key)**  
  _Rationale:_ Correct: validation plus confirmation gates risky operations.
- B. Give the agent broad permissions to act freely  
  _Rationale:_ Broad permissions increase, not reduce, the risk.
- C. Remove all logging of agent actions  
  _Rationale:_ Removing logs makes problems harder to catch, not safer.
- D. Increase the model temperature  
  _Rationale:_ Higher temperature makes behaviour less predictable.

**MST-0776-Q0002** (multiple-answer, Select TWO) Which TWO settings help keep agent orchestration predictable and affordable? (Select TWO.)

- A. Cap the number of orchestration steps per request **(key)**  
  _Rationale:_ Correct: a step budget prevents runaway loops and cost.
- B. Monitor token usage and invocation cost **(key)**  
  _Rationale:_ Correct: cost monitoring catches runaway spend early.
- C. Allow unlimited recursive tool calls  
  _Rationale:_ Unbounded recursion risks loops and cost blowups.
- D. Disable traces to reduce overhead  
  _Rationale:_ Traces are how you diagnose and control agent behaviour.

**MST-0776-Q0003** (single-answer, Select ONE) You want a Bedrock agent to call a backend function to look up order status. Which construct connects the agent to that function?

- A. An action group with an API schema backed by a Lambda function **(key)**  
  _Rationale:_ Correct: action groups define callable actions, commonly backed by Lambda.
- B. A larger context window alone  
  _Rationale:_ Context size does not connect an external function.
- C. A second knowledge base  
  _Rationale:_ Knowledge bases retrieve documents, they do not call functions.
- D. A higher temperature setting  
  _Rationale:_ Temperature does not provide tool connectivity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
