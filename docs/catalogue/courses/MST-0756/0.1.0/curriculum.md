# Amazon S3: Secure Data Storage and Lifecycle Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0756` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon S3 product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-S3 (https://docs.aws.amazon.com/s3/; https://docs.aws.amazon.com/AmazonS3/latest/userguide/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon S3: Secure Data Storage and Lifecycle Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain S3 buckets, objects and the storage model
2. Control access with policies, IAM and Block Public Access
3. Choose storage classes for cost and access patterns
4. Manage data with versioning and lifecycle rules
5. Protect data with encryption and durability features
6. Optimize performance, cost and transfer

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 S3 fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Organize objects with key prefixes; (2) Explain object vs block storage
- Common misconception addressed: Treating S3 like a POSIX file system with folders
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Buckets, objects and keys | 80 | 5 |
| M01L02 | The object storage model | 80 | 5 |

### M02 Access control (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a least-privilege bucket policy; (2) Keep Block Public Access enabled
- Common misconception addressed: Making a bucket public when a policy would suffice
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Bucket policies and IAM | 80 | 5 |
| M02L02 | Block Public Access | 80 | 5 |

### M03 Storage classes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Match a storage class to an access pattern; (2) Choose Intelligent-Tiering for unknown patterns
- Common misconception addressed: Keeping rarely accessed data in Standard
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Standard, IA and Glacier tiers | 80 | 5 |
| M03L02 | Intelligent-Tiering | 80 | 5 |

### M04 Lifecycle and versioning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable versioning to protect against overwrite; (2) Add a lifecycle rule to archive old objects
- Common misconception addressed: Assuming deletes are unrecoverable with versioning off
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Versioning | 80 | 5 |
| M04L02 | Lifecycle rules | 80 | 5 |

### M05 Protection (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable default encryption on a bucket; (2) Explain S3's durability design
- Common misconception addressed: Confusing durability with availability
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Encryption at rest and in transit | 80 | 5 |
| M05L02 | Durability and replication | 80 | 5 |

### M06 Optimization (MASTEMY-DESIGN 17%)

- Worked applications: (1) Spread load across key prefixes; (2) Choose a transfer approach for large uploads
- Common misconception addressed: Expecting a single hot prefix to scale without limit
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Performance and prefixes | 80 | 5 |
| M06L02 | Cost and transfer | 80 | 5 |

## Integrative case

Design storage for a media app on S3: organize objects by prefix, lock down access with Block Public Access and a least-privilege policy, pick storage classes with a lifecycle rule to archive old files, and enable versioning and encryption.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0756-final-protected | 40 | 50 | yes |
| MST-0756-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| S3 fundamentals | 7 |
| Access control | 7 |
| Storage classes | 7 |
| Lifecycle and versioning | 7 |
| Protection | 6 |
| Optimization | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0756-Q0001** (single-answer, Select ONE) Which feature protects objects from being permanently lost when they are overwritten or deleted?

- A. S3 Versioning **(key)**  
  _Rationale:_ Correct: versioning retains previous versions of an object.
- B. A larger instance type  
  _Rationale:_ Instance type is unrelated to S3 object protection.
- C. Disabling encryption  
  _Rationale:_ Encryption is about confidentiality, not recovery from deletion.
- D. A security group  
  _Rationale:_ Security groups apply to network traffic, not S3 objects.

**MST-0756-Q0002** (multiple-answer, Select TWO) Which TWO are good practices for securing an S3 bucket? (Select TWO.)

- A. Keep Block Public Access enabled unless public access is explicitly required **(key)**  
  _Rationale:_ Correct: Block Public Access prevents accidental exposure.
- B. Grant access with a least-privilege bucket policy or IAM **(key)**  
  _Rationale:_ Correct: least-privilege limits who can access objects.
- C. Make the bucket public for convenience  
  _Rationale:_ Public buckets risk data exposure.
- D. Share root account keys with applications  
  _Rationale:_ Root keys are insecure and over-privileged.

**MST-0756-Q0003** (single-answer, Select ONE) Data is written once and rarely read again after 30 days. Which approach optimizes cost?

- A. A lifecycle rule that transitions objects to a colder, cheaper storage class **(key)**  
  _Rationale:_ Correct: lifecycle rules move aging data to lower-cost tiers automatically.
- B. Keep everything in S3 Standard forever  
  _Rationale:_ Standard is more expensive for rarely accessed data.
- C. Delete the data immediately to save cost  
  _Rationale:_ Deleting needed data is not an optimization.
- D. Move the data to an EC2 instance store  
  _Rationale:_ Instance store is ephemeral and unsuitable for retention.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
