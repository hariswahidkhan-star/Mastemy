# Salesforce Certified Platform Developer I Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1518` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION: not confirmed (official source not verified) |
| Version basis | DESIGN ASSUMPTION - official outline not verified (network egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - no official source fetched; confirm outline, weightings and item counts before SME review |
| Legacy IDs | MST-PRG-SF-PD1-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the Salesforce declarative data model, objects, fields, relationships and schema
2. Build business logic with Apex classes, triggers, SOQL/SOSL and exception handling
3. Build user interfaces with Lightning Web Components, Visualforce and Lightning concepts
4. Apply testing, debugging, deployment and the order of execution and governor limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Salesforce Fundamentals, Data Modelling and Logic Declaratively (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Choose declarative vs Apex for three automation requirements; (2) Model a many-to-many relationship with a junction object
- Common misconception addressed: Writing Apex for logic that a formula field or flow could handle
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Platform, MVC and the declarative vs programmatic decision | 120 | 6 |
| M01L02 | Objects, fields, relationships (lookup, master-detail, junction) and schema | 120 | 6 |
| M01L03 | Formula fields, validation rules, flows and when to write code instead | 120 | 6 |

### M02 Apex Programming, SOQL/SOSL and the Order of Execution (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Bulkify a trigger that otherwise hits the SOQL-in-loop limit; (2) Trace the save order of execution for a record with a trigger and a workflow
- Common misconception addressed: Doing SOQL or DML inside a for loop and hitting governor limits
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Apex classes, interfaces, collections and control flow | 120 | 6 |
| M02L02 | Triggers, trigger context variables and the order of execution | 120 | 6 |
| M02L03 | SOQL, SOSL, DML, bulkification, governor limits and exception handling | 120 | 6 |

### M03 User Interfaces, Testing and Deployment (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Write a test class with Test.startTest/stopTest and meaningful assertions; (2) Expose Apex data to a Lightning Web Component with @wire
- Common misconception addressed: Assuming 75% coverage with no assertions means the tests are good
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Lightning Web Components, Aura and Visualforce basics | 120 | 6 |
| M03L02 | Testing: test classes, assertions, test data and coverage requirements | 120 | 6 |
| M03L03 | Debugging, debug logs, deployment tools and change sets/metadata API | 120 | 6 |

## Integrative case

Extend an orders app: model a custom object with relationships, add an Apex trigger that rolls up totals within governor limits, write a test class to 90%+ coverage, and surface results in a Lightning Web Component.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified; the official question count and duration are unknown. Confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1518-practice-form-A | 45 | 45 | yes |
| MST-1518-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1518-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1518-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Salesforce Fundamentals, Data Modelling and Logic Declaratively | 15 |
| Apex Programming, SOQL/SOSL and the Order of Execution | 15 |
| User Interfaces, Testing and Deployment | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1518-Q0001** (single-answer, Select ONE) Why should a developer avoid placing a SOQL query inside a for loop that iterates over many records?

- A. It can exceed the governor limit on the number of SOQL queries per transaction **(key)**  
  _Rationale:_ Correct: Salesforce enforces a per-transaction SOQL limit; querying in a loop quickly exhausts it. Query once and use collections.
- B. SOQL cannot be written inside Apex at all  
  _Rationale:_ SOQL is fully supported in Apex; the issue is querying inside loops.
- C. Loops are not allowed in Apex  
  _Rationale:_ Loops are allowed; the problem is the query placement.
- D. It improves performance and is recommended  
  _Rationale:_ It harms performance and risks limit exceptions.

**MST-1518-Q0002** (single-answer, Select ONE) Which relationship type should you use so that deleting a parent record automatically deletes its child records and the child inherits the parent's sharing?

- A. Master-detail relationship **(key)**  
  _Rationale:_ Correct: master-detail cascades deletes and the detail inherits sharing/ownership from the master.
- B. Lookup relationship  
  _Rationale:_ Lookup does not cascade delete by default and children keep their own sharing.
- C. External lookup relationship  
  _Rationale:_ External lookups point to external objects, not for cascade-delete here.
- D. Hierarchical relationship  
  _Rationale:_ Hierarchical relationships are a special self-lookup on the User object.

**MST-1518-Q0003** (multiple-answer, Select TWO) Which TWO are true about Apex unit tests on the Salesforce platform?

- A. Test methods do not commit data to the database **(key)**  
  _Rationale:_ Correct: test data is rolled back after the test runs.
- B. A minimum of 75% code coverage is required to deploy Apex to production **(key)**  
  _Rationale:_ Correct: production deployment requires at least 75% org-wide Apex coverage.
- C. Tests can see existing org data by default without (SeeAllData=true)  
  _Rationale:_ By default tests are isolated and cannot see org data unless SeeAllData=true is set.
- D. Assertions are optional and coverage alone proves correctness  
  _Rationale:_ Coverage without assertions does not verify behaviour; assertions are essential.
- E. Tests run only in production  
  _Rationale:_ Tests run in sandboxes and scratch orgs as well.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
