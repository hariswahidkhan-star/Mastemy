# Google Cloud Run: Serverless Application Deployment

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0746` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-RUN (https://cloud.google.com/run/docs; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Run: Serverless Application Deployment (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Deploy containerized services and jobs to Cloud Run from source and from images
2. Configure concurrency, CPU, memory, autoscaling and minimum instances
3. Manage revisions, traffic splitting and rollbacks safely
4. Secure services with IAM, service accounts and ingress controls
5. Connect Cloud Run to other Google Cloud services and handle environment configuration
6. Observe, troubleshoot and control the cost of Cloud Run workloads

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Deploying to Cloud Run (MASTEMY-DESIGN 25%)

- Worked applications: (1) Deploy a sample container to a new Cloud Run service; (2) Run a batch task as a Cloud Run job
- Common misconception addressed: Assuming a Cloud Run service stays running between requests like a VM
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Deploy from source and from a container image | 120 | 5 |
| M01L02 | Services versus jobs and request lifecycle | 120 | 5 |

### M02 Scaling and resources (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set concurrency and resources for a latency target; (2) Configure min-instances to avoid cold starts
- Common misconception addressed: Raising instance count instead of concurrency when throughput is the bottleneck
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Concurrency, CPU and memory settings | 120 | 5 |
| M02L02 | Autoscaling and minimum instances | 120 | 5 |

### M03 Revisions and traffic (MASTEMY-DESIGN 25%)

- Worked applications: (1) Split traffic 90/10 for a canary release; (2) Roll back to a known-good revision
- Common misconception addressed: Editing a live revision instead of deploying a new one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Revisions and configuration immutability | 120 | 5 |
| M03L02 | Traffic splitting and rollbacks | 120 | 5 |

### M04 Security, integration and operations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Restrict a service to internal ingress with a dedicated service account; (2) Mount a secret and read logs to diagnose a 500
- Common misconception addressed: Running services with the default broad service account
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IAM, service accounts and ingress | 120 | 5 |
| M04L02 | Connections, secrets, logging and cost | 120 | 5 |

## Integrative case

A team must ship an internal invoicing API on Cloud Run: containerize it, deploy with a canary traffic split, lock it to internal ingress with a dedicated service account, wire in a Cloud SQL connection and secrets, then tune concurrency and min-instances against a cost target and defend the configuration.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0746-final-protected | 40 | 50 | yes |
| MST-0746-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Deploying to Cloud Run | 10 |
| Scaling and resources | 10 |
| Revisions and traffic | 10 |
| Security, integration and operations | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0746-Q0001** (single-answer, Select ONE) A Cloud Run service receives bursty traffic and each container can safely handle many simultaneous requests. To raise throughput most cost-effectively, what should you adjust first?

- A. Increase the per-container concurrency setting **(key)**  
  _Rationale:_ Correct: higher concurrency lets each instance serve more requests, reducing the instance count needed.
- B. Lower concurrency to 1 and add more instances  
  _Rationale:_ This wastes resources and raises cost when containers can handle parallel requests.
- C. Switch the service to a Compute Engine VM  
  _Rationale:_ That abandons the serverless model without addressing the concurrency setting.
- D. Disable autoscaling  
  _Rationale:_ Disabling autoscaling removes the mechanism that handles bursts.

**MST-0746-Q0002** (multiple-answer, Select TWO) You are rolling out a risky change to a Cloud Run service. Which TWO actions support a safe, reversible release? (Select TWO.)

- A. Deploy the change as a new revision and send it only a small traffic percentage **(key)**  
  _Rationale:_ Correct: a canary limits exposure while you watch metrics.
- B. Keep the previous revision available to roll back to **(key)**  
  _Rationale:_ Correct: an intact prior revision makes rollback immediate.
- C. Delete the previous revision immediately after deploying  
  _Rationale:_ Deleting it removes the rollback target.
- D. Send 100% of traffic to the new revision at once  
  _Rationale:_ That is the opposite of a controlled canary.

**MST-0746-Q0003** (single-answer, Select ONE) An internal Cloud Run API should be callable only from within the VPC and services should not use broad default credentials. Which configuration best meets this?

- A. Set internal ingress and assign a dedicated least-privilege service account **(key)**  
  _Rationale:_ Correct: internal ingress plus a scoped service account enforces both requirements.
- B. Make the service public and rely on a password in the app  
  _Rationale:_ Public ingress exposes the service beyond the VPC.
- C. Use the default service account with Owner role  
  _Rationale:_ Owner is far broader than least privilege.
- D. Allow unauthenticated invocations  
  _Rationale:_ Unauthenticated access contradicts the internal-only requirement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
