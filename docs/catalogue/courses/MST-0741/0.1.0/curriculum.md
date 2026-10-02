# Google Cloud IAM, Security, and Organization Policies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0741` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud IAM documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud IAM, Security, and Organization Policies (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain IAM principals, roles and policy inheritance
2. Apply least-privilege access with predefined and custom roles
3. Use service accounts and workload identity safely
4. Enforce guardrails with organization policies
5. Audit access and investigate with Cloud Audit Logs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 IAM model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Grant a predefined role at project level; (2) Trace an inherited permission
- Common misconception addressed: Thinking a deny at a child overrides an inherited allow by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Principals, roles and bindings | 120 | 7 |
| M01L02 | Policy inheritance in the hierarchy | 120 | 7 |

### M02 Least privilege (MASTEMY-DESIGN 20%)

- Worked applications: (1) Replace an owner grant with a narrower role; (2) Build a custom role from needed permissions
- Common misconception addressed: Using the Owner role for everyday work
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Predefined vs custom roles | 120 | 7 |
| M02L02 | Designing least-privilege access | 120 | 7 |

### M03 Service accounts (MASTEMY-DESIGN 20%)

- Worked applications: (1) Attach a service account to a workload; (2) Use impersonation instead of a downloaded key
- Common misconception addressed: Downloading and emailing long-lived service account keys
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Service accounts and keys | 120 | 7 |
| M03L02 | Workload identity and impersonation | 120 | 7 |

### M04 Organization policies (MASTEMY-DESIGN 20%)

- Worked applications: (1) Restrict resource locations with a policy; (2) Disable service account key creation org-wide
- Common misconception addressed: Relying only on IAM and skipping org-policy guardrails
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Constraints and guardrails | 120 | 7 |
| M04L02 | Applying policies across the hierarchy | 120 | 7 |

### M05 Audit and investigation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Find who changed an IAM binding; (2) Enable data access audit logs for a service
- Common misconception addressed: Assuming admin activity logs capture data access by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cloud Audit Logs types | 120 | 7 |
| M05L02 | Investigating access events | 120 | 7 |

## Integrative case

Harden a Google Cloud project: replace broad grants with least-privilege roles, move a workload from downloaded keys to workload identity, enforce location and key-creation org policies, and prove with Cloud Audit Logs who changed access and when.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0741-final-protected | 40 | 50 | yes |
| MST-0741-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IAM model | 8 |
| Least privilege | 8 |
| Service accounts | 8 |
| Organization policies | 8 |
| Audit and investigation | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0741-Q0001** (single-answer, Select ONE) In Google Cloud IAM, how do policies set at a parent node affect child resources?

- A. Children inherit the parent's allow bindings **(key)**  
  _Rationale:_ Correct: IAM allow policies are inherited down the resource hierarchy.
- B. Children ignore all parent bindings  
  _Rationale:_ Inheritance is the default behaviour.
- C. Only billing roles inherit  
  _Rationale:_ Inheritance applies to IAM roles generally, not just billing.
- D. Inheritance requires a custom role  
  _Rationale:_ Inheritance is built in and not tied to custom roles.

**MST-0741-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce service account credential risk? (Select TWO.)

- A. Use workload identity or impersonation instead of downloaded keys **(key)**  
  _Rationale:_ Correct: short-lived, managed credentials avoid long-lived key exposure.
- B. Disable service account key creation with an organization policy **(key)**  
  _Rationale:_ Correct: an org policy guardrail prevents risky key creation.
- C. Email the JSON key to teammates who need access  
  _Rationale:_ Sharing long-lived keys is a serious risk.
- D. Grant the Owner role to every service account  
  _Rationale:_ Owner is far broader than least privilege.

**MST-0741-Q0003** (single-answer, Select ONE) Which log type must often be explicitly enabled to see who read data in a service?

- A. Data Access audit logs **(key)**  
  _Rationale:_ Correct: Data Access logs are frequently disabled by default and must be enabled.
- B. Admin Activity audit logs  
  _Rationale:_ Admin Activity logs are on by default and cover config changes, not data reads.
- C. Billing export logs  
  _Rationale:_ Billing export is for cost data, not access events.
- D. Serial console logs  
  _Rationale:_ Serial console logs relate to VM boot output, not data access.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
