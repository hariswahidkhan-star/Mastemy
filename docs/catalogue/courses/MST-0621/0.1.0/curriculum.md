# AI Workflow Orchestration with n8n

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0621` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — AI Workflow Orchestration with n8n (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build n8n workflows with triggers, nodes and connections
2. Integrate AI model and tool nodes into a workflow
3. Handle data mapping, branching and error paths
4. Secure credentials and operate workflows reliably

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Workflow basics (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Build a workflow with a trigger and three connected nodes; (2) Map output fields from one node into the next
- Common misconception addressed: Assuming data flows between nodes without explicit field mapping
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Triggers and nodes | 80 | 5 |
| M01L02 | Connections and data flow | 80 | 5 |
| M01L03 | Expressions and field mapping | 80 | 5 |

### M02 AI and integrations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add an AI model node and feed it data from an earlier node; (2) Call an external API node and parse its response
- Common misconception addressed: Trusting an AI node's output without validating it before the next step
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI model nodes | 80 | 5 |
| M02L02 | Service and HTTP nodes | 80 | 5 |
| M02L03 | Parsing and transforming responses | 80 | 5 |

### M03 Reliability and security (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add an error branch and a retry to a failing node; (2) Store an API key as a credential, not in plain text
- Common misconception addressed: Hard-coding secrets into node parameters instead of using credentials
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Branching and error paths | 80 | 5 |
| M03L02 | Retries and idempotency | 80 | 5 |
| M03L03 | Credentials and operations | 80 | 5 |

## Integrative case

A team automates an AI-assisted process in n8n: start from a trigger, chain nodes that call a model and other services, map data between steps, branch on results, add error handling and retries, and store credentials securely before putting the workflow into production.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0621-final-protected | 30 | 30 | yes |
| MST-0621-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Workflow basics | 10 |
| AI and integrations | 10 |
| Reliability and security | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0621-Q0001** (single-answer, Select ONE) In n8n, how does data generally get from one node to the next?

- A. Through the connection, with fields referenced via expressions/mapping **(key)**  
  _Rationale:_ Correct: nodes pass items along connections and later nodes map fields explicitly.
- B. By global variables shared automatically everywhere  
  _Rationale:_ n8n passes items along connections, not implicit globals.
- C. Only by writing to an external database between every node  
  _Rationale:_ A database is not required to pass data between nodes.
- D. It does not; each node runs in isolation with no input  
  _Rationale:_ Downstream nodes receive the previous node's items.

**MST-0621-Q0002** (multiple-answer, Select TWO) Which TWO make an n8n workflow production-ready? (Select TWO.)

- A. An error branch that handles a node failure gracefully **(key)**  
  _Rationale:_ Correct: an error path keeps one failure from silently breaking the run.
- B. Credentials stored in n8n's credential store, not in node fields **(key)**  
  _Rationale:_ Correct: using the credential store keeps secrets out of plain-text parameters.
- C. Hard-coding the API key into every HTTP node  
  _Rationale:_ Plain-text secrets in nodes are a leak risk.
- D. Removing all error handling to simplify the canvas  
  _Rationale:_ Dropping error handling makes the workflow fragile.

**MST-0621-Q0003** (single-answer, Select ONE) An AI node in your workflow sometimes returns malformed output. What is the right next step?

- A. Validate and handle the output before the downstream node uses it **(key)**  
  _Rationale:_ Correct: AI output is untrusted and must be validated before use.
- B. Feed it straight into the next node and hope it parses  
  _Rationale:_ Passing malformed data downstream causes silent failures.
- C. Delete the AI node  
  _Rationale:_ Removing the node is not handling its output.
- D. Disable logging so the error is not visible  
  _Rationale:_ Hiding the error does not fix the malformed output.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
