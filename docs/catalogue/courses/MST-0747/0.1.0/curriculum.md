# Google Kubernetes Engine: Production Container Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0747` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-GKE (https://cloud.google.com/kubernetes-engine/docs; accessed 2026-10-02) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Google Kubernetes Engine: Production Container Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose between Standard and Autopilot GKE and provision clusters and node pools
2. Deploy and manage workloads with Deployments, Services and Ingress
3. Configure requests, limits, probes and horizontal autoscaling
4. Secure clusters with RBAC, Workload Identity and network policy
5. Manage configuration, secrets, storage and stateful workloads
6. Operate, observe, upgrade and control the cost of production clusters

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Clusters and node pools (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create an Autopilot cluster and deploy a test workload; (2) Add a node pool sized for a workload class
- Common misconception addressed: Treating Autopilot like Standard and trying to manage nodes directly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Standard versus Autopilot and cluster creation | 120 | 5 |
| M01L02 | Node pools, machine types and upgrades | 120 | 5 |

### M02 Workloads and networking (MASTEMY-DESIGN 17%)

- Worked applications: (1) Deploy an app and perform a rolling update; (2) Expose a service through Ingress with managed certificates
- Common misconception addressed: Exposing pods with NodePort when an Ingress is the right fit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deployments, Services and rollouts | 120 | 5 |
| M02L02 | Ingress, load balancing and TLS | 120 | 5 |

### M03 Scaling and reliability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set requests/limits and readiness probes for a service; (2) Configure HPA on CPU and a pod disruption budget
- Common misconception addressed: Omitting resource requests so the scheduler cannot place pods well
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Requests, limits and liveness/readiness probes | 120 | 5 |
| M03L02 | Horizontal Pod Autoscaling and disruption budgets | 120 | 5 |

### M04 Security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Grant a team namespace-scoped RBAC; (2) Bind a Kubernetes service account to a Google service account with Workload Identity
- Common misconception addressed: Mounting node service-account keys into pods instead of using Workload Identity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | RBAC and Workload Identity | 120 | 5 |
| M04L02 | Network policy and pod security | 120 | 5 |

### M05 Configuration and storage (MASTEMY-DESIGN 16%)

- Worked applications: (1) Inject configuration with a ConfigMap and a Secret; (2) Attach a persistent volume to a StatefulSet
- Common misconception addressed: Storing secrets in plain ConfigMaps or container images
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | ConfigMaps, Secrets and environment config | 120 | 5 |
| M05L02 | Persistent volumes and stateful workloads | 120 | 5 |

### M06 Operations and cost (MASTEMY-DESIGN 16%)

- Worked applications: (1) Diagnose a CrashLoopBackOff from logs and events; (2) Plan a node upgrade with a maintenance window and surge settings
- Common misconception addressed: Upgrading the control plane and nodes without checking workload disruption budgets
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Logging, monitoring and troubleshooting | 120 | 5 |
| M06L02 | Upgrades, maintenance windows and cost control | 120 | 5 |

## Integrative case

Operate a payments microservice on GKE: pick Autopilot or Standard, deploy with health probes and resource requests, expose it through Ingress with TLS, enforce Workload Identity and a network policy, autoscale against load, then plan a zero-downtime node upgrade and a cost review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0747-final-protected | 40 | 50 | yes |
| MST-0747-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Clusters and node pools | 7 |
| Workloads and networking | 7 |
| Scaling and reliability | 7 |
| Security | 7 |
| Configuration and storage | 6 |
| Operations and cost | 6 |

Minimum reviewed item bank: 452 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0747-Q0001** (single-answer, Select ONE) A pod is scheduled but traffic is sent to it before the app finishes loading, causing errors. Which configuration fixes this?

- A. Add a readiness probe so the pod receives traffic only when ready **(key)**  
  _Rationale:_ Correct: readiness probes gate Service endpoints until the app can serve.
- B. Add a liveness probe only  
  _Rationale:_ Liveness restarts unhealthy pods but does not delay traffic during startup.
- C. Increase the replica count  
  _Rationale:_ More replicas still send traffic to pods before they are ready.
- D. Remove resource limits  
  _Rationale:_ Limits are unrelated to startup readiness.

**MST-0747-Q0002** (multiple-answer, Select TWO) Which TWO practices follow GKE security guidance for workloads that call Google Cloud APIs? (Select TWO.)

- A. Use Workload Identity to map Kubernetes service accounts to Google service accounts **(key)**  
  _Rationale:_ Correct: Workload Identity avoids long-lived keys.
- B. Apply least-privilege IAM roles to the mapped service account **(key)**  
  _Rationale:_ Correct: scoping the Google service account limits blast radius.
- C. Copy a service-account JSON key into a Secret and mount it  
  _Rationale:_ Long-lived keys are what Workload Identity is meant to eliminate.
- D. Grant cluster-admin to all application pods  
  _Rationale:_ That grossly over-privileges workloads.

**MST-0747-Q0003** (single-answer, Select ONE) Your team wants managed nodes with minimal node operations and per-pod billing. Which GKE mode best fits?

- A. Autopilot **(key)**  
  _Rationale:_ Correct: Autopilot manages nodes and bills per pod resource request.
- B. Standard with manual node pools  
  _Rationale:_ Standard requires managing node pools yourself.
- C. A self-managed Kubernetes cluster on VMs  
  _Rationale:_ That maximizes operational burden.
- D. Cloud Run only  
  _Rationale:_ Cloud Run is not a Kubernetes cluster for this workload model.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
