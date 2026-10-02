# Cursor Team Administration and Security Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0567` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0567 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Team Administration and Security Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Administer a Cursor team's roles, membership and default settings
2. Manage access and identity with SSO, provisioning and offboarding
3. Configure data and privacy controls for sensitive codebases
4. Set team policy and use audit logs for governance
5. Operate securely over time with periodic review and incident response

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Administering a Cursor team (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Plan roles for a new team; (2) Review defaults that affect all members
- Common misconception addressed: Granting admin rights more widely than needed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Roles, membership and team structure | 72 | 5 |
| M01L02 | Default settings that affect everyone | 72 | 5 |

### M02 Access and identity (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan SSO-based onboarding for a team; (2) Offboard a member and revoke their access
- Common misconception addressed: Leaving departed members with active access
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Single sign-on and provisioning members | 96 | 5 |
| M02L02 | Offboarding and revoking access | 96 | 5 |

### M03 Data and privacy controls (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Configure data settings for a sensitive repo; (2) Choose a privacy mode for confidential code
- Common misconception addressed: Assuming a default is private without checking the setting
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Settings that govern what data is sent or retained | 80 | 5 |
| M03L02 | Privacy modes for sensitive codebases | 80 | 5 |

### M04 Policy and governance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a team policy for tool and model use; (2) Use audit logs to review activity
- Common misconception addressed: Setting no policy and relying on individual judgement alone
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Setting team policy for model and tool use | 80 | 5 |
| M04L02 | Audit logs and reviewing activity | 96 | 5 |
| M04L03 | Handling a policy violation | 96 | 5 |

### M05 Operating securely over time (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Schedule a periodic access and settings review; (2) Plan a response to a suspected token leak
- Common misconception addressed: Treating setup as one-time rather than reviewed regularly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reviewing settings and access regularly | 96 | 5 |
| M05L02 | Responding to a security concern | 96 | 5 |

## Integrative case

A new engineering org rolls out Cursor to 200 people: plan roles with least-privilege admin, wire SSO onboarding and offboarding, configure data and privacy settings for sensitive repos, publish a tool-and-model policy with audit review, and schedule periodic access reviews.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0567-final-protected | 30 | 40 | yes |
| MST-0567-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Administering a Cursor team | 5 |
| Access and identity | 6 |
| Data and privacy controls | 7 |
| Policy and governance | 6 |
| Operating securely over time | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0567-Q0001** (single-answer, Select ONE) How should administrative rights be granted in a Cursor team?

- A. To as few people as the work requires (least privilege) **(key)**  
  _Rationale:_ Correct: limiting admin rights limits the blast radius of mistakes or breaches.
- B. To everyone, so no one is blocked  
  _Rationale:_ Broad admin access is a serious security liability.
- C. To whoever asks first  
  _Rationale:_ Access should follow need, not request order.
- D. Never to anyone, even the owner  
  _Rationale:_ Some administration is necessary; it should just be limited.

**MST-0567-Q0002** (multiple-answer, Select TWO) Which TWO actions matter most when a team member leaves? (Select TWO.)

- A. Revoke their access promptly **(key)**  
  _Rationale:_ Correct: prompt revocation closes an open door.
- B. Review what access and tokens they held **(key)**  
  _Rationale:_ Correct: knowing their access guides what to rotate or revoke.
- C. Leave their account active in case they return  
  _Rationale:_ An active departed account is an open risk.
- D. Share their token with the team  
  _Rationale:_ Reusing a personal token defeats auditing and rotation.

**MST-0567-Q0003** (single-answer, Select ONE) You need to confirm whether a sensitive repo's data is handled privately. What should you do?

- A. Check the actual data and privacy settings rather than assume **(key)**  
  _Rationale:_ Correct: privacy must be verified in the settings, not assumed.
- B. Assume the default is private  
  _Rationale:_ Defaults may not match your privacy need.
- C. Ask a teammate what they think it does  
  _Rationale:_ Hearsay is not verification.
- D. Disable all logging to be safe  
  _Rationale:_ Disabling audit logging harms governance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
