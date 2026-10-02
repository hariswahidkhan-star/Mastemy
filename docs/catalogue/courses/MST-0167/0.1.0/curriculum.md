# Microsoft AZ-120: Planning and Administering Azure for SAP Workloads

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0167` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AZ-120 |
| Version basis | Skills measured as of April 17, 2026 |
| Exam status | current |
| Evidence | **verified-official-source** - sources: SRC-MS-AZ120 |
| Legacy IDs | MST-MIC-MS-AZ120-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan target sizing, migration strategy and the Azure environment for SAP workloads
2. Design and implement compute, networking and storage for SAP on Azure
3. Design and implement high availability and disaster recovery for SAP on Azure
4. Optimize, monitor and maintain SAP workloads on Azure

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance or case simulations) are listed in the exam-version record.

## Modules

### M01 Migrate SAP workloads to Azure (25-30%)

- Worked applications: (1) Estimate target VM sizing for an SAP HANA production system; (2) Choose lift-and-shift vs lift-shift-migrate for a NetWeaver system
- Common misconception addressed: Treating any Azure VM as valid for SAP without checking SAP certification
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Identify requirements for target infrastructure | 264 | 6 |
| M01L02 | Design and implement an Azure environment to support SAP workloads | 264 | 6 |
| M01L03 | Design and implement integration with SAP RISE | 264 | 6 |

### M02 Design and implement an infrastructure to support SAP workloads on Azure (25-30%)

- Worked applications: (1) Select an SAP-certified VM and configure Write Accelerator; (2) Design proximity placement groups for latency-sensitive tiers
- Common misconception addressed: Ignoring proximity placement groups and accepting cross-zone latency
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design and implement a compute solution for SAP workloads | 264 | 6 |
| M02L02 | Design and implement networking for SAP on Azure virtual machines | 264 | 6 |
| M02L03 | Design and implement a storage solution for SAP on Azure virtual machines | 264 | 6 |

### M03 Design and implement high availability and disaster recovery (HADR) (20-25%)

- Worked applications: (1) Configure Pacemaker and SBD fencing for SAP Central Services; (2) Design an Azure Site Recovery plan across regions
- Common misconception addressed: Assuming availability zones alone meet the DR objective
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Design and implement a high availability solution for SAP on Azure virtual machines | 324 | 6 |
| M03L02 | Design and implement a disaster recovery solution for SAP on Azure virtual machines | 324 | 6 |

### M04 Maintain SAP workloads on Azure (20-25%)

- Worked applications: (1) Right-size VMs with reservations to cut cost; (2) Configure Azure Monitor for SAP solutions
- Common misconception addressed: Believing Azure Advisor applies optimizations automatically
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Optimize performance and costs | 324 | 6 |
| M04L02 | Monitor and maintain SAP on Azure | 324 | 6 |

## Integrative case

A manufacturer migrates an SAP S/4HANA landscape to Azure: select SAP-certified VMs, design ExpressRoute networking and NetApp storage, build a Pacemaker HANA HA cluster with Site Recovery DR, and set cost and monitoring guardrails.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0167-practice-form-A | 90 | 90 | yes |
| MST-0167-practice-form-B | 90 | 90 | no (optional practice) |
| MST-0167-practice-form-C | 90 | 90 | no (optional practice) |
| MST-0167-final-protected | 90 | 90 | yes |

Minimum reviewed item bank: 984 (plan; 3 sample items drafted, 0 reviewed).

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
