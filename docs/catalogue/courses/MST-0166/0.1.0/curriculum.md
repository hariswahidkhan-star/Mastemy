# Microsoft AZ-140: Azure Virtual Desktop Specialty

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0166` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AZ-140 |
| Version basis | Skills measured as of July 20, 2026 |
| Exam status | current |
| Evidence | **verified-official-source** - sources: SRC-MS-AZ140 |
| Legacy IDs | MST-MIC-MS-AZ140-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan and implement Azure Virtual Desktop networking, storage, host pools and session host images
2. Plan and implement identity integration and security for Azure Virtual Desktop
3. Plan and implement FSLogix, user experience, client settings and app delivery
4. Monitor, update, back up and recover an Azure Virtual Desktop deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance or case simulations) are listed in the exam-version record.

## Modules

### M01 Plan and implement an Azure Virtual Desktop infrastructure (40-45%)

- Worked applications: (1) Size a pooled host pool and session hosts for 150 concurrent users; (2) Choose a storage option for FSLogix profiles across two regions
- Common misconception addressed: Assuming a host pool spans regions automatically without extra design
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Plan, implement, and manage networking for Azure Virtual Desktop | 258 | 6 |
| M01L02 | Plan and implement storage for Azure Virtual Desktop user data | 258 | 6 |
| M01L03 | Plan host pools and session hosts | 258 | 6 |
| M01L04 | Implement host pools and session hosts | 257 | 6 |
| M01L05 | Create and manage session host images | 257 | 6 |

### M02 Plan and implement identity and security (15-20%)

- Worked applications: (1) Map an AD DS vs Entra ID identity scenario to session host join type; (2) Build Conditional Access policies for AVD connections
- Common misconception addressed: Thinking Entra ID join alone enables single sign-on without further configuration
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Plan and implement identity integration | 266 | 6 |
| M02L02 | Plan and implement security | 265 | 6 |

### M03 Plan and implement user environments and apps (20-25%)

- Worked applications: (1) Configure FSLogix Profile Containers and ODFC for Outlook/OneDrive; (2) Publish a RemoteApp and assign an application group
- Common misconception addressed: Confusing App attach with installing apps into the image
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Plan and implement FSLogix | 228 | 6 |
| M03L02 | Plan and implement user experience and client settings | 227 | 6 |
| M03L03 | Install and configure apps on a session host | 227 | 6 |

### M04 Monitor and maintain an Azure Virtual Desktop infrastructure (10-15%)

- Worked applications: (1) Configure autoscaling on a pooled host pool; (2) Design a backup and Site Recovery plan for personal desktops
- Common misconception addressed: Believing Azure backs up session hosts automatically
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitor and manage Azure Virtual Desktop services | 190 | 6 |
| M04L02 | Plan and implement updates, backups, and disaster recovery | 189 | 6 |

## Integrative case

A professional-services firm must deliver Windows multi-session desktops to 400 hybrid staff on Azure Virtual Desktop: design host pools, FSLogix storage, Entra identity and Conditional Access, App attach delivery, autoscaling and a disaster-recovery plan, then justify the design.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0166-practice-form-A | 90 | 90 | yes |
| MST-0166-practice-form-B | 90 | 90 | no (optional practice) |
| MST-0166-practice-form-C | 90 | 90 | no (optional practice) |
| MST-0166-final-protected | 90 | 90 | yes |

Minimum reviewed item bank: 1008 (plan; 3 sample items drafted, 0 reviewed).

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
