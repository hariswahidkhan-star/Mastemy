# Cursor Rules and Repository Instruction Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0552` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Intended to reflect Cursor's official rules documentation; the vendor site was blocked by the egress proxy this session, so no official page was read. Rule file names, scoping and precedence are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CURSOR-RULES |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Rules and Repository Instruction Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what repository rules do and when the agent applies them
2. Write clear, scoped rules that the agent can follow
3. Scope rules to paths and file types appropriately
4. Keep a rule set small, consistent and maintainable
5. Diagnose when a rule is ignored or conflicts with another

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot prove a rule set behaves as intended in a live repo; rule design is taught through worked repository examples.

## Modules

### M01 What rules are (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Classify five instructions as rule-worthy or not; (2) Explain when the agent consults rules
- Common misconception addressed: Expecting rules to be obeyed like hard constraints every time
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Purpose and scope of repository rules | 72 | 5 |
| M01L02 | How and when the agent applies rules | 72 | 5 |

### M02 Writing clear rules (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rewrite a vague rule into a specific, testable one; (2) Turn a recurring correction into a reusable rule
- Common misconception addressed: Writing rules so long the agent cannot act on them
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Specific, actionable rule wording | 96 | 5 |
| M02L02 | Turning repeated feedback into rules | 96 | 5 |

### M03 Scoping rules (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Scope a style rule to one package by path; (2) Choose global versus path-scoped for three rules
- Common misconception addressed: Applying a frontend-only rule to the whole repository
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Global versus path-scoped rules | 80 | 5 |
| M03L02 | Scoping by path and file type | 80 | 5 |
| M03L03 | Organising rules across a monorepo | 80 | 5 |

### M04 Maintainable rule sets (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Prune an overlapping rule set down to essentials; (2) Resolve two rules that contradict each other
- Common misconception addressed: Keeping contradictory rules and blaming the agent
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Keeping the rule set small and consistent | 96 | 5 |
| M04L02 | Reviewing and versioning rules | 96 | 5 |

### M05 Diagnosing rule problems (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Find why a rule is being ignored; (2) Fix a precedence conflict and verify the fix
- Common misconception addressed: Assuming a rule is active without checking its scope
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Why a rule gets ignored | 96 | 5 |
| M05L02 | Checking scope, precedence and conflicts | 96 | 5 |

## Integrative case

A team standardises a monorepo in Cursor: write a core rule set for conventions, scope a frontend style rule to the web package, resolve a conflict between two rules, and verify the agent now follows the intended conventions on a sample task.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0552-final-protected | 30 | 40 | yes |
| MST-0552-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What rules are | 5 |
| Writing clear rules | 6 |
| Scoping rules | 7 |
| Maintainable rule sets | 6 |
| Diagnosing rule problems | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0552-Q0001** (single-answer, Select ONE) A frontend formatting rule is being applied to backend files too. What is the most likely fix?

- A. Scope the rule to the frontend path instead of leaving it global **(key)**  
  _Rationale:_ Correct: path-scoping limits a rule to the intended part of the repo.
- B. Delete all rules  
  _Rationale:_ Removing every rule discards useful conventions.
- C. Make the rule longer  
  _Rationale:_ Length does not control which files a rule applies to.
- D. Rename the backend files  
  _Rationale:_ Renaming source files to satisfy a mis-scoped rule is the wrong lever.

**MST-0552-Q0002** (multiple-answer, Select TWO) Which TWO qualities make a repository rule more likely to be followed? (Select TWO.)

- A. It is specific and states the exact convention **(key)**  
  _Rationale:_ Correct: specific, actionable wording is easier for the agent to apply.
- B. It is scoped to where it is relevant **(key)**  
  _Rationale:_ Correct: appropriate scope avoids conflicts and noise.
- C. It is a long essay covering many topics  
  _Rationale:_ Overlong rules are hard to act on.
- D. It contradicts another active rule  
  _Rationale:_ Conflicting rules cause unpredictable behaviour.

**MST-0552-Q0003** (single-answer, Select ONE) Two active rules give opposite instructions for the same files. What is the first thing to check?

- A. Which rule takes precedence and whether their scopes overlap **(key)**  
  _Rationale:_ Correct: diagnosing scope and precedence resolves the conflict.
- B. Whether the repository is too large  
  _Rationale:_ Repo size is not the cause of a direct rule conflict.
- C. Whether the agent model changed  
  _Rationale:_ The conflict exists in the rules regardless of model.
- D. Whether tests are enabled  
  _Rationale:_ Tests do not govern rule precedence.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
