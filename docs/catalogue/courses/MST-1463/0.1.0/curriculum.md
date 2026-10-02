# Google Cloud Security Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1463` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://cloud.google.com/security/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Security Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Google Cloud shared responsibility model and resource hierarchy
2. Apply least-privilege IAM with roles, policies and service accounts
3. Secure networks with VPC controls, firewall rules and Private Google Access
4. Protect data with default and customer-managed encryption keys
5. Use Cloud Logging, Audit Logs and Security Command Center for detection
6. Apply organization policies and compliance guardrails

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Shared responsibility and hierarchy (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map a workload's controls to provider vs customer; (2) Design a resource hierarchy for two teams
- Common misconception addressed: Believing the cloud provider secures the customer's data and IAM configuration
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shared responsibility model | 48 | 5 |
| M01L02 | Organization, folders and projects | 48 | 5 |
### M02 Identity and access management (MASTEMY-DESIGN 16%)

- Worked applications: (1) Grant a team read-only access to one project; (2) Replace broad primitive roles with predefined roles
- Common misconception addressed: Granting Owner/Editor instead of least-privilege predefined roles
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IAM roles and policies | 48 | 5 |
| M02L02 | Service accounts and least privilege | 48 | 5 |
### M03 Network security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write firewall rules to allow only required traffic; (2) Keep traffic to Google APIs off the public internet
- Common misconception addressed: Assuming a default-allow posture or a public IP is required to reach Google APIs
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VPC firewalls and segmentation | 48 | 5 |
| M03L02 | Private Google Access and perimeters | 48 | 5 |
### M04 Data protection and encryption (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose default vs CMEK for a regulated dataset; (2) Rotate a key and control who can use it
- Common misconception addressed: Thinking data is unencrypted unless you configure keys yourself
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Encryption at rest and in transit | 48 | 5 |
| M04L02 | Customer-managed keys (CMEK) | 48 | 5 |
### M05 Detection and monitoring (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace who changed an IAM policy using Audit Logs; (2) Triage a Security Command Center finding
- Common misconception addressed: Expecting Data Access logs by default when only Admin Activity logs are on
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cloud Audit Logs | 48 | 5 |
| M05L02 | Security Command Center | 48 | 5 |
### M06 Governance and compliance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Block public IPs with an organization policy; (2) Restrict resource locations for data residency
- Common misconception addressed: Relying on IAM alone instead of organization policy guardrails
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Organization policy constraints | 48 | 5 |
| M06L02 | Compliance guardrails | 48 | 5 |

## Integrative case

A startup must secure a new Google Cloud environment: design a resource hierarchy with organization policies, grant least-privilege IAM, protect networks, encrypt data, and set up logging and threat detection, then justify the controls to a security reviewer.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1463-final-protected | 30 | 30 | yes |
| MST-1463-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Shared responsibility and hierarchy | 5 |
| Identity and access management | 5 |
| Network security | 5 |
| Data protection and encryption | 5 |
| Detection and monitoring | 5 |
| Governance and compliance | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1463-Q0001** (single-answer, Select ONE) An engineer needs read-only access to logs in one project and nothing else. Which approach follows least privilege?

- A. Grant a predefined role like Logs Viewer on that project **(key)**  
  _Rationale:_ Correct: a predefined role scoped to the project grants only the needed read access.
- B. Grant the Editor role at the organization level  
  _Rationale:_ Editor is broad and organization scope is far wider than one project.
- C. Grant Owner on the project  
  _Rationale:_ Owner allows managing access and far exceeds read-only.
- D. Add the user to a group with the Security Admin role  
  _Rationale:_ Security Admin manages security resources, not read-only log access.

**MST-1463-Q0002** (multiple-answer, Select TWO) Which TWO keep traffic to Google Cloud APIs off the public internet? (Select TWO.)

- A. Enable Private Google Access on the subnet **(key)**  
  _Rationale:_ Correct: Private Google Access lets instances without external IPs reach Google APIs privately.
- B. Use VPC Service Controls / private endpoints **(key)**  
  _Rationale:_ Correct: a service perimeter and private endpoints keep API traffic within a private boundary.
- C. Assign every VM a public external IP  
  _Rationale:_ Public IPs push traffic over the internet, the opposite of the goal.
- D. Open firewall ingress to 0.0.0.0/0  
  _Rationale:_ A default-allow rule broadens exposure and does not make API access private.

**MST-1463-Q0003** (single-answer, Select ONE) By default, which audit logs record who modified an IAM policy on a resource?

- A. Admin Activity audit logs **(key)**  
  _Rationale:_ Correct: Admin Activity logs capture configuration changes such as IAM edits and are on by default.
- B. Data Access audit logs  
  _Rationale:_ Data Access logs record data reads/writes and are mostly off by default.
- C. VPC Flow Logs  
  _Rationale:_ Flow Logs capture network traffic metadata, not IAM changes.
- D. Billing export logs  
  _Rationale:_ Billing export covers cost data, not IAM changes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
