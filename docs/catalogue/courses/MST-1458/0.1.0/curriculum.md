# Cloud Storage Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1458` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-GCS (https://cloud.google.com/storage/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Cloud Storage Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create and organize buckets and objects in Cloud Storage
2. Choose storage classes for cost and access patterns
3. Control access with IAM and signed URLs
4. Apply lifecycle, versioning and retention policies
5. Secure data with encryption and public-access prevention
6. Move data in and out and monitor usage and cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Buckets and objects (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a bucket with an appropriate location and name; (2) Upload, organize and delete objects with prefixes
- Common misconception addressed: Treating object-name prefixes as real folders with their own permissions
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Buckets, locations and naming | 48 | 5 |
| M01L02 | Objects, prefixes and metadata | 48 | 5 |

### M02 Storage classes (MASTEMY-DESIGN 16%)

- Worked applications: (1) Match Standard, Nearline, Coldline and Archive to access patterns; (2) Estimate cost impact of a class change for a dataset
- Common misconception addressed: Putting rarely read data in Standard and paying for hot storage
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Standard and Nearline | 48 | 5 |
| M02L02 | Coldline, Archive and trade-offs | 48 | 5 |

### M03 Access control (MASTEMY-DESIGN 17%)

- Worked applications: (1) Grant least-privilege bucket access with IAM roles; (2) Generate a time-limited signed URL for one object
- Common misconception addressed: Making a bucket public when a signed URL would suffice
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IAM roles for Cloud Storage | 48 | 5 |
| M03L02 | Signed URLs and access boundaries | 48 | 5 |

### M04 Lifecycle and versioning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a lifecycle rule to age objects to Coldline after 30 days; (2) Enable object versioning and restore a deleted object
- Common misconception addressed: Assuming lifecycle deletion can be undone without versioning
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Object lifecycle management | 48 | 5 |
| M04L02 | Versioning and retention policies | 48 | 5 |

### M05 Security and encryption (MASTEMY-DESIGN 17%)

- Worked applications: (1) Confirm default encryption and add a customer-managed key; (2) Turn on public access prevention for a sensitive bucket
- Common misconception addressed: Believing data is unencrypted unless you configure a key
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Encryption options | 48 | 5 |
| M05L02 | Public access prevention and audit | 48 | 5 |

### M06 Data movement and cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Transfer a large dataset in with Storage Transfer Service; (2) Investigate an unexpected egress charge
- Common misconception addressed: Ignoring network egress when estimating total cost
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Uploading, transfer and gsutil/gcloud | 48 | 5 |
| M06L02 | Monitoring usage and controlling cost | 48 | 5 |

## Integrative case

A media company stores raw and processed assets in Cloud Storage: choose storage classes per tier, set lifecycle rules to age data to colder classes, grant least-privilege access with IAM and signed URLs, enable versioning and retention for compliance, and keep a lid on egress and cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1458-final-protected | 30 | 30 | yes |
| MST-1458-final-alternate | 30 | 30 | no (optional practice) |

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

**MST-1458-Q0001** (single-answer, Select ONE) A dataset is read a few times a year for audits and must be retained cheaply. Which storage class fits best?

- A. Archive **(key)**  
  _Rationale:_ Correct: Archive is the lowest-cost class for data accessed less than once a year.
- B. Standard  
  _Rationale:_ Standard is for frequently accessed data and costs the most to store.
- C. Nearline  
  _Rationale:_ Nearline targets roughly monthly access, more frequent than this case.
- D. A local SSD  
  _Rationale:_ Local SSD is instance storage, not an object storage class.

**MST-1458-Q0002** (multiple-answer, Select TWO) Which TWO give access to a single object without making a bucket public? (Select TWO.)

- A. Generate a time-limited signed URL for the object **(key)**  
  _Rationale:_ Correct: a signed URL grants scoped, temporary access to one object.
- B. Grant a specific principal an IAM role on the object or bucket **(key)**  
  _Rationale:_ Correct: IAM grants least-privilege access to named principals.
- C. Set the bucket to allUsers with Storage Object Viewer  
  _Rationale:_ Granting allUsers makes the data public.
- D. Disable public access prevention for the project  
  _Rationale:_ That weakens protection and does not scope access to one object.

**MST-1458-Q0003** (single-answer, Select ONE) You want deleted objects to be recoverable. What must be enabled first?

- A. Object versioning on the bucket **(key)**  
  _Rationale:_ Correct: versioning preserves noncurrent versions so deletes can be restored.
- B. A coldline storage class  
  _Rationale:_ Storage class affects cost, not recoverability of deletes.
- C. A customer-managed encryption key  
  _Rationale:_ CMEK controls encryption, not delete recovery.
- D. A static website configuration  
  _Rationale:_ Website config is unrelated to object recovery.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
