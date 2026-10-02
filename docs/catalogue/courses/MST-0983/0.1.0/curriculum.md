# Git: Version Control and Collaborative Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0983` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Git: Version Control and Collaborative Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Version control foundations
2. Working with changes
3. Branching and merging
4. Remotes and collaboration
5. History and recovery
6. Workflows and good practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Version control foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Initialise a repository and make a first commit; (2) Inspect history with log and status
- Common misconception addressed: Thinking Git stores diffs rather than snapshots
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why version control and how Git models history | 80 | 6 |
| M01L02 | init, add, commit and status | 80 | 6 |

### M02 Working with changes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Stage selected changes and write a clear commit message; (2) Unstage and discard changes safely
- Common misconception addressed: Confusing the working directory, staging area and repository
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The three areas and the staging workflow | 80 | 6 |
| M02L02 | Undoing changes with restore and reset | 80 | 6 |

### M03 Branching and merging (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create and switch branches for a feature; (2) Merge a branch and resolve a conflict
- Common misconception addressed: Believing a branch copies the whole project to a new folder
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Branches and fast-forward merges | 80 | 6 |
| M03L02 | Merge conflicts and resolution | 80 | 6 |

### M04 Remotes and collaboration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Clone, push and pull from a remote; (2) Open and review a pull request
- Common misconception addressed: Expecting push to automatically pull others' changes first
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Remotes, fetch, pull and push | 80 | 6 |
| M04L02 | Pull requests and code review | 80 | 6 |

### M05 History and recovery (MASTEMY-DESIGN 16%)

- Worked applications: (1) Recover a lost commit with reflog; (2) Revert a bad change without rewriting shared history
- Common misconception addressed: Treating a force-push to a shared branch as harmless
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Inspecting and searching history | 80 | 6 |
| M05L02 | revert, reset, reflog and recovery | 80 | 6 |

### M06 Workflows and good practice (MASTEMY-DESIGN 16%)

- Worked applications: (1) Apply a feature-branch workflow with a team; (2) Write a .gitignore and structure meaningful commits
- Common misconception addressed: Assuming one branching model fits every team
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Branching strategies and conventions | 80 | 6 |
| M06L02 | Ignoring files, tags and releases | 80 | 6 |

## Integrative case

Collaborate on a shared codebase with Git: initialise a repository, work on feature branches, resolve a merge conflict, use a pull request workflow with a remote, recover a mistaken change from history, and agree a branching convention with a small team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0983-final-protected | 30 | 30 | yes |
| MST-0983-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0983-Q0001** (single-answer, Select ONE) In Git's model, what does each commit represent?

- A. A snapshot of the tracked files at that point, with a link to its parent **(key)**  
  _Rationale:_ Correct: Git stores snapshots of the project, each referencing its parent commit.
- B. Only the text differences since the last commit  
  _Rationale:_ Git conceptually stores snapshots, not just diffs.
- C. A copy of the remote server configuration  
  _Rationale:_ A commit records project content, not server configuration.
- D. The list of branches in the repository  
  _Rationale:_ A commit is a project snapshot, not a branch list.

**MST-0983-Q0002** (multiple-answer, Select TWO) Which TWO of Git's areas are involved when you run `git add` then `git commit`? (Select TWO)

- A. The staging area (index) **(key)**  
  _Rationale:_ Correct: git add moves changes into the staging area.
- B. The repository (commit history) **(key)**  
  _Rationale:_ Correct: git commit records the staged snapshot into the repository.
- C. The remote server  
  _Rationale:_ Neither add nor commit contacts the remote; that needs push.
- D. The reflog garbage collector  
  _Rationale:_ Garbage collection is not part of the add/commit flow.

**MST-0983-Q0003** (single-answer, Select ONE) Why is rewriting history with a force-push risky on a shared branch?

- A. It can overwrite commits teammates have already based work on **(key)**  
  _Rationale:_ Correct: force-pushing replaces shared history, which can discard or diverge from others' work.
- B. It permanently deletes the remote repository  
  _Rationale:_ A force-push updates a branch; it does not delete the repository.
- C. It converts the repository to read-only  
  _Rationale:_ Force-pushing does not change repository permissions.
- D. It always resolves merge conflicts automatically  
  _Rationale:_ Force-pushing does not resolve conflicts.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
