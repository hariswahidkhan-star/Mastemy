# Amazon EC2: Compute Operations and Optimization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0755` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon EC2 product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-EC2 (https://docs.aws.amazon.com/ec2/; https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon EC2: Compute Operations and Optimization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain EC2 instances, AMIs and instance types
2. Launch and connect to instances securely
3. Configure storage, networking and security groups
4. Scale with Auto Scaling and load balancing
5. Choose purchasing options to optimize cost
6. Monitor, maintain and troubleshoot instances

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 EC2 fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick an instance family for a workload; (2) Explain the stop vs terminate difference
- Common misconception addressed: Thinking terminating an instance is the same as stopping it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instances, AMIs and instance families | 80 | 5 |
| M01L02 | Instance lifecycle | 80 | 5 |

### M02 Launching and access (MASTEMY-DESIGN 16%)

- Worked applications: (1) Launch an instance into a chosen subnet; (2) Connect using a key pair securely
- Common misconception addressed: Embedding credentials instead of using instance roles
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Launching instances | 80 | 5 |
| M02L02 | Key pairs and secure connection | 80 | 5 |

### M03 Storage and networking (MASTEMY-DESIGN 17%)

- Worked applications: (1) Attach and size an EBS volume; (2) Scope a security group to least access
- Common misconception addressed: Confusing ephemeral instance store with durable EBS
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | EBS volumes and instance store | 80 | 5 |
| M03L02 | Security groups and ENIs | 80 | 5 |

### M04 Scaling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define an Auto Scaling policy; (2) Place instances behind a load balancer
- Common misconception addressed: Scaling vertically when horizontal scaling fits better
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Auto Scaling groups | 80 | 5 |
| M04L02 | Load balancing | 80 | 5 |

### M05 Cost optimization (MASTEMY-DESIGN 17%)

- Worked applications: (1) Match purchasing options to workloads; (2) Right-size an over-provisioned instance
- Common misconception addressed: Running On-Demand for a steady 24x7 workload
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | On-Demand, Reserved, Savings Plans, Spot | 80 | 5 |
| M05L02 | Right-sizing | 80 | 5 |

### M06 Operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set a CloudWatch alarm on CPU; (2) Troubleshoot an instance that fails status checks
- Common misconception addressed: Ignoring status checks until an outage occurs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Monitoring with CloudWatch | 80 | 5 |
| M06L02 | Maintenance and troubleshooting | 80 | 5 |

## Integrative case

Stand up the compute tier for a web app on EC2: pick an instance type and AMI, place instances in private subnets behind a load balancer, attach the right storage, set an Auto Scaling policy, and choose a cost-effective purchasing mix.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0755-final-protected | 40 | 50 | yes |
| MST-0755-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| EC2 fundamentals | 7 |
| Launching and access | 7 |
| Storage and networking | 7 |
| Scaling | 7 |
| Cost optimization | 6 |
| Operations | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0755-Q0001** (single-answer, Select ONE) Which EC2 storage option provides durable block storage that persists independently of the instance lifecycle?

- A. Amazon EBS **(key)**  
  _Rationale:_ Correct: EBS volumes are durable and persist beyond instance stop/start.
- B. Instance store  
  _Rationale:_ Instance store is ephemeral and lost when the instance stops.
- C. A security group  
  _Rationale:_ A security group is a firewall, not storage.
- D. An AMI  
  _Rationale:_ An AMI is a launch template image, not attached block storage.

**MST-0755-Q0002** (multiple-answer, Select TWO) Which TWO EC2 purchasing choices typically reduce cost for steady, long-running workloads? (Select TWO.)

- A. Reserved Instances **(key)**  
  _Rationale:_ Correct: Reserved Instances discount steady long-term usage.
- B. Savings Plans **(key)**  
  _Rationale:_ Correct: Savings Plans discount committed usage.
- C. On-Demand for 24x7 steady load  
  _Rationale:_ On-Demand is the most expensive for steady load.
- D. Launching the largest instance available regardless of need  
  _Rationale:_ Over-provisioning increases cost.

**MST-0755-Q0003** (single-answer, Select ONE) To handle a variable web workload automatically, which EC2 feature adds or removes instances based on demand?

- A. Auto Scaling groups **(key)**  
  _Rationale:_ Correct: Auto Scaling adjusts capacity to demand.
- B. A larger single instance  
  _Rationale:_ A bigger single instance does not scale with demand automatically.
- C. An AMI  
  _Rationale:_ An AMI is an image, not a scaling mechanism.
- D. A key pair  
  _Rationale:_ A key pair is for secure login, not scaling.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
