# Certified Kubernetes Application Developer (CKAD) Knowledge Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1514` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation / CNCF (no affiliation or endorsement) |
| Exam code | CKAD |
| Version basis | unresolved (unconfirmed) |
| Evidence | **unverified-needs-official-check** - official outline not fetched (egress blocked); no source IDs |
| Legacy IDs | MST-PRG-LF-CKAD-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Demonstrate knowledge of the 'Application Design and Build' domain to the depth required for independent exam preparation
2. Demonstrate knowledge of the 'Application Deployment' domain to the depth required for independent exam preparation
3. Demonstrate knowledge of the 'Application Observability and Maintenance' domain to the depth required for independent exam preparation
4. Demonstrate knowledge of the 'Application Environment, Configuration and Security' domain to the depth required for independent exam preparation
5. Demonstrate knowledge of the 'Services and Networking' domain to the depth required for independent exam preparation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope (design-assumption) outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on, performance-based or other official item formats are not reproduced in this format.

> Domain structure below is a **design assumption** drafted from general knowledge of this credential. It was **not** verified against the issuer's official exam outline (egress blocked). Domain names, weights, question counts and durations must be confirmed before production.

## Modules

### M01 Application Design and Build (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write a multi-stage Dockerfile and a Pod spec using an init container to prepare shared data for the main container; (2) Design a CronJob that runs a batch task nightly with correct restart and concurrency settings
- Common misconception addressed: Assuming an init container runs in parallel with the app container rather than to completion first
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Define, build and modify container images | 120 | 6 |
| M01L02 | Understand Jobs and CronJobs | 120 | 6 |
| M01L03 | Understand multi-container Pod design patterns (init, sidecar) | 120 | 6 |
| M01L04 | Use labels, selectors and annotations in Pod design | 120 | 6 |

### M02 Application Deployment (weight: design assumption - confirm against official outline)

- Worked applications: (1) Perform a rolling update on a Deployment, then roll back after detecting a bad revision; (2) Use Kustomize overlays to deploy the same app to staging and production with different replica counts
- Common misconception addressed: Believing a blue/green cutover happens automatically from a single Deployment object
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Use Kubernetes primitives to implement deployment strategies | 120 | 6 |
| M02L02 | Perform rolling updates and rollbacks on a Deployment | 120 | 6 |
| M02L03 | Use Helm and Kustomize to deploy and customise applications | 120 | 6 |

### M03 Application Observability and Maintenance (weight: design assumption - confirm against official outline)

- Worked applications: (1) Add correct liveness and readiness probes so a slow-starting app is not killed before it is ready; (2) Diagnose a CrashLoopBackOff Pod using logs, events and describe output
- Common misconception addressed: Confusing a readiness probe failure (removed from Service) with a liveness probe failure (container restarted)
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Configure liveness, readiness and startup probes | 120 | 6 |
| M03L02 | Use the built-in logging and monitoring surfaces | 120 | 6 |
| M03L03 | Debug and troubleshoot Pods and containers | 120 | 6 |
| M03L04 | Understand API deprecations and their effect on manifests | 120 | 6 |

### M04 Application Environment, Configuration and Security (weight: design assumption - confirm against official outline)

- Worked applications: (1) Mount a ConfigMap as a volume and inject a Secret as an environment variable into a Pod; (2) Set resource requests and limits so a Pod is scheduled and capped correctly under a namespace quota
- Common misconception addressed: Treating Secrets as encrypted at rest by default rather than base64-encoded
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Discover and use resources that extend Kubernetes (CRDs) | 120 | 6 |
| M04L02 | Configure applications with ConfigMaps and Secrets | 120 | 6 |
| M04L03 | Configure SecurityContexts, ServiceAccounts and capabilities | 120 | 6 |
| M04L04 | Define resource requests, limits and quotas | 120 | 6 |

### M05 Services and Networking (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write a default-deny NetworkPolicy then allow traffic only from a named namespace; (2) Expose a Deployment through a ClusterIP Service and an Ingress path rule
- Common misconception addressed: Expecting NetworkPolicies to take effect without a CNI plugin that enforces them
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Demonstrate basic understanding of NetworkPolicies | 120 | 6 |
| M05L02 | Provide and troubleshoot access to applications via Services | 120 | 6 |
| M05L03 | Use Ingress rules to expose applications | 120 | 6 |

## Integrative case

A developer must containerise and ship a two-tier web app onto a shared cluster: build the image, deploy with a safe rollout, add probes, wire configuration and secrets, cap resources under a namespace quota, and restrict traffic with a NetworkPolicy, then justify the design in a review.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam outline not fetched (egress blocked); question count, duration and domain weights are unconfirmed. Confirm on the issuer's official exam page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1514-practice-form-A | 72 | 72 | yes |
| MST-1514-practice-form-B | 72 | 72 | no (optional practice) |
| MST-1514-practice-form-C | 72 | 72 | no (optional practice) |
| MST-1514-final-protected | 72 | 72 | yes |

| Domain | Items per form |
|---|---|
| Application Design and Build | 15 |
| Application Deployment | 15 |
| Application Observability and Maintenance | 14 |
| Application Environment, Configuration and Security | 14 |
| Services and Networking | 14 |

Minimum reviewed item bank: 882 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1514-Q0001** (single-answer, Select ONE) A Pod must run a short setup task that copies files into a shared volume before the main application container starts. Which construct runs that task to completion first?

- A. An init container **(key)**  
  _Rationale:_ Correct: init containers run to completion in order before app containers start, making them ideal for setup tasks.
- B. A sidecar container  
  _Rationale:_ A sidecar runs alongside the main container for its whole life, not to completion beforehand.
- C. A liveness probe  
  _Rationale:_ A liveness probe checks health of a running container; it does not run setup work.
- D. A CronJob  
  _Rationale:_ A CronJob schedules whole Pods on a timetable; it is not an in-Pod setup step.

**MST-1514-Q0002** (single-answer, Select ONE) A container takes 40 seconds to warm up. Kubernetes keeps killing it during startup. Which probe should be added or tuned to stop the premature restarts?

- A. Startup probe **(key)**  
  _Rationale:_ Correct: a startup probe holds off the liveness probe until the app has finished its slow start.
- B. Readiness probe only  
  _Rationale:_ A readiness probe removes the Pod from Service endpoints but does not stop liveness restarts.
- C. A higher CPU limit  
  _Rationale:_ Resource limits do not change probe timing or restart behaviour.
- D. A NetworkPolicy  
  _Rationale:_ NetworkPolicies govern traffic, not container restart behaviour.

**MST-1514-Q0003** (multiple-answer, Select TWO) Which TWO statements about Kubernetes Secrets are correct by default? (Select TWO.)

- A. Secret values are base64-encoded, not encrypted, unless encryption at rest is configured **(key)**  
  _Rationale:_ Correct: by default Secrets are only base64-encoded in etcd.
- B. A Secret can be mounted as a volume or exposed as environment variables **(key)**  
  _Rationale:_ Correct: both consumption methods are supported.
- C. Secrets are encrypted at rest automatically on every cluster  
  _Rationale:_ Encryption at rest must be explicitly configured; it is not automatic.
- D. Secrets cannot be referenced by Pods in the same namespace  
  _Rationale:_ Pods reference Secrets in their own namespace routinely.
- E. Secrets are stored only in the kubelet, never in etcd  
  _Rationale:_ Secrets are persisted in etcd via the API server.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
