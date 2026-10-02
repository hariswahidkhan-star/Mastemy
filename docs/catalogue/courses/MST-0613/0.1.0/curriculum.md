# Model Context Protocol: Client and Server Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0613` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | This is a general-professional-skills course with no external awarding body and no official certification syllabus. Concepts reference the open Model Context Protocol specification; exact protocol details are DESIGN ASSUMPTION and should be confirmed against the current open specification before production. |
| Official sources | (none read this session) |
| Evidence | **n/a-no-official-syllabus** - no official syllabus/source read this session; sources: SRC-MCP-SPEC |
| Legacy IDs | MST-AI-SK-MCPMF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Model Context Protocol: Client and Server Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what the Model Context Protocol is and the problem it solves
2. Describe the client and server roles and how they communicate
3. Identify the core primitives (tools, resources, prompts) conceptually
4. Reason about transport, capabilities and lifecycle at a working level
5. Apply basic safety and authorization thinking to an MCP integration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 What MCP is and why (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Explain MCP to a non-specialist; (2) Identify client/server/host in a scenario
- Common misconception addressed: Treating MCP as a specific product rather than an open protocol
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The integration problem MCP addresses | 88 | 5 |
| M01L02 | Clients, servers and hosts | 88 | 5 |

### M02 Core primitives (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify three capabilities as tool/resource/prompt; (2) Draft a tool's input/output contract
- Common misconception addressed: Modelling everything as a tool when a resource fits better
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tools and their contracts | 88 | 5 |
| M02L02 | Resources and prompts | 87 | 5 |
| M02L03 | Choosing the right primitive | 87 | 5 |

### M03 Communication and lifecycle (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Trace a client-server exchange; (2) Reason about capability negotiation
- Common misconception addressed: Assuming client and server share state without negotiation
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Transport and message flow | 87 | 5 |
| M03L02 | Capability negotiation and lifecycle | 87 | 5 |

### M04 Safety and authorization (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide what a server should not expose; (2) Add input validation to a tool contract
- Common misconception addressed: Exposing broad capabilities without authorization controls
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Authorization and least privilege | 87 | 5 |
| M04L02 | Validating inputs and limiting exposure | 87 | 5 |

### M05 Designing an integration (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design the tool set for an internal service; (2) Plan a test for a client-server integration
- Common misconception addressed: Shipping an integration without testing the contract boundaries
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Designing a small MCP server | 87 | 5 |
| M05L02 | Connecting and testing a client | 87 | 5 |

## Integrative case

A team exposes an internal data service to an AI assistant via an MCP server: define the tools and resources it offers, connect a client, and reason about authorization and safe exposure of capabilities.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0613-final-protected | 30 | 40 | yes |
| MST-0613-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What MCP is and why | 5 |
| Core primitives | 6 |
| Communication and lifecycle | 7 |
| Safety and authorization | 6 |
| Designing an integration | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0613-Q0001** (single-answer, Select ONE) At a conceptual level, what problem does the Model Context Protocol aim to solve?

- A. Providing a common way for AI applications to connect to tools and data sources **(key)**  
  _Rationale:_ Correct: MCP is an open protocol standardising how clients connect to servers exposing tools/resources.
- B. Training large language models from scratch  
  _Rationale:_ MCP is about integration, not model training.
- C. Replacing all databases  
  _Rationale:_ MCP does not replace databases.
- D. Rendering user interfaces  
  _Rationale:_ MCP is not a UI framework.

**MST-0613-Q0002** (multiple-answer, Select TWO) Which TWO are core MCP primitives a server can expose? (Select TWO.)

- A. Tools **(key)**  
  _Rationale:_ Correct: tools are callable capabilities a server exposes.
- B. Resources **(key)**  
  _Rationale:_ Correct: resources are data a server exposes to clients.
- C. Firewalls  
  _Rationale:_ A firewall is a network control, not an MCP primitive.
- D. Spreadsheets  
  _Rationale:_ A spreadsheet is not an MCP primitive.

**MST-0613-Q0003** (single-answer, Select ONE) When designing an MCP server for an internal service, a sound security principle is to:

- A. Expose only the capabilities needed, with authorization (least privilege) **(key)**  
  _Rationale:_ Correct: least privilege limits what a connected client can do.
- B. Expose every internal operation for flexibility  
  _Rationale:_ Broad exposure increases risk.
- C. Skip input validation to simplify the server  
  _Rationale:_ Input validation is essential for safe exposure.
- D. Share one admin credential with all clients  
  _Rationale:_ Shared broad credentials violate least privilege.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
