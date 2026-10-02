# Certified Kubernetes Administrator (CKA) Knowledge Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1513` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation / CNCF (no affiliation or endorsement) |
| Exam code | CKA |
| Version basis | unresolved - official syllabus not verified (issuer egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - official domains, weightings, objective IDs, item counts and durations NOT verified; modules are Mastemy design groupings |
| Legacy IDs | MST-PRG-LF-CKA-001 |
| Planned time | T = 3000 min; instruction I = 2400 min (80%); assessment A = 600 min (20%) |
| Assessment split | lesson checks 150 / module checks 210 / cumulative 240 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Kubernetes cluster architecture, components and installation concepts
2. Manage workloads, scheduling and application lifecycle on a cluster
3. Configure services, networking and storage for workloads
4. Troubleshoot cluster and application problems and perform maintenance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance, speaking, essay, hands-on or simulation tasks) are not reproduced here; see the exam-version record.

## Modules

> Module groupings are Mastemy design decisions. The official blueprint domains and weightings were not verified (issuer site egress blocked); no percentage weights are claimed.

### M01 Cluster architecture, installation and configuration (weight not published - design grouping)

- Worked applications: (1) Label the responsibility of each control-plane component for a described cluster event; (2) Plan the steps to upgrade a control plane one minor version safely
- Common misconception addressed: Confusing a Deployment with the Pods it manages when reasoning about self-healing
- Module check: 70 items / 70 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Control plane and node components | 200 | 6 |
| M01L02 | Cluster installation and upgrades | 200 | 6 |
| M01L03 | Role-based access control basics | 200 | 6 |
| M01L04 | etcd backup and restore concepts | 200 | 6 |

### M02 Workloads, scheduling and services (weight not published - design grouping)

- Worked applications: (1) Write the intent of a Deployment spec that must survive a node failure; (2) Diagnose why a Pod stays Pending given node taints and resource requests
- Common misconception addressed: Assuming a Service load-balances to Pods without matching label selectors
- Module check: 70 items / 70 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deployments and workload resources | 200 | 6 |
| M02L02 | Scheduling, taints and tolerations | 200 | 6 |
| M02L03 | Services and networking | 200 | 6 |
| M02L04 | ConfigMaps, Secrets and application configuration | 200 | 6 |

### M03 Storage, troubleshooting and maintenance (weight not published - design grouping)

- Worked applications: (1) Design a PersistentVolume/PVC binding so data survives Pod rescheduling; (2) Work through why a Service receives no traffic and locate the misconfiguration
- Common misconception addressed: Believing data in an emptyDir volume survives Pod deletion
- Module check: 70 items / 70 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Volumes, persistent volumes and claims | 200 | 6 |
| M03L02 | Logging and monitoring workloads | 200 | 6 |
| M03L03 | Troubleshooting cluster components | 200 | 6 |
| M03L04 | Troubleshooting applications and networking | 200 | 6 |

## Integrative case

A platform team runs a three-node cluster hosting a stateful web app: plan an upgrade, ensure the database's storage survives rescheduling, and troubleshoot why new Pods will not schedule after a node is cordoned.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1513-practice-form-A | 90 | 90 | yes |
| MST-1513-practice-form-B | 90 | 90 | no (optional practice) |
| MST-1513-practice-form-C | 90 | 90 | no (optional practice) |
| MST-1513-final-protected | 90 | 90 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Cluster architecture, installation and configuration | 30 |
| Workloads, scheduling and services | 30 |
| Storage, troubleshooting and maintenance | 30 |

Minimum reviewed item bank: 924 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1513-Q0001** (single-answer, Select ONE) Which control-plane component is responsible for assigning newly created Pods to nodes?

- A. kube-scheduler **(key)**  
  _Rationale:_ Correct: the scheduler selects a suitable node for Pods that have no node assigned.
- B. kubelet  
  _Rationale:_ The kubelet runs on each node and starts containers once a Pod is assigned; it does not choose the node.
- C. kube-proxy  
  _Rationale:_ kube-proxy maintains network rules for Services; it does not schedule Pods.
- D. etcd  
  _Rationale:_ etcd stores cluster state; it does not make scheduling decisions.

**MST-1513-Q0002** (single-answer, Select ONE) A Pod remains in Pending state. Events show 'Insufficient cpu'. What is the most likely cause?

- A. No node has enough allocatable CPU to meet the Pod's requests **(key)**  
  _Rationale:_ Correct: a CPU request larger than any node's remaining allocatable CPU keeps the Pod Pending.
- B. The container image cannot be pulled  
  _Rationale:_ An image pull problem shows ImagePullBackOff, not 'Insufficient cpu'.
- C. The Service selector does not match  
  _Rationale:_ Service selectors affect traffic, not whether a Pod can be scheduled.
- D. The readiness probe is failing  
  _Rationale:_ A failing readiness probe keeps a running Pod out of endpoints; it does not cause Pending.

**MST-1513-Q0003** (multiple-answer, Select TWO) Select TWO statements that are true about a PersistentVolumeClaim (PVC).

- A. A PVC requests storage with a size and access mode **(key)**  
  _Rationale:_ Correct: a PVC specifies requested capacity and access modes.
- B. A PVC can bind to a PersistentVolume that satisfies its request **(key)**  
  _Rationale:_ Correct: a PVC binds to a matching PV that meets its size and access-mode request.
- C. A PVC stores data directly without any backing volume  
  _Rationale:_ A PVC is only a request/binding; the data lives on the bound PersistentVolume's storage.
- D. A PVC is automatically deleted when its Pod restarts  
  _Rationale:_ A PVC persists independently of Pod restarts, which is the point of persistent storage.
- E. A PVC can only be used by control-plane components  
  _Rationale:_ PVCs are used by ordinary workloads to consume storage.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
