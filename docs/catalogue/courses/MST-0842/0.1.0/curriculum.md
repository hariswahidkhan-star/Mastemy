# .NET Containerization and Kubernetes Deployment

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0842` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-DOTNET-DOCKER** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Containerize a .NET application with a multi-stage Dockerfile and appropriate base images
2. Explain Kubernetes concepts (pods, deployments, services) and author manifests
3. Deploy, scale and roll out a .NET workload on Kubernetes
4. Apply operational concerns: health probes, resource limits and resilience

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/dotnet/core/docker/introduction

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Containerizing .NET

- Purpose: Teach building efficient, secure .NET container images.
- Worked applications: (1) Write a multi-stage Dockerfile using SDK and runtime images; (2) Choose a chiseled/rootless base image and justify the security benefit
- Common misconception addressed: Shipping the SDK image to production instead of a runtime image
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | .NET container images (SDK vs runtime) | 80 | 5 |
| M01L02 | Multi-stage Dockerfiles | 80 | 5 |
| M01L03 | Image size, chiseled and rootless images | 80 | 5 |

### M02 Kubernetes fundamentals

- Purpose: Teach pods, deployments, services and manifests.
- Worked applications: (1) Author a Deployment and Service manifest for a .NET API; (2) Scale a deployment and observe additional pods handle load
- Common misconception addressed: Thinking a pod and a container are always one and the same
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pods, deployments and services | 80 | 5 |
| M02L02 | Writing Kubernetes manifests | 80 | 5 |
| M02L03 | Scaling and rollouts | 80 | 5 |

### M03 Operating on Kubernetes

- Purpose: Teach health probes, resource limits and resilience.
- Worked applications: (1) Add liveness and readiness probes to a .NET deployment; (2) Set CPU/memory requests and limits and explain the effect on scheduling
- Common misconception addressed: Omitting resource requests and wondering why scheduling behaves unpredictably
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Liveness and readiness probes | 80 | 5 |
| M03L02 | Resource requests and limits | 80 | 5 |
| M03L03 | Resilience and self-healing | 80 | 5 |

## Integrative case

A .NET API must move from a single VM to Kubernetes with zero-downtime rollouts. Build an efficient image, write Deployment/Service manifests, add health probes and resource limits, and explain how scaling and rollouts will behave.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0842-final-protected | 30 | 30 | yes |
| MST-0842-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Containerizing .NET | 10 |
| Kubernetes fundamentals | 10 |
| Operating on Kubernetes | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0842-Q0001** (single-answer, Select ONE) Why use a multi-stage Dockerfile that builds with the SDK image but ships the runtime (or chiseled) image?

- A. The final image is smaller and has a reduced attack surface, without build-time tooling **(key)**  
  _Rationale:_ Correct: multi-stage builds keep SDK tooling out of the final image, shrinking size and attack surface.
- B. The SDK image is always smaller than the runtime image  
  _Rationale:_ The SDK image is larger; that is why it is not shipped.
- C. Runtime images cannot run .NET apps  
  _Rationale:_ Runtime images are precisely for running .NET apps.
- D. It is required to compile C#  
  _Rationale:_ Compilation needs the SDK, but shipping it is unnecessary; multi-stage separates the two.

**MST-0842-Q0002** (multiple-answer, Select TWO) Select TWO operational settings that improve a .NET workload running on Kubernetes.

- A. Liveness and readiness probes so Kubernetes can restart or withhold traffic appropriately **(key)**  
  _Rationale:_ Correct: probes let the platform self-heal and route traffic only to healthy pods.
- B. CPU and memory requests/limits to guide scheduling and prevent noisy-neighbor issues **(key)**  
  _Rationale:_ Correct: requests/limits inform scheduling and bound resource use.
- C. Shipping the SDK image to production for flexibility  
  _Rationale:_ The SDK image is larger and widens the attack surface; use a runtime image.
- D. Removing all health checks to reduce overhead  
  _Rationale:_ Removing probes prevents self-healing and safe rollouts.
- E. Hard-coding a single replica with no scaling  
  _Rationale:_ A single fixed replica prevents scaling and resilience.

**MST-0842-Q0003** (single-answer, Select ONE) In Kubernetes, what is the relationship between a Deployment and the pods it manages?

- A. A Deployment declares the desired state and manages ReplicaSets that keep the right number of pods running **(key)**  
  _Rationale:_ Correct: a Deployment manages ReplicaSets to maintain the desired pod count and handle rollouts.
- B. A Deployment is a single pod with another name  
  _Rationale:_ A Deployment manages many pods via ReplicaSets; it is not one pod.
- C. Pods manage Deployments  
  _Rationale:_ The relationship is the reverse: Deployments manage pods.
- D. A Deployment is only a network load balancer  
  _Rationale:_ That role belongs to a Service, not a Deployment.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
