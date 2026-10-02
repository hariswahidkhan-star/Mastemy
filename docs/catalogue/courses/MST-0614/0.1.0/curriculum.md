# Secure MCP Server Development and Authorization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0614` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Secure MCP Server Development and Authorization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Implement an MCP server exposing tools, resources and prompts
2. Design authentication and authorization for MCP clients and tool calls
3. Validate inputs and enforce least-privilege on server-side actions
4. Log, audit and test an MCP server for safe operation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 MCP server fundamentals (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Define a tool with a typed input schema and a resource endpoint; (2) Expose a prompt template and connect a test client
- Common misconception addressed: Treating tool descriptions as trusted instructions rather than data the model may misuse
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tools, resources and prompts | 80 | 5 |
| M01L02 | Transport and client connection | 80 | 5 |
| M01L03 | Capability negotiation | 80 | 5 |

### M02 Authentication and authorization (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add client authentication and reject unauthenticated calls; (2) Enforce per-tool authorization so a client can only call permitted tools
- Common misconception addressed: Assuming the model layer enforces authorization instead of the server
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authenticating clients | 80 | 5 |
| M02L02 | Per-tool authorization | 80 | 5 |
| M02L03 | Least-privilege scopes and tokens | 80 | 5 |

### M03 Validation, audit and testing (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Validate and reject malformed or out-of-range tool arguments; (2) Add an audit log entry for every executed tool call
- Common misconception addressed: Logging only successes and missing denied or failed calls in the audit trail
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Input validation and sanitisation | 80 | 5 |
| M03L02 | Audit logging | 80 | 5 |
| M03L03 | Testing and failure handling | 80 | 5 |

## Integrative case

A team exposes internal systems to an AI client through an MCP server: define tools, resources and prompts, add authentication and per-tool authorization, validate every tool argument, enforce least privilege on the actions each tool may take, and add audit logging and tests before connecting any client.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0614-final-protected | 30 | 30 | yes |
| MST-0614-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MCP server fundamentals | 10 |
| Authentication and authorization | 10 |
| Validation, audit and testing | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0614-Q0001** (single-answer, Select ONE) Who should enforce that an MCP client may only call the tools it is permitted to use?

- A. The MCP server, on every tool call **(key)**  
  _Rationale:_ Correct: authorization must be enforced server-side on each call, not assumed from the model.
- B. The language model, by choosing not to call forbidden tools  
  _Rationale:_ Models can be manipulated; authorization cannot depend on model behaviour.
- C. The end user, by reading the docs  
  _Rationale:_ Documentation is not an enforcement mechanism.
- D. Nobody; MCP tools are safe by default  
  _Rationale:_ Exposed tools are not safe by default and must be authorized.

**MST-0614-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce the blast radius of an MCP tool? (Select TWO.)

- A. Validate and constrain every tool argument before acting on it **(key)**  
  _Rationale:_ Correct: validated, constrained inputs stop malformed or malicious arguments.
- B. Grant each tool only the least privilege it needs **(key)**  
  _Rationale:_ Correct: least privilege limits what damage a misused tool can do.
- C. Give every tool full administrative access for convenience  
  _Rationale:_ Broad access maximises, not minimises, blast radius.
- D. Skip logging to improve performance  
  _Rationale:_ Dropping logs removes the audit trail needed to detect misuse.

**MST-0614-Q0003** (single-answer, Select ONE) What belongs in an MCP server's audit log?

- A. Every tool call, including denied and failed ones, with who called it and the outcome **(key)**  
  _Rationale:_ Correct: a complete audit trail records successes, denials and failures with attribution.
- B. Only tool calls that succeeded  
  _Rationale:_ Omitting denials and failures hides exactly the events security review needs.
- C. Nothing, to save disk space  
  _Rationale:_ No audit trail means no way to detect or investigate misuse.
- D. Only the server's start-up banner  
  _Rationale:_ A banner is not an audit record of tool activity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
