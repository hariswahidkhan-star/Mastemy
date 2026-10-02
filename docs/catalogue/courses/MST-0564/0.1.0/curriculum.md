# Cursor CLI and Headless Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0564` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0564 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor CLI and Headless Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Decide when headless Cursor automation fits a task and when it does not
2. Run tasks from the CLI, passing context and reading exit status
3. Wire headless tasks into pipelines with result gating and failure handling
4. Keep unattended runs safe with scope limits and review
5. Operate headless automation with logging, secret care and auditing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 When to use Cursor headlessly (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) List tasks suited to headless runs; (2) Decide when a task needs a human in the loop instead
- Common misconception addressed: Automating a task that genuinely needs human judgement
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What the CLI and headless mode enable | 72 | 5 |
| M01L02 | Interactive editing versus scripted automation | 72 | 5 |

### M02 Running tasks from the CLI (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Run a defined task headlessly and capture its result; (2) Check exit status to decide the next step
- Common misconception addressed: Ignoring exit status and assuming success
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Invoking a task and passing context from the command line | 96 | 5 |
| M02L02 | Capturing output and exit status | 96 | 5 |

### M03 Automation in pipelines (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a headless step to a pipeline with a result gate; (2) Handle a failed run without blocking everything
- Common misconception addressed: Letting a non-deterministic run block the pipeline silently
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Wiring a headless task into a scripted pipeline | 80 | 5 |
| M03L02 | Gating on results and handling failures | 80 | 5 |
| M03L03 | Keeping runs reproducible | 80 | 5 |

### M04 Safety in unattended runs (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Constrain an unattended run to a safe scope; (2) Require human approval before applying changes
- Common misconception addressed: Giving an unattended run unrestricted write access
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Limiting what an unattended run can change | 96 | 5 |
| M04L02 | Requiring review before changes are applied | 96 | 5 |

### M05 Operating headless automation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add logging and secret handling to a CLI run; (2) Audit a batch of automated runs
- Common misconception addressed: Storing credentials in plain command-line arguments
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Logging, secrets and monitoring for CLI runs | 96 | 5 |
| M05L02 | Auditing what automated runs did | 96 | 5 |

## Integrative case

A team adds a headless Cursor step to its CI pipeline: scope what the run may change, gate the pipeline on its exit status, require review before any change is applied, keep secrets out of command-line arguments, and audit each run from its logs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0564-final-protected | 30 | 40 | yes |
| MST-0564-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| When to use Cursor headlessly | 5 |
| Running tasks from the CLI | 6 |
| Automation in pipelines | 7 |
| Safety in unattended runs | 6 |
| Operating headless automation | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0564-Q0001** (single-answer, Select ONE) After a headless CLI run, what determines the next pipeline step?

- A. The run's exit status and captured result **(key)**  
  _Rationale:_ Correct: exit status and output are how a pipeline gates on a run.
- B. How long the run took  
  _Rationale:_ Duration does not indicate success or failure.
- C. Whether anyone was watching  
  _Rationale:_ Unattended runs still report status.
- D. The size of the log file  
  _Rationale:_ Log size is unrelated to the outcome.

**MST-0564-Q0002** (multiple-answer, Select TWO) Which TWO controls make unattended Cursor runs safe? (Select TWO.)

- A. Limit what the run is allowed to change **(key)**  
  _Rationale:_ Correct: scope limits contain the impact of an unattended run.
- B. Require human review before changes are applied **(key)**  
  _Rationale:_ Correct: a review gate prevents unwatched bad changes from shipping.
- C. Grant unrestricted write access for flexibility  
  _Rationale:_ Unrestricted access removes the safety boundary.
- D. Pass credentials as plain command-line arguments  
  _Rationale:_ Plain-argument secrets leak into process lists and logs.

**MST-0564-Q0003** (single-answer, Select ONE) Where should secrets go for a scripted headless run?

- A. In environment or a secret store, not in command-line arguments **(key)**  
  _Rationale:_ Correct: command-line arguments are visible and logged; secrets belong elsewhere.
- B. As plain text in the command invocation  
  _Rationale:_ Command-line secrets leak through process lists and history.
- C. Hard-coded in the pipeline script  
  _Rationale:_ Committed secrets cannot be rotated and leak.
- D. Printed to the log for traceability  
  _Rationale:_ Logging secrets exposes them.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
