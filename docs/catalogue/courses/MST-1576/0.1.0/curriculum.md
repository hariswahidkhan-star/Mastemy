# Agile Engineering Practices

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1576` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-AEP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Agile Engineering Practices (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Agile engineering foundations
2. Version control workflow
3. Continuous integration
4. Test-driven development
5. Continuous delivery
6. Refactoring and design
7. Pairing and collaboration
8. Flow and metrics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on agile engineering practices; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Agile engineering foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Map a practice to the feedback loop it shortens; (2) Distinguish process from engineering practice
- Common misconception addressed: Adopting ceremonies while ignoring engineering practices
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Agile values vs practices | 60 | 5 |
| M01L02 | Feedback loops | 60 | 5 |

### M02 Version control workflow (MASTEMY-DESIGN 13%)

- Worked applications: (1) Integrate a change in a small batch; (2) Keep a branch short-lived
- Common misconception addressed: Running long-lived feature branches that drift
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Trunk-based development | 60 | 5 |
| M02L02 | Small batches and short-lived branches | 60 | 5 |

### M03 Continuous integration (MASTEMY-DESIGN 12%)

- Worked applications: (1) Set up a CI pipeline that runs on every push; (2) Fix a broken build before new work
- Common misconception addressed: Letting the main build stay red for days
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CI principles | 60 | 5 |
| M03L02 | Keeping the build green | 60 | 5 |

### M04 Test-driven development (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a failing test then make it pass; (2) Refactor under a green test
- Common misconception addressed: Writing all tests after the code is 'done'
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Red-green-refactor | 60 | 5 |
| M04L02 | Designing through tests | 60 | 5 |

### M05 Continuous delivery (MASTEMY-DESIGN 12%)

- Worked applications: (1) Promote a build through pipeline stages; (2) Release behind a feature flag
- Common misconception addressed: Doing big-bang releases with no rollback path
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Deployment pipelines | 60 | 5 |
| M05L02 | Feature flags and safe releases | 60 | 5 |

### M06 Refactoring and design (MASTEMY-DESIGN 13%)

- Worked applications: (1) Refactor as part of each change; (2) Let design emerge from tests
- Common misconception addressed: Treating refactoring as a separate 'later' project
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Continuous refactoring | 60 | 5 |
| M06L02 | Emergent design and simplicity | 60 | 5 |

### M07 Pairing and collaboration (MASTEMY-DESIGN 12%)

- Worked applications: (1) Pair on a tricky change; (2) Share ownership of a module
- Common misconception addressed: Creating knowledge silos around one expert
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Pair and mob programming | 60 | 5 |
| M07L02 | Collective code ownership | 60 | 5 |

### M08 Flow and metrics (MASTEMY-DESIGN 12%)

- Worked applications: (1) Apply a WIP limit to a board; (2) Interpret deployment-frequency and lead-time metrics
- Common misconception addressed: Measuring utilisation instead of flow and outcomes
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Limiting work in progress | 60 | 5 |
| M08L02 | Lead time and DORA metrics | 60 | 5 |

## Integrative case

Improve a team's delivery: introduce trunk-based development with small batches, continuous integration, test-driven development on a new module, and a WIP limit, explaining how each practice shortens feedback loops.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1576-final-protected | 40 | 40 | yes |
| MST-1576-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Agile engineering foundations | 5 |
| Version control workflow | 5 |
| Continuous integration | 5 |
| Test-driven development | 5 |
| Continuous delivery | 5 |
| Refactoring and design | 5 |
| Pairing and collaboration | 5 |
| Flow and metrics | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1576-Q0001** (single-answer, Select ONE) What is the core idea of the red-green-refactor cycle in TDD?

- A. Write a failing test, make it pass simply, then improve the design while keeping tests green **(key)**  
  _Rationale:_ Correct: that is the three-step TDD loop.
- B. Write all code first, then add tests at the end  
  _Rationale:_ That is test-after, not TDD.
- C. Refactor before writing any test  
  _Rationale:_ Refactoring comes after a passing test.
- D. Delete tests once the code works  
  _Rationale:_ Tests are kept as a safety net.

**MST-1576-Q0002** (single-answer, Select ONE) How does trunk-based development with small batches shorten feedback loops?

- A. Frequent small integrations surface conflicts and defects quickly rather than at a late merge **(key)**  
  _Rationale:_ Correct: small, frequent merges reduce integration risk.
- B. It removes the need for a CI pipeline  
  _Rationale:_ CI is essential to trunk-based development.
- C. It guarantees zero merge conflicts  
  _Rationale:_ It reduces, not eliminates, conflicts.
- D. It eliminates the need for tests  
  _Rationale:_ Tests remain critical.

**MST-1576-Q0003** (multiple-answer, Select ALL that apply) Which statements about continuous integration are correct? (Select TWO)

- A. The build should run automatically on every push **(key)**  
  _Rationale:_ Correct: automated builds catch breakage early.
- B. A broken main build should be fixed before starting new work **(key)**  
  _Rationale:_ Correct: keeping the build green protects the team.
- C. CI means deploying manually once a quarter  
  _Rationale:_ False; that contradicts continuous integration.
- D. CI removes the need for automated tests  
  _Rationale:_ False; CI relies on automated tests to be useful.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
