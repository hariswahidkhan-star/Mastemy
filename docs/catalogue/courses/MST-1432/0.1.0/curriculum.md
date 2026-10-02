# Azure Networking Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1432` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Azure networking documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/azure/networking/design-guide/overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZNET |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure Networking Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe virtual networks, subnets and IP addressing
2. Apply network security groups and route tables
3. Explain connectivity options and load balancing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Virtual networks and subnets (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Design an address space with two subnets; (2) Attach a network interface to a VM
- Common misconception addressed: Assuming resources in different VNets communicate without peering
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VNets, subnets and IP addressing | 84 | 4 |
| M01L02 | Network interfaces | 84 | 4 |

### M02 Security and routing (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Write NSG rules to allow only required traffic; (2) Force traffic through a firewall with a UDR
- Common misconception addressed: Relying on default routes when a UDR is required for egress control
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Network security groups | 84 | 4 |
| M02L02 | Route tables and user-defined routes | 84 | 4 |

### M03 Connectivity and load balancing (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Peer two virtual networks; (2) Create a Standard Load Balancer for web VMs
- Common misconception addressed: Expecting VNet peering to be transitive across a hub
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VNet peering and VPN gateway | 72 | 4 |
| M03L02 | Azure Load Balancer basics | 72 | 4 |

## Integrative case

An engineer designs a two-subnet virtual network with NSGs, peers it to a hub network, and fronts web VMs with a Standard Load Balancer.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1432-final-protected | 24 | 32 | yes |
| MST-1432-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Virtual networks and subnets | 8 |
| Security and routing | 8 |
| Connectivity and load balancing | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1432-Q0001** (single-answer, Select ONE) Two resources are in separate virtual networks and cannot reach each other. What is needed?

- A. An explicit connection such as VNet peering **(key)**  
  _Rationale:_ Correct: resources in different VNets cannot communicate unless you connect them, for example with peering.
- B. A blob access tier change  
  _Rationale:_ Access tiers are a storage concept, not network connectivity.
- C. A Conditional Access policy  
  _Rationale:_ Conditional Access governs identity access, not VNet routing.
- D. A mailbox rule  
  _Rationale:_ Inbox rules handle email, not network connectivity.

**MST-1432-Q0002** (multiple-answer, Select TWO) Which TWO statements about Azure VNet peering are correct? (Select TWO.)

- A. Peering is not transitive; each peering is a direct link **(key)**  
  _Rationale:_ Correct: peering connects two VNets directly and is not transitive.
- B. Traffic between peered VNets stays on the Microsoft backbone **(key)**  
  _Rationale:_ Correct: peered traffic is routed over the Microsoft backbone, not the public internet.
- C. Peering automatically encrypts all mailboxes  
  _Rationale:_ Peering is a network link and does not encrypt mailboxes.
- D. Peering sets blob redundancy  
  _Rationale:_ Redundancy is a storage setting, unrelated to peering.

**MST-1432-Q0003** (single-answer, Select ONE) Which construct is the scope for associating a network security group?

- A. A subnet (or a network interface) **(key)**  
  _Rationale:_ Correct: NSGs are associated at the subnet or network interface level.
- B. A storage container  
  _Rationale:_ Containers are a storage concept, not an NSG scope.
- C. A directory role  
  _Rationale:_ Directory roles are an Entra concept, not an NSG scope.
- D. A Bicep module  
  _Rationale:_ A module is an authoring construct, not an NSG association scope.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
