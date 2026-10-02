# Certified Kubernetes Security Specialist (CKS) Knowledge Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1515` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation / CNCF (no affiliation or endorsement) |
| Exam code | CKS |
| Version basis | unresolved (unconfirmed) |
| Evidence | **unverified-needs-official-check** - official outline not fetched (egress blocked); no source IDs |
| Legacy IDs | MST-PRG-LF-CKS-001 |
| Planned time | T = 3000 min; instruction I = 2400 min (80%); assessment A = 600 min (20%) |
| Assessment split | lesson checks 150 / module checks 210 / cumulative 240 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Demonstrate knowledge of the 'Cluster Setup' domain to the depth required for independent exam preparation
2. Demonstrate knowledge of the 'Cluster Hardening' domain to the depth required for independent exam preparation
3. Demonstrate knowledge of the 'System Hardening' domain to the depth required for independent exam preparation
4. Demonstrate knowledge of the 'Minimize Microservice Vulnerabilities' domain to the depth required for independent exam preparation
5. Demonstrate knowledge of the 'Supply Chain Security' domain to the depth required for independent exam preparation
6. Demonstrate knowledge of the 'Monitoring, Logging and Runtime Security' domain to the depth required for independent exam preparation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope (design-assumption) outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on, performance-based or other official item formats are not reproduced in this format.

> Domain structure below is a **design assumption** drafted from general knowledge of this credential. It was **not** verified against the issuer's official exam outline (egress blocked). Domain names, weights, question counts and durations must be confirmed before production.

## Modules

### M01 Cluster Setup (weight: design assumption - confirm against official outline)

- Worked applications: (1) Run kube-bench against a cluster and remediate two failing CIS controls; (2) Configure an Ingress with a TLS certificate and verify plaintext access is refused
- Common misconception addressed: Assuming kube-bench findings auto-remediate rather than only reporting against CIS controls
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Use NetworkPolicies to restrict cluster-level access | 105 | 6 |
| M01L02 | Use CIS benchmarks to review security configuration (kube-bench) | 105 | 6 |
| M01L03 | Properly set up Ingress with TLS | 105 | 6 |
| M01L04 | Protect node metadata and endpoints | 105 | 6 |

### M02 Cluster Hardening (weight: design assumption - confirm against official outline)

- Worked applications: (1) Design a least-privilege Role and RoleBinding for a CI ServiceAccount scoped to one namespace; (2) Disable automounting of the default ServiceAccount token on a workload
- Common misconception addressed: Granting cluster-admin to a ServiceAccount 'temporarily' and assuming it is low risk
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Restrict access to the Kubernetes API | 105 | 6 |
| M02L02 | Use RBAC to minimise exposure | 105 | 6 |
| M02L03 | Exercise caution in using ServiceAccounts | 105 | 6 |
| M02L04 | Update Kubernetes frequently | 105 | 6 |

### M03 System Hardening (weight: design assumption - confirm against official outline)

- Worked applications: (1) Apply a seccomp RuntimeDefault profile to a Pod and confirm blocked syscalls; (2) Load and attach an AppArmor profile that confines a container's file writes
- Common misconception addressed: Believing seccomp and AppArmor are interchangeable rather than complementary controls
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Minimise host OS footprint and reduce attack surface | 104 | 6 |
| M03L02 | Minimise IAM roles and use least privilege | 104 | 6 |
| M03L03 | Use kernel hardening tools such as seccomp and AppArmor | 104 | 6 |

### M04 Minimize Microservice Vulnerabilities (weight: design assumption - confirm against official outline)

- Worked applications: (1) Enforce the 'restricted' Pod Security Standard on a namespace and fix a non-compliant Pod; (2) Schedule a workload onto a gVisor (RuntimeClass) sandbox and verify isolation
- Common misconception addressed: Assuming a service mesh provides mTLS without enabling strict mode
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Use appropriate Pod Security Standards and admission control | 104 | 6 |
| M04L02 | Manage Kubernetes Secrets securely | 104 | 6 |
| M04L03 | Use container runtime sandboxes (gVisor, Kata Containers) | 104 | 6 |
| M04L04 | Implement Pod-to-Pod encryption with mTLS | 104 | 6 |

### M05 Supply Chain Security (weight: design assumption - confirm against official outline)

