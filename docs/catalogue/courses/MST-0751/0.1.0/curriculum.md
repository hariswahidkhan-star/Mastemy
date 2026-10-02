# AWS Architecture: Complete Cloud Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0751` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-ARCH (https://docs.aws.amazon.com/; https://aws.amazon.com/architecture/well-architected/; accessed 2026-10-02) |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — AWS Architecture: Complete Cloud Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain core AWS global infrastructure and the shared responsibility model
2. Choose compute options (EC2, containers, serverless) for a workload
3. Design VPC networking and connectivity
4. Select storage and database services appropriately
5. Apply IAM identity and least-privilege access
6. Design for reliability and high availability
7. Apply security and cost-optimization practices
8. Use the Well-Architected Framework pillars to evaluate a design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 AWS foundations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Choose a region and AZ layout; (2) Assign responsibilities between AWS and the customer
- Common misconception addressed: Assuming AWS secures the customer's data and configuration
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Global infrastructure: regions and AZs | 120 | 5 |
| M01L02 | Shared responsibility model | 120 | 5 |

### M02 Compute (MASTEMY-DESIGN 13%)

- Worked applications: (1) Pick EC2 vs containers vs Lambda for three workloads; (2) Right-size an instance for a workload
- Common misconception addressed: Defaulting to one large always-on server for everything
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | EC2 and instances | 120 | 5 |
| M02L02 | Containers and serverless | 120 | 5 |

### M03 Networking (MASTEMY-DESIGN 12%)

- Worked applications: (1) Design public and private subnets; (2) Scope a security group to least access
- Common misconception addressed: Opening a security group to 0.0.0.0/0 unnecessarily
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VPC, subnets and routing | 120 | 5 |
| M03L02 | Connectivity and security groups | 120 | 5 |

### M04 Storage (MASTEMY-DESIGN 13%)

- Worked applications: (1) Choose S3 vs EBS vs EFS for three needs; (2) Pick an S3 storage class for an access pattern
- Common misconception addressed: Using block storage where object storage fits better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | S3 object storage | 120 | 5 |
| M04L02 | Block and file storage | 120 | 5 |

### M05 Databases (MASTEMY-DESIGN 12%)

- Worked applications: (1) Choose relational vs NoSQL for a workload; (2) Plan a multi-AZ database for availability
- Common misconception addressed: Forcing every data model into a relational database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Relational with RDS/Aurora | 120 | 5 |
| M05L02 | NoSQL with DynamoDB | 120 | 5 |

### M06 Identity and access (MASTEMY-DESIGN 13%)

- Worked applications: (1) Grant an app a role instead of long-lived keys; (2) Narrow an overly broad policy
- Common misconception addressed: Using the root account for everyday work
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | IAM users, roles and policies | 120 | 5 |
| M06L02 | Least privilege | 120 | 5 |

### M07 Reliability (MASTEMY-DESIGN 12%)

- Worked applications: (1) Spread a tier across availability zones; (2) Define an RPO/RTO-aware backup plan
- Common misconception addressed: Running a single-AZ system and assuming it is highly available
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | High availability and multi-AZ | 120 | 5 |
| M07L02 | Backup and recovery | 120 | 5 |

### M08 Security and cost (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add encryption and monitoring to a design; (2) Review a design against the Well-Architected pillars
- Common misconception addressed: Treating security and cost as afterthoughts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Security practices | 120 | 5 |
| M08L02 | Cost optimization and Well-Architected | 120 | 5 |

## Integrative case

Design the foundation for a web application on AWS: pick a multi-AZ compute and database layout inside a VPC, store assets in S3, define least-privilege IAM roles, add a cost guardrail, and review the plan against the Well-Architected pillars.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0751-final-protected | 40 | 50 | yes |
| MST-0751-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AWS foundations | 5 |
| Compute | 5 |
| Networking | 5 |
| Storage | 5 |
| Databases | 5 |
| Identity and access | 5 |
| Reliability | 5 |
| Security and cost | 5 |

Minimum reviewed item bank: 576 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0751-Q0001** (single-answer, Select ONE) Under the AWS shared responsibility model, which is always the customer's responsibility?

- A. Configuring their own IAM permissions and securing their data **(key)**  
  _Rationale:_ Correct: customers are responsible for security 'in' the cloud, including access and data.
- B. The physical security of AWS data centers  
  _Rationale:_ Physical security is AWS's responsibility.
- C. Maintaining the hypervisor host hardware  
  _Rationale:_ The underlying hardware is AWS's responsibility.
- D. The global network backbone hardware  
  _Rationale:_ AWS manages the underlying infrastructure.

**MST-0751-Q0002** (multiple-answer, Select TWO) Which TWO practices improve the availability of a workload on AWS? (Select TWO.)

- A. Deploy across multiple Availability Zones **(key)**  
  _Rationale:_ Correct: spreading across AZs survives a single-AZ failure.
- B. Use managed multi-AZ databases where appropriate **(key)**  
  _Rationale:_ Correct: multi-AZ databases add failover resilience.
- C. Run everything in a single AZ to reduce latency  
  _Rationale:_ A single AZ is a single point of failure.
- D. Avoid backups to save storage cost  
  _Rationale:_ Skipping backups harms recoverability.

**MST-0751-Q0003** (single-answer, Select ONE) An application running on EC2 needs to read from an S3 bucket. What is the recommended way to grant access?

- A. Attach an IAM role to the EC2 instance with least-privilege permissions **(key)**  
  _Rationale:_ Correct: instance roles avoid long-lived keys and follow least privilege.
- B. Embed root account access keys in the app  
  _Rationale:_ Using root keys is insecure and over-privileged.
- C. Make the bucket public to everyone  
  _Rationale:_ Public buckets expose data unnecessarily.
- D. Share one IAM user's password with the app  
  _Rationale:_ Sharing user passwords is insecure and not how apps authenticate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
