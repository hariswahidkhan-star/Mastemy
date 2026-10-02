# Google Cloud Professional Cloud Architect

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0218` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: Professional Cloud Architect (assumed designation) (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official Google Cloud exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | MST-GCP-GCP-PCA-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design and plan a cloud solution architecture on Google Cloud
2. Manage, provision and secure solution infrastructure
3. Optimise processes and ensure reliable operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Designing and Planning a Cloud Solution Architecture (design assumption - weight not verified)

- Worked applications: (1) Translate business requirements into a reference architecture; (2) Choose between GKE, Cloud Run and GCE for a workload
- Common misconception addressed: Over-provisioning compute instead of using managed scaling
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Business and technical requirements | 320 | 6 |
| M01L02 | Network, storage and compute design | 320 | 6 |

### M02 Managing and Provisioning Infrastructure (design assumption - weight not verified)

- Worked applications: (1) Define a project/folder/org resource hierarchy; (2) Provision an environment with Deployment Manager or Terraform
- Common misconception addressed: Treating a project as merely a billing label
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Infrastructure as code and deployment | 320 | 6 |
| M02L02 | Resource hierarchy and provisioning | 320 | 6 |

### M03 Designing for Security and Compliance (design assumption - weight not verified)

- Worked applications: (1) Design IAM roles for a three-team workload; (2) Select encryption and key-management for regulated data
- Common misconception addressed: Granting broad primitive roles instead of predefined roles
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IAM, least privilege and data protection | 320 | 6 |
| M03L02 | Compliance, logging and controls | 320 | 6 |

### M04 Analysing and Optimising Processes (design assumption - weight not verified)

- Worked applications: (1) Right-size and recommend committed-use discounts; (2) Map a business process to a managed-service pipeline
- Common misconception addressed: Optimising cost without accounting for reliability targets
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cost, capacity and process optimisation | 320 | 6 |

### M05 Managing Implementations (design assumption - weight not verified)

- Worked applications: (1) Design a CI/CD pipeline to Cloud Run; (2) Plan a phased migration cutover
- Common misconception addressed: Deploying directly to production without a staging path
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Deployment pipelines and developer tooling | 320 | 6 |

### M06 Ensuring Reliability (design assumption - weight not verified)

- Worked applications: (1) Define SLIs, SLOs and an error budget for a service; (2) Design a multi-region failover plan
- Common misconception addressed: Confusing an SLA with an internal SLO
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | SRE practice, SLOs and monitoring | 320 | 6 |

## Integrative case

A retailer migrates a monolith to Google Cloud; the candidate designs the architecture, selects managed services, builds security and compliance controls, and defines SLOs and a reliability plan.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0218-practice-form-A | 108 | 108 | yes |
| MST-0218-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0218-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0218-final-protected | 108 | 108 | yes |

| Domain | Items (practice form A) |
|---|---|
| Designing and Planning a Cloud Solution Architecture | 18 |
| Managing and Provisioning Infrastructure | 18 |
| Designing for Security and Compliance | 18 |
| Analysing and Optimising Processes | 18 |
| Managing Implementations | 18 |
| Ensuring Reliability | 18 |

Minimum reviewed item bank: 1044 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0218-Q0001** (single-answer, Select ONE) A workload needs to run stateless containers with automatic scaling to zero and no cluster management. Which service fits best?

- A. Compute Engine managed instance group  
  _Rationale:_ That still requires VM and scaling management and does not scale to zero cleanly.
- B. Cloud Run **(key)**  
  _Rationale:_ Correct: Cloud Run runs stateless containers, scales to zero and needs no cluster management.
- C. Google Kubernetes Engine Standard  
  _Rationale:_ GKE Standard requires managing the cluster.
- D. Cloud Storage  
  _Rationale:_ Cloud Storage is object storage, not a compute service.

**MST-0218-Q0002** (single-answer, Select ONE) To grant least-privilege access, you should prefer:

- A. Predefined or custom IAM roles scoped to the needed permissions **(key)**  
  _Rationale:_ Correct: predefined/custom roles support least privilege.
- B. The primitive Owner role for all users  
  _Rationale:_ Owner is overly broad and violates least privilege.
- C. Sharing one service account key with everyone  
  _Rationale:_ That is insecure and over-permissioned.
- D. Disabling IAM entirely  
  _Rationale:_ IAM cannot be disabled and is required for access control.

**MST-0218-Q0003** (multiple-answer, Select TWO) Select TWO practices that improve a service's reliability per Google SRE principles.

- A. Define SLOs and track an error budget **(key)**  
  _Rationale:_ Correct: SLOs and error budgets are core SRE practices.
- B. Remove all monitoring to reduce noise  
  _Rationale:_ Removing monitoring harms reliability.
- C. Design multi-zone or multi-region redundancy **(key)**  
  _Rationale:_ Correct: redundancy across zones/regions improves availability.
- D. Deploy straight to production without rollback  
  _Rationale:_ That increases risk, not reliability.
- E. Treat an SLA as identical to an internal SLO  
  _Rationale:_ SLA and SLO are distinct.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
