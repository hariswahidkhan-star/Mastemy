# AWS Certified Cloud Practitioner (CLF-C02) Exam Prep

> **Curriculum blueprint / specification - not finished lesson content or videos.** Course `MST-AWS-AWS-CLFC02-001` | Batch 1 | content_version 0.1.0 | approval_status: draft

| Field | Value |
|---|---|
| Official exam code | CLF-C02 |
| Awarding body | Amazon Web Services (no affiliation or endorsement) |
| Syllabus version used | Exam guide (version not confirmed - official PDF blocked) |
| Evidence status | **NOT officially verified - domain list/weights from search snippets only; official page was blocked** |
| Source | SRC-AWS-CLF - https://docs.aws.amazon.com/pdfs/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.pdf (accessed 2026-10-02, method: search-snippet) |
| Estimated learner hours | 40 |
| Assessment hours (20%) | 8.0 h (480 min) |
| Question formats | MCQ and multiple-response only |

## Learning outcomes

1. Describe the AWS Cloud value proposition and cloud economics
2. Explain the shared responsibility model, IAM and AWS security/compliance services
3. Identify core AWS compute, storage, database, networking and AI services
4. Compare AWS pricing models, cost tools and support plans

## Modules and lessons

Instructional time: 1920 min across 19 lessons (~101 min each: ~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.

### Module 1: Cloud Concepts (24%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M1.L1 | Benefits of the AWS Cloud | 101 | 7 |
| M1.L2 | Design principles of the AWS Cloud | 101 | 7 |
| M1.L3 | Migration to the AWS Cloud | 101 | 7 |
| M1.L4 | Cloud economics | 101 | 7 |
| M1.T | Module 1 test | 15 | 15 |

### Module 2: Security and Compliance (30%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M2.L1 | Shared responsibility model | 101 | 7 |
| M2.L2 | Security, governance and compliance concepts | 101 | 7 |
| M2.L3 | AWS access management | 101 | 7 |
| M2.L4 | Security components and resources | 101 | 7 |
| M2.T | Module 2 test | 15 | 15 |

### Module 3: Cloud Technology and Services (34%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M3.L1 | Deploying and operating in the AWS Cloud | 101 | 7 |
| M3.L2 | AWS global infrastructure | 101 | 7 |
| M3.L3 | Compute services | 101 | 7 |
| M3.L4 | Database services | 101 | 7 |
| M3.L5 | Network services | 101 | 7 |
| M3.L6 | Storage services | 101 | 7 |
| M3.L7 | AI/ML and analytics services | 101 | 7 |
| M3.L8 | Other in-scope services | 101 | 7 |
| M3.T | Module 3 test | 15 | 15 |

### Module 4: Billing, Pricing, and Support (12%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M4.L1 | Pricing models | 101 | 7 |
| M4.L2 | Billing, budget and cost management | 101 | 7 |
| M4.L3 | Technical resources and support options | 101 | 7 |
| M4.T | Module 4 test | 15 | 15 |

## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)

Source: https://docs.aws.amazon.com/pdfs/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.pdf (accessed 2026-10-02).

| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |
|---|---|---|---|---|---|
| Cloud Concepts | 24% | M1 | M1.L1, M1.L2, M1.L3, M1.L4 | 93 | 16 |
| Security and Compliance | 30% | M2 | M2.L1, M2.L2, M2.L3, M2.L4 | 116 | 20 |
| Cloud Technology and Services | 34% | M3 | M3.L1, M3.L2, M3.L3, M3.L4, M3.L5, M3.L6, M3.L7, M3.L8 | 132 | 21 |
| Billing, Pricing, and Support | 12% | M4 | M4.L1, M4.L2, M4.L3 | 47 | 8 |

Mock item total per form: 65 (matches mock length 65).

## Assessment blueprint

| Component | Count | Items each | Minutes each | Total minutes |
|---|---|---|---|---|
| Lesson quizzes | 19 | 7 | 7 | 133 |
| Module tests | 4 | 15 | 15 | 60 |
| Full-length mock exams (independent forms A/B/C) | 3 | 65 | 90 | 270 |
| Topic drill sets (mixed-domain) | 0 | 30 | 30 | 0 |
| Review buffer | 1 | - | 17 | 17 |
| **Total** | | | | **480** (= 20% of 2400 min) |

Mock length basis: From search snippets (65 questions / 90 min) - official exam guide not retrieved; re-verify.

Minimum item bank: 388 unique items (no item reused across mocks A/B/C). Every option of every item carries a rationale. Items are tagged to domain + lesson ID for analytics.

## YouTube production notes

- One playlist per module (4 playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.
- Target video length about 60 min per lesson; chapters in the description should match the lesson's sub-objectives.
- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).
- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'
- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.
- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.
- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.

## Sample MCQs (original items, illustrative)

**Q1.** Under the shared responsibility model, which task belongs to AWS for Amazon EC2?

- A. Patching the guest operating system   
  _Rationale:_ On EC2 (IaaS) the customer patches the guest OS.
- B. Configuring security groups   
  _Rationale:_ Security group rules are set by the customer.
- C. Securing the physical hosts and the virtualisation layer **(correct)**  
  _Rationale:_ Correct: AWS is responsible for security OF the cloud: hardware, facilities and the hypervisor.
- D. Encrypting application data   
  _Rationale:_ The customer chooses and manages data encryption.

**Q2.** Which pricing model gives the biggest discount for steady, predictable usage in return for a 1- or 3-year commitment?

- A. On-Demand   
  _Rationale:_ On-Demand has no commitment and no discount.
- B. Savings Plans / Reserved Instances **(correct)**  
  _Rationale:_ Correct: commitment-based models trade a term commitment for lower rates.
- C. Spot Instances   
  _Rationale:_ Spot gives deep discounts but can be interrupted, so it does not suit steady predictable load.
- D. Dedicated Hosts on-demand   
  _Rationale:_ Dedicated Hosts cost more and are used for licensing or compliance reasons.

**Q3.** Which AWS service records API calls made in an account, for auditing?

- A. Amazon CloudWatch   
  _Rationale:_ CloudWatch handles metrics, logs and alarms. API audit trails come from CloudTrail.
- B. AWS CloudTrail **(correct)**  
  _Rationale:_ Correct: CloudTrail records API activity for governance and audit.
- C. AWS Config   
  _Rationale:_ Config records resource configuration state, not API calls.
- D. Amazon Inspector   
  _Rationale:_ Inspector scans for vulnerabilities.

## Change log

- 2026-10-02: Batch 1 blueprint created from SRC-AWS-CLF.
