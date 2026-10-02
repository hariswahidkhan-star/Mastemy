# Linux Foundation KCSA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0275` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe cloud native and Kubernetes security fundamentals
2. Describe Kubernetes cluster and workload hardening
3. Describe platform, supply-chain and runtime security concepts
4. Describe cloud native security compliance and threat models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Cloud native security fundamentals (not published - design grouping)

- Worked applications: (1) Map the 4Cs of cloud native security to a sample deployment; (2) Identify the trust boundary between control plane and workloads
- Common misconception addressed: Assuming a private cluster is secure by default without RBAC or network policy
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The 4Cs of cloud native security | 100 | 6 |
| M01L02 | Kubernetes security architecture and trust boundaries | 100 | 6 |
| M01L03 | Authentication, authorization and RBAC | 100 | 6 |
| M01L04 | API server and control-plane security | 100 | 6 |

### M02 Cluster and workload hardening (not published - design grouping)

- Worked applications: (1) Write a NetworkPolicy to isolate a namespace; (2) Choose securityContext settings to drop container privileges
- Common misconception addressed: Believing NetworkPolicies are enforced without a supporting CNI plugin
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Network policy and segmentation | 100 | 6 |
| M02L02 | Pod and container security contexts | 100 | 6 |
| M02L03 | Secrets management and encryption at rest | 100 | 6 |
| M02L04 | Admission control and policy enforcement | 100 | 6 |

### M03 Platform, supply-chain and runtime security (not published - design grouping)

- Worked applications: (1) Trace a container image from build to run and list supply-chain checks; (2) Classify three findings against a cloud native threat model
- Common misconception addressed: Treating image scanning alone as sufficient runtime protection
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Supply-chain security and image provenance | 100 | 6 |
| M03L02 | Runtime security and detection | 100 | 6 |
| M03L03 | Observability and audit logging for security | 100 | 6 |
| M03L04 | Compliance frameworks and threat modelling | 100 | 6 |

## Integrative case

A platform team reviews a new Kubernetes cluster for security: tighten RBAC and the API server, apply workload and network controls, address supply-chain and runtime risks, and map the result to a recognised threat model.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0275-practice-form-A | 45 | 45 | yes |
| MST-0275-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0275-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0275-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Cloud native security fundamentals | 15 |
| Cluster and workload hardening | 15 |
| Platform, supply-chain and runtime security | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0275-Q0001** (single-answer, Select ONE) In Kubernetes, which mechanism decides what actions an authenticated user or service account may perform?

- A. Role-Based Access Control (RBAC) **(key)**  
  _Rationale:_ Correct: RBAC authorizes actions by binding subjects to roles with specific permissions.
- B. A NetworkPolicy  
  _Rationale:_ NetworkPolicy controls network traffic between Pods, not API authorization.
- C. A ResourceQuota  
  _Rationale:_ ResourceQuota limits resource consumption, not permitted actions.
- D. A readiness probe  
  _Rationale:_ Readiness probes signal when a Pod can serve traffic; they do not authorize actions.

**MST-0275-Q0002** (single-answer, Select ONE) What is the main purpose of a Kubernetes NetworkPolicy?

- A. Restrict which Pods can communicate with each other and with external endpoints **(key)**  
  _Rationale:_ Correct: NetworkPolicies define allowed ingress and egress for selected Pods.
- B. Encrypt data stored in etcd  
  _Rationale:_ Encryption at rest for etcd is configured separately, not via NetworkPolicy.
- C. Scan container images for vulnerabilities  
  _Rationale:_ Image scanning is a supply-chain control, not a NetworkPolicy function.
- D. Grant API permissions to service accounts  
  _Rationale:_ API permissions are granted through RBAC, not NetworkPolicy.

**MST-0275-Q0003** (multiple-answer, Select TWO) Select TWO practices that strengthen container supply-chain security.

- A. Signing and verifying container images **(key)**  
  _Rationale:_ Correct: image signing and verification establish provenance and integrity.
- B. Scanning images for known vulnerabilities before deployment **(key)**  
  _Rationale:_ Correct: pre-deployment scanning catches known vulnerable components.
- C. Running every container as the root user  
  _Rationale:_ Running as root increases risk and weakens, not strengthens, security.
- D. Disabling all audit logging  
  _Rationale:_ Disabling audit logging reduces visibility and weakens security.
- E. Granting cluster-admin to all service accounts  
  _Rationale:_ Over-privileged service accounts expand the attack surface.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
