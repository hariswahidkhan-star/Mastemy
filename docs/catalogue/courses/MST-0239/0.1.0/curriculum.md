# Salesforce Certified Platform Administrator

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0239` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: Certified Administrator (assumed designation) (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official Salesforce exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | MST-BUS-SFDC-ADM-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Configure and set up a Salesforce org
2. Manage objects, applications and user productivity
3. Automate processes and manage data and analytics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Configuration and Setup (design assumption - weight not verified)

- Worked applications: (1) Configure a role hierarchy and sharing rules; (2) Set up a permission set for a contractor
- Common misconception addressed: Confusing profiles with permission sets
- Module check: 27 items / 27 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Company settings and user setup | 216 | 6 |
| M01L02 | Security and access | 216 | 6 |

### M02 Object Manager and Lightning App Builder (design assumption - weight not verified)

- Worked applications: (1) Create a custom object with a lookup relationship; (2) Build a Lightning record page with dynamic visibility
- Common misconception addressed: Using a master-detail relationship where a lookup is needed
- Module check: 27 items / 27 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Standard and custom objects | 216 | 6 |
| M02L02 | Fields, page layouts and Lightning pages | 216 | 6 |

### M03 Sales and Marketing Applications (design assumption - weight not verified)

- Worked applications: (1) Configure a sales path with stage guidance; (2) Set up lead conversion mapping
- Common misconception addressed: Assuming every record change needs a new object
- Module check: 27 items / 27 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Leads, opportunities and the sales process | 216 | 6 |

### M04 Service and Support Applications (design assumption - weight not verified)

- Worked applications: (1) Build a case assignment rule and queue; (2) Configure a support process with record types
- Common misconception addressed: Routing all cases to one queue regardless of type
- Module check: 27 items / 27 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cases, queues and support processes | 216 | 6 |

### M05 Productivity and Collaboration (design assumption - weight not verified)

- Worked applications: (1) Set up activity reminders and email templates; (2) Configure Chatter for a cross-team group
- Common misconception addressed: Treating Chatter as a replacement for record-level security
- Module check: 27 items / 27 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Activities, Chatter and mobile | 216 | 6 |

### M06 Data and Analytics Management (design assumption - weight not verified)

- Worked applications: (1) Import and de-duplicate a lead list; (2) Build a summary report and a dashboard component
- Common misconception addressed: Deleting records to fix duplicates instead of merging
- Module check: 27 items / 27 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Data import, quality and backups | 216 | 6 |
| M06L02 | Reports and dashboards | 216 | 6 |

### M07 Workflow and Process Automation (design assumption - weight not verified)

- Worked applications: (1) Build a record-triggered flow to update a field; (2) Design a two-step approval process
- Common misconception addressed: Chaining many triggers where one flow would do
- Module check: 27 items / 27 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Flow and approval processes | 216 | 6 |

## Integrative case

A growing sales team needs a tuned Salesforce org; the candidate configures users and security, customises objects, builds automation, and sets up reports and dashboards.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0239-practice-form-A | 81 | 81 | yes |
| MST-0239-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0239-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0239-final-protected | 81 | 81 | yes |

| Domain | Items (practice form A) |
|---|---|
| Configuration and Setup | 12 |
| Object Manager and Lightning App Builder | 12 |
| Sales and Marketing Applications | 12 |
| Service and Support Applications | 12 |
| Productivity and Collaboration | 11 |
| Data and Analytics Management | 11 |
| Workflow and Process Automation | 11 |

Minimum reviewed item bank: 822 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0239-Q0001** (single-answer, Select ONE) What is the key difference between a profile and a permission set in Salesforce?

- A. Permission sets replace profiles entirely  
  _Rationale:_ Permission sets extend, they do not replace, the baseline from the profile.
- B. A profile sets baseline access; permission sets grant additional access on top **(key)**  
  _Rationale:_ Correct: profiles are the baseline and permission sets add incremental access.
- C. Profiles can be assigned many per user  
  _Rationale:_ A user has one profile but can have many permission sets.
- D. Permission sets control the login hours only  
  _Rationale:_ Permission sets grant a range of permissions, not just login hours.

**MST-0239-Q0002** (single-answer, Select ONE) Which relationship should you use when child records must be deleted if the parent is deleted and inherit the parent's sharing?

- A. Master-detail relationship **(key)**  
  _Rationale:_ Correct: master-detail cascades deletes and inherits sharing from the parent.
- B. Lookup relationship  
  _Rationale:_ Lookup does not cascade delete or inherit sharing by default.
- C. Hierarchical relationship  
  _Rationale:_ Hierarchical applies only to the User object.
- D. External lookup  
  _Rationale:_ External lookup references external data, not this scenario.

**MST-0239-Q0003** (multiple-answer, Select TWO) Select TWO tools an administrator can use to automate a record update when a field changes.

- A. Record-triggered Flow **(key)**  
  _Rationale:_ Correct: a record-triggered Flow can automate updates on change.
- B. Report builder  
  _Rationale:_ Reports display data; they do not automate updates.
- C. Approval process **(key)**  
  _Rationale:_ Correct: an approval process can drive field updates as records progress.
- D. Data Loader  
  _Rationale:_ Data Loader is for bulk import/export, not event automation.
- E. Dashboard component  
  _Rationale:_ Dashboards visualise data; they do not automate updates.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
