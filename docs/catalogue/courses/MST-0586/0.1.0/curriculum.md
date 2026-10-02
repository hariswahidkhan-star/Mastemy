# Prompt Evaluation, Versioning, and Regression Testing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0586` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Prompt Evaluation, Versioning, and Regression Testing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define evaluation criteria and datasets for prompts
2. Version prompts and manage changes with documentation
3. Build regression tests that detect quality drift
4. Integrate prompt evaluation into a change workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Evaluating prompts (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Build a labelled evaluation set for a classification prompt; (2) Design a rubric for a human evaluation of summaries
- Common misconception addressed: Judging a prompt change from a couple of hand-picked examples
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining evaluation criteria and datasets | 80 | 5 |
| M01L02 | Automated and human evaluation | 80 | 5 |
| M01L03 | Scoring and rubrics | 80 | 5 |

### M02 Versioning prompts (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Record a prompt change with its version, rationale and eval scores; (2) Compare two prompt versions on the same evaluation set
- Common misconception addressed: Editing a production prompt in place with no version history
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Managing prompt versions | 80 | 5 |
| M02L02 | Change control and documentation | 80 | 5 |
| M02L03 | A/B comparison | 80 | 5 |

### M03 Regression testing (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add a regression set that must pass before a prompt change ships; (2) Detect a quality regression introduced by a prompt edit
- Common misconception addressed: Assuming a prompt that improves one metric has not regressed others
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building regression test sets | 80 | 5 |
| M03L02 | Detecting quality drift | 80 | 5 |
| M03L03 | CI for prompt changes | 80 | 5 |

## Integrative case

A production prompt is updated frequently. Define evaluation criteria and a labelled set, version each prompt change with documentation, run regression tests to catch drift, and gate changes on evaluation results in CI.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0586-final-protected | 30 | 30 | yes |
| MST-0586-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Evaluating prompts | 10 |
| Versioning prompts | 10 |
| Regression testing | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0586-Q0001** (single-answer, Select ONE) You changed a production prompt. What is the most reliable way to judge whether it improved?

- A. Compare old and new versions on a labelled evaluation set with defined criteria **(key)**  
  _Rationale:_ Correct: a labelled set with criteria gives a comparable, repeatable measure.
- B. Try a couple of examples by hand and trust your impression  
  _Rationale:_ Anecdotal spot checks are not reliable evidence.
- C. Ship it and wait for complaints  
  _Rationale:_ Shipping untested risks silent regressions.
- D. Pick whichever version has the longer prompt  
  _Rationale:_ Prompt length is not a quality measure.

**MST-0586-Q0002** (multiple-answer, Select TWO) Which TWO practices support safe prompt changes over time? (Select TWO.) (Select TWO.)

- A. Version each prompt with its rationale and evaluation scores **(key)**  
  _Rationale:_ Correct: versioning with evidence makes changes auditable and reversible.
- B. Run a regression set before each change ships **(key)**  
  _Rationale:_ Correct: regression tests catch drift from an edit.
- C. Edit the live prompt directly with no record  
  _Rationale:_ In-place edits lose history and auditability.
- D. Optimise only a single metric and ignore the rest  
  _Rationale:_ A single-metric focus can hide regressions elsewhere.

**MST-0586-Q0003** (single-answer, Select ONE) A prompt edit improves accuracy on one metric. Why is that not enough to ship it?

- A. It may have regressed other behaviours; a regression set across metrics is needed **(key)**  
  _Rationale:_ Correct: gains on one metric can mask losses on others.
- B. One improved metric proves the change is strictly better  
  _Rationale:_ A single metric does not capture all behaviours.
- C. Regression testing is unnecessary once accuracy rises  
  _Rationale:_ Regression testing guards exactly against such trade-offs.
- D. Other metrics never change when one improves  
  _Rationale:_ Metrics frequently trade off against each other.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
