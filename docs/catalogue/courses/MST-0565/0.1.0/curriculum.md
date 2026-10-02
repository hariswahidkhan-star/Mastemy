# Cursor Cloud Agents: Environment Setup and Review Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0565` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0565 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Cloud Agents: Environment Setup and Review Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what Cursor cloud agents do and when they fit
2. Prepare a cloud agent environment with dependencies and least-privilege access
3. Launch, monitor and steer a cloud agent run
4. Apply review controls and approval gates before changes merge
5. Govern team cloud agent use with scope, cost limits and auditing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 What cloud agents do (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Pick tasks suited to a cloud agent; (2) Decide when local work is the better choice
- Common misconception addressed: Expecting a cloud agent to have local context it was never given
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How a cloud agent runs work remotely | 72 | 5 |
| M01L02 | When a cloud agent fits versus local editing | 72 | 5 |

### M02 Preparing the agent environment (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Define an environment so a run starts cleanly; (2) Provision least-privilege access for a run
- Common misconception addressed: Giving a cloud run broad credentials it does not need
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defining the environment and dependencies a run needs | 96 | 5 |
| M02L02 | Setting up secrets and access for a run | 96 | 5 |

### M03 Running and steering a cloud agent (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Launch a task and watch its progress; (2) Interrupt and re-scope a drifting run
- Common misconception addressed: Leaving a drifting run unattended until it finishes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Launching a task and monitoring progress | 80 | 5 |
| M03L02 | Steering or interrupting a run that drifts | 80 | 5 |
| M03L03 | Collecting the run's output and diffs | 80 | 5 |

### M04 Review controls before merge (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a cloud run's diff before accepting; (2) Set an approval gate before merge
- Common misconception addressed: Auto-merging cloud agent output with no review
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reviewing a cloud agent's proposed changes | 96 | 5 |
| M04L02 | Approval gates before changes reach a branch | 96 | 5 |

### M05 Governing cloud agent use (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set a cost and scope limit for team cloud runs; (2) Audit a set of cloud runs
- Common misconception addressed: Running cloud agents with no cost or scope limits
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Limiting scope, cost and access across a team | 96 | 5 |
| M05L02 | Auditing cloud runs | 96 | 5 |

## Integrative case

A team enables Cursor cloud agents for routine fixes: define a clean environment with least-privilege access, launch and monitor a task, interrupt it if it drifts, require review and an approval gate before its diff merges, and cap cost and scope across the team with an audit trail.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0565-final-protected | 30 | 40 | yes |
| MST-0565-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What cloud agents do | 5 |
| Preparing the agent environment | 6 |
| Running and steering a cloud agent | 7 |
| Review controls before merge | 6 |
| Governing cloud agent use | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0565-Q0001** (single-answer, Select ONE) Before a cloud agent's changes reach a branch, what should be in place?

- A. Human review and an approval gate **(key)**  
  _Rationale:_ Correct: review and an approval gate stop unreviewed changes from merging.
- B. Automatic merge to move fast  
  _Rationale:_ Auto-merge removes the safety of review.
- C. The largest possible credential scope  
  _Rationale:_ Broad credentials increase risk, not safety.
- D. Nothing; cloud agents are trusted by default  
  _Rationale:_ No agent output should merge untrusted.

**MST-0565-Q0002** (multiple-answer, Select TWO) Which TWO settings govern team cloud agent use responsibly? (Select TWO.)

- A. Cost and scope limits on runs **(key)**  
  _Rationale:_ Correct: limits prevent runaway cost and over-broad changes.
- B. An audit trail of what runs did **(key)**  
  _Rationale:_ Correct: auditing lets a team see and review agent actions.
- C. Unlimited budget per run for speed  
  _Rationale:_ Unlimited budget invites runaway cost.
- D. Shared admin credentials for every run  
  _Rationale:_ Shared admin access defeats least privilege and auditing.

**MST-0565-Q0003** (single-answer, Select ONE) A cloud agent run is drifting away from the task. What is the right action?

- A. Interrupt it and re-scope the task **(key)**  
  _Rationale:_ Correct: steering a drifting run back on task avoids wasted, wrong work.
- B. Let it finish and review everything later  
  _Rationale:_ An unattended drifting run wastes cost and produces wrong output.
- C. Give it more access so it can recover itself  
  _Rationale:_ More access does not fix a scoping problem.
- D. Merge whatever it produces  
  _Rationale:_ Merging drifted output ships wrong changes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
