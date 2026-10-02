# AWS Certified DevOps Engineer — Professional

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0209` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | AWS (no affiliation or endorsement) |
| Exam code | not verified; design assumption: AWS Certified DevOps Engineer - Professional (code DOP-C02 per catalog; unverified) |
| Version basis | design assumption - official outline not verified (issuer page egress-blocked) |
| Evidence | **unverified-needs-official-check** - sources: ; official page not fetched |
| Legacy IDs | MST-AWS-AWS-DOPC02-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe DevOps practices and AWS services for continuous delivery and automation
2. Apply CI/CD, infrastructure-as-code and configuration management on AWS
3. Evaluate monitoring, logging, resilience and incident response for AWS workloads
4. Analyse security, governance and compliance automation across AWS accounts

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 CI/CD and software delivery (design-assumption weight; official weights not verified)

- Worked applications: (1) Design a pipeline with build, test and staged deploy; (2) Choose a deployment strategy (blue/green, canary) for a given risk tolerance
- Common misconception addressed: Assuming a successful build equals a safe production deployment
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CI/CD pipelines on AWS | 320 | 6 |
| M01L02 | Deployment strategies: blue/green, canary, rolling | 320 | 6 |
| M01L03 | Artifact, test and approval gates | 320 | 6 |

### M02 Infrastructure and configuration as code (design-assumption weight; official weights not verified)

- Worked applications: (1) Parameterise a template for multiple environments; (2) Detect and remediate configuration drift
- Common misconception addressed: Treating manual console changes as harmless when infrastructure is codified
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Infrastructure as code fundamentals | 320 | 6 |
| M02L02 | Configuration management and drift | 320 | 6 |
| M02L03 | Multi-environment and multi-account provisioning | 320 | 6 |

### M03 Monitoring, resilience and security automation (design-assumption weight; official weights not verified)

- Worked applications: (1) Design metrics, logs and alarms with an automated remediation; (2) Automate a compliance guardrail across accounts
- Common misconception addressed: Believing centralised logging alone provides resilience without automated response
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Monitoring, logging and observability | 320 | 6 |
| M03L02 | Resilience, auto-recovery and incident response | 320 | 6 |
| M03L03 | Security, governance and compliance automation | 320 | 6 |

## Integrative case

You own delivery and operations for a multi-account AWS workload: build CI/CD with safe deployments, codify infrastructure, add monitoring and automated recovery, and harden the pipeline's security and compliance.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer page egress-blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0209-practice-form-A | 108 | 108 | yes |
| MST-0209-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0209-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0209-final-protected | 108 | 108 | yes |

| Domain | Items per form |
|---|---|
| CI/CD and software delivery | 36 |
| Infrastructure and configuration as code | 36 |
| Monitoring, resilience and security automation | 36 |

Minimum reviewed item bank: 1044 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0209-Q0001** (single-answer, Select ONE) A team wants to release a new version with the ability to shift a small percentage of traffic first and roll back instantly if error rates rise. Which deployment strategy fits best?

- A. Canary deployment with automated rollback on alarms **(key)**  
  _Rationale:_ Correct: canary shifts a small traffic share first and can roll back automatically on metric alarms.
- B. In-place deployment replacing all instances at once  
  _Rationale:_ All-at-once in-place deployment cannot limit blast radius or roll back gradually.
- C. Manual FTP upload to each server  
  _Rationale:_ Manual uploads provide no controlled rollout or rollback.
- D. Deploying only during a full maintenance outage  
  _Rationale:_ A full outage does not provide incremental traffic shifting.

**MST-0209-Q0002** (single-answer, Select ONE) Infrastructure is managed as code, but an engineer makes a manual change in the console to fix an incident. What is the main ongoing risk if this is left unreconciled?

- A. Configuration drift, so the code no longer reflects reality and future deploys may revert or conflict **(key)**  
  _Rationale:_ Correct: unreconciled manual changes cause drift between code and actual state.
- B. No risk, because the console is authoritative  
  _Rationale:_ With IaC, the code is intended source of truth; drift is a real risk.
- C. The template is automatically updated to match  
  _Rationale:_ Manual console changes do not auto-update the template.
- D. It permanently disables the pipeline  
  _Rationale:_ Drift does not disable pipelines; it causes inconsistency.

**MST-0209-Q0003** (multiple-answer, Select TWO) To automate security and compliance across many AWS accounts, which TWO practices are most effective? (Select TWO)

- A. Applying preventive guardrails and policies centrally across accounts **(key)**  
  _Rationale:_ Correct: centralized preventive guardrails enforce compliance across accounts.
- B. Automatically detecting non-compliant resources and triggering remediation **(key)**  
  _Rationale:_ Correct: automated detection and remediation scales compliance.
- C. Emailing each team a PDF policy once a year  
  _Rationale:_ A yearly PDF is not automated enforcement.
- D. Giving every developer full administrator access for speed  
  _Rationale:_ Broad admin access weakens, not strengthens, security.
- E. Disabling logging to reduce noise  
  _Rationale:_ Disabling logging undermines compliance and detection.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
