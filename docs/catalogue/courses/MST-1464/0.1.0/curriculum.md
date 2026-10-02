# Terraform on Google Cloud

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1464` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://cloud.google.com/docs/terraform; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Terraform on Google Cloud (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain infrastructure as code and the Terraform workflow on Google Cloud
2. Configure the Google provider and authenticate safely
3. Write resources, variables, outputs and data sources
4. Manage remote state with locking in a Cloud Storage backend
5. Build and reuse modules for repeatable infrastructure
6. Run plan and apply safely in automation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 IaC and the Terraform workflow (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe what each workflow command does; (2) Read a plan to see what will change
- Common misconception addressed: Treating terraform apply as safe without reviewing the plan
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why infrastructure as code | 48 | 5 |
| M01L02 | init, plan, apply, destroy | 48 | 5 |
### M02 Provider and authentication (MASTEMY-DESIGN 16%)

- Worked applications: (1) Configure the google provider with a project and region; (2) Authenticate with Application Default Credentials
- Common misconception addressed: Hardcoding a service account key in the configuration
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Google provider configuration | 48 | 5 |
| M02L02 | Authentication and credentials | 48 | 5 |
### M03 Resources and variables (MASTEMY-DESIGN 17%)

- Worked applications: (1) Provision a VPC and subnet with variables; (2) Expose an output and consume a data source
- Common misconception addressed: Hardcoding values that should be input variables
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Resources, outputs and data sources | 48 | 5 |
| M03L02 | Input variables and locals | 48 | 5 |
### M04 State management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure a GCS backend with versioning; (2) Detect and reconcile configuration drift
- Common misconception addressed: Keeping state local and committing terraform.tfstate to git
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Remote state in Cloud Storage | 48 | 5 |
| M04L02 | State locking and drift | 48 | 5 |
### M05 Modules (MASTEMY-DESIGN 17%)

- Worked applications: (1) Refactor repeated resources into a module; (2) Pin a module to a version for repeatability
- Common misconception addressed: Copy-pasting blocks instead of using modules
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Authoring a module | 48 | 5 |
| M05L02 | Reusing and versioning modules | 48 | 5 |
### M06 Terraform in automation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run a gated plan/apply pipeline; (2) Add a manual approval before apply to production
- Common misconception addressed: Running unattended apply with no plan review or approval gate
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Plan and apply in CI/CD | 48 | 5 |
| M06L02 | Policy, approvals and safety | 48 | 5 |

## Integrative case

A team adopts infrastructure as code on Google Cloud: write Terraform to provision a network and a managed service, store state remotely with locking, use variables and modules, and run plan/apply safely in CI, then review the plan before it touches production.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1464-final-protected | 30 | 30 | yes |
| MST-1464-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IaC and the Terraform workflow | 5 |
| Provider and authentication | 5 |
| Resources and variables | 5 |
| State management | 5 |
| Modules | 5 |
| Terraform in automation | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1464-Q0001** (single-answer, Select ONE) Where should Terraform state be stored for a team working on shared Google Cloud infrastructure?

- A. A Cloud Storage backend with versioning and locking **(key)**  
  _Rationale:_ Correct: a remote GCS backend gives shared, locked, versioned state.
- B. A local terraform.tfstate file committed to git  
  _Rationale:_ Local state in git causes conflicts and can leak secrets.
- C. Only in each engineer's memory of changes  
  _Rationale:_ State must be recorded; memory is not a backend.
- D. Inside the provider block as a string  
  _Rationale:_ State is not stored in the provider configuration.

**MST-1464-Q0002** (multiple-answer, Select TWO) Which TWO practices make Terraform runs safer in a CI/CD pipeline? (Select TWO.)

- A. Run terraform plan and review it before apply **(key)**  
  _Rationale:_ Correct: reviewing the plan catches unintended changes before they happen.
- B. Require a manual approval before applying to production **(key)**  
  _Rationale:_ Correct: an approval gate prevents unreviewed changes reaching production.
- C. Pipe plan output straight into auto-apply with no review  
  _Rationale:_ Auto-applying unreviewed plans is exactly the risk to avoid.
- D. Store the service account key in the repository  
  _Rationale:_ Committing a key is a serious credential leak, not a safety practice.

**MST-1464-Q0003** (single-answer, Select ONE) What is the best way to authenticate the Google provider from a developer workstation?

- A. Application Default Credentials via gcloud auth **(key)**  
  _Rationale:_ Correct: ADC lets Terraform use the developer's authenticated identity without embedded keys.
- B. A long-lived service account key pasted into main.tf  
  _Rationale:_ Embedding a key in config is a leak risk and poor practice.
- C. Disabling authentication for convenience  
  _Rationale:_ Google Cloud APIs require authentication; it cannot be disabled.
- D. Using the organization admin's personal password in a variable  
  _Rationale:_ Passwords are not used for API auth and sharing them is unsafe.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
