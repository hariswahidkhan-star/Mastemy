# Salesforce Certified Marketing Cloud Email Specialist Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1815` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed (official_exam_code left blank) |
| Version basis | unresolved - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02); outline is a DESIGN ASSUMPTION |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 40 / module checks 140 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%%, final >= 80%%) |

## Learning outcomes

1. Describe email marketing concepts, subscriber management and data model in Marketing Cloud Engagement
2. Build and configure email content, templates and dynamic personalisation
3. Plan and automate email sends, journeys and testing
4. Interpret deliverability, tracking and reporting to improve performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> All module titles, lesson titles and weightings below are **DESIGN ASSUMPTIONS** pending verification against the official exam outline (issuer site egress blocked on 2026-10-02).

## Modules

### M01 Subscriber and data management (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Choose a list vs data-extension send for a scenario; (2) Map profile attributes needed for a personalised send
- Common misconception addressed: Confusing a subscriber's unsubscribe scope (list vs all) 
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Subscribers, lists, data extensions and the sending data model | 150 | 6 |
| M01L02 | Preference, profile attributes and subscriber status | 150 | 6 |

### M02 Content and personalisation (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Insert a fallback value for a missing first name; (2) Design a dynamic content rule by audience segment
- Common misconception addressed: Assuming personalization strings render without default values
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Content builder, templates and reusable blocks | 150 | 6 |
| M02L02 | AMPscript/dynamic content and personalization strings | 150 | 6 |

### M03 Automation and sending (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Pick the right send type for a scenario; (2) Outline a welcome journey with entry and wait steps
- Common misconception addressed: Treating Journey Builder and Automation Studio as interchangeable
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | User-initiated, triggered and scheduled sends | 150 | 6 |
| M03L02 | Automation Studio and Journey Builder basics | 150 | 6 |

### M04 Deliverability and reporting (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Diagnose a low open-rate from tracking data; (2) Design an A/B subject-line test
- Common misconception addressed: Interpreting open rate as a reliable sole measure of engagement
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Authentication, reputation and deliverability factors | 150 | 6 |
| M04L02 | Tracking metrics, A/B testing and reporting | 150 | 6 |

## Integrative case

A DTC brand is migrating to Marketing Cloud Engagement: design a subscriber data model, build a personalised welcome email, automate a send with testing, and set up reporting to monitor deliverability and engagement.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified (egress blocked); confirm question count and duration on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1815-practice-form-A | 45 | 45 | yes |
| MST-1815-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1815-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1815-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Subscriber and data management | 12 |
| Content and personalisation | 11 |
| Automation and sending | 11 |
| Deliverability and reporting | 11 |

Minimum reviewed item bank: 556 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1815-Q0001** (single-answer, Select ONE) A marketer needs to send to a frequently changing audience defined by purchase data. Which sending source is most appropriate?

- A. A static list manually maintained  
  _Rationale:_ A static list requires manual upkeep and suits stable audiences, not changing data-driven ones.
- B. A data extension populated from purchase data **(key)**  
  _Rationale:_ Correct: a data extension driven by purchase data handles dynamic, attribute-rich audiences.
- C. The All Subscribers list directly  
  _Rationale:_ Sending to All Subscribers ignores targeting and risks over-sending.
- D. A single test subscriber  
  _Rationale:_ A test subscriber is for QA, not production sends.

**MST-1815-Q0002** (single-answer, Select ONE) What is the main purpose of a fallback (default) value in a personalization string?

- A. To encrypt subscriber data  
  _Rationale:_ Fallback values do not provide encryption.
- B. To display substitute text when the attribute is missing **(key)**  
  _Rationale:_ Correct: a default value renders substitute text so emails do not show blanks for missing data.
- C. To increase send speed  
  _Rationale:_ Fallback values have no effect on send throughput.
- D. To bypass unsubscribe rules  
  _Rationale:_ They have nothing to do with unsubscribe handling.

**MST-1815-Q0003** (multiple-answer, Select TWO) Which TWO practices most directly support strong email deliverability?

- A. Authenticating the sending domain (e.g. SPF/DKIM) **(key)**  
  _Rationale:_ Correct: domain authentication is a core deliverability practice.
- B. Maintaining list hygiene by removing hard bounces **(key)**  
  _Rationale:_ Correct: removing hard bounces protects sender reputation and deliverability.
- C. Buying a third-party email list  
  _Rationale:_ Purchased lists harm reputation and deliverability and breach policy.
- D. Embedding one large image as the whole email  
  _Rationale:_ Image-only emails trigger spam filters and hurt deliverability.


## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
