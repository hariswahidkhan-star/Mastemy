# Linux Foundation CKAD: Knowledge and Demonstration Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0272` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

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

1. Design and build containerised applications for Kubernetes
2. Deploy applications using Kubernetes primitives and update strategies
3. Observe and maintain applications
4. Configure application environment, configuration, security, services and networking

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Official exam is performance-based (hands-on); Mastemy offers knowledge preparation and video demonstrations only.
- Does not assess: DESIGN ASSUMPTION: the official exam includes hands-on / performance-based tasks that MCQ/MR cannot reproduce; this knowledge-practice package does not assess command-line or lab performance.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Application Design and Build (weight: design assumption, unverified)

- Worked applications: (1) Write a multi-stage Dockerfile producing a minimal runtime image; (2) Design a sidecar pattern that ships logs from a main container
- Common misconception addressed: Baking configuration and secrets into the image instead of injecting them
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Container images and multi-stage builds | 120 | 6 |
| M01L02 | Pods, init containers and multi-container patterns | 120 | 6 |
| M01L03 | Jobs and CronJobs | 120 | 6 |

### M02 Application Deployment (weight: design assumption, unverified)

- Worked applications: (1) Perform a canary rollout by scaling two Deployments behind one Service; (2) Roll back a Deployment to a previous revision after a bad release
- Common misconception addressed: Assuming a Deployment update is atomic with zero in-flight old pods
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deployments and rollout strategies | 120 | 6 |
| M02L02 | Rolling, blue/green and canary updates | 120 | 6 |
| M02L03 | Helm and declarative deployment | 120 | 6 |

### M03 Observability and Maintenance (weight: design assumption, unverified)

- Worked applications: (1) Add readiness and liveness probes that prevent traffic to an unready pod; (2) Debug a failing container using logs, exec and ephemeral containers
- Common misconception addressed: Setting a liveness probe so aggressive it restarts a healthy slow-starting app
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Liveness, readiness and startup probes | 120 | 6 |
| M03L02 | Logging and monitoring | 120 | 6 |
| M03L03 | Debugging running applications | 120 | 6 |

### M04 Environment, Config, Security and Networking (weight: design assumption, unverified)

- Worked applications: (1) Inject configuration via ConfigMap and a Secret as environment and mounted files; (2) Restrict a pod with a SecurityContext running as non-root with dropped capabilities
- Common misconception addressed: Storing a Secret as a ConfigMap, exposing it in plain text
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ConfigMaps, Secrets and environment | 120 | 6 |
| M04L02 | SecurityContext, ServiceAccounts and resource limits | 120 | 6 |
| M04L03 | Services, Ingress and NetworkPolicy | 120 | 6 |

## Integrative case

A developer prepares a microservice for production on Kubernetes: build a minimal image, deploy with a canary strategy, add probes and logging, inject config and secrets, run as non-root, and expose it with an Ingress and NetworkPolicy; justify each choice.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0272-practice-form-A | 57 | 57 | yes |
| MST-0272-practice-form-B | 57 | 57 | no (optional practice) |
| MST-0272-practice-form-C | 57 | 57 | no (optional practice) |
| MST-0272-final-protected | 57 | 57 | yes |

| Domain | Items per form |
|---|---|
| Application Design and Build | 15 |
| Application Deployment | 14 |
| Observability and Maintenance | 14 |
| Environment, Config, Security and Networking | 14 |

Minimum reviewed item bank: 624 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0272-Q0001** (single-answer, Select ONE) Configuration should be injected into a container rather than baked into its image. Which Kubernetes object is designed for non-secret config?

- A. ConfigMap **(key)**  
  _Rationale:_ Correct: a ConfigMap injects non-secret configuration as env vars or files.
- B. A second container image  
  _Rationale:_ Rebuilding the image defeats the purpose of externalising config.
- C. A NodePort service  
  _Rationale:_ A service exposes networking, not configuration.
- D. A taint  
  _Rationale:_ Taints control scheduling, not configuration injection.

**MST-0272-Q0002** (single-answer, Select ONE) A liveness probe keeps restarting a healthy app that starts slowly. What is the best fix?

- A. Add a startup probe or increase the initial delay **(key)**  
  _Rationale:_ Correct: a startup probe/initial delay gives slow starters time before liveness checks.
- B. Remove all probes  
  _Rationale:_ Removing probes loses self-healing for genuine failures.
- C. Run the pod as privileged  
  _Rationale:_ Privilege does not change probe timing.
- D. Switch the service to NodePort  
  _Rationale:_ Service type is unrelated to probe restarts.

**MST-0272-Q0003** (multiple-answer, Select TWO) Which TWO correctly handle a Secret for a containerised app? (Select TWO)

- A. Store it in a Secret object and mount or inject it **(key)**  
  _Rationale:_ Correct: Secrets are the intended object for sensitive values.
- B. Restrict access with RBAC **(key)**  
  _Rationale:_ Correct: RBAC limits who can read the Secret.
- C. Store it in a ConfigMap in plain text  
  _Rationale:_ ConfigMaps are not for secrets and expose values.
- D. Hard-code it in the Dockerfile  
  _Rationale:_ Baking secrets into images leaks them to anyone with the image.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
