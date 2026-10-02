# Salesforce Certified Platform Administrator II (Advanced) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1811` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed from an official source (kept out of official_exam_code) |
| Version basis | DESIGN ASSUMPTION - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02) |
| Legacy IDs | MST-BUS-SFDC-ADVADM-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply advanced security, sharing and data-access configuration in Salesforce
2. Build advanced automation with flows and evaluate declarative automation choices
3. Configure advanced reporting, analytics and data management
4. Manage change, deployment, auditing and troubleshooting in a Salesforce org

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> **Module structure, titles and all weightings below are DESIGN ASSUMPTIONS.** The official exam outline could not be fetched (network egress blocked on 2026-10-02) and must be confirmed against the issuer's official source before SME review and publication.

## Modules

### M01 Advanced Security, Access and Sharing (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Diagnose why a user cannot see a record using the sharing model; (2) Replace a profile-heavy setup with permission set groups
- Common misconception addressed: Assuming a role high in the hierarchy automatically grants access regardless of org-wide defaults and object permissions
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Org-wide defaults, role hierarchy and sharing rules | 120 | 6 |
| M01L02 | Permission sets, permission set groups and least privilege | 120 | 6 |
| M01L03 | Record access troubleshooting and restriction rules | 120 | 6 |

### M02 Advanced Automation and Process Design (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Select the correct flow type for a before-save field update; (2) Add fault handling to a flow that calls an external action
- Common misconception addressed: Believing more automations on the same object are independent, ignoring order of execution and recursion
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Flow types: record-triggered, screen and scheduled flows | 120 | 6 |
| M02L02 | Choosing the right declarative tool and order of execution | 120 | 6 |
| M02L03 | Error handling, bulkification and flow best practices | 120 | 6 |

### M03 Analytics, Data Management, Deployment and Change (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Build a joined/summary report with cross-object data; (2) Plan a change-set deployment path through sandboxes to production
- Common misconception addressed: Deploying automation straight to production without sandbox testing
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Advanced reports, report types and dashboards | 120 | 6 |
| M03L02 | Data quality, import/export and duplicate management | 120 | 6 |
| M03L03 | Change sets, sandboxes, auditing and troubleshooting | 120 | 6 |

## Integrative case

An admin inherits a growing Salesforce org with overlapping sharing rules, tangled flows and slow reports: redesign the sharing model for least privilege, consolidate automation into flows, build a management dashboard, and plan a safe deployment.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source was not fetched; official question count, duration and domain weightings must be confirmed on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1811-practice-form-A | 45 | 45 | yes |
| MST-1811-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1811-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1811-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Advanced Security, Access and Sharing | 15 |
| Advanced Automation and Process Design | 15 |
| Analytics, Data Management, Deployment and Change | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1811-Q0001** (single-answer, Select ONE) Object-level org-wide default for an object is Private. What is the most appropriate way to give a specific group broader read access to those records?

- A. Create a sharing rule (or use roles/permission sets) to open access for that group **(key)**  
  _Rationale:_ Correct: with Private OWD, sharing rules, role hierarchy or sharing-granting mechanisms widen access.
- B. Change the object's field-level security  
  _Rationale:_ Field-level security controls fields, not record visibility.
- C. Delete the role hierarchy  
  _Rationale:_ Deleting the role hierarchy removes, not grants, access.
- D. Set the OWD to Private more strictly  
  _Rationale:_ That narrows access further, the opposite of the goal.

**MST-1811-Q0002** (single-answer, Select ONE) You need to update a field on the same record before it is saved, with no external callout. Which is the most efficient choice?

- A. A before-save record-triggered flow **(key)**  
  _Rationale:_ Correct: a before-save record-triggered flow updates same-record fields efficiently without an extra DML.
- B. A scheduled flow that runs nightly  
  _Rationale:_ A nightly schedule does not update the record at save time.
- C. A screen flow launched manually  
  _Rationale:_ A screen flow needs user interaction; it is not for automatic before-save updates.
- D. An outbound message  
  _Rationale:_ An outbound message sends data externally; it does not set a field before save.

**MST-1811-Q0003** (multiple-answer, Select TWO) Select TWO practices that support a safe deployment of configuration changes to a Salesforce production org.

- A. Testing changes in a sandbox before deploying **(key)**  
  _Rationale:_ Correct: validating in a sandbox reduces the risk of breaking production.
- B. Using change sets or a deployment tool to migrate metadata **(key)**  
  _Rationale:_ Correct: change sets / deployment tools provide a controlled migration path.
- C. Editing automation directly in production during business hours  
  _Rationale:_ Direct production edits are risky and bypass testing.
- D. Deleting the sandbox before validating the change  
  _Rationale:_ Removing the test environment defeats safe deployment.
- E. Skipping backups of affected data  
  _Rationale:_ Skipping backups increases risk during deployment.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
