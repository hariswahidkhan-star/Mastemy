# Google Cloud Essentials for Beginners

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1452` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-CORE (https://cloud.google.com/docs/overview; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Essentials for Beginners (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate the Google Cloud console, projects and billing
2. Explain core compute, storage, networking and database services
3. Apply the IAM model of principals, roles and resource hierarchy
4. Deploy a simple application and connect basic services
5. Apply baseline security and cost-awareness practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Getting started (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a project and link a billing account; (2) Set a budget with an alert
- Common misconception addressed: Confusing a project with a billing account
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Console, projects and the resource hierarchy | 72 | 5 |
| M01L02 | Billing accounts and budgets | 72 | 5 |

### M02 Core services (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick a compute option for a simple web app; (2) Store and share a file in Cloud Storage
- Common misconception addressed: Assuming one compute service fits every workload
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Compute and storage options | 72 | 5 |
| M02L02 | Networking and databases at a glance | 72 | 5 |

### M03 Identity and access (MASTEMY-DESIGN 25%)

- Worked applications: (1) Grant a teammate a predefined least-privilege role; (2) Create a service account for an app
- Common misconception addressed: Granting Owner when a narrow role would do
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Principals, roles and policies | 72 | 5 |
| M03L02 | Least privilege and service accounts | 72 | 5 |

### M04 Deploy and secure (MASTEMY-DESIGN 25%)

- Worked applications: (1) Deploy a simple app and reach it in a browser; (2) Apply a baseline security and cost checklist
- Common misconception addressed: Leaving default broad access in place after deployment
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Deploying a first application | 72 | 5 |
| M04L02 | Baseline security and cost habits | 72 | 5 |

## Integrative case

A newcomer sets up a first Google Cloud project for a small web app: organize the project and billing, grant a teammate least-privilege access, deploy a simple service, store files in Cloud Storage, and set a budget alert.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1452-final-protected | 40 | 50 | yes |
| MST-1452-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started | 10 |
| Core services | 10 |
| Identity and access | 10 |
| Deploy and secure | 10 |

Minimum reviewed item bank: 260 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1452-Q0001** (single-answer, Select ONE) A new teammate needs to view resources in a project but should not change them. Following least privilege, what do you grant?

- A. A predefined Viewer role scoped to the project **(key)**  
  _Rationale:_ Correct: Viewer grants read access without change rights, scoped appropriately.
- B. The Owner role  
  _Rationale:_ Owner far exceeds read-only needs.
- C. The Editor role  
  _Rationale:_ Editor allows changes the teammate should not make.
- D. No role; share your own credentials  
  _Rationale:_ Credential sharing breaks accountability and security.

**MST-1452-Q0002** (multiple-answer, Select TWO) Which TWO statements about the Google Cloud resource hierarchy are correct? (Select TWO.)

- A. Resources live inside projects **(key)**  
  _Rationale:_ Correct: projects are the basic container for resources.
- B. IAM policies can be set at project level and inherited **(key)**  
  _Rationale:_ Correct: policies set higher in the hierarchy are inherited downward.
- C. A billing account is the same thing as a project  
  _Rationale:_ Billing accounts and projects are distinct.
- D. Projects cannot have IAM policies  
  _Rationale:_ Projects are a primary place to set IAM policies.

**MST-1452-Q0003** (single-answer, Select ONE) You want to be warned before a small project's spend exceeds a set amount. What should you configure?

- A. A budget with threshold alerts **(key)**  
  _Rationale:_ Correct: budgets with alerts notify you as spend approaches a limit.
- B. A larger machine type  
  _Rationale:_ Machine size does not warn about spend.
- C. A second billing account  
  _Rationale:_ Adding accounts does not create spend alerts.
- D. Nothing; billing stops automatically at a limit  
  _Rationale:_ Budgets alert but do not automatically stop all spend.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
