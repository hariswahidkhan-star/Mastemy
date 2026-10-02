# Linux Foundation KCNA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0274` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

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

1. Explain Kubernetes fundamentals, core resources and the control plane
2. Describe container orchestration and the cloud native ecosystem
3. Describe cloud native application delivery and observability
4. Describe cloud native architecture, security and community principles

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Kubernetes fundamentals (not published - design grouping)

- Worked applications: (1) Map a running app to Pods, a Deployment and a Service; (2) Read a Deployment manifest and predict how many Pods run
- Common misconception addressed: Treating a Pod as a long-lived server rather than a disposable, replaceable unit
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Kubernetes architecture and control-plane components | 100 | 6 |
| M01L02 | Pods, workloads and controllers | 100 | 6 |
| M01L03 | Services and cluster networking basics | 100 | 6 |
| M01L04 | Scheduling, labels and configuration | 100 | 6 |

### M02 Container orchestration and the cloud native ecosystem (not published - design grouping)

- Worked applications: (1) Compare a container image to a running container; (2) Place three tools on the CNCF landscape by purpose
- Common misconception addressed: Believing Kubernetes builds container images itself rather than running them
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Containers and container runtimes | 100 | 6 |
| M02L02 | The CNCF landscape and graduated projects | 100 | 6 |
| M02L03 | Packaging with Helm | 100 | 6 |
| M02L04 | Open standards: OCI, CRI and CNI | 100 | 6 |

### M03 Delivery, observability and cloud native architecture (not published - design grouping)

- Worked applications: (1) Sketch a GitOps delivery flow from commit to cluster; (2) Choose metrics, logs or traces for a given troubleshooting need
- Common misconception addressed: Assuming autoscaling removes the need to set resource requests and limits
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cloud native delivery: CI/CD and GitOps | 100 | 6 |
| M03L02 | Observability: metrics, logs and traces | 100 | 6 |
| M03L03 | Cloud native architecture and autoscaling | 100 | 6 |
| M03L04 | Cloud native security and community governance | 100 | 6 |

## Integrative case

A team containerises a web app and plans its move to Kubernetes: choose the right workload resources, expose the app with a Service, add basic observability, and describe how CI/CD and community projects fit the cloud native delivery model.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0274-practice-form-A | 45 | 45 | yes |
| MST-0274-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0274-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0274-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Kubernetes fundamentals | 15 |
| Container orchestration and the cloud native ecosystem | 15 |
| Delivery, observability and cloud native architecture | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0274-Q0001** (single-answer, Select ONE) Which Kubernetes object is primarily responsible for keeping a declared number of identical Pod replicas running?

- A. A Deployment (through its ReplicaSet) **(key)**  
  _Rationale:_ Correct: a Deployment manages a ReplicaSet that maintains the declared replica count.
- B. A single Pod  
  _Rationale:_ A Pod is one unit and does not self-replicate or maintain a replica count.
- C. A Service  
  _Rationale:_ A Service provides stable networking to Pods; it does not manage replica count.
- D. A ConfigMap  
  _Rationale:_ A ConfigMap stores configuration data and does not run or scale Pods.

**MST-0274-Q0002** (single-answer, Select ONE) What does a Kubernetes Service mainly provide for a set of Pods?

- A. A stable network endpoint and load balancing across the Pods **(key)**  
  _Rationale:_ Correct: a Service gives a stable address and distributes traffic to matching Pods.
- B. Persistent disk storage for the Pods  
  _Rationale:_ Durable storage is provided by volumes and PersistentVolumes, not a Service.
- C. Container image building  
  _Rationale:_ Image building happens outside the cluster; a Service does not build images.
- D. Cluster user authentication  
  _Rationale:_ Authentication is handled by the API server and identity providers, not a Service.

**MST-0274-Q0003** (multiple-answer, Select TWO) Select TWO components that normally run on the Kubernetes control plane.

- A. kube-apiserver **(key)**  
  _Rationale:_ Correct: the API server is the control-plane front end for all cluster operations.
- B. etcd **(key)**  
  _Rationale:_ Correct: etcd is the control-plane key-value store holding cluster state.
- C. A container running the user's web application  
  _Rationale:_ Application containers run as workloads on worker nodes, not as control-plane components.
- D. The container runtime on a worker node  
  _Rationale:_ The container runtime runs on worker nodes, not on the control plane.
- E. An external load balancer appliance  
  _Rationale:_ An external load balancer is infrastructure outside the cluster, not a control-plane component.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
