# Salesforce Certified Service Cloud Consultant Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1817` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

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

1. Design Service Cloud solutions aligned to support processes and KPIs
2. Configure case management, channels and knowledge
3. Plan routing, entitlements and service automation
4. Design contact-centre analytics, telephony and adoption

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> All module titles, lesson titles and weightings below are **DESIGN ASSUMPTIONS** pending verification against the official exam outline (issuer site egress blocked on 2026-10-02).

## Modules

### M01 Support process and design (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Map a support process to case statuses; (2) Define an SLA target for a tier
- Common misconception addressed: Designing channels before agreeing the case lifecycle
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Service requirements and KPI definition | 150 | 6 |
| M01L02 | Designing the case lifecycle | 150 | 6 |

### M02 Case management and knowledge (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Choose a case-creation channel for a scenario; (2) Design an article type for a FAQ
- Common misconception addressed: Confusing case deflection with case deletion
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Case creation channels (email-to-case, web-to-case) | 150 | 6 |
| M02L02 | Knowledge articles and deflection | 150 | 6 |

### M03 Routing, entitlements and automation (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Design a routing model for skills-based cases; (2) Configure a milestone for an SLA
- Common misconception addressed: Assuming assignment rules and omni-channel are the same mechanism
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Omni-channel routing and queues | 150 | 6 |
| M03L02 | Entitlements, milestones and automation | 150 | 6 |

### M04 Analytics, telephony and adoption (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Build a first-contact-resolution report requirement; (2) Draft an adoption metric for agents
- Common misconception addressed: Treating average handle time as the only quality measure
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Service reporting, dashboards and KPIs | 150 | 6 |
| M04L02 | Telephony/CTI and agent adoption | 150 | 6 |

## Integrative case

A subscription company is implementing Service Cloud: design a case lifecycle across email, web and chat, add knowledge and entitlements, configure omni-channel routing, and plan service analytics and agent adoption.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified (egress blocked); confirm question count and duration on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1817-practice-form-A | 45 | 45 | yes |
| MST-1817-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1817-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1817-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Support process and design | 12 |
| Case management and knowledge | 11 |
| Routing, entitlements and automation | 11 |
| Analytics, telephony and adoption | 11 |

Minimum reviewed item bank: 556 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1817-Q0001** (single-answer, Select ONE) A support team wants customers to self-serve answers to reduce case volume. Which capability is most relevant?

- A. Opportunity forecasting  
  _Rationale:_ Forecasting is a sales feature unrelated to self-service.
- B. Knowledge with case deflection on the portal **(key)**  
  _Rationale:_ Correct: published knowledge surfaced for self-service deflects cases before they are created.
- C. Territory management  
  _Rationale:_ Territory management is a sales-alignment feature.
- D. Lead scoring  
  _Rationale:_ Lead scoring relates to marketing/sales, not case deflection.

**MST-1817-Q0002** (single-answer, Select ONE) Which routing approach best sends cases to agents based on their specific competencies?

- A. Round-robin to everyone equally  
  _Rationale:_ Round-robin ignores competency and may misroute specialised cases.
- B. Skills-based omni-channel routing **(key)**  
  _Rationale:_ Correct: skills-based routing matches cases to agents with the needed competencies.
- C. Manual email forwarding  
  _Rationale:_ Manual forwarding is error-prone and not scalable.
- D. Random assignment  
  _Rationale:_ Random assignment disregards agent skills.

**MST-1817-Q0003** (multiple-answer, Select TWO) Which TWO metrics are meaningful indicators of contact-centre service quality?

- A. First-contact resolution rate **(key)**  
  _Rationale:_ Correct: FCR reflects effective, efficient resolution quality.
- B. Customer satisfaction (CSAT) score **(key)**  
  _Rationale:_ Correct: CSAT captures the customer's view of service quality.
- C. Number of office chairs in the centre  
  _Rationale:_ Furniture count is irrelevant to service quality.
- D. Colour of the agent dashboard  
  _Rationale:_ Dashboard colour does not measure service quality.


## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
