# Git and GitHub Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1564` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use core Git commands for everyday version control
2. Work with branches and merges confidently
3. Resolve conflicts and recover from mistakes
4. Collaborate through remotes and pull requests
5. Apply a sensible branching and review workflow
6. Use GitHub features for issues, reviews and automation basics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Git basics and the object model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Stage and commit a focused change; (2) Inspect history with log and diff
- Common misconception addressed: Thinking Git stores diffs rather than snapshots
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Repos, commits, staging and history | 168 | 8 |
| M01L02 | How Git stores snapshots | 168 | 8 |

### M02 Branching and merging (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create a feature branch and merge it; (2) Rebase a branch onto main
- Common misconception addressed: Rebasing shared history that others have pulled
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating and switching branches | 168 | 8 |
| M02L02 | Merge vs rebase | 168 | 8 |

### M03 Conflicts and recovery (MASTEMY-DESIGN 20%)

- Worked applications: (1) Resolve a conflict in two files; (2) Recover a lost commit with reflog
- Common misconception addressed: Using reset --hard without understanding it
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Resolving merge conflicts | 168 | 8 |
| M03L02 | reflog, reset and revert | 168 | 8 |

### M04 Remotes and collaboration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Push a branch and open a pull request; (2) Review a diff and request changes
- Common misconception addressed: Pushing directly to main instead of via review
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Clone, fetch, pull and push | 168 | 8 |
| M04L02 | Pull requests and code review | 168 | 8 |

### M05 Workflow and GitHub features (MASTEMY-DESIGN 20%)

- Worked applications: (1) Adopt a trunk-based or feature-branch flow; (2) Set up a branch protection rule
- Common misconception addressed: Committing secrets or large binaries to history
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Branching strategies | 168 | 8 |
| M05L02 | Issues, protections and CI basics | 168 | 8 |

## Integrative case

Join a shared repository: branch for a feature, open a pull request, resolve a merge conflict, respond to review feedback, and recover a commit you accidentally reset.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1564-final-protected | 25 | 25 | yes |
| MST-1564-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Git basics and the object model | 5 |
| Branching and merging | 5 |
| Conflicts and recovery | 5 |
| Remotes and collaboration | 5 |
| Workflow and GitHub features | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1564-Q0001** (single-answer, Select ONE) What is the difference between merge and rebase?

- A. Merge preserves history with a merge commit; rebase replays commits onto a new base **(key)**  
  _Rationale:_ Correct: that is the core distinction.
- B. Rebase deletes all your commits  
  _Rationale:_ Rebase moves commits, it does not delete work.
- C. Merge can only be done once per repo  
  _Rationale:_ There is no such limit.
- D. They produce identical history in all cases  
  _Rationale:_ Their histories differ by design.

**MST-1564-Q0002** (multiple-answer, Select TWO) Which TWO are safe recovery tools after a bad change? (Select TWO.)

- A. git reflog to find a lost commit **(key)**  
  _Rationale:_ Correct: reflog tracks recent HEAD positions.
- B. git revert to undo a commit with a new commit **(key)**  
  _Rationale:_ Correct: revert safely undoes without rewriting history.
- C. Force-pushing over shared history without warning  
  _Rationale:_ That can destroy collaborators' work.
- D. Deleting the .git folder  
  _Rationale:_ That discards all version history.

**MST-1564-Q0003** (single-answer, Select ONE) Why avoid rebasing branches others have already pulled?

- A. It rewrites commit history and causes divergence for collaborators **(key)**  
  _Rationale:_ Correct: rewriting shared history creates conflicts for others.
- B. Rebase is slower than merge  
  _Rationale:_ Speed is not the concern here.
- C. GitHub forbids all rebasing  
  _Rationale:_ Rebasing is allowed; the issue is shared history.
- D. It permanently corrupts the repository  
  _Rationale:_ It does not corrupt the repo.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
