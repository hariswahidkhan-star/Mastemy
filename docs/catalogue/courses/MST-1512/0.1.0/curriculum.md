# Kubernetes and Cloud Native Security Associate (KCSA) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1512` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation / CNCF (no affiliation or endorsement) |
| Exam code | KCSA |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | MST-PRG-LF-KCSA-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe cloud native and Kubernetes security fundamentals
2. Describe cluster and workload hardening concepts
3. Describe supply-chain and runtime security concepts
4. Describe compliance, threat models and the security ecosystem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Cloud native security fundamentals (not published - design grouping)

- Worked applications: (1) Map the 4Cs of cloud native security to a deployment; (2) Identify the main control-plane trust boundary
- Common misconception addressed: Assuming a cluster is secure by default without RBAC or policy
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The 4Cs of cloud native security | 100 | 6 |
| M01L02 | Kubernetes security architecture | 100 | 6 |
| M01L03 | Authentication, authorization and RBAC | 100 | 6 |
| M01L04 | API server and control-plane security | 100 | 6 |

### M02 Cluster and workload hardening (not published - design grouping)

- Worked applications: (1) Choose a NetworkPolicy to isolate a namespace; (2) Select securityContext settings to reduce privilege
- Common misconception addressed: Believing NetworkPolicies work without a supporting CNI
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Network policy and segmentation | 100 | 6 |
| M02L02 | Pod and container security contexts | 100 | 6 |
| M02L03 | Secrets management basics | 100 | 6 |
| M02L04 | Admission control and policy | 100 | 6 |

### M03 Supply-chain, runtime and compliance (not published - design grouping)

- Worked applications: (1) List supply-chain checks for a container image; (2) Map a finding to a cloud native threat model
- Common misconception addressed: Treating image scanning as full runtime protection
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Supply-chain security and image provenance | 100 | 6 |
| M03L02 | Runtime security and detection | 100 | 6 |
| M03L03 | Audit logging and observability for security | 100 | 6 |
| M03L04 | Compliance frameworks and threat modelling | 100 | 6 |

## Integrative case

A learner preparing for KCSA reviews a cluster's security posture: apply the 4Cs, tighten RBAC and network policy, address supply-chain and runtime risks, and map the result to a cloud native threat model.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1512-practice-form-A | 45 | 45 | yes |
| MST-1512-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1512-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1512-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Cloud native security fundamentals | 15 |
| Cluster and workload hardening | 15 |
| Supply-chain, runtime and compliance | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1512-Q0001** (single-answer, Select ONE) Which mechanism authorizes what an authenticated subject may do in a Kubernetes cluster?

- A. Role-Based Access Control (RBAC) **(key)**  
  _Rationale:_ Correct: RBAC binds subjects to roles that grant specific permissions.
- B. A readiness probe  
  _Rationale:_ Readiness probes signal traffic-readiness, not authorization.
- C. A ResourceQuota  
  _Rationale:_ ResourceQuota limits resource usage, not permitted actions.
- D. A horizontal Pod autoscaler  
  _Rationale:_ Autoscalers adjust replica counts, not authorization.

**MST-1512-Q0002** (single-answer, Select ONE) What do the 4Cs of cloud native security refer to?

- A. Cloud, Cluster, Container and Code layers of security **(key)**  
  _Rationale:_ Correct: the 4Cs describe nested security layers from cloud down to code.
- B. Four cloud providers you must use  
  _Rationale:_ The 4Cs are security layers, not providers.
- C. Four container runtimes required by Kubernetes  
  _Rationale:_ The 4Cs are not runtimes.
- D. Four compliance auditors  
  _Rationale:_ The 4Cs are layers, not auditors.

**MST-1512-Q0003** (multiple-answer, Select TWO) Select TWO practices that improve container supply-chain security.

- A. Signing and verifying container images **(key)**  
  _Rationale:_ Correct: signing and verification establish image provenance and integrity.
- B. Scanning images for known vulnerabilities before deployment **(key)**  
  _Rationale:_ Correct: scanning catches known vulnerable components early.
- C. Running all containers as root  
  _Rationale:_ Running as root increases risk.
- D. Disabling audit logging  
  _Rationale:_ Disabling audit logging reduces security visibility.
- E. Pulling images only from untrusted public sources  
  _Rationale:_ Untrusted sources increase supply-chain risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
