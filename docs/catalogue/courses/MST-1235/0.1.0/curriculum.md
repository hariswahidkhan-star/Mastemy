# Oracle Cloud Infrastructure Architect Associate: Current-Version Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1235` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Oracle (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION / unresolved |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of OCI Core Infrastructure (design-assumption grouping)
2. Explain and apply the concepts of Networking and Security (design-assumption grouping)
3. Explain and apply the concepts of Databases, Observability and Governance (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 OCI Core Infrastructure (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Confusing availability domains with fault domains
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Regions, availability domains and fault domains | 160 | 6 |
| M01L02 | Compute instances and images | 160 | 6 |
| M01L03 | Block, object and file storage | 160 | 6 |

### M02 Networking and Security (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Expecting a public IP to work without an internet gateway and route rule
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Virtual Cloud Networks (VCN) and subnets | 160 | 6 |
| M02L02 | Identity and Access Management (IAM) | 160 | 6 |
| M02L03 | Security lists, NSGs and gateways | 160 | 6 |

### M03 Databases, Observability and Governance (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming tenancy-wide admin is needed for every task
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | OCI database options | 160 | 6 |
| M03L02 | Monitoring, logging and events | 160 | 6 |
| M03L03 | Cost management and governance | 160 | 6 |

## Integrative case

Design a resilient two-tier application on OCI: choose a region and ADs, lay out the VCN and subnets, pick compute and storage, apply IAM policies and a budget, and justify the design to a reviewer.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1235-practice-form-A | 54 | 54 | yes |
| MST-1235-practice-form-B | 54 | 54 | no (optional practice) |
| MST-1235-practice-form-C | 54 | 54 | no (optional practice) |
| MST-1235-final-protected | 54 | 54 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| OCI Core Infrastructure | 18 |
| Networking and Security | 18 |
| Databases, Observability and Governance | 18 |

Minimum reviewed item bank: 576 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1235-Q0001** (single-answer, Select ONE) What is the purpose of a fault domain within an OCI availability domain?

- A. To group hardware so a failure affects only one group **(key)**  
  _Rationale:_ Correct: fault domains isolate hardware failures within a single availability domain.
- B. To replicate data to another region automatically  
  _Rationale:_ Cross-region replication is a separate capability, not a fault domain.
- C. To provide a public DNS name  
  _Rationale:_ DNS is unrelated to fault domains.
- D. To store object storage buckets  
  _Rationale:_ Object storage is not what fault domains define.

**MST-1235-Q0002** (single-answer, Select ONE) Which OCI construct is the primary virtual network boundary for your resources?

- A. Virtual Cloud Network (VCN) **(key)**  
  _Rationale:_ Correct: a VCN is the software-defined private network in a region.
- B. Compartment  
  _Rationale:_ Compartments organise resources for access/billing, not networking boundaries.
- C. Bucket  
  _Rationale:_ A bucket is object storage, not a network.
- D. Tenancy  
  _Rationale:_ A tenancy is the root account container, not a network.

**MST-1235-Q0003** (multiple-answer, Select TWO) Which TWO are required for an instance in a public subnet to reach the internet?

- A. An internet gateway attached to the VCN **(key)**  
  _Rationale:_ Correct: an internet gateway provides the path to/from the internet.
- B. A route rule directing 0.0.0.0/0 to the internet gateway **(key)**  
  _Rationale:_ Correct: the route table must send default traffic to the gateway.
- C. A block volume backup policy  
  _Rationale:_ Backup policies are unrelated to internet reachability.
- D. An autonomous database  
  _Rationale:_ A database is unrelated to internet reachability.
- E. A budget alert  
  _Rationale:_ Budget alerts are a cost feature, not networking.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
