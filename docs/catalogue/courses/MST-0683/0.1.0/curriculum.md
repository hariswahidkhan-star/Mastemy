# Azure Virtual Networks and Hybrid Connectivity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0683` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). VNet, peering, VPN/ExpressRoute and NSG behaviour partially verified against official Microsoft Learn networking docs; re-verify product specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-AZ-VNET (https://learn.microsoft.com/azure/virtual-network/, accessed 2026-10-02) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure Virtual Networks and Hybrid Connectivity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design virtual networks, subnets and IP address plans
2. Control traffic with network security groups and application security groups
3. Connect networks with VNet peering and hub-and-spoke topologies
4. Establish hybrid connectivity with VPN Gateway and ExpressRoute
5. Route and inspect traffic with user-defined routes and network virtual appliances
6. Secure and resolve names with Private Link, private endpoints and Azure DNS

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Virtual networks and addressing (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Design a non-overlapping IP plan for three regions; (2) Segment a VNet into tiered subnets with service delegation
- Common misconception addressed: Overlapping address spaces that block future peering
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VNets, subnets and IP addressing | 81 | 5 |
| M01L02 | Address planning for growth and peering | 82 | 5 |

### M02 Network security groups (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Write NSG rules for a three-tier app with deny-by-default; (2) Use application security groups to simplify rule management
- Common misconception addressed: Relying on default rules without explicit deny
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | NSGs, rule priority and effective rules | 77 | 5 |
| M02L02 | Application security groups and micro-segmentation | 77 | 5 |

### M03 Peering and hub-and-spoke (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Peer three spokes to a hub and share a firewall; (2) Enable gateway transit so spokes use the hub gateway
- Common misconception addressed: Expecting peering to be transitive by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VNet peering and transitivity | 81 | 5 |
| M03L02 | Hub-and-spoke topology design | 82 | 5 |

### M04 Hybrid connectivity (MASTEMY-DESIGN 18%, design weight)

- Worked applications: (1) Choose VPN vs ExpressRoute for a latency-sensitive workload; (2) Design ExpressRoute with a VPN as failover
- Common misconception addressed: Assuming a site-to-site VPN matches ExpressRoute SLAs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | VPN Gateway: site-to-site and point-to-site | 86 | 5 |
| M04L02 | ExpressRoute and resilient hybrid design | 87 | 5 |

### M05 Routing and inspection (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Force tunnel egress through a network virtual appliance; (2) Use user-defined routes to steer traffic to Azure Firewall
- Common misconception addressed: Trusting default system routes for regulated egress
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | System routes and user-defined routes | 77 | 5 |
| M05L02 | Network virtual appliances and forced tunnelling | 77 | 5 |

### M06 Private connectivity and DNS (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Expose a storage account via a private endpoint; (2) Configure private DNS zones for private endpoint resolution
- Common misconception addressed: Leaving PaaS on public endpoints in a locked-down VNet
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Private Link and private endpoints | 76 | 5 |
| M06L02 | Azure DNS and private resolution | 77 | 5 |

## Integrative case

A bank connects an on-premises data centre to Azure for a regulated workload. Design the network: a hub-and-spoke topology, a non-overlapping IP plan, ExpressRoute with a VPN failover, NSG and firewall rules, forced tunnelling for egress inspection, and private endpoints for PaaS, then justify the design to a security review board.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0683-final-protected | 30 | 30 | yes |
| MST-0683-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Virtual networks and addressing | 5 |
| Network security groups | 5 |
| Peering and hub-and-spoke | 5 |
| Hybrid connectivity | 5 |
| Routing and inspection | 5 |
| Private connectivity and DNS | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0683-Q0001** (single-answer, Select ONE) Spoke A is peered to a hub, and the hub is peered to spoke B. Spoke A cannot reach spoke B. Why?

- A. VNet peering is non-transitive; spoke-to-spoke needs gateway/route transit or a hub NVA **(key)**  
  _Rationale:_ Correct: peering is not transitive by default.
- B. Peering always routes all traffic automatically  
  _Rationale:_ Peering is non-transitive.
- C. NSGs block all peered traffic by design  
  _Rationale:_ NSGs are explicit, not the cause here.
- D. Spokes cannot be peered to a hub  
  _Rationale:_ They can; transitivity is the issue.

**MST-0683-Q0002** (multiple-answer, Select TWO) Which TWO factors favour ExpressRoute over a site-to-site VPN for a regulated workload? (Select TWO.)

- A. Traffic stays off the public internet over a private circuit **(key)**  
  _Rationale:_ Correct: ExpressRoute uses a private connection.
- B. Higher, more predictable bandwidth and SLA **(key)**  
  _Rationale:_ Correct: ExpressRoute offers consistent throughput and an SLA.
- C. It is always cheaper than a VPN  
  _Rationale:_ ExpressRoute is typically more expensive.
- D. It needs no on-premises configuration  
  _Rationale:_ It requires provider and edge configuration.

**MST-0683-Q0003** (single-answer, Select ONE) A security team requires all internet egress to be inspected by a firewall appliance. What steers VNet traffic to it?

- A. A user-defined route sending 0.0.0.0/0 to the appliance's internal IP **(key)**  
  _Rationale:_ Correct: a UDR overrides system routes to force egress through the NVA.
- B. An NSG allow rule on the subnet  
  _Rationale:_ NSGs filter but do not redirect routing.
- C. Enabling VNet peering  
  _Rationale:_ Peering connects networks; it does not force inspection.
- D. A private DNS zone  
  _Rationale:_ DNS resolves names; it does not route egress.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
