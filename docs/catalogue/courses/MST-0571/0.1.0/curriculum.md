# GitHub Copilot Agents and Repository Customization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0571` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — GitHub Copilot Agents and Repository Customization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Copilot completion, chat and agent modes and their appropriate uses
2. Author repository custom instructions that steer generation to house standards
3. Build reusable prompt files and attach the right context
4. Configure a coding agent to act on issues within guardrails
5. Apply branch protection and review gates to agent-authored changes
6. Define organisation policy, auditing and accountability for Copilot use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Copilot capabilities and modes (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Choose the right Copilot mode for a given task; (2) Map a workflow to completion vs chat vs agent
- Common misconception addressed: Treating Copilot output as finished, reviewed code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Completion, chat and agent modes | 80 | 8 |
| M01L02 | When each mode fits a task | 80 | 8 |

### M02 Repository custom instructions (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Write a .github/copilot-instructions file for a repo; (2) Diagnose why generations ignore a convention
- Common misconception addressed: Assuming instructions guarantee compliance
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Custom instruction files and scope | 80 | 8 |
| M02L02 | Encoding standards and conventions | 80 | 8 |

### M03 Prompt files and reusable context (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Create a reusable prompt file for a recurring task; (2) Select and attach relevant files as context
- Common misconception addressed: Over-stuffing context with irrelevant files
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prompt files and variables | 80 | 8 |
| M03L02 | Context selection and attachment | 80 | 8 |

### M04 Coding agents from issues (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Scope an issue so an agent can act safely; (2) Set boundaries on what an agent may change
- Common misconception addressed: Delegating ambiguous issues to an agent
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Assigning work to a coding agent | 80 | 8 |
| M04L02 | Agent guardrails and limits | 80 | 8 |

### M05 Branch, PR and review controls (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Configure branch protection for agent PRs; (2) Define required human reviews and checks
- Common misconception addressed: Letting agent PRs merge without human review
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Branch protection and required checks | 80 | 8 |
| M05L02 | Human review gates for AI changes | 80 | 8 |

### M06 Governance and accountability (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Draft an acceptable-use policy for Copilot; (2) Design an audit trail for AI-authored commits
- Common misconception addressed: No clear owner for AI-generated code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Organisation policy and settings | 80 | 8 |
| M06L02 | Auditing and accountability | 80 | 8 |

## Integrative case

A platform team adopts GitHub Copilot across repositories. Design repository custom instructions and prompt files, configure a coding agent to work from issues under branch protection, define review gates, and justify the governance plan to engineering leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0571-final-protected | 40 | 40 | yes |
| MST-0571-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Copilot capabilities and modes | 7 |
| Repository custom instructions | 7 |
| Prompt files and reusable context | 7 |
| Coding agents from issues | 7 |
| Branch, PR and review controls | 6 |
| Governance and accountability | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0571-Q0001** (single-answer, Select ONE) A developer wants Copilot to follow the repository's naming and error-handling conventions automatically. What is the most durable approach?

- A. Add repository custom instructions that state the conventions, and still review output **(key)**  
  _Rationale:_ Correct: custom instructions steer generation repo-wide, but review remains required.
- B. Paste the conventions into every chat prompt by hand  
  _Rationale:_ Manual repetition is error-prone and not durable.
- C. Rename files until Copilot infers the style  
  _Rationale:_ Inference is unreliable and indirect.
- D. Disable Copilot and write all code manually  
  _Rationale:_ That abandons the tool rather than configuring it.

**MST-0571-Q0002** (multiple-answer, Select TWO) A coding agent will open pull requests from issues in a protected repository. Which TWO controls keep this safe? (Select TWO.)

- A. Require human review and passing checks before any agent PR merges **(key)**  
  _Rationale:_ Correct: human review plus required checks gate AI changes.
- B. Scope each issue narrowly so the agent's change surface is bounded **(key)**  
  _Rationale:_ Correct: a bounded, well-specified issue limits risk.
- C. Allow the agent to push directly to the default branch  
  _Rationale:_ That bypasses protection and review.
- D. Give the agent admin rights to adjust its own checks  
  _Rationale:_ That removes the guardrail entirely.

**MST-0571-Q0003** (single-answer, Select ONE) Generations keep ignoring the team's logging convention despite a custom-instructions file. What should you check first?

- A. Whether the instruction file is in the expected path and scope, and whether the convention is stated unambiguously **(key)**  
  _Rationale:_ Correct: path, scope and clarity determine whether instructions take effect.
- B. Whether the repository has enough stars  
  _Rationale:_ Popularity is irrelevant to instruction handling.
- C. Whether to raise the model temperature  
  _Rationale:_ Temperature does not enforce conventions.
- D. Whether to delete the file and rely on chat memory  
  _Rationale:_ That removes the durable mechanism.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
