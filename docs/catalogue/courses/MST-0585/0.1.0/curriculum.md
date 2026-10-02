# Prompt Engineering for Technical Writing and Code Tasks

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0585` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Prompt Engineering for Technical Writing and Code Tasks (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Prompt models to produce grounded, well-structured technical writing
2. Prompt models for code generation, explanation and refactoring
3. Keep style, terminology and facts consistent across outputs
4. Verify technical accuracy and iterate on feedback

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Prompting for technical writing (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Prompt the model to draft reference docs from a function signature and notes; (2) Constrain the output to a house style and audience
- Common misconception addressed: Letting the model invent behaviour that the code does not actually have
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Drafting docs and references | 80 | 5 |
| M01L02 | Controlling tone, structure and audience | 80 | 5 |
| M01L03 | Keeping facts grounded | 80 | 5 |

### M02 Prompting for code tasks (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Prompt for a refactor and require the behaviour to be preserved; (2) Generate tests that actually exercise the changed behaviour
- Common misconception addressed: Merging generated code because it looks plausible without reviewing it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generating and explaining code | 80 | 5 |
| M02L02 | Refactoring and test generation | 80 | 5 |
| M02L03 | Reviewing AI code safely | 80 | 5 |

### M03 Quality and consistency (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Enforce a glossary so terms are used consistently across documents; (2) Check a generated explanation against the real code behaviour
- Common misconception addressed: Assuming fluent documentation is therefore technically accurate
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Style and terminology consistency | 80 | 5 |
| M03L02 | Verifying technical accuracy | 80 | 5 |
| M03L03 | Iterating with feedback | 80 | 5 |

## Integrative case

A team uses a model to draft API documentation and refactor code. Design prompts that keep writing grounded and consistent in terminology, generate and explain code safely, and verify technical accuracy before the outputs are merged.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0585-final-protected | 30 | 30 | yes |
| MST-0585-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Prompting for technical writing | 10 |
| Prompting for code tasks | 10 |
| Quality and consistency | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0585-Q0001** (single-answer, Select ONE) You prompt a model to document an API from its signatures and notes. What most protects accuracy?

- A. Ground the draft in the provided signatures and notes and verify claims against the code **(key)**  
  _Rationale:_ Correct: grounding plus verification keeps the docs faithful to real behaviour.
- B. Let the model describe how the API probably behaves  
  _Rationale:_ 'Probably' invites invented behaviour.
- C. Ask only for a longer document  
  _Rationale:_ Length does not improve accuracy.
- D. Skip the notes and rely on the model's training data  
  _Rationale:_ Ignoring the source causes drift from reality.

**MST-0585-Q0002** (multiple-answer, Select TWO) Which TWO practices make AI code refactoring safer? (Select TWO.) (Select TWO.)

- A. Require that the refactor preserve existing behaviour and back it with tests **(key)**  
  _Rationale:_ Correct: behaviour-preserving refactors verified by tests are safer.
- B. Review the generated diff before merging **(key)**  
  _Rationale:_ Correct: human review catches issues the model introduces.
- C. Merge immediately if the code looks plausible  
  _Rationale:_ Plausibility is not correctness.
- D. Delete the existing tests to avoid conflicts  
  _Rationale:_ Removing tests hides regressions.

**MST-0585-Q0003** (single-answer, Select ONE) A generated explanation of a function reads clearly and fluently. What should you do?

- A. Check it against the function's actual behaviour before trusting it **(key)**  
  _Rationale:_ Correct: fluent prose can still misdescribe what the code does.
- B. Publish it because it reads well  
  _Rationale:_ Readability is not accuracy.
- C. Assume fluent means correct  
  _Rationale:_ Fluency and correctness are independent.
- D. Skip verification for documentation  
  _Rationale:_ Technical docs require accuracy checks.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
