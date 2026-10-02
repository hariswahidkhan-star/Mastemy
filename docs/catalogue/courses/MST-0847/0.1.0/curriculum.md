# .NET AI Integration and Agent Application Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0847` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-DOTNET-AI** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Microsoft.Extensions.AI abstractions (IChatClient, embeddings) in a .NET app
2. Decide when a plain model call suffices versus an agent framework
3. Build an agent that uses tools/plugins and orchestrates multi-step work
4. Apply responsible-AI, observability and evaluation to AI features

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/dotnet/ai/dotnet-ai-ecosystem
- https://learn.microsoft.com/semantic-kernel/overview/

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Microsoft.Extensions.AI abstractions

- Purpose: Teach the unified .NET AI abstraction layer and DI integration.
- Worked applications: (1) Call a chat model through IChatClient and inject it via DI; (2) Generate embeddings with IEmbeddingGenerator for a search feature
- Common misconception addressed: Assuming Microsoft.Extensions.AI is itself an agent framework
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The .NET + AI ecosystem | 80 | 5 |
| M01L02 | IChatClient and IEmbeddingGenerator | 80 | 5 |
| M01L03 | Fitting AI into DI and configuration | 80 | 5 |

### M02 From calls to agents

- Purpose: Teach when goal-directed orchestration (an agent framework) is warranted.
- Worked applications: (1) Decide whether a one-shot summarize feature needs an agent or just MEAI; (2) Sketch a Semantic Kernel kernel with services and plugins
- Common misconception addressed: Reaching for a full agent framework for a simple one-shot call
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | One-shot calls vs agentic orchestration | 80 | 5 |
| M02L02 | Semantic Kernel kernel, services and plugins | 80 | 5 |
| M02L03 | Choosing MEAI vs an agent framework | 80 | 5 |

### M03 Tools, orchestration and responsibility

- Purpose: Teach tool/plugin use, orchestration and responsible-AI/observability.
- Worked applications: (1) Give an agent a plugin that calls an existing API and have the model invoke it; (2) Add OpenTelemetry to an agent and define an evaluation to catch regressions
- Common misconception addressed: Shipping AI features with no evaluation or observability
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Plugins/tools and function calling | 80 | 5 |
| M03L02 | Multi-step orchestration | 80 | 5 |
| M03L03 | Responsible AI, observability and evaluation | 80 | 5 |

## Integrative case

A .NET team wants to add a support assistant that can look up orders and draft replies. Decide between a plain MEAI call and an agent framework, wire a tool/plugin to the order API, and add observability plus an evaluation before shipping.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0847-final-protected | 30 | 30 | yes |
| MST-0847-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Microsoft.Extensions.AI abstractions | 10 |
| From calls to agents | 10 |
| Tools, orchestration and responsibility | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0847-Q0001** (single-answer, Select ONE) What is the role of Microsoft.Extensions.AI (MEAI) in a .NET application?

- A. A unified set of C# abstractions (e.g. IChatClient) for interacting with AI services across providers **(key)**  
  _Rationale:_ Correct: MEAI is a provider-neutral abstraction layer for model interaction in .NET.
- B. A complete multi-step agent orchestration framework  
  _Rationale:_ MEAI alone is not an agent framework; agentic orchestration needs more.
- C. A replacement for dependency injection in .NET  
  _Rationale:_ MEAI fits into DI rather than replacing it.
- D. A proprietary API tied to a single model vendor  
  _Rationale:_ MEAI is deliberately a unifying layer, not vendor-specific.

**MST-0847-Q0002** (multiple-answer, Select TWO) Select TWO situations where a full agent framework (rather than a plain MEAI call) is justified.

- A. The task requires goal-directed, multi-step orchestration **(key)**  
  _Rationale:_ Correct: multi-step, goal-directed work is where an agent framework earns its complexity.
- B. The feature must call several tools and decide the sequence dynamically **(key)**  
  _Rationale:_ Correct: dynamic tool selection and sequencing is agentic behavior.
- C. A single one-shot summarization of a block of text  
  _Rationale:_ A one-shot summary is served fine by a plain MEAI call.
- D. Returning a fixed templated string with no model call  
  _Rationale:_ No model call means neither MEAI nor an agent is needed.
- E. A stateless classification with one prompt  
  _Rationale:_ A single-prompt classification does not need agent orchestration.

**MST-0847-Q0003** (single-answer, Select ONE) Before shipping an AI feature, which practice best guards against silent quality regressions as prompts and models change?

- A. Define evaluations that compare outputs and catch regressions **(key)**  
  _Rationale:_ Correct: an evaluation/regression layer catches quality drops as prompts, models and tools evolve.
- B. Remove all logging to protect privacy  
  _Rationale:_ Removing observability makes regressions harder to detect, not easier.
- C. Hard-code one model version forever and never test  
  _Rationale:_ Pinning without testing still misses regressions from prompt or data changes.
- D. Rely only on the model provider marketing claims  
  _Rationale:_ Vendor claims are not a substitute for your own evaluations.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
