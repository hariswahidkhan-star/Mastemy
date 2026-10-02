# Azure Functions and Event-Driven Serverless Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0686` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Functions triggers, bindings, hosting plans and durable patterns partially verified against official Microsoft Learn Azure Functions docs; re-verify specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-AZFUNCTIONS (https://learn.microsoft.com/azure/azure-functions/functions-triggers-bindings, accessed 2026-10-02) |
| Legacy IDs | MST-MIC-SK-AFSE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure Functions and Event-Driven Serverless Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the serverless, event-driven model and when to use Functions
2. Build functions with triggers and input/output bindings
3. Choose Consumption, Premium and Dedicated hosting plans
4. Design idempotent, resilient event processing
5. Orchestrate workflows with Durable Functions patterns
6. Secure, configure and monitor function apps

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Serverless and event-driven model (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Decide Functions vs a long-running service for three workloads; (2) Map business events to function triggers
- Common misconception addressed: Using Functions for long, stateful, always-on work
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Serverless concepts and when to use Azure Functions | 77 | 5 |
| M01L02 | Event sources and the trigger model | 77 | 5 |

### M02 Triggers and bindings (MASTEMY-DESIGN 18%, design weight)

- Worked applications: (1) Write a queue-triggered function with a blob output binding; (2) Add an input binding to read a Cosmos DB document
- Common misconception addressed: Hardcoding SDK clients where a binding would suffice
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Triggers: HTTP, timer, queue, blob and Event Grid | 86 | 5 |
| M02L02 | Input and output bindings | 87 | 5 |

### M03 Hosting plans (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Choose Consumption vs Premium for a cold-start-sensitive API; (2) Estimate cost for a spiky versus steady workload
- Common misconception addressed: Ignoring cold start when choosing Consumption
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Consumption, Flex/Premium and Dedicated plans | 77 | 5 |
| M03L02 | Cold start, scaling limits and cost | 77 | 5 |

### M04 Resilient event processing (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Make an order-creation function idempotent against retries; (2) Configure a poison-message/dead-letter path
- Common misconception addressed: Assuming each message is delivered exactly once
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Retries, at-least-once delivery and idempotency | 81 | 5 |
| M04L02 | Poison messages and dead-lettering | 82 | 5 |

### M05 Durable Functions (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Implement a fan-out/fan-in aggregation with an orchestrator; (2) Add a human-approval pattern with an external event
- Common misconception addressed: Putting orchestration logic in a normal stateless function
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Orchestrator, activity and entity functions | 81 | 5 |
| M05L02 | Fan-out/fan-in, chaining and approval patterns | 82 | 5 |

### M06 Security, config and monitoring (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Secure an HTTP function with a key and then with Entra auth; (2) Trace a slow invocation in Application Insights
- Common misconception addressed: Leaving function keys in client-side code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Authentication, keys and managed identity | 76 | 5 |
| M06L02 | Configuration and Application Insights monitoring | 77 | 5 |

## Integrative case

An orders platform processes events: a queue message creates an order, a blob upload triggers a thumbnail, and a nightly timer reconciles totals. Design the functions and bindings, choose a hosting plan for a spiky load with a cold-start budget, make processing idempotent, add a Durable Functions fan-out, and wire Application Insights, then justify the plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0686-final-protected | 30 | 30 | yes |
| MST-0686-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Serverless and event-driven model | 5 |
| Triggers and bindings | 5 |
| Hosting plans | 5 |
| Resilient event processing | 5 |
| Durable Functions | 5 |
| Security, config and monitoring | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0686-Q0001** (single-answer, Select ONE) A function must run exactly one logical order creation even though the queue delivers a message at least once. What design handles this?

- A. Make the handler idempotent using a dedupe key so repeats are no-ops **(key)**  
  _Rationale:_ Correct: at-least-once delivery requires idempotent handlers.
- B. Assume the queue delivers exactly once  
  _Rationale:_ Azure queues provide at-least-once delivery.
- C. Disable retries entirely  
  _Rationale:_ Disabling retries loses messages on transient failure.
- D. Increase the function timeout  
  _Rationale:_ Timeout does not address duplicate delivery.

**MST-0686-Q0002** (multiple-answer, Select TWO) Which TWO are valid reasons to choose the Premium (or Flex) plan over Consumption? (Select TWO.)

- A. To avoid cold starts with pre-warmed instances **(key)**  
  _Rationale:_ Correct: Premium keeps warm instances ready.
- B. To access VNet integration for private resources **(key)**  
  _Rationale:_ Correct: Premium supports VNet integration.
- C. Because Consumption cannot run any function  
  _Rationale:_ Consumption runs functions fine.
- D. Because Premium is always cheaper  
  _Rationale:_ Premium is typically more expensive.

**MST-0686-Q0003** (single-answer, Select ONE) You must aggregate results from many parallel sub-tasks and continue when all finish. Which Durable Functions pattern fits?

- A. Fan-out/fan-in with an orchestrator awaiting all activities **(key)**  
  _Rationale:_ Correct: fan-out/fan-in parallelises then aggregates.
- B. A single HTTP-triggered stateless function  
  _Rationale:_ A stateless function cannot track parallel completion reliably.
- C. A timer trigger every minute polling status  
  _Rationale:_ Polling is wasteful and fragile here.
- D. Storing state in a global variable  
  _Rationale:_ Global state is not durable across instances.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
