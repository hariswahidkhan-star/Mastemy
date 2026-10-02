# Claude Code Planning and Multi-File Feature Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0533` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-PLANNING |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Planning and Multi-File Feature Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan a multi-file feature with Claude Code before changing any code
2. Break a feature into ordered, verifiable steps Claude Code can execute
3. Keep changes coherent across many files and avoid partial, broken states
4. Review a multi-file change for correctness and scope creep
5. Decide when to pause planning and start implementing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Planning before coding (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Turn a vague feature request into a concrete, scoped plan; (2) Identify the files and interfaces a feature will touch up front
- Common misconception addressed: Jumping straight to edits on a feature that spans many files and interfaces
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why multi-file features need a plan first | 72 | 5 |
| M01L02 | From a request to a scoped implementation plan | 72 | 5 |

### M02 Decomposing a feature into ordered steps (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Order steps so each leaves the code in a working state; (2) Define a verification check for each step
- Common misconception addressed: Treating a large feature as one giant edit instead of ordered, verifiable steps
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Slicing a feature into verifiable steps | 96 | 5 |
| M02L02 | Ordering steps to avoid broken intermediate states | 96 | 5 |

### M03 Keeping multi-file changes coherent (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Update an interface and all its callers in one coherent change; (2) Detect a half-applied change before it ships
- Common misconception addressed: Changing one file's interface and forgetting the callers that depend on it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Coordinating changes across files and interfaces | 80 | 5 |
| M03L02 | Avoiding partial, broken states | 80 | 5 |
| M03L03 | Confirming the whole slice builds and tests pass | 80 | 5 |

### M04 Reviewing the change (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a multi-file diff for correctness and unintended scope; (2) Flag scope creep introduced during implementation
- Common misconception addressed: Approving a change by size or confidence rather than reading what it actually does
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reviewing a multi-file diff systematically | 96 | 5 |
| M04L02 | Catching scope creep and unrelated edits | 96 | 5 |

### M05 Knowing when to start implementing (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide when a plan is detailed enough to begin; (2) Right-size planning effort to the risk of the change
- Common misconception addressed: Over-planning a small change, or under-planning a large one
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Matching planning depth to change risk | 96 | 5 |
| M05L02 | Transitioning from plan to implementation | 96 | 5 |

## Integrative case

An engineer adds a 'saved filters' feature touching the API, data layer, and two UI components: they plan the slice with Claude Code, implement it in reviewable steps, and verify nothing else regressed before opening a PR.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0533-final-protected | 30 | 40 | yes |
| MST-0533-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Planning before coding | 5 |
| Decomposing a feature into ordered steps | 6 |
| Keeping multi-file changes coherent | 7 |
| Reviewing the change | 6 |
| Knowing when to start implementing | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0533-Q0001** (single-answer, Select ONE) Why plan a multi-file feature with Claude Code before editing any code?

- A. A plan exposes the files and interfaces involved and the order of safe steps before mistakes are made **(key)**
  _Rationale:_ Correct: planning surfaces dependencies and ordering so changes stay coherent.
- B. Planning removes the need to run the tests
  _Rationale:_ Tests are still required; planning does not replace verification.
- C. Planning guarantees the feature is bug-free
  _Rationale:_ No planning step guarantees bug-free code.
- D. Planning lets Claude Code skip reviewing the diff
  _Rationale:_ Review is still necessary after implementation.

**MST-0533-Q0002** (multiple-answer, Select TWO) Which TWO properties should each step of a decomposed feature have? (Select TWO.)

- A. It leaves the codebase in a working, buildable state **(key)**
  _Rationale:_ Correct: working intermediate states keep the change recoverable.
- B. It has a defined way to verify it succeeded **(key)**
  _Rationale:_ Correct: a per-step check catches errors early.
- C. It touches as many files as possible at once
  _Rationale:_ Maximising blast radius per step makes failures harder to isolate.
- D. It is never reviewed until the whole feature is done
  _Rationale:_ Deferring all review increases the cost of mistakes.

**MST-0533-Q0003** (single-answer, Select ONE) During implementation Claude Code also renames unrelated variables across the repo. In review, this is:

- A. Scope creep that should be removed from this change **(key)**
  _Rationale:_ Correct: unrelated edits expand risk and should be split out.
- B. A helpful bonus to merge as-is
  _Rationale:_ Unrelated changes bundled in obscure review and raise risk.
- C. Irrelevant because the tests pass
  _Rationale:_ Passing tests do not justify unreviewed scope expansion.
- D. Required before the feature can work
  _Rationale:_ The rename is unrelated to the feature's requirements.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
