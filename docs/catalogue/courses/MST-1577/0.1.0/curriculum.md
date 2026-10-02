# Open Source Contribution

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1577` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-OSC-002 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Open Source Contribution (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Open-source foundations
2. Finding a project
3. Community norms
4. Project setup
5. Making a change
6. Pull requests
7. Review and iteration
8. Sustaining contribution

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on contributing to open-source projects; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Open-source foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Identify a permissive vs copyleft licence; (2) Check a project's licence before contributing
- Common misconception addressed: Assuming all open-source code can be used without obligation
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What open source is | 60 | 5 |
| M01L02 | Licences and their obligations | 60 | 5 |

### M02 Finding a project (MASTEMY-DESIGN 13%)

- Worked applications: (1) Pick a healthy, active project; (2) Find a well-scoped first issue
- Common misconception addressed: Starting with a huge change as a first contribution
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing a project to contribute to | 60 | 5 |
| M02L02 | Good first issues | 60 | 5 |

### M03 Community norms (MASTEMY-DESIGN 12%)

- Worked applications: (1) Read CONTRIBUTING.md before starting; (2) Ask a clarifying question respectfully
- Common misconception addressed: Ignoring the project's stated process
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Contributing guides and codes of conduct | 60 | 5 |
| M03L02 | Communication etiquette | 60 | 5 |

### M04 Project setup (MASTEMY-DESIGN 13%)

- Worked applications: (1) Fork, clone and set an upstream remote; (2) Run the project's test suite
- Common misconception addressed: Skipping local tests before opening a PR
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Forking and cloning | 60 | 5 |
| M04L02 | Building and running tests locally | 60 | 5 |

### M05 Making a change (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create a topic branch for the change; (2) Write a descriptive commit message
- Common misconception addressed: Bundling unrelated changes into one commit
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Branching and commits | 60 | 5 |
| M05L02 | Writing a clear commit message | 60 | 5 |

### M06 Pull requests (MASTEMY-DESIGN 13%)

- Worked applications: (1) Open a PR that references the issue; (2) Write a PR description reviewers can follow
- Common misconception addressed: Opening a PR with no description or context
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Opening a good PR | 60 | 5 |
| M06L02 | PR description and linking issues | 60 | 5 |

### M07 Review and iteration (MASTEMY-DESIGN 12%)

- Worked applications: (1) Address review comments and push updates; (2) Rebase a branch on updated main
- Common misconception addressed: Taking review feedback personally
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Responding to feedback | 60 | 5 |
| M07L02 | Keeping a PR up to date | 60 | 5 |

### M08 Sustaining contribution (MASTEMY-DESIGN 12%)

- Worked applications: (1) Follow up respectfully on a stalled PR; (2) Build trust toward larger contributions
- Common misconception addressed: Demanding immediate maintainer attention
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Maintainer expectations | 60 | 5 |
| M08L02 | Becoming a regular contributor | 60 | 5 |

## Integrative case

Make your first substantive contribution to an open-source project: find a suitable issue, read the contributing guide and licence, set up the project, submit a clean pull request, and respond to review feedback professionally.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1577-final-protected | 40 | 40 | yes |
| MST-1577-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Open-source foundations | 5 |
| Finding a project | 5 |
| Community norms | 5 |
| Project setup | 5 |
| Making a change | 5 |
| Pull requests | 5 |
| Review and iteration | 5 |
| Sustaining contribution | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1577-Q0001** (single-answer, Select ONE) Why must you check a project's licence before contributing or reusing its code?

- A. Licences impose obligations (e.g. attribution or share-alike) that affect how code may be used and redistributed **(key)**  
  _Rationale:_ Correct: licence terms are legally binding.
- B. Licences only matter for paid software  
  _Rationale:_ Open-source licences carry obligations too.
- C. All open-source licences are identical  
  _Rationale:_ They differ significantly, e.g. MIT vs GPL.
- D. A licence prevents you from reading the code  
  _Rationale:_ Licences govern use/redistribution, not reading.

**MST-1577-Q0002** (single-answer, Select ONE) What makes a good first open-source contribution?

- A. A small, well-scoped change (e.g. a good-first-issue) that respects the project's process **(key)**  
  _Rationale:_ Correct: small scoped changes are easier to land and learn from.
- B. A sweeping rewrite of the core architecture  
  _Rationale:_ Too large and risky for a first PR.
- C. A change opened without reading CONTRIBUTING.md  
  _Rationale:_ Ignoring process reduces acceptance.
- D. A PR with unrelated commits bundled together  
  _Rationale:_ That hampers review.

**MST-1577-Q0003** (multiple-answer, Select ALL that apply) Which practices improve the chance a pull request is merged? (Select TWO)

- A. Write a clear PR description that links the issue it addresses **(key)**  
  _Rationale:_ Correct: context helps reviewers evaluate the change.
- B. Respond to review feedback constructively and update the PR **(key)**  
  _Rationale:_ Correct: iterating professionally builds trust.
- C. Bundle several unrelated changes into one PR  
  _Rationale:_ False; unrelated changes complicate review.
- D. Skip running the project's tests locally  
  _Rationale:_ False; failing CI delays or blocks merging.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
