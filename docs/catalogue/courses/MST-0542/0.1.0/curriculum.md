# Claude Code CI Workflows and Pull-Request Review

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0542` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-CI |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code CI Workflows and Pull-Request Review (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Claude Code within CI workflows to assist reviews and checks
2. Scope what Claude Code may do in CI versus what a human must approve
3. Generate and review pull requests with clear, scoped descriptions
4. Interpret CI results and triage failures with Claude Code
5. Keep automated review advisory and auditable rather than silently authoritative

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Claude Code in a CI workflow (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Map where in the pipeline Claude Code adds value; (2) Identify actions CI automation must not take unattended
- Common misconception addressed: Expecting Claude Code in CI to have the same freedom as a local session
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where Claude Code fits in CI | 72 | 5 |
| M01L02 | Constraints of automation running in CI | 72 | 5 |

### M02 Scoping automated actions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Define which actions require human approval; (2) Keep merge and deploy authority with people
- Common misconception addressed: Letting automation merge or deploy without human approval
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Advisory versus authoritative automation | 96 | 5 |
| M02L02 | Keeping approval gates with humans | 96 | 5 |

### M03 Pull requests and descriptions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a PR description that states scope and risk accurately; (2) Review a generated PR for undisclosed changes
- Common misconception addressed: Writing a PR description that hides scope creep behind a vague summary
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Clear, scoped PR descriptions | 80 | 5 |
| M03L02 | Reviewing a generated pull request | 80 | 5 |
| M03L03 | Linking changes to their rationale | 80 | 5 |

### M04 Interpreting CI results (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Read a failing job log and name the root cause; (2) Distinguish a flaky failure from a real one
- Common misconception addressed: Re-running a failed job repeatedly instead of reading why it failed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading CI logs and failures | 96 | 5 |
| M04L02 | Flaky versus genuine failures | 96 | 5 |

### M05 Auditable automated review (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Make automated review output auditable; (2) Record what automation checked and what it did not
- Common misconception addressed: Trusting an automated approval with no record of what was checked
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Making automated review auditable | 96 | 5 |
| M05L02 | Boundaries of trust in automated review | 96 | 5 |

## Integrative case

A team wires Claude Code into CI to summarise each pull request and flag risky changes, keeps merge authority with humans, and triages a failing check by reading the job log rather than re-running blindly.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0542-final-protected | 30 | 40 | yes |
| MST-0542-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Claude Code in a CI workflow | 5 |
| Scoping automated actions | 6 |
| Pull requests and descriptions | 7 |
| Interpreting CI results | 6 |
| Auditable automated review | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0542-Q0001** (single-answer, Select ONE) What authority should Claude Code automation in CI retain by default?

- A. Advisory: it can summarise and flag, but humans approve merges and deploys **(key)**
  _Rationale:_ Correct: keeping merge and deploy authority with people preserves control.
- B. Full authority to merge and deploy unattended
  _Rationale:_ Unattended merge/deploy removes human oversight of risk.
- C. No ability to read the code at all
  _Rationale:_ That would prevent it from adding any review value.
- D. Authority to delete branches it dislikes
  _Rationale:_ Destructive actions must not be automated unattended.

**MST-0542-Q0002** (multiple-answer, Select TWO) Which TWO make an automated PR review trustworthy? (Select TWO.)

- A. It records what it checked and what it did not **(key)**
  _Rationale:_ Correct: an audit trail bounds how much to trust the review.
- B. Humans retain final approval on merges **(key)**
  _Rationale:_ Correct: a human gate keeps accountability with people.
- C. It merges automatically when it finds no issues
  _Rationale:_ Silent auto-merge removes the human oversight that review needs.
- D. It hides its reasoning to keep the PR clean
  _Rationale:_ Hidden reasoning cannot be audited or trusted.

**MST-0542-Q0003** (single-answer, Select ONE) A CI check fails. The best first response with Claude Code is to:

- A. Read the job log to identify the root cause before acting **(key)**
  _Rationale:_ Correct: reading the failure log is faster and safer than blind re-runs.
- B. Re-run the job repeatedly hoping it passes
  _Rationale:_ Blind re-runs waste time and can mask a real failure.
- C. Disable the failing check
  _Rationale:_ Disabling checks removes the signal rather than addressing it.
- D. Merge anyway since it is probably flaky
  _Rationale:_ Assuming flakiness without evidence can ship a real defect.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
