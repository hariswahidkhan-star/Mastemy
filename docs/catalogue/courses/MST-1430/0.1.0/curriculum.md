# PowerShell for Microsoft 365 Administration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1430` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Graph PowerShell and Exchange Online PowerShell documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/powershell/microsoftgraph/azuread-msoline-cmdlet-map |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-PS-M365 |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — PowerShell for Microsoft 365 Administration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use PowerShell fundamentals and cmdlets for Microsoft 365
2. Connect and work with the Microsoft Graph PowerShell SDK and Exchange Online module
3. Script repeatable administrative tasks safely

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 PowerShell and module basics (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Run cmdlets with parameters and the pipeline; (2) Install and import the Exchange Online module
- Common misconception addressed: Running scripts without checking the module version first
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | PowerShell fundamentals and cmdlets | 84 | 4 |
| M01L02 | Installing and connecting modules | 84 | 4 |

### M02 Graph and Exchange Online (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Connect-MgGraph with least-privilege scopes; (2) Retrieve mailboxes with Get-EXOMailbox
- Common misconception addressed: Using retired AzureAD/MSOnline cmdlets instead of Microsoft Graph equivalents
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Microsoft Graph PowerShell SDK | 84 | 4 |
| M02L02 | Exchange Online PowerShell | 84 | 4 |

### M03 Scripting admin tasks (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Bulk-update users from a CSV file; (2) Configure app-only authentication for automation
- Common misconception addressed: Hardcoding credentials instead of using app-only or managed identity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Bulk operations and pipelines | 72 | 4 |
| M03L02 | Safe scripting and app-only authentication | 72 | 4 |

## Integrative case

An admin connects with the Microsoft Graph and Exchange Online modules, bulk-updates users from a CSV, and documents a safe, reusable script with app-only authentication.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1430-final-protected | 24 | 32 | yes |
| MST-1430-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| PowerShell and module basics | 8 |
| Graph and Exchange Online | 8 |
| Scripting admin tasks | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1430-Q0001** (single-answer, Select ONE) Which cmdlet connects a session to the Microsoft Graph PowerShell SDK?

- A. Connect-MgGraph **(key)**  
  _Rationale:_ Correct: Connect-MgGraph establishes the Microsoft Graph PowerShell session with chosen scopes.
- B. Connect-AzStorage  
  _Rationale:_ There is no such cmdlet for Graph; storage uses different modules.
- C. New-VNetPeering  
  _Rationale:_ That is not a real cmdlet and relates to networking, not Graph.
- D. Set-BlobTier  
  _Rationale:_ Blob tier operations are storage tasks, not Graph connection.

**MST-1430-Q0002** (multiple-answer, Select TWO) Which TWO are good practices for Microsoft 365 administration scripts? (Select TWO.)

- A. Use least-privilege scopes when connecting **(key)**  
  _Rationale:_ Correct: requesting only needed scopes limits risk.
- B. Use app-only authentication or managed identity for automation **(key)**  
  _Rationale:_ Correct: app-only auth avoids embedding user credentials.
- C. Hardcode an admin password in the script  
  _Rationale:_ Hardcoded credentials are a serious security risk.
- D. Disable all logging  
  _Rationale:_ Disabling logging hinders auditing and troubleshooting.

**MST-1430-Q0003** (single-answer, Select ONE) A legacy script uses Connect-MsolService. What is the recommended modern replacement?

- A. The Microsoft Graph PowerShell SDK (Connect-MgGraph) **(key)**  
  _Rationale:_ Correct: MSOnline and Azure AD cmdlets map to the Microsoft Graph PowerShell SDK.
- B. Azure CLI az login only  
  _Rationale:_ Azure CLI manages Azure resources, not the directory cmdlet surface MSOnline covered.
- C. Bicep deployment  
  _Rationale:_ Bicep is IaC, not a directory administration module.
- D. A storage lifecycle rule  
  _Rationale:_ Lifecycle rules are storage features, unrelated to directory cmdlets.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
