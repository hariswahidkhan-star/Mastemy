# Claude Code Permissions, Sandboxing, and Secret Protection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0543` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-CODE-PERMISSIONS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code Permissions, Sandboxing, and Secret Protection (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Claude Code's permission model for reads, writes and command execution
2. Configure permissions and sandboxing to match a task's risk
3. Keep secrets out of prompts, context files and command output
4. Recognise and refuse actions that exceed granted permissions
5. Audit what an agent did and whether it stayed within bounds

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 The permission model (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Map read, write and execute permissions for a task; (2) Identify an action that should require explicit approval
- Common misconception addressed: Assuming Claude Code can do anything it is asked without explicit permission
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reads, writes and command execution permissions | 72 | 5 |
| M01L02 | How approvals and denials work | 72 | 5 |

### M02 Sandboxing by risk (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a sandbox profile matching a task's risk; (2) Deny network or paths a task does not need
- Common misconception addressed: Running every task with full permissions regardless of its risk
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Matching sandbox scope to task risk | 96 | 5 |
| M02L02 | Denying unnecessary network and paths | 96 | 5 |

### M03 Protecting secrets (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Move a hardcoded key into a secret manager; (2) Keep secrets out of command output and logs
- Common misconception addressed: Pasting API keys into prompts or committing them to context files
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Keeping secrets out of prompts and context | 80 | 5 |
| M03L02 | Secret managers and environment handling | 80 | 5 |
| M03L03 | Preventing secret leakage in output | 80 | 5 |

### M04 Refusing out-of-bounds actions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Recognise a request that exceeds granted permission; (2) Scope a grant to the narrow action actually needed
- Common misconception addressed: Granting a broad permission to unblock one narrow action
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Recognising out-of-bounds requests | 96 | 5 |
| M04L02 | Granting the minimum needed, not more | 96 | 5 |

### M05 Auditing agent actions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review an action log for anything out of scope; (2) Confirm no secret or protected path was touched
- Common misconception addressed: Trusting that an agent stayed in bounds without checking the log
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reviewing what the agent actually did | 96 | 5 |
| M05L02 | Confirming actions stayed within bounds | 96 | 5 |

## Integrative case

A developer runs Claude Code on a repo with production credentials nearby: they sandbox execution, deny network and secret paths, keep API keys in a secret manager, and review the action log to confirm nothing overstepped.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0543-final-protected | 30 | 40 | yes |
| MST-0543-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The permission model | 5 |
| Sandboxing by risk | 6 |
| Protecting secrets | 7 |
| Refusing out-of-bounds actions | 6 |
| Auditing agent actions | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0543-Q0001** (single-answer, Select ONE) A task only needs to read source files. What permission posture fits?

- A. Grant read access and withhold write, execute and network it does not need **(key)**
  _Rationale:_ Correct: least-privilege grants only what the task requires.
- B. Grant full read, write, execute and network to avoid prompts
  _Rationale:_ Over-granting expands the blast radius unnecessarily.
- C. Grant write access in case it is needed later
  _Rationale:_ Speculative grants violate least-privilege.
- D. Disable all permissions so it can do nothing
  _Rationale:_ Blocking the needed read prevents the task entirely.

**MST-0543-Q0002** (multiple-answer, Select TWO) Which TWO protect secrets when working with Claude Code? (Select TWO.)

- A. Keep API keys in a secret manager or environment, not in prompts **(key)**
  _Rationale:_ Correct: secrets belong outside prompts and context files.
- B. Prevent secrets from appearing in command output and logs **(key)**
  _Rationale:_ Correct: leaked output is a common exfiltration path.
- C. Paste the production key into CLAUDE.md for convenience
  _Rationale:_ Context files must never contain secrets.
- D. Echo the key to confirm it is correct
  _Rationale:_ Echoing a secret leaks it into logs and history.

**MST-0543-Q0003** (single-answer, Select ONE) A single narrow step needs one extra permission. The right approach is to:

- A. Grant the minimum scoped permission for that step, not a broad one **(key)**
  _Rationale:_ Correct: scope the grant to the narrow action actually required.
- B. Grant full permissions to avoid future prompts
  _Rationale:_ Broad grants to unblock one step violate least-privilege.
- C. Abandon the task entirely
  _Rationale:_ A scoped grant lets the task proceed safely.
- D. Disable the permission model for the session
  _Rationale:_ Turning off controls removes all protection.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
