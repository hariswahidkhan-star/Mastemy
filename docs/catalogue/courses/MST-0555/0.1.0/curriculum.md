# Cursor for React and TypeScript Frontend Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0555` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation (cursor.com/docs); the egress proxy blocks the vendor site this session, so no official page was read. Cursor feature names, keybindings and settings are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CURSOR-REACT-TS |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor for React and TypeScript Frontend Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Cursor's AI features to scaffold and edit React and TypeScript code
2. Provide effective context (files, selections, rules) for frontend tasks
3. Review and correct AI-generated components rather than accepting blindly
4. Apply TypeScript type safety when working with AI suggestions
5. Keep the human accountable for merged frontend code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules


### M01 Cursor for frontend work (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Scaffold a typed React component with Cursor and review it; (2) Attach the right files so a change respects existing patterns
- Common misconception addressed: Expecting good output without giving the model the relevant context
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Editor AI features for React/TS | 96 | 6 |
| M01L02 | Giving the model the right context | 96 | 6 |
### M02 Editing and refactoring (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Refactor a component and keep tests green; (2) Apply a multi-file rename safely
- Common misconception addressed: Accepting a multi-file edit without running the tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted edits across files | 96 | 6 |
| M02L02 | Refactoring with tests as a guard | 96 | 6 |
### M03 Type safety (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Reject an AI change that weakens a type and fix it; (2) Use the type checker to validate a generated API client
- Common misconception addressed: Silencing a type error with 'any' instead of fixing it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Catching unsafe AI suggestions with types | 96 | 6 |
| M03L02 | Fixing type errors the model introduces | 96 | 6 |
### M04 Reviewing generated UI (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Review a generated form for accessibility issues; (2) Confirm a component matches the agreed design
- Common misconception addressed: Shipping generated UI without checking accessibility
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Checking behaviour and accessibility | 96 | 6 |
| M04L02 | Verifying against the design | 96 | 6 |
### M05 Accountability (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Run a review checklist before merging AI-written code; (2) Note AI assistance in the pull request
- Common misconception addressed: Merging AI-written code no human has read
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human sign-off on merged code | 96 | 6 |
| M05L02 | Recording what was AI-assisted | 96 | 6 |

## Integrative case

A frontend developer uses Cursor to build a typed React feature: scaffold components with proper context, refactor with tests as a guard, enforce TypeScript type safety against weak suggestions, review the generated UI for accessibility, and take human accountability before merging. Cursor-specific feature claims are flagged for official verification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0555-final-protected | 30 | 40 | yes |
| MST-0555-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cursor for frontend work | 6 |
| Editing and refactoring | 6 |
| Type safety | 6 |
| Reviewing generated UI | 6 |
| Accountability | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0555-Q0001** (single-answer, Select ONE) An AI suggestion fixes a type error by changing a prop type to 'any'. Why is accepting this risky?

- A. 'any' disables type checking for that value, hiding real errors **(key)**  
  _Rationale:_ Correct: using 'any' removes the safety the type system provides.
- B. 'any' is not valid TypeScript  
  _Rationale:_ 'any' is valid; the problem is that it removes checking.
- C. Changing a prop type is impossible  
  _Rationale:_ It is possible; the concern is losing type safety.
- D. Type errors never matter in React  
  _Rationale:_ Type errors can cause real runtime defects.
**MST-0555-Q0002** (multiple-answer, Select TWO) Which TWO practices keep AI-assisted frontend work trustworthy? (Select TWO.)

- A. Run the tests before accepting a multi-file AI edit **(key)**  
  _Rationale:_ Correct: tests guard against regressions the edit introduces.
- B. Give the model the relevant files and project patterns as context **(key)**  
  _Rationale:_ Correct: good context yields output that fits the codebase.
- C. Merge generated code without any human reading it  
  _Rationale:_ A human must remain accountable for merged code.
- D. Silence type errors to move faster  
  _Rationale:_ Silencing errors hides defects.
**MST-0555-Q0003** (single-answer, Select ONE) Who is accountable for a defect in AI-generated code that was merged?

- A. The human who reviewed and merged it **(key)**  
  _Rationale:_ Correct: accountability stays with the person who approves and merges the code.
- B. The AI tool  
  _Rationale:_ The tool assists; it does not take responsibility for merged code.
- C. No one, because AI wrote it  
  _Rationale:_ Human accountability does not disappear when AI assists.
- D. The end user who hit the bug  
  _Rationale:_ Users are not accountable for the code that ships.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
