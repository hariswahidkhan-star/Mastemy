# AWS Certified Cloud Practitioner

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0201` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | AWS (no affiliation or endorsement) |
| Exam code | CLF-C02 |
| Version basis | Exam guide (version not confirmed - official PDF blocked) |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-CLF |
| Legacy IDs | MST-AWS-AWS-CLFC02-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the AWS Cloud value proposition and cloud economics
2. Explain the shared responsibility model, IAM and AWS security/compliance services
3. Identify core AWS compute, storage, database, networking and AI services
4. Compare AWS pricing models, cost tools and support plans

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Cloud Concepts (24%)

- Worked applications: (1) Apply the Well-Architected pillars to a monolith migration; (2) Compare on-premises vs AWS TCO for a small workload
- Common misconception addressed: Treating 'the cloud' as automatically cheaper
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Benefits of the AWS Cloud | 115 | 6 |
| M01L02 | Design principles of the AWS Cloud | 115 | 6 |
| M01L03 | Migration to the AWS Cloud | 115 | 6 |
| M01L04 | Cloud economics | 116 | 6 |

### M02 Security and Compliance (30%)

- Worked applications: (1) Apply the shared responsibility model to EC2 vs Lambda; (2) Design IAM users, roles and MFA for a five-person team
- Common misconception addressed: Using the root account for daily administration
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Shared responsibility model | 144 | 6 |
| M02L02 | Security, governance and compliance concepts | 144 | 6 |
| M02L03 | AWS access management | 144 | 6 |
| M02L04 | Security components and resources | 144 | 6 |

### M03 Cloud Technology and Services (34%)

- Worked applications: (1) Choose compute, storage and database services for a three-tier app; (2) Place resources across Regions, AZs and edge locations
- Common misconception addressed: Confusing Availability Zones with Regions
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Deploying and operating in the AWS Cloud | 81 | 6 |
| M03L02 | AWS global infrastructure | 81 | 6 |
| M03L03 | Compute services | 81 | 6 |
| M03L04 | Database services | 81 | 6 |
| M03L05 | Network services | 81 | 6 |
| M03L06 | Storage services | 81 | 6 |
| M03L07 | AI/ML and analytics services | 81 | 6 |
| M03L08 | Other in-scope services | 86 | 6 |

### M04 Billing, Pricing, and Support (12%)

- Worked applications: (1) Estimate cost with the Pricing Calculator and set Budgets; (2) Choose a Support plan for a business-critical workload
- Common misconception addressed: Assuming Savings Plans apply automatically to all services
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Pricing models | 76 | 6 |
| M04L02 | Billing, budget and cost management | 76 | 6 |
| M04L03 | Technical resources and support options | 78 | 6 |

## Integrative case

A start-up moves a web app to AWS: choose global infrastructure placement, IAM structure, core services and a support/billing plan, and estimate monthly cost.

## Cumulative assessment

Form length basis: From search snippets (65 questions / 90 min) - official exam guide not retrieved; re-verify.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0201-practice-form-A | 65 | 90 | yes |
| MST-0201-practice-form-B | 65 | 90 | no (optional practice) |
| MST-0201-practice-form-C | 65 | 90 | no (optional practice) |
| MST-0201-final-protected | 65 | 90 | yes |

| Domain | Items per form |
|---|---|
| Cloud Concepts | 16 |
| Security and Compliance | 19 |
| Cloud Technology and Services | 22 |
| Billing, Pricing, and Support | 8 |

Minimum reviewed item bank: 824 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0201-Q0001** (single-answer, Select ONE) Under the shared responsibility model, which task belongs to AWS for Amazon EC2?

- A. Patching the guest operating system  
  _Rationale:_ On EC2 (IaaS) the customer patches the guest OS.
- B. Configuring security groups  
  _Rationale:_ Security group rules are set by the customer.
- C. Securing the physical hosts and the virtualisation layer **(key)**  
  _Rationale:_ Correct: AWS is responsible for security OF the cloud: hardware, facilities and the hypervisor.
- D. Encrypting application data  
  _Rationale:_ The customer chooses and manages data encryption.

**MST-0201-Q0002** (single-answer, Select ONE) Which pricing model gives the biggest discount for steady, predictable usage in return for a 1- or 3-year commitment?

- A. On-Demand  
  _Rationale:_ On-Demand has no commitment and no discount.
- B. Savings Plans / Reserved Instances **(key)**  
  _Rationale:_ Correct: commitment-based models trade a term commitment for lower rates.
- C. Spot Instances  
  _Rationale:_ Spot gives deep discounts but can be interrupted, so it does not suit steady predictable load.
- D. Dedicated Hosts on-demand  
  _Rationale:_ Dedicated Hosts cost more and are used for licensing or compliance reasons.

**MST-0201-Q0003** (single-answer, Select ONE) Which AWS service records API calls made in an account, for auditing?

- A. Amazon CloudWatch  
  _Rationale:_ CloudWatch handles metrics, logs and alarms. API audit trails come from CloudTrail.
- B. AWS CloudTrail **(key)**  
  _Rationale:_ Correct: CloudTrail records API activity for governance and audit.
- C. AWS Config  
  _Rationale:_ Config records resource configuration state, not API calls.
- D. Amazon Inspector  
  _Rationale:_ Inspector scans for vulnerabilities.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
