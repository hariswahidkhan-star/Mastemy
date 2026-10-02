# Claude Code with CLAUDE.md and Project Context

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0532` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-CONTEXT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code with CLAUDE.md and Project Context (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how CLAUDE.md and project context shape Claude Code's behaviour in a repository
2. Write a CLAUDE.md that encodes build, test and convention rules Claude Code should follow
3. Scope context to the right directory so instructions apply where they are relevant
4. Keep project context accurate as the codebase and conventions change
5. Judge when context is missing and causing avoidable mistakes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 How project context steers Claude Code (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Identify three repeated corrections that belong in CLAUDE.md instead; (2) Trace how a CLAUDE.md instruction changes a subsequent Claude Code action
- Common misconception addressed: Assuming Claude Code already knows a repo's conventions without being told
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What CLAUDE.md is and how Claude Code reads it | 72 | 5 |
| M01L02 | Context as a substitute for repeating yourself | 72 | 5 |

### M02 Writing an effective CLAUDE.md (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn a style guide into concrete CLAUDE.md rules; (2) Encode the exact build and test commands for the repo
- Common misconception addressed: Writing vague aspirations instead of concrete, testable rules Claude Code can follow
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Encoding build, test and lint commands | 96 | 5 |
| M02L02 | Encoding conventions, do-nots and project facts | 96 | 5 |

### M03 Scoping context across a repository (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Decide which rules belong at the root versus a package directory; (2) Add a scoped CLAUDE.md for a subproject with different conventions
- Common misconception addressed: Putting every rule in one root file so package-specific rules leak everywhere
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Root versus directory-scoped context | 80 | 5 |
| M03L02 | Layering context in a monorepo | 80 | 5 |
| M03L03 | Avoiding contradictory instructions across scopes | 80 | 5 |

### M04 Keeping context accurate over time (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot a stale instruction after a build tool change and fix it; (2) Add a lightweight review step so context stays current
- Common misconception addressed: Letting CLAUDE.md drift until its instructions are wrong and actively misleading
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Detecting and fixing stale context | 96 | 5 |
| M04L02 | A maintenance habit for project context | 96 | 5 |

### M05 Diagnosing missing or harmful context (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Diagnose a repeated error as a missing-context problem; (2) Decide whether a failure needs a context rule or a code fix
- Common misconception addressed: Blaming the model for a mistake that a one-line context rule would have prevented
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Recognising a missing-context failure | 96 | 5 |
| M05L02 | When to add context versus fix the code | 96 | 5 |

## Integrative case

A developer joins a monorepo with inconsistent conventions, writes a root CLAUDE.md plus a package-scoped one for the web app, and confirms Claude Code now runs the right test command and follows the import style without being told each time.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0532-final-protected | 30 | 40 | yes |
| MST-0532-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How project context steers Claude Code | 5 |
| Writing an effective CLAUDE.md | 6 |
| Scoping context across a repository | 7 |
| Keeping context accurate over time | 6 |
| Diagnosing missing or harmful context | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0532-Q0001** (single-answer, Select ONE) Claude Code keeps running the wrong test command in a repo. What is the most durable fix?

- A. Record the correct test command in CLAUDE.md so it is applied every session **(key)**
  _Rationale:_ Correct: encoding the command in project context stops the repeated correction.
- B. Re-type the correct command every time it is wrong
  _Rationale:_ Repeating yourself does not persist the rule across sessions.
- C. Delete the test suite so there is nothing to run
  _Rationale:_ Removing tests is harmful and does not address the instruction.
- D. Rename the repository
  _Rationale:_ The repo name does not determine the test command.

**MST-0532-Q0002** (multiple-answer, Select TWO) Which TWO belong in a well-written CLAUDE.md? (Select TWO.)

- A. The exact commands to build, test and lint the project **(key)**
  _Rationale:_ Correct: concrete commands let Claude Code act correctly without guessing.
- B. Concrete conventions and do-nots specific to the repo **(key)**
  _Rationale:_ Correct: testable conventions reduce repeated corrections.
- C. A copy of the entire source tree
  _Rationale:_ The source tree is already available; duplicating it is noise.
- D. Secrets such as API keys and passwords
  _Rationale:_ Secrets must never be placed in project context files.

**MST-0532-Q0003** (single-answer, Select ONE) A monorepo's web package uses a different import style from the rest. Where should that rule live?

- A. In a CLAUDE.md scoped to the web package directory **(key)**
  _Rationale:_ Correct: directory-scoped context applies the rule only where it is relevant.
- B. In the root CLAUDE.md so it applies everywhere
  _Rationale:_ Root scope would wrongly impose the web style on other packages.
- C. In a code comment in one file
  _Rationale:_ A single comment does not reliably steer Claude Code across the package.
- D. Nowhere; the style should be abandoned
  _Rationale:_ The package has a valid reason for its style; scope the rule instead.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
