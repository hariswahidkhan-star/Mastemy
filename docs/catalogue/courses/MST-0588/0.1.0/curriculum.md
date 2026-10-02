# Prompt Libraries, Templates, and Enterprise Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0588` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Prompt Libraries, Templates, and Enterprise Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build reusable prompt templates with variables and structure
2. Organise prompt libraries for discovery and reuse
3. Apply governance: approval, access control and ownership
4. Manage the prompt lifecycle with versioning and auditing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Building prompt libraries (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Convert an ad-hoc prompt into a parameterised template; (2) Tag and organise prompts so teams can find and reuse them
- Common misconception addressed: Copy-pasting slightly different prompts everywhere instead of templating
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Template structure and variables | 80 | 5 |
| M01L02 | Organising and tagging prompts | 80 | 5 |
| M01L03 | Reuse and discovery | 80 | 5 |

### M02 Governance and review (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Define an approval workflow before a prompt reaches production; (2) Assign a named owner and access controls to a shared prompt
- Common misconception addressed: Letting anyone edit a production prompt without review or ownership
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Approval workflows for prompts | 80 | 5 |
| M02L02 | Access control and ownership | 80 | 5 |
| M02L03 | Auditing prompt usage | 80 | 5 |

### M03 Lifecycle management (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Deprecate an old prompt version while keeping an audit trail; (2) Document a prompt's intended use and limits for compliance
- Common misconception addressed: Removing a prompt version with no record of what changed or why
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Versioning and deprecation | 80 | 5 |
| M03L02 | Measuring prompt performance | 80 | 5 |
| M03L03 | Compliance and documentation | 80 | 5 |

## Integrative case

An organisation standardises prompts across teams. Build a template library with variables, organise it for discovery, apply approval and access controls with named owners, and manage versioning, auditing and deprecation.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0588-final-protected | 30 | 30 | yes |
| MST-0588-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Building prompt libraries | 10 |
| Governance and review | 10 |
| Lifecycle management | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0588-Q0001** (single-answer, Select ONE) Several teams keep rewriting near-identical prompts. What is the most durable fix?

- A. Create parameterised templates in a shared, tagged library for reuse **(key)**  
  _Rationale:_ Correct: templating with variables removes duplication and aids reuse.
- B. Ask each team to keep their own private copies  
  _Rationale:_ Private copies perpetuate drift and duplication.
- C. Paste the current prompt into a chat whenever needed  
  _Rationale:_ Ad-hoc pasting is not durable or discoverable.
- D. Use the longest prompt any team has written  
  _Rationale:_ Length is not a reuse strategy.

**MST-0588-Q0002** (multiple-answer, Select TWO) Which TWO governance controls belong on a production prompt library? (Select TWO.) (Select TWO.)

- A. An approval workflow before a prompt reaches production **(key)**  
  _Rationale:_ Correct: review before production is a core governance control.
- B. A named owner and access controls for each shared prompt **(key)**  
  _Rationale:_ Correct: ownership and access control establish accountability.
- C. Unrestricted edit access for everyone  
  _Rationale:_ Open editing removes accountability and review.
- D. No record of who changed what  
  _Rationale:_ Missing audit trails defeat governance.

**MST-0588-Q0003** (single-answer, Select ONE) You are retiring an old prompt version. What should always accompany the change?

- A. An audit trail recording what changed, why, and the replacement **(key)**  
  _Rationale:_ Correct: a deprecation record preserves traceability and supports rollback.
- B. Silent deletion with no record  
  _Rationale:_ Silent deletion loses history and accountability.
- C. Removing all older versions immediately  
  _Rationale:_ Abrupt removal can break dependents and erase history.
- D. Only a note in a private chat  
  _Rationale:_ A private note is not an auditable record.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
