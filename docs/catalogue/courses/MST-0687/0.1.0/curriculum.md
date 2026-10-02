# Azure DevOps Pipelines and Release Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0687` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Azure Pipelines YAML, stages, environments, approvals and release concepts partially verified against official Microsoft Learn Azure DevOps docs; re-verify specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-AZDEVOPS-PIPELINES (https://learn.microsoft.com/azure/devops/pipelines/, accessed 2026-10-02) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure DevOps Pipelines and Release Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design CI pipelines with YAML, triggers and artifacts
2. Structure multi-stage pipelines for build, test and deploy
3. Manage environments, approvals and deployment gates
4. Implement safe release strategies and rollbacks
5. Handle variables, secrets and service connections securely
6. Monitor pipeline health and enforce quality gates

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Continuous integration with YAML (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Author a YAML CI pipeline that builds, tests and publishes artifacts; (2) Configure path and branch triggers
- Common misconception addressed: Treating a classic UI pipeline as source-controlled
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | YAML pipelines, triggers and the build graph | 81 | 5 |
| M01L02 | Jobs, steps and publishing artifacts | 82 | 5 |

### M02 Multi-stage pipelines (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Split a pipeline into build, test and deploy stages; (2) Share artifacts and conditions across stages
- Common misconception addressed: Rebuilding the app in every deploy stage
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Stages, dependencies and conditions | 81 | 5 |
| M02L02 | Templates and reuse across pipelines | 82 | 5 |

### M03 Environments, approvals and gates (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Add a manual approval before the prod environment; (2) Configure a gate that checks a monitoring signal
- Common misconception addressed: Relying on manual approval as the only quality control
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Environments and deployment targets | 81 | 5 |
| M03L02 | Approvals, checks and gates | 82 | 5 |

### M04 Release strategies (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Implement a blue-green deployment with a swap; (2) Define a rollback path when health checks fail
- Common misconception addressed: Deploying straight to all users with no canary
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Blue-green, canary and rolling releases | 81 | 5 |
| M04L02 | Rollback and progressive exposure | 82 | 5 |

### M05 Variables, secrets and connections (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Store secrets in a variable group linked to Key Vault; (2) Scope a service connection to least privilege
- Common misconception addressed: Printing secrets to pipeline logs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Variables, variable groups and secret handling | 77 | 5 |
| M05L02 | Service connections and least-privilege access | 77 | 5 |

### M06 Quality gates and monitoring (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Fail a build on failing tests and a coverage threshold; (2) Build a dashboard for lead time and change-failure rate
- Common misconception addressed: Measuring activity instead of DORA outcomes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Test, coverage and security quality gates | 77 | 5 |
| M06L02 | Pipeline analytics and DORA metrics | 77 | 5 |

## Integrative case

A team ships a .NET API and a React app. Design Azure Pipelines: a CI pipeline producing artifacts, a multi-stage pipeline to dev/test/prod with manual approvals and gates, a blue-green release with rollback, secret handling via a variable group and Key Vault, and dashboards for lead time and failure rate, then defend the approval model.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0687-final-protected | 30 | 30 | yes |
| MST-0687-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Continuous integration with YAML | 5 |
| Multi-stage pipelines | 5 |
| Environments, approvals and gates | 5 |
| Release strategies | 5 |
| Variables, secrets and connections | 5 |
| Quality gates and monitoring | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0687-Q0001** (single-answer, Select ONE) A team wants its pipeline definition reviewed, versioned and diffed like code. What should they use?

- A. A YAML pipeline stored in the repository **(key)**  
  _Rationale:_ Correct: YAML pipelines are source-controlled and reviewable.
- B. A classic UI-only pipeline  
  _Rationale:_ UI pipelines are not diff-friendly source.
- C. Manual deployment scripts run by hand  
  _Rationale:_ Manual scripts are not a reviewable pipeline.
- D. A spreadsheet of deploy steps  
  _Rationale:_ A spreadsheet is not executable or versioned as code.

**MST-0687-Q0002** (multiple-answer, Select TWO) Which TWO controls help ensure only vetted changes reach production? (Select TWO.)

- A. A manual approval check on the production environment **(key)**  
  _Rationale:_ Correct: approvals gate promotion to prod.
- B. An automated gate that queries a health/monitoring signal **(key)**  
  _Rationale:_ Correct: gates block promotion on objective signals.
- C. Granting every user permission to deploy to prod  
  _Rationale:_ Broad deploy rights weaken control.
- D. Removing all tests to speed up deployment  
  _Rationale:_ Removing tests reduces safety.

**MST-0687-Q0003** (single-answer, Select ONE) A release must switch traffic to a new version instantly and allow immediate rollback to the old version. Which strategy fits best?

- A. Blue-green deployment with a swap between two environments **(key)**  
  _Rationale:_ Correct: blue-green allows instant cutover and rollback.
- B. Deleting the old version before deploying the new one  
  _Rationale:_ That eliminates the rollback target.
- C. Editing production servers in place  
  _Rationale:_ In-place edits are not cleanly reversible.
- D. Deploying only on Fridays  
  _Rationale:_ Timing is not a release strategy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
