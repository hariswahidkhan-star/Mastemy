# AWS Security Monitoring and Incident Response

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0766` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on AWS Security Hub and Amazon GuardDuty documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-SECMON (https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html; https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AWS Security Monitoring and Incident Response (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe AWS security monitoring services and their roles
2. Enable threat detection with GuardDuty
3. Aggregate findings with Security Hub
4. Record configuration and audit with Config and CloudTrail
5. Build detection and alerting pipelines
6. Run an incident response process on AWS

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Security monitoring landscape (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map GuardDuty, Security Hub, Config and CloudTrail to their roles; (2) Enable an organisation CloudTrail trail
- Common misconception addressed: Assuming one service covers detection, audit and compliance alike
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Services and responsibilities | 80 | 7 |
| M01L02 | Logging foundations: CloudTrail and Config | 80 | 7 |

### M02 Threat detection (MASTEMY-DESIGN 16%)

- Worked applications: (1) Enable GuardDuty and interpret a finding; (2) Suppress a known-benign finding with a filter
- Common misconception addressed: Treating every GuardDuty finding as a confirmed breach
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | GuardDuty detectors and findings | 80 | 7 |
| M02L02 | Finding types and severity | 80 | 7 |

### M03 Finding aggregation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable a security standard and read the score; (2) Prioritise findings across accounts in Security Hub
- Common misconception addressed: Ignoring that Security Hub aggregates, not detects, by itself
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Security Hub standards and scores | 80 | 7 |
| M03L02 | Aggregating and prioritising findings | 80 | 7 |

### M04 Audit and configuration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a Config rule to flag public S3 buckets; (2) Trace an action to a principal in CloudTrail
- Common misconception addressed: Confusing Config (resource state) with CloudTrail (API activity)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | AWS Config rules and history | 80 | 7 |
| M04L02 | CloudTrail analysis | 80 | 7 |

### M05 Alerting pipelines (MASTEMY-DESIGN 17%)

- Worked applications: (1) Route high-severity findings to a Slack/ticket via EventBridge; (2) Build a finding-to-Lambda remediation
- Common misconception addressed: Alerting on everything and causing fatigue
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | EventBridge and findings routing | 80 | 7 |
| M05L02 | Notifications and ticketing | 80 | 7 |

### M06 Incident response (MASTEMY-DESIGN 17%)

- Worked applications: (1) Isolate a compromised instance with a quarantine security group; (2) Rotate exposed credentials and capture evidence
- Common misconception addressed: Terminating a compromised instance before preserving forensic evidence
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | IR phases on AWS | 80 | 7 |
| M06L02 | Containment, eradication and recovery | 80 | 7 |

## Integrative case

Stand up security monitoring and respond to an incident: enable CloudTrail, GuardDuty and Security Hub, add a Config rule for public buckets, route high-severity findings via EventBridge, then run an IR playbook that isolates a compromised instance, preserves evidence, and rotates credentials.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0766-final-protected | 40 | 50 | yes |
| MST-0766-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Security monitoring landscape | 7 |
| Threat detection | 7 |
| Finding aggregation | 7 |
| Audit and configuration | 7 |
| Alerting pipelines | 6 |
| Incident response | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0766-Q0001** (single-answer, Select ONE) What is the primary role of Amazon GuardDuty?

- A. Continuous threat detection from logs and network/DNS activity **(key)**  
  _Rationale:_ Correct: GuardDuty analyses data sources to detect threats and generate findings.
- B. Aggregating findings from many security tools  
  _Rationale:_ That is Security Hub's role, not GuardDuty's.
- C. Recording resource configuration history  
  _Rationale:_ That is AWS Config's role.
- D. Signing IAM policies  
  _Rationale:_ GuardDuty does not sign policies.

**MST-0766-Q0002** (single-answer, Select ONE) During incident response, why isolate a compromised EC2 instance before terminating it?

- A. To contain the threat while preserving forensic evidence for investigation **(key)**  
  _Rationale:_ Correct: isolation contains the incident and keeps evidence that termination would destroy.
- B. Because termination is impossible on AWS  
  _Rationale:_ Termination is possible; it just destroys evidence.
- C. To increase its instance size  
  _Rationale:_ Isolation is not about resizing.
- D. To make it publicly accessible  
  _Rationale:_ Isolation reduces, not increases, exposure.

**MST-0766-Q0003** (multiple-answer, Select TWO) Which TWO statements correctly distinguish AWS Config from CloudTrail? (Select TWO.)

- A. Config records resource configuration state over time **(key)**  
  _Rationale:_ Correct: Config tracks the configuration of resources and changes to it.
- B. CloudTrail records API activity and who performed it **(key)**  
  _Rationale:_ Correct: CloudTrail logs API calls and the calling principal.
- C. Config detects threats from network traffic  
  _Rationale:_ Threat detection is GuardDuty's role, not Config's.
- D. CloudTrail aggregates security standard scores  
  _Rationale:_ Standard scoring is Security Hub's role.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
