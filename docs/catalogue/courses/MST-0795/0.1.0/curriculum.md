# Cursor + Docker + Azure: Reviewed Cloud Deployment

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0795` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor + Docker + Azure: Reviewed Cloud Deployment (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan a reviewed path from code to a cloud deployment
2. Use Cursor to develop and review application changes
3. Containerise the application reliably with Docker
4. Deploy to Azure through a reviewed, repeatable process
5. Operate the deployment with monitoring, secrets and rollback

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Planning the deployment (20%)

- Worked applications: (1) Map the path from a local change to an Azure environment; (2) Separate config from code across environments
- Common misconception addressed: Treating deployment as an afterthought with no plan
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From local code to a cloud target | 96 | 7 |
| M01L02 | Environments, config and review points | 96 | 7 |

### M02 Developing in Cursor (20%)

- Worked applications: (1) Implement a change in Cursor and review the diff critically; (2) Catch an AI change that would break in the cloud environment
- Common misconception addressed: Committing Cursor output without reviewing it for the target environment
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Making changes with Cursor assistance | 96 | 7 |
| M02L02 | Reviewing AI-generated changes before commit | 96 | 7 |

### M03 Containerising with Docker (20%)

- Worked applications: (1) Write a Dockerfile that builds the app reproducibly; (2) Remove secrets and bloat from an image
- Common misconception addressed: Baking secrets or local-only assumptions into the image
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Writing a reliable, minimal image | 96 | 7 |
| M03L02 | Reproducible builds and image hygiene | 96 | 7 |

### M04 Deploying to Azure (20%)

- Worked applications: (1) Deploy the container to Azure through a repeatable step; (2) Promote a build from staging to production behind review
- Common misconception addressed: Clicking through a one-off manual deploy that cannot be repeated
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | A repeatable deployment process | 96 | 7 |
| M04L02 | Review and promotion between environments | 96 | 7 |

### M05 Operating in the cloud (20%)

- Worked applications: (1) Add monitoring that detects a failed deployment; (2) Roll back to the previous image safely
- Common misconception addressed: Running in production with no monitoring or rollback plan
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Monitoring, logging and alerts | 96 | 7 |
| M05L02 | Secrets management and rollback | 96 | 7 |

## Integrative case

A developer ships a reviewed cloud deployment: plan environments and review points, develop in Cursor with critical review, containerise with Docker, deploy to Azure repeatably behind review, and operate with monitoring, secrets and rollback.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0795-final-protected | 40 | 50 | yes |
| MST-0795-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Planning the deployment | 8 |
| Developing in Cursor | 8 |
| Containerising with Docker | 8 |
| Deploying to Azure | 8 |
| Operating in the cloud | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0795-Q0001** (single-answer, Select ONE) A teammate adds an API key directly into the Dockerfile so the container 'just works'. Why is this wrong?

- A. The secret is baked into the image and leaks to anyone who pulls it **(key)**  
  _Rationale:_ Correct: secrets in an image are exposed to everyone with image access.
- B. Dockerfiles cannot contain environment values  
  _Rationale:_ They can; the problem is that a secret must not be one of them.
- C. It makes the image slightly larger  
  _Rationale:_ Size is not the issue; secret exposure is.
- D. Azure will reject any image with text in it  
  _Rationale:_ Azure does not reject the image; the practice is simply insecure.

**MST-0795-Q0002** (multiple-answer, Select TWO) Which TWO properties make a cloud deployment process trustworthy? (Select TWO.)

- A. It is repeatable rather than a one-off manual click-through **(key)**  
  _Rationale:_ Correct: repeatability makes deployments predictable and auditable.
- B. Promotion to production passes a review gate **(key)**  
  _Rationale:_ Correct: review before production catches issues early.
- C. It is done quickly outside business hours with no record  
  _Rationale:_ Speed without a record undermines auditability.
- D. It skips staging to reach production faster  
  _Rationale:_ Skipping staging removes a key validation step.

**MST-0795-Q0003** (single-answer, Select ONE) A new release is failing in production. What capability lets you recover fastest and safely?

- A. A tested rollback to the previous known-good image **(key)**  
  _Rationale:_ Correct: a rollback restores service while the failure is investigated.
- B. Editing files directly on the production server  
  _Rationale:_ Hand-editing production is unrepeatable and risky.
- C. Waiting to see if the errors stop on their own  
  _Rationale:_ Hoping is not a recovery strategy.
- D. Deleting the logs to clear the alerts  
  _Rationale:_ Removing logs hides the problem rather than fixing it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
