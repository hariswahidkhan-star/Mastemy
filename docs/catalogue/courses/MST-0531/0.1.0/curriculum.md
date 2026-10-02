# Claude Code Foundations: Terminal and Repository Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0531` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts from code.claude.com 'Extend Claude Code' page fetched 2026-10-02. Installation, plans and pricing were not checked and must be verified before recording. |
| Evidence | **vendor-docs-partial** - sources: SRC-CLAUDE-CODE-FEATURES |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Foundations: Terminal and Repository Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Claude Code's agentic loop, built-in tools and developer accountability
2. Write effective CLAUDE.md files and path-scoped rules, and know when to use output styles
3. Choose between skills, MCP servers, subagents, hooks and plugins for a need
4. Use hooks for enforcement and permissions for safe automation
5. Review diffs, run tests and verify claims before accepting changes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 How Claude Code works (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Trace a task through the agentic loop and its tool calls; (2) Decide what Claude Code should and should not be trusted to run
- Common misconception addressed: Assuming the agent's summary is proof the work was done
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The agentic loop and built-in tools | 72 | 5 |
| M01L02 | Starting a session in a repository | 72 | 5 |

### M02 Project context (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rewrite a 600-line CLAUDE.md into core rules plus skills; (2) Scope a frontend style rule to src/web with path rules
- Common misconception addressed: Putting reference manuals into CLAUDE.md
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | CLAUDE.md: what belongs there and keeping it short | 96 | 5 |
| M02L02 | Path-scoped rules in .claude/rules/ and output styles | 96 | 5 |

### M03 Extending Claude Code (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Turn a pasted playbook into a skill; (2) Choose MCP vs a skill for database access
- Common misconception addressed: Treating skills and subagents as the same thing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Skills: reference vs action skills and when they load | 80 | 5 |
| M03L02 | MCP servers: connecting external tools and context cost | 80 | 5 |
| M03L03 | Subagents and context isolation | 80 | 5 |

### M04 Automation and guardrails (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a PreToolUse hook that blocks edits to .env files; (2) Configure permissions for a CI-like automation
- Common misconception addressed: Relying on a CLAUDE.md instruction for a rule that must always hold
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Hooks as enforcement vs instructions as requests | 96 | 5 |
| M04L02 | Permissions and safe automation | 96 | 5 |

### M05 Reviewing work and accountability (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a diff with tests and reject an unverified claim; (2) Bundle skills, hooks and MCP config as a plugin
- Common misconception addressed: Merging AI changes without running tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reviewing diffs, running tests and verifying claims | 96 | 5 |
| M05L02 | Packaging a team setup as a plugin | 96 | 5 |

## Integrative case

A .NET/React team onboards Claude Code: write CLAUDE.md, add a deploy-checklist skill, block edits to secrets with a hook, connect the issue tracker via MCP, and review a multi-file change before merging.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0531-final-protected | 30 | 40 | yes |
| MST-0531-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How Claude Code works | 5 |
| Project context | 6 |
| Extending Claude Code | 7 |
| Automation and guardrails | 6 |
| Reviewing work and accountability | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0531-Q0001** (single-answer, Select ONE) A rule says 'never edit .env files' and it must hold every time. Where should it be enforced?

- A. A hook that blocks the edit **(key)**  
  _Rationale:_ Correct: the documentation says an instruction in CLAUDE.md or a skill is a request, while a PreToolUse hook is enforcement.
- B. A line in CLAUDE.md  
  _Rationale:_ CLAUDE.md instructions are followed by judgement, not guaranteed.
- C. An output style  
  _Rationale:_ Output styles set tone and format.
- D. A subagent  
  _Rationale:_ Subagents isolate context; they do not enforce rules.

**MST-0531-Q0002** (multiple-answer, Select TWO) Which TWO belong in CLAUDE.md according to the documentation's guidance? (Select TWO.)

- A. Build and test commands **(key)**  
  _Rationale:_ Correct: core conventions and build commands belong in CLAUDE.md.
- B. A full API reference manual  
  _Rationale:_ Reference material should move to skills, which load on demand.
- C. Project 'always do X' conventions **(key)**  
  _Rationale:_ Correct: 'always do X' rules are the stated use.
- D. A one-off debugging transcript  
  _Rationale:_ Transient content does not belong in persistent context.

**MST-0531-Q0003** (single-answer, Select ONE) A research task will read dozens of files, but you only need the findings in the main conversation. What should you use?

- A. A subagent **(key)**  
  _Rationale:_ Correct: subagents run in isolated context and return a summary.
- B. A hook  
  _Rationale:_ Hooks run on lifecycle events, not research tasks.
- C. CLAUDE.md  
  _Rationale:_ CLAUDE.md is persistent context, not a worker.
- D. An output style  
  _Rationale:_ Output styles do not isolate context.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
