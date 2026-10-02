# AWS Certified Advanced Networking — Specialty: Retirement-Aware Track

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0211` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | AWS (no affiliation or endorsement) |
| Exam code | not verified; design assumption: AWS Certified Advanced Networking - Specialty (code ANS-C01 per catalog; unverified) - retirement-aware track |
| Version basis | design assumption - official outline not verified (issuer page egress-blocked) |
| Evidence | **unverified-needs-official-check** - sources: ; official page not fetched |
| Legacy IDs | MST-AWS-AWS-ANSC01-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe AWS networking services and hybrid connectivity options
2. Apply VPC design, routing and multi-account connectivity patterns
3. Evaluate network security, DNS, content delivery and load balancing
4. Analyse monitoring, troubleshooting and optimisation of AWS networks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 VPC design and hybrid connectivity (design-assumption weight; official weights not verified)

- Worked applications: (1) Design a VPC CIDR and subnet plan for a tiered app; (2) Choose between a private dedicated link and an encrypted tunnel for hybrid connectivity
- Common misconception addressed: Assuming overlapping CIDR ranges can simply be peered without conflict
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VPC fundamentals and addressing | 320 | 6 |
| M01L02 | Hybrid connectivity options | 320 | 6 |
| M01L03 | Multi-VPC and multi-account connectivity | 320 | 6 |

### M02 Routing, DNS and delivery (design-assumption weight; official weights not verified)

- Worked applications: (1) Design DNS routing for failover across regions; (2) Select a load-balancer type for a given protocol and need
- Common misconception addressed: Treating DNS TTL as irrelevant to failover behaviour
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Routing and traffic engineering | 320 | 6 |
| M02L02 | DNS design and resolution | 320 | 6 |
| M02L03 | Load balancing and content delivery | 320 | 6 |

### M03 Security, monitoring and troubleshooting (design-assumption weight; official weights not verified)

- Worked applications: (1) Design layered network controls for a sensitive subnet; (2) Troubleshoot a cross-region latency problem using flow data
- Common misconception addressed: Believing security groups and network ACLs behave identically
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Network security controls | 320 | 6 |
| M03L02 | Monitoring and flow analysis | 320 | 6 |
| M03L03 | Troubleshooting and performance optimisation | 320 | 6 |

## Integrative case

You design and operate networking for a hybrid, multi-account AWS estate: connect on-premises to the cloud, build scalable multi-VPC connectivity, secure and optimise traffic, and troubleshoot a cross-region latency issue.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer page egress-blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0211-practice-form-A | 108 | 108 | yes |
| MST-0211-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0211-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0211-final-protected | 108 | 108 | yes |

| Domain | Items per form |
|---|---|
| VPC design and hybrid connectivity | 36 |
| Routing, DNS and delivery | 36 |
| Security, monitoring and troubleshooting | 36 |

Minimum reviewed item bank: 1044 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0211-Q0001** (single-answer, Select ONE) A company needs consistent, private, high-bandwidth connectivity between its data centre and AWS, independent of the public internet. Which option best meets this?

- A. A dedicated private network connection (Direct Connect-style) **(key)**  
  _Rationale:_ Correct: a dedicated private connection provides consistent, private, high-bandwidth connectivity independent of the internet.
- B. A site-to-site VPN over the public internet only  
  _Rationale:_ A VPN over the internet cannot guarantee consistent bandwidth or avoid the public path.
- C. Public S3 access over HTTPS  
  _Rationale:_ This is object access, not private network connectivity.
- D. Emailing data between sites  
  _Rationale:_ Not a network connectivity solution.

**MST-0211-Q0002** (single-answer, Select ONE) Two VPCs that must be connected were created with identical, overlapping CIDR ranges. What is the core problem for simple VPC peering?

- A. Overlapping CIDRs create ambiguous routing, so standard peering cannot route between them **(key)**  
  _Rationale:_ Correct: overlapping address ranges make routing ambiguous and break simple peering.
- B. Peering automatically renumbers one VPC  
  _Rationale:_ Peering does not renumber addresses.
- C. Overlap improves routing efficiency  
  _Rationale:_ Overlap breaks, not improves, routing.
- D. CIDR ranges are irrelevant to peering  
  _Rationale:_ Addressing is central to peering feasibility.

**MST-0211-Q0003** (multiple-answer, Select TWO) Which TWO statements about AWS security groups versus network ACLs are correct? (Select TWO)

- A. Security groups are stateful; return traffic is automatically allowed **(key)**  
  _Rationale:_ Correct: security groups are stateful.
- B. Network ACLs are stateless and evaluate rules in order with explicit allow/deny **(key)**  
  _Rationale:_ Correct: NACLs are stateless and process numbered rules.
- C. Security groups can explicitly deny specific traffic  
  _Rationale:_ Security groups only allow; they cannot explicitly deny.
- D. Network ACLs are stateful like security groups  
  _Rationale:_ NACLs are stateless, unlike security groups.
- E. Both operate only at the DNS layer  
  _Rationale:_ Neither operates at the DNS layer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
