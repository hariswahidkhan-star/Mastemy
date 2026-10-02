# Azure App Service and Container Application Hosting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0685` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). App Service plans, deployment slots, container hosting and scaling behaviour partially verified against official Microsoft Learn App Service docs; re-verify specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-APPSERVICE (https://learn.microsoft.com/azure/app-service/, accessed 2026-10-02) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure App Service and Container Application Hosting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose App Service plans and hosting tiers for a workload
2. Deploy code and container apps to App Service
3. Configure deployment slots and zero-downtime releases
4. Manage configuration, secrets and managed identity
5. Scale apps up and out and configure autoscale
6. Secure, monitor and troubleshoot App Service apps

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 App Service plans and tiers (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Match three workloads to Free, Basic, Standard and Premium tiers; (2) Estimate cost and scale limits for a chosen plan
- Common misconception addressed: Picking a tier on price alone, ignoring scale and features
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | App Service plans, SKUs and the shared-infrastructure model | 81 | 5 |
| M01L02 | Choosing a tier for scale, slots and isolation | 82 | 5 |

### M02 Deploying apps (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Deploy a web app from a Git source and from a zip package; (2) Deploy a container image from Azure Container Registry
- Common misconception addressed: Assuming code and container deployment are configured the same
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Code deployment: Git, zip and CI/CD | 81 | 5 |
| M02L02 | Web App for Containers and registries | 82 | 5 |

### M03 Deployment slots (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Create a staging slot and perform a slot swap; (2) Configure slot-sticky settings that do not swap
- Common misconception addressed: Swapping slots without warming the target
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Deployment slots and slot settings | 81 | 5 |
| M03L02 | Zero-downtime releases and swap with preview | 82 | 5 |

### M04 Configuration and identity (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Reference a Key Vault secret from app settings via managed identity; (2) Separate per-environment configuration cleanly
- Common misconception addressed: Storing connection strings in source control
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | App settings, connection strings and configuration | 81 | 5 |
| M04L02 | Managed identity and Key Vault references | 82 | 5 |

### M05 Scaling (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Configure scale-out rules driven by CPU and schedule; (2) Decide between scale up and scale out for a spike
- Common misconception addressed: Scaling up when the bottleneck needs scaling out
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scale up versus scale out | 77 | 5 |
| M05L02 | Autoscale rules and limits | 77 | 5 |

### M06 Security, monitoring and troubleshooting (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Enable Application Insights and read a failed-request trace; (2) Restrict access with private endpoints and access restrictions
- Common misconception addressed: Leaving an app publicly reachable with no restrictions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Networking, access restrictions and TLS | 77 | 5 |
| M06L02 | Application Insights, logs and diagnostics | 77 | 5 |

## Integrative case

A startup hosts a containerised API and a marketing site on App Service. Choose the plan tier, wire container deployment from a registry, add staging slots with slot swap, bind configuration and secrets via managed identity and Key Vault, configure autoscale, and set up Application Insights, then defend the cost and resilience trade-offs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0685-final-protected | 30 | 30 | yes |
| MST-0685-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| App Service plans and tiers | 5 |
| Deploying apps | 5 |
| Deployment slots | 5 |
| Configuration and identity | 5 |
| Scaling | 5 |
| Security, monitoring and troubleshooting | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0685-Q0001** (single-answer, Select ONE) A team wants to release a new version and validate it on production infrastructure before users hit it, with instant rollback. What should they use?

- A. A staging deployment slot with a slot swap (and swap with preview) **(key)**  
  _Rationale:_ Correct: slot swap gives warmed, zero-downtime releases with instant rollback.
- B. Deleting and recreating the app each release  
  _Rationale:_ That causes downtime and data loss risk.
- C. Editing files on the production app in place  
  _Rationale:_ In-place edits are not safely reversible.
- D. Scaling up the plan tier  
  _Rationale:_ Tier changes do not provide release validation.

**MST-0685-Q0002** (multiple-answer, Select TWO) Which TWO let an App Service app read a database password without storing the secret in configuration or code? (Select TWO.)

- A. A system-assigned managed identity for the app **(key)**  
  _Rationale:_ Correct: managed identity removes stored credentials.
- B. A Key Vault reference in app settings resolved by that identity **(key)**  
  _Rationale:_ Correct: the app resolves the secret at runtime via the vault.
- C. Committing the password to the Git repo  
  _Rationale:_ Secrets must not be in source control.
- D. Putting the password in the container image  
  _Rationale:_ Image-embedded secrets leak.

**MST-0685-Q0003** (single-answer, Select ONE) An app is CPU-bound under concurrent load but each request is light. What is the better first response?

- A. Scale out by adding instances **(key)**  
  _Rationale:_ Correct: more instances spread concurrent requests.
- B. Scale up to a bigger single instance only  
  _Rationale:_ Scaling up alone may not help concurrency as well as scaling out.
- C. Disable Application Insights  
  _Rationale:_ Removing telemetry hides the cause.
- D. Move to the Free tier  
  _Rationale:_ The Free tier reduces capacity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
