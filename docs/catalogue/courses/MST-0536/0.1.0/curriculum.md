# Claude Code for Python Data and Automation Projects

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0536` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-PYTHON |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code for Python Data and Automation Projects (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Claude Code for Python data and automation projects
2. Manage environments, dependencies and entry points for Python scripts with Claude Code
3. Apply Python conventions, typing and error handling to generated code
4. Validate data transformations against expected results
5. Make automation scripts safe to re-run and fail loudly on errors

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Python projects with Claude Code (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Set up and use a project virtual environment via Claude Code; (2) Pin dependencies so a script is reproducible
- Common misconception addressed: Installing packages globally and breaking other projects' dependencies
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Virtual environments and dependency management | 72 | 5 |
| M01L02 | Project layout and entry points | 72 | 5 |

### M02 Idiomatic Python and error handling (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Replace a bare except with targeted, logged handling; (2) Add type hints that clarify a data function's contract
- Common misconception addressed: Swallowing exceptions so a broken script appears to succeed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Typing, structure and readable Python | 96 | 5 |
| M02L02 | Error handling that fails loudly | 96 | 5 |

### M03 Validating data transformations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Check row counts and key totals before and after a join; (2) Add assertions that catch a silently dropped column
- Common misconception addressed: Assuming a transformation is correct because it ran without error
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Row-count and total reconciliation | 80 | 5 |
| M03L02 | Assertions and data sanity checks | 80 | 5 |
| M03L03 | Spotting silent data loss in joins | 80 | 5 |

### M04 Safe, re-runnable automation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Make a script idempotent so re-running is safe; (2) Add a dry-run mode before destructive operations
- Common misconception addressed: Writing a script that corrupts data if run twice
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Idempotent and re-runnable scripts | 96 | 5 |
| M04L02 | Dry-run and confirmation for destructive steps | 96 | 5 |

### M05 Verifying automation changes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Validate output totals against the source export; (2) Review an automation diff for hidden destructive behaviour
- Common misconception addressed: Trusting a green run without checking the output against the source
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Validating output against source data | 96 | 5 |
| M05L02 | Reviewing automation changes for safety | 96 | 5 |

## Integrative case

A data analyst builds a script that cleans a messy CSV, joins it to a reference table, and writes a report, driving the virtual environment and tests through Claude Code and validating row counts and totals against the source.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0536-final-protected | 30 | 40 | yes |
| MST-0536-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Python projects with Claude Code | 5 |
| Idiomatic Python and error handling | 6 |
| Validating data transformations | 7 |
| Safe, re-runnable automation | 6 |
| Verifying automation changes | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0536-Q0001** (single-answer, Select ONE) A generated Python script uses a bare 'except: pass' around a data-loading step. Why is this a problem?

- A. It hides errors so a failed load can silently produce wrong results **(key)**
  _Rationale:_ Correct: swallowing exceptions masks failures and corrupts downstream results.
- B. Bare except runs faster than specific handling
  _Rationale:_ Performance is not the issue; silent failure is.
- C. Python forbids the except keyword
  _Rationale:_ except is valid Python; the problem is swallowing the error.
- D. It always crashes the interpreter
  _Rationale:_ It does the opposite: it suppresses the crash and hides the fault.

**MST-0536-Q0002** (multiple-answer, Select TWO) Which TWO checks validate a CSV join transformation? (Select TWO.)

- A. Compare row counts before and after against expectations **(key)**
  _Rationale:_ Correct: unexpected row counts reveal dropped or duplicated rows.
- B. Reconcile a key total against the source export **(key)**
  _Rationale:_ Correct: totals confirm the transformation preserved the data.
- C. Confirm the script printed the word 'done'
  _Rationale:_ A success message is not evidence the data is correct.
- D. Check that the output file name is shorter
  _Rationale:_ File name length is irrelevant to correctness.

**MST-0536-Q0003** (single-answer, Select ONE) An automation script overwrites production data and could be run twice by mistake. The safest design is to:

- A. Make it idempotent and add a dry-run before destructive operations **(key)**
  _Rationale:_ Correct: idempotency and dry-run protect against accidental re-runs.
- B. Run it faster so the window for mistakes is smaller
  _Rationale:_ Speed does not prevent a destructive double-run.
- C. Remove all logging to reduce clutter
  _Rationale:_ Less logging makes failures harder to detect, not safer.
- D. Trust the operator never to re-run it
  _Rationale:_ Relying on perfect operators is not a safety design.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
