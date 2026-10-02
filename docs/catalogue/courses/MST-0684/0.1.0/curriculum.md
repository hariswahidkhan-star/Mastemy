# Azure Kubernetes Service: Deployment and Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0684` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). AKS cluster, node pool, networking and observability behaviour partially verified against official Microsoft Learn AKS docs; re-verify Kubernetes and AKS specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-AKS (https://learn.microsoft.com/azure/aks/, accessed 2026-10-02) |
| Legacy IDs | MST-MIC-SK-AKSE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure Kubernetes Service: Deployment and Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Kubernetes and AKS architecture and the managed control plane
2. Provision clusters and node pools with the portal, CLI and Bicep
3. Deploy workloads with manifests, Deployments and Services
4. Configure cluster networking, ingress and DNS
5. Manage scaling, upgrades and node maintenance
6. Operate clusters with monitoring, logging and security controls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Kubernetes and AKS architecture (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Map a microservices app to pods, Deployments and Services; (2) Explain which parts AKS manages versus the customer
- Common misconception addressed: Thinking the customer manages the control plane VMs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Containers, Kubernetes concepts and the AKS managed control plane | 77 | 5 |
| M01L02 | Cluster, node pool and workload responsibilities | 77 | 5 |

### M02 Provisioning clusters (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Create a cluster with a system and a user node pool via CLI; (2) Express the same cluster as a Bicep template
- Common misconception addressed: Running all workloads on the system node pool
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating clusters with the portal and Azure CLI | 77 | 5 |
| M02L02 | Node pools and infrastructure-as-code with Bicep | 77 | 5 |

### M03 Deploying workloads (MASTEMY-DESIGN 18%, design weight)

- Worked applications: (1) Write a Deployment and Service manifest for a web front end; (2) Roll out a new image version and roll it back
- Common misconception addressed: Treating a Pod as a durable, self-healing unit
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Manifests, Deployments and ReplicaSets | 86 | 5 |
| M03L02 | Services, rollouts and rollbacks | 87 | 5 |

### M04 Networking and ingress (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Expose services through an ingress controller with TLS; (2) Compare kubenet and Azure CNI for a given IP plan
- Common misconception addressed: Exposing every service with a public LoadBalancer
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cluster networking models and DNS | 81 | 5 |
| M04L02 | Ingress controllers and TLS termination | 82 | 5 |

### M05 Scaling and upgrades (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Configure the Horizontal Pod Autoscaler and cluster autoscaler; (2) Plan a node-image and Kubernetes version upgrade with surge
- Common misconception addressed: Upgrading a cluster in place with no surge capacity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Horizontal pod and cluster autoscaling | 81 | 5 |
| M05L02 | Cluster and node upgrades and maintenance | 82 | 5 |

### M06 Operations and security (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Enable Container Insights and build a triage view; (2) Use workload identity to access a key vault without secrets
- Common misconception addressed: Storing cloud credentials as plain Kubernetes secrets
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Monitoring and logging with Container Insights | 76 | 5 |
| M06L02 | Workload identity and cluster security baselines | 77 | 5 |

## Integrative case

A SaaS team moves a microservices storefront to AKS. Plan the cluster: system and user node pools, a network and ingress model, manifests for the services, horizontal and cluster autoscaling, an upgrade cadence, and Container Insights plus workload identity, then present a day-2 operations runbook.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0684-final-protected | 30 | 30 | yes |
| MST-0684-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kubernetes and AKS architecture | 5 |
| Provisioning clusters | 5 |
| Deploying workloads | 5 |
| Networking and ingress | 5 |
| Scaling and upgrades | 5 |
| Operations and security | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0684-Q0001** (single-answer, Select ONE) After a node reboots, a bare Pod does not come back. What should run the workload so it self-heals?

- A. A Deployment, which manages a ReplicaSet to keep the desired replica count **(key)**  
  _Rationale:_ Correct: Deployments reconcile desired state and reschedule Pods.
- B. A single Pod manifest with no controller  
  _Rationale:_ A bare Pod is not rescheduled on failure.
- C. A one-off kubectl run command  
  _Rationale:_ That creates an unmanaged workload.
- D. A Service object alone  
  _Rationale:_ A Service exposes Pods; it does not create them.

**MST-0684-Q0002** (multiple-answer, Select TWO) Which TWO are managed by AKS rather than the customer? (Select TWO.)

- A. The Kubernetes control plane (API server, etcd, scheduler) **(key)**  
  _Rationale:_ Correct: AKS operates the managed control plane.
- B. Control plane availability and patching **(key)**  
  _Rationale:_ Correct: Azure maintains control plane health.
- C. The application container images  
  _Rationale:_ Images are the customer's responsibility.
- D. Workload manifests and scaling policy  
  _Rationale:_ These are authored by the customer.

**MST-0684-Q0003** (single-answer, Select ONE) A cluster needs to access Azure Key Vault without storing long-lived credentials in the cluster. What is the recommended approach?

- A. Microsoft Entra Workload Identity federated to the pod's service account **(key)**  
  _Rationale:_ Correct: workload identity issues short-lived tokens, no stored secrets.
- B. A plain Kubernetes Secret holding a client secret  
  _Rationale:_ Long-lived secrets in the cluster are a risk.
- C. Hardcoding a key in the container image  
  _Rationale:_ Secrets in images leak widely.
- D. Disabling authentication to the vault  
  _Rationale:_ That removes access control entirely.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
