# Google Cloud Identity and Access Management Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1477` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Identity and Access Management Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain IAM principals, roles and policy inheritance
2. Design least-privilege access with predefined and custom roles
3. Manage service accounts and workload identity securely
4. Audit access with policy analyzer and recommender

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 IAM fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write an IAM binding for a group; (2) Trace effective permissions down the hierarchy
- Common misconception addressed: Thinking a deny at a child resource overrides an allow inherited from the org
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Principals, roles and bindings | 72 | 7 |
| M01L02 | Policy inheritance in the resource hierarchy | 72 | 7 |

### M02 Roles and least privilege (MASTEMY-DESIGN 25%)

- Worked applications: (1) Replace owner with a predefined role; (2) Create a custom role with only needed permissions
- Common misconception addressed: Using basic roles (owner/editor) as the default for everyone
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Basic, predefined and custom roles | 72 | 7 |
| M02L02 | Designing least-privilege access | 72 | 7 |

### M03 Service accounts and workloads (MASTEMY-DESIGN 25%)

- Worked applications: (1) Attach a service account to a workload; (2) Federate an external identity without keys
- Common misconception addressed: Treating long-lived service account keys as safe long-term credentials
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Service accounts and keys | 72 | 7 |
| M03L02 | Workload identity federation | 72 | 7 |

### M04 Auditing and governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Use Recommender to remove excess permissions; (2) Add an IAM condition limiting access by time
- Common misconception addressed: Assuming granting a role is reversible with no audit trail needed
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IAM policy analyzer and recommender | 72 | 7 |
| M04L02 | Conditions and org policies | 72 | 7 |

## Integrative case

An org has grown sloppy with broad roles. Redesign IAM: map principals to least-privilege roles, replace owner grants, set up service accounts with workload identity federation, and audit who can do what using policy tools.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1477-final-protected | 28 | 35 | yes |
| MST-1477-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IAM fundamentals | 7 |
| Roles and least privilege | 7 |
| Service accounts and workloads | 7 |
| Auditing and governance | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1477-Q0001** (single-answer, Select ONE) Which practice best supports least privilege in Google Cloud IAM?

- A. Grant predefined or custom roles scoped to the needed resource **(key)**  
  _Rationale:_ Correct: narrowly scoped roles follow least privilege.
- B. Grant the basic Owner role to all engineers  
  _Rationale:_ Owner is overly broad and violates least privilege.
- C. Share one service account key with the team  
  _Rationale:_ Shared keys are insecure and over-permissioned.
- D. Disable IAM auditing  
  _Rationale:_ Disabling auditing reduces governance, not privilege scope.

**MST-1477-Q0002** (multiple-answer, Select TWO) Which TWO reduce the risk from service account credentials? (Select TWO.)

- A. Use workload identity federation instead of exported keys **(key)**  
  _Rationale:_ Correct: federation avoids long-lived downloadable keys.
- B. Attach a service account to the resource rather than exporting a key **(key)**  
  _Rationale:_ Correct: attachment avoids key handling entirely.
- C. Email the key to all developers  
  _Rationale:_ Distributing keys increases risk.
- D. Commit the key JSON to the git repo  
  _Rationale:_ Committing keys leaks credentials.

**MST-1477-Q0003** (single-answer, Select ONE) How do IAM policies behave across the resource hierarchy?

- A. Child resources inherit allow policies from ancestors (org, folder, project) **(key)**  
  _Rationale:_ Correct: allow policies are inherited down the hierarchy.
- B. Policies apply only to the exact resource and never inherit  
  _Rationale:_ Inheritance is a core IAM behavior.
- C. A project policy overrides the organization's billing  
  _Rationale:_ That conflates IAM with billing.
- D. Only service accounts inherit roles  
  _Rationale:_ Inheritance applies to all principals, not just service accounts.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
