# AI Output Verification and Automated Quality Gates

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0627` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — AI Output Verification and Automated Quality Gates (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define verifiable quality criteria for AI output
2. Implement automated checks: schema, rules and graders
3. Build quality gates that block or route bad output
4. Handle failures with fallbacks, retries and human review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Defining quality (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Turn a vague quality goal into verifiable criteria; (2) Decide which criteria can be automated vs need human review
- Common misconception addressed: Assuming 'looks good' is a usable quality criterion
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Verifiable criteria | 80 | 5 |
| M01L02 | Automatable vs human checks | 80 | 5 |
| M01L03 | Measuring quality | 80 | 5 |

### M02 Automated checks (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Validate output against a schema and reject malformed results; (2) Add a rule check and a model-based grader
- Common misconception addressed: Checking only format and never checking correctness or grounding
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Schema and format validation | 80 | 5 |
| M02L02 | Rule-based checks | 80 | 5 |
| M02L03 | Model-based graders | 80 | 5 |

### M03 Gates and recovery (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Assemble a gate that blocks output failing any required check; (2) Add a bounded retry and a human-review fallback
- Common misconception addressed: Letting failed output through because the gate only warns
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building the gate | 80 | 5 |
| M03L02 | Fallbacks and bounded retries | 80 | 5 |
| M03L03 | Routing to human review | 80 | 5 |

## Integrative case

A team adds automated quality gates to an AI feature: define measurable output criteria, implement schema and rule checks plus a grader, assemble a gate that blocks or routes output that fails, and design fallbacks, bounded retries and human review for the cases a gate rejects.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0627-final-protected | 30 | 30 | yes |
| MST-0627-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Defining quality | 10 |
| Automated checks | 10 |
| Gates and recovery | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0627-Q0001** (single-answer, Select ONE) Why is 'the output should look good' a poor quality criterion for an automated gate?

- A. It is not measurable, so a machine cannot verify it **(key)**  
  _Rationale:_ Correct: gates need verifiable criteria a check can evaluate.
- B. It is too strict for any model  
  _Rationale:_ The problem is vagueness, not strictness.
- C. It uses too many tokens  
  _Rationale:_ Token usage is unrelated to the criterion's measurability.
- D. Looking good is never important  
  _Rationale:_ It can matter, but it must be made measurable to gate on.

**MST-0627-Q0002** (multiple-answer, Select TWO) Which TWO belong in a robust AI output quality gate? (Select TWO.)

- A. Schema validation that rejects malformed structure **(key)**  
  _Rationale:_ Correct: schema checks catch structurally invalid output.
- B. A correctness or grounding check beyond format **(key)**  
  _Rationale:_ Correct: format alone does not confirm the content is right.
- C. Only a check that the response is non-empty  
  _Rationale:_ Non-empty is far too weak to be the only check.
- D. No checks, trusting the model fully  
  _Rationale:_ Trusting output ungated defeats the purpose of a gate.

**MST-0627-Q0003** (single-answer, Select ONE) Output fails a required check in the gate. What should a well-designed gate do?

- A. Block the output and route it to a fallback, bounded retry or human review **(key)**  
  _Rationale:_ Correct: a gate must stop failing output and route it, not merely warn.
- B. Pass it through with a warning in the logs  
  _Rationale:_ A warning-only gate still ships bad output.
- C. Retry forever until it passes  
  _Rationale:_ Unbounded retries can loop and overspend.
- D. Delete the check so it passes  
  _Rationale:_ Removing the check defeats the gate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
