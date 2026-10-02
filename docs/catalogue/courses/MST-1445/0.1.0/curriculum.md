# Azure OpenAI in Foundry Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1445` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Azure OpenAI in Azure AI Foundry Models documentation read via the Microsoft Learn MCP on 2026-10-02 (resource creation, model deployment, deployment types, deployment name vs model name, playground, Entra ID keyless auth, content filtering, quota/TPM). Model availability, portal naming (Foundry vs Foundry classic) and regions change frequently and must be confirmed before production. |
| Official sources | https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource; https://learn.microsoft.com/azure/ai-foundry/openai/chatgpt-quickstart |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AOAI-FOUNDRY |
| Legacy IDs | MST-MIC-SK-AOFE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure OpenAI in Foundry Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create an Azure OpenAI resource in Azure AI Foundry and deploy a model
2. Explain deployment name versus model name when calling the API
3. Choose an appropriate deployment type for a workload
4. Use the playground and view generated code to start an application
5. Apply secure auth (Microsoft Entra ID), content filtering and quota awareness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Azure OpenAI in Azure AI Foundry overview (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Create an Azure OpenAI resource in the portal; (2) Locate the Deployments area in Foundry
- Common misconception addressed: Confusing OpenAI's public API with Azure OpenAI's deployment model
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Azure OpenAI in Azure AI Foundry provides | 96 | 5 |
| M01L02 | Resources, projects and the Foundry portal | 96 | 5 |

### M02 Deploying a model (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Deploy a chat model and name the deployment; (2) Explain why API calls use the deployment name
- Common misconception addressed: Calling the API with the underlying model name instead of the deployment name
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deploying a base model | 96 | 5 |
| M02L02 | Deployment name versus model name in API calls | 96 | 5 |

### M03 Deployment types and capacity (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Pick a deployment type for a low-volume pilot; (2) Set a TPM limit for a deployment
- Common misconception addressed: Assuming one deployment type suits every workload and budget
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Standard, Global-Standard, Batch and Provisioned types | 96 | 5 |
| M03L02 | Tokens-per-minute quota and dynamic quota | 96 | 5 |

### M04 Trying it in the playground (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Configure a system message and test a prompt; (2) Export Python code from the playground
- Common misconception addressed: Treating playground output as production-ready without further work
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Using the chat playground and system messages | 96 | 5 |
| M04L02 | Exporting code to start an application | 96 | 5 |

### M05 Security, content filtering and quota (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose Entra ID auth over embedding keys; (2) Assign a content filter to a deployment
- Common misconception addressed: Hard-coding API keys in code instead of using Entra ID / Key Vault
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keyless auth with Microsoft Entra ID | 96 | 5 |
| M05L02 | Content filtering and quota awareness | 96 | 5 |

## Integrative case

A developer stands up an Azure OpenAI resource in Azure AI Foundry, deploys a chat model with an appropriate deployment type and TPM limit, tests it in the playground, and plans keyless Entra ID auth and content-filter settings before writing application code.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1445-final-protected | 30 | 40 | yes |
| MST-1445-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Azure OpenAI in Azure AI Foundry overview | 5 |
| Deploying a model | 6 |
| Deployment types and capacity | 7 |
| Trying it in the playground | 6 |
| Security, content filtering and quota | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1445-Q0001** (single-answer, Select ONE) When calling Azure OpenAI in Azure AI Foundry via the API, which name must you reference?

- A. The deployment name **(key)**  
  _Rationale:_ Correct: Azure OpenAI always requires the deployment name, even in the model parameter.
- B. The subscription ID  
  _Rationale:_ The subscription ID is not used to select the model in the call.
- C. The resource group name  
  _Rationale:_ The resource group is not the model identifier in API calls.
- D. The region short code  
  _Rationale:_ The region is not how the API selects the deployed model.

**MST-1445-Q0002** (multiple-answer, Select TWO) Which TWO are recommended security practices for Azure OpenAI? (Select TWO.)

- A. Use Microsoft Entra ID (keyless) authentication where possible **(key)**  
  _Rationale:_ Correct: Entra ID managed identity auth avoids storing keys in code.
- B. Store any required keys in Azure Key Vault, not in code **(key)**  
  _Rationale:_ Correct: keys should be stored securely and never posted publicly.
- C. Commit the API key into source control for convenience  
  _Rationale:_ Keys must never be committed or posted publicly.
- D. Disable content filtering to speed responses  
  _Rationale:_ Content filtering is a safety control that should not be casually disabled.

**MST-1445-Q0003** (single-answer, Select ONE) A low-volume pilot needs a simple way to set an effective rate limit on a deployment. Which setting applies?

- A. The tokens-per-minute (TPM) rate limit / quota **(key)**  
  _Rationale:_ Correct: TPM quota sets the effective rate limit for a deployment.
- B. The sensitivity label  
  _Rationale:_ Sensitivity labels are a Microsoft 365 data-protection feature, not a TPM limit.
- C. The workspace capacity SKU for Power BI  
  _Rationale:_ That is a Power BI concept, unrelated to Azure OpenAI TPM.
- D. The Conditional Access policy  
  _Rationale:_ Conditional Access governs sign-in, not model TPM limits.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
