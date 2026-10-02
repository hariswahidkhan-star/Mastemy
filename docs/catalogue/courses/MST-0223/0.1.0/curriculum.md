# Google Cloud Professional Cloud Network Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0223` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified)  - design assumption: PCNE|
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-PCNE-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design and plan Google Cloud network architectures
2. Implement VPCs, connectivity and hybrid networking
3. Configure network services, load balancing and DNS
4. Secure, monitor and optimise cloud networks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Network design and planning

- Worked applications: (1) Design an IP plan avoiding overlap across regions; (2) Choose shared VPC vs peering for an org
- Common misconception addressed: Assigning overlapping CIDR ranges that block future peering
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VPC design and IP addressing | 180 | 6 |
| M01L02 | Shared VPC and multi-project design | 180 | 6 |
| M01L03 | Routing and network topologies | 180 | 6 |
| M01L04 | Capacity and growth planning | 180 | 6 |

### M02 Connectivity and hybrid networking

- Worked applications: (1) Choose interconnect vs VPN for a bandwidth need; (2) Design hybrid DNS resolution between cloud and on-prem
- Common misconception addressed: Sizing a VPN tunnel for throughput it cannot deliver
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cloud VPN and interconnect | 180 | 6 |
| M02L02 | Peering and private service access | 180 | 6 |
| M02L03 | Hybrid DNS resolution | 180 | 6 |
| M02L04 | Multi-cloud connectivity | 180 | 6 |

### M03 Network services and load balancing

- Worked applications: (1) Select a load balancer for a global HTTPS service; (2) Design DNS failover across two regions
- Common misconception addressed: Picking a regional load balancer for a global workload
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Load balancing options | 180 | 6 |
| M03L02 | Cloud DNS and traffic management | 180 | 6 |
| M03L03 | Cloud CDN and caching | 180 | 6 |
| M03L04 | Network address translation | 180 | 6 |

### M04 Security, monitoring and optimisation

- Worked applications: (1) Diagnose a connectivity failure using flow logs; (2) Reduce egress cost for a cross-region workload
- Common misconception addressed: Ignoring egress charges when designing cross-region traffic
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Firewall policy and segmentation | 180 | 6 |
| M04L02 | Network security controls | 180 | 6 |
| M04L03 | Monitoring and flow logs | 180 | 6 |
| M04L04 | Troubleshooting and cost optimisation | 180 | 6 |

## Integrative case

A network engineer connects an enterprise's on-premises data centre to Google Cloud: designing the VPC and hybrid connectivity, implementing load balancing and DNS, and securing and monitoring the network.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0223-practice-form-A | 108 | 108 | yes |
| MST-0223-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0223-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0223-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Network design and planning | 27 |
| Connectivity and hybrid networking | 27 |
| Network services and load balancing | 27 |
| Security, monitoring and optimisation | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
