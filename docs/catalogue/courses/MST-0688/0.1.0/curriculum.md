# Azure Infrastructure as Code with Bicep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0688` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure Bicep documentation read via the Microsoft Learn MCP on 2026-10-02 (declarative syntax that compiles to ARM JSON, idempotent deployments, parameters and decorators, variables and expressions, modules, the what-if operation, deployment via Azure CLI/PowerShell). Bicep and tooling evolve; confirm resource API versions and CLI behaviour against current docs before production. |
| Official sources | https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview; https://learn.microsoft.com/training/paths/fundamentals-bicep/ |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZURE-BICEP |
| Legacy IDs | none |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 50 / module checks 64 / cumulative 156 min |
| Certificate | Mastemy Certificate of Completion — Azure Infrastructure as Code with Bicep (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain infrastructure as code and where Bicep fits
2. Author a Bicep file defining Azure resources
3. Parameterise templates with decorators and secure parameters
4. Compose deployments using modules
5. Deploy and preview changes with what-if using the CLI or PowerShell

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Infrastructure as code and Bicep basics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain how a Bicep file maps to an ARM deployment; (2) Deploy a one-resource Bicep file
- Common misconception addressed: Thinking Bicep is a separate engine rather than compiling to ARM templates
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What is infrastructure as code | 108 | 5 |
| M01L02 | What is Bicep and how it relates to ARM | 108 | 5 |

### M02 Authoring resources (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Define a storage account in Bicep and redeploy to show idempotency; (2) Add a dependent resource and let ARM order it
- Common misconception addressed: Expecting repeated deployments to create duplicate resources rather than being idempotent
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defining resources and properties | 108 | 5 |
| M02L02 | Idempotency and orchestration | 108 | 5 |

### M03 Parameters, variables and expressions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add parameters with decorators and a parameter file; (2) Mark a secret as a secure parameter
- Common misconception addressed: Hard-coding environment values instead of using parameters and parameter files
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Parameters and decorators | 108 | 5 |
| M03L02 | Secure parameters and parameter files | 108 | 5 |
| M03L03 | Variables and expressions | 108 | 5 |

### M04 Modules, what-if and deployment (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Refactor a template into reusable modules; (2) Run what-if before deploying and read the change list
- Common misconception addressed: Deploying without previewing changes, risking unintended updates or deletes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Composing with modules | 108 | 5 |
| M04L02 | The what-if operation | 108 | 5 |
| M04L03 | Deploying with Azure CLI and PowerShell | 108 | 5 |

## Integrative case

An engineer codifies an environment: write a Bicep file for storage and networking, parameterise it for dev/test/prod with secure parameters, break it into reusable modules, preview changes with what-if, and deploy idempotently through a pipeline.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0688-final-protected | 30 | 40 | yes |
| MST-0688-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Infrastructure as code and Bicep basics | 8 |
| Authoring resources | 8 |
| Parameters, variables and expressions | 7 |
| Modules, what-if and deployment | 7 |

Minimum reviewed item bank: 288 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0688-Q0001** (single-answer, Select ONE) You deploy the same Bicep file twice with unchanged properties. What happens on the second deployment?

- A. No changes are made because Bicep deployments are idempotent **(key)**  
  _Rationale:_ Correct: redeploying an unchanged file leaves resources in the same state.
- B. A duplicate set of resources is created  
  _Rationale:_ Bicep is idempotent; it does not duplicate unchanged resources.
- C. The deployment fails because the resources exist  
  _Rationale:_ Existing matching resources do not cause failure.
- D. All resources are deleted and recreated  
  _Rationale:_ Unchanged resources are not recreated.

**MST-0688-Q0002** (multiple-answer, Select TWO) Which TWO statements about Bicep are correct? (Select TWO.)

- A. Bicep files compile to standard ARM JSON templates **(key)**  
  _Rationale:_ Correct: Bicep transpiles to ARM templates.
- B. Modules let you break a deployment into reusable components **(key)**  
  _Rationale:_ Correct: modules group related resources for reuse.
- C. Bicep requires you to manage a separate state file  
  _Rationale:_ Azure stores state; Bicep has no separate state file to manage.
- D. Bicep can only deploy a single resource per file  
  _Rationale:_ A Bicep file can define many resources and modules.

**MST-0688-Q0003** (single-answer, Select ONE) Which operation previews what a deployment will create, update or delete before you run it?

- A. The what-if operation **(key)**  
  _Rationale:_ Correct: what-if previews the changes a deployment would make.
- B. The compile command  
  _Rationale:_ Compiling produces ARM JSON; it does not preview live changes.
- C. A secure parameter  
  _Rationale:_ Secure parameters protect secrets; they do not preview changes.
- D. A resource lock  
  _Rationale:_ Locks prevent changes; they do not preview a deployment.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
