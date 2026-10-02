# GitOps with Argo CD

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1585` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — GitOps with Argo CD (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. GitOps principles
2. Argo CD architecture and concepts
3. Declarative apps and sync
4. Repository structure and app-of-apps
5. Rollouts, health and drift remediation
6. Security, RBAC and multi-cluster

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 GitOps principles (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how desired state lives in Git; (2) Identify a workflow that violates GitOps
- Common misconception addressed: Thinking GitOps just means 'storing YAML in Git'
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The four GitOps principles | 80 | 6 |
| M01L02 | Git as the single source of truth | 80 | 6 |

### M02 Argo CD architecture and concepts (MASTEMY-DESIGN 17%)

- Worked applications: (1) Describe how Argo CD detects and corrects drift; (2) Model an app that points at a Git path
- Common misconception addressed: Assuming Argo CD pushes changes rather than pulling desired state
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Argo CD components and reconciliation loop | 80 | 6 |
| M02L02 | Applications, projects and sources | 80 | 6 |

### M03 Declarative apps and sync (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write an Application that syncs a directory; (2) Order resources with sync waves
- Common misconception addressed: Mixing manual kubectl edits with Argo CD management
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining an Application declaratively | 80 | 6 |
| M03L02 | Sync, auto-sync and sync waves | 80 | 6 |

### M04 Repository structure and app-of-apps (MASTEMY-DESIGN 16%)

- Worked applications: (1) Lay out a repo for staging and production; (2) Use app-of-apps to manage many applications
- Common misconception addressed: Putting all environments in one undifferentiated folder
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Structuring repos for environments | 80 | 6 |
| M04L02 | The app-of-apps pattern | 80 | 6 |

### M05 Rollouts, health and drift remediation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read health and sync status to diagnose a failed deploy; (2) Enable self-heal to revert manual drift
- Common misconception addressed: Disabling self-heal and wondering why drift persists
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Health assessment and sync status | 80 | 6 |
| M05L02 | Self-healing and progressive delivery | 80 | 6 |

### M06 Security, RBAC and multi-cluster (MASTEMY-DESIGN 18%)

- Worked applications: (1) Restrict a team to one project with RBAC; (2) Register and target a second cluster
- Common misconception addressed: Giving every user full admin in Argo CD
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Argo CD RBAC and projects | 80 | 6 |
| M06L02 | Managing multiple clusters and secrets | 80 | 6 |

## Integrative case

Adopt GitOps for a Kubernetes app with Argo CD: put the desired state in Git as the source of truth, define Applications declaratively with sync waves, structure the repo for staging and production using app-of-apps, enable self-heal so manual drift is reverted, diagnose a failed sync from health status, and lock down access with projects and RBAC across two clusters.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1585-final-protected | 30 | 30 | yes |
| MST-1585-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GitOps principles | 5 |
| Argo CD architecture and concepts | 5 |
| Declarative apps and sync | 5 |
| Repository structure and app-of-apps | 5 |
| Rollouts, health and drift remediation | 5 |
| Security, RBAC and multi-cluster | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1585-Q0001** (single-answer, Select ONE) In GitOps with Argo CD, where is the desired state of the system defined?

- A. In a Git repository, which Argo CD continuously reconciles against the cluster **(key)**  
  _Rationale:_ Correct: Git is the single source of truth and Argo CD pulls and reconciles it.
- B. Only in the live cluster, edited directly with kubectl  
  _Rationale:_ Direct cluster edits are drift; Git is the source of truth in GitOps.
- C. In Argo CD's memory only, never persisted  
  _Rationale:_ Desired state is persisted in Git, not just in memory.
- D. In a spreadsheet maintained by the operations team  
  _Rationale:_ A spreadsheet is not a reconciled source of truth.

**MST-1585-Q0002** (multiple-answer, Select ALL that apply) Which two behaviours does Argo CD's self-healing / reconciliation provide? (Select TWO)

- A. It detects when the cluster drifts from the desired state in Git **(key)**  
  _Rationale:_ Correct: continuous comparison detects drift.
- B. It can automatically revert manual changes back to the Git-defined state **(key)**  
  _Rationale:_ Correct: with self-heal enabled, drift is corrected back to desired state.
- C. It deletes the Git repository after each sync  
  _Rationale:_ Argo CD relies on the repo; it does not delete it.
- D. It randomly changes the desired state on its own  
  _Rationale:_ Argo CD applies the declared state, it does not invent changes.

**MST-1585-Q0003** (single-answer, Select ONE) What is the purpose of the app-of-apps pattern in Argo CD?

- A. A parent Application manages a set of child Applications declaratively **(key)**  
  _Rationale:_ Correct: app-of-apps lets one Application bootstrap and manage many others from Git.
- B. It merges all microservices into a single container  
  _Rationale:_ It manages Applications, not container packaging.
- C. It disables GitOps for child applications  
  _Rationale:_ Children are still managed via GitOps.
- D. It stores secrets in plaintext by default  
  _Rationale:_ The pattern is about structure, not secret handling.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
