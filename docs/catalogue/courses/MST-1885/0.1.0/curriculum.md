# Model Governance, Documentation and Model Cards

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1885` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Model Governance, Documentation and Model Cards (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain model governance and its place in the AI lifecycle
2. Describe the purpose and typical contents of a model card and a datasheet for datasets
3. Document a model's intended use, limitations and out-of-scope uses clearly
4. Design a model inventory and versioning and approval workflow
5. Plan model monitoring, revalidation and retirement
6. Communicate model documentation to technical and non-technical audiences

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Model governance and lifecycle (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draw the governance touchpoints across a model's lifecycle; (2) Decide what to govern for a bought vs built model
- Common misconception addressed: Thinking governance starts only after deployment
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What model governance covers and why | 120 | 7 |
| M01L02 | Governance across build, deploy, monitor, retire | 120 | 7 |

### M02 Documentation artefacts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write a model card for a sentiment classifier; (2) Create a datasheet entry documenting a dataset's provenance
- Common misconception addressed: Copying marketing claims into a model card instead of evidence
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Model cards: purpose and contents | 120 | 7 |
| M02L02 | Dataset documentation and provenance | 120 | 7 |

### M03 Intended use and limitations (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write intended-use and out-of-scope-use statements; (2) Describe the evaluation context so results are not over-generalised
- Common misconception addressed: Omitting limitations to make the model look better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Specifying intended and out-of-scope use | 120 | 7 |
| M03L02 | Stating limitations and evaluation context honestly | 120 | 7 |

### M04 Inventory, monitoring and retirement (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design a model inventory schema and version scheme; (2) Define monitoring signals and a retirement trigger
- Common misconception addressed: Leaving a superseded model silently in production
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Model inventory, versioning and approval | 120 | 7 |
| M04L02 | Monitoring, revalidation and retirement | 120 | 7 |

## Integrative case

A fintech must bring ten production models under governance: define lifecycle touchpoints, write model cards and dataset documentation, state intended and out-of-scope use, and set up an inventory with monitoring, revalidation and retirement.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1885-final-protected | 40 | 40 | yes |
| MST-1885-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Model governance and lifecycle | 10 |
| Documentation artefacts | 10 |
| Intended use and limitations | 10 |
| Inventory, monitoring and retirement | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1885-Q0001** (single-answer, Select ONE) Why does a model card include 'out-of-scope uses' and not only intended uses?

- A. It warns against foreseeable misuse the evaluation does not support, reducing harm from over-generalisation **(key)**  
  _Rationale:_ Correct: out-of-scope statements guard against unsupported misuse.
- B. To make the document longer for auditors  
  _Rationale:_ It serves a safety purpose, not length.
- C. Because intended uses are optional  
  _Rationale:_ Intended uses are still required; out-of-scope complements them.
- D. To transfer all liability to the user  
  _Rationale:_ A disclaimer does not transfer accountability; it informs use.

**MST-1885-Q0002** (multiple-answer, Select TWO) Which TWO items most belong in a model card? (Select TWO.)

- A. The evaluation data and metrics, with their conditions **(key)**  
  _Rationale:_ Correct: evaluation details are core model-card content.
- B. Known limitations and conditions under which performance degrades **(key)**  
  _Rationale:_ Correct: limitations are core model-card content.
- C. The marketing tagline for the product  
  _Rationale:_ Marketing copy is not model documentation.
- D. The CEO's biography  
  _Rationale:_ Unrelated to the model's documentation.

**MST-1885-Q0003** (single-answer, Select ONE) A model is replaced by a better version but the old one still serves some traffic unnoticed. Which governance control was missing?

- A. A model inventory with versioning and a retirement trigger **(key)**  
  _Rationale:_ Correct: inventory and retirement controls prevent orphaned models in production.
- B. A larger training dataset  
  _Rationale:_ Dataset size does not prevent orphaned deployments.
- C. A higher accuracy threshold  
  _Rationale:_ Accuracy does not address retirement.
- D. A longer model card  
  _Rationale:_ Documentation length does not retire a model.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
