# Google Cloud Architecture and Landing Zones

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0740` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud architecture / landing zone documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Architecture and Landing Zones (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Google Cloud resource hierarchy and projects
2. Design a landing zone with organization structure and policies
3. Plan networking, connectivity and shared VPC
4. Apply identity, security and guardrail controls
5. Plan for billing, quotas and operational readiness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Resource hierarchy (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model a folder structure for two business units; (2) Place a project under the correct folder
- Common misconception addressed: Putting every workload in a single flat project
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Organizations, folders and projects | 120 | 7 |
| M01L02 | Resource organization patterns | 120 | 7 |

### M02 Landing zone design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a baseline organization policy; (2) Separate environments into folders
- Common misconception addressed: Treating a landing zone as a one-time setup rather than a managed baseline
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Landing zone components | 120 | 7 |
| M02L02 | Organization policies and guardrails | 120 | 7 |

### M03 Networking foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a Shared VPC host and service projects; (2) Choose a connectivity option for on-prem
- Common misconception addressed: Overlapping IP ranges across environments
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VPC design and Shared VPC | 120 | 7 |
| M03L02 | Hybrid connectivity options | 120 | 7 |

### M04 Identity and security (MASTEMY-DESIGN 20%)

- Worked applications: (1) Grant access via groups rather than individuals; (2) Enable org-wide audit logging
- Common misconception addressed: Granting broad primitive roles instead of least privilege
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IAM baseline and groups | 120 | 7 |
| M04L02 | Security guardrails and logging | 120 | 7 |

### M05 Operations and billing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Attach a budget with alerts to a project; (2) Review quota limits before launch
- Common misconception addressed: Launching without budget alerts or quota planning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Billing accounts and budgets | 120 | 7 |
| M05L02 | Quotas and operational readiness | 120 | 7 |

## Integrative case

Design a Google Cloud landing zone for a mid-size company: lay out the organization/folder/project hierarchy, set baseline organization policies, plan a Shared VPC and connectivity, establish group-based IAM and audit logging, and attach budgets and quota checks before go-live.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0740-final-protected | 40 | 50 | yes |
| MST-0740-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Resource hierarchy | 8 |
| Landing zone design | 8 |
| Networking foundations | 8 |
| Identity and security | 8 |
| Operations and billing | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0740-Q0001** (single-answer, Select ONE) In the Google Cloud resource hierarchy, which node is the top-level container for an enterprise?

- A. Organization **(key)**  
  _Rationale:_ Correct: the Organization is the root node containing folders and projects.
- B. Project  
  _Rationale:_ Projects sit beneath folders and the organization.
- C. VPC network  
  _Rationale:_ A VPC is a networking resource, not the hierarchy root.
- D. Billing account  
  _Rationale:_ A billing account pays for usage but is not the hierarchy root.

**MST-0740-Q0002** (multiple-answer, Select TWO) Which TWO are core goals of a Google Cloud landing zone? (Select TWO.)

- A. Establish a consistent, policy-governed baseline for new workloads **(key)**  
  _Rationale:_ Correct: landing zones provide a governed starting point.
- B. Separate environments and business units with folders and policies **(key)**  
  _Rationale:_ Correct: structured separation and guardrails are central goals.
- C. Eliminate the need for IAM entirely  
  _Rationale:_ Landing zones rely on IAM, not its removal.
- D. Force all resources into one project  
  _Rationale:_ A flat single project is the opposite of landing-zone design.

**MST-0740-Q0003** (single-answer, Select ONE) Why use group-based IAM bindings instead of binding roles to individual users?

- A. Access management scales and stays consistent as membership changes **(key)**  
  _Rationale:_ Correct: managing access via groups is easier to audit and maintain.
- B. Groups bypass IAM policy evaluation  
  _Rationale:_ Groups are evaluated by IAM like any principal.
- C. Individual bindings are not supported  
  _Rationale:_ Individual bindings are supported but harder to manage at scale.
- D. Groups remove the need for least privilege  
  _Rationale:_ Least privilege still applies to group roles.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
