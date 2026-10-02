# Kubernetes and Cloud Native Associate (KCNA) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1511` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation / CNCF (no affiliation or endorsement) |
| Exam code | KCNA |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | MST-PRG-LF-KCNA-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Explain Kubernetes fundamentals and core resources
2. Describe container orchestration and runtime concepts
3. Describe cloud native application delivery and observability
4. Describe cloud native architecture, security and community

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Kubernetes fundamentals (not published - design grouping)

- Worked applications: (1) Match an app's needs to Pods, a Deployment and a Service; (2) Read a manifest and predict the running state
- Common misconception addressed: Treating a Pod as a permanent server instead of a disposable unit
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Kubernetes architecture and API | 100 | 6 |
| M01L02 | Pods, Deployments and controllers | 100 | 6 |
| M01L03 | Services, networking and Ingress basics | 100 | 6 |
| M01L04 | Configuration, storage and scheduling | 100 | 6 |

### M02 Container orchestration and runtime (not published - design grouping)

- Worked applications: (1) Explain how a container image becomes a running container; (2) Identify the role of the container runtime interface
- Common misconception addressed: Thinking Kubernetes builds images rather than running them
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Containers and images | 100 | 6 |
| M02L02 | Container runtimes and the CRI | 100 | 6 |
| M02L03 | Orchestration concepts and self-healing | 100 | 6 |
| M02L04 | Packaging and Helm basics | 100 | 6 |

### M03 Delivery, observability and architecture (not published - design grouping)

- Worked applications: (1) Describe a GitOps flow from commit to running cluster; (2) Choose metrics, logs or traces for an issue
- Common misconception addressed: Assuming autoscaling removes the need for resource requests
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cloud native delivery and CI/CD | 100 | 6 |
| M03L02 | Observability fundamentals | 100 | 6 |
| M03L03 | Cloud native architecture and autoscaling | 100 | 6 |
| M03L04 | Cloud native security and CNCF community | 100 | 6 |

## Integrative case

A developer preparing for KCNA models a sample app on Kubernetes: choose the right resources, expose it with a Service, add observability, and relate delivery and community practices to the cloud native ecosystem.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1511-practice-form-A | 45 | 45 | yes |
| MST-1511-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1511-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1511-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Kubernetes fundamentals | 15 |
| Container orchestration and runtime | 15 |
| Delivery, observability and architecture | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1511-Q0001** (single-answer, Select ONE) Which Kubernetes object maintains a declared number of identical Pod replicas?

- A. A Deployment (via its ReplicaSet) **(key)**  
  _Rationale:_ Correct: a Deployment manages a ReplicaSet that keeps the declared replica count.
- B. A single Pod  
  _Rationale:_ A lone Pod does not maintain a replica count.
- C. A ConfigMap  
  _Rationale:_ A ConfigMap holds configuration data; it does not run Pods.
- D. A Namespace  
  _Rationale:_ A Namespace is an organisational boundary, not a replica controller.

**MST-1511-Q0002** (single-answer, Select ONE) What does the Container Runtime Interface (CRI) allow Kubernetes to do?

- A. Use different container runtimes through a standard interface **(key)**  
  _Rationale:_ Correct: the CRI lets Kubernetes work with any compliant runtime.
- B. Build container images directly in the API server  
  _Rationale:_ Kubernetes does not build images; the CRI concerns running containers.
- C. Replace the need for container images  
  _Rationale:_ Containers still require images; the CRI does not remove them.
- D. Store cluster state instead of etcd  
  _Rationale:_ Cluster state is stored in etcd, not via the CRI.

**MST-1511-Q0003** (multiple-answer, Select TWO) Select TWO signals commonly used in cloud native observability.

- A. Metrics **(key)**  
  _Rationale:_ Correct: metrics are numeric measurements over time, a core observability signal.
- B. Logs **(key)**  
  _Rationale:_ Correct: logs are event records, a core observability signal.
- C. The office Wi-Fi password  
  _Rationale:_ This is unrelated to observability signals.
- D. The number of chairs in the data centre  
  _Rationale:_ This is not an observability signal.
- E. The developer's favourite colour  
  _Rationale:_ This is not an observability signal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
