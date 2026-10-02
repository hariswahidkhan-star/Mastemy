# Google Cloud for Startups

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1476` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud for Startups (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose cost-effective Google Cloud services for an early-stage product
2. Set up projects, billing and budgets for a startup
3. Deploy an MVP with serverless and managed services
4. Plan for scale, security and the startup program

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Getting started (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a project with a budget alert; (2) Pick serverless over VMs for an MVP
- Common misconception addressed: Assuming you must over-provision infrastructure before any users arrive
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Projects, billing and the startup program | 72 | 7 |
| M01L02 | Choosing services to keep cost low | 72 | 7 |

### M02 Building the MVP (MASTEMY-DESIGN 25%)

- Worked applications: (1) Deploy a container on Cloud Run; (2) Choose Firestore vs Cloud SQL for the MVP
- Common misconception addressed: Believing serverless always costs more than a small always-on VM
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Serverless compute (Cloud Run) | 72 | 7 |
| M02L02 | Managed databases for startups | 72 | 7 |

### M03 Security and identity (MASTEMY-DESIGN 25%)

- Worked applications: (1) Grant least-privilege roles to a teammate; (2) Store an API key in Secret Manager
- Common misconception addressed: Using the owner role for every team member
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Baseline IAM and secrets | 72 | 7 |
| M03L02 | Protecting a public app | 72 | 7 |

### M04 Scaling up (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set autoscaling limits on Cloud Run; (2) Add a budget and basic monitoring
- Common misconception addressed: Deferring all cost and monitoring controls until after a traffic spike
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Planning for growth and traffic spikes | 72 | 7 |
| M04L02 | Observability and cost control as you scale | 72 | 7 |

## Integrative case

A two-founder startup must launch an MVP cheaply on Google Cloud. Set up the project and budget guardrails, deploy the app on serverless with a managed database, add basic security, and plan how it scales as users grow.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1476-final-protected | 28 | 35 | yes |
| MST-1476-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting started | 7 |
| Building the MVP | 7 |
| Security and identity | 7 |
| Scaling up | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1476-Q0001** (single-answer, Select ONE) For a low-traffic MVP that must minimize idle cost, which compute option fits best?

- A. Cloud Run, which scales to zero when idle **(key)**  
  _Rationale:_ Correct: scale-to-zero means no cost when there is no traffic.
- B. A large always-on Compute Engine VM  
  _Rationale:_ An always-on VM bills even when idle.
- C. A multi-zone GKE Standard cluster  
  _Rationale:_ A full cluster is overkill and costly for an MVP.
- D. A bare-metal reservation  
  _Rationale:_ Bare metal is far too much for an MVP.

**MST-1476-Q0002** (multiple-answer, Select TWO) Which TWO guardrails help a startup avoid surprise bills? (Select TWO.)

- A. Budget alerts on the billing account **(key)**  
  _Rationale:_ Correct: budget alerts warn before overspend.
- B. Quotas/limits on autoscaling **(key)**  
  _Rationale:_ Correct: caps prevent runaway scaling cost.
- C. Giving everyone the owner role  
  _Rationale:_ That is a security risk, not a cost guardrail.
- D. Disabling all logging  
  _Rationale:_ Disabling logging harms observability and is not a cost guardrail.

**MST-1476-Q0003** (single-answer, Select ONE) Where should a startup store a third-party API key used by its app?

- A. Secret Manager **(key)**  
  _Rationale:_ Correct: Secret Manager stores secrets securely with access control.
- B. Hard-coded in the source repo  
  _Rationale:_ Hard-coding secrets is a serious security risk.
- C. In a public Cloud Storage bucket  
  _Rationale:_ A public bucket exposes the secret.
- D. In the app's log output  
  _Rationale:_ Logging secrets leaks them.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
