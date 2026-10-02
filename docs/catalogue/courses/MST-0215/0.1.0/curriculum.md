# Google Cloud Associate Cloud Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0215` v0.1.0 | Batch 8 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | Associate Cloud Engineer (Google Cloud uses the descriptive title; no short exam code published) |
| Version basis | Associate Cloud Engineer Certification Exam Guide (accessed 2026-10-02) |
| Evidence | **verified-official-source** - sources: SRC-GCP-ACE |
| Legacy IDs | MST-GCP-GCP-ACE-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a cloud solution environment, projects and access
2. Plan and configure a cloud solution's compute, storage and network resources
3. Deploy and implement compute, data and networking resources
4. Ensure successful operation of a cloud solution and configure access and security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Setting up a cloud solution environment (official section (no published weight))

- Worked applications: (1) Build a resource hierarchy with folders and projects; (2) Grant IAM roles following least privilege
- Common misconception addressed: Granting broad Owner roles instead of granular roles
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Projects, billing and the resource hierarchy | 270 | 6 |
| M01L02 | IAM, service accounts and APIs | 270 | 6 |

### M02 Planning and configuring a cloud solution (official section (no published weight))

- Worked applications: (1) Size compute and choose a machine type for a workload; (2) Plan storage and database options for an app
- Common misconception addressed: Choosing a managed service without considering cost and quota
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Planning compute resources | 270 | 6 |
| M02L02 | Planning storage, data and network resources | 270 | 6 |

### M03 Deploying and implementing a cloud solution (official section (no published weight))

- Worked applications: (1) Deploy a containerized app to GKE; (2) Configure a load balancer and autoscaling
- Common misconception addressed: Assuming a deployment is complete without configuring networking
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Deploying compute: Compute Engine, GKE and serverless | 270 | 6 |
| M03L02 | Deploying storage, data and networking | 270 | 6 |

### M04 Ensuring operation, access and security (official section (no published weight))

- Worked applications: (1) Set up Cloud Monitoring alerts for a service; (2) Audit and tighten IAM access for a project
- Common misconception addressed: Treating monitoring as optional until an outage occurs
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Operations: monitoring, logging and management | 270 | 6 |
| M04L02 | Configuring access and security | 270 | 6 |

## Integrative case

An engineer stands up a new project for a web app on Google Cloud: builds the resource hierarchy and IAM, provisions compute and storage, deploys a containerized service on GKE, and sets up monitoring and least-privilege access.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - confirm official question count and duration on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0215-practice-form-A | 81 | 81 | yes |
| MST-0215-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0215-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0215-final-protected | 81 | 81 | yes |

| Domain | Items per form |
|---|---|
| Setting up a cloud solution environment | 21 |
| Planning and configuring a cloud solution | 20 |
| Deploying and implementing a cloud solution | 20 |
| Ensuring operation, access and security | 20 |

Minimum reviewed item bank: 798 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0215-Q0001** (single-answer, Select ONE) Which Google Cloud resource sits above projects and lets you apply IAM policies and organization policies to groups of projects?

- A. A region  
  _Rationale:_ A region is a geographic location, not a policy scope.
- B. A folder in the resource hierarchy **(key)**  
  _Rationale:_ Correct: folders group projects and allow IAM and org policies to be applied and inherited.
- C. A VPC network  
  _Rationale:_ A VPC is a networking construct, not a policy-grouping layer above projects.
- D. A Compute Engine instance  
  _Rationale:_ An instance is a single VM, not a grouping layer.

**MST-0215-Q0002** (single-answer, Select ONE) You need to run a containerized microservice with automatic scaling and managed Kubernetes. Which service fits best?

- A. Cloud Storage  
  _Rationale:_ Cloud Storage is object storage, not a container runtime.
- B. Google Kubernetes Engine (GKE) **(key)**  
  _Rationale:_ Correct: GKE provides managed Kubernetes with autoscaling for containerized workloads.
- C. Cloud SQL  
  _Rationale:_ Cloud SQL is a managed relational database.
- D. Cloud DNS  
  _Rationale:_ Cloud DNS provides name resolution, not container hosting.

**MST-0215-Q0003** (multiple-answer, Select TWO) Which TWO practices support least-privilege access in a Google Cloud project? (Select TWO)

- A. Granting predefined or custom roles scoped to needed permissions **(key)**  
  _Rationale:_ Correct: granular predefined/custom roles support least privilege.
- B. Using service accounts with only the permissions a workload needs **(key)**  
  _Rationale:_ Correct: narrowly scoped service accounts follow least privilege.
- C. Giving every user the Owner role  
  _Rationale:_ Owner is overly broad and violates least privilege.
- D. Sharing a single admin login among the team  
  _Rationale:_ Shared logins break accountability and least privilege.
- E. Disabling IAM entirely  
  _Rationale:_ IAM cannot be disabled and is required for access control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
