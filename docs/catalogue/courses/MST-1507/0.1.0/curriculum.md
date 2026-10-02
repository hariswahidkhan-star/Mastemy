# AWS Networking Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1507` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Networking Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design VPCs, subnets and routing
2. Connect networks with peering, Transit Gateway and endpoints
3. Control traffic with security groups, NACLs and load balancers
4. Plan hybrid connectivity and DNS

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 VPC foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Plan non-overlapping CIDRs for three VPCs; (2) Route a private subnet out via NAT
- Common misconception addressed: Assuming a subnet is public or private based on its name rather than its route
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VPCs, subnets and CIDR | 72 | 7 |
| M01L02 | Route tables, IGW and NAT | 72 | 7 |

### M02 Connecting networks (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose peering vs Transit Gateway at scale; (2) Add a gateway endpoint for S3
- Common misconception addressed: Thinking VPC peering is transitive across many VPCs
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | VPC peering vs Transit Gateway | 72 | 7 |
| M02L02 | VPC endpoints (interface and gateway) | 72 | 7 |

### M03 Traffic control (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a least-privilege security group; (2) Pick ALB vs NLB for a workload
- Common misconception addressed: Confusing stateful security groups with stateless NACLs
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Security groups vs network ACLs | 72 | 7 |
| M03L02 | Load balancers and target groups | 72 | 7 |

### M04 Hybrid and DNS (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose VPN vs Direct Connect for a link; (2) Resolve private names across hybrid
- Common misconception addressed: Believing Direct Connect is encrypted by default like a VPN
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Hybrid connectivity (VPN/Direct Connect) | 72 | 7 |
| M04L02 | Route 53 and private DNS | 72 | 7 |

## Integrative case

A company must connect three VPCs and an on-prem datacenter. Design the addressing and routing, connect VPCs via Transit Gateway, add private service endpoints, apply security controls, and plan hybrid connectivity and DNS.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1507-final-protected | 28 | 35 | yes |
| MST-1507-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| VPC foundations | 7 |
| Connecting networks | 7 |
| Traffic control | 7 |
| Hybrid and DNS | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1507-Q0001** (single-answer, Select ONE) How do security groups differ from network ACLs in a VPC?

- A. Security groups are stateful; NACLs are stateless **(key)**  
  _Rationale:_ Correct: security groups track connection state; NACLs evaluate each direction independently.
- B. Security groups are stateless; NACLs are stateful  
  _Rationale:_ It is the reverse.
- C. Both are stateless  
  _Rationale:_ Security groups are stateful.
- D. Both are stateful  
  _Rationale:_ NACLs are stateless.

**MST-1507-Q0002** (multiple-answer, Select TWO) Which TWO are reasons to use a Transit Gateway over many point-to-point VPC peerings? (Select TWO.)

- A. It provides transitive routing among many VPCs **(key)**  
  _Rationale:_ Correct: Transit Gateway hubs connectivity transitively.
- B. It simplifies routing as the number of VPCs grows **(key)**  
  _Rationale:_ Correct: a hub-and-spoke avoids an N-squared mesh of peerings.
- C. It makes all traffic free  
  _Rationale:_ Transit Gateway has its own data/attachment charges.
- D. It removes the need for CIDR planning  
  _Rationale:_ Non-overlapping CIDRs are still required.

**MST-1507-Q0003** (single-answer, Select ONE) What makes a subnet effectively 'public' in a VPC?

- A. A route to an internet gateway in its route table **(key)**  
  _Rationale:_ Correct: the route to the IGW makes a subnet public.
- B. Naming it 'public'  
  _Rationale:_ The name has no effect on routing.
- C. Putting it in us-east-1  
  _Rationale:_ Region does not determine public/private.
- D. Attaching more security groups  
  _Rationale:_ Security groups do not create internet routing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
