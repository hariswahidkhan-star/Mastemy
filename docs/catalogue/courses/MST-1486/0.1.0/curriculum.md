# AWS KMS and Encryption

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1486` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-KMS (https://docs.aws.amazon.com/kms/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS KMS and Encryption (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain encryption concepts and how KMS fits in
2. Create and manage KMS keys and aliases
3. Use key policies, grants and IAM for key access
4. Apply envelope encryption and data keys
5. Integrate KMS with services like S3, EBS and Secrets Manager
6. Audit, rotate and control the cost of key usage

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Encryption and KMS basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain symmetric encryption and where KMS stores the key; (2) Distinguish encryption at rest from in transit
- Common misconception addressed: Thinking KMS returns the raw key material to the application
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Encryption fundamentals | 48 | 5 |
| M01L02 | What KMS is and how it protects keys | 48 | 5 |

### M02 Keys and aliases (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a customer-managed key and assign an alias; (2) Compare AWS-managed, customer-managed and AWS-owned keys
- Common misconception addressed: Using an AWS-managed key when a custom key policy is required
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Key types and creation | 48 | 5 |
| M02L02 | Aliases and key lifecycle | 48 | 5 |

### M03 Key access control (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a key policy that grants least-privilege use; (2) Use a grant for temporary, scoped key access
- Common misconception addressed: Assuming IAM alone grants key access without the key policy
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Key policies and IAM | 48 | 5 |
| M03L02 | Grants and cross-account access | 48 | 5 |

### M04 Envelope encryption (MASTEMY-DESIGN 17%)

- Worked applications: (1) Encrypt a large object with a data key, not the KMS key directly; (2) Explain why the plaintext data key is discarded after use
- Common misconception addressed: Sending large payloads directly to KMS to encrypt
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data keys and envelope encryption | 48 | 5 |
| M04L02 | Encrypt, decrypt and re-encrypt flows | 48 | 5 |

### M05 Service integration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable KMS encryption on an S3 bucket and an EBS volume; (2) Point Secrets Manager at a customer-managed key
- Common misconception addressed: Assuming service integration encrypts existing data retroactively
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | KMS with S3 and EBS | 48 | 5 |
| M05L02 | KMS with Secrets Manager and others | 48 | 5 |

### M06 Audit, rotation and cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable automatic annual key rotation; (2) Trace key usage with CloudTrail and watch request cost
- Common misconception addressed: Disabling rotation and never auditing key use
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Rotation and CloudTrail auditing | 48 | 5 |
| M06L02 | Request cost and key management | 48 | 5 |

## Integrative case

A company centralizes encryption on AWS KMS: create customer-managed keys with least-privilege key policies, apply envelope encryption to large objects, enable encryption on S3 and EBS with KMS, enable rotation and auditing, and keep an eye on request cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1486-final-protected | 30 | 30 | yes |
| MST-1486-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Encryption and KMS basics | 5 |
| Keys and aliases | 5 |
| Key access control | 5 |
| Envelope encryption | 5 |
| Service integration | 5 |
| Audit, rotation and cost | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1486-Q0001** (single-answer, Select ONE) Why is envelope encryption used for large objects rather than sending the data straight to KMS?

- A. KMS encrypts a small data key locally used to encrypt the large object, avoiding size limits and reducing calls **(key)**  
  _Rationale:_ Correct: envelope encryption uses a data key locally and keeps KMS calls small.
- B. KMS can encrypt unlimited payload sizes directly with no downside  
  _Rationale:_ KMS has payload limits, which is why envelope encryption exists.
- C. It removes the need for any encryption key  
  _Rationale:_ Envelope encryption still uses keys; it does not eliminate them.
- D. It stores the plaintext data key permanently for reuse  
  _Rationale:_ The plaintext data key is discarded after use, not stored.

**MST-1486-Q0002** (multiple-answer, Select TWO) Which TWO are recommended practices for managing KMS keys? (Select TWO.)

- A. Enable automatic key rotation for customer-managed keys **(key)**  
  _Rationale:_ Correct: rotation limits the blast radius of a compromised key.
- B. Scope key access with least-privilege key policies **(key)**  
  _Rationale:_ Correct: tight key policies limit who can use the key.
- C. Export the key material to application servers  
  _Rationale:_ KMS protects key material; it is not exported to servers.
- D. Grant kms:* to all roles for simplicity  
  _Rationale:_ Wildcard key permissions violate least privilege.

**MST-1486-Q0003** (single-answer, Select ONE) A customer-managed key must be usable by a role. IAM allows kms:Decrypt but the call is denied. What is the likely cause?

- A. The key policy does not grant the role access **(key)**  
  _Rationale:_ Correct: both the key policy and IAM must allow access for a customer-managed key.
- B. KMS keys ignore key policies entirely  
  _Rationale:_ Key policies are central to KMS access decisions.
- C. Decrypt is never allowed on customer-managed keys  
  _Rationale:_ Decrypt is allowable when both policies permit it.
- D. The region has no KMS service  
  _Rationale:_ KMS is broadly available; this is a policy issue, not availability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
