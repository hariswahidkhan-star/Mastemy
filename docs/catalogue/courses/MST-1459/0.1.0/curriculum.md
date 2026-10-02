# VPC Networking on Google Cloud

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1459` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-VPC (https://cloud.google.com/vpc/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — VPC Networking on Google Cloud (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design VPC networks, subnets and IP ranges
2. Configure routes and firewall rules for traffic control
3. Connect networks with peering and Shared VPC
4. Provide internet access with Cloud NAT and external IPs
5. Load balance and secure traffic at the edge
6. Observe and troubleshoot network connectivity

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 VPC and subnets (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design non-overlapping subnet ranges for two regions; (2) Choose auto vs custom mode for a new VPC
- Common misconception addressed: Picking overlapping CIDR ranges that block future peering
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VPC networks and regions | 48 | 5 |
| M01L02 | Subnets and IP address planning | 48 | 5 |

### M02 Routes and firewall rules (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write firewall rules to allow web traffic and deny the rest; (2) Use network tags to scope a rule to specific instances
- Common misconception addressed: Assuming firewall rules are stateless and must be opened both ways
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Routes and default gateway | 48 | 5 |
| M02L02 | Firewall rules, tags and priorities | 48 | 5 |

### M03 Connecting networks (MASTEMY-DESIGN 17%)

- Worked applications: (1) Peer two VPCs and confirm route exchange; (2) Set up Shared VPC with host and service projects
- Common misconception addressed: Expecting transitive routing across a chain of VPC peerings
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VPC Network Peering | 48 | 5 |
| M03L02 | Shared VPC and project roles | 48 | 5 |

### M04 Internet and NAT (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure Cloud NAT for private instances to reach the internet; (2) Decide when an external IP is needed vs NAT
- Common misconception addressed: Giving every instance an external IP instead of using NAT
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | External IPs and egress | 48 | 5 |
| M04L02 | Cloud NAT configuration | 48 | 5 |

### M05 Load balancing and edge security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose a load balancer type for a global web app; (2) Attach Cloud Armor rules to protect the frontend
- Common misconception addressed: Confusing internal and external load balancer use cases
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Load balancer types | 48 | 5 |
| M05L02 | Cloud Armor and edge protection | 48 | 5 |

### M06 Observability and troubleshooting (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use connectivity tests to diagnose a blocked path; (2) Read VPC flow logs to find a dropped connection
- Common misconception addressed: Blaming the application when a firewall rule blocks the traffic
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Flow logs and monitoring | 48 | 5 |
| M06L02 | Connectivity tests and troubleshooting | 48 | 5 |

## Integrative case

A company segments production and development on Google Cloud: design VPC subnets and IP ranges, write firewall rules that isolate tiers, use Shared VPC for central control, give private instances outbound access via Cloud NAT, place a load balancer in front of the web tier, and verify reachability with network tools.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1459-final-protected | 30 | 30 | yes |
| MST-1459-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| VPC and subnets | 5 |
| Routes and firewall rules | 5 |
| Connecting networks | 5 |
| Internet and NAT | 5 |
| Load balancing and edge security | 5 |
| Observability and troubleshooting | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1459-Q0001** (single-answer, Select ONE) Private instances with no external IP need to download OS updates from the internet. What provides outbound access?

- A. Cloud NAT **(key)**  
  _Rationale:_ Correct: Cloud NAT gives private instances outbound internet access without external IPs.
- B. Assigning each instance an external IP  
  _Rationale:_ That works but exposes instances and is not least-privilege.
- C. A VPC peering connection  
  _Rationale:_ Peering connects VPCs, not the public internet.
- D. An internal load balancer  
  _Rationale:_ Internal load balancers route internal traffic, not internet egress.

**MST-1459-Q0002** (multiple-answer, Select TWO) Which TWO are true about VPC firewall rules on Google Cloud? (Select TWO.)

- A. They are stateful, so return traffic is allowed automatically **(key)**  
  _Rationale:_ Correct: stateful rules permit return traffic without a reverse rule.
- B. They can be scoped to instances using network tags **(key)**  
  _Rationale:_ Correct: tags target rules to specific instances.
- C. They require opening both directions for a single connection  
  _Rationale:_ Stateful rules do not need a separate return-direction rule.
- D. They apply only to the default network  
  _Rationale:_ Rules apply to the VPC in which they are defined.

**MST-1459-Q0003** (single-answer, Select ONE) Two VPCs, A and B, are peered; B is peered with C. Can A reach C through B?

- A. No, because VPC peering is non-transitive **(key)**  
  _Rationale:_ Correct: peering does not provide transitive routing between A and C.
- B. Yes, peering is always transitive  
  _Rationale:_ Peering is explicitly non-transitive.
- C. Yes, if A and C share a subnet  
  _Rationale:_ Shared subnets are not how peered VPCs route.
- D. Only if Cloud NAT is enabled  
  _Rationale:_ NAT concerns internet egress, not inter-VPC routing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
