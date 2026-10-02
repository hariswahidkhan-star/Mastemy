# Claude Code for React and TypeScript Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0535` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-REACT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code for React and TypeScript Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Claude Code productively in a React and TypeScript application
2. Apply component, hook and typing conventions to generated front-end code
3. Drive the project's build, type-check and test commands through Claude Code
4. Debug rendering, state and type errors with Claude Code
5. Verify UI changes against type-checks, tests and the running app

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Working in a React/TypeScript app with Claude Code (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Place a new component following the project's structure; (2) Identify the typing and lint rules Claude Code must honour
- Common misconception addressed: Ignoring the project's component and folder conventions when generating code
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | App structure, components and conventions | 72 | 5 |
| M01L02 | Orienting Claude Code in a TypeScript front end | 72 | 5 |

### M02 Typing and component idioms (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Replace an any with a precise prop and state type; (2) Type a custom hook's inputs and return value correctly
- Common misconception addressed: Reaching for any to silence a type error instead of modelling the real type
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Typing props, state and hooks precisely | 96 | 5 |
| M02L02 | Avoiding any and unsafe casts | 96 | 5 |

### M03 Build, type-check and test cycles (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Run the type-checker and fix the first reported error; (2) Run component tests scoped to the change
- Common misconception addressed: Assuming a component works because it renders once, without type-check or tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Driving type-check and build commands | 80 | 5 |
| M03L02 | Running and scoping component tests | 80 | 5 |
| M03L03 | Reading and triaging the first failure | 80 | 5 |

### M04 Debugging rendering and state (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Diagnose a stale value caused by a missing dependency; (2) Fix an unnecessary re-render without breaking behaviour
- Common misconception addressed: Treating a stale UI as a Claude bug rather than a state or dependency-array issue
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Debugging state and effect dependencies | 96 | 5 |
| M04L02 | Diagnosing unnecessary or missing re-renders | 96 | 5 |

### M05 Verifying UI changes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Confirm the app runs with no console errors after a change; (2) Review a front-end diff for type safety and accessibility basics
- Common misconception addressed: Shipping a change with a clean build but console errors in the running app
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Verifying against type-check, tests and the running app | 96 | 5 |
| M05L02 | Reviewing a front-end change before it ships | 96 | 5 |

## Integrative case

A front-end developer adds a filterable data table to a React/TypeScript app: a typed component, a custom hook, and tests, driving tsc and the test runner through Claude Code and confirming the app renders without console errors.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0535-final-protected | 30 | 40 | yes |
| MST-0535-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Working in a React/TypeScript app with Claude Code | 5 |
| Typing and component idioms | 6 |
| Build, type-check and test cycles | 7 |
| Debugging rendering and state | 6 |
| Verifying UI changes | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0535-Q0001** (single-answer, Select ONE) A type error appears in a generated React component. Claude Code proposes casting the value to any. The better fix is to:

- A. Model the correct type so the error reflects real data instead of being suppressed **(key)**
  _Rationale:_ Correct: precise types catch real mismatches; any discards that safety.
- B. Cast to any to move on quickly
  _Rationale:_ any removes type safety and hides real mismatches.
- C. Disable TypeScript for the file
  _Rationale:_ Disabling checks defeats the purpose of using TypeScript.
- D. Delete the component
  _Rationale:_ Deleting working UI is not a fix for a type error.

**MST-0535-Q0002** (multiple-answer, Select TWO) Which TWO checks help verify a React/TypeScript change before shipping? (Select TWO.)

- A. The type-checker passes with no new errors **(key)**
  _Rationale:_ Correct: a clean type-check is a baseline front-end gate.
- B. The running app shows no new console errors **(key)**
  _Rationale:_ Correct: runtime console errors reveal problems a build may not.
- C. The component file has more lines than before
  _Rationale:_ Line count is not a correctness signal.
- D. The CSS file was renamed
  _Rationale:_ A rename is unrelated to verifying the change.

**MST-0535-Q0003** (single-answer, Select ONE) A list shows a stale value after an update. The most likely cause to investigate first is:

- A. A missing or incorrect effect/hook dependency **(key)**
  _Rationale:_ Correct: stale values commonly stem from dependency-array mistakes.
- B. The network being offline
  _Rationale:_ Offline status would usually surface differently, not as a stale render.
- C. The TypeScript compiler version
  _Rationale:_ Compiler version rarely causes a stale rendered value.
- D. The file being too long
  _Rationale:_ File length does not cause stale state.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
