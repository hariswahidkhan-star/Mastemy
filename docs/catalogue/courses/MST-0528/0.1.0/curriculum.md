# Claude Skills: Building Reusable Professional Procedures

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0528` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-SKILLS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Skills: Building Reusable Professional Procedures (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify repeatable tasks worth encoding as reusable skills
2. Write reusable skill instructions that generalise across cases
3. Test a skill across realistic cases and fix failures
4. Version a skill and keep a record of changes and quality
5. Share and govern skills so teams get consistent, safe results

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 When to build a skill (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Identify a repeatable task worth encoding as a skill; (2) Decide when a one-off prompt is enough instead
- Common misconception addressed: Building a skill for a task that is only ever done once
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a reusable skill is | 72 | 5 |
| M01L02 | Repeatable task versus one-off prompt | 72 | 5 |

### M02 Writing reusable instructions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write skill instructions that work beyond one example; (2) Generalise a working prompt into a reusable procedure
- Common misconception addressed: Hard-coding one example's details so the skill breaks on the next case
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing general, reusable instructions | 96 | 5 |
| M02L02 | Parameterising a procedure | 96 | 5 |

### M03 Testing a skill (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Test a skill against several realistic inputs; (2) Find and fix a case where the skill produces a wrong result
- Common misconception addressed: Shipping a skill after testing it on a single happy-path case
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Designing test cases for a skill | 80 | 5 |
| M03L02 | Finding failure cases | 80 | 5 |
| M03L03 | Fixing and re-testing | 80 | 5 |

### M04 Versioning and quality (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Version a skill and record what changed; (2) Decide when a change needs a new version
- Common misconception addressed: Editing a shared skill in place with no record of what changed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Versioning a skill | 96 | 5 |
| M04L02 | Change records and quality gates | 96 | 5 |

### M05 Sharing and governance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Share a skill so a team gets consistent results; (2) Review a shared skill for safety before distribution
- Common misconception addressed: Distributing a skill without reviewing what it instructs Claude to do
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Distributing a skill to a team | 96 | 5 |
| M05L02 | Reviewing a skill before sharing | 96 | 5 |

## Integrative case

A team lead builds a reusable Claude Skill that encodes the team's report-writing procedure: identify a repeatable task, write clear reusable instructions, test the skill on real cases, and version and share it so the whole team gets consistent results.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0528-final-protected | 30 | 40 | yes |
| MST-0528-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| When to build a skill | 5 |
| Writing reusable instructions | 6 |
| Testing a skill | 7 |
| Versioning and quality | 6 |
| Sharing and governance | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0528-Q0001** (single-answer, Select ONE) A skill works on the one example used to write it but fails on the next real case. What most likely went wrong?

- A. The instructions hard-coded that example's details instead of generalising **(key)**  
  _Rationale:_ Correct: reusable skills must generalise, not encode one case.
- B. The skill was too short  
  _Rationale:_ Length is not the core issue.
- C. Claude cannot follow instructions  
  _Rationale:_ The issue is the instruction design, not capability.
- D. Skills can only run once  
  _Rationale:_ Skills are reusable by design.

**MST-0528-Q0002** (multiple-answer, Select TWO) Which TWO belong in responsible skill testing? (Select TWO.)

- A. Testing against several realistic inputs **(key)**  
  _Rationale:_ Correct: multiple cases reveal failures a single test hides.
- B. Finding and fixing failure cases before shipping **(key)**  
  _Rationale:_ Correct: failures should be fixed, not ignored.
- C. Shipping after one happy-path test  
  _Rationale:_ A single success does not establish reliability.
- D. Never re-testing after a fix  
  _Rationale:_ Fixes must be re-tested to confirm they work.

**MST-0528-Q0003** (single-answer, Select ONE) Why review a skill before sharing it with a team?

- A. To check what it instructs Claude to do and that it is safe **(key)**  
  _Rationale:_ Correct: a shared skill runs for everyone, so its instructions must be reviewed.
- B. To make it longer  
  _Rationale:_ Length is not the purpose of review.
- C. To hide it from the team  
  _Rationale:_ The point is to share it safely, not hide it.
- D. Because unreviewed skills run faster  
  _Rationale:_ Review is about safety and quality, not speed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
