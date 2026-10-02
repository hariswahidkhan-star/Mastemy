# Privileged Access Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1692` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-PAM-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Privileged Access Management (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain privileged access and the risks it carries
2. Apply least privilege and just-in-time access
3. Manage and vault privileged credentials and secrets
4. Implement session management, monitoring and recording
5. Govern privileged access with auditing and reviews

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Privileged access and its risks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify privileged accounts in an environment; (2) Explain the impact of a compromised admin account
- Common misconception addressed: Treating a privileged account like any ordinary user account
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What privileged access is | 72 | 6 |
| M01L02 | Why privileged accounts are high-value targets | 72 | 6 |

### M02 Least privilege and just-in-time (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reduce standing admin rights to JIT access; (2) Design a time-bound elevation workflow
- Common misconception addressed: Keeping standing admin rights 'in case they are needed'
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Least privilege for administrators | 72 | 6 |
| M02L02 | Just-in-time and time-bound elevation | 72 | 6 |

### M03 Credential vaulting and secrets (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose what to vault and how often to rotate; (2) Replace a hard-coded secret with a vault retrieval
- Common misconception addressed: Storing admin passwords in shared spreadsheets or scripts
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Password vaulting and rotation | 72 | 6 |
| M03L02 | Managing application secrets and keys | 72 | 6 |

### M04 Session management and monitoring (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide which sessions to record and why; (2) Set an alert for anomalous privileged use
- Common misconception addressed: Assuming privileged actions need no recording if staff are trusted
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Privileged session isolation and recording | 72 | 6 |
| M04L02 | Monitoring and alerting on privileged activity | 72 | 6 |

### M05 Governance and review (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a periodic privileged-access review; (2) Use audit logs to answer 'who did what'
- Common misconception addressed: Granting privileged access once and never reviewing it
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Auditing privileged access | 72 | 6 |
| M05L02 | Access reviews and recertification | 72 | 6 |

## Integrative case

An organisation has shared admin passwords stored in a spreadsheet, standing domain-admin rights for a dozen staff, and no record of who did what. Design a PAM programme: vault and rotate credentials, move to just-in-time least-privilege access, record privileged sessions, and establish auditing and access reviews.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1692-final-protected | 25 | 25 | yes |
| MST-1692-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Privileged access and its risks | 5 |
| Least privilege and just-in-time | 5 |
| Credential vaulting and secrets | 5 |
| Session management and monitoring | 5 |
| Governance and review | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1692-Q0001** (single-answer, Select ONE) What is the main advantage of just-in-time privileged access over standing admin rights?

- A. Privileges exist only when needed, shrinking the window of exposure **(key)**  
  _Rationale:_ Correct: time-bound access reduces the attack window.
- B. It removes the need to authenticate administrators  
  _Rationale:_ Authentication is still required.
- C. It makes all accounts permanent administrators  
  _Rationale:_ That is the opposite of JIT.
- D. It eliminates the need for any auditing  
  _Rationale:_ Auditing remains essential under JIT.

**MST-1692-Q0002** (multiple-answer, Select TWO) Which TWO practices strengthen privileged credential management? (Select TWO.)

- A. Vault privileged passwords and rotate them automatically **(key)**  
  _Rationale:_ Correct: vaulting plus rotation limits reuse and exposure.
- B. Retrieve secrets from a vault instead of hard-coding them **(key)**  
  _Rationale:_ Correct: removing hard-coded secrets reduces leakage risk.
- C. Share one admin password across the whole team  
  _Rationale:_ Shared passwords destroy accountability and are easily leaked.
- D. Store credentials in a plaintext spreadsheet  
  _Rationale:_ Plaintext storage is a major exposure.

**MST-1692-Q0003** (single-answer, Select ONE) Why record privileged sessions even for trusted staff?

- A. To provide accountability and evidence of who did what **(key)**  
  _Rationale:_ Correct: recording supports audit, investigation and deterrence.
- B. Because trusted staff never make mistakes  
  _Rationale:_ Trusted staff still err; recording helps investigate.
- C. To slow down administrators deliberately  
  _Rationale:_ The goal is accountability, not slowing work.
- D. Because recording replaces access controls  
  _Rationale:_ Recording complements, not replaces, access controls.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
