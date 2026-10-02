# Building a Claude-Powered Knowledge Assistant with .NET and MySQL

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0550` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude / Claude Code and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.anthropic.com, EGRESS_BLOCKED); sources: SRC-CLAUDE-DOTNET-MYSQL-ASSISTANT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Building a Claude-Powered Knowledge Assistant with .NET and MySQL (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the architecture of a retrieval-backed Claude assistant built on ASP.NET Core and MySQL
2. Call the Claude API safely from C# with authentication, streaming and error handling
3. Ground answers in MySQL content by retrieving passages and assembling a cited prompt
4. Apply cost, caching and safety guardrails to the assistant
5. Operate the assistant with logging, evaluation and secure configuration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Architecture of a Claude knowledge assistant (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Draw the request flow from user question to grounded answer; (2) Decide which parts belong in the app tier versus the model
- Common misconception addressed: Assuming the model stores your data between requests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a retrieval-backed assistant does and its moving parts | 72 | 5 |
| M01L02 | A reference architecture with ASP.NET Core, MySQL and the Claude API | 72 | 5 |

### M02 Calling the Claude API from ASP.NET Core (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a typed C# client wrapper for the messages endpoint; (2) Add timeout, retry and error handling to the client
- Common misconception addressed: Hard-coding an API key in source instead of configuration
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authenticating and sending a first message from C# | 96 | 5 |
| M02L02 | Handling streaming, errors and retries in a service class | 96 | 5 |

### M03 Grounding answers in MySQL content (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a query that returns candidate passages for a question; (2) Compose a prompt that includes retrieved context and asks for citations
- Common misconception addressed: Sending the whole database to the model instead of retrieved passages
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Modelling and storing knowledge content in MySQL | 80 | 5 |
| M03L02 | Retrieving relevant passages to build a prompt context | 80 | 5 |
| M03L03 | Assembling a grounded prompt and citing the source rows | 80 | 5 |

### M04 Reliability, cost and safety (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add a cost ceiling and caching to the assistant; (2) Design a fallback when retrieval finds nothing relevant
- Common misconception addressed: Treating every model answer as correct without a confidence or source check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Controlling token cost and caching repeated work | 96 | 5 |
| M04L02 | Guardrails: refusing out-of-scope questions and handling no-answer | 96 | 5 |

### M05 Shipping and operating the assistant (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add structured logging that records question, sources and answer; (2) Move secrets to configuration and plan a deployment
- Common misconception addressed: Logging full user content without considering confidentiality
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Logging, evaluation and monitoring answer quality | 96 | 5 |
| M05L02 | Deployment, configuration and secret management | 96 | 5 |

## Integrative case

A mid-size firm wants an internal policy assistant: model the policy content in MySQL, build an ASP.NET Core service that retrieves relevant passages and calls Claude for a grounded, cited answer, add a cost ceiling and a no-answer fallback, and log each answer with its sources for review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0550-final-protected | 30 | 40 | yes |
| MST-0550-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture of a Claude knowledge assistant | 5 |
| Calling the Claude API from ASP.NET Core | 6 |
| Grounding answers in MySQL content | 7 |
| Reliability, cost and safety | 6 |
| Shipping and operating the assistant | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0550-Q0001** (single-answer, Select ONE) Where should the Claude API key be stored in an ASP.NET Core knowledge assistant?

- A. In application configuration or a secret store read at runtime **(key)**  
  _Rationale:_ Correct: secrets belong in configuration or a secret store, never in source.
- B. Hard-coded as a constant in the C# client class  
  _Rationale:_ Hard-coded keys leak through source control and cannot be rotated safely.
- C. In a comment next to the request code  
  _Rationale:_ Comments are still committed source and expose the key.
- D. In the MySQL table with the knowledge content  
  _Rationale:_ Mixing a credential into content storage widens its exposure.

**MST-0550-Q0002** (multiple-answer, Select TWO) Which TWO practices keep answers grounded in your MySQL knowledge base rather than the model's memory? (Select TWO.)

- A. Retrieve relevant passages and include them in the prompt context **(key)**  
  _Rationale:_ Correct: supplying retrieved passages grounds the answer in your content.
- B. Ask the model to cite the source rows it used **(key)**  
  _Rationale:_ Correct: requiring citations ties the answer back to stored content.
- C. Send the entire database contents in every request  
  _Rationale:_ Sending everything wastes tokens and does not improve grounding.
- D. Rely on the model to recall the policy from training  
  _Rationale:_ The model has no reliable memory of your private policy content.

**MST-0550-Q0003** (single-answer, Select ONE) Retrieval returns no relevant passages for a user's question. What should the assistant do?

- A. Return a clear no-answer response instead of inventing content **(key)**  
  _Rationale:_ Correct: a no-answer fallback prevents fabricated, ungrounded answers.
- B. Let the model answer from general knowledge anyway  
  _Rationale:_ That produces ungrounded answers the knowledge base cannot support.
- C. Retry the same query until something is returned  
  _Rationale:_ Repeating an empty query changes nothing and wastes cost.
- D. Return the most recently cached answer for any question  
  _Rationale:_ An unrelated cached answer misleads the user.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
