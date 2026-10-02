# Kubernetes Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1579` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Kubernetes architecture and core objects
2. Deploy and manage workloads with Pods, Deployments and Services
3. Configure applications with ConfigMaps, Secrets and resources
4. Expose and route traffic to applications
5. Manage storage, scaling and health
6. Operate, observe and troubleshoot clusters at a basic level

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Architecture and objects (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe how a Deployment reconciles state; (2) Label and select pods
- Common misconception addressed: Treating Pods as long-lived pets rather than disposable
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Control plane, nodes and the API | 168 | 8 |
| M01L02 | Pods, labels and declarative objects | 168 | 8 |

### M02 Workloads (MASTEMY-DESIGN 20%)

- Worked applications: (1) Roll out and roll back a Deployment; (2) Choose a workload type for a batch task
- Common misconception addressed: Running stateful apps as plain Deployments
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deployments, ReplicaSets and rollouts | 168 | 8 |
| M02L02 | Jobs, DaemonSets and StatefulSets | 168 | 8 |

### M03 Configuration and resources (MASTEMY-DESIGN 20%)

- Worked applications: (1) Inject config via a ConfigMap and Secret; (2) Set CPU/memory requests and limits
- Common misconception addressed: Hard-coding config and secrets into images
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ConfigMaps and Secrets | 168 | 8 |
| M03L02 | Requests, limits and namespaces | 168 | 8 |

### M04 Networking and services (MASTEMY-DESIGN 20%)

- Worked applications: (1) Expose a Deployment with a Service; (2) Route external traffic with Ingress
- Common misconception addressed: Assuming Pod IPs are stable addresses
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Services and DNS | 168 | 8 |
| M04L02 | Ingress and routing | 168 | 8 |

### M05 Storage, scaling and operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Attach a persistent volume to a Pod; (2) Add liveness and readiness probes
- Common misconception addressed: Confusing liveness and readiness probes
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Volumes and persistent storage | 168 | 8 |
| M05L02 | Health probes, autoscaling and troubleshooting | 168 | 8 |

## Integrative case

Deploy a two-service web application to a cluster: define Deployments and Services, inject configuration and secrets, add health probes and autoscaling, and troubleshoot a pod that will not start.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1579-final-protected | 25 | 25 | yes |
| MST-1579-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture and objects | 5 |
| Workloads | 5 |
| Configuration and resources | 5 |
| Networking and services | 5 |
| Storage, scaling and operations | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1579-Q0001** (single-answer, Select ONE) What does a Kubernetes Deployment primarily provide?

- A. Declarative management and rollout of a set of replica Pods **(key)**  
  _Rationale:_ Correct: Deployments manage ReplicaSets and rollouts declaratively.
- B. Persistent block storage  
  _Rationale:_ Storage is provided by volumes, not Deployments.
- C. A DNS server for the cluster  
  _Rationale:_ DNS is a cluster add-on, not a Deployment's job.
- D. Node-level operating-system patching  
  _Rationale:_ That is outside the Deployment's scope.

**MST-1579-Q0002** (multiple-answer, Select TWO) Which TWO statements about liveness and readiness probes are correct? (Select TWO.)

- A. A failing readiness probe removes the Pod from Service endpoints **(key)**  
  _Rationale:_ Correct: not-ready Pods stop receiving traffic.
- B. A failing liveness probe causes the Pod to be restarted **(key)**  
  _Rationale:_ Correct: liveness failure triggers a restart.
- C. Both probes do exactly the same thing  
  _Rationale:_ They serve different purposes.
- D. Probes are forbidden in production  
  _Rationale:_ Probes are recommended in production.

**MST-1579-Q0003** (single-answer, Select ONE) Why should configuration not be baked into container images?

- A. It couples config to the image and prevents reuse across environments **(key)**  
  _Rationale:_ Correct: externalising config lets one image run everywhere.
- B. Images cannot contain text files  
  _Rationale:_ Images can contain files; that is not the issue.
- C. ConfigMaps are slower than image builds  
  _Rationale:_ Speed is not the reason.
- D. Kubernetes rejects images with config  
  _Rationale:_ It does not reject them.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
