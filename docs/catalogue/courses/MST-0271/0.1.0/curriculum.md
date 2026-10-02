# Linux Foundation CKA: Knowledge and Demonstration Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0271` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

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

1. Explain and manage Kubernetes cluster architecture, installation and configuration
2. Schedule and manage workloads
3. Configure services and cluster networking
4. Configure storage and troubleshoot cluster and application failures

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Official exam is performance-based (hands-on); Mastemy offers knowledge preparation and video demonstrations only.
- Does not assess: DESIGN ASSUMPTION: the official exam includes hands-on / performance-based tasks that MCQ/MR cannot reproduce; this knowledge-practice package does not assess command-line or lab performance.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Cluster Architecture, Installation and Configuration (weight: design assumption, unverified)

- Worked applications: (1) Design an RBAC role and binding granting least privilege to a namespace; (2) Outline an etcd backup-and-restore procedure for a control-plane failure
- Common misconception addressed: Granting cluster-admin when a namespace-scoped role would suffice
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Control-plane and node components | 120 | 6 |
| M01L02 | RBAC and cluster access | 120 | 6 |
| M01L03 | Cluster lifecycle: install, upgrade, backup/restore | 120 | 6 |

### M02 Workloads and Scheduling (weight: design assumption, unverified)

- Worked applications: (1) Perform a rolling update and roll it back after a failed readiness probe; (2) Use taints and tolerations to reserve a node pool for a workload
- Common misconception addressed: Confusing resource requests (scheduling) with limits (enforcement)
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deployments, rollouts and rollbacks | 120 | 6 |
| M02L02 | Scheduling: requests, limits, taints and affinity | 120 | 6 |
| M02L03 | ConfigMaps, Secrets and self-healing | 120 | 6 |

### M03 Services and Networking (weight: design assumption, unverified)

- Worked applications: (1) Expose an application with a Service and an Ingress rule; (2) Write a NetworkPolicy that isolates a namespace except for one client
- Common misconception addressed: Assuming a ClusterIP service is reachable from outside the cluster
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pod and service networking | 120 | 6 |
| M03L02 | Service types and Ingress | 120 | 6 |
| M03L03 | Network policies and DNS | 120 | 6 |

### M04 Storage and Troubleshooting (weight: design assumption, unverified)

- Worked applications: (1) Bind a PersistentVolumeClaim to dynamic storage and mount it in a pod; (2) Diagnose a pod stuck in CrashLoopBackOff using events and logs
- Common misconception addressed: Deleting a pod to 'fix' a problem rooted in its controller spec
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Volumes, PV, PVC and storage classes | 120 | 6 |
| M04L02 | Cluster and node troubleshooting | 120 | 6 |
| M04L03 | Application and logging troubleshooting | 120 | 6 |

## Integrative case

An administrator stabilises a Kubernetes cluster: tighten RBAC, schedule a workload with the right requests and tolerations, expose it via Ingress with a NetworkPolicy, attach persistent storage, and troubleshoot a CrashLoopBackOff; explain each decision and verification.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0271-practice-form-A | 57 | 57 | yes |
| MST-0271-practice-form-B | 57 | 57 | no (optional practice) |
| MST-0271-practice-form-C | 57 | 57 | no (optional practice) |
| MST-0271-final-protected | 57 | 57 | yes |

| Domain | Items per form |
|---|---|
| Cluster Architecture, Installation and Configuration | 15 |
| Workloads and Scheduling | 14 |
| Services and Networking | 14 |
| Storage and Troubleshooting | 14 |

Minimum reviewed item bank: 624 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0271-Q0001** (single-answer, Select ONE) A workload should run only on dedicated nodes while other pods stay off them. Which combination achieves this?

- A. Taint the nodes and add a matching toleration to the workload **(key)**  
  _Rationale:_ Correct: taints repel other pods while the tolerated workload can schedule.
- B. Add more CPU limits to the workload  
  _Rationale:_ Limits cap usage but do not reserve nodes.
- C. Delete the other pods repeatedly  
  _Rationale:_ Manual deletion does not prevent rescheduling onto the nodes.
- D. Expose the workload with a NodePort  
  _Rationale:_ NodePort is about networking, not node placement.

**MST-0271-Q0002** (single-answer, Select ONE) A ClusterIP service is unreachable from outside the cluster. Why?

- A. ClusterIP is internal-only; external access needs NodePort, LoadBalancer or Ingress **(key)**  
  _Rationale:_ Correct: ClusterIP is reachable only inside the cluster.
- B. ClusterIP requires a PersistentVolume  
  _Rationale:_ Storage is unrelated to service reachability.
- C. ClusterIP only works with privileged pods  
  _Rationale:_ Privilege level does not govern service exposure.
- D. ClusterIP needs a taint to function  
  _Rationale:_ Taints affect scheduling, not service reachability.

**MST-0271-Q0003** (multiple-answer, Select TWO) Which TWO are appropriate first steps to diagnose a pod stuck in CrashLoopBackOff? (Select TWO)

- A. Inspect the pod's logs for the failing container **(key)**  
  _Rationale:_ Correct: logs usually reveal why the container exits.
- B. Describe the pod to read its events **(key)**  
  _Rationale:_ Correct: events surface scheduling, image and probe failures.
- C. Immediately delete the node  
  _Rationale:_ Deleting the node is disruptive and rarely the cause.
- D. Grant the pod cluster-admin  
  _Rationale:_ Elevating privileges does not diagnose a crash loop.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
