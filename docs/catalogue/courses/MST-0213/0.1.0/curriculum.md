# Google Cloud Digital Leader

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0213` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | CDL |
| Version basis | DESIGN ASSUMPTION - official outline not retrieved (network egress blocked on issuer site) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked on 2026-10-02; structure is a DESIGN ASSUMPTION pending official confirmation |
| Legacy IDs | MST-GCP-GCP-CDL-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain digital transformation and cloud value with Google Cloud (design-assumption scope, pending official confirmation)
2. Describe data, analytics, AI and ML options on Google Cloud
3. Describe infrastructure and application modernization options
4. Describe Google Cloud security and operations fundamentals

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Digital transformation with Google Cloud (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Digital transformation with Google Cloud' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Digital transformation with Google Cloud'
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why cloud and digital transformation | 180 | 6 |
| M01L02 | Cloud computing models and value | 180 | 6 |

### M02 Innovating with data and Google Cloud (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Innovating with data and Google Cloud' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Innovating with data and Google Cloud'
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data value and management options | 180 | 6 |
| M02L02 | Smart analytics, AI and ML offerings | 180 | 6 |

### M03 Infrastructure and application modernization (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Infrastructure and application modernization' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Infrastructure and application modernization'
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Compute and modernization options | 180 | 6 |
| M03L02 | Containers, APIs and hybrid/multicloud | 180 | 6 |

### M04 Google Cloud security and operations (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Google Cloud security and operations' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Google Cloud security and operations'
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Security fundamentals and shared responsibility | 180 | 6 |
| M04L02 | Monitoring, cost and operations | 180 | 6 |

## Integrative case

A business leader evaluates moving a legacy application to Google Cloud: weighs compute and modernization options, considers data and AI services for new insight, and reviews the shared-responsibility and cost-management model.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0213-practice-form-A | 54 | 54 | yes |
| MST-0213-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0213-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0213-final-protected | 54 | 54 | yes |

| Domain | Items per form |
|---|---|
| Digital transformation with Google Cloud | 14 |
| Innovating with data and Google Cloud | 14 |
| Infrastructure and application modernization | 13 |
| Google Cloud security and operations | 13 |

Minimum reviewed item bank: 564 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0213-Q0001** (single-answer, Select ONE) A company wants to modernize a legacy application with minimal changes while gaining cloud scalability. Which general approach does this describe?

- A. Migrating (lift-and-shift) then incrementally modernizing **(key)**  
  _Rationale:_ Correct: lift-and-shift then incremental modernization minimizes initial change while enabling cloud benefits.
- B. Rewriting the entire system from scratch before any move  
  _Rationale:_ A full rewrite is maximal change, not minimal.
- C. Keeping everything on-premises permanently  
  _Rationale:_ That forgoes cloud scalability entirely.
- D. Deleting the application  
  _Rationale:_ Deleting the application is not a modernization strategy.

**MST-0213-Q0002** (single-answer, Select ONE) In the cloud shared-responsibility model, which statement is generally accurate for Google Cloud?

- A. The provider secures the underlying infrastructure while the customer secures their data and configurations **(key)**  
  _Rationale:_ Correct: responsibility is shared, with the provider securing infrastructure and the customer securing data and configuration.
- B. The provider is responsible for absolutely everything, including customer data choices  
  _Rationale:_ Customers remain responsible for their data and configurations.
- C. The customer must build their own datacenters  
  _Rationale:_ Cloud customers do not build the provider's datacenters.
- D. Security is nobody's responsibility  
  _Rationale:_ Security is a shared responsibility, not unowned.

**MST-0213-Q0003** (multiple-answer, Select TWO) Select TWO benefits commonly associated with adopting cloud computing. (Select TWO.)

- A. Scaling resources up or down with demand **(key)**  
  _Rationale:_ Correct: elasticity is a core cloud benefit.
- B. Shifting from large upfront capital spend to consumption-based cost **(key)**  
  _Rationale:_ Correct: moving CapEx to OpEx is a core cloud benefit.
- C. Guaranteeing zero cost forever  
  _Rationale:_ Cloud is not free; it is consumption-priced.
- D. Eliminating all need for security  
  _Rationale:_ Cloud does not remove security responsibilities.
- E. Removing the need for any planning  
  _Rationale:_ Planning remains important in the cloud.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
