# Anthos and Hybrid Cloud Concepts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1469` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://cloud.google.com/anthos/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Anthos and Hybrid Cloud Concepts (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain hybrid and multi-cloud concepts and drivers
2. Describe Anthos/GKE Enterprise and fleet management
3. Apply Config Management for consistent configuration
4. Apply policy guardrails across clusters
5. Explain the service mesh and its benefits
6. Centralize observability across environments

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Hybrid cloud concepts (MASTEMY-DESIGN 16%)

- Worked applications: (1) List reasons to run hybrid rather than single-cloud; (2) Choose a pattern for a latency-sensitive app
- Common misconception addressed: Assuming hybrid is always cheaper or simpler
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Hybrid and multi-cloud drivers | 48 | 5 |
| M01L02 | Trade-offs and patterns | 48 | 5 |
### M02 Anthos and fleets (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe what a fleet groups together; (2) Attach an on-prem cluster to a fleet
- Common misconception addressed: Thinking Anthos replaces Kubernetes rather than managing it
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Anthos / GKE Enterprise overview | 48 | 5 |
| M02L02 | Fleets and attached clusters | 48 | 5 |
### M03 Config management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply a config from a Git repo to clusters; (2) Detect and reconcile config drift
- Common misconception addressed: Editing clusters manually and bypassing GitOps
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Config Sync and GitOps | 48 | 5 |
| M03L02 | Drift and reconciliation | 48 | 5 |
### M04 Policy (MASTEMY-DESIGN 17%)

- Worked applications: (1) Block noncompliant deployments with a policy; (2) Audit existing resources against a constraint
- Common misconception addressed: Relying on reviews instead of enforced policy
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Policy Controller guardrails | 48 | 5 |
| M04L02 | Constraints and enforcement | 48 | 5 |
### M05 Service mesh (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use the mesh for mTLS between services; (2) Shift traffic for a canary release
- Common misconception addressed: Believing the mesh requires rewriting application code
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Mesh concepts and sidecars | 48 | 5 |
| M05L02 | Traffic, security and telemetry | 48 | 5 |
### M06 Observability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Aggregate logs across environments; (2) Build a dashboard spanning clusters
- Common misconception addressed: Leaving each cluster's telemetry siloed
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Centralized logging and metrics | 48 | 5 |
| M06L02 | Multi-cluster dashboards | 48 | 5 |

## Integrative case

An enterprise runs workloads on-premises and in multiple clouds: use Anthos (now Google Cloud's fleet/GKE Enterprise approach) to standardize Kubernetes clusters, apply config management and policy, add a service mesh, and centralize observability, then plan a phased hybrid rollout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1469-final-protected | 30 | 30 | yes |
| MST-1469-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Hybrid cloud concepts | 5 |
| Anthos and fleets | 5 |
| Config management | 5 |
| Policy | 5 |
| Service mesh | 5 |
| Observability | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1469-Q0001** (single-answer, Select ONE) What problem does Anthos / GKE Enterprise fleet management primarily address?

- A. Managing Kubernetes clusters consistently across on-prem and multiple clouds **(key)**  
  _Rationale:_ Correct: fleets provide consistent management and policy across environments.
- B. Replacing Kubernetes with a proprietary container runtime  
  _Rationale:_ Anthos manages Kubernetes rather than replacing it.
- C. Eliminating the need for any networking  
  _Rationale:_ Networking is still required; Anthos does not remove it.
- D. Providing a single-region-only database  
  _Rationale:_ That is unrelated to fleet management.

**MST-1469-Q0002** (multiple-answer, Select TWO) Which TWO are benefits of using a service mesh across clusters? (Select TWO.)

- A. Mutual TLS between services without changing app code **(key)**  
  _Rationale:_ Correct: the mesh adds mTLS transparently via sidecars.
- B. Traffic shifting for canary releases **(key)**  
  _Rationale:_ Correct: the mesh can route a percentage of traffic for safe rollouts.
- C. Removing the need for any Kubernetes clusters  
  _Rationale:_ The mesh runs on clusters; it does not remove them.
- D. Guaranteeing zero cost for all traffic  
  _Rationale:_ A mesh does not make traffic free.

**MST-1469-Q0003** (single-answer, Select ONE) Config Management with GitOps keeps clusters consistent by doing what?

- A. Continuously reconciling clusters to a declared state stored in Git **(key)**  
  _Rationale:_ Correct: GitOps applies and reconciles the Git-declared config across clusters.
- B. Letting admins edit each cluster manually and hoping they match  
  _Rationale:_ Manual edits cause drift, the opposite of GitOps.
- C. Deleting all clusters nightly  
  _Rationale:_ GitOps reconciles config; it does not delete clusters.
- D. Storing config only in each engineer's laptop  
  _Rationale:_ Config lives in a shared Git repo, not on laptops.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
