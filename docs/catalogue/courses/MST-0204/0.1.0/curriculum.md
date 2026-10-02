# AWS Certified Developer — Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0204` v0.1.0 | Batch 8 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | AWS (no affiliation or endorsement) |
| Exam code | DVA-C02 |
| Version basis | AWS Certified Developer - Associate (DVA-C02) Exam Guide (accessed 2026-10-02) |
| Evidence | **verified-official-source** - sources: SRC-AWS-DVAC02 |
| Legacy IDs | MST-AWS-AWS-DVAC02-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Develop applications using core AWS services, SDKs and appropriate design patterns
2. Implement application security, authentication, authorization and encryption on AWS
3. Deploy applications using AWS deployment strategies and CI/CD tooling
4. Troubleshoot and optimize AWS applications for performance and cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Development with AWS Services (32%)

- Worked applications: (1) Design an event-driven workflow with Lambda and a queue; (2) Choose a data store (DynamoDB vs RDS vs S3) for three access patterns
- Common misconception addressed: Treating Lambda as always cheaper regardless of execution profile
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Compute, serverless and the AWS SDKs | 180 | 6 |
| M01L02 | Data stores, messaging and event-driven patterns | 180 | 6 |

### M02 Security (26%)

- Worked applications: (1) Scope an IAM policy to least privilege for a function; (2) Encrypt data at rest and in transit for a data store
- Common misconception addressed: Hardcoding credentials instead of using IAM roles
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authentication, authorization and IAM | 180 | 6 |
| M02L02 | Encryption, secrets and secure coding | 180 | 6 |

### M03 Deployment (24%)

- Worked applications: (1) Configure a blue/green deployment for a service; (2) Build a CI/CD pipeline with automated tests
- Common misconception addressed: Assuming a single all-at-once deployment is always acceptable
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Packaging, artifacts and infrastructure as code | 180 | 6 |
| M03L02 | Deployment strategies and CI/CD | 180 | 6 |

### M04 Troubleshooting and Optimization (18%)

- Worked applications: (1) Use logs, metrics and traces to find a failing request path; (2) Optimize a function for cold-start latency and cost
- Common misconception addressed: Scaling up resources before finding the root cause
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Observability: logging, metrics and tracing | 180 | 6 |
| M04L02 | Performance and cost optimization | 180 | 6 |

## Integrative case

A developer builds a serverless order API on AWS: chooses compute and data services, secures it with IAM and encryption, sets up a CI/CD pipeline with a safe deployment strategy, then diagnoses a latency and cost problem in production.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - confirm official question count and duration on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0204-practice-form-A | 54 | 54 | yes |
| MST-0204-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0204-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0204-final-protected | 54 | 54 | yes |

| Domain | Items per form |
|---|---|
| Development with AWS Services | 14 |
| Security | 14 |
| Deployment | 13 |
| Troubleshooting and Optimization | 13 |

Minimum reviewed item bank: 564 (plan; 3 sample items drafted, 0 reviewed).

## Documented official topic weights

| Domain | Weight |
|---|---|
| Development with AWS Services | 32% |
| Security | 26% |
| Deployment | 24% |
| Troubleshooting and Optimization | 18% |

## Sample items (original, draft, unreviewed)

**MST-0204-Q0001** (single-answer, Select ONE) A Lambda function needs to read from a DynamoDB table. What is the recommended way to grant it access?

- A. Embed an access key and secret in the function code  
  _Rationale:_ Hardcoding long-term credentials is insecure and discouraged.
- B. Attach an IAM execution role with least-privilege permissions **(key)**  
  _Rationale:_ Correct: a Lambda execution role grants temporary, scoped credentials following least privilege.
- C. Make the DynamoDB table public  
  _Rationale:_ Public access violates least privilege and security best practice.
- D. Store the key in an environment variable in plaintext  
  _Rationale:_ Plaintext long-term keys are insecure.

**MST-0204-Q0002** (single-answer, Select ONE) Which deployment strategy routes traffic to a new environment and allows instant rollback by switching back?

- A. In-place all-at-once deployment  
  _Rationale:_ All-at-once has no parallel environment to roll back to instantly.
- B. Blue/green deployment **(key)**  
  _Rationale:_ Correct: blue/green runs a new (green) environment alongside the old (blue) and switches traffic, enabling fast rollback.
- C. Manual FTP upload  
  _Rationale:_ That is not an AWS deployment strategy.
- D. Deleting and recreating the stack each time  
  _Rationale:_ That causes downtime and is not a rollback strategy.

**MST-0204-Q0003** (multiple-answer, Select TWO) Which TWO AWS services are most appropriate for decoupling components of an event-driven application? (Select TWO)

- A. Amazon SQS **(key)**  
  _Rationale:_ Correct: SQS queues decouple producers and consumers.
- B. Amazon SNS **(key)**  
  _Rationale:_ Correct: SNS enables pub/sub fan-out to decouple components.
- C. Amazon EC2 security groups  
  _Rationale:_ Security groups are network firewalls, not decoupling services.
- D. AWS IAM  
  _Rationale:_ IAM manages access, not component decoupling.
- E. Amazon Route 53  
  _Rationale:_ Route 53 is DNS, not a decoupling service.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
