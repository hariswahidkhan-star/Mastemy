# Amazon VPC: Networking and Hybrid Connectivity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0754` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon VPC and hybrid connectivity product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-VPC (https://docs.aws.amazon.com/vpc/; https://docs.aws.amazon.com/vpc/latest/userguide/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon VPC: Networking and Hybrid Connectivity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design VPC CIDR ranges, subnets and availability-zone layout
2. Configure routing, internet and NAT gateways
3. Secure traffic with security groups and network ACLs
4. Connect VPCs with peering and transit gateway
5. Establish hybrid connectivity with VPN and Direct Connect
6. Add private service access and DNS resolution

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 VPC and subnets (MASTEMY-DESIGN 16%)

- Worked applications: (1) Carve a /16 VPC into public and private subnets; (2) Spread subnets across two AZs for resilience
- Common misconception addressed: Overlapping CIDR ranges that block future peering
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CIDR planning and subnets | 80 | 5 |
| M01L02 | Availability-zone layout | 80 | 5 |

### M02 Routing and gateways (MASTEMY-DESIGN 16%)

- Worked applications: (1) Route a public subnet to an internet gateway; (2) Give a private subnet outbound-only access via NAT
- Common misconception addressed: Expecting a NAT gateway to allow inbound connections
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Route tables and internet gateway | 80 | 5 |
| M02L02 | NAT gateways and egress | 80 | 5 |

### M03 Traffic security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Allow web traffic with a stateful security group; (2) Add a stateless NACL deny rule
- Common misconception addressed: Assuming security groups are stateless like NACLs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Security groups | 80 | 5 |
| M03L02 | Network ACLs | 80 | 5 |

### M04 Connecting VPCs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Peer two VPCs and update route tables; (2) Centralise many VPCs on a transit gateway
- Common misconception addressed: Expecting peering to be transitive between VPCs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | VPC peering | 80 | 5 |
| M04L02 | Transit gateway | 80 | 5 |

### M05 Hybrid connectivity (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set up a site-to-site VPN to on-premises; (2) Decide when Direct Connect is justified
- Common misconception addressed: Treating a VPN's public-internet path as a private line
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Site-to-site VPN | 80 | 5 |
| M05L02 | Direct Connect | 80 | 5 |

### M06 Private access and DNS (MASTEMY-DESIGN 17%)

- Worked applications: (1) Reach S3 privately with a gateway endpoint; (2) Resolve on-premises names with Route 53 resolver
- Common misconception addressed: Routing private service traffic over the public internet unnecessarily
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | VPC endpoints and PrivateLink | 80 | 5 |
| M06L02 | Route 53 resolver and DNS | 80 | 5 |

## Integrative case

Design the network for a two-tier application across two availability zones: plan CIDR and subnets, route public and private traffic correctly, lock down traffic with security groups and NACLs, connect to an on-premises data centre over VPN, and add private endpoints and DNS, then defend the design in review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0754-final-protected | 40 | 50 | yes |
| MST-0754-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| VPC and subnets | 7 |
| Routing and gateways | 7 |
| Traffic security | 7 |
| Connecting VPCs | 7 |
| Hybrid connectivity | 6 |
| Private access and DNS | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0754-Q0001** (single-answer, Select ONE) A private subnet instance needs to download OS updates but must not accept inbound connections. What provides this?

- A. A NAT gateway **(key)**  
  _Rationale:_ Correct: a NAT gateway allows outbound-initiated traffic while blocking unsolicited inbound.
- B. An internet gateway attached to the subnet  
  _Rationale:_ An internet gateway would make the subnet public and allow inbound.
- C. A VPC peering connection  
  _Rationale:_ Peering connects VPCs; it does not provide internet egress.
- D. A security group allowing all inbound  
  _Rationale:_ Opening inbound is the opposite of the requirement.

**MST-0754-Q0002** (single-answer, Select ONE) How do security groups differ from network ACLs in a VPC?

- A. Security groups are stateful; NACLs are stateless **(key)**  
  _Rationale:_ Correct: security groups track connection state and auto-allow return traffic; NACLs evaluate each direction.
- B. Security groups are stateless; NACLs are stateful  
  _Rationale:_ This reverses the actual behaviour.
- C. Both are stateless  
  _Rationale:_ Security groups are stateful.
- D. Both operate only at the subnet level  
  _Rationale:_ Security groups apply to ENIs/instances; NACLs apply at the subnet.

**MST-0754-Q0003** (multiple-answer, Select TWO) Which TWO statements about VPC peering are correct? (Select TWO.)

- A. Peering is not transitive between VPCs **(key)**  
  _Rationale:_ Correct: traffic does not route through a peered VPC to a third.
- B. Route tables must be updated on both VPCs **(key)**  
  _Rationale:_ Correct: each VPC needs routes to the other's CIDR.
- C. Peering requires overlapping CIDR ranges  
  _Rationale:_ Overlapping CIDRs prevent peering.
- D. Peering automatically connects on-premises networks  
  _Rationale:_ Peering connects VPCs, not on-premises sites.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
