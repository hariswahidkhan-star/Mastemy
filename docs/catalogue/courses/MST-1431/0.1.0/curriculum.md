# Azure CLI and Bicep Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1431` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Azure CLI and Bicep documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-BICEP |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure CLI and Bicep Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use the Azure CLI to authenticate and manage resources
2. Author Bicep files with parameters and modules
3. Deploy and validate infrastructure with what-if

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Azure CLI basics (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a resource group with az group create; (2) List and query resources with az
- Common misconception addressed: Forgetting to set the active subscription with az account set
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Install, login and resource groups | 84 | 4 |
| M01L02 | Managing resources with az | 84 | 4 |

### M02 Bicep authoring (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Write a Bicep resource for a storage account; (2) Parameterize location and name and add a module
- Common misconception addressed: Hardcoding names instead of using parameters and uniqueString
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Bicep syntax and resources | 84 | 4 |
| M02L02 | Parameters and modules | 84 | 4 |

### M03 Deployment and validation (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Deploy a Bicep file with az deployment group create; (2) Preview changes with what-if before deploying
- Common misconception addressed: Skipping what-if and deploying unverified changes to production
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Deploy with the Azure CLI | 72 | 4 |
| M03L02 | What-if and validation | 72 | 4 |

## Integrative case

An engineer authors a Bicep file for a storage account, parameterizes it, runs a what-if, and deploys it to a resource group with the Azure CLI.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1431-final-protected | 24 | 32 | yes |
| MST-1431-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Azure CLI basics | 8 |
| Bicep authoring | 8 |
| Deployment and validation | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1431-Q0001** (single-answer, Select ONE) What is Bicep?

- A. A domain-specific language with declarative syntax to deploy Azure resources **(key)**  
  _Rationale:_ Correct: Bicep is a declarative DSL for infrastructure as code on Azure.
- B. A mail client  
  _Rationale:_ Bicep is an IaC language, not an email application.
- C. A storage redundancy tier  
  _Rationale:_ Redundancy tiers are storage settings, not a language.
- D. A Conditional Access control  
  _Rationale:_ Conditional Access is an Entra feature, unrelated to Bicep.

**MST-1431-Q0002** (multiple-answer, Select TWO) Which TWO Azure CLI steps are typically required before deploying a Bicep file? (Select TWO.)

- A. Sign in with az login **(key)**  
  _Rationale:_ Correct: you must authenticate with az login before deploying.
- B. Create or select a resource group **(key)**  
  _Rationale:_ Correct: a group deployment targets a resource group that must exist.
- C. Delete all storage accounts  
  _Rationale:_ Deleting resources is not a deployment prerequisite.
- D. Disable the subscription  
  _Rationale:_ Disabling the subscription would prevent deployment.

**MST-1431-Q0003** (single-answer, Select ONE) Which operation previews what a Bicep deployment would change before applying it?

- A. what-if **(key)**  
  _Rationale:_ Correct: the what-if operation previews changes before deployment.
- B. az group delete  
  _Rationale:_ That deletes a resource group rather than previewing changes.
- C. Set-BlobTier  
  _Rationale:_ Blob tiering is a storage operation, not a deployment preview.
- D. Connect-MgGraph  
  _Rationale:_ That connects to Microsoft Graph, unrelated to Bicep previews.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
