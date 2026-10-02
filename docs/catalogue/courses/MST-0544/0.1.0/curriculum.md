# Claude Code Context Management and Cost Control

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0544` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-CONTEXT-COST |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Context Management and Cost Control (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how context windows and token usage drive Claude Code cost and quality
2. Keep only relevant context in view to improve results and reduce cost
3. Use summaries, scoping and resets to manage long sessions
4. Estimate and monitor the cost of a Claude Code workflow
5. Decide when a smaller model or a tighter scope is the right trade-off

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Context windows and tokens (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Explain how irrelevant context can degrade answers; (2) Estimate the token cost of including a large file
- Common misconception addressed: Believing a bigger context is always better regardless of relevance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Context windows, tokens and cost | 72 | 5 |
| M01L02 | How irrelevant context hurts quality | 72 | 5 |

### M02 Keeping context relevant (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trim a session to only the relevant files; (2) Decide what to include and exclude for a task
- Common misconception addressed: Dumping entire directories into context instead of the few files that matter
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Scoping context to what matters | 96 | 5 |
| M02L02 | Including and excluding files deliberately | 96 | 5 |

### M03 Managing long sessions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Summarise progress to carry forward only what matters; (2) Reset a bloated session cleanly
- Common misconception addressed: Letting a session accumulate until quality and cost both suffer
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Summaries to carry state forward | 80 | 5 |
| M03L02 | Resetting and restarting a session | 80 | 5 |
| M03L03 | Recognising when a session has gone stale | 80 | 5 |

### M04 Estimating and monitoring cost (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Estimate a workflow's token cost before running it; (2) Monitor usage during a long task
- Common misconception addressed: Ignoring cost until a bill or limit is a surprise
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Estimating workflow cost | 96 | 5 |
| M04L02 | Monitoring usage in a session | 96 | 5 |

### M05 Right-sizing the trade-off (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a cheaper model for a low-risk mechanical step; (2) Decide when tighter scope beats more compute
- Common misconception addressed: Always using the largest model even for mechanical, low-risk steps
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Choosing model and scope for the task | 96 | 5 |
| M05L02 | When smaller and tighter is the right call | 96 | 5 |

## Integrative case

A developer on a long refactoring session notices degraded answers and rising cost: they prune irrelevant files from context, summarise progress, reset where appropriate, and choose a cheaper model for the mechanical steps.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0544-final-protected | 30 | 40 | yes |
| MST-0544-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Context windows and tokens | 5 |
| Keeping context relevant | 6 |
| Managing long sessions | 7 |
| Estimating and monitoring cost | 6 |
| Right-sizing the trade-off | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0544-Q0001** (single-answer, Select ONE) Answers degrade midway through a long Claude Code session full of unrelated files. The most direct fix is to:

- A. Prune irrelevant context so only the relevant files remain in view **(key)**
  _Rationale:_ Correct: irrelevant context dilutes attention and degrades answers.
- B. Add even more files so Claude has everything
  _Rationale:_ More irrelevant context worsens the problem.
- C. Switch to a slower keyboard
  _Rationale:_ Input speed is unrelated to context quality.
- D. Restart the computer
  _Rationale:_ A machine restart does not address bloated session context.

**MST-0544-Q0002** (multiple-answer, Select TWO) Which TWO help manage a long, costly Claude Code session? (Select TWO.)

- A. Summarising progress to carry forward only what matters **(key)**
  _Rationale:_ Correct: a summary preserves state while shedding token load.
- B. Resetting a bloated session cleanly when it goes stale **(key)**
  _Rationale:_ Correct: a reset removes accumulated irrelevant context.
- C. Including every file in the repo just in case
  _Rationale:_ Indiscriminate inclusion raises cost and hurts quality.
- D. Never summarising so nothing is lost
  _Rationale:_ Hoarding all context is what degrades the session.

**MST-0544-Q0003** (single-answer, Select ONE) A workflow has many mechanical, low-risk steps. A sensible cost trade-off is to:

- A. Use a smaller, cheaper model for the mechanical steps where quality allows **(key)**
  _Rationale:_ Correct: matching model to task risk controls cost without hurting outcomes.
- B. Always use the largest model for every step
  _Rationale:_ Max compute on trivial steps wastes cost.
- C. Avoid models entirely and do it by hand
  _Rationale:_ That discards the automation's value unnecessarily.
- D. Run every step twice to be safe
  _Rationale:_ Doubling runs doubles cost without clear benefit.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
