# Google Cloud Professional Cloud Security Engineer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0222` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified)  - design assumption: PCSE|
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-GCP-GCP-PCSE-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Configure access within a Google Cloud environment
2. Configure network security and data protection
3. Ensure compliance and manage operations
4. Manage security monitoring, incident response and threat detection

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Identity and access management

- Worked applications: (1) Design least-privilege IAM for three teams; (2) Replace a broad role with scoped custom roles
- Common misconception addressed: Using primitive owner/editor roles at the project level
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Resource hierarchy and org policy | 180 | 6 |
| M01L02 | IAM roles, conditions and least privilege | 180 | 6 |
| M01L03 | Service accounts and workload identity | 180 | 6 |
| M01L04 | Access reviews and separation of duties | 180 | 6 |

### M02 Network and data security

- Worked applications: (1) Design VPC segmentation for tiered workloads; (2) Configure customer-managed encryption keys for a dataset
- Common misconception addressed: Relying on perimeter firewalls and ignoring east-west traffic
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | VPC design and segmentation | 180 | 6 |
| M02L02 | Firewall and private connectivity | 180 | 6 |
| M02L03 | Encryption and key management | 180 | 6 |
| M02L04 | Secret and certificate management | 180 | 6 |

### M03 Compliance and operations

- Worked applications: (1) Map controls to a compliance requirement; (2) Author org policies that enforce a guardrail
- Common misconception addressed: Treating a point-in-time audit as continuous compliance
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Compliance frameworks and controls | 180 | 6 |
| M03L02 | Organisation policies and guardrails | 180 | 6 |
| M03L03 | Data governance and residency | 180 | 6 |
| M03L04 | Security of CI/CD and supply chain | 180 | 6 |

### M04 Monitoring and incident response

- Worked applications: (1) Triage a set of security findings by risk; (2) Design an incident-response runbook for a key leak
- Common misconception addressed: Collecting logs but never defining detections or response
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Security monitoring and findings | 180 | 6 |
| M04L02 | Threat detection and log analysis | 180 | 6 |
| M04L03 | Incident response workflow | 180 | 6 |
| M04L04 | Vulnerability and posture management | 180 | 6 |

## Integrative case

A security engineer hardens a multi-project Google Cloud organisation: they design the IAM and resource hierarchy, lock down networking and data protection, align with compliance, and stand up monitoring and incident response.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0222-practice-form-A | 108 | 108 | yes |
| MST-0222-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0222-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0222-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Identity and access management | 27 |
| Network and data security | 27 |
| Compliance and operations | 27 |
| Monitoring and incident response | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
