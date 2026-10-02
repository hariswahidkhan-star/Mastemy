# Production Readiness Reviews for AI-Generated Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0580` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Production Readiness Reviews for AI-Generated Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define production-readiness criteria for AI-generated applications
2. Review AI-generated code for correctness, security and licensing
3. Assess observability, performance and operational readiness
4. Plan rollout, rollback and accountability for sign-off

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Readiness criteria (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Draft a readiness checklist for an AI-generated service; (2) Audit dependencies for known vulnerabilities and licences
- Common misconception addressed: Treating 'it runs locally' as evidence of production readiness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining production-readiness checklists | 80 | 5 |
| M01L02 | Security and dependency review | 80 | 5 |
| M01L03 | Observability and logging | 80 | 5 |

### M02 Reviewing AI-generated code (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Confirm that a generated module's tests actually exercise its behaviour; (2) Identify a call to a non-existent or deprecated API in generated code
- Common misconception addressed: Assuming AI-generated code is correct because it compiles and the tests are green
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Verifying correctness and tests | 80 | 5 |
| M02L02 | Checking for hallucinated APIs and licences | 80 | 5 |
| M02L03 | Performance and resource review | 80 | 5 |

### M03 Sign-off and operations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Write a rollout plan with a tested rollback path; (2) Assign a named owner accountable for the AI-generated service
- Common misconception addressed: Shipping AI-generated code with no named human owner
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rollout and rollback planning | 80 | 5 |
| M03L02 | On-call and incident readiness | 80 | 5 |
| M03L03 | Documenting accountability for AI code | 80 | 5 |

## Integrative case

An application built largely by AI tools is proposed for production. Run a readiness review: verify correctness and tests, check for hallucinated APIs and licence issues, confirm observability and rollback, and document who is accountable before sign-off.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0580-final-protected | 30 | 30 | yes |
| MST-0580-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Readiness criteria | 10 |
| Reviewing AI-generated code | 10 |
| Sign-off and operations | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0580-Q0001** (single-answer, Select ONE) During a readiness review of an AI-generated service, the tests are green. What is the right conclusion?

- A. Green tests are necessary but not sufficient; confirm the tests meaningfully exercise the behaviour **(key)**  
  _Rationale:_ Correct: AI-generated tests can be shallow or tautological, so their coverage must be reviewed.
- B. Green tests prove the service is production-ready  
  _Rationale:_ Passing tests alone do not establish readiness.
- C. Green tests mean security review can be skipped  
  _Rationale:_ Security review is independent of unit-test status.
- D. Green tests remove the need for a rollback plan  
  _Rationale:_ Rollback planning is always required for production.

**MST-0580-Q0002** (multiple-answer, Select TWO) Which TWO issues are especially important to check in AI-generated code? (Select TWO.) (Select TWO.)

- A. Calls to hallucinated or non-existent APIs and libraries **(key)**  
  _Rationale:_ Correct: models can invent plausible-looking but non-existent APIs.
- B. Licences of any introduced dependencies **(key)**  
  _Rationale:_ Correct: generated code may pull in dependencies with incompatible licences.
- C. Whether the code uses the newest syntax available  
  _Rationale:_ Syntax novelty is not a readiness criterion.
- D. Whether the prompt that produced it was long  
  _Rationale:_ Prompt length says nothing about code safety or correctness.

**MST-0580-Q0003** (single-answer, Select ONE) What must a production-readiness sign-off include for an AI-generated application?

- A. A named human owner accountable for the service and a tested rollback plan **(key)**  
  _Rationale:_ Correct: clear accountability and a rollback path are essential for sign-off.
- B. A statement that the AI tool is responsible for the code  
  _Rationale:_ Accountability cannot be assigned to a tool.
- C. Only a screenshot of the app running  
  _Rationale:_ A screenshot is not evidence of readiness.
- D. A promise to add tests later  
  _Rationale:_ Deferring tests undermines the readiness review.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
