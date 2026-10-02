# Salesforce Certified Business Analyst Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1814` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION: not confirmed (official source not verified) |
| Version basis | DESIGN ASSUMPTION - official outline not verified (network egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - no official source fetched; confirm outline, weightings and item counts before SME review |
| Legacy IDs | MST-BUS-SFDC-BA-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the role of a Salesforce business analyst across the customer and project lifecycle
2. Elicit, document and manage requirements, user stories and acceptance criteria
3. Facilitate discovery, process mapping and stakeholder collaboration
4. Support user acceptance testing, change management and Salesforce-specific delivery practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 The Salesforce BA Role and Discovery (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Map a current-state case process and identify improvement points; (2) Run a stakeholder analysis for a cross-department rollout
- Common misconception addressed: Thinking the BA's job is to decide the solution rather than frame the problem
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The BA role, mindset and the Salesforce delivery lifecycle | 120 | 6 |
| M01L02 | Discovery, stakeholder analysis and facilitation techniques | 120 | 6 |
| M01L03 | Business process mapping (current vs future state) | 120 | 6 |

### M02 Requirements and User Stories (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Rewrite a vague requirement as a user story with acceptance criteria; (2) Prioritise a backlog using MoSCoW and capacity
- Common misconception addressed: Confusing a solution request with a business requirement
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Eliciting and documenting requirements and business needs | 120 | 6 |
| M02L02 | Writing user stories, acceptance criteria and definitions of done | 120 | 6 |
| M02L03 | Prioritisation (e.g. MoSCoW) and managing the backlog | 120 | 6 |

### M03 Delivery, UAT and Adoption (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Write UAT test cases from acceptance criteria; (2) Plan an adoption approach including training and metrics
- Common misconception addressed: Assuming go-live equals adoption without a change plan
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Collaboration with admins/developers and Salesforce capabilities | 120 | 6 |
| M03L02 | User acceptance testing: planning, test cases and sign-off | 120 | 6 |
| M03L03 | Change management, training and measuring adoption | 120 | 6 |

## Integrative case

A BA joins a Service Cloud rollout: run discovery, map the current and future case process, write prioritised user stories with acceptance criteria, and plan UAT and user adoption.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified; the official question count and duration are unknown. Confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1814-practice-form-A | 45 | 45 | yes |
| MST-1814-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1814-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1814-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| The Salesforce BA Role and Discovery | 15 |
| Requirements and User Stories | 15 |
| Delivery, UAT and Adoption | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1814-Q0001** (single-answer, Select ONE) Which best describes a well-formed user story?

- A. As a [role], I want [capability], so that [benefit] - with clear acceptance criteria **(key)**  
  _Rationale:_ Correct: a user story states role, need and benefit and is testable via acceptance criteria.
- B. A detailed technical design document  
  _Rationale:_ That is a design artefact, not a user story.
- C. A list of database tables  
  _Rationale:_ A user story captures a need from the user's perspective, not schema.
- D. A signed contract  
  _Rationale:_ A contract is a commercial document, not a user story.

**MST-1814-Q0002** (single-answer, Select ONE) A stakeholder says 'add a button that creates a renewal record.' What should the BA do first?

- A. Explore the underlying business need and problem being solved **(key)**  
  _Rationale:_ Correct: the BA frames the problem before accepting a prescribed solution, ensuring the real need is met.
- B. Immediately build the button  
  _Rationale:_ Jumping to a solution risks solving the wrong problem.
- C. Reject the request outright  
  _Rationale:_ The request is input; the BA should understand the need, not dismiss it.
- D. Escalate to legal  
  _Rationale:_ There is no legal issue indicated; discovery of the need comes first.

**MST-1814-Q0003** (multiple-answer, Select TWO) Which TWO are good uses of acceptance criteria?

- A. They define when a story is done and testable **(key)**  
  _Rationale:_ Correct: acceptance criteria set the conditions of satisfaction for a story.
- B. They give UAT testers the basis for test cases **(key)**  
  _Rationale:_ Correct: UAT test cases are derived from acceptance criteria.
- C. They replace the need for any stakeholder involvement  
  _Rationale:_ Stakeholder involvement remains essential throughout.
- D. They specify the server hardware  
  _Rationale:_ Acceptance criteria describe behaviour, not infrastructure.
- E. They are written only after go-live  
  _Rationale:_ They are defined before development, not after go-live.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
