# Semantic Kernel AI Orchestration with .NET

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0612` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Semantic Kernel kernel, plugins, function calling, memory and agent orchestration partially verified against official Microsoft Learn Semantic Kernel docs; features marked experimental/preview there must be re-verified at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-SEMANTICKERNEL (https://learn.microsoft.com/semantic-kernel/, accessed 2026-10-02) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Semantic Kernel AI Orchestration with .NET (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Semantic Kernel architecture and the kernel object in .NET
2. Configure AI services and chat completion in the kernel
3. Build and register plugins with KernelFunctions
4. Use function calling to let models invoke tools
5. Add memory, embeddings and retrieval to a kernel app
6. Orchestrate multi-step and multi-agent workflows safely

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Semantic Kernel architecture (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Create a kernel and register a chat-completion service in .NET; (2) Explain the kernel's role versus the model provider
- Common misconception addressed: Conflating the kernel with the model itself
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The kernel object and dependency injection | 81 | 5 |
| M01L02 | Services, connectors and provider configuration | 82 | 5 |

### M02 Chat completion and prompts (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Invoke a prompt function with templated variables; (2) Manage chat history across turns
- Common misconception addressed: Rebuilding the kernel on every request
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chat completion and prompt functions | 77 | 5 |
| M02L02 | Chat history and execution settings | 77 | 5 |

### M03 Plugins (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Write a native plugin with a KernelFunction and description; (2) Import an OpenAPI endpoint as a plugin
- Common misconception addressed: Omitting function descriptions the model relies on
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Native plugins and KernelFunction attributes | 81 | 5 |
| M03L02 | OpenAPI and prompt plugins | 82 | 5 |

### M04 Function calling (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Enable automatic function calling for a tool set; (2) Constrain which functions a call may use
- Common misconception addressed: Granting unrestricted tool access to the model
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Function calling and tool selection | 81 | 5 |
| M04L02 | Guardrails and least-privilege tool exposure | 82 | 5 |

### M05 Memory and retrieval (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Add embeddings and a vector store for grounding; (2) Retrieve and inject context into a prompt
- Common misconception addressed: Treating the model's output as a source of truth
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Embeddings and memory stores | 77 | 5 |
| M05L02 | Retrieval-augmented grounding in a kernel app | 77 | 5 |

### M06 Orchestration (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Chain functions into a multi-step workflow; (2) Add a human-approval step before a consequential action
- Common misconception addressed: Letting an agent take destructive actions unattended
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Multi-step orchestration and planners | 81 | 5 |
| M06L02 | Multi-agent patterns and safe autonomy | 82 | 5 |

## Integrative case

A .NET team builds an internal assistant that answers policy questions and files tickets. Wire the kernel with a chat-completion service, build plugins for search and ticketing, enable function calling with guardrails, add memory for grounding, and orchestrate a multi-step flow with approval before the ticket is created, then defend the reliability and safety design.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0612-final-protected | 30 | 30 | yes |
| MST-0612-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Semantic Kernel architecture | 5 |
| Chat completion and prompts | 5 |
| Plugins | 5 |
| Function calling | 5 |
| Memory and retrieval | 5 |
| Orchestration | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0612-Q0001** (single-answer, Select ONE) In a .NET Semantic Kernel app, what is the role of the kernel object?

- A. It references AI services, manages plugins and provides execution context for functions **(key)**  
  _Rationale:_ Correct: the kernel orchestrates services, plugins and execution.
- B. It is the large language model itself  
  _Rationale:_ The model is a connected service, not the kernel.
- C. It stores the user's password  
  _Rationale:_ That is not the kernel's purpose.
- D. It replaces the need for any AI provider  
  _Rationale:_ The kernel still calls a provider.

**MST-0612-Q0002** (multiple-answer, Select TWO) Which TWO practices make function calling safer in an agent that can file tickets and send email? (Select TWO.)

- A. Expose only the minimum set of functions the task needs **(key)**  
  _Rationale:_ Correct: least-privilege tool exposure limits misuse.
- B. Require human approval before consequential actions **(key)**  
  _Rationale:_ Correct: approval gating guards destructive actions.
- C. Allow the model to call any function with no limits  
  _Rationale:_ Unrestricted tool access is risky.
- D. Hide all function descriptions from the model  
  _Rationale:_ Descriptions are needed for correct selection; hiding them harms reliability.

**MST-0612-Q0003** (single-answer, Select ONE) An assistant must answer from company policy documents rather than the model's training. What should be added to the kernel app?

- A. Embeddings plus a memory/vector store to retrieve and inject policy context **(key)**  
  _Rationale:_ Correct: retrieval grounds answers in the documents.
- B. A higher temperature setting  
  _Rationale:_ Temperature does not add grounding.
- C. A longer system prompt insisting it be correct  
  _Rationale:_ Instructions alone do not supply the documents.
- D. Disabling function calling  
  _Rationale:_ That is unrelated to grounding.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
