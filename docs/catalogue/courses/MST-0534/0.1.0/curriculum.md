# Claude Code for .NET and C# Application Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0534` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-DOTNET |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code for .NET and C# Application Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Claude Code effectively in a .NET and C# solution structure
2. Drive build, test and run cycles for .NET projects through Claude Code
3. Apply C# conventions and nullable, async and LINQ idioms in generated code
4. Debug and fix failing .NET tests with Claude Code
5. Verify generated C# changes against the solution's build and analyzers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Working in a .NET solution with Claude Code (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Navigate a solution's projects and dependencies with Claude Code; (2) Locate where a new class belongs in a layered solution
- Common misconception addressed: Treating a multi-project solution as a single flat folder of files
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Solution, project and dependency structure | 72 | 5 |
| M01L02 | Orienting Claude Code in a layered .NET codebase | 72 | 5 |

### M02 Build, test and run cycles (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Run dotnet build and interpret the first error correctly; (2) Run targeted dotnet test for the affected project only
- Common misconception addressed: Assuming code compiles because it looks right, without running dotnet build
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Driving dotnet build and reading errors | 96 | 5 |
| M02L02 | Running and scoping dotnet test | 96 | 5 |

### M03 C# idioms in generated code (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Fix nullable warnings in a generated method; (2) Rewrite a blocking call as proper async/await
- Common misconception addressed: Accepting generated C# that ignores nullable reference types and async conventions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Nullable reference types and null-safety | 80 | 5 |
| M03L02 | async/await and avoiding sync-over-async | 80 | 5 |
| M03L03 | LINQ and idiomatic collection handling | 80 | 5 |

### M04 Debugging and fixing failing tests (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Localise a failing xUnit test to its root cause; (2) Fix the defect and confirm the test now passes for the right reason
- Common misconception addressed: Changing the test to pass instead of fixing the defect it exposed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading a .NET test failure and stack trace | 96 | 5 |
| M04L02 | Fixing the defect, not the test | 96 | 5 |

### M05 Verifying C# changes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Confirm a change builds with analyzers and no new warnings; (2) Review a C# diff for correctness and convention fit
- Common misconception addressed: Trusting a green local run without checking analyzers and warnings
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Analyzers, warnings and build gates | 96 | 5 |
| M05L02 | Reviewing a C# change before it ships | 96 | 5 |

## Integrative case

A backend developer adds a new endpoint to an ASP.NET Core service with a service-layer method and unit tests, driving dotnet build and dotnet test through Claude Code and confirming analyzers and nullable warnings stay clean.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0534-final-protected | 30 | 40 | yes |
| MST-0534-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Working in a .NET solution with Claude Code | 5 |
| Build, test and run cycles | 6 |
| C# idioms in generated code | 7 |
| Debugging and fixing failing tests | 6 |
| Verifying C# changes | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0534-Q0001** (single-answer, Select ONE) A generated C# method triggers a nullable reference warning. The correct response is to:

- A. Address the null-safety issue the warning identifies, not suppress it blindly **(key)**
  _Rationale:_ Correct: nullable warnings flag real null-handling gaps that should be resolved.
- B. Disable nullable reference types for the whole project
  _Rationale:_ Disabling the feature hides genuine null-safety issues.
- C. Add a pragma to suppress it without understanding it
  _Rationale:_ Blind suppression leaves the underlying risk in place.
- D. Ignore it because the code compiles
  _Rationale:_ A warning can precede a real NullReferenceException at runtime.

**MST-0534-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate ways to verify a .NET change before shipping it? (Select TWO.)

- A. Run dotnet build and confirm no new analyzer warnings **(key)**
  _Rationale:_ Correct: a clean analyzed build is a baseline quality gate.
- B. Run the affected project's tests with dotnet test **(key)**
  _Rationale:_ Correct: targeted tests confirm the change behaves as intended.
- C. Confirm the file count in the project increased
  _Rationale:_ File count is not a correctness signal.
- D. Ask Claude Code to assert that it is confident
  _Rationale:_ A model's confidence is not verification.

**MST-0534-Q0003** (single-answer, Select ONE) An xUnit test fails after a change. Claude Code suggests editing the test's expected value to match the new output. This is wrong because:

- A. It may hide the defect the test correctly detected rather than fixing the cause **(key)**
  _Rationale:_ Correct: changing the assertion to pass can mask a real regression.
- B. xUnit tests can never be edited
  _Rationale:_ Tests can be edited when the requirement legitimately changed.
- C. Tests always take priority over code
  _Rationale:_ Neither blindly wins; the point is to fix the true cause.
- D. The test file is read-only
  _Rationale:_ Writability is not the issue; correctness of the fix is.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
