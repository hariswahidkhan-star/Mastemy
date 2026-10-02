# AWS for Startups

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1502` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS for Startups (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose cost-effective AWS services for an early-stage product
2. Set up accounts, billing and budgets for a startup
3. Deploy an MVP with serverless and managed services
4. Plan for scale, security and the startup program

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set a budget alert on a new account; (2) Pick serverless over always-on servers
- Common misconception addressed: Assuming you must reserve large capacity before launch
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Accounts, billing and the startup program | 72 | 7 |
| M01L02 | Choosing services to keep cost low | 72 | 7 |

### M02 Building the MVP (MASTEMY-DESIGN 25%)

- Worked applications: (1) Expose a Lambda via API Gateway; (2) Choose DynamoDB vs RDS for the MVP
- Common misconception addressed: Believing serverless is always more expensive than a small EC2 instance
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Serverless compute with Lambda and API Gateway | 72 | 7 |
| M02L02 | Managed databases for startups | 72 | 7 |

### M03 Security and identity (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create least-privilege IAM for the team; (2) Store a key in Secrets Manager
- Common misconception addressed: Using the root account for day-to-day work
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Baseline IAM and secrets | 72 | 7 |
| M03L02 | Protecting a public app | 72 | 7 |

### M04 Scaling up (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set concurrency limits on Lambda; (2) Add budgets and CloudWatch alarms
- Common misconception addressed: Deferring cost and monitoring controls until after an outage
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Planning for growth and spikes | 72 | 7 |
| M04L02 | Observability and cost control at scale | 72 | 7 |

## Integrative case

A small startup must launch cheaply on AWS. Set up an account with budget guardrails, deploy the MVP on serverless with a managed database, apply baseline security, and plan how it scales as traffic grows.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1502-final-protected | 28 | 35 | yes |
| MST-1502-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started | 7 |
| Building the MVP | 7 |
| Security and identity | 7 |
| Scaling up | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1502-Q0001** (single-answer, Select ONE) For a bursty MVP API that is often idle, which compute keeps idle cost near zero?

- A. AWS Lambda, billed per request and duration **(key)**  
  _Rationale:_ Correct: Lambda charges only when invoked, so idle cost is near zero.
- B. A large always-on EC2 instance  
  _Rationale:_ An always-on instance bills continuously.
- C. A dedicated host reservation  
  _Rationale:_ Dedicated hosts are costly and overkill for an MVP.
- D. A multi-node EKS cluster  
  _Rationale:_ A full cluster is excessive for a bursty MVP.

**MST-1502-Q0002** (multiple-answer, Select TWO) Which TWO are baseline security practices for a startup AWS account? (Select TWO.)

- A. Avoid using the root account for daily tasks and enable MFA on it **(key)**  
  _Rationale:_ Correct: protecting root and avoiding its daily use is foundational.
- B. Grant least-privilege IAM roles instead of broad admin **(key)**  
  _Rationale:_ Correct: least privilege limits blast radius.
- C. Share one IAM user among the whole team  
  _Rationale:_ Shared users break accountability and least privilege.
- D. Disable CloudTrail to save money  
  _Rationale:_ Disabling the audit trail harms security.

**MST-1502-Q0003** (single-answer, Select ONE) Which guardrail best prevents a surprise AWS bill for a startup?

- A. An AWS Budget with alerts **(key)**  
  _Rationale:_ Correct: budget alerts warn before overspend.
- B. Turning off all logging  
  _Rationale:_ That does not control cost and hurts visibility.
- C. Using the root account everywhere  
  _Rationale:_ That is a security risk, not a cost guardrail.
- D. Reserving capacity for ten years  
  _Rationale:_ Large upfront commitments can waste money for a startup.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
