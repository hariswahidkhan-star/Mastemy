# AWS Systems Manager

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1496` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Systems Manager (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AWS Systems Manager capabilities and node management
2. Run commands and automate operations at scale
3. Manage configuration and patching with State Manager and Patch Manager
4. Store configuration and secrets with Parameter Store

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Systems Manager overview (MASTEMY-DESIGN 25%)

- Worked applications: (1) Identify use cases for SSM over SSH; (2) Confirm a node is managed by SSM
- Common misconception addressed: Thinking an instance is SSM-managed without the agent and an instance role
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Systems Manager provides | 72 | 7 |
| M01L02 | Managed nodes and the SSM Agent | 72 | 7 |

### M02 Operations at scale (MASTEMY-DESIGN 25%)

- Worked applications: (1) Run a command across a tag-selected fleet; (2) Open a shell without opening port 22
- Common misconception addressed: Believing Session Manager requires inbound SSH ports open
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Run Command | 72 | 7 |
| M02L02 | Session Manager for shell access | 72 | 7 |

### M03 Configuration and patching (MASTEMY-DESIGN 25%)

- Worked applications: (1) Enforce an agent config with State Manager; (2) Apply a patch baseline on a schedule
- Common misconception addressed: Treating a one-time patch run as ongoing compliance
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | State Manager for desired state | 72 | 7 |
| M03L02 | Patch Manager and patch baselines | 72 | 7 |

### M04 Parameters and automation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Store a config value as a parameter; (2) Build an automation runbook for a task
- Common misconception addressed: Storing plaintext secrets in Parameter Store String instead of SecureString
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Parameter Store for configuration | 72 | 7 |
| M04L02 | Automation runbooks | 72 | 7 |

## Integrative case

An ops team manages 200 EC2 instances by SSH, inconsistently patched. Adopt Systems Manager: enroll nodes, run patch and command operations fleet-wide, enforce configuration with State Manager, and centralize parameters securely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1496-final-protected | 28 | 35 | yes |
| MST-1496-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Systems Manager overview | 7 |
| Operations at scale | 7 |
| Configuration and patching | 7 |
| Parameters and automation | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1496-Q0001** (single-answer, Select ONE) Which Systems Manager feature lets you get a shell on an instance without opening inbound SSH?

- A. Session Manager **(key)**  
  _Rationale:_ Correct: Session Manager provides shell access via the SSM agent, no open ports.
- B. Run Command  
  _Rationale:_ Run Command executes scripts but is not an interactive shell session.
- C. Patch Manager  
  _Rationale:_ Patch Manager applies patches, not shells.
- D. Parameter Store  
  _Rationale:_ Parameter Store holds configuration values.

**MST-1496-Q0002** (multiple-answer, Select TWO) Which TWO are required for an EC2 instance to be managed by Systems Manager? (Select TWO.)

- A. The SSM Agent installed and running **(key)**  
  _Rationale:_ Correct: the agent is required for SSM management.
- B. An instance role granting SSM permissions **(key)**  
  _Rationale:_ Correct: the instance needs IAM permissions for SSM.
- C. A public IP address  
  _Rationale:_ A public IP is not required (VPC endpoints work).
- D. Port 22 open to the internet  
  _Rationale:_ Open SSH is not required and is discouraged.

**MST-1496-Q0003** (single-answer, Select ONE) How should a sensitive database password be stored in Parameter Store?

- A. As a SecureString parameter encrypted with KMS **(key)**  
  _Rationale:_ Correct: SecureString encrypts the value at rest with KMS.
- B. As a plaintext String parameter  
  _Rationale:_ Plaintext exposes the secret.
- C. In the instance user-data script  
  _Rationale:_ User-data is readable and not a secret store.
- D. In a public S3 bucket  
  _Rationale:_ A public bucket leaks the secret.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
