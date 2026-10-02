# AWS Compliance and Governance Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1508` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Compliance and Governance Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain governance, compliance and the shared responsibility model
2. Enforce guardrails with Organizations, SCPs and Control Tower
3. Audit and detect with CloudTrail, Config and Security Hub
4. Manage multi-account governance and evidence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Governance foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map a control to shared responsibility; (2) Identify which AWS service enforces a guardrail
- Common misconception addressed: Thinking a compliance certification covers the customer's own configuration
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shared responsibility and compliance programs | 72 | 7 |
| M01L02 | Governance building blocks | 72 | 7 |

### M02 Preventive guardrails (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write an SCP denying a risky action; (2) Baseline a new account via Control Tower
- Common misconception addressed: Confusing SCPs (permission boundaries) with IAM grants
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AWS Organizations and OUs | 72 | 7 |
| M02L02 | Service control policies (SCPs) and Control Tower | 72 | 7 |

### M03 Detective controls (MASTEMY-DESIGN 25%)

- Worked applications: (1) Enable an organization CloudTrail trail; (2) Add a Config rule for a required setting
- Common misconception addressed: Assuming CloudTrail alone enforces configuration compliance
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CloudTrail and AWS Config | 72 | 7 |
| M03L02 | Security Hub and findings | 72 | 7 |

### M04 Multi-account governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Aggregate Config/Security Hub across accounts; (2) Define an ongoing review cadence
- Common misconception addressed: Treating governance as a one-time setup rather than continuous
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Aggregating evidence and findings | 72 | 7 |
| M04L02 | Operating governance over time | 72 | 7 |

## Integrative case

A regulated company must prove and enforce controls across many AWS accounts. Set up Organizations with SCP guardrails, baseline accounts with Control Tower, enable org-wide CloudTrail and Config, and aggregate findings in Security Hub.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1508-final-protected | 28 | 35 | yes |
| MST-1508-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Governance foundations | 7 |
| Preventive guardrails | 7 |
| Detective controls | 7 |
| Multi-account governance | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1508-Q0001** (single-answer, Select ONE) What does a service control policy (SCP) in AWS Organizations do?

- A. Sets the maximum available permissions for accounts/OUs **(key)**  
  _Rationale:_ Correct: an SCP is a guardrail capping permissions; it does not grant them.
- B. Grants IAM permissions to users directly  
  _Rationale:_ SCPs do not grant; IAM policies grant within the SCP boundary.
- C. Encrypts S3 buckets  
  _Rationale:_ SCPs are permission boundaries, not encryption.
- D. Creates VPC subnets  
  _Rationale:_ SCPs do not manage networking.

**MST-1508-Q0002** (multiple-answer, Select TWO) Which TWO AWS services provide detective governance evidence? (Select TWO.)

- A. AWS CloudTrail for API activity logging **(key)**  
  _Rationale:_ Correct: CloudTrail records API calls for audit.
- B. AWS Config for resource configuration history and rules **(key)**  
  _Rationale:_ Correct: Config tracks config state and compliance.
- C. Amazon SES  
  _Rationale:_ SES sends email; it is not a governance evidence service.
- D. Amazon Polly  
  _Rationale:_ Polly is text-to-speech, unrelated to governance.

**MST-1508-Q0003** (single-answer, Select ONE) Under the shared responsibility model, AWS compliance certifications cover:

- A. The security 'of' the cloud (AWS-managed infrastructure) **(key)**  
  _Rationale:_ Correct: AWS attests the infrastructure; the customer must still configure their workloads correctly.
- B. All of the customer's own configurations automatically  
  _Rationale:_ Customer configuration is the customer's responsibility.
- C. The customer's application code  
  _Rationale:_ Customers own their application code and data.
- D. Nothing at all  
  _Rationale:_ AWS certifications do cover the infrastructure layer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
