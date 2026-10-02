# Claude Connectors: Permissions and Verified Tool Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0527` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CONNECTORS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Connectors: Permissions and Verified Tool Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what connectors do and when they are appropriate
2. Grant and maintain least-privilege connector permissions
3. Build verified, human-checked connector workflows
4. Assess and limit data-exposure risk in connected workflows
5. Maintain an auditable record of connected tool actions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 What connectors are (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Describe what a given connector can and cannot access; (2) Decide whether a task needs a connector at all
- Common misconception addressed: Connecting a data source before understanding what it exposes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a connector is and how it works | 72 | 5 |
| M01L02 | When a connector is and is not needed | 72 | 5 |

### M02 Permissions and least privilege (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Grant the minimum permissions a task requires; (2) Review and revoke permissions no longer needed
- Common misconception addressed: Granting broad access because it is easier than scoping it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Permission scopes and least privilege | 96 | 5 |
| M02L02 | Reviewing and revoking access | 96 | 5 |

### M03 Verified tool workflows (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Verify a connector's output before acting on it; (2) Design a workflow where a human confirms before a consequential action
- Common misconception addressed: Acting on a connector result without confirming it is correct
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Verifying tool outputs | 80 | 5 |
| M03L02 | Human-in-the-loop for consequential actions | 80 | 5 |
| M03L03 | Handling tool errors safely | 80 | 5 |

### M04 Data safety with connectors (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Assess the data-exposure risk of a connected workflow; (2) Decide which data should never flow through a connector
- Common misconception addressed: Assuming connected data is automatically safe to use anywhere
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data exposure through connectors | 96 | 5 |
| M04L02 | Keeping sensitive data out of scope | 96 | 5 |

### M05 Auditability (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Keep a record of connected actions taken; (2) Reconstruct what a workflow did from its record
- Common misconception addressed: Running connected actions with no record of what happened
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Recording connected actions | 96 | 5 |
| M05L02 | Reconstructing a workflow for review | 96 | 5 |

## Integrative case

An operations analyst sets up Claude connectors to work with real data: understand what a connector can access, grant least-privilege permissions, verify tool outputs before acting, and keep a record of what connected actions were taken.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0527-final-protected | 30 | 40 | yes |
| MST-0527-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What connectors are | 5 |
| Permissions and least privilege | 6 |
| Verified tool workflows | 7 |
| Data safety with connectors | 6 |
| Auditability | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0527-Q0001** (single-answer, Select ONE) A connector returns a customer record that a workflow will use to send an email. What is the safe design?

- A. A human confirms the record is correct before the consequential action runs **(key)**  
  _Rationale:_ Correct: consequential actions should have a human-in-the-loop check.
- B. Send the email automatically with no check  
  _Rationale:_ Acting on unverified tool output is risky.
- C. Assume the connector is always right  
  _Rationale:_ Tool outputs can be wrong or stale and must be verified.
- D. Disable all logging  
  _Rationale:_ Logging aids auditability and should be kept.

**MST-0527-Q0002** (multiple-answer, Select TWO) Which TWO reflect least-privilege connector permissions? (Select TWO.)

- A. Granting only the access a task actually requires **(key)**  
  _Rationale:_ Correct: least privilege limits exposure.
- B. Reviewing and revoking access that is no longer needed **(key)**  
  _Rationale:_ Correct: stale permissions should be removed.
- C. Granting broad access because it is convenient  
  _Rationale:_ Convenience is not a security rationale.
- D. Never reviewing permissions once granted  
  _Rationale:_ Permissions need periodic review.

**MST-0527-Q0003** (single-answer, Select ONE) Before connecting a data source, what should you understand first?

- A. What data the connector can access and expose **(key)**  
  _Rationale:_ Correct: understand exposure before connecting.
- B. The connector's icon colour  
  _Rationale:_ Appearance is irrelevant to safety.
- C. How many users like it  
  _Rationale:_ Popularity is not an access assessment.
- D. Nothing; connect first and check later  
  _Rationale:_ Connecting first can expose data unintentionally.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
