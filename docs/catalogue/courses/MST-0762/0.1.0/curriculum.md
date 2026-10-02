# Amazon EKS: Production Kubernetes Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0762` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon EKS User Guide; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-EKS (https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html; accessed 2026-10-02) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Amazon EKS: Production Kubernetes Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe EKS control plane and node options
2. Manage node groups, Fargate profiles and scaling
3. Configure cluster networking and the VPC CNI
4. Integrate IAM with Kubernetes RBAC (IRSA)
5. Deploy and expose workloads reliably
6. Observe, secure and upgrade clusters

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 EKS architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose managed node groups vs self-managed nodes; (2) Plan a cluster for a regulated workload
- Common misconception addressed: Believing you manage the Kubernetes control plane yourself on EKS
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Control plane and data plane | 120 | 7 |
| M01L02 | Cluster creation options | 120 | 7 |

### M02 Compute and scaling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a Fargate profile for a namespace; (2) Configure autoscaling for bursty batch jobs
- Common misconception addressed: Assuming pods scale compute automatically without a node autoscaler
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Managed node groups and Fargate profiles | 120 | 7 |
| M02L02 | Cluster Autoscaler and Karpenter | 120 | 7 |

### M03 Networking (MASTEMY-DESIGN 17%)

- Worked applications: (1) Expose a service via the AWS Load Balancer Controller; (2) Diagnose pod IP exhaustion in a subnet
- Common misconception addressed: Ignoring subnet IP limits when sizing a cluster
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VPC CNI and pod IPs | 120 | 7 |
| M03L02 | Services, ingress and load balancer controller | 120 | 7 |

### M04 Identity and access (MASTEMY-DESIGN 17%)

- Worked applications: (1) Grant a pod S3 access via IRSA, not node role; (2) Map an IAM principal to a Kubernetes group
- Common misconception addressed: Attaching broad permissions to the node role for pod access
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IAM Roles for Service Accounts (IRSA) | 120 | 7 |
| M04L02 | Kubernetes RBAC and aws-auth | 120 | 7 |

### M05 Workloads and reliability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add readiness/liveness probes and a PodDisruptionBudget; (2) Perform a safe rolling update
- Common misconception addressed: Assuming a running pod with no readiness probe is serving traffic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Deployments, probes and PDBs | 120 | 7 |
| M05L02 | Rollouts and self-healing | 120 | 7 |

### M06 Operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Ship control-plane logs to CloudWatch and trace a pod; (2) Plan a minor-version cluster upgrade
- Common misconception addressed: Upgrading the control plane without checking add-on compatibility
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Logging, metrics and tracing | 120 | 7 |
| M06L02 | Cluster upgrades and security | 120 | 7 |

## Integrative case

Operate a production EKS cluster: choose managed node groups with autoscaling, expose a service through the AWS Load Balancer Controller, grant pod-level S3 access with IRSA, add probes and a PodDisruptionBudget, ship logs to CloudWatch, and plan a safe version upgrade.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0762-final-protected | 40 | 50 | yes |
| MST-0762-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| EKS architecture | 7 |
| Compute and scaling | 7 |
| Networking | 7 |
| Identity and access | 7 |
| Workloads and reliability | 6 |
| Operations | 6 |

Minimum reviewed item bank: 512 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0762-Q0001** (single-answer, Select ONE) In Amazon EKS, who is responsible for managing the Kubernetes control plane?

- A. AWS manages the control plane; you manage worker nodes and workloads **(key)**  
  _Rationale:_ Correct: EKS runs and scales the control plane for you under the shared responsibility model.
- B. You install and patch the control plane on your own EC2 instances  
  _Rationale:_ EKS manages the control plane; you do not run it yourself.
- C. Kubernetes.org hosts it remotely  
  _Rationale:_ That is not how EKS works.
- D. It is fully serverless with no worker nodes ever  
  _Rationale:_ Workloads still need nodes or Fargate profiles.

**MST-0762-Q0002** (single-answer, Select ONE) What is the recommended way to give a specific pod permission to read an S3 bucket?

- A. IAM Roles for Service Accounts (IRSA) **(key)**  
  _Rationale:_ Correct: IRSA scopes AWS permissions to a pod's service account rather than the whole node.
- B. Attach the policy to the node instance role  
  _Rationale:_ That grants the permission to every pod on the node, violating least privilege.
- C. Hard-code access keys in the pod spec  
  _Rationale:_ Static keys in specs are insecure.
- D. Make the bucket public  
  _Rationale:_ Public buckets expose data broadly and do not scope pod access.

**MST-0762-Q0003** (multiple-answer, Select TWO) Which TWO components help a workload scale and stay available on EKS? (Select TWO.)

- A. A node autoscaler such as Cluster Autoscaler or Karpenter **(key)**  
  _Rationale:_ Correct: a node autoscaler adds capacity when pods cannot be scheduled.
- B. A PodDisruptionBudget to limit voluntary disruptions **(key)**  
  _Rationale:_ Correct: a PDB keeps a minimum number of pods available during disruptions.
- C. Deleting readiness probes  
  _Rationale:_ Removing probes harms availability signalling.
- D. Making all pods use the same node  
  _Rationale:_ Concentrating pods reduces availability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
