# Amazon S3 Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1482` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-S3 (https://docs.aws.amazon.com/s3/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Amazon S3 Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create and organize buckets and objects in S3
2. Choose storage classes for cost and access patterns
3. Control access with IAM, bucket policies and presigned URLs
4. Apply lifecycle, versioning and Object Lock
5. Secure data with encryption and Block Public Access
6. Move data and monitor usage and cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Buckets and objects (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a bucket with a valid globally-unique name and region; (2) Organize objects with key prefixes
- Common misconception addressed: Treating key prefixes as real folders with separate permissions
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Buckets, regions and naming | 48 | 5 |
| M01L02 | Objects, keys and prefixes | 48 | 5 |

### M02 Storage classes (MASTEMY-DESIGN 16%)

- Worked applications: (1) Match Standard, Standard-IA, Glacier Instant and Deep Archive to access patterns; (2) Estimate retrieval cost and latency for an archive class
- Common misconception addressed: Putting rarely accessed data in Standard and overpaying
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Standard and infrequent-access classes | 48 | 5 |
| M02L02 | Glacier and archive classes | 48 | 5 |

### M03 Access control (MASTEMY-DESIGN 17%)

- Worked applications: (1) Grant least-privilege access with an IAM policy; (2) Generate a presigned URL for temporary object access
- Common misconception addressed: Making a bucket public when a presigned URL would do
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IAM policies vs bucket policies | 48 | 5 |
| M03L02 | Presigned URLs and access points | 48 | 5 |

### M04 Lifecycle and versioning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a lifecycle rule to transition then expire objects; (2) Enable versioning and recover a deleted object
- Common misconception addressed: Assuming lifecycle expiration is reversible without versioning
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lifecycle transitions and expiration | 48 | 5 |
| M04L02 | Versioning and Object Lock | 48 | 5 |

### M05 Security and encryption (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable default encryption with SSE-S3 or SSE-KMS; (2) Turn on Block Public Access at the account and bucket level
- Common misconception addressed: Believing objects are public unless you add encryption
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Encryption options | 48 | 5 |
| M05L02 | Block Public Access and audit | 48 | 5 |

### M06 Data movement and cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use multipart upload for a large object; (2) Investigate request and data-transfer charges
- Common misconception addressed: Ignoring request and egress costs when estimating S3 spend
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Uploads, multipart and transfer | 48 | 5 |
| M06L02 | Monitoring usage and cost | 48 | 5 |

## Integrative case

A company stores application assets and backups in S3: choose storage classes per tier, set lifecycle rules to transition and expire objects, grant least-privilege access with IAM and bucket policies, enable versioning and default encryption, and keep public access blocked while controlling request and transfer cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1482-final-protected | 30 | 30 | yes |
| MST-1482-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Buckets and objects | 5 |
| Storage classes | 5 |
| Access control | 5 |
| Lifecycle and versioning | 5 |
| Security and encryption | 5 |
| Data movement and cost | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1482-Q0001** (single-answer, Select ONE) Backups are accessed a few times a year but must be retrievable within milliseconds when needed. Which storage class best balances cost and access?

- A. S3 Glacier Instant Retrieval **(key)**  
  _Rationale:_ Correct: Glacier Instant Retrieval offers low-cost storage with millisecond access for rarely read data.
- B. S3 Standard  
  _Rationale:_ Standard costs more and targets frequent access.
- C. S3 Glacier Deep Archive  
  _Rationale:_ Deep Archive is cheapest but retrieval takes hours, not milliseconds.
- D. EBS  
  _Rationale:_ EBS is block storage for instances, not an S3 class.

**MST-1482-Q0002** (multiple-answer, Select TWO) Which TWO grant temporary or scoped access without making a bucket public? (Select TWO.)

- A. Generate a presigned URL for a specific object **(key)**  
  _Rationale:_ Correct: a presigned URL grants time-limited access to one object.
- B. Attach a least-privilege IAM policy to the principal **(key)**  
  _Rationale:_ Correct: IAM policies scope access to named identities.
- C. Disable Block Public Access and allow public reads  
  _Rationale:_ That makes the bucket public, the opposite of least privilege.
- D. Set an ACL granting AllUsers read  
  _Rationale:_ Granting AllUsers exposes the data publicly.

**MST-1482-Q0003** (single-answer, Select ONE) To recover objects after an accidental delete, what must be enabled on the bucket beforehand?

- A. Versioning **(key)**  
  _Rationale:_ Correct: versioning retains prior versions so deletes can be undone.
- B. A Glacier storage class  
  _Rationale:_ Storage class affects cost, not delete recovery.
- C. Transfer Acceleration  
  _Rationale:_ Acceleration speeds transfers, unrelated to recovery.
- D. Requester Pays  
  _Rationale:_ Requester Pays shifts cost; it does not protect against deletes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
