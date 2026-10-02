# Cloud SQL, Spanner and AlloyDB

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1460` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-DB (https://cloud.google.com/sql/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Cloud SQL, Spanner and AlloyDB (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compare Cloud SQL, Spanner and AlloyDB and their use cases
2. Provision and configure a Cloud SQL instance
3. Apply high availability, backups and point-in-time recovery
4. Explain Spanner's horizontal scale and consistency model
5. Explain AlloyDB's PostgreSQL compatibility and analytics acceleration
6. Secure connectivity and control cost across managed databases

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Choosing a managed database (MASTEMY-DESIGN 16%)

- Worked applications: (1) Match three workloads to Cloud SQL, Spanner or AlloyDB; (2) Explain when global horizontal scale justifies Spanner
- Common misconception addressed: Choosing Spanner for a small single-region app that Cloud SQL fits
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Managed database options | 48 | 5 |
| M01L02 | Decision criteria and trade-offs | 48 | 5 |

### M02 Cloud SQL provisioning (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a Cloud SQL instance with the right tier and flags; (2) Connect an app using the Cloud SQL Auth Proxy
- Common misconception addressed: Exposing a public IP instead of using private IP or the proxy
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Instances, tiers and flags | 48 | 5 |
| M02L02 | Connectivity and the Auth Proxy | 48 | 5 |

### M03 Availability and recovery (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable high availability and test a failover; (2) Perform a point-in-time recovery to just before an error
- Common misconception addressed: Assuming automated backups alone give point-in-time recovery
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | High availability configuration | 48 | 5 |
| M03L02 | Backups and point-in-time recovery | 48 | 5 |

### M04 Cloud Spanner (MASTEMY-DESIGN 17%)

- Worked applications: (1) Design an interleaved schema to avoid hotspots; (2) Explain strong consistency with horizontal scale
- Common misconception addressed: Using a monotonically increasing key that creates a write hotspot
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Spanner architecture and scale | 48 | 5 |
| M04L02 | Schema design and consistency | 48 | 5 |

### M05 AlloyDB (MASTEMY-DESIGN 17%)

- Worked applications: (1) Explain AlloyDB PostgreSQL compatibility for a migration; (2) Describe the columnar engine's benefit for analytics
- Common misconception addressed: Assuming AlloyDB requires rewriting all PostgreSQL queries
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | AlloyDB and PostgreSQL compatibility | 48 | 5 |
| M05L02 | Columnar acceleration and HA | 48 | 5 |

### M06 Security and cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Restrict access with private IP and IAM database auth; (2) Right-size and schedule to control database cost
- Common misconception addressed: Leaving an oversized instance running 24/7 for a dev workload
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Connectivity security and IAM auth | 48 | 5 |
| M06L02 | Cost control and right-sizing | 48 | 5 |

## Integrative case

An application outgrows a single database: evaluate whether Cloud SQL, Spanner or AlloyDB fits each workload, provision a highly available Cloud SQL instance with backups and PITR, plan a Spanner schema for global scale, and secure connections while keeping cost in check.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1460-final-protected | 30 | 30 | yes |
| MST-1460-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Choosing a managed database | 5 |
| Cloud SQL provisioning | 5 |
| Availability and recovery | 5 |
| Cloud Spanner | 5 |
| AlloyDB | 5 |
| Security and cost | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1460-Q0001** (single-answer, Select ONE) An application needs a globally distributed relational database with strong consistency and horizontal scale. Which service fits best?

- A. Cloud Spanner **(key)**  
  _Rationale:_ Correct: Spanner provides horizontal scale with strong consistency globally.
- B. Cloud SQL  
  _Rationale:_ Cloud SQL is a single-region managed instance, not globally horizontally scaled.
- C. Cloud Storage  
  _Rationale:_ Cloud Storage is object storage, not a relational database.
- D. BigQuery  
  _Rationale:_ BigQuery is an analytics warehouse, not an OLTP relational database.

**MST-1460-Q0002** (multiple-answer, Select TWO) Which TWO protect a Cloud SQL instance's connectivity? (Select TWO.)

- A. Use private IP instead of a public IP where possible **(key)**  
  _Rationale:_ Correct: private IP keeps traffic off the public internet.
- B. Connect through the Cloud SQL Auth Proxy **(key)**  
  _Rationale:_ Correct: the Auth Proxy provides secure, IAM-based connections.
- C. Open the instance to 0.0.0.0/0 for convenience  
  _Rationale:_ Opening to all addresses exposes the database broadly.
- D. Share the root password in the application repo  
  _Rationale:_ Hardcoding credentials in a repo is a serious leak risk.

**MST-1460-Q0003** (single-answer, Select ONE) To recover a Cloud SQL database to the moment just before an accidental deletion, what must be enabled?

- A. Point-in-time recovery (binary logging / PITR) **(key)**  
  _Rationale:_ Correct: PITR lets you restore to a specific time before the error.
- B. Only a single nightly backup  
  _Rationale:_ A nightly backup restores to that snapshot, not an arbitrary moment.
- C. Read replicas  
  _Rationale:_ Replicas serve reads; they are not a recovery mechanism for this.
- D. A larger machine tier  
  _Rationale:_ Tier affects performance, not recovery granularity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
