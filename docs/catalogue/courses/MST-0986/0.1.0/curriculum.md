# Kubernetes: Application Deployment and Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0986` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — Kubernetes: Application Deployment and Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Kubernetes architecture
2. Pods and workloads
3. Networking and services
4. Configuration and storage
5. Health, scaling and reliability
6. Rollouts and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Kubernetes architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Read a cluster's nodes and system pods with kubectl; (2) Apply a manifest and observe reconciliation
- Common misconception addressed: Treating kubectl apply as imperative one-time commands
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Control plane and nodes | 94 | 6 |
| M01L02 | Objects and the declarative model | 94 | 6 |
| M01L03 | kubectl and manifests | 94 | 6 |

### M02 Pods and workloads (MASTEMY-DESIGN 17%)

- Worked applications: (1) Scale a Deployment and watch ReplicaSet changes; (2) Target pods with a label selector
- Common misconception addressed: Confusing a Pod with a long-lived managed workload
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pods and containers | 94 | 6 |
| M02L02 | Deployments and ReplicaSets | 94 | 6 |
| M02L03 | Labels and selectors | 94 | 6 |

### M03 Networking and services (MASTEMY-DESIGN 17%)

- Worked applications: (1) Expose a Deployment with a ClusterIP Service; (2) Route two hostnames through one Ingress
- Common misconception addressed: Assuming a Pod IP is stable across restarts
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Services and cluster DNS | 93 | 6 |
| M03L02 | Ingress and routing | 93 | 6 |
| M03L03 | Service discovery | 93 | 6 |

### M04 Configuration and storage (MASTEMY-DESIGN 17%)

- Worked applications: (1) Inject settings from a ConfigMap and Secret; (2) Attach a PersistentVolumeClaim to a Pod
- Common misconception addressed: Storing credentials in a plain ConfigMap instead of a Secret
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ConfigMaps and Secrets | 93 | 6 |
| M04L02 | Volumes and persistent volumes | 93 | 6 |
| M04L03 | Namespaces and quotas | 93 | 6 |

### M05 Health, scaling and reliability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add readiness and liveness probes to a container; (2) Set requests and limits so the scheduler can place pods
- Common misconception addressed: Omitting resource requests and letting the scheduler guess
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Liveness and readiness probes | 93 | 6 |
| M05L02 | Resource requests and limits | 93 | 6 |
| M05L03 | Horizontal autoscaling | 93 | 6 |

### M06 Rollouts and operations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Perform a rolling update and then roll back; (2) Diagnose a CrashLoopBackOff from pod logs and events
- Common misconception addressed: Expecting a failed rollout to revert itself automatically
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Rolling updates and rollbacks | 93 | 6 |
| M06L02 | Observability basics | 93 | 6 |
| M06L03 | Troubleshooting workloads | 93 | 6 |

## Integrative case

Deploy and operate a web service on Kubernetes: define Pods, Deployments and Services, expose it through an Ingress, manage configuration and secrets, set resource requests and probes, and roll out and roll back changes safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0986-final-protected | 30 | 30 | yes |
| MST-0986-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kubernetes architecture | 5 |
| Pods and workloads | 5 |
| Networking and services | 5 |
| Configuration and storage | 5 |
| Health, scaling and reliability | 5 |
| Rollouts and operations | 5 |

Minimum reviewed item bank: 570 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0986-Q0001** (single-answer, Select ONE) Which Kubernetes object provides a stable address and load-balances traffic to a changing set of Pods?

- A. Service **(key)**  
  _Rationale:_ Correct: a Service gives a stable virtual IP and DNS name in front of Pods matched by a selector.
- B. Pod  
  _Rationale:_ A Pod's IP is ephemeral and changes on restart.
- C. ConfigMap  
  _Rationale:_ A ConfigMap stores configuration, not networking.
- D. Namespace  
  _Rationale:_ A Namespace is an isolation boundary, not a load balancer.

**MST-0986-Q0002** (single-answer, Select ONE) What is the purpose of a readiness probe?

- A. To tell Kubernetes when a Pod is ready to receive traffic **(key)**  
  _Rationale:_ Correct: readiness probes gate traffic until the container reports ready.
- B. To restart a container that has crashed  
  _Rationale:_ That is the liveness probe's role.
- C. To set CPU and memory limits  
  _Rationale:_ Limits are set in the resources field, not by probes.
- D. To scale the Deployment up and down  
  _Rationale:_ Scaling is handled by replicas or an autoscaler.

**MST-0986-Q0003** (multiple-answer, Select TWO) Which TWO statements about Kubernetes Deployments are correct? (Select TWO)

- A. A Deployment manages ReplicaSets to keep a desired number of Pods running **(key)**  
  _Rationale:_ Correct: Deployments reconcile the actual Pod count toward the declared replicas.
- B. A rolling update can be rolled back to a previous revision **(key)**  
  _Rationale:_ Correct: Deployment revisions support rollback.
- C. Deleting a Pod managed by a Deployment permanently reduces capacity  
  _Rationale:_ The controller recreates the Pod to match the desired count.
- D. A Deployment stores persistent application data by itself  
  _Rationale:_ Persistent data needs volumes and PersistentVolumeClaims.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
