# AWS Hybrid Networking (VPN, Direct Connect)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1494` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://docs.aws.amazon.com/vpn/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS Hybrid Networking (VPN, Direct Connect) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain VPC networking fundamentals for hybrid connectivity
2. Configure Site-to-Site VPN connections
3. Explain AWS Direct Connect and when to use it
4. Use Transit Gateway to connect VPCs and on-prem
5. Plan routing, redundancy and failover
6. Secure and monitor hybrid links

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 VPC foundations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design subnets and route tables for hybrid; (2) Explain the role of a virtual private gateway
- Common misconception addressed: Confusing a VPC with an on-prem network segment
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VPCs, subnets and route tables | 48 | 5 |
| M01L02 | Gateways and connectivity | 48 | 5 |
### M02 Site-to-Site VPN (MASTEMY-DESIGN 16%)

- Worked applications: (1) Set up a Site-to-Site VPN connection; (2) Use two tunnels for redundancy
- Common misconception addressed: Relying on a single VPN tunnel with no redundancy
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | VPN components | 48 | 5 |
| M02L02 | Tunnels and routing | 48 | 5 |
### M03 Direct Connect (MASTEMY-DESIGN 17%)

- Worked applications: (1) Decide VPN vs Direct Connect for throughput; (2) Describe a private virtual interface
- Common misconception addressed: Assuming Direct Connect is encrypted by default
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Dedicated vs hosted connections | 48 | 5 |
| M03L02 | Virtual interfaces | 48 | 5 |
### M04 Transit Gateway (MASTEMY-DESIGN 17%)

- Worked applications: (1) Connect several VPCs via Transit Gateway; (2) Segment traffic with TGW route tables
- Common misconception addressed: Building a tangle of VPC peerings instead of a hub
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Hub-and-spoke connectivity | 48 | 5 |
| M04L02 | Attachments and route tables | 48 | 5 |
### M05 Routing and redundancy (MASTEMY-DESIGN 17%)

- Worked applications: (1) Propagate routes with BGP; (2) Design VPN backup for Direct Connect
- Common misconception addressed: Having no failover path if the primary link fails
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | BGP and route propagation | 48 | 5 |
| M05L02 | Redundancy and failover | 48 | 5 |
### M06 Security and monitoring (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add encryption over Direct Connect; (2) Monitor tunnel and link health
- Common misconception addressed: Leaving hybrid links unmonitored
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Encryption and access | 48 | 5 |
| M06L02 | Monitoring hybrid links | 48 | 5 |

## Integrative case

An enterprise connects on-premises to AWS: design a VPC, choose between Site-to-Site VPN and Direct Connect, use a Transit Gateway to connect many VPCs and the data center, plan routing and redundancy, and secure the links, then meet a bandwidth and resilience requirement.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1494-final-protected | 30 | 30 | yes |
| MST-1494-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| VPC foundations | 5 |
| Site-to-Site VPN | 5 |
| Direct Connect | 5 |
| Transit Gateway | 5 |
| Routing and redundancy | 5 |
| Security and monitoring | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1494-Q0001** (single-answer, Select ONE) A workload needs consistent, high-bandwidth, low-latency connectivity between on-prem and AWS. Which is most appropriate?

- A. AWS Direct Connect **(key)**  
  _Rationale:_ Correct: Direct Connect provides a dedicated, consistent high-bandwidth link.
- B. A single Site-to-Site VPN tunnel over the internet  
  _Rationale:_ VPN over the internet has variable latency and lower, less consistent throughput.
- C. Route 53 health checks  
  _Rationale:_ Health checks are DNS failover, not connectivity.
- D. CloudFront caching  
  _Rationale:_ CloudFront is a CDN, not a hybrid link.

**MST-1494-Q0002** (multiple-answer, Select TWO) Which TWO improve resilience of hybrid connectivity to AWS? (Select TWO.)

- A. Use both VPN tunnels (or a VPN as backup to Direct Connect) **(key)**  
  _Rationale:_ Correct: redundant tunnels/links provide failover if one path fails.
- B. Connect many VPCs and on-prem through a Transit Gateway hub **(key)**  
  _Rationale:_ Correct: a TGW hub simplifies and centralizes resilient connectivity.
- C. Rely on a single VPN tunnel with no backup  
  _Rationale:_ A single tunnel is a single point of failure.
- D. Disable route propagation so routes stay static forever  
  _Rationale:_ Disabling propagation harms failover and dynamic routing.

**MST-1494-Q0003** (single-answer, Select ONE) What is a correct statement about AWS Direct Connect security?

- A. Direct Connect is private but not encrypted by default; add encryption (e.g., a VPN over it) if required **(key)**  
  _Rationale:_ Correct: Direct Connect is a private link but is not encrypted unless you add encryption.
- B. Direct Connect encrypts all traffic automatically with no action  
  _Rationale:_ Direct Connect is not encrypted by default.
- C. Direct Connect is the same as a public internet VPN  
  _Rationale:_ Direct Connect is a dedicated private connection, not internet VPN.
- D. Direct Connect requires no routing configuration  
  _Rationale:_ Routing (often BGP) must be configured.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
