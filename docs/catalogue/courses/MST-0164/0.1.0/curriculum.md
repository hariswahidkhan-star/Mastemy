# Microsoft AZ-400: DevOps Engineer Expert Exam Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0164` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AZ-400 |
| Version basis | Skills measured as of July 27, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-AZ400 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/az-400) |
| Legacy IDs | MST-MIC-MS-AZ400-001 |
| Planned time | T = 1875 min; instruction I = 1500 min (80%); assessment A = 375 min (20%) |
| Assessment split | lesson checks 80 / module checks 175 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Design and implement processes and communications' to the depth the official outline requires
2. Apply the objectives of 'Design and implement a source control strategy' to the depth the official outline requires
3. Apply the objectives of 'Design and implement build and release pipelines' to the depth the official outline requires
4. Apply the objectives of 'Develop a security and compliance plan' to the depth the official outline requires
5. Apply the objectives of 'Implement an instrumentation strategy' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Design and implement processes and communications (10–15%)

- Worked applications: (1) Model work with GitHub Projects and Azure Boards; (2) Build a DORA-metrics dashboard
- Common misconception addressed: Thinking GitHub Flow and trunk-based are the same branching model
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Design and implement traceability and flow of work | 94 | 6 |
| M01L02 | Design and implement appropriate metrics and queries for DevOps | 94 | 6 |
| M01L03 | Configure collaboration and communication | 94 | 6 |

### M02 Design and implement a source control strategy (10–15%)

- Worked applications: (1) Define a trunk-based branch policy with required reviews; (2) Shrink a bloated repo with Git LFS and Scalar
- Common misconception addressed: Believing branch protection rules and branch policies are interchangeable across GitHub and Azure DevOps
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design and implement branching strategies for the source code | 94 | 6 |
| M02L02 | Configure and manage repositories | 94 | 6 |

### M03 Design and implement build and release pipelines (50–55%)

- Worked applications: (1) Author a multi-stage YAML pipeline with environment approvals; (2) Provision infrastructure with Bicep in a deployment stage
- Common misconception addressed: Assuming classic release pipelines offer the same IaC control as YAML
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Design and implement a package management strategy | 94 | 6 |
| M03L02 | Design and implement a testing strategy for pipelines | 94 | 6 |
| M03L03 | Design and implement pipelines | 94 | 6 |
| M03L04 | Design and implement deployments | 94 | 6 |
| M03L05 | Design and implement infrastructure as code (IaC) | 94 | 6 |
| M03L06 | Maintain pipelines | 94 | 6 |

### M04 Develop a security and compliance plan (10–15%)

- Worked applications: (1) Federate GitHub Actions to Azure with OIDC, no stored secret; (2) Configure Dependabot and CodeQL scanning
- Common misconception addressed: Confusing a service principal secret with a managed identity
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Design and implement authentication and authorization methods | 94 | 6 |
| M04L02 | Design and implement a strategy for managing sensitive information in automation | 93 | 6 |
| M04L03 | Automate security and compliance scanning | 93 | 6 |

### M05 Implement an instrumentation strategy (5–10%)

- Worked applications: (1) Wire Application Insights telemetry into a release gate; (2) Write a KQL query to find a failure spike
- Common misconception addressed: Treating Azure Monitor metrics and logs as the same data source
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Configure monitoring for a DevOps environment | 93 | 6 |
| M05L02 | Analyze metrics from instrumentation | 93 | 6 |

## Integrative case

A product team ships a .NET/React app to Azure. Design the end-to-end DevOps solution: branching and PR policy, a multi-stage YAML pipeline with approvals, OIDC to Azure, secret handling in Key Vault, security scanning, and release-gate telemetry; then justify the trade-offs to the engineering lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0164-practice-form-A | 45 | 45 | yes |
| MST-0164-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0164-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0164-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Design and implement processes and communications | 6 |
| Design and implement a source control strategy | 6 |
| Design and implement build and release pipelines | 24 |
| Develop a security and compliance plan | 6 |
| Implement an instrumentation strategy | 3 |

Minimum reviewed item bank: 722 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0164-Q0001** (single-answer, Select ONE) A pipeline must deploy to a production environment only after a named approver signs off. Which Azure Pipelines feature enforces this inside YAML?

- A. YAML-based environments with checks and approvals **(key)**  
  _Rationale:_ Correct: environment checks let you require approvals and other gates before a stage deploys.
- B. A variable group  
  _Rationale:_ Variable groups share values across pipelines; they do not gate deployments.
- C. A branch policy  
  _Rationale:_ Branch policies gate pull requests into a branch, not deployment to an environment.
- D. A task group  
  _Rationale:_ Task groups package reusable tasks; they add no approval gate.

**MST-0164-Q0002** (single-answer, Select ONE) You want GitHub Actions to deploy to Azure without storing a long-lived cloud secret. Which approach should you choose?

- A. Workload identity federation (OpenID Connect) **(key)**  
  _Rationale:_ Correct: OIDC federation lets the workflow obtain short-lived Azure tokens with no stored secret.
- B. A personal access token stored as a repo secret  
  _Rationale:_ A PAT is a long-lived credential and is not a cloud federation mechanism.
- C. A service connection password in a variable group  
  _Rationale:_ That stores a long-lived secret, the opposite of what is required.
- D. A self-hosted runner registration token  
  _Rationale:_ Runner tokens register runners; they do not authenticate deployments to Azure.

**MST-0164-Q0003** (multiple-answer, Select TWO) Which TWO techniques reduce the blast radius of a bad production deployment? (Select TWO.)

- A. Blue-green deployment with slot swap **(key)**  
  _Rationale:_ Correct: blue-green keeps a standby environment so you can swap back instantly.
- B. Canary (progressive exposure) rollout **(key)**  
  _Rationale:_ Correct: canary exposes the change to a small slice first, limiting impact.
- C. Disabling all automated tests to deploy faster  
  _Rationale:_ Removing tests increases risk; it does not contain a bad deploy.
- D. Committing secrets directly into the pipeline YAML  
  _Rationale:_ This is a security anti-pattern unrelated to deployment safety.
- E. Deleting the previous artifact immediately after deploy  
  _Rationale:_ Removing the prior artifact makes rollback harder, not safer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
