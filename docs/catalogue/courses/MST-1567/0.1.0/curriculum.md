# Refactoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1567` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-R-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Refactoring (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Why refactor
2. Safety nets
3. Code smells
4. Composing methods
5. Moving features
6. Simplifying conditionals
7. Refactoring tools
8. Refactoring workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on refactoring existing code safely; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Why refactor (MASTEMY-DESIGN 13%)

- Worked applications: (1) Spot a code smell in a sample function; (2) Decide refactor vs rewrite for a module
- Common misconception addressed: Refactoring and adding features in the same commit
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Definition and goals | 60 | 5 |
| M01L02 | When and when not to refactor | 60 | 5 |

### M02 Safety nets (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a characterization test before changing code; (2) Run tests after each small step
- Common misconception addressed: Refactoring code that has no tests at all
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Characterization tests | 60 | 5 |
| M02L02 | Refactoring under test coverage | 60 | 5 |

### M03 Code smells (MASTEMY-DESIGN 12%)

- Worked applications: (1) Identify duplication across two methods; (2) Name a smell and its typical fix
- Common misconception addressed: Treating every smell as mandatory to fix immediately
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Long method and large class | 60 | 5 |
| M03L02 | Duplication and feature envy | 60 | 5 |

### M04 Composing methods (MASTEMY-DESIGN 13%)

- Worked applications: (1) Extract a well-named method from a block; (2) Inline an unnecessary variable
- Common misconception addressed: Extracting methods that each do too many things
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Extract and inline method | 60 | 5 |
| M04L02 | Replace temp with query | 60 | 5 |

### M05 Moving features (MASTEMY-DESIGN 12%)

- Worked applications: (1) Move a method to the class that uses its data; (2) Extract a cohesive class from a blob
- Common misconception addressed: Creating circular dependencies while moving code
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Move method/field | 60 | 5 |
| M05L02 | Extract class | 60 | 5 |

### M06 Simplifying conditionals (MASTEMY-DESIGN 13%)

- Worked applications: (1) Replace nested ifs with guard clauses; (2) Replace a type switch with polymorphism
- Common misconception addressed: Over-engineering simple conditionals into class hierarchies
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Decompose and consolidate conditionals | 60 | 5 |
| M06L02 | Guard clauses and polymorphism | 60 | 5 |

### M07 Refactoring tools (MASTEMY-DESIGN 12%)

- Worked applications: (1) Use an IDE rename across a codebase; (2) Choose automated extract-method safely
- Common misconception addressed: Trusting a manual rename to catch every reference
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | IDE refactorings | 60 | 5 |
| M07L02 | Automated vs manual refactoring | 60 | 5 |

### M08 Refactoring workflow (MASTEMY-DESIGN 12%)

- Worked applications: (1) Break a change into reviewable steps; (2) Introduce a seam to test legacy code
- Common misconception addressed: Doing one giant untestable refactor commit
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Small steps and commits | 60 | 5 |
| M08L02 | Refactoring legacy code incrementally | 60 | 5 |

## Integrative case

Take a long, tangled function with duplicated logic and poor names, add characterization tests, then apply a sequence of small refactorings to improve its structure without changing behaviour, justifying each step.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1567-final-protected | 40 | 40 | yes |
| MST-1567-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why refactor | 5 |
| Safety nets | 5 |
| Code smells | 5 |
| Composing methods | 5 |
| Moving features | 5 |
| Simplifying conditionals | 5 |
| Refactoring tools | 5 |
| Refactoring workflow | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1567-Q0001** (single-answer, Select ONE) Why should refactoring and adding new behaviour be kept in separate commits?

- A. So that a behaviour-preserving change is easy to verify and review separately from functional change **(key)**  
  _Rationale:_ Correct: mixing them makes it hard to tell what changed behaviour.
- B. Because refactoring always breaks tests  
  _Rationale:_ Good refactoring keeps tests green.
- C. Because commits must never contain tests  
  _Rationale:_ Tests belong with changes.
- D. Because IDEs forbid mixed commits  
  _Rationale:_ No such restriction exists.

**MST-1567-Q0002** (single-answer, Select ONE) What is the purpose of a characterization test before refactoring untested code?

- A. It captures the code's current observable behaviour so refactoring can preserve it **(key)**  
  _Rationale:_ Correct: it pins down behaviour as a safety net.
- B. It documents the desired future behaviour  
  _Rationale:_ It records current, not desired, behaviour.
- C. It replaces the need for refactoring  
  _Rationale:_ It enables safe refactoring.
- D. It measures performance  
  _Rationale:_ It characterises behaviour, not speed.

**MST-1567-Q0003** (multiple-answer, Select ALL that apply) Which are recognised code smells with standard refactorings? (Select TWO)

- A. Long method, addressed by Extract Method **(key)**  
  _Rationale:_ Correct: extracting smaller methods improves readability.
- B. Duplicated code, addressed by extracting a shared method **(key)**  
  _Rationale:_ Correct: removing duplication reduces maintenance cost.
- C. Having unit tests for a class  
  _Rationale:_ False; tests are desirable, not a smell.
- D. Using descriptive variable names  
  _Rationale:_ False; good names are the goal, not a smell.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
