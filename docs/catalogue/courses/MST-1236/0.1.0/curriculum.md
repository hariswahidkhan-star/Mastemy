# Oracle Cloud Infrastructure Architect Professional: Current-Version Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1236` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Oracle (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION / unresolved |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of Advanced Networking (design-assumption grouping)
2. Explain and apply the concepts of Compute and Storage at Scale (design-assumption grouping)
3. Explain and apply the concepts of Security and Identity (design-assumption grouping)
4. Explain and apply the concepts of Operations and Resilient Architecture (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 Advanced Networking (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Using overlapping CIDR ranges across peered VCNs
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Advanced VCN design and peering | 240 | 6 |
| M01L02 | Hybrid connectivity (FastConnect, VPN) | 240 | 6 |
| M01L03 | DNS and traffic management | 240 | 6 |

### M02 Compute and Storage at Scale (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Treating a single availability domain as highly available
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Instance configurations, pools and autoscaling | 240 | 6 |
| M02L02 | Storage tiers and performance | 240 | 6 |
| M02L03 | High availability and disaster recovery | 240 | 6 |

### M03 Security and Identity (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Granting broad policies at the tenancy root instead of scoped compartments
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Advanced IAM and policies | 240 | 6 |
| M03L02 | Security services and posture management | 240 | 6 |
| M03L03 | Data protection and encryption/Vault | 240 | 6 |

### M04 Operations and Resilient Architecture (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Designing without a documented recovery objective (RTO/RPO)
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Databases and migration | 240 | 6 |
| M04L02 | Observability and automation (IaC) | 240 | 6 |
| M04L03 | Designing for resilience and cost | 240 | 6 |

## Integrative case

Design a multi-region, highly available enterprise workload on OCI: plan networking and hybrid connectivity, autoscaling compute, DR strategy with defined RTO/RPO, scoped IAM, and automation, then present trade-offs.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1236-practice-form-A | 108 | 108 | yes |
| MST-1236-practice-form-B | 108 | 108 | no (optional practice) |
| MST-1236-practice-form-C | 108 | 108 | no (optional practice) |
| MST-1236-final-protected | 108 | 108 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| Advanced Networking | 27 |
| Compute and Storage at Scale | 27 |
| Security and Identity | 27 |
| Operations and Resilient Architecture | 27 |

Minimum reviewed item bank: 1080 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1236-Q0001** (single-answer, Select ONE) Which approach best achieves high availability for a stateless web tier in OCI?

- A. Distribute instances across multiple availability/fault domains behind a load balancer **(key)**  
  _Rationale:_ Correct: spreading instances and load-balancing removes single points of failure.
- B. Run a single large instance  
  _Rationale:_ A single instance is a single point of failure.
- C. Store everything on one block volume  
  _Rationale:_ One volume is a single point of failure, not HA.
- D. Disable health checks  
  _Rationale:_ Health checks are needed to route around failures.

**MST-1236-Q0002** (single-answer, Select ONE) What must be true of CIDR blocks when peering two VCNs?

- A. They must not overlap **(key)**  
  _Rationale:_ Correct: peered VCNs require non-overlapping CIDR ranges for routing to work.
- B. They must be identical  
  _Rationale:_ Identical ranges overlap and cannot be routed.
- C. They must both be public  
  _Rationale:_ Peering works with private ranges; public is not required.
- D. They must be in the same subnet  
  _Rationale:_ Peered VCNs are separate networks, not one subnet.

**MST-1236-Q0003** (multiple-answer, Select TWO) Which TWO improve disaster recovery for a critical OCI database?

- A. Cross-region replication or standby **(key)**  
  _Rationale:_ Correct: a standby in another region protects against regional failure.
- B. Defined and tested RTO/RPO with automated failover **(key)**  
  _Rationale:_ Correct: documented, tested recovery objectives make DR reliable.
- C. Keeping only a single backup in the same AD  
  _Rationale:_ A single co-located backup does not protect against AD/region loss.
- D. Disabling monitoring  
  _Rationale:_ Monitoring is needed to detect failures.
- E. Hard-coding a single public IP  
  _Rationale:_ Hard-coded IPs hinder failover.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
