# Cursor for .NET and C# Backend Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0556` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation (cursor.com/docs); the egress proxy blocks the vendor site this session, so no official page was read. Cursor feature names and settings are DESIGN ASSUMPTION pending an official check. .NET/C# language facts are stable and widely documented. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CURSOR-DOTNET |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor for .NET and C# Backend Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Cursor to scaffold and edit C# and .NET backend code
2. Provide project context so suggestions fit .NET conventions
3. Review AI-generated code for correctness and security before accepting
4. Use the compiler and tests to validate AI changes
5. Maintain human accountability for merged backend code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules


### M01 Cursor for .NET backends (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Scaffold a minimal API endpoint with Cursor and review it; (2) Attach project files so suggestions follow existing conventions
- Common misconception addressed: Expecting idiomatic .NET output with no project context
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Editor AI features for C# | 96 | 6 |
| M01L02 | Context for .NET projects | 96 | 6 |
### M02 Editing and refactoring (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Refactor a service and keep the build and tests green; (2) Introduce dependency injection for a class with AI help
- Common misconception addressed: Accepting a solution-wide edit without rebuilding and testing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI edits across a solution | 96 | 6 |
| M02L02 | Refactoring guarded by the compiler and tests | 96 | 6 |
### M03 Correctness and security (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Catch a SQL-injection-prone suggestion and fix it; (2) Validate input handling in generated code
- Common misconception addressed: Trusting AI-generated data-access code without a security review
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reviewing for logic errors | 96 | 6 |
| M03L02 | Spotting insecure suggestions | 96 | 6 |
### M04 Validating with tooling (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Resolve analyzer warnings in a generated class; (2) Add a unit test that pins the intended behaviour
- Common misconception addressed: Suppressing analyzer warnings instead of addressing them
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Compiler warnings and analyzers | 96 | 6 |
| M04L02 | Unit tests as a guard | 96 | 6 |
### M05 Accountability (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Run a review checklist before merging generated backend code; (2) Note AI assistance in the pull request
- Common misconception addressed: Merging generated backend code no human has read
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human sign-off | 96 | 6 |
| M05L02 | Recording AI assistance | 96 | 6 |

## Integrative case

A backend developer uses Cursor on a .NET service: scaffold an endpoint with context, refactor to add dependency injection under compiler and test guards, review generated data-access code for SQL-injection risk, resolve analyzer warnings, and take human accountability before merge. Cursor-specific claims are flagged for official verification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0556-final-protected | 30 | 40 | yes |
| MST-0556-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cursor for .NET backends | 6 |
| Editing and refactoring | 6 |
| Correctness and security | 6 |
| Validating with tooling | 6 |
| Accountability | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0556-Q0001** (single-answer, Select ONE) Cursor suggests data-access code that concatenates user input straight into a SQL string. What is the main risk?

- A. SQL injection, because untrusted input is placed directly into the query **(key)**  
  _Rationale:_ Correct: concatenating user input enables SQL injection; use parameterised queries.
- B. The code will not compile  
  _Rationale:_ It may compile fine; the issue is security, not compilation.
- C. SQL cannot be used from C#  
  _Rationale:_ C# routinely queries SQL; the issue is how input is handled.
- D. Parameterised queries are slower, so this is better  
  _Rationale:_ Security and correctness outweigh a negligible perf concern, and the premise is wrong.
**MST-0556-Q0002** (multiple-answer, Select TWO) Which TWO tools help validate an AI change in a .NET project? (Select TWO.)

- A. The compiler and code analyzers **(key)**  
  _Rationale:_ Correct: build errors and analyzer warnings catch many issues.
- B. Unit tests pinning intended behaviour **(key)**  
  _Rationale:_ Correct: tests guard against regressions.
- C. Suppressing all analyzer warnings  
  _Rationale:_ Suppression hides problems rather than validating.
- D. Deleting the tests to speed up the build  
  _Rationale:_ Removing tests removes a key safeguard.
**MST-0556-Q0003** (single-answer, Select ONE) Why attach existing project files as context before asking Cursor to add a feature?

- A. So suggestions follow the project's conventions and existing patterns **(key)**  
  _Rationale:_ Correct: relevant context yields output that fits the codebase.
- B. Because Cursor cannot generate C# otherwise  
  _Rationale:_ It can; context simply improves fit.
- C. To slow the model down deliberately  
  _Rationale:_ That is not a reason to add context.
- D. Context has no effect on output quality  
  _Rationale:_ Context materially affects how well output fits.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
