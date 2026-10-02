# Linux Foundation CKS: Knowledge and Demonstration Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0273` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation (no affiliation or endorsement) |
| Exam code | not resolved |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | - |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Harden Kubernetes cluster setup and configuration
2. Harden the cluster and underlying system
3. Minimise microservice vulnerabilities
4. Secure the supply chain and apply runtime monitoring, logging and security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Official exam is performance-based (hands-on); Mastemy offers knowledge preparation and video demonstrations only.
- Does not assess: DESIGN ASSUMPTION: the official exam includes hands-on / performance-based tasks that MCQ/MR cannot reproduce; this knowledge-practice package does not assess command-line or lab performance.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Cluster Setup and Hardening (weight: design assumption, unverified)

- Worked applications: (1) Apply a default-deny NetworkPolicy then allow only required flows; (2) Review a cluster against CIS benchmark findings and remediate two
- Common misconception addressed: Leaving the Kubernetes dashboard or API exposed without authn/authz
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Network policies and CIS benchmarks | 120 | 6 |
| M01L02 | Ingress TLS and API server security | 120 | 6 |
| M01L03 | Securing cluster components and etcd | 120 | 6 |

### M02 System Hardening (weight: design assumption, unverified)

- Worked applications: (1) Apply a seccomp profile that blocks unneeded syscalls for a workload; (2) Reduce a node's attack surface by removing unneeded packages and services
- Common misconception addressed: Running workloads as privileged to avoid troubleshooting permission errors
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Minimise host OS footprint and privileges | 120 | 6 |
| M02L02 | Kernel hardening: seccomp, AppArmor | 120 | 6 |
| M02L03 | Restrict network and user access | 120 | 6 |

### M03 Minimise Microservice Vulnerabilities (weight: design assumption, unverified)

- Worked applications: (1) Write an admission policy that rejects pods running as root; (2) Rotate a leaked Secret and enforce mTLS between two services
- Common misconception addressed: Relying on Pod Security alone without admission policy enforcement
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SecurityContext, Pod Security and admission control | 120 | 6 |
| M03L02 | Secrets management and mTLS | 120 | 6 |
| M03L03 | OPA/Gatekeeper and policy enforcement | 120 | 6 |

### M04 Supply Chain and Runtime Security (weight: design assumption, unverified)

- Worked applications: (1) Add image scanning and signature verification to an admission gate; (2) Configure runtime detection to alert on a shell spawned in a container
- Common misconception addressed: Trusting an image tag as immutable instead of pinning a digest
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Image scanning and signing | 120 | 6 |
| M04L02 | Minimal and trusted base images | 120 | 6 |
| M04L03 | Runtime detection, logging and auditing | 120 | 6 |

## Integrative case

A security engineer hardens a production Kubernetes platform: enforce default-deny networking and Pod Security, harden nodes with seccomp, gate deployments with image signing and admission policy, and enable runtime detection; defend each control against a stated threat.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0273-practice-form-A | 57 | 57 | yes |
| MST-0273-practice-form-B | 57 | 57 | no (optional practice) |
| MST-0273-practice-form-C | 57 | 57 | no (optional practice) |
| MST-0273-final-protected | 57 | 57 | yes |

| Domain | Items per form |
|---|---|
| Cluster Setup and Hardening | 15 |
| System Hardening | 14 |
| Minimise Microservice Vulnerabilities | 14 |
| Supply Chain and Runtime Security | 14 |

Minimum reviewed item bank: 624 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0273-Q0001** (single-answer, Select ONE) To limit pod-to-pod traffic to only what is required, what should you apply first?

- A. A default-deny NetworkPolicy, then allow required flows **(key)**  
  _Rationale:_ Correct: default-deny then explicit allow enforces least privilege.
- B. A LoadBalancer service for every pod  
  _Rationale:_ Exposing pods widely increases, not reduces, risk.
- C. Cluster-admin for all service accounts  
  _Rationale:_ Broad privileges weaken security posture.
- D. Disabling the API server audit log  
  _Rationale:_ Disabling auditing reduces visibility, not exposure.

**MST-0273-Q0002** (single-answer, Select ONE) Which approach best ensures only trusted images run in the cluster?

- A. Admission control that verifies image signatures/digests **(key)**  
  _Rationale:_ Correct: admission-time verification blocks untrusted images.
- B. Trusting the 'latest' tag as immutable  
  _Rationale:_ Tags are mutable; 'latest' can change under you.
- C. Allowing any image from any registry  
  _Rationale:_ Unrestricted registries invite untrusted images.
- D. Running everything as root  
  _Rationale:_ Running as root worsens, not improves, security.

**MST-0273-Q0003** (multiple-answer, Select TWO) Which TWO reduce a node's attack surface? (Select TWO)

- A. Remove unneeded packages and services **(key)**  
  _Rationale:_ Correct: fewer installed services means fewer vulnerabilities.
- B. Apply a seccomp profile to restrict syscalls **(key)**  
  _Rationale:_ Correct: seccomp limits the syscalls a workload can make.
- C. Run all workloads as privileged  
  _Rationale:_ Privileged workloads expand the attack surface.
- D. Open all firewall ports for convenience  
  _Rationale:_ Opening all ports maximises exposure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
