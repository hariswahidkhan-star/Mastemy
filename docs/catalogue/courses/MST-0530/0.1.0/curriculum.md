# Claude Skill Evaluation, Versioning, and Distribution

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0530` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-SKILLS-LIFECYCLE |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Skill Evaluation, Versioning, and Distribution (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the lifecycle of a Claude Skill from draft to distributed, maintained asset
2. Evaluate a Skill with repeatable test cases and clear pass criteria
3. Version a Skill and communicate breaking changes to its users
4. Distribute a Skill to a team and control who can run or edit it
5. Decide when a Skill should be deprecated or merged rather than extended

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 The Skill lifecycle and ownership (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Map a Skill through draft, review, published and deprecated stages; (2) Assign an owner and a review cadence for a shared Skill
- Common misconception addressed: Treating a Skill as finished once it works once, with no owner, tests or version
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Stages of a Skill from draft to deprecation | 72 | 5 |
| M01L02 | Ownership, review cadence and a Skill's README | 72 | 5 |

### M02 Evaluating a Skill with test cases (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write five test cases with expected outputs for a Skill; (2) Define pass criteria that separate a regression from acceptable variation
- Common misconception addressed: Judging a Skill by one happy-path run instead of a repeatable evaluation set
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building an evaluation set with expected outputs | 96 | 5 |
| M02L02 | Pass criteria and detecting regressions | 96 | 5 |

### M03 Versioning and change communication (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Decide whether a change is a patch, minor or breaking version; (2) Write migration notes for a breaking change to a shared Skill
- Common misconception addressed: Changing a Skill's output format silently and breaking every downstream user
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Semantic versioning applied to Skills | 80 | 5 |
| M03L02 | Communicating breaking changes and migration paths | 80 | 5 |
| M03L03 | Keeping a changelog users actually read | 80 | 5 |

### M04 Distribution and access control (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose run-only versus edit access for different audiences; (2) Publish a Skill to a team workspace with scoped permissions
- Common misconception addressed: Distributing a Skill with broader run and edit rights than the task needs
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Distributing a Skill to a team or workspace | 96 | 5 |
| M04L02 | Controlling who can run versus edit a Skill | 96 | 5 |

### M05 Deprecation, merging and maintenance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide between extending, splitting and deprecating an overloaded Skill; (2) Plan a deprecation with a cutover date and replacement
- Common misconception addressed: Extending one Skill endlessly instead of splitting, merging or retiring it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | When to deprecate, split or merge Skills | 96 | 5 |
| M05L02 | Planning a safe deprecation and cutover | 96 | 5 |

## Integrative case

A platform team owns a shared 'release-notes' Skill used across five product squads: they build an evaluation set, cut a new version that changes the output format, publish migration notes, and retire the old version on a scheduled date.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0530-final-protected | 30 | 40 | yes |
| MST-0530-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The Skill lifecycle and ownership | 5 |
| Evaluating a Skill with test cases | 6 |
| Versioning and change communication | 7 |
| Distribution and access control | 6 |
| Deprecation, merging and maintenance | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0530-Q0001** (single-answer, Select ONE) A shared Skill changes its output from a Markdown table to JSON, breaking three downstream automations. How should this be versioned?

- A. As a breaking (major) version, with migration notes and a deprecation window for the old version **(key)**
  _Rationale:_ Correct: an output-contract change that breaks consumers is a breaking version needing migration support.
- B. As a patch, because the logic is unchanged
  _Rationale:_ The output contract changed and consumers broke; that is not a patch.
- C. With no version change, since users will adapt
  _Rationale:_ Silent breaking changes are exactly the failure to avoid.
- D. By deleting the old Skill immediately
  _Rationale:_ Immediate deletion gives consumers no migration window.

**MST-0530-Q0002** (multiple-answer, Select TWO) Which TWO belong in a Skill's evaluation set so regressions are caught? (Select TWO.)

- A. Representative inputs paired with expected outputs **(key)**
  _Rationale:_ Correct: expected outputs let you detect when behaviour drifts.
- B. Clear pass criteria that distinguish regressions from acceptable variation **(key)**
  _Rationale:_ Correct: without criteria you cannot decide whether a diff is a failure.
- C. A note that the author ran it once and it looked fine
  _Rationale:_ A single happy-path run is not a repeatable evaluation.
- D. The total number of times the Skill has been run
  _Rationale:_ Run count does not evaluate correctness.

**MST-0530-Q0003** (single-answer, Select ONE) A reporting Skill is used by many squads but only the platform team should change its logic. What access model fits?

- A. Run access for all squads, edit access limited to the owning team **(key)**
  _Rationale:_ Correct: least-privilege separates safe use from controlled change.
- B. Edit access for everyone so fixes are fast
  _Rationale:_ Broad edit access invites uncontrolled, breaking changes.
- C. No access for squads so nothing breaks
  _Rationale:_ Blocking the intended users defeats the Skill's purpose.
- D. Run access only for the owning team
  _Rationale:_ The squads are the intended users and need run access.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
