# Business Analysis Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1749` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PMB-SK-BAF-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Business Analysis Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. The business analysis discipline
2. Stakeholders and scope
3. Requirements basics
4. Modelling the business
5. Delivering value

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on performance of the skill; applied practice comes through instructor-facilitated exercises and model-answer analysis.

## Modules

### M01 The business analysis discipline (MASTEMY-DESIGN 22%)

- Worked applications: (1) Distinguish a problem from a proposed solution; (2) Place BA activities on a lifecycle diagram
- Common misconception addressed: Thinking a BA just writes down whatever is asked for
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What business analysis is and why it matters | 58 | 6 |
| M01L02 | The BA across the delivery lifecycle | 58 | 6 |

### M02 Stakeholders and scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a stakeholder map; (2) Write a clear scope statement
- Common misconception addressed: Treating every stakeholder as equally influential
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Identifying and analysing stakeholders | 58 | 6 |
| M02L02 | Defining scope and business need | 58 | 6 |

### M03 Requirements basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify a set of requirements by type; (2) Rewrite a weak requirement to be testable
- Common misconception addressed: Writing requirements that state a design choice
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Types of requirements | 58 | 6 |
| M03L02 | Qualities of a good requirement | 58 | 6 |

### M04 Modelling the business (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick the model that answers a stakeholder question; (2) Read a simple process model for bottlenecks
- Common misconception addressed: Modelling for its own sake instead of to answer a question
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Process and data models at a glance | 57 | 6 |
| M04L02 | Choosing the right model for the question | 57 | 6 |

### M05 Delivering value (MASTEMY-DESIGN 18%)

- Worked applications: (1) Prioritise requirements with MoSCoW; (2) Link a requirement to an acceptance criterion
- Common misconception addressed: Declaring success without checking the need was met
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Prioritisation and traceability | 57 | 6 |
| M05L02 | Validation and acceptance | 57 | 6 |

## Integrative case

A small company wants a BA to 'fix the ordering system' but cannot say what is actually wrong. Apply the fundamentals: separate the problem from the requested solution, map stakeholders and scope, elicit and classify requirements, model the ordering process to find the real issue, then prioritise and validate against the business need.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1749-final-protected | 25 | 25 | yes |
| MST-1749-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The business analysis discipline | 5 |
| Stakeholders and scope | 5 |
| Requirements basics | 5 |
| Modelling the business | 5 |
| Delivering value | 5 |

Minimum reviewed item bank: 270 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1749-Q0001** (single-answer, Select ONE) A stakeholder says 'just add a new button to the screen.' What should a business analyst do first?

- A. Understand the underlying problem the button is meant to solve **(key)**  
  _Rationale:_ Correct: BAs analyse the need before accepting a stated solution.
- B. Immediately document 'add a button' as the requirement  
  _Rationale:_ This records a solution, not the underlying business need.
- C. Refuse the request outright  
  _Rationale:_ The request is a useful starting point, not something to reject.
- D. Escalate to senior management without analysis  
  _Rationale:_ Escalation is premature before the need is understood.

**MST-1749-Q0002** (multiple-answer, Select TWO) Which are qualities of a well-written requirement? (Select TWO)

- A. It is testable **(key)**  
  _Rationale:_ Correct: a requirement must be verifiable against a clear criterion.
- B. It is traceable to a business need **(key)**  
  _Rationale:_ Correct: traceability shows why the requirement exists.
- C. It specifies the exact screen layout  
  _Rationale:_ That is design detail, not a business requirement.
- D. It is deliberately vague to allow flexibility  
  _Rationale:_ Vagueness makes a requirement untestable and ambiguous.

**MST-1749-Q0003** (single-answer, Select ONE) A BA builds an elaborate data model that no stakeholder question actually needed. What principle is violated?

- A. Model to answer a question, not for its own sake **(key)**  
  _Rationale:_ Correct: models are tools to answer specific questions, not decoration.
- B. Always build the most detailed model possible  
  _Rationale:_ Detail without purpose wastes effort and obscures insight.
- C. Data models are never appropriate in BA work  
  _Rationale:_ Data models are valid when they answer a real question.
- D. Stakeholders should never see models  
  _Rationale:_ Models are often shared with stakeholders to confirm understanding.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
