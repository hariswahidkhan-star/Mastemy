# Azure OpenAI Integration and Enterprise Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0697` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure documentation read via the Microsoft Learn MCP on 2026-10-02 (Azure OpenAI deployments, Microsoft Entra managed-identity auth, content filtering, private endpoints, diagnostic logging). Azure portal UI and model availability change frequently and must be confirmed before production. |
| Official sources | https://learn.microsoft.com/azure/ai-services/openai/overview; https://learn.microsoft.com/azure/security/fundamentals/ai-security-best-practices; https://learn.microsoft.com/azure/ai-services/openai/how-to/managed-identity; https://learn.microsoft.com/azure/ai-services/openai/concepts/content-filter |
| Evidence | **verified-official-source** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZURE-OPENAI |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure OpenAI Integration and Enterprise Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Azure OpenAI deployments and how applications call them
2. Authenticate applications using Microsoft Entra managed identity
3. Apply content filtering and safety controls
4. Isolate the service with private endpoints and network controls
5. Monitor usage and enforce enterprise governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate a deployed, secured Azure OpenAI integration; configuration is taught through demonstrations and walkthroughs.

## Modules

### M01 Azure OpenAI deployments (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Plan a model deployment for an internal app; (2) Explain how an app calls a deployment endpoint
- Common misconception addressed: Confusing Azure OpenAI with the public OpenAI API and its handling
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Azure OpenAI provides | 72 | 5 |
| M01L02 | Deployments and calling the endpoint | 72 | 5 |

### M02 Identity and secrets (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Replace API keys with a managed identity; (2) Explain why managed identity reduces secret risk
- Common misconception addressed: Hard-coding and emailing API keys instead of using managed identity
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Microsoft Entra managed-identity authentication | 96 | 5 |
| M02L02 | Eliminating and rotating secrets | 96 | 5 |

### M03 Content safety and filtering (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Configure input and output content filtering; (2) Handle a 400 response from a filtered prompt
- Common misconception addressed: Assuming the model is safe by default with no filtering configured
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Content filtering at input and output | 80 | 5 |
| M03L02 | Prompt shields and safety design | 80 | 5 |
| M03L03 | Handling filtered responses in code | 80 | 5 |

### M04 Network isolation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Disable public access and add a private endpoint; (2) Allow a trusted service to reach the resource
- Common misconception addressed: Leaving the endpoint public because it is easier to test
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Private endpoints and network isolation | 96 | 5 |
| M04L02 | Trusted-service and access configuration | 96 | 5 |

### M05 Monitoring and governance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Send diagnostic logs to Azure Monitor and alert on usage; (2) Apply rate limits via an API gateway
- Common misconception addressed: Running with no logging so misuse goes unnoticed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Diagnostic logging and monitoring | 96 | 5 |
| M05L02 | Rate limiting and enterprise governance | 96 | 5 |

## Integrative case

A .NET team integrates Azure OpenAI for an internal assistant: create a model deployment, authenticate with managed identity instead of keys, enable content filtering, disable public network access with a private endpoint, and send diagnostic logs to Azure Monitor for review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0697-final-protected | 30 | 40 | yes |
| MST-0697-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Azure OpenAI deployments | 5 |
| Identity and secrets | 6 |
| Content safety and filtering | 7 |
| Network isolation | 6 |
| Monitoring and governance | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0697-Q0001** (single-answer, Select ONE) An enterprise wants to stop managing and rotating API keys for its Azure OpenAI app. What does Microsoft recommend?

- A. Authenticate with a Microsoft Entra managed identity **(key)**  
  _Rationale:_ Correct: Microsoft's guidance is to use managed identity so applications authenticate without stored keys to rotate.
- B. Email the keys to each developer  
  _Rationale:_ Distributing keys increases exposure and is explicitly discouraged.
- C. Hard-code the key in the source  
  _Rationale:_ Hard-coding secrets is a well-known anti-pattern.
- D. Disable authentication entirely  
  _Rationale:_ Removing authentication exposes the service.

**MST-0697-Q0002** (multiple-answer, Select TWO) Which TWO controls help isolate an Azure OpenAI resource at the network level? (Select TWO.)

- A. Disable public network access **(key)**  
  _Rationale:_ Correct: removing the public endpoint restricts reachability.
- B. Create a private endpoint into the virtual network **(key)**  
  _Rationale:_ Correct: a private endpoint confines access to the virtual network.
- C. Publish the key in a public repository  
  _Rationale:_ That is a severe security mistake, not isolation.
- D. Turn off diagnostic logging  
  _Rationale:_ Disabling logging reduces visibility and is unrelated to isolation.

**MST-0697-Q0003** (single-answer, Select ONE) A prompt returns a 400 response citing the content management policy. In application code you should:

- A. Catch the error and handle the filtered response gracefully **(key)**  
  _Rationale:_ Correct: a filtered prompt returns a 400, which the app should catch and handle rather than crash.
- B. Retry the identical prompt forever  
  _Rationale:_ Repeating the same filtered prompt will keep failing.
- C. Remove all error handling  
  _Rationale:_ That would make the app crash on filtered content.
- D. Disable the content filter in code  
  _Rationale:_ Client code cannot and should not silently bypass the configured safety filter.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
