# AWS Containers Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1503` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Containers Security (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the container security model on ECS/EKS/ECR
2. Secure images and the supply chain
3. Apply runtime, network and IAM controls for containers
4. Monitor and respond to container security events

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Container security foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map responsibilities for a managed cluster; (2) Identify attack surfaces in a container stack
- Common misconception addressed: Thinking the cloud provider secures the application inside the container
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shared responsibility for containers | 72 | 7 |
| M01L02 | ECS, EKS and ECR security surfaces | 72 | 7 |

### M02 Image and supply-chain security (MASTEMY-DESIGN 25%)

- Worked applications: (1) Enable image scan-on-push; (2) Choose a minimal base image
- Common misconception addressed: Assuming a 'latest' tag from a public registry is safe to run
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Image scanning in ECR | 72 | 7 |
| M02L02 | Minimal images and provenance | 72 | 7 |

### M03 Runtime and access controls (MASTEMY-DESIGN 25%)

- Worked applications: (1) Give a pod a least-privilege role; (2) Restrict pod-to-pod traffic with network policy
- Common misconception addressed: Granting the node role to every pod instead of per-workload roles
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IAM roles for tasks/pods | 72 | 7 |
| M03L02 | Network policy and secrets | 72 | 7 |

### M04 Monitoring and response (MASTEMY-DESIGN 25%)

- Worked applications: (1) Enable runtime threat detection; (2) Centralize container logs for investigation
- Common misconception addressed: Treating container workloads as too ephemeral to need monitoring
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Detecting container threats | 72 | 7 |
| M04L02 | Logging and incident response | 72 | 7 |

## Integrative case

A team runs microservices on EKS with public images and broad permissions. Harden it: scan and sign images in ECR, apply least-privilege IAM roles for service accounts, restrict network policy, and add runtime monitoring.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1503-final-protected | 28 | 35 | yes |
| MST-1503-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Container security foundations | 7 |
| Image and supply-chain security | 7 |
| Runtime and access controls | 7 |
| Monitoring and response | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1503-Q0001** (single-answer, Select ONE) Which ECR feature helps catch known vulnerabilities in container images?

- A. Image scanning (scan on push) **(key)**  
  _Rationale:_ Correct: ECR scanning detects known CVEs in images.
- B. Longer image tags  
  _Rationale:_ Tag length does not affect security scanning.
- C. Making the repo public  
  _Rationale:_ Public repos increase exposure, not security.
- D. Disabling encryption  
  _Rationale:_ Disabling encryption weakens security.

**MST-1503-Q0002** (multiple-answer, Select TWO) Which TWO apply least privilege to containers? (Select TWO.)

- A. Assign IAM roles per task/pod (IRSA) scoped to needs **(key)**  
  _Rationale:_ Correct: per-workload roles limit permissions.
- B. Restrict pod-to-pod traffic with network policies **(key)**  
  _Rationale:_ Correct: network policy limits lateral movement.
- C. Give every pod the node's full instance role  
  _Rationale:_ That over-permissions every workload.
- D. Run all containers as root with host access  
  _Rationale:_ That maximizes blast radius.

**MST-1503-Q0003** (single-answer, Select ONE) Under the shared responsibility model for managed containers, who secures the application code in the image?

- A. The customer **(key)**  
  _Rationale:_ Correct: customers are responsible for their application and image contents.
- B. Only AWS  
  _Rationale:_ AWS secures the underlying platform, not your app code.
- C. The image registry vendor  
  _Rationale:_ The registry stores images; it does not vet your code.
- D. No one is responsible  
  _Rationale:_ Security is a shared responsibility, with the customer owning the app.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
