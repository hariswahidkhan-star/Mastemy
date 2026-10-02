# Google Cloud Associate Google Workspace Administrator

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0217` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-AGWA-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Provision and manage users, groups and organisational units in Google Workspace
2. Configure mail, calendar and collaboration services
3. Apply security, access and endpoint controls
4. Monitor, troubleshoot and support the Workspace environment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 User, group and OU management

- Worked applications: (1) Design an OU and group structure for three departments; (2) Automate onboarding for a batch of new users
- Common misconception addressed: Flattening all users into one OU and losing policy targeting
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Organisational unit design | 135 | 6 |
| M01L02 | Provisioning and lifecycle of users | 135 | 6 |
| M01L03 | Groups and access management | 135 | 6 |
| M01L04 | Directory and licensing | 135 | 6 |

### M02 Core service configuration

- Worked applications: (1) Configure mail routing and a compliance footer; (2) Set sharing policy for a confidential shared drive
- Common misconception addressed: Confusing shared-drive membership with individual file sharing
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Gmail routing and settings | 135 | 6 |
| M02L02 | Calendar and resource management | 135 | 6 |
| M02L03 | Drive, Docs and shared drives | 135 | 6 |
| M02L04 | Meet and collaboration controls | 135 | 6 |

### M03 Security and endpoint controls

- Worked applications: (1) Enforce 2-step verification for an admin group; (2) Create a DLP rule for outbound sensitive data
- Common misconception addressed: Assuming password policy alone protects high-privilege accounts
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Authentication and 2-step verification | 135 | 6 |
| M03L02 | Context-aware and access policies | 135 | 6 |
| M03L03 | Mobile and endpoint management | 135 | 6 |
| M03L04 | Data loss prevention basics | 135 | 6 |

### M04 Monitoring, troubleshooting and support

- Worked applications: (1) Trace an undelivered message using logs; (2) Build an alert for suspicious sign-in activity
- Common misconception addressed: Reading only aggregate reports and missing per-user audit events
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Admin reports and audit logs | 135 | 6 |
| M04L02 | Investigating delivery and access issues | 135 | 6 |
| M04L03 | Alerting and the security dashboard | 135 | 6 |
| M04L04 | Support escalation and documentation | 135 | 6 |

## Integrative case

A new administrator onboards a 400-person organisation to Google Workspace: they build the OU structure, migrate mail, enforce security policies, and set up monitoring and support processes.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0217-practice-form-A | 81 | 81 | yes |
| MST-0217-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0217-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0217-final-protected | 81 | 81 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| User, group and OU management | 21 |
| Core service configuration | 20 |
| Security and endpoint controls | 20 |
| Monitoring, troubleshooting and support | 20 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
