# Amazon EC2 Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1481` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-EC2 (https://docs.aws.amazon.com/ec2/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Amazon EC2 Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Launch and configure EC2 instances for a workload
2. Choose instance families, AMIs and storage
3. Secure instances with security groups, key pairs and IAM roles
4. Scale with Auto Scaling groups and launch templates
5. Attach and manage EBS volumes, snapshots and instance store
6. Optimize cost with purchasing options and right-sizing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 EC2 fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Launch an instance from an AMI and connect with a key pair; (2) Choose an availability zone and VPC subnet for an instance
- Common misconception addressed: Assuming a stopped instance stops all charges including EBS
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instances, AMIs and regions/AZs | 48 | 5 |
| M01L02 | Launching and connecting to an instance | 48 | 5 |

### M02 Instance types and AMIs (MASTEMY-DESIGN 16%)

- Worked applications: (1) Select an instance family for a compute-bound workload; (2) Create a custom AMI from a configured instance
- Common misconception addressed: Treating all instance families as equivalent on price/performance
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Instance families and sizing | 48 | 5 |
| M02L02 | AMIs, custom images and user data | 48 | 5 |

### M03 Security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a security group that allows HTTP but limits SSH by source; (2) Attach an IAM role so the app needs no static keys
- Common misconception addressed: Opening SSH to 0.0.0.0/0 for convenience
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Security groups and key pairs | 48 | 5 |
| M03L02 | IAM roles and instance metadata | 48 | 5 |

### M04 Scaling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a launch template and an Auto Scaling group; (2) Configure a target-tracking scaling policy with health checks
- Common misconception addressed: Confusing an Auto Scaling group with a load balancer
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Launch templates and Auto Scaling groups | 48 | 5 |
| M04L02 | Scaling policies and health checks | 48 | 5 |

### M05 Storage (MASTEMY-DESIGN 17%)

- Worked applications: (1) Attach and resize an EBS volume without data loss; (2) Create and restore an EBS snapshot
- Common misconception addressed: Storing critical data on instance store that is lost on stop
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | EBS volumes and types | 48 | 5 |
| M05L02 | Snapshots and instance store | 48 | 5 |

### M06 Cost optimization (MASTEMY-DESIGN 17%)

- Worked applications: (1) Right-size an over-provisioned instance from metrics; (2) Compare On-Demand, Savings Plans, Reserved and Spot for a workload
- Common misconception addressed: Using Spot for a workload that cannot tolerate interruption
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Purchasing options | 48 | 5 |
| M06L02 | Right-sizing and cost monitoring | 48 | 5 |

## Integrative case

Deploy a resilient web application on EC2: choose instance families and an AMI, secure access with security groups and an instance role, place instances in an Auto Scaling group behind a load balancer, manage EBS volumes and snapshots, and build a cost plan using Savings Plans and Spot where appropriate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1481-final-protected | 30 | 30 | yes |
| MST-1481-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| EC2 fundamentals | 5 |
| Instance types and AMIs | 5 |
| Security | 5 |
| Scaling | 5 |
| Storage | 5 |
| Cost optimization | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1481-Q0001** (single-answer, Select ONE) A fault-tolerant batch job can be interrupted and resumed. Which EC2 purchasing option minimizes its cost?

- A. Spot Instances **(key)**  
  _Rationale:_ Correct: Spot offers the deepest discount for interruption-tolerant workloads.
- B. On-Demand Instances  
  _Rationale:_ On-Demand costs more and is unnecessary for an interruptible job.
- C. A 3-year Reserved Instance  
  _Rationale:_ Reservations suit steady long-running load, not a one-off batch job.
- D. Dedicated Hosts  
  _Rationale:_ Dedicated Hosts add cost for isolation the job does not need.

**MST-1481-Q0002** (multiple-answer, Select TWO) Which TWO improve the security of an EC2 instance? (Select TWO.)

- A. Restrict the SSH security-group rule to known source IP ranges **(key)**  
  _Rationale:_ Correct: limiting source ranges reduces exposure.
- B. Attach an IAM role instead of storing static access keys on the instance **(key)**  
  _Rationale:_ Correct: instance roles supply temporary credentials with no static keys.
- C. Open all ports to 0.0.0.0/0 so nothing is blocked  
  _Rationale:_ Opening all ports widely exposes the instance.
- D. Embed long-lived access keys in the AMI  
  _Rationale:_ Baking keys into an AMI is a serious credential-leak risk.

**MST-1481-Q0003** (single-answer, Select ONE) You need capacity to recover automatically if an instance fails and to scale with demand. What should you use?

- A. An Auto Scaling group with a launch template and health checks **(key)**  
  _Rationale:_ Correct: an ASG replaces unhealthy instances and scales to demand.
- B. A single large standalone instance  
  _Rationale:_ A standalone instance has no self-healing or scaling.
- C. An S3 bucket  
  _Rationale:_ S3 stores objects and does not run compute.
- D. A manually launched fleet with no group  
  _Rationale:_ Unmanaged instances do not auto-heal or scale.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
