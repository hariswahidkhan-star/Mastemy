# Low-Code Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1600` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-LCD-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Low-Code Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Low-code foundations
2. Data modelling
3. Building UIs
4. Workflow automation
5. Integrations
6. Governance
7. Extensibility
8. Lifecycle and quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on building applications with low-code platforms; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Low-code foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Define low-code vs no-code vs pro-code; (2) Identify a good low-code use case
- Common misconception addressed: Assuming low-code can replace all custom development
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What low-code/no-code is | 75 | 5 |
| M01L02 | Where it fits and its limits | 75 | 5 |

### M02 Data modelling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Model a data table with relationships; (2) Add field validation rules
- Common misconception addressed: Designing a flat structure that cannot scale or relate data
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tables, fields and relationships | 75 | 5 |
| M02L02 | Data types and validation | 75 | 5 |

### M03 Building UIs (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a form bound to a table; (2) Create a filtered list view
- Common misconception addressed: Overloading one screen with every field and action
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Forms and views | 75 | 5 |
| M03L02 | Layout and components | 75 | 5 |

### M04 Workflow automation (MASTEMY-DESIGN 13%)

- Worked applications: (1) Automate an approval on record creation; (2) Add a condition to branch a flow
- Common misconception addressed: Building a tangled flow with no error handling
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Triggers and actions | 75 | 5 |
| M04L02 | Conditional logic in flows | 75 | 5 |

### M05 Integrations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Connect to an external service via a connector; (2) Call a REST API from a flow
- Common misconception addressed: Hardcoding credentials in an integration step
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Connectors and APIs | 75 | 5 |
| M05L02 | Calling external services | 75 | 5 |

### M06 Governance (MASTEMY-DESIGN 13%)

- Worked applications: (1) Restrict a view by user role; (2) Promote an app across environments
- Common misconception addressed: Letting citizen developers ship ungoverned apps
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Access control and roles | 75 | 5 |
| M06L02 | Environments and ALM | 75 | 5 |

### M07 Extensibility (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add a custom component or script; (2) Decide when to move to pro-code
- Common misconception addressed: Forcing complex logic into low-code it was never meant for
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Custom code and components | 75 | 5 |
| M07L02 | When to escape low-code | 75 | 5 |

### M08 Lifecycle and quality (MASTEMY-DESIGN 12%)

- Worked applications: (1) Test an app's critical flow; (2) Document an app for handover
- Common misconception addressed: Shipping with no testing, docs or owner
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Testing low-code apps | 75 | 5 |
| M08L02 | Maintenance and documentation | 75 | 5 |

## Integrative case

Deliver an internal app on a low-code platform: model data, build forms and views, add workflow automation and integrations, apply basic governance and access control, and decide honestly when low-code fits and when custom code is warranted.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1600-final-protected | 40 | 40 | yes |
| MST-1600-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Low-code foundations | 5 |
| Data modelling | 5 |
| Building UIs | 5 |
| Workflow automation | 5 |
| Integrations | 5 |
| Governance | 5 |
| Extensibility | 5 |
| Lifecycle and quality | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1600-Q0001** (single-answer, Select ONE) When is a low-code platform generally a good fit?

- A. For internal/line-of-business apps with standard data, forms and workflow needs delivered quickly **(key)**  
  _Rationale:_ Correct: low-code excels at common business apps built fast.
- B. For every system regardless of complexity or scale  
  _Rationale:_ Low-code has real limits for complex/high-scale needs.
- C. Only for apps that never touch data  
  _Rationale:_ Data handling is a core low-code strength.
- D. Only when no business users will ever use it  
  _Rationale:_ Low-code often targets business users.

**MST-1600-Q0002** (single-answer, Select ONE) Why does governance matter when citizen developers build low-code apps?

- A. Without access control, environments and oversight, ungoverned apps create security and maintenance risks **(key)**  
  _Rationale:_ Correct: governance keeps proliferation safe and supportable.
- B. Governance makes apps run faster  
  _Rationale:_ It is about control, not performance.
- C. Governance removes the need for data modelling  
  _Rationale:_ Data modelling is still required.
- D. Governance converts the app to custom code  
  _Rationale:_ It does not change the implementation.

**MST-1600-Q0003** (multiple-answer, Select ALL that apply) Which statements about low-code development are correct? (Select TWO)

- A. Many platforms allow custom code or components to extend beyond built-in features **(key)**  
  _Rationale:_ Correct: extensibility handles cases the visual tools cannot.
- B. Complex, high-scale, or highly bespoke systems may be better as pro-code **(key)**  
  _Rationale:_ Correct: recognising low-code's limits is part of the skill.
- C. Low-code eliminates any need for data modelling  
  _Rationale:_ False; a sound data model is still essential.
- D. Credentials should be hardcoded into integration steps  
  _Rationale:_ False; secrets belong in managed connections, not hardcoded.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
