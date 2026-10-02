# Claude Team and Enterprise Adoption and Administration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0526` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-ENTERPRISE-ADMIN |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Team and Enterprise Adoption and Administration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan a phased, stakeholder-aware Claude rollout
2. Administer members, roles and workspace settings appropriately
3. Configure data-handling and governance controls to meet obligations
4. Establish an acceptable-use policy that works in practice
5. Monitor adoption and iterate the deployment over time

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Planning a rollout (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Draft a phased rollout plan for a department; (2) Identify stakeholders and their concerns
- Common misconception addressed: Rolling out to everyone at once with no pilot or feedback loop
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Planning a phased rollout | 72 | 5 |
| M01L02 | Stakeholders and change management | 72 | 5 |

### M02 Workspace and member administration (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Configure members, roles and workspace settings; (2) Decide appropriate access for different teams
- Common misconception addressed: Giving every member the same access regardless of role
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Members, roles and workspaces | 96 | 5 |
| M02L02 | Least-privilege access decisions | 96 | 5 |

### M03 Data handling and governance (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Set data-handling and retention controls for the organisation; (2) Decide what data may and may not be used with Claude
- Common misconception addressed: Assuming default settings meet the organisation's data obligations
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data-handling and retention controls | 80 | 5 |
| M03L02 | Classifying what data is in scope | 80 | 5 |
| M03L03 | Sharing and connector governance | 80 | 5 |

### M04 Acceptable use and policy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draft an acceptable-use policy for Claude in the organisation; (2) Map the policy to real user scenarios
- Common misconception addressed: Publishing a policy that no one can apply to real situations
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Writing an acceptable-use policy | 96 | 5 |
| M04L02 | Making policy usable in practice | 96 | 5 |

### M05 Monitoring and iteration (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Define adoption and safety signals to monitor; (2) Set a review cadence to adjust settings over time
- Common misconception addressed: Treating the rollout as finished once access is granted
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Signals worth monitoring | 96 | 5 |
| M05L02 | A review and iteration cadence | 96 | 5 |

## Integrative case

An IT admin rolls Claude out to a department: plan the rollout, configure workspace and member settings, set data-handling and sharing controls, and establish an acceptable-use and review process the organisation can govern.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0526-final-protected | 30 | 40 | yes |
| MST-0526-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Planning a rollout | 5 |
| Workspace and member administration | 6 |
| Data handling and governance | 7 |
| Acceptable use and policy | 6 |
| Monitoring and iteration | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0526-Q0001** (single-answer, Select ONE) An admin plans to grant all members identical access on day one. What is the governance concern?

- A. Access should follow role and need, not be uniform by default **(key)**  
  _Rationale:_ Correct: least-privilege access reduces risk; uniform access ignores role differences.
- B. Uniform access is always safest  
  _Rationale:_ Uniform access can over-grant permissions.
- C. Roles do not exist in team plans  
  _Rationale:_ Roles and access controls are part of administration.
- D. Access cannot be changed later  
  _Rationale:_ It can; the concern is the initial over-grant.

**MST-0526-Q0002** (multiple-answer, Select TWO) Which TWO belong in data governance for an enterprise rollout? (Select TWO.)

- A. Defining what data may and may not be used with Claude **(key)**  
  _Rationale:_ Correct: scoping in-bounds data is core governance.
- B. Setting retention and data-handling controls deliberately **(key)**  
  _Rationale:_ Correct: controls should be chosen to meet obligations, not left to default.
- C. Assuming defaults meet every obligation  
  _Rationale:_ Defaults may not match the organisation's requirements.
- D. Letting each user decide their own retention  
  _Rationale:_ Governance requires organisation-level control.

**MST-0526-Q0003** (single-answer, Select ONE) Why run a pilot before a full-department rollout?

- A. To gather feedback and catch issues before scaling **(key)**  
  _Rationale:_ Correct: a pilot surfaces problems while they are cheap to fix.
- B. To delay the project indefinitely  
  _Rationale:_ A pilot is a step toward rollout, not a delay tactic.
- C. Because full rollouts are impossible  
  _Rationale:_ They are possible; piloting reduces risk.
- D. To avoid training anyone  
  _Rationale:_ A pilot does not remove the need for enablement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
