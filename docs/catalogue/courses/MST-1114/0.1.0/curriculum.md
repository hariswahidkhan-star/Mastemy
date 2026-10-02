# HubSpot: CRM and Marketing Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1114` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course design (vendor-neutral). No third-party exam code, weighting or syllabus is claimed; content to be verified against current sources at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none (original Mastemy design) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — HubSpot: CRM and Marketing Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model contacts, companies and deals in HubSpot CRM
2. Build marketing automation workflows and lead management
3. Create and manage marketing assets and campaigns
4. Report on pipeline and attribution in HubSpot

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 CRM data model (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Map a sales process to deal stages; (2) Define custom properties for segmentation
- Common misconception addressed: Treating HubSpot as a flat contact list with no object model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Contacts, companies, deals and objects | 120 | 8 |
| M01L02 | Properties, lifecycle stages and associations | 120 | 8 |

### M02 Automation and lead management (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a welcome workflow with enrolment criteria; (2) Design a lead-score model and routing rule
- Common misconception addressed: Enrolling contacts in workflows with no suppression logic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Workflows, triggers and enrolment | 120 | 8 |
| M02L02 | Lead scoring and routing | 120 | 8 |

### M03 Marketing assets and campaigns (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a landing page and form with a follow-up; (2) Create an active list for a segment
- Common misconception addressed: Confusing static and active lists when segmenting
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Forms, landing pages and emails | 120 | 8 |
| M03L02 | Lists, segmentation and campaign tracking | 120 | 8 |

### M04 Reporting and attribution (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a pipeline dashboard for a sales manager; (2) Choose an attribution model for a report
- Common misconception addressed: Reporting on dirty data instead of fixing hygiene first
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Dashboards and pipeline reports | 120 | 8 |
| M04L02 | Attribution reporting and data hygiene | 120 | 8 |

## Integrative case

A growing company adopts HubSpot to unify marketing and sales. The practitioner must design the object and lifecycle model, build lead-scoring and nurture automation, create campaign assets, and deliver a pipeline and attribution dashboard, then justify the data-hygiene rules that keep reports trustworthy.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1114-final-protected | 40 | 40 | yes |
| MST-1114-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CRM data model | 10 |
| Automation and lead management | 10 |
| Marketing assets and campaigns | 10 |
| Reporting and attribution | 10 |

Minimum reviewed item bank: 376 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1114-Q0001** (single-answer, Select ONE) In HubSpot's data model, a deal is normally associated with:

- A. Contacts and companies involved in the sales opportunity **(key)**  
  _Rationale:_ Correct: deals associate to the people and company in the opportunity.
- B. Only a single email address with no other object  
  _Rationale:_ Deals associate to multiple objects, not just an email.
- C. The HubSpot account owner's login  
  _Rationale:_ Not an association on a deal record.
- D. A landing-page URL exclusively  
  _Rationale:_ A URL is not the deal's core association.

**MST-1114-Q0002** (multiple-answer, Select TWO) Which TWO statements about HubSpot active lists are correct? (Select TWO.)

- A. Membership updates automatically as contacts meet or stop meeting criteria **(key)**  
  _Rationale:_ Correct: active lists are dynamic.
- B. They are useful for ongoing segmentation that must stay current **(key)**  
  _Rationale:_ Correct: that is their main purpose.
- C. They freeze membership at the moment of creation  
  _Rationale:_ That describes a static list.
- D. They can only contain companies, never contacts  
  _Rationale:_ Active lists can be contact-based.

**MST-1114-Q0003** (single-answer, Select ONE) A lead-scoring model in HubSpot is best used to:

- A. Prioritise follow-up by estimated fit and engagement **(key)**  
  _Rationale:_ Correct: scoring ranks leads for routing and prioritisation.
- B. Permanently delete low-value contacts  
  _Rationale:_ Scoring prioritises; it does not delete.
- C. Set the company's billing plan  
  _Rationale:_ Unrelated to lead scoring.
- D. Translate emails into other languages  
  _Rationale:_ Not a scoring function.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