- Worked applications: (1) Configure an admission policy that only allows images from a trusted registry; (2) Scan an image with Trivy and fail a pipeline on a critical CVE
- Common misconception addressed: Treating a passing image scan at build time as a guarantee for the running container forever
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Minimise base image footprint | 104 | 6 |
| M05L02 | Secure the supply chain: whitelist allowed registries and sign images | 104 | 6 |
| M05L03 | Use static analysis of user workloads and images | 104 | 6 |
| M05L04 | Scan images for known vulnerabilities (Trivy) | 104 | 6 |

### M06 Monitoring, Logging and Runtime Security (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write a Falco rule that alerts on a shell spawned inside a container; (2) Enable Kubernetes audit logging and trace a suspicious API call
- Common misconception addressed: Expecting immutable containers to prevent writes to mounted volumes
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Perform behavioural analytics to detect malicious activity (Falco) | 104 | 6 |
| M06L02 | Detect threats across the environment | 104 | 6 |
| M06L03 | Ensure immutability of containers at runtime | 104 | 6 |
| M06L04 | Use audit logs to monitor access | 104 | 6 |

## Integrative case

A security specialist hardens a production cluster end to end: tighten the API and RBAC, enforce Pod Security and NetworkPolicies, sandbox a sensitive workload, lock the image supply chain to a signed registry, and stand up Falco and audit logging, then present the control set against CIS benchmarks.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam outline not fetched (egress blocked); question count, duration and domain weights are unconfirmed. Confirm on the issuer's official exam page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1515-practice-form-A | 80 | 80 | yes |
| MST-1515-practice-form-B | 80 | 80 | no (optional practice) |
| MST-1515-practice-form-C | 80 | 80 | no (optional practice) |
| MST-1515-final-protected | 80 | 80 | yes |

| Domain | Items per form |
|---|---|
| Cluster Setup | 14 |
| Cluster Hardening | 14 |
| System Hardening | 13 |
| Minimize Microservice Vulnerabilities | 13 |
| Supply Chain Security | 13 |
| Monitoring, Logging and Runtime Security | 13 |

Minimum reviewed item bank: 1016 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1515-Q0001** (single-answer, Select ONE) A CI ServiceAccount only needs to read Pods in one namespace. Which approach follows least privilege?

- A. A Role granting get/list on pods, bound with a RoleBinding in that namespace **(key)**  
  _Rationale:_ Correct: a namespaced Role with only the needed verbs, bound via RoleBinding, is least privilege.
- B. A ClusterRole granting cluster-admin bound cluster-wide  
  _Rationale:_ cluster-admin grossly over-grants and violates least privilege.
- C. Mounting the default ServiceAccount token everywhere  
  _Rationale:_ That expands exposure rather than restricting it.
- D. Disabling RBAC for the namespace  
  _Rationale:_ Disabling RBAC removes authorization controls entirely.

**MST-1515-Q0002** (single-answer, Select ONE) Which control provides the strongest workload isolation by running containers in a user-space kernel sandbox?

- A. gVisor via a RuntimeClass **(key)**  
  _Rationale:_ Correct: gVisor intercepts syscalls in a user-space kernel, giving stronger isolation than shared-kernel containers.
- B. A readiness probe  
  _Rationale:_ Probes check health and have no isolation function.
- C. A ConfigMap  
  _Rationale:_ ConfigMaps hold configuration data, not isolation.
- D. A higher replica count  
  _Rationale:_ Scaling replicas does not isolate a workload from the host kernel.

**MST-1515-Q0003** (multiple-answer, Select TWO) Which TWO practices strengthen the container image supply chain? (Select TWO.)

- A. Scanning images for known CVEs before deployment **(key)**  
  _Rationale:_ Correct: scanning catches known vulnerabilities before they ship.
- B. Restricting clusters to pull only from a signed, trusted registry **(key)**  
  _Rationale:_ Correct: an allowlist of signed registries blocks untrusted images.
- C. Granting every ServiceAccount cluster-admin  
  _Rationale:_ That weakens security and is unrelated to image supply chain.
- D. Disabling audit logging to reduce noise  
  _Rationale:_ Disabling audit logging reduces detection, it does not secure the supply chain.
- E. Always using the latest tag so images auto-update  
  _Rationale:_ The latest tag is non-deterministic and undermines supply-chain integrity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
