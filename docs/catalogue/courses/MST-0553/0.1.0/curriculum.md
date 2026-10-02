# Cursor Agent Planning and Feature Implementation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0553` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Intended to reflect Cursor's official agent documentation; the vendor site was blocked by the egress proxy this session, so no official page was read. Agent mode names and behaviours are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CURSOR-AGENT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Agent Planning and Feature Implementation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Turn a feature request into a plan the agent can execute
2. Break a feature into reviewable increments
3. Guide the agent through implementation with checkpoints
4. Review, test and integrate agent-produced changes
5. Recover when the agent's plan drifts from the goal

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate shipping a real feature; implementation is taught through instructor-built project walkthroughs.

## Modules

### M01 From request to plan (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Convert a feature ticket into an agent plan with acceptance criteria; (2) Identify unknowns to resolve before coding starts
- Common misconception addressed: Letting the agent start coding before the goal is clear
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reading a request and stating the goal | 72 | 5 |
| M01L02 | Writing a plan with acceptance criteria | 72 | 5 |

### M02 Planning in increments (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Split a feature into three reviewable steps; (2) Order steps so each one is testable
- Common misconception addressed: Attempting the whole feature in one giant change
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Breaking a feature into increments | 96 | 5 |
| M02L02 | Sequencing for reviewability | 96 | 5 |

### M03 Guided implementation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Run an increment with a checkpoint review; (2) Course-correct the agent mid-task
- Common misconception addressed: Walking away while the agent makes sweeping changes unattended
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Executing an increment with the agent | 80 | 5 |
| M03L02 | Checkpoints and mid-task correction | 80 | 5 |
| M03L03 | Keeping changes within the plan | 80 | 5 |

### M04 Review, test, integrate (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a diff against the acceptance criteria; (2) Integrate a change and confirm existing tests pass
- Common misconception addressed: Merging because the feature works, without running the full test suite
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reviewing against acceptance criteria | 96 | 5 |
| M04L02 | Testing and integrating safely | 96 | 5 |

### M05 Recovery and drift (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Detect that the agent drifted from the plan; (2) Roll back one bad increment cleanly
- Common misconception addressed: Pushing forward on a drifting plan instead of rolling back
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Spotting plan drift | 96 | 5 |
| M05L02 | Rolling back and resuming cleanly | 96 | 5 |

## Integrative case

A developer ships a small feature with Cursor's agent: write a plan with acceptance criteria, implement it in three reviewable increments, run tests at each checkpoint, and roll back the one increment that broke an existing test before merging.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0553-final-protected | 30 | 40 | yes |
| MST-0553-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From request to plan | 5 |
| Planning in increments | 6 |
| Guided implementation | 7 |
| Review, test, integrate | 6 |
| Recovery and drift | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0553-Q0001** (single-answer, Select ONE) Before letting the agent implement a feature, what single artefact most reduces the risk of building the wrong thing?

- A. A plan stating the goal and acceptance criteria **(key)**  
  _Rationale:_ Correct: explicit acceptance criteria define 'done' and guide the agent.
- B. A longer prompt with more adjectives  
  _Rationale:_ Verbosity does not define correctness.
- C. A larger context window  
  _Rationale:_ More context does not substitute for a clear goal.
- D. Disabling the test suite  
  _Rationale:_ Removing checks increases risk.

**MST-0553-Q0002** (multiple-answer, Select TWO) Which TWO practices keep agent-driven feature work reviewable? (Select TWO.)

- A. Splitting the feature into small, testable increments **(key)**  
  _Rationale:_ Correct: small increments are easier to review and verify.
- B. Running tests at each checkpoint **(key)**  
  _Rationale:_ Correct: per-increment testing catches regressions early.
- C. Making one sweeping change at the end  
  _Rationale:_ Large opaque changes are hard to review.
- D. Skipping review when the feature appears to work  
  _Rationale:_ Appearance of working is not verification.

**MST-0553-Q0003** (single-answer, Select ONE) Mid-task, the agent starts refactoring unrelated modules not in the plan. The best response is to:

- A. Stop, roll back the drift, and resume from the last good checkpoint **(key)**  
  _Rationale:_ Correct: halting drift and resuming from a known-good point protects the work.
- B. Let it continue since more refactoring is good  
  _Rationale:_ Unplanned sweeping changes increase risk and review burden.
- C. Accept everything to save time  
  _Rationale:_ Accepting unreviewed drift defeats the plan.
- D. Delete the branch  
  _Rationale:_ A rollback to checkpoint is sufficient and less destructive.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
