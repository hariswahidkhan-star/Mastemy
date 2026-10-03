# Building Information Modeling (BIM) Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2206` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Building Information Modeling (BIM) Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what BIM is and how it differs from traditional 2D drawing
2. Describe the BIM dimensions, levels of information need and model uses
3. Identify the roles, standards and the common data environment in a BIM workflow
4. Explain federated models, clash detection and coordination
5. Relate BIM data to cost, scheduling and asset handover
6. Recognise common BIM pitfalls and that product and standard specifics must be verified

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 BIM concepts (25% (design weight), design weight)

- Worked applications: (1) Explain the difference between a model and a drawing to a client; (2) Match a model use to a project goal
- Common misconception addressed: Thinking BIM is just a 3D picture
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What BIM is and why it matters | 120 | 7 |
| M01L02 | BIM dimensions and levels of information need | 120 | 7 |

### M02 Information and standards (25% (design weight), design weight)

- Worked applications: (1) Describe what a common data environment provides; (2) Decide what information a model should and should not carry
- Common misconception addressed: Equating a detailed model with an accurate one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Roles, standards and the common data environment | 120 | 7 |
| M02L02 | Information requirements and model quality | 120 | 7 |

### M03 Coordination and clash detection (25% (design weight), design weight)

- Worked applications: (1) Interpret a clash report from a federated model; (2) Prioritise clashes for a coordination meeting
- Common misconception addressed: Treating every geometric clash as equally urgent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Federated models and model coordination | 120 | 7 |
| M03L02 | Clash detection and issue resolution | 120 | 7 |

### M04 BIM across the lifecycle (25% (design weight), design weight)

- Worked applications: (1) Link model quantities to a cost estimate; (2) Specify asset data needed for handover
- Common misconception addressed: Assuming the design model is ready-made for facilities management
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Linking BIM to cost and schedule | 120 | 7 |
| M04L02 | Handover, asset data and facilities management | 120 | 7 |

## Integrative case

An owner wants a mid-size clinic delivered with BIM: define the model uses and information requirements, set up a common data environment and roles, run coordination and clash detection across federated models, and plan how model data flows into cost, schedule and asset handover. Specific products and standard clauses must be confirmed at production.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2206-final-protected | 40 | 40 | yes |
| MST-2206-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BIM concepts | 10 |
| Information and standards | 10 |
| Coordination and clash detection | 10 |
| BIM across the lifecycle | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2206-Q0001** (single-answer, Select ONE) How does a BIM model primarily differ from a traditional 2D CAD drawing?

- A. It is a data-rich, object-based model carrying information, not just lines representing geometry **(key)**  
  _Rationale:_ Correct: BIM objects carry data, unlike plain geometric lines.
- B. It can only ever be viewed in black and white  
  _Rationale:_ Colour is not the distinguishing feature of BIM.
- C. It removes the need for any coordination between disciplines  
  _Rationale:_ BIM supports coordination; it does not remove the need for it.
- D. It is simply a larger paper drawing  
  _Rationale:_ BIM is a data model, not a bigger drawing.

**MST-2206-Q0002** (multiple-answer, Select TWO) Which TWO are purposes of a common data environment (CDE)? (Select TWO.)

- A. To provide a single, managed source of project information **(key)**  
  _Rationale:_ Correct: a CDE centralises and manages project information.
- B. To control the status and sharing of information between parties **(key)**  
  _Rationale:_ Correct: a CDE manages information status and sharing.
- C. To automatically design the building without input  
  _Rationale:_ A CDE stores and manages information; it does not auto-design.
- D. To replace the project team  
  _Rationale:_ A CDE supports the team; it does not replace it.

**MST-2206-Q0003** (single-answer, Select ONE) A clash report lists hundreds of clashes. What is the best next step before a coordination meeting?

- A. Filter and prioritise clashes by significance so real conflicts are addressed first **(key)**  
  _Rationale:_ Correct: prioritising by significance focuses effort on real issues.
- B. Treat all clashes as equally critical and fix them randomly  
  _Rationale:_ Not all clashes matter equally; many are tolerances or duplicates.
- C. Delete the clashing elements from the model  
  _Rationale:_ Deleting elements hides problems rather than resolving them.
- D. Ignore the report because software found the clashes  
  _Rationale:_ Automated detection still needs human review and resolution.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
