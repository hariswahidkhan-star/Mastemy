# GitHub Actions Certification Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0197` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GitHub (no affiliation or endorsement); exam administered by Microsoft on behalf of GitHub |
| Exam code | GH-200 |
| Version basis | Skills measured as of January 2026 |
| Evidence | **verified-official-source** - sources: SRC-GH-GH200 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/gh-200) |
| Legacy IDs | MST-MIC-GH-GH200-001 |
| Planned time | T = 1825 min; instruction I = 1460 min (80%); assessment A = 365 min (20%) |
| Assessment split | lesson checks 70 / module checks 175 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Author and manage workflows' to the depth the official outline requires
2. Apply the objectives of 'Consume and troubleshoot workflows' to the depth the official outline requires
3. Apply the objectives of 'Author and maintain actions' to the depth the official outline requires
4. Apply the objectives of 'Manage GitHub Actions for the enterprise' to the depth the official outline requires
5. Apply the objectives of 'Secure and optimize automation' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Author and manage workflows (20–25%)

- Worked applications: (1) Build a matrix job across OS and runtime versions; (2) Pass data between jobs with outputs and artifacts
- Common misconception addressed: Confusing workflow_dispatch inputs with workflow_call inputs
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Configure workflow triggers and events | 105 | 6 |
| M01L02 | Design and implement workflow structure | 105 | 6 |
| M01L03 | Manage workflow execution and outputs | 105 | 6 |

### M02 Consume and troubleshoot workflows (15–20%)

- Worked applications: (1) Diagnose a failed run from logs and rerun one matrix job; (2) Consume a reusable workflow vs a starter workflow
- Common misconception addressed: Treating a starter workflow and a reusable workflow as the same thing
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Interpret workflow behavior and results | 105 | 6 |
| M02L02 | Access workflow artifacts and logs | 104 | 6 |
| M02L03 | Use and manage workflow templates | 104 | 6 |

### M03 Author and maintain actions (15–20%)

- Worked applications: (1) Author a composite action with metadata; (2) Publish and version an action to the Marketplace
- Common misconception addressed: Confusing a composite action with a reusable workflow
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Create and troubleshoot custom actions | 104 | 6 |
| M03L02 | Define action structure and metadata | 104 | 6 |
| M03L03 | Distribute and maintain actions | 104 | 6 |

### M04 Manage GitHub Actions for the enterprise (20–25%)

- Worked applications: (1) Configure runner groups and self-hosted runners; (2) Scope encrypted secrets at org/repo/environment levels
- Common misconception addressed: Assuming a repository secret is automatically available to every environment
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Distribute and govern actions and workflows | 104 | 6 |
| M04L02 | Manage runners at scale | 104 | 6 |
| M04L03 | Manage encrypted secrets and variables | 104 | 6 |

### M05 Secure and optimize automation (10–15%)

- Worked applications: (1) Pin third-party actions to full commit SHAs; (2) Use OIDC federation to remove long-lived cloud secrets
- Common misconception addressed: Relying on GITHUB_TOKEN when a scoped OIDC token is required
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Implement security best practices | 104 | 6 |
| M05L02 | Optimize workflow performance and cost | 104 | 6 |

## Integrative case

A platform team standardizes CI/CD on GitHub Actions. Design the solution: workflow structure and triggers, reusable workflows and custom actions, enterprise governance and runner scaling, secret scoping, and security hardening (SHA pinning, OIDC, least-privilege tokens); justify the approach to the DevOps lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0197-practice-form-A | 45 | 45 | yes |
| MST-0197-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0197-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0197-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Author and manage workflows | 11 |
| Consume and troubleshoot workflows | 9 |
| Author and maintain actions | 8 |
| Manage GitHub Actions for the enterprise | 11 |
| Secure and optimize automation | 6 |

Minimum reviewed item bank: 698 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0197-Q0001** (single-answer, Select ONE) A workflow deploys to AWS and must not store long-lived cloud credentials in the repository. Which approach should you use?

- A. OIDC federation with an id-token permission **(key)**  
  _Rationale:_ Correct: OIDC lets the workflow obtain short-lived cloud credentials with no stored secret.
- B. A personal access token stored as a repo secret  
  _Rationale:_ A PAT is a long-lived credential, which the requirement forbids.
- C. Hardcoding keys in the workflow YAML  
  _Rationale:_ Hardcoding credentials is a severe security anti-pattern.
- D. A GITHUB_TOKEN with write-all scope  
  _Rationale:_ GITHUB_TOKEN authenticates to GitHub, not AWS, and write-all violates least privilege.

**MST-0197-Q0002** (single-answer, Select ONE) What is the key difference between a starter workflow and a reusable workflow?

- A. A starter workflow is a scaffold copied into a repo and then independent; a reusable workflow is a central definition invoked via workflow_call **(key)**  
  _Rationale:_ Correct: starter workflows seed new files; reusable workflows are called centrally and stay versioned.
- B. They are identical and interchangeable  
  _Rationale:_ They differ in how they are consumed and maintained.
- C. A reusable workflow can only run on self-hosted runners  
  _Rationale:_ Reusable workflows run on any permitted runner.
- D. A starter workflow cannot contain jobs  
  _Rationale:_ Starter workflows are full workflows with jobs.

**MST-0197-Q0003** (multiple-answer, Select TWO) Which TWO practices reduce the risk of using untrusted third-party actions? (Select TWO.)

- A. Pin the action to a full commit SHA **(key)**  
  _Rationale:_ Correct: SHA pinning prevents a moved tag from pulling in unexpected code.
- B. Enforce an organization allow list for actions **(key)**  
  _Rationale:_ Correct: allow lists restrict which actions can run in the org.
- C. Reference the action with @main always  
  _Rationale:_ Floating @main pulls the latest, possibly malicious, commit.
- D. Grant the workflow write-all permissions  
  _Rationale:_ Broad permissions increase blast radius, not safety.
- E. Disable all logging  
  _Rationale:_ Disabling logs hinders auditing and does not vet actions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
