# Copilot Studio: Business Agent Design and Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0714` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Copilot Studio documentation read via the Microsoft Learn MCP on 2026-10-02 (topics, publishing and channels, authentication options, environment-level DLP and governance, ALM). Copilot Studio is updated frequently and some features are in preview; confirm against the current product before production. |
| Official sources | https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-what-is-copilot-studio; https://learn.microsoft.com/microsoft-copilot-studio/publication-fundamentals-publish-channels; https://learn.microsoft.com/microsoft-copilot-studio/guidance/sec-gov-intro; https://learn.microsoft.com/microsoft-copilot-studio/nlu-authoring |
| Evidence | **verified-official-source** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-COPILOT-STUDIO |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Copilot Studio: Business Agent Design and Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe what Copilot Studio is and when to use it
2. Design topics and conversation flows for a business need
3. Add knowledge and tools to an agent responsibly
4. Publish an agent to channels with appropriate authentication
5. Apply environment-level governance, DLP and lifecycle controls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate a published, governed agent; agent building is taught through demonstrations and walkthroughs.

## Modules

### M01 What Copilot Studio is (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Decide whether a need fits Copilot Studio or Agent Builder; (2) Describe the low-code agent-building model
- Common misconception addressed: Expecting Copilot Studio to require full custom code for every agent
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Copilot Studio overview and fit | 72 | 5 |
| M01L02 | Agents, workflows and the studio | 72 | 5 |

### M02 Designing topics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Author a topic from a plain-language description; (2) Add trigger phrases and nodes for a flow
- Common misconception addressed: Writing one giant topic instead of focused, triggerable ones
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Topics, triggers and nodes | 96 | 5 |
| M02L02 | Creating and editing topics with Copilot | 96 | 5 |

### M03 Knowledge and tools (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a governed knowledge source to an agent; (2) Choose when to add a tool versus generative answers
- Common misconception addressed: Connecting any data source without checking governance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Adding knowledge and generative answers | 80 | 5 |
| M03L02 | Adding tools and connectors | 80 | 5 |
| M03L03 | Governance of connected data | 80 | 5 |

### M04 Publishing and channels (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Publish an agent and connect it to Teams; (2) Choose an authentication option for a channel
- Common misconception addressed: Selecting No authentication for an internal agent handling sensitive data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Publishing and configuring channels | 96 | 5 |
| M04L02 | Authentication options and their effects | 96 | 5 |

### M05 Governance and lifecycle (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set DLP and access at the environment level; (2) Move an agent through dev-test-production with ALM
- Common misconception addressed: Editing production directly instead of promoting through environments
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Environment-level DLP and access | 96 | 5 |
| M05L02 | Application Lifecycle Management for agents | 96 | 5 |

## Integrative case

A team ships an internal HR agent in Copilot Studio: author topics for common questions, add a governed knowledge source, publish to Teams with Microsoft Entra authentication, and move it through dev-test-production with DLP policies set at the environment level.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0714-final-protected | 30 | 40 | yes |
| MST-0714-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What Copilot Studio is | 5 |
| Designing topics | 6 |
| Knowledge and tools | 7 |
| Publishing and channels | 6 |
| Governance and lifecycle | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0714-Q0001** (single-answer, Select ONE) An internal agent will handle sensitive HR data. Which authentication choice is inappropriate?

- A. No authentication, which lets anyone with the link chat with it **(key)**  
  _Rationale:_ Correct: Microsoft cautions that No authentication allows anyone with the link to interact, which is unsuitable for sensitive internal data.
- B. Authenticate with Microsoft Entra ID  
  _Rationale:_ Entra authentication is appropriate for an internal, sensitive agent.
- C. Authenticate manually for other channels  
  _Rationale:_ Manual authentication is a valid way to keep auth on other channels.
- D. Restrict the agent to authenticated users  
  _Rationale:_ Restricting to authenticated users is appropriate here.

**MST-0714-Q0002** (multiple-answer, Select TWO) Which TWO are environment-level governance controls in Copilot Studio? (Select TWO.)

- A. Data loss prevention (DLP) policies **(key)**  
  _Rationale:_ Correct: DLP is enforced at the environment level to control connector use.
- B. Role-based access and auditing **(key)**  
  _Rationale:_ Correct: role-based access and auditing are applied at the environment level.
- C. The colour theme of a single topic  
  _Rationale:_ Cosmetic topic styling is not a governance control.
- D. The length of a trigger phrase  
  _Rationale:_ Trigger-phrase length is an authoring detail, not governance.

**MST-0714-Q0003** (single-answer, Select ONE) Before customers can interact with an updated agent on any channel, the maker must:

- A. Publish the agent again so changes reach all connected channels **(key)**  
  _Rationale:_ Correct: changes only reach channels after the agent is published again.
- B. Rename the environment  
  _Rationale:_ Renaming does not deploy changes.
- C. Delete all topics  
  _Rationale:_ Deleting topics removes functionality rather than deploying it.
- D. Disable authentication  
  _Rationale:_ Disabling authentication does not publish changes and weakens security.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
