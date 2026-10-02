# Cloud Networking Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1690` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-CNF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Cloud Networking Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain cloud networking concepts and how they differ from on-premises
2. Design virtual networks, subnets and IP addressing in the cloud
3. Configure routing, gateways and connectivity between networks
4. Apply cloud network security controls
5. Connect cloud networks to on-premises and other clouds

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cloud networking foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map an on-premises concept to its cloud equivalent; (2) Explain why cloud networks are software-defined
- Common misconception addressed: Assuming cloud networking is identical to physical networking
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How cloud networking differs from on-premises | 72 | 6 |
| M01L02 | Regions, availability zones and the shared model | 72 | 6 |

### M02 Virtual networks and addressing (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Carve a VPC CIDR into public and private subnets; (2) Avoid overlapping ranges across networks
- Common misconception addressed: Choosing an address range that overlaps the on-premises network
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Virtual networks (VPC/VNet) and subnets | 72 | 6 |
| M02L02 | IP address planning and CIDR in the cloud | 72 | 6 |

### M03 Routing and gateways (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide which subnet gets an internet gateway; (2) Use a NAT gateway for outbound-only access
- Common misconception addressed: Giving a private database subnet a direct internet route
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Route tables and default routes | 72 | 6 |
| M03L02 | Internet, NAT and private gateways | 72 | 6 |

### M04 Cloud network security (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write security-group rules for a web/app/db tier; (2) Isolate tiers so only required flows are allowed
- Common misconception addressed: Opening 0.0.0.0/0 on all ports for convenience
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Security groups and network ACLs | 72 | 6 |
| M04L02 | Segmentation and least-privilege network design | 72 | 6 |

### M05 Hybrid and multi-cloud connectivity (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose VPN vs dedicated interconnect for a need; (2) Plan non-overlapping addressing for peering
- Common misconception addressed: Assuming peered or VPN networks can use overlapping CIDRs
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | VPN and private interconnects to on-premises | 72 | 6 |
| M05L02 | Peering and multi-cloud connectivity | 72 | 6 |

## Integrative case

A team is moving an application to the cloud and must design its network from scratch. Plan a virtual network with public and private subnets, set up routing and a gateway for internet access, apply security groups to isolate tiers, and connect the environment back to the on-premises data centre securely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1690-final-protected | 25 | 25 | yes |
| MST-1690-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cloud networking foundations | 5 |
| Virtual networks and addressing | 5 |
| Routing and gateways | 5 |
| Cloud network security | 5 |
| Hybrid and multi-cloud connectivity | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1690-Q0001** (single-answer, Select ONE) Why should a private database subnet not have a route to an internet gateway?

- A. It exposes the database directly to the internet, widening the attack surface **(key)**  
  _Rationale:_ Correct: private tiers should not be directly internet-reachable.
- B. Internet gateways slow down databases  
  _Rationale:_ The concern is exposure, not speed.
- C. Databases cannot use IP addresses  
  _Rationale:_ Databases use IP addressing like any host.
- D. It would disable the security groups  
  _Rationale:_ A route does not disable security groups.

**MST-1690-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when planning cloud IP addressing? (Select TWO.)

- A. Choose CIDR ranges that do not overlap on-premises networks **(key)**  
  _Rationale:_ Correct: overlaps break routing to on-premises.
- B. Leave room to add subnets as the environment grows **(key)**  
  _Rationale:_ Correct: planning headroom avoids re-addressing later.
- C. Reuse the same CIDR in every network for simplicity  
  _Rationale:_ Identical ranges collide when networks connect.
- D. Assign one giant subnet with no segmentation  
  _Rationale:_ Flat networks remove isolation between tiers.

**MST-1690-Q0003** (single-answer, Select ONE) A private subnet's instances need to download patches but must not accept inbound internet traffic. What fits?

- A. A NAT gateway for outbound-only internet access **(key)**  
  _Rationale:_ Correct: NAT allows outbound connections without inbound exposure.
- B. An internet gateway with a public IP on each instance  
  _Rationale:_ That exposes instances to inbound traffic.
- C. No gateway at all  
  _Rationale:_ With no route the patches cannot be fetched.
- D. A VPN only to another cloud  
  _Rationale:_ A VPN to another cloud does not reach public patch servers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
