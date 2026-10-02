# Scrum.org Professional Scrum Developer

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0141` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Scrum.org (no affiliation or endorsement) |
| Exam code | (none verified) - design assumption: Scrum.org Professional Scrum Developer (PSD) - unverified |
| Version basis | design assumption - official outline not verified (issuer page egress-blocked) |
| Evidence | **unverified-needs-official-check** - official issuer page not fetched; module structure and weights are design assumptions |
| Legacy IDs | (none) |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe how Developers deliver a Done Increment within Scrum
2. Apply modern engineering practices that enable agility
3. Evaluate the Definition of Done, quality and technical debt
4. Analyse collaboration, continuous integration and delivery within a Sprint

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Scrum for Developers (design assumption)

- Worked applications: (1) Decompose a backlog item into a plan for the Sprint; (2) Clarify the Definition of Done for an Increment
- Common misconception addressed: Believing 'done' means 'code written' without testing or integration
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Developer accountabilities | 320 | 6 |
| M01L02 | Sprint planning and the Increment | 320 | 6 |
| M01L03 | The Definition of Done | 320 | 6 |

### M02 Engineering practices for agility (design assumption)

- Worked applications: (1) Write a failing test then make it pass (TDD); (2) Refactor to reduce coupling in a sample design
- Common misconception addressed: Treating refactoring as optional rework rather than ongoing design health
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Test-driven development | 320 | 6 |
| M02L02 | Refactoring and clean code | 320 | 6 |
| M02L03 | Managing technical debt | 320 | 6 |

### M03 Continuous integration and collaboration (design assumption)

- Worked applications: (1) Design a CI pipeline that keeps the build green; (2) Plan pairing or mobbing to deliver a risky item
- Common misconception addressed: Assuming a long-lived branch is as safe as continuous integration
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Continuous integration | 320 | 6 |
| M03L02 | Continuous delivery and deployment | 320 | 6 |
| M03L03 | Collaboration, pairing and mobbing | 320 | 6 |

## Integrative case

A development team struggles to produce a truly Done Increment each Sprint because tests are flaky and integration is deferred: strengthen the Definition of Done, adopt TDD and refactoring, and build a CI pipeline that keeps the Increment releasable.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer page egress-blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0141-practice-form-A | 108 | 108 | yes |
| MST-0141-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0141-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0141-final-protected | 108 | 108 | yes |

| Domain | Items per form |
|---|---|
| Scrum for Developers | 36 |
| Engineering practices for agility | 36 |
| Continuous integration and collaboration | 36 |

Minimum reviewed item bank: 1044 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0141-Q0001** (single-answer, Select ONE) A team marks items 'done' when code is written but untested and unintegrated. The strongest fix aligned with Scrum is to:

- A. Strengthen the Definition of Done to include testing and integration **(key)**  
  _Rationale:_ Correct: a robust Definition of Done ensures the Increment is truly usable.
- B. Remove the Definition of Done to go faster  
  _Rationale:_ Removing it worsens quality.
- C. Define 'done' as 'merged someday'  
  _Rationale:_ Vague criteria do not ensure a usable Increment.
- D. Let each developer decide privately  
  _Rationale:_ Inconsistent criteria break transparency.

**MST-0141-Q0002** (single-answer, Select ONE) In test-driven development, the correct order is to:

- A. Write a failing test, make it pass, then refactor **(key)**  
  _Rationale:_ Correct: red-green-refactor is the TDD cycle.
- B. Write all code first, then maybe add tests  
  _Rationale:_ That is not TDD.
- C. Refactor before any test exists  
  _Rationale:_ Refactoring without tests is risky and not TDD.
- D. Skip tests to save time  
  _Rationale:_ Skipping tests is the opposite of TDD.

**MST-0141-Q0003** (multiple-answer, Select TWO) Which TWO practices most directly keep an Increment releasable throughout the Sprint? (Select TWO)

- A. Integrating work continuously to keep the build green **(key)**  
  _Rationale:_ Correct: continuous integration keeps the Increment releasable.
- B. Automated tests that run on every change **(key)**  
  _Rationale:_ Correct: automated tests catch regressions early.
- C. Deferring all integration to the last day  
  _Rationale:_ Late integration risks a broken Increment.
- D. Disabling the test suite to speed merges  
  _Rationale:_ Disabling tests removes the safety net.
- E. Keeping one giant branch for months  
  _Rationale:_ Long-lived branches delay integration and risk conflicts.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
