# Claude Code Hooks and Controlled Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0540` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-HOOKS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Hooks and Controlled Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how Claude Code hooks run project-defined commands around actions
2. Configure hooks to enforce formatting, tests or policy automatically
3. Keep hooks fast, deterministic and safe to run repeatedly
4. Debug a failing or misbehaving hook
5. Decide what belongs in a hook versus a manual step or CI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 What hooks are and how they run (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Map which project events should trigger a hook; (2) Trace what a hook receives and returns
- Common misconception addressed: Expecting hooks to run arbitrarily or non-deterministically rather than on defined events
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Hook events and the automation they control | 72 | 5 |
| M01L02 | Inputs, outputs and exit behaviour of a hook | 72 | 5 |

### M02 Enforcing policy with hooks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add a hook that blocks an action when a check fails; (2) Enforce formatting automatically on edit
- Common misconception addressed: Using a hook as a reminder note instead of an enforced, blocking check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Blocking versus advisory hooks | 96 | 5 |
| M02L02 | Enforcing format, tests and policy | 96 | 5 |

### M03 Keeping hooks fast and safe (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Profile and speed up a slow hook; (2) Make a hook safe to run repeatedly
- Common misconception addressed: Writing a slow or non-idempotent hook that disrupts normal work
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Performance and determinism in hooks | 80 | 5 |
| M03L02 | Idempotent, side-effect-safe hooks | 80 | 5 |
| M03L03 | Scoping a hook to only what changed | 80 | 5 |

### M04 Debugging hooks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Diagnose why a hook blocks every action; (2) Fix a hook that fails silently
- Common misconception addressed: Assuming Claude Code is broken when a misconfigured hook is the cause
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Diagnosing a blocking or failing hook | 96 | 5 |
| M04L02 | Reading hook output and exit codes | 96 | 5 |

### M05 Hook versus manual step versus CI (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide which checks belong in a hook and which in CI; (2) Move a slow check out of a hook into CI
- Common misconception addressed: Putting slow, full-suite checks in a hook instead of CI
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Choosing hook, manual step or CI | 96 | 5 |
| M05L02 | Balancing fast local checks with thorough CI | 96 | 5 |

## Integrative case

A team adds a pre-edit hook that runs the formatter and a post-edit hook that runs the affected tests, keeps both fast and deterministic, and debugs a case where a slow hook was blocking every action.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0540-final-protected | 30 | 40 | yes |
| MST-0540-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What hooks are and how they run | 5 |
| Enforcing policy with hooks | 6 |
| Keeping hooks fast and safe | 7 |
| Debugging hooks | 6 |
| Hook versus manual step versus CI | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0540-Q0001** (single-answer, Select ONE) A hook that must stop a bad edit from completing should be:

- A. A blocking hook whose non-zero exit prevents the action **(key)**
  _Rationale:_ Correct: enforcement requires a blocking hook, not an advisory note.
- B. An advisory message the user may ignore
  _Rationale:_ An advisory hook cannot enforce the policy.
- C. A comment in CLAUDE.md
  _Rationale:_ A comment does not actively block an action.
- D. A manual checklist step
  _Rationale:_ A manual step is not automatic enforcement.

**MST-0540-Q0002** (multiple-answer, Select TWO) Which TWO properties should a good Claude Code hook have? (Select TWO.)

- A. Fast enough not to disrupt normal work **(key)**
  _Rationale:_ Correct: slow hooks block every action and frustrate use.
- B. Deterministic and safe to run repeatedly **(key)**
  _Rationale:_ Correct: idempotent, deterministic hooks are reliable.
- C. Runs the entire slow test suite on every keystroke
  _Rationale:_ Heavy work on every event belongs in CI, not a hook.
- D. Produces different results each run
  _Rationale:_ Non-determinism makes a hook untrustworthy.

**MST-0540-Q0003** (single-answer, Select ONE) Every Claude Code action suddenly hangs after a hook was added. The first thing to check is:

- A. Whether the hook is slow or waiting, blocking each action **(key)**
  _Rationale:_ Correct: a slow or hanging hook blocks the actions it wraps.
- B. Whether the model weights changed
  _Rationale:_ The timing points to the newly added hook, not the model.
- C. Whether the repository needs renaming
  _Rationale:_ The repo name is unrelated to a hanging hook.
- D. Whether the network is down
  _Rationale:_ The symptom coincides with the hook, not a network change.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
